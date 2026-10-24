import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeSpokenText,
  normalizeTargetText,
  computeLevenshteinDistance,
  calculatePronunciationSimilarity,
  evaluatePronunciationResult,
  resolveSpeechRecognitionLocale,
} from './pronunciationLogic.ts';

test('normalizeSpokenText strips punctuation and normalizes casing', () => {
  assert.equal(normalizeSpokenText('  "Initiative!"  '), 'initiative');
  assert.equal(normalizeSpokenText('Hello, World?!'), 'hello world');
  assert.equal(normalizeSpokenText('   '), '');
});

test('computeLevenshteinDistance computes edit distance correctly', () => {
  assert.equal(computeLevenshteinDistance('kitten', 'sitting'), 3);
  assert.equal(computeLevenshteinDistance('hello', 'hello'), 0);
  assert.equal(computeLevenshteinDistance('', 'test'), 4);
});

test('calculatePronunciationSimilarity returns 100 for exact match and high score for containment', () => {
  assert.equal(calculatePronunciationSimilarity('initiative', 'initiative'), 100);
  assert.equal(calculatePronunciationSimilarity('Deliverable', 'deliverable'), 100);

  // When user speaks "take the initiative" for target "initiative"
  const containment = calculatePronunciationSimilarity('take the initiative', 'initiative');
  assert.ok(containment >= 90);

  // Close typo/variant
  const close = calculatePronunciationSimilarity('initiatives', 'initiative');
  assert.ok(close >= 80);

  // Irrelevant word
  const bad = calculatePronunciationSimilarity('banana', 'initiative');
  assert.ok(bad < 40);
});

test('evaluatePronunciationResult classifies into excellent, good, or retry with actionable feedback', () => {
  const excellent = evaluatePronunciationResult('collaborative', 'collaborative', 'en-US');
  assert.equal(excellent.verdict, 'excellent');
  assert.ok(excellent.score >= 85);

  const good = evaluatePronunciationResult('collaborat', 'collaborative', 'en-US');
  assert.equal(good.verdict, 'good');
  assert.ok(good.score >= 60 && good.score < 85);

  const retry = evaluatePronunciationResult('elephant', 'collaborative', 'en-US');
  assert.equal(retry.verdict, 'retry');
  assert.ok(retry.score < 60);
});

test('resolveSpeechRecognitionLocale maps all 7 language codes correctly', () => {
  assert.equal(resolveSpeechRecognitionLocale('en-US'), 'en-US');
  assert.equal(resolveSpeechRecognitionLocale('zh-CN'), 'zh-CN');
  assert.equal(resolveSpeechRecognitionLocale('ja-JP'), 'ja-JP');
  assert.equal(resolveSpeechRecognitionLocale('ko-KR'), 'ko-KR');
  assert.equal(resolveSpeechRecognitionLocale('fr-FR'), 'fr-FR');
  assert.equal(resolveSpeechRecognitionLocale('de-DE'), 'de-DE');
  assert.equal(resolveSpeechRecognitionLocale('es-ES'), 'es-ES');
  assert.equal(resolveSpeechRecognitionLocale('unknown'), 'en-US');
});
