import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Volume2,
  Download,
  Upload,
  Save,
  Search,
  CheckCircle2,
  Layers,
  BookOpen,
  Sparkles,
  RefreshCw,
  FileJson,
  FileSpreadsheet
} from 'lucide-react';
import { AgeRealm } from '../../data/chapters/types';
import { LevelNode, Unit } from '../../data/progress-types';
import { VocabWord } from '../../data/types';
import { WordEditorModal } from './WordEditorModal';
import {
  saveVocabDraft,
  exportVocabToJson,
  exportVocabToCsv,
  parseVocabJson
} from '../../services/firebase/vocabAdminService';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { soundFx } from '../../game/engine/SoundController';

interface VocabManagerProps {
  realms: AgeRealm[];
  onChangeRealms: (newRealms: AgeRealm[]) => void;
  adminEmail: string;
  onPublishClick: () => void;
}

export const VocabManager: React.FC<VocabManagerProps> = ({
  realms,
  onChangeRealms,
  adminEmail,
  onPublishClick
}) => {
  const [selectedRealmId, setSelectedRealmId] = useState<string>(realms[0]?.id || 'realm-1');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [selectedLevelId, setSelectedLevelId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [editingWord, setEditingWord] = useState<VocabWord | null>(null);
  const [isWordModalOpen, setIsWordModalOpen] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [draftSaveSuccess, setDraftSaveSuccess] = useState(false);

  // Active Realm
  const currentRealm = realms.find((r) => r.id === selectedRealmId) || realms[0];
  const units = currentRealm?.units || [];
  
  // Active Unit
  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];
  const levels = currentUnit?.levels || [];
  
  // Active Level
  const currentLevel = levels.find((l) => l.id === selectedLevelId) || levels[0];
  const words = currentLevel?.words || [];

  // Filtered words
  const filteredWords = words.filter((w) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      w.word.toLowerCase().includes(q) ||
      (w.meaningVi && w.meaningVi.toLowerCase().includes(q)) ||
      (w.category && w.category.toLowerCase().includes(q))
    );
  });

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    soundFx.playClick();
    try {
      await saveVocabDraft(realms, adminEmail);
      soundFx.playUpgradeSuccess();
      setDraftSaveSuccess(true);
      setTimeout(() => setDraftSaveSuccess(false), 3000);
    } catch (err: any) {
      alert(`Lỗi lưu bản thảo: ${err.message}`);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleOpenAddWord = () => {
    setEditingWord(null);
    setIsWordModalOpen(true);
  };

  const handleOpenEditWord = (word: VocabWord) => {
    setEditingWord(word);
    setIsWordModalOpen(true);
  };

  const handleDeleteWord = (wordId: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa từ vựng này khỏi màn chơi?')) return;
    soundFx.playClick();

    const updatedRealms = realms.map((realm) => {
      if (realm.id !== currentRealm.id) return realm;
      return {
        ...realm,
        units: realm.units.map((unit) => {
          if (unit.id !== currentUnit.id) return unit;
          return {
            ...unit,
            levels: unit.levels.map((lvl) => {
              if (lvl.id !== currentLevel.id) return lvl;
              return {
                ...lvl,
                words: lvl.words.filter((w) => w.id !== wordId)
              };
            })
          };
        })
      };
    });

    onChangeRealms(updatedRealms);
  };

  const handleSaveWord = (savedWord: VocabWord) => {
    const isNew = !editingWord;
    const updatedRealms = realms.map((realm) => {
      if (realm.id !== currentRealm.id) return realm;
      return {
        ...realm,
        units: realm.units.map((unit) => {
          if (unit.id !== currentUnit.id) return unit;
          return {
            ...unit,
            levels: unit.levels.map((lvl) => {
              if (lvl.id !== currentLevel.id) return lvl;
              let nextWords: VocabWord[];
              if (isNew) {
                nextWords = [...lvl.words, savedWord];
              } else {
                nextWords = lvl.words.map((w) => (w.id === savedWord.id ? savedWord : w));
              }
              return {
                ...lvl,
                words: nextWords
              };
            })
          };
        })
      };
    });

    onChangeRealms(updatedRealms);
    setIsWordModalOpen(false);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = parseVocabJson(content);
      if (result.success && result.data) {
        if (window.confirm(`Đã kiểm tra hợp lệ! Nạp đè ${result.data.length} Realm từ file JSON vào bản thảo?`)) {
          onChangeRealms(result.data);
          soundFx.playUpgradeSuccess();
        }
      } else {
        alert(result.error || 'File JSON không hợp lệ.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">
            Biên Tập Từ Vựng & Cấu Trúc Realm
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Export options */}
          <button
            onClick={() => exportVocabToJson(realms)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
            title="Xuất dữ liệu toàn bộ ra file JSON"
          >
            <FileJson className="w-4 h-4 text-amber-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => exportVocabToCsv(realms)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
            title="Xuất bảng từ vựng ra file CSV/Excel"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          {/* Import JSON */}
          <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJsonFile}
              className="hidden"
            />
          </label>

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            disabled={isSavingDraft}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
          >
            {isSavingDraft ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : draftSaveSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{draftSaveSuccess ? 'Đã Lưu Nháp!' : 'Lưu Bản Thảo'}</span>
          </button>

          {/* Publish Snapshot button */}
          <button
            onClick={onPublishClick}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 active:scale-95 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>🚀 Phát Hành Snapshot</span>
          </button>
        </div>
      </div>

      {/* Realm Selection Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {realms.map((realm) => {
          const isSelected = realm.id === currentRealm?.id;
          return (
            <button
              key={realm.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedRealmId(realm.id);
                setSelectedUnitId('');
                setSelectedLevelId('');
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)] text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{realm.icon}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  R{realm.realmNumber}
                </span>
              </div>
              <div className="text-xs font-bold truncate">{realm.nameVi || realm.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{realm.ageRange}</div>
            </button>
          );
        })}
      </div>

      {/* Main Hierarchy & Word Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Units & Levels Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">Chương & Màn Chơi</span>
              </div>
              <span className="text-xs text-slate-400">
                {units.length} Units • {units.reduce((acc, u) => acc + (u.levels || []).length, 0)} Levels
              </span>
            </div>

            {/* Units Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Chọn Chủ Đề (Unit):
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {units.map((unit) => {
                  const isUnitSelected = unit.id === currentUnit?.id;
                  return (
                    <button
                      key={unit.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedUnitId(unit.id);
                        setSelectedLevelId('');
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isUnitSelected
                          ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span>{unit.icon || '📖'}</span>
                        <span className="text-xs truncate">{unit.titleVi || unit.title}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-400">
                        {unit.levels?.length || 0} lvls
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Levels Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Chọn Màn Chơi (Level):
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {levels.map((lvl) => {
                  const isLevelSelected = lvl.id === currentLevel?.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedLevelId(lvl.id);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isLevelSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span>{lvl.icon || '🎯'} L{lvl.levelNumber}</span>
                        <span className="text-[10px] text-slate-400">{lvl.words?.length || 0} từ</span>
                      </div>
                      <div className="text-[11px] truncate text-slate-300">{lvl.titleVi || lvl.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Words Table & Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            {/* Level Title & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <span>{currentLevel?.icon || '🎮'}</span>
                  <span>{currentLevel?.titleVi || currentLevel?.title || 'Chưa chọn màn chơi'}</span>
                  <span className="text-xs font-normal text-slate-400">({words.length} từ vựng)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ID: <span className="font-mono text-cyan-400">{currentLevel?.id}</span> • Loại: <span className="font-semibold text-amber-300">{currentLevel?.type}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm từ vựng..."
                    className="w-40 sm:w-48 bg-slate-800 border border-slate-700 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Add Word Button */}
                <button
                  onClick={handleOpenAddWord}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Từ</span>
                </button>
              </div>
            </div>

            {/* Words Grid */}
            {filteredWords.length === 0 ? (
              <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40 text-cyan-400" />
                <p className="text-sm">Không tìm thấy từ vựng nào trong màn này.</p>
                <button
                  onClick={handleOpenAddWord}
                  className="mt-3 text-xs font-bold text-cyan-400 hover:underline"
                >
                  + Thêm từ vựng đầu tiên
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredWords.map((w) => (
                  <div
                    key={w.id}
                    className="p-3 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{w.emoji || '⭐'}</span>
                          <div>
                            <div className="text-sm font-black text-cyan-300 font-mono tracking-wide">
                              {w.word}
                            </div>
                            {w.pronunciation && (
                              <div className="text-[10px] text-slate-400 font-mono">
                                {w.pronunciation}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Pronounce preview */}
                        <button
                          onClick={() => speechHelper.speak(w.word, true)}
                          className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-700 transition-colors"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-white font-medium mb-1">
                        {w.meaningVi}
                      </div>
                      
                      {w.category && (
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-400 border border-slate-700/50">
                          {w.category}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-slate-700/40">
                      <button
                        onClick={() => handleOpenEditWord(w)}
                        className="px-2 py-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-700/60 rounded-lg text-xs flex items-center gap-1 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={() => handleDeleteWord(w.id)}
                        className="px-2 py-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Word Editor Modal */}
      <WordEditorModal
        isOpen={isWordModalOpen}
        initialWord={editingWord}
        onSave={handleSaveWord}
        onClose={() => setIsWordModalOpen(false)}
      />
    </div>
  );
};
