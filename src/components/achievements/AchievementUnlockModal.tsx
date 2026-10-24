import React, { useEffect } from 'react';
import { Trophy, Sparkles, Check, Flame, BookMarked, Award, CheckCircle2, Star, Crown, ArrowRight, PartyPopper } from 'lucide-react';
import { Achievement } from '../../utils/achievements';
import { triggerAchievementConfetti, triggerGoldStarsConfetti } from '../../utils/confetti';

interface AchievementUnlockModalProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementUnlockModal: React.FC<AchievementUnlockModalProps> = ({
  achievement,
  onClose
}) => {
  // Fire visual confetti on mount
  useEffect(() => {
    if (achievement.tier === 'diamond' || achievement.tier === 'gold') {
      triggerGoldStarsConfetti();
    } else {
      triggerAchievementConfetti();
    }
  }, [achievement]);

  const renderBadgeIcon = () => {
    const props = { className: 'w-10 h-10 text-white' };
    switch (achievement.iconName) {
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

  const getTierStyles = () => {
    switch (achievement.tier) {
      case 'diamond':
        return {
          bg: 'from-cyan-500 via-blue-600 to-indigo-700',
          border: 'border-cyan-300 ring-4 ring-cyan-200/50',
          badgeText: 'Huy Hiệu Huyền Thoại (Diamond Tier)',
          textColor: 'text-cyan-400'
        };
      case 'gold':
        return {
          bg: 'from-amber-400 via-orange-500 to-yellow-600',
          border: 'border-amber-300 ring-4 ring-amber-200/50',
          badgeText: 'Huy Hiệu Vàng (Gold Tier)',
          textColor: 'text-amber-400'
        };
      case 'silver':
        return {
          bg: 'from-slate-400 via-slate-500 to-zinc-600',
          border: 'border-slate-300 ring-4 ring-slate-200/50',
          badgeText: 'Huy Hiệu Bạc (Silver Tier)',
          textColor: 'text-slate-300'
        };
      case 'bronze':
      default:
        return {
          bg: 'from-amber-600 via-amber-700 to-yellow-800',
          border: 'border-amber-500 ring-4 ring-amber-400/30',
          badgeText: 'Huy Hiệu Đồng (Bronze Tier)',
          textColor: 'text-amber-500'
        };
    }
  };

  const tierStyle = getTierStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl overflow-hidden">
        {/* Glow Effects in Background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-4 animate-bounce">
          <PartyPopper className="w-4 h-4 text-amber-400" />
          <span>MỞ KHÓA THÀNH TÍCH MỚI!</span>
        </div>

        {/* Animated Badge Icon Container */}
        <div className="flex justify-center my-3">
          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${tierStyle.bg} ${tierStyle.border} flex items-center justify-center shadow-xl transform transition-transform hover:scale-105 duration-300 relative`}>
            {renderBadgeIcon()}
            <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md">
              <Check className="w-4 h-4 stroke-[3]" />
            </span>
          </div>
        </div>

        {/* Tier text */}
        <div className={`text-[11px] font-bold uppercase tracking-wider mt-2 ${tierStyle.textColor}`}>
          {tierStyle.badgeText}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
          {achievement.title}
        </h3>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          {achievement.titleEn}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-300 mt-3 leading-relaxed max-w-sm mx-auto">
          {achievement.description}
        </p>

        {/* Reward Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-xl my-4 text-amber-300 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Phần thưởng: +{achievement.xpReward} XP</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-2">
          <button
            onClick={() => triggerAchievementConfetti()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
            <span>Bắn pháo hoa lại</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Nhận Ngay & Tiếp Tục</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
