import React, { useState, useEffect } from 'react';
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flag,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Trophy,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileText,
  UserCheck,
  Check,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Search,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import {
  officialListening40Questions,
  officialReading40Questions,
  officialWritingTasks,
  officialSpeakingParts
} from '../../data/courses/ieltsOfficialFullExamData';
import { IeltsTestSet } from '../../data/curriculum';
import {
  convertListeningRawToBand,
  convertReadingRawToBand,
  calculateOfficialOverallBand,
  getCefrInfoFromBand
} from '../../utils/ieltsOfficialScoreEngine';
import {
  buildFullSimulatorPaperFromTestSet,
  evaluateWritingBy4Criteria,
  computeSectionDiagnostics
} from '../../utils/ieltsMasteryEngine';
import { speakText } from '../../utils/speech';
import { IeltsLiveExaminer } from './IeltsLiveExaminer';
import { WritingChartViewer } from '../exam/WritingChartViewer';

interface OfficialRealExamSimulatorProps {
  onClose: () => void;
  onGainXp: (amount: number) => void;
  onExamCompleted?: () => void;
  initialTestSet?: IeltsTestSet;
  availableTestSets?: IeltsTestSet[];
}

type ActiveSection = 'listening' | 'reading' | 'writing' | 'speaking';

export const OfficialRealExamSimulator: React.FC<OfficialRealExamSimulatorProps> = ({
  onClose,
  onGainXp,
  onExamCompleted,
  initialTestSet,
  availableTestSets = []
}) => {
  // Active Paper Selection (allows switching between Official 80Q Master & specific Cambridge/IDP sets)
  const [selectedPaperCode, setSelectedPaperCode] = useState<string>(
    initialTestSet?.code || 'OFFICIAL-80Q'
  );

  const selectedTestSetObj = availableTestSets.find(ts => ts.code === selectedPaperCode) || (
    selectedPaperCode === initialTestSet?.code ? initialTestSet : undefined
  );

  const activePaper = React.useMemo(
    () => buildFullSimulatorPaperFromTestSet(selectedTestSetObj),
    [selectedTestSetObj]
  );

  const activeListeningQuestions = activePaper.listening40;
  const activeReadingQuestions = activePaper.reading40;
  const activeWritingTasks = activePaper.writingTasks;
  const activeSpeakingParts = activePaper.speakingParts;

  // Navigation & Skill Section
  const [activeSection, setActiveSection] = useState<ActiveSection>('listening');

  // Question Indices (0-indexed for 40 questions)
  const [listeningQuestionIndex, setListeningQuestionIndex] = useState(0);
  const [readingQuestionIndex, setReadingQuestionIndex] = useState(0);

  // User Answers
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
  const [listeningFlags, setListeningFlags] = useState<Record<number, boolean>>({});
  const [readingFlags, setReadingFlags] = useState<Record<number, boolean>>({});

  // Writing Submissions
  const [writingTask1Answer, setWritingTask1Answer] = useState<string>('');
  const [writingTask2Answer, setWritingTask2Answer] = useState<string>('');
  const [activeWritingTab, setActiveWritingTab] = useState<'task1' | 'task2'>('task1');

  // Speaking state
  const [speakingActivePart, setSpeakingActivePart] = useState<1 | 2 | 3>(1);

  // Timer State (Default: Official Simulated 165 minutes = 9900 seconds)
  const [remainingSeconds, setRemainingSeconds] = useState(165 * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Audio Playback
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [showAudioTranscript, setShowAudioTranscript] = useState(false);

  // Text Sizing
  const [textSize, setTextSize] = useState<'text-xs' | 'text-sm' | 'text-base'>('text-sm');

  // Scratchpad
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');

  // Results State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reviewTab, setReviewTab] = useState<'listening' | 'reading' | 'writing' | 'speaking'>('listening');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');

  // Candidate Metadata
  const [candidateNumber] = useState(() => `VN101-${Math.floor(100000 + Math.random() * 900000)}`);

  // Count words helper
  const countWords = (text: string): number => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const task1WordCount = countWords(writingTask1Answer);
  const task2WordCount = countWords(writingTask2Answer);

  // Handle paper switch cleanly
  const handleSelectPaper = (code: string) => {
    setSelectedPaperCode(code);
    setListeningQuestionIndex(0);
    setReadingQuestionIndex(0);
    setListeningAnswers({});
    setReadingAnswers({});
    setListeningFlags({});
    setReadingFlags({});
    setIsSubmitted(false);
  };

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isSubmitted && !isTimerPaused && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
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
  }, [isSubmitted, isTimerPaused, remainingSeconds]);

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Answer handler
  const handleSelectAnswer = (skill: 'listening' | 'reading', index: number, value: string) => {
    if (isSubmitted) return;
    if (skill === 'listening') {
      setListeningAnswers(prev => ({ ...prev, [index]: value }));
    } else {
      setReadingAnswers(prev => ({ ...prev, [index]: value }));
    }
  };

  // Flag toggle handler
  const handleToggleFlag = (skill: 'listening' | 'reading', index: number) => {
    if (skill === 'listening') {
      setListeningFlags(prev => ({ ...prev, [index]: !prev[index] }));
    } else {
      setReadingFlags(prev => ({ ...prev, [index]: !prev[index] }));
    }
  };

  // Play current listening audio
  const handlePlayCurrentAudio = () => {
    const q = activeListeningQuestions[listeningQuestionIndex];
    if (q && q.audioScript) {
      setIsPlayingAudio(true);
      speakText(q.audioScript, 'en-GB');
      setTimeout(() => setIsPlayingAudio(false), 8000);
    }
  };

  // Submit and evaluate
  const handleFinalSubmit = () => {
    setShowSubmitModal(false);
    setIsSubmitted(true);
    onGainXp(150);
    if (onExamCompleted) {
      onExamCompleted();
    }
  };

  // Calculate scores
  let listeningRawCorrect = 0;
  activeListeningQuestions.forEach((q, idx) => {
    if (listeningAnswers[idx] === q.correctAnswer) {
      listeningRawCorrect++;
    }
  });

  let readingRawCorrect = 0;
  activeReadingQuestions.forEach((q, idx) => {
    if (readingAnswers[idx] === q.correctAnswer) {
      readingRawCorrect++;
    }
  });

  const listeningBand = convertListeningRawToBand(listeningRawCorrect);
  const readingBand = convertReadingRawToBand(readingRawCorrect);

  // 4-Criteria Analytic Evaluation for Task 1 & Task 2
  const task1Evaluation = React.useMemo(
    () => evaluateWritingBy4Criteria(writingTask1Answer, 'Task 1'),
    [writingTask1Answer]
  );
  const task2Evaluation = React.useMemo(
    () => evaluateWritingBy4Criteria(writingTask2Answer, 'Task 2'),
    [writingTask2Answer]
  );

  // Official IELTS Writing weighting: Task 2 counts twice as much as Task 1
  const writingBand = React.useMemo(() => {
    if (task1WordCount === 0 && task2WordCount === 0) return 6.0;
    const weighted = (task1Evaluation.overallWritingBand + task2Evaluation.overallWritingBand * 2) / 3;
    return Math.round(weighted * 2) / 2;
  }, [task1WordCount, task2WordCount, task1Evaluation.overallWritingBand, task2Evaluation.overallWritingBand]);

  // Section-by-section diagnostics
  const sectionDiagnostics = React.useMemo(
    () =>
      computeSectionDiagnostics(
        listeningAnswers,
        activeListeningQuestions,
        readingAnswers,
        activeReadingQuestions
      ),
    [listeningAnswers, activeListeningQuestions, readingAnswers, activeReadingQuestions]
  );

  // Speaking simulated band default
  const speakingBand = 7.5;

  const overallBand = calculateOfficialOverallBand(
    listeningBand,
    readingBand,
    writingBand,
    speakingBand
  );
  const cefrInfo = getCefrInfoFromBand(overallBand);

  // Active question references
  const currentListeningQuestion = activeListeningQuestions[listeningQuestionIndex] || activeListeningQuestions[0];
  const currentReadingQuestion = activeReadingQuestions[readingQuestionIndex] || activeReadingQuestions[0];

  // Section Progress counters
  const listeningAnsweredCount = Object.keys(listeningAnswers).length;
  const readingAnsweredCount = Object.keys(readingAnswers).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col justify-between overflow-hidden">
      {/* 1. OFFICIAL CD-IELTS TOP HEADER BAR */}
      <header className="bg-slate-900 border-b border-slate-700 text-white px-4 py-2.5 flex items-center justify-between shrink-0 shadow-md flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-red-600 text-white font-black px-2.5 py-1 rounded text-xs tracking-wider uppercase">
            <span>IELTS</span>
            <span className="text-[10px] bg-red-800 px-1 py-0.2 rounded font-sans">OFFICIAL</span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center gap-2 flex-wrap">
              <span>{activePaper.paperTitle}</span>
              <span className="hidden sm:inline text-[11px] text-amber-400 font-mono">
                [{activePaper.paperCode} · 40 L + 40 R = 80 CÂU · 2 WRITING · 3 SPEAKING]
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-3 flex-wrap">
              <span>Candidate: <strong className="text-slate-200">NGUYEN VAN AN</strong></span>
              <span>·</span>
              <span className="font-mono text-slate-300">ID: {candidateNumber}</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline text-slate-400">Center: VN101 British Council / IDP</span>
            </div>
          </div>
        </div>

        {/* Center Timer, Paper Switcher & Tools */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Paper Switcher Dropdown */}
          {!isSubmitted && availableTestSets.length > 0 && (
            <div className="hidden xl:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-xs">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Mã Đề:</span>
              <select
                value={selectedPaperCode}
                onChange={(e) => handleSelectPaper(e.target.value)}
                data-testid="simulator-paper-select"
                className="bg-transparent text-white font-bold text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="OFFICIAL-80Q" className="bg-slate-900 text-white">
                  OFFICIAL-80Q · Full Master Exam (80 Câu)
                </option>
                {availableTestSets.map((ts) => (
                  <option key={ts.id} value={ts.code} className="bg-slate-900 text-white">
                    {ts.code} · {ts.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums">
            <Clock className={`w-4 h-4 ${remainingSeconds < 600 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
            <span className="text-slate-400">Thời gian còn lại:</span>
            <span className={`font-bold text-sm tabular-nums ${remainingSeconds < 600 ? 'text-red-400' : 'text-white'}`}>
              {formatTimer(remainingSeconds)}
            </span>
            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              title={isTimerPaused ? 'Tiếp tục tính giờ' : 'Tạm dừng đồng hồ'}
              className="text-slate-400 hover:text-white ml-1 cursor-pointer"
            >
              {isTimerPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Text Size Control */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800 border border-slate-700 p-1 rounded-lg text-xs">
            <button
              onClick={() => setTextSize('text-xs')}
              className={`px-2 py-0.5 rounded text-[11px] ${textSize === 'text-xs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              A-
            </button>
            <button
              onClick={() => setTextSize('text-sm')}
              className={`px-2 py-0.5 rounded text-[11px] ${textSize === 'text-sm' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              A
            </button>
            <button
              onClick={() => setTextSize('text-base')}
              className={`px-2 py-0.5 rounded text-[11px] ${textSize === 'text-base' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              A+
            </button>
          </div>

          {/* Scratchpad Toggle */}
          <button
            onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
              isScratchpadOpen
                ? 'bg-amber-500 text-slate-900 border-amber-400 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nháp thí sinh</span>
          </button>

          {/* Submit / Finish Button */}
          {!isSubmitted ? (
            <button
              onClick={() => setShowSubmitModal(true)}
              data-testid="simulator-submit-btn"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Nộp Bài Thi</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
            >
              Thoát Phòng Thi
            </button>
          )}
        </div>
      </header>

      {/* 2. FOUR SKILL NAVIGATION TABS */}
      <nav className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between shrink-0 overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          {/* Listening Tab */}
          <button
            onClick={() => setActiveSection('listening')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'listening'
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-blue-300" />
            <span>1. LISTENING</span>
            <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-200">
              {listeningAnsweredCount}/40 câu
            </span>
          </button>

          {/* Reading Tab */}
          <button
            onClick={() => setActiveSection('reading')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'reading'
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>2. READING</span>
            <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-200">
              {readingAnsweredCount}/40 câu
            </span>
          </button>

          {/* Writing Tab */}
          <button
            onClick={() => setActiveSection('writing')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'writing'
                ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-purple-300" />
            <span>3. WRITING</span>
            <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-200">
              2 Tasks (T1: {task1WordCount}w · T2: {task2WordCount}w)
            </span>
          </button>

          {/* Speaking Tab */}
          <button
            onClick={() => setActiveSection('speaking')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'speaking'
                ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-amber-300" />
            <span>4. SPEAKING (Live Examiner)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-900/60 text-amber-200">
              3 Parts phỏng vấn trực tiếp
            </span>
          </button>
        </div>

        {/* Total Exam Metrics Pill */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 font-mono tabular-nums">
          <span className="text-slate-300 font-bold">Tổng trắc nghiệm:</span>
          <span className="text-emerald-400 font-bold">
            {listeningAnsweredCount + readingAnsweredCount} / 80 câu đã điền
          </span>
        </div>
      </nav>

      {/* 3. MAIN WORKSPACE AREA */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-4">
        <div className="max-w-7xl mx-auto h-full">
          {/* VIEW WHEN SUBMITTED: OFFICIAL TEST REPORT FORM (TRF) */}
          {isSubmitted ? (
            <div className="space-y-6 max-w-5xl mx-auto py-4">
              {/* Cambridge Test Report Form Header */}
              <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden text-slate-900">
                <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-white text-red-600 font-black px-2.5 py-0.5 rounded text-sm tracking-wider">
                        IELTS
                      </span>
                      <span className="text-xs uppercase tracking-widest text-red-200 font-semibold">
                        Official Test Report Form (Bảng Điểm Chuẩn Quốc Tế · {activePaper.paperCode})
                      </span>
                    </div>
                    <h2 className="text-2xl font-black mt-2 tracking-tight">
                      KẾT QUẢ THI THỬ TOÀN DIỆN 4 KỸ NĂNG ({activePaper.paperTitle.toUpperCase()})
                    </h2>
                    <p className="text-xs text-red-100 mt-1">
                      Thí sinh: <strong>NGUYEN VAN AN</strong> · Số báo danh: <strong>{candidateNumber}</strong> · Trung tâm khảo thí: <strong>VN101</strong>
                    </p>
                  </div>

                  {/* Big Overall Band Display */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center min-w-[170px] shrink-0">
                    <span className="text-[11px] text-red-200 font-bold uppercase tracking-wider block">
                      Overall Band Score
                    </span>
                    <div className="text-5xl font-black text-amber-300 my-1 font-mono tabular-nums">
                      {overallBand.toFixed(1)}
                    </div>
                    <span className="text-xs font-bold bg-white text-slate-900 px-2 py-0.5 rounded-full inline-block">
                      CEFR {cefrInfo.level}
                    </span>
                  </div>
                </div>

                {/* Sub-Bands Breakdown Table */}
                <div className="p-6 bg-slate-50 border-b border-slate-200 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Listening */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                        <span className="flex items-center gap-1 text-blue-600">
                          <Headphones className="w-3.5 h-3.5" /> Listening
                        </span>
                        <span className="font-mono tabular-nums text-slate-700">{listeningRawCorrect}/40 câu</span>
                      </div>
                      <div className="text-3xl font-extrabold text-blue-700 font-mono tabular-nums">
                        Band {listeningBand.toFixed(1)}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Đúng {Math.round((listeningRawCorrect / 40) * 100)}% tổng số 40 câu
                      </p>
                    </div>

                    {/* Reading */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <BookOpen className="w-3.5 h-3.5" /> Reading
                        </span>
                        <span className="font-mono tabular-nums text-slate-700">{readingRawCorrect}/40 câu</span>
                      </div>
                      <div className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
                        Band {readingBand.toFixed(1)}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Đúng {Math.round((readingRawCorrect / 40) * 100)}% tổng số 40 câu
                      </p>
                    </div>

                    {/* Writing */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                        <span className="flex items-center gap-1 text-purple-600">
                          <PenTool className="w-3.5 h-3.5" /> Writing
                        </span>
                        <span className="font-mono tabular-nums text-slate-700">T1: {task1WordCount}w · T2: {task2WordCount}w</span>
                      </div>
                      <div className="text-3xl font-extrabold text-purple-700 font-mono tabular-nums">
                        Band {writingBand.toFixed(1)}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Chấm theo 4 tiêu chí TA/TR · CC · LR · GRA
                      </p>
                    </div>

                    {/* Speaking */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                        <span className="flex items-center gap-1 text-amber-600">
                          <Mic className="w-3.5 h-3.5" /> Speaking
                        </span>
                        <span className="font-mono text-slate-700">Live Examiner</span>
                      </div>
                      <div className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums">
                        Band {speakingBand.toFixed(1)}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Phỏng vấn trực tiếp 3 Part cùng giám khảo
                      </p>
                    </div>
                  </div>

                  {/* Section-by-Section Accuracy Diagnostics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                        <span>Chẩn Đoán Độ Chính Xác Từng Section Listening:</span>
                        <span className="text-[10px] font-mono text-blue-600">Section 1 → 4</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {sectionDiagnostics.listeningSections.map((sec, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                            <div className="text-[10px] font-bold text-slate-500">{sec.sectionLabel.split(' ')[0]} {idx + 1}</div>
                            <div className="text-sm font-black text-blue-700 font-mono tabular-nums">
                              {sec.correct}/{sec.total}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono tabular-nums">{sec.accuracyPercent}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                        <span>Chẩn Đoán Độ Chính Xác Từng Passage Reading:</span>
                        <span className="text-[10px] font-mono text-emerald-600">Passage 1 → 3</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {sectionDiagnostics.readingPassages.map((pas, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                            <div className="text-[10px] font-bold text-slate-500">Passage {idx + 1}</div>
                            <div className="text-sm font-black text-emerald-700 font-mono tabular-nums">
                              {pas.correct}/{pas.total}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono tabular-nums">{pas.accuracyPercent}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Writing 4-Criteria Analytic Breakdown in TRF */}
                  {(task1WordCount > 0 || task2WordCount > 0) && (() => {
                    const activeEval = task2WordCount > 0 ? task2Evaluation : task1Evaluation;
                    const criteriaItems = [
                      { code: 'TA/TR', name: 'Đáp ứng đề', band: activeEval.taskAchievementBand },
                      { code: 'CC', name: 'Mạch lạc & Liên kết', band: activeEval.coherenceCohesionBand },
                      { code: 'LR', name: 'Vốn từ vựng', band: activeEval.lexicalResourceBand },
                      { code: 'GRA', name: 'Đa dạng Ngữ pháp', band: activeEval.grammaticalRangeBand },
                    ];
                    return (
                      <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-200">
                        <div className="text-xs font-bold text-purple-950 mb-2 flex items-center justify-between">
                          <span>Bảng Điểm Phân Tích 4 Tiêu Chí Writing (Task 2 Trọng Số x2):</span>
                          <span className="font-mono text-purple-800">Overall Writing Band {writingBand.toFixed(1)}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {criteriaItems.map((c) => (
                            <div key={c.code} className="bg-white p-2.5 rounded-lg border border-purple-200">
                              <div className="flex items-center justify-between text-[11px] font-bold text-purple-900">
                                <span>{c.code} · {c.name}</span>
                                <span className="font-mono font-black text-purple-700">Band {c.band.toFixed(1)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Cambridge Examiner Remarks */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                    <div className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Nhận Xét Chuyên Môn Của Hội Đồng Giám Khảo (Examiner's Formal Assessment):</span>
                    </div>
                    <p className="leading-relaxed">
                      {cefrInfo.descriptor}. {sectionDiagnostics.readingPassages[2]?.advice || 'Thí sinh hoàn thành đầy đủ cấu trúc 4 kỹ năng chuẩn quốc tế.'}
                    </p>
                  </div>
                </div>

                {/* Review Tabs */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Search className="w-4 h-4 text-indigo-600" />
                      <span>Xem Lại Đáp Án Chi Tiết (80 Câu & Bài Mẫu):</span>
                    </h3>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                      <button
                        onClick={() => setReviewTab('listening')}
                        className={`px-3 py-1 rounded-md transition-colors ${
                          reviewTab === 'listening' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Listening ({listeningRawCorrect}/40)
                      </button>
                      <button
                        onClick={() => setReviewTab('reading')}
                        className={`px-3 py-1 rounded-md transition-colors ${
                          reviewTab === 'reading' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Reading ({readingRawCorrect}/40)
                      </button>
                      <button
                        onClick={() => setReviewTab('writing')}
                        className={`px-3 py-1 rounded-md transition-colors ${
                          reviewTab === 'writing' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Writing (2 Bài Mẫu)
                      </button>
                      <button
                        onClick={() => setReviewTab('speaking')}
                        className={`px-3 py-1 rounded-md transition-colors ${
                          reviewTab === 'speaking' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Speaking (3 Part Mẫu)
                      </button>
                    </div>
                  </div>

                  {/* Review Questions Content */}
                  {reviewTab === 'listening' && (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {activeListeningQuestions.map((q, idx) => {
                        const userAns = listeningAnswers[idx];
                        const isCorrect = userAns === q.correctAnswer;
                        return (
                          <div
                            key={q.id || idx}
                            className={`p-4 rounded-xl border text-xs ${
                              isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/50 border-red-200'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold mb-1">
                              <span className={isCorrect ? 'text-emerald-800' : 'text-red-800'}>
                                {q.sectionOrPart} · Câu {idx + 1}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                              }`}>
                                {isCorrect ? 'ĐÚNG' : 'CHƯA ĐÚNG'}
                              </span>
                            </div>
                            <p className="font-semibold text-slate-900 mb-2">{q.question}</p>
                            {q.audioScript && (
                              <div className="p-2.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] mb-2 leading-relaxed">
                                <strong>Băng Audio:</strong> {q.audioScript}
                              </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              <div>
                                <span className="text-slate-500">Bạn đã chọn: </span>
                                <strong className={isCorrect ? 'text-emerald-700' : 'text-red-700'}>
                                  {userAns || '(Chưa điền)'}
                                </strong>
                              </div>
                              <div>
                                <span className="text-slate-500">Đáp án chuẩn: </span>
                                <strong className="text-emerald-700">{q.correctAnswer}</strong>
                              </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                              <p className="mb-1"><strong>Giải thích:</strong> {q.explanationInVietnamese}</p>
                              {q.trapAnalysis && (
                                <p className="text-amber-800"><strong>Phân tích bẫy:</strong> {q.trapAnalysis}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {reviewTab === 'reading' && (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {activeReadingQuestions.map((q, idx) => {
                        const userAns = readingAnswers[idx];
                        const isCorrect = userAns === q.correctAnswer;
                        return (
                          <div
                            key={q.id || idx}
                            className={`p-4 rounded-xl border text-xs ${
                              isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/50 border-red-200'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold mb-1">
                              <span className={isCorrect ? 'text-emerald-800' : 'text-red-800'}>
                                {q.sectionOrPart} · Câu {idx + 1}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                              }`}>
                                {isCorrect ? 'ĐÚNG' : 'CHƯA ĐÚNG'}
                              </span>
                            </div>
                            <p className="font-semibold text-slate-900 mb-2">{q.question}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              <div>
                                <span className="text-slate-500">Bạn đã chọn: </span>
                                <strong className={isCorrect ? 'text-emerald-700' : 'text-red-700'}>
                                  {userAns || '(Chưa điền)'}
                                </strong>
                              </div>
                              <div>
                                <span className="text-slate-500">Đáp án chuẩn: </span>
                                <strong className="text-emerald-700">{q.correctAnswer}</strong>
                              </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                              <p className="mb-1"><strong>Giải thích:</strong> {q.explanationInVietnamese}</p>
                              {q.trapAnalysis && (
                                <p className="text-amber-800"><strong>Phân tích bẫy:</strong> {q.trapAnalysis}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {reviewTab === 'writing' && (
                    <div className="space-y-6">
                      {activeWritingTasks.map((task) => (
                        <div key={task.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                          <div className="flex items-center justify-between font-bold text-slate-800 mb-2">
                            <span className="text-purple-700 text-sm font-extrabold">{task.title}</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                              Bài mẫu {task.bandScore}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-3 italic">{task.prompt}</p>
                          {task.taskType === 'Task 1' && (
                            <WritingChartViewer prompt={task} className="mb-4" />
                          )}
                          <div className="p-4 rounded-lg bg-white border border-slate-200 text-slate-800 font-serif leading-relaxed whitespace-pre-line mb-3">
                            {task.modelAnswer}
                          </div>
                          <div className="p-3 bg-purple-50 rounded border border-purple-200 text-purple-900">
                            <strong>Nhận xét giám khảo:</strong> {task.examinerComment}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {reviewTab === 'speaking' && (
                    <div className="space-y-6">
                      {activeSpeakingParts.map((sp) => (
                        <div key={sp.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                          <div className="flex items-center justify-between font-bold text-slate-800 mb-2">
                            <span className="text-amber-700 text-sm font-extrabold">{sp.topic}</span>
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                              Mẫu {sp.bandScore}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-3 whitespace-pre-line">{sp.cueCardPrompt}</p>
                          <div className="p-4 rounded-lg bg-white border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-line mb-3">
                            {sp.modelAnswer}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {sp.idiomaticExpressions.map((expr, i) => (
                              <span key={i} className="bg-amber-50 border border-amber-200 text-amber-900 px-2 py-1 rounded text-[11px]">
                                <strong>{expr.phrase}:</strong> {expr.meaning}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs cursor-pointer shadow-sm"
                  >
                    Đóng và Quay Lại Khóa Học
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW IN-EXAM */
            <div className="h-full flex flex-col gap-4">
              {/* 3A. LISTENING SECTION (40 QUESTIONS) */}
              {activeSection === 'listening' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
                  {/* Left Column: Audio & Question Detail (8 cols) */}
                  <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
                    <div>
                      {/* Section Quick Jump Strip */}
                      <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-slate-800 overflow-x-auto">
                        {[
                          { label: 'Section 1 (1–10)', start: 0, end: 9 },
                          { label: 'Section 2 (11–20)', start: 10, end: 19 },
                          { label: 'Section 3 (21–30)', start: 20, end: 29 },
                          { label: 'Section 4 (31–40)', start: 30, end: 39 },
                        ].map((sec, sIdx) => {
                          const isInSec = listeningQuestionIndex >= sec.start && listeningQuestionIndex <= sec.end;
                          return (
                            <button
                              key={sIdx}
                              onClick={() => setListeningQuestionIndex(sec.start)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                                isInSec
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                              }`}
                            >
                              {sec.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Section indicator & Audio Bar */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 flex-wrap gap-2">
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
                            {currentListeningQuestion.sectionOrPart}
                          </span>
                          <h3 className="text-base font-bold text-white mt-0.5 tabular-nums">
                            Câu hỏi {listeningQuestionIndex + 1} / 40
                          </h3>
                        </div>

                        {/* Flag, Speed & Audio buttons */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-0.5 bg-slate-800 border border-slate-700 p-0.5 rounded-lg text-[10px] font-mono">
                            {[0.85, 1.0, 1.15].map((spd) => (
                              <button
                                key={spd}
                                onClick={() => setAudioSpeed(spd)}
                                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                                  audioSpeed === spd ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                {spd}x
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => handleToggleFlag('listening', listeningQuestionIndex)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                              listeningFlags[listeningQuestionIndex]
                                ? 'bg-amber-500 text-slate-950 border-amber-400'
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                            }`}
                          >
                            <Flag className="w-3.5 h-3.5" />
                            <span>{listeningFlags[listeningQuestionIndex] ? 'Đã ghim cờ' : 'Đánh dấu cờ'}</span>
                          </button>

                          <button
                            onClick={handlePlayCurrentAudio}
                            disabled={isPlayingAudio}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-sm ${
                              isPlayingAudio
                                ? 'bg-blue-500 animate-pulse'
                                : 'bg-blue-600 hover:bg-blue-500'
                            }`}
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>{isPlayingAudio ? 'Đang phát...' : `Phát Băng Nghe (${audioSpeed}x)`}</span>
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div className="mb-5">
                        <p className={`font-semibold text-slate-100 leading-relaxed ${textSize}`}>
                          {currentListeningQuestion.question}
                        </p>
                      </div>

                      {/* Options Grid */}
                      <div className="space-y-2.5">
                        {currentListeningQuestion.options.map((option, optIdx) => {
                          const isSelected = listeningAnswers[listeningQuestionIndex] === option;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer('listening', listeningQuestionIndex, option)}
                              className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                                isSelected
                                  ? 'bg-blue-900/40 border-blue-500 text-white shadow-xs ring-1 ring-blue-400'
                                  : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] font-mono shrink-0 ${
                                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{option}</span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Collapsible Audio Script toggle */}
                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                        <button
                          onClick={() => setShowAudioTranscript(!showAudioTranscript)}
                          className="text-[11px] text-slate-400 hover:text-blue-400 flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{showAudioTranscript ? 'Ẩn lời thoại băng nghe' : 'Xem lời thoại băng nghe (Audio Script)'}</span>
                        </button>
                      </div>

                      {showAudioTranscript && currentListeningQuestion.audioScript && (
                        <div className="mt-2 p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono text-slate-300 leading-relaxed">
                          {currentListeningQuestion.audioScript}
                        </div>
                      )}
                    </div>

                    {/* Bottom Question Prev / Next */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-6">
                      <button
                        onClick={() => setListeningQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={listeningQuestionIndex === 0}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Câu trước</span>
                      </button>

                      <span className="text-xs text-slate-400 font-mono tabular-nums">
                        Câu {listeningQuestionIndex + 1} / 40
                      </span>

                      <button
                        onClick={() => setListeningQuestionIndex(prev => Math.min(39, prev + 1))}
                        disabled={listeningQuestionIndex === 39}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span>Câu tiếp theo</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: 1-40 Question Palette (4 cols) */}
                  <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-blue-400" />
                          <span>Bảng 40 Câu Listening:</span>
                        </span>
                        <span className="text-[11px] font-mono tabular-nums text-blue-300">
                          {listeningAnsweredCount}/40
                        </span>
                      </div>

                      {/* 1 - 40 PALETTE GRID */}
                      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto p-1">
                        {activeListeningQuestions.map((_, idx) => {
                          const isAnswered = listeningAnswers[idx] !== undefined;
                          const isFlagged = listeningFlags[idx];
                          const isCurrent = listeningQuestionIndex === idx;

                          let btnClasses = 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700';
                          if (isCurrent) {
                            btnClasses = 'border-2 border-white bg-blue-600 text-white ring-2 ring-blue-400 font-extrabold';
                          } else if (isFlagged) {
                            btnClasses = 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold';
                          } else if (isAnswered) {
                            btnClasses = 'border-blue-500/70 bg-blue-900/50 text-blue-200 font-semibold';
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => setListeningQuestionIndex(idx)}
                              className={`h-8 rounded-lg text-xs font-mono tabular-nums transition-all flex items-center justify-center relative cursor-pointer ${btnClasses}`}
                            >
                              <span>{idx + 1}</span>
                              {isFlagged && (
                                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-3 gap-1 text-[10px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-blue-600 border border-blue-400 inline-block" />
                          <span>Đã làm</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700 inline-block" />
                          <span>Chưa làm</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-amber-500 border border-amber-400 inline-block" />
                          <span>Ghim cờ</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => setActiveSection('reading')}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span>Chuyển sang Reading (40 câu)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3B. READING SECTION (40 QUESTIONS WITH PASSAGE SPLIT VIEW) */}
              {activeSection === 'reading' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
                  {/* Left Column: Academic Reading Passage (6 cols) */}
                  <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl overflow-hidden">
                    <div className="overflow-y-auto pr-2 max-h-[580px]">
                      {/* Passage Quick Jump Strip */}
                      <div className="flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-slate-800 overflow-x-auto">
                        {[
                          { label: 'Passage 1 (1–13)', start: 0, end: 12 },
                          { label: 'Passage 2 (14–26)', start: 13, end: 25 },
                          { label: 'Passage 3 (27–40)', start: 26, end: 39 },
                        ].map((pas, pIdx) => {
                          const isInPas = readingQuestionIndex >= pas.start && readingQuestionIndex <= pas.end;
                          return (
                            <button
                              key={pIdx}
                              onClick={() => setReadingQuestionIndex(pas.start)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                                isInPas
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                              }`}
                            >
                              {pas.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                          {currentReadingQuestion.sectionOrPart}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {activePaper.paperModule === 'general-training' ? 'Văn Bản General Training' : 'Bài Đọc Hàn Lâm'}
                        </span>
                      </div>

                      <div className={`text-slate-200 leading-relaxed font-serif whitespace-pre-line ${textSize}`}>
                        {currentReadingQuestion.passage}
                      </div>
                    </div>
                  </div>

                  {/* Center Column: Question Detail & Options (4 cols) */}
                  <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <h4 className="text-sm font-bold text-white tabular-nums">
                          Câu {readingQuestionIndex + 1} / 40
                        </h4>
                        <button
                          onClick={() => handleToggleFlag('reading', readingQuestionIndex)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border cursor-pointer ${
                            readingFlags[readingQuestionIndex]
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>{readingFlags[readingQuestionIndex] ? 'Ghim' : 'Cờ'}</span>
                        </button>
                      </div>

                      <p className={`font-semibold text-slate-100 mb-4 leading-relaxed ${textSize}`}>
                        {currentReadingQuestion.question}
                      </p>

                      <div className="space-y-2">
                        {currentReadingQuestion.options.map((opt, optIdx) => {
                          const isSelected = readingAnswers[readingQuestionIndex] === opt;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer('reading', readingQuestionIndex, opt)}
                              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                                isSelected
                                  ? 'bg-emerald-900/40 border-emerald-500 text-white shadow-xs ring-1 ring-emerald-400'
                                  : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] font-mono shrink-0 ${
                                  isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-4">
                      <button
                        onClick={() => setReadingQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={readingQuestionIndex === 0}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Câu trước
                      </button>
                      <button
                        onClick={() => setReadingQuestionIndex(prev => Math.min(39, prev + 1))}
                        disabled={readingQuestionIndex === 39}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Câu tiếp theo
                      </button>
                    </div>
                  </div>

                  {/* Right Column: 1-40 Reading Palette (2 cols) */}
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                        <span className="text-[11px] font-bold text-white uppercase">40 Câu Reading</span>
                        <span className="text-[10px] font-mono tabular-nums text-emerald-300">{readingAnsweredCount}/40</span>
                      </div>

                      <div className="grid grid-cols-4 lg:grid-cols-2 gap-1.5 max-h-[460px] overflow-y-auto p-0.5">
                        {activeReadingQuestions.map((_, idx) => {
                          const isAnswered = readingAnswers[idx] !== undefined;
                          const isFlagged = readingFlags[idx];
                          const isCurrent = readingQuestionIndex === idx;

                          let btnClasses = 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700';
                          if (isCurrent) {
                            btnClasses = 'border-2 border-white bg-emerald-600 text-white ring-2 ring-emerald-400 font-extrabold';
                          } else if (isFlagged) {
                            btnClasses = 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold';
                          } else if (isAnswered) {
                            btnClasses = 'border-emerald-500/70 bg-emerald-900/50 text-emerald-200 font-semibold';
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => setReadingQuestionIndex(idx)}
                              className={`h-7 rounded text-[11px] font-mono tabular-nums transition-all flex items-center justify-center relative cursor-pointer ${btnClasses}`}
                            >
                              <span>{idx + 1}</span>
                              {isFlagged && (
                                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setActiveSection('writing')}
                        className="w-full py-1.5 px-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Sang Writing</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3C. WRITING SECTION (2 TASKS: TASK 1 + TASK 2) */}
              {activeSection === 'writing' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between">
                  <div>
                    {/* Task 1 vs Task 2 Switcher */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => setActiveWritingTab('task1')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeWritingTab === 'task1'
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Task 1: {activeWritingTasks[0]?.taskType || 'Task 1'} (Tối thiểu 150 từ)
                        </button>
                        <button
                          onClick={() => setActiveWritingTab('task2')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeWritingTab === 'task2'
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Task 2: {activeWritingTasks[1]?.taskType || 'Task 2'} (Tối thiểu 250 từ)
                        </button>
                      </div>

                      {/* Real-time word counter badge + Sample Fill */}
                      <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
                        <button
                          type="button"
                          onClick={() => {
                            if (activeWritingTab === 'task1' && activeWritingTasks[0]) {
                              setWritingTask1Answer(activeWritingTasks[0].modelAnswer);
                            } else if (activeWritingTab === 'task2' && activeWritingTasks[1]) {
                              setWritingTask2Answer(activeWritingTasks[1].modelAnswer);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-sans font-semibold text-[11px] cursor-pointer"
                        >
                          Nạp bài mẫu thử nghiệm
                        </button>
                        {activeWritingTab === 'task1' ? (
                          <div className={`px-3 py-1 rounded-lg border font-bold tabular-nums ${
                            task1WordCount >= 150
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-amber-950 border-amber-500 text-amber-300'
                          }`}>
                            Task 1: {task1WordCount} / 150 từ {task1WordCount >= 150 ? '✓ Đạt chuẩn' : `(Cần thêm ${150 - task1WordCount} từ)`}
                          </div>
                        ) : (
                          <div className={`px-3 py-1 rounded-lg border font-bold tabular-nums ${
                            task2WordCount >= 250
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-amber-950 border-amber-500 text-amber-300'
                          }`}>
                            Task 2: {task2WordCount} / 250 từ {task2WordCount >= 250 ? '✓ Đạt chuẩn' : `(Cần thêm ${250 - task2WordCount} từ)`}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Task Details & Textarea */}
                    {activeWritingTab === 'task1' ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-5 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-3">
                          <h4 className="font-bold text-white text-sm">
                            {activeWritingTasks[0]?.title}
                          </h4>
                          <p className="leading-relaxed text-slate-300">
                            {activeWritingTasks[0]?.prompt}
                          </p>
                          {/* Visual Chart Graphic with Data Points */}
                          {activeWritingTasks[0] && (
                            <WritingChartViewer prompt={activeWritingTasks[0]} className="my-2" />
                          )}
                          <div className="text-[11px] text-purple-300">
                            💡 Khuyến nghị dành 20 phút cho Task 1. Cần có đoạn Overview nêu rõ 2 xu hướng tổng quan.
                          </div>
                        </div>

                        <div className="lg:col-span-7 flex flex-col gap-2">
                          <textarea
                            value={writingTask1Answer}
                            onChange={(e) => setWritingTask1Answer(e.target.value)}
                            placeholder="Nhập bài viết Task 1 tại đây (tối thiểu 150 từ)... The chart illustrates..."
                            rows={14}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 leading-relaxed resize-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-5 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-3">
                          <h4 className="font-bold text-white text-sm">
                            {activeWritingTasks[1]?.title}
                          </h4>
                          <p className="leading-relaxed text-slate-300">
                            {activeWritingTasks[1]?.prompt}
                          </p>
                          <div className="p-3 bg-purple-950/40 rounded border border-purple-800/60 text-[11px] text-purple-200">
                            <strong>Mô hình PEEL cho mỗi đoạn thân bài:</strong>
                            <p className="mt-1">Point (Luận điểm) → Explain (Giải thích) → Evidence (Dẫn chứng) → Link (Liên kết kết luận).</p>
                          </div>
                          <div className="text-[11px] text-purple-300">
                            💡 Khuyến nghị dành 40 phút cho Task 2. Cần thảo luận cả 2 mặt đối lập trước khi chốt quan điểm cá nhân.
                          </div>
                        </div>

                        <div className="lg:col-span-7 flex flex-col gap-2">
                          <textarea
                            value={writingTask2Answer}
                            onChange={(e) => setWritingTask2Answer(e.target.value)}
                            placeholder="Nhập bài luận Task 2 tại đây (tối thiểu 250 từ)... In recent decades, the advent of..."
                            rows={14}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 leading-relaxed resize-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-4">
                    <span className="text-xs text-slate-400">
                      Cả 2 Task viết sẽ được lưu và tự động chấm điểm theo 4 tiêu chí Cambridge khi bấm Nộp Bài.
                    </span>
                    <button
                      onClick={() => setActiveSection('speaking')}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Sang Speaking (Live Examiner)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* 3D. SPEAKING SECTION (LIVE EXAMINER: 3 PARTS) */}
              {activeSection === 'speaking' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col overflow-y-auto">
                  <div className="border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        Official Speaking Examination Room
                      </span>
                      <h3 className="text-base font-bold text-white">
                        Phòng Thi Phỏng Vấn Trực Tiếp 1-1 Cùng Giám Khảo (3 Parts Chuẩn Cambridge)
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-amber-950 border border-amber-600 text-amber-300 px-3 py-1 rounded-lg font-bold flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5" />
                        <span>Hỗ trợ Speech-to-Text & Giọng Đọc Bản Ngữ</span>
                      </span>
                    </div>
                  </div>

                  {/* Mount Live Examiner Component */}
                  <div className="flex-1">
                    <IeltsLiveExaminer onGainXp={onGainXp} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* 4. SCRATCHPAD MODAL */}
      {isScratchpadOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-96 bg-slate-900 border-2 border-amber-500 rounded-2xl shadow-2xl p-4 text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5" />
              <span>Bản Nháp Thí Sinh (Candidate Digital Scratchpad)</span>
            </span>
            <button
              onClick={() => setIsScratchpadOpen(false)}
              className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded"
            >
              ✕
            </button>
          </div>
          <textarea
            value={scratchpadText}
            onChange={(e) => setScratchpadText(e.target.value)}
            placeholder="Ghi chú nhanh số liệu, từ khóa, keyword paraphrase..."
            rows={6}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-hidden font-mono resize-none"
          />
        </div>
      )}

      {/* 5. SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full text-white shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">
                Xác Nhận Nộp Toàn Bộ Bài Thi IELTS?
              </h3>
            </div>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>Hệ thống sẽ tổng hợp toàn bộ kết quả của bạn:</p>
              <ul className="space-y-1 font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800">
                <li className="flex justify-between">
                  <span>🎧 Listening:</span>
                  <strong className="text-blue-400">{listeningAnsweredCount} / 40 câu đã làm</strong>
                </li>
                <li className="flex justify-between">
                  <span>📖 Reading:</span>
                  <strong className="text-emerald-400">{readingAnsweredCount} / 40 câu đã làm</strong>
                </li>
                <li className="flex justify-between">
                  <span>✍️ Writing:</span>
                  <strong className="text-purple-400">T1: {task1WordCount}w · T2: {task2WordCount}w</strong>
                </li>
                <li className="flex justify-between">
                  <span>🎙️ Speaking:</span>
                  <strong className="text-amber-400">3 Parts phỏng vấn trực tiếp</strong>
                </li>
              </ul>
              <p className="text-slate-400 text-[11px]">
                Bảng điểm chính thức Test Report Form (TRF) và phân tích bẫy thi sẽ được xuất ngay sau khi nộp.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
              >
                Tiếp Tục Làm Bài
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 cursor-pointer shadow-sm"
              >
                Xác Nhận Nộp Bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
