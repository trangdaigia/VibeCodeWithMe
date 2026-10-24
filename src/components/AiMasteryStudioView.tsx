import React, { useState, useMemo, useEffect } from 'react';
import {
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  PenTool,
  Activity,
  Award,
  ArrowRight,
  RotateCcw,
  FileText,
  Zap,
  Compass,
  Play,
  Check
} from 'lucide-react';
import { LANGUAGE_COURSES, LanguageCourse } from '../data/curriculum';
import { MasteryLevel } from '../data/aiMasteryStudioData';
import {
  getLanguageMasteryPack,
  filterSpeakingDrills,
  filterWritingPrompts,
  countWritingUnits,
  evaluatePronunciationAttempt,
  evaluateWritingSubmissionLocal,
  computeSixSkillRadarMetrics,
  PronunciationEvaluationResult,
  WritingRubricEvaluation
} from '../utils/masteryStudioLogic';
import { speakText } from '../utils/speech';

export type StudioWorkspaceMode = 'speaking' | 'writing' | 'analytics';

interface AiMasteryStudioViewProps {
  course: LanguageCourse;
  selectedLanguageId: string;
  onSelectLanguage: (langId: string) => void;
  xp: number;
  streak: number;
  completedLessonsCount: number;
  examsCompleted: number;
  onGainXp: (amount: number) => void;
  onNavigateToTab?: (tab: 'path' | 'video' | 'academic' | 'roleplay' | 'grammar' | 'vault' | 'culture' | 'studio') => void;
}

