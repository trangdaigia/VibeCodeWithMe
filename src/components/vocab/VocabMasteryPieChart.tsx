import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon, Layers, Award, Sparkles } from 'lucide-react';
import { VocabCard } from '../../data/curriculum';

interface VocabMasteryPieChartProps {
  cards: VocabCard[];
}

export const VocabMasteryPieChart: React.FC<VocabMasteryPieChartProps> = ({ cards }) => {
  const masteredCount = cards.filter((c) => c.status === 'Mastered').length;
  const reviewingCount = cards.filter((c) => c.status === 'Reviewing').length;
  const learningCount = cards.filter((c) => c.status === 'Learning').length;
  const newCount = cards.filter((c) => !c.status || c.status === 'New').length;

  const data = [
    { name: 'Đã thành thạo (Mastered)', value: masteredCount, color: '#10B981' },
    { name: 'Đang ôn định kỳ (Reviewing)', value: reviewingCount, color: '#6366F1' },
    { name: 'Đang củng cố (Learning)', value: learningCount, color: '#F59E0B' },
    { name: 'Từ mới chưa thuộc (New)', value: newCount, color: '#94A3B8' },
  ].filter((d) => d.value > 0);

  const totalCards = cards.length;
  const masteredPercent = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <PieChartIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Phân Bố Mức Độ Thành Thạo Từ Vựng (SRS)</span>
              <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2 py-0.2 rounded-md">
                Recharts Analytics
              </span>
            </h3>
            <p className="text-xs text-slate-500">Tỷ lệ phân bổ trạng thái ghi nhớ theo SuperMemo SM-2</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Tỷ lệ thành thạo</span>
          <span className="text-sm font-black text-emerald-600 tabular-nums">{masteredPercent}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Recharts Pie Chart Canvas */}
        <div className="md:col-span-2 h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.length > 0 ? data : [{ name: 'Trống', value: 1, color: '#CBD5E1' }]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                }}
                formatter={(value: any, name: any) => [`${value} thẻ từ`, name]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-[11px] font-semibold text-slate-700">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Metrics Breakdown */}
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-emerald-950">Thành thạo</span>
            </div>
            <span className="font-extrabold text-emerald-900 tabular-nums">{masteredCount} thẻ</span>
          </div>

          <div className="p-2.5 bg-indigo-50/80 rounded-xl border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="font-semibold text-indigo-950">Ôn định kỳ</span>
            </div>
            <span className="font-extrabold text-indigo-900 tabular-nums">{reviewingCount} thẻ</span>
          </div>

          <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="font-semibold text-amber-950">Đang củng cố</span>
            </div>
            <span className="font-extrabold text-amber-900 tabular-nums">{learningCount} thẻ</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="font-semibold text-slate-700">Từ mới</span>
            </div>
            <span className="font-extrabold text-slate-800 tabular-nums">{newCount} thẻ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
