import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFullSimulatorPaperFromTestSet } from './ieltsMasteryEngine';
import { createMockExamSession, scoreToIeltsBand } from './ieltsMockEngine';
import { IeltsTestSet } from '../data/curriculum';

const dummySet: IeltsTestSet = {
  id: 'set-cam-19',
  code: 'CAM-19',
  title: 'Cambridge IELTS 19 Academic Test 1',
  year: '2024',
  edition: 'Cambridge Academic 2024',
  difficulty: 'Tiêu chuẩn (Band 6.0-7.0)',
  description: 'Đề thi chính thức mới nhất',
  targetBand: 'Band 6.5 - 8.5',
  estimatedTimeMinutes: 165,
  tags: ['Cambridge 19', 'Academic'],
  module: 'academic',
  questions: [
    {
      id: 'q-custom-1',
      skill: 'listening',
      question: 'Custom Listening Q1',
      options: ['A', 'B', 'C'],
      correctAnswer: 'A',
      explanationInVietnamese: 'Custom test explanation'
    }
  ]
};

test('buildFullSimulatorPaperFromTestSet builds 40 Listening + 40 Reading = 80 total questions', () => {
  const paper = buildFullSimulatorPaperFromTestSet(dummySet);
  assert.equal(paper.paperCode, 'CAM-19');
  assert.equal(paper.listening40.length, 40);
  assert.equal(paper.reading40.length, 40);
  assert.equal(paper.writingTasks.length >= 2, true);
  assert.equal(paper.speakingParts.length >= 3, true);
});

test('createMockExamSession pulls full 80 questions pool for specific test set', () => {
  const session = createMockExamSession([dummySet], [], {
    skillMode: 'all-skills',
    questionCount: 80,
    durationMinutes: 165,
    sourceSetId: 'CAM-19',
    examModule: 'academic'
  });

  assert.equal(session.questions.length, 80);
});

test('scoreToIeltsBand converts accuracy percentages correctly', () => {
  assert.equal(scoreToIeltsBand(95, false), 9.0);
  assert.equal(scoreToIeltsBand(70, false), 7.5);
  assert.equal(scoreToIeltsBand(95, true), 9.0); // GT Reading
  assert.equal(scoreToIeltsBand(74, true), 7.0); // GT Reading Band 7.0 threshold
});
