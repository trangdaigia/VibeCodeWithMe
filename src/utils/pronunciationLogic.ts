// Pure logic for Voice-to-Text Pronunciation Evaluation across 7 Languages

export interface PronunciationEvaluation {
  score: number; // 0 - 100
  verdict: 'excellent' | 'good' | 'retry';
  feedbackVi: string;
  normalizedSpoken: string;
  normalizedTarget: string;
}

/**
 * Normalizes speech text for comparison:
 * - Trims and lowercases
 * - Strips common terminal punctuation (. , ! ? ¿ ¡ 。 、 ！ ？)
 * - Normalizes Unicode combining characters
 * - Collapses consecutive spaces
 */
export function normalizeSpokenText(raw: string): string {
  if (!raw) return '';
  return raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics for phonetic comparison where helpful
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¿¡。、！？“”‘’]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalizes original target word preserving native scripts (Hangul, Hanzi, Kanji, etc.)
 */
export function normalizeTargetText(raw: string): string {
  if (!raw) return '';
  return raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¿¡。、！？“”‘’]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Computes Levenshtein distance between two strings
 */
export function computeLevenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

/**
 * Calculates pronunciation match percentage (0 - 100)
 */
export function calculatePronunciationSimilarity(spoken: string, target: string): number {
  const normSpoken = normalizeSpokenText(spoken);
  const normTarget = normalizeTargetText(target);

  if (!normSpoken || !normTarget) return 0;
  if (normSpoken === normTarget) return 100;

  // Exact word boundary containment (e.g. target is inside spoken sentence)
  const spokenTokens = normSpoken.split(' ');
  const targetTokens = normTarget.split(' ');

  if (normSpoken.includes(normTarget)) {
    return 95;
  }

  // Token level overlap for compound phrases
  if (targetTokens.length > 1) {
    const matchedTokens = targetTokens.filter((token) => spokenTokens.includes(token));
    const tokenRatio = matchedTokens.length / targetTokens.length;
    if (tokenRatio === 1) return 92;
  }

  // Character Levenshtein similarity
  const maxLen = Math.max(normSpoken.length, normTarget.length);
  if (maxLen === 0) return 0;

  const distance = computeLevenshteinDistance(normSpoken, normTarget);
  const similarity = Math.max(0, Math.min(100, Math.round(((maxLen - distance) / maxLen) * 100)));

  return similarity;
}

/**
 * Evaluates spoken result against target vocabulary term and provides actionable Vietnamese feedback
 */
export function evaluatePronunciationResult(
  spoken: string,
  target: string,
  voiceLangCode: string = 'en-US'
): PronunciationEvaluation {
  const normSpoken = normalizeSpokenText(spoken);
  const normTarget = normalizeTargetText(target);
  const score = calculatePronunciationSimilarity(spoken, target);

  let verdict: 'excellent' | 'good' | 'retry' = 'retry';
  let feedbackVi = '';

  if (score >= 85) {
    verdict = 'excellent';
    feedbackVi = 'Phát âm xuất sắc! Khẩu hình và ngữ điệu rất chuẩn xác.';
  } else if (score >= 60) {
    verdict = 'good';
    feedbackVi = 'Phát âm khá tốt, ngữ điệu nhận diện gần đúng. Hãy lắng nghe lại âm thanh mẫu để hoàn thiện âm đuôi.';
  } else {
    verdict = 'retry';
    feedbackVi = 'Chưa nhận diện chính xác. Hãy nghe lại phát âm mẫu và nhấn nút micro để thử lại.';
  }

  return {
    score,
    verdict,
    feedbackVi,
    normalizedSpoken: normSpoken,
    normalizedTarget: normTarget,
  };
}

/**
 * Resolves Web Speech Recognition BCP 47 locale code from course voiceLangCode
 */
export function resolveSpeechRecognitionLocale(voiceLangCode: string): string {
  const lang = (voiceLangCode || '').toLowerCase();
  if (lang.startsWith('en')) return 'en-US';
  if (lang.startsWith('zh')) return 'zh-CN';
  if (lang.startsWith('ja')) return 'ja-JP';
  if (lang.startsWith('ko')) return 'ko-KR';
  if (lang.startsWith('fr')) return 'fr-FR';
  if (lang.startsWith('de')) return 'de-DE';
  if (lang.startsWith('es')) return 'es-ES';
  return 'en-US';
}
