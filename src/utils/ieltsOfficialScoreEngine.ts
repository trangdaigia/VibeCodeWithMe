/**
 * Official Cambridge IELTS Scoring and Band Conversion Tables
 */

export interface IeltsBandReport {
  listeningRaw: number;
  listeningBand: number;
  readingRaw: number;
  readingBand: number;
  writingBand: number;
  speakingBand: number;
  overallBand: number;
  cefrLevel: string;
  cefrDescriptor: string;
}

/**
 * Cambridge Official Raw-to-Band scale for Academic Listening (out of 40)
 */
export function convertListeningRawToBand(rawScore: number): number {
  const score = Math.max(0, Math.min(40, Math.round(rawScore)));
  if (score >= 39) return 9.0;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8.0;
  if (score >= 32) return 7.5;
  if (score >= 30) return 7.0;
  if (score >= 26) return 6.5;
  if (score >= 23) return 6.0;
  if (score >= 18) return 5.5;
  if (score >= 16) return 5.0;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4.0;
  if (score >= 7) return 3.5;
  if (score >= 5) return 3.0;
  if (score >= 3) return 2.5;
  return 2.0;
}

/**
 * Cambridge Official Raw-to-Band scale for Academic Reading (out of 40)
 */
export function convertReadingRawToBand(rawScore: number): number {
  const score = Math.max(0, Math.min(40, Math.round(rawScore)));
  if (score >= 39) return 9.0;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8.0;
  if (score >= 33) return 7.5;
  if (score >= 30) return 7.0;
  if (score >= 27) return 6.5;
  if (score >= 23) return 6.0;
  if (score >= 19) return 5.5;
  if (score >= 15) return 5.0;
  if (score >= 12) return 4.5;
  if (score >= 9) return 4.0;
  if (score >= 6) return 3.5;
  if (score >= 4) return 3.0;
  if (score >= 2) return 2.5;
  return 2.0;
}

/**
 * Calculate Official Overall IELTS Band with Cambridge rounding rules:
 * - If average ends in .25 -> rounds up to .5
 * - If average ends in .75 -> rounds up to next whole band (e.g. 7.75 -> 8.0)
 * - If average ends in .125 -> rounds down to .0
 * - If average ends in .625 -> rounds down to .5
 */
export function calculateOfficialOverallBand(
  listeningBand: number,
  readingBand: number,
  writingBand: number,
  speakingBand: number
): number {
  const average = (listeningBand + readingBand + writingBand + speakingBand) / 4;
  const whole = Math.floor(average);
  const decimal = average - whole;

  if (decimal < 0.25) {
    return whole;
  } else if (decimal < 0.75) {
    return whole + 0.5;
  } else {
    return whole + 1.0;
  }
}

/**
 * Computes CEFR and Descriptor from Overall Band
 */
export function getCefrInfoFromBand(band: number): { level: string; descriptor: string } {
  if (band >= 8.5) {
    return {
      level: 'C2',
      descriptor: 'Expert User (Bậc thầy bản ngữ - Hoàn toàn thông thạo trong mọi bối cảnh học thuật)'
    };
  }
  if (band >= 7.0) {
    return {
      level: 'C1',
      descriptor: 'Good User / Operational Proficiency (Người dùng hiệu quả - Đạt chuẩn xét tuyển sau đại học & học bổng toàn phần)'
    };
  }
  if (band >= 6.0) {
    return {
      level: 'B2',
      descriptor: 'Competent User (Người dùng thành thạo - Đủ điều kiện đại học quốc tế)'
    };
  }
  if (band >= 5.0) {
    return {
      level: 'B1',
      descriptor: 'Modest User (Người dùng vừa phải - Giao tiếp cơ bản trong phần lớn tình huống quen thuộc)'
    };
  }
  return {
    level: 'A2/B1',
    descriptor: 'Intermittent User (Người dùng hạn chế - Cần tiếp tục rèn luyện nền tảng)'
  };
}
