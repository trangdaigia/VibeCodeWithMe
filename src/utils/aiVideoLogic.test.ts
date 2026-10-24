import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getVideoLessonsByLanguage,
  filterVideoLessonsByTier,
  getInstructorsForLanguage,
  findActiveSegmentIndex,
  formatVideoTimestamp,
  computeVideoCurriculumProgress,
  buildCustomAiVideoLesson
} from './aiVideoLogic';

test('getVideoLessonsByLanguage returns Basic -> Intermediate -> Advanced lessons isolated per language', () => {
  const languages = ['english', 'chinese', 'japanese', 'korean', 'french', 'german', 'spanish'];

  for (const lang of languages) {
    const lessons = getVideoLessonsByLanguage(lang);
    assert.ok(lessons.length >= 3, `Expected at least 3 lessons for ${lang}`);
    assert.equal(lessons.every((l) => l.languageId === lang), true);
    assert.equal(lessons[0].level, 'basic');
    assert.equal(lessons[1].level, 'intermediate');
    assert.equal(lessons[2].level, 'advanced');
  }
});

test('filterVideoLessonsByTier filters basic, intermediate, and advanced accurately', () => {
  const zhLessons = getVideoLessonsByLanguage('chinese');
  assert.equal(filterVideoLessonsByTier(zhLessons, 'all').length, 3);
  assert.equal(filterVideoLessonsByTier(zhLessons, 'basic').length, 1);
  assert.equal(filterVideoLessonsByTier(zhLessons, 'intermediate').length, 1);
  assert.equal(filterVideoLessonsByTier(zhLessons, 'advanced').length, 1);
});

test('getInstructorsForLanguage returns 2 virtual human AI personas for each language', () => {
  const jaInstructors = getInstructorsForLanguage('japanese');
  assert.equal(jaInstructors.length, 2);
  assert.equal(jaInstructors[0].languageId, 'japanese');
  assert.equal(jaInstructors[0].gender, 'female');
  assert.equal(jaInstructors[1].gender, 'male');
});

test('findActiveSegmentIndex maps playback timestamp to correct video segment', () => {
  const enLesson = getVideoLessonsByLanguage('english')[0];
  assert.equal(findActiveSegmentIndex(enLesson.segments, 0), 0);
  assert.equal(findActiveSegmentIndex(enLesson.segments, 6), 0);
  assert.equal(findActiveSegmentIndex(enLesson.segments, 12), 1);
  assert.equal(findActiveSegmentIndex(enLesson.segments, 25), 2);
  assert.equal(findActiveSegmentIndex(enLesson.segments, 40), 3);
  assert.equal(findActiveSegmentIndex(enLesson.segments, 999), 3);
});

test('formatVideoTimestamp formats seconds into MM:SS cleanly', () => {
  assert.equal(formatVideoTimestamp(0), '00:00');
  assert.equal(formatVideoTimestamp(9), '00:09');
  assert.equal(formatVideoTimestamp(48), '00:48');
  assert.equal(formatVideoTimestamp(125), '02:05');
});

test('computeVideoCurriculumProgress calculates tier completion and percentage', () => {
  const koLessons = getVideoLessonsByLanguage('korean');
  const progress1 = computeVideoCurriculumProgress(koLessons, [koLessons[0].id]);
  assert.equal(progress1.totalCount, 3);
  assert.equal(progress1.completedCount, 1);
  assert.equal(progress1.percent, 33);
  assert.equal(progress1.basicCompleted, true);
  assert.equal(progress1.intermediateCompleted, false);
});

test('buildCustomAiVideoLesson creates a valid 3-segment AI video lesson and validates empty input', () => {
  const custom = buildCustomAiVideoLesson({
    languageId: 'english',
    level: 'advanced',
    topicTitle: 'Đàm phán Hợp đồng Công nghệ',
    targetSentence: 'We propose a strategic partnership that maximizes mutual value.',
    vietnameseMeaning: 'Chúng tôi đề xuất một quan hệ đối tác chiến lược nhằm tối đa hóa giá trị song phương.'
  });

  assert.equal(custom.languageId, 'english');
  assert.equal(custom.level, 'advanced');
  assert.equal(custom.segments.length, 3);
  assert.equal(custom.quiz.options[custom.quiz.correctIndex], 'Chúng tôi đề xuất một quan hệ đối tác chiến lược nhằm tối đa hóa giá trị song phương.');

  assert.throws(() => {
    buildCustomAiVideoLesson({
      languageId: 'english',
      level: 'basic',
      topicTitle: '   ',
      targetSentence: '',
      vietnameseMeaning: ''
    });
  });
});
