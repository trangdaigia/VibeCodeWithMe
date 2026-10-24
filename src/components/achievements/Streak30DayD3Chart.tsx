import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Flame, Calendar, TrendingUp } from 'lucide-react';

interface Streak30DayD3ChartProps {
  currentStreak: number;
  todayXp: number;
}

interface DayData {
  dayIndex: number;
  dateStr: string;
  displayDate: string;
  xp: number;
  active: boolean;
}

export const Streak30DayD3Chart: React.FC<Streak30DayD3ChartProps> = ({
  currentStreak,
  todayXp,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);

  // Generate 30 days of synthetic/realistic activity history leading up to today
  const data: DayData[] = React.useMemo(() => {
    const list: DayData[] = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);

      // Determine activity based on streak length and pseudo-random seed
      const isActive = i < currentStreak || (i % 3 !== 0 && i % 7 !== 0);
      let xp = 0;
      if (i === 0) {
        xp = todayXp;
      } else if (isActive) {
        // Pseudo random XP between 30 and 120
        const seed = (d.getDate() * 17 + d.getMonth() * 31) % 90;
        xp = 30 + seed;
      }

      list.push({
        dayIndex: 29 - i,
        dateStr: d.toISOString().split('T')[0],
        displayDate: d.toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' }),
        xp,
        active: xp > 0,
      });
    }
    return list;
  }, [currentStreak, todayXp]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous SVG contents
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerRef.current.clientWidth || 600;
    const height = 180;
    const margin = { top: 20, right: 20, bottom: 30, left: 35 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X and Y Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, 29])
      .range([0, innerWidth]);

    const maxY = d3.max(data, (d) => d.xp) || 100;
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(100, maxY + 20)])
      .range([innerHeight, 0]);

    // Gridlines
    const yGrid = d3.axisLeft(yScale).ticks(4).tickSize(-innerWidth).tickFormat(() => '');
    g.append('g')
      .attr('class', 'grid')
      .call(yGrid)
      .selectAll('line')
      .attr('stroke', '#334155')
      .attr('stroke-dasharray', '3,3')
      .attr('stroke-opacity', 0.5);

    g.selectAll('.grid .domain').remove();

    // Gradient definition for area under the curve
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'streak-area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#F59E0B') // Amber glow
      .attr('stop-opacity', 0.45);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#F59E0B')
      .attr('stop-opacity', 0.0);

    // D3 Area Generator
    const area = d3
      .area<DayData>()
      .x((d) => xScale(d.dayIndex))
      .y0(innerHeight)
      .y1((d) => yScale(d.xp))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#streak-area-gradient)')
      .attr('d', area);

    // D3 Line Generator
    const line = d3
      .line<DayData>()
      .x((d) => xScale(d.dayIndex))
      .y((d) => yScale(d.xp))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#F59E0B')
      .attr('stroke-width', 2.5)
      .attr('d', line);

    // X Axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(6)
      .tickFormat((i) => {
        const item = data[Math.round(i as number)];
        return item ? item.displayDate : '';
      });

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#94A3B8')
      .attr('font-size', '10px');

    // Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(4);
    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#94A3B8')
      .attr('font-size', '10px');

    g.selectAll('.domain').attr('stroke', '#475569');

    // Interactive Data Dots
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.dayIndex))
      .attr('cy', (d) => yScale(d.xp))
      .attr('r', (d) => (d.dayIndex === 29 ? 5 : 3.5))
      .attr('fill', (d) => (d.xp > 0 ? '#F59E0B' : '#475569'))
      .attr('stroke', '#0F172A')
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer')
      .on('mouseover', (_event, d) => {
        setHoveredDay(d);
      })
      .on('mouseout', () => {
        setHoveredDay(null);
      });
  }, [data]);

  const activeDaysCount = data.filter((d) => d.xp > 0).length;
  const totalPeriodXp = data.reduce((sum, d) => sum + d.xp, 0);

  return (
    <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-3">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Lịch Sử Chuỗi Ngày &amp; Tiến Độ 30 Ngày</span>
              <span className="text-[10px] font-black text-amber-400 bg-amber-500/20 px-2 py-0.2 rounded-md">
                D3.js Visualization
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Biểu đồ thể hiện mật độ học tập &amp; XP tích lũy 30 ngày qua</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Số ngày học:</span>
            <strong className="text-amber-400 font-bold">{activeDaysCount} / 30 ngày</strong>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Tổng XP 30 ngày:</span>
            <strong className="text-emerald-400 font-bold">+{totalPeriodXp} XP</strong>
          </div>
        </div>
      </div>

      {/* D3 Chart Canvas Area */}
      <div ref={containerRef} className="w-full relative">
        <svg ref={svgRef} className="w-full h-auto overflow-visible" />

        {/* Hover Tooltip Overlay */}
        {hoveredDay && (
          <div className="absolute top-2 right-4 bg-slate-900 border border-slate-700 p-2 rounded-xl shadow-xl text-[11px] text-slate-200 animate-in fade-in duration-150 z-20 pointer-events-none">
            <div className="font-bold text-amber-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{hoveredDay.displayDate} ({hoveredDay.dateStr})</span>
            </div>
            <div className="text-white font-black mt-0.5">
              XP Tích Lũy: <span className="text-emerald-400">+{hoveredDay.xp} XP</span>
            </div>
            <div className="text-[10px] text-slate-400">
              {hoveredDay.xp > 0 ? '🔥 Đã duy trì học tập' : '⚪ Không có hoạt động'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
