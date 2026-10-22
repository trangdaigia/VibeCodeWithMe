import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Volume2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Mic,
  Headphones,
  PenTool,
  Check,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Video,
  Monitor,
  Highlighter,
  Flag,
  Shuffle,
  Settings2,
  AlertTriangle,
  Trophy,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Briefcase,
  Mail,
  Compass,
  FileCheck
} from 'lucide-react';
import { LanguageCourse, ExamInfo, ExamQuestion, WritingModelPrompt, SpeakingCueCard, IeltsTestSet, IeltsVideoLesson } from '../data/curriculum';
import {
  MockExamSession,
  MockExamConfig,
  MockExamResult,
  createMockExamSession,
  evaluateMockExamSession
} from '../utils/ieltsMockEngine';
import { speakText } from '../utils/speech';

interface AcademicExamViewProps {
  course: LanguageCourse;
  onGainXp: (amount: number) => void;
}

export const AcademicExamView: React.FC<AcademicExamViewProps> = ({ course, onGainXp }) => {
  const [selectedExamIndex, setSelectedExamIndex] = useState(0);
  const [selectedTestSetIndex, setSelectedTestSetIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  
  // Track selector: IELTS Academic vs IELTS General Training
  const [examModuleTrack, setExamModuleTrack] = useState<'academic' | 'general-training'>('academic');
  const [writingToneFilter, setWritingToneFilter] = useState<'all' | 'Formal' | 'Semi-formal' | 'Informal' | 'Task 2'>('all');

  // Computer-delivered IELTS split view & highlighter mode
  const [isSplitView, setIsSplitView] = useState(false);
  const [isHighlighterActive, setIsHighlighterActive] = useState(false);
  const [passageFontSize, setPassageFontSize] = useState<'text-xs' | 'text-sm' | 'text-base'>('text-xs');

  // RANDOMIZED MOCK EXAM ENGINE STATE
  const [isEngineActive, setIsEngineActive] = useState(false);
  const [enginePhase, setEnginePhase] = useState<'config' | 'in-exam' | 'result'>('config');
  const [engineConfig, setEngineConfig] = useState<MockExamConfig>({
    skillMode: 'all-skills',
    questionCount: 15,
    durationMinutes: 25,
    sourceSetId: 'all',
    examModule: 'academic'
  });
  const [mockSession, setMockSession] = useState<MockExamSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isExamPaused, setIsExamPaused] = useState(false);
  const [mockResult, setMockResult] = useState<MockExamResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);

  // Writing Prompt State
  const [selectedWritingTaskIndex, setSelectedWritingTaskIndex] = useState(0);

  // Speaking Cue Card State
  const [selectedSpeakingIndex, setSelectedSpeakingIndex] = useState(1);
  const [prepTimerSeconds, setPrepTimerSeconds] = useState(60);
  const [isPrepTimerRunning, setIsPrepTimerRunning] = useState(false);
  const [speakTimerSeconds, setSpeakTimerSeconds] = useState(120);
  const [isSpeakTimerRunning, setIsSpeakTimerRunning] = useState(false);

  // AI Masterclass Video Player State
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoSlideIndex, setVideoSlideIndex] = useState(0);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);
  const [videoPlaybackSpeed, setVideoPlaybackSpeed] = useState<number>(1.0);

  const activeExam: ExamInfo | undefined = course.examInfo[selectedExamIndex] || course.examInfo[0];
  const availableTestSets: IeltsTestSet[] = activeExam?.testSets || [];
  const currentTestSet: IeltsTestSet | undefined = availableTestSets[selectedTestSetIndex];

  // Current questions pool for regular browsing
  const currentQuestions: ExamQuestion[] = currentTestSet 
    ? currentTestSet.questions 
    : (activeExam?.sampleQuestions || []);

  const rawWritingPrompts: WritingModelPrompt[] = (currentTestSet?.writingPrompts && currentTestSet.writingPrompts.length > 0)
    ? currentTestSet.writingPrompts
    : (activeExam?.writingPrompts || []);

  const writingPrompts: WritingModelPrompt[] = rawWritingPrompts.filter(wp => {
    if (writingToneFilter === 'all') return true;
    if (writingToneFilter === 'Task 2') return wp.taskType === 'Task 2';
    return wp.letterTone === writingToneFilter;
  });

  const speakingCards: SpeakingCueCard[] = (currentTestSet?.speakingCueCards && currentTestSet.speakingCueCards.length > 0)
    ? currentTestSet.speakingCueCards
    : (activeExam?.speakingCueCards || []);

  const availableVideoLessons: IeltsVideoLesson[] = activeExam?.videoLessons || [];
  const currentVideo: IeltsVideoLesson | undefined = availableVideoLessons[selectedVideoIndex];

  // COUNTDOWN TIMER EFFECT FOR RANDOMIZED MOCK EXAM
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isEngineActive && enginePhase === 'in-exam' && !isExamPaused && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            // Auto submit when time runs out!
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isEngineActive, enginePhase, isExamPaused, remainingSeconds]);

  // Speaking Prep Countdown (60s)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPrepTimerRunning && prepTimerSeconds > 0) {
      interval = setInterval(() => {
        setPrepTimerSeconds(prev => {
          if (prev <= 1) {
            setIsPrepTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPrepTimerRunning, prepTimerSeconds]);

  // Speaking Monologue Countdown (120s)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSpeakTimerRunning && speakTimerSeconds > 0) {
      interval = setInterval(() => {
        setSpeakTimerSeconds(prev => {
          if (prev <= 1) {
            setIsSpeakTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeakTimerRunning, speakTimerSeconds]);

  // Subtitle auto-progression in simulated AI video player
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isVideoPlaying && currentVideo && currentVideo.subtitles.length > 0) {
      timer = setInterval(() => {
        setActiveSubtitleIndex(prev => {
          const next = (prev + 1) % currentVideo.subtitles.length;
          if (next === 0 && currentVideo.slides.length > 1) {
            setVideoSlideIndex(s => (s + 1) % currentVideo.slides.length);
          }
          return next;
        });
      }, 4500 / videoPlaybackSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isVideoPlaying, currentVideo, videoPlaybackSpeed]);

  if (!activeExam) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-500">Thông tin chứng chỉ đang được cập nhật cho ngôn ngữ này.</p>
      </div>
    );
  }

  // Regular questions filter for practice tabs
  const filteredQuestions = currentQuestions.filter(q => {
    if (activeTab === 'all') return true;
    return q.skill === activeTab;
  });

  const handleSelectRegularOption = (questionIndex: number, option: string) => {
    if (submittedQuestions[questionIndex]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmitRegularAnswer = (questionIndex: number, correctAnswer: string) => {
    setSubmittedQuestions(prev => ({ ...prev, [questionIndex]: true }));
    if (selectedAnswers[questionIndex] === correctAnswer) {
      onGainXp(25);
    }
  };

  // MOCK ENGINE CONTROLS
  const handleLaunchMockExam = () => {
    const session = createMockExamSession(availableTestSets, activeExam.sampleQuestions, engineConfig);
    setMockSession(session);
    setCurrentQuestionIndex(0);
    setRemainingSeconds(session.durationSeconds);
    setIsExamPaused(false);
    setMockResult(null);
    setEnginePhase('in-exam');
    setIsEngineActive(true);
    setShowSubmitConfirmModal(false);
  };

  const handleSelectMockOption = (option: string) => {
    if (!mockSession || mockSession.isSubmitted) return;
    const updatedAnswers = { ...mockSession.userAnswers, [currentQuestionIndex]: option };
    setMockSession({
      ...mockSession,
      userAnswers: updatedAnswers
    });
  };

  const handleToggleFlagCurrentQuestion = () => {
    if (!mockSession) return;
    const currentFlag = !!mockSession.flaggedQuestions[currentQuestionIndex];
    setMockSession({
      ...mockSession,
      flaggedQuestions: {
        ...mockSession.flaggedQuestions,
        [currentQuestionIndex]: !currentFlag
      }
    });
  };

  const handleFinalSubmit = () => {
    if (!mockSession) return;
    const timeSpent = mockSession.durationSeconds - remainingSeconds;
    const result = evaluateMockExamSession(mockSession, Math.max(15, timeSpent));
    setMockResult(result);
    setMockSession({ ...mockSession, isSubmitted: true, submittedAt: Date.now() });
    setEnginePhase('result');
    setShowSubmitConfirmModal(false);

    // Reward XP based on performance
    const earnedXp = Math.max(60, result.correctCount * 15 + Math.round(result.overallBand * 10));
    onGainXp(earnedXp);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayAudio = (text: string) => {
    speakText(text, course.voiceLangCode);
  };

  const activeWriting = writingPrompts[selectedWritingTaskIndex] || writingPrompts[0];
  const activeSpeaking = speakingCards[selectedSpeakingIndex] || speakingCards[0];

  const listeningCount = currentQuestions.filter(q => q.skill === 'listening').length;
  const readingCount = currentQuestions.filter(q => q.skill === 'reading').length;
  const writingCount = currentQuestions.filter(q => q.skill === 'writing').length;
  const speakingCount = currentQuestions.filter(q => q.skill === 'speaking').length;

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <GraduationCap className="w-4 h-4" />
              <span>Trung Tâm Luyện Thi Chứng Chỉ Quốc Tế & Học Thuật</span>
              <span aria-hidden="true">·</span>
              <span>{course.vietnameseName}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              {activeExam.examName.includes('IELTS') ? (
                examModuleTrack === 'general-training'
                  ? 'Luyện Thi IELTS General Training: Bản Chuẩn Định Cư & Việc Làm Quốc Tế'
                  : 'Luyện Thi IELTS Academic: Đề Thi Thật & Thi Thử Ngẫu Nhiên Chuẩn Quốc Tế'
              ) : (
                `Luyện Thi Chứng Chỉ ${activeExam.examName}`
              )}
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              {activeExam.examName.includes('IELTS') ? (
                examModuleTrack === 'general-training'
                  ? 'Thiết kế bám sát chuẩn Cambridge & IDP cho định cư (Canada Express Entry, Úc PR/482, NZ) và môi trường làm việc: Đọc hiểu 3 Section (Đời sống - Công sở - Tạp chí), thang điểm Reading khắt khe (Band 7.0 = 34-35/40) và viết thư Task 1 với 3 phong cách (Formal, Semi-formal, Informal).'
                  : 'Trang bị ngân hàng đề thi Cambridge 19, 18 & British Council sát thực tế: 3 bài luận khoa học hàn lâm, mô tả biểu đồ Task 1, hệ thống tạo đề thi ngẫu nhiên bấm giờ (Mock Engine) và video bài giảng AI chuyên sâu.'
              ) : (
                activeExam.overview
              )}
            </p>
          </div>

          {/* Exam Selector Tabs */}
          {course.examInfo.length > 1 && (
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
              {course.examInfo.map((exam, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedExamIndex(idx);
                    setSelectedTestSetIndex(0);
                    setSelectedAnswers({});
                    setSubmittedQuestions({});
                    setActiveTab('all');
                    setIsEngineActive(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedExamIndex === idx
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {exam.examName.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* IELTS MODULE TRACK SWITCHER (ACADEMIC VS GENERAL TRAINING) */}
        {activeExam.examName.includes('IELTS') && (
          <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                  Phân Hệ Kỳ Thi IELTS (Select Module Track):
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Khác biệt lớn ở phần Reading & Writing (Listening & Speaking đồng nhất)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Option 1: Academic */}
              <button
                onClick={() => {
                  setExamModuleTrack('academic');
                  setEngineConfig(prev => ({ ...prev, examModule: 'academic' }));
                  const acIdx = availableTestSets.findIndex(s => s.module !== 'general-training');
                  if (acIdx !== -1) {
                    setSelectedTestSetIndex(acIdx);
                    setSelectedAnswers({});
                    setSubmittedQuestions({});
                    setSelectedWritingTaskIndex(0);
                  }
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  examModuleTrack === 'academic'
                    ? 'border-indigo-600 bg-white shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">IELTS Academic (Du Học & Học Thuật)</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    examModuleTrack === 'academic' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {examModuleTrack === 'academic' ? 'Đang chọn' : 'Du học'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  Phù hợp xét học bổng, cử nhân, sau đại học và chứng chỉ hành nghề quốc tế. Reading gồm 3 bài luận khoa học dài; Writing Task 1 phân tích biểu đồ/quy trình; thang điểm Reading chuẩn (30-31/40 = Band 7.0).
                </p>
              </button>

              {/* Option 2: General Training */}
              <button
                onClick={() => {
                  setExamModuleTrack('general-training');
                  setEngineConfig(prev => ({ ...prev, examModule: 'general-training' }));
                  const gtIdx = availableTestSets.findIndex(s => s.module === 'general-training');
                  if (gtIdx !== -1) {
                    setSelectedTestSetIndex(gtIdx);
                    setSelectedAnswers({});
                    setSubmittedQuestions({});
                    setSelectedWritingTaskIndex(0);
                  }
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  examModuleTrack === 'general-training'
                    ? 'border-emerald-600 bg-white shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">IELTS General Training (Định Cư & Làm Việc)</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    examModuleTrack === 'general-training' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {examModuleTrack === 'general-training' ? 'Đang chọn' : 'Định cư'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  Bắt buộc cho hồ sơ định cư Canada (Express Entry), Úc (PR/482), New Zealand, UK & xin việc. Reading 3 Section thực tế (thang điểm khắt khe hơn: 34-35/40 = Band 7.0); Writing Task 1 viết thư 3 Tone (Formal, Semi-formal, Informal).
                </p>
              </button>
            </div>

            {/* General Training Detailed Structure & Stricter Scoring Callout */}
            {examModuleTrack === 'general-training' && (
              <div className="mt-2 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/90 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  <span>Cẩm Nang Cấu Trúc Đề Thi IELTS General Training (GT) Chuẩn Quốc Tế:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                  <div className="space-y-1 bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                    <div className="font-bold text-emerald-800">1. Reading (60 phút - 40 câu hỏi, chia 3 Section rõ rệt):</div>
                    <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                      <li><strong>Section 1 (Social Survival - Đời sống thường nhật):</strong> 2–3 mẩu thông tin thực tế (tờ rơi hội thảo, bảng giờ xe metro, quảng cáo dịch vụ).</li>
                      <li><strong>Section 2 (Workplace Survival - Môi trường làm việc):</strong> 2 bài công sở (nội quy công ty, chính sách nghỉ ốm, an toàn lao động, thỏa thuận TOIL).</li>
                      <li><strong>Section 3 (General Reading - Bài đọc tổng quát):</strong> 1 bài báo/tạp chí dài phổ thông (nghệ thuật phục hưng đồng hồ thủ công).</li>
                      <li className="text-amber-800 font-semibold">⚠️ <strong>Thang điểm khắt khe:</strong> Do bài đọc GT dễ hiểu hơn Academic, Band 7.0 yêu cầu phải đúng <strong>34–35/40 câu</strong> (trong khi Academic chỉ cần 30–31 câu).</li>
                    </ul>
                  </div>

                  <div className="space-y-1 bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                    <div className="font-bold text-emerald-800">2. Writing (60 phút - 2 phần):</div>
                    <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                      <li><strong>Task 1: Viết một bức thư (Letter - min 150 từ, 20 phút):</strong> Bám sát 3 phong cách hành văn:
                        <br />• <em>Formal (Trang trọng):</em> Gửi cơ quan, khiếu nại hãng hàng không ("Dear Sir or Madam ... Yours faithfully").
                        <br />• <em>Semi-formal (Bán trang trọng):</em> Gửi chủ nhà trọ, đồng nghiệp ("Dear Mr. ... Yours sincerely").
                        <br />• <em>Informal (Thân mật):</em> Gửi bạn bè mời du lịch, cảm ơn ("Dear Alex ... Warm regards").
                      </li>
                      <li><strong>Task 2: Bài luận (Essay - min 250 từ, 40 phút):</strong> Thảo luận các đề tài đời sống xã hội thực tế (Cân bằng công việc - cuộc sống, làm việc từ xa vs đi lại văn phòng).</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BỘ ĐỀ THI LỰA CHỌN (TEST SETS SELECTOR) */}
        {availableTestSets.length > 0 && !isEngineActive && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  {examModuleTrack === 'general-training'
                    ? 'Bộ Đề Thi IELTS General Training Chính Thức:'
                    : 'Bộ Đề Thi Thật IELTS Academic (Cambridge & British Council Actual Tests):'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {availableTestSets.length} bộ đề sẵn sàng
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {availableTestSets.map((testSet, idx) => {
                const isSelected = selectedTestSetIndex === idx;
                const isGtSet = testSet.module === 'general-training';
                return (
                  <button
                    key={testSet.id}
                    onClick={() => {
                      setSelectedTestSetIndex(idx);
                      setSelectedAnswers({});
                      setSubmittedQuestions({});
                      setSelectedWritingTaskIndex(0);
                      if (testSet.module) {
                        setExamModuleTrack(testSet.module);
                        setEngineConfig(prev => ({ ...prev, examModule: testSet.module || 'academic' }));
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? isGtSet
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                          : 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        isSelected 
                          ? (isGtSet ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white')
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {testSet.code}
                      </span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                        isGtSet 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {isGtSet ? 'General Training' : 'Academic'}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                      {testSet.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {testSet.description}
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-600">
                      <span className="font-semibold text-slate-700">{testSet.questions.length} câu</span>
                      <span>·</span>
                      <span className={`font-medium ${isGtSet ? 'text-emerald-700' : 'text-indigo-600'}`}>{testSet.targetBand}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            {/* FEATURED: RANDOMIZED MOCK EXAM ENGINE BUTTON */}
            <button
              onClick={() => {
                setIsEngineActive(true);
                setEnginePhase('config');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer shadow-xs ${
                isEngineActive
                  ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                  : 'bg-linear-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Thi Thử Ngẫu Nhiên (Mock Engine)</span>
              <span className="text-[10px] uppercase tracking-wide bg-amber-900/40 px-1.5 py-0.2 rounded text-white ml-0.5 font-mono">
                Bấm Giờ
              </span>
            </button>

            {/* Masterclass Video Tab */}
            {availableVideoLessons.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab('video-lessons');
                  setIsEngineActive(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
                  activeTab === 'video-lessons' && !isEngineActive
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Bài Giảng AI ({availableVideoLessons.length})</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('all');
                setIsEngineActive(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'all' && !isEngineActive
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả ({currentQuestions.length} câu)
            </button>

            {listeningCount > 0 && (
              <button
                onClick={() => {
                  setActiveTab('listening');
                  setIsEngineActive(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'listening' && !isEngineActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Listening ({listeningCount})</span>
              </button>
            )}

            {readingCount > 0 && (
              <button
                onClick={() => {
                  setActiveTab('reading');
                  setIsEngineActive(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'reading' && !isEngineActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Reading ({readingCount})</span>
              </button>
            )}

            {writingCount > 0 && (
              <button
                onClick={() => {
                  setActiveTab('writing');
                  setIsEngineActive(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'writing' && !isEngineActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Writing Quiz ({writingCount})</span>
              </button>
            )}

            {speakingCount > 0 && (
              <button
                onClick={() => {
                  setActiveTab('speaking');
                  setIsEngineActive(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'speaking' && !isEngineActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Speaking ({speakingCount})</span>
              </button>
            )}

            {/* Writing Models Tab */}
            {writingPrompts.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab('writing-models');
                  setIsEngineActive(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'writing-models' && !isEngineActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Bài Mẫu Writing Band 9.0 ({writingPrompts.length})</span>
              </button>
            )}

            {/* Speaking Simulator Tab */}
            {speakingCards.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab('speaking-simulator');
                  setIsEngineActive(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'speaking-simulator' && !isEngineActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Mô Phỏng Phòng Thi Nói Part 2</span>
              </button>
            )}
          </div>

          {/* Computer-Delivered Tools (when not in mock engine) */}
          {!isEngineActive && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsHighlighterActive(!isHighlighterActive)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer border ${
                  isHighlighterActive 
                    ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Bật/Tắt chế độ tô màu từ khóa quan trọng"
              >
                <Highlighter className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Highlight Từ Khóa</span>
              </button>

              <button
                onClick={() => setIsSplitView(!isSplitView)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer border ${
                  isSplitView 
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Chia đôi màn hình chuẩn thi máy IELTS on Computer"
              >
                <Monitor className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Giao Diện Thi Máy (Split)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🚀 RANDOMIZED MOCK EXAM ENGINE CONTAINER */}
      {/* ========================================================================= */}
      {isEngineActive && (
        <div className="space-y-6">
          {/* PHASE 1: EXAM CONFIGURATION & GENERATION */}
          {enginePhase === 'config' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <Shuffle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Cấu Hình Đề Thi Thử Ngẫu Nhiên (IELTS Mock Engine)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Thuật toán tạo đề thi tự động trích xuất ngẫu nhiên các câu hỏi từ kho Cambridge 19, 18 & British Council với tỷ lệ cân bằng chuẩn quốc tế.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEngineActive(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  Đóng lại
                </button>
              </div>

              {/* Setting 1: Module Track (Academic vs General Training) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-600" />
                  <span>1. Chọn Phân Hệ Kỳ Thi (IELTS Track):</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setEngineConfig({ ...engineConfig, examModule: 'academic', sourceSetId: 'all' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      engineConfig.examModule === 'academic'
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        <span>IELTS Academic (Du Học & Học Thuật)</span>
                      </span>
                      {engineConfig.examModule === 'academic' && <Check className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Bài đọc dài khoa học hàn lâm; thang điểm chuẩn (Band 7.0 = 30-31/40 câu đúng).
                    </div>
                  </button>

                  <button
                    onClick={() => setEngineConfig({ ...engineConfig, examModule: 'general-training', sourceSetId: 'CAM-GT-19' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      engineConfig.examModule === 'general-training'
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-emerald-600" />
                        <span>IELTS General Training (Định Cư & Việc Làm)</span>
                      </span>
                      {engineConfig.examModule === 'general-training' && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Đọc hiểu 3 Section (Đời sống - Công sở - Tạp chí); thang điểm khắt khe (Band 7.0 = 34-35/40 câu đúng).
                    </div>
                  </button>
                </div>

                {engineConfig.examModule === 'general-training' && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Quy chuẩn chấm điểm GT:</strong> Hệ thống Mock Engine sẽ tự động áp dụng bảng quy đổi điểm khắt khe cho Reading General Training (Band 7.0 yêu cầu đạt tối thiểu 74% ~ 34-35/40 câu đúng).
                    </span>
                  </div>
                )}
              </div>

              {/* Setting 2: Skill Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Settings2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>2. Chọn Chế Độ Kỹ Năng Thi:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 'all-skills', label: '4 Kỹ Năng Toàn Diện (Listening, Reading, Writing, Speaking)', badge: 'Khuyên Dùng Chuẩn Thi Thật', count: 16 },
                    { id: 'listening', label: 'Chuyên Sâu Listening (Nghe & Điền Bẫy)', badge: 'Section 1 - 4', count: 12 },
                    { id: 'reading', label: engineConfig.examModule === 'general-training' ? 'Chuyên Sâu GT Reading (3 Section Đời Sống & Công Sở)' : 'Chuyên Sâu Reading Academic (Passage 1 - 3)', badge: engineConfig.examModule === 'general-training' ? 'Section 1-3 GT' : 'Passage 1 - 3', count: 12 },
                    { id: 'writing', label: engineConfig.examModule === 'general-training' ? 'Chuyên Sâu GT Writing (Viết Thư & Xã Hội)' : 'Chuyên Sâu Writing Quiz (Task 1 & Task 2)', badge: 'Ngữ Pháp C1/C2', count: 10 },
                    { id: 'speaking', label: 'Chuyên Sâu Speaking (Part 1 - 3 A.R.E.A)', badge: 'Phản Xạ Nói', count: 8 }
                  ].map(mode => {
                    const isSelected = engineConfig.skillMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setEngineConfig({ ...engineConfig, skillMode: mode.id as any, questionCount: mode.count })}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className={`font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>
                            {mode.badge}
                          </span>
                          <span className="font-mono text-slate-500">{mode.count} câu</span>
                        </div>
                        <div className="text-xs font-semibold text-slate-900 leading-snug">
                          {mode.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Setting 3: Duration */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>3. Chọn Thời Gian Làm Bài Bấm Giờ:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { minutes: 15, label: '15 Phút (Express Mock)', desc: 'Kiểm tra phản xạ nhanh dưới áp lực tốc độ cao' },
                    { minutes: 25, label: '25 Phút (Standard Simulation)', desc: 'Thời lượng chuẩn mô phỏng kỳ thi thực tế' },
                    { minutes: 40, label: '40 Phút (Intensive Challenge)', desc: 'Rèn luyện sức bền tư duy học thuật tối đa' }
                  ].map(item => {
                    const isSelected = engineConfig.durationMinutes === item.minutes;
                    return (
                      <button
                        key={item.minutes}
                        onClick={() => setEngineConfig({ ...engineConfig, durationMinutes: item.minutes as any })}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-1 ring-amber-500'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                          <span>{item.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {item.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Setting 4: Source Pool */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4. Nguồn Ngân Hàng Đề Thi:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {engineConfig.examModule === 'general-training' ? (
                    <>
                      <button
                        onClick={() => setEngineConfig({ ...engineConfig, sourceSetId: 'CAM-GT-19' })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          engineConfig.sourceSetId === 'CAM-GT-19'
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">Cambridge IELTS 19 General Training Test 1</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Đề thi chuẩn định cư & việc làm mới nhất 2024 - 2025.</div>
                      </button>

                      <button
                        onClick={() => setEngineConfig({ ...engineConfig, sourceSetId: 'all' })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          engineConfig.sourceSetId === 'all'
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">Trộn tất cả câu hỏi General Training</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Xáo trộn câu hỏi từ kho đời sống, nội quy công sở và bài báo tổng quát.</div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEngineConfig({ ...engineConfig, sourceSetId: 'all' })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          engineConfig.sourceSetId === 'all'
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">Trộn ngẫu nhiên tất cả bộ đề Academic</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Tổng hợp hơn 40 câu hỏi từ Cambridge 19, 18 và British Council Forecast.</div>
                      </button>

                      <button
                        onClick={() => setEngineConfig({ ...engineConfig, sourceSetId: 'CAM-19' })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          engineConfig.sourceSetId === 'CAM-19'
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">Ưu tiên đề thi Cambridge 19 Academic</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Trích xuất câu hỏi chuẩn bản mới nhất theo Cambridge Assessment.</div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Launch Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Đề thi được xáo trộn ngẫu nhiên. Khi hết giờ, bài thi sẽ tự động khóa và chấm điểm.</span>
                </div>

                <button
                  onClick={handleLaunchMockExam}
                  className="px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Tạo Đề Ngẫu Nhiên & Bắt Đầu Thi</span>
                </button>
              </div>
            </div>
          )}

          {/* PHASE 2: IN-EXAM ACTIVE SIMULATION (IELTS ON COMPUTER) */}
          {enginePhase === 'in-exam' && mockSession && (
            <div className="space-y-4">
              {/* Sticky Top Exam HUD */}
              <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-700">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 font-mono">
                          {mockSession.candidateNumber}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                          {mockSession.sessionId}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          mockSession.config.examModule === 'general-training'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}>
                          {mockSession.config.examModule === 'general-training' ? 'IELTS General Training' : 'IELTS Academic'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Phòng thi máy IELTS on Computer · Câu {currentQuestionIndex + 1}/{mockSession.questions.length}
                      </div>
                    </div>
                  </div>

                  {/* Center: Live Timer with alert */}
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-xl border font-mono text-xl font-black tabular-nums flex items-center gap-2 shadow-2xs ${
                      remainingSeconds < 300
                        ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>{formatTimer(remainingSeconds)}</span>
                    </div>

                    {/* Pause / Resume button */}
                    <button
                      onClick={() => setIsExamPaused(!isExamPaused)}
                      className="p-2 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                      title={isExamPaused ? 'Tiếp tục làm bài' : 'Tạm dừng đồng hồ'}
                    >
                      {isExamPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4 text-amber-600" />}
                    </button>

                    {/* Flag for Review Button */}
                    <button
                      onClick={handleToggleFlagCurrentQuestion}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                        mockSession.flaggedQuestions[currentQuestionIndex]
                          ? 'bg-amber-100 border-amber-300 text-amber-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                      title="Đánh dấu câu hỏi này để xem lại trước khi nộp bài"
                    >
                      <Flag className={`w-3.5 h-3.5 ${mockSession.flaggedQuestions[currentQuestionIndex] ? 'text-amber-700 fill-amber-700' : 'text-slate-400'}`} />
                      <span className="hidden sm:inline">
                        {mockSession.flaggedQuestions[currentQuestionIndex] ? 'Đã Gắn Cờ' : 'Gắn Cờ Xem Lại'}
                      </span>
                    </button>

                    {/* Submit Button */}
                    <button
                      onClick={() => setShowSubmitConfirmModal(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      Nộp Bài Thi
                    </button>
                  </div>
                </div>

                {/* Sub-bar: Font size & Passage controls */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-600">Cỡ chữ văn bản:</span>
                    <button
                      onClick={() => setPassageFontSize('text-xs')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${passageFontSize === 'text-xs' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-100'}`}
                    >
                      Nhỏ
                    </button>
                    <button
                      onClick={() => setPassageFontSize('text-sm')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${passageFontSize === 'text-sm' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-100'}`}
                    >
                      Vừa
                    </button>
                    <button
                      onClick={() => setPassageFontSize('text-base')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${passageFontSize === 'text-base' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-100'}`}
                    >
                      Lớn
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsHighlighterActive(!isHighlighterActive)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer ${
                        isHighlighterActive ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-slate-100'
                      }`}
                    >
                      <Highlighter className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isHighlighterActive ? 'Đang bật Highlight' : 'Bật Highlight'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Pause Overlay Protection */}
              {isExamPaused && (
                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 text-white text-center space-y-4 my-6">
                  <Pause className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
                  <h3 className="text-lg font-bold">Bài thi đang được tạm dừng</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Màn hình bài thi được làm mờ để đảm bảo tính công bằng của kỳ thi IELTS on Computer. Bấm "Tiếp tục" để mở khóa bài làm.
                  </p>
                  <button
                    onClick={() => setIsExamPaused(false)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Tiếp tục làm bài
                  </button>
                </div>
              )}

              {/* Question & Passage Dual Workspace */}
              {!isExamPaused && mockSession.questions[currentQuestionIndex] && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Left Column: Passage / Audio Script Panel */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[480px]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                            {mockSession.questions[currentQuestionIndex].skill === 'listening'
                              ? 'Bản Gỡ Băng Nghe (Audio Transcript)'
                              : 'Văn Bản Đọc Hiểu (Reading Passage / Context)'}
                          </span>
                        </div>

                        {/* Audio trigger if available */}
                        {mockSession.questions[currentQuestionIndex].audioScript && (
                          <button
                            onClick={() => handlePlayAudio(mockSession.questions[currentQuestionIndex].audioScript || '')}
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Phát Audio</span>
                          </button>
                        )}
                      </div>

                      {/* Content text */}
                      <div className={`${passageFontSize} leading-relaxed text-slate-800 font-sans whitespace-pre-line space-y-3`}>
                        {mockSession.questions[currentQuestionIndex].passage || mockSession.questions[currentQuestionIndex].audioScript ? (
                          <div className={`p-4 rounded-xl border leading-relaxed ${
                            isHighlighterActive ? 'bg-amber-50/60 border-amber-200' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <span className={isHighlighterActive ? 'bg-yellow-100 px-1 rounded' : ''}>
                              "{mockSession.questions[currentQuestionIndex].passage || mockSession.questions[currentQuestionIndex].audioScript}"
                            </span>
                          </div>
                        ) : (
                          <div className="p-6 text-center text-slate-400 italic text-xs bg-slate-50 rounded-xl">
                            Câu hỏi trắc nghiệm kỹ năng {(mockSession.questions[currentQuestionIndex].skill || 'Reading').toUpperCase()}. Đọc kỹ câu hỏi bên phải để chọn đáp án chính xác nhất.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span>Kỳ thi chính thức IELTS on Computer</span>
                      <span>Cambridge English Standards</span>
                    </div>
                  </div>

                  {/* Right Column: Active Question & Interactive Options */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[480px]">
                    <div className="space-y-4">
                      {/* Question Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                            Câu hỏi #{currentQuestionIndex + 1}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                            {mockSession.questions[currentQuestionIndex].skill}
                          </span>
                          {mockSession.questions[currentQuestionIndex].bandTarget && (
                            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              {mockSession.questions[currentQuestionIndex].bandTarget}
                            </span>
                          )}
                        </div>

                        {mockSession.flaggedQuestions[currentQuestionIndex] && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <Flag className="w-3 h-3 fill-amber-700" />
                            <span>Đã đánh dấu xem lại</span>
                          </span>
                        )}
                      </div>

                      {/* Question Stem */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {mockSession.questions[currentQuestionIndex].question}
                      </h3>

                      {/* Options */}
                      <div className="space-y-2.5 pt-2">
                        {mockSession.questions[currentQuestionIndex].options.map((opt, oIdx) => {
                          const isChosen = mockSession.userAnswers[currentQuestionIndex] === opt;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectMockOption(opt)}
                              className={`w-full p-3.5 text-left rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                                isChosen
                                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold ring-2 ring-indigo-500 shadow-2xs'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                  isChosen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {isChosen && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step Navigation Bar */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Câu trước</span>
                      </button>

                      <span className="text-xs font-mono text-slate-500">
                        {currentQuestionIndex + 1} / {mockSession.questions.length}
                      </span>

                      <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(mockSession.questions.length - 1, prev + 1))}
                        disabled={currentQuestionIndex === mockSession.questions.length - 1}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Câu kế tiếp</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Question Palette Dock */}
              {!isExamPaused && mockSession && (
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-bold text-slate-800 uppercase tracking-wide">
                      Bảng Điều Hướng Câu Hỏi (Question Navigation Palette):
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" /> Đã trả lời ({Object.keys(mockSession.userAnswers).length})
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block" /> Chưa trả lời ({mockSession.questions.length - Object.keys(mockSession.userAnswers).length})
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Gắn cờ ({Object.values(mockSession.flaggedQuestions).filter(Boolean).length})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {mockSession.questions.map((_, qIdx) => {
                      const isAnswered = !!mockSession.userAnswers[qIdx];
                      const isFlagged = !!mockSession.flaggedQuestions[qIdx];
                      const isCurrent = currentQuestionIndex === qIdx;

                      let btnColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                      if (isAnswered) {
                        btnColor = 'bg-indigo-600 text-white font-bold';
                      }

                      return (
                        <button
                          key={qIdx}
                          onClick={() => setCurrentQuestionIndex(qIdx)}
                          className={`w-9 h-9 rounded-xl text-xs font-mono relative transition-all cursor-pointer ${btnColor} ${
                            isCurrent ? 'ring-2 ring-offset-2 ring-indigo-600 scale-105' : ''
                          }`}
                        >
                          <span>{qIdx + 1}</span>
                          {isFlagged && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border border-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUBMIT CONFIRMATION MODAL */}
          {showSubmitConfirmModal && mockSession && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Xác Nhận Nộp Bài Thi</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Thời gian còn lại: {formatTimer(remainingSeconds)}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1">
                  <div>• Đã hoàn thành: <span className="font-bold text-indigo-700">{Object.keys(mockSession.userAnswers).length} / {mockSession.questions.length} câu</span></div>
                  {mockSession.questions.length - Object.keys(mockSession.userAnswers).length > 0 && (
                    <div className="text-rose-600 font-semibold">
                      • Bạn còn {mockSession.questions.length - Object.keys(mockSession.userAnswers).length} câu chưa có câu trả lời!
                    </div>
                  )}
                  {Object.values(mockSession.flaggedQuestions).filter(Boolean).length > 0 && (
                    <div className="text-amber-700">
                      • Có {Object.values(mockSession.flaggedQuestions).filter(Boolean).length} câu đang được đánh dấu gắn cờ xem lại.
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowSubmitConfirmModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Tiếp tục làm bài
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Xác nhận nộp bài & Xem điểm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PHASE 3: COMPREHENSIVE SCORECARD & DIAGNOSTIC REPORT */}
          {enginePhase === 'result' && mockResult && mockSession && (
            <div className="space-y-6">
              {/* Official Test Report Form (TRF) Certificate Card */}
              <div className="bg-linear-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-indigo-800/80">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest flex-wrap">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>Official IELTS Mock Test Report Form (TRF)</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        mockSession.config.examModule === 'general-training'
                          ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400/50'
                          : 'bg-indigo-500/30 text-indigo-300 border-indigo-400/50'
                      }`}>
                        {mockSession.config.examModule === 'general-training' ? 'Phân hệ: IELTS General Training' : 'Phân hệ: IELTS Academic'}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      Bảng Điểm Đánh Giá Năng Lực Quốc Tế
                    </h2>
                    <div className="text-xs text-indigo-200 flex items-center gap-3 pt-1">
                      <span>Thí sinh: <strong className="text-white">{mockSession.candidateNumber}</strong></span>
                      <span>·</span>
                      <span>Mã ca thi: <strong className="text-white font-mono">{mockSession.sessionId}</strong></span>
                    </div>
                  </div>

                  {/* Overall Band Score Stamp */}
                  <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
                    <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                      Overall IELTS Band
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-amber-400 mt-0.5 tracking-tight">
                      {mockResult.overallBand.toFixed(1)}
                    </div>
                    <div className="text-xs font-bold text-white mt-1 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                      CEFR: {mockResult.cefrLevel}
                    </div>
                  </div>
                </div>

                {/* Sub-score Badges Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {mockResult.skillBreakdowns.map((sk, idx) => (
                    <div key={idx} className="bg-white/5 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
                      <div className="text-[11px] text-indigo-200 uppercase font-medium">{sk.skill}</div>
                      <div className="text-xl font-black text-white mt-0.5">
                        Band {sk.estimatedBand.toFixed(1)}
                      </div>
                      <div className="text-[11px] text-indigo-300 mt-1">
                        {sk.correct}/{sk.total} đúng ({sk.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>

                {mockSession.config.examModule === 'general-training' && (
                  <div className="mt-4 p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Lưu ý khảo thí GT: Điểm số kỹ năng Reading đã được tính toán theo thang điểm quy đổi khắt khe chuẩn IELTS General Training của Cambridge & IDP (Band 7.0 cần 34-35/40 câu đúng).</span>
                  </div>
                )}

                {/* Examiner Assessment Comment */}
                <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Nhận xét tổng quát từ Hội đồng khảo thí:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-sans">
                    "{mockResult.examinerVerdict}"
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Lọc câu hỏi kiểm tra:</span>
                  <div className="flex items-center gap-1 text-xs">
                    <button
                      onClick={() => setReviewFilter('all')}
                      className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
                        reviewFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      Tất cả ({mockSession.questions.length})
                    </button>
                    <button
                      onClick={() => setReviewFilter('incorrect')}
                      className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
                        reviewFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      Câu sai ({mockResult.totalCount - mockResult.correctCount})
                    </button>
                    <button
                      onClick={() => setReviewFilter('flagged')}
                      className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
                        reviewFilter === 'flagged' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      Đã gắn cờ ({Object.values(mockSession.flaggedQuestions).filter(Boolean).length})
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setEnginePhase('config');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Tạo Đề Thi Ngẫu Nhiên Mới</span>
                  </button>

                  <button
                    onClick={() => setIsEngineActive(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Về Trang Ôn Luyện
                  </button>
                </div>
              </div>

              {/* Detailed Question Review List */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs divide-y divide-slate-100 space-y-6">
                <h3 className="text-sm font-bold text-slate-900 pb-2">
                  Phân Tích Chi Tiết Từng Câu Hỏi & Bẫy Đề Thi Cambridge
                </h3>

                {mockSession.questions.map((q, idx) => {
                  const userChoice = mockSession.userAnswers[idx];
                  const isCorrect = userChoice === q.correctAnswer;
                  const isFlagged = mockSession.flaggedQuestions[idx];

                  if (reviewFilter === 'incorrect' && isCorrect) return null;
                  if (reviewFilter === 'flagged' && !isFlagged) return null;

                  return (
                    <div key={idx} className="pt-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-indigo-600">
                            Câu #{idx + 1}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">
                            {q.skill}
                          </span>
                          {isCorrect ? (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Đúng
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Sai
                            </span>
                          )}
                          {isFlagged && (
                            <span className="text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                              <Flag className="w-3 h-3 fill-amber-600" /> Đã gắn cờ
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handlePlayAudio(q.audioScript || q.question)}
                          className="p-1 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-sm font-bold text-slate-900 leading-snug">
                        {q.question}
                      </div>

                      {(q.passage || q.audioScript) && (
                        <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 font-sans leading-relaxed">
                          "{q.passage || q.audioScript}"
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-lg border bg-slate-50 border-slate-200">
                          <div className="text-[10px] text-slate-500 uppercase font-semibold">Lựa chọn của bạn:</div>
                          <div className={`font-bold mt-0.5 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {userChoice || '(Bỏ trống chưa trả lời)'}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg border bg-emerald-50/50 border-emerald-200">
                          <div className="text-[10px] text-emerald-800 uppercase font-semibold">Đáp án chuẩn Cambridge:</div>
                          <div className="font-bold text-emerald-950 mt-0.5">
                            {q.correctAnswer}
                          </div>
                        </div>
                      </div>

                      {/* Trap Analysis */}
                      {q.trapAnalysis && (
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                          <div className="font-bold text-amber-800 flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                            <span>Bẫy đề thi Cambridge (Trap Analysis):</span>
                          </div>
                          <p className="leading-relaxed">{q.trapAnalysis}</p>
                        </div>
                      )}

                      <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                        <span className="font-bold text-slate-800">Giải thích chi tiết: </span>
                        {q.explanationInVietnamese}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STANDARD TABS BROWSING (WHEN NOT IN MOCK ENGINE) */}
      {/* ========================================================================= */}
      {!isEngineActive && (
        <>
          {/* VIEW: VIDEO BÀI GIẢNG AI MASTERCLASS */}
          {activeTab === 'video-lessons' && availableVideoLessons.length > 0 && currentVideo && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-600" />
                    <h2 className="text-sm font-bold text-slate-900">Danh Sách Video Giảng Dạy AI Chuyên Gia</h2>
                  </div>
                  <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    5 Video Chuyên Sâu
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                  {availableVideoLessons.map((vid, idx) => {
                    const isSelected = selectedVideoIndex === idx;
                    return (
                      <button
                        key={vid.id}
                        onClick={() => {
                          setSelectedVideoIndex(idx);
                          setIsVideoPlaying(false);
                          setVideoSlideIndex(0);
                          setActiveSubtitleIndex(0);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-rose-500 bg-rose-50/70 shadow-xs ring-1 ring-rose-500'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-rose-600 uppercase">{vid.skill}</span>
                          <span className="font-mono text-slate-500">{vid.durationLabel}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                          {vid.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                          {vid.instructorName}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Video Player & Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-800 text-white relative">
                    <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-rose-500 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
                          {currentVideo.instructorName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{currentVideo.instructorName}</span>
                            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded font-medium">
                              {currentVideo.badge}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{currentVideo.instructorTitle}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const speeds = [0.8, 1.0, 1.25, 1.5];
                            const nextIndex = (speeds.indexOf(videoPlaybackSpeed) + 1) % speeds.length;
                            setVideoPlaybackSpeed(speeds[nextIndex]);
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 rounded border border-slate-700 cursor-pointer"
                        >
                          {videoPlaybackSpeed}x
                        </button>
                        <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
                          {currentVideo.durationLabel}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 min-h-[340px] flex flex-col justify-between bg-linear-to-b from-slate-900 via-slate-950 to-black relative">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-rose-400" />
                          <span className="font-semibold text-slate-200">
                            Slide {videoSlideIndex + 1}/{currentVideo.slides.length}: {currentVideo.slides[videoSlideIndex]?.title}
                          </span>
                        </div>

                        {isVideoPlaying && (
                          <div className="flex items-center gap-1">
                            <span className="w-1 h-3 bg-rose-500 animate-pulse rounded-full" />
                            <span className="w-1 h-5 bg-indigo-500 animate-pulse delay-75 rounded-full" />
                            <span className="w-1 h-2 bg-emerald-500 animate-pulse delay-150 rounded-full" />
                            <span className="text-[11px] text-rose-400 font-mono ml-1.5">AI Masterclass Đang Giảng</span>
                          </div>
                        )}
                      </div>

                      {currentVideo.slides[videoSlideIndex] && (
                        <div className="my-4 space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                          {currentVideo.slides[videoSlideIndex].subtitle && (
                            <div className="text-xs font-medium text-rose-300">
                              {currentVideo.slides[videoSlideIndex].subtitle}
                            </div>
                          )}
                          
                          <ul className="space-y-2">
                            {currentVideo.slides[videoSlideIndex].bulletPoints.map((bp, bpIdx) => (
                              <li key={bpIdx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                                <span>{bp}</span>
                              </li>
                            ))}
                          </ul>

                          {currentVideo.slides[videoSlideIndex].formula && (
                            <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/60 font-sans font-bold text-xs text-rose-200 text-center tracking-wide">
                              {currentVideo.slides[videoSlideIndex].formula}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Subtitles */}
                      {currentVideo.subtitles.length > 0 && (
                        <div className="p-3.5 bg-black/80 backdrop-blur-md rounded-xl border border-slate-800 space-y-1">
                          <div className="text-xs font-semibold text-rose-300 leading-snug">
                            {currentVideo.subtitles[activeSubtitleIndex]?.en}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-relaxed">
                            {currentVideo.subtitles[activeSubtitleIndex]?.vi}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4">
                        <button
                          onClick={() => {
                            if (!isVideoPlaying && currentVideo.subtitles[activeSubtitleIndex]) {
                              speakText(currentVideo.subtitles[activeSubtitleIndex].en, course.voiceLangCode);
                            }
                            setIsVideoPlaying(!isVideoPlaying);
                          }}
                          className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-md"
                        >
                          {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span>{isVideoPlaying ? 'Tạm dừng clip' : 'Bật giảng bài'}</span>
                        </button>

                        <div className="flex items-center gap-2 text-xs">
                          <button
                            onClick={() => setVideoSlideIndex(prev => Math.max(0, prev - 1))}
                            disabled={videoSlideIndex === 0}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-[11px] font-mono text-slate-400">
                            {videoSlideIndex + 1} / {currentVideo.slides.length}
                          </span>
                          <button
                            onClick={() => setVideoSlideIndex(prev => Math.min(currentVideo.slides.length - 1, prev + 1))}
                            disabled={videoSlideIndex === currentVideo.slides.length - 1}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Chapters & Cheat Sheet */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-slate-100">
                      <Clock className="w-3.5 h-3.5 text-rose-600" />
                      <span>Các Phần Giảng Bài (Video Chapters)</span>
                    </h3>
                    <div className="divide-y divide-slate-100 mt-2">
                      {currentVideo.chapters.map((chap, cIdx) => (
                        <div key={cIdx} className="py-2.5 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-800">{chap.title}</span>
                            <span className="font-mono text-[11px] text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded font-medium">
                              {chap.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{chap.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-slate-100">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Bí Kíp Ăn Điểm (Cheat-Sheet Tóm Tắt)</span>
                    </h3>
                    <div className="space-y-2">
                      {currentVideo.keyTakeaways.map((tip, tIdx) => (
                        <div key={tIdx} className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: WRITING BAND 9.0 MODELS */}
          {activeTab === 'writing-models' && writingPrompts.length > 0 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>
                        {examModuleTrack === 'general-training'
                          ? 'Kho Bài Mẫu IELTS General Writing Band 9.0: Đủ 3 Dạng Thư & Bài Luận Xã Hội'
                          : 'Kho Bài Mẫu Writing Task 1 & Task 2 Đạt Điểm Tuyệt Đối Band 9.0'}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Phân tích cấu trúc PEEL, chiến lược làm bài, từ vựng C1/C2 đắt giá và nhận xét chi tiết của giám khảo chấm thi
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 flex-wrap">
                    {writingPrompts.map((wp, idx) => (
                      <button
                        key={wp.id}
                        onClick={() => setSelectedWritingTaskIndex(idx)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                          selectedWritingTaskIndex === idx
                            ? 'bg-white text-indigo-600 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>{wp.taskType}</span>
                        {wp.letterTone && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                            wp.letterTone === 'Formal' ? 'bg-indigo-100 text-indigo-800' :
                            wp.letterTone === 'Semi-formal' ? 'bg-amber-100 text-amber-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {wp.letterTone}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* GT Letter Tone Filter & Guide */}
                {(examModuleTrack === 'general-training' || rawWritingPrompts.some(p => p.letterTone)) && (
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-slate-700 mr-1">Bộ lọc phong cách (Tone Filter):</span>
                      {[
                        { id: 'all', label: `Tất cả bài mẫu (${rawWritingPrompts.length})` },
                        { id: 'Formal', label: 'Formal (Trang trọng)' },
                        { id: 'Semi-formal', label: 'Semi-formal (Bán trang trọng)' },
                        { id: 'Informal', label: 'Informal (Thân mật)' },
                        { id: 'Task 2', label: 'Task 2 (Nghị luận xã hội)' }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setWritingToneFilter(item.id as any);
                            setSelectedWritingTaskIndex(0);
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                            writingToneFilter === item.id
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 bg-linear-to-r from-indigo-50/70 via-blue-50/50 to-emerald-50/70 rounded-xl border border-indigo-200/80 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        <span>Quy Chuẩn 3 Phong Cách Hành Văn (Tone) Đạt Band 9.0 IELTS General Training Task 1:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-700">
                        <div className="p-2.5 bg-white/85 rounded-lg border border-indigo-100 space-y-1">
                          <div className="font-bold text-indigo-700 flex items-center justify-between">
                            <span>1. Formal (Trang Trọng)</span>
                            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-mono">Official</span>
                          </div>
                          <p>• <strong>Đối tượng:</strong> Người chưa quen biết, cơ quan chức năng, quản lý hãng bay, giám đốc công ty.</p>
                          <p>• <strong>Chào hỏi:</strong> <code className="font-mono text-indigo-900 bg-indigo-50 px-1 rounded">Dear Sir or Madam,</code></p>
                          <p>• <strong>Kết thư:</strong> <code className="font-mono text-indigo-900 bg-indigo-50 px-1 rounded">Yours faithfully,</code> + Họ tên đầy đủ.</p>
                          <p className="text-amber-800">⚠️ Tuyệt đối không viết tắt (dùng <em>do not, cannot, would like</em>).</p>
                        </div>

                        <div className="p-2.5 bg-white/85 rounded-lg border border-amber-100 space-y-1">
                          <div className="font-bold text-amber-800 flex items-center justify-between">
                            <span>2. Semi-formal (Bán Trang Trọng)</span>
                            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-mono">Polite</span>
                          </div>
                          <p>• <strong>Đối tượng:</strong> Chủ nhà trọ, giáo viên, đồng nghiệp, đối tác quen biết trong công việc.</p>
                          <p>• <strong>Chào hỏi:</strong> <code className="font-mono text-amber-900 bg-amber-50 px-1 rounded">Dear Mr./Ms. [Họ],</code></p>
                          <p>• <strong>Kết thư:</strong> <code className="font-mono text-amber-900 bg-amber-50 px-1 rounded">Yours sincerely,</code> + Họ tên đầy đủ.</p>
                          <p className="text-slate-600">Giữ khoảng cách lịch sự, nhã nhặn, tôn trọng nhưng tự nhiên.</p>
                        </div>

                        <div className="p-2.5 bg-white/85 rounded-lg border border-emerald-100 space-y-1">
                          <div className="font-bold text-emerald-800 flex items-center justify-between">
                            <span>3. Informal (Thân Mật)</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded font-mono">Personal</span>
                          </div>
                          <p>• <strong>Đối tượng:</strong> Bạn bè thân thiết, người thân trong gia đình, đồng hương.</p>
                          <p>• <strong>Chào hỏi:</strong> <code className="font-mono text-emerald-900 bg-emerald-50 px-1 rounded">Dear [Tên riêng],</code></p>
                          <p>• <strong>Kết thư:</strong> <code className="font-mono text-emerald-900 bg-emerald-50 px-1 rounded">Warm regards,</code> / <code className="font-mono text-emerald-900 bg-emerald-50 px-1 rounded">Best wishes,</code></p>
                          <p className="text-slate-600">Được dùng từ ngữ sinh động, viết tắt (<em>I'm, we'd</em>) và chia sẻ cảm xúc cá nhân.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">
                        Đề bài chính thức ({activeWriting.taskType})
                      </span>
                      {activeWriting.letterTone && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          activeWriting.letterTone === 'Formal' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                          activeWriting.letterTone === 'Semi-formal' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          Phong cách: {activeWriting.letterTone}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {activeWriting.bandScore}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {activeWriting.prompt}
                  </p>
                  {activeWriting.chartDescription && (
                    <div className="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200/60 mt-2 font-mono">
                      {activeWriting.chartDescription}
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        Bài viết mẫu Band 9.0 (Full Model Text)
                      </h3>
                      <button
                        onClick={() => handlePlayAudio(activeWriting.modelAnswer)}
                        className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe bài đọc</span>
                      </button>
                    </div>

                    <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-800 font-sans whitespace-pre-line space-y-3">
                      {activeWriting.modelAnswer}
                    </div>

                    <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
                      <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-700" />
                        <span>Nhận xét chuẩn giám khảo Cambridge:</span>
                      </div>
                      <p className="text-xs text-emerald-950 leading-relaxed">
                        {activeWriting.examinerComment}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        Dàn ý & Cấu trúc đoạn (PEEL Outline)
                      </h4>
                      <div className="space-y-2.5">
                        {activeWriting.outline.map((item, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                            <div className="font-bold text-indigo-600">{item.point}</div>
                            <div className="text-slate-600 text-[11px] mt-1 leading-relaxed">{item.explanation}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        Từ vựng ăn điểm C1/C2 (Lexical Bank)
                      </h4>
                      <div className="space-y-2">
                        {activeWriting.keyVocabulary.map((v, idx) => (
                          <div key={idx} className="p-2 bg-indigo-50/40 rounded-lg border border-indigo-100 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-indigo-900">{v.word}</span>
                              {v.phonetic && <span className="text-[11px] font-mono text-slate-500">{v.phonetic}</span>}
                            </div>
                            <div className="text-slate-600 text-[11px] mt-0.5">{v.meaning}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SPEAKING CUE CARD SIMULATOR */}
          {activeTab === 'speaking-simulator' && speakingCards.length > 0 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Mic className="w-4 h-4 text-emerald-600" />
                      <span>Phòng Thi Thử IELTS Speaking: Chuẩn 1 Phút Chuẩn Bị + 2 Phút Nói</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Thực hành độc thoại theo Cue Card, rèn luyện cấu trúc A.R.E.A và kho thành ngữ Idiomatic Band 8.5+
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0">
                    {speakingCards.map((sc, idx) => (
                      <button
                        key={sc.id}
                        onClick={() => {
                          setSelectedSpeakingIndex(idx);
                          setIsPrepTimerRunning(false);
                          setPrepTimerSeconds(60);
                          setIsSpeakTimerRunning(false);
                          setSpeakTimerSeconds(120);
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          selectedSpeakingIndex === idx
                            ? 'bg-white text-emerald-700 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Part {sc.part}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-900">1 Phút Chuẩn Bị Ghi Chú (Cue Card Prep)</div>
                      <div className="text-[11px] text-amber-700 mt-0.5">Thời gian suy nghĩ ý tưởng và ghi từ khóa</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl font-extrabold text-amber-950 tabular-nums">
                        {formatTimer(prepTimerSeconds)}
                      </span>
                      <button
                        onClick={() => setIsPrepTimerRunning(!isPrepTimerRunning)}
                        className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer"
                      >
                        {isPrepTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-900">2 Phút Độc Thoại Nói Liên Tục</div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">Duy trì độ lưu loát và ngữ điệu tự nhiên</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl font-extrabold text-emerald-950 tabular-nums">
                        {formatTimer(speakTimerSeconds)}
                      </span>
                      <button
                        onClick={() => setIsSpeakTimerRunning(!isSpeakTimerRunning)}
                        className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
                      >
                        {isSpeakTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-5 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      IELTS Speaking Candidate Task Card ({activeSpeaking.topic})
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {activeSpeaking.bandScore}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-900 font-medium whitespace-pre-line leading-relaxed">
                    {activeSpeaking.cueCardPrompt}
                  </div>
                  {activeSpeaking.bulletPoints && (
                    <div className="pt-2 border-t border-slate-200 space-y-1">
                      <div className="text-xs font-semibold text-slate-700">Gợi ý dàn bài trong 1 phút ghi chú:</div>
                      <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                        {activeSpeaking.bulletPoints.map((bp, idx) => (
                          <li key={idx}>{bp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        Bài Nói Mẫu Band 8.5+ Chuẩn Bản Xứ
                      </h4>
                      <button
                        onClick={() => handlePlayAudio(activeSpeaking.modelAnswer)}
                        className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe phát âm chuẩn</span>
                      </button>
                    </div>

                    <div className="p-5 bg-emerald-50/30 rounded-xl border border-emerald-200 text-xs sm:text-sm leading-relaxed text-slate-800 font-sans whitespace-pre-line">
                      {activeSpeaking.modelAnswer}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activeSpeaking.areaBreakdown && (
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                          Phân Tích Cấu Trúc A.R.E.A
                        </h4>
                        {activeSpeaking.areaBreakdown.map((item, idx) => (
                          <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                            <span className="font-bold text-emerald-800">{item.step}: </span>
                            <span className="text-slate-600">{item.content}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        Cụm Từ Idiomatic Band 8.5+ Nên Vận Dụng
                      </h4>
                      {activeSpeaking.idiomaticExpressions.map((item, idx) => (
                        <div key={idx} className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100 text-xs">
                          <div className="font-bold text-emerald-950">{item.phrase}</div>
                          <div className="text-slate-600 text-[11px] mt-0.5">{item.meaning}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: PRACTICE QUESTIONS (ALL / LISTENING / READING / WRITING / SPEAKING) */}
          {(activeTab === 'all' || activeTab === 'listening' || activeTab === 'reading' || activeTab === 'writing' || activeTab === 'speaking') && (
            <div className={`grid grid-cols-1 ${isSplitView ? 'lg:grid-cols-2 gap-4' : 'lg:grid-cols-3 gap-6'}`}>
              {!isSplitView && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Cấu trúc 4 kỹ năng đề thi</span>
                    </div>
                    <div className="space-y-2 text-xs text-slate-600">
                      {activeExam.formatSections.map((sec, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 leading-relaxed">
                          {sec}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-5 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wide">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Chiến lược đạt Band 8.0+ từ Giám Khảo</span>
                    </div>
                    <div className="space-y-2 text-xs text-amber-950">
                      {activeExam.strategyTips.map((tip, idx) => (
                        <div key={idx} className="p-2.5 bg-white/80 rounded-xl border border-amber-100 leading-relaxed">
                          <span className="font-bold text-amber-800">Mẹo #{idx + 1}: </span>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Split View Left: Passages */}
              {isSplitView && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs h-[780px] overflow-y-auto sticky top-20">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                          Văn Bản Bài Đọc / Bản Băng Nghe (Passage & Transcripts)
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">IELTS on Computer</span>
                    </div>

                    <div className="mt-4 space-y-6 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                      {filteredQuestions.map((q, idx) => (
                        (q.passage || q.audioScript) ? (
                          <div key={idx} className={`p-4 rounded-xl border ${
                            isHighlighterActive ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wide mb-1 flex items-center justify-between">
                              <span>{q.sectionOrPart || `Câu hỏi #${idx + 1}`}</span>
                              <button
                                onClick={() => handlePlayAudio(q.audioScript || q.question)}
                                className="p-1 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className={isHighlighterActive ? 'bg-yellow-100/70 p-1 rounded font-sans' : ''}>
                              "{q.passage || q.audioScript}"
                            </div>
                          </div>
                        ) : null
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Right Side: Questions */}
              <div className={isSplitView ? 'space-y-5' : 'lg:col-span-2 space-y-5'}>
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Câu Hỏi Mô Phỏng & Bẫy Đề Thi Thực Tế ({currentTestSet?.code || 'Cambridge'})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Làm quen với các dạng câu hỏi Cambridge thực tế kèm giải thích phân tích bẫy chi tiết
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                      {filteredQuestions.length} Câu hỏi thực chiến
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 mt-2">
                    {filteredQuestions.map((q, qIdx) => {
                      const userChoice = selectedAnswers[qIdx];
                      const isSubmitted = submittedQuestions[qIdx];
                      const isCorrect = userChoice === q.correctAnswer;

                      return (
                        <div key={q.id || qIdx} className="py-6 space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-indigo-600">
                                  Câu hỏi #{qIdx + 1}
                                </span>
                                {q.sectionOrPart && (
                                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                    {q.sectionOrPart}
                                  </span>
                                )}
                                {q.bandTarget && (
                                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                    {q.bandTarget}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                                {q.question}
                              </h3>
                            </div>

                            <button
                              onClick={() => handlePlayAudio(q.audioScript || q.question)}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                              <Volume2 className="w-4 h-4 text-indigo-600" />
                            </button>
                          </div>

                          {!isSplitView && (q.passage || q.audioScript) && (
                            <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-800 border border-slate-200 leading-relaxed font-sans">
                              <div className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                                {q.audioScript ? <Headphones className="w-3.5 h-3.5 text-indigo-600" /> : <BookOpen className="w-3.5 h-3.5 text-indigo-600" />}
                                <span>{q.audioScript ? 'Audio Transcript (Bản gỡ băng nghe):' : 'Reading Passage Extract (Đoạn trích bài đọc):'}</span>
                              </div>
                              <span className={isHighlighterActive ? 'bg-yellow-100 px-1 rounded' : ''}>
                                "{q.passage || q.audioScript}"
                              </span>
                            </div>
                          )}

                          <div className="space-y-2">
                            {q.options.map((opt, oIdx) => {
                              const isChosen = userChoice === opt;
                              let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                              if (isChosen) {
                                btnStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-600';
                              }

                              if (isSubmitted) {
                                if (opt === q.correctAnswer) {
                                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                                } else if (isChosen && !isCorrect) {
                                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleSelectRegularOption(qIdx, opt)}
                                  className={`w-full p-3 text-left rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isSubmitted && opt === q.correctAnswer && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {!isSubmitted && userChoice && (
                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() => handleSubmitRegularAnswer(qIdx, q.correctAnswer)}
                                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Kiểm tra đáp án & Giải thích
                              </button>
                            </div>
                          )}

                          {isSubmitted && (
                            <div className="space-y-2.5 pt-2">
                              {q.trapAnalysis && (
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                                  <div className="font-bold text-amber-800 flex items-center gap-1.5">
                                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Phân tích bẫy đề thi Cambridge (Trap Analysis):</span>
                                  </div>
                                  <p className="leading-relaxed">{q.trapAnalysis}</p>
                                </div>
                              )}

                              <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                                isCorrect 
                                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                                  : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}>
                                <div className="font-bold mb-1 flex items-center gap-1.5">
                                  {isCorrect ? (
                                    <>
                                      <Check className="w-4 h-4 text-emerald-600" />
                                      <span className="text-emerald-800">Chính xác! (+25 XP)</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="w-4 h-4 text-rose-500" />
                                      <span className="text-rose-700">Chưa đúng. Đáp án đúng: {q.correctAnswer}</span>
                                    </>
                                  )}
                                </div>
                                <p>{q.explanationInVietnamese}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
