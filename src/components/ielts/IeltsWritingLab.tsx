import React, { useState, useMemo } from 'react';
import {
  PenTool,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { WritingModelPrompt } from '../../data/curriculum';

interface IeltsWritingLabProps {
  prompts: WritingModelPrompt[];
  examModuleTrack: 'academic' | 'general-training';
  onGainXp: (amount: number) => void;
}

export const IeltsWritingLab: React.FC<IeltsWritingLabProps> = ({
  prompts,
  examModuleTrack,
  onGainXp
}) => {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [userText, setUserText] = useState('');
  const [toneFilter, setToneFilter] = useState<'all' | 'Formal' | 'Semi-formal' | 'Informal' | 'Task 2'>('all');
  const [showModelComparison, setShowModelComparison] = useState(false);
  const [activeScaffoldTab, setActiveScaffoldTab] = useState<'outline' | 'vocabulary' | 'starters'>('outline');
  const [isCopied, setIsCopied] = useState(false);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(p => {
      if (toneFilter === 'all') return true;
      if (toneFilter === 'Task 2') return p.taskType === 'Task 2';
      return p.letterTone === toneFilter;
    });
  }, [prompts, toneFilter]);

  const activePrompt: WritingModelPrompt | undefined = filteredPrompts[selectedPromptIndex] || filteredPrompts[0];

  const isTask1 = activePrompt?.taskType === 'Task 1';
  const targetMinWords = isTask1 ? 150 : 250;
  const isGt = examModuleTrack === 'general-training';

  // Words count analysis
  const words = useMemo(() => {
    const trimmed = userText.trim();
    return trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  }, [userText]);

  const wordCount = words.length;

  // Paragraphs
  const paragraphs = useMemo(() => {
    return userText.split(/\n+/).filter(p => p.trim().length > 0);
  }, [userText]);

  // Contractions check for Formal Tone
  const contractionsRegex = /\b(don't|can't|won't|isn't|aren't|didn't|haven't|hasn't|it's|i'm|we're|they're|couldn't|shouldn't|gonna|wanna|y'all)\b/gi;
  const foundContractions = useMemo(() => {
    const matches = userText.match(contractionsRegex) || [];
    return Array.from(new Set(matches.map(c => c.toLowerCase())));
  }, [userText]);

  const hasContractionWarning = activePrompt?.letterTone === 'Formal' && foundContractions.length > 0;

  // Cohesion linkers
  const highBandLinkers = [
    'furthermore', 'moreover', 'in addition', 'consequently', 'therefore',
    'however', 'nevertheless', 'on the other hand', 'in contrast', 'for instance',
    'for example', 'to illustrate', 'to conclude', 'in conclusion', 'first and foremost',
    'subsequently', 'as a result', 'in particular', 'notably', 'conversely'
  ];

  const detectedLinkers = useMemo(() => {
    const textLower = userText.toLowerCase();
    return highBandLinkers.filter(linker => textLower.includes(linker));
  }, [userText]);

  // Word count status
  const getWordCountStatus = () => {
    if (wordCount === 0) return { label: 'Chưa nhập văn bản', color: 'text-slate-400 bg-slate-100', progress: 0 };
    if (wordCount < targetMinWords - 20) {
      return {
        label: `Thiếu ${targetMinWords - wordCount} từ (Cảnh báo: Bị trừ điểm nặng ở Task Response/Achievement)`,
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        progress: (wordCount / targetMinWords) * 100
      };
    }
    if (wordCount < targetMinWords) {
      return {
        label: `Gần đạt chuẩn: Còn thiếu ${targetMinWords - wordCount} từ`,
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        progress: (wordCount / targetMinWords) * 100
      };
    }
    const maxRecommended = isTask1 ? 210 : 330;
    if (wordCount <= maxRecommended) {
      return {
        label: `Đạt chuẩn độ dài lý tưởng (${wordCount} từ)`,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        progress: 100
      };
    }
    return {
      label: `Vượt khuyến nghị (${wordCount} từ - Cẩn thận thiếu thời gian làm bài khác)`,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      progress: 100
    };
  };

  const status = getWordCountStatus();

  const handleCopyText = () => {
    if (userText) {
      navigator.clipboard.writeText(userText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleInsertStarter = (starterText: string) => {
    setUserText(prev => prev ? `${prev}\n\n${starterText}` : starterText);
  };

  const handleEvaluate = () => {
    setHasEvaluated(true);
    if (wordCount >= targetMinWords) {
      onGainXp(30);
    }
  };

  if (!activePrompt) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-500">Chưa có đề bài viết nào được tìm thấy.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Phòng Luyện Viết Tương Tác (Interactive IELTS Writing Lab)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bộ gõ chuẩn thi máy IDP/BC · Đo đếm số từ trực tiếp · Cảnh báo văn phong & bẫy ngữ pháp
                </p>
              </div>
            </div>
          </div>

          {/* Tone Filters */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 flex-wrap">
            <button
              onClick={() => { setToneFilter('all'); setSelectedPromptIndex(0); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                toneFilter === 'all' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả đề ({prompts.length})
            </button>
            {isGt ? (
              <>
                <button
                  onClick={() => { setToneFilter('Formal'); setSelectedPromptIndex(0); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    toneFilter === 'Formal' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Thư Formal
                </button>
                <button
                  onClick={() => { setToneFilter('Semi-formal'); setSelectedPromptIndex(0); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    toneFilter === 'Semi-formal' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semi-formal
                </button>
                <button
                  onClick={() => { setToneFilter('Informal'); setSelectedPromptIndex(0); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    toneFilter === 'Informal' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Informal
                </button>
              </>
            ) : null}
            <button
              onClick={() => { setToneFilter('Task 2'); setSelectedPromptIndex(0); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                toneFilter === 'Task 2' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Task 2 Essay
            </button>
          </div>
        </div>

        {/* Prompt Selector Pills */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          {filteredPrompts.map((p, idx) => {
            const isSelected = selectedPromptIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPromptIndex(idx);
                  setHasEvaluated(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{p.taskType}: {p.title}</span>
                {p.letterTone && (
                  <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {p.letterTone}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Prompt & Scaffolding Guides */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Prompt Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                  Đề Bài Thi ({activePrompt.taskType})
                </span>
                {activePrompt.letterTone && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    activePrompt.letterTone === 'Formal' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                    activePrompt.letterTone === 'Semi-formal' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                    'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {activePrompt.letterTone} Tone
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-slate-500">
                Tối thiểu {targetMinWords} từ
              </span>
            </div>

            <div className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
              {activePrompt.prompt}
            </div>

            {activePrompt.taskType === 'Task 1' && isGt && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>Quy tắc viết thư GT ({activePrompt.letterTone || 'Thư'}):</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {activePrompt.letterTone === 'Formal' && 'Bắt đầu bằng "Dear Sir or Madam," hoặc "Dear Mr./Ms. [Họ]". Tuyệt đối KHÔNG viết tắt (KHÔNG dùng don\'t, can\'t, I\'m...). Kết thúc bằng "Yours faithfully," hoặc "Yours sincerely,".'}
                  {activePrompt.letterTone === 'Semi-formal' && 'Bắt đầu bằng "Dear [Tên]", giọng điệu lịch sự nhã nhặn. Hạn chế từ lóng. Kết thư bằng "Warm regards," hoặc "Best regards,".'}
                  {activePrompt.letterTone === 'Informal' && 'Bắt đầu bằng "Dear [Tên bạn],", được phép dùng từ ngữ thân mật, viết tắt (I\'m, we\'ll). Kết thư bằng "Best wishes," hoặc "All the best,".'}
                </p>
              </div>
            )}
          </div>

          {/* Scaffolding Tabs (PEEL Outline, Lexical Bank, Starters) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveScaffoldTab('outline')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeScaffoldTab === 'outline' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Dàn Ý PEEL
                </button>
                <button
                  onClick={() => setActiveScaffoldTab('vocabulary')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeScaffoldTab === 'vocabulary' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Từ Vựng C1/C2
                </button>
                <button
                  onClick={() => setActiveScaffoldTab('starters')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeScaffoldTab === 'starters' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Mẫu Câu Gợi Ý
                </button>
              </div>
            </div>

            {/* TAB 1: PEEL Outline */}
            {activeScaffoldTab === 'outline' && (
              <div className="space-y-2">
                {activePrompt.outline.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="font-bold text-indigo-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <span>{item.point}</span>
                    </div>
                    <div className="text-slate-600 text-[11px] mt-1 leading-relaxed pl-3">
                      {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: Vocabulary */}
            {activeScaffoldTab === 'vocabulary' && (
              <div className="space-y-2">
                {activePrompt.keyVocabulary.map((v, idx) => (
                  <div key={idx} className="p-2 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-950">{v.word}</span>
                      {v.phonetic && <span className="text-[11px] font-mono text-slate-500">{v.phonetic}</span>}
                    </div>
                    <div className="text-slate-600 text-[11px] mt-0.5">{v.meaning}</div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Sentence Starters */}
            {activeScaffoldTab === 'starters' && (
              <div className="space-y-2">
                <p className="text-[11px] text-slate-500">
                  Nhấp vào mẫu câu bên dưới để chèn nhanh vào trình soạn thảo bài viết:
                </p>
                {(isTask1 ? [
                  'Dear Sir or Madam,',
                  'I am writing to formally express my dissatisfaction with...',
                  'I am writing to inquire about the details regarding...',
                  'I would be extremely grateful if you could kindly consider...',
                  'Thank you for your time and prompt attention to this matter.',
                  'Yours faithfully,'
                ] : [
                  'In contemporary society, there is an intensifying debate regarding whether...',
                  'This essay will examine both perspectives before presenting my firm conviction.',
                  'First and foremost, a compelling argument in favor of this trend is that...',
                  'Furthermore, empirical evidence demonstrates that...',
                  'On the other hand, opponents contend that this approach may lead to...',
                  'In conclusion, having weighed both sides, I firmly maintain that...'
                ]).map((starter, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleInsertStarter(starter)}
                    className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200/60 text-xs text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate pr-2 italic">"{starter}"</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Interactive Textarea & Real-Time Diagnostics */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            {/* Live Counter & Status Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">
                  Số từ: <span className="font-mono text-sm text-indigo-600 font-extrabold">{wordCount}</span> / {targetMinWords} từ
                </span>
                <span className="text-xs text-slate-500">
                  · {paragraphs.length} đoạn văn
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                  title="Sao chép bài viết"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>

                <button
                  onClick={() => setUserText('')}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-rose-600 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                  title="Xóa viết lại"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xóa</span>
                </button>
              </div>
            </div>

            {/* Word Count Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    wordCount < targetMinWords - 20
                      ? 'bg-rose-500'
                      : wordCount < targetMinWords
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (wordCount / targetMinWords) * 100)}%` }}
                />
              </div>

              <div className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${status.color}`}>
                {wordCount >= targetMinWords ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                )}
                <span>{status.label}</span>
              </div>
            </div>

            {/* Editor Area */}
            <div className="relative">
              <textarea
                value={userText}
                onChange={e => setUserText(e.target.value)}
                placeholder={
                  isTask1
                    ? 'Bắt đầu viết thư tại đây (ví dụ: Dear Sir or Madam,...)... Chú ý kiểm soát độ dài tối thiểu 150 từ và chia thành các đoạn rõ ràng.'
                    : 'Bắt đầu bài luận tại đây (Introduction, Body Paragraph 1, Body Paragraph 2, Conclusion)... Mục tiêu tối thiểu 250 từ.'
                }
                rows={14}
                className="w-full p-4 text-xs sm:text-sm font-sans text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden leading-relaxed resize-y placeholder:text-slate-400"
              />
            </div>

            {/* Formal Tone Contraction Warning */}
            {hasContractionWarning && (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Lỗi Văn Phong Formal: Phát hiện từ viết tắt!</div>
                  <div className="text-[11px] mt-0.5 leading-relaxed">
                    Bạn đang sử dụng các từ viết tắt: <code className="font-mono font-bold text-rose-700 bg-rose-100 px-1 py-0.2 rounded">{foundContractions.join(', ')}</code>.
                    Trong thư Formal của IELTS General, giám khảo sẽ trừ điểm nặng ở tiêu chí Grammatical Range and Accuracy nếu không viết dạng đầy đủ (ví dụ: thay "don't" bằng "do not", "can't" bằng "cannot").
                  </div>
                </div>
              </div>
            )}

            {/* Diagnostic Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setShowModelComparison(!showModelComparison)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showModelComparison ? 'Ẩn Bài Mẫu Band 9.0' : 'So Sánh Với Bài Mẫu Band 9.0'}</span>
              </button>

              <button
                onClick={handleEvaluate}
                disabled={wordCount === 0}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Chấm Điểm Thử Nghiệm</span>
              </button>
            </div>

            {/* Diagnostic Results Box */}
            {hasEvaluated && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 mt-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <span className="font-bold text-slate-900 uppercase">
                    Báo Cáo Phân Tích Tiêu Chí Chấm Thi
                  </span>
                  <span className="font-bold text-indigo-600">
                    {wordCount >= targetMinWords ? 'Đủ điều kiện Band 7.0+' : 'Cần bổ sung thêm từ'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Criterion 1: Task Response */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>1. Task Achievement / Response:</span>
                      {wordCount >= targetMinWords ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      {wordCount >= targetMinWords
                        ? `Đạt ${wordCount}/${targetMinWords} từ chuẩn. Không bị phạt lỗi Underlength penalty.`
                        : `Thiếu ${targetMinWords - wordCount} từ. Bị giới hạn điểm Task Achievement ở Band 5.0.`}
                    </div>
                  </div>

                  {/* Criterion 2: Coherence & Cohesion */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>2. Coherence & Cohesion:</span>
                      {paragraphs.length >= 3 ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      {paragraphs.length >= 3
                        ? `Phân chia tốt ${paragraphs.length} đoạn văn logic.`
                        : 'Văn bản cần chia tối thiểu 3-4 đoạn để đạt điểm Coherence.'}
                      {detectedLinkers.length > 0 && (
                        <div className="text-indigo-600 font-medium mt-0.5">
                          Từ nối phát hiện ({detectedLinkers.length}): {detectedLinkers.slice(0, 4).join(', ')}...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Criterion 3: Tone & Register */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>3. Văn phong (Tone & Register):</span>
                      {!hasContractionWarning ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      {hasContractionWarning
                        ? 'Cảnh báo: Có từ viết tắt trong thư Formal.'
                        : 'Không có lỗi viết tắt vi phạm quy chuẩn thư trang trọng.'}
                    </div>
                  </div>

                  {/* Criterion 4: Lexical Variety */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>4. Lexical Resource (Từ Vựng):</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Khuyến khích vận dụng các collocation C1/C2 từ danh sách bên trái để nâng điểm lên Band 8.0+.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side-by-side Band 9.0 Model Comparison */}
          {showModelComparison && (
            <div className="bg-emerald-50/40 rounded-2xl border border-emerald-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    Bài Viết Mẫu Band 9.0 Chuẩn Giám Khảo Cambridge
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Band Score 9.0
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line bg-white/90 p-4 rounded-xl border border-emerald-100">
                {activePrompt.modelAnswer}
              </div>

              <div className="p-3 bg-emerald-100/60 rounded-xl text-xs text-emerald-950 space-y-1">
                <div className="font-bold text-emerald-900">Nhận xét của Giám Khảo (Examiner's Commentary):</div>
                <p className="text-[11px] leading-relaxed">{activePrompt.examinerComment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
