class SpeechHelper {
  private isEnabled: boolean = true;
  private currentAudio: HTMLAudioElement | null = null;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private verifiedEnglishVoice: SpeechSynthesisVoice | null = null;
  private isSpeechSynthesisSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isSpeechSynthesisSupported = 'speechSynthesis' in window;
      if (this.isSpeechSynthesisSupported) {
        this.initVoice();
      }
      this.setupUserUnlock();
    }
  }

  private setupUserUnlock() {
    const unlock = () => {
      if (this.isSpeechSynthesisSupported && window.speechSynthesis) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    };
    window.addEventListener('click', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
  }

  private initVoice() {
    const updateVoices = () => {
      try {
        const available = window.speechSynthesis.getVoices();
        if (available && available.length > 0) {
          // Strictly find authentic English voices
          const enVoice =
            available.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Enhanced') || v.name.includes('Ava') || v.name.includes('Alex'))) ||
            available.find(v => v.lang.startsWith('en-US') && !v.name.toLowerCase().includes('bad')) ||
            available.find(v => v.lang.startsWith('en-GB')) ||
            available.find(v => v.lang.toLowerCase().startsWith('en') && !v.lang.toLowerCase().startsWith('vi')) ||
            null;

          if (enVoice && enVoice.lang.toLowerCase().startsWith('en')) {
            this.verifiedEnglishVoice = enVoice;
          }
        }
      } catch {
        // Ignore
      }
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    window.speechSynthesis.addEventListener?.('voiceschanged', updateVoices);
  }

  public preloadWords(words: string[]) {
    if (typeof window === 'undefined') return;
    for (const raw of words) {
      const w = raw.trim().toLowerCase();
      if (w && !this.audioCache.has(w)) {
        try {
          const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(w)}&type=2`);
          audio.preload = 'auto';
          this.audioCache.set(w, audio);
        } catch {
          // Ignore
        }
      }
    }
  }

  public speak(text: string) {
    if (!this.isEnabled) return;
    const cleanWord = text.trim().toLowerCase();
    if (!cleanWord) return;

    // 1. Stop any currently playing audio
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }

    // 2. Stop any pending speech synthesis
    if (this.isSpeechSynthesisSupported && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }

    // 3. Primary Engine: High-Definition Human Native US English Audio
    try {
      let audio = this.audioCache.get(cleanWord);
      if (!audio) {
        const audioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanWord)}&type=2`;
        audio = new Audio(audioUrl);
        audio.preload = 'auto';
        this.audioCache.set(cleanWord, audio);
      }

      this.currentAudio = audio;
      audio.currentTime = 0;
      audio.playbackRate = 0.95; // Clear natural pace for children

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If audio cannot play (e.g. offline), fallback to verified English Web Speech
          this.speakWebSpeech(cleanWord);
        });
      }
    } catch {
      this.speakWebSpeech(cleanWord);
    }
  }

  private speakWebSpeech(cleanWord: string) {
    if (!this.isEnabled || !this.isSpeechSynthesisSupported || !window.speechSynthesis) return;
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.rate = 0.88;
      utterance.pitch = 1.05;
      utterance.lang = 'en-US';

      // STRICT: Only speak with SpeechSynthesis if an English voice is guaranteed.
      // This prevents the OS from speaking English with a Vietnamese system voice.
      if (this.verifiedEnglishVoice) {
        utterance.voice = this.verifiedEnglishVoice;
      } else {
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
        if (enVoice) {
          this.verifiedEnglishVoice = enVoice;
          utterance.voice = enVoice;
        } else {
          // No English voice available in OS, avoid mispronouncing with non-English voice
          return;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore
    }
  }

  public setEnabled(val: boolean) {
    this.isEnabled = val;
    if (!val) {
      if (this.isSpeechSynthesisSupported && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // Ignore
        }
      }
      if (this.currentAudio) {
        try {
          this.currentAudio.pause();
        } catch {
          // Ignore
        }
        this.currentAudio = null;
      }
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }
}

export const speechHelper = new SpeechHelper();
