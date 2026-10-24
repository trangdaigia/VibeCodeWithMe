import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Zap,
  Flame,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Award,
  Brain,
  Clock,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  Target,
  Headphones,
  AlertTriangle,
  ArrowRight,
  Trophy,
  Check,
  Printer,
} from 'lucide-react';
import { LANGUAGE_COURSES, LanguageCourse } from '../data/curriculum';
import { speakText } from '../utils/speech';
import {
  getSentenceBuilderChallenges,
  evaluateSentenceOrder,
  calculateArenaAttemptScore,
  computeEbbinghausRetention,
  generateMasteryCertificateMeta,
  getSmartMistakeClinicItems,
  sanitizePhoneticsForDisplay,
} from '../utils/ultimateArenaLogic';

export type ArenaSubMode = 'syntax-arena' | 'pomodoro-focus' | 'mistake-clinic' | 'certificate';

const CanvasSoundscapeVisualizer: React.FC<{
  isRunning: boolean;
  ambientMode: 'off' | 'alpha-wave' | 'rain' | 'library';
}> = ({ isRunning, ambientMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.lineWidth = 2.5;

      if (ambientMode === 'alpha-wave') {
        ctx.strokeStyle = '#38bdf8';
      } else if (ambientMode === 'rain') {
        ctx.strokeStyle = '#818cf8';
      } else if (ambientMode === 'library') {
        ctx.strokeStyle = '#f59e0b';
      } else {
        ctx.strokeStyle = '#475569';
      }

      const amplitude = isRunning || ambientMode !== 'off' ? 18 : 3;
      const frequency = 0.035;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * frequency + phase) * amplitude * Math.sin((x / width) * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (isRunning || ambientMode !== 'off') {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = ambientMode === 'alpha-wave' ? '#c084fc' : '#34d399';
        for (let x = 0; x < width; x++) {
          const y = centerY + Math.cos(x * 0.045 - phase * 1.4) * (amplitude * 0.65) * Math.sin((x / width) * Math.PI);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += isRunning ? 0.09 : 0.03;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRunning, ambientMode]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-950/80 border border-white/10 p-2 shadow-inner">
      <div className="flex items-center justify-between px-2 pb-1 text-[11px] font-bold text-slate-400">
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${isRunning || ambientMode !== 'off' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
          Sóng Âm Não Bộ Real-time
        </span>
        <span className="text-amber-400">
          {ambientMode === 'alpha-wave' ? '432Hz Alpha Waves' : ambientMode === 'rain' ? 'Rain Binaural' : ambientMode === 'library' ? 'Brown Noise' : 'Chế độ chờ'}
        </span>
      </div>
      <canvas ref={canvasRef} width={400} height={48} className="w-full h-12 rounded-xl" />
    </div>
  );
};

interface UltimateLearningArenaViewProps {
  course: LanguageCourse;
  selectedLanguageId: string;
  onSelectLanguage: (langId: string) => void;
  userDisplayName: string;
  userEmail: string;
  xp: number;
  streak: number;
  completedLessonsCount: number;
  examsCompleted: number;
  onGainXp: (amount: number) => void;
}

export const UltimateLearningArenaView: React.FC<UltimateLearningArenaViewProps> = ({
  course,
  selectedLanguageId,
  onSelectLanguage,
  userDisplayName,
  userEmail,
  xp,
  streak,
  completedLessonsCount,
  examsCompleted,
  onGainXp,
}) => {
  const [subMode, setSubMode] = useState<ArenaSubMode>('syntax-arena');

  // =========================================================================
  // 1. SENTENCE SYNTAX BUILDER & SPEED RECALL ARENA STATE
  // =========================================================================
  const challenges = useMemo(
    () => getSentenceBuilderChallenges(selectedLanguageId),
    [selectedLanguageId]
  );
  const [challengeIdx, setChallengeIdx] = useState(0);
  const activeChallenge = challenges[challengeIdx % challenges.length] || challenges[0];

  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [sentenceSubmitted, setSentenceSubmitted] = useState(false);
  const [arenaScore, setArenaScore] = useState(450);
  const [comboStreak, setComboStreak] = useState(2);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  // Speed Vocab Sprint state
  const [sprintCardIdx, setSprintCardIdx] = useState(0);
  const [sprintPickedOption, setSprintPickedOption] = useState<string | null>(null);

  useEffect(() => {
    setChallengeIdx(0);
    setSelectedTokens([]);
    setSentenceSubmitted(false);
    setSprintCardIdx(0);
    setSprintPickedOption(null);
  }, [selectedLanguageId]);

  const availableTokens = useMemo(() => {
    if (!activeChallenge) return [];
    const usedCounts = new Map<string, number>();
    selectedTokens.forEach((t) => usedCounts.set(t, (usedCounts.get(t) || 0) + 1));

    return activeChallenge.scrambledTokens.filter((token) => {
      const count = usedCounts.get(token) || 0;
      if (count > 0) {
        usedCounts.set(token, count - 1);
        return false;
      }
      return true;
    });
  }, [activeChallenge, selectedTokens]);

  const sentenceEvaluation = useMemo(
    () =>
      activeChallenge
        ? evaluateSentenceOrder(selectedTokens, activeChallenge.correctTokens)
        : { isCorrect: false, matchedCount: 0, accuracyPercent: 0, assembledSentence: '' },
    [selectedTokens, activeChallenge]
  );

  const handleAddToken = (token: string) => {
    if (sentenceSubmitted) setSentenceSubmitted(false);
    setSelectedTokens((prev) => [...prev, token]);
  };

  const handleRemoveToken = (idx: number) => {
    if (sentenceSubmitted) setSentenceSubmitted(false);
    setSelectedTokens((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCheckSentence = () => {
    setSentenceSubmitted(true);
    const res = calculateArenaAttemptScore({
      isCorrect: sentenceEvaluation.isCorrect,
      currentStreak: comboStreak,
      remainingSeconds: 15,
      basePoints: 150,
    });
    setComboStreak(res.nextStreak);
    setComboMultiplier(res.comboMultiplier);
    if (sentenceEvaluation.isCorrect) {
      setArenaScore((prev) => prev + res.earnedPoints);
      onGainXp(activeChallenge.xpReward);
      speakText(activeChallenge.correctTokens.join(' '), course.voiceLangCode);
    }
  };

  const handleAutoSolveSentence = () => {
    if (!activeChallenge) return;
    setSelectedTokens([...activeChallenge.correctTokens]);
    setSentenceSubmitted(true);
    speakText(activeChallenge.correctTokens.join(' '), course.voiceLangCode);
  };

  const handleNextChallenge = () => {
    setSelectedTokens([]);
    setSentenceSubmitted(false);
    setChallengeIdx((prev) => (prev + 1) % challenges.length);
  };

  // Speed Vocab Sprint helper
  const activeSprintCard =
    course.vocabCards[sprintCardIdx % Math.max(1, course.vocabCards.length)];
  const sprintOptions = useMemo(() => {
    if (!activeSprintCard) return [];
    const others = course.vocabCards
      .filter((c) => c.id !== activeSprintCard.id)
      .slice(0, 3)
      .map((c) => c.meaning);
    while (others.length < 3) {
      others.push('Cụm từ giao tiếp nâng cao trong văn cảnh học thuật');
    }
    const all = [activeSprintCard.meaning, ...others.slice(0, 3)];
    const shift = activeSprintCard.word.length % 4;
    return [...all.slice(shift), ...all.slice(0, shift)];
  }, [activeSprintCard, course.vocabCards]);

  const handlePickSprintOption = (option: string) => {
    if (!activeSprintCard || sprintPickedOption) return;
    setSprintPickedOption(option);
    const isCorrect = option === activeSprintCard.meaning;
    const res = calculateArenaAttemptScore({
      isCorrect,
      currentStreak: comboStreak,
      remainingSeconds: 12,
      basePoints: 100,
    });
    setComboStreak(res.nextStreak);
    setComboMultiplier(res.comboMultiplier);
    if (isCorrect) {
      setArenaScore((prev) => prev + res.earnedPoints);
      onGainXp(res.earnedXp);
    }
  };

  const handleNextSprintCard = () => {
    setSprintPickedOption(null);
    setSprintCardIdx((prev) => (prev + 1) % Math.max(1, course.vocabCards.length));
  };

  // =========================================================================
  // 2. DEEP FOCUS POMODORO & WEB AUDIO AMBIENT SYNTHESIZER STATE
  // =========================================================================
  const [pomodoroPresetMinutes, setPomodoroPresetMinutes] = useState<number>(25);
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [ambientMode, setAmbientMode] = useState<'off' | 'alpha-wave' | 'rain' | 'library'>('off');
  const [ambientVolume, setAmbientVolume] = useState<number>(45);
  const [focusTasks, setFocusTasks] = useState<
    { id: string; text: string; done: boolean; xp: number }[]
  >([
    { id: 'ft-1', text: 'Hoàn thành 3 câu Đấu trường Ghép câu học thuật C1', done: true, xp: 20 },
    { id: 'ft-2', text: 'Ôn tập 10 từ vựng SRS theo đường cong Ebbinghaus', done: false, xp: 25 },
    { id: 'ft-3', text: 'Luyện nghe Shadowing 1 bài giảng Video AI người ảo', done: false, xp: 30 },
  ]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          onGainXp(50);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, onGainXp]);

  // Clean up Web Audio on unmount or mode change
  useEffect(() => {
    if (ambientMode === 'off') {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
        gainNodeRef.current = null;
      }
      return;
    }

    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }

      const ctx = new AudioContextClass();
      const masterGain = ctx.createGain();
      masterGain.gain.value = (ambientVolume / 100) * 0.08;
      masterGain.connect(ctx.destination);

      if (ambientMode === 'alpha-wave') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.value = 432;
        osc2.frequency.value = 442; // 10Hz Alpha binaural beat
        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start();
        osc2.start();
      } else {
        // Gentle filtered pink/brown noise for Rain or Library ambiance
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = ambientMode === 'rain' ? 850 : 420;
        noise.connect(filter);
        filter.connect(masterGain);
        noise.start();
      }

      audioCtxRef.current = ctx;
      gainNodeRef.current = masterGain;
    } catch {
      // Ignore if browser blocks autoplay before gesture
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [ambientMode]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = (ambientVolume / 100) * 0.08;
    }
  }, [ambientVolume]);

  const handleSelectPomodoroPreset = (mins: number) => {
    setIsTimerRunning(false);
    setPomodoroPresetMinutes(mins);
    setSecondsLeft(mins * 60);
  };

  const handleToggleFocusTask = (taskId: string) => {
    setFocusTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextDone = !t.done;
        if (nextDone) onGainXp(t.xp);
        return { ...t, done: nextDone };
      })
    );
  };

  const formattedTimer = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(
    secondsLeft % 60
  ).padStart(2, '0')}`;

  // =========================================================================
  // 3. SMART MISTAKE CLINIC & EBBINGHAUS RETENTION CURVE STATE
  // =========================================================================
  const [srsReviewSlider, setSrsReviewSlider] = useState<number>(4);
  const ebbinghausCurve = useMemo(
    () => computeEbbinghausRetention(srsReviewSlider),
    [srsReviewSlider]
  );
  const mistakeItems = useMemo(
    () => getSmartMistakeClinicItems(selectedLanguageId),
    [selectedLanguageId]
  );
  const [mistakeAnswers, setMistakeAnswers] = useState<Record<string, string>>({});

  const handleAnswerMistakeDrill = (itemId: string, option: string, correctOption: string) => {
    setMistakeAnswers((prev) => ({ ...prev, [itemId]: option }));
    if (option === correctOption && mistakeAnswers[itemId] !== correctOption) {
      onGainXp(25);
    }
  };

  // =========================================================================
  // 4. OFFICIAL VERIFIABLE MASTERY CERTIFICATE STATE
  // =========================================================================
  const [customRecipientName, setCustomRecipientName] = useState(userDisplayName);
  const [isCertificateVerifiedToast, setIsCertificateVerifiedToast] = useState(false);

  useEffect(() => {
    setCustomRecipientName(userDisplayName);
  }, [userDisplayName]);

  const certificateMeta = useMemo(
    () =>
      generateMasteryCertificateMeta({
        recipientName: customRecipientName,
        recipientEmail: userEmail,
        languageId: selectedLanguageId,
        languageNameVi: course.vietnameseName,
        nativeLanguageName: course.nativeName,
        examBenchmark: course.examInfo?.[0]?.examName || 'IELTS Academic',
        totalXp: xp,
        streakDays: streak,
        completedLessonsCount,
        examsCompleted,
      }),
    [
      customRecipientName,
      userEmail,
      selectedLanguageId,
      course.vietnameseName,
      course.nativeName,
      course.examInfo,
      xp,
      streak,
      completedLessonsCount,
      examsCompleted,
    ]
  );

  return (
    <div className="space-y-6 pb-14">
      {/* 7-Language Quick Selector */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-2xs grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
        {Object.values(LANGUAGE_COURSES).map((langCourse) => {
          const isSelected = langCourse.id === selectedLanguageId;
          return (
            <button
              key={langCourse.id}
              type="button"
              onClick={() => onSelectLanguage(langCourse.id)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <span className="text-base leading-none">{langCourse.flagEmoji}</span>
              <span className="truncate">{langCourse.vietnameseName}</span>
            </button>
          );
        })}
      </div>

      {/* Hero Command Header */}
      <section className="bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-200">
              <span className="text-amber-300 font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Siêu Tổ Hợp Học Tập Đỉnh Cao
              </span>
              <span aria-hidden="true">·</span>
              <span>{course.flagEmoji} {course.vietnameseName} ({course.nativeName})</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-300 font-bold">Combo hiện tại: x{comboMultiplier}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Đấu Trường Phản Xạ, Sóng Não Deep Focus &amp; Chứng Chỉ Quốc Tế
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Rèn luyện tư duy cấu trúc câu học thuật C1/C2, kích hoạt trạng thái tập trung sâu với sóng âm Alpha 432Hz, tối ưu hóa trí nhớ dài hạn theo đường cong Ebbinghaus và nhận Chứng chỉ năng lực quốc tế.
            </p>
          </div>

          {/* Live Arena Telemetry Strip */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] text-indigo-200 font-medium">Điểm Đấu Trường</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 tabular-nums mt-0.5">
                {arenaScore}
              </div>
              <div className="text-[10px] text-emerald-300 font-bold mt-0.5">
                Chuỗi thắng: {comboStreak}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] text-indigo-200 font-medium">Hệ Số Nhân XP</div>
              <div className="text-xl sm:text-2xl font-black text-white tabular-nums mt-0.5">
                x{comboMultiplier}
              </div>
              <div className="text-[10px] text-amber-300 font-bold mt-0.5">
                {comboMultiplier >= 3 ? '🔥 FEVER MODE' : 'Tích lũy Combo'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] text-indigo-200 font-medium">Trình Độ Dự Kiến</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 tabular-nums mt-0.5">
                CEFR {certificateMeta.estimatedCefr}
              </div>
              <div className="text-[10px] text-slate-300 font-bold mt-0.5">
                {xp} tổng XP
              </div>
            </div>
          </div>
        </div>

        {/* 4 Sub-Module Mode Switcher */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => setSubMode('syntax-arena')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              subMode === 'syntax-arena'
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            <Zap className="w-5 h-5 shrink-0" />
            <div>
              <div className="text-xs sm:text-sm font-bold">1. Đấu Trường Ghép Câu &amp; Tốc Độ</div>
              <div className={`text-[11px] ${subMode === 'syntax-arena' ? 'text-slate-800' : 'text-slate-300'}`}>
                Đảo ngữ C1/C2 · Phản xạ Combo x5
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSubMode('pomodoro-focus')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              subMode === 'pomodoro-focus'
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            <Headphones className="w-5 h-5 shrink-0" />
            <div>
              <div className="text-xs sm:text-sm font-bold">2. Phòng Deep Focus Pomodoro</div>
              <div className={`text-[11px] ${subMode === 'pomodoro-focus' ? 'text-slate-800' : 'text-slate-300'}`}>
                Sóng não Alpha 432Hz · Bấm giờ học sâu
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSubMode('mistake-clinic')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              subMode === 'mistake-clinic'
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            <Brain className="w-5 h-5 shrink-0" />
            <div>
              <div className="text-xs sm:text-sm font-bold">3. Sổ Tay Lỗi Sai &amp; Ebbinghaus</div>
              <div className={`text-[11px] ${subMode === 'mistake-clinic' ? 'text-slate-800' : 'text-slate-300'}`}>
                Mô phỏng trí nhớ · Chẩn đoán lỗi C1
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSubMode('certificate')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              subMode === 'certificate'
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            <Award className="w-5 h-5 shrink-0" />
            <div>
              <div className="text-xs sm:text-sm font-bold">4. Chứng Chỉ Năng Lực Quốc Tế</div>
              <div className={`text-[11px] ${subMode === 'certificate' ? 'text-slate-800' : 'text-slate-300'}`}>
                Xác thực SHA-256 · Xuất hồ sơ năng lực
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* =====================================================================
          MODE 1: SENTENCE SYNTAX BUILDER & SPEED RECALL ARENA
         ===================================================================== */}
      {subMode === 'syntax-arena' && activeChallenge && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Columns: Interactive Sentence Syntax Builder */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Thử Thách Cấu Trúc Học Thuật · Chuẩn CEFR {activeChallenge.cefrLevel}
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
                  Ghép Các Cụm Từ Thành Câu Hoàn Chỉnh (+{activeChallenge.xpReward} XP)
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    speakText(activeChallenge.correctTokens.join(' '), course.voiceLangCode)
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextChallenge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  <span>Câu tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Vietnamese Prompt Target */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Nghĩa tiếng Việt cần chuyển ngữ:
              </div>
              <p className="text-sm sm:text-base font-bold leading-relaxed">
                "{activeChallenge.vietnamesePrompt}"
              </p>
            </div>

            {/* Assembled Sentence Dropzone */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Câu bạn đang ghép (Nhấn vào cụm từ để bỏ chọn):</span>
                <span className="text-indigo-600 tabular-nums">
                  {selectedTokens.length}/{activeChallenge.correctTokens.length} cụm từ
                </span>
              </div>

              <div className="min-h-24 p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-wrap items-center gap-2">
                {selectedTokens.length === 0 ? (
                  <span className="text-xs text-slate-400">
                    Hãy nhấn vào các mảnh ghép bên dưới theo đúng thứ tự ngữ pháp {course.vietnameseName}...
                  </span>
                ) : (
                  selectedTokens.map((token, idx) => (
                    <button
                      key={`${token}-${idx}`}
                      type="button"
                      onClick={() => handleRemoveToken(idx)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      {token}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Scrambled Token Bank */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700">
                Kho mảnh ghép ngữ pháp khả dụng:
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTokens.map((token, idx) => (
                  <button
                    key={`${token}-${idx}`}
                    type="button"
                    onClick={() => handleAddToken(token)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-800 border border-slate-300 hover:border-indigo-400 text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    + {token}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTokens([]);
                    setSentenceSubmitted(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xếp lại từ đầu</span>
                </button>

                <button
                  type="button"
                  onClick={handleAutoSolveSentence}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Gợi ý đáp án chuẩn</span>
                </button>
              </div>

              <button
                type="button"
                disabled={selectedTokens.length === 0}
                onClick={handleCheckSentence}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kiểm Tra Cấu Trúc Câu</span>
              </button>
            </div>

            {/* Evaluation Feedback Box */}
            {sentenceSubmitted && (
              <div
                className={`p-4 rounded-2xl border space-y-2 ${
                  sentenceEvaluation.isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-black flex items-center gap-1.5">
                    {sentenceEvaluation.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chính xác tuyệt đối (100%)! Đã cộng +{activeChallenge.xpReward} XP</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>
                          Độ khớp hiện tại: {sentenceEvaluation.accuracyPercent}% ({sentenceEvaluation.matchedCount}/
                          {activeChallenge.correctTokens.length} vị trí đúng)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-800">
                  Đáp án chuẩn: <span className="text-indigo-700">{activeChallenge.correctTokens.join(' ')}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Giải thích chuyên sâu:</strong> {activeChallenge.grammarTip}
                </p>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Speed Vocabulary Reflex Sprint */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" /> Đấu Trường Tốc Độ
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Phản Xạ Từ Vựng Siêu Tốc (Combo x{comboMultiplier})
                </h3>
              </div>
              <button
                type="button"
                onClick={handleNextSprintCard}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Đổi từ khác
              </button>
            </div>

            {activeSprintCard && (
              <>
                <div className="p-5 rounded-2xl bg-linear-to-br from-indigo-950 to-slate-900 text-white space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-indigo-300 uppercase">
                        {activeSprintCard.partOfSpeech}
                      </span>
                      <div className="text-2xl font-black text-amber-300 mt-0.5">
                        {activeSprintCard.word}
                      </div>
                      {activeSprintCard.romanization && (
                        <div className="text-xs text-slate-300">
                          {sanitizePhoneticsForDisplay(activeSprintCard.romanization)}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => speakText(activeSprintCard.word, course.voiceLangCode)}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      aria-label="Nghe phát âm từ vựng"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 italic pt-2 border-t border-white/10">
                    "{activeSprintCard.exampleSentence}"
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700">
                    Chọn nhanh nghĩa tiếng Việt đúng để nhân hệ số Combo:
                  </div>
                  {sprintOptions.map((option, idx) => {
                    const isPicked = sprintPickedOption === option;
                    const isRight = option === activeSprintCard.meaning;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePickSprintOption(option)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                          !sprintPickedOption
                            ? 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800'
                            : isRight
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                            : isPicked
                            ? 'bg-rose-50 border-rose-300 text-rose-900'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <span>{option}</span>
                        {sprintPickedOption && isRight && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {sprintPickedOption && (
                  <button
                    type="button"
                    onClick={handleNextSprintCard}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Tiếp tục từ tiếp theo →
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODE 2: DEEP FOCUS POMODORO & AMBIENT BRAINWAVE SYNTHESIZER
         ===================================================================== */}
      {subMode === 'pomodoro-focus' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Columns: Deep Focus Pomodoro Timer & Ambient Soundscapes */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Phương Pháp Tập Trung Sâu · Deep Work Studio
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Đồng Hồ Pomodoro &amp; Sóng Âm Não Bộ (Web Audio API)
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                Hoàn thành phiên: +50 XP
              </span>
            </div>

            {/* Timer Display Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white text-center space-y-5">
              <div className="flex justify-center gap-2">
                {[
                  { label: 'Pomodoro Chuẩn (25p)', mins: 25 },
                  { label: 'Marathon Học Thuật (50p)', mins: 50 },
                  { label: 'Sprint Ôn Từ (10p)', mins: 10 },
                ].map((preset) => (
                  <button
                    key={preset.mins}
                    type="button"
                    onClick={() => handleSelectPomodoroPreset(preset.mins)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      pomodoroPresetMinutes === preset.mins
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <CanvasSoundscapeVisualizer isRunning={isTimerRunning} ambientMode={ambientMode} />

              <div className="text-5xl sm:text-6xl font-black tracking-tight tabular-nums text-amber-300">
                {formattedTimer}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm cursor-pointer transition-all"
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isTimerRunning ? 'Tạm dừng' : 'Bắt đầu Tập trung'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setSecondsLeft(pomodoroPresetMinutes * 60);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Đặt lại</span>
                </button>
              </div>
            </div>

            {/* Ambient Soundscape Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="ambient-volume-slider"
                  className="text-xs font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <Headphones className="w-4 h-4 text-indigo-600" />
                  <span>Không gian âm thanh tập trung (Âm lượng: {ambientVolume}%)</span>
                </label>
                <input
                  id="ambient-volume-slider"
                  type="range"
                  min={10}
                  max={100}
                  value={ambientVolume}
                  onChange={(e) => setAmbientVolume(Number(e.target.value))}
                  className="w-36 accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'off', title: 'Tắt Âm Thanh', desc: 'Yên tĩnh tuyệt đối' },
                  { id: 'alpha-wave', title: 'Sóng Alpha 432Hz', desc: 'Tăng cường ghi nhớ' },
                  { id: 'rain', title: 'Mưa Rơi Nhẹ', desc: 'Giảm căng thẳng' },
                  { id: 'library', title: 'Thư Viện Học Thuật', desc: 'Tiếng ồn nâu êm dịu' },
                ].map((sound) => (
                  <button
                    key={sound.id}
                    type="button"
                    onClick={() => setAmbientMode(sound.id as typeof ambientMode)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      ambientMode === sound.id
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{sound.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{sound.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Deep Work Session Goals */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Mục Tiêu Phiên Học Sâu Hôm Nay
                </h3>
                <p className="text-xs text-slate-500">
                  Đánh dấu hoàn thành từng mục tiêu để nhận thưởng XP tức thì
                </p>
              </div>
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>

            <div className="space-y-2.5">
              {focusTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => handleToggleFocusTask(task.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    task.done
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 hover:bg-indigo-50/40 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        task.done
                          ? 'bg-emerald-600 text-white'
                          : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs font-bold ${task.done ? 'line-through opacity-75' : ''}`}>
                      {task.text}
                    </span>
                  </div>
                  <span className="text-[11px] font-black text-indigo-600 shrink-0">
                    +{task.xp} XP
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODE 3: SMART MISTAKE CLINIC & EBBINGHAUS FORGETTING CURVE
         ===================================================================== */}
      {subMode === 'mistake-clinic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 5 Columns: Interactive Ebbinghaus Memory Retention Simulator */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Khoa Học Thần Kinh Nhận Thức
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Đường Cong Trí Nhớ Ebbinghaus &amp; SRS
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Điều chỉnh số lần ôn tập ngắt quãng (SRS) để quan sát tỷ lệ duy trì từ vựng sau 30 ngày so với học vẹt truyền thống.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <label htmlFor="srs-review-slider">Số chu kỳ ôn tập lặp lại (SRS):</label>
                <span className="text-indigo-600 font-black">{srsReviewSlider} lần ôn tập</span>
              </div>
              <input
                id="srs-review-slider"
                type="range"
                min={1}
                max={6}
                value={srsReviewSlider}
                onChange={(e) => setSrsReviewSlider(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Comparative Retention Bars */}
            <div className="space-y-3">
              {ebbinghausCurve.map((pt) => (
                <div key={pt.day} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{pt.label}</span>
                    <div className="flex items-center gap-3 tabular-nums">
                      <span className="text-rose-600 font-semibold">
                        Không ôn: {pt.unreviewedRetention}%
                      </span>
                      <span className="text-emerald-700 font-black">
                        Có SRS ({srsReviewSlider}x): {pt.srsReviewedRetention}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${pt.srsReviewedRetention}%` }}
                      title={`Có ôn tập SRS: ${pt.srsReviewedRetention}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 7 Columns: Smart Mistake Clinic & Diagnostic Fixes */}
          <div className="lg:col-span-7 space-y-4">
            {mistakeItems.map((item) => {
              const picked = mistakeAnswers[item.id];
              const isSolved = picked === item.correctOption;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
                      Chẩn Đoán Lỗi Sai Phổ Biến · {item.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-indigo-600">
                      Khắc phục: +25 XP
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200">
                      <div className="text-[11px] font-bold text-rose-700">❌ Cách dùng dễ mất điểm:</div>
                      <div className="text-xs font-bold text-rose-950 line-through mt-1">
                        {item.commonMistake}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                      <div className="text-[11px] font-bold text-emerald-700">✓ Cấu trúc chuẩn Band cao:</div>
                      <div className="text-xs font-bold text-emerald-950 mt-1">
                        {item.correctForm}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Phân tích chuyên gia:</strong> {item.explanationVi}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="text-xs font-bold text-slate-800">{item.practiceQuestion}</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {item.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleAnswerMistakeDrill(item.id, opt, item.correctOption)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            !picked
                              ? 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800'
                              : opt === item.correctOption
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : picked === opt
                              ? 'bg-rose-100 border-rose-300 text-rose-900'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {isSolved && (
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 pt-1">
                        <CheckCircle2 className="w-4 h-4" /> Đã khắc phục triệt để lỗi sai này (+25 XP)!
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODE 4: OFFICIAL VERIFIABLE MASTERY CERTIFICATE STUDIO
         ===================================================================== */}
      {subMode === 'certificate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 4 Columns: Certificate Customization & Verification Controls */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Hồ Sơ Năng Lực Quốc Tế
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Tùy Chỉnh &amp; Xác Thực Chứng Chỉ
              </h2>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="cert-recipient-input"
                className="text-xs font-bold text-slate-700 block"
              >
                Họ và tên in trên Chứng chỉ:
              </label>
              <input
                id="cert-recipient-input"
                type="text"
                value={customRecipientName}
                onChange={(e) => setCustomRecipientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Mã định danh:</span>
                <span className="font-mono font-bold text-slate-900">{certificateMeta.certificateId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Chuẩn quy đổi:</span>
                <span className="font-bold text-indigo-700">CEFR {certificateMeta.estimatedCefr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hạng danh dự:</span>
                <span className="font-bold text-emerald-700">{certificateMeta.honorsTier}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCertificateVerifiedToast(true);
                  onGainXp(20);
                }}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Xác Thực Chữ Ký Số SHA-256 (+20 XP)</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In / Xuất PDF Chứng Chỉ</span>
              </button>
            </div>

            {isCertificateVerifiedToast && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
                ✓ Đã xác thực hợp lệ mã băm <strong>{certificateMeta.verificationHash}</strong> trên sổ cái học thuật LinguaFlow!
              </div>
            )}
          </div>

          {/* Right 8 Columns: High-Prestige Visual Certificate Canvas */}
          <div className="lg:col-span-8 bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border-2 border-amber-400/60 shadow-2xl relative overflow-hidden">
            <div className="border border-amber-300/30 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                    LF
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-amber-300">
                      LinguaFlow International Academy
                    </div>
                    <div className="text-xs text-slate-300">
                      Hội Đồng Khảo Thí &amp; Chứng Nhận Ngôn Ngữ Ứng Dụng AI
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[11px] text-slate-400">Mã Chứng Chỉ Quốc Tế</div>
                  <div className="text-xs font-mono font-bold text-amber-300">
                    {certificateMeta.certificateId}
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3 py-2">
                <div className="text-xs font-bold uppercase tracking-widest text-indigo-200">
                  Chứng Nhận Hoàn Thành &amp; Năng Lực Ngoại Ngữ
                </div>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                  {certificateMeta.recipientName}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Đã hoàn thành xuất sắc chương trình đào tạo chuyên sâu ngôn ngữ{' '}
                  <strong className="text-white">
                    {certificateMeta.languageNameVi} ({certificateMeta.nativeLanguageName})
                  </strong>{' '}
                  với năng lực tương đương chuẩn khung tham chiếu châu Âu{' '}
                  <strong className="text-emerald-300">CEFR {certificateMeta.estimatedCefr}</strong> ({certificateMeta.examBenchmark}).
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[11px] text-slate-400">Chuẩn Năng Lực</div>
                  <div className="text-base font-black text-emerald-300 mt-0.5">
                    CEFR {certificateMeta.estimatedCefr}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[11px] text-slate-400">Tổng Điểm Tích Lũy</div>
                  <div className="text-base font-black text-white mt-0.5">
                    {certificateMeta.totalXp} XP
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[11px] text-slate-400">Chuỗi Bền Bỉ</div>
                  <div className="text-base font-black text-amber-300 mt-0.5">
                    {certificateMeta.streakDays} Ngày
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[11px] text-slate-400">Ngày Cấp</div>
                  <div className="text-base font-black text-white mt-0.5">
                    {certificateMeta.issuedDateVi}
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-400">
                <div>
                  Xếp hạng danh dự: <strong className="text-amber-300">{certificateMeta.honorsTier}</strong>
                </div>
                <div className="font-mono text-emerald-300">
                  ✓ Verified: {certificateMeta.verificationHash}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
