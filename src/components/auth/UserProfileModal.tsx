import React, { useState, useEffect } from 'react';
import {
  X,
  User as UserIcon,
  Shield,
  Database,
  LogOut,
  LogIn,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  Target,
  Award,
  Cloud,
  RefreshCw,
  Trash2,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Lock,
  Unlock,
  Crown,
  GraduationCap,
  BookOpen,
  Settings,
  FileText,
  Users,
  UserPlus,
  Search
} from 'lucide-react';
import {
  User,
  UserRole,
  UserProfileDoc,
  ExamRecordDoc,
  BOOTSTRAPPED_ADMIN_EMAIL,
  isUserBootstrappedAdmin
} from '../../firebase';

export interface UserPreferences {
  displayName: string;
  targetBand: string;
  voiceSpeed: number;
  soundEnabled: boolean;
  role: UserRole;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  isAuthLoading: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  authError: string | null;
  preferences: UserPreferences;
  onUpdatePreferences: (newPrefs: Partial<UserPreferences>) => Promise<void>;
  dailyXpGoal: number;
  onSetDailyGoal: (goal: number) => void;
  onSignInGoogle: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onForceSyncNow: () => Promise<void>;
  examHistory: ExamRecordDoc[];
  onAddSampleExamRecord: () => Promise<void>;
  onDeleteExamRecord: (examId: string) => Promise<void>;
  managedUsers: UserProfileDoc[];
  onAssignRoleToOtherUser: (targetUid: string, newRole: UserRole) => Promise<void>;
  onAddManagedUser: (email: string, displayName: string, role: UserRole) => Promise<void>;
  onRemoveManagedUser: (targetUid: string) => Promise<void>;
  statsSummary: {
    xp: number;
    streak: number;
    completedLessons: number;
    unlockedAchievements: number;
    examsCompleted: number;
  };
}

export const ROLE_METADATA: Record<
  UserRole,
  {
    label: string;
    vietnameseTitle: string;
    shortLabel: string;
    badgeBg: string;
    badgeText: string;
    borderColor: string;
    description: string;
    permissions: string[];
  }
