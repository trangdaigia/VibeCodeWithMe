import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  BookOpen,
  MessageSquare,
  Microscope,
  Layers,
  Compass,
  GraduationCap,
  Target,
  Check,
  Trophy,
  ChevronDown,
  X,
  User as UserIcon,
  Shield,
  Video,
  Mic,
  Lock,
  Unlock,
  Crown,
  Users,
  LogIn,
  UserPlus,
  Zap,
  Sparkles,
} from 'lucide-react';
import { LanguageCourse } from '../data/curriculum';
import { User, UserRole } from '../firebase';
import { LuckySpinWheelModal } from './gamification/LuckySpinWheelModal';
import {
  PlatformTabId,
  ALL_GATED_TABS,
  MASTER_ADMIN_EMAIL,
  isMasterAdminEmail,
  canUserAccessTab,
} from '../utils/accessControlLogic';
import { SPRING_SNAPPY } from '../utils/motionChoreography';

export type ActiveTab = PlatformTabId;

interface TopNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentLanguage: LanguageCourse;
  onOpenLanguageModal: () => void;
  streak: number;
  xp: number;
  dailyXpGoal: number;
  todayXp: number;
  onSetDailyGoal: (goal: number) => void;
  onGainXp?: (amount: number) => void;
  unlockedAchievementsCount?: number;
  totalAchievementsCount?: number;
  onOpenAchievements?: () => void;
  currentUser?: User | null;
  userDisplayName?: string;
  userEmail?: string | null;
  userRole?: UserRole;
  accessApproved?: boolean;
  allowedTabs?: PlatformTabId[];
  pendingRequestsCount?: number;
  todayReviewCount?: number;
  onNavigateToVocabReview?: () => void;
  onOpenUserProfile?: () => void;
  onOpenLuckyWheel?: () => void;
  onOpenPublicAuthModal?: (mode: 'login' | 'register') => void;
  onOpenRequestAccessModal?: () => void;
  onQuickSwitchAccount?: (email: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  currentLanguage,
  onOpenLanguageModal,
  streak,
  xp,
  dailyXpGoal,
  todayXp,
  onSetDailyGoal,
  onGainXp = () => {},
  unlockedAchievementsCount = 0,
  totalAchievementsCount = 12,
  onOpenAchievements,
  currentUser = null,
  userDisplayName = 'Học viên',
  userEmail = null,
  userRole = 'student',
  accessApproved = false,
  allowedTabs = ['path'],
  pendingRequestsCount = 0,
  todayReviewCount = 0,
  onNavigateToVocabReview,
  onOpenUserProfile,
  onOpenLuckyWheel,
  onOpenPublicAuthModal,
  onOpenRequestAccessModal,
  onQuickSwitchAccount,
}) => {
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [customGoalInput, setCustomGoalInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'ai' | 'vault' | 'portalAdmin' | null>(null);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterDropdown = (key: 'ai' | 'vault' | 'portalAdmin') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeaveDropdown = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // 350ms grace period so users can comfortably move mouse onto menu items without accidental closes
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 350);
  };

  const isMasterAdmin = isMasterAdminEmail(userEmail);

  const checkUnlocked = (tabId: PlatformTabId): boolean =>
    canUserAccessTab(
      {
        email: userEmail,
        accessApproved,
        allowedTabs,
      },
      tabId
    );

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsGoalOpen(false);
      }
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const percent = dailyXpGoal > 0 ? Math.round((todayXp / dailyXpGoal) * 100) : 0;
  const isGoalAchieved = todayXp >= dailyXpGoal;

  const presetGoals = [
    { label: 'Khởi động', xp: 30, desc: '1 - 2 bài nhẹ nhàng' },
    { label: 'Tiêu chuẩn', xp: 50, desc: 'Mục tiêu khuyến nghị' },
    { label: 'Chăm chỉ', xp: 100, desc: '3 - 4 bài học đều đặn' },
    { label: 'Bứt phá', xp: 150, desc: 'Luyện thi & Tăng tốc' },
    { label: 'Chuyên sâu', xp: 200, desc: 'Thử thách cao thủ' },
  ];

  const handleSelectGoal = (newGoal: number) => {
    onSetDailyGoal(newGoal);
    setIsCustomMode(false);
  };

  const handleApplyCustomGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customGoalInput.trim(), 10);
    if (!isNaN(val) && val >= 10 && val <= 1000) {
      onSetDailyGoal(val);
      setIsCustomMode(false);
      setCustomGoalInput('');
    }
  };

  // Grouped Menu Datasets
  const aiMenuItems: {
    id: PlatformTabId;
    label: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    tag?: string;
  }[] = [
    { id: 'viphub', label: 'Vũ Trụ 3D & AI', desc: 'Thế giới 3D tương tác & mô phỏng sinh học', icon: Sparkles, tag: '3D Hub' },
    { id: 'arena', label: 'Đấu Trường AI', desc: 'Ghép câu C1, sóng não 432Hz & thi đấu', icon: Zap, tag: 'Bảng Vàng' },
    { id: 'video', label: 'Video AI Người Ảo', desc: 'Giảng dạy bằng video người ảo AI', icon: Video },
    { id: 'studio', label: 'Phòng Lab AI', desc: 'Chấm phát âm & chữa bài luận C1/C2', icon: Mic },
    { id: 'roleplay', label: 'Hội Thoại AI', desc: '8 kịch bản phản xạ giao tiếp thực tế', icon: MessageSquare },
    { id: 'grammar', label: 'Soi Ngữ Pháp', desc: 'Phân tích cú pháp & sửa lỗi sâu', icon: Microscope },
  ];

  const vaultMenuItems: {
    id: PlatformTabId;
    label: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeCount?: number;
  }[] = [
    { id: 'vault', label: 'Kho Từ Vựng SRS', desc: 'Flashcard lặp lại ngắt quãng SuperMemo SM-2', icon: Layers, badgeCount: todayReviewCount },
    { id: 'academic', label: 'Luyện Thi Quốc Tế', desc: 'IELTS Academic 80 câu, HSK, TOPIK, JLPT', icon: GraduationCap },
    { id: 'culture', label: 'Văn Hóa & Giao Tiếp', desc: 'Quy tắc ứng xử & văn phong bản xứ', icon: Compass },
  ];

  const isAiActive = ['viphub', 'arena', 'video', 'studio', 'roleplay', 'grammar'].includes(activeTab);
  const isVaultActive = ['vault', 'academic', 'culture'].includes(activeTab);
  const unlockedGatedCount = ALL_GATED_TABS.filter((t) => checkUnlocked(t)).length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200" ref={navContainerRef}>
      {/* Row 1: Streamlined Admin & Account Controls Bar */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-[11px] relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2">
          {/* User Identity & Portal Access Summary */}
          <div className="flex items-center gap-2">
            {isMasterAdmin ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black tracking-wide text-[10px] uppercase shadow-xs">
                <Crown className="w-3 h-3 text-slate-950" /> Admin: {MASTER_ADMIN_EMAIL}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 font-bold text-[11px]">
                <UserIcon className="w-3 h-3 text-indigo-300" /> User: {userDisplayName} ({userEmail || 'Khách'})
              </span>
            )}

            <span className="hidden md:inline text-slate-600">|</span>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px]">
              {isMasterAdmin ? (
                <span className="text-emerald-300 font-medium flex items-center gap-1">
                  <Unlock className="w-3 h-3 text-emerald-400" /> Quyền truy cập toàn bộ hệ thống
                </span>
              ) : unlockedGatedCount > 0 ? (
                <span className="text-emerald-300 font-medium flex items-center gap-1">
                  <Unlock className="w-3 h-3 text-emerald-400" /> Đã mở {unlockedGatedCount}/{ALL_GATED_TABS.length} tính năng
                </span>
              ) : (
                <span className="text-amber-300 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" /> Đang ở chế độ Lộ Trình
                </span>
              )}
            </span>
          </div>

          {/* Consolidated Admin / Auth Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnterDropdown('portalAdmin')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'portalAdmin' ? null : 'portalAdmin')}
              className="px-2.5 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1.5"
              aria-expanded={activeDropdown === 'portalAdmin'}
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Cài Đặt &amp; Phân Quyền</span>
              {pendingRequestsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                  {pendingRequestsCount}
                </span>
              )}
              <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'portalAdmin' ? 'rotate-180' : ''}`} />
            </button>

            {/* Admin Dropdown Menu */}
            {activeDropdown === 'portalAdmin' && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-200 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Quản trị Portal &amp; Tài khoản
                </div>

                <div className="p-1 space-y-1 mt-1">
                  {isMasterAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        onTabChange('admin');
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div>Trung tâm Cấp phép User</div>
                          <div className="text-[10px] text-slate-400 font-normal">Duyệt yêu cầu mở tính năng</div>
                        </div>
                      </div>
                      {pendingRequestsCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                          {pendingRequestsCount} chờ
                        </span>
                      )}
                    </button>
                  )}

                  {!isMasterAdmin && unlockedGatedCount < ALL_GATED_TABS.length && onOpenRequestAccessModal && (
                    <button
                      type="button"
                      onClick={() => {
                        onOpenRequestAccessModal();
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <Unlock className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div>Xin Admin Cấp Phép Mở Khóa</div>
                        <div className="text-[10px] text-slate-400 font-normal">Gửi yêu cầu mở các module AI</div>
                      </div>
                    </button>
                  )}

                  {onQuickSwitchAccount && (
                    <button
                      type="button"
                      onClick={() => {
                        onQuickSwitchAccount(isMasterAdmin ? 'thuha.tran2004@gmail.com' : MASTER_ADMIN_EMAIL);
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                      <div>
                        <div>{isMasterAdmin ? 'Đóng vai User (Chưa cấp phép)' : `Vào Vai Admin (${MASTER_ADMIN_EMAIL})`}</div>
                        <div className="text-[10px] text-slate-400 font-normal">Chuyển đổi tài khoản thử nghiệm</div>
                      </div>
                    </button>
                  )}

                  {onOpenPublicAuthModal && (
                    <div className="pt-2 mt-2 border-t border-slate-800 grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          onOpenPublicAuthModal('login');
                          setActiveDropdown(null);
                        }}
                        className="w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Đăng nhập</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenPublicAuthModal('register');
                          setActiveDropdown(null);
                        }}
                        className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Đăng ký</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Brand Wordmark + Gamification & Account Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onTabChange('path')}
            className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
            aria-label="LinguaFlow - Trang chủ"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-sm">
              LF
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                LinguaFlow
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold">
                {currentLanguage.flagEmoji} {currentLanguage.vietnameseName}
              </span>
            </div>
          </button>
        </div>

        {/* Gamification & Account Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0" ref={popoverRef}>
          {/* Today's Review Notification Badge: Appears when user has vocab cards scheduled for review */}
          {todayReviewCount > 0 && (
            <motion.button
              type="button"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (onNavigateToVocabReview) {
                  onNavigateToVocabReview();
                } else {
                  onTabChange('vault');
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-rose-950 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg shrink-0 transition-all cursor-pointer shadow-xs group"
              title={`Bạn có ${todayReviewCount} thẻ từ vựng đến hạn ôn tập hôm nay (SRS). Nhấn để vào Kho Từ Vựng.`}
              aria-label={`Ôn tập hôm nay: ${todayReviewCount} từ vựng cần ôn tập`}
              data-testid="todays-review-badge"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <Layers className="w-3.5 h-3.5 text-rose-600 group-hover:rotate-6 transition-transform" />
              <span className="hidden sm:inline font-bold">Ôn tập hôm nay</span>
              <span className="inline sm:hidden font-bold">Ôn tập</span>
              <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full tabular-nums">
                {todayReviewCount}
              </span>
            </motion.button>
          )}

          {onOpenAchievements && (
            <button
              onClick={onOpenAchievements}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300/80 rounded-lg shrink-0 transition-all cursor-pointer"
              title="Xem Huy Hiệu & Cột Mốc Thành Tích"
              aria-label="Mở bảng thành tích và huy hiệu"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span className="hidden sm:inline">Huy hiệu</span>
              <span className="bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full tabular-nums">
                {unlockedAchievementsCount}/{totalAchievementsCount}
              </span>
            </button>
          )}

          <div
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/70 rounded-lg shrink-0"
            title={`Chuỗi học tập: ${streak} ngày liên tiếp`}
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="tabular-nums">{streak}</span>
            <span className="hidden sm:inline font-normal text-amber-600">ngày</span>
          </div>

          {/* Lucky Spin Wheel Bonus Button */}
          <button
            type="button"
            onClick={() => {
              if (onOpenLuckyWheel) {
                onOpenLuckyWheel();
              } else {
                setIsLuckyWheelOpen(true);
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 border border-amber-500/60 rounded-lg shrink-0 transition-all cursor-pointer shadow-2xs group"
            title="Vòng quay may mắn nhận thưởng XP & Streak Shield mỗi ngày"
            data-testid="lucky-spin-btn"
          >
            <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline font-black">Vòng quay</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsGoalOpen(!isGoalOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isGoalAchieved
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800 hover:bg-emerald-100/90'
                  : 'bg-indigo-50/80 border-indigo-200/80 text-indigo-900 hover:bg-indigo-100/80'
              }`}
              aria-label={`Mục tiêu XP hàng ngày: ${todayXp} trên ${dailyXpGoal} XP (${percent}%)`}
              title="Nhấn để tùy chỉnh mục tiêu XP hàng ngày"
            >
              <Target className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="tabular-nums font-bold">
                {todayXp}
                <span className="text-slate-400 font-normal">/{dailyXpGoal} XP</span>
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isGoalOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isGoalAchieved ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">
                        Mục Tiêu XP Hàng Ngày
                      </h4>
                      <p className="text-[11px] text-slate-500">Duy trì thói quen học tập bền bỉ</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsGoalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
                    aria-label="Đóng bảng mục tiêu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600">Tiến độ hôm nay</span>
                    <span className="font-bold text-indigo-700 tabular-nums">
                      {todayXp} / {dailyXpGoal} XP ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        isGoalAchieved ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${Math.min(100, percent)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">
                    Chọn mức độ phù hợp với bạn:
                  </span>
                  <div className="space-y-1.5">
                    {presetGoals.map((preset) => {
                      const isSelected = dailyXpGoal === preset.xp;
                      return (
                        <button
                          key={preset.xp}
                          onClick={() => handleSelectGoal(preset.xp)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-semibold ring-1 ring-indigo-600'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{preset.xp} XP</span>
                            <span className="text-[11px] text-slate-500">· {preset.label}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3">
                    {!isCustomMode ? (
                      <button
                        onClick={() => setIsCustomMode(true)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline cursor-pointer"
                      >
                        + Đặt mức XP tùy chỉnh khác
                      </button>
                    ) : (
                      <form onSubmit={handleApplyCustomGoal} className="flex gap-2 items-center mt-1">
                        <input
                          type="number"
                          min="10"
                          max="1000"
                          step="5"
                          placeholder="Nhập số XP (10-1000)"
                          value={customGoalInput}
                          onChange={(e) => setCustomGoalInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 cursor-pointer"
                        >
                          Lưu
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenLanguageModal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={`Đổi ngôn ngữ, hiện tại là ${currentLanguage.vietnameseName}`}
            title={`Đổi ngôn ngữ (${currentLanguage.vietnameseName})`}
          >
            <span className="text-base leading-none">{currentLanguage.flagEmoji}</span>
            <span className="hidden sm:inline">{currentLanguage.vietnameseName}</span>
          </button>

          {onOpenUserProfile && (
            <button
              onClick={onOpenUserProfile}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isMasterAdmin
                  ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-400 shadow-xs'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border-indigo-200'
              }`}
              aria-label="Hồ sơ Tài khoản & Phân quyền"
              title="Mở Hồ sơ Tài khoản, Cài đặt & Trung tâm Phân quyền"
            >
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={userDisplayName}
                  className="w-4 h-4 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : isMasterAdmin ? (
                <Crown className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <UserIcon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline max-w-28 truncate">{userDisplayName}</span>
              <span
                className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded-md ${
                  isMasterAdmin
                    ? 'bg-amber-400 text-slate-950'
                    : unlockedGatedCount > 0
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {isMasterAdmin ? 'Admin' : 'User'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Row 3: Consolidated Primary Navigation Bar with Organized Dropdown Groups */}
      <div className="border-t border-slate-100 bg-slate-50/80 backdrop-blur-md relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-1.5 py-1.5 overflow-visible">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 py-0.5 overflow-visible">
            {/* 1. Direct Tab: Lộ trình */}
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onTabChange('path');
                setActiveDropdown(null);
              }}
              className={`relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'path'
                  ? 'text-white font-bold'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/90'
              }`}
            >
              {activeTab === 'path' && (
                <motion.span
                  layoutId="activePrimaryNavTab"
                  transition={SPRING_SNAPPY}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-sm -z-0"
                />
              )}
              <BookOpen className="relative z-10 w-3.5 h-3.5 shrink-0" />
              <span className="relative z-10">Lộ trình</span>
            </motion.button>

            {/* 2. Dropdown Group: Trung Tâm AI & Lab */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown('ai')}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveDropdown(activeDropdown === 'ai' ? null : 'ai')}
                className={`relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isAiActive
                    ? 'text-white font-bold'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-white/90'
                }`}
                aria-expanded={activeDropdown === 'ai'}
              >
                {isAiActive && (
                  <motion.span
                    layoutId="activePrimaryNavTab"
                    transition={SPRING_SNAPPY}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-sm -z-0"
                  />
                )}
                <Sparkles className="relative z-10 w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="relative z-10">Trung Tâm AI &amp; Lab</span>
                <ChevronDown className={`relative z-10 w-3 h-3 transition-transform ${activeDropdown === 'ai' ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* AI Dropdown Menu */}
              {activeDropdown === 'ai' && (
                <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Tính Năng Trí Tuệ Nhân Tạo</span>
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                  </div>

                  <div className="p-1 space-y-1 mt-1">
                    {aiMenuItems.map((item) => {
                      const Icon = item.icon;
                      const isUnlocked = checkUnlocked(item.id);
                      const isSubActive = activeTab === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onTabChange(item.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                            isSubActive
                              ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                            isSubActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900 truncate">
                                {item.label}
                              </span>
                              {!isUnlocked && (
                                <span title="Cần Admin cấp phép">
                                  <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                                </span>
                              )}
                              {item.tag && (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Direct Flagship Tab: Thi IELTS & Quốc Tế */}
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onTabChange('academic');
                setActiveDropdown(null);
              }}
              data-testid="primary-nav-academic"
              className={`relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'academic'
                  ? 'text-white font-bold'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/90'
              }`}
            >
              {activeTab === 'academic' && (
                <motion.span
                  layoutId="activePrimaryNavTab"
                  transition={SPRING_SNAPPY}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-indigo-700 shadow-sm -z-0"
                />
              )}
              <GraduationCap className={`relative z-10 w-3.5 h-3.5 shrink-0 ${activeTab === 'academic' ? 'text-amber-300' : 'text-red-600'}`} />
              <span className="relative z-10">Thi IELTS &amp; Quốc Tế</span>
              <span className={`relative z-10 text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md ${
                activeTab === 'academic' ? 'bg-amber-400 text-slate-950' : 'bg-red-100 text-red-700'
              }`}>
                80 Câu
              </span>
            </motion.button>

            {/* 4. Dropdown Group: Kho Từ Vựng & Văn Hóa */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown('vault')}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveDropdown(activeDropdown === 'vault' ? null : 'vault')}
                className={`relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  ['vault', 'culture'].includes(activeTab)
                    ? 'text-white font-bold'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-white/90'
                }`}
                aria-expanded={activeDropdown === 'vault'}
              >
                {['vault', 'culture'].includes(activeTab) && (
                  <motion.span
                    layoutId="activePrimaryNavTab"
                    transition={SPRING_SNAPPY}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-sm -z-0"
                  />
                )}
                <Layers className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10">Từ Vựng SRS &amp; Văn Hóa</span>
                {todayReviewCount > 0 && (
                  <span
                    className="relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-black bg-rose-500 text-white tabular-nums shadow-xs animate-pulse"
                    title={`${todayReviewCount} từ vựng cần ôn tập hôm nay`}
                  >
                    {todayReviewCount}
                  </span>
                )}
                <ChevronDown className={`relative z-10 w-3 h-3 transition-transform ${activeDropdown === 'vault' ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Vault & Exam Dropdown Menu */}
              {activeDropdown === 'vault' && (
                <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Kho Thẻ Nhớ &amp; Thi Thử</span>
                    <GraduationCap className="w-3 h-3 text-indigo-500" />
                  </div>

                  <div className="p-1 space-y-1 mt-1">
                    {vaultMenuItems.map((item) => {
                      const Icon = item.icon;
                      const isUnlocked = checkUnlocked(item.id);
                      const isSubActive = activeTab === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (item.id === 'vault' && onNavigateToVocabReview) {
                              onNavigateToVocabReview();
                            } else {
                              onTabChange(item.id);
                            }
                            setActiveDropdown(null);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                            isSubActive
                              ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                            isSubActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900 truncate">
                                {item.label}
                              </span>
                              {item.badgeCount && item.badgeCount > 0 ? (
                                <span className="px-2 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black tabular-nums">
                                  {item.badgeCount} cần ôn
                                </span>
                              ) : !isUnlocked ? (
                                <span title="Cần Admin cấp phép">
                                  <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                                </span>
                              ) : null}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Direct Tab: Cộng đồng */}
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onTabChange('community');
                setActiveDropdown(null);
              }}
              className={`relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'community'
                  ? 'text-white font-bold'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/90'
              }`}
            >
              {activeTab === 'community' && (
                <motion.span
                  layoutId="activePrimaryNavTab"
                  transition={SPRING_SNAPPY}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-sm -z-0"
                />
              )}
              <Users className="relative z-10 w-3.5 h-3.5 shrink-0" />
              <span className="relative z-10">Cộng đồng</span>
            </motion.button>
          </div>

          {/* Right: Master Admin Button (if Master Admin) */}
          {isMasterAdmin && (
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onTabChange('admin');
                setActiveDropdown(null);
              }}
              className={`relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer lg:ml-auto ${
                activeTab === 'admin'
                  ? 'text-slate-950 font-black'
                  : 'bg-amber-100/90 text-amber-950 hover:bg-amber-200 border border-amber-300'
              }`}
            >
              {activeTab === 'admin' && (
                <motion.span
                  layoutId="activePrimaryNavTab"
                  transition={SPRING_SNAPPY}
                  className="absolute inset-0 rounded-xl bg-amber-400 shadow-sm -z-0"
                />
              )}
              <Crown className="relative z-10 w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="relative z-10 hidden sm:inline">Quản trị &amp; Cấp phép</span>
              <span className="relative z-10 sm:hidden">Admin</span>
              {pendingRequestsCount > 0 && (
                <span className="relative z-10 px-1.5 py-0.2 rounded-full bg-slate-900 text-amber-300 text-[10px] font-black">
                  {pendingRequestsCount}
                </span>
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Gamified Lucky Spin Wheel Modal */}
      <LuckySpinWheelModal
        isOpen={isLuckyWheelOpen}
        onClose={() => setIsLuckyWheelOpen(false)}
        onGainXp={onGainXp}
        currentStreak={streak}
      />
    </header>
  );
};
