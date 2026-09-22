type ToneIndex = 0 | 1 | 2 | 3 | 4 | 5; // 0=không dấu, 1=sắc, 2=huyền, 3=hỏi, 4=ngã, 5=nặng

const VOWEL_TONE_MAP: Record<string, string[]> = {
  a: ['a', 'á', 'à', 'ả', 'ã', 'ạ'],
  ă: ['ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ'],
  â: ['â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ'],
  e: ['e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ'],
  ê: ['ê', 'ế', 'ề', 'ể', 'ễ', 'ệ'],
  i: ['i', 'í', 'ì', 'ỉ', 'ĩ', 'ị'],
  o: ['o', 'ó', 'ò', 'ỏ', 'õ', 'ọ'],
  ô: ['ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ'],
  ơ: ['ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ'],
  u: ['u', 'ú', 'ù', 'ủ', 'ũ', 'ụ'],
  ư: ['ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự'],
  y: ['y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ']
};

const TONE_KEY_TO_INDEX: Record<string, ToneIndex> = { s: 1, f: 2, r: 3, x: 4, j: 5 };

const DOUBLE_VOWEL_TARGET: Record<string, string> = { a: 'â', e: 'ê', o: 'ô' };

const WORD_BOUNDARY_PATTERN = /[ .,!?;:'"()\-]/;

interface VowelLookupEntry {
  base: string;
  toneIndex: ToneIndex;
}

const VOWEL_CHAR_LOOKUP: Record<string, VowelLookupEntry> = {};
Object.entries(VOWEL_TONE_MAP).forEach(([base, variants]) => {
  variants.forEach((char, idx) => {
    VOWEL_CHAR_LOOKUP[char] = { base, toneIndex: idx as ToneIndex };
  });
});

/**
 * Compose-buffer bộ gõ Telex tiếng Việt — module thuần logic, tách biệt hoàn toàn
 * khỏi InputHandler.ts của Saga Map. Chỉ được ParagraphTypingView gọi khi
 * paragraph.isVietnamese === true.
 */
export class TelexComposer {
  private buffer: string = '';
  private history: string[] = [];

  public pushKey(key: string): string {
    const char = (key || '').toLowerCase();
    if (!char) return this.buffer;

    this.history.push(this.buffer);

    if (WORD_BOUNDARY_PATTERN.test(char)) {
      this.buffer = '';
      return this.buffer;
    }

    const transformed = this.tryTransform(char);
    this.buffer = transformed !== null ? transformed : this.buffer + char;

    return this.buffer;
  }

  public backspace(): string {
    if (this.history.length > 0) {
      this.buffer = this.history.pop() as string;
    } else {
      this.buffer = this.buffer.slice(0, -1);
    }
    return this.buffer;
  }

  public reset(): void {
    this.buffer = '';
    this.history = [];
  }

  public getBuffer(): string {
    return this.buffer;
  }

  private tryTransform(key: string): string | null {
    if (key in TONE_KEY_TO_INDEX) {
      return this.applyTone(TONE_KEY_TO_INDEX[key]);
    }
    if (key === 'a' || key === 'e' || key === 'o') {
      return this.applyDoubleVowel(key);
    }
    if (key === 'w') {
      return this.applyW();
    }
    if (key === 'd') {
      return this.applyDoubleD();
    }
    return null;
  }

  private getLastCharIndex(): number {
    return this.buffer.length - 1;
  }

  /** as/af/ar/ax/aj -> á/à/ả/ã/ạ: dấu thanh áp cho nguyên âm gần nhất trong buffer. */
  private applyTone(toneIndex: ToneIndex): string | null {
    const idx = this.getLastCharIndex();
    if (idx < 0) return null;
    const vowelInfo = VOWEL_CHAR_LOOKUP[this.buffer[idx]];
    if (!vowelInfo) return null;
    const newChar = VOWEL_TONE_MAP[vowelInfo.base][toneIndex];
    return this.buffer.slice(0, idx) + newChar;
  }

  /** aa -> â, ee -> ê, oo -> ô */
  private applyDoubleVowel(key: 'a' | 'e' | 'o'): string | null {
    const idx = this.getLastCharIndex();
    if (idx < 0) return null;
    const vowelInfo = VOWEL_CHAR_LOOKUP[this.buffer[idx]];
    if (!vowelInfo || vowelInfo.base !== key || vowelInfo.toneIndex !== 0) return null;
    const newChar = VOWEL_TONE_MAP[DOUBLE_VOWEL_TARGET[key]][0];
    return this.buffer.slice(0, idx) + newChar;
  }

  /** aw -> ă, ow -> ơ, uw -> ư, w đứng riêng -> ư */
  private applyW(): string | null {
    const idx = this.getLastCharIndex();
    if (idx < 0) return 'ư';

    const vowelInfo = VOWEL_CHAR_LOOKUP[this.buffer[idx]];
    if (vowelInfo && vowelInfo.toneIndex === 0) {
      if (vowelInfo.base === 'a') return this.buffer.slice(0, idx) + VOWEL_TONE_MAP.ă[0];
      if (vowelInfo.base === 'o') return this.buffer.slice(0, idx) + VOWEL_TONE_MAP.ơ[0];
      if (vowelInfo.base === 'u') return this.buffer.slice(0, idx) + VOWEL_TONE_MAP.ư[0];
    }

    return this.buffer + 'ư';
  }

  /** dd -> đ */
  private applyDoubleD(): string | null {
    const idx = this.getLastCharIndex();
    if (idx < 0 || this.buffer[idx] !== 'd') return null;
    return this.buffer.slice(0, idx) + 'đ';
  }
}
