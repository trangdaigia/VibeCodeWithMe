export const MASTER_ADMIN_EMAIL = 'daigia170904@gmail.com';

export type PlatformTabId =
  | 'path'
  | 'viphub'
  | 'arena'
  | 'video'
  | 'studio'
  | 'academic'
  | 'roleplay'
  | 'grammar'
  | 'vault'
  | 'culture'
  | 'community'
  | 'admin';

export type GatedModuleTab =
  | 'viphub'
  | 'arena'
  | 'video'
  | 'studio'
  | 'academic'
  | 'roleplay'
  | 'grammar'
  | 'vault'
  | 'culture'
  | 'community';

export const ALL_GATED_TABS: GatedModuleTab[] = [
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
];

export interface ModulePermissionMeta {
  id: GatedModuleTab;
  title: string;
  shortTitle: string;
  description: string;
  badgeText: string;
}

export const MODULE_PERMISSION_REGISTRY: Record<GatedModuleTab, ModulePermissionMeta> = {
  viphub: {
    id: 'viphub',
    title: 'Siêu Vũ Trụ 3D WebGL, Sinh Học Thần Kinh FOXP2 & Đa Phương Tiện AI',
    shortTitle: 'Vũ Trụ 3D & AI',
    description:
      'Game 3D Phi thuyền Ngôn ngữ Three.js, Phòng thí nghiệm Protein Ngôn ngữ AlphaFold FOXP2/BDNF, Chatbot Đa mô hình kèm Google Search/Maps thực địa & Studio Ảnh/Video/Nhạc.',
    badgeText: 'VIP Omni-Verse',
  },
  arena: {
    id: 'arena',
    title: 'Đấu trường Phản xạ, Pomodoro & Chứng chỉ Quốc tế',
    shortTitle: 'Đấu trường AI',
    description: 'Đấu trường ghép câu tốc độ, phòng tập trung Deep Focus âm thanh không gian, Sổ tay lỗi sai Ebbinghaus & Cấp chứng chỉ CEFR.',
    badgeText: 'Siêu Đấu trường',
  },
  video: {
    id: 'video',
    title: 'Video AI Giảng viên Ảo (A1 → C2)',
    shortTitle: 'Video AI',
    description: 'Bài giảng trực quan với giảng viên AI người ảo, giọng đọc bản xứ và quiz tương tác.',
    badgeText: 'Học Video AI',
  },
  studio: {
    id: 'studio',
    title: 'Phòng Lab AI (Shadowing & Chấm Writing)',
    shortTitle: 'Phòng Lab AI',
    description: 'Phân tích phát âm từng âm vị và chấm bài luận học thuật CEFR/IELTS/HSK/JLPT/TOPIK.',
    badgeText: 'Lab Thực hành',
  },
  academic: {
    id: 'academic',
    title: 'Luyện thi Chứng chỉ Quốc tế (7 Ngôn ngữ)',
    shortTitle: 'Luyện thi',
    description: 'Kho đề thi thử IELTS, HSK, JLPT, TOPIK, DELF, Goethe, DELE có bấm giờ thực tế.',
    badgeText: 'Thi Chứng chỉ',
  },
  roleplay: {
    id: 'roleplay',
    title: 'Hội thoại AI Tình huống Thực tế',
    shortTitle: 'Hội thoại AI',
    description: 'Đóng vai giao tiếp phản xạ trong phỏng vấn, sân bay, nhà hàng, đàm phán thương mại.',
    badgeText: 'Phản xạ Nói',
  },
  grammar: {
    id: 'grammar',
    title: 'Phòng Thí nghiệm Soi Ngữ pháp Chuyên sâu',
    shortTitle: 'Soi Ngữ pháp',
    description: 'Mổ xẻ cấu trúc câu, phân tích thành phần ngữ pháp và cách dùng học thuật.',
    badgeText: 'Ngữ pháp',
  },
  vault: {
    id: 'vault',
    title: 'Kho Từ vựng SRS (Spaced Repetition)',
    shortTitle: 'Từ vựng',
    description: 'Hệ thống thẻ ghi nhớ thông minh lặp lại ngắt quãng giúp thuộc từ vựng lâu dài.',
    badgeText: 'Flashcard SRS',
  },
  culture: {
    id: 'culture',
    title: 'Khám phá Văn hóa & Bản sắc Bản xứ',
    shortTitle: 'Văn hóa',
    description: 'Tìm hiểu phong tục, thành ngữ, lịch sử và văn hóa ứng xử của 7 quốc gia.',
    badgeText: 'Văn hóa',
  },
  community: {
    id: 'community',
    title: 'Cộng đồng Học viên & Bảng Xếp hạng Public',
    shortTitle: 'Cộng đồng',
    description: 'Bảng vinh danh toàn cầu, diễn đàn trao đổi kinh nghiệm và thử thách hàng tuần.',
    badgeText: 'Cộng đồng',
  },
};

