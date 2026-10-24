import test from 'node:test';
import assert from 'node:assert/strict';
import {
  officialListening40Questions,
  officialReading40Questions,
  officialWritingTasks,
  officialSpeakingParts
} from '../data/courses/ieltsOfficialFullExamData';
import {
  convertListeningRawToBand,
  convertReadingRawToBand,
  calculateOfficialOverallBand,
  getCefrInfoFromBand
} from './ieltsOfficialScoreEngine';

test('IELTS Official Dataset conforms strictly to official 80-question and 4-skill structure', () => {
  // Test 1: Exactly 40 Listening Questions
  assert.equal(officialListening40Questions.length, 40, 'Listening test must have exactly 40 questions');

  // Test 2: Exactly 40 Reading Questions
  assert.equal(officialReading40Questions.length, 40, 'Reading test must have exactly 40 questions');

  // Test 3: Total 80 objective questions across Listening & Reading
  const totalObjectiveQuestions = officialListening40Questions.length + officialReading40Questions.length;
  assert.equal(totalObjectiveQuestions, 80, 'Listening + Reading must have exactly 80 questions');

  // Test 4: Exactly 2 Writing Tasks (Task 1 + Task 2)
  assert.equal(officialWritingTasks.length, 2, 'Writing test must have exactly 2 tasks');
  assert.equal(officialWritingTasks[0].taskType, 'Task 1');
  assert.equal(officialWritingTasks[1].taskType, 'Task 2');

  // Test 5: Exactly 3 Speaking Parts
  assert.equal(officialSpeakingParts.length, 3, 'Speaking test must have exactly 3 parts');
  assert.equal(officialSpeakingParts[0].part, 1);
  assert.equal(officialSpeakingParts[1].part, 2);
  assert.equal(officialSpeakingParts[2].part, 3);
});

test('Cambridge raw score conversion handles boundary thresholds accurately', () => {
  // Listening boundaries
  assert.equal(convertListeningRawToBand(40), 9.0);
  assert.equal(convertListeningRawToBand(39), 9.0);
  assert.equal(convertListeningRawToBand(35), 8.0);
  assert.equal(convertListeningRawToBand(30), 7.0);
  assert.equal(convertListeningRawToBand(23), 6.0);
  assert.equal(convertListeningRawToBand(16), 5.0);

  // Reading boundaries
  assert.equal(convertReadingRawToBand(40), 9.0);
  assert.equal(convertReadingRawToBand(35), 8.0);
  assert.equal(convertReadingRawToBand(30), 7.0);
  assert.equal(convertReadingRawToBand(23), 6.0);
  assert.equal(convertReadingRawToBand(15), 5.0);
});

test('Official overall band score rounds according to Cambridge standard (.25 and .75 up rules)', () => {
  // Average: (8.0 + 8.0 + 7.5 + 7.5) / 4 = 7.75 -> Rounds UP to 8.0
  assert.equal(calculateOfficialOverallBand(8.0, 8.0, 7.5, 7.5), 8.0);

  // Average: (6.5 + 6.5 + 6.0 + 6.0) / 4 = 6.25 -> Rounds UP to 6.5
  assert.equal(calculateOfficialOverallBand(6.5, 6.5, 6.0, 6.0), 6.5);

  // Average: (7.0 + 7.0 + 7.0 + 7.5) / 4 = 7.125 -> Rounds down to 7.0
  assert.equal(calculateOfficialOverallBand(7.0, 7.0, 7.0, 7.5), 7.0);

  // Average: (8.5 + 8.5 + 8.5 + 8.5) / 4 = 8.5
  assert.equal(calculateOfficialOverallBand(8.5, 8.5, 8.5, 8.5), 8.5);

  // Check CEFR descriptor
  const c2 = getCefrInfoFromBand(8.5);
  assert.equal(c2.level, 'C2');

  const c1 = getCefrInfoFromBand(7.5);
  assert.equal(c1.level, 'C1');
});
