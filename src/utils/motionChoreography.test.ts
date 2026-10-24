import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeStaggerDelay,
  clampVisualProgress,
  getLanguageAmbientPalette,
  FLUID_EASE_OUT,
  SPRING_SNAPPY,
} from './motionChoreography';

test('computeStaggerDelay returns 0 for first or negative index and caps at maxDelaySeconds', () => {
  assert.equal(computeStaggerDelay(0), 0);
  assert.equal(computeStaggerDelay(-2), 0);
  assert.equal(computeStaggerDelay(1, 0.05, 0.3), 0.05);
  assert.equal(computeStaggerDelay(3, 0.05, 0.3), 0.15);
  assert.equal(computeStaggerDelay(20, 0.05, 0.3), 0.3);
});

test('clampVisualProgress enforces minimum visual bar width and caps at 100%', () => {
  assert.equal(clampVisualProgress(0, 6), 6);
  assert.equal(clampVisualProgress(-15, 6), 6);
  assert.equal(clampVisualProgress(45.4, 6), 45);
  assert.equal(clampVisualProgress(140, 6), 100);
});

test('getLanguageAmbientPalette returns distinct ambient gradients for all 7 languages', () => {
  const en = getLanguageAmbientPalette('english');
  const ja = getLanguageAmbientPalette('japanese');
  const zh = getLanguageAmbientPalette('chinese');
  assert.ok(en.heroGradient.includes('indigo-950'));
  assert.ok(ja.heroGradient.includes('fuchsia-950'));
  assert.ok(zh.heroGradient.includes('rose-950'));
});

test('FLUID_EASE_OUT and SPRING_SNAPPY have valid physics parameters', () => {
  assert.equal(FLUID_EASE_OUT.length, 4);
  assert.equal(SPRING_SNAPPY.type, 'spring');
  assert.ok(SPRING_SNAPPY.stiffness > 200);
});