export type AccessRequestStatus = 'none' | 'pending' | 'approved' | 'revoked';

export interface AccessControlledUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'teacher' | 'admin';
  accessApproved?: boolean;
  allowedTabs?: PlatformTabId[];
  accessRequestStatus?: AccessRequestStatus;
  requestedTabs?: GatedModuleTab[];
  accessRequestNote?: string;
  accessRequestedAt?: string;
  unlockedAchievementIds?: string[];
}

/**
 * Strictly checks if an email belongs to the sole Master Admin (daigia170904@gmail.com).
 */
export function isMasterAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
}

/**
 * Resolves the effective system role: ONLY daigia170904@gmail.com is 'admin'.
 * Every other user account is strictly 'user'.
 */
export function resolveAccountRoleType(email?: string | null): 'admin' | 'user' {
  return isMasterAdminEmail(email) ? 'admin' : 'user';
}

/**
 * Determines whether a user can access a given navigation tab.
 * Rule:
 * 1. Master Admin (daigia170904@gmail.com) can access ALL tabs including 'admin'.
 * 2. Everyone (guests & standard users) can ALWAYS access 'path' (Lộ trình).
 * 3. Standard users can ONLY access other tabs ('video', 'studio', 'academic', 'roleplay', 'grammar', 'vault', 'culture', 'community')
 *    when explicitly granted permission by Admin (either accessApproved === true or tabId is in allowedTabs).
 * 4. Standard users can NEVER access 'admin'.
 */
export function canUserAccessTab(
  user: {
    email?: string | null;
    accessApproved?: boolean;
    allowedTabs?: string[];
  } | null | undefined,
  tabId: PlatformTabId
): boolean {
  if (tabId === 'path') {
    return true;
  }

  const isAdmin = isMasterAdminEmail(user?.email);

  if (tabId === 'admin') {
    return isAdmin;
  }

  if (isAdmin) {
    return true;
  }

  if (!user) {
    return false;
  }

  if (user.accessApproved === true) {
    return true;
  }

  if (Array.isArray(user.allowedTabs) && user.allowedTabs.includes(tabId)) {
    return true;
  }

  return false;
}

/**
 * Returns the list of unlocked gated tabs for a user.
 */
export function getUnlockedGatedTabs(user: {
  email?: string | null;
  accessApproved?: boolean;
  allowedTabs?: string[];
} | null | undefined): GatedModuleTab[] {
  if (isMasterAdminEmail(user?.email) || user?.accessApproved === true) {
    return [...ALL_GATED_TABS];
  }
  if (!user || !Array.isArray(user.allowedTabs)) {
    return [];
  }
  return ALL_GATED_TABS.filter((tab) => user.allowedTabs!.includes(tab));
}

/**
 * Encodes granular permission flags into unlockedAchievementIds array so that Firestore documents
 * strictly governed by existing security rules retain permission states without schema conflicts.
 */
