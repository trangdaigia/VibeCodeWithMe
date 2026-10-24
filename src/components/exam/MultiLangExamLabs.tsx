import React, { useState, useEffect, useMemo } from 'react';
import {
  PenTool,
  Mic,
  Volume2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Calculator,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Search,
  Award,
  Layers,
  Clock,
  FileText
} from 'lucide-react';
import {
  LanguageCourse,
  WritingModelPrompt,
  SpeakingCueCard
} from '../../data/curriculum';
import {
  LanguageExamMetadata,
  calculateMultiLangCertificateScore
} from '../../data/multiLangExamData';
import { speakText } from '../../utils/speech';
import { WritingChartViewer } from './WritingChartViewer';

/* ============================================================================
 * 1. MULTI-LANGUAGE EXAM WRITING LAB (HSK 书写, JLPT Business Mail, TOPIK 쓰기, DELF, Goethe, DELE)
 * ============================================================================ */
export const MultiLangWritingLab: React.FC<{
  course: LanguageCourse;
  meta: LanguageExamMetadata;
  prompts: WritingModelPrompt[];
  onGainXp: (amount: number) => void;
}> = ({ course, meta, prompts, onGainXp }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [userDraft, setUserDraft] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setSelectedIdx(0);
    setUserDraft('');
    setShowModel(false);
    setHasSubmitted(false);
  }, [course.id]);

  const activePrompt = prompts[selectedIdx] || prompts[0];
  const isCjk = course.id === 'chinese' || course.id === 'japanese';
  const lengthCount = useMemo(() => {
    const trimmed = userDraft.trim();
    if (!trimmed) return 0;
    if (isCjk) {
      return trimmed.replace(/\s+/g, '').length;
    }
    return trimmed.split(/\s+/).filter(Boolean).length;
  }, [userDraft, isCjk]);

  const minTarget = course.id === 'chinese' ? 80 : course.id === 'japanese' ? 120 : 150;

  if (!activePrompt) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wide">
                {course.flagEmoji} {meta.examShortName} Writing Lab · {course.vietnameseName}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
              Phòng Luyện Viết Học Thuật & So Sánh Bài Mẫu Chuẩn Giám Khảo
            </h2>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          Mục tiêu: {activePrompt.bandScore}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Visual Chart & Scenario, Prompt, Outline & Key Vocabulary */}
        <div className="space-y-4">
          {/* Authentic Visual Chart Diagram */}
          <WritingChartViewer
            prompt={activePrompt}
            onCopyStatSnippet={(snip) => setUserDraft((prev) => (prev ? `${prev}\n${snip}` : snip))}
          />

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
              Đề bài chính thức ({meta.examShortName})
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
              {activePrompt.title}
            </h3>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
              {activePrompt.prompt}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Dàn Ý 3 Phần Chuẩn Khảo Thí ({meta.examShortName})</span>
            </div>
            <div className="space-y-2.5">
              {activePrompt.outline.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-indigo-900">{idx + 1}. {item.point}</div>
                  <div className="text-slate-600 leading-relaxed">{item.explanation}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Từ Vựng & Cấu Trúc Ăn Điểm ({course.vietnameseName})</span>
            </div>
            <div className="space-y-2">
              {activePrompt.keyVocabulary.map((kv, idx) => (
                <div key={idx} className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-200/70 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{kv.word}</div>
                    <div className="text-[11px] text-slate-600">{kv.meaning}</div>
                  </div>
                  <button
                    onClick={() => speakText(kv.word.split('(')[0].trim(), course.voiceLangCode)}
                    className="p-1.5 rounded-lg bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 cursor-pointer shrink-0"
                    title="Nghe phát âm bản ngữ"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Editor & Examiner Model Answer */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Khung Soạn Thảo Bài Viết ({course.nativeName})
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-extrabold px-2.5 py-1 rounded-lg border ${
                  lengthCount >= minTarget
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {lengthCount} / {minTarget} {isCjk ? 'ký tự chữ Hán/Kana' : 'từ'}
                </span>
              </div>
            </div>

            <textarea
              value={userDraft}
              onChange={e => setUserDraft(e.target.value)}
              rows={8}
              placeholder={`Nhập bài viết ${course.vietnameseName} của bạn tại đây (áp dụng các cấu trúc ăn điểm của ${meta.examShortName})...`}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-hidden text-sm text-slate-900 leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowModel(!showModel)}
                  className="px-3.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  {showModel ? 'Ẩn Bài Mẫu Điểm Cao' : `Xem Bài Mẫu Chuẩn ${activePrompt.bandScore}`}
                </button>
                <button
                  onClick={() => setUserDraft(activePrompt.modelAnswer)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Điền thử bài mẫu để phân tích
                </button>
              </div>

              <button
                onClick={() => {
                  setHasSubmitted(true);
                  setShowModel(true);
                  onGainXp(35);
                }}
                disabled={userDraft.trim().length < 10}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Chấm Bài & Đối Chiếu Đáp Án (+35 XP)</span>
              </button>
            </div>
          </div>

          {(showModel || hasSubmitted) && (
            <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wide">
                    Bài Mẫu Đạt Điểm Tối Đa ({activePrompt.bandScore})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakText(activePrompt.modelAnswer, course.voiceLangCode)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe đọc mẫu</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(activePrompt.modelAnswer);
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-100 text-sm text-slate-900 whitespace-pre-line leading-relaxed font-sans">
                {activePrompt.modelAnswer}
              </div>

              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="font-bold text-amber-900">Nhận xét từ Hội đồng khảo thí ({meta.examAuthority}):</div>
                <p className="leading-relaxed">{activePrompt.examinerComment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. MULTI-LANGUAGE EXAM SPEAKING LAB (HSKK, JLPT Kaiwa, TOPIK Speaking, DELF Orale, Goethe Sprechen, DELE Oral)
 * ============================================================================ */
export const MultiLangSpeakingLab: React.FC<{
  course: LanguageCourse;
  meta: LanguageExamMetadata;
  cueCards: SpeakingCueCard[];
  onGainXp: (amount: number) => void;
}> = ({ course, meta, cueCards, onGainXp }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [prepTimer, setPrepTimer] = useState(60);
  const [isPrepRunning, setIsPrepRunning] = useState(false);
  const [speakTimer, setSpeakTimer] = useState(120);
  const [isSpeakRunning, setIsSpeakRunning] = useState(false);
  const [notes, setNotes] = useState('');
  const [showSample, setShowSample] = useState(true);

  useEffect(() => {
    setSelectedIdx(0);
    setPrepTimer(60);
    setIsPrepRunning(false);
    setSpeakTimer(120);
    setIsSpeakRunning(false);
    setNotes('');
  }, [course.id]);

  useEffect(() => {
    if (!isPrepRunning || prepTimer <= 0) return;
    const id = setInterval(() => {
      setPrepTimer(p => {
        if (p <= 1) {
          setIsPrepRunning(false);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isPrepRunning, prepTimer]);

  useEffect(() => {
    if (!isSpeakRunning || speakTimer <= 0) return;
    const id = setInterval(() => {
      setSpeakTimer(p => {
        if (p <= 1) {
          setIsSpeakRunning(false);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isSpeakRunning, speakTimer]);

  const activeCard = cueCards[selectedIdx] || cueCards[0];
  if (!activeCard) return null;

  const formatSec = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-purple-600 uppercase tracking-wide">
              {course.flagEmoji} {meta.examShortName} Speaking Lab · {course.vietnameseName}
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
              Phòng Thi Nói Độc Thoại & Phản Xạ Khảo Thí ({activeCard.bandScore})
            </h2>
          </div>
        </div>

        <button
          onClick={() => speakText(activeCard.cueCardPrompt, course.voiceLangCode)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Volume2 className="w-4 h-4" />
          <span>Nghe Giám Khảo Đọc Đề ({course.nativeName})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Cue Card & Timers */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wide">
              Chủ đề thi nói ({meta.examShortName})
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
              {activeCard.topic}
            </h3>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
              {activeCard.cueCardPrompt}
            </p>
            {activeCard.bulletPoints && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-600 uppercase">Các ý cần triển khai:</div>
                {activeCard.bulletPoints.map((bp, i) => (
                  <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Countdown Timers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Đồng Hồ Bấm Giờ Phòng Thi</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
                <div className="text-[11px] font-bold text-amber-900">Chuẩn bị dàn ý (60s)</div>
                <div className="text-xl font-black font-mono text-amber-800">{formatSec(prepTimer)}</div>
                <div className="flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => setIsPrepRunning(!isPrepRunning)}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold cursor-pointer"
                  >
                    {isPrepRunning ? 'Dừng' : 'Bắt đầu'}
                  </button>
                  <button
                    onClick={() => { setIsPrepRunning(false); setPrepTimer(60); }}
                    className="p-1 rounded-lg bg-white border border-amber-200 text-amber-700 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-center space-y-2">
                <div className="text-[11px] font-bold text-purple-900">Trình bày nói (120s)</div>
                <div className="text-xl font-black font-mono text-purple-800">{formatSec(speakTimer)}</div>
                <div className="flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => setIsSpeakRunning(!isSpeakRunning)}
                    className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-[11px] font-bold cursor-pointer"
                  >
                    {isSpeakRunning ? 'Dừng' : 'Bắt đầu'}
                  </button>
                  <button
                    onClick={() => { setIsSpeakRunning(false); setSpeakTimer(120); }}
                    className="p-1 rounded-lg bg-white border border-purple-200 text-purple-700 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder={`Ghi nhanh từ khóa dàn ý bằng ${course.vietnameseName}...`}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-hidden"
            />
          </div>
        </div>

        {/* Right: Native Model Answer & Idiomatic Expressions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                  Bài Trình Bày Mẫu Của Giám Khảo Bản Ngữ ({activeCard.bandScore})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    speakText(activeCard.modelAnswer, course.voiceLangCode);
                    onGainXp(20);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Phát Âm Bản Ngữ (+20 XP)</span>
                </button>
                <button
                  onClick={() => setShowSample(!showSample)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  {showSample ? 'Ẩn văn bản' : 'Hiện văn bản'}
                </button>
              </div>
            </div>

            {showSample && (
              <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-100 text-sm text-slate-900 leading-relaxed font-sans">
                {activeCard.modelAnswer}
              </div>
            )}

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Cấu Trúc & Thành Ngữ Ăn Điểm Trong Bài Nói ({course.vietnameseName}):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeCard.idiomaticExpressions.map((exp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-purple-900">{exp.phrase}</div>
                      <div className="text-[11px] text-slate-600 mt-1">{exp.meaning}</div>
                    </div>
                    <button
                      onClick={() => speakText(exp.phrase.split('(')[0].trim(), course.voiceLangCode)}
                      className="self-start inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-800 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Nghe phát âm</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. MULTI-LANGUAGE EXAM VOCABULARY HUB (100% Course-Pure Vocabulary)
 * ============================================================================ */
export const MultiLangVocabHub: React.FC<{
  course: LanguageCourse;
  meta: LanguageExamMetadata;
  onGainXp: (amount: number) => void;
}> = ({ course, meta, onGainXp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setSearchQuery('');
  }, [course.id]);

  const filteredCards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return course.vocabCards;
    return course.vocabCards.filter(
      c =>
        c.word.toLowerCase().includes(q) ||
        c.meaning.toLowerCase().includes(q) ||
        (c.romanization && c.romanization.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
    );
  }, [course.vocabCards, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Kho Từ Vựng Trọng Điểm Kỳ Thi {meta.examShortName} ({course.vietnameseName})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tổng hợp từ vựng cốt lõi, phiên âm chuẩn ({course.scriptType}) và câu ví dụ thực tế trong đề thi {meta.examShortName}.
              </p>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Tìm từ vựng ${course.vietnameseName}...`}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map(card => (
            <div key={card.id} className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-purple-300 transition-all flex flex-col justify-between gap-3 shadow-2xs">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-black text-slate-900">{card.word}</div>
                    {card.romanization && (
                      <div className="text-[11px] font-mono text-purple-600">{card.romanization}</div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                    {card.category}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-800">{card.meaning}</div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="font-semibold text-slate-900">{card.exampleSentence}</div>
                  <div className="text-[11px] text-slate-500">{card.exampleTranslation}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => speakText(card.word.split('(')[0].trim(), course.voiceLangCode)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Phát âm mẫu</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${card.word} - ${card.meaning}\n${card.exampleSentence}`);
                    setCopiedId(card.id);
                    onGainXp(5);
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  {copiedId === card.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === card.id ? 'Đã lưu' : 'Sao chép'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. MULTI-LANGUAGE CERTIFICATE SCORE CALCULATOR (HSK / JLPT / TOPIK / DELF / Goethe / DELE)
 * ============================================================================ */
export const MultiLangScoreCalculator: React.FC<{
  course: LanguageCourse;
  meta: LanguageExamMetadata;
}> = ({ course, meta }) => {
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    meta.skillLabels.forEach(s => {
      initial[s.id] = Math.round(s.maxScore * 0.72);
    });
    return initial;
  });

  useEffect(() => {
    const reset: Record<string, number> = {};
    meta.skillLabels.forEach(s => {
      reset[s.id] = Math.round(s.maxScore * 0.72);
    });
    setScores(reset);
  }, [course.id, meta]);

  const result = useMemo(
    () => calculateMultiLangCertificateScore(course.id, scores),
    [course.id, scores]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-blue-600 uppercase tracking-wide">
              {course.flagEmoji} Công Cụ Quy Đổi Điểm Chuẩn {meta.examShortName} · {course.vietnameseName}
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
              {meta.scoreScaleLabel}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tiêu chuẩn xét đỗ chính thức của {meta.examAuthority}: {meta.passingCriteria}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Sliders for each skill */}
        <div className="lg:col-span-2 space-y-4">
          {meta.skillLabels.map(skill => {
            const val = scores[skill.id] ?? 0;
            return (
              <div key={skill.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{skill.label}</span>
                  <span className="font-black text-indigo-700 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                    {val} / {skill.maxScore} điểm
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={skill.maxScore}
                  value={val}
                  onChange={e => setScores(prev => ({ ...prev, [skill.id]: Number(e.target.value) }))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        {/* Result Certificate Summary Card */}
        <div className={`p-6 rounded-2xl border text-white space-y-4 shadow-md ${
          result.isPassed
            ? 'bg-linear-to-br from-indigo-900 via-slate-900 to-emerald-950 border-emerald-500/40'
            : 'bg-linear-to-br from-slate-900 to-rose-950 border-rose-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Kết Quả Dự Kiến ({meta.examShortName})
            </span>
            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
              result.isPassed ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
            }`}>
              {result.isPassed ? 'ĐẠT CHUẨN (PASS)' : 'CHƯA ĐẠT'}
            </span>
          </div>

          <div>
            <div className="text-4xl font-black text-amber-400 font-mono">
              {result.totalScore} <span className="text-lg text-slate-300 font-normal">/ {result.maxTotalScore}</span>
            </div>
            <div className="text-xs font-bold text-white mt-2">
              Xếp loại: {result.levelAchieved}
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed pt-3 border-t border-white/15">
            {result.verdictInVietnamese}
          </p>
        </div>
      </div>
    </div>
  );
};
