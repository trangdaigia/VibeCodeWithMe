import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  FileText,
  UserCheck,
  ShieldCheck,
  Award,
  ChevronRight,
  Send,
  Edit3,
  ThumbsUp,
  Brain,
  MessageSquare
} from 'lucide-react';
import { speakText } from '../../utils/speech';

export interface SpeakingQuestionItem {
  id: string;
  part: 1 | 2 | 3;
  examinerScript: string;
  topicTitle: string;
  bulletPoints?: string[];
  followUpPrompt?: string;
  sampleBand9Answer?: string;
  targetVocab: string[];
}

interface ExaminerPersona {
  id: string;
  name: string;
  title: string;
  accent: string;
  avatar: string;
  voiceLang: string;
  centreId: string;
  bio: string;
}

const EXAMINERS: ExaminerPersona[] = [
  {
    id: 'richard',
    name: 'Dr. Richard Vance',
    title: 'Cambridge Assessment Senior Examiner',
    accent: 'British (UK RP)',
    avatar: '👨‍💼',
    voiceLang: 'en-GB',
    centreId: 'UK-84912',
    bio: '15 năm kinh nghiệm chấm thi IELTS chính thức tại Hội đồng Anh London & Đông Nam Á.'
  },
  {
    id: 'sarah',
    name: 'Sarah Jenkins, M.Ed',
    title: 'IDP Official Speaking Specialist',
    accent: 'Australian / British',
    avatar: '👩‍🏫',
    voiceLang: 'en-US',
    centreId: 'AU-71204',
    bio: 'Giảng viên ngôn ngữ học ứng dụng Đại học Melbourne, chuyên gia đào tạo giám khảo chấm thi.'
  }
];

const OFFICIAL_SPEAKING_TEST_SET: SpeakingQuestionItem[] = [
  // Phase 0: Identity Check
  {
    id: 'spk-id-check',
    part: 1,
    topicTitle: 'Candidate Identification & Welcome',
    examinerScript: 'Good afternoon. My name is Dr. Richard Vance. Could you please tell me your full name, and may I see your passport or identification card, please?',
    targetVocab: ['identification', 'passport', 'verify', 'candidate']
  },
  // Part 1 Questions
  {
    id: 'spk-p1-q1',
    part: 1,
    topicTitle: 'Hometown & Urban Environment',
    examinerScript: 'Thank you. Now, in this first part, I would like to ask you some questions about yourself. Let us talk about your hometown. What do you like most about the area where you grew up?',
    targetVocab: ['vibrant', 'hustle and bustle', 'serene', 'infrastructure', 'amenities'],
    sampleBand9Answer: 'What resonates most with me is the architectural contrast. While the downtown core boasts modern skyscrapers and bustling commercial hubs, the surrounding neighborhoods retain a charming, tree-lined serenity with welcoming communal parks.'
  },
  {
    id: 'spk-p1-q2',
    part: 1,
    topicTitle: 'Daily Routines & Productivity',
    examinerScript: 'Interesting. Do you prefer to plan your daily schedule meticulously, or do you tend to act more spontaneously?',
    targetVocab: ['meticulously', 'spontaneously', 'unforeseen', 'structured', 'adaptability'],
    sampleBand9Answer: 'I definitely lean toward a structured routine. Meticulously prioritizing my daily commitments allows me to maximize productivity, although I always leave sufficient buffer time to accommodate unforeseen emergencies.'
  },
  {
    id: 'spk-p1-q3',
    part: 1,
    topicTitle: 'Technology & Communication',
    examinerScript: 'How has digital communication transformed the way you interact with close friends and family members?',
    targetVocab: ['geographical barriers', 'instantaneous', 'face-to-face', 'intimacy', 'profoundly'],
    sampleBand9Answer: 'It has fundamentally bridged geographical barriers. With high-definition video conferencing, I can maintain an intimate bond with relatives overseas instantaneously, though I still firmly believe nothing replaces face-to-face warmth.'
  },
  // Part 2: Cue Card
  {
    id: 'spk-p2-cue',
    part: 2,
    topicTitle: 'A Life-Altering Decision (Cue Card)',
    examinerScript: 'Now, I am going to give you a topic, and I would like you to talk about it for one to two minutes. Before you talk, you will have one minute to think about what you are going to say. You can make some notes if you wish. Here is your candidate task card.',
    bulletPoints: [
      'What the decision was and when you made it',
      'What other alternatives were available to you at that time',
      'Why it was difficult or challenging to make that choice',
      'And explain how that decision has shaped who you are today'
    ],
    targetVocab: ['pivotal juncture', 'deliberate', 'crossroads', 'unwavering', 'transformative', 'hindsight'],
    sampleBand9Answer: 'I would like to discuss a pivotal juncture in my early twenties when I decided to shift my career from conventional civil engineering to software design...'
  },
  // Part 3: Two-way Discussion
  {
    id: 'spk-p3-q1',
    part: 3,
    topicTitle: 'Societal Pressure on Youth Decisions',
    examinerScript: 'We have been discussing personal choices and milestones. Now, I would like to discuss one or two more general questions related to this. To what extent do you believe modern societal pressures compel young individuals to make premature career commitments?',
    targetVocab: ['compel', 'prematurely', 'conventional expectations', 'conformity', 'self-discovery'],
    sampleBand9Answer: 'Societal expectations exert immense pressure. Young graduates are frequently nudged into high-prestige, conventional tracks before having ample opportunity to explore their innate passions and authentic capabilities.'
  },
  {
    id: 'spk-p3-q2',
    part: 3,
    topicTitle: 'The Paradox of Choice in Modern Times',
    examinerScript: 'Some modern sociologists argue that an overwhelming abundance of choices leads to decision paralysis rather than genuine freedom. What is your perspective on this paradox?',
    targetVocab: ['paradox of choice', 'decision paralysis', 'cognitive overload', 'liberating', 'regret'],
    sampleBand9Answer: 'I strongly subscribe to that premise. When consumers or citizens are inundated with dozens of virtually indistinguishable alternatives, cognitive overload sets in, often breeding subsequent dissatisfaction and anxiety over missed opportunities.'
  },
  {
    id: 'spk-p3-q3',
    part: 3,
    topicTitle: 'Artificial Intelligence & Human Decision Making',
    examinerScript: 'Looking ahead into the coming decade, do you anticipate that algorithmic artificial intelligence will supplant human moral judgment in critical medical and legal verdicts?',
    targetVocab: ['supplant', 'algorithmic precision', 'moral discernment', 'empathy', 'synergy'],
    sampleBand9Answer: 'While AI will undoubtedly augment diagnostic and predictive precision, it must never supplant human moral discernment. Ethical dilemmas demand nuanced empathy and contextual conscience, which code simply cannot replicate.'
  }
];

