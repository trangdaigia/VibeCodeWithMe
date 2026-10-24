import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Zap, Timer, Trophy, RefreshCw, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { VocabCard, LanguageCourse } from '../../data/curriculum';
import { speakText } from '../../utils/speech';

interface SpeedMatchingGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: VocabCard[];
  course: LanguageCourse;
  onGainXp: (amount: number) => void;
}

interface MatchItem {
  id: string;
  cardId: string;
  type: 'word' | 'meaning';
  text: string;
  originalCard: VocabCard;
}

export const SpeedMatchingGameModal: React.FC<SpeedMatchingGameModalProps> = ({
  isOpen,
  onClose,
  cards,
  course,
  onGainXp,
}) => {
  const GAME_DURATION = 60; // 60 seconds round

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [leftItems, setLeftItems] = useState<MatchItem[]>([]);
  const [rightItems, setRightItems] = useState<MatchItem[]>([]);

  const [selectedWord, setSelectedWord] = useState<MatchItem | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<MatchItem | null>(null);

  const [matchedCardIds, setMatchedCardIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ wordId: string; meaningId: string } | null>(null);

  const [score, setScore] = useState(0);
  const [streakCombo, setStreakCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  // Initialize a round with 6 random pairs
  const generateNewPairBatch = (excludeIds: Set<string> = new Set()) => {
    const availableCards = cards.filter((c) => !excludeIds.has(c.id));
    const pool = availableCards.length >= 6 ? availableCards : cards;
    
    // Pick 6 random cards
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const roundCards = shuffled.slice(0, Math.min(6, pool.length));

    const words: MatchItem[] = roundCards.map((c) => ({
      id: `w-${c.id}`,
      cardId: c.id,
      type: 'word',
      text: c.word,
      originalCard: c,
    }));

    const meanings: MatchItem[] = roundCards.map((c) => ({
      id: `m-${c.id}`,
      cardId: c.id,
      type: 'meaning',
      text: c.meaning,
      originalCard: c,
    }));

    // Shuffle left and right independently
    setLeftItems(words.sort(() => 0.5 - Math.random()));
    setRightItems(meanings.sort(() => 0.5 - Math.random()));
    setMatchedCardIds(new Set());
  };

  const handleStartGame = () => {
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setStreakCombo(0);
    setMaxCombo(0);
    setTotalAttempts(0);
    setIsGameOver(false);
    setIsPlaying(true);
    generateNewPairBatch();
  };

  // Timer Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setIsGameOver(true);
      const earnedXp = Math.min(200, score * 10 + maxCombo * 5);
      if (earnedXp > 0) {
        onGainXp(earnedXp);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, maxCombo]);

  if (!isOpen) return null;

  // Handle item selection logic
  const handleSelectWord = (item: MatchItem) => {
    if (matchedCardIds.has(item.cardId)) return;
    speakText(item.text, course.voiceLangCode, 0.9);
    setSelectedWord(item);
    if (selectedMeaning) {
      checkMatch(item, selectedMeaning);
    }
  };

  const handleSelectMeaning = (item: MatchItem) => {
    if (matchedCardIds.has(item.cardId)) return;
    setSelectedMeaning(item);
    if (selectedWord) {
      checkMatch(selectedWord, item);
    }
  };

  const checkMatch = (wItem: MatchItem, mItem: MatchItem) => {
    setTotalAttempts((prev) => prev + 1);

    if (wItem.cardId === mItem.cardId) {
      // MATCH SUCCESS!
      const newMatched = new Set(matchedCardIds);
      newMatched.add(wItem.cardId);
      setMatchedCardIds(newMatched);

      const newCombo = streakCombo + 1;
      setStreakCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setScore((prev) => prev + 1);

      setSelectedWord(null);
      setSelectedMeaning(null);

      // If all 6 matched, spawn a new set!
      if (newMatched.size === leftItems.length) {
        setTimeout(() => {
          generateNewPairBatch(newMatched);
        }, 300);
      }
    } else {
      // WRONG MATCH
      setStreakCombo(0);
      setWrongPair({ wordId: wItem.id, meaningId: mItem.id });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedWord(null);
        setSelectedMeaning(null);
      }, 400);
    }
  };

  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span>Đấu Trường Ghép Từ Nhanh</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">60 Giây</span>
              </h2>
              <p className="text-xs text-slate-500">
                Ghép thuật ngữ ({course.vietnameseName}) với nghĩa tiếng Việt tương ứng càng nhanh càng tốt!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Start / Game View / Game Over */}
        {!isPlaying && !isGameOver && (
          <div className="py-12 px-4 text-center space-y-5 my-auto">
            <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto text-amber-600 shadow-inner">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Thử Thách Phản Xạ Từ Vựng</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                Nối cặp từ vựng chuẩn xác để tích lũy Combo điểm thưởng. Nhận đến <strong className="text-amber-600">+200 XP</strong> thưởng cho mỗi vòng chơi xuất sắc!
              </p>
            </div>

            <button
              onClick={handleStartGame}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm rounded-2xl shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Zap className="w-5 h-5" />
              <span>Bắt Đầu Trận Đấu 60s</span>
            </button>
          </div>
        )}

        {/* Active Game Layout */}
        {isPlaying && (
          <div className="space-y-4 py-3 flex-1 flex flex-col overflow-hidden">
            {/* HUD Status Bar */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Timer className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose-600 animate-ping' : 'text-slate-500'}`} />
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Thời gian</div>
                  <div className={`text-sm font-black tabular-nums ${timeLeft <= 10 ? 'text-rose-600 font-extrabold' : 'text-slate-900'}`}>
                    {timeLeft}s
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Điểm số &amp; Chặn</div>
                <div className="text-sm font-black text-amber-600 tabular-nums">
                  {score} cặp {streakCombo > 1 && <span className="text-xs text-indigo-600">({streakCombo}x Combo!)</span>}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Độ chính xác</div>
                <div className="text-sm font-black text-emerald-600 tabular-nums">
                  {accuracy}%
                </div>
              </div>
            </div>

            {/* Game Cards Grid (2 Columns: Words on left, Meanings on right) */}
            <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto p-1">
              {/* Left Column: Target Language Terms */}
              <div className="space-y-2">
                <div className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider px-1">
                  Thuật ngữ ({course.vietnameseName})
                </div>
                {leftItems.map((item) => {
                  const isDone = matchedCardIds.has(item.cardId);
                  const isSelected = selectedWord?.id === item.id;
                  const isWrong = wrongPair?.wordId === item.id;

                  if (isDone) {
                    return (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-slate-400 text-xs font-semibold opacity-40 line-through flex items-center justify-between"
                      >
                        <span>{item.text}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectWord(item)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isWrong
                          ? 'border-rose-500 bg-rose-50 text-rose-900 animate-shake'
                          : isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md scale-[1.02]'
                          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-900 shadow-2xs'
                      }`}
                    >
                      <span>{item.text}</span>
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Vietnamese Translations */}
              <div className="space-y-2">
                <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider px-1">
                  Nghĩa Tiếng Việt
                </div>
                {rightItems.map((item) => {
                  const isDone = matchedCardIds.has(item.cardId);
                  const isSelected = selectedMeaning?.id === item.id;
                  const isWrong = wrongPair?.meaningId === item.id;

                  if (isDone) {
                    return (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-slate-400 text-xs font-semibold opacity-40 line-through flex items-center justify-between"
                      >
                        <span>{item.text}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectMeaning(item)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isWrong
                          ? 'border-rose-500 bg-rose-50 text-rose-900 animate-shake'
                          : isSelected
                          ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                          : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50 text-slate-900 shadow-2xs'
                      }`}
                    >
                      <span>{item.text}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="py-8 px-4 text-center space-y-5 my-auto">
            <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto text-emerald-600">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Hoàn Thành Trận Đấu!</h3>
              <p className="text-xs text-slate-500 mt-1">Kết quả kiểm tra phản xạ từ vựng 60s của bạn</p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Cặp đúng</div>
                <div className="text-lg font-black text-slate-900">{score}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Combo tối đa</div>
                <div className="text-lg font-black text-amber-600">{maxCombo}x</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Thưởng XP</div>
                <div className="text-lg font-black text-emerald-600">+{Math.min(200, score * 10 + maxCombo * 5)} XP</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartGame}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Chơi Lại Trận Mới</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
