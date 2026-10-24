import test from 'node:test';
import assert from 'node:assert/strict';
import { AI_MASTERY_STUDIO_DATA } from '../data/aiMasteryStudioData';
import {
  getLanguageMasteryPack,
  filterSpeakingDrills,
  filterWritingPrompts,
  countWritingUnits,
  evaluatePronunciationAttempt,
  evaluateWritingSubmissionLocal,
  computeSixSkillRadarMetrics
} from './masteryStudioLogic';

const ALL_LANGUAGES = [
  'english',
  'chinese',
  'japanese',
  'korean',
  'french',
  'german',
  'spanish'
];

test('All 7 languages have complete Speaking Drills and Writing Prompts from Basic to Advanced', () => {
  for (const lang of ALL_LANGUAGES) {
    const pack = getLanguageMasteryPack(lang);
    assert.equal(pack.languageId, lang);
    assert.equal(pack.speakingDrills.length, 3, `Expected 3 speaking drills for ${lang}`);
    assert.equal(pack.writingPrompts.length, 3, `Expected 3 writing prompts for ${lang}`);

    const levels = pack.speakingDrills.map((d) => d.level);
    assert.deepEqual(levels, ['basic', 'intermediate', 'advanced']);

    const wrtLevels = pack.writingPrompts.map((w) => w.level);
    assert.deepEqual(wrtLevels, ['basic', 'intermediate', 'advanced']);
  }
});

test('Phonetic transcriptions avoid unsupported IPA symbols that render as tofu boxes in Linux Chromium', () => {
  const forbiddenIpaRegex = /[ˈˌəʊʃθðʒŋæɑɔɜɪ]/;
  for (const lang of ALL_LANGUAGES) {
    const pack = AI_MASTERY_STUDIO_DATA[lang];
    for (const drill of pack.speakingDrills) {
      assert.equal(
        forbiddenIpaRegex.test(drill.phoneticTranscription),
        false,
        `Drill ${drill.id} contains forbidden IPA symbol in ${drill.phoneticTranscription}`
      );
      assert.equal(drill.nativePitchContour.length, 12);
    }
  }
});

test('filterSpeakingDrills and filterWritingPrompts filter accurately by level', () => {
  const basicDrills = filterSpeakingDrills('japanese', 'basic');
  assert.equal(basicDrills.length, 1);
  assert.equal(basicDrills[0].level, 'basic');

  const advPrompts = filterWritingPrompts('korean', 'advanced');
  assert.equal(advPrompts.length, 1);
  assert.equal(advPrompts[0].level, 'advanced');
});

test('countWritingUnits handles Latin word count and CJK character count accurately', () => {
  assert.equal(countWritingUnits('Learning a foreign language is beneficial.', 'english'), 6);
  assert.equal(countWritingUnits('我每天坚持学习汉语。', 'chinese'), 10);
  assert.equal(countWritingUnits('電子書籍はとても便利です。', 'japanese'), 13);
});

test('evaluatePronunciationAttempt computes 4-dimension scores, pitch contour, and word diagnostics', () => {
  const drill = filterSpeakingDrills('english', 'advanced')[0];
  const excellentResult = evaluatePronunciationAttempt(drill, 'excellent');
  const needsWorkResult = evaluatePronunciationAttempt(drill, 'needs-work');

  assert.ok(excellentResult.overallScore >= 90);
  assert.ok(needsWorkResult.overallScore < 75);
  assert.equal(excellentResult.learnerPitchContour.length, 12);
  assert.equal(excellentResult.wordDiagnostics.length, drill.syllables.length);
});

test('evaluateWritingSubmissionLocal grades 4 official criteria and detects power vocabulary', () => {
  const prompt = filterWritingPrompts('english', 'intermediate')[0];
  const highBandEval = evaluateWritingSubmissionLocal(prompt, prompt.modelHighBandEssay);
  const shortDraftEval = evaluateWritingSubmissionLocal(prompt, 'Working from home is good.');

  assert.equal(highBandEval.lengthGoalMet, true);
  assert.ok(highBandEval.overallScore100 > shortDraftEval.overallScore100);
  assert.ok(highBandEval.criteria.lexicalResource >= 80);
  assert.ok(highBandEval.bandOrScaleLabel.includes('IELTS Band'));
});

test('computeSixSkillRadarMetrics returns 6 valid SVG polygon vertices and personalized missions', () => {
  const analysis = computeSixSkillRadarMetrics({
    languageId: 'french',
    xp: 1200,
    streak: 14,
    completedLessonsCount: 4,
    examsCompleted: 2,
    vocabCount: 25,
    speakingBonus: 8,
    writingBonus: 10
  });

  assert.equal(analysis.axes.length, 6);
  assert.equal(analysis.learnerPolygonPoints.split(' ').length, 6);
  assert.equal(analysis.benchmarkPolygonPoints.split(' ').length, 6);
  assert.equal(analysis.recommendedMissions.length, 3);
  assert.ok(analysis.overallReadinessPercent > 0 && analysis.overallReadinessPercent <= 100);
});
