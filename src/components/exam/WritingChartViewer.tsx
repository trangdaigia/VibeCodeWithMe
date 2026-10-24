import React, { useState } from 'react';
import {
  BarChart3,
  LineChart as LineChartIcon,
  Maximize2,
  Minimize2,
  Table,
  Copy,
  Check,
  TrendingUp,
  Info,
  Lightbulb,
  Sparkles,
  FileText,
  Mail,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { WritingModelPrompt } from '../../data/curriculum';
import { determineChartVisualKind, ChartVisualKind } from '../../utils/writingChartLogic';

interface WritingChartViewerProps {
  prompt: WritingModelPrompt;
  className?: string;
  onCopyStatSnippet?: (text: string) => void;
}

export const WritingChartViewer: React.FC<WritingChartViewerProps> = ({
  prompt,
  className = '',
  onCopyStatSnippet
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const visualKind: ChartVisualKind = determineChartVisualKind(
    prompt.id,
    prompt.title,
    prompt.prompt
  );

  const handleCopyText = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    if (onCopyStatSnippet) onCopyStatSnippet(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}>
      {/* Top Chart Header */}
      <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
            {visualKind === 'line' ? (
              <LineChartIcon className="w-4 h-4" />
            ) : visualKind === 'bar' || visualKind === 'topik_bar' ? (
              <BarChart3 className="w-4 h-4" />
            ) : visualKind === 'letter_scenario' ? (
              <Mail className="w-4 h-4" />
            ) : (
              <Compass className="w-4 h-4" />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-300 truncate">
              {visualKind === 'line'
                ? 'Biểu Đồ Đường (IELTS Academic Task 1 Line Graph)'
                : visualKind === 'bar'
                ? 'Biểu Đồ Cột Nhóm (IELTS Academic Task 1 Bar Chart)'
                : visualKind === 'topik_bar'
                ? 'Biểu Đồ Khảo Sát Số Liệu (TOPIK II 쓰기 53번)'
                : visualKind === 'hsk_graphic'
                ? 'Tranh Minh Họa Ngữ Cảnh (HSK 5 书写 图文提示)'
                : visualKind === 'letter_scenario'
                ? 'Sơ Đồ Tình Huống Thư Tín (Correspondence Scenario)'
                : 'Sơ Đồ Phân Tích Luận Điểm (Analytical Infographic)'}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
              {prompt.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowDataTable(!showDataTable)}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              showDataTable
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
            title="Xem số liệu bảng chi tiết"
          >
            <Table className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Số liệu</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
            title="Phóng to biểu đồ toàn màn hình"
            aria-label="Phóng to biểu đồ toàn màn hình"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Visual Display Area */}
      <div className="p-4 sm:p-5 bg-slate-50/50 flex flex-col items-center justify-center">
        {visualKind === 'line' && (
          /* =========================================================================
             1. ACADEMIC IELTS TASK 1: LINE GRAPH (Renewable Energy 2000-2024)
             ========================================================================= */
          <div className="w-full max-w-2xl bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="text-center space-y-0.5 border-b border-slate-100 pb-2">
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                Percentage of Electricity Generated from Renewable Sources (2000–2024)
              </h5>
              <p className="text-[11px] text-slate-500">
                Figure 1.1: Longitudinal comparison across Norway, Germany, Spain, and the UK
              </p>
            </div>

            <div className="w-full aspect-[16/9] max-h-[300px]">
              <svg viewBox="0 0 640 340" className="w-full h-full select-none" aria-label="IELTS Writing Task 1 Line Graph">
                <defs>
                  <linearGradient id="norwayGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="germanyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0, 20, 40, 60, 80, 100].map((val, idx) => {
                  const y = 280 - (val / 100) * 230;
                  return (
                    <g key={idx}>
                      <line x1="65" y1={y} x2="595" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                      <text x="50" y={y + 4} textAnchor="end" fontSize="11" fill="#64748b" fontWeight="600">
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {/* X Axis */}
                <line x1="65" y1="280" x2="595" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
                {[
                  { yr: '2000', x: 80 },
                  { yr: '2006', x: 200 },
                  { yr: '2012', x: 320 },
                  { yr: '2018', x: 440 },
                  { yr: '2024', x: 560 },
                ].map((pt, idx) => (
                  <g key={idx}>
                    <line x1={pt.x} y1="280" x2={pt.x} y2="285" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x={pt.x} y="302" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="700">
                      {pt.yr}
                    </text>
                  </g>
                ))}

                {/* Line 1: Norway (95% -> 96% -> 97% -> 98% -> 98%) */}
                <polyline
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="80,61 200,59 320,57 440,55 560,54"
                />
                {[
                  { x: 80, y: 61, val: '95%' },
                  { x: 320, y: 57, val: '97%' },
                  { x: 560, y: 54, val: '98%' },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
                    <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10" fill="#0369a1" fontWeight="800">
                      {p.val}
                    </text>
                  </g>
                ))}

                {/* Line 2: Germany (7% -> 15% -> 30% -> 44% -> 58%) */}
                <polyline
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="80,264 200,245 320,211 440,179 560,147"
                />
                {[
                  { x: 80, y: 264, val: '7%' },
                  { x: 320, y: 211, val: '30%' },
                  { x: 560, y: 147, val: '58%' },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke="#eab308" strokeWidth="2.5" />
                    <text x={p.x + 12} y={p.y + 4} textAnchor="start" fontSize="10" fill="#b45309" fontWeight="800">
                      {p.val}
                    </text>
                  </g>
                ))}

                {/* Line 3: Spain (18% -> 22% -> 32% -> 43% -> 54%) */}
                <polyline
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="80,239 200,229 320,206 440,181 560,156"
                />
                {[
                  { x: 80, y: 239, val: '18%' },
                  { x: 560, y: 156, val: '54%' },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke="#ea580c" strokeWidth="2.5" />
                    <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10" fill="#c2410c" fontWeight="800">
                      {p.val}
                    </text>
                  </g>
                ))}

                {/* Line 4: UK (3% -> 6% -> 12% -> 31% -> 49%) */}
                <polyline
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3.5"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="80,273 200,266 320,252 440,209 560,167"
                />
                {[
                  { x: 80, y: 273, val: '3%' },
                  { x: 320, y: 252, val: '12%' },
                  { x: 560, y: 167, val: '49%' },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2.5" />
                    <text x={p.x} y={p.y + 16} textAnchor="middle" fontSize="10" fill="#6d28d9" fontWeight="800">
                      {p.val}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1 border-t border-slate-100 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-sky-700">
                <span className="w-3.5 h-1 bg-sky-600 rounded-full" /> Na Uy (Norway) 95% ➔ 98%
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-3.5 h-1 bg-amber-500 rounded-full" /> Đức (Germany) 7% ➔ 58%
              </span>
              <span className="flex items-center gap-1.5 text-orange-700">
                <span className="w-3.5 h-1 bg-orange-600 rounded-full" /> T.B.Nha (Spain) 18% ➔ 54%
              </span>
              <span className="flex items-center gap-1.5 text-purple-700">
                <span className="w-3.5 h-1 bg-purple-600 rounded-full border border-dashed" /> Anh (UK) 3% ➔ 49%
              </span>
            </div>
          </div>
        )}

        {visualKind === 'bar' && (
          /* =========================================================================
             2. ACADEMIC IELTS TASK 1: GROUPED BAR CHART (Five European Nations 2000, 2012, 2025)
             ========================================================================= */
          <div className="w-full max-w-2xl bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="text-center space-y-0.5 border-b border-slate-100 pb-2">
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                Renewable Electricity Production in Five European Nations (2000, 2012, 2025)
              </h5>
              <p className="text-[11px] text-slate-500">
                Figure 1.2: Official Comparative Clustered Bar Chart (% of Total Electricity)
              </p>
            </div>

            <div className="w-full aspect-[16/9] max-h-[300px]">
              <svg viewBox="0 0 640 330" className="w-full h-full select-none" aria-label="IELTS Writing Task 1 Bar Chart">
                {/* Gridlines */}
                {[0, 20, 40, 60, 80].map((val, idx) => {
                  const y = 260 - (val / 80) * 210;
                  return (
                    <g key={idx}>
                      <line x1="60" y1={y} x2="600" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                      <text x="48" y={y + 4} textAnchor="end" fontSize="11" fill="#64748b" fontWeight="600">
                        {val}%
                      </text>
                    </g>
                  );
                })}

                <line x1="60" y1="260" x2="600" y2="260" stroke="#94a3b8" strokeWidth="1.5" />

                {/* 5 Countries Clusters: Denmark, Germany, Spain, UK, Poland */}
                {[
                  { name: 'Đan Mạch', x: 80, d2000: 18, d2012: 45, d2025: 78 },
                  { name: 'Đức', x: 188, d2000: 6, d2012: 24, d2025: 56 },
                  { name: 'Tây Ban Nha', x: 296, d2000: 15, d2012: 32, d2025: 51 },
                  { name: 'Vương Quốc Anh', x: 404, d2000: 3, d2012: 12, d2025: 48 },
                  { name: 'Ba Lan', x: 512, d2000: 2, d2012: 10, d2025: 22 },
                ].map((item, idx) => {
                  const barW = 22;
                  const h2000 = (item.d2000 / 80) * 210;
                  const h2012 = (item.d2012 / 80) * 210;
                  const h2025 = (item.d2025 / 80) * 210;

                  return (
                    <g key={idx}>
                      {/* 2000 bar (Slate Blue) */}
                      <rect x={item.x} y={260 - h2000} width={barW} height={h2000} fill="#6366f1" rx="3" />
                      <text x={item.x + barW / 2} y={260 - h2000 - 4} textAnchor="middle" fontSize="10" fill="#4f46e5" fontWeight="800">
                        {item.d2000}%
                      </text>

                      {/* 2012 bar (Cyan) */}
                      <rect x={item.x + barW + 3} y={260 - h2012} width={barW} height={h2012} fill="#06b6d4" rx="3" />
                      <text x={item.x + barW + 3 + barW / 2} y={260 - h2012 - 4} textAnchor="middle" fontSize="10" fill="#0891b2" fontWeight="800">
                        {item.d2012}%
                      </text>

                      {/* 2025 bar (Amber Green) */}
                      <rect x={item.x + (barW + 3) * 2} y={260 - h2025} width={barW} height={h2025} fill="#10b981" rx="3" />
                      <text x={item.x + (barW + 3) * 2 + barW / 2} y={260 - h2025 - 4} textAnchor="middle" fontSize="10" fill="#059669" fontWeight="800">
                        {item.d2025}%
                      </text>

                      {/* Country Label */}
                      <text x={item.x + 36} y="285" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="700">
                        {item.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 pt-1 border-t border-slate-100 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-indigo-700">
                <span className="w-3.5 h-3.5 bg-indigo-500 rounded-sm" /> Năm 2000
              </span>
              <span className="flex items-center gap-1.5 text-cyan-700">
                <span className="w-3.5 h-3.5 bg-cyan-500 rounded-sm" /> Năm 2012
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-3.5 h-3.5 bg-emerald-500 rounded-sm" /> Năm 2025 (Dự báo / Thực tế)
              </span>
            </div>
          </div>
        )}

        {visualKind === 'topik_bar' && (
          /* =========================================================================
             3. TOPIK II QUESTION 53 (쓰기 53번): Mobile Shopping Surge
             ========================================================================= */
          <div className="w-full max-w-2xl bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="text-center space-y-1 border-b border-slate-100 pb-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase">
                TOPIK II 쓰기 53번 공식 통계 도표 (200~300자)
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                모바일 쇼핑 이용률 변화 및 증가 원인 (Xu Hướng Mua Sắm Di Động &amp; Nguyên Nhân)
              </h5>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* Left Bar Chart */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-700 mb-2 text-center">
                  [조사 기관: 한국경제연구원 · Đơn vị: %]
                </div>
                <div className="flex items-end justify-center gap-8 h-40 pt-4">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-black text-indigo-600">42%</span>
                    <div className="w-12 bg-indigo-400 rounded-t-lg" style={{ height: '70px' }} />
                    <span className="text-xs font-bold text-slate-700 mt-1">2020년</span>
                  </div>

                  {/* Growth Arrow Indicator */}
                  <div className="flex flex-col items-center justify-center text-rose-600 pb-10">
                    <span className="text-[11px] font-black flex items-center gap-0.5">
                      <TrendingUp className="w-4 h-4" /> +36%p
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">지속 증가</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-black text-emerald-600">78%</span>
                    <div className="w-12 bg-emerald-500 rounded-t-lg" style={{ height: '130px' }} />
                    <span className="text-xs font-bold text-slate-700 mt-1">2024년</span>
                  </div>
                </div>
              </div>

              {/* Right Cause Boxes */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>주요 증가 원인 (Nguyên nhân chính):</span>
                </div>

                <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-indigo-900 flex items-center justify-between">
                    <span>1. 간편 결제 시스템 도입</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-indigo-200 text-indigo-950 rounded font-black">원인 1</span>
                  </div>
                  <p className="text-[11px] text-indigo-800 leading-relaxed">
                    생체 인식 및 간편 페이 대중화로 결제 편의성 극대화 (Thanh toán sinh trắc học 1 chạm siêu tiện lợi).
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center justify-between">
                    <span>2. 당일·새벽 배송 서비스 확대</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-emerald-200 text-emerald-950 rounded font-black">원인 2</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    물류망 혁신을 통한 로켓 배송 및 신선식품 신속 배송 정착 (Mở rộng dịch vụ giao hàng hỏa tốc trong ngày).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {visualKind === 'hsk_graphic' && (
          /* =========================================================================
             4. HSK 5 PART 2: PICTURE WRITING PROMPT
             ========================================================================= */
          <div className="w-full max-w-2xl bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3.5">
            <div className="text-center space-y-1 border-b border-slate-100 pb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-black uppercase">
                HSK 5 书写 第二部分 (80字 看图与词汇结合)
              </span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                生态环境保护与可持续发展 (Bảo vệ Môi trường Sinh thái &amp; Tương lai Xanh)
              </h5>
            </div>

            {/* Visual Ecology Infographic */}
            <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="text-xs font-bold text-emerald-300">
                  🌿 绿色发展 · 低碳生活 (Phát triển Xanh &amp; Sống ít Carbon)
                </div>
                <div className="text-sm font-black text-white">
                  地球是我们共同的家园，每个人都承担着保护环境的重任。
                </div>
                <p className="text-[11px] text-slate-300">
                  Đoạn văn cần kết nối chặt chẽ cả 5 từ khóa bắt buộc vào mạch lập luận logic.
                </p>
              </div>

              {/* Keyword Badges */}
              <div className="flex flex-wrap sm:flex-col gap-1.5 shrink-0">
                {[
                  { zh: '环境 (huánjìng)', vi: 'Môi trường' },
                  { zh: '保护 (bǎohù)', vi: 'Bảo vệ' },
                  { zh: '不仅 (bùjǐn)', vi: 'Không những' },
                  { zh: '责任 (zérèn)', vi: 'Trách nhiệm' },
                  { zh: '未来 (wèilái)', vi: 'Tương lai' },
                ].map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 border border-white/20 text-xs font-bold text-amber-300"
                  >
                    <span>{item.zh}</span>
                    <span className="text-[10px] text-slate-300">· {item.vi}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {visualKind === 'letter_scenario' && (
          /* =========================================================================
             5. GENERAL TRAINING & MULTI-LANGUAGE CORRESPONDENCE SCENARIO
             ========================================================================= */
          <div className="w-full max-w-2xl bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-black text-slate-900">
                    Văn Bản Thư Tín &amp; Công Văn Trang Trọng
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Sơ đồ phân loại văn phong chuẩn mực quốc tế
                  </p>
                </div>
              </div>

              {prompt.letterTone && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase bg-indigo-100 text-indigo-900 border border-indigo-200">
                  {prompt.letterTone} Tone
                </span>
              )}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-b border-slate-200 pb-1.5">
                <span>THÔNG ĐIỆP GỬI ĐẾN (RECIPIENT): Cấp quản lý / Đại diện tổ chức</span>
                <span>ĐỘ DÀI: 150 – 250 từ</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                "{prompt.prompt}"
              </p>
            </div>
          </div>
        )}

        {/* Quick Highlights / Stat Snippets to copy into Writing Essay */}
        <div className="w-full max-w-2xl mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Sao chép nhanh số liệu mấu chốt để đưa vào bài viết:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {visualKind === 'line' ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
                      'Norway maintained undisputed dominance from 95% in 2000 to 98% in 2024',
                      'stat-norway'
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-[11px] font-bold text-slate-700 cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  {copiedKey === 'stat-norway' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>Na Uy (95% ➔ 98%)</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
                      'The UK experienced an exponential sixteen-fold surge from 3% to 49%',
                      'stat-uk'
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-[11px] font-bold text-slate-700 cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  {copiedKey === 'stat-uk' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>Anh (3% ➔ 49% tăng 16 lần)</span>
                </button>
              </>
            ) : visualKind === 'bar' ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
                      'Denmark established itself as the frontrunner, surging from 18% in 2000 to 78% in 2025',
                      'stat-denmark'
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-[11px] font-bold text-slate-700 cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  {copiedKey === 'stat-denmark' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>Đan Mạch (18% ➔ 78%)</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
                      'Poland recorded the most modest trajectory, rising from 2% to merely 22%',
                      'stat-poland'
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-[11px] font-bold text-slate-700 cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  {copiedKey === 'stat-poland' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>Ba Lan (2% ➔ 22%)</span>
                </button>
              </>
            ) : visualKind === 'topik_bar' ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
                      '모바일 쇼핑 이용률은 2020년 42%에서 2024년 78%로 36%p 급증하였다.',
                      'stat-topik'
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-[11px] font-bold text-slate-700 cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  {copiedKey === 'stat-topik' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>Câu mẫu TOPIK (42% ➔ 78%)</span>
                </button>
              </>
            ) : null}
          </div>
        </div>

        {/* Data Table Disclosure */}
        {showDataTable && (
          <div className="w-full max-w-2xl mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs animate-in fade-in duration-150">
            <div className="font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span>Bảng Số Liệu Chi Tiết (Detailed Data Extraction):</span>
              <span className="text-[10px] text-slate-500">Đơn vị: % tổng điện năng</span>
            </div>
            {visualKind === 'line' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                    <th className="py-1">Quốc Gia</th>
                    <th className="py-1">2000</th>
                    <th className="py-1">2012</th>
                    <th className="py-1">2024</th>
                    <th className="py-1">Tổng Tăng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-semibold">
                  <tr>
                    <td className="py-1 text-sky-700 font-bold">Na Uy (Norway)</td>
                    <td>95%</td>
                    <td>97%</td>
                    <td>98%</td>
                    <td className="text-emerald-600">+3%p (Ổn định đỉnh)</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-amber-700 font-bold">Đức (Germany)</td>
                    <td>7%</td>
                    <td>30%</td>
                    <td>58%</td>
                    <td className="text-emerald-600">+51%p</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-orange-700 font-bold">Tây Ban Nha (Spain)</td>
                    <td>18%</td>
                    <td>32%</td>
                    <td>54%</td>
                    <td className="text-emerald-600">+36%p</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-purple-700 font-bold">Vương Quốc Anh (UK)</td>
                    <td>3%</td>
                    <td>12%</td>
                    <td>49%</td>
                    <td className="text-emerald-600">+46%p (Gấp 16 lần)</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-slate-600 text-[11px]">
                {prompt.chartDescription || 'Dữ liệu được chuẩn hóa theo tiêu chuẩn hội đồng chấm thi quốc tế.'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Phóng To Biểu Đồ Đề Thi: {prompt.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                aria-label="Đóng phóng to biểu đồ"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-center">
              {/* Reuse visual rendering in larger canvas */}
              {visualKind === 'line' && (
                <div className="w-full max-w-3xl aspect-[16/9]">
                  <svg viewBox="0 0 640 340" className="w-full h-full select-none">
                    {/* Gridlines */}
                    {[0, 20, 40, 60, 80, 100].map((val, idx) => {
                      const y = 280 - (val / 100) * 230;
                      return (
                        <g key={idx}>
                          <line x1="65" y1={y} x2="595" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                          <text x="50" y={y + 4} textAnchor="end" fontSize="12" fill="#64748b" fontWeight="600">
                            {val}%
                          </text>
                        </g>
                      );
                    })}
                    <line x1="65" y1="280" x2="595" y2="280" stroke="#94a3b8" strokeWidth="2" />
                    {[
                      { yr: '2000', x: 80 },
                      { yr: '2006', x: 200 },
                      { yr: '2012', x: 320 },
                      { yr: '2018', x: 440 },
                      { yr: '2024', x: 560 },
                    ].map((pt, idx) => (
                      <g key={idx}>
                        <line x1={pt.x} y1="280" x2={pt.x} y2="286" stroke="#94a3b8" strokeWidth="2" />
                        <text x={pt.x} y="304" textAnchor="middle" fontSize="12" fill="#334155" fontWeight="700">
                          {pt.yr}
                        </text>
                      </g>
                    ))}
                    <polyline fill="none" stroke="#0284c7" strokeWidth="4" points="80,61 200,59 320,57 440,55 560,54" />
                    <polyline fill="none" stroke="#eab308" strokeWidth="3.5" points="80,264 200,245 320,211 440,179 560,147" />
                    <polyline fill="none" stroke="#ea580c" strokeWidth="3.5" points="80,239 200,229 320,206 440,181 560,156" />
                    <polyline fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="5 3" points="80,273 200,266 320,252 440,209 560,167" />
                  </svg>
                </div>
              )}

              {visualKind === 'bar' && (
                <div className="w-full max-w-3xl aspect-[16/9]">
                  <svg viewBox="0 0 640 330" className="w-full h-full select-none">
                    {[0, 20, 40, 60, 80].map((val, idx) => {
                      const y = 260 - (val / 80) * 210;
                      return (
                        <g key={idx}>
                          <line x1="60" y1={y} x2="600" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                          <text x="48" y={y + 4} textAnchor="end" fontSize="12" fill="#64748b" fontWeight="600">
                            {val}%
                          </text>
                        </g>
                      );
                    })}
                    <line x1="60" y1="260" x2="600" y2="260" stroke="#94a3b8" strokeWidth="2" />
                    {[
                      { name: 'Đan Mạch', x: 80, d2000: 18, d2012: 45, d2025: 78 },
                      { name: 'Đức', x: 188, d2000: 6, d2012: 24, d2025: 56 },
                      { name: 'Tây Ban Nha', x: 296, d2000: 15, d2012: 32, d2025: 51 },
                      { name: 'Vương Quốc Anh', x: 404, d2000: 3, d2012: 12, d2025: 48 },
                      { name: 'Ba Lan', x: 512, d2000: 2, d2012: 10, d2025: 22 },
                    ].map((item, idx) => {
                      const barW = 24;
                      const h2000 = (item.d2000 / 80) * 210;
                      const h2012 = (item.d2012 / 80) * 210;
                      const h2025 = (item.d2025 / 80) * 210;
                      return (
                        <g key={idx}>
                          <rect x={item.x} y={260 - h2000} width={barW} height={h2000} fill="#6366f1" rx="3" />
                          <rect x={item.x + barW + 3} y={260 - h2012} width={barW} height={h2012} fill="#06b6d4" rx="3" />
                          <rect x={item.x + (barW + 3) * 2} y={260 - h2025} width={barW} height={h2025} fill="#10b981" rx="3" />
                          <text x={item.x + 36} y="285" textAnchor="middle" fontSize="12" fill="#1e293b" fontWeight="700">
                            {item.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Gợi ý viết Task 1 Overview:</strong> Nhấn mạnh xu hướng tăng trưởng của toàn bộ các đối tượng, chỉ rõ quốc gia dẫn đầu và quốc gia tăng trưởng bứt phá mạnh nhất.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
