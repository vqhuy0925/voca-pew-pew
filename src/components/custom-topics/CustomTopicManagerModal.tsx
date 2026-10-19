import React, { useState } from 'react';
import { CustomTopic } from '../../data/custom-topic-types';
import { TopicEditorModal } from './TopicEditorModal';
import { SpellingLabModal } from './SpellingLabModal';
import { soundFx } from '../../game/engine/SoundController';
import {
  X,
  Plus,
  BookOpen,
  Edit2,
  Trash2,
  Rocket,
  PenTool,
  Sparkles,
  Award,
  Calendar,
  CheckCircle2,
  Play
} from 'lucide-react';

interface CustomTopicManagerModalProps {
  isOpen: boolean;
  topics: CustomTopic[];
  onSaveTopic: (topic: CustomTopic) => void;
  onDeleteTopic: (topicId: string) => void;
  onUpdateWordMastery: (topicId: string, wordId: string, newLevel: number) => void;
  onStartArcadeBattle: (topic: CustomTopic) => void;
  onClose: () => void;
}

// Sample starter topic for parents to explore immediately
const SAMPLE_STARTER_TOPIC: CustomTopic = {
  id: `topic-sample-school-things`,
  title: 'Chủ Đề Mẫu: Đồ Dùng Học Tập & Bạn Bè (Lớp 1-2)',
  description: 'Từ vựng thông dụng các trung tâm tiếng Anh hay dạy cho trẻ 7 tuổi',
  icon: '🎒',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  totalPracticed: 0,
  words: [
    { id: 'sw-1', word: 'pencil', meaningVi: 'Cây bút chì', emoji: '✏️', masteryLevel: 0 },
    { id: 'sw-2', word: 'eraser', meaningVi: 'Cục tẩy', emoji: '🧼', masteryLevel: 0 },
    { id: 'sw-3', word: 'ruler', meaningVi: 'Cây thước kẻ', emoji: '📏', masteryLevel: 0 },
    { id: 'sw-4', word: 'backpack', meaningVi: 'Chiếc ba lô', emoji: '🎒', masteryLevel: 0 },
    { id: 'sw-5', word: 'teacher', meaningVi: 'Thầy / Cô giáo', emoji: '👩‍🏫', masteryLevel: 0 },
    { id: 'sw-6', word: 'book', meaningVi: 'Quyển sách', emoji: '📖', masteryLevel: 0 }
  ]
};

