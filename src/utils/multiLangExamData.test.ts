import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  MULTI_LANG_EXAM_METADATA,
  calculateMultiLangCertificateScore,
  getLanguagePureExamQuestions
} from '../data/multiLangExamData';

describe('Multi-Language Exam Isolation & Certificate Score Engine', () => {
  it('provides dedicated, non-English exam metadata for all 6 non-English languages', () => {
    const languages = ['chinese', 'japanese', 'korean', 'french', 'german', 'spanish'];
    for (const lang of languages) {
      const meta = MULTI_LANG_EXAM_METADATA[lang];
      assert.ok(meta, `Missing exam metadata for ${lang}`);
      assert.equal(meta.languageId, lang);
      assert.ok(!meta.examShortName.includes('IELTS'), `${lang} should not be labeled IELTS`);
      assert.ok(meta.extraQuestions.length >= 4, `${lang} should have at least 4 skill-tagged questions`);
      assert.ok(meta.writingPrompts.length >= 1, `${lang} should have dedicated writing prompts`);
      assert.ok(meta.speakingCueCards.length >= 1, `${lang} should have dedicated speaking cue cards`);
    }
  });

  it('ensures every non-English language has Listening, Reading, Writing, and Speaking questions', () => {
    const languages = ['chinese', 'japanese', 'korean', 'french', 'german', 'spanish'];
    for (const lang of languages) {
      const questions = getLanguagePureExamQuestions(lang, []);
      const skills = new Set(questions.map(q => q.skill));
      assert.ok(skills.has('listening'), `${lang} missing listening question`);
      assert.ok(skills.has('reading'), `${lang} missing reading question`);
      assert.ok(skills.has('writing'), `${lang} missing writing question`);
      assert.ok(skills.has('speaking'), `${lang} missing speaking question`);
    }
  });

  it('calculates HSK (Chinese) 300-point scale accurately (passing >= 180)', () => {
    const pass = calculateMultiLangCertificateScore('chinese', {
      listening: 75,
      reading: 70,
      writing: 65
    });
    assert.equal(pass.totalScore, 210);
    assert.equal(pass.maxTotalScore, 300);
    assert.equal(pass.isPassed, true);

    const fail = calculateMultiLangCertificateScore('chinese', {
      listening: 55,
      reading: 55,
      writing: 50
    });
    assert.equal(fail.totalScore, 160);
    assert.equal(fail.isPassed, false);
  });

  it('calculates JLPT (Japanese) 180-point scale with section minimum threshold (>= 19/60)', () => {
    const pass = calculateMultiLangCertificateScore('japanese', {
      vocab_grammar: 35,
      reading: 32,
      listening: 38
    });
    assert.equal(pass.totalScore, 105);
    assert.equal(pass.isPassed, true);

    // High total score (98) but failed reading (< 19) -> should fail
    const sectionFail = calculateMultiLangCertificateScore('japanese', {
      vocab_grammar: 45,
      reading: 15,
      listening: 38
    });
    assert.equal(sectionFail.totalScore, 98);
    assert.equal(sectionFail.isPassed, false);
  });

  it('calculates TOPIK II (Korean) levels 3 to 6 accurately out of 300', () => {
    const level5 = calculateMultiLangCertificateScore('korean', {
      listening: 72,
      reading: 68,
      writing: 55
    });
    assert.equal(level5.totalScore, 195);
    assert.equal(level5.isPassed, true);
    assert.ok(level5.levelAchieved.includes('Cấp 5'));
  });

  it('calculates DELF B2 (French), Goethe B2 (German), and DELE B2 (Spanish) accurately', () => {
    const delfPass = calculateMultiLangCertificateScore('french', {
      listening: 16,
      reading: 18,
      writing: 15,
      speaking: 17
    });
    assert.equal(delfPass.totalScore, 66);
    assert.equal(delfPass.isPassed, true);

    const goethePass = calculateMultiLangCertificateScore('german', {
      reading: 75,
      listening: 80,
      writing: 70,
      speaking: 85
    });
    assert.equal(goethePass.isPassed, true);
    assert.equal(goethePass.totalScore, 78);

    const delePass = calculateMultiLangCertificateScore('spanish', {
      reading: 18,
      listening: 17,
      writing: 16,
      speaking: 19
    });
    assert.equal(delePass.totalScore, 70);
    assert.equal(delePass.isPassed, true);
  });
});
