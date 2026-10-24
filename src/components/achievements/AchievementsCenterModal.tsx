import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  BookMarked,
  Sparkles,
  Award,
  CheckCircle2,
  Star,
  Crown,
  Check,
  Lock,
  PartyPopper,
  X,
  GraduationCap,
  ChevronRight,
  Filter,
  Play
} from 'lucide-react';
import {
  ACHIEVEMENTS_REGISTRY,
  Achievement,
  AchievementCategory,
  UserLearningStats,
  calculateAchievementProgress
} from '../../utils/achievements';
import { triggerAchievementConfetti, triggerGoldStarsConfetti } from '../../utils/confetti';
import { Streak30DayD3Chart } from './Streak30DayD3Chart';

interface AchievementsCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedIds: string[];
  stats: UserLearningStats;
  onSimulateMilestone?: (milestoneType: 'streak-10' | 'words-1000' | 'first-ielts-exam') => void;
}

export const AchievementsCenterModal: React.FC<AchievementsCenterModalProps> = ({
  isOpen,
  onClose,
  unlockedIds,
  stats,
  onSimulateMilestone
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | AchievementCategory>('all');
  const unlockedSet = new Set(unlockedIds);

  if (!isOpen) return null;

  const totalAchievements = ACHIEVEMENTS_REGISTRY.length;
  const unlockedCount = unlockedIds.length;
  const totalRewardXp = ACHIEVEMENTS_REGISTRY
    .filter(a => unlockedSet.has(a.id))
    .reduce((sum, a) => sum + a.xpReward, 0);

  const filteredAchievements = ACHIEVEMENTS_REGISTRY.filter(a => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  const renderBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const props = { className: `w-6 h-6 ${isUnlocked ? 'text-white' : 'text-slate-500'}` };
    switch (iconName) {
      case 'Flame':
        return <Flame {...props} />;
      case 'BookMarked':
        return <BookMarked {...props} />;
      case 'Trophy':
        return <Trophy {...props} />;
      case 'Award':
        return <Award {...props} />;
      case 'GraduationCap':
      case 'CheckCircle2':
        return <CheckCircle2 {...props} />;
      case 'Crown':
        return <Crown {...props} />;
      case 'Sparkles':
      default:
        return <Sparkles {...props} />;
    }
  };

  const getTierStyles = (tier: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        bg: 'from-slate-800 to-slate-900 border-slate-700/60',
        badgeColor: 'text-slate-400 bg-slate-800',
        label: 'Đang khóa'
      };
    }

    switch (tier) {
      case 'diamond':
        return {
          bg: 'from-cyan-500 via-blue-600 to-indigo-700 border-cyan-400 shadow-cyan-500/20 shadow-lg',
          badgeColor: 'text-cyan-300 bg-cyan-950/80 border-cyan-500/30',
          label: 'Diamond Tier'
        };
      case 'gold':
        return {
          bg: 'from-amber-400 via-orange-500 to-yellow-600 border-amber-300 shadow-amber-500/20 shadow-lg',
          badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-500/30',
          label: 'Gold Tier'
        };
      case 'silver':
        return {
          bg: 'from-slate-400 via-slate-500 to-zinc-600 border-slate-300 shadow-slate-500/20 shadow-lg',
          badgeColor: 'text-slate-200 bg-slate-800/80 border-slate-500/30',
          label: 'Silver Tier'
        };
      case 'bronze':
      default:
        return {
          bg: 'from-amber-600 via-amber-700 to-yellow-800 border-amber-500 shadow-amber-700/20 shadow-lg',
          badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-600/30',
          label: 'Bronze Tier'
        };
    }
  };

  const handleCelebrateBadge = (achievement: Achievement) => {
    if (achievement.tier === 'diamond' || achievement.tier === 'gold') {
      triggerGoldStarsConfetti();
    } else {
      triggerAchievementConfetti();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl text-white shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-600/20 via-purple-600/20 to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Bộ Sưu Tập Thành Tích & Huy Hiệu
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 uppercase tracking-wider">
                  LinguaFlow Badges
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Chinh phục các cột mốc chuỗi học tập, kho từ vựng và kỳ thi thử IELTS.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Global Progress Statistics Bar */}
        <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400 block text-[11px]">Đã mở khóa:</span>
              <strong className="text-sm font-black text-amber-400">
                {unlockedCount} / {totalAchievements} Huy hiệu
              </strong>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[11px]">Thưởng tích lũy:</span>
              <strong className="text-sm font-black text-emerald-400">
                +{totalRewardXp} XP
              </strong>
            </div>
            <div className="h-6 w-px bg-slate-800 hidden sm:block" />
            <div className="hidden sm:block">
              <span className="text-slate-400 block text-[11px]">Chuỗi ngày hiện tại:</span>
              <strong className="text-sm font-black text-amber-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{stats.streak} ngày</span>
              </strong>
            </div>
          </div>

          {/* Quick interactive test / simulation bar */}
          {onSimulateMilestone && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-slate-400 uppercase font-semibold mr-1">
                Mô phỏng mở khóa:
              </span>
              <button
                onClick={() => onSimulateMilestone('streak-10')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-[11px] font-semibold text-amber-300 border border-amber-500/30 hover:border-amber-400 transition-colors cursor-pointer flex items-center gap-1"
                title="Mô phỏng đạt chuỗi 10 ngày để xem hiệu ứng pháo hoa"
              >
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Chuỗi 10 ngày</span>
              </button>
              <button
                onClick={() => onSimulateMilestone('words-1000')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-600/30 text-[11px] font-semibold text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
                title="Mô phỏng đạt 1,000 từ vựng để xem hiệu ứng pháo hoa"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>1,000 Từ vựng</span>
              </button>
              <button
                onClick={() => onSimulateMilestone('first-ielts-exam')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-[11px] font-semibold text-purple-300 border border-purple-500/30 hover:border-purple-400 transition-colors cursor-pointer flex items-center gap-1"
                title="Mô phỏng hoàn thành bài thi IELTS để xem hiệu ứng pháo hoa"
              >
                <Trophy className="w-3 h-3 text-purple-400" />
                <span>Thi IELTS đầu tiên</span>
              </button>
            </div>
          )}
        </div>

        {/* D3 30-Day Streak & Activity History Line Chart */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/40 shrink-0">
          <Streak30DayD3Chart currentStreak={stats.streak} todayXp={stats.xp} />
        </div>

        {/* Filter Tabs */}
        <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Tất cả ({totalAchievements})
          </button>
          <button
            onClick={() => setSelectedCategory('streak')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'streak'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🔥 Chuỗi ngày (Streak)
          </button>
          <button
            onClick={() => setSelectedCategory('vocab')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'vocab'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            📚 Từ vựng (Vocabulary)
          </button>
          <button
            onClick={() => setSelectedCategory('exam')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'exam'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🎓 Thi thử IELTS
          </button>
          <button
            onClick={() => setSelectedCategory('lessons')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'lessons'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            ✍️ Bài học & Lộ trình
          </button>
        </div>

        {/* Badges Grid Viewport */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAchievements.map((achievement) => {
              const isUnlocked = unlockedSet.has(achievement.id);
              const progress = calculateAchievementProgress(achievement, stats, isUnlocked);
              const tierStyles = getTierStyles(achievement.tier, isUnlocked);

              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-slate-850 border-slate-700 hover:border-amber-400/50 shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Badge Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${tierStyles.bg} flex items-center justify-center shrink-0 border relative`}>
                      {renderBadgeIcon(achievement.iconName, isUnlocked)}
                      {isUnlocked ? (
                        <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white p-0.5 rounded-full shadow-sm">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="absolute -top-1.5 -right-1.5 bg-slate-800 text-slate-400 border border-slate-700 p-0.5 rounded-full shadow-sm">
                          <Lock className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    {/* Badge Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tierStyles.badgeColor}`}>
                          {tierStyles.label}
                        </span>
                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 font-mono">
                          <Sparkles className="w-3 h-3" />
                          <span>+{achievement.xpReward} XP</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">
                        {achievement.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {achievement.titleEn}
                      </p>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress or Unlocked Banner */}
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    {isUnlocked ? (
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Đã mở khóa thành công!</span>
                        </span>
                        <button
                          onClick={() => handleCelebrateBadge(achievement)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <PartyPopper className="w-3 h-3 text-amber-400" />
                          <span>Bắn pháo hoa 🎉</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Tiến độ hiện tại:</span>
                          <span className="font-mono text-slate-300 font-bold">
                            {progress.current} / {progress.max} {achievement.unit} ({progress.percentage}%)
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-400">
            Huy hiệu mới sẽ tự động kích hoạt hiệu ứng pháo hoa rực rỡ khi bạn đạt đủ điều kiện.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng bảng thành tích
          </button>
        </div>

      </div>
    </div>
  );
};
