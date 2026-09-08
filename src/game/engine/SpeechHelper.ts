class SpeechHelper {
  private isEnabled: boolean = true;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initVoice();
  }

  private initVoice() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.isEnabled = false;
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find a friendly English voice (US or UK)
      const enVoice = voices.find(v => v.lang.startsWith('en-US') && !v.name.includes('Bad')) ||
                      voices.find(v => v.lang.startsWith('en')) || null;
      this.voice = enVoice;
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }

  public speak(text: string) {
    if (!this.isEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop previous utterance

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower for 7-year-olds
      utterance.pitch = 1.1; // Cheerful friendly pitch
      utterance.lang = 'en-US';

      if (this.voice) {
        utterance.voice = this.voice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech errors
    }
  }

  public setEnabled(val: boolean) {
    this.isEnabled = val;
  }
}

export const speechHelper = new SpeechHelper();
