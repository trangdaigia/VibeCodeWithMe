import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSrsNextReview, isCardDue } from './srs.ts';

test('SM-2 SRS algorithm: first successful recall gives 1-day interval', () => {
  const base = new Date('2026-05-01T12:00:00Z');
  const result = calculateSrsNextReview(0, 2.5, 0, 5, base);
  assert.equal(result.repetitions, 1);
  assert.equal(result.intervalDays, 1);
  assert.equal(result.status, 'Learning');
  const nextDate = new Date(result.nextReviewDate);
  assert.equal(nextDate.toISOString().split('T')[0], '2026-05-02');
});

test('SM-2 SRS algorithm: second successful recall gives 6-day interval', () => {
  const base = new Date('2026-05-01T12:00:00Z');
  const result = calculateSrsNextReview(1, 2.5, 1, 4, base);
  assert.equal(result.repetitions, 2);
  assert.equal(result.intervalDays, 6);
  assert.equal(result.status, 'Learning');
  const nextDate = new Date(result.nextReviewDate);
  assert.equal(nextDate.toISOString().split('T')[0], '2026-05-07');
});

test('SM-2 SRS algorithm: third successful recall applies ease factor multiplier', () => {
  const base = new Date('2026-05-01T12:00:00Z');
  const result = calculateSrsNextReview(2, 2.5, 6, 5, base);
  assert.equal(result.repetitions, 3);
  // Interval: 6 * 2.6 (since 5 rating increases EF by 0.1 to 2.6) = 15.6 -> 16
  assert.equal(result.intervalDays, 16);
  assert.equal(result.status, 'Reviewing');
});

test('SM-2 SRS algorithm: failed recall resets repetitions to 0 and interval to 1', () => {
  const base = new Date('2026-05-01T12:00:00Z');
  const result = calculateSrsNextReview(4, 2.4, 25, 1, base);
  assert.equal(result.repetitions, 0);
  assert.equal(result.intervalDays, 1);
  assert.equal(result.status, 'Learning');
});

test('SM-2 SRS algorithm: ease factor never drops below 1.3 floor', () => {
  let ef = 1.35;
  for (let i = 0; i < 5; i++) {
    const res = calculateSrsNextReview(0, ef, 1, 0);
    ef = res.easeFactor;
  }
  assert.ok(ef >= 1.3);
});

test('isCardDue accurately identifies past or current review timestamps', () => {
  const now = new Date('2026-05-10T12:00:00Z');
  assert.equal(isCardDue('2026-05-09T10:00:00Z', now), true);
  assert.equal(isCardDue('2026-05-11T10:00:00Z', now), false);
});