export const CustomTopicManagerModal: React.FC<CustomTopicManagerModalProps> = ({
  isOpen,
  topics,
  onSaveTopic,
  onDeleteTopic,
  onUpdateWordMastery,
  onStartArcadeBattle,
  onClose
}) => {
  const [editingTopic, setEditingTopic] = useState<CustomTopic | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeSpellingTopic, setActiveSpellingTopic] = useState<CustomTopic | null>(null);

  if (!isOpen) return null;

  const handleOpenAdd = () => {
    soundFx.playClick();
    setEditingTopic(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (t: CustomTopic, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    setEditingTopic(t);
    setIsEditorOpen(true);
  };

  const handleDelete = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xoá chủ đề từ vựng này không?')) {
      soundFx.playClick();
      onDeleteTopic(topicId);
    }
  };

  const handleStartSpelling = (t: CustomTopic) => {
    soundFx.playClick();
    setActiveSpellingTopic(t);
  };

  const handleAddSampleTopic = () => {
    soundFx.playUpgradeSuccess();
    onSaveTopic(SAMPLE_STARTER_TOPIC);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200">
        <div className="relative w-full max-w-3xl bg-slate-950 border-3 border-cyan-400 rounded-3xl p-5 sm:p-7 shadow-[0_0_45px_rgba(0,240,255,0.35)] flex flex-col max-h-[92vh] font-game text-white">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400/50 flex items-center justify-center text-2xl shadow-inner">
                📝
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>Sổ Từ Vựng Của Con</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    Phụ Huynh & Bé
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-cyan-300">
                  Lưu từ vựng học ở trung tâm và cho bé luyện viết tự nhiên 3 bước
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Row */}
          <div className="py-4 flex items-center justify-between gap-3 shrink-0">
            <div className="text-xs font-bold text-slate-400">
              Tổng số chủ đề: <span className="text-cyan-300">{topics.length}</span>
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="btn-3d btn-3d-cyan px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Thêm Chủ Đề Mới</span>
            </button>
          </div>

          {/* Topic List */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {topics.length === 0 ? (
              /* Empty state */
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl bg-slate-900/40 border-2 border-dashed border-slate-800 p-6">
                <span className="text-6xl animate-bounce">🎒</span>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white">Chưa có chủ đề từ vựng nào!</h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                    Bố mẹ có thể nhập danh sách từ bé đã học ở trung tâm (ví dụ: Unit 1, Unit 2) để bé luyện viết tự nhiên không áp lực.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleOpenAdd}
                    className="btn-3d btn-3d-cyan px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tạo Chủ Đề Đầu Tiên</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddSampleTopic}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Nạp Chủ Đề Mẫu (Lớp 1-2)</span>
                  </button>
                </div>
              </div>
            ) : (
              topics.map(t => {
                const totalWords = t.words.length;
                const masteredCount = t.words.filter(w => (w.masteryLevel || 0) >= 3).length;
                const progressPct = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

                return (
                  <div
                    key={t.id}
                    className="group p-4 sm:p-5 rounded-3xl bg-slate-900/90 hover:bg-slate-900 border-2 border-slate-800 hover:border-cyan-500/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                  >
                    {/* Left: Icon, Title, Stats */}
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                        {t.icon || '🎒'}
                      </div>
                      <div className="min-w-0 space-y-1">
                        <h4 className="text-base sm:text-lg font-black text-white truncate group-hover:text-cyan-200 transition-colors">
                          {t.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 font-bold">
                          <span>📚 {totalWords} từ vựng</span>
                          <span>•</span>
                          <span className="text-emerald-400">
                            🌟 {masteredCount}/{totalWords} thuộc bài ({progressPct}%)
                          </span>
                        </div>
                        {/* Word Pills Preview */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {t.words.slice(0, 5).map(w => (
                            <span
                              key={w.id}
                              className="px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-mono"
                            >
                              {w.emoji} {w.word}
                            </span>
                          ))}
                          {t.words.length > 5 && (
                            <span className="text-[11px] text-slate-500 self-center">
                              +{t.words.length - 5} từ nữa
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {/* Luyện Viết 3 Bước */}
                      <button
                        type="button"
                        onClick={() => handleStartSpelling(t)}
                        className="btn-3d btn-3d-cyan px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md"
                        title="Bé luyện viết tự nhiên 3 bước"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Luyện Viết</span>
                      </button>

                      {/* Bắn Phi Thuyền Arcade */}
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playVictory();
                          onClose();
                          onStartArcadeBattle(t);
                        }}
                        className="p-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-300 transition active:scale-95 cursor-pointer"
                        title="Bắn Phi Thuyền Arcade với từ vựng này"
                      >
                        <Rocket className="w-4 h-4" />
                      </button>

                      {/* Sửa Topic */}
                      <button
                        type="button"
                        onClick={e => handleOpenEdit(t, e)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                        title="Chỉnh sửa từ vựng"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Xoá Topic */}
                      <button
                        type="button"
                        onClick={e => handleDelete(t.id, e)}
                        className="p-2.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                        title="Xoá chủ đề"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Topic Editor Modal */}
      <TopicEditorModal
        isOpen={isEditorOpen}
        topic={editingTopic}
        onSave={saved => {
          onSaveTopic(saved);
          setIsEditorOpen(false);
        }}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* Spelling Lab Modal */}
      {activeSpellingTopic && (
        <SpellingLabModal
          isOpen={Boolean(activeSpellingTopic)}
          topic={activeSpellingTopic}
          onClose={() => setActiveSpellingTopic(null)}
          onUpdateWordMastery={onUpdateWordMastery}
          onStartArcadeBattle={topic => {
            setActiveSpellingTopic(null);
            onClose();
            onStartArcadeBattle(topic);
          }}
        />
      )}
    </>
  );
};
