import React, { useState, useEffect } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
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

  const currentExercise: Exercise | undefined = lesson.exercises[currentIndex];

  useEffect(() => {
    if (!currentExercise) return;
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
  }, [currentIndex, currentExercise]);

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

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

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
      setFeedbackMessage(result.isMatch ? 'Tuyệt vời! Bạn đã sắp xếp đúng cấu trúc ngữ pháp.' : 'Gần đúng rồi! Hãy kiểm tra lại thứ tự các từ hoặc trợ từ.');
      if (!result.isMatch) {
        setMistakeCount(prev => prev + 1);
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
      default: return 'Luyện Tập';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={lesson.title}
      >
        {/* Top bar with progress and exit */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
              <span>{lesson.title}</span>
              <span>Bước {currentIndex + 1} / {lesson.exercises.length}</span>
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
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng bài học"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-6">
          {!isFinished && currentExercise && (
            <div className="space-y-6">
              {/* Exercise prompt title */}
              <div className="text-center sm:text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  {getExerciseTypeLabel(currentExercise.type)}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
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

                  <div className="text-3xl font-extrabold text-slate-900 mb-2">
                    {currentExercise.targetText}
                  </div>

                  {currentExercise.romanization && (
                    <div className="text-sm font-mono text-indigo-600 mb-3">
                      /{currentExercise.romanization}/
                    </div>
                  )}

                  <div className="text-lg font-medium text-slate-700 mb-5">
                    "{currentExercise.vietnameseMeaning}"
                  </div>

                  <button
                    onClick={() => handlePlayAudio(currentExercise.audioText || currentExercise.targetText)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 shadow-sm cursor-pointer transition-all active:scale-95"
                    aria-label="Nghe phát âm chuẩn bản xứ"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                    <span>Nghe Phát Âm Bản Xứ</span>
                  </button>

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
            </div>
          )}

          {/* Completion Screen */}
          {isFinished && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Hoàn Thành Bài Học!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Tiến bộ vượt bậc! Bạn đã tiếp thu vững chắc các mẫu câu và từ vựng cốt lõi.
              </p>
              
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-bold text-indigo-900">+{lesson.xpReward} XP Thưởng</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Feedback & Navigation Controls */}
        <div className="pt-4 border-t border-slate-100">
          {!isFinished ? (
            <div className="space-y-3">
              {isAnswerChecked && (
                <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
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
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Thoát
                </button>

                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={
                      (currentExercise?.type === 'sentence_build' && assembledTokens.length === 0) ||
                      ((currentExercise?.type === 'quiz_choice' || currentExercise?.type === 'fill_blank' || currentExercise?.type === 'listening_drill') && !selectedOption)
                    }
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
                Nhận Điểm & Tiếp Tục
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
