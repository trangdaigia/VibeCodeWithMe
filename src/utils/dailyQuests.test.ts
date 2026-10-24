import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeDailyQuests,
  evaluatePlacementLevel,
  buildSortedLeaderboard
} from './dailyQuests.ts';

describe('Daily Quests, CEFR Placement & Leaderboard Engine', () => {
  it('computes daily quest completion states accurately', () => {
    const quests = computeDailyQuests({
      todayXp: 60,
      dailyXpGoal: 50,
      completedLessonsCount: 1,
      dailyWordPracticed: true
    });
    assert.equal(quests.length, 3);
    assert.equal(quests[0].isCompleted, true);
    assert.equal(quests[1].isCompleted, false);
    assert.equal(quests[2].isCompleted, true);
  });

  it('evaluates CEFR placement level based on accuracy ratio', () => {
    assert.equal(evaluatePlacementLevel(5, 5).cefrLevel, 'C1');
    assert.equal(evaluatePlacementLevel(4, 5).cefrLevel, 'B2');
    assert.equal(evaluatePlacementLevel(3, 5).cefrLevel, 'B1');
    assert.equal(evaluatePlacementLevel(2, 5).cefrLevel, 'A2');
    assert.equal(evaluatePlacementLevel(0, 5).cefrLevel, 'A1');
  });

  it('sorts leaderboard descending by XP and assigns sequential 1-based ranks', () => {
    const board = buildSortedLeaderboard(
      [
        { uid: 'owner_admin', displayName: 'Bạn', role: 'admin', xp: 500, streak: 5, targetBand: 'Band 8.0' },
        { uid: 'u2', displayName: 'Minh Quân', role: 'teacher', xp: 980, streak: 12, targetBand: 'Band 8.5+' },
        { uid: 'u3', displayName: 'Hoàng Nam', role: 'student', xp: 300, streak: 3, targetBand: 'Band 7.0' }
      ],
      { displayName: 'Admin Bạn', role: 'admin', xp: 1100, streak: 10, targetBand: 'Band 8.5+' }
    );

    assert.equal(board[0].displayName, 'Admin Bạn');
    assert.equal(board[0].rank, 1);
    assert.equal(board[0].isCurrentUser, true);
    assert.equal(board[1].displayName, 'Minh Quân');
    assert.equal(board[1].rank, 2);
  });
});
