import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  CheckCircle2,
  Sparkles,
  Video,
  UserCheck,
  Plus,
  X,
  Award,
  BookOpen,
  Layers,
  GraduationCap,
  Subtitles,
  RotateCcw,
  Mic
} from 'lucide-react';
import { LANGUAGE_COURSES, LanguageCourse } from '../data/curriculum';
import {
  AiVideoLesson,
  VideoLevelTier,
  VoicePersonaId
} from '../data/aiVideoCurriculum';
import {
  getVideoLessonsByLanguage,
  filterVideoLessonsByTier,
  getInstructorsForLanguage,
  findActiveSegmentIndex,
  formatVideoTimestamp,
  computeVideoCurriculumProgress,
  buildCustomAiVideoLesson
} from '../utils/aiVideoLogic';
import { speakAiVirtualVoice, stopSpeaking } from '../utils/speech';
import { AiVirtualHumanStage } from './video/AiVirtualHumanStage';

interface AiVideoLearningViewProps {
  course: LanguageCourse;
  selectedLanguageId: string;
  onSelectLanguage: (langId: string) => void;
  defaultVoiceSpeed?: number;
  onGainXp: (amount: number) => void;
}

export const AiVideoLearningView: React.FC<AiVideoLearningViewProps> = ({
  course,
  selectedLanguageId,
  onSelectLanguage,
  defaultVoiceSpeed = 1.0,
  onGainXp
}) => {
  // Custom user-created AI Video lessons persisted in localStorage
  const [customLessons, setCustomLessons] = useState<AiVideoLesson[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_custom_ai_videos');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [];
  });

  // Completed video lesson IDs persisted in localStorage
  const [completedVideoIds, setCompletedVideoIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linguaflow_completed_ai_videos');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('linguaflow_custom_ai_videos', JSON.stringify(customLessons));
  }, [customLessons]);

  useEffect(() => {
    localStorage.setItem('linguaflow_completed_ai_videos', JSON.stringify(completedVideoIds));
  }, [completedVideoIds]);

  // Level filter: 'all' | 'basic' | 'intermediate' | 'advanced'
  const [tierFilter, setTierFilter] = useState<'all' | VideoLevelTier>('all');

  // All lessons for current language (sorted Basic -> Intermediate -> Advanced)
  const languageLessons = useMemo(
    () => getVideoLessonsByLanguage(selectedLanguageId, customLessons),
    [selectedLanguageId, customLessons]
  );

  const filteredLessons = useMemo(
    () => filterVideoLessonsByTier(languageLessons, tierFilter),
    [languageLessons, tierFilter]
  );

  const instructors = useMemo(
    () => getInstructorsForLanguage(selectedLanguageId),
    [selectedLanguageId]
  );

  // Active video lesson ID
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    const initial = getVideoLessonsByLanguage(selectedLanguageId);
    return initial[0]?.id || '';
  });

  const activeLesson: AiVideoLesson = useMemo(() => {
    return (
      languageLessons.find((l) => l.id === activeLessonId) ||
      filteredLessons[0] ||
      languageLessons[0]
    );
  }, [languageLessons, filteredLessons, activeLessonId]);

  // Selected AI Virtual Human Instructor ID
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>(
    () => activeLesson?.instructorId || instructors[0]?.id || ''
  );

  // Selected AI Voice Persona & Speed
  const [voicePersona, setVoicePersona] = useState<VoicePersonaId>('female-warm');
  const [voiceRate, setVoiceRate] = useState<number>(defaultVoiceSpeed || 1.0);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [mouthPhase, setMouthPhase] = useState<number>(0);
  const [blinkState, setBlinkState] = useState<boolean>(false);
  const lastSpokenSegmentRef = useRef<string | null>(null);

  // Quiz & Shadowing state for current lesson
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [shadowingDone, setShadowingDone] = useState<boolean>(false);

  // Custom AI Video Generator Modal state
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [customTopicTitle, setCustomTopicTitle] = useState<string>('');
  const [customTargetSentence, setCustomTargetSentence] = useState<string>('');
  const [customPhonetic, setCustomPhonetic] = useState<string>('');
  const [customMeaning, setCustomMeaning] = useState<string>('');
  const [customLevel, setCustomLevel] = useState<VideoLevelTier>('basic');
  const [customError, setCustomError] = useState<string | null>(null);

  // Reset active lesson and instructor when language changes
  useEffect(() => {
    stopSpeaking();
    setIsPlaying(false);
    setCurrentTime(0);
    setTierFilter('all');
    const nextLessons = getVideoLessonsByLanguage(selectedLanguageId, customLessons);
    if (nextLessons.length > 0) {
      setActiveLessonId(nextLessons[0].id);
      const nextInstId = nextLessons[0].instructorId;
      setSelectedInstructorId(nextInstId);
      const foundInst = getInstructorsForLanguage(selectedLanguageId).find(
        (i) => i.id === nextInstId
      );
      if (foundInst) {
        setVoicePersona(foundInst.voicePersona);
      }
    }
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setShadowingDone(false);
    lastSpokenSegmentRef.current = null;
  }, [selectedLanguageId]);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const activeInstructor = useMemo(() => {
    return (
      instructors.find((inst) => inst.id === selectedInstructorId) ||
      instructors.find((inst) => inst.id === activeLesson?.instructorId) ||
      instructors[0]
    );
  }, [instructors, selectedInstructorId, activeLesson]);

  const activeSegmentIndex = useMemo(
    () => findActiveSegmentIndex(activeLesson.segments, currentTime),
    [activeLesson.segments, currentTime]
  );

  const activeSegment =
    activeLesson.segments[activeSegmentIndex] || activeLesson.segments[0];

  const progressStats = useMemo(
    () => computeVideoCurriculumProgress(languageLessons, completedVideoIds),
    [languageLessons, completedVideoIds]
  );

  // Natural Eye Blinking interval for AI Virtual Human
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 160);
    }, 3400);
    return () => clearInterval(blinkInterval);
  }, []);

  // Lip-sync mouth viseme animation & timeline progression when playing
  useEffect(() => {
    if (!isPlaying) {
      setMouthPhase(0);
      return;
    }

    const visemeTimer = setInterval(() => {
      setMouthPhase((prev) => (prev + 1) % 4);
    }, 160);

    const timelineTimer = setInterval(() => {
      setCurrentTime((prev) => {
        const nextTime = prev + 0.5 * voiceRate;
        if (nextTime >= activeLesson.durationSeconds) {
          setIsPlaying(false);
          stopSpeaking();
          lastSpokenSegmentRef.current = null;
          return activeLesson.durationSeconds;
        }
        return nextTime;
      });
    }, 500);

    return () => {
      clearInterval(visemeTimer);
      clearInterval(timelineTimer);
    };
  }, [isPlaying, voiceRate, activeLesson.durationSeconds]);

  // Trigger AI Virtual Voice synthesis whenever a new segment becomes active during playback
  useEffect(() => {
    if (!isPlaying || !activeSegment) return;
    if (lastSpokenSegmentRef.current === activeSegment.id) return;

    lastSpokenSegmentRef.current = activeSegment.id;
    speakAiVirtualVoice(activeSegment.targetScript, {
      langCode: course.voiceLangCode,
      rate: voiceRate,
      pitch: activeInstructor.defaultPitch,
      persona: voicePersona
    });
  }, [isPlaying, activeSegment, course.voiceLangCode, voiceRate, activeInstructor, voicePersona]);

  const handleSelectLesson = (lesson: AiVideoLesson) => {
    stopSpeaking();
    setIsPlaying(false);
    setActiveLessonId(lesson.id);
    setCurrentTime(0);
    setSelectedInstructorId(lesson.instructorId);
    const inst = instructors.find((i) => i.id === lesson.instructorId);
    if (inst) {
      setVoicePersona(inst.voicePersona);
    }
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setShadowingDone(false);
    lastSpokenSegmentRef.current = null;
  };

  const handleFilterTierChange = (tier: 'all' | VideoLevelTier) => {
    setTierFilter(tier);
    const matching = filterVideoLessonsByTier(languageLessons, tier);
    if (matching.length > 0 && !matching.some((l) => l.id === activeLesson.id)) {
      handleSelectLesson(matching[0]);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSpeaking();
      lastSpokenSegmentRef.current = null;
    } else {
      if (currentTime >= activeLesson.durationSeconds) {
        setCurrentTime(0);
      }
      lastSpokenSegmentRef.current = null;
      setIsPlaying(true);
    }
  };

  const handleJumpToSegment = (segmentStartTime: number, segmentId: string, script: string) => {
    setCurrentTime(segmentStartTime);
    lastSpokenSegmentRef.current = segmentId;
    setIsPlaying(true);
    speakAiVirtualVoice(script, {
      langCode: course.voiceLangCode,
      rate: voiceRate,
      pitch: activeInstructor.defaultPitch,
      persona: voicePersona
    });
  };

  const handlePrevSegment = () => {
    const prevIdx = Math.max(0, activeSegmentIndex - 1);
    const seg = activeLesson.segments[prevIdx];
    if (seg) {
      handleJumpToSegment(seg.startTime, seg.id, seg.targetScript);
    }
  };

  const handleNextSegment = () => {
    const nextIdx = Math.min(activeLesson.segments.length - 1, activeSegmentIndex + 1);
    const seg = activeLesson.segments[nextIdx];
    if (seg) {
      handleJumpToSegment(seg.startTime, seg.id, seg.targetScript);
    }
  };

  const handleSwitchInstructor = (instId: string) => {
    setSelectedInstructorId(instId);
    const found = instructors.find((i) => i.id === instId);
    if (found) {
      setVoicePersona(found.voicePersona);
      if (isPlaying && activeSegment) {
        speakAiVirtualVoice(activeSegment.targetScript, {
          langCode: course.voiceLangCode,
          rate: voiceRate,
          pitch: found.defaultPitch,
          persona: found.voicePersona
        });
      }
    }
  };

  const handleSpeakSinglePhrase = (text: string, customRate?: number) => {
    setIsPlaying(false);
    lastSpokenSegmentRef.current = null;
    setMouthPhase(1);
    speakAiVirtualVoice(text, {
      langCode: course.voiceLangCode,
      rate: customRate || voiceRate,
      pitch: activeInstructor.defaultPitch,
      persona: voicePersona,
      onEnd: () => setMouthPhase(0)
    });
  };

  const handleCompleteShadowing = () => {
    handleSpeakSinglePhrase(activeLesson.shadowing.phrase, 0.9);
    if (!shadowingDone) {
      setShadowingDone(true);
      onGainXp(15);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === activeLesson.quiz.correctIndex) {
      if (!completedVideoIds.includes(activeLesson.id)) {
        setCompletedVideoIds((prev) => [...prev, activeLesson.id]);
        onGainXp(activeLesson.xpReward);
      }
    }
  };

  const handleCreateCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError(null);
    try {
      const created = buildCustomAiVideoLesson({
        languageId: selectedLanguageId,
        level: customLevel,
        topicTitle: customTopicTitle,
        targetSentence: customTargetSentence,
        phoneticHint: customPhonetic,
        vietnameseMeaning: customMeaning,
        instructorId: activeInstructor.id
      });
      setCustomLessons((prev) => [...prev, created]);
      setIsCustomModalOpen(false);
      setCustomTopicTitle('');
      setCustomTargetSentence('');
      setCustomPhonetic('');
      setCustomMeaning('');
      handleSelectLesson(created);
      onGainXp(25);
    } catch (err) {
      setCustomError(err instanceof Error ? err.message : String(err));
    }
  };

  const allLanguageCourses = Object.values(LANGUAGE_COURSES);
  const isLessonCompleted = completedVideoIds.includes(activeLesson.id);

  return (
    <div className="pb-14 space-y-6">
      {/* Top Studio Header & Language / Level Progression Overview */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
              <Video className="w-4 h-4" />
              <span>Học Tập Bằng Video AI Người Ảo & Giọng Ảo</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Giảng Đường Video AI {course.flagEmoji} {course.vietnameseName}: Từ Cơ Bản Tới Nâng Cao
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              Trực tiếp học phát âm, ngữ pháp và phản xạ giao tiếp cùng Giảng viên AI Người Ảo với khẩu hình đồng bộ thời gian thực, bảng thông minh tương tác và phụ đề song ngữ.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo Clip AI Theo Chủ Đề</span>
            </button>
          </div>
        </div>

        {/* Multi-Language Switcher Bar + Curriculum Progress */}
        <div className="pt-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* 7 Languages Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            {allLanguageCourses.map((lang) => {
              const isCurrent = lang.id === selectedLanguageId;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => onSelectLanguage(lang.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isCurrent
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{lang.flagEmoji}</span>
                  <span>{lang.vietnameseName}</span>
                </button>
              );
            })}
          </div>

          {/* 3-Tier Progression Summary (Basic -> Intermediate -> Advanced) */}
          <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
            <span className="font-semibold text-slate-700 whitespace-nowrap">
              Tiến độ Video ({progressStats.completedCount}/{progressStats.totalCount} bài <span aria-hidden="true">·</span> {progressStats.percent}%):
            </span>
            <div className="flex items-center gap-2 text-[11px] font-medium">
              <span className={progressStats.basicCompleted ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                {progressStats.basicCompleted ? '✓ ' : '○ '}1. Cơ bản
              </span>
              <span className="text-slate-300">→</span>
              <span className={progressStats.intermediateCompleted ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                {progressStats.intermediateCompleted ? '✓ ' : '○ '}2. Trung cấp
              </span>
              <span className="text-slate-300">→</span>
              <span className={progressStats.advancedCompleted ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                {progressStats.advancedCompleted ? '✓ ' : '○ '}3. Nâng cao
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Level Filter Tabs (Cơ bản -> Trung cấp -> Nâng cao) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Lọc cấp độ bài giảng Video AI">
          <button
            type="button"
            role="tab"
            aria-selected={tierFilter === 'all'}
            onClick={() => handleFilterTierChange('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
              tierFilter === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tất cả cấp độ ({languageLessons.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tierFilter === 'basic'}
            onClick={() => handleFilterTierChange('basic')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
              tierFilter === 'basic'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Cơ bản (Nhập môn & Phát âm)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tierFilter === 'intermediate'}
            onClick={() => handleFilterTierChange('intermediate')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
              tierFilter === 'intermediate'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Trung cấp (Giao tiếp & Phản xạ)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tierFilter === 'advanced'}
            onClick={() => handleFilterTierChange('advanced')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
              tierFilter === 'advanced'
                ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>3. Nâng cao (Học thuật & Chuyên sâu)</span>
          </button>
        </div>

        {/* Instructor Persona Quick Switcher */}
        <div className="flex flex-wrap items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
          <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Giảng viên AI:</span>
          {instructors.map((inst) => {
            const isSelected = inst.id === activeInstructor.id;
            return (
              <button
                key={inst.id}
                type="button"
                onClick={() => handleSwitchInstructor(inst.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-indigo-100 text-indigo-900 ring-1 ring-indigo-500'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {inst.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Zone Classroom Layout: Left (8 cols) = AI Video Studio + Controls + Quiz | Right (4 cols) = Curriculum Playlist & Transcript */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Columns: Cinema AI Virtual Human Stage + Transport Bar + Interactive Practice */}
        <div className="lg:col-span-8 space-y-5">
          {/* 16:9 AI Virtual Human Stage */}
          <AiVirtualHumanStage
            instructor={activeInstructor}
            activeSegment={activeSegment}
            segmentIndex={activeSegmentIndex}
            totalSegments={activeLesson.segments.length}
            isPlaying={isPlaying}
            mouthPhase={mouthPhase}
            blinkState={blinkState}
            voicePersona={voicePersona}
            voiceRate={voiceRate}
            showSubtitles={showSubtitles}
            languageFlag={course.flagEmoji}
            languageName={course.vietnameseName}
            levelBadge={activeLesson.levelBadge}
            onSpeakTerm={(term) => handleSpeakSinglePhrase(term)}
            onTogglePlay={handleTogglePlay}
          />

          {/* Video Transport Controls & AI Voice Customizer Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
            {/* Timeline Scrubber with Segment Chapter Markers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>
                  Đang phát: <strong className="text-slate-900">{activeSegment.chapterTitle}</strong>
                </span>
                <span className="tabular-nums font-bold text-indigo-700">
                  {formatVideoTimestamp(currentTime)} / {formatVideoTimestamp(activeLesson.durationSeconds)}
                </span>
              </div>

              {/* Chapter Segment Progress Bar */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {activeLesson.segments.map((seg, idx) => {
                  const isCurrentSeg = idx === activeSegmentIndex;
                  const isPastSeg = idx < activeSegmentIndex;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => handleJumpToSegment(seg.startTime, seg.id, seg.targetScript)}
                      className={`text-left p-2 rounded-lg border transition-all cursor-pointer ${
                        isCurrentSeg
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold'
                          : isPastSeg
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500 tabular-nums">
                        <span>Phần {idx + 1}</span>
                        <span>{formatVideoTimestamp(seg.startTime)}</span>
                      </div>
                      <div className="text-xs truncate mt-0.5">{seg.chapterTitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Playback & AI Voice Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              {/* Play / Pause / Skip Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    isPlaying
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Tạm dừng Video AI</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Phát Video AI & Giọng Ảo</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrevSegment}
                  disabled={activeSegmentIndex === 0}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  aria-label="Phần bài giảng trước"
                  title="Phần bài giảng trước"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNextSegment}
                  disabled={activeSegmentIndex >= activeLesson.segments.length - 1}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  aria-label="Phần bài giảng tiếp theo"
                  title="Phần bài giảng tiếp theo"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleJumpToSegment(
                      activeSegment.startTime,
                      activeSegment.id,
                      activeSegment.targetScript
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                  title="Nghe lại phần đang chiếu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Nghe lại phần này</span>
                </button>
              </div>

              {/* AI Virtual Voice Persona, Speed & Subtitle Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="sr-only">Chọn Giọng Ảo AI</span>
                  <select
                    aria-label="Chọn Giọng Ảo AI"
                    value={voicePersona}
                    onChange={(e) => setVoicePersona(e.target.value as VoicePersonaId)}
                    className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="female-warm">Giọng Nữ AI Tự Nhiên</option>
                    <option value="male-deep">Giọng Nam AI Trầm Ấm</option>
                    <option value="academic-clear">Giọng Học Thuật Chuẩn</option>
                    <option value="energetic-native">Giọng Bản Xứ Truyền Cảm</option>
                  </select>
                </label>

                {/* Speed Selector */}
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold">
                  {[0.75, 1.0, 1.25].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setVoiceRate(spd)}
                      className={`px-2 py-1 rounded-lg transition-colors cursor-pointer tabular-nums ${
                        voiceRate === spd
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {/* Subtitle Toggle */}
                <button
                  type="button"
                  onClick={() => setShowSubtitles((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    showSubtitles
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span>Phụ đề</span>
                </button>
              </div>
            </div>
          </div>

          {/* Post-Video Interactive Practice: Shadowing + Comprehension Quiz */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: AI Voice Shadowing Practice */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                    <Mic className="w-3.5 h-3.5" />
                    <span>Luyện Nhại Giọng (Shadowing)</span>
                  </span>
                  {shadowingDone && (
                    <span className="text-xs font-bold text-emerald-600">
                      ✓ Đã nhận +15 XP
                    </span>
                  )}
                </div>
                <p className="text-base font-bold text-slate-900 leading-snug">
                  {activeLesson.shadowing.phrase}
                </p>
                <p className="text-xs font-medium text-indigo-600">
                  {activeLesson.shadowing.phonetic}
                </p>
                <p className="text-xs text-slate-600">
                  {activeLesson.shadowing.vietnamese}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSpeakSinglePhrase(activeLesson.shadowing.phrase, 0.75)}
                  className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer whitespace-nowrap"
                >
                  Nghe chậm (0.75x)
                </button>
                <button
                  type="button"
                  onClick={handleCompleteShadowing}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Đọc theo Giảng viên AI (+15 XP)</span>
                </button>
              </div>
            </div>

            {/* Card 2: Post-Video Comprehension Quiz */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600">
                    <Award className="w-3.5 h-3.5" />
                    <span>Kiểm Tra Nhanh Sau Video</span>
                  </span>
                  <span className="text-xs font-bold text-indigo-600 tabular-nums">
                    +{activeLesson.xpReward} XP
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {activeLesson.quiz.question}
                </p>

                <div className="space-y-1.5">
                  {activeLesson.quiz.options.map((opt, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === activeLesson.quiz.correctIndex;
                    let btnStyle = 'border-slate-200 hover:border-indigo-300 bg-slate-50/70 text-slate-700';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold ring-1 ring-indigo-600';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedQuizOption(idx);
                          setQuizSubmitted(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      selectedQuizOption === activeLesson.quiz.correctIndex
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    <strong>Giải thích từ Giảng viên AI: </strong>
                    {activeLesson.quiz.explanation}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={selectedQuizOption === null}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 disabled:opacity-40 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {isLessonCompleted
                  ? 'Đã hoàn thành bài giảng Video AI ✓'
                  : `Kiểm tra đáp án & Nhận +${activeLesson.xpReward} XP`}
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Progressive Video Curriculum List & Interactive Transcript */}
        <div className="lg:col-span-4 space-y-5">
          {/* Curriculum Playlist (Basic -> Intermediate -> Advanced) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">
                Giáo Trình Video AI ({filteredLessons.length} bài)
              </h2>
              <span className="text-xs text-slate-500">
                Cơ bản → Nâng cao
              </span>
            </div>

            <div className="space-y-2.5">
              {filteredLessons.map((lesson, idx) => {
                const isCurrent = lesson.id === activeLesson.id;
                const isDone = completedVideoIds.includes(lesson.id);
                const lessonInst =
                  instructors.find((i) => i.id === lesson.instructorId) || instructors[0];

                const tierColor =
                  lesson.level === 'basic'
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : lesson.level === 'intermediate'
                    ? 'text-sky-700 bg-sky-50 border-sky-200'
                    : 'text-purple-700 bg-purple-50 border-purple-200';

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => handleSelectLesson(lesson)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${tierColor}`}>
                        {lesson.levelBadge}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 tabular-nums">
                        <span>{formatVideoTimestamp(lesson.durationSeconds)}</span>
                        <span>·</span>
                        <span className="font-bold text-indigo-600">+{lesson.xpReward} XP</span>
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </div>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                      {lesson.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span>GV: {lessonInst.name}</span>
                      <span className="font-semibold text-indigo-600">
                        {isCurrent ? '● Đang chiếu' : `Xem bài ${idx + 1} →`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Timestamped Transcript */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Kịch Bản & Phụ Đề Tương Tác
              </h3>
              <span className="text-[11px] text-slate-500">
                Nhấn câu bất kỳ để phát
              </span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {activeLesson.segments.map((seg, idx) => {
                const isActive = idx === activeSegmentIndex;
                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => handleJumpToSegment(seg.startTime, seg.id, seg.targetScript)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-50/80'
                        : 'border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600 mb-1">
                      <span>{seg.chapterTitle}</span>
                      <span className="tabular-nums">
                        {formatVideoTimestamp(seg.startTime)} – {formatVideoTimestamp(seg.endTime)}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {seg.targetScript}
                    </p>
                    <p className="text-[11px] text-indigo-600 mt-0.5">
                      {seg.phoneticScript}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {seg.vietnameseSub}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Custom AI Video Studio Modal ("Tạo Clip Giảng Viên AI Theo Chủ Đề Bất Kỳ") */}
      {isCustomModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="custom-ai-video-title"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h2 id="custom-ai-video-title" className="text-base font-bold text-slate-900">
                  Tạo Clip Giảng Viên AI ({course.vietnameseName})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                aria-label="Đóng cửa sổ tạo video AI"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomVideo} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cấp độ bài giảng Video AI
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'basic', label: '1. Cơ bản (A1–A2)' },
                      { id: 'intermediate', label: '2. Trung cấp (B1–B2)' },
                      { id: 'advanced', label: '3. Nâng cao (C1–C2)' }
                    ] as const
                  ).map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setCustomLevel(tier.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                        customLevel === tier.id
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="custom-video-topic" className="block text-xs font-bold text-slate-700 mb-1">
                  Chủ đề bài giảng *
                </label>
                <input
                  id="custom-video-topic"
                  type="text"
                  placeholder="Ví dụ: Phỏng vấn xin việc tại tập đoàn đa quốc gia"
                  value={customTopicTitle}
                  onChange={(e) => setCustomTopicTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="custom-video-sentence" className="block text-xs font-bold text-slate-700 mb-1">
                  Câu mẫu ngoại ngữ để Giảng viên AI giảng & phát âm *
                </label>
                <textarea
                  id="custom-video-sentence"
                  rows={2}
                  placeholder="Nhập câu bằng ngôn ngữ đang học..."
                  value={customTargetSentence}
                  onChange={(e) => setCustomTargetSentence(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="custom-video-phonetic" className="block text-xs font-bold text-slate-700 mb-1">
                  Phiên âm (IPA / Pinyin / Romaji - Tùy chọn)
                </label>
                <input
                  id="custom-video-phonetic"
                  type="text"
                  placeholder="Để trống nếu muốn hệ thống tự động tạo"
                  value={customPhonetic}
                  onChange={(e) => setCustomPhonetic(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="custom-video-meaning" className="block text-xs font-bold text-slate-700 mb-1">
                  Nghĩa tiếng Việt & Giải thích ngữ cảnh *
                </label>
                <input
                  id="custom-video-meaning"
                  type="text"
                  placeholder="Nhập nghĩa tiếng Việt của câu trên..."
                  value={customMeaning}
                  onChange={(e) => setCustomMeaning(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {customError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {customError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer shadow-xs"
                >
                  Dựng Clip Người Ảo AI (+25 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
