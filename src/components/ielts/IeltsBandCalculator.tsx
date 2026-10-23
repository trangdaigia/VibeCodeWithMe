import React, { useState } from 'react';
import {
  Calculator,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const convertListeningBand = (raw: number): number => {
  if (raw >= 39) return 9.0;
  if (raw >= 37) return 8.5;
  if (raw >= 35) return 8.0;
  if (raw >= 32) return 7.5;
  if (raw >= 30) return 7.0;
  if (raw >= 26) return 6.5;
  if (raw >= 23) return 6.0;
  if (raw >= 18) return 5.5;
  if (raw >= 16) return 5.0;
  if (raw >= 13) return 4.5;
  if (raw >= 10) return 4.0;
  if (raw >= 7) return 3.5;
  if (raw >= 5) return 3.0;
  if (raw >= 3) return 2.5;
  return 2.0;
};

export const convertReadingBand = (raw: number, isGt: boolean): number => {
  if (isGt) {
    // General Training Reading: stricter scale
    if (raw >= 40) return 9.0;
    if (raw >= 39) return 8.5;
    if (raw >= 37) return 8.0;
    if (raw >= 36) return 7.5;
    if (raw >= 34) return 7.0;
    if (raw >= 32) return 6.5;
    if (raw >= 30) return 6.0;
    if (raw >= 27) return 5.5;
    if (raw >= 23) return 5.0;
    if (raw >= 19) return 4.5;
    if (raw >= 15) return 4.0;
    if (raw >= 12) return 3.5;
    if (raw >= 9) return 3.0;
    if (raw >= 6) return 2.5;
    return 2.0;
  } else {
    // Academic Reading scale
    if (raw >= 39) return 9.0;
    if (raw >= 37) return 8.5;
    if (raw >= 35) return 8.0;
    if (raw >= 33) return 7.5;
    if (raw >= 30) return 7.0;
    if (raw >= 27) return 6.5;
    if (raw >= 23) return 6.0;
    if (raw >= 19) return 5.5;
    if (raw >= 15) return 5.0;
    if (raw >= 13) return 4.5;
    if (raw >= 10) return 4.0;
    if (raw >= 8) return 3.5;
    if (raw >= 6) return 3.0;
    if (raw >= 4) return 2.5;
    return 2.0;
  }
};

export const computeOverallBand = (l: number, r: number, w: number, s: number): number => {
  const avg = (l + r + w + s) / 4;
  const floor = Math.floor(avg);
  const remainder = avg - floor;
  if (remainder < 0.25) return floor;
  if (remainder < 0.75) return floor + 0.5;
  return floor + 1.0;
};

interface IeltsBandCalculatorProps {
  initialTrack?: 'academic' | 'general-training';
}

export const IeltsBandCalculator: React.FC<IeltsBandCalculatorProps> = ({
  initialTrack = 'academic'
}) => {
  const [calcTrack, setCalcTrack] = useState<'academic' | 'general-training'>(initialTrack);
  const [listeningRaw, setListeningRaw] = useState<number>(33);
  const [readingRaw, setReadingRaw] = useState<number>(34);
  const [writingBand, setWritingBand] = useState<number>(7.0);
  const [speakingBand, setSpeakingBand] = useState<number>(7.0);

  const isGt = calcTrack === 'general-training';
  const computedListening = convertListeningBand(listeningRaw);
  const computedReading = convertReadingBand(readingRaw, isGt);
  const overallBand = computeOverallBand(computedListening, computedReading, writingBand, speakingBand);

  // Benchmarks
  const getBandDescription = (band: number) => {
    if (band >= 8.5) return { title: 'Expert User (C2)', desc: 'Thành thạo xuất sắc, hoàn toàn tự nhiên như người bản xứ.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (band >= 7.5) return { title: 'Very Good User (C1)', desc: 'Năng lực học thuật và giao tiếp chuyên nghiệp vững chắc.', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    if (band >= 6.5) return { title: 'Good User (B2+)', desc: 'Đạt chuẩn nhập học đại học quốc tế hoặc nộp hồ sơ Express Entry CLB 9.', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (band >= 5.5) return { title: 'Modest User (B2)', desc: 'Giao tiếp tình huống quen thuộc, cần cải thiện từ vựng và ngữ pháp.', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { title: 'Limited User (B1)', desc: 'Cần củng cố nền tảng ngữ pháp căn bản và luyện nghe phát âm.', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const bandDesc = getBandDescription(overallBand);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Bảng Quy Đổi & Tính Điểm IELTS Chuẩn IDP / British Council
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quy đổi số câu đúng (Raw Score) sang Band Score chuẩn xác · Tự động làm tròn 0.25 / 0.75
                </p>
              </div>
            </div>
          </div>

          {/* Module Selector */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setCalcTrack('academic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                !isGt ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>IELTS Academic</span>
            </button>
            <button
              onClick={() => setCalcTrack('general-training')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                isGt ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>General Training</span>
            </button>
          </div>
        </div>

        {/* Warning Callout on GT Reading Difference */}
        {isGt && (
          <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-900">
                Lưu ý quan trọng về thang điểm Reading General Training:
              </span>
              <p className="text-[11px] leading-relaxed">
                Do bài đọc GT lấy từ đời sống hàng ngày (biển báo, nội quy công ty, thông tin du lịch), thang điểm quy đổi khắt khe hơn Academic rất nhiều:
                <br />
                • Để đạt <strong>Band 7.0</strong> Reading: Bạn cần đúng <strong>34 - 35/40 câu</strong> (trong khi Academic chỉ cần <strong>30 - 31/40 câu</strong>).
                <br />
                • Để đạt <strong>Band 8.0</strong> Reading: Bạn cần đúng <strong>37 - 38/40 câu</strong> (trong khi Academic chỉ cần <strong>35 - 36/40 câu</strong>).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Inputs (Left) and Score Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide pb-2 border-b border-slate-100">
              Nhập Số Câu Đúng Hoặc Điểm Thành Phần
            </h3>

            {/* Listening Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span>1. Listening (Nghe 40 câu):</span>
                </span>
                <span className="font-mono text-sm font-extrabold text-indigo-600">
                  {listeningRaw}/40 câu đúng = Band {computedListening.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={listeningRaw}
                onChange={e => setListeningRaw(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 câu (Band 2.0)</span>
                <span>23 câu (Band 6.0)</span>
                <span>30 câu (Band 7.0)</span>
                <span>35 câu (Band 8.0)</span>
                <span>40 câu (Band 9.0)</span>
              </div>
            </div>

            {/* Reading Input */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isGt ? 'bg-emerald-600' : 'bg-indigo-600'}`} />
                  <span>2. Reading ({isGt ? 'General Training' : 'Academic'} 40 câu):</span>
                </span>
                <span className={`font-mono text-sm font-extrabold ${isGt ? 'text-emerald-700' : 'text-indigo-600'}`}>
                  {readingRaw}/40 câu đúng = Band {computedReading.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={readingRaw}
                onChange={e => setReadingRaw(Number(e.target.value))}
                className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${
                  isGt ? 'accent-emerald-600' : 'accent-indigo-600'
                }`}
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 câu</span>
                <span>{isGt ? '30 câu (6.0)' : '23 câu (6.0)'}</span>
                <span>{isGt ? '34 câu (7.0)' : '30 câu (7.0)'}</span>
                <span>{isGt ? '37 câu (8.0)' : '35 câu (8.0)'}</span>
                <span>40 câu (9.0)</span>
              </div>
            </div>

            {/* Writing Band Input */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>3. Writing Band (Task 1 & Task 2):</span>
                </span>
                <span className="font-mono text-sm font-extrabold text-amber-700">
                  Band {writingBand.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={4.0}
                max={9.0}
                step={0.5}
                value={writingBand}
                onChange={e => setWritingBand(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Band 4.0</span>
                <span>Band 5.5</span>
                <span>Band 6.5</span>
                <span>Band 7.5</span>
                <span>Band 9.0</span>
              </div>
            </div>

            {/* Speaking Band Input */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>4. Speaking Band (Part 1, 2, 3):</span>
                </span>
                <span className="font-mono text-sm font-extrabold text-rose-700">
                  Band {speakingBand.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={4.0}
                max={9.0}
                step={0.5}
                value={speakingBand}
                onChange={e => setSpeakingBand(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Band 4.0</span>
                <span>Band 5.5</span>
                <span>Band 6.5</span>
                <span>Band 7.5</span>
                <span>Band 9.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: Official Scorecard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs text-center space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wide font-bold">
              <span>Test Report Form (TRF)</span>
              <span className="text-indigo-600 font-mono">{isGt ? 'GENERAL' : 'ACADEMIC'}</span>
            </div>

            <div className="py-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Overall Band Score (Điểm Tổng Kết)
              </div>
              <div className="text-5xl font-extrabold text-indigo-600 font-mono tracking-tight my-1">
                {overallBand.toFixed(1)}
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${bandDesc.color}`}>
                {bandDesc.title}
              </div>
            </div>

            {/* Breakdown Sub-scores */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-left">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Listening:</span>
                <div className="font-mono text-sm font-extrabold text-indigo-700 mt-0.5">
                  {computedListening.toFixed(1)}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-left">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Reading:</span>
                <div className="font-mono text-sm font-extrabold text-indigo-700 mt-0.5">
                  {computedReading.toFixed(1)}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-left">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Writing:</span>
                <div className="font-mono text-sm font-extrabold text-amber-700 mt-0.5">
                  {writingBand.toFixed(1)}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-left">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Speaking:</span>
                <div className="font-mono text-sm font-extrabold text-rose-700 mt-0.5">
                  {speakingBand.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Official Rounding Rule explanation */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800">Quy tắc làm tròn chính thức (Cambridge):</span>
              <p className="text-[11px] leading-relaxed">
                Trung bình cộng: {((computedListening + computedReading + writingBand + speakingBand) / 4).toFixed(3)}
                <br />
                Đuôi lẻ dưới .25 làm tròn xuống; từ .25 đến .74 làm tròn lên .5; từ .75 làm tròn lên mức điểm chẵn tiếp theo.
              </p>
            </div>
          </div>

          {/* Migration & University Benchmarks */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tiêu Chuẩn Hồ Sơ Với Band Điểm Này</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-slate-700 leading-relaxed">
                  <strong className="text-indigo-900">Định Cư Canada (Express Entry): </strong>
                  {overallBand >= 7.5 ? 'Đạt chuẩn CLB 9/10 tối đa hóa điểm CRS vượt ngưỡng trúng tuyển.' : 'Cần tối thiểu L:8.0, R:7.0, W:7.0, S:7.0 để đạt CLB 9 vàng.'}
                </div>
              </div>

              <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-slate-700 leading-relaxed">
                  <strong className="text-emerald-900">Định Cư Úc (SkillSelect PR): </strong>
                  {overallBand >= 8.0 ? 'Đạt mức Superior English (+20 điểm di trú tối đa).' : overallBand >= 7.0 ? 'Đạt mức Proficient English (+10 điểm di trú).' : 'Mức Competent English (0 điểm di trú).'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
