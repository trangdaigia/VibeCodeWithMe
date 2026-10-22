export interface TokenBreakdown {
  id: string;
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'particle' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'expression';
  grammaticalRole: string;
  meaning: string;
  romanization?: string;
  notes?: string;
}

/**
 * Standardize text for punctuation-insensitive comparison
 */
export function normalizeSentence(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[¿?¡!.,;:"'()[\]{}。、！？「」]/g, '')
    .replace(/\s+/g, ' ');
}

export function stripPhoneticAnnotation(str: string): string {
  return str.replace(/\s*\([^)]*\)\s*$/, '').trim();
}

/**
 * Validates user's constructed sentence against expected target sentence.
 */
export function validateSentenceAssembly(
  userTokens: string[],
  targetSentence: string
): { isMatch: boolean; accuracy: number; feedback: string } {
  const cleanTarget = stripPhoneticAnnotation(targetSentence);

  const constructedWithSpaces = userTokens.join(' ').trim();
  const constructedNoSpaces = userTokens.join('').trim();

  const normalizedUserWithSpaces = normalizeSentence(constructedWithSpaces);
  const normalizedUserNoSpaces = normalizeSentence(constructedNoSpaces).replace(/\s+/g, '');

  const normalizedTargetWithSpaces = normalizeSentence(cleanTarget);
  const normalizedTargetNoSpaces = normalizeSentence(cleanTarget).replace(/\s+/g, '');

  // Exact or punctuation-free match (handles both Latin with spaces and CJK without spaces)
  if (
    normalizedUserWithSpaces === normalizedTargetWithSpaces ||
    normalizedUserNoSpaces === normalizedTargetNoSpaces ||
    normalizeSentence(userTokens.join('')) === normalizeSentence(targetSentence).replace(/\s+/g, '')
  ) {
    return {
      isMatch: true,
      accuracy: 100,
      feedback: 'Excellent! Perfect word order and structure.',
    };
  }

  // Token comparison
  const targetWords = normalizedTargetWithSpaces.split(' ').filter(Boolean);
  const userWords = normalizedUserWithSpaces.split(' ').filter(Boolean);

  let matchCount = 0;
  for (let i = 0; i < Math.min(targetWords.length, userWords.length); i++) {
    if (targetWords[i] === userWords[i]) {
      matchCount++;
    }
  }

  const accuracy = targetWords.length > 0 ? Math.round((matchCount / targetWords.length) * 100) : 0;
  let feedback = 'Almost there! Check the order of your words.';
  if (accuracy < 50) {
    feedback = 'Notice the key subject, verb, or particle placement.';
  }

  return {
    isMatch: false,
    accuracy,
    feedback,
  };
}

/**
 * Computes consecutive daily streak
 * @param lastActivityDate ISO date string or YYYY-MM-DD
 * @param todayDate YYYY-MM-DD
 * @param currentStreak current streak number
 */
export function calculateStreak(
  lastActivityDate: string | null,
  todayDate: string,
  currentStreak: number
): { newStreak: number; status: 'maintained' | 'incremented' | 'reset' } {
  if (!lastActivityDate) {
    return { newStreak: 1, status: 'incremented' };
  }

  const lastDateOnly = lastActivityDate.split('T')[0];
  if (lastDateOnly === todayDate) {
    return { newStreak: currentStreak, status: 'maintained' };
  }

  const lastTime = new Date(lastDateOnly).getTime();
  const todayTime = new Date(todayDate).getTime();
  const diffDays = Math.round((todayTime - lastTime) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { newStreak: currentStreak + 1, status: 'incremented' };
  } else if (diffDays > 1) {
    return { newStreak: 1, status: 'reset' };
  } else {
    return { newStreak: currentStreak, status: 'maintained' };
  }
}

/**
 * Calculates XP reward with bonuses for accuracy & streak
 */
export function calculateXpGain(baseScore: number, streak: number, isPerfect: boolean): number {
  const streakBonus = Math.min(streak * 2, 20);
  const perfectBonus = isPerfect ? 15 : 0;
  return Math.max(10, baseScore + streakBonus + perfectBonus);
}
