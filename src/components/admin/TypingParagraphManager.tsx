import React, { useEffect, useState } from 'react';
import {
  RefreshCw,
  Plus,
  Trash2,
  Save,
  Sparkles,
  CheckCircle2,
  Languages,
  Wand2,
  FileText,
  Cloud
} from 'lucide-react';
import { AGE_REALMS } from '../../data/learning-path-data';
import { TypingParagraph } from '../../data/typing-paragraph-types';
import {
  loadTypingParagraphDraft,
  saveTypingParagraphDraft,
  publishTypingParagraphSnapshot
} from '../../services/firebase/typingParagraphAdminService';
import { generateParagraphsFromRealm } from '../../services/typingParagraphLoader';
import { soundFx } from '../../game/engine/SoundController';

interface TypingParagraphManagerProps {
  adminEmail: string;
}

const createEmptyParagraph = (realmId: string): TypingParagraph => ({
  id: `typing-paragraph-${realmId}-admin-${Date.now()}`,
  realmId,
  text: '',
  isVietnamese: false,
  sourceWordIds: [],
  createdBy: 'admin',
  updatedAt: Date.now()
});

export const TypingParagraphManager: React.FC<TypingParagraphManagerProps> = ({ adminEmail }) => {
  const [selectedRealmId, setSelectedRealmId] = useState<string>(AGE_REALMS[0]?.id || 'realm-1');
  const [draftsByRealm, setDraftsByRealm] = useState<Record<string, TypingParagraph[]>>({});
  const [cloudDraftRealmIds, setCloudDraftRealmIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadAllDrafts = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          AGE_REALMS.map((realm) => loadTypingParagraphDraft(realm.id))
        );
        if (cancelled) return;

        const nextDrafts: Record<string, TypingParagraph[]> = {};
        const nextCloudSet = new Set<string>();
        AGE_REALMS.forEach((realm, idx) => {
          nextDrafts[realm.id] = results[idx].paragraphs;
          if (results[idx].isCloudDraft) nextCloudSet.add(realm.id);
        });
        setDraftsByRealm(nextDrafts);
        setCloudDraftRealmIds(nextCloudSet);
      } catch (e) {
        console.error('[TypingParagraphManager] Load drafts error:', e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadAllDrafts();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentRealm = AGE_REALMS.find((r) => r.id === selectedRealmId) || AGE_REALMS[0];
  const currentParagraphs = draftsByRealm[selectedRealmId] || [];

  const updateCurrentParagraphs = (updater: (prev: TypingParagraph[]) => TypingParagraph[]) => {
    setDraftsByRealm((prev) => ({
      ...prev,
      [selectedRealmId]: updater(prev[selectedRealmId] || [])
    }));
  };

  const handleUpdateField = <K extends keyof TypingParagraph>(
    paragraphId: string,
    field: K,
    value: TypingParagraph[K]
  ) => {
    updateCurrentParagraphs((prev) =>
      prev.map((p) => (p.id === paragraphId ? { ...p, [field]: value, updatedAt: Date.now() } : p))
    );
  };

  const handleAddParagraph = () => {
    soundFx.playClick();
    updateCurrentParagraphs((prev) => [...prev, createEmptyParagraph(selectedRealmId)]);
  };

  const handleDeleteParagraph = (paragraphId: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa đoạn văn này khỏi bản thảo?')) return;
    soundFx.playClick();
    updateCurrentParagraphs((prev) => prev.filter((p) => p.id !== paragraphId));
  };

  const handleRegenerateFromRealm = () => {
    if (
      !window.confirm(
        `Tự sinh lại toàn bộ đoạn văn cho "${currentRealm.nameVi}" từ từ vựng hiện có? Thao tác này sẽ THAY THẾ mọi chỉnh sửa thủ công trong bản thảo hiện tại.`
      )
    ) {
      return;
    }
    soundFx.playClick();
    const regenerated = generateParagraphsFromRealm(currentRealm);
    setDraftsByRealm((prev) => ({ ...prev, [selectedRealmId]: regenerated }));
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    soundFx.playClick();
    try {
      await saveTypingParagraphDraft(selectedRealmId, currentParagraphs, adminEmail);
      setCloudDraftRealmIds((prev) => new Set(prev).add(selectedRealmId));
      soundFx.playUpgradeSuccess();
      setStatusMsg(`Đã lưu bản thảo đoạn văn cho "${currentRealm.nameVi}"! 📝`);
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      soundFx.playWrong();
      alert(`Lỗi lưu bản thảo: ${err.message}`);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handlePublishSnapshot = async () => {
    if (
      !window.confirm(
        'Bạn có chắc chắn muốn PHÁT HÀNH (Publish Snapshot) toàn bộ đoạn văn luyện gõ cho tất cả các Realm tới toàn bộ học sinh?'
      )
    ) {
      return;
    }
    setIsPublishing(true);
    soundFx.playClick();
    try {
      const versionId = await publishTypingParagraphSnapshot(draftsByRealm, adminEmail);
      soundFx.playVictory();
      setStatusMsg(`Đã phát hành thành công snapshot đoạn văn phiên bản ${versionId}! 🚀`);
      setTimeout(() => setStatusMsg(null), 5000);
    } catch (err: any) {
      soundFx.playWrong();
      alert(`Lỗi phát hành snapshot: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-violet-400 mb-3" />
        <p className="text-sm">Đang tải bản thảo đoạn văn luyện gõ từ Firebase...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-violet-400" />
          <h2 className="text-lg font-bold text-white">Đoạn Văn Luyện Gõ</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {statusMsg && (
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {statusMsg}
            </span>
          )}

          <button
            onClick={handleRegenerateFromRealm}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
            title="Tự sinh lại toàn bộ đoạn văn từ từ vựng của Realm này"
          >
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span>Tự Sinh Lại Từ Realm</span>
          </button>

          <button
            onClick={handleSaveDraft}
            disabled={isSavingDraft}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
          >
            {isSavingDraft ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Lưu Bản Thảo</span>
          </button>

          <button
            onClick={handlePublishSnapshot}
            disabled={isPublishing}
            className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 active:scale-95 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50"
          >
            {isPublishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>🚀 Phát Hành Snapshot</span>
          </button>
        </div>
      </div>

      {/* Realm Selection Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {AGE_REALMS.map((realm) => {
          const isSelected = realm.id === selectedRealmId;
          const count = (draftsByRealm[realm.id] || []).length;
          return (
            <button
              key={realm.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedRealmId(realm.id);
              }}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-violet-500/20 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">{realm.icon}</span>
                <div className="flex items-center gap-1">
                  {cloudDraftRealmIds.has(realm.id) && (
                    <span title="Đã có bản thảo trên Cloud">
                      <Cloud className="w-3 h-3 text-cyan-400" />
                    </span>
                  )}
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    R{realm.realmNumber}
                  </span>
                </div>
              </div>
              <div className="text-xs font-bold truncate text-white">{realm.nameVi || realm.name}</div>
              <div className="text-[10px] text-slate-500 truncate mt-1">{count} đoạn văn</div>
            </button>
          );
        })}
      </div>

      {/* Paragraph List for Selected Realm */}
      <div className="p-4 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>{currentRealm.icon}</span>
              <span>{currentRealm.nameVi || currentRealm.name}</span>
              <span className="text-xs font-normal text-slate-400">({currentParagraphs.length} đoạn văn)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Nguồn: <span className="font-mono text-cyan-400">{currentRealm.id}</span> • Gợi ý độ dài: <span className="text-amber-300">{currentRealm.wordLengthHint}</span>
            </p>
          </div>

          <button
            onClick={handleAddParagraph}
            className="px-3 py-1.5 bg-violet-500 hover:bg-violet-400 active:scale-95 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Đoạn Văn</span>
          </button>
        </div>

        {currentParagraphs.length === 0 ? (
          <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
            <FileText className="w-10 h-10 mx-auto mb-2 opacity-40 text-violet-400" />
            <p className="text-sm">Chưa có đoạn văn luyện gõ nào cho Realm này.</p>
            <button onClick={handleAddParagraph} className="mt-3 text-xs font-bold text-violet-400 hover:underline">
              + Thêm đoạn văn đầu tiên
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {currentParagraphs.map((p) => {
              const wordCount = p.text.trim() ? p.text.trim().split(/\s+/).length : 0;
              return (
                <div
                  key={p.id}
                  className="p-3 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-500 truncate">{p.id}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${
                          p.createdBy === 'auto'
                            ? 'bg-slate-900/80 text-slate-400 border-slate-700'
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {p.createdBy === 'auto' ? 'Tự Sinh' : 'Admin'}
                      </span>
                      <button
                        onClick={() => handleDeleteParagraph(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Xóa đoạn văn"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={p.text}
                    onChange={(e) => handleUpdateField(p.id, 'text', e.target.value)}
                    rows={3}
                    placeholder="Nhập nội dung đoạn văn luyện gõ..."
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2 text-sm text-white font-mono resize-y focus:outline-none focus:border-violet-400"
                  />

                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={p.isVietnamese}
                        onChange={(e) => handleUpdateField(p.id, 'isVietnamese', e.target.checked)}
                        className="accent-emerald-500 w-3.5 h-3.5"
                      />
                      <Languages className="w-3.5 h-3.5" />
                      <span>Tiếng Việt (Telex)</span>
                    </label>
                    <span className="text-[10px] text-slate-500">
                      {p.text.length} ký tự • {wordCount} từ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