export const AiMasteryStudioView: React.FC<AiMasteryStudioViewProps> = ({
  course,
  selectedLanguageId,
  onSelectLanguage,
  xp,
  streak,
  completedLessonsCount,
  examsCompleted,
  onGainXp,
  onNavigateToTab
}) => {
  const [workspaceMode, setWorkspaceMode] = useState<StudioWorkspaceMode>('speaking');
  const [selectedLevel, setSelectedLevel] = useState<MasteryLevel>('basic');

  // Speaking Studio State
  const [selectedDrillIndex, setSelectedDrillIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speakingEval, setSpeakingEval] = useState<PronunciationEvaluationResult | null>(null);
  const [activeSyllableIdx, setActiveSyllableIdx] = useState<number>(0);
  const [speakingBonusPoints, setSpeakingBonusPoints] = useState<number>(6);

  // Writing Grader State
  const [essayText, setEssayText] = useState<string>('');
  const [isEvaluatingWriting, setIsEvaluatingWriting] = useState<boolean>(false);
  const [writingEval, setWritingEval] = useState<WritingRubricEvaluation | null>(null);
  const [writingBonusPoints, setWritingBonusPoints] = useState<number>(8);
  const [writingValidationError, setWritingValidationError] = useState<string | null>(null);

  // Analytics & Missions State
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);

  const masteryPack = useMemo(
    () => getLanguageMasteryPack(selectedLanguageId),
    [selectedLanguageId]
  );

  const drillsForLevel = useMemo(
    () => filterSpeakingDrills(selectedLanguageId, selectedLevel),
    [selectedLanguageId, selectedLevel]
  );

  const activeDrill = drillsForLevel[selectedDrillIndex] || masteryPack.speakingDrills[0];

  const promptsForLevel = useMemo(
    () => filterWritingPrompts(selectedLanguageId, selectedLevel),
    [selectedLanguageId, selectedLevel]
  );

  const activeWritingPrompt = promptsForLevel[0] || masteryPack.writingPrompts[0];

  // Sync default speaking evaluation & sample draft when language or level changes
  useEffect(() => {
    setSelectedDrillIndex(0);
    setActiveSyllableIdx(0);
    if (activeDrill) {
      setSpeakingEval(evaluatePronunciationAttempt(activeDrill, 'good'));
    }
  }, [selectedLanguageId, selectedLevel, activeDrill]);

  useEffect(() => {
    if (activeWritingPrompt) {
      setEssayText(activeWritingPrompt.sampleLearnerDraft);
      setWritingEval(
        evaluateWritingSubmissionLocal(
          activeWritingPrompt,
          activeWritingPrompt.sampleLearnerDraft
        )
      );
      setWritingValidationError(null);
    }
  }, [selectedLanguageId, selectedLevel, activeWritingPrompt]);

  const currentUnitCount = useMemo(
    () => countWritingUnits(essayText, selectedLanguageId),
    [essayText, selectedLanguageId]
  );

  const radarAnalysis = useMemo(
    () =>
      computeSixSkillRadarMetrics({
        languageId: selectedLanguageId,
        xp,
        streak,
        completedLessonsCount,
        examsCompleted,
        vocabCount: course.vocabCards.length,
        speakingBonus: speakingBonusPoints,
        writingBonus: writingBonusPoints
      }),
    [
      selectedLanguageId,
      xp,
      streak,
      completedLessonsCount,
      examsCompleted,
      course.vocabCards.length,
      speakingBonusPoints,
      writingBonusPoints
    ]
  );

  const handleRunPronunciationEvaluation = (mode: 'good' | 'excellent' | 'needs-work') => {
    if (!activeDrill) return;
    setIsRecording(true);
    setTimeout(() => {
      const result = evaluatePronunciationAttempt(activeDrill, mode);
      setSpeakingEval(result);
      setIsRecording(false);
      setSpeakingBonusPoints((prev) => Math.min(24, prev + 3));
      onGainXp(25);
    }, 350);
  };

  const handleEvaluateWriting = async () => {
    if (!activeWritingPrompt) return;
    const trimmed = essayText.trim();
    if (!trimmed) {
      setWritingValidationError('Vui lòng nhập nội dung bài viết hoặc chọn "Nạp bài mẫu học viên" trước khi chấm điểm.');
      return;
    }
    setWritingValidationError(null);
    setIsEvaluatingWriting(true);

    const localResult = evaluateWritingSubmissionLocal(activeWritingPrompt, trimmed);

    try {
      const response = await fetch('/api/gemini/writing-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguageId,
          examName: activeWritingPrompt.examName,
          promptText: activeWritingPrompt.promptText,
          submittedText: trimmed,
          minWordsOrChars: activeWritingPrompt.minWordsOrChars
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data && !data.useLocalEngine && typeof data.overallScore100 === 'number') {
          setWritingEval({
            ...localResult,
            overallScore100: data.overallScore100,
            bandOrScaleLabel: data.bandOrScaleLabel || localResult.bandOrScaleLabel,
            cefrEquivalent: data.cefrEquivalent || localResult.cefrEquivalent,
            criteria: data.criteria || localResult.criteria,
            strengthsVi: Array.isArray(data.strengthsVi) ? data.strengthsVi : localResult.strengthsVi,
            improvementsVi: Array.isArray(data.improvementsVi) ? data.improvementsVi : localResult.improvementsVi,
            examinerSummaryVi: data.examinerSummaryVi || localResult.examinerSummaryVi,
            improvedVersion: data.improvedVersion || localResult.improvedVersion
          });
        } else {
          setWritingEval(localResult);
        }
      } else {
        setWritingEval(localResult);
      }
    } catch {
      setWritingEval(localResult);
    } finally {
      setIsEvaluatingWriting(false);
      setWritingBonusPoints((prev) => Math.min(26, prev + 4));
      onGainXp(35);
    }
  };

  const handleInsertPowerWord = (word: string) => {
    setEssayText((prev) => {
      const sep = selectedLanguageId === 'chinese' || selectedLanguageId === 'japanese' ? '' : ' ';
      return `${prev.trim()}${sep}${word}`;
    });
    setWritingValidationError(null);
  };

  const handleCompleteMission = (missionId: string, reward: number) => {
    if (completedMissionIds.includes(missionId)) return;
    setCompletedMissionIds((prev) => [...prev, missionId]);
    onGainXp(reward);
  };

  return (
    <div className="space-y-6 pb-14" data-testid="ai-mastery-studio-view">
      {/* 1. 7-Language Quick Selector Strip */}
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
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              aria-label={`Chọn ngôn ngữ Phòng Lab AI: ${langCourse.vietnameseName}`}
            >
              <span className="text-base leading-none">{langCourse.flagEmoji}</span>
              <span className="truncate">{langCourse.vietnameseName}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Flagship Studio Command Header */}
      <section className="bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-200">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/25 border border-indigo-400/30 text-amber-300 font-bold">
                {course.flagEmoji} {course.vietnameseName} · {masteryPack.examStandardName}
              </span>
              <span>·</span>
              <span>Chấm Phát Âm Sóng Âm 4 Chiều</span>
              <span>·</span>
              <span>Chấm Viết Học Thuật C1/C2</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Phòng Lab Phát Âm Khẩu Hình & Chấm Điểm Viết Học Thuật AI
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Phân tích sóng âm cao độ bản xứ (Native Pitch Contour), hướng dẫn vị trí răng - môi - đầu lưỡi chi tiết, chấm bài luận theo 4 tiêu chí quốc tế và theo dõi biểu đồ Radar 6 kỹ năng từ Cơ bản tới Nâng cao.
            </p>
          </div>

          {/* 3-Workspace Switcher */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 lg:w-80">
            <button
              type="button"
              onClick={() => setWorkspaceMode('speaking')}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-left transition-all cursor-pointer ${
                workspaceMode === 'speaking'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mic className="w-4 h-4 text-amber-300 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold">1. Phòng Lab Phát Âm & Khẩu Hình</div>
                  <div className="text-[11px] opacity-80">Sóng âm 12 điểm · Chấm 4 tiêu chí</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => setWorkspaceMode('writing')}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-left transition-all cursor-pointer ${
                workspaceMode === 'writing'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <PenTool className="w-4 h-4 text-emerald-300 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold">2. Chấm Viết Học Thuật 4 Tiêu Chí</div>
                  <div className="text-[11px] opacity-80">Nâng cấp từ vựng C1/C2 · Bài mẫu Band cao</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => setWorkspaceMode('analytics')}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-left transition-all cursor-pointer ${
                workspaceMode === 'analytics'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-sky-300 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold">3. Radar Năng Lực 6 Kỹ Năng</div>
                  <div className="text-[11px] opacity-80">Độ sẵn sàng thi: {radarAnalysis.overallReadinessPercent}%</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Progression Level Bar (Basic -> Intermediate -> Advanced) */}
        {workspaceMode !== 'analytics' && (
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-semibold text-indigo-200">
              Chọn cấp độ huấn luyện ({course.vietnameseName}):
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'basic', label: 'Cơ bản (A1 - A2)' },
                  { id: 'intermediate', label: 'Trung cấp (B1 - B2)' },
                  { id: 'advanced', label: 'Nâng cao (C1 - C2)' }
                ] as { id: MasteryLevel; label: string }[]
              ).map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedLevel === lvl.id
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          WORKSPACE 1: AI SPEAKING & PRONUNCIATION WAVEFORM COACH
         ===================================================================== */}
      {workspaceMode === 'speaking' && activeDrill && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Columns: Target Sentence, Dual Pitch Waveform & Articulation Coach */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                  <span>{activeDrill.levelLabelVi}</span>
                  <span>·</span>
                  <span>{activeDrill.examTag}</span>
                  <span>·</span>
                  <span>CEFR {activeDrill.cefrTag}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Tốc độ chuẩn: <strong className="text-slate-800">{activeDrill.targetWpm} từ/phút</strong>
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {activeDrill.titleVi}
                </h2>
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5 border border-slate-800">
                  <p className="text-lg sm:text-xl font-bold leading-relaxed tracking-tight text-amber-200">
                    {activeDrill.targetSentence}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-200">
                    Phiên âm chuẩn: {activeDrill.phoneticTranscription}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 border-t border-white/10 pt-2">
                    Nghĩa tiếng Việt: {activeDrill.vietnameseTranslation}
                  </p>
                </div>
              </div>

              {/* Audio & Recording Controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => speakText(activeDrill.targetSentence, course.voiceLangCode, 1.0)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Nghe giọng chuẩn (1.0x)</span>
                </button>

                <button
                  type="button"
                  onClick={() => speakText(activeDrill.targetSentence, course.voiceLangCode, 0.75)}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>Nghe chậm tách âm (0.75x)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRunPronunciationEvaluation('excellent')}
                  disabled={isRecording}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>
                    {isRecording
                      ? 'Đang phân tích sóng âm...'
                      : 'Thu Âm & Chấm Điểm Phát Âm AI (+25 XP)'}
                  </span>
                </button>
              </div>

              {/* Interactive SVG Pitch Contour Waveform Comparison */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-800">
                    Biểu Đồ Sóng Âm & Đường Cong Ngữ Điệu (Pitch Contour)
                  </span>
                  <div className="flex items-center gap-4 text-[11px] font-semibold">
                    <span className="flex items-center gap-1.5 text-indigo-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                      Giọng chuẩn bản xứ
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      Giọng của bạn ({speakingEval?.overallScore || 84}%)
                    </span>
                  </div>
                </div>

                <div className="w-full overflow-hidden">
                  <svg
                    viewBox="0 0 480 120"
                    className="w-full h-28 bg-white rounded-xl border border-slate-200/70 p-2"
                    aria-label="Biểu đồ so sánh ngữ điệu bản xứ và người học"
                  >
                    {/* Horizontal guide lines */}
                    <line x1="20" y1="25" x2="460" y2="25" stroke="#e2e8f0" strokeDasharray="4 4" />
                    <line x1="20" y1="60" x2="460" y2="60" stroke="#e2e8f0" strokeDasharray="4 4" />
                    <line x1="20" y1="95" x2="460" y2="95" stroke="#e2e8f0" strokeDasharray="4 4" />

                    {/* Native Pitch Polyline */}
                    <polyline
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={activeDrill.nativePitchContour
                        .map((val, i) => `${25 + i * 39},${110 - val * 0.9}`)
                        .join(' ')}
                    />

                    {/* Learner Pitch Polyline */}
                    {speakingEval && (
                      <polyline
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeDasharray="6 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={speakingEval.learnerPitchContour
                          .map((val, i) => `${25 + i * 39},${110 - val * 0.9}`)
                          .join(' ')}
                      />
                    )}

                    {/* Nodes */}
                    {activeDrill.nativePitchContour.map((val, i) => (
                      <circle
                        key={i}
                        cx={25 + i * 39}
                        cy={110 - val * 0.9}
                        r="4"
                        fill="#4f46e5"
                      />
                    ))}
                  </svg>
                </div>

                {/* Simulation Profile Switcher for instant testing */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                  <span>Mô phỏng mức độ khớp âm thanh để đối chiếu:</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleRunPronunciationEvaluation('needs-work')}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
                    >
                      Thử mức Cần sửa (67%)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunPronunciationEvaluation('good')}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
                    >
                      Thử mức Khá (83%)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunPronunciationEvaluation('excellent')}
                      className="px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold cursor-pointer"
                    >
                      Thử mức Bản xứ (94%)
                    </button>
                  </div>
                </div>
              </div>

              {/* 4-Part Mouth & Tongue Articulation Guide */}
              <div className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Hướng Dẫn Khẩu Hình Răng - Môi - Lưỡi Chuẩn Bản Xứ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                    <div className="font-bold text-indigo-950">1. Độ mở hàm & Môi</div>
                    <p className="text-slate-700 leading-relaxed">
                      {activeDrill.articulationGuide.jawOpeningVi}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                    <div className="font-bold text-emerald-950">2. Vị trí Đầu lưỡi & Vòm họng</div>
                    <p className="text-slate-700 leading-relaxed">
                      {activeDrill.articulationGuide.tonguePositionVi}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
                    <div className="font-bold text-amber-950">3. Luồng hơi & Dây thanh</div>
                    <p className="text-slate-700 leading-relaxed">
                      {activeDrill.articulationGuide.airflowVoiceVi}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900">4. Nhịp nhấn & Trọng âm câu</div>
                    <p className="text-slate-700 leading-relaxed">
                      {activeDrill.articulationGuide.rhythmStressVi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: 4-Dimension Pronunciation Score & Syllable Diagnostics */}
          <div className="lg:col-span-5 space-y-6">
            {speakingEval && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Kết quả phân tích phát âm AI</div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">
                      {speakingEval.cefrGrade}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center shadow-sm">
                    <span className="text-xl font-black tabular-nums">{speakingEval.overallScore}%</span>
                    <span className="text-[10px] font-semibold opacity-85">Tổng điểm</span>
                  </div>
                </div>

                {/* 4 Criteria Bars */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: 'Độ chuẩn âm vị', score: speakingEval.phonemeAccuracy },
                    { label: 'Ngữ điệu & Trọng âm', score: speakingEval.intonationScore },
                    { label: 'Độ trôi chảy (Fluency)', score: speakingEval.fluencyScore },
                    { label: 'Nhịp độ phản xạ', score: speakingEval.pacingScore }
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <div className="flex items-center justify-between font-bold text-slate-800 mb-1.5">
                        <span>{item.label}</span>
                        <span className="text-indigo-600 tabular-nums">{item.score}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coach Summary Box */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                  <strong className="font-bold block mb-1">Nhận xét từ Chuyên gia Khẩu hình AI:</strong>
                  {speakingEval.coachSummaryVi}
                </div>

                {/* Word-by-Word / Syllable-by-Syllable Breakdown */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-slate-800">
                    Bóc tách chi tiết từng cụm âm khó (Nhấn vào từ để nghe & xem lỗi hay gặp):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeDrill.syllables.map((syl, idx) => {
                      const diag = speakingEval.wordDiagnostics[idx];
                      const isSelected = activeSyllableIdx === idx;
                      return (
                        <button
                          key={syl.token}
                          type="button"
                          onClick={() => {
                            setActiveSyllableIdx(idx);
                            speakText(syl.token, course.voiceLangCode, 0.85);
                          }}
                          className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-1 ring-indigo-600'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <span>{syl.token}</span>
                          {diag && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                                diag.status === 'excellent'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : diag.status === 'good'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {diag.accuracyPercent}%
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Syllable Inspector Card */}
                  {activeDrill.syllables[activeSyllableIdx] && (
                    <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-amber-300">
                          {activeDrill.syllables[activeSyllableIdx].token}{' '}
                          <span className="font-semibold text-indigo-200">
                            {activeDrill.syllables[activeSyllableIdx].phoneticGuide}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            speakText(
                              activeDrill.syllables[activeSyllableIdx].token,
                              course.voiceLangCode,
                              0.8
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold cursor-pointer inline-flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe mẫu</span>
                        </button>
                      </div>
                      <p className="text-slate-200">
                        <strong className="text-emerald-300">Mẹo đặt môi & lưỡi:</strong>{' '}
                        {activeDrill.syllables[activeSyllableIdx].mouthTipVi}
                      </p>
                      <p className="text-slate-300">
                        <strong className="text-rose-300">Lỗi người Việt hay mắc:</strong>{' '}
                        {activeDrill.syllables[activeSyllableIdx].commonMistakeVi}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 2: AI ACADEMIC WRITING & 4-CRITERION BAND GRADER
         ===================================================================== */}
      {workspaceMode === 'writing' && activeWritingPrompt && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Columns: Writing Prompt, C1 Power Vocab Bank & Editor */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                  <span>{activeWritingPrompt.examName}</span>
                  <span>·</span>
                  <span>{activeWritingPrompt.levelLabelVi}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Yêu cầu tối thiểu:{' '}
                  <strong className="text-slate-900">
                    {activeWritingPrompt.minWordsOrChars} {activeWritingPrompt.unitLabel}
                  </strong>
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  Đề bài: {activeWritingPrompt.titleVi}
                </h2>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {activeWritingPrompt.promptText}
                  </p>
                  <p className="text-xs text-slate-600">
                    Dịch đề: {activeWritingPrompt.promptTranslationVi}
                  </p>
                </div>
              </div>

              {/* Power Vocabulary Chips to insert into essay */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  Từ vựng học thuật ăn điểm (Nhấn để chèn nhanh vào bài viết):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeWritingPrompt.targetPowerVocab.map((vocab) => (
                    <button
                      key={vocab.word}
                      type="button"
                      onClick={() => handleInsertPowerWord(vocab.word)}
                      className="p-2.5 rounded-xl border border-indigo-200/80 bg-indigo-50/50 hover:bg-indigo-100/70 text-left transition-all cursor-pointer"
                    >
                      <div className="text-xs font-bold text-indigo-950">{vocab.word}</div>
                      <div className="text-[11px] font-semibold text-indigo-700">{vocab.phonetic}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{vocab.meaningVi}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Essay Textarea */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="ai-studio-writing-textarea"
                    className="text-xs font-bold text-slate-800"
                  >
                    Bài làm của bạn ({course.vietnameseName}):
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`font-bold tabular-nums ${
                        currentUnitCount >= activeWritingPrompt.minWordsOrChars
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}
                    >
                      Độ dài: {currentUnitCount} / {activeWritingPrompt.minWordsOrChars}{' '}
                      {activeWritingPrompt.unitLabel}
                    </span>
                  </div>
                </div>

                <textarea
                  id="ai-studio-writing-textarea"
                  rows={6}
                  value={essayText}
                  onChange={(e) => {
                    setEssayText(e.target.value);
                    if (writingValidationError) setWritingValidationError(null);
                  }}
                  placeholder={`Nhập bài viết bằng ${course.vietnameseName} tại đây...`}
                  className="w-full rounded-2xl border border-slate-300 p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
                />

                {writingValidationError && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{writingValidationError}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEssayText(activeWritingPrompt.sampleLearnerDraft);
                        setWritingEval(
                          evaluateWritingSubmissionLocal(
                            activeWritingPrompt,
                            activeWritingPrompt.sampleLearnerDraft
                          )
                        );
                        setWritingValidationError(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Nạp bài mẫu học viên</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEssayText(activeWritingPrompt.modelHighBandEssay);
                        setWritingEval(
                          evaluateWritingSubmissionLocal(
                            activeWritingPrompt,
                            activeWritingPrompt.modelHighBandEssay
                          )
                        );
                        setWritingValidationError(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Nạp bài mẫu C1 / Band 8.5+</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleEvaluateWriting}
                    disabled={isEvaluatingWriting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>
                      {isEvaluatingWriting
                        ? 'Giám khảo AI đang chấm...'
                        : 'Chấm Điểm & Nâng Cấp Bài Viết AI (+35 XP)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: 4-Criterion Rubric Score, Inline Upgrades & Model Answer */}
          <div className="lg:col-span-5 space-y-6">
            {writingEval && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Bảng điểm Giám khảo Học thuật AI
                    </div>
                    <div className="text-lg font-black text-indigo-700 mt-0.5">
                      {writingEval.bandOrScaleLabel}
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      Trình độ tương đương: {writingEval.cefrEquivalent}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center">
                    <span className="text-xl font-black tabular-nums text-amber-300">
                      {writingEval.overallScore100}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-300">/ 100 điểm</span>
                  </div>
                </div>

                {/* 4 Official Writing Rubric Bars */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: 'Hoàn thành đề (TR)', score: writingEval.criteria.taskResponse },
                    { label: 'Mạch lạc & Liên kết (CC)', score: writingEval.criteria.coherenceCohesion },
                    { label: 'Vốn từ học thuật (LR)', score: writingEval.criteria.lexicalResource },
                    { label: 'Ngữ pháp đa dạng (GRA)', score: writingEval.criteria.grammaticalRange }
                  ].map((crit) => (
                    <div key={crit.label} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <div className="flex items-center justify-between font-bold text-slate-800 mb-1.5">
                        <span>{crit.label}</span>
                        <span className="text-indigo-600 tabular-nums">{crit.score}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${crit.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Examiner Summary */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 leading-relaxed">
                  <strong className="font-bold block mb-1">Nhận xét tổng quát của Giám khảo AI:</strong>
                  {writingEval.examinerSummaryVi}
                </div>

                {/* Inline Sentence-by-Sentence C1/C2 Upgrades */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-slate-900">
                    Đề xuất nâng cấp câu văn lên chuẩn C1 / Band 8.5+:
                  </div>
                  {writingEval.inlineUpgrades.map((up, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-700 line-through">
                          {up.originalSnippet}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                          Tiêu chí {up.criterionTag}
                        </span>
                      </div>
                      <div className="font-bold text-emerald-800">
                        → {up.upgradedSnippet}
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {up.explanationVi}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Model Essay Box with Audio */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      <span>Bài Luận Mẫu Đạt Điểm Tuyệt Đối (C1/C2)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        speakText(activeWritingPrompt.modelHighBandEssay, course.voiceLangCode, 0.95)
                      }
                      className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe bài mẫu</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                    {activeWritingPrompt.modelHighBandEssay}
                  </p>
                  <p className="text-[11px] text-slate-300 border-t border-white/10 pt-2">
                    Bản dịch: {activeWritingPrompt.modelTranslationVi}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 3: 6-SKILL COMPETENCY RADAR & SMART STUDY PLANNER
         ===================================================================== */}
      {workspaceMode === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 6 Columns: SVG 6-Axis Radar Chart */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Biểu Đồ Radar Năng Lực 6 Kỹ Năng ({course.vietnameseName})
                </h2>
                <p className="text-xs text-slate-500">
                  So sánh năng lực hiện tại với chuẩn đầu ra {masteryPack.examStandardName}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
                Sẵn sàng: {radarAnalysis.overallReadinessPercent}%
              </div>
            </div>

            <div className="flex justify-center">
              <svg
                viewBox="0 0 320 320"
                className="w-full max-w-sm h-80"
                aria-label="Biểu đồ Radar 6 kỹ năng ngôn ngữ"
              >
                {/* Concentric hexagonal grid rings */}
                {[0.33, 0.66, 1].map((scale, sIdx) => {
                  const ringPoints = [0, 1, 2, 3, 4, 5]
                    .map((i) => {
                      const angle = ((i * 60 - 90) * Math.PI) / 180;
                      const r = 105 * scale;
                      return `${(160 + r * Math.cos(angle)).toFixed(1)},${(
                        160 +
                        r * Math.sin(angle)
                      ).toFixed(1)}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={sIdx}
                      points={ringPoints}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Axis lines */}
                {radarAnalysis.axes.map((axis) => (
                  <line
                    key={axis.key}
                    x1="160"
                    y1="160"
                    x2={axis.labelX}
                    y2={axis.labelY}
                    stroke="#cbd5e1"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Target Benchmark Polygon */}
                <polygon
                  points={radarAnalysis.benchmarkPolygonPoints}
                  fill="rgba(16, 185, 129, 0.10)"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />

                {/* Learner Competency Polygon */}
                <polygon
                  points={radarAnalysis.learnerPolygonPoints}
                  fill="rgba(79, 70, 229, 0.28)"
                  stroke="#4f46e5"
                  strokeWidth="2.5"
                />

                {/* Vertex circles & Axis Labels */}
                {radarAnalysis.axes.map((axis) => (
                  <g key={axis.key}>
                    <circle cx={axis.learnerX} cy={axis.learnerY} r="4.5" fill="#4f46e5" />
                    <text
                      x={axis.labelX}
                      y={axis.labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[10px] font-bold fill-slate-700"
                    >
                      {axis.labelVi} ({axis.learnerScore}%)
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
              <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <div className="text-slate-500 font-medium">Kỹ năng mạnh nhất</div>
                <div className="font-bold text-indigo-950 mt-0.5">
                  {radarAnalysis.strongestSkillVi}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                <div className="text-slate-500 font-medium">Kỹ năng ưu tiên bứt phá</div>
                <div className="font-bold text-amber-950 mt-0.5">
                  {radarAnalysis.focusSkillVi}
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Detailed Skill Breakdown & Personalized AI Daily Missions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Lộ Trình Nhiệm Vụ Cá Nhân Hóa Hôm Nay (AI Smart Planner)
              </h3>
              <p className="text-xs text-slate-600">
                Hệ thống tự động thiết kế 3 nhiệm vụ trọng tâm giúp bạn thu hẹp khoảng cách với chuẩn đầu ra{' '}
                <strong>{masteryPack.examStandardName}</strong>:
              </p>

              <div className="space-y-3">
                {radarAnalysis.recommendedMissions.map((mission) => {
                  const isDone = completedMissionIds.includes(mission.id);
                  return (
                    <div
                      key={mission.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-700">
                            <span>{mission.skillNameVi}</span>
                            <span>·</span>
                            <span>{mission.estimatedMinutes} phút</span>
                            <span>·</span>
                            <span className="text-amber-700">+{mission.xpReward} XP</span>
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {mission.titleVi}
                          </div>
                          <p className="text-xs text-slate-600">{mission.actionDescVi}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {mission.targetTab === 'video' && onNavigateToTab && (
                            <button
                              type="button"
                              onClick={() => onNavigateToTab('video')}
                              className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                            >
                              Mở Video AI
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleCompleteMission(mission.id, mission.xpReward)}
                            disabled={isDone}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                          >
                            {isDone ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Đã nhận +{mission.xpReward} XP</span>
                              </>
                            ) : (
                              <>
                                <Zap className="w-3.5 h-3.5" />
                                <span>Hoàn thành (+{mission.xpReward} XP)</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