> = {
  student: {
    label: 'STUDENT',
    vietnameseTitle: 'Học viên (Student)',
    shortLabel: 'Học viên',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-800',
    borderColor: 'border-sky-300',
    description: 'Quyền truy cập tiêu chuẩn dành cho người học ngôn ngữ và luyện thi chứng chỉ.',
    permissions: [
      'Học lộ trình 7 ngôn ngữ & Kho từ vựng SRS',
      'Thi thử IELTS 80 câu (Listening, Reading, Writing, Speaking)',
      'Lưu tiến độ XP, chuỗi ngày (Streak) & Huy hiệu cá nhân lên Cloud',
      'Xem lịch sử bài thi thử của bản thân'
    ]
  },
  teacher: {
    label: 'TEACHER',
    vietnameseTitle: 'Giảng viên (Teacher)',
    shortLabel: 'Giảng viên',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    borderColor: 'border-purple-300',
    description: 'Quyền mở rộng dành cho giáo viên hướng dẫn, chấm bài và theo dõi tiến độ học viên.',
    permissions: [
      'Toàn bộ quyền của Học viên (Student)',
      'Xem hồ sơ năng lực & lịch sử thi của các học viên trong lớp',
      'Mở khóa kho bài mẫu Band 8.0+ & Tiêu chí chấm điểm Giám khảo',
      'Đánh giá và xuất báo cáo phân tích lỗi ngữ pháp chuyên sâu'
    ]
  },
  admin: {
    label: 'ADMIN',
    vietnameseTitle: 'Quản trị viên (Admin)',
    shortLabel: 'Quản trị viên',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    borderColor: 'border-amber-400',
    description: 'Quyền quản trị cao nhất: trực tiếp cấp quyền và phân quyền cho mọi người dùng khác trong hệ thống.',
    permissions: [
      'Toàn bộ quyền của Giảng viên (Teacher) & Học viên (Student)',
      'Cấp quyền và thay đổi vai trò cho người dùng khác (Student / Teacher / Admin)',
      'Thêm thành viên mới theo Email & quản lý danh sách người dùng trên Cloud Firestore',
      'Kích hoạt chế độ kiểm thử cột mốc & quản trị toàn bộ kho đề thi'
    ]
  }
};

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  isAuthLoading,
  isSyncing,
  lastSyncedAt,
  authError,
  preferences,
  onUpdatePreferences,
  dailyXpGoal,
  onSetDailyGoal,
  onSignInGoogle,
  onSignOut,
  onForceSyncNow,
  examHistory,
  onAddSampleExamRecord,
  onDeleteExamRecord,
  managedUsers,
  onAssignRoleToOtherUser,
  onAddManagedUser,
  onRemoveManagedUser,
  statsSummary
}) => {
  const [activeSection, setActiveSection] = useState<'rbac' | 'settings' | 'database'>('rbac');
  const [nameInput, setNameInput] = useState(preferences.displayName);
  const [targetBandInput, setTargetBandInput] = useState(preferences.targetBand);
  const [voiceSpeedInput, setVoiceSpeedInput] = useState(preferences.voiceSpeed);
  const [soundEnabledInput, setSoundEnabledInput] = useState(preferences.soundEnabled);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Admin User Management State
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<UserRole>('teacher');

  useEffect(() => {
    setNameInput(preferences.displayName);
    setTargetBandInput(preferences.targetBand);
    setVoiceSpeedInput(preferences.voiceSpeed);
    setSoundEnabledInput(preferences.soundEnabled);
  }, [preferences, isOpen]);

  if (!isOpen) return null;

  const isBootstrappedAdmin = isUserBootstrappedAdmin(currentUser?.email);
  const isCurrentUserAdmin = isBootstrappedAdmin || preferences.role === 'admin';
  const currentRoleInfo = ROLE_METADATA[preferences.role] || ROLE_METADATA.admin;

  const showToast = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdatePreferences({
      displayName: nameInput.trim() || 'Quản trị viên LinguaFlow',
      targetBand: targetBandInput,
      voiceSpeed: voiceSpeedInput,
      soundEnabled: soundEnabledInput
    });
    showToast(
      `Đã lưu cài đặt cá nhân${currentUser ? ' và đồng bộ trực tiếp lên Cloud Firestore!' : ' vào bộ nhớ thiết bị!'}`
    );
  };

  const handleRoleChangeForMember = async (member: UserProfileDoc, newRole: UserRole) => {
    await onAssignRoleToOtherUser(member.uid, newRole);
    showToast(`Đã phân quyền "${ROLE_METADATA[newRole].vietnameseTitle}" cho ${member.displayName} (${member.email})!`);
  };

  const handleCreateMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newMemberEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) return;
    const cleanName = newMemberName.trim() || cleanEmail.split('@')[0];
    await onAddManagedUser(cleanEmail, cleanName, newMemberRole);
    setNewMemberEmail('');
    setNewMemberName('');
    showToast(`Đã thêm "${cleanName}" (${cleanEmail}) với quyền ${ROLE_METADATA[newMemberRole].vietnameseTitle}!`);
  };

  const filteredUsers = managedUsers.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      u.displayName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q);
    return matchesRole && matchesQuery;
  });

  const countByRole = {
    admin: managedUsers.filter((u) => u.role === 'admin').length,
    teacher: managedUsers.filter((u) => u.role === 'teacher').length,
    student: managedUsers.filter((u) => u.role === 'student').length
  };

  const bandOptions = ['Band 6.0', 'Band 6.5', 'Band 7.0', 'Band 7.5', 'Band 8.0', 'Band 8.5+'];
  const speedOptions = [
    { value: 0.8, label: '0.8x (Chậm rõ)' },
    { value: 0.9, label: '0.9x (Vừa phải)' },
    { value: 1.0, label: '1.0x (Chuẩn bản xứ)' },
    { value: 1.1, label: '1.1x (Nhanh)' },
    { value: 1.2, label: '1.2x (Phản xạ cao)' }
  ];
  const goalOptions = [30, 50, 100, 150, 200];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-profile-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Banner */}
        <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={preferences.displayName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/90 border-2 border-amber-400 flex items-center justify-center text-white font-black text-xl shadow-md">
                  {(preferences.displayName || 'AD').slice(0, 2).toUpperCase()}
                </div>
              )}
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                  currentUser ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
                title={currentUser ? 'Đã kết nối Firebase Auth' : 'Chế độ Quản trị viên'}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="user-profile-modal-title" className="text-lg sm:text-xl font-bold tracking-tight">
                  {preferences.displayName || 'Quản trị viên LinguaFlow'}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${currentRoleInfo.badgeBg} ${currentRoleInfo.badgeText}`}
                >
                  {preferences.role === 'admin' && <Crown className="w-3 h-3" />}
                  {preferences.role === 'teacher' && <GraduationCap className="w-3 h-3" />}
                  {preferences.role === 'student' && <BookOpen className="w-3 h-3" />}
                  {currentRoleInfo.vietnameseTitle}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <Shield className="w-3 h-3" /> Chủ sở hữu ({BOOTSTRAPPED_ADMIN_EMAIL})
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-2">
                {currentUser ? (
                  <>
                    <span>{currentUser.email}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-300 font-medium flex items-center gap-1">
                      <Cloud className="w-3.5 h-3.5" /> Đã đồng bộ Firebase Cloud
                    </span>
                  </>
                ) : (
                  <span>Bạn có toàn quyền cấp phát và thay đổi vai trò (Student / Teacher / Admin) cho người dùng khác</span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ tài khoản"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50/80 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveSection('rbac')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'rbac'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Phân quyền cho người khác ({managedUsers.length} thành viên)</span>
          </button>

          <button
            onClick={() => setActiveSection('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'settings'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Đăng nhập & Cài đặt cá nhân</span>
          </button>

          <button
            onClick={() => setActiveSection('database')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'database'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Cơ sở dữ liệu & Lịch sử thi ({examHistory.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Error Banner if any */}
          {authError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Thông báo kết nối:</div>
                <div className="mt-0.5">{authError}</div>
              </div>
            </div>
          )}

          {/* Save / Action Confirmation Banner */}
          {saveSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveSuccess}</span>
            </div>
          )}

          {/* =========================================================
              TAB 1: ADMIN ROLE ASSIGNMENT FOR OTHER USERS (RBAC)
             ========================================================= */}
          {activeSection === 'rbac' && (
            <div className="space-y-6">
              {/* Top Authority Banner */}
              <div className="p-5 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-amber-400 text-slate-950 uppercase">
                      <Crown className="w-3 h-3" /> Quyền Quản Trị Tối Cao (Master Admin)
                    </span>
                    <span className="text-xs text-indigo-200 font-medium">
                      Admin gốc: {BOOTSTRAPPED_ADMIN_EMAIL}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Bảng Điều Khiển Phân Quyền Người Dùng Khác
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl">
                    Chỉ mình bạn (<strong className="text-amber-300">{BOOTSTRAPPED_ADMIN_EMAIL}</strong>) có quyền cấp phát hoặc thu hồi vai trò <strong>Giảng viên (Teacher)</strong>, <strong>Học viên (Student)</strong> hoặc <strong>Quản trị viên (Admin)</strong> cho những người dùng khác trong hệ thống.
                  </p>
                </div>

                {/* Role Summary Counters */}
                <div className="grid grid-cols-3 gap-2.5 shrink-0">
                  <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Admin</div>
                    <div className="text-lg font-black text-white tabular-nums">{countByRole.admin}</div>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-purple-300 font-bold">Giảng viên</div>
                    <div className="text-lg font-black text-white tabular-nums">{countByRole.teacher}</div>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-sky-300 font-bold">Học viên</div>
                    <div className="text-lg font-black text-white tabular-nums">{countByRole.student}</div>
                  </div>
                </div>
              </div>

              {/* Add / Grant Role to a New Person Form */}
              <form
                onSubmit={handleCreateMemberSubmit}
                className="p-5 rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 space-y-3.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-600 text-white">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Cấp quyền cho người dùng mới theo Email
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Thêm tài khoản của học viên hoặc giảng viên và chỉ định quyền hạn trực tiếp vào Firestore Database
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-4">
                    <label htmlFor="new-member-email" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email người được cấp quyền *
                    </label>
                    <input
                      id="new-member-email"
                      type="email"
                      required
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="VD: giangvien.ielts@gmail.com"
                      className="w-full px-3.5 py-2 text-xs font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="new-member-name" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Họ tên hiển thị
                    </label>
                    <input
                      id="new-member-name"
                      type="text"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="VD: Cô Lan Anh (IELTS 8.5)"
                      className="w-full px-3.5 py-2 text-xs font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="new-member-role" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Vai trò cấp phát
                    </label>
                    <select
                      id="new-member-role"
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="student">Học viên (Student)</option>
                      <option value="teacher">Giảng viên (Teacher)</option>
                      <option value="admin">Quản trị viên (Admin)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="submit"
                      disabled={!isCurrentUserAdmin}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Cấp quyền</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Directory Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm người dùng theo tên hoặc email..."
                    className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(['all', 'admin', 'teacher', 'student'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      type="button"
                      onClick={() => setRoleFilter(filterKey)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                        roleFilter === filterKey
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {filterKey === 'all'
                        ? `Tất cả (${managedUsers.length})`
                        : filterKey === 'admin'
                        ? `Admin (${countByRole.admin})`
                        : filterKey === 'teacher'
                        ? `Giảng viên (${countByRole.teacher})`
                        : `Học viên (${countByRole.student})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Role Assignment Table */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Danh sách thành viên & Phân quyền trực tiếp</span>
                  <span>Chọn vai trò bên phải để thay đổi quyền của từng người</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {filteredUsers.map((member) => {
                    const isOwnerAccount = isUserBootstrappedAdmin(member.email);
                    const roleMeta = ROLE_METADATA[member.role] || ROLE_METADATA.student;

                    return (
                      <div
                        key={member.uid}
                        className={`px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors ${
                          isOwnerAccount ? 'bg-amber-50/30' : 'hover:bg-slate-50/80'
                        }`}
                      >
                        {/* Left: Member Identity */}
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              member.role === 'admin'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : member.role === 'teacher'
                                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                : 'bg-sky-100 text-sky-900 border border-sky-300'
                            }`}
                          >
                            {member.displayName.slice(0, 2).toUpperCase()}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{member.displayName}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${roleMeta.badgeBg} ${roleMeta.badgeText}`}
                              >
                                {roleMeta.vietnameseTitle}
                              </span>
                              {isOwnerAccount && (
                                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-amber-300 text-[10px] font-bold">
                                  Tài khoản của bạn (Chủ sở hữu)
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2.5">
                              <span className="font-medium text-slate-700">{member.email}</span>
                              <span>·</span>
                              <span>Mục tiêu: <strong>{member.targetBand}</strong></span>
                              <span>·</span>
                              <span>Tích lũy: <strong>{member.xp} XP</strong> ({member.streak} ngày)</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Direct Role Assignment Controls */}
                        <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                            {(['student', 'teacher', 'admin'] as UserRole[]).map((rOption) => {
                              const active = member.role === rOption;
                              return (
                                <button
                                  key={rOption}
                                  type="button"
                                  disabled={!isCurrentUserAdmin || active}
                                  onClick={() => handleRoleChangeForMember(member, rOption)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    active
                                      ? rOption === 'admin'
                                        ? 'bg-amber-500 text-slate-950 shadow-2xs'
                                        : rOption === 'teacher'
                                        ? 'bg-purple-600 text-white shadow-2xs'
                                        : 'bg-indigo-600 text-white shadow-2xs'
                                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                  }`}
                                >
                                  {rOption === 'student'
                                    ? 'Học viên'
                                    : rOption === 'teacher'
                                    ? 'Giảng viên'
                                    : 'Admin'}
                                </button>
                              );
                            })}
                          </div>

                          {!isOwnerAccount && (
                            <button
                              type="button"
                              onClick={() => {
                                onRemoveManagedUser(member.uid);
                                showToast(`Đã xóa người dùng ${member.displayName} (${member.email}) khỏi danh sách.`);
                              }}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                              title="Xóa người dùng này"
                              aria-label={`Xóa người dùng ${member.displayName}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Role Permission Reference Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {(['student', 'teacher', 'admin'] as UserRole[]).map((rKey) => {
                  const meta = ROLE_METADATA[rKey];
                  return (
                    <div
                      key={rKey}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${meta.badgeBg} ${meta.badgeText}`}>
                            {meta.label}
                          </span>
                          <span className="text-xs font-bold text-slate-700">{meta.vietnameseTitle}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{meta.description}</p>
                        <ul className="mt-3 space-y-1.5 border-t border-slate-200/80 pt-2.5">
                          {meta.permissions.map((perm, idx) => (
                            <li key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{perm}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: AUTHENTICATION & USER SETTINGS
             ========================================================= */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              {/* Firebase Google Auth Card */}
              <div className="p-5 rounded-2xl bg-linear-to-r from-indigo-50/90 via-white to-sky-50/80 border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-100 text-indigo-800">
                      <Cloud className="w-3.5 h-3.5" /> Firebase Authentication
                    </span>
                    {currentUser && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        UID: {currentUser.uid.slice(0, 10)}...
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentUser
                      ? `Đã đăng nhập với tài khoản ${currentUser.email}`
                      : 'Đăng nhập Google để đồng bộ dữ liệu lên Cloud Database'}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xl">
                    {currentUser
                      ? 'Mọi điểm XP, chuỗi ngày học (Streak), huy hiệu thành tích, phân quyền người dùng và kết quả thi IELTS đều được tự động lưu trữ an toàn trên Firestore.'
                      : 'Kết nối tài khoản Google chỉ với 1 chạm để bảo toàn tiến độ học tập, danh sách phân quyền và huy hiệu trên mọi thiết bị.'}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2.5">
                  {currentUser ? (
                    <button
                      type="button"
                      onClick={onSignOut}
                      disabled={isAuthLoading}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onSignInGoogle}
                      disabled={isAuthLoading}
                      className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>{isAuthLoading ? 'Đang kết nối...' : 'Đăng nhập bằng Google'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* User Settings Form */}
              <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Display Name */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <label htmlFor="profile-display-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Tên hiển thị của bạn
                  </label>
                  <input
                    id="profile-display-name"
                    type="text"
                    maxLength={100}
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Nhập tên hiển thị..."
                    className="w-full px-3.5 py-2.5 text-sm font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    Hiển thị trên bảng thành tích, chứng nhận IELTS mô phỏng và hồ sơ Quản trị viên.
                  </p>
                </div>

                {/* Target IELTS Band */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Mục tiêu Điểm Thi IELTS (Target Band)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {bandOptions.map((band) => (
                      <button
                        key={band}
                        type="button"
                        onClick={() => setTargetBandInput(band)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          targetBandInput === band
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {band}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voice Narration Speed */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <label htmlFor="profile-voice-speed" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Tốc độ giọng đọc bản xứ (Audio Speed)
                  </label>
                  <select
                    id="profile-voice-speed"
                    value={voiceSpeedInput}
                    onChange={(e) => setVoiceSpeedInput(parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {speedOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500">
                    Áp dụng cho bài nghe IELTS Listening, hội thoại AI và phát âm từ vựng.
                  </p>
                </div>

                {/* Daily XP Goal & Sound Effects */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Hiệu ứng âm thanh & Phát âm
                    </span>
                    <button
                      type="button"
                      onClick={() => setSoundEnabledInput(!soundEnabledInput)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        soundEnabledInput
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {soundEnabledInput ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Đang Bật</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                          <span>Đang Tắt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Định mức mục tiêu XP mỗi ngày ({dailyXpGoal} XP)
                    </span>
                    <div className="flex items-center gap-1.5">
                      {goalOptions.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => onSetDailyGoal(g)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            dailyXpGoal === g
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {g} XP
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSyncing ? 'Đang đồng bộ...' : 'Lưu cài đặt người dùng'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =========================================================
              TAB 3: CLOUD DATABASE & EXAM HISTORY
             ========================================================= */}
          {activeSection === 'database' && (
            <div className="space-y-6">
              {/* Firestore Sync Status Bar */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      <Database className="w-3.5 h-3.5" /> Cloud Firestore (asia-southeast1)
                    </span>
                    {lastSyncedAt && (
                      <span className="text-[11px] text-slate-500">
                        Đồng bộ lần cuối: {lastSyncedAt}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Trạng thái lưu trữ dữ liệu người dùng & lịch sử thi
                  </h3>
                  <p className="text-xs text-slate-600">
                    Đường dẫn tài liệu: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-indigo-700 font-mono">/users/{currentUser ? currentUser.uid : '{userId}'}</code> và <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-indigo-700 font-mono">/users/{currentUser ? currentUser.uid : '{userId}'}/examHistory</code>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onForceSyncNow}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Đang lưu...' : 'Đồng bộ ngay lên Database'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onAddSampleExamRecord}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Lưu bản ghi thi thử vào DB</span>
                  </button>
                </div>
              </div>

              {/* Real-time Persisted Stats Snapshot */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Tổng điểm XP</div>
                  <div className="text-lg font-black text-indigo-600 mt-0.5 tabular-nums">{statsSummary.xp} XP</div>
                </div>
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Chuỗi ngày học</div>
                  <div className="text-lg font-black text-amber-600 mt-0.5 tabular-nums">{statsSummary.streak} ngày</div>
                </div>
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Bài học hoàn thành</div>
                  <div className="text-lg font-black text-emerald-600 mt-0.5 tabular-nums">{statsSummary.completedLessons}</div>
                </div>
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Huy hiệu mở khóa</div>
                  <div className="text-lg font-black text-purple-600 mt-0.5 tabular-nums">{statsSummary.unlockedAchievements}</div>
                </div>
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white text-center col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-semibold text-slate-500">Đề IELTS đã nộp</div>
                  <div className="text-lg font-black text-rose-600 mt-0.5 tabular-nums">{statsSummary.examsCompleted}</div>
                </div>
              </div>

              {/* Exam History Table stored in Database */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Lịch sử các bài thi IELTS đã lưu trong Database ({examHistory.length})
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Collection: <code>examHistory</code>
                  </span>
                </div>

                {examHistory.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <Award className="w-8 h-8 text-slate-300 mx-auto" />
                    <div className="text-sm font-semibold text-slate-700">Chưa có bản ghi lịch sử thi nào</div>
                    <p className="text-xs max-w-md mx-auto">
                      Hoàn thành bài thi thử IELTS 80 câu hoặc nhấn nút <strong>"Lưu bản ghi thi thử vào DB"</strong> ở trên để kiểm tra lưu trữ dữ liệu trực tiếp.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {examHistory.map((item) => (
                      <div
                        key={item.examId}
                        className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{item.examTitle}</span>
                            <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-black text-xs">
                              Overall Band {item.overallBand.toFixed(1)}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                            <span>Listening: <strong>{item.listeningScore}/40</strong></span>
                            <span>·</span>
                            <span>Reading: <strong>{item.readingScore}/40</strong></span>
                            <span>·</span>
                            <span>Writing: <strong>{item.writingWords} từ</strong></span>
                            <span>·</span>
                            <span className="text-slate-400 font-mono text-[11px]">ID: {item.examId.slice(0, 14)}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onDeleteExamRecord(item.examId)}
                          className="self-end sm:self-center p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Xóa bản ghi này khỏi Database"
                          aria-label={`Xóa bản ghi ${item.examTitle}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
