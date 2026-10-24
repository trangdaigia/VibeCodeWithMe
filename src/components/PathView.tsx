import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Check,
  BookOpen,
  ArrowRight,
  MessageSquare,
  Compass,
  GraduationCap,
  Briefcase,
  Coffee,
  Volume2,
  Flame,
  Trophy,
  Target,
  Award,
  CheckCircle2,
  RefreshCw,
  Crown,
  ChevronRight,
  X,
  HelpCircle,
  Layers,
  Microscope,
  Video,
  Mic,
  Zap
} from 'lucide-react';
import { LANGUAGE_COURSES, LanguageCourse, Unit, Lesson } from '../data/curriculum';
import { speakText } from '../utils/speech';
import {
  computeDailyQuests,
  evaluatePlacementLevel,
  buildSortedLeaderboard
} from '../utils/dailyQuests';
import { sanitizePhoneticsForDisplay } from '../utils/ultimateArenaLogic';
import { UserProfileDoc } from '../firebase';
import {
  SPRING_SNAPPY,
  getLanguageAmbientPalette,
  computeStaggerDelay,
  CARD_HOVER_PROPS,
  FLUID_EASE_OUT,
} from '../utils/motionChoreography';

interface PathViewProps {
  course: LanguageCourse;
  selectedLanguageId?: string;
  onSelectLanguage?: (langId: string) => void;
  completedLessonIds: string[];
  onStartLesson: (lesson: Lesson) => void;
  onNavigateToTab: (tab: 'arena' | 'video' | 'studio' | 'academic' | 'roleplay' | 'grammar' | 'vault' | 'culture') => void;
  streak: number;
  xp: number;
  todayXp?: number;
  dailyXpGoal?: number;
  onGainXp?: (amount: number) => void;
  managedUsers?: UserProfileDoc[];
  userDisplayName?: string;
  userRole?: string;
  userTargetBand?: string;
}

