import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ACHIEVEMENTS_REGISTRY,
  UserLearningStats,
  evaluatePendingAchievements,
  calculateAchievementProgress
} from './achievements';

test('Achievement system detects milestone unlocks correctly', () => {
  const initialStats: UserLearningStats = {
    streak: 3,
    totalMasteredWords: 40,
    examsCompleted: 0,
    completedLessonsCount: 1,
    xp: 150
  };

  // Milestone 'streak-3' and 'first-lesson' should be unlocked with these stats
  const unlocked = evaluatePendingAchievements(initialStats, []);
  const ids = unlocked.map(a => a.id);
  assert.ok(ids.includes('streak-3'), '3-day streak should unlock');
  assert.ok(ids.includes('first-lesson'), 'First lesson should unlock');
  assert.ok(!ids.includes('streak-10'), '10-day streak should not unlock yet');
  assert.ok(!ids.includes('words-1000'), '1000 words should not unlock yet');
  assert.ok(!ids.includes('first-ielts-exam'), 'First exam should not unlock yet');
});

test('10-day streak, 1000 words mastered, and First IELTS exam unlock at threshold', () => {
  const advancedStats: UserLearningStats = {
    streak: 10,
    totalMasteredWords: 1050,
    examsCompleted: 1,
    completedLessonsCount: 8,
    xp: 850
  };

  const unlocked = evaluatePendingAchievements(advancedStats, ['streak-3', 'first-lesson']);
  const ids = unlocked.map(a => a.id);

  assert.ok(ids.includes('streak-10'), '10-day streak milestone must unlock');
  assert.ok(ids.includes('words-1000'), '1000 words mastered milestone must unlock');
  assert.ok(ids.includes('first-ielts-exam'), 'First IELTS practice exam completed must unlock');
  assert.ok(!ids.includes('streak-3'), 'Already unlocked streak-3 should not be in newly unlocked list');
});

test('calculateAchievementProgress computes valid percentages and bounds', () => {
  const stats: UserLearningStats = {
    streak: 5,
    totalMasteredWords: 500,
    examsCompleted: 0,
    completedLessonsCount: 2,
    xp: 300
  };

  const streak10 = ACHIEVEMENTS_REGISTRY.find(a => a.id === 'streak-10')!;
  const p1 = calculateAchievementProgress(streak10, stats, false);
  assert.equal(p1.current, 5);
  assert.equal(p1.max, 10);
  assert.equal(p1.percentage, 50);
  assert.equal(p1.isUnlocked, false);

  const words1000 = ACHIEVEMENTS_REGISTRY.find(a => a.id === 'words-1000')!;
  const p2 = calculateAchievementProgress(words1000, stats, false);
  assert.equal(p2.current, 500);
  assert.equal(p2.max, 1000);
  assert.equal(p2.percentage, 50);

  // When marked unlocked, percentage should be 100
  const pUnlocked = calculateAchievementProgress(words1000, stats, true);
  assert.equal(pUnlocked.percentage, 100);
  assert.equal(pUnlocked.isUnlocked, true);
});
