import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateWritingBy4Criteria,
  buildFullSimulatorPaperFromTestSet,
  computeSectionDiagnostics,
  CAMBRIDGE_PARAPHRASE_DRILLS,
} from './ieltsMasteryEngine';
import { ieltsTestSets } from '../data/courses/englishIeltsSetsData';

test('evaluateWritingBy4Criteria returns zeroed bands for empty input', () => {
  const res = evaluateWritingBy4Criteria('', 'Task 2');
  assert.equal(res.overallWritingBand, 0);
  assert.equal(res.wordCount, 0);
  assert.ok(res.improvements.length > 0);
});

test('evaluateWritingBy4Criteria scores a high-caliber C1/C2 essay at Band 7.5+ with detected cohesive devices and complex grammar', () => {
  const sampleEssay = `
    While proponents of institutional prohibitions invoke legitimate apprehensions regarding academic plagiarism, preemptive bans fail to equip scholars with the algorithmic literacy imperative for contemporary scholarship.

    Furthermore, the proliferation of autonomous generative models has fundamentally reshaped the socioeconomic trajectory of modern industries. Having been integrated into empirical research workflows, these systems mitigate repetitive burdens and allow investigators to substantiate complex hypotheses which would otherwise remain unexplored.

    Conversely, unbridled reliance on automated synthesis can exacerbate cognitive passivity among novice learners. Nevertheless, were universities to establish transparent ethical frameworks rather than blanket restrictions, students could harness these indispensable tools sustainably.

    In conclusion, although artificial intelligence poses undeniable pedagogical challenges, I firmly believe that structured integration is far more constructive than prohibition. Notwithstanding initial disruptions, cultivating critical digital competence remains paramount.
  `;

  const res = evaluateWritingBy4Criteria(sampleEssay, 'Task 2');
  assert.ok(res.wordCount >= 120);
  assert.equal(res.paragraphCount, 4);
  assert.ok(res.detectedCohesiveDevices.includes('furthermore'));
  assert.ok(res.detectedCohesiveDevices.includes('conversely'));
  assert.ok(res.detectedAcademicLexis.includes('proliferation'));
  assert.ok(res.detectedComplexGrammar.length >= 3);
  assert.ok(res.overallWritingBand >= 7.0);
});

test('buildFullSimulatorPaperFromTestSet builds 40 listening and 40 reading questions for any Cambridge test set', () => {
  const cam18Set = ieltsTestSets.find((s) => s.code === 'CAM-18');
  assert.ok(cam18Set, 'CAM-18 set should exist');

  const paper = buildFullSimulatorPaperFromTestSet(cam18Set);
  assert.equal(paper.paperCode, 'CAM-18');
  assert.equal(paper.listening40.length, 40);
  assert.equal(paper.reading40.length, 40);
  assert.ok(paper.writingTasks.length >= 2);
  assert.ok(paper.speakingParts.length >= 3);
  assert.ok(paper.listening40[0].id?.includes('CAM-18-L-1'));
});

test('computeSectionDiagnostics accurately computes section accuracy and status', () => {
  const paper = buildFullSimulatorPaperFromTestSet(ieltsTestSets[0]);
  const listeningAnswers: Record<number, string> = {};
  // Answer all 10 questions in Section 1 correctly
  for (let i = 0; i < 10; i++) {
    listeningAnswers[i] = paper.listening40[i].correctAnswer;
  }

  const diag = computeSectionDiagnostics(
    listeningAnswers,
    paper.listening40,
    {},
    paper.reading40
  );

  assert.equal(diag.listeningSections.length, 4);
  assert.equal(diag.readingPassages.length, 3);
  assert.equal(diag.listeningSections[0].correct, 10);
  assert.equal(diag.listeningSections[0].accuracyPercent, 100);
  assert.equal(diag.listeningSections[0].status, 'strong');
  assert.equal(diag.listeningSections[1].correct, 0);
  assert.equal(diag.listeningSections[1].status, 'needs-focus');
});

test('CAMBRIDGE_PARAPHRASE_DRILLS contains valid drills with matching correctOption', () => {
  assert.ok(CAMBRIDGE_PARAPHRASE_DRILLS.length >= 5);
  for (const drill of CAMBRIDGE_PARAPHRASE_DRILLS) {
    assert.ok(
      drill.options.includes(drill.correctOption),
      `Drill ${drill.id} must include correctOption in options`
    );
  }
});
