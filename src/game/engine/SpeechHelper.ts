class SpeechHelper {
  private isEnabled: boolean = true;
  private currentAudio: HTMLAudioElement | null = null;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private verifiedEnglishVoice: SpeechSynthesisVoice | null = null;
  private isSpeechSynthesisSupported: boolean = false;
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isSpeechSynthesisSupported = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
      if (this.isSpeechSynthesisSupported) {
        this.initVoice();
      }
      this.setupUserUnlock();
    }
  }

  private setupUserUnlock() {
    const unlock = () => {
      if (this.isSpeechSynthesisSupported && window.speechSynthesis) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch {
          // Ignore
        }
        if (!this.verifiedEnglishVoice) {
          this.initVoice();
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
        if (!this.isSpeechSynthesisSupported || !window.speechSynthesis) return;
        const available = window.speechSynthesis.getVoices();
        if (available && available.length > 0) {
          const enVoice =
            available.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && (v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Alex') || v.name.includes('Ava') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Zira') || v.name.includes('Victoria'))) ||
            available.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && v.default) ||
            available.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('en-us')) ||
            available.find(v => v.lang.toLowerCase().startsWith('en')) ||
            null;

          if (enVoice) {
            this.verifiedEnglishVoice = enVoice;
          }
        }
      } catch {
        // Ignore
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
      window.speechSynthesis.addEventListener?.('voiceschanged', updateVoices);
    }
  }

  private getEnglishVoice(): SpeechSynthesisVoice | null {
    if (this.verifiedEnglishVoice) return this.verifiedEnglishVoice;
    if (!this.isSpeechSynthesisSupported || !window.speechSynthesis) return null;
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const enVoice =
          voices.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && (v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Alex') || v.name.includes('Ava') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Zira') || v.name.includes('Victoria'))) ||
          voices.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && v.default) ||
          voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('en-us')) ||
          voices.find(v => v.lang.toLowerCase().startsWith('en')) ||
          null;
        if (enVoice) {
          this.verifiedEnglishVoice = enVoice;
          return enVoice;
        }
      }
    } catch {
      // Ignore
    }
    return null;
  }

  public preloadWords(words: string[]) {
    if (typeof window === 'undefined') return;
    for (const raw of words) {
      const w = raw.trim();
      if (!w) continue;
      const isSentence = w.includes(' ') || w.length > 20;

      const url = isSentence
        ? `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(w)}`
        : `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(w.toLowerCase())}&type=2`;

      if (!this.audioCache.has(url)) {
        try {
          const audio = new Audio();
          (audio as unknown as HTMLElement).setAttribute('referrerpolicy', 'no-referrer');
          audio.src = url;
          audio.preload = 'auto';
          this.audioCache.set(url, audio);
        } catch {
          // Ignore
        }
      }
    }
  }

  public speak(text: string, force: boolean = false) {
    if (!this.isEnabled && !force) return;
    const cleanWord = text.trim();
    if (!cleanWord) return;

    // 1. Stop any currently playing HTML Audio
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }

    // 2. Stop any ongoing speech synthesis
    if (this.isSpeechSynthesisSupported && window.speechSynthesis) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
      } catch {
        // Ignore
      }
    }

    const isSentence = cleanWord.includes(' ') || cleanWord.length > 20;

    // 3. Audio stream URL (Google Translate TTS for sentences, Youdao for words)
    const primaryUrl = isSentence
      ? `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(cleanWord)}`
      : `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanWord.toLowerCase())}&type=2`;

    this.playAudioStream(primaryUrl, cleanWord);
  }

  private playAudioStream(url: string, fallbackText: string) {
    try {
      let audio = this.audioCache.get(url);
      if (!audio) {
        audio = new Audio();
        (audio as unknown as HTMLElement).setAttribute('referrerpolicy', 'no-referrer');
        audio.src = url;
        audio.preload = 'auto';
        this.audioCache.set(url, audio);
      }

      this.currentAudio = audio;
      audio.currentTime = 0;
      audio.playbackRate = 0.95;

      let fallbackTriggered = false;
      const triggerFallback = () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          this.speakWithWebSpeech(fallbackText);
        }
      };

      audio.onerror = () => {
        triggerFallback();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          triggerFallback();
        });
      }
    } catch {
      this.speakWithWebSpeech(fallbackText);
    }
  }

  private speakWithWebSpeech(cleanSentence: string) {
    if (!this.isSpeechSynthesisSupported || !window.speechSynthesis) return;

    try {
      const synth = window.speechSynthesis;

      if (synth.paused) {
        synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanSentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voice = this.getEnglishVoice();
      if (voice) {
        utterance.voice = voice;
      }

      this.activeUtterance = utterance;
      (window as unknown as { __activeSpeechUtterance?: SpeechSynthesisUtterance }).__activeSpeechUtterance = utterance;

      utterance.onend = () => {
        this.activeUtterance = null;
      };

      utterance.onerror = () => {
        this.activeUtterance = null;
      };

      synth.speak(utterance);

      if (synth.paused) {
        synth.resume();
      }
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
      this.activeUtterance = null;
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }
}

export const speechHelper = new SpeechHelper();