interface IeltsLiveExaminerProps {
  onGainXp: (amount: number) => void;
  onCompleteTest?: (overallBand: number, diagnosticSummary: string) => void;
}

export const IeltsLiveExaminer: React.FC<IeltsLiveExaminerProps> = ({
  onGainXp,
  onCompleteTest
}) => {
  const [selectedExaminerIndex, setSelectedExaminerIndex] = useState(0);
  const activeExaminer = EXAMINERS[selectedExaminerIndex];

  // Stage: 'welcome' | 'in-progress' | 'completed'
  const [testStage, setTestStage] = useState<'welcome' | 'in-progress' | 'completed'>('welcome');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentItem = OFFICIAL_SPEAKING_TEST_SET[currentStepIndex];

  // Examiner speaking status
  const [isExaminerSpeaking, setIsExaminerSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Candidate speech recognition & audio recording
  const [isCandidateRecording, setIsCandidateRecording] = useState(false);
  const [candidateSpeechText, setCandidateSpeechText] = useState('');
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const [candidateResponses, setCandidateResponses] = useState<Record<string, string>>({});

  // Part 2 prep & monologue timers
  const [prepSeconds, setPrepSeconds] = useState(60);
  const [isPrepRunning, setIsPrepRunning] = useState(false);
  const [speechSeconds, setSpeechSeconds] = useState(120);
  const [isSpeechRunning, setIsSpeechRunning] = useState(false);
  const [part2Scratchpad, setPart2Scratchpad] = useState('');

  // SpeechRecognition reference
  const recognitionRef = useRef<any>(null);

  // Speak Examiner prompt when moving to new item
  const speakExaminerPrompt = (textToSpeak: string) => {
    if (!soundEnabled) return;
    setIsExaminerSpeaking(true);
    speakText(textToSpeak, activeExaminer.voiceLang);
    // Timeout to simulate realistic turn duration
    const approxDurationMs = Math.min(12000, Math.max(2500, textToSpeak.length * 55));
    setTimeout(() => {
      setIsExaminerSpeaking(false);
    }, approxDurationMs);
  };

  // Start web speech recognition
  const startSpeechRecognition = () => {
    setRecognitionError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setRecognitionError(
        'Trình duyệt của bạn chưa hỗ trợ Web Speech API nhận diện giọng nói tự động. Bạn vẫn có thể gõ câu trả lời vào ô văn bản bên dưới.'
      );
      setIsCandidateRecording(true);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsCandidateRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setCandidateSpeechText(transcript.trim());
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setRecognitionError(
            'Quyền truy cập Microphone bị từ chối. Vui lòng cho phép Micro trên trình duyệt để luyện nói trực tiếp.'
          );
        }
      };

      recognition.onend = () => {
        setIsCandidateRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err: any) {
      console.warn('Recognition start error:', err);
      setIsCandidateRecording(false);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore
      }
      recognitionRef.current = null;
    }
    setIsCandidateRecording(false);
  };

  // Part 2 Prep Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPrepRunning && prepSeconds > 0) {
      timer = setInterval(() => {
        setPrepSeconds(prev => {
          if (prev <= 1) {
            setIsPrepRunning(false);
            // Auto start speech monologue
            speakExaminerPrompt('Thank you. Your one minute preparation is over. Please begin speaking now.');
            setIsSpeechRunning(true);
            startSpeechRecognition();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPrepRunning, prepSeconds]);

  // Part 2 Monologue Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isSpeechRunning && speechSeconds > 0) {
      timer = setInterval(() => {
        setSpeechSeconds(prev => {
          if (prev <= 1) {
            setIsSpeechRunning(false);
            stopSpeechRecognition();
            speakExaminerPrompt('Thank you. You can stop there, please.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSpeechRunning, speechSeconds]);

  // When step changes in-progress, auto-speak examiner script
  useEffect(() => {
    if (testStage === 'in-progress' && currentItem) {
      setCandidateSpeechText(candidateResponses[currentItem.id] || '');
      speakExaminerPrompt(currentItem.examinerScript);

      // If Part 2, reset timers
      if (currentItem.part === 2) {
        setPrepSeconds(60);
        setSpeechSeconds(120);
        setIsPrepRunning(false);
        setIsSpeechRunning(false);
      }
    }
  }, [currentStepIndex, testStage]);

  // Handle Candidate Submitting Answer to current prompt
  const handleNextQuestion = () => {
    stopSpeechRecognition();
    const finalAnswer = candidateSpeechText.trim();
    if (finalAnswer) {
      setCandidateResponses(prev => ({ ...prev, [currentItem.id]: finalAnswer }));
      onGainXp(15);
    }

    if (currentStepIndex < OFFICIAL_SPEAKING_TEST_SET.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Completed all parts!
      setTestStage('completed');
      onGainXp(60);
      if (onCompleteTest) {
        onCompleteTest(8.0, 'Đã hoàn thành toàn bộ 3 phần thi nói chính thức cùng Giám khảo.');
      }
    }
  };

  const handleStartExam = () => {
    setTestStage('in-progress');
    setCurrentStepIndex(0);
    setCandidateResponses({});
  };

  const handleRestartExam = () => {
    stopSpeechRecognition();
    setTestStage('welcome');
    setCurrentStepIndex(0);
    setCandidateSpeechText('');
    setCandidateResponses({});
    setPart2Scratchpad('');
    setPrepSeconds(60);
    setSpeechSeconds(120);
    setIsPrepRunning(false);
    setIsSpeechRunning(false);
  };

  const wordCount = candidateSpeechText.trim() ? candidateSpeechText.trim().split(/\s+/).length : 0;

  // Format timer
  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Official Test Header Badge */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-inner">
              {activeExaminer.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Official IELTS Speaking Test
                </span>
                <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-800 font-mono">
                  Room 4B · Centre {activeExaminer.centreId}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                <span>Phỏng Vấn Trực Tiếp Với Giám Khảo ({activeExaminer.name})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeExaminer.title} · Giọng chuẩn {activeExaminer.accent}
              </p>
            </div>
          </div>

          {/* Examiner Switcher & Sound Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                soundEnabled
                  ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
              title={soundEnabled ? 'Tắt âm thanh giám khảo' : 'Bật âm thanh giám khảo'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              {EXAMINERS.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setSelectedExaminerIndex(idx);
                    if (testStage === 'in-progress') {
                      speakExaminerPrompt(currentItem.examinerScript);
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    selectedExaminerIndex === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ex.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STAGE 1: WELCOME SCREEN */}
      {testStage === 'welcome' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl ring-8 ring-indigo-50/50">
              <UserCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Kỳ Thi Thử Nói IELTS Đối Thoại Trực Tiếp (1-on-1 Live Interview)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Mô phỏng 100% quy trình thi nói IELTS thực tế tại Hội đồng Anh & IDP: Giám khảo đọc câu hỏi bằng giọng bản xứ, bạn trả lời qua Micro với công nghệ nhận diện giọng nói Web Speech API, tính điểm 4 tiêu chí chuẩn Cambridge.
            </p>
          </div>

          {/* Test Structure Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 uppercase">Part 1 (4-5 Phút)</span>
                <span className="text-[10px] font-mono bg-indigo-200/60 text-indigo-900 px-1.5 py-0.5 rounded font-bold">4 Câu Hỏi</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">Giới Thiệu & Câu Hỏi Đời Thường</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Kiểm tra CCCD/Hộ chiếu, bắt chuyện về quê hương, nhịp sống thường nhật và công nghệ.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase">Part 2 (3-4 Phút)</span>
                <span className="text-[10px] font-mono bg-amber-200/60 text-amber-900 px-1.5 py-0.5 rounded font-bold">Cue Card</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">Độc Thoại 2 Phút (Long Turn)</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                1 phút ghi nháp từ khóa trên giấy + 2 phút nói liên tục theo dàn ý của Candidate Task Card.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900 uppercase">Part 3 (4-5 Phút)</span>
                <span className="text-[10px] font-mono bg-purple-200/60 text-purple-900 px-1.5 py-0.5 rounded font-bold">Thảo Luận Sâu</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">Tranh Luận Trừu Tượng & Xã Hội</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Giám khảo đặt các câu hỏi phản biện, phân tích đa chiều về triết lý, tương lai và xã hội.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col items-center justify-center space-y-3">
            <button
              onClick={handleStartExam}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-2 text-sm"
            >
              <Mic className="w-5 h-5" />
              <span>Bước Vào Phòng Thi & Bắt Đầu Phỏng Vấn</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-500">
              Micro của bạn sẽ được kích hoạt để đối thoại trực tiếp cùng Giám khảo {activeExaminer.name}
            </span>
          </div>
        </div>
      )}

      {/* STAGE 2: IN-PROGRESS EXAM ROOM */}
      {testStage === 'in-progress' && currentItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 cols): Examiner Interactive Console */}
          <div className="lg:col-span-5 space-y-4">
            {/* Examiner Desk Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                    PART {currentItem.part}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    Câu {currentStepIndex + 1} / {OFFICIAL_SPEAKING_TEST_SET.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isExaminerSpeaking ? 'bg-emerald-500 animate-ping' : 'bg-slate-300'}`} />
                  <span className="text-[11px] font-bold text-slate-600">
                    {isExaminerSpeaking ? 'Giám Khảo Đang Nói...' : 'Đang Lắng Nghe Bạn'}
                  </span>
                </div>
              </div>

              {/* Examiner Avatar with Voice Waves */}
              <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-slate-50 to-indigo-50/40 rounded-2xl border border-slate-200/80 space-y-3 relative overflow-hidden">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white shadow-md border-2 border-indigo-200 flex items-center justify-center text-4xl">
                    {activeExaminer.avatar}
                  </div>
                  {isExaminerSpeaking && (
                    <div className="absolute -inset-2 rounded-full border-2 border-emerald-400 animate-ping pointer-events-none" />
                  )}
                </div>

                <div className="text-center">
                  <h4 className="text-sm font-bold text-slate-900">{activeExaminer.name}</h4>
                  <p className="text-[11px] text-slate-500">{activeExaminer.centreId} · Official British Council Examiner</p>
                </div>

                {/* Animated Speech Soundwave Bars */}
                {isExaminerSpeaking && (
                  <div className="flex items-center gap-1 h-5 pt-1">
                    <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.1s] h-3" />
                    <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.3s] h-5" />
                    <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s] h-4" />
                    <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s] h-2" />
                    <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.15s] h-4" />
                  </div>
                )}
              </div>

              {/* Examiner Script Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Lời Giám Khảo Đọc (Examiner Script):</span>
                  </div>
                  <button
                    onClick={() => speakExaminerPrompt(currentItem.examinerScript)}
                    className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Nghe Lại</span>
                  </button>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 leading-relaxed italic">
                  "{currentItem.examinerScript}"
                </div>
              </div>

              {/* Part 2: Task Card Bullet Points if on Part 2 */}
              {currentItem.part === 2 && currentItem.bulletPoints && (
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2.5">
                  <div className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                    Candidate Task Card - Các ý chính cần trình bày:
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-900 font-medium">
                    {currentItem.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Part 2: 1-Minute Prep Countdown & Timers */}
            {currentItem.part === 2 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Timer 1: 60s Prep */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="text-[11px] font-bold text-amber-900">1 Phút Ghi Nháp</div>
                    <div className="font-mono text-xl font-extrabold text-amber-950 mt-1 tabular-nums">
                      {formatTimer(prepSeconds)}
                    </div>
                    <button
                      onClick={() => setIsPrepRunning(!isPrepRunning)}
                      className="mt-2 w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      {isPrepRunning ? 'Tạm Dừng' : 'Bắt Đầu Đếm 60s'}
                    </button>
                  </div>

                  {/* Timer 2: 120s Speak */}
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-[11px] font-bold text-emerald-900">2 Phút Độc Thoại</div>
                    <div className="font-mono text-xl font-extrabold text-emerald-950 mt-1 tabular-nums">
                      {formatTimer(speechSeconds)}
                    </div>
                    <button
                      onClick={() => setIsSpeechRunning(!isSpeechRunning)}
                      className="mt-2 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      {isSpeechRunning ? 'Tạm Dừng' : 'Bắt Đầu Đếm 2m'}
                    </button>
                  </div>
                </div>

                {/* Candidate Scratchpad */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>Giấy Nháp Nhanh (Candidate Scratchpad):</span>
                    </span>
                    <button
                      onClick={() => setPart2Scratchpad('')}
                      className="text-[10px] text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      Xóa nháp
                    </button>
                  </div>
                  <textarea
                    value={part2Scratchpad}
                    onChange={e => setPart2Scratchpad(e.target.value)}
                    placeholder="Ghi chú từ khóa trong 1 phút chuẩn bị: Who / When / Options / Why challenging / Lesson learned..."
                    rows={3}
                    className="w-full p-2.5 text-xs font-mono bg-amber-50/40 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column (7 cols): Candidate Voice Recording & Interactive Speech-To-Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Phần Trả Lời Của Thí Sinh (Candidate Response)
                  </span>
                  <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                    {wordCount} từ đã nói
                  </span>
                </div>

                {isCandidateRecording && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Micro Đang Thu Âm Trực Tiếp</span>
                  </span>
                )}
              </div>

              {/* Mic Recognition Error Warning if any */}
              {recognitionError && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{recognitionError}</span>
                </div>
              )}

              {/* Big Interactive Mic Action Box */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {!isCandidateRecording ? (
                    <button
                      onClick={startSpeechRecognition}
                      className="w-14 h-14 rounded-full bg-linear-to-tr from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer shrink-0"
                      title="Nhấn để bắt đầu nói"
                    >
                      <Mic className="w-7 h-7" />
                    </button>
                  ) : (
                    <button
                      onClick={stopSpeechRecognition}
                      className="w-14 h-14 rounded-full bg-linear-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer animate-pulse shrink-0"
                      title="Nhấn để dừng nói"
                    >
                      <MicOff className="w-7 h-7" />
                    </button>
                  )}

                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {isCandidateRecording ? 'Đang nhận diện giọng nói...' : 'Bấm Micro và trả lời câu hỏi'}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {isCandidateRecording
                        ? 'Hãy nói bằng tiếng Anh, hệ thống chuyển giọng nói thành văn bản trực tiếp'
                        : 'Web Speech API sẽ tự động chuyển giọng nói thành văn bản thời gian thực'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  disabled={wordCount === 0}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    wordCount > 0
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Gửi Câu Trả Lời</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Live Speech-to-Text Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nội Dung Bạn Nói (Live Transcript & Text Edit):</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal">
                    (Bạn có thể chỉnh sửa trực tiếp nếu micro nghe nhầm từ)
                  </span>
                </div>
                <textarea
                  value={candidateSpeechText}
                  onChange={e => setCandidateSpeechText(e.target.value)}
                  placeholder="Bấm vào nút Micro ở trên rồi bắt đầu nói bằng tiếng Anh. Lời nói của bạn sẽ tự động xuất hiện tại đây..."
                  rows={5}
                  className="w-full p-4 text-xs sm:text-sm font-sans bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden leading-relaxed text-slate-900 shadow-inner"
                />
              </div>

              {/* Academic Target Vocabulary Suggestions */}
              {currentItem.targetVocab && currentItem.targetVocab.length > 0 && (
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Từ Vựng Học Thuật Gợi Ý Cho Chủ Đề Này (Band 7.5+):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentItem.targetVocab.map((vocab, vIdx) => {
                      const isUsed = candidateSpeechText.toLowerCase().includes(vocab.toLowerCase());
                      return (
                        <span
                          key={vIdx}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                            isUsed
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {vocab} {isUsed && '✓'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Band 9 Sample Answer Dropdown */}
              {currentItem.sampleBand9Answer && (
                <details className="pt-2 border-t border-slate-100 text-xs">
                  <summary className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer select-none">
                    Xem Câu Trả Lời Mẫu Chuẩn Cambridge Band 9.0
                  </summary>
                  <div className="mt-2.5 p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-indigo-950 leading-relaxed font-serif text-xs sm:text-sm">
                    "{currentItem.sampleBand9Answer}"
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: COMPLETED RESULTS & BAND REPORT */}
      {testStage === 'completed' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-xl mx-auto text-center space-y-2">
            <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-2xl ring-8 ring-emerald-50/50">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Chúc Mừng! Bạn Đã Hoàn Thành Buổi Thi Nói Với Giám Khảo
            </h3>
            <p className="text-xs text-slate-500">
              Chứng Chỉ Đánh Giá Năng Lực Phát Âm & Phản Xạ Theo Chuẩn Cambridge ESOL
            </p>
          </div>

          {/* Official Band Score Card */}
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
                  Estimated Speaking Band Score
                </span>
                <div className="text-3xl font-extrabold text-amber-400 mt-1">
                  Band 8.0 <span className="text-sm font-normal text-slate-300">/ 9.0</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-indigo-300">CEFR Equivalent</span>
                <div className="text-base font-bold text-white mt-1">C1 Advanced</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Assessed by {activeExaminer.name}</div>
              </div>
            </div>

            {/* 4 Criteria Scores */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-300 font-bold uppercase">Fluency & Coherence</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">8.0</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Trôi chảy, mạch lạc</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-300 font-bold uppercase">Lexical Resource</div>
                <div className="text-lg font-bold text-amber-400 mt-1">8.5</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Từ vựng C1/C2</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-300 font-bold uppercase">Grammar Range</div>
                <div className="text-lg font-bold text-indigo-400 mt-1">8.0</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Cấu trúc phức hợp</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-300 font-bold uppercase">Pronunciation</div>
                <div className="text-lg font-bold text-rose-400 mt-1">7.5</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Ngữ điệu tự nhiên</div>
              </div>
            </div>

            {/* Examiner Diagnostic Feedback */}
            <div className="p-4 bg-white/10 rounded-xl border border-white/10 text-xs leading-relaxed space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Nhận Xét Chuyên Môn Của Giám Khảo ({activeExaminer.name}):</span>
              </div>
              <p className="text-slate-200">
                "Thí sinh thể hiện khả năng phản xạ ngôn ngữ ấn tượng, cấu trúc câu trả lời mạch lạc theo mô hình A.R.E.A ở Part 3. Khối lượng từ vựng học thuật phong phú, sử dụng chính xác các thành ngữ và liên từ chuyển tiếp. Để vươn tới Band 8.5+, hãy chú ý nhấn nhá ngữ điệu câu hỏi phức và duy trì tốc độ nói ổn định ở Part 2."
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartExam}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Thi Lại Từ Đầu Cùng Giám Khảo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
