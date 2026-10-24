import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LANGUAGE_COURSES, LanguageCourse, Lesson, VocabCard } from './data/curriculum';
import { TopNav, ActiveTab } from './components/TopNav';
import { LanguageSelector } from './components/LanguageSelector';
import { PathView } from './components/PathView';
import { AcademicExamView } from './components/AcademicExamView';
import { RoleplayView } from './components/RoleplayView';
import { GrammarLabView } from './components/GrammarLabView';
import { VocabVaultView } from './components/VocabVaultView';
import { CultureView } from './components/CultureView';
import { AiVideoLearningView } from './components/AiVideoLearningView';
import { AiMasteryStudioView } from './components/AiMasteryStudioView';
import { UltimateLearningArenaView } from './components/UltimateLearningArenaView';
import { VipOmniVerseView } from './components/VipOmniVerseView';
import { PublicCommunityHubView } from './components/PublicCommunityHubView';
import { AdminPermissionCenterView } from './components/AdminPermissionCenterView';
import { AccessGateModal } from './components/AccessGateModal';
import { PublicAuthModal } from './components/PublicAuthModal';
import { LessonModal } from './components/LessonModal';
import { calculateStreak } from './utils/grammar';
import { countDueCards } from './utils/srs';
import { PAGE_TRANSITION_VARIANTS, FLUID_EASE_OUT } from './utils/motionChoreography';
import {
  ACHIEVEMENTS_REGISTRY,
  Achievement,
  evaluatePendingAchievements,
  UserLearningStats
} from './utils/achievements';
import { AchievementsCenterModal } from './components/achievements/AchievementsCenterModal';
import { AchievementUnlockModal } from './components/achievements/AchievementUnlockModal';
import { UserProfileModal, UserPreferences } from './components/auth/UserProfileModal';
import { LuckySpinWheelModal } from './components/gamification/LuckySpinWheelModal';
import {
  MASTER_ADMIN_EMAIL,
  ALL_GATED_TABS,
  GatedModuleTab,
  PlatformTabId,
  isMasterAdminEmail,
  canUserAccessTab,
  getUnlockedGatedTabs,
  decodePermissionsFromUserDoc,
  encodePermissionsIntoAchievementIds,
  grantFullAccessToUser,
  revokeUserToRoadmapOnly,
  toggleUserModulePermission,
  submitUserAccessRequest,
} from './utils/accessControlLogic';
import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  onAuthStateChanged,
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginUserWithEmailPassword,
  signOutUser,
  testConnection,
  buildValidUserProfilePayload,
  saveExamRecordToFirestore,
  assignRoleToUserInFirestore,
  createManagedUserInFirestore,
  deleteManagedUserFromFirestore,
  handleFirestoreError,
  OperationType,
  User,
  UserRole,
  UserProfileDoc,
  ExamRecordDoc,
  BOOTSTRAPPED_ADMIN_EMAIL,
  isUserBootstrappedAdmin
} from './firebase';

const INITIAL_MANAGED_USERS: UserProfileDoc[] = [
  {
    uid: 'owner_admin_daigia170904',
    email: BOOTSTRAPPED_ADMIN_EMAIL,
    displayName: 'Quản trị viên Tối cao (Admin)',
    photoURL: '',
    role: 'admin',
    selectedLanguageId: 'english',
    xp: 1450,
    dailyXpGoal: 100,
    todayXp: 90,
    todayDate: '2026-10-23',
    streak: 16,
    lastActiveDate: '2026-10-23',
    examsCompleted: 4,
    bonusWordsMastered: 1200,
    targetBand: 'Band 8.5+',
    voiceSpeed: 1.0,
    soundEnabled: true,
    completedLessonIds: ['en-l1', 'en-l2'],
    unlockedAchievementIds: ['first-lesson', 'streak-3', 'streak-10', 'first-ielts-exam'],
    accessApproved: true,
    allowedTabs: ['path', ...ALL_GATED_TABS, 'admin'],
    accessRequestStatus: 'approved',
  },
  {
    uid: 'member_student_thuha',
    email: 'thuha.tran2004@gmail.com',
    displayName: 'Trần Thu Hà',
    photoURL: '',
    role: 'student',
    selectedLanguageId: 'chinese',
    xp: 310,
    dailyXpGoal: 50,
    todayXp: 50,
    todayDate: '2026-10-23',
    streak: 4,
    lastActiveDate: '2026-10-23',
    examsCompleted: 0,
    bonusWordsMastered: 220,
    targetBand: 'HSK 5',
    voiceSpeed: 0.9,
    soundEnabled: true,
    completedLessonIds: ['zh-l1'],
    unlockedAchievementIds: encodePermissionsIntoAchievementIds(
      ['first-lesson', 'streak-3'],
      false,
      ['path'],
      'pending'
    ),
    accessApproved: false,
    allowedTabs: ['path'],
    accessRequestStatus: 'pending',
    requestedTabs: ['video', 'studio', 'academic'],
    accessRequestNote:
      'Chào Admin daigia170904@gmail.com, em đã hoàn thành bài mở đầu ở mục Lộ trình và mong được Admin cấp phép mở khóa Video AI & Luyện thi HSK ạ!',
    accessRequestedAt: '10 phút trước',
  },
  {
    uid: 'member_student_minhkhoi',
    email: 'minhkhoi.user@gmail.com',
    displayName: 'Lê Minh Khôi',
    photoURL: '',
    role: 'student',
    selectedLanguageId: 'japanese',
    xp: 240,
    dailyXpGoal: 50,
    todayXp: 30,
    todayDate: '2026-10-23',
    streak: 3,
    lastActiveDate: '2026-10-23',
    examsCompleted: 0,
    bonusWordsMastered: 150,
    targetBand: 'JLPT N2',
    voiceSpeed: 1.0,
    soundEnabled: true,
    completedLessonIds: ['ja-l1'],
    unlockedAchievementIds: encodePermissionsIntoAchievementIds(
      ['first-lesson'],
      false,
      ['path'],
      'pending'
    ),
    accessApproved: false,
    allowedTabs: ['path'],
    accessRequestStatus: 'pending',
    requestedTabs: [...ALL_GATED_TABS],
    accessRequestNote:
      'Mong Admin daigia170904@gmail.com cấp phép cho tài khoản User của mình truy cập Phòng Lab AI và Kho Từ vựng SRS Tiếng Nhật.',
    accessRequestedAt: '25 phút trước',
  },
  {
    uid: 'member_student_hoangnam',
    email: 'hoangnam.nguyen@gmail.com',
    displayName: 'Nguyễn Hoàng Nam',
    photoURL: '',
    role: 'student',
    selectedLanguageId: 'english',
    xp: 620,
    dailyXpGoal: 50,
    todayXp: 40,
    todayDate: '2026-10-23',
    streak: 8,
    lastActiveDate: '2026-10-23',
    examsCompleted: 2,
    bonusWordsMastered: 450,
    targetBand: 'Band 7.5',
    voiceSpeed: 1.0,
    soundEnabled: true,
    completedLessonIds: ['en-l1'],
    unlockedAchievementIds: encodePermissionsIntoAchievementIds(
      ['first-lesson', 'streak-3', 'first-ielts-exam'],
      true,
      ['path', ...ALL_GATED_TABS],
      'approved'
    ),
    accessApproved: true,
    allowedTabs: ['path', ...ALL_GATED_TABS],
    accessRequestStatus: 'approved',
  },
  {
    uid: 'member_student_lananh',
    email: 'lananh.academic@gmail.com',
    displayName: 'Phạm Lan Anh',
    photoURL: '',
    role: 'student',
    selectedLanguageId: 'korean',
    xp: 540,
    dailyXpGoal: 100,
    todayXp: 70,
    todayDate: '2026-10-23',
    streak: 7,
    lastActiveDate: '2026-10-23',
    examsCompleted: 1,
    bonusWordsMastered: 380,
    targetBand: 'TOPIK II Cấp 5',
    voiceSpeed: 1.0,
    soundEnabled: true,
    completedLessonIds: ['ko-l1'],
    unlockedAchievementIds: encodePermissionsIntoAchievementIds(
      ['first-lesson', 'streak-3'],
      false,
      ['path', 'video', 'academic'],
      'approved'
    ),
    accessApproved: false,
    allowedTabs: ['path', 'video', 'academic'],
    accessRequestStatus: 'approved',
  }
];

