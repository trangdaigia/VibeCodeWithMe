import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import {
  PlatformTabId,
  GatedModuleTab,
  AccessRequestStatus,
  encodePermissionsIntoAchievementIds,
  decodePermissionsFromUserDoc,
} from './utils/accessControlLogic';

// Initialize Firebase SDK
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfileDoc {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: UserRole;
  selectedLanguageId: string;
  xp: number;
  dailyXpGoal: number;
  todayXp: number;
  todayDate: string;
  streak: number;
  lastActiveDate: string;
  examsCompleted: number;
  bonusWordsMastered: number;
  targetBand: string;
  voiceSpeed: number;
  soundEnabled: boolean;
  completedLessonIds: string[];
  unlockedAchievementIds: string[];
  accessApproved?: boolean;
  allowedTabs?: PlatformTabId[];
  accessRequestStatus?: AccessRequestStatus;
  requestedTabs?: GatedModuleTab[];
  accessRequestNote?: string;
  accessRequestedAt?: string;
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export interface ExamRecordDoc {
  examId: string;
  userId: string;
  examTitle: string;
  overallBand: number;
  listeningScore: number;
  readingScore: number;
  writingWords: number;
  createdAt?: Timestamp | string;
}

export const BOOTSTRAPPED_ADMIN_EMAIL = 'daigia170904@gmail.com';

export function isUserBootstrappedAdmin(email?: string | null): boolean {
  return Boolean(email && email.trim().toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase());
}

// Validate connection to Firestore on boot
export async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration. The client is offline.');
    }
  }
}

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function registerUserWithEmailPassword(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (displayName.trim()) {
    await updateProfile(cred.user, { displayName: displayName.trim() });
  }
  return cred.user;
}

export async function loginUserWithEmailPassword(
  email: string,
  password: string
): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