export function encodePermissionsIntoAchievementIds(
  baseAchievementIds: string[],
  accessApproved: boolean,
  allowedTabs: PlatformTabId[],
  accessRequestStatus: AccessRequestStatus = 'none'
): string[] {
  const cleanAchievements = (baseAchievementIds || []).filter(
    (id) => !id.startsWith('perm:')
  );

  const permTokens: string[] = [];
  if (accessApproved) {
    permTokens.push('perm:approved');
  }
  if (accessRequestStatus && accessRequestStatus !== 'none') {
    permTokens.push(`perm:status:${accessRequestStatus}`);
  }
  for (const tab of ALL_GATED_TABS) {
    if (accessApproved || allowedTabs.includes(tab)) {
      permTokens.push(`perm:tab:${tab}`);
    }
  }

  return [...cleanAchievements, ...permTokens].slice(0, 50);
}

/**
 * Decodes permission state from a user document (supporting both explicit fields and encoded tokens).
 */
export function decodePermissionsFromUserDoc(doc: {
  email?: string | null;
  role?: string;
  accessApproved?: boolean;
  allowedTabs?: PlatformTabId[];
  accessRequestStatus?: AccessRequestStatus;
  unlockedAchievementIds?: string[];
}): {
  accessApproved: boolean;
  allowedTabs: PlatformTabId[];
  accessRequestStatus: AccessRequestStatus;
  cleanAchievementIds: string[];
} {
  if (isMasterAdminEmail(doc.email)) {
    const clean = (doc.unlockedAchievementIds || []).filter((id) => !id.startsWith('perm:'));
    return {
      accessApproved: true,
      allowedTabs: ['path', ...ALL_GATED_TABS, 'admin'],
      accessRequestStatus: 'approved',
      cleanAchievementIds: clean,
    };
  }

  const rawAchievements = Array.isArray(doc.unlockedAchievementIds)
    ? doc.unlockedAchievementIds
    : [];
  const permTokens = rawAchievements.filter((id) => id.startsWith('perm:'));
  const cleanAchievementIds = rawAchievements.filter((id) => !id.startsWith('perm:'));

  const hasEncodedApproved = permTokens.includes('perm:approved');
  const encodedTabs = permTokens
    .filter((t) => t.startsWith('perm:tab:'))
    .map((t) => t.replace('perm:tab:', '') as GatedModuleTab)
    .filter((t) => ALL_GATED_TABS.includes(t));

  const statusToken = permTokens.find((t) => t.startsWith('perm:status:'));
  const encodedStatus = statusToken
    ? (statusToken.replace('perm:status:', '') as AccessRequestStatus)
    : undefined;

  const accessApproved =
    typeof doc.accessApproved === 'boolean' ? doc.accessApproved : hasEncodedApproved;

  let allowedTabs: PlatformTabId[] = ['path'];
  if (accessApproved) {
    allowedTabs = ['path', ...ALL_GATED_TABS];
  } else if (Array.isArray(doc.allowedTabs) && doc.allowedTabs.length > 0) {
    const validGated = doc.allowedTabs.filter((t): t is GatedModuleTab =>
      ALL_GATED_TABS.includes(t as GatedModuleTab)
    );
    allowedTabs = ['path', ...Array.from(new Set(validGated))];
  } else if (encodedTabs.length > 0) {
    allowedTabs = ['path', ...Array.from(new Set(encodedTabs))];
  }

  const accessRequestStatus: AccessRequestStatus =
    doc.accessRequestStatus ||
    encodedStatus ||
    (accessApproved ? 'approved' : 'none');

  return {
    accessApproved,
    allowedTabs,
    accessRequestStatus,
    cleanAchievementIds,
  };
}

/**
 * Grants full access to all platform tabs for a user (Admin action).
 */
export function grantFullAccessToUser<T extends AccessControlledUser>(user: T): T {
  const allowedTabs: PlatformTabId[] = ['path', ...ALL_GATED_TABS];
  const unlockedAchievementIds = encodePermissionsIntoAchievementIds(
    user.unlockedAchievementIds || ['first-lesson'],
    true,
    allowedTabs,
    'approved'
  );
  return {
    ...user,
    role: isMasterAdminEmail(user.email) ? 'admin' : 'student',
    accessApproved: true,
    allowedTabs,
    accessRequestStatus: 'approved',
    unlockedAchievementIds,
  };
}

