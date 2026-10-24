import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  X,
  Radio,
  Award,
  HelpCircle
} from 'lucide-react';
import { VocabCard, LanguageCourse } from '../../data/curriculum';
import { speakText } from '../../utils/speech';
import {
  evaluatePronunciationResult,
  resolveSpeechRecognitionLocale,
  PronunciationEvaluation
} from '../../utils/pronunciationLogic';

interface PronunciationCheckerModalProps {
  card: VocabCard;
  course: LanguageCourse;
  isOpen: boolean;
  onClose: () => void;
  onSuccessXP?: (xp: number) => void;
}

export const PronunciationCheckerModal: React.FC<PronunciationCheckerModalProps> = ({
  card,
  course,
  isOpen,
  onClose,
  onSuccessXP,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [evaluation, setEvaluation] = useState<PronunciationEvaluation | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [hasAwardedXP, setHasAwardedXP] = useState<boolean>(false);
  const [testSimInput, setTestSimInput] = useState<string>('');

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
  }, []);

  // Reset state when target card changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setSpokenTranscript('');
      setEvaluation(null);
      setSpeechError(null);
      setHasAwardedXP(false);
      setTestSimInput(card.word);
    } else {
      stopListening();
    }
  }, [isOpen, card.id]);

  const handlePlayModelAudio = () => {
    speakText(card.word, course.voiceLangCode, 0.85);
  };

  const startListening = () => {
    setSpeechError(null);
    setEvaluation(null);
    setSpokenTranscript('');

    const SpeechRecognition =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setSpeechError('Trình duyệt hiện tại chưa hỗ trợ Web Speech API nhận diện giọng nói. Bạn có thể sử dụng công cụ mô phỏng bên dưới để kiểm tra thuật toán.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.lang = resolveSpeechRecognitionLocale(course.voiceLangCode);

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        if (transcript) {
          processSpokenResult(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        const errType = event.error;
        if (errType === 'not-allowed') {
          setSpeechError('Quyền truy cập micro đã bị từ chối. Vui lòng cấp quyền micro trong trình duyệt.');
        } else if (errType === 'no-speech') {
          setSpeechError('Không phát hiện được âm thanh giọng nói. Hãy nhấn lại và nói rõ hơn.');
        } else {
          setSpeechError(`Lỗi nhận diện âm thanh (${errType}). Bạn có thể thử lại hoặc dùng công cụ kiểm tra bên dưới.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      setSpeechError(err?.message || 'Không thể khởi động bộ thu âm giọng nói.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }
  };

  const processSpokenResult = (transcript: string) => {
    setSpokenTranscript(transcript);
    const evalResult = evaluatePronunciationResult(
      transcript,
      card.word,
      course.voiceLangCode
    );
    setEvaluation(evalResult);

    if (evalResult.score >= 80 && !hasAwardedXP && onSuccessXP) {
      onSuccessXP(10);
      setHasAwardedXP(true);
    }
  };

  const handleSimulateCheck = (simulatedWord: string) => {
    processSpokenResult(simulatedWord);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pronunciation-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-300 font-mono">
                Web Speech API · Pronunciation Checker
              </div>
              <h3 id="pronunciation-modal-title" className="text-sm sm:text-base font-bold text-white">
                Kiểm Tra Phát Âm Bằng Giọng Nói
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ kiểm tra phát âm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Target Word Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {course.vietnameseName} ({course.nativeName}) · {card.category}
            </span>

            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {card.word}
            </div>

            {card.romanization && (
              <div className="text-xs font-semibold text-indigo-600 font-mono">
                {card.romanization}
              </div>
            )}

            <div className="text-xs text-slate-600 font-medium">
              {card.meaning}
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handlePlayModelAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                title="Lắng nghe phát âm chuẩn bản xứ"
              >
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Nghe phát âm chuẩn</span>
              </button>
            </div>
          </div>

          {/* Voice Recognition Section */}
          <div className="p-5 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 flex flex-col items-center justify-center text-center space-y-3">
            <div className="relative">
              {isListening && (
                <span className="absolute -inset-2 rounded-full bg-rose-400 opacity-75 animate-ping" />
              )}
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105'
                }`}
                aria-label={isListening ? 'Dừng thu âm' : 'Bắt đầu nói để kiểm tra phát âm'}
                data-testid="vocab-voice-mic-btn"
              >
                {isListening ? (
                  <MicOff className="w-7 h-7" />
                ) : (
                  <Mic className="w-7 h-7" />
                )}
              </button>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-800">
                {isListening
                  ? 'Đang lắng nghe giọng bạn nói...'
                  : 'Nhấn nút Micro để nói từ vựng'}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isListening
                  ? 'Hãy phát âm rõ ràng từ: "' + card.word + '"'
                  : 'Hệ thống Web Speech API sẽ chuyển giọng nói thành văn bản và so sánh với từ gốc.'}
              </p>
            </div>

            {isListening && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold animate-pulse">
                <Radio className="w-3.5 h-3.5" />
                <span>Micro đang thu âm trực tiếp...</span>
              </div>
            )}
          </div>

          {/* Speech Error Banner */}
          {speechError && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{speechError}</p>
                <p className="text-[11px] text-amber-700">
                  Mẹo: Hãy đảm bảo bạn đã cho phép quyền truy cập Microphone và đang sử dụng trình duyệt Chrome, Edge hoặc Safari.
                </p>
              </div>
            </div>
          )}

          {/* Evaluation Result View */}
          {evaluation && (
            <div
              className={`p-4 rounded-2xl border transition-all animate-in fade-in duration-200 ${
                evaluation.verdict === 'excellent'
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : evaluation.verdict === 'good'
                  ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                  : 'bg-rose-50/80 border-rose-300 text-rose-950'
              }`}
              data-testid="pronunciation-evaluation-result"
            >
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  {evaluation.verdict === 'excellent' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : evaluation.verdict === 'good' ? (
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                  )}
                  <span>
                    {evaluation.verdict === 'excellent'
                      ? 'Đạt chuẩn xuất sắc'
                      : evaluation.verdict === 'good'
                      ? 'Khá tốt - Cần trau chuốt'
                      : 'Cần luyện tập thêm'}
                  </span>
                </div>

                <div className="flex items-center gap-1 font-mono text-xs font-black">
                  <span>Độ chính xác:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-white ${
                      evaluation.score >= 85
                        ? 'bg-emerald-600'
                        : evaluation.score >= 60
                        ? 'bg-amber-600'
                        : 'bg-rose-600'
                    }`}
                  >
                    {evaluation.score}%
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <span className="text-slate-600">Từ nhận diện được (Voice transcript):</span>
                  <strong className="text-slate-900 bg-white/70 px-2 py-0.5 rounded border border-black/5 font-mono">
                    "{spokenTranscript || evaluation.normalizedSpoken}"
                  </strong>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <span className="text-slate-600">Từ gốc mục tiêu:</span>
                  <strong className="text-slate-900 bg-white/70 px-2 py-0.5 rounded border border-black/5 font-mono">
                    "{card.word}"
                  </strong>
                </div>

                <p className="mt-2 text-xs leading-relaxed font-medium">
                  {evaluation.feedbackVi}
                </p>

                {evaluation.score >= 80 && (
                  <div className="mt-2 pt-2 border-t border-black/10 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>Thưởng ôn luyện phát âm:</span>
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                      +10 XP
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Simulation / Manual Test Fallback (Guarantees testability & non-mic environments) */}
          <div className="pt-2 border-t border-slate-100">
            <details className="text-xs text-slate-500 group">
              <summary className="font-semibold text-slate-700 hover:text-indigo-600 cursor-pointer list-none flex items-center justify-between py-1">
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Công cụ mô phỏng &amp; kiểm tra kiểm thử (Speech Simulator)</span>
                </span>
                <span className="text-[10px] text-indigo-600 font-bold group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>

              <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <p className="text-[11px] text-slate-500">
                  Dành cho kiểm thử hoặc môi trường không gắn microphone:
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSimulateCheck(card.word)}
                    className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                  >
                    Thử phát âm chuẩn 100% ("{card.word}")
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSimulateCheck(card.word.slice(0, Math.max(2, card.word.length - 2)))}
                    className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                  >
                    Thử phát âm gần đúng (~70%)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSimulateCheck('something completely different')}
                    className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                  >
                    Thử sai âm
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={startListening}
            disabled={isListening}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nói lại từ đầu</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
