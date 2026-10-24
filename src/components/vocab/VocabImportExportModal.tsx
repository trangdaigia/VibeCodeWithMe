import React, { useState } from 'react';
import { Download, Upload, FileCode, FileSpreadsheet, Check, X, AlertCircle, FileText } from 'lucide-react';
import { VocabCard } from '../../data/curriculum';

interface VocabImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: VocabCard[];
  onImportCards: (newCards: VocabCard[]) => void;
}

export const VocabImportExportModal: React.FC<VocabImportExportModalProps> = ({
  isOpen,
  onClose,
  cards,
  onImportCards,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [pasteData, setPasteData] = useState('');
  const [importPreview, setImportPreview] = useState<VocabCard[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [importSuccessCount, setImportSuccessCount] = useState<number | null>(null);

  if (!isOpen) return null;

  // Export as JSON
  const handleExportJson = () => {
    const jsonString = JSON.stringify(cards, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linguaflow-vocab-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export as CSV
  const handleExportCsv = () => {
    const headers = ['Word', 'Romanization', 'Meaning', 'Category', 'Example', 'Translation'];
    const rows = cards.map((c) => [
      `"${(c.word || '').replace(/"/g, '""')}"`,
      `"${(c.romanization || '').replace(/"/g, '""')}"`,
      `"${(c.meaning || '').replace(/"/g, '""')}"`,
      `"${(c.category || '').replace(/"/g, '""')}"`,
      `"${(c.exampleSentence || '').replace(/"/g, '""')}"`,
      `"${(c.exampleTranslation || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linguaflow-vocab-cards-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Parse JSON or CSV text from paste or file
  const handleParseImportText = (text: string) => {
    setErrorMessage('');
    setImportSuccessCount(null);

    if (!text.trim()) {
      setImportPreview([]);
      return;
    }

    try {
      // Try JSON parsing first
      if (text.trim().startsWith('[') || text.trim().startsWith('{')) {
        const parsed = JSON.parse(text);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        const validCards: VocabCard[] = list
          .filter((item) => item && typeof item === 'object' && item.word && item.meaning)
          .map((item, idx) => ({
            id: `imported-${Date.now()}-${idx}`,
            track: item.track || 'workplace',
            word: String(item.word).trim(),
            meaning: String(item.meaning).trim(),
            romanization: item.romanization ? String(item.romanization).trim() : undefined,
            partOfSpeech: item.partOfSpeech || 'từ vựng',
            exampleSentence: item.exampleSentence ? String(item.exampleSentence).trim() : String(item.word).trim(),
            exampleTranslation: item.exampleTranslation ? String(item.exampleTranslation).trim() : String(item.meaning).trim(),
            category: item.category || 'Từ vựng nhập từ file',
            easeFactor: 2.5,
            repetitions: 0,
            intervalDays: 0,
            nextReviewDate: new Date().toISOString(),
            status: 'New',
          }));

        if (validCards.length === 0) {
          setErrorMessage('Dữ liệu JSON không chứa các trường bắt buộc "word" và "meaning".');
        } else {
          setImportPreview(validCards);
        }
      } else {
        // Parse CSV lines: Word, Meaning or Word, Romanization, Meaning...
        const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
        const parsedCards: VocabCard[] = [];

        lines.forEach((line, idx) => {
          if (idx === 0 && line.toLowerCase().includes('word')) return; // skip header
          const parts = line.split(',').map((p) => p.replace(/^"|"$/g, '').trim());
          if (parts.length >= 2 && parts[0] && parts[1]) {
            parsedCards.push({
              id: `imported-csv-${Date.now()}-${idx}`,
              track: 'workplace',
              word: parts[0],
              meaning: parts[1],
              romanization: parts[2] || undefined,
              partOfSpeech: 'từ vựng',
              exampleSentence: parts[0],
              exampleTranslation: parts[1],
              category: 'Từ vựng nhập CSV',
              easeFactor: 2.5,
              repetitions: 0,
              intervalDays: 0,
              nextReviewDate: new Date().toISOString(),
              status: 'New',
            });
          }
        });

        if (parsedCards.length === 0) {
          setErrorMessage('Không thể đọc dữ liệu CSV. Định dạng yêu cầu: "Word, Meaning" ở mỗi dòng.');
        } else {
          setImportPreview(parsedCards);
        }
      }
    } catch (err) {
      setErrorMessage('Lỗi cú pháp định dạng JSON/CSV. Vui lòng kiểm tra lại cấu trúc dữ liệu.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setPasteData(content);
        handleParseImportText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (importPreview.length === 0) return;
    onImportCards(importPreview);
    setImportSuccessCount(importPreview.length);
    setImportPreview([]);
    setPasteData('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Sao Lưu &amp; Nhập Dữ Liệu Từ Vựng
              </h2>
              <p className="text-xs text-slate-500">
                Xuất file JSON/CSV để lưu trữ hoặc nhập danh sách từ vựng Anki / Quizlet
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-4 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'export' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Dữ Liệu (Backup)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'import' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Nhập Từ Vựng Mới</span>
          </button>
        </div>

        {/* Tab 1: Export Content */}
        {activeTab === 'export' && (
          <div className="py-6 space-y-4 text-center">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 max-w-md mx-auto">
              <div className="text-xs font-bold text-slate-800">
                Kho thẻ hiện tại có <span className="text-indigo-600 font-extrabold">{cards.length}</span> thẻ từ vựng
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Xuất định dạng JSON để backup đầy đủ hoặc CSV để xem trên Microsoft Excel / Google Sheets
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
              <button
                type="button"
                onClick={handleExportJson}
                className="p-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 rounded-2xl transition-all cursor-pointer text-left space-y-2"
              >
                <FileCode className="w-6 h-6 text-indigo-600" />
                <div>
                  <div className="text-xs font-bold">Xuất File JSON</div>
                  <div className="text-[10px] text-indigo-700 font-normal mt-0.5">Lưu trọn vẹn thuật toán SM-2</div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                className="p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-2xl transition-all cursor-pointer text-left space-y-2"
              >
                <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold">Xuất File CSV / Excel</div>
                  <div className="text-[10px] text-emerald-700 font-normal mt-0.5">Dễ dàng mở trên Excel</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Import Content */}
        {activeTab === 'import' && (
          <div className="py-4 space-y-3 overflow-y-auto flex-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">Tải file từ máy tính hoặc dán dữ liệu vào ô bên dưới:</label>
              <label className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Chọn File JSON/CSV</span>
                <input type="file" accept=".json,.csv,.txt" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <textarea
              rows={5}
              value={pasteData}
              onChange={(e) => {
                setPasteData(e.target.value);
                handleParseImportText(e.target.value);
              }}
              placeholder={`Ví dụ dán nội dung CSV:\nDeliverable, Sản phẩm bàn giao\nResilient, Khả năng phục hồi nhanh\n\nHoặc dán mảng JSON:\n[{"word": "Initiative", "meaning": "Sáng kiến"}]`}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {importSuccessCount !== null && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đã thêm thành công <strong>{importSuccessCount}</strong> từ vựng mới vào kho thẻ!</span>
              </div>
            )}

            {importPreview.length > 0 && (
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-indigo-900 flex items-center justify-between">
                  <span>Xem trước: Tìm thấy {importPreview.length} thẻ từ hợp lệ</span>
                  <span className="text-[10px] text-indigo-700 font-normal">Sẵn sàng nhập</span>
                </div>
                <div className="max-h-28 overflow-y-auto space-y-1 text-[11px] text-slate-700 font-mono bg-white p-2 rounded-lg border border-indigo-100">
                  {importPreview.slice(0, 5).map((card, idx) => (
                    <div key={idx} className="truncate">
                      <strong>{card.word}</strong>: {card.meaning}
                    </div>
                  ))}
                  {importPreview.length > 5 && (
                    <div className="text-slate-400 italic">... và {importPreview.length - 5} từ khác.</div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleConfirmImport}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Xác Nhận Nhập {importPreview.length} Từ Vựng Này
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
