import React from 'react';
import { Flame, Sparkles, BookOpen, MessageSquare, Microscope, Layers, Compass, GraduationCap } from 'lucide-react';
import { LanguageCourse } from '../data/curriculum';

export type ActiveTab = 'path' | 'academic' | 'roleplay' | 'grammar' | 'vault' | 'culture';

interface TopNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentLanguage: LanguageCourse;
  onOpenLanguageModal: () => void;
  streak: number;
  xp: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  currentLanguage,
  onOpenLanguageModal,
  streak,
  xp,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('path')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
            aria-label="LinguaFlow - Trang chủ"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
              LF
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                LinguaFlow
              </span>
              <span className="text-[11px] font-medium text-slate-500 -mt-1 hidden sm:inline whitespace-nowrap">
                {currentLanguage.vietnameseName} <span aria-hidden="true">·</span> Dành cho người Việt
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600" aria-label="Điều hướng chính">
          <button
            onClick={() => onTabChange('path')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'path'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lộ trình học</span>
          </button>

          <button
            onClick={() => onTabChange('academic')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'academic'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Luyện thi chứng chỉ</span>
          </button>

          <button
            onClick={() => onTabChange('roleplay')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'roleplay'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Phỏng vấn & Đàm thoại AI</span>
          </button>

          <button
            onClick={() => onTabChange('grammar')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'grammar'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Microscope className="w-4 h-4" />
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
            <Layers className="w-4 h-4" />
            <span>Từ vựng SRS</span>
          </button>

          <button
            onClick={() => onTabChange('culture')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'culture'
                ? 'text-indigo-600 border-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Văn hóa & Mẹo</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action group / language switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/70 rounded-lg">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="tabular-nums">{streak}</span>
            <span className="hidden sm:inline font-normal text-amber-600">ngày</span>
          </div>

          {/* XP counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="tabular-nums">{xp}</span>
            <span className="hidden sm:inline font-normal text-indigo-600">XP</span>
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