export const PathView: React.FC<PathViewProps> = ({
  course,
  selectedLanguageId = 'english',
  onSelectLanguage,
  completedLessonIds,
  onStartLesson,
  onNavigateToTab,
  streak,
  xp,
  todayXp = 30,
  dailyXpGoal = 50,
  onGainXp,
  managedUsers = [],
  userDisplayName = 'Quản trị viên (Bạn)',
  userRole = 'admin',
  userTargetBand = 'Band 8.5+'
}) => {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('all');

  // Word of the Day & Quick Mini-Quiz State
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [selectedWordQuizOption, setSelectedWordQuizOption] = useState<string | null>(null);
  const [dailyWordPracticed, setDailyWordPracticed] = useState<boolean>(false);
  const [claimedQuestIds, setClaimedQuestIds] = useState<string[]>([]);

  // Interactive CEFR Placement Test Modal State
  const [isPlacementOpen, setIsPlacementOpen] = useState<boolean>(false);
  const [placementStep, setPlacementStep] = useState<number>(0);
  const [placementAnswers, setPlacementAnswers] = useState<Record<number, string>>({});
  const [placementFinished, setPlacementFinished] = useState<boolean>(false);
  const [detectedCefrBadge, setDetectedCefrBadge] = useState<string | null>(null);

  const allLessons = useMemo(
    () => course.units.flatMap((u) => u.lessons),
    [course]
  );
  const totalLessons = allLessons.length;
  const completedInCourseCount = allLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedInCourseCount / totalLessons) * 100) : 0;

  // Next recommended lesson (first incomplete lesson, or first lesson if all completed)
  const nextRecommendedLesson: Lesson =
    allLessons.find((l) => !completedLessonIds.includes(l.id)) || allLessons[0];

  const filteredUnits = course.units.filter((unit) => {
    if (selectedTrackFilter === 'all') return true;
    return unit.track === selectedTrackFilter;
  });

  // Word of the Day Card
  const safeVocabList = course.vocabCards.length > 0 ? course.vocabCards : [];
  const activeWordCard = safeVocabList[wordIndex % Math.max(1, safeVocabList.length)];

  // Generate 3 quiz options for the active Word of the Day
  const wordQuizOptions = useMemo(() => {
    if (!activeWordCard) return [];
    const distractors = safeVocabList
      .filter((c) => c.id !== activeWordCard.id)
      .slice(0, 2)
      .map((c) => c.meaning);
    while (distractors.length < 2) {
      distractors.push('Nghĩa giao tiếp mở rộng trong ngữ cảnh trang trọng');
    }
    const base = [activeWordCard.meaning, distractors[0], distractors[1]];
    // Deterministic shuffle based on word ID length
    const shift = activeWordCard.word.length % 3;
    return [...base.slice(shift), ...base.slice(0, shift)];
  }, [activeWordCard, safeVocabList]);

  // Daily Quests computation
  const dailyQuests = useMemo(
    () =>
      computeDailyQuests({
        todayXp,
        dailyXpGoal,
        completedLessonsCount: completedLessonIds.length,
        dailyWordPracticed
      }),
    [todayXp, dailyXpGoal, completedLessonIds.length, dailyWordPracticed]
  );

  // Weekly League Leaderboard
  const leaderboard = useMemo(
    () =>
      buildSortedLeaderboard(
        managedUsers.length > 0
          ? managedUsers
          : [
              {
                uid: 'owner_admin',
                displayName: userDisplayName,
                role: userRole,
                xp,
                streak,
                targetBand: userTargetBand
              }
            ],
        {
          displayName: userDisplayName,
          role: userRole,
          xp,
          streak,
          targetBand: userTargetBand
        }
      ),
    [managedUsers, userDisplayName, userRole, xp, streak, userTargetBand]
  );

  // Build 5 placement questions dynamically from the active language course
  const placementQuestions = useMemo(() => {
    const cards = course.vocabCards.slice(0, 5);
    return cards.map((card, idx) => {
      const otherMeanings = course.vocabCards
        .filter((c) => c.id !== card.id)
        .slice(idx, idx + 3)
        .map((c) => c.meaning);
      const opts = [card.meaning, ...otherMeanings.slice(0, 2)];
      const rotated = [...opts.slice(idx % 3), ...opts.slice(0, idx % 3)];
      return {
        index: idx,
        levelTag: idx === 0 ? 'A1' : idx === 1 ? 'A2' : idx === 2 ? 'B1' : idx === 3 ? 'B2' : 'C1',
        word: card.word,
        romanization: card.romanization,
        exampleSentence: card.exampleSentence,
        correctMeaning: card.meaning,
        options: rotated
      };
    });
  }, [course]);

  const handleSelectWordQuizAnswer = (option: string) => {
    setSelectedWordQuizOption(option);
    if (activeWordCard && option === activeWordCard.meaning && !dailyWordPracticed) {
      setDailyWordPracticed(true);
      if (onGainXp) onGainXp(15);
    }
  };

  const handleNextWordOfTheDay = () => {
    setSelectedWordQuizOption(null);
    setWordIndex((prev) => (prev + 1) % Math.max(1, safeVocabList.length));
  };

  const handleClaimQuest = (questId: string, reward: number) => {
    if (claimedQuestIds.includes(questId)) return;
    setClaimedQuestIds((prev) => [...prev, questId]);
    if (onGainXp) onGainXp(reward);
  };

  const placementCorrectCount = placementQuestions.filter(
    (q) => placementAnswers[q.index] === q.correctMeaning
  ).length;
  const placementEvaluation = evaluatePlacementLevel(
    placementCorrectCount,
    placementQuestions.length
  );

  const handleStartPlacementTest = () => {
    setPlacementStep(0);
    setPlacementAnswers({});
    setPlacementFinished(false);
    setIsPlacementOpen(true);
  };

  const handleFinishPlacementTest = () => {
    setPlacementFinished(true);
    setDetectedCefrBadge(placementEvaluation.cefrLevel);
    if (onGainXp) onGainXp(50);
  };

  const ambientTheme = useMemo(
    () => getLanguageAmbientPalette(selectedLanguageId || course.id),
    [selectedLanguageId, course.id]
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Quick 7-Language Course Selector Strip with Smooth Sliding Pill */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-1.5 shadow-2xs grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
        {Object.values(LANGUAGE_COURSES).map((langCourse) => {
          const isSelected = langCourse.id === course.id || langCourse.id === selectedLanguageId;
          return (
            <motion.button
              key={langCourse.id}
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectLanguage && onSelectLanguage(langCourse.id)}
              className={`relative flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="activeCoursePill"
                  transition={SPRING_SNAPPY}
                  className="absolute inset-0 rounded-xl bg-slate-900 shadow-xs -z-0"
                />
              )}
              <span className="relative z-10 text-base leading-none">{langCourse.flagEmoji}</span>
              <span className="relative z-10 truncate">{langCourse.vietnameseName}</span>
            </motion.button>
          );
        })}
      </div>

      {/* 2. Hero Course Command Banner with Dynamic Ambient Aurora Glow */}
      <section
        className={`bg-gradient-to-br ${ambientTheme.heroGradient} text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800/80 relative overflow-hidden transition-colors duration-700`}
      >
        {/* Dynamic ambient background glow orbs */}
        <div
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none ${ambientTheme.orbPrimary} animate-aurora-pulse`}
          aria-hidden="true"
        />
        <div
          className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none ${ambientTheme.orbSecondary} animate-aurora-pulse`}
          style={{ animationDelay: '2.5s' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            {/* Unboxed Metadata Line with Floating Polyglot Badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-indigo-200">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 font-bold">
                <span>{course.flagEmoji}</span>
                <span>{course.vietnameseName} ({course.nativeName})</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Hệ chữ: {course.scriptType}</span>
              <span aria-hidden="true">·</span>
              <span>Chứng chỉ mục tiêu: {course.examInfo[0]?.examName || 'IELTS Academic'}</span>
              {detectedCefrBadge && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-300 font-bold">Trình độ đánh giá: CEFR {detectedCefrBadge}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-balance leading-tight">
              Lộ Trình Chinh Phục {course.vietnameseName} Thực Chiến &amp; Học Thuật
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Kết hợp phương pháp lặp lại ngắt quãng (SRS), phản xạ giao tiếp AI theo ngữ cảnh, phân tích ngữ pháp chuyên sâu và phòng thi mô phỏng chuẩn quốc tế.
            </p>

            {/* Primary CTA Buttons with Fluid Press Physics */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {nextRecommendedLesson && (
                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18, ease: FLUID_EASE_OUT }}
                  onClick={() => onStartLesson(nextRecommendedLesson)}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-xs sm:text-sm shadow-md transition-shadow cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Học tiếp: {nextRecommendedLesson.title}</span>
                </motion.button>
              )}

              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: FLUID_EASE_OUT }}
                onClick={handleStartPlacementTest}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-xs sm:text-sm transition-all cursor-pointer backdrop-blur-xs"
              >
                <Target className="w-4 h-4 text-amber-300" />
                <span>Kiểm tra trình độ CEFR (5 câu · +50 XP)</span>
              </motion.button>
            </div>
          </div>

          {/* Right Quick Feature Cards with Interactive Hover Elevation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 lg:w-80 shrink-0">
            <motion.button
              type="button"
              whileHover={{ y: -2.5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: FLUID_EASE_OUT }}
              onClick={() => onNavigateToTab('arena')}
              className="p-3.5 rounded-2xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/40 text-left transition-colors flex items-center justify-between group cursor-pointer backdrop-blur-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-amber-300">Đấu Trường AI &amp; Chứng Chỉ</div>
                  <div className="text-[11px] text-amber-100">Ghép câu C1 · Sóng não 432Hz · Cấp bằng</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -2.5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: FLUID_EASE_OUT }}
              onClick={() => onNavigateToTab('video')}
              className="p-3.5 rounded-2xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-left transition-colors flex items-center justify-between group cursor-pointer backdrop-blur-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-400/25 text-indigo-200 border border-indigo-300/40 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Học Video AI Người Ảo &amp; Giọng Ảo</div>
                  <div className="text-[11px] text-indigo-200">Giảng dạy từ Cơ bản tới Nâng cao</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -2.5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: FLUID_EASE_OUT }}
              onClick={() => onNavigateToTab('studio')}
              className="p-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-left transition-colors flex items-center justify-between group cursor-pointer backdrop-blur-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/25 text-emerald-200 border border-emerald-300/40 flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Phòng Lab Phát Âm &amp; Chấm Viết AI</div>
                  <div className="text-[11px] text-emerald-200">Sóng âm khẩu hình · Chấm Band C1/C2 · Radar 6 chiều</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -2.5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: FLUID_EASE_OUT }}
              onClick={() => onNavigateToTab('academic')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-colors flex items-center justify-between group cursor-pointer backdrop-blur-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Phòng Thi Thử {course.examInfo[0]?.examName?.split(' ')[0] || 'IELTS'}</div>
                  <div className="text-[11px] text-slate-300">Đề chuẩn 80 câu · Chấm Band tự động</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -2.5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: FLUID_EASE_OUT }}
              onClick={() => onNavigateToTab('roleplay')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-colors flex items-center justify-between group cursor-pointer backdrop-blur-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Nhập Vai Giao Tiếp &amp; Phỏng Vấn</div>
                  <div className="text-[11px] text-slate-300">{course.scenarios.length} kịch bản phản xạ thực tế</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Course Mastery Progress Bar with Fluid Spring Transition */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-medium">
              <span>
                Tiến độ hoàn thành khóa {course.vietnameseName}: <strong className="text-white">{completedInCourseCount}/{totalLessons} bài học</strong>
              </span>
              <span className="font-bold text-amber-300 tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.max(6, progressPercent)}%` }}
                transition={{ duration: 0.8, ease: FLUID_EASE_OUT }}
                className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 h-2.5 rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-300 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateToTab('vault')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-300" />
              <span>Kho từ vựng: <strong className="text-white">{course.vocabCards.length} từ</strong></span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigateToTab('grammar')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Microscope className="w-3.5 h-3.5 text-emerald-300" />
              <span>Phòng Lab Ngữ Pháp</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2B. IELTS & INTERNATIONAL EXAM COMMAND STRIP */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black uppercase tracking-wider font-mono">
                IELTS &amp; CHỨNG CHỈ QUỐC TẾ
              </span>
              <span className="text-xs font-bold text-indigo-700">
                Cambridge 19 · IDP · British Council Official Format
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
              Hệ Sinh Thái Thi Thử CD-IELTS 80 Câu &amp; Ôn Luyện Chuyên Sâu 4 Kỹ Năng
            </h2>
            <p className="text-xs text-slate-500">
              Thi trên máy 40 câu Listening + 40 câu Reading, chấm Writing tự động theo 4 tiêu chí (TA/CC/LR/GRA), luyện Paraphrase &amp; bẫy T/F/NG.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateToTab('academic')}
              className="p-3 rounded-xl bg-red-50 hover:bg-red-100/80 border border-red-200 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-black text-red-800 flex items-center justify-between">
                <span>Phòng Thi CD-IELTS</span>
                <Trophy className="w-3.5 h-3.5 text-red-600" />
              </div>
              <div className="text-[11px] text-red-700 mt-0.5">Full 80 câu · Chấm TRF tự động</div>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToTab('academic')}
              className="p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-black text-indigo-900 flex items-center justify-between">
                <span>Luyện Bẫy &amp; Paraphrase</span>
                <Target className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <div className="text-[11px] text-indigo-700 mt-0.5">T/F/NG · Nâng câu Band 8.5+</div>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToTab('studio')}
              className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs font-black text-emerald-900 flex items-center justify-between">
                <span>Chấm Writing &amp; Nói AI</span>
                <Award className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">4 Tiêu chí Cambridge · 1-1</div>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Main 2-Column Language Learning Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 8 COLUMNS: Interactive Learning Path & Curriculum Units */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Bản Đồ Chặng Học Tập</h2>
              <p className="text-xs text-slate-500">Hoàn thành từng bài để mở khóa kiến thức và tích lũy điểm XP</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto max-w-full">
              {[
                { id: 'all', label: `Tất cả (${course.units.length})`, icon: null },
                { id: 'daily', label: 'Đời sống', icon: Coffee },
                { id: 'workplace', label: 'Đi làm & Phỏng vấn', icon: Briefcase },
                { id: 'academic', label: 'Học thuật', icon: GraduationCap },
              ].map((trk) => {
                const isSelected = selectedTrackFilter === trk.id;
                const Icon = trk.icon;
                return (
                  <motion.button
                    key={trk.id}
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedTrackFilter(trk.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected ? 'text-indigo-700' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeTrackFilterPill"
                        transition={SPRING_SNAPPY}
                        className="absolute inset-0 rounded-lg bg-white shadow-2xs -z-0"
                      />
                    )}
                    {Icon && <Icon className="relative z-10 w-3.5 h-3.5" />}
                    <span className="relative z-10">{trk.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Units List with Staggered Fluid Entrances */}
          <div className="space-y-5">
            {filteredUnits.map((unit: Unit, uIdx: number) => {
              const unitDoneCount = unit.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: computeStaggerDelay(uIdx), duration: 0.35, ease: FLUID_EASE_OUT }}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs card-interactive-lift"
                >
                  {/* Unit Header */}
                  <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                        <span>Chương 0{unit.number}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {unit.track === 'workplace'
                            ? 'Công sở & Phỏng vấn'
                            : unit.track === 'academic'
                            ? 'Học thuật & Chứng chỉ'
                            : 'Giao tiếp Đời sống'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Chuẩn CEFR {unit.cefrLevel}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                        {unit.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {unit.description}
                      </p>
                    </div>

                    <div className="text-xs font-bold text-slate-700 shrink-0 tabular-nums">
                      Hoàn thành {unitDoneCount}/{unit.lessons.length} bài
                    </div>
                  </div>

                  {/* Lesson Nodes */}
                  <div className="divide-y divide-slate-100">
                    {unit.lessons.map((lesson: Lesson, lIdx: number) => {
                      const isCompleted = completedLessonIds.includes(lesson.id);
                      const sampleAudioExercise = lesson.exercises.find((ex) => ex.targetText || ex.audioText);
                      const samplePhrase = sampleAudioExercise?.targetText || sampleAudioExercise?.audioText;

                      return (
                        <div
                          key={lesson.id}
                          className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                                isCompleted
                                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                  : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                              }`}
                            >
                              {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : `0${lIdx + 1}`}
                            </div>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                                  {lesson.title}
                                </h4>
                                {isCompleted && (
                                  <span className="text-[11px] font-bold text-emerald-600">
                                    · Đã hoàn thành
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed">
                                {lesson.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-1">
                                <span>Thời lượng {lesson.durationMinutes} phút</span>
                                <span aria-hidden="true">·</span>
                                <span className="text-indigo-600 font-bold">+{lesson.xpReward} XP</span>
                                <span aria-hidden="true">·</span>
                                <span>{lesson.exercises.length} bài tập tương tác</span>
                                {samplePhrase && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <button
                                      type="button"
                                      onClick={() => speakText(samplePhrase, course.voiceLangCode)}
                                      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                                      title="Nghe thử mẫu câu chuẩn bản xứ trong bài"
                                    >
                                      <Volume2 className="w-3 h-3" />
                                      <span>Nghe mẫu câu</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <motion.button
                              type="button"
                              whileHover={{ y: -1, scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => onStartLesson(lesson)}
                              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer ${
                                isCompleted
                                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                              }`}
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{isCompleted ? 'Ôn tập lại' : 'Bắt đầu học'}</span>
                            </motion.button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT 4 COLUMNS: Sticky Language Learning Companion Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* WIDGET 1: Daily Quests (Nhiệm Vụ Hàng Ngày) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Nhiệm Vụ Hàng Ngày</h3>
                  <p className="text-[11px] text-slate-500">Hoàn thành để nhận thưởng XP</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 tabular-nums">
                {dailyQuests.filter((q) => q.isCompleted).length}/{dailyQuests.length} hoàn tất
              </span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => {
                const ratio = quest.target > 0 ? Math.min(100, Math.round((quest.current / quest.target) * 100)) : 0;
                const isClaimed = claimedQuestIds.includes(quest.id);

                return (
                  <div
                    key={quest.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      quest.isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-slate-50/70 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {quest.title}
                      </div>
                      <span className="text-[11px] font-bold text-amber-600 shrink-0">
                        +{quest.xpReward} XP
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>Tiến độ</span>
                      <span className="font-bold text-slate-700 tabular-nums">
                        {quest.current}/{quest.target}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          quest.isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                        }`}
                        style={{ width: `${ratio}%` }}
                      />
                    </div>

                    {quest.isCompleted && (
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đã đạt mục tiêu
                        </span>
                        {!isClaimed ? (
                          <button
                            type="button"
                            onClick={() => handleClaimQuest(quest.id, quest.xpReward)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer transition-colors"
                          >
                            Nhận +{quest.xpReward} XP
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-400">Đã nhận thưởng</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* WIDGET 2: Word of the Day & 10-Second Reflex Quiz */}
          {activeWordCard && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                    Từ Vựng Tâm Điểm · {course.vietnameseName}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Phản Xạ Từ Vựng 10 Giây</h3>
                </div>
                <button
                  type="button"
                  onClick={handleNextWordOfTheDay}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Đổi từ vựng khác"
                  aria-label="Đổi từ vựng tâm điểm khác"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Word Showcase Box */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-lg font-black tracking-tight text-amber-300">
                      {activeWordCard.word}
                    </div>
                    {activeWordCard.romanization && (
                      <div className="text-xs text-indigo-200 font-sans">
                        {sanitizePhoneticsForDisplay(activeWordCard.romanization)} · {activeWordCard.partOfSpeech}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => speakText(activeWordCard.word, course.voiceLangCode)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                    title="Nghe phát âm chuẩn bản xứ"
                    aria-label={`Phát âm từ ${activeWordCard.word}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed border-t border-white/10 pt-2">
                  "{activeWordCard.exampleSentence}"
                </p>
              </div>

              {/* Quick 3-choice Quiz */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700">
                  Chọn nghĩa tiếng Việt chính xác của từ trên (+15 XP):
                </div>
                <div className="space-y-1.5">
                  {wordQuizOptions.map((opt, idx) => {
                    const isPicked = selectedWordQuizOption === opt;
                    const isCorrect = opt === activeWordCard.meaning;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectWordQuizAnswer(opt)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          !selectedWordQuizOption
                            ? 'bg-slate-50 hover:bg-indigo-50/50 border-slate-200 text-slate-700'
                            : isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : isPicked
                            ? 'bg-rose-50 border-rose-300 text-rose-900'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedWordQuizOption && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* WIDGET 3: Weekly Diamond League Leaderboard */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Bảng Xếp Hạng Tuần</h3>
                  <p className="text-[11px] text-slate-500">Giải Đấu Kim Cương · Đồng bộ Cloud</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {leaderboard.slice(0, 5).map((item) => (
                <div
                  key={item.uid}
                  className={`py-2.5 flex items-center justify-between gap-3 ${
                    item.isCurrentUser ? 'bg-indigo-50/60 -mx-2 px-2 rounded-xl' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                        item.rank === 1
                          ? 'bg-amber-400 text-slate-950'
                          : item.rank === 2
                          ? 'bg-slate-200 text-slate-800'
                          : item.rank === 3
                          ? 'bg-amber-700/20 text-amber-900'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.rank}
                    </span>

                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                        <span className="truncate">{item.displayName}</span>
                        {item.isCurrentUser && (
                          <span className="text-[10px] font-extrabold text-indigo-600 shrink-0">(Bạn)</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Chuỗi {item.streak} ngày · {item.targetBand}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-black text-indigo-600 tabular-nums shrink-0">
                    {item.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* =========================================================
          INTERACTIVE CEFR PLACEMENT TEST MODAL (A1 - C1)
         ========================================================= */}
      {isPlacementOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cefr-placement-title"
        >
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Đánh giá năng lực chuẩn châu Âu (CEFR)
                </div>
                <h3 id="cefr-placement-title" className="text-base font-bold">
                  Kiểm Tra Trình Độ {course.vietnameseName} (A1 – C1)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPlacementOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 cursor-pointer"
                aria-label="Đóng kiểm tra trình độ"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!placementFinished ? (
              <div className="p-6 space-y-5">
                {placementQuestions[placementStep] && (
                  <>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>
                        Câu hỏi {placementStep + 1} / {placementQuestions.length}
                      </span>
                      <span className="text-indigo-600 font-bold">
                        Cấp độ câu hỏi: CEFR {placementQuestions[placementStep].levelTag}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-black text-slate-900">
                          {placementQuestions[placementStep].word}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            speakText(placementQuestions[placementStep].word, course.voiceLangCode)
                          }
                          className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 italic">
                        Ví dụ: "{placementQuestions[placementStep].exampleSentence}"
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-700">
                        Chọn nghĩa tiếng Việt phù hợp nhất:
                      </div>
                      {placementQuestions[placementStep].options.map((opt, idx) => {
                        const isSelected = placementAnswers[placementStep] === opt;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              setPlacementAnswers((prev) => ({
                                ...prev,
                                [placementStep]: opt
                              }))
                            }
                            className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-950'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={placementStep === 0}
                        onClick={() => setPlacementStep((s) => Math.max(0, s - 1))}
                        className="px-4 py-2 text-xs font-bold text-slate-600 disabled:opacity-40 cursor-pointer"
                      >
                        Quay lại
                      </button>

                      {placementStep < placementQuestions.length - 1 ? (
                        <button
                          type="button"
                          disabled={!placementAnswers[placementStep]}
                          onClick={() => setPlacementStep((s) => s + 1)}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold cursor-pointer"
                        >
                          Câu tiếp theo
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={!placementAnswers[placementStep]}
                          onClick={handleFinishPlacementTest}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-bold cursor-pointer"
                        >
                          Hoàn tất & Xem kết quả (+50 XP)
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-black text-xl">
                  {placementEvaluation.cefrLevel}
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-600 uppercase">
                    Kết quả phân loại trình độ ({placementCorrectCount}/{placementQuestions.length} câu đúng)
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mt-1">
                    {placementEvaluation.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                    {placementEvaluation.summary}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTrackFilter(placementEvaluation.recommendedTrack);
                      setIsPlacementOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Áp dụng lộ trình khuyến nghị
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