/**
 * Revokes a user's access back to the default Roadmap-Only state (Admin action).
 */
export function revokeUserToRoadmapOnly<T extends AccessControlledUser>(user: T): T {
  if (isMasterAdminEmail(user.email)) {
    return user; // Never revoke the Master Admin
  }
  const allowedTabs: PlatformTabId[] = ['path'];
  const unlockedAchievementIds = encodePermissionsIntoAchievementIds(
    user.unlockedAchievementIds || ['first-lesson'],
    false,
    allowedTabs,
    'revoked'
  );
  return {
    ...user,
    role: 'student',
    accessApproved: false,
    allowedTabs,
    accessRequestStatus: 'revoked',
    unlockedAchievementIds,
  };
}

/**
 * Toggles a specific module tab permission for a user (Admin action).
 */
export function toggleUserModulePermission<T extends AccessControlledUser>(
  user: T,
  tabId: GatedModuleTab
): T {
  if (isMasterAdminEmail(user.email)) {
    return user;
  }

  const currentUnlocked = getUnlockedGatedTabs(user);
  const isCurrentlyAllowed = currentUnlocked.includes(tabId);
  const nextGated = isCurrentlyAllowed
    ? currentUnlocked.filter((t) => t !== tabId)
    : [...currentUnlocked, tabId];

  const allGranted = ALL_GATED_TABS.every((t) => nextGated.includes(t));
  const allowedTabs: PlatformTabId[] = ['path', ...nextGated];
  const nextStatus: AccessRequestStatus =
    nextGated.length > 0 ? 'approved' : 'none';

  const unlockedAchievementIds = encodePermissionsIntoAchievementIds(
    user.unlockedAchievementIds || ['first-lesson'],
    allGranted,
    allowedTabs,
    nextStatus
  );

  return {
    ...user,
    role: 'student',
    accessApproved: allGranted,
    allowedTabs,
    accessRequestStatus: nextStatus,
    unlockedAchievementIds,
  };
}

/**
 * Submits an access request from a standard user to the Master Admin.
 */
export function submitUserAccessRequest<T extends AccessControlledUser>(
  user: T,
  requestedTabs: GatedModuleTab[],
  note: string
): T {
  const cleanTabs =
    requestedTabs.length > 0 ? requestedTabs : [...ALL_GATED_TABS];
  const currentAllowed = user.allowedTabs || ['path'];
  const unlockedAchievementIds = encodePermissionsIntoAchievementIds(
    user.unlockedAchievementIds || ['first-lesson'],
    Boolean(user.accessApproved),
    currentAllowed,
    'pending'
  );

  return {
    ...user,
    accessRequestStatus: 'pending',
    requestedTabs: cleanTabs,
    accessRequestNote: note.trim() || 'Mong Admin cấp phép mở khóa các hạng mục học tập nâng cao.',
    accessRequestedAt: new Date().toLocaleString('vi-VN'),
    unlockedAchievementIds,
  };
}

export interface RegistrationValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates public user registration input.
 */
export function validatePublicRegistration(input: {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): RegistrationValidationResult {
  const name = input.displayName.trim();
  const email = input.email.trim().toLowerCase();

  if (name.length < 2) {
    return { valid: false, error: 'Vui lòng nhập họ và tên tối thiểu 2 ký tự.' };
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    return { valid: false, error: 'Vui lòng nhập địa chỉ Email hợp lệ.' };
  }
  if (isMasterAdminEmail(email)) {
    return {
      valid: false,
      error: `Email ${MASTER_ADMIN_EMAIL} là tài khoản Quản trị viên tối cao (Admin). Vui lòng chuyển sang tab Đăng nhập!`,
    };
  }
  if (!input.password || input.password.length < 6) {
    return { valid: false, error: 'Mật khẩu phải có ít nhất 6 ký tự.' };
  }
  if (input.password !== input.confirmPassword) {
    return { valid: false, error: 'Mật khẩu xác nhận không khớp.' };
  }

  return { valid: true };
}
