import React, { useState, useEffect } from 'react';
import { LANGUAGE_COURSES, LanguageCourse, Lesson, VocabCard } from './data/curriculum';
import { TopNav, ActiveTab } from './components/TopNav';
import { LanguageSelector } from './components/LanguageSelector';
import { PathView } from './components/PathView';
import { AcademicExamView } from './components/AcademicExamView';
import { RoleplayView } from './components/RoleplayView';
import { GrammarLabView } from './components/GrammarLabView';
import { VocabVaultView } from './components/VocabVaultView';
import { CultureView } from './components/CultureView';
import { LessonModal } from './components/LessonModal';
import { calculateStreak } from './utils/grammar';

export default function App() {
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_lang');
      if (saved && LANGUAGE_COURSES[saved]) return saved;
    }
    return 'english';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as ActiveTab;
      if (['path', 'academic', 'roleplay', 'grammar', 'vault', 'culture'].includes(tabParam)) {
        return tabParam;
      }
    }
    return 'path';
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

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
        localStorage.setItem('linguaflow_today_xp', '30'); // Friendly initial progress for today
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar Contract (3 zones) */}
      <TopNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentLanguage={currentCourse}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        streak={streak}
        xp={xp}
        dailyXpGoal={dailyXpGoal}
        todayXp={todayXp}
        onSetDailyGoal={handleSetDailyGoal}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'path' && (
          <PathView
            course={currentCourse}
            completedLessonIds={completedLessonIds}
            onStartLesson={(lesson) => setActiveLesson(lesson)}
            onNavigateToTab={setActiveTab}
            streak={streak}
            xp={xp}
          />
        )}

        {activeTab === 'academic' && (
          <AcademicExamView
            course={currentCourse}
            onGainXp={handleGainXp}
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
          />
        )}

        {activeTab === 'culture' && (
          <CultureView
            course={currentCourse}
          />
        )}
      </main>

      {/* Language Switcher Modal */}
      <LanguageSelector
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        selectedLanguageId={selectedLanguageId}
        onSelectLanguage={setSelectedLanguageId}
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

      {/* Minimal Anti-slop Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-medium text-slate-700">
            LinguaFlow <span aria-hidden="true">·</span> Nền tảng học 7 ngôn ngữ toàn diện dành cho người Việt
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
