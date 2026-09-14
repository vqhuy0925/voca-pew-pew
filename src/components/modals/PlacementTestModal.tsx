import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Rocket, CheckCircle2, ArrowRight, RotateCcw, Target, Zap, Trophy } from 'lucide-react';
import { AgeRealm } from '../../data/chapters/types';
import { AGE_REALMS } from '../../data/learning-path-data';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';

interface PlacementTestModalProps {
  onApplyRecommendedRealm: (realmId: string, estimatedAge: number) => void;
  onClose: () => void;
}

interface TestWord {
  word: string;
  meaningVi: string;
  emoji: string;
  tier: number; // 1: Pre-A1, 2: A1, 3: A2, 4: B1
  targetRealmId: string;
  suggestedAge: number;
}

const TEST_QUESTIONS: TestWord[] = [
  { word: 'cat', meaningVi: 'con mèo', emoji: '🐱', tier: 1, targetRealmId: 'realm-1', suggestedAge: 8 },
  { word: 'pink', meaningVi: 'màu hồng', emoji: '🌸', tier: 1, targetRealmId: 'realm-1', suggestedAge: 8 },
  { word: 'music', meaningVi: 'âm nhạc', emoji: '🎵', tier: 2, targetRealmId: 'realm-2', suggestedAge: 10 },
  { word: 'school', meaningVi: 'trường học', emoji: '🏫', tier: 2, targetRealmId: 'realm-2', suggestedAge: 10 },
  { word: 'planet', meaningVi: 'hành tinh', emoji: '🪐', tier: 3, targetRealmId: 'realm-3', suggestedAge: 11 },
  { word: 'explore', meaningVi: 'khám phá', emoji: '🧭', tier: 3, targetRealmId: 'realm-3', suggestedAge: 11 },
  { word: 'adventure', meaningVi: 'cuộc phiêu lưu', emoji: '🚀', tier: 4, targetRealmId: 'realm-4', suggestedAge: 13 },
  { word: 'astronaut', meaningVi: 'phi hành gia', emoji: '👨‍🚀', tier: 4, targetRealmId: 'realm-4', suggestedAge: 13 }
];

