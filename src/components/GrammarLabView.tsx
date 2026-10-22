import React, { useState } from 'react';
import { Microscope, Volume2, Sparkles, BookOpen, Layers, Lightbulb } from 'lucide-react';
import { LanguageCourse } from '../data/curriculum';
import { speakText } from '../utils/speech';

interface TokenData {
  word: string;
  partOfSpeech: string;
  baseForm?: string;
  grammaticalRole: string;
  meaning: string;
  romanization?: string;
}

interface GrammarLabProps {
  course: LanguageCourse;
}

const SAMPLE_SENTENCES: Record<string, string[]> = {
  english: [
    'I have over three years of experience specializing in project management.',
    'Could you please clarify the deliverables for the upcoming sprint?',
    'Honestly, I thrive in a collaborative environment under high pressure.',
    'How have you been lately? Would you like to grab a coffee?'
  ],
  chinese: [
    '尊敬的面试官，您好！我对贵公司的发展前景非常感兴趣。',
    '请问，去最近的地铁站怎么走？我想买两张票。',
    '我们希望在互利共赢的原则下，与贵公司开展深入合作。'
  ],
  japanese: [
    '本日は貴重なお時間をいただき、誠にありがとうございます。',
    'すみません、駅の近くに美味しいラーメン屋はありますか？',
    'これまでの経験を活かし、御社のチームに貢献したいと考えております。'
  ],
  korean: [
    '안녕하십니까! 귀사의 글로벌 프로젝트에 기여하고 싶어 지원하였습니다。',
    '여기요! 아이스 아메리카노 한 잔 포장해 주세요。',
    '최선을 다해 맡은 바 책임을 완수하겠습니다。'
  ],
  french: [
    'Mes compétences correspondent parfaitement au profil que vous recherchez.',
    'Bonjour ! Un café au lait avec un croissant chaud, s\'il vous plaît.',
    'Je me permets de vous contacter afin d\'obtenir de plus amples informations.'
  ],
  german: [
    'Zuverlässigkeit und Genauigkeit sind meine größten beruflichen Stärken.',
    'Ich möchte ein Glas Mineralwasser ohne Kohlensäure, bitte.',
    'Könnten Sie mir bitte sagen, wo der Hauptbahnhof ist?'
  ],
  spanish: [
    'Cuento con una sólida trayectoria en comercio y relaciones internacionales.',
    'Me gustaría pedir un café con leche y una tostada con tomate, por favor.',
    'Disculpe, ¿nos trae la cuenta cuando sea posible?'
  ],
};

export const GrammarLabView: React.FC<GrammarLabProps> = ({ course }) => {
  const samples = SAMPLE_SENTENCES[course.id] || SAMPLE_SENTENCES['english'];
  const [inputSentence, setInputSentence] = useState(samples[0]);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    tokens: TokenData[];
    vietnameseTranslation: string;
    formalityLevel: string;
    culturalNote: string;
  } | null>(null);

  const handleAnalyze = async (sentenceToAnalyze: string) => {
    if (!sentenceToAnalyze.trim()) return;
    setIsAnalyzing(true);
    setSelectedTokenIndex(0);

    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence: sentenceToAnalyze,
          language: course.name,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysisResult({
          tokens: data.tokens || [],
          vietnameseTranslation: data.vietnameseTranslation || data.naturalTranslation || sentenceToAnalyze,
          formalityLevel: data.formalityLevel || 'Lịch sự / Tiêu chuẩn',
          culturalNote: data.culturalNote || 'Mẫu câu thông dụng trong giao tiếp đời sống và công việc.',
        });
      }
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePlaySentenceAudio = (text: string) => {
    speakText(text, course.voiceLangCode, 0.85);
  };

  const handlePlayTokenAudio = (token: string) => {
    speakText(token, course.voiceLangCode, 0.7);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
          <Microscope className="w-4 h-4" />
          <span>Giải Phẫu Ngữ Pháp & Soi Cấu Trúc Câu</span>
          <span aria-hidden="true">·</span>
          <span>{course.vietnameseName}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
          Phòng Thí Nghiệm Cú Pháp & Ngữ Pháp Chuyên Sâu
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Bóc tách từng từ tố, thành phần câu (Chủ ngữ, Vị ngữ, Trợ từ, Thì ngữ pháp, Kính ngữ/Thân mật) sang tiếng Việt dễ hiểu mà không cần học vẹt bảng công thức khô khan.
        </p>

        {/* Preset sentence selection */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Mẫu câu tiêu biểu:</span>
          {samples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputSentence(s);
                handleAnalyze(s);
              }}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-lg transition-colors cursor-pointer text-left line-clamp-1"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputSentence}
            onChange={(e) => setInputSentence(e.target.value)}
            placeholder={`Nhập bất kỳ câu ${course.vietnameseName} nào để phân tích cấu trúc...`}
            className="flex-1 px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
          <button
            onClick={() => handleAnalyze(inputSentence)}
            disabled={isAnalyzing || !inputSentence.trim()}
            className="px-5 py-2.5 bg-indigo-600 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold text-xs rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shrink-0"
          >
            {isAnalyzing ? 'Đang soi cú pháp...' : 'Soi Cấu Trúc Câu'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Visual Interactive Sentence Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Mức độ trang trọng:</span>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                  {analysisResult.formalityLevel}
                </span>
              </div>
              <button
                onClick={() => handlePlaySentenceAudio(inputSentence)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Nghe toàn bộ câu</span>
              </button>
            </div>

            {/* Clickable Word Tokens */}
            <div className="py-6">
              <div className="text-xs text-slate-400 font-medium mb-3">Chạm vào từng từ để xem chi tiết vai trò ngữ pháp & dạng nguyên thể:</div>
              <div className="flex flex-wrap gap-2.5 items-center">
                {analysisResult.tokens.map((token, idx) => {
                  const isSelected = selectedTokenIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedTokenIndex(idx);
                        handlePlayTokenAudio(token.word);
                      }}
                      className={`group p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-600'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {token.word}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                        {token.grammaticalRole}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Translation & Cultural Nuance */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold text-slate-700 mb-1">Dịch nghĩa tiếng Việt chuẩn xác:</div>
                <div className="text-sm font-bold text-slate-900 leading-relaxed">
                  "{analysisResult.vietnameseTranslation}"
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ghi chú ngữ cảnh & Văn hóa giao tiếp:</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {analysisResult.culturalNote}
                </div>
              </div>
            </div>
          </div>

          {/* Active Token Detail Card */}
          {analysisResult.tokens[selectedTokenIndex] && (
            <div className="bg-linear-to-r from-indigo-50/40 via-white to-slate-50 rounded-2xl border border-indigo-100 p-6 shadow-xs">
              {(() => {
                const active = analysisResult.tokens[selectedTokenIndex];
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-extrabold text-slate-900">{active.word}</span>
                        {active.romanization && (
                          <span className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                            {active.romanization}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {active.partOfSpeech}
                        </span>
                      </div>

                      <button
                        onClick={() => handlePlayTokenAudio(active.word)}
                        className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                        aria-label="Nghe phát âm từ này"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-[11px] text-slate-500 font-medium">Vai trò ngữ pháp trong câu</div>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">{active.grammaticalRole}</div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-[11px] text-slate-500 font-medium">Dạng nguyên thể từ điển (Lemma)</div>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">{active.baseForm || active.word}</div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-[11px] text-slate-500 font-medium">Nghĩa tiếng Việt</div>
                        <div className="text-sm font-bold text-indigo-600 mt-0.5">{active.meaning}</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
