import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeSentence,
  validateSentenceAssembly,
  calculateStreak,
  calculateXpGain,
} from './grammar.ts';

test('normalizeSentence strips punctuation and standardizes spacing', () => {
  const raw = '¡Hola, cómo estás?';
  assert.equal(normalizeSentence(raw), 'hola cómo estás');
});

test('validateSentenceAssembly matches correct word token order', () => {
  const tokens = ['Yo', 'quiero', 'aprender', 'español'];
  const target = 'Yo quiero aprender español.';
  const res = validateSentenceAssembly(tokens, target);
  assert.equal(res.isMatch, true);
  assert.equal(res.accuracy, 100);
});

test('validateSentenceAssembly matches CJK sentences ignoring parenthetical pronunciation guides', () => {
  const tokens = ['明天我们要', '去车间', '检查', '生产线。'];
  const target = '明天我们要去车间检查生产线。(Míngtiān wǒmen yào qù chējiān jiǎnchá shēngchǎnxiàn.)';
  const res = validateSentenceAssembly(tokens, target);
  assert.equal(res.isMatch, true);
  assert.equal(res.accuracy, 100);
});

test('validateSentenceAssembly detects incorrect order and calculates accuracy', () => {
  const tokens = ['aprender', 'Yo', 'español', 'quiero'];
  const target = 'Yo quiero aprender español';
  const res = validateSentenceAssembly(tokens, target);
  assert.equal(res.isMatch, false);
  assert.ok(res.accuracy < 100);
});

test('calculateStreak increments when consecutive day activity occurs', () => {
  const res = calculateStreak('2026-05-01', '2026-05-02', 3);
  assert.equal(res.newStreak, 4);
  assert.equal(res.status, 'incremented');
});

test('calculateStreak maintains streak on same-day activity', () => {
  const res = calculateStreak('2026-05-02T10:00:00Z', '2026-05-02', 4);
  assert.equal(res.newStreak, 4);
  assert.equal(res.status, 'maintained');
});

test('calculateStreak resets when more than 1 day skipped', () => {
  const res = calculateStreak('2026-05-01', '2026-05-04', 5);
  assert.equal(res.newStreak, 1);
  assert.equal(res.status, 'reset');
});

test('calculateXpGain calculates base, streak bonus, and perfect bonus', () => {
  const baseOnly = calculateXpGain(20, 0, false);
  assert.equal(baseOnly, 20);

  const withBonuses = calculateXpGain(20, 5, true);
  // 20 + min(10, 20) + 15 = 45
  assert.equal(withBonuses, 45);
});
