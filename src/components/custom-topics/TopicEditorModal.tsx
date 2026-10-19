import React, { useState } from 'react';
import { CustomTopic, CustomWord } from '../../data/custom-topic-types';
import { parseRawVocabInput, lookupWordInfo } from '../../services/customVocabHelper';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import {
  X,
  Plus,
  Trash2,
  Volume2,
  Sparkles,
  ClipboardPaste,
  Save,
  Smile,
  HelpCircle,
  Check
} from 'lucide-react';

interface TopicEditorModalProps {
  isOpen: boolean;
  topic?: CustomTopic | null;
  onSave: (topic: CustomTopic) => void;
  onClose: () => void;
}

const TOPIC_ICONS = ['🎒', '🐶', '🍎', '🚀', '🦁', '✏️', '🍕', '🎨', '🌈', '⚽', '🚗', '👾', '🌟', '🎸'];

export const TopicEditorModal: React.FC<TopicEditorModalProps> = ({
  isOpen,
  topic,
  onSave,
  onClose
}) => {
  const [title, setTitle] = useState(topic?.title || '');
  const [description, setDescription] = useState(topic?.description || '');
  const [icon, setIcon] = useState(topic?.icon || '🎒');
  const [words, setWords] = useState<CustomWord[]>(() => topic?.words || []);

  const [activeTab, setActiveTab] = useState<'list' | 'quick_paste'>('list');
  const [quickPasteText, setQuickPasteText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddWord = () => {
    soundFx.playClick();
    const newWord: CustomWord = {
      id: `cword-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      word: '',
      meaningVi: '',
      emoji: '⭐',
      masteryLevel: 0
    };
    setWords(prev => [...prev, newWord]);
  };

  const handleWordChange = (id: string, field: keyof CustomWord, value: string) => {
    setWords(prev =>
      prev.map(w => {
        if (w.id !== id) return w;
        const updated = { ...w, [field]: value };
        if (field === 'word' && value.trim()) {
          // Tự động gợi ý nếu người dùng chưa nhập nghĩa
          const info = lookupWordInfo(value);
          if (!updated.meaningVi && info.meaningVi) {
            updated.meaningVi = info.meaningVi;
          }
          if (updated.emoji === '⭐' && info.emoji) {
            updated.emoji = info.emoji;
          }
        }
        return updated;
      })
    );
  };

  const handleRemoveWord = (id: string) => {
    soundFx.playClick();
    setWords(prev => prev.filter(w => w.id !== id));
  };

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!word.trim()) return;
    soundFx.playClick();
    speechHelper.speak(word, true);
  };

  const handleProcessQuickPaste = () => {
    soundFx.playClick();
    if (!quickPasteText.trim()) {
      setErrorMsg('Vui lòng dán danh sách từ vựng vào ô bên dưới.');
      return;
    }

    const parsed = parseRawVocabInput(quickPasteText);
    if (parsed.length === 0) {
      setErrorMsg('Không tìm thấy từ tiếng Anh hợp lệ. Vui lòng kiểm tra lại văn bản.');
      return;
    }

    soundFx.playUpgradeSuccess();
    setWords(prev => {
      const existing = new Set(prev.map(w => w.word.toLowerCase()));
      const filtered = parsed.filter(p => !existing.has(p.word.toLowerCase()));
      return [...prev, ...filtered];
    });

    setQuickPasteText('');
    setActiveTab('list');
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      soundFx.playWrong();
      setErrorMsg('Vui lòng nhập tên chủ đề (ví dụ: Unit 3: School Things)');
      return;
    }

    const validWords = words.filter(w => w.word.trim().length > 0);
    if (validWords.length === 0) {
      soundFx.playWrong();
      setErrorMsg('Vui lòng thêm ít nhất 1 từ vựng cho chủ đề này.');
      return;
    }

    soundFx.playVictory();
    const finalTopic: CustomTopic = {
      id: topic?.id || `topic-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      icon,
      words: validWords,
      createdAt: topic?.createdAt || Date.now(),
      updatedAt: Date.now(),
      totalPracticed: topic?.totalPracticed || 0
    };

    onSave(finalTopic);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border-3 border-cyan-400/80 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(0,240,255,0.35)] flex flex-col max-h-[92vh] font-game">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-2xl shadow-inner">
              {icon}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {topic ? 'Chỉnh Sửa Chủ Đề Từ Vựng' : 'Tạo Chủ Đề Từ Vựng Mới'}
              </h3>
              <p className="text-xs text-cyan-300">
                Nhập bài học trung tâm để bé 7 tuổi luyện viết tự nhiên
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message if any */}
        {errorMsg && (
          <div className="mt-3 p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold animate-pulse">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Topic Title & Icon Selection */}
          <div className="space-y-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Tên chủ đề / Tên bài học (VD: Unit 3: Pets & Animals)
              </label>
              <input
                type="text"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="VD: Unit 3: School Things"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>

            {/* Icon Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-yellow-400" />
                <span>Chọn biểu tượng chủ đề:</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPIC_ICONS.map(ic => (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setIcon(ic);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform active:scale-95 ${
                      icon === ic
                        ? 'bg-cyan-500/30 border-2 border-cyan-400 scale-110 shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mode Switcher: Từng từ vs Dán nhanh */}
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('list');
              }}
              className={`flex-1 py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Danh Sách Từ ({words.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('quick_paste');
              }}
              className={`flex-1 py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'quick_paste'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ClipboardPaste className="w-3.5 h-3.5" />
              <span>Dán Nhanh 1 Chạm</span>
              <span className="px-1.5 py-0.2 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded text-[9px]">
                Nhanh
              </span>
            </button>
          </div>

          {/* TAB 1: Danh sách từ */}
          {activeTab === 'list' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Từ tiếng Anh</span>
                <span>Nghĩa tiếng Việt</span>
              </div>

              {words.map((w, index) => (
                <div
                  key={w.id}
                  className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition"
                >
                  <span className="text-xs font-mono text-slate-500 w-5 text-center shrink-0">
                    {index + 1}
                  </span>

                  {/* Emoji selector/display */}
                  <input
                    type="text"
                    value={w.emoji}
                    onChange={e => handleWordChange(w.id, 'emoji', e.target.value)}
                    className="w-10 h-10 text-center text-lg bg-slate-950 border border-slate-700 rounded-xl outline-none shrink-0"
                    title="Biểu tượng cảm xúc / hình ảnh"
                  />

                  {/* English Word */}
                  <input
                    type="text"
                    value={w.word}
                    onChange={e => handleWordChange(w.id, 'word', e.target.value)}
                    placeholder="VD: pencil"
                    className="flex-1 min-w-0 px-3 py-2 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm font-black text-cyan-200 outline-none"
                  />

                  {/* Audio Listen Preview */}
                  <button
                    type="button"
                    onClick={e => handleSpeak(w.word, e)}
                    className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 transition shrink-0 cursor-pointer"
                    title="Nghe phát âm thử"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Vietnamese Meaning */}
                  <input
                    type="text"
                    value={w.meaningVi}
                    onChange={e => handleWordChange(w.id, 'meaningVi', e.target.value)}
                    placeholder="VD: Cây bút chì"
                    className="flex-1 min-w-0 px-3 py-2 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveWord(w.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition shrink-0 cursor-pointer"
                    title="Xóa từ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Add Word Button */}
              <button
                type="button"
                onClick={handleAddWord}
                className="w-full py-3 rounded-2xl bg-slate-900 border-2 border-dashed border-slate-700 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-200 text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm Từ Vựng Mới</span>
              </button>
            </div>
          )}

          {/* TAB 2: Dán nhanh (Quick Paste) */}
          {activeTab === 'quick_paste' && (
            <div className="space-y-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Tính Năng Tự Động Phân Tích Thông Minh:</span>
              </div>
              <p className="text-xs text-slate-400">
                Phụ huynh có thể copy danh sách từ từ Zalo hoặc phiếu bài tập của trung tâm rồi dán vào đây. Hệ thống sẽ tự động tìm nghĩa tiếng Việt & gán Emoji minh họa!
              </p>

              <textarea
                value={quickPasteText}
                onChange={e => setQuickPasteText(e.target.value)}
                rows={6}
                placeholder={"Ví dụ:\napple, banana, orange, watermelon\nhoặc:\ncat: con mèo\ndog: con chó\nbird: con chim"}
                className="w-full p-3 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 outline-none font-mono"
              />

              <button
                type="button"
                onClick={handleProcessQuickPaste}
                className="btn-3d btn-3d-cyan w-full py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Phân Tích & Điền Tự Động</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3.5 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
          >
            Hủy Bỏ
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="btn-3d btn-3d-cyan px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Chủ Đề</span>
          </button>
        </div>
      </div>
    </div>
  );
};
