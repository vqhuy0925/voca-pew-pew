export interface MistakeKeyCount {
  key: string;
  count: number;
}

interface KeystrokeRecord {
  expectedChar: string;
  actualChar: string;
  isCorrect: boolean;
  timestampMs: number;
}

export interface TypingSessionResult {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalKeystrokes: number;
  elapsedMs: number;
  topMistakeKeys: MistakeKeyCount[];
}

/**
 * WPM chuẩn ngành: (số ký tự gõ đúng / 5) / số phút.
 */
export const computeWpm = (correctChars: number, elapsedMs: number): number => {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  return (correctChars / 5) / minutes;
};

export const computeAccuracy = (correctChars: number, totalKeystrokes: number): number => {
  if (totalKeystrokes <= 0) return 100;
  return (correctChars / totalKeystrokes) * 100;
};

/**
 * Parse cận dưới của chuỗi AgeRealm.targetWpm, vd '15 - 25 WPM' -> 15, '65 - 85+ WPM' -> 65.
 * Một nguồn dữ liệu duy nhất — không hard-code lại bảng ngưỡng riêng.
 */
export const parseTargetWpmFloor = (targetWpm: string): number => {
  const match = (targetWpm || '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export class TypingMetrics {
  private startTimeMs: number | null = null;
  private keystrokes: KeystrokeRecord[] = [];
  private mistakeCountMap: Record<string, number> = {};

  public startSession(): void {
    this.startTimeMs = Date.now();
    this.keystrokes = [];
    this.mistakeCountMap = {};
  }

  public recordKeystroke(expectedChar: string, actualChar: string, timestampMs: number = Date.now()): boolean {
    const isCorrect = expectedChar === actualChar;
    this.keystrokes.push({ expectedChar, actualChar, isCorrect, timestampMs });

    if (!isCorrect) {
      const mistakeKey = expectedChar || actualChar;
      this.mistakeCountMap[mistakeKey] = (this.mistakeCountMap[mistakeKey] || 0) + 1;
    }

    return isCorrect;
  }

  public getCorrectCharCount(): number {
    return this.keystrokes.filter(k => k.isCorrect).length;
  }

  public getTotalKeystrokeCount(): number {
    return this.keystrokes.length;
  }

  public getElapsedMs(): number {
    if (this.startTimeMs === null || this.keystrokes.length === 0) return 0;
    const lastTimestamp = this.keystrokes[this.keystrokes.length - 1].timestampMs;
    return Math.max(0, lastTimestamp - this.startTimeMs);
  }

  public computeCurrentWpm(): number {
    return computeWpm(this.getCorrectCharCount(), this.getElapsedMs());
  }

  public computeCurrentAccuracy(): number {
    return computeAccuracy(this.getCorrectCharCount(), this.getTotalKeystrokeCount());
  }

  public getTopMistakeKeys(limit: number = 5): MistakeKeyCount[] {
    return Object.entries(this.mistakeCountMap)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  public getResult(): TypingSessionResult {
    return {
      wpm: this.computeCurrentWpm(),
      accuracy: this.computeCurrentAccuracy(),
      correctChars: this.getCorrectCharCount(),
      totalKeystrokes: this.getTotalKeystrokeCount(),
      elapsedMs: this.getElapsedMs(),
      topMistakeKeys: this.getTopMistakeKeys()
    };
  }

  public reset(): void {
    this.startTimeMs = null;
    this.keystrokes = [];
    this.mistakeCountMap = {};
  }
}
