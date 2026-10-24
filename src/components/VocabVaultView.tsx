import React, { useState, useEffect } from 'react';
import { Layers, Plus, Search, Volume2, Sparkles, Calendar, Mic, X, SearchX, Filter, Printer, Zap, Download } from 'lucide-react';
import { VocabCard, LanguageCourse } from '../data/curriculum';
import { speakText } from '../utils/speech';
import { calculateSrsNextReview, isCardDue } from '../utils/srs';
import { PronunciationCheckerModal } from './vocab/PronunciationCheckerModal';
import { VocabPdfExportModal } from './vocab/VocabPdfExportModal';
import { SpeedMatchingGameModal } from './vocab/SpeedMatchingGameModal';
import { VocabImportExportModal } from './vocab/VocabImportExportModal';
import { VocabMasteryPieChart } from './vocab/VocabMasteryPieChart';

interface VocabVaultProps {
  course: LanguageCourse;
  cards: VocabCard[];
  onUpdateCard: (updatedCard: VocabCard) => void;
  onAddCard: (newCard: VocabCard) => void;
  onGainXp: (amount: number) => void;
  autoStartReview?: boolean;
}

export const VocabVaultView: React.FC<VocabVaultProps> = ({
  course,
  cards,
  onUpdateCard,
  onAddCard,
  onGainXp,
  autoStartReview = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPdfExportOpen, setIsPdfExportOpen] = useState(false);
  const [isSpeedGameOpen, setIsSpeedGameOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [pronunciationCard, setPronunciationCard] = useState<VocabCard | null>(null);

  const dueCards = cards.filter(c => isCardDue(c.nextReviewDate));

  useEffect(() => {
    if (autoStartReview && dueCards.length > 0 && !isReviewMode) {
      setReviewIndex(0);
      setIsCardFlipped(false);
      setIsReviewMode(true);
    }
  }, [autoStartReview, dueCards.length]);

  // New card form state
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newCategory, setNewCategory] = useState('Phỏng vấn & Công việc');
  const [newExample, setNewExample] = useState('');
  const [newExampleTranslation, setNewExampleTranslation] = useState('');

  const filteredCards = cards.filter(card => {
    const matchesCategory = selectedCategory === 'Tất cả' || card.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesWord = card.word.toLowerCase().includes(query);
    const matchesMeaning = card.meaning.toLowerCase().includes(query);
    const matchesRomanization = card.romanization ? card.romanization.toLowerCase().includes(query) : false;
    const matchesExample = card.exampleSentence ? card.exampleSentence.toLowerCase().includes(query) : false;
    const matchesTranslation = card.exampleTranslation ? card.exampleTranslation.toLowerCase().includes(query) : false;
    const matchesCategoryName = card.category ? card.category.toLowerCase().includes(query) : false;

    return matchesCategory && (matchesWord || matchesMeaning || matchesRomanization || matchesExample || matchesTranslation || matchesCategoryName);
  });

  const categories = ['Tất cả', ...Array.from(new Set(cards.map(c => c.category)))];

  const handlePlayAudio = (text: string) => {
    speakText(text, course.voiceLangCode, 0.85);
  };

  const handleSrsRate = (rating: number) => {
    const currentCard = dueCards[reviewIndex];
    if (!currentCard) return;

    const srsResult = calculateSrsNextReview(
      currentCard.repetitions,
      currentCard.easeFactor,
      currentCard.intervalDays,
      rating
    );

    const updatedCard: VocabCard = {
      ...currentCard,
      repetitions: srsResult.repetitions,
      easeFactor: srsResult.easeFactor,
      intervalDays: srsResult.intervalDays,
      nextReviewDate: srsResult.nextReviewDate,
      status: srsResult.status,
    };

    onUpdateCard(updatedCard);
    onGainXp(rating >= 3 ? 10 : 5);

    setIsCardFlipped(false);
    if (reviewIndex + 1 < dueCards.length) {
      setReviewIndex(reviewIndex + 1);
    } else {
      setIsReviewMode(false);
      setReviewIndex(0);
    }
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMeaning.trim()) return;

    const card: VocabCard = {
      id: `custom-${Date.now()}`,
      track: 'workplace',
      word: newWord.trim(),
      meaning: newMeaning.trim(),
      partOfSpeech: 'từ vựng',
      exampleSentence: newExample.trim() || newWord.trim(),
      exampleTranslation: newExampleTranslation.trim() || newMeaning.trim(),
      category: newCategory,
      easeFactor: 2.5,
      repetitions: 0,
      intervalDays: 0,
      nextReviewDate: new Date().toISOString(),
      status: 'New',
    };

    onAddCard(card);
    setNewWord('');
    setNewMeaning('');
    setNewExample('');
    setNewExampleTranslation('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Vault Header & Review Queue Prompt */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <Layers className="w-4 h-4" />
              <span>Kho Lưu Trữ Từ Vựng Lặp Lại Ngắt Quãng</span>
              <span aria-hidden="true">·</span>
              <span>Thuật toán trí nhớ SM-2 SuperMemo</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Bộ Thẻ Từ Vựng Thông Minh
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Ghi nhớ từ vựng vĩnh viễn vào trí nhớ dài hạn. Hệ thống tự động tính toán thời điểm sắp quên để nhắc bạn ôn tập đúng lúc.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsSpeedGameOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-all cursor-pointer"
              title="Chơi game đấu trường ghép từ vựng 60 giây"
              data-testid="speed-game-btn"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Ghép Từ 60s</span>
            </button>

            <button
              onClick={() => setIsPdfExportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Xuất danh sách từ vựng thành PDF hoặc bản in học tập offline"
              data-testid="export-pdf-btn"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Xuất PDF / In thẻ</span>
            </button>

            <button
              onClick={() => setIsBackupOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Sao lưu hoặc nhập từ vựng từ file JSON/CSV"
              data-testid="backup-data-btn"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Sao lưu / Nhập</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm từ mới</span>
            </button>

            {dueCards.length > 0 && !isReviewMode && (
              <button
                onClick={() => {
                  setReviewIndex(0);
                  setIsCardFlipped(false);
                  setIsReviewMode(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ôn tập thẻ đến hạn ({dueCards.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* SRS Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="text-[11px] font-medium text-slate-500">Tổng số thẻ từ</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">{cards.length}</div>
          </div>
          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <div className="text-[11px] font-medium text-indigo-700">Cần ôn hôm nay</div>
            <div className="text-lg font-bold text-indigo-900 tabular-nums">{dueCards.length}</div>
          </div>
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <div className="text-[11px] font-medium text-emerald-700">Đã nhớ sâu</div>
            <div className="text-lg font-bold text-emerald-900 tabular-nums">
              {cards.filter(c => c.status === 'Mastered').length}
            </div>
          </div>
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
            <div className="text-[11px] font-medium text-amber-700">Đang củng cố</div>
            <div className="text-lg font-bold text-amber-900 tabular-nums">
              {cards.filter(c => c.status === 'Learning' || c.status === 'New').length}
            </div>
          </div>
        </div>
      </div>

      {/* Vocab Mastery Distribution Chart (Recharts) */}
      <VocabMasteryPieChart cards={cards} />

      {/* Review Mode Interactive Flashcard Surface */}
      {isReviewMode && dueCards[reviewIndex] && (
        <div className="bg-white rounded-2xl border-2 border-indigo-500/80 p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1.5">
              <span>Thẻ {reviewIndex + 1} / {dueCards.length}</span>
              <span aria-hidden="true">·</span>
              <span>Chỉ số dễ nhớ (EF): {dueCards[reviewIndex].easeFactor.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setIsReviewMode(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Tạm dừng ôn tập
            </button>
          </div>

          <div className="py-10 text-center space-y-4 max-w-md mx-auto">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {dueCards[reviewIndex].word}
            </div>

            {dueCards[reviewIndex].romanization && (
              <div className="text-sm font-medium text-indigo-600">
                {dueCards[reviewIndex].romanization}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePlayAudio(dueCards[reviewIndex].word)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                title="Lắng nghe phát âm chuẩn"
              >
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Nghe phát âm</span>
              </button>

              <button
                type="button"
                onClick={() => setPronunciationCard(dueCards[reviewIndex])}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                title="Kiểm tra phát âm bằng giọng nói (Voice-to-Text Speech Recognition)"
                data-testid="review-pronounce-check-btn"
              >
                <Mic className="w-3.5 h-3.5 text-rose-600" />
                <span>Kiểm tra phát âm</span>
              </button>
            </div>

            {!isCardFlipped ? (
              <div className="pt-6">
                <button
                  onClick={() => setIsCardFlipped(true)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Lật thẻ xem nghĩa tiếng Việt
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-5 animate-in fade-in duration-200">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left">
                  <div className="text-xs font-semibold text-slate-500">Nghĩa tiếng Việt:</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">
                    {dueCards[reviewIndex].meaning}
                  </div>
                  {dueCards[reviewIndex].exampleSentence && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600">
                      <div><strong className="text-slate-800">Ví dụ câu:</strong> {dueCards[reviewIndex].exampleSentence}</div>
                      <div className="italic text-slate-500 mt-0.5">"{dueCards[reviewIndex].exampleTranslation}"</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-500">Bạn nhớ từ này thế nào?</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => handleSrsRate(1)}
                      className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <div>Quên hẳn</div>
                      <div className="text-[10px] font-normal opacity-75">Ôn lại sau 1 ngày</div>
                    </button>
                    <button
                      onClick={() => handleSrsRate(3)}
                      className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <div>Nhớ chập chờn</div>
                      <div className="text-[10px] font-normal opacity-75">Ôn lại sau 3 ngày</div>
                    </button>
                    <button
                      onClick={() => handleSrsRate(4)}
                      className="p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <div>Nhớ tốt</div>
                      <div className="text-[10px] font-normal opacity-75">Ôn lại sau 6 ngày</div>
                    </button>
                    <button
                      onClick={() => handleSrsRate(5)}
                      className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <div>Rất dễ</div>
                      <div className="text-[10px] font-normal opacity-75">12+ ngày nữa</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search & Category Filter Controls */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              placeholder="Tìm kiếm theo từ vựng, phiên âm, hoặc nghĩa..."
              className="w-full pl-9 pr-9 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              data-testid="vocab-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title="Xóa tìm kiếm"
                data-testid="clear-search-btn"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Summary Counter & Active Filter Badge */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700">
              Hiển thị <strong className="text-indigo-600 font-bold">{filteredCards.length}</strong> / {cards.length} thẻ từ vựng
            </span>
            {(searchQuery || selectedCategory !== 'Tất cả') && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium text-[11px] border border-indigo-100">
                <Filter className="w-3 h-3 text-indigo-500" />
                <span>Đang lọc</span>
              </span>
            )}
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline cursor-pointer"
            >
              Xóa từ khóa "{searchQuery}"
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid or Empty Search State */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto my-6 space-y-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-500">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Không tìm thấy từ vựng phù hợp</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Không tìm thấy từ nào khớp với từ khóa <span className="font-semibold text-slate-800">"{searchQuery}"</span>
            {selectedCategory !== 'Tất cả' && <span> trong danh mục <span className="font-semibold text-slate-800">"{selectedCategory}"</span></span>}.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Xóa từ khóa
              </button>
            )}
            {selectedCategory !== 'Tất cả' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('Tất cả')}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Xem tất cả danh mục
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredCards.map((card) => {
            const isDue = isCardDue(card.nextReviewDate);
            return (
              <div
                key={card.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-indigo-600">
                      {card.category}
                    </span>
                    <span className={`text-[11px] font-medium ${
                      card.status === 'Mastered' ? 'text-emerald-600' :
                      card.status === 'Reviewing' ? 'text-indigo-600' : 'text-slate-500'
                    }`}>
                      {card.status === 'Mastered' ? 'Đã thành thạo' : card.status === 'Reviewing' ? 'Đang ôn định kỳ' : 'Từ mới'}
                    </span>
                  </div>

                  <div className="text-base font-bold text-slate-900">
                    {card.word}
                  </div>

                  {card.romanization && (
                    <div className="text-xs font-medium text-slate-500 mt-0.5">
                      {card.romanization}
                    </div>
                  )}

                  <div className="text-xs font-semibold text-slate-800 mt-2">
                    {card.meaning}
                  </div>

                  {card.exampleSentence && (
                    <div className="text-[11px] text-slate-600 mt-2 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      "{card.exampleSentence}"
                      <div className="text-slate-400 font-normal not-italic mt-0.5">"{card.exampleTranslation}"</div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(card.word)}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-md transition-colors cursor-pointer"
                      aria-label={`Phát âm ${card.word}`}
                      title="Nghe phát âm chuẩn"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setPronunciationCard(card)}
                      className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-md transition-colors cursor-pointer"
                      aria-label={`Kiểm tra phát âm từ ${card.word}`}
                      title="Kiểm tra phát âm bằng giọng nói (Voice-to-Text)"
                      data-testid={`card-mic-btn-${card.id}`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{isDue ? 'Cần ôn hôm nay' : `Sau ${card.intervalDays} ngày`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Word Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold text-slate-900 mb-1">Thêm Từ Mới Vào Kho Thẻ Nhớ</h2>
            <p className="text-xs text-slate-500 mb-4">Lưu lại từ vựng bạn vừa học được trong lúc làm việc hoặc giao tiếp</p>

            <form onSubmit={handleCreateCard} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Từ hoặc cụm từ ({course.vietnameseName})</label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="Ví dụ: Deliverable, 合作共赢..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Nghĩa tiếng Việt</label>
                <input
                  type="text"
                  required
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="Ví dụ: Sản phẩm bàn giao dự án..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Chủ đề phân loại</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Phỏng vấn & Công việc">Phỏng vấn & Công việc</option>
                  <option value="Học thuật & Thi cử">Học thuật & Thi cử</option>
                  <option value="Đời sống thường ngày">Đời sống thường ngày</option>
                  <option value="Thương mại & Đàm phán">Thương mại & Đàm phán</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Câu ví dụ thực tế</label>
                <input
                  type="text"
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="Câu chứa từ vựng trên"
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Lưu vào kho thẻ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Voice-to-Text Pronunciation Checker Modal */}
      {pronunciationCard && (
        <PronunciationCheckerModal
          card={pronunciationCard}
          course={course}
          isOpen={!!pronunciationCard}
          onClose={() => setPronunciationCard(null)}
          onSuccessXP={onGainXp}
        />
      )}

      {/* Export to PDF & Printable Study Sheet Modal */}
      <VocabPdfExportModal
        isOpen={isPdfExportOpen}
        onClose={() => setIsPdfExportOpen(false)}
        cards={cards}
        filteredCards={filteredCards}
        course={course}
        currentCategory={selectedCategory}
        searchQuery={searchQuery}
      />

      {/* Speed Matching 60s Game Modal */}
      <SpeedMatchingGameModal
        isOpen={isSpeedGameOpen}
        onClose={() => setIsSpeedGameOpen(false)}
        cards={cards}
        course={course}
        onGainXp={onGainXp}
      />

      {/* Vocab Backup & Deck Import Modal */}
      <VocabImportExportModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        cards={cards}
        onImportCards={(newCards) => {
          newCards.forEach((card) => onAddCard(card));
        }}
      />
    </div>
  );
};
