import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialGameSession,
  movePlayerLane,
  evaluateGateCollision,
  classifyAlphaFoldPlddt,
  POLYGLOT_3D_CHALLENGES,
  CURATED_NEURO_PROTEINS,
  CURATED_NEUROTRANSMITTERS,
  GameSessionState,
} from './vipOmniVerseLogic';

describe('vipOmniVerseLogic - 3D Game State Machine & Bioscience Lab Classifiers', () => {
  it('initializes 3D game session in title state and clamps lane movement to [-1, 0, 1]', () => {
    const session = createInitialGameSession(5);
    assert.equal(session.status, 'title');
    assert.equal(session.playerLane, 0);
    assert.equal(session.shieldHp, 100);

    const left1 = movePlayerLane(session.playerLane, 'left');
    assert.equal(left1, -1);
    const leftClamped = movePlayerLane(left1, 'left');
    assert.equal(leftClamped, -1);

    const center = movePlayerLane(leftClamped, 'right');
    assert.equal(center, 0);
    const right1 = movePlayerLane(center, 'right');
    assert.equal(right1, 1);
    const rightClamped = movePlayerLane(right1, 'right');
    assert.equal(rightClamped, 1);
  });

  it('awards combo bonus, advances round, and transitions to victory when all rounds are cleared', () => {
    let session: GameSessionState = { ...createInitialGameSession(2), status: 'playing' };

    // Hit round 1 correct crystal
    session = evaluateGateCollision(session, true);
    assert.equal(session.status, 'playing');
    assert.equal(session.combo, 1);
    assert.equal(session.score, 185);
    assert.equal(session.correctCollected, 1);
    assert.equal(session.roundIndex, 1);

    // Hit round 2 correct crystal -> should trigger victory
    session = evaluateGateCollision(session, true);
    assert.equal(session.status, 'victory');
    assert.equal(session.combo, 2);
    assert.equal(session.maxCombo, 2);
    assert.equal(session.correctCollected, 2);
  });

  it('reduces shield HP on decoy collision and triggers gameover when shield reaches 0', () => {
    let session: GameSessionState = { ...createInitialGameSession(5), status: 'playing', combo: 3 };

    session = evaluateGateCollision(session, false);
    assert.equal(session.combo, 0);
    assert.equal(session.shieldHp, 65);
    assert.equal(session.status, 'playing');

    session = evaluateGateCollision(session, false);
    assert.equal(session.shieldHp, 30);
    assert.equal(session.status, 'playing');

    session = evaluateGateCollision(session, false);
    assert.equal(session.shieldHp, 0);
    assert.equal(session.status, 'gameover');
  });

  it('classifies AlphaFold pLDDT confidence into the 4 official EMBL-EBI bands and hex colors', () => {
    const veryHigh = classifyAlphaFoldPlddt(94.5);
    assert.equal(veryHigh.band, 'very_high');
    assert.equal(veryHigh.hexColor, '#0053D6');

    const confident = classifyAlphaFoldPlddt(78);
    assert.equal(confident.band, 'confident');
    assert.equal(confident.hexColor, '#65CBF3');

    const low = classifyAlphaFoldPlddt(55);
    assert.equal(low.band, 'low');
    assert.equal(low.hexColor, '#FFDB13');

    const veryLow = classifyAlphaFoldPlddt(42);
    assert.equal(veryLow.band, 'very_low');
    assert.equal(veryLow.hexColor, '#FF7D45');
  });

  it('provides complete 7-language 3D challenges and curated neuro-linguistics protein/compound datasets', () => {
    const requiredLangs = ['english', 'chinese', 'japanese', 'korean', 'french', 'german', 'spanish'];
    for (const lang of requiredLangs) {
      assert.ok(Array.isArray(POLYGLOT_3D_CHALLENGES[lang]), `Missing 3D challenges for ${lang}`);
      assert.ok(POLYGLOT_3D_CHALLENGES[lang].length >= 2);
    }

    assert.equal(CURATED_NEURO_PROTEINS[0].geneSymbol, 'FOXP2');
    assert.equal(CURATED_NEURO_PROTEINS[0].uniprotAccession, 'O15409');
    assert.ok(CURATED_NEUROTRANSMITTERS.some((c) => c.cid === 681 && c.name === 'Dopamine'));
  });
});
