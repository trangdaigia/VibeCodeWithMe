import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getSentenceBuilderChallenges,
  evaluateSentenceOrder,
  calculateArenaAttemptScore,
  computeEbbinghausRetention,
  generateMasteryCertificateMeta,
  getSmartMistakeClinicItems,
  sanitizePhoneticsForDisplay,
} from './ultimateArenaLogic';

describe('ultimateArenaLogic - Speed Recall, Sentence Syntax Builder & Certificate Engine', () => {
  it('sanitizes IPA phonetic strings to prevent tofu boxes and double slashes', () => {
    assert.equal(sanitizePhoneticsForDisplay('/ɪnˈɪʃ.ə.tɪv/'), "/in'ish.a.tiv/");
    assert.equal(sanitizePhoneticsForDisplay('pinyin'), '/pinyin/');
  });

  it('evaluates scrambled sentence ordering accurately', () => {
    const challenges = getSentenceBuilderChallenges('english');
    assert.ok(challenges.length >= 3);

    const first = challenges[0];
    const perfect = evaluateSentenceOrder(first.correctTokens, first.correctTokens);
    assert.equal(perfect.isCorrect, true);
    assert.equal(perfect.accuracyPercent, 100);

    const partial = evaluateSentenceOrder(first.scrambledTokens, first.correctTokens);
    assert.equal(partial.isCorrect, false);
    assert.ok(partial.accuracyPercent < 100);
  });

  it('calculates combo multipliers and Fever Mode in Speed Recall Arena', () => {
    const firstHit = calculateArenaAttemptScore({
      isCorrect: true,
      currentStreak: 0,
      remainingSeconds: 10,
    });
    assert.equal(firstHit.nextStreak, 1);
    assert.equal(firstHit.comboMultiplier, 1);
    assert.equal(firstHit.isFeverMode, false);

    const fifthHit = calculateArenaAttemptScore({
      isCorrect: true,
      currentStreak: 4,
      remainingSeconds: 12,
    });
    assert.equal(fifthHit.nextStreak, 5);
    assert.equal(fifthHit.comboMultiplier, 3);
    assert.equal(fifthHit.isFeverMode, true);
    assert.ok(fifthHit.earnedPoints > firstHit.earnedPoints);

    const miss = calculateArenaAttemptScore({
      isCorrect: false,
      currentStreak: 6,
      remainingSeconds: 8,
    });
    assert.equal(miss.nextStreak, 0);
    assert.equal(miss.earnedPoints, 0);
  });

  it('computes Ebbinghaus memory retention curve where SRS outperforms unreviewed decay', () => {
    const curve1 = computeEbbinghausRetention(1);
    const curve5 = computeEbbinghausRetention(5);

    assert.equal(curve1.length, 5);
    const day30Review1 = curve1[curve1.length - 1];
    const day30Review5 = curve5[curve5.length - 1];

    assert.ok(day30Review1.srsReviewedRetention > day30Review1.unreviewedRetention);
    assert.ok(day30Review5.srsReviewedRetention > day30Review1.srsReviewedRetention);
  });

  it('generates verifiable certificate metadata and Smart Mistake Clinic items', () => {
    const cert = generateMasteryCertificateMeta({
      recipientName: 'Quản trị viên Tối cao',
      recipientEmail: 'daigia170904@gmail.com',
      languageId: 'english',
      languageNameVi: 'Tiếng Anh',
      nativeLanguageName: 'English',
      examBenchmark: 'IELTS Academic 8.5',
      totalXp: 2500,
      streakDays: 16,
      completedLessonsCount: 6,
      examsCompleted: 4,
    });

    assert.equal(cert.estimatedCefr, 'C2');
    assert.ok(cert.certificateId.startsWith('LF-2026-EN-'));
    assert.equal(cert.honorsTier, 'Xuất Sắc Tối Cao (Summa Cum Laude)');

    const mistakes = getSmartMistakeClinicItems('english');
    assert.ok(mistakes.length >= 3);
  });
});