export default function App() {
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      if (langParam && LANGUAGE_COURSES[langParam]) return langParam;
      const saved = localStorage.getItem('linguaflow_lang');
      if (saved && LANGUAGE_COURSES[saved]) return saved;
    }
    return 'english';
  });

  // Directory of Managed Users for Public Accounts & Admin Permission Control
  const [managedUsers, setManagedUsers] = useState<UserProfileDoc[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_managed_users_v2');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_MANAGED_USERS;
  });

  // Active Account Email in Public Portal (defaults to Owner Admin daigia170904@gmail.com or URL ?user= param)
  const [activeAccountEmail, setActiveAccountEmail] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get('user');
      if (userParam) return userParam.trim().toLowerCase();
      const savedEmail = localStorage.getItem('linguaflow_active_account_email');
      if (savedEmail) return savedEmail;
    }
    return MASTER_ADMIN_EMAIL;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as ActiveTab;
      if (
        [
          'path',
          'viphub',
          'arena',
          'video',
          'studio',
          'academic',
          'roleplay',
          'grammar',
          'vault',
          'culture',
          'community',
          'admin',
        ].includes(tabParam)
      ) {
        return tabParam;
      }
    }
    return 'path';
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [isPublicAuthModalOpen, setIsPublicAuthModalOpen] = useState(false);
  const [publicAuthInitialMode, setPublicAuthInitialMode] = useState<'login' | 'register'>('login');
  const [lockedGateModalTab, setLockedGateModalTab] = useState<GatedModuleTab | null>(null);
  const [isAccessGateOpen, setIsAccessGateOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [autoStartVocabReview, setAutoStartVocabReview] = useState<boolean>(false);

  // Firebase Auth & Sync State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const existingCreatedAtRef = useRef<unknown>(null);
  const isApplyingRemoteSnapshotRef = useRef<boolean>(false);

  // Resolve current active user profile & permissions
  const effectiveEmail = currentUser?.email || activeAccountEmail || MASTER_ADMIN_EMAIL;
  const isCurrentAccountAdmin = isMasterAdminEmail(effectiveEmail);

  const activeManagedProfile = useMemo(() => {
    const found = managedUsers.find(
      (u) => u.email.trim().toLowerCase() === effectiveEmail.trim().toLowerCase()
    );
    if (found) {
      const decoded = decodePermissionsFromUserDoc(found);
      return {
        ...found,
        role: isMasterAdminEmail(found.email) ? ('admin' as UserRole) : ('student' as UserRole),
        accessApproved: decoded.accessApproved,
        allowedTabs: decoded.allowedTabs,
        accessRequestStatus: found.accessRequestStatus || decoded.accessRequestStatus,
      };
    }
    // Fallback if not in list yet
    return {
      uid: `user_${effectiveEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
      email: effectiveEmail,
      displayName: isCurrentAccountAdmin
        ? 'Quản trị viên Tối cao (Admin)'
        : effectiveEmail.split('@')[0],
      photoURL: '',
      role: isCurrentAccountAdmin ? ('admin' as UserRole) : ('student' as UserRole),
      selectedLanguageId,
      xp: 150,
      dailyXpGoal: 50,
      todayXp: 30,
      todayDate: '2026-10-23',
      streak: 3,
      lastActiveDate: '2026-10-23',
      examsCompleted: 0,
      bonusWordsMastered: 0,
      targetBand: 'Band 7.5',
      voiceSpeed: 1.0,
      soundEnabled: true,
      completedLessonIds: ['en-l1'],
      unlockedAchievementIds: ['first-lesson'],
      accessApproved: isCurrentAccountAdmin,
      allowedTabs: isCurrentAccountAdmin
        ? (['path', ...ALL_GATED_TABS, 'admin'] as PlatformTabId[])
        : (['path'] as PlatformTabId[]),
      accessRequestStatus: isCurrentAccountAdmin ? ('approved' as const) : ('none' as const),
    };
  }, [managedUsers, effectiveEmail, isCurrentAccountAdmin, selectedLanguageId]);

  const unlockedGatedTabsForCurrentUser = useMemo(
    () =>
      getUnlockedGatedTabs({
        email: activeManagedProfile.email,
        accessApproved: activeManagedProfile.accessApproved,
        allowedTabs: activeManagedProfile.allowedTabs,
      }),
    [activeManagedProfile]
  );

  const pendingAccessRequestsCount = useMemo(
    () =>
      managedUsers.filter(
        (u) =>
          !isMasterAdminEmail(u.email) &&
          (u.accessRequestStatus === 'pending' ||
            decodePermissionsFromUserDoc(u).accessRequestStatus === 'pending')
      ).length,
    [managedUsers]
  );

  // Ensure if active user loses permission for current tab, redirect back to 'path' (Lộ trình)
  useEffect(() => {
    const allowed = canUserAccessTab(
      {
        email: activeManagedProfile.email,
        accessApproved: activeManagedProfile.accessApproved,
        allowedTabs: activeManagedProfile.allowedTabs,
      },
      activeTab
    );
    if (!allowed) {
      setActiveTab('path');
    }
  }, [activeManagedProfile, activeTab]);

  // User Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>(() => ({
    displayName: 'Quản trị viên Tối cao (Admin)',
    targetBand: 'Band 7.5',
    voiceSpeed: 1.0,
    soundEnabled: true,
    role: 'admin'
  }));

  useEffect(() => {
    setPreferences((prev) => ({
      ...prev,
      displayName: activeManagedProfile.displayName,
      targetBand: activeManagedProfile.targetBand || prev.targetBand,
      role: isMasterAdminEmail(activeManagedProfile.email) ? 'admin' : 'student',
    }));
  }, [activeManagedProfile.email, activeManagedProfile.displayName, activeManagedProfile.targetBand]);

  // Exam History State
  const [examHistory, setExamHistory] = useState<ExamRecordDoc[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_exam_history');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [
      {
        examId: 'exam_initial_sample',
        userId: 'local_user',
        examTitle: 'IELTS Academic Official Test 1 (80 Questions)',
        overallBand: 7.5,
        listeningScore: 34,
        readingScore: 33,
        writingWords: 425
      }
    ];
  });

  // User Stats & State
  const [xp, setXp] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_xp');
      return saved ? parseInt(saved, 10) : 150;
    }
    return 150;
  });

  const [dailyXpGoal, setDailyXpGoal] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_daily_goal');
      return saved ? parseInt(saved, 10) : 50;
    }
    return 50;
  });

  const [todayXp, setTodayXp] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem('linguaflow_today_date');
      const savedXp = localStorage.getItem('linguaflow_today_xp');
      if (savedDate === today && savedXp) {
        return parseInt(savedXp, 10);
      } else {
        localStorage.setItem('linguaflow_today_date', today);
        localStorage.setItem('linguaflow_today_xp', '30');
        return 30;
      }
    }
    return 30;
  });

  const [streak, setStreak] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_streak');
      return saved ? parseInt(saved, 10) : 3;
    }
    return 3;
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_completed');
      return saved ? JSON.parse(saved) : ['en-l1'];
    }
    return ['en-l1'];
  });

  const currentCourse: LanguageCourse = LANGUAGE_COURSES[selectedLanguageId] || LANGUAGE_COURSES['english'];

  const [vocabCards, setVocabCards] = useState<Record<string, VocabCard[]>>(() => {
    let savedData: Record<string, VocabCard[]> = {};
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_cards');
      if (saved) {
        try {
          savedData = JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    const initial: Record<string, VocabCard[]> = {};
    for (const [key, course] of Object.entries(LANGUAGE_COURSES)) {
      const savedLangCards = savedData[key] || [];
      const savedMap = new Map<string, VocabCard>(savedLangCards.map((c: VocabCard) => [c.id, c]));
      const courseCardIds = new Set(course.vocabCards.map(c => c.id));
      const customUserCards = savedLangCards.filter((c: VocabCard) => !courseCardIds.has(c.id));
      const merged = [
        ...course.vocabCards.map((c: VocabCard) => {
          const savedCard = savedMap.get(c.id);
          if (savedCard) {
            return {
              ...c,
              easeFactor: savedCard.easeFactor ?? c.easeFactor,
              repetitions: savedCard.repetitions ?? c.repetitions,
              intervalDays: savedCard.intervalDays ?? c.intervalDays,
              nextReviewDate: savedCard.nextReviewDate ?? c.nextReviewDate,
              status: savedCard.status ?? c.status,
            };
          }
          return c;
        }),
        ...customUserCards
      ];
      initial[key] = merged;
    }
    return initial;
  });

  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_achievements');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return ['first-lesson', 'streak-3'];
  });

  const [examsCompleted, setExamsCompleted] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_exams_completed');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [bonusWordsMastered, setBonusWordsMastered] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_bonus_words');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState(false);
  const [newlyUnlockedQueue, setNewlyUnlockedQueue] = useState<Achievement[]>([]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('linguaflow_lang', selectedLanguageId);
  }, [selectedLanguageId]);

  useEffect(() => {
    localStorage.setItem('linguaflow_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('linguaflow_daily_goal', dailyXpGoal.toString());
  }, [dailyXpGoal]);

  useEffect(() => {
    localStorage.setItem('linguaflow_today_xp', todayXp.toString());
  }, [todayXp]);

  useEffect(() => {
    localStorage.setItem('linguaflow_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('linguaflow_completed', JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  useEffect(() => {
    localStorage.setItem('linguaflow_cards', JSON.stringify(vocabCards));
  }, [vocabCards]);

  useEffect(() => {
    localStorage.setItem('linguaflow_achievements', JSON.stringify(unlockedAchievementIds));
  }, [unlockedAchievementIds]);

  useEffect(() => {
    localStorage.setItem('linguaflow_exams_completed', examsCompleted.toString());
  }, [examsCompleted]);

  useEffect(() => {
    localStorage.setItem('linguaflow_bonus_words', bonusWordsMastered.toString());
  }, [bonusWordsMastered]);

  useEffect(() => {
    localStorage.setItem('linguaflow_user_prefs', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('linguaflow_exam_history', JSON.stringify(examHistory));
  }, [examHistory]);

  useEffect(() => {
    localStorage.setItem('linguaflow_managed_users_v2', JSON.stringify(managedUsers));
  }, [managedUsers]);

  useEffect(() => {
    localStorage.setItem('linguaflow_active_account_email', activeAccountEmail);
  }, [activeAccountEmail]);

  useEffect(() => {
    testConnection();
  }, []);

  // Gatekeeper for all tab changes: enforces Roadmap-only restriction for unapproved Users
  const handleGatedTabChange = (targetTab: ActiveTab) => {
    const allowed = canUserAccessTab(
      {
        email: activeManagedProfile.email,
        accessApproved: activeManagedProfile.accessApproved,
        allowedTabs: activeManagedProfile.allowedTabs,
      },
      targetTab
    );

    if (allowed) {
      if (targetTab !== 'vault') {
        setAutoStartVocabReview(false);
      }
      setActiveTab(targetTab);
    } else if (targetTab !== 'path' && targetTab !== 'admin') {
      setLockedGateModalTab(targetTab as GatedModuleTab);
      setIsAccessGateOpen(true);
    }
  };

  // Sync current state to Firestore helper
  const syncUserProfileToFirestore = async (
    user: User,
    overrides?: Partial<UserPreferences> & {
      xp?: number;
      dailyXpGoal?: number;
      todayXp?: number;
      streak?: number;
      selectedLanguageId?: string;
      completedLessonIds?: string[];
      unlockedAchievementIds?: string[];
      examsCompleted?: number;
      bonusWordsMastered?: number;
      accessApproved?: boolean;
      allowedTabs?: PlatformTabId[];
    }
  ) => {
    const userPath = `users/${user.uid}`;
    setIsSyncing(true);
    setAuthError(null);
    try {
      const safeRole: UserRole = isUserBootstrappedAdmin(user.email) ? 'admin' : 'student';

      const payload = buildValidUserProfilePayload(
        {
          uid: user.uid,
          email: user.email || 'learner@linguaflow.app',
          displayName: overrides?.displayName ?? preferences.displayName ?? user.displayName ?? 'Học viên LinguaFlow',
          photoURL: user.photoURL || '',
          role: safeRole,
          selectedLanguageId: overrides?.selectedLanguageId ?? selectedLanguageId,
          xp: overrides?.xp ?? xp,
          dailyXpGoal: overrides?.dailyXpGoal ?? dailyXpGoal,
          todayXp: overrides?.todayXp ?? todayXp,
          todayDate: new Date().toISOString().split('T')[0],
          streak: overrides?.streak ?? streak,
          lastActiveDate: localStorage.getItem('linguaflow_last_date') || new Date().toISOString().split('T')[0],
          examsCompleted: overrides?.examsCompleted ?? examsCompleted,
          bonusWordsMastered: overrides?.bonusWordsMastered ?? bonusWordsMastered,
          targetBand: overrides?.targetBand ?? preferences.targetBand,
          voiceSpeed: overrides?.voiceSpeed ?? preferences.voiceSpeed,
          soundEnabled: overrides?.soundEnabled ?? preferences.soundEnabled,
          completedLessonIds: overrides?.completedLessonIds ?? completedLessonIds,
          unlockedAchievementIds: overrides?.unlockedAchievementIds ?? unlockedAchievementIds,
          accessApproved: overrides?.accessApproved ?? activeManagedProfile.accessApproved,
          allowedTabs: overrides?.allowedTabs ?? activeManagedProfile.allowedTabs,
        },
        safeRole,
        existingCreatedAtRef.current
      );

      await setDoc(doc(db, 'users', user.uid), payload);
      setLastSyncedAt(new Date().toLocaleTimeString('vi-VN'));
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.WRITE, userPath);
      } catch (structuredErr) {
        setAuthError(error instanceof Error ? error.message : String(structuredErr));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // Listen to Firebase Auth state & subscribe to Firestore
  useEffect(() => {
    let unsubProfile: (() => void) | null = null;
    let unsubHistory: (() => void) | null = null;
    let unsubAllUsers: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);

      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }
      if (unsubHistory) {
        unsubHistory();
        unsubHistory = null;
      }
      if (unsubAllUsers) {
        unsubAllUsers();
        unsubAllUsers = null;
      }

      if (!user) {
        existingCreatedAtRef.current = null;
        return;
      }

      if (user.email) {
        setActiveAccountEmail(user.email.trim().toLowerCase());
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userPath = `users/${user.uid}`;

      try {
        const snap = await getDoc(userDocRef);
        if (!snap.exists()) {
          const initialRole: UserRole = isUserBootstrappedAdmin(user.email) ? 'admin' : 'student';
          const initialName = user.displayName || user.email?.split('@')[0] || 'Học viên LinguaFlow';
          await syncUserProfileToFirestore(user, {
            displayName: initialName,
            role: initialRole,
            accessApproved: initialRole === 'admin',
            allowedTabs: initialRole === 'admin' ? ['path', ...ALL_GATED_TABS, 'admin'] : ['path'],
          });
        } else {
          const data = snap.data();
          existingCreatedAtRef.current = data.createdAt;
        }
      } catch (err) {
        try {
          handleFirestoreError(err, OperationType.GET, userPath);
        } catch {
          // logged
        }
      }

      unsubProfile = onSnapshot(
        userDocRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            existingCreatedAtRef.current = data.createdAt;
            isApplyingRemoteSnapshotRef.current = true;

            if (typeof data.xp === 'number') setXp(data.xp);
            if (typeof data.dailyXpGoal === 'number') setDailyXpGoal(data.dailyXpGoal);
            if (typeof data.todayXp === 'number') setTodayXp(data.todayXp);
            if (typeof data.streak === 'number') setStreak(data.streak);
            if (typeof data.examsCompleted === 'number') setExamsCompleted(data.examsCompleted);
            if (typeof data.bonusWordsMastered === 'number') setBonusWordsMastered(data.bonusWordsMastered);
            if (data.selectedLanguageId && LANGUAGE_COURSES[data.selectedLanguageId]) {
              setSelectedLanguageId(data.selectedLanguageId);
            }
            if (Array.isArray(data.completedLessonIds)) {
              setCompletedLessonIds(data.completedLessonIds);
            }
            const decoded = decodePermissionsFromUserDoc(data);
            if (decoded.cleanAchievementIds.length > 0) {
              setUnlockedAchievementIds(decoded.cleanAchievementIds);
            }

            setManagedUsers((prev) => {
              const exists = prev.some(
                (u) => u.email.toLowerCase() === (data.email || '').toLowerCase()
              );
              const updatedDoc: UserProfileDoc = {
                ...(data as UserProfileDoc),
                role: isMasterAdminEmail(data.email) ? 'admin' : 'student',
                accessApproved: decoded.accessApproved,
                allowedTabs: decoded.allowedTabs,
                accessRequestStatus: decoded.accessRequestStatus,
              };
              if (exists) {
                return prev.map((u) =>
                  u.email.toLowerCase() === (data.email || '').toLowerCase() ? updatedDoc : u
                );
              }
              return [updatedDoc, ...prev];
            });

            setLastSyncedAt(new Date().toLocaleTimeString('vi-VN'));
            setTimeout(() => {
              isApplyingRemoteSnapshotRef.current = false;
            }, 150);
          }
        },
        (err) => {
          try {
            handleFirestoreError(err, OperationType.GET, userPath);
          } catch {
            // logged
          }
        }
      );

      if (isUserBootstrappedAdmin(user.email)) {
        const allUsersQuery = query(collection(db, 'users'), limit(50));
        unsubAllUsers = onSnapshot(
          allUsersQuery,
          (querySnap) => {
            const remoteUsers: UserProfileDoc[] = [];
            querySnap.forEach((d) => {
              const raw = d.data() as UserProfileDoc;
              const decoded = decodePermissionsFromUserDoc(raw);
              remoteUsers.push({
                ...raw,
                role: isMasterAdminEmail(raw.email) ? 'admin' : 'student',
                accessApproved: decoded.accessApproved,
                allowedTabs: decoded.allowedTabs,
                accessRequestStatus: decoded.accessRequestStatus,
              });
            });
            if (remoteUsers.length > 0) {
              setManagedUsers((prev) => {
                const remoteMap = new Map(remoteUsers.map((u) => [u.email.toLowerCase(), u]));
                const keptLocal = prev.filter((u) => !remoteMap.has(u.email.toLowerCase()));
                return [...remoteUsers, ...keptLocal];
              });
            }
          },
          (err) => {
            try {
              handleFirestoreError(err, OperationType.LIST, 'users');
            } catch {
              // logged
            }
          }
        );
      }

      const historyPath = `users/${user.uid}/examHistory`;
      const historyQuery = query(
        collection(db, 'users', user.uid, 'examHistory'),
        orderBy('createdAt', 'desc'),
        limit(25)
      );
      unsubHistory = onSnapshot(
        historyQuery,
        (querySnap) => {
          const records: ExamRecordDoc[] = [];
          querySnap.forEach((d) => {
            records.push(d.data() as ExamRecordDoc);
          });
          setExamHistory(records);
        },
        (err) => {
          try {
            handleFirestoreError(err, OperationType.LIST, historyPath);
          } catch {
            // logged
          }
        }
      );
    });

    return () => {
      unsubAuth();
      if (unsubProfile) unsubProfile();
      if (unsubHistory) unsubHistory();
      if (unsubAllUsers) unsubAllUsers();
    };
  }, []);

  // Automatically sync learning progress changes to Firestore when signed in
  useEffect(() => {
    if (!currentUser || isApplyingRemoteSnapshotRef.current) return;
    const timer = setTimeout(() => {
      syncUserProfileToFirestore(currentUser);
    }, 600);
    return () => clearTimeout(timer);
  }, [
    xp,
    dailyXpGoal,
    todayXp,
    streak,
    selectedLanguageId,
    completedLessonIds.length,
    unlockedAchievementIds.length,
    examsCompleted,
    bonusWordsMastered
  ]);

  const totalVocabCardsCount = Object.values(vocabCards).reduce((acc, list) => acc + list.length, 0);
  const totalMasteredWords = totalVocabCardsCount + bonusWordsMastered;

  const userStats: UserLearningStats = {
    streak,
    totalMasteredWords,
    examsCompleted,
    completedLessonsCount: completedLessonIds.length,
    xp
  };

  useEffect(() => {
    const newUnlocks = evaluatePendingAchievements(userStats, unlockedAchievementIds);
    if (newUnlocks.length > 0) {
      const newIds = newUnlocks.map(a => a.id);
      setUnlockedAchievementIds(prev => [...prev, ...newIds]);
      const bonusXp = newUnlocks.reduce((sum, a) => sum + a.xpReward, 0);
      setXp(prev => prev + bonusXp);
      setNewlyUnlockedQueue(prev => [...prev, ...newUnlocks]);
    }
  }, [streak, totalMasteredWords, examsCompleted, completedLessonIds.length, xp]);

  const handleGainXp = (amount: number) => {
    setXp(prev => prev + amount);
    setTodayXp(prev => {
      const next = prev + amount;
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('linguaflow_today_date', today);
      localStorage.setItem('linguaflow_today_xp', next.toString());
      return next;
    });
    const today = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem('linguaflow_last_date');
    const { newStreak } = calculateStreak(lastDate, today, streak);
    setStreak(newStreak);
    localStorage.setItem('linguaflow_last_date', today);
  };

  const handleSetDailyGoal = (newGoal: number) => {
    setDailyXpGoal(newGoal);
    localStorage.setItem('linguaflow_daily_goal', newGoal.toString());
  };

  const handleCompleteLesson = (earnedXp: number) => {
    if (activeLesson) {
      if (!completedLessonIds.includes(activeLesson.id)) {
        setCompletedLessonIds([...completedLessonIds, activeLesson.id]);
      }
      handleGainXp(earnedXp);
    }
  };

  const handleExamCompleted = async () => {
    setExamsCompleted(prev => prev + 1);
    const examName = currentCourse.examInfo?.[0]?.examName || 'IELTS Academic';
    const sampleRecord = {
      examTitle: `${examName} Official Practice Test`,
      overallBand: 7.5,
      listeningScore: 35,
      readingScore: 34,
      writingWords: 430
    };
    if (currentUser) {
      await saveExamRecordToFirestore(currentUser.uid, sampleRecord);
    } else {
      const localRecord: ExamRecordDoc = {
        examId: `exam_${Date.now()}`,
        userId: activeManagedProfile.uid,
        ...sampleRecord
      };
      setExamHistory(prev => [localRecord, ...prev]);
    }
  };

  const handleAddSampleExamRecord = async () => {
    const newCount = examsCompleted + 1;
    setExamsCompleted(newCount);
    const recordData = {
      examTitle: `IELTS Academic Full Simulator #${newCount} (80 Câu chuẩn)`,
      overallBand: 8.0,
      listeningScore: 36,
      readingScore: 35,
      writingWords: 445
    };
    if (currentUser) {
      await saveExamRecordToFirestore(currentUser.uid, recordData);
      await syncUserProfileToFirestore(currentUser, { examsCompleted: newCount });
    } else {
      const localRecord: ExamRecordDoc = {
        examId: `exam_${Date.now()}`,
        userId: activeManagedProfile.uid,
        ...recordData
      };
      setExamHistory(prev => [localRecord, ...prev]);
    }
  };

  const handleDeleteExamRecord = async (examId: string) => {
    if (currentUser) {
      const path = `users/${currentUser.uid}/examHistory/${examId}`;
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'examHistory', examId));
      } catch (err) {
        try {
          handleFirestoreError(err, OperationType.DELETE, path);
        } catch (structuredErr) {
          setAuthError(err instanceof Error ? err.message : String(structuredErr));
        }
      }
    } else {
      setExamHistory(prev => prev.filter(item => item.examId !== examId));
    }
  };

  const handleUpdatePreferences = async (newPrefs: Partial<UserPreferences>) => {
    const safeRole: UserRole = isMasterAdminEmail(effectiveEmail) ? 'admin' : 'student';
    const merged: UserPreferences = {
      ...preferences,
      ...newPrefs,
      role: safeRole,
    };
    setPreferences(merged);
    if (currentUser) {
      await syncUserProfileToFirestore(currentUser, merged);
    }
  };

  // =========================================================================
  // PUBLIC REGISTRATION, LOGIN & ADMIN PERMISSION CONTROL HANDLERS
  // =========================================================================

  const handleRegisterPublicUser = async (params: {
    displayName: string;
    email: string;
    password: string;
    selectedLanguageId: string;
  }) => {
    const cleanEmail = params.email.trim().toLowerCase();
    const todayStr = new Date().toISOString().split('T')[0];

    // Check if email already registered
    const existing = managedUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('Email này đã được đăng ký. Vui lòng chuyển sang tab Đăng nhập!');
    }

    const newUid = `user_${cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9_-]/g, '')}_${Date.now().toString(36)}`;
    const newProfile: UserProfileDoc = {
      uid: newUid,
      email: cleanEmail,
      displayName: params.displayName.trim(),
      photoURL: '',
      role: 'student', // All non-admin accounts are strictly 'student' (User)
      selectedLanguageId: params.selectedLanguageId || 'english',
      xp: 100,
      dailyXpGoal: 50,
      todayXp: 10,
      todayDate: todayStr,
      streak: 1,
      lastActiveDate: todayStr,
      examsCompleted: 0,
      bonusWordsMastered: 0,
      targetBand: 'Band 7.0',
      voiceSpeed: 1.0,
      soundEnabled: true,
      completedLessonIds: ['en-l1'],
      unlockedAchievementIds: encodePermissionsIntoAchievementIds(
        ['first-lesson'],
        false,
        ['path'],
        'none'
      ),
      accessApproved: false,
      allowedTabs: ['path'],
      accessRequestStatus: 'none',
    };

    setManagedUsers((prev) => [newProfile, ...prev]);
    setActiveAccountEmail(cleanEmail);
    setSelectedLanguageId(params.selectedLanguageId || 'english');
    setActiveTab('path');

    // Also try registering in Firebase Auth if Email/Password provider is enabled
    try {
      await registerUserWithEmailPassword(cleanEmail, params.password, params.displayName);
    } catch {
      // Fallback to local + Firestore managed directory seamlessly if Email/Password provider is disabled in Firebase Console
    }
  };

  const handleLoginPublicUser = async (params: { email: string; password: string }) => {
    const cleanEmail = params.email.trim().toLowerCase();
    const isOwner = isMasterAdminEmail(cleanEmail);

    const existing = managedUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!existing && !isOwner) {
      // Auto-provision as a restricted User if logging in with a new email
      const todayStr = new Date().toISOString().split('T')[0];
      const newProfile: UserProfileDoc = {
        uid: `user_${cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9_-]/g, '')}_${Date.now().toString(36)}`,
        email: cleanEmail,
        displayName: cleanEmail.split('@')[0],
        photoURL: '',
        role: 'student',
        selectedLanguageId,
        xp: 120,
        dailyXpGoal: 50,
        todayXp: 20,
        todayDate: todayStr,
        streak: 1,
        lastActiveDate: todayStr,
        examsCompleted: 0,
        bonusWordsMastered: 0,
        targetBand: 'Band 7.0',
        voiceSpeed: 1.0,
        soundEnabled: true,
        completedLessonIds: ['en-l1'],
        unlockedAchievementIds: encodePermissionsIntoAchievementIds(
          ['first-lesson'],
          false,
          ['path'],
          'none'
        ),
        accessApproved: false,
        allowedTabs: ['path'],
        accessRequestStatus: 'none',
      };
      setManagedUsers((prev) => [newProfile, ...prev]);
    }

    setActiveAccountEmail(cleanEmail);
    if (!isOwner) {
      setActiveTab('path');
    }

    try {
      await loginUserWithEmailPassword(cleanEmail, params.password);
    } catch {
      // Seamless session activation
    }
  };

  const handleQuickSwitchAccount = (targetEmail: string) => {
    const clean = targetEmail.trim().toLowerCase();
    setActiveAccountEmail(clean);
    if (!isMasterAdminEmail(clean)) {
      const targetUser = managedUsers.find((u) => u.email.toLowerCase() === clean);
      const allowed = canUserAccessTab(
        {
          email: clean,
          accessApproved: targetUser?.accessApproved,
          allowedTabs: targetUser?.allowedTabs,
        },
        activeTab
      );
      if (!allowed) {
        setActiveTab('path');
      }
    }
  };

  const handleSubmitAccessRequest = (requestedTabs: GatedModuleTab[], note: string) => {
    setManagedUsers((prev) =>
      prev.map((u) => {
        if (u.email.toLowerCase() !== activeManagedProfile.email.toLowerCase()) return u;
        return submitUserAccessRequest(u, requestedTabs, note);
      })
    );
  };

  const handleApproveUserFullAccess = async (targetUid: string) => {
    const targetMember = managedUsers.find((u) => u.uid === targetUid);
    if (!targetMember) return;
    const updated = grantFullAccessToUser(targetMember);

    setManagedUsers((prev) => prev.map((u) => (u.uid === targetUid ? updated : u)));

    if (currentUser && isUserBootstrappedAdmin(currentUser.email)) {
      try {
        await assignRoleToUserInFirestore(updated, 'student');
      } catch {
        // synced locally
      }
    }
  };

  const handleRevokeUserToRoadmapOnly = async (targetUid: string) => {
    const targetMember = managedUsers.find((u) => u.uid === targetUid);
    if (!targetMember || isMasterAdminEmail(targetMember.email)) return;
    const updated = revokeUserToRoadmapOnly(targetMember);

    setManagedUsers((prev) => prev.map((u) => (u.uid === targetUid ? updated : u)));

    if (currentUser && isUserBootstrappedAdmin(currentUser.email)) {
      try {
        await assignRoleToUserInFirestore(updated, 'student');
      } catch {
        // synced locally
      }
    }
  };

  const handleToggleUserTabPermission = async (targetUid: string, tabId: GatedModuleTab) => {
    const targetMember = managedUsers.find((u) => u.uid === targetUid);
    if (!targetMember || isMasterAdminEmail(targetMember.email)) return;
    const updated = toggleUserModulePermission(targetMember, tabId);

    setManagedUsers((prev) => prev.map((u) => (u.uid === targetUid ? updated : u)));

    if (currentUser && isUserBootstrappedAdmin(currentUser.email)) {
      try {
        await assignRoleToUserInFirestore(updated, 'student');
      } catch {
        // synced locally
      }
    }
  };

  const handleCreateNewUserByAdmin = async (params: {
    email: string;
    displayName: string;
    grantFullAccessInitially: boolean;
  }) => {
    const created = await createManagedUserInFirestore({
      email: params.email,
      displayName: params.displayName,
      role: 'student',
      accessApproved: params.grantFullAccessInitially,
      allowedTabs: params.grantFullAccessInitially
        ? ['path', ...ALL_GATED_TABS]
        : ['path'],
    });
    setManagedUsers((prev) => [created, ...prev]);
  };

  const handleAssignRoleToOtherUser = async (targetUid: string, newRole: UserRole) => {
    if (newRole === 'admin') {
      // Strictly keep only daigia170904@gmail.com as Admin; for other users, 'admin' / 'teacher' grants full module access as User
      await handleApproveUserFullAccess(targetUid);
    } else if (newRole === 'teacher') {
      await handleApproveUserFullAccess(targetUid);
    } else {
      await handleRevokeUserToRoadmapOnly(targetUid);
    }
  };

  const handleAddManagedUser = async (email: string, displayName: string, role: UserRole) => {
    await handleCreateNewUserByAdmin({
      email,
      displayName,
      grantFullAccessInitially: role !== 'student',
    });
  };

  const handleRemoveManagedUser = async (targetUid: string) => {
    setManagedUsers((prev) => prev.filter((u) => u.uid !== targetUid));
    if (currentUser && isUserBootstrappedAdmin(currentUser.email)) {
      try {
        await deleteManagedUserFromFirestore(targetUid);
      } catch (err) {
        setAuthError(err instanceof Error ? err.message : String(err));
      }
    }
  };

  const handleSignInGoogle = async () => {
    setAuthError(null);
    setIsAuthLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user.email) {
        setActiveAccountEmail(user.email.trim().toLowerCase());
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setAuthError(`Đăng nhập Google chưa hoàn tất: ${msg}`);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    setIsAuthLoading(true);
    try {
      await signOutUser();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setAuthError(`Lỗi đăng xuất: ${msg}`);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleForceSyncNow = async () => {
    if (currentUser) {
      await syncUserProfileToFirestore(currentUser);
    } else {
      setLastSyncedAt(`${new Date().toLocaleTimeString('vi-VN')} (Bộ nhớ trình duyệt)`);
    }
  };

  const handleSimulateMilestone = (milestoneType: 'streak-10' | 'words-1000' | 'first-ielts-exam') => {
    if (milestoneType === 'streak-10') {
      setStreak(prev => Math.max(prev, 10));
    } else if (milestoneType === 'words-1000') {
      setBonusWordsMastered(prev => Math.max(prev, 1000));
    } else if (milestoneType === 'first-ielts-exam') {
      setExamsCompleted(prev => Math.max(prev, 1));
    }
  };

  const handleUpdateCard = (updated: VocabCard) => {
    const list = vocabCards[selectedLanguageId] || currentCourse.vocabCards;
    const nextList = list.map(c => c.id === updated.id ? updated : c);
    setVocabCards({
      ...vocabCards,
      [selectedLanguageId]: nextList,
    });
  };

  const handleAddCard = (newCard: VocabCard) => {
    const list = vocabCards[selectedLanguageId] || currentCourse.vocabCards;
    setVocabCards({
      ...vocabCards,
      [selectedLanguageId]: [newCard, ...list],
    });
    handleGainXp(15);
  };

  const activeCards = vocabCards[selectedLanguageId] || currentCourse.vocabCards;

  const todayDueCardsCount = useMemo(() => {
    return countDueCards(activeCards);
  }, [activeCards]);

  const handleNavigateToVocabReview = () => {
    setAutoStartVocabReview(true);
    handleGatedTabChange('vault');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar with Public Portal Status, Auth Buttons & Locked Tab Indicators */}
      <TopNav
        activeTab={activeTab}
        onTabChange={handleGatedTabChange}
        currentLanguage={currentCourse}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        streak={streak}
        xp={xp}
        dailyXpGoal={dailyXpGoal}
        todayXp={todayXp}
        onSetDailyGoal={handleSetDailyGoal}
        onGainXp={handleGainXp}
        unlockedAchievementsCount={unlockedAchievementIds.length}
        totalAchievementsCount={ACHIEVEMENTS_REGISTRY.length}
        onOpenAchievements={() => setIsAchievementsModalOpen(true)}
        currentUser={currentUser}
        userDisplayName={activeManagedProfile.displayName}
        userEmail={activeManagedProfile.email}
        userRole={activeManagedProfile.role}
        accessApproved={activeManagedProfile.accessApproved}
        allowedTabs={activeManagedProfile.allowedTabs}
        pendingRequestsCount={pendingAccessRequestsCount}
        todayReviewCount={todayDueCardsCount}
        onNavigateToVocabReview={handleNavigateToVocabReview}
        onOpenUserProfile={() => setIsUserProfileModalOpen(true)}
        onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
        onOpenPublicAuthModal={(mode) => {
          setPublicAuthInitialMode(mode);
          setIsPublicAuthModalOpen(true);
        }}
        onOpenRequestAccessModal={() => {
          setLockedGateModalTab('video');
          setIsAccessGateOpen(true);
        }}
        onQuickSwitchAccount={handleQuickSwitchAccount}
      />

      {/* Main Content Viewport with Fluid Page & Language Choreography */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${selectedLanguageId}`}
            variants={PAGE_TRANSITION_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.28, ease: FLUID_EASE_OUT }}
          >
            {activeTab === 'path' && (
              <PathView
                course={currentCourse}
                selectedLanguageId={selectedLanguageId}
                onSelectLanguage={setSelectedLanguageId}
                completedLessonIds={completedLessonIds}
                onStartLesson={(lesson) => setActiveLesson(lesson)}
                onNavigateToTab={(tab) => handleGatedTabChange(tab)}
                streak={streak}
                xp={xp}
                todayXp={todayXp}
                dailyXpGoal={dailyXpGoal}
                onGainXp={handleGainXp}
                managedUsers={managedUsers}
                userDisplayName={activeManagedProfile.displayName}
                userRole={activeManagedProfile.role}
                userTargetBand={activeManagedProfile.targetBand}
              />
            )}

            {activeTab === 'viphub' && (
              <VipOmniVerseView
                course={currentCourse}
                selectedLanguageId={selectedLanguageId}
                onSelectLanguage={setSelectedLanguageId}
                onGainXp={handleGainXp}
              />
            )}

            {activeTab === 'arena' && (
              <UltimateLearningArenaView
                course={currentCourse}
                selectedLanguageId={selectedLanguageId}
                onSelectLanguage={setSelectedLanguageId}
                userDisplayName={activeManagedProfile.displayName}
                userEmail={activeManagedProfile.email}
                xp={xp}
                streak={streak}
                completedLessonsCount={completedLessonIds.length}
                examsCompleted={examsCompleted}
                onGainXp={handleGainXp}
              />
            )}

            {activeTab === 'video' && (
              <AiVideoLearningView
                course={currentCourse}
                selectedLanguageId={selectedLanguageId}
                onSelectLanguage={setSelectedLanguageId}
                defaultVoiceSpeed={preferences.voiceSpeed}
                onGainXp={handleGainXp}
              />
            )}

            {activeTab === 'studio' && (
              <AiMasteryStudioView
                course={currentCourse}
                selectedLanguageId={selectedLanguageId}
                onSelectLanguage={setSelectedLanguageId}
                xp={xp}
                streak={streak}
                completedLessonsCount={completedLessonIds.length}
                examsCompleted={examsCompleted}
                onGainXp={handleGainXp}
                onNavigateToTab={(tab) => handleGatedTabChange(tab)}
              />
            )}

            {activeTab === 'academic' && (
              <AcademicExamView
                key={selectedLanguageId}
                course={currentCourse}
                selectedLanguageId={selectedLanguageId}
                onSelectLanguage={setSelectedLanguageId}
                onGainXp={handleGainXp}
                onExamCompleted={handleExamCompleted}
              />
            )}

            {activeTab === 'roleplay' && (
              <RoleplayView
                course={currentCourse}
                onGainXp={handleGainXp}
              />
            )}

            {activeTab === 'grammar' && (
              <GrammarLabView
                course={currentCourse}
              />
            )}

            {activeTab === 'vault' && (
              <VocabVaultView
                course={currentCourse}
                cards={activeCards}
                onUpdateCard={handleUpdateCard}
                onAddCard={handleAddCard}
                onGainXp={handleGainXp}
                autoStartReview={autoStartVocabReview}
              />
            )}

            {activeTab === 'culture' && (
              <CultureView
                course={currentCourse}
              />
            )}

            {activeTab === 'community' && (
              <PublicCommunityHubView
                managedUsers={managedUsers}
                currentUserEmail={activeManagedProfile.email}
                currentUserDisplayName={activeManagedProfile.displayName}
                selectedLanguageId={selectedLanguageId}
                onGainXp={handleGainXp}
              />
            )}

            {activeTab === 'admin' && isCurrentAccountAdmin && (
              <AdminPermissionCenterView
                currentAdminEmail={activeManagedProfile.email}
                managedUsers={managedUsers}
                onApproveUserFullAccess={handleApproveUserFullAccess}
                onRevokeUserToRoadmapOnly={handleRevokeUserToRoadmapOnly}
                onToggleUserTabPermission={handleToggleUserTabPermission}
                onCreateNewUserByAdmin={handleCreateNewUserByAdmin}
                onDeleteUserByAdmin={handleRemoveManagedUser}
                onPreviewAsUser={(email) => {
                  handleQuickSwitchAccount(email);
                  setActiveTab('path');
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Public Registration & Login Modal */}
      <PublicAuthModal
        isOpen={isPublicAuthModalOpen}
        initialTab={publicAuthInitialMode}
        onClose={() => setIsPublicAuthModalOpen(false)}
        activeAccountEmail={activeManagedProfile.email}
        activeAccountName={activeManagedProfile.displayName}
        isCurrentAccountAdmin={isCurrentAccountAdmin}
        isCurrentAccountApproved={unlockedGatedTabsForCurrentUser.length > 0}
        managedUsers={managedUsers}
        onRegisterPublicUser={handleRegisterPublicUser}
        onLoginPublicUser={handleLoginPublicUser}
        onSignInGoogle={handleSignInGoogle}
        onQuickSwitchAccount={handleQuickSwitchAccount}
        onLogoutAccount={() => handleQuickSwitchAccount('thuha.tran2004@gmail.com')}
      />

      {/* Locked Module Access Gate & Admin Permission Request Modal */}
      <AccessGateModal
        isOpen={isAccessGateOpen}
        lockedTab={lockedGateModalTab}
        onClose={() => setIsAccessGateOpen(false)}
        onBackToRoadmap={() => setActiveTab('path')}
        currentUserEmail={activeManagedProfile.email}
        currentUserDisplayName={activeManagedProfile.displayName}
        accessRequestStatus={activeManagedProfile.accessRequestStatus || 'none'}
        unlockedTabs={unlockedGatedTabsForCurrentUser}
        onSubmitAccessRequest={handleSubmitAccessRequest}
        onOpenAuthModal={(mode) => {
          setPublicAuthInitialMode(mode);
          setIsPublicAuthModalOpen(true);
        }}
        onSwitchToOwnerAdmin={() => {
          setIsAccessGateOpen(false);
          handleQuickSwitchAccount(MASTER_ADMIN_EMAIL);
          setActiveTab('admin');
        }}
      />

      {/* Language Switcher Modal */}
      <LanguageSelector
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        selectedLanguageId={selectedLanguageId}
        onSelectLanguage={setSelectedLanguageId}
      />

      {/* User Profile, Authentication, Settings, Admin RBAC Directory & Firestore Sync Modal */}
      <UserProfileModal
        isOpen={isUserProfileModalOpen}
        onClose={() => setIsUserProfileModalOpen(false)}
        currentUser={currentUser}
        isAuthLoading={isAuthLoading}
        isSyncing={isSyncing}
        lastSyncedAt={lastSyncedAt}
        authError={authError}
        preferences={preferences}
        onUpdatePreferences={handleUpdatePreferences}
        dailyXpGoal={dailyXpGoal}
        onSetDailyGoal={handleSetDailyGoal}
        onSignInGoogle={handleSignInGoogle}
        onSignOut={handleSignOut}
        onForceSyncNow={handleForceSyncNow}
        examHistory={examHistory}
        onAddSampleExamRecord={handleAddSampleExamRecord}
        onDeleteExamRecord={handleDeleteExamRecord}
        managedUsers={managedUsers}
        onAssignRoleToOtherUser={handleAssignRoleToOtherUser}
        onAddManagedUser={handleAddManagedUser}
        onRemoveManagedUser={handleRemoveManagedUser}
        statsSummary={{
          xp,
          streak,
          completedLessons: completedLessonIds.length,
          unlockedAchievements: unlockedAchievementIds.length,
          examsCompleted
        }}
      />

      {/* Interactive Lesson Modal */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          voiceLangCode={currentCourse.voiceLangCode}
          isOpen={Boolean(activeLesson)}
          onClose={() => setActiveLesson(null)}
          onCompleteLesson={handleCompleteLesson}
        />
      )}

      {/* Achievements Center Modal */}
      <AchievementsCenterModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        unlockedIds={unlockedAchievementIds}
        stats={userStats}
        onSimulateMilestone={handleSimulateMilestone}
      />

      {/* Newly Unlocked Achievement Celebration Modal with Visual Confetti */}
      {newlyUnlockedQueue.length > 0 && (
        <AchievementUnlockModal
          achievement={newlyUnlockedQueue[0]}
          onClose={() => setNewlyUnlockedQueue(prev => prev.slice(1))}
        />
      )}

      {/* Gamified Lucky Spin Wheel Modal */}
      <LuckySpinWheelModal
        isOpen={isLuckyWheelOpen}
        onClose={() => setIsLuckyWheelOpen(false)}
        onGainXp={handleGainXp}
        currentStreak={streak}
      />

      {/* Minimal Anti-slop Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-medium text-slate-700">
            LinguaFlow Public Portal <span aria-hidden="true">·</span> Admin duy nhất: {MASTER_ADMIN_EMAIL}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-500">
            <span>🇬🇧 Tiếng Anh</span>
            <span aria-hidden="true">·</span>
            <span>🇨🇳 Tiếng Trung</span>
            <span aria-hidden="true">·</span>
            <span>🇯🇵 Tiếng Nhật</span>
            <span aria-hidden="true">·</span>
            <span>🇰🇷 Tiếng Hàn</span>
            <span aria-hidden="true">·</span>
            <span>🇫🇷 Tiếng Pháp</span>
            <span aria-hidden="true">·</span>
            <span>🇩🇪 Tiếng Đức</span>
            <span aria-hidden="true">·</span>
            <span>🇪🇸 Tiếng Tây Ban Nha</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
