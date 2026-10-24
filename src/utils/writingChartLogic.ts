// Pure logic and helper utilities for Writing Exam Charts & Visual Diagrams

export type ChartVisualKind =
  | 'line'
  | 'bar'
  | 'pie'
  | 'process'
  | 'table'
  | 'topik_bar'
  | 'hsk_graphic'
  | 'letter_scenario';

export interface VisualDataPoint {
  label: string;
  year2000?: number;
  year2012?: number;
  year2024_2025?: number;
  color?: string;
  highlight?: boolean;
}

/**
 * Determines the visual chart kind based on prompt ID, title, and prompt description.
 */
export function determineChartVisualKind(promptId: string, title?: string, promptText?: string): ChartVisualKind {
  const combined = `${promptId} ${title || ''} ${promptText || ''}`.toLowerCase();

  if (combined.includes('line') || promptId === 'ielts-wp-task1') {
    return 'line';
  }
  if (combined.includes('topik') || promptId.startsWith('ko-')) {
    return 'topik_bar';
  }
  if (combined.includes('hsk') || promptId.startsWith('zh-')) {
    return 'hsk_graphic';
  }
  if (
    combined.includes('letter') ||
    combined.includes('email') ||
    combined.includes('thư') ||
    promptId.startsWith('ja-') ||
    promptId.startsWith('fr-') ||
    promptId.startsWith('de-') ||
    promptId.startsWith('es-') ||
    promptId.includes('gt')
  ) {
    return 'letter_scenario';
  }
  if (combined.includes('bar') || promptId === 'ielts-w-task1') {
    return 'bar';
  }
  if (combined.includes('pie') || combined.includes('proportion')) {
    return 'pie';
  }
  if (combined.includes('process') || combined.includes('quy trình')) {
    return 'process';
  }
  if (combined.includes('table') || combined.includes('bảng')) {
    return 'table';
  }
  return 'bar';
}

/**
 * Calculates percentage growth between two points.
 */
export function calculateGrowthRate(startVal: number, endVal: number): {
  diff: number;
  multiplier: number;
  direction: 'up' | 'down' | 'steady';
} {
  const diff = Number((endVal - startVal).toFixed(1));
  const multiplier = startVal > 0 ? Number((endVal / startVal).toFixed(1)) : 0;
  const direction = diff > 0 ? 'up' : diff < 0 ? 'down' : 'steady';
  return { diff, multiplier, direction };
}

/**
 * Generates an overview sentence draft from highest and lowest data points.
 */
export function synthesizeTask1Overview(items: { name: string; start: number; end: number }[]): string {
  if (!items || items.length === 0) return '';
  const sorted = [...items].sort((a, b) => b.end - a.end);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];
  return `Overall, all surveyed entities experienced positive trajectories, with ${highest.name} establishing a commanding lead by the final year, whereas ${lowest.name} recorded the most modest figures.`;
}
