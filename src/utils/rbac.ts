export type UserRole = 'student' | 'teacher' | 'admin';

export const BOOTSTRAPPED_ADMIN_EMAIL = 'daigia170904@gmail.com';

export function isUserBootstrappedAdmin(email?: string | null): boolean {
  return Boolean(email && email.trim().toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase());
}

export function canUserAccessFeature(role: UserRole, feature: 'learn' | 'review_students' | 'manage_roles'): boolean {
  if (role === 'admin') return true;
  if (role === 'teacher') return feature === 'learn' || feature === 'review_students';
  return feature === 'learn';
}

export function sanitizeUserProfileData(input: {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  requestedRole?: string;
  isCallerAdmin?: boolean;
  existingRole?: UserRole;
  selectedLanguageId?: string;
  xp?: number;
  dailyXpGoal?: number;
  todayXp?: number;
  streak?: number;
  examsCompleted?: number;
  bonusWordsMastered?: number;
  targetBand?: string;
  voiceSpeed?: number;
  soundEnabled?: boolean;
  completedLessonIds?: string[];
  unlockedAchievementIds?: string[];
}) {
  const allowedLangs = ['english', 'chinese', 'japanese', 'korean', 'french', 'german', 'spanish'];
  const selectedLanguageId = allowedLangs.includes(input.selectedLanguageId || '')
    ? input.selectedLanguageId!
    : 'english';

  const uid = (input.uid || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 128) || 'user_default';
  const email = (input.email && input.email.includes('@') ? input.email.trim() : 'learner@linguaflow.app').slice(0, 256);
  const displayName = (input.displayName?.trim() || email.split('@')[0] || 'Học viên LinguaFlow').slice(0, 100);
  const photoURL = (input.photoURL || '').slice(0, 500);

  let role: UserRole = 'student';
  const validRequestedRole = ['student', 'teacher', 'admin'].includes(input.requestedRole || '')
    ? (input.requestedRole as UserRole)
    : undefined;

  if (input.isCallerAdmin) {
    role = validRequestedRole || input.existingRole || 'admin';
  } else if (input.existingRole) {
    // Non-admin cannot escalate role on update
    role = input.existingRole;
  } else {
    // Non-admin can only create with 'student' role
    role = 'student';
  }

  return {
    uid,
    email,
    displayName,
    photoURL,
    role,
    selectedLanguageId,
    xp: Math.max(0, Math.min(10000000, Math.round(Number(input.xp) || 0))),
    dailyXpGoal: Math.max(10, Math.min(5000, Math.round(Number(input.dailyXpGoal) || 50))),
    todayXp: Math.max(0, Math.min(100000, Math.round(Number(input.todayXp) || 0))),
    streak: Math.max(0, Math.min(10000, Math.round(Number(input.streak) || 1))),
    examsCompleted: Math.max(0, Math.min(10000, Math.round(Number(input.examsCompleted) || 0))),
    bonusWordsMastered: Math.max(0, Math.min(100000, Math.round(Number(input.bonusWordsMastered) || 0))),
    targetBand: (input.targetBand?.trim() || 'Band 7.5').slice(0, 32),
    voiceSpeed: Math.max(0.5, Math.min(2.0, Number(input.voiceSpeed) || 1.0)),
    soundEnabled: typeof input.soundEnabled === 'boolean' ? input.soundEnabled : true,
    completedLessonIds: Array.isArray(input.completedLessonIds) ? input.completedLessonIds.slice(0, 100) : ['en-l1'],
    unlockedAchievementIds: Array.isArray(input.unlockedAchievementIds) ? input.unlockedAchievementIds.slice(0, 50) : ['first-lesson']
  };
}