export const PlacementTestModal: React.FC<PlacementTestModalProps> = ({
  onApplyRecommendedRealm,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [results, setResults] = useState<{ word: string; timeMs: number; errors: number; tier: number }[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [errorCountForCurrentWord, setErrorCountForCurrentWord] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const currentQuestion = TEST_QUESTIONS[currentIndex];

  useEffect(() => {
    if (!isCompleted) {
      setStartTime(Date.now());
      setTypedText('');
      setErrorCountForCurrentWord(0);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (currentQuestion) {
        speechHelper.speak(currentQuestion.word);
      }
    }
  }, [currentIndex, isCompleted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const target = currentQuestion.word.toLowerCase();

    // Check if what's typed so far matches target prefix
    if (!target.startsWith(val)) {
      soundFx.playWrong();
      setErrorCountForCurrentWord(prev => prev + 1);
      return;
    }

    soundFx.playPew();
    setTypedText(val);

    if (val === target) {
      soundFx.playCombo(Math.min(currentIndex + 1, 8));
      const timeSpent = Date.now() - startTime;
      const newResult = {
        word: currentQuestion.word,
        timeMs: timeSpent,
        errors: errorCountForCurrentWord,
        tier: currentQuestion.tier
      };

      const nextResults = [...results, newResult];
      setResults(nextResults);

      if (currentIndex + 1 < TEST_QUESTIONS.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        soundFx.playVictory();
        setIsCompleted(true);
      }
    }
  };

  // Evaluate recommended Realm
  const evaluateRecommendation = () => {
    let highestPassedTier = 1;
    let totalErrors = 0;

    results.forEach(r => {
      totalErrors += r.errors;
      // If cleared in under 4 seconds with <= 1 error, considered passed for that tier
      if (r.timeMs < 4500 && r.errors <= 1) {
        if (r.tier > highestPassedTier) {
          highestPassedTier = r.tier;
        }
      }
    });

    const realmMap: Record<number, { realmId: string; age: number }> = {
      1: { realmId: 'realm-1', age: 8 },
      2: { realmId: 'realm-2', age: 10 },
      3: { realmId: 'realm-3', age: 11 },
      4: { realmId: 'realm-4', age: 13 }
    };

    const rec = realmMap[highestPassedTier] || realmMap[1];
    const recRealm = AGE_REALMS.find(r => r.id === rec.realmId) || AGE_REALMS[0];
    return { recRealm, suggestedAge: rec.age, totalErrors };
  };

  const { recRealm, suggestedAge } = isCompleted ? evaluateRecommendation() : { recRealm: AGE_REALMS[0], suggestedAge: 8 };

  const handleApply = () => {
    soundFx.playClick();
    onApplyRecommendedRealm(recRealm.id, suggestedAge);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md select-none animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-[#12163b] to-slate-950 border-3 border-cyan-400 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(0,240,255,0.4)] text-white max-h-[92vh] flex flex-col items-center text-center overflow-y-auto">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-cyan-300 text-xs font-black uppercase">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            CHẨN ĐOÁN PHÂN CẤP NHANH (2 PHÚT) 🔍
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCompleted ? (
          <div className="w-full space-y-4">
            {/* Progress bar */}
            <div className="w-full flex items-center justify-between text-xs font-black text-slate-300 mb-1">
              <span>Câu {currentIndex + 1} / {TEST_QUESTIONS.length}</span>
              <span className="text-cyan-300">{Math.round(((currentIndex) / TEST_QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / TEST_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Word Display Card */}
            <div className="p-6 bg-slate-950/80 border-2 border-cyan-400/60 rounded-3xl relative shadow-inner my-3">
              <span className="text-5xl block mb-2 drop-shadow animate-bounce">{currentQuestion.emoji}</span>
              <div className="font-orbitron font-black text-3xl sm:text-4xl text-white tracking-widest mb-1">
                {currentQuestion.word}
              </div>
              <div className="text-sm sm:text-base text-cyan-300 font-bold">
                {currentQuestion.meaningVi}
              </div>
            </div>

            {/* Typing Input */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={typedText}
                onChange={handleInputChange}
                autoFocus
                placeholder="Gõ từ tiếng Anh ở trên..."
                className="w-full py-3.5 px-5 bg-slate-950 border-2 border-cyan-400 rounded-2xl text-center font-orbitron font-black text-xl sm:text-2xl text-yellow-300 outline-none shadow-[0_0_20px_rgba(0,240,255,0.25)] focus:border-yellow-300 transition"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>

            <p className="text-xs text-slate-400">
              💡 Gõ nhanh và chính xác vào ô trên để AI phân tích tốc độ phản xạ của bạn.
            </p>
          </div>
        ) : (
          /* Result Summary */
          <div className="w-full space-y-4 animate-in fade-in">
            <div className="text-5xl drop-shadow mb-1">🎯</div>
            <h3 className="text-2xl font-black font-orbitron text-yellow-300 starwars-gold-glow">
              KẾT QUẢ PHÂN CẤP THIÊN HÀ
            </h3>
            
            {/* Recommended Box */}
            <div className="p-5 rounded-3xl bg-slate-950/90 border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.35)] text-left">
              <div className="flex items-center gap-4">
                <span className="text-4xl drop-shadow">{recRealm.icon}</span>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-black text-cyan-400 uppercase">
                      Cõi {recRealm.realmNumber} • ĐỀ XUẤT TỐI ƯU
                    </span>
                    {recRealm.cefrLevel && (
                      <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-400/40">
                        {recRealm.cefrLevel}
                      </span>
                    )}
                  </div>
                  <div className="font-game font-black text-xl text-white mt-0.5">
                    {recRealm.nameVi}
                  </div>
                  <div className="text-xs text-slate-300 font-bold mt-1">
                    {recRealm.recommendedAge || recRealm.gradeLabel}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300">
                {recRealm.description}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleApply}
                className="flex-1 py-3.5 px-5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-game font-black text-sm sm:text-base rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ÁP DỤNG & VÀO HỌC NGAY 🚀</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setCurrentIndex(0);
                  setIsCompleted(false);
                  setResults([]);
                }}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-game font-bold text-xs sm:text-sm rounded-2xl border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Test lại</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
