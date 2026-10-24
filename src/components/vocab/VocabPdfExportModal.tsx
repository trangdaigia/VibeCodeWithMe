import React, { useState } from 'react';
import { Printer, FileText, Check, X, Layers, Filter, Sparkles, LayoutGrid, Table } from 'lucide-react';
import { VocabCard, LanguageCourse } from '../../data/curriculum';
import { isCardDue } from '../../utils/srs';

interface VocabPdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: VocabCard[];
  filteredCards: VocabCard[];
  course: LanguageCourse;
  currentCategory: string;
  searchQuery: string;
}

export const VocabPdfExportModal: React.FC<VocabPdfExportModalProps> = ({
  isOpen,
  onClose,
  cards,
  filteredCards,
  course,
  currentCategory,
  searchQuery,
}) => {
  const [exportScope, setExportScope] = useState<'filtered' | 'all' | 'due'>('filtered');
  const [layoutType, setLayoutType] = useState<'cards_2col' | 'table' | 'cards_3col'>('cards_2col');
  const [includeExamples, setIncludeExamples] = useState(true);
  const [includeStatus, setIncludeStatus] = useState(true);

  if (!isOpen) return null;

  const dueCards = cards.filter((c) => isCardDue(c.nextReviewDate));

  let targetCards: VocabCard[] = [];
  if (exportScope === 'filtered') {
    targetCards = filteredCards;
  } else if (exportScope === 'due') {
    targetCards = dueCards;
  } else {
    targetCards = cards;
  }

  const handleTriggerPrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <>
      {/* Interactive Modal UI */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs no-print animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
          {/* Modal Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Xuất File PDF &amp; In Thẻ Học Tập
                </h2>
                <p className="text-xs text-slate-500">
                  Tạo tài liệu in ấn chuẩn khổ giấy A4 để học offline &amp; ôn tập thẻ từ vựng mọi lúc
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content / Controls & Live Preview */}
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {/* Control 1: Scope Selection */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                1. Chọn phạm vi từ vựng xuất PDF
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setExportScope('filtered')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    exportScope === 'filtered'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-600 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Đang lọc / Tìm kiếm</span>
                    {exportScope === 'filtered' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal mt-1">
                    {filteredCards.length} từ vựng
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setExportScope('all')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    exportScope === 'all'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-600 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Toàn bộ kho thẻ</span>
                    {exportScope === 'all' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal mt-1">
                    {cards.length} từ vựng
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setExportScope('due')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    exportScope === 'due'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-600 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Cần ôn hôm nay</span>
                    {exportScope === 'due' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal mt-1">
                    {dueCards.length} từ vựng
                  </div>
                </button>
              </div>
            </div>

            {/* Control 2: Layout Type */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                2. Định dạng bố cục tài liệu PDF
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setLayoutType('cards_2col')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    layoutType === 'cards_2col'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-xs">Thẻ Flashcard (2 Cột)</div>
                    <div className="text-[10px] text-slate-500 font-normal">Thích hợp cắt thẻ giấy</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLayoutType('table')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    layoutType === 'table'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Table className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-xs">Bảng Tổng Hợp</div>
                    <div className="text-[10px] text-slate-500 font-normal">Dạng danh sách tra cứu</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLayoutType('cards_3col')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    layoutType === 'cards_3col'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-xs">Thẻ Nhỏ Mini (3 Cột)</div>
                    <div className="text-[10px] text-slate-500 font-normal">Tiết kiệm diện tích in</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Control 3: Toggles */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeExamples}
                  onChange={(e) => setIncludeExamples(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Bao gồm câu ví dụ thực tế &amp; bản dịch</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeStatus}
                  onChange={(e) => setIncludeStatus(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Hiển thị danh mục &amp; độ thành thạo SM-2</span>
              </label>
            </div>

            {/* Mini Live Preview Summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>
                  Sẵn sàng xuất <strong>{targetCards.length}</strong> thẻ từ vựng ({course.vietnameseName}) sang PDF
                </span>
              </div>
              <span className="font-semibold text-slate-800">Khổ giấy A4</span>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={handleTriggerPrint}
              disabled={targetCards.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
              data-testid="start-pdf-print-btn"
            >
              <Printer className="w-4 h-4" />
              <span>In Ngay / Tải File PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Area (Invisible in UI, only visible during window.print()) */}
      <div className="printable-vocab-area hidden print:block">
        <div className="mb-6 pb-4 border-b-2 border-slate-900 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              LinguaFlow — Bộ Thẻ Từ Vựng Học Tập
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Ngôn ngữ: <strong>{course.vietnameseName} ({course.name})</strong> · Thuật toán ghi nhớ ngắt quãng SM-2
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>Ngày xuất PDF: {todayStr}</div>
            <div>Tổng số thẻ: <strong>{targetCards.length}</strong></div>
          </div>
        </div>

        {/* Layout Render 1: Table View */}
        {layoutType === 'table' && (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 font-bold text-slate-800">
                <th className="p-2.5 w-8">#</th>
                <th className="p-2.5 w-1/4">Từ Vựng / IPA</th>
                <th className="p-2.5 w-1/4">Nghĩa Tiếng Việt</th>
                {includeExamples && <th className="p-2.5">Ví Dụ &amp; Bản Dịch</th>}
                {includeStatus && <th className="p-2.5 w-28 text-right">Danh Mục / SRS</th>}
              </tr>
            </thead>
            <tbody>
              {targetCards.map((card, idx) => (
                <tr key={card.id} className="border-b border-slate-200 page-break-avoid">
                  <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                  <td className="p-2.5">
                    <div className="font-bold text-slate-900 text-sm">{card.word}</div>
                    {card.romanization && (
                      <div className="text-slate-500 text-[11px] font-mono">{card.romanization}</div>
                    )}
                  </td>
                  <td className="p-2.5 font-bold text-slate-800">{card.meaning}</td>
                  {includeExamples && (
                    <td className="p-2.5 text-slate-600">
                      {card.exampleSentence ? (
                        <>
                          <div>"{card.exampleSentence}"</div>
                          <div className="text-slate-500 italic mt-0.5">"{card.exampleTranslation}"</div>
                        </>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>
                  )}
                  {includeStatus && (
                    <td className="p-2.5 text-right text-[11px]">
                      <div className="font-semibold text-slate-700">{card.category}</div>
                      <div className="text-slate-500">{card.status}</div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Layout Render 2: 2-Column Cards Grid */}
        {layoutType === 'cards_2col' && (
          <div className="grid grid-cols-2 gap-4">
            {targetCards.map((card, idx) => (
              <div
                key={card.id}
                className="border-2 border-slate-300 rounded-xl p-4 flex flex-col justify-between page-break-avoid min-h-36 bg-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 text-[10px] text-slate-500 pb-1 border-b border-slate-100">
                    <span># {idx + 1} · {card.category}</span>
                    <span>{card.status}</span>
                  </div>
                  <div className="text-lg font-black text-slate-900 mt-2">{card.word}</div>
                  {card.romanization && (
                    <div className="text-xs font-semibold text-indigo-700 mt-0.5">{card.romanization}</div>
                  )}
                  <div className="text-xs font-bold text-slate-800 mt-2">{card.meaning}</div>
                </div>

                {includeExamples && card.exampleSentence && (
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-600 leading-snug">
                    <div>"{card.exampleSentence}"</div>
                    <div className="text-slate-500 italic mt-0.5">"{card.exampleTranslation}"</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Layout Render 3: 3-Column Compact Flashcards */}
        {layoutType === 'cards_3col' && (
          <div className="grid grid-cols-3 gap-3">
            {targetCards.map((card, idx) => (
              <div
                key={card.id}
                className="border border-slate-300 rounded-lg p-3 page-break-avoid bg-white"
              >
                <div className="text-[9px] text-slate-400 font-mono"># {idx + 1}</div>
                <div className="text-base font-extrabold text-slate-900 mt-1">{card.word}</div>
                {card.romanization && (
                  <div className="text-[11px] font-semibold text-indigo-700">{card.romanization}</div>
                )}
                <div className="text-xs font-bold text-slate-800 mt-1.5">{card.meaning}</div>
                {includeExamples && card.exampleSentence && (
                  <div className="mt-2 text-[10px] text-slate-500 italic truncate border-t border-slate-100 pt-1">
                    "{card.exampleSentence}"
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-slate-300 text-center text-slate-400 text-[10px]">
          Tài liệu học tập offline LinguaFlow — Tối ưu hóa trí nhớ ngắt quãng SM-2 SuperMemo
        </div>
      </div>
    </>
  );
};
