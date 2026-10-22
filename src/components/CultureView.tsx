import React from 'react';
import { Compass, Volume2, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { LanguageCourse, CulturalTip } from '../data/curriculum';
import { speakText } from '../utils/speech';

interface CultureViewProps {
  course: LanguageCourse;
}

export const CultureView: React.FC<CultureViewProps> = ({ course }) => {
  const handlePlayAudio = (phrase: string) => {
    speakText(phrase, course.voiceLangCode, 0.85);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
          <Compass className="w-4 h-4" />
          <span>Văn Hóa Ứng Xử & Nghệ Thuật Giao Tiếp Thực Tế</span>
          <span aria-hidden="true">·</span>
          <span>{course.vietnameseName}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
          Quy Tắc Ngầm & Văn Hóa Bản Xứ Cần Biết
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Học một ngôn ngữ không thể tách rời khỏi văn hóa. Nắm vững những quy tắc ngầm, phép tắc trên bàn ăn, giao tiếp công sở và sự khác biệt với văn hóa Việt Nam để tránh sự cố "sốc văn hóa".
        </p>
      </div>

      {/* Cultural Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {course.culturalTips.map((tip: CulturalTip) => (
          <div
            key={tip.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{tip.topic}</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mt-2.5">
                {tip.rule}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Nên Làm (Điểm cộng lớn)</span>
                  </div>
                  <div className="text-xs text-emerald-950 leading-normal">
                    {tip.doText}
                  </div>
                </div>

                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                  <div className="text-[11px] font-bold text-rose-800 flex items-center gap-1.5 mb-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Tuyệt Đối Tránh</span>
                  </div>
                  <div className="text-xs text-rose-950 leading-normal">
                    {tip.dontText}
                  </div>
                </div>
              </div>
            </div>

            {/* Essential phrase banner */}
            <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Câu Nói "Cứu Cánh" Vàng Bản Xứ</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{tip.essentialPhrase}</div>
                <div className="text-xs text-slate-500 italic mt-0.5">"{tip.phraseTranslation}"</div>
              </div>

              <button
                onClick={() => handlePlayAudio(tip.essentialPhrase)}
                className="p-2 bg-white hover:bg-slate-100 text-indigo-600 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
                aria-label={`Nghe phát âm: ${tip.essentialPhrase}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
