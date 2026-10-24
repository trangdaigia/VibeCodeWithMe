import test from 'node:test';
import assert from 'node:assert/strict';
import {
  determineChartVisualKind,
  calculateGrowthRate,
  synthesizeTask1Overview
} from './writingChartLogic';

test('determineChartVisualKind classifies line chart for ielts-wp-task1', () => {
  assert.equal(determineChartVisualKind('ielts-wp-task1'), 'line');
  assert.equal(determineChartVisualKind('custom-task', 'Line Graph Analysis', 'The line graph shows...'), 'line');
});

test('determineChartVisualKind classifies topik_bar for Korean prompt', () => {
  assert.equal(determineChartVisualKind('ko-wp-1', 'TOPIK II 쓰기 Câu 53'), 'topik_bar');
});

test('determineChartVisualKind classifies hsk_graphic for Chinese prompt', () => {
  assert.equal(determineChartVisualKind('zh-wp-1', 'HSK 5 书写'), 'hsk_graphic');
});

test('determineChartVisualKind classifies letter_scenario for GT and European language prompts', () => {
  assert.equal(determineChartVisualKind('ja-wp-1', 'Business Email'), 'letter_scenario');
  assert.equal(determineChartVisualKind('fr-wp-1', 'Lettre formelle au Maire'), 'letter_scenario');
  assert.equal(determineChartVisualKind('ielts-gt-wp-1', 'General Training Letter'), 'letter_scenario');
});

test('calculateGrowthRate handles upward surge accurately', () => {
  const result = calculateGrowthRate(3, 49);
  assert.equal(result.diff, 46);
  assert.equal(result.multiplier, 16.3);
  assert.equal(result.direction, 'up');
});

test('synthesizeTask1Overview creates accurate academic overview summary', () => {
  const data = [
    { name: 'Norway', start: 95, end: 98 },
    { name: 'Spain', start: 18, end: 54 },
    { name: 'UK', start: 3, end: 49 },
  ];
  const summary = synthesizeTask1Overview(data);
  assert.ok(summary.includes('Norway establishing a commanding lead'));
  assert.ok(summary.includes('UK recorded the most modest figures'));
});