// Sanitize UserProfile payload to strictly adhere to firestore.rules invariants
export function buildValidUserProfilePayload(
  base: Partial<UserProfileDoc> & { uid: string; email: string },
  existingRole?: UserRole,
  existingCreatedAt?: unknown
) {
  const allowedLangs = ['english', 'chinese', 'japanese', 'korean', 'french', 'german', 'spanish'];
  const lang = allowedLangs.includes(base.selectedLanguageId || '') ? base.selectedLanguageId! : 'english';

  const cleanUid = base.uid.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 128) || 'user_default';
  const cleanEmail = (base.email && base.email.includes('@') ? base.email.trim() : 'learner@linguaflow.app').slice(0, 256);
  const cleanName = (base.displayName?.trim() || cleanEmail.split('@')[0] || 'Học viên LinguaFlow').slice(0, 100);
  const cleanPhoto = (base.photoURL || '').slice(0, 500);

  // Enforce strict rule: ONLY daigia170904@gmail.com can ever have 'admin' role
  const isOwnerAdmin = isUserBootstrappedAdmin(cleanEmail);
  const role: UserRole = isOwnerAdmin ? 'admin' : 'student';

  const decoded = decodePermissionsFromUserDoc({
    email: cleanEmail,
    role,
    accessApproved: base.accessApproved,
    allowedTabs: base.allowedTabs,
    accessRequestStatus: base.accessRequestStatus,
    unlockedAchievementIds: base.unlockedAchievementIds,
  });

  const encodedAchievements = encodePermissionsIntoAchievementIds(
    decoded.cleanAchievementIds.length > 0 ? decoded.cleanAchievementIds : ['first-lesson'],
    decoded.accessApproved,
    decoded.allowedTabs,
    decoded.accessRequestStatus
  );

  const todayStr = new Date().toISOString().split('T')[0];

  return {
    uid: cleanUid,
    email: cleanEmail,
    displayName: cleanName,
    photoURL: cleanPhoto,
    role,
    selectedLanguageId: lang,
    xp: Math.max(0, Math.min(10000000, Math.round(Number(base.xp) || 0))),
    dailyXpGoal: Math.max(10, Math.min(5000, Math.round(Number(base.dailyXpGoal) || 50))),
    todayXp: Math.max(0, Math.min(100000, Math.round(Number(base.todayXp) || 0))),
    todayDate: (base.todayDate || todayStr).slice(0, 20),
    streak: Math.max(0, Math.min(10000, Math.round(Number(base.streak) || 1))),
    lastActiveDate: (base.lastActiveDate || todayStr).slice(0, 20),
    examsCompleted: Math.max(0, Math.min(10000, Math.round(Number(base.examsCompleted) || 0))),
    bonusWordsMastered: Math.max(0, Math.min(100000, Math.round(Number(base.bonusWordsMastered) || 0))),
    targetBand: (base.targetBand?.trim() || 'Band 7.5').slice(0, 32),
    voiceSpeed: Math.max(0.5, Math.min(2.0, Number(base.voiceSpeed) || 1.0)),
    soundEnabled: typeof base.soundEnabled === 'boolean' ? base.soundEnabled : true,
    completedLessonIds: Array.isArray(base.completedLessonIds) ? base.completedLessonIds.slice(0, 100) : ['en-l1'],
    unlockedAchievementIds: encodedAchievements,
    createdAt: existingCreatedAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

// Admin helper: Save updated user permissions & role in Firestore (/users/{targetUid})
export async function assignRoleToUserInFirestore(
  targetUser: UserProfileDoc,
  newRole: UserRole
): Promise<void> {
  const path = `users/${targetUser.uid}`;
  try {
    const snap = await getDoc(doc(db, 'users', targetUser.uid));
    const existingCreatedAt = snap.exists() ? snap.data().createdAt : undefined;
    const safeRole: UserRole = isUserBootstrappedAdmin(targetUser.email) ? 'admin' : 'student';
    const payload = buildValidUserProfilePayload(
      {
        ...targetUser,
        role: safeRole
      },
      safeRole,
      existingCreatedAt
    );
    await setDoc(doc(db, 'users', targetUser.uid), payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

// Admin helper: Create a new member profile in Firestore (/users/{uid}) with specified permissions
export async function createManagedUserInFirestore(params: {
  email: string;
  displayName: string;
  role: UserRole;
  targetBand?: string;
  accessApproved?: boolean;
  allowedTabs?: PlatformTabId[];
}): Promise<UserProfileDoc> {
  const cleanId = `member_${params.email.split('@')[0].replace(/[^a-zA-Z0-9_-]/g, '')}_${Date.now().toString(36)}`.slice(0, 64);
  const path = `users/${cleanId}`;
  const todayStr = new Date().toISOString().split('T')[0];
  const isOwner = isUserBootstrappedAdmin(params.email);
  const safeRole: UserRole = isOwner ? 'admin' : 'student';
  const accessApproved = isOwner ? true : Boolean(params.accessApproved);
  const allowedTabs: PlatformTabId[] = isOwner
    ? ['path', 'video', 'studio', 'academic', 'roleplay', 'grammar', 'vault', 'culture', 'community', 'admin']
    : params.allowedTabs && params.allowedTabs.length > 0
    ? params.allowedTabs
    : accessApproved
    ? ['path', 'video', 'studio', 'academic', 'roleplay', 'grammar', 'vault', 'culture', 'community']
    : ['path'];

  const encodedAchievements = encodePermissionsIntoAchievementIds(
    ['first-lesson'],
    accessApproved,
    allowedTabs,
    accessApproved ? 'approved' : 'none'
  );

  const newDoc: UserProfileDoc = {
    uid: cleanId,
    email: params.email.trim().toLowerCase(),
    displayName: params.displayName.trim() || params.email.split('@')[0],
    photoURL: '',
    role: safeRole,
    selectedLanguageId: 'english',
    xp: 100,
    dailyXpGoal: 50,
    todayXp: 0,
    todayDate: todayStr,
    streak: 1,
    lastActiveDate: todayStr,
    examsCompleted: 0,
    bonusWordsMastered: 0,
    targetBand: params.targetBand || 'Band 7.0',
    voiceSpeed: 1.0,
    soundEnabled: true,
    completedLessonIds: ['en-l1'],
    unlockedAchievementIds: encodedAchievements,
    accessApproved,
    allowedTabs,
    accessRequestStatus: accessApproved ? 'approved' : 'none',
  };

  if (auth.currentUser && isUserBootstrappedAdmin(auth.currentUser.email)) {
    try {
      const payload = buildValidUserProfilePayload(newDoc, safeRole);
      await setDoc(doc(db, 'users', cleanId), payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }
  return newDoc;
}

export async function deleteManagedUserFromFirestore(uid: string): Promise<void> {
  const path = `users/${uid}`;
  try {
    await deleteDoc(doc(db, 'users', uid));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export async function saveExamRecordToFirestore(
  userId: string,
  record: Omit<ExamRecordDoc, 'examId' | 'userId' | 'createdAt'>
): Promise<void> {
  const examId = `exam_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`.replace(/[^a-zA-Z0-9_-]/g, '');
  const path = `users/${userId}/examHistory/${examId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'examHistory', examId), {
      examId,
      userId,
      examTitle: (record.examTitle?.trim() || 'IELTS Academic Official Mock Test').slice(0, 200),
      overallBand: Math.max(0, Math.min(9.0, Number(record.overallBand) || 0)),
      listeningScore: Math.max(0, Math.min(40, Math.round(Number(record.listeningScore) || 0))),
      readingScore: Math.max(0, Math.min(40, Math.round(Number(record.readingScore) || 0))),
      writingWords: Math.max(0, Math.min(10000, Math.round(Number(record.writingWords) || 0))),
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onAuthStateChanged
};
export type { User };
