import React, { useState, useEffect } from 'react';
import { X, Volume2, Save, Sparkles, HelpCircle } from 'lucide-react';
import { VocabWord } from '../../data/types';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { soundFx } from '../../game/engine/SoundController';

interface WordEditorModalProps {
  isOpen: boolean;
  initialWord?: VocabWord | null;
  onSave: (word: VocabWord) => void;
  onClose: () => void;
}

const CATEGORY_PRESETS = [
  'Colors', 'Numbers', 'Animals', 'School', 'Toys', 'Body', 'Food', 'Family',
  'Nature', 'Actions', 'Places', 'Tech', 'Travel', 'Academic', 'Workplace'
];

export const WordEditorModal: React.FC<WordEditorModalProps> = ({
  isOpen,
  initialWord,
  onSave,
  onClose
}) => {
  const [word, setWord] = useState('');
  const [meaningVi, setMeaningVi] = useState('');
  const [category, setCategory] = useState('Colors');
  const [emoji, setEmoji] = useState('⭐');
  const [pronunciation, setPronunciation] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (initialWord) {
      setWord(initialWord.word || '');
      setMeaningVi(initialWord.meaningVi || '');
      setCategory(initialWord.category || 'Colors');
      setEmoji(initialWord.emoji || '⭐');
      setPronunciation(initialWord.pronunciation || '');
    } else {
      setWord('');
      setMeaningVi('');
      setCategory('Colors');
      setEmoji('🚀');
      setPronunciation('');
    }
  }, [initialWord, isOpen]);

  if (!isOpen) return null;

  const handleTestAudio = () => {
    if (!word.trim()) return;
    setIsSpeaking(true);
    speechHelper.speak(word.trim(), true);
    setTimeout(() => setIsSpeaking(false), 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !meaningVi.trim()) {
      alert('Vui lòng nhập Từ Tiếng Anh và Nghĩa Tiếng Việt.');
      return;
    }

    const cleanWord: VocabWord = {
      id: initialWord?.id || `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      word: word.trim().toLowerCase(),
      meaningVi: meaningVi.trim(),
      category: category.trim(),
      emoji: emoji.trim() || '⭐',
      pronunciation: pronunciation.trim() || undefined
    };

    soundFx.playUpgradeSuccess();
    onSave(cleanWord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-cyan-500/50 rounded-2xl shadow-[0_0_40px_rgba(0,240,255,0.25)] p-6 text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="text-3xl p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            {emoji || '📝'}
          </div>
          <div>
            <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
              {initialWord ? 'Chỉnh Sửa Từ Vựng' : 'Thêm Từ Vựng Mới'}
            </h3>
            <p className="text-xs text-slate-400">
              Cập nhật thông tin hiển thị, nghĩa tiếng Việt và phát âm
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Từ Tiếng Anh *
              </label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="ví dụ: astronaut"
                required
                className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl py-2 px-3 text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Emoji Biểu Trưng
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                placeholder="🚀"
                className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl py-2 px-3 text-white text-sm text-center text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Nghĩa Tiếng Việt *
            </label>
            <input
              type="text"
              value={meaningVi}
              onChange={(e) => setMeaningVi(e.target.value)}
              placeholder="ví dụ: phi hành gia"
              required
              className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl py-2 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Phiên Âm IPA (Tùy chọn)
              </label>
              <input
                type="text"
                value={pronunciation}
                onChange={(e) => setPronunciation(e.target.value)}
                placeholder="/ˈæstrənɔːt/"
                className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl py-2 px-3 text-white text-sm font-mono text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Chủ Đề (Category)
              </label>
              <input
                type="text"
                list="category-options"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Space, Animals..."
                className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl py-2 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
              <datalist id="category-options">
                {CATEGORY_PRESETS.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Test Pronunciation Preview */}
          <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-300">
                Kiểm tra phát âm giọng đọc AI:
              </span>
            </div>
            <button
              type="button"
              onClick={handleTestAudio}
              disabled={!word.trim() || isSpeaking}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-slate-900 animate-pulse'
                  : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'Đang đọc...' : 'Nghe Thử'}</span>
            </button>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-semibold text-sm transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl font-bold text-white text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Từ Vựng</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
