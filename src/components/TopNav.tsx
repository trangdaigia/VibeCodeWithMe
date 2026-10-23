import React, { useState, useRef, useEffect } from 'react';
import { Flame, Sparkles, BookOpen, MessageSquare, Microscope, Layers, Compass, GraduationCap, Target, Check, Trophy, ChevronDown, X } from 'lucide-react';
import { LanguageCourse } from '../data/curriculum';

export type ActiveTab = 'path' | 'academic' | 'roleplay' | 'grammar' | 'vault' | 'culture';

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
}) => {
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [customGoalInput, setCustomGoalInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsGoalOpen(false);
      }
    };
    if (isGoalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isGoalOpen]);

  // Radial progress calculations
  const radius = 13;
  const circumference = 2 * Math.PI * radius; // ~81.68
  const progressRatio = dailyXpGoal > 0 ? Math.min(1, todayXp / dailyXpGoal) : 0;
  const strokeDashoffset = circumference - (progressRatio * circumference);
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onTabChange('path')}
            className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
            aria-label="LinguaFlow - Trang chủ"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-base sm:text-lg">
              LF
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                LinguaFlow
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 -mt-1 hidden md:inline whitespace-nowrap">
                {currentLanguage.vietnameseName} <span aria-hidden="true">·</span> Dành cho người Việt
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-xs xl:text-sm font-medium text-slate-600" aria-label="Điều hướng chính">
          <button
            onClick={() => onTabChange('path')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'path'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            <span>Lộ trình</span>
          </button>

          <button
            onClick={() => onTabChange('academic')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'academic'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            <span>Luyện thi</span>
          </button>

          <button
            onClick={() => onTabChange('roleplay')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'roleplay'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            <span>Hội thoại AI</span>
          </button>

          <button
            onClick={() => onTabChange('grammar')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'grammar'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Microscope className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            <span>Soi Ngữ pháp</span>
          </button>

          <button
            onClick={() => onTabChange('vault')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'vault'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            <span>Từ vựng</span>
          </button>

          <button
            onClick={() => onTabChange('culture')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'culture'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            <span>Văn hóa</span>
          </button>
        </nav>

        {/* Zone 3: Streak, Radial Progress Ring with Daily XP Goal, and Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0" ref={popoverRef}>
          {/* Streak indicator */}
          <div 
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/70 rounded-lg shrink-0"
            title={`Chuỗi học tập: ${streak} ngày liên tiếp`}
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="tabular-nums">{streak}</span>
            <span className="hidden sm:inline font-normal text-amber-600">ngày</span>
          </div>

          {/* Radial Progress Ring & Daily Goal Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsGoalOpen(!isGoalOpen)}
              className={`flex items-center gap-2 px-2 sm:px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isGoalAchieved
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800 hover:bg-emerald-100/90'
                  : 'bg-indigo-50/80 border-indigo-200/80 text-indigo-900 hover:bg-indigo-100/80'
              }`}
              aria-label={`Mục tiêu XP hàng ngày: ${todayXp} trên ${dailyXpGoal} XP (${percent}%)`}
              title="Nhấn để tùy chỉnh mục tiêu XP hàng ngày"
            >
              {/* Radial Progress SVG */}
              <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 -rotate-90" viewBox="0 0 32 32">
                  {/* Background Track */}
                  <circle
                    cx="16"
                    cy="16"
                    r={radius}
                    fill="none"
                    stroke={isGoalAchieved ? '#a7f3d0' : '#e0e7ff'}
                    strokeWidth="3"
                  />
                  {/* Progress Fill */}
                  <circle
                    cx="16"
                    cy="16"
                    r={radius}
                    fill="none"
                    stroke={isGoalAchieved ? '#10b981' : '#4f46e5'}
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {isGoalAchieved ? (
                    <Trophy className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Target className="w-3 h-3 text-indigo-600" />
                  )}
                </div>
              </div>

              {/* Text label */}
              <div className="flex items-center gap-1">
                <span className="tabular-nums font-bold">
                  {todayXp}<span className="text-slate-400 font-normal">/{dailyXpGoal}</span>
                </span>
                <span className="hidden sm:inline text-[11px] font-normal opacity-80">XP</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </button>

            {/* Daily XP Goal Popover Modal */}
            {isGoalOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isGoalAchieved ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">Mục Tiêu XP Hàng Ngày</h4>
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

                {/* Progress Banner */}
                <div className="mt-3.5 p-3.5 rounded-xl bg-linear-to-r from-slate-50 to-indigo-50/40 border border-slate-200">
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
                  {isGoalAchieved ? (
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-700">
                      <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Xuất sắc! Bạn đã vượt mục tiêu hôm nay 🎉</span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 mt-2">
                      Còn thiếu <span className="font-semibold text-indigo-600">{Math.max(0, dailyXpGoal - todayXp)} XP</span> nữa để hoàn thành mục tiêu.
                    </p>
                  )}
                </div>

                {/* Goal Selection Presets */}
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
                            <span className="text-[10px] text-slate-400 hidden sm:inline">({preset.desc})</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Goal Toggle */}
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
                        <button
                          type="button"
                          onClick={() => setIsCustomMode(false)}
                          className="px-2 py-1.5 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                        >
                          Hủy
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Earning XP Tips */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex flex-col gap-1">
                  <div className="font-medium text-slate-600">Cách nhận điểm XP nhanh:</div>
                  <div className="flex items-center justify-between">
                    <span>• Hoàn thành bài học toàn diện</span>
                    <span className="font-semibold text-indigo-600">+30 - +40 XP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Luyện đề IELTS / TOEIC</span>
                    <span className="font-semibold text-indigo-600">+50 - +100 XP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Luyện hội thoại & Soi ngữ pháp</span>
                    <span className="font-semibold text-indigo-600">+15 - +25 XP</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Total XP counter */}
          <div 
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg shrink-0"
            title={`Tổng điểm tích lũy: ${xp} XP`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="tabular-nums font-bold">{xp}</span>
            <span className="font-normal text-slate-500">tổng</span>
          </div>

          {/* Language selector button */}
          <button
            onClick={onOpenLanguageModal}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={`Đổi ngôn ngữ, hiện tại là ${currentLanguage.vietnameseName}`}
          >
            <span className="text-base leading-none">{currentLanguage.flagEmoji}</span>
            <span className="font-medium hidden sm:inline">{currentLanguage.vietnameseName}</span>
          </button>
        </div>
      </div>

      {/* Mobile bottom nav bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200 bg-white py-2 px-1 text-xs font-medium overflow-x-auto">
        <button
          onClick={() => onTabChange('path')}
          className={`flex flex-col items-center gap-1 px-2 py-1 shrink-0 ${
            activeTab === 'path' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Lộ trình</span>
        </button>
        <button
          onClick={() => onTabChange('academic')}
          className={`flex flex-col items-center gap-1 px-2 py-1 shrink-0 ${
            activeTab === 'academic' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Chứng chỉ</span>
        </button>
        <button
          onClick={() => onTabChange('roleplay')}
          className={`flex flex-col items-center gap-1 px-2 py-1 shrink-0 ${
            activeTab === 'roleplay' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Hội thoại AI</span>
        </button>
        <button
          onClick={() => onTabChange('grammar')}
          className={`flex flex-col items-center gap-1 px-2 py-1 shrink-0 ${
            activeTab === 'grammar' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <Microscope className="w-4 h-4" />
          <span>Ngữ pháp</span>
        </button>
        <button
          onClick={() => onTabChange('vault')}
          className={`flex flex-col items-center gap-1 px-2 py-1 shrink-0 ${
            activeTab === 'vault' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Từ vựng</span>
        </button>
        <button
          onClick={() => onTabChange('culture')}
          className={`flex flex-col items-center gap-1 px-2 py-1 shrink-0 ${
            activeTab === 'culture' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Văn hóa</span>
        </button>
      </div>
    </header>
  );
};
