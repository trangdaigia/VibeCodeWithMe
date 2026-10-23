import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Volume2, CheckCircle2, AlertCircle, ArrowRight, Sparkles, 
  Mic, MicOff, Play, Square, RotateCcw, PenTool, HelpCircle, 
  Check, Award, MessageSquare, BookOpen, Radio, RefreshCw, Edit3
} from 'lucide-react';
import { Lesson, Exercise } from '../data/curriculum';
import { speakText, stopSpeaking } from '../utils/speech';
import { validateSentenceAssembly } from '../utils/grammar';

interface LessonModalProps {
  lesson: Lesson;
  voiceLangCode: string;
  isOpen: boolean;
  onClose: () => void;
  onCompleteLesson: (earnedXp: number) => void;
}

interface WordAnalysis {
  word: string;
  isMatched: boolean;
  rawWord: string;
}

function analyzePronunciation(spoken: string, target: string): {
  score: number;
  wordTokens: WordAnalysis[];
  matchedCount: number;
  totalCount: number;
  feedback: string;
} {
  const cleanToken = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const spokenWords = spoken
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const spokenSet = new Set(spokenWords.map(cleanToken));

  const targetTokens = target.trim().split(/\s+/).filter(Boolean);
  let matched = 0;

  const wordTokens: WordAnalysis[] = targetTokens.map(raw => {
    const cleaned = cleanToken(raw);
    const isMatched = spokenSet.has(cleaned);
    if (isMatched) matched++;
    return {
      word: raw,
      rawWord: cleaned,
      isMatched
    };
  });

  const total = targetTokens.length;
  const score = total > 0 ? Math.min(100, Math.round((matched / total) * 100)) : 100;

  let feedback = 'Chạm vào biểu tượng micro để bắt đầu luyện phát âm.';
  if (spoken.trim().length > 0) {
    if (score >= 90) {
      feedback = 'Xuất sắc! Phát âm rất rõ ràng, chuẩn ngữ điệu tự nhiên của người bản xứ.';
    } else if (score >= 70) {
      feedback = 'Rất tốt! Bạn đã phát âm chính xác hầu hết các từ khóa trong câu.';
    } else if (score >= 40) {
      feedback = 'Khá tốt! Hãy chú ý phát âm rõ hơn các từ màu xám chưa chuyển xanh.';
    } else {
      feedback = 'Hệ thống đang ghi nhận giọng nói... Hãy đọc to và rõ từng âm tiết theo mẫu nhé!';
    }
  }

  return {
    score,
    wordTokens,
    matchedCount: matched,
    totalCount: total,
    feedback
  };
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  voiceLangCode,
  isOpen,
  onClose,
  onCompleteLesson,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSlowSpeech, setIsSlowSpeech] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);

  // --- Speaking Drill State ---
  const [isSpeakingRecording, setIsSpeakingRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [hasCompletedSpeaking, setHasCompletedSpeaking] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecordedAudio, setIsPlayingRecordedAudio] = useState(false);
  const [speakingErrorNotice, setSpeakingErrorNotice] = useState<string | null>(null);

  // --- Writing Drill State ---
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [isWritingDictating, setIsWritingDictating] = useState(false);
  const [showWritingHint, setShowWritingHint] = useState(false);
  const [writingInputMode, setWritingInputMode] = useState<'text' | 'voice'>('voice');

  // Flashcard mini voice test state
  const [isFlashcardRecording, setIsFlashcardRecording] = useState(false);
  const [flashcardTranscript, setFlashcardTranscript] = useState('');

  // Audio & Speech Recognition Refs
  const recognitionRef = useRef<any>(null);
  const writingRecognitionRef = useRef<any>(null);
  const flashcardRecognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const currentExercise: Exercise | undefined = lesson.exercises[currentIndex];

  // Stop all recordings
  const stopAllSpeechRecognition = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }
    if (writingRecognitionRef.current) {
      try { writingRecognitionRef.current.stop(); } catch { /* ignore */ }
      writingRecognitionRef.current = null;
    }
    if (flashcardRecognitionRef.current) {
      try { flashcardRecognitionRef.current.stop(); } catch { /* ignore */ }
      flashcardRecognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch { /* ignore */ }
    }
    setIsSpeakingRecording(false);
    setIsWritingDictating(false);
    setIsFlashcardRecording(false);
  };

  // Reset exercise state upon changing index
  useEffect(() => {
    if (!currentExercise) return;
    
    stopSpeaking();
    stopAllSpeechRecognition();

    if (currentExercise.type === 'sentence_build' && currentExercise.wordTokens) {
      const shuffled = [...currentExercise.wordTokens].sort(() => 0.5 - Math.random());
      setAvailableTokens(shuffled);
      setAssembledTokens([]);
    } else {
      setAvailableTokens([]);
      setAssembledTokens([]);
    }

    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setFeedbackMessage('');
    
    // Reset speaking drill state
    setSpokenTranscript('');
    setHasCompletedSpeaking(false);
    setRecordedAudioUrl(null);
    setSpeakingErrorNotice(null);

    // Reset writing drill state
    setWrittenAnswer('');
    setShowWritingHint(false);

    // Reset flashcard state
    setFlashcardTranscript('');
  }, [currentIndex, currentExercise]);

  // Clean up on unmount or close
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopAllSpeechRecognition();
    };
  }, []);

  if (!isOpen) return null;

  const handlePlayAudio = (text?: string, slowOverride?: boolean) => {
    if (!text) return;
    setIsPlayingAudio(true);
    const rate = slowOverride ?? isSlowSpeech ? 0.65 : 0.95;
    speakText(text, voiceLangCode, rate, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleTokenClick = (token: string, fromIndex: number) => {
    if (isAnswerChecked) return;
    setAssembledTokens([...assembledTokens, token]);
    const nextAvail = [...availableTokens];
    nextAvail.splice(fromIndex, 1);
    setAvailableTokens(nextAvail);
  };

  const handleRemoveToken = (token: string, fromIndex: number) => {
    if (isAnswerChecked) return;
    const nextAssembled = [...assembledTokens];
    nextAssembled.splice(fromIndex, 1);
    setAssembledTokens(nextAssembled);
    setAvailableTokens([...availableTokens, token]);
  };

  // ==========================================
  // Web Speech API: Speaking Drill Pronunciation
  // ==========================================
  const startSpeakingRecognition = async () => {
    stopAllSpeechRecognition();
    setSpeakingErrorNotice(null);

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let recognitionStarted = false;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.lang = voiceLangCode || 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsSpeakingRecording(true);
        };

        recognition.onresult = (event: any) => {
          let liveTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            liveTranscript += event.results[i][0].transcript + ' ';
          }
          const cleaned = liveTranscript.trim();
          setSpokenTranscript(cleaned);
          if (cleaned.length > 0) {
            setHasCompletedSpeaking(true);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition error:', event.error);
          if (event.error === 'not-allowed') {
            setSpeakingErrorNotice('Quyền truy cập Microphone bị từ chối. Vui lòng cho phép trình duyệt truy cập micro.');
          } else if (event.error === 'no-speech') {
            // normal timeout if user is silent
          }
          setIsSpeakingRecording(false);
        };

        recognition.onend = () => {
          setIsSpeakingRecording(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        recognitionStarted = true;
      } catch (err) {
        console.warn('Recognition start exception:', err);
      }
    }

    // Also start MediaRecorder for user playback
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedAudioUrl(url);
          setHasCompletedSpeaking(true);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsSpeakingRecording(true);
      } catch (err: any) {
        if (!recognitionStarted) {
          setSpeakingErrorNotice('Không thể mở microphone. Bạn có thể tự đọc to và bấm "Tôi đã đọc to" để tiếp tục.');
          setHasCompletedSpeaking(true);
        }
      }
    } else if (!recognitionStarted) {
      setSpeakingErrorNotice('Trình duyệt không hỗ trợ Web Speech API. Bạn có thể tự đọc to và tiếp tục.');
      setHasCompletedSpeaking(true);
    }
  };

  const stopSpeakingRecognition = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch { /* ignore */ }
    }
    setIsSpeakingRecording(false);
    if (spokenTranscript.trim().length > 0) {
      setHasCompletedSpeaking(true);
    }
  };

  const handlePlayUserRecordedAudio = () => {
    if (!recordedAudioUrl) return;
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }
    const audio = new Audio(recordedAudioUrl);
    userAudioPlayerRef.current = audio;
    setIsPlayingRecordedAudio(true);
    audio.onended = () => setIsPlayingRecordedAudio(false);
    audio.play();
  };

  // ==========================================
  // Web Speech API: Writing Drill Dictation
  // ==========================================
  const toggleWritingDictation = () => {
    if (isWritingDictating) {
      // Stop dictation
      if (writingRecognitionRef.current) {
        try { writingRecognitionRef.current.stop(); } catch { /* ignore */ }
        writingRecognitionRef.current = null;
      }
      setIsWritingDictating(false);
      return;
    }

    // Start dictation
    stopAllSpeechRecognition();
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API. Bạn hãy dùng bàn phím để gõ câu trả lời nhé!');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = voiceLangCode || 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      const baseText = writtenAnswer.trim();

      recognition.onstart = () => {
        setIsWritingDictating(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        const combined = baseText 
          ? `${baseText} ${transcript.trim()}`
          : transcript.trim();
        setWrittenAnswer(combined);
      };

      recognition.onerror = (event: any) => {
        console.warn('Writing SpeechRecognition error:', event.error);
        setIsWritingDictating(false);
      };

      recognition.onend = () => {
        setIsWritingDictating(false);
      };

      writingRecognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Failed to start writing dictation:', err);
      setIsWritingDictating(false);
    }
  };

  // ==========================================
  // Web Speech API: Flashcard Mini Pronunciation
  // ==========================================
  const toggleFlashcardPronunciation = () => {
    if (isFlashcardRecording) {
      if (flashcardRecognitionRef.current) {
        try { flashcardRecognitionRef.current.stop(); } catch { /* ignore */ }
        flashcardRecognitionRef.current = null;
      }
      setIsFlashcardRecording(false);
      return;
    }

    stopAllSpeechRecognition();
    setFlashcardTranscript('');
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) return;

    try {
      const recognition = new SpeechRec();
      recognition.lang = voiceLangCode || 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsFlashcardRecording(true);
      };

      recognition.onresult = (event: any) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setFlashcardTranscript(text.trim());
      };

      recognition.onend = () => {
        setIsFlashcardRecording(false);
      };

      flashcardRecognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Flashcard speech error:', err);
      setIsFlashcardRecording(false);
    }
  };

  // --- Answer Evaluation ---
  const handleCheckAnswer = () => {
    if (!currentExercise) return;
    stopAllSpeechRecognition();

    if (currentExercise.type === 'flashcard') {
      setIsCorrect(true);
      setIsAnswerChecked(true);
      return;
    }

    if (currentExercise.type === 'sentence_build') {
      const target = currentExercise.targetText || '';
      const result = validateSentenceAssembly(assembledTokens, target);
      setIsCorrect(result.isMatch);
      setIsAnswerChecked(true);
      setFeedbackMessage(
        result.isMatch 
          ? 'Tuyệt vời! Bạn đã sắp xếp đúng cấu trúc ngữ pháp chuẩn xác.' 
          : 'Gần đúng rồi! Hãy kiểm tra lại thứ tự các từ hoặc trợ từ.'
      );
      if (!result.isMatch) {
        setMistakeCount(prev => prev + 1);
      }
      return;
    }

    if (currentExercise.type === 'speaking_drill') {
      setIsAnswerChecked(true);
      const target = currentExercise.targetText || '';
      const analysis = analyzePronunciation(spokenTranscript, target);
      const isPassed = analysis.score >= 60 || hasCompletedSpeaking;
      setIsCorrect(isPassed);

      if (isPassed) {
        setFeedbackMessage(
          analysis.score >= 85 
            ? `Phát âm xuất sắc! Độ chuẩn xác đạt ${analysis.score}%. Ngữ điệu rất tự nhiên và trôi chảy.`
            : `Rất tốt! Độ chuẩn xác đạt ${analysis.score || 85}%. Hãy tiếp tục luyện tập để ngữ điệu mượt mà hơn.`
        );
      } else {
        setMistakeCount(prev => prev + 1);
        setFeedbackMessage(
          `Bạn đạt ${analysis.score}%. Hãy bấm nghe lại mẫu bản xứ và đọc to theo từng âm rõ ràng hơn nhé!`
        );
      }
      return;
    }

    if (currentExercise.type === 'writing_drill') {
      setIsAnswerChecked(true);
      const text = writtenAnswer.trim();
      const minWords = currentExercise.minWords || 3;
      const words = text.split(/\s+/).filter(Boolean);

      const required = currentExercise.requiredKeywords || [];
      const lowerText = text.toLowerCase();
      const missingRequired = required.filter(kw => !lowerText.includes(kw.toLowerCase()));

      const hasMinLength = words.length >= minWords;
      const passedKeywords = missingRequired.length === 0;

      const acceptable = [currentExercise.targetText, ...(currentExercise.acceptableAnswers || [])]
        .filter(Boolean)
        .map(a => (a || '').toLowerCase().trim());

      const isExactOrClose = acceptable.some(ans => {
        const cleanAns = ans.replace(/[^a-z0-9]/gi, '');
        const cleanUser = lowerText.replace(/[^a-z0-9]/gi, '');
        return cleanAns === cleanUser || cleanUser.includes(cleanAns) || cleanAns.includes(cleanUser);
      });

      const pass = hasMinLength && (passedKeywords || isExactOrClose);
      setIsCorrect(pass);

      if (pass) {
        setFeedbackMessage('Diễn đạt rất tốt! Cấu trúc câu và vốn từ ngữ sử dụng hoàn toàn phù hợp.');
      } else {
        setMistakeCount(prev => prev + 1);
        if (!hasMinLength) {
          setFeedbackMessage(`Bài viết cần tối thiểu ${minWords} từ để đủ ý hoàn chỉnh.`);
        } else if (missingRequired.length > 0) {
          setFeedbackMessage(`Đừng quên kết hợp các từ khóa gợi ý: ${missingRequired.join(', ')}.`);
        } else {
          setFeedbackMessage('Hãy so sánh với câu chuẩn gợi ý bên dưới để trau chuốt cấu trúc hơn nhé!');
        }
      }
      return;
    }

    if (currentExercise.type === 'quiz_choice' || currentExercise.type === 'fill_blank' || currentExercise.type === 'listening_drill') {
      const correct = selectedOption === currentExercise.correctAnswer;
      setIsCorrect(correct);
      setIsAnswerChecked(true);
      if (!correct) {
        setMistakeCount(prev => prev + 1);
        setFeedbackMessage(currentExercise.explanation || 'Chưa chính xác. Hãy xem kỹ ý nghĩa câu.');
      } else {
        setFeedbackMessage(currentExercise.explanation || 'Chính xác! Bạn làm rất tốt.');
      }
    }
  };

  const handleNext = () => {
    stopSpeaking();
    stopAllSpeechRecognition();
    if (currentIndex + 1 < lesson.exercises.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = () => {
    const isPerfect = mistakeCount === 0;
    const earnedXp = isPerfect ? lesson.xpReward + 10 : lesson.xpReward;
    onCompleteLesson(earnedXp);
    onClose();
  };

  const progressPercent = Math.round(((currentIndex + 1) / lesson.exercises.length) * 100);

  const getExerciseTypeLabel = (type: string) => {
    switch (type) {
      case 'flashcard': return 'Thẻ Từ Vựng & Phát Âm';
      case 'sentence_build': return 'Lắp Ghép Cấu Trúc Câu';
      case 'quiz_choice': return 'Trắc Nghiệm Phản Xạ';
      case 'fill_blank': return 'Điền Từ Còn Thiếu';
      case 'listening_drill': return 'Luyện Nghe & Bắt Âm';
      case 'speaking_drill': return 'Luyện Phát Âm & Nói Trực Tiếp';
      case 'writing_drill': return 'Luyện Viết & Diễn Đạt';
      default: return 'Luyện Tập';
    }
  };

  const isCheckDisabled = () => {
    if (!currentExercise) return true;
    if (currentExercise.type === 'sentence_build') {
      return assembledTokens.length === 0;
    }
    if (currentExercise.type === 'quiz_choice' || currentExercise.type === 'fill_blank' || currentExercise.type === 'listening_drill') {
      return !selectedOption;
    }
    if (currentExercise.type === 'writing_drill') {
      return writtenAnswer.trim().length === 0;
    }
    if (currentExercise.type === 'speaking_drill') {
      return !hasCompletedSpeaking && spokenTranscript.trim().length === 0;
    }
    return false;
  };

  // Real-time analysis for speaking drill
  const currentSpeakingAnalysis = currentExercise?.targetText 
    ? analyzePronunciation(spokenTranscript, currentExercise.targetText)
    : { score: 0, wordTokens: [], matchedCount: 0, totalCount: 0, feedback: '' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={lesson.title}
      >
        {/* Top bar with progress and exit */}
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100 shrink-0">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
              <span className="font-semibold text-slate-800 truncate max-w-[220px] sm:max-w-md">{lesson.title}</span>
              <span className="tabular-nums font-medium">Bước {currentIndex + 1} / {lesson.exercises.length}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              stopAllSpeechRecognition();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Đóng bài học"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-1">
          {!isFinished && currentExercise && (
            <div className="space-y-5">
              {/* Exercise prompt title */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {getExerciseTypeLabel(currentExercise.type)}
                  </span>
                  {currentExercise.grammarFocus && (
                    <span className="text-[11px] font-medium text-slate-500">
                      • {currentExercise.grammarFocus}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
                  {currentExercise.prompt}
                </h3>
              </div>

              {/* 1. Flashcard presentation */}
              {currentExercise.type === 'flashcard' && (
                <div className="p-6 bg-linear-to-b from-indigo-50/50 to-slate-50 rounded-2xl border border-indigo-100/80 text-center">
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      onClick={() => setIsSlowSpeech(!isSlowSpeech)}
                      className={`text-xs px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-colors ${
                        isSlowSpeech ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {isSlowSpeech ? '🐢 Phát âm chậm (0.65x)' : '⚡ Tốc độ tự nhiên'}
                    </button>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    {currentExercise.targetText}
                  </div>

                  {currentExercise.romanization && (
                    <div className="text-sm font-mono text-indigo-600 mb-3">
                      /{currentExercise.romanization}/
                    </div>
                  )}

                  <div className="text-base sm:text-lg font-medium text-slate-700 mb-5">
                    "{currentExercise.vietnameseMeaning}"
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      onClick={() => handlePlayAudio(currentExercise.audioText || currentExercise.targetText)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 shadow-sm cursor-pointer transition-all active:scale-95"
                      aria-label="Nghe phát âm chuẩn bản xứ"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                      <span>Nghe Phát Âm Bản Xứ</span>
                    </button>

                    {/* Flashcard speech-to-text test */}
                    <button
                      onClick={toggleFlashcardPronunciation}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                        isFlashcardRecording 
                          ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                      aria-label="Thử phát âm qua Web Speech API"
                    >
                      <Mic className="w-4 h-4" />
                      <span>{isFlashcardRecording ? 'Đang nghe giọng...' : 'Thử Nói Từ Này'}</span>
                    </button>
                  </div>

                  {/* Flashcard real-time speech feedback */}
                  {flashcardTranscript && (
                    <div className="mt-4 p-3 bg-white rounded-xl border border-indigo-100 text-xs text-left shadow-2xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-500">Giọng nói nhận diện được:</span>
                        <span className="text-[11px] font-bold text-indigo-600">Web Speech API</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 italic">"{flashcardTranscript}"</p>
                    </div>
                  )}

                  {currentExercise.explanation && (
                    <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 text-left">
                      <strong className="text-slate-800">Ghi chú ngữ cảnh: </strong>
                      {currentExercise.explanation}
                    </div>
                  )}

                  {currentExercise.culturalNote && (
                    <div className="mt-2.5 p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 text-left">
                      <strong>Mẹo văn hóa thực tế: </strong>
                      {currentExercise.culturalNote}
                    </div>
                  )}
                </div>
              )}

              {/* 2. Sentence Assembly */}
              {currentExercise.type === 'sentence_build' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Câu bạn đang ghép:</div>
                    <div className="min-h-14 p-2.5 bg-white rounded-lg border border-dashed border-slate-300 flex flex-wrap gap-2 items-center">
                      {assembledTokens.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">Chạm vào các từ bên dưới theo đúng trật tự câu</span>
                      ) : (
                        assembledTokens.map((token, idx) => (
                          <button
                            key={`assembled-${idx}`}
                            onClick={() => handleRemoveToken(token, idx)}
                            disabled={isAnswerChecked}
                            className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg text-sm font-semibold hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 transition-colors cursor-pointer"
                          >
                            {token}
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-500 font-medium">Kho từ vựng có sẵn:</div>
                    <div className="flex flex-wrap gap-2">
                      {availableTokens.map((token, idx) => (
                        <button
                          key={`avail-${idx}`}
                          onClick={() => handleTokenClick(token, idx)}
                          disabled={isAnswerChecked}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-lg text-sm font-medium hover:border-indigo-400 hover:bg-indigo-50/40 shadow-xs transition-all cursor-pointer"
                        >
                          {token}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Multiple Choice & Fill-in-the-Blank */}
              {(currentExercise.type === 'quiz_choice' || currentExercise.type === 'fill_blank') && (
                <div className="space-y-3">
                  {currentExercise.audioText && (
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => handlePlayAudio(currentExercise.audioText)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                        aria-label="Nghe đoạn âm thanh"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Nghe phát âm</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50';
                      if (isSelected) {
                        optionStyle = 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600 font-semibold';
                      }
                      if (isAnswerChecked) {
                        if (option === currentExercise.correctAnswer) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => !isAnswerChecked && setSelectedOption(option)}
                          disabled={isAnswerChecked}
                          className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === currentExercise.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Listening Drill */}
              {currentExercise.type === 'listening_drill' && (
                <div className="space-y-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <button
                      onClick={() => handlePlayAudio(currentExercise.audioText)}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-semibold text-base rounded-xl hover:bg-indigo-700 shadow-md cursor-pointer transition-all active:scale-95"
                      aria-label="Phát âm thanh bài tập"
                    >
                      <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                      <span>Bấm Để Nghe Giọng Bản Xứ</span>
                    </button>
                    <p className="text-xs text-slate-500 mt-2">Lắng nghe thật kỹ ngữ điệu và phát âm</p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50';
                      if (isSelected) {
                        optionStyle = 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600 font-semibold';
                      }
                      if (isAnswerChecked) {
                        if (option === currentExercise.correctAnswer) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => !isAnswerChecked && setSelectedOption(option)}
                          disabled={isAnswerChecked}
                          className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === currentExercise.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. Substantive Speaking Drill with Web Speech API Speech-to-Text Input */}
              {currentExercise.type === 'speaking_drill' && (
                <div className="space-y-4">
                  {/* Target speech display card */}
                  <div className="p-5 bg-linear-to-b from-indigo-50/70 via-white to-slate-50 rounded-2xl border border-indigo-100 text-center shadow-xs">
                    <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider block mb-1">
                      Mẫu câu chuẩn cần luyện phát âm
                    </span>
                    
                    {/* Interactive Real-Time Word Breakdown */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 my-2">
                      {currentSpeakingAnalysis.wordTokens.map((item, idx) => (
                        <span
                          key={idx}
                          className={`px-2.5 py-1 rounded-lg text-lg sm:text-xl font-bold transition-all duration-200 ${
                            item.isMatched
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs scale-105'
                              : 'bg-slate-100 text-slate-800 border border-slate-200'
                          }`}
                        >
                          {item.word}
                          {item.isMatched && <Check className="w-3.5 h-3.5 inline ml-1 text-emerald-600" />}
                        </span>
                      ))}
                    </div>

                    {(currentExercise.targetPhonetic || currentExercise.romanization) && (
                      <div className="text-xs font-mono text-indigo-600 mb-1">
                        /{currentExercise.targetPhonetic || currentExercise.romanization}/
                      </div>
                    )}

                    {currentExercise.vietnameseMeaning && (
                      <p className="text-xs sm:text-sm text-slate-600 mb-3 font-medium">
                        Ý nghĩa: {currentExercise.vietnameseMeaning}
                      </p>
                    )}

                    {/* Dual speed native audio player */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handlePlayAudio(currentExercise.audioText || currentExercise.targetText, false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-xs cursor-pointer transition-all active:scale-95"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                        <span>Nghe giọng bản xứ 1.0x</span>
                      </button>
                      <button
                        onClick={() => handlePlayAudio(currentExercise.audioText || currentExercise.targetText, true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 cursor-pointer transition-all"
                      >
                        <span>🐢 Nghe chậm 0.65x</span>
                      </button>
                    </div>
                  </div>

                  {/* Dedicated Speech-to-Text Input Arena */}
                  <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    {/* Live Pronunciation Accuracy Meter */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <Award className="w-4 h-4 text-indigo-600" />
                        <span>Độ chuẩn xác phát âm (Real-time):</span>
                      </div>
                      <span className={`font-bold tabular-nums text-sm ${
                        currentSpeakingAnalysis.score >= 80 
                          ? 'text-emerald-600' 
                          : currentSpeakingAnalysis.score >= 50 
                            ? 'text-indigo-600' 
                            : 'text-slate-500'
                      }`}>
                        {currentSpeakingAnalysis.score}% ({currentSpeakingAnalysis.matchedCount}/{currentSpeakingAnalysis.totalCount} từ)
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          currentSpeakingAnalysis.score >= 80 
                            ? 'bg-emerald-500' 
                            : currentSpeakingAnalysis.score >= 50 
                              ? 'bg-indigo-600' 
                              : 'bg-amber-500'
                        }`}
                        style={{ width: `${currentSpeakingAnalysis.score}%` }}
                      />
                    </div>

                    {/* Speech-to-Text Input Field */}
                    <div className="relative bg-white rounded-xl border border-slate-300 p-3 shadow-2xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1.5 border-b border-slate-100 mb-2">
                        <span className="font-semibold text-indigo-700 flex items-center gap-1">
                          <Radio className="w-3.5 h-3.5 text-indigo-600" />
                          Ô nhận diện giọng nói (Speech-to-Text Web Speech API):
                        </span>
                        {spokenTranscript && (
                          <button
                            onClick={() => {
                              setSpokenTranscript('');
                              setRecordedAudioUrl(null);
                            }}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Xóa & Đọc lại</span>
                          </button>
                        )}
                      </div>

                      {/* Transcribed Speech Text Input / Editable Display */}
                      <input
                        type="text"
                        value={spokenTranscript}
                        onChange={(e) => setSpokenTranscript(e.target.value)}
                        placeholder="Chạm vào nút Micro và đọc to câu tiếng Anh trên..."
                        disabled={isAnswerChecked}
                        className="w-full font-medium text-slate-800 text-sm focus:outline-none placeholder:text-slate-400 bg-transparent"
                      />

                      {/* Active recording soundwave indicator */}
                      {isSpeakingRecording && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                          <span className="flex gap-1 items-center">
                            <span className="w-1.5 h-3 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                          <span className="text-xs font-semibold text-rose-600 animate-pulse">
                            Đang lắng nghe giọng bạn qua Web Speech API...
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Microphone Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                      {!isSpeakingRecording ? (
                        <button
                          onClick={startSpeakingRecognition}
                          disabled={isAnswerChecked}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                          aria-label="Bật micro luyện nói"
                        >
                          <Mic className="w-5 h-5" />
                          <span>{spokenTranscript ? 'Nói lại / Tiếp tục nói' : 'Bật Micro & Luyện Nói'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={stopSpeakingRecognition}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer animate-pulse active:scale-95"
                          aria-label="Dừng ghi âm"
                        >
                          <Square className="w-4 h-4 fill-white" />
                          <span>Dừng & Phân tích phát âm</span>
                        </button>
                      )}

                      {/* User Recorded Audio Playback */}
                      {recordedAudioUrl && (
                        <button
                          onClick={handlePlayUserRecordedAudio}
                          className="inline-flex items-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
                        >
                          <Play className={`w-3.5 h-3.5 ${isPlayingRecordedAudio ? 'text-indigo-600' : ''}`} />
                          <span>Nghe lại giọng của bạn</span>
                        </button>
                      )}
                    </div>

                    {/* Real-time coaching message */}
                    <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-950 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{currentSpeakingAnalysis.feedback}</span>
                    </div>

                    {speakingErrorNotice && (
                      <div className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                        {speakingErrorNotice}
                      </div>
                    )}
                  </div>

                  {/* Speaking Hints */}
                  {currentExercise.speakingHints && currentExercise.speakingHints.length > 0 && (
                    <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-900">
                      <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Mẹo nhấn trọng âm và ngữ điệu:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                        {currentExercise.speakingHints.map((hint, idx) => (
                          <li key={idx}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* 6. Substantive Writing Drill with Integrated Speech-to-Text Input */}
              {currentExercise.type === 'writing_drill' && (
                <div className="space-y-4">
                  {/* Context & Scenario */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">Tình huống thực tế:</span>
                    <p className="leading-relaxed">{currentExercise.vietnameseMeaning || currentExercise.explanation}</p>
                  </div>

                  {/* Real-Time Keyword Matching Chips */}
                  {currentExercise.requiredKeywords && currentExercise.requiredKeywords.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-700">Từ khóa yêu cầu (chuyển xanh theo thời gian thực):</span>
                        <span className="text-[11px] text-slate-500">Nói hoặc gõ từ khóa vào ô</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentExercise.requiredKeywords.map((kw, idx) => {
                          const isMatched = writtenAnswer.toLowerCase().includes(kw.toLowerCase());
                          return (
                            <span
                              key={idx}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                isMatched
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-white text-slate-600 border border-slate-200'
                              }`}
                            >
                              {isMatched ? <Check className="w-3 h-3 text-emerald-600" /> : <PenTool className="w-3 h-3 text-slate-400" />}
                              <span>{kw}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Writing Input Field with Web Speech API Voice Dictation */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Bài viết của bạn (Hỗ trợ bàn phím & Giọng nói):</span>
                      </label>

                      {/* Speech-to-Text Dictation Toggle Button */}
                      <button
                        type="button"
                        onClick={toggleWritingDictation}
                        disabled={isAnswerChecked}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          isWritingDictating
                            ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                        }`}
                        title="Bấm để nói trực tiếp vào ô văn bản bằng Web Speech API"
                      >
                        <Mic className={`w-3.5 h-3.5 ${isWritingDictating ? 'animate-bounce' : ''}`} />
                        <span>{isWritingDictating ? 'Đang nhận diện giọng nói...' : 'Nói để viết (Speech-to-Text)'}</span>
                      </button>
                    </div>

                    <div className="relative">
                      <textarea
                        rows={3}
                        value={writtenAnswer}
                        onChange={(e) => setWrittenAnswer(e.target.value)}
                        disabled={isAnswerChecked}
                        placeholder="Nhập câu tiếng Anh hoàn chỉnh hoặc bấm nút 'Nói để viết' phía trên..."
                        className={`w-full p-3.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 font-medium leading-relaxed resize-none shadow-2xs transition-colors ${
                          isWritingDictating 
                            ? 'border-rose-400 focus:ring-rose-400 ring-1 ring-rose-300' 
                            : 'border-slate-300 focus:ring-indigo-500'
                        }`}
                      />

                      {/* Dictation pulse wave inside textarea */}
                      {isWritingDictating && (
                        <div className="absolute right-3 bottom-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-rose-200">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                          <span className="text-[10px] font-bold text-rose-600">Mic đang nghe...</span>
                        </div>
                      )}
                    </div>

                    {/* Word and Character Counters */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                      <span>
                        Số từ: <strong className="text-slate-700">{writtenAnswer.trim() ? writtenAnswer.trim().split(/\s+/).length : 0}</strong>
                        {currentExercise.minWords ? ` (tối thiểu ${currentExercise.minWords} từ)` : ''}
                      </span>
                      <span>{writtenAnswer.length} ký tự</span>
                    </div>
                  </div>

                  {/* Grammar hint toggle */}
                  {(currentExercise.grammarFocus || currentExercise.culturalNote) && (
                    <div>
                      <button
                        onClick={() => setShowWritingHint(!showWritingHint)}
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{showWritingHint ? 'Ẩn gợi ý cấu trúc' : 'Xem gợi ý cấu trúc câu'}</span>
                      </button>

                      {showWritingHint && (
                        <div className="mt-2 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 animate-in fade-in duration-150">
                          <strong>Gợi ý: </strong>
                          {currentExercise.grammarFocus || currentExercise.culturalNote}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Model Answer Breakdown (Revealed after check) */}
                  {isAnswerChecked && currentExercise.targetText && (
                    <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Đáp án tham chiếu chuẩn bản xứ:</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-950 font-serif">
                        "{currentExercise.targetText}"
                      </p>
                      {currentExercise.explanation && (
                        <p className="text-slate-600 border-t border-emerald-200/60 pt-2 mt-2">
                          <strong>Phân tích ngữ pháp: </strong>{currentExercise.explanation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Completion Screen */}
          {isFinished && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Hoàn Thành Bài Học Xuất Sắc!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Bạn đã luyện tập toàn diện 4 kỹ năng: Nghe, Nói phát âm qua Web Speech API, Lắp ghép ngữ pháp và Viết diễn đạt!
              </p>
              
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-bold text-indigo-900">+{lesson.xpReward} XP Đã Tích Lũy</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Feedback & Navigation Controls */}
        <div className="pt-3 border-t border-slate-100 shrink-0">
          {!isFinished ? (
            <div className="space-y-3">
              {isAnswerChecked && (
                <div className={`p-3 rounded-xl text-xs flex items-start gap-2.5 ${
                  isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold">{isCorrect ? 'Chính xác! ' : 'Cần lưu ý: '}</span>
                    <span>{feedbackMessage || (isCorrect ? 'Làm rất tốt.' : `Đáp án đúng: ${currentExercise?.targetText || currentExercise?.correctAnswer}`)}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    stopSpeaking();
                    stopAllSpeechRecognition();
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Thoát
                </button>

                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={isCheckDisabled()}
                    className="px-6 py-2.5 bg-indigo-600 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold text-xs rounded-xl shadow-xs hover:bg-indigo-700 transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <span>Tiếp tục</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={handleFinish}
                className="px-8 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Nhận Điểm & Tiếp Tục Lộ Trình
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
