export interface SrsReviewResult {
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  nextReviewDate: string; // ISO string
  status: 'New' | 'Learning' | 'Reviewing' | 'Mastered';
}

/**
 * Implements the SuperMemo SM-2 spaced repetition algorithm.
 * @param previousRepetitions Number of consecutive successful recalls
 * @param previousEaseFactor Difficulty factor (typically starts at 2.5, min 1.3)
 * @param previousIntervalDays Days until last review (starts at 0)
 * @param qualityRating 0 to 5 score representing recall ease:
 *        5 = perfect recall, 4 = correct with hesitation, 3 = correct with serious effort,
 *        2 = incorrect but easy to recall once seen, 1 = completely forgotten, 0 = complete blackout
 * @param baseDate Optional reference date (defaults to now)
 */
export function calculateSrsNextReview(
  previousRepetitions: number = 0,
  previousEaseFactor: number = 2.5,
  previousIntervalDays: number = 0,
  qualityRating: number,
  baseDate: Date = new Date()
): SrsReviewResult {
  // Ensure rating is within 0-5
  const q = Math.max(0, Math.min(5, Math.round(qualityRating)));
  
  // Calculate new ease factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  let newEaseFactor = Math.round((previousEaseFactor + delta) * 100) / 100;
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  let newRepetitions = previousRepetitions;
  let newIntervalDays = 1;

  if (q >= 3) {
    // Successful recall
    if (previousRepetitions === 0) {
      newIntervalDays = 1;
    } else if (previousRepetitions === 1) {
      newIntervalDays = 6;
    } else {
      newIntervalDays = Math.round(previousIntervalDays * newEaseFactor);
    }
    newRepetitions = previousRepetitions + 1;
  } else {
    // Failed recall: reset repetitions count and review tomorrow
    newRepetitions = 0;
    newIntervalDays = 1;
  }

  const nextDate = new Date(baseDate.getTime());
  nextDate.setDate(nextDate.getDate() + newIntervalDays);

  let status: 'New' | 'Learning' | 'Reviewing' | 'Mastered' = 'Learning';
  if (newRepetitions === 0) {
    status = 'Learning';
  } else if (newRepetitions < 3) {
    status = 'Learning';
  } else if (newRepetitions < 6) {
    status = 'Reviewing';
  } else {
    status = 'Mastered';
  }

  return {
    repetitions: newRepetitions,
    easeFactor: newEaseFactor,
    intervalDays: newIntervalDays,
    nextReviewDate: nextDate.toISOString(),
    status,
  };
}

/**
 * Filter items that are currently due for review
 */
export function isCardDue(nextReviewDateStr: string, currentDate: Date = new Date()): boolean {
  if (!nextReviewDateStr) return true;
  const reviewTime = new Date(nextReviewDateStr).getTime();
  return currentDate.getTime() >= reviewTime;
}
