import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Volume2,
  Copy,
  Check,
  Search,
  Sparkles,
  Layers,
  GraduationCap,
  Briefcase,
  Cpu,
  TreePine,
  Users
} from 'lucide-react';
import { ieltsTopicVocabularies, IeltsVocabItem } from '../../data/courses/englishIeltsVocabData';
import { speakText } from '../../utils/speech';

interface IeltsVocabHubProps {
  voiceLangCode: string;
  onGainXp: (amount: number) => void;
}

export const IeltsVocabHub: React.FC<IeltsVocabHubProps> = ({
  voiceLangCode,
  onGainXp
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const topics = [
    { id: 'all', label: 'Tất cả chủ đề', icon: Layers, count: ieltsTopicVocabularies.length },
    { id: 'Environment', label: 'Môi trường (Environment)', icon: TreePine, count: ieltsTopicVocabularies.filter(v => v.topic === 'Environment').length },
    { id: 'Workplace', label: 'Công sở (Workplace & Career)', icon: Briefcase, count: ieltsTopicVocabularies.filter(v => v.topic === 'Workplace').length },
    { id: 'Technology', label: 'Công nghệ & AI', icon: Cpu, count: ieltsTopicVocabularies.filter(v => v.topic === 'Technology').length },
    { id: 'Education', label: 'Giáo dục (Education)', icon: GraduationCap, count: ieltsTopicVocabularies.filter(v => v.topic === 'Education').length },
    { id: 'Society', label: 'Xã hội (Society & Culture)', icon: Users, count: ieltsTopicVocabularies.filter(v => v.topic === 'Society').length }
  ];

  const filteredVocab = useMemo(() => {
    return ieltsTopicVocabularies.filter(item => {
      const matchTopic = selectedTopic === 'all' || item.topic === selectedTopic;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchTopic;
      const matchSearch =
        item.word.toLowerCase().includes(q) ||
        item.vietnameseMeaning.toLowerCase().includes(q) ||
        item.collocations.some(c => c.toLowerCase().includes(q));
      return matchTopic && matchSearch;
    });
  }, [selectedTopic, searchQuery]);

  const handleCopyWord = (item: IeltsVocabItem) => {
    const textToCopy = `${item.word} (${item.phonetic}) - ${item.vietnameseMeaning}\nCollocations: ${item.collocations.join(', ')}\nExample: ${item.exampleSentence}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    onGainXp(5);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Kho Từ Vựng & Cụm Collocation C1/C2 Chuyên Đề IELTS
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tổng hợp từ vựng học thuật & đời sống cao cấp nâng chuẩn tiêu chí Lexical Resource lên Band 8.0 - 9.0
                </p>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm từ vựng, collocation, nghĩa..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
            />
          </div>
        </div>

        {/* Topic Tabs */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          {topics.map(t => {
            const isSelected = selectedTopic === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vocab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVocab.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              {/* Word Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-extrabold text-slate-900 tracking-tight">
                      {item.word}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                      item.cefrLevel === 'C2'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}>
                      {item.cefrLevel}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono italic">
                      ({item.partOfSpeech})
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">
                    {item.phonetic}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => speakText(item.word, voiceLangCode)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopyWord(item)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    title="Sao chép từ vựng"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Vietnamese Meaning */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 font-semibold leading-relaxed">
                {item.vietnameseMeaning}
              </div>

              {/* English Definition */}
              <div className="text-[11px] text-slate-500 italic leading-relaxed">
                "{item.definitionEn}"
              </div>

              {/* Collocations */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                  Cụm Collocation Ăn Điểm:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.collocations.map((col, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[11px] bg-indigo-50/70 text-indigo-900 border border-indigo-100 px-2 py-0.5 rounded-md font-medium"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              {/* Example Sentence */}
              <div className="p-2.5 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed font-sans">
                <span className="font-bold text-emerald-900 block text-[10px] uppercase">Ví dụ ứng dụng:</span>
                "{item.exampleSentence}"
              </div>
            </div>

            {/* IELTS Band Context Hint */}
            <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{item.ieltsBandContext}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
