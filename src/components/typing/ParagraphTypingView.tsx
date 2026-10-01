import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UserProgress } from '../../data/progress-types';
import { TypingParagraph } from '../../data/typing-paragraph-types';
import { getParagraphsForRealm, initTypingParagraphs } from '../../services/typingParagraphLoader';
import { TelexComposer } from '../../game/engine/TelexComposer';
import { TypingMetrics, TypingSessionResult } from '../../game/engine/TypingMetrics';
import { recordTypingSessionResult } from '../../services/progressStorage';
import { soundFx } from '../../game/engine/SoundController';
import { VirtualKeyboardWithHands, TypingKeyFlash } from './VirtualKeyboardWithHands';
import { TypingResultModal } from './TypingResultModal';
import { ArrowLeft, Zap, BookOpen, ChevronLeft, ChevronRight, Languages, Sun, Moon } from 'lucide-react';

interface ParagraphTypingViewProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onExit: () => void;
}

type SessionMode = 'practice' | 'speed_rush';

const SPEED_RUSH_DURATION_MS = 60000;

const CONTROL_KEY_PATTERN = /^[a-zA-Z0-9 ;,./!?'"\-()]$/;

export const ParagraphTypingView: React.FC<ParagraphTypingViewProps> = ({
  progress,
  onUpdateProgress,
  onExit
}) => {
  const [snapshotTick, setSnapshotTick] = useState(0);
  useEffect(() => {
    initTypingParagraphs().then((updated) => {
      if (updated) setSnapshotTick((t) => t + 1);
    });
  }, []);

  const paragraphs: TypingParagraph[] = useMemo(
    () => getParagraphsForRealm(progress.selectedRealmId || 'realm-1'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progress.selectedRealmId, snapshotTick]
  );

  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [mode, setMode] = useState<SessionMode>('practice');
  const paragraph = paragraphs[paragraphIndex];
  const targetText = (paragraph?.text || '').trim();
  const targetTokens = useMemo(() => (targetText ? targetText.split(' ') : []), [targetText]);
  const isVietnamese = !!paragraph?.isVietnamese;

  const [confirmedTokens, setConfirmedTokens] = useState<string[]>([]);
  const [currentBuffer, setCurrentBuffer] = useState('');
  const [lastFlash, setLastFlash] = useState<TypingKeyFlash | null>(null);
  const [liveStats, setLiveStats] = useState<{ wpm: number; accuracy: number }>({ wpm: 0, accuracy: 100 });
  const [timeLeftMs, setTimeLeftMs] = useState(SPEED_RUSH_DURATION_MS);
  const [result, setResult] = useState<TypingSessionResult | null>(null);

  const composerRef = useRef(new TelexComposer());
  const metricsRef = useRef(new TypingMetrics());
  const hasSettledRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const sessionStartPerfRef = useRef(0);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const lastInputRef = useRef<{ char: string; time: number }>({ char: '', time: 0 });

  // Reset session state whenever the paragraph or mode changes
  useEffect(() => {
    setConfirmedTokens([]);
    setCurrentBuffer('');
    setResult(null);
    setLiveStats({ wpm: 0, accuracy: 100 });
    setTimeLeftMs(SPEED_RUSH_DURATION_MS);
    hasSettledRef.current = false;
    composerRef.current.reset();
    metricsRef.current.reset();
    metricsRef.current.startSession();
    const focusTimer = setTimeout(() => hiddenInputRef.current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(focusTimer);
  }, [paragraph?.id, mode]);

  const finishSession = useCallback(() => {
    if (hasSettledRef.current) return;
    hasSettledRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const finalResult = metricsRef.current.getResult();
    setResult(finalResult);
    onUpdateProgress(prev =>
      recordTypingSessionResult(prev, {
        wpm: finalResult.wpm,
        accuracy: finalResult.accuracy,
        mistakeKeys: finalResult.topMistakeKeys
      })
    );
  }, [onUpdateProgress]);

  // Speed Rush 60s countdown — requestAnimationFrame + useRef guard (Animation Loop Idempotency Invariant)
  useEffect(() => {
    if (mode !== 'speed_rush') return;
    sessionStartPerfRef.current = performance.now();

    const loop = () => {
      const elapsed = performance.now() - sessionStartPerfRef.current;
      const remaining = Math.max(0, SPEED_RUSH_DURATION_MS - elapsed);
      setTimeLeftMs(remaining);
      if (remaining <= 0) {
        finishSession();
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mode, paragraph?.id, finishSession]);

  const scoreWord = useCallback((finalToken: string, targetToken: string) => {
    const maxLen = Math.max(finalToken.length, targetToken.length);
    const now = Date.now();
    for (let i = 0; i < maxLen; i++) {
      metricsRef.current.recordKeystroke(targetToken[i] || '', finalToken[i] || '', now);
    }
  }, []);

  const finalizeWord = useCallback((bufferOverride?: string) => {
    if (hasSettledRef.current) return;
    const idx = confirmedTokens.length;
    if (idx >= targetTokens.length) return;

    const targetToken = targetTokens[idx] || '';
    const finalToken = bufferOverride !== undefined ? bufferOverride : currentBuffer;
    scoreWord(finalToken, targetToken);
    soundFx.playHit();
    if (finalToken !== targetToken) soundFx.playWrong();

    setConfirmedTokens(prev => [...prev, finalToken]);
    setLiveStats({ wpm: metricsRef.current.computeCurrentWpm(), accuracy: metricsRef.current.computeCurrentAccuracy() });
    setLastFlash({ char: targetToken.slice(-1) || ' ', correct: finalToken === targetToken, nonce: Date.now() });
    composerRef.current.reset();
    setCurrentBuffer('');

    const isLast = idx >= targetTokens.length - 1;
    if (isLast) {
      finishSession();
    }
  }, [confirmedTokens.length, currentBuffer, targetTokens, scoreWord, finishSession]);

  const handleCharKey = useCallback((rawKey: string) => {
    if (hasSettledRef.current) return;
    if (confirmedTokens.length >= targetTokens.length) return;

    const key = rawKey.length === 1 ? rawKey : '';
    if (!key) return;

    const nextBuffer = isVietnamese ? composerRef.current.pushKey(key) : currentBuffer + key.toLowerCase();
    setCurrentBuffer(nextBuffer);

    const idx = confirmedTokens.length;
    const targetToken = targetTokens[idx] || '';
    const lastCharCorrect = nextBuffer.length > 0 && nextBuffer[nextBuffer.length - 1] === targetToken[nextBuffer.length - 1];
    setLastFlash({ char: key, correct: lastCharCorrect, nonce: Date.now() });
    setLiveStats({ wpm: metricsRef.current.computeCurrentWpm(), accuracy: metricsRef.current.computeCurrentAccuracy() });

    // Tự chốt từ cuối cùng của đoạn văn khi gõ đủ độ dài (không có dấu cách kết thúc)
    const isLastWord = idx === targetTokens.length - 1;
    if (isLastWord && targetToken.length > 0 && nextBuffer.length >= targetToken.length) {
      finalizeWord(nextBuffer);
    }
  }, [confirmedTokens.length, targetTokens, isVietnamese, currentBuffer, finalizeWord]);

  const handleSpaceKey = useCallback(() => {
    if (hasSettledRef.current) return;
    if (confirmedTokens.length >= targetTokens.length) return;
    finalizeWord();
  }, [confirmedTokens.length, targetTokens.length, finalizeWord]);

  const handleBackspace = useCallback(() => {
    if (hasSettledRef.current) return;
    if (currentBuffer.length > 0) {
      const nextBuffer = isVietnamese ? composerRef.current.backspace() : currentBuffer.slice(0, -1);
      setCurrentBuffer(nextBuffer);
      return;
    }
    if (!isVietnamese && confirmedTokens.length > 0) {
      const reopened = confirmedTokens[confirmedTokens.length - 1];
      setConfirmedTokens(prev => prev.slice(0, -1));
      setCurrentBuffer(reopened);
    }
  }, [currentBuffer, isVietnamese, confirmedTokens]);

  const safeHandleKey = useCallback((rawKey: string) => {
    const marker = rawKey === ' ' ? '__space__' : rawKey.toLowerCase();
    const now = performance.now();
    if (lastInputRef.current.char === marker && now - lastInputRef.current.time < 35) return;
    lastInputRef.current = { char: marker, time: now };
    if (rawKey === ' ') {
      handleSpaceKey();
    } else {
      handleCharKey(rawKey);
    }
  }, [handleCharKey, handleSpaceKey]);

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
        return;
      }
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        safeHandleKey(' ');
        if (hiddenInputRef.current) hiddenInputRef.current.value = '';
        return;
      }
      if (e.key.length === 1 && CONTROL_KEY_PATTERN.test(e.key)) {
        e.preventDefault();
        safeHandleKey(e.key);
        if (hiddenInputRef.current) hiddenInputRef.current.value = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeHandleKey, handleBackspace]);

  const handleHiddenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    for (let i = 0; i < val.length; i++) safeHandleKey(val[i]);
    e.target.value = '';
  };

  const passed = result ? result.accuracy >= 80 : false;
  const nextChar = useMemo(() => {
    const idx = confirmedTokens.length;
    const targetToken = targetTokens[idx] || '';
    return targetToken[currentBuffer.length];
  }, [confirmedTokens.length, targetTokens, currentBuffer]);

  const handleRestartParagraph = () => {
    setConfirmedTokens([]);
    setCurrentBuffer('');
    setResult(null);
    setTimeLeftMs(SPEED_RUSH_DURATION_MS);
    hasSettledRef.current = false;
    composerRef.current.reset();
    metricsRef.current.reset();
    metricsRef.current.startSession();
  };

  const handleNextParagraph = () => {
    if (paragraphs.length > 1) {
      setParagraphIndex(i => (i + 1) % paragraphs.length);
    } else {
      handleRestartParagraph();
    }
  };

  if (!paragraph) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-space-dark text-white font-game px-4 text-center">
        <p className="text-lg font-bold text-slate-300 mb-4">Chưa có đoạn văn luyện gõ nào cho hành trình này.</p>
        <button
          onClick={onExit}
          className="px-5 py-3 rounded-xl bg-violet-500/20 border border-violet-400/50 text-violet-300 font-bold hover:bg-violet-500/30 transition"
        >
          Quay Lại
        </button>
      </div>
    );
  }

  const secondsLeft = Math.ceil(timeLeftMs / 1000);

  const [isLight, setIsLight] = useState<boolean>(() => {
    const saved = localStorage.getItem('vocab_dojo_theme_mode');
    return saved !== null ? saved === 'light' : true;
  });

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    setIsLight((prev) => {
      const next = !prev;
      localStorage.setItem('vocab_dojo_theme_mode', next ? 'light' : 'dark');
      return next;
    });
  };

  return (
    <div
      className={`relative w-full h-full overflow-y-auto no-scrollbar select-none font-game px-3 sm:px-6 py-3 sm:py-5 transition-colors duration-300 ${
        isLight
          ? 'bg-daybreak-sunny text-slate-900'
          : 'bg-[#08091a] bg-galactic-stars text-white'
      }`}
      onClick={() => hiddenInputRef.current?.focus({ preventScroll: true })}
    >
      <input
        ref={hiddenInputRef}
        type="text"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        inputMode="text"
        aria-label="Nhập đoạn văn luyện gõ"
        className="absolute opacity-0 pointer-events-none w-px h-px"
        onChange={handleHiddenInputChange}
      />

      {/* Top Bar — Sleek Cyber-Arcade Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto mb-3 gap-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); soundFx.playClick(); onExit(); }}
            className={`btn-3d flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black ${
              isLight
                ? 'btn-3d-slate bg-white text-slate-800 border-b-4 border-slate-300'
                : 'btn-3d-slate bg-slate-900 text-slate-200 border-b-4 border-slate-950'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bold hidden sm:inline">Thoát</span>
          </button>

          <button
            onClick={toggleTheme}
            title={isLight ? 'Chuyển sang giao diện Tối' : 'Chuyển sang giao diện Sáng'}
            className={`p-2 rounded-xl border-2 transition active:scale-95 shadow-sm ${
              isLight
                ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                : 'bg-slate-900 border-slate-700 text-yellow-300 hover:border-yellow-400/50'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4 text-indigo-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>

        <div className="flex items-center gap-1.5 truncate">
          <span className="text-base sm:text-lg">📜</span>
          <h1 className="text-sm sm:text-xl font-black font-orbitron tracking-wider text-cyan-400 truncate drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
            ĐOẠN VĂN VÕ ĐƯỜNG
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-black flex-shrink-0">
          <div
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border-2 shadow-sm font-orbitron ${
              isLight
                ? 'bg-violet-50 border-violet-300 text-violet-900'
                : 'bg-violet-950/60 border-violet-500/60 text-violet-200 shadow-violet-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-violet-400 stroke-[3]" />
            <span>{Math.round(liveStats.wpm)} WPM</span>
          </div>

          <div
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border-2 shadow-sm font-orbitron ${
              isLight
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 shadow-emerald-500/20'
            }`}
          >
            <span>{Math.round(liveStats.accuracy)}%</span>
          </div>
        </div>
      </div>

      {/* Mode & Paragraph Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 max-w-4xl mx-auto mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setMode('practice'); }}
            className={`btn-3d flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black ${
              mode === 'practice'
                ? 'btn-3d-cyan'
                : (isLight ? 'btn-3d-slate bg-white text-slate-700 border-slate-300' : 'btn-3d-slate bg-slate-900/80 text-slate-400 border-slate-950')
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tự Do</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setMode('speed_rush'); }}
            className={`btn-3d flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black ${
              mode === 'speed_rush'
                ? 'btn-3d-amber'
                : (isLight ? 'btn-3d-slate bg-white text-slate-700 border-slate-300' : 'btn-3d-slate bg-slate-900/80 text-slate-400 border-slate-950')
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Speed Rush 60s</span>
          </button>
        </div>

        {/* Speed Rush Timer / Paragraph Switcher */}
        <div className="flex items-center gap-2">
          {mode === 'speed_rush' && (
            <span className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black font-orbitron border-2 animate-pulse ${
              secondsLeft <= 10
                ? 'bg-rose-500/30 border-rose-500 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                : (isLight ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-amber-500/25 border-amber-400 text-amber-300')
            }`}>
              ⏱️ {secondsLeft}s
            </span>
          )}

          {isVietnamese && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-black border-2 border-emerald-400/50 bg-emerald-500/20 text-emerald-300">
              <Languages className="w-3.5 h-3.5" />
              <span>Telex VN</span>
            </span>
          )}

          {paragraphs.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setParagraphIndex(i => (i - 1 + paragraphs.length) % paragraphs.length); }}
                className={`p-1.5 rounded-lg border-2 transition shadow-xs ${
                  isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
                title="Đoạn văn trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className={`text-xs font-black px-1.5 font-orbitron ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                {paragraphIndex + 1}/{paragraphs.length}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setParagraphIndex(i => (i + 1) % paragraphs.length); }}
                className={`p-1.5 rounded-lg border-2 transition shadow-xs ${
                  isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
                title="Đoạn văn tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Teleprompter Text Box — High Contrast */}
      <div
        className={`max-w-4xl mx-auto rounded-3xl p-5 sm:p-7 mb-4 transition-all ${
          isLight ? 'dojo-card-light' : 'dojo-card-dark'
        }`}
      >
        <p className="font-mono text-xl sm:text-2xl md:text-3xl tracking-wide leading-relaxed text-center select-none">
          {targetTokens.map((token, tokenIdx) => {
            const isDone = tokenIdx < confirmedTokens.length;
            const isCurrent = tokenIdx === confirmedTokens.length;
            const displayBuffer = isCurrent ? currentBuffer : (isDone ? confirmedTokens[tokenIdx] : '');

            return (
              <span key={tokenIdx} className="inline-block mr-2 sm:mr-3.5 my-1">
                {token.split('').map((ch, chIdx) => {
                  const typedChar = displayBuffer[chIdx];
                  if (isDone) {
                    const isOk = confirmedTokens[tokenIdx][chIdx] === ch;
                    return (
                      <span
                        key={chIdx}
                        className={
                          isOk
                            ? (isLight ? 'text-emerald-700 font-black' : 'text-emerald-400 font-black drop-shadow-[0_0_6px_rgba(52,211,153,0.7)]')
                            : (isLight ? 'text-rose-600 font-black bg-rose-100 rounded px-0.5 underline decoration-wavy decoration-rose-500' : 'text-rose-400 font-black bg-rose-950/60 rounded px-0.5 underline decoration-wavy decoration-rose-500')
                        }
                      >
                        {ch}
                      </span>
                    );
                  }

                  if (isCurrent && typedChar !== undefined) {
                    const isOk = typedChar === ch;
                    return (
                      <span
                        key={chIdx}
                        className={
                          isOk
                            ? (isLight ? 'text-emerald-700 font-black' : 'text-emerald-400 font-black drop-shadow-[0_0_6px_rgba(52,211,153,0.7)]')
                            : (isLight ? 'text-rose-600 font-black bg-rose-100 rounded px-0.5 underline decoration-wavy decoration-rose-500' : 'text-rose-400 font-black bg-rose-950/60 rounded px-0.5 underline decoration-wavy decoration-rose-500')
                        }
                      >
                        {ch}
                      </span>
                    );
                  }

                  if (isCurrent && chIdx === displayBuffer.length) {
                    // Active target character
                    return (
                      <span
                        key={chIdx}
                        className={`inline-block px-1.5 py-0.2 rounded-lg font-black font-orbitron animate-pulse align-middle transition-all scale-105 shadow-md ${
                          isLight
                            ? 'text-sky-950 bg-sky-200 border-2 border-sky-500'
                            : 'text-white bg-cyan-500/40 border-2 border-cyan-300 ring-2 ring-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.7)]'
                        }`}
                      >
                        {ch}
                      </span>
                    );
                  }

                  // Untyped character — High contrast
                  return (
                    <span
                      key={chIdx}
                      className={`font-semibold ${
                        isLight ? 'text-slate-800' : 'text-slate-300/90'
                      }`}
                    >
                      {ch}
                    </span>
                  );
                })}

                {/* Phím Space indicator nếu đã gõ xong từ này */}
                {isCurrent && displayBuffer.length === token.length && (
                  <span className="inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.2 rounded-md bg-amber-400/30 text-amber-500 border border-amber-400 text-xs font-black animate-pulse align-middle">
                    ␣ CÁCH
                  </span>
                )}

                {/* Ký tự thừa gõ sai */}
                {isCurrent && displayBuffer.length > token.length && (
                  <span className={isLight ? 'text-rose-600 font-black bg-rose-100 px-0.5 rounded' : 'text-rose-400 font-black bg-rose-950 px-0.5 rounded'}>
                    {displayBuffer.slice(token.length)}
                  </span>
                )}
              </span>
            );
          })}
        </p>
      </div>

      {/* Virtual Keyboard With Hands */}
      <div className="max-w-4xl mx-auto pb-4">
        <VirtualKeyboardWithHands nextChar={nextChar} lastFlash={lastFlash} isLight={isLight} />
      </div>

      {result && (
        <TypingResultModal
          title={mode === 'speed_rush' ? 'Speed Rush 60s' : paragraph.realmId}
          wpm={result.wpm}
          accuracy={result.accuracy}
          passed={passed}
          topMistakeKeys={result.topMistakeKeys}
          primaryActionLabel={paragraphs.length > 1 ? 'ĐOẠN VĂN TIẾP THEO' : 'LUYỆN LẠI'}
          onPrimaryAction={handleNextParagraph}
          onRetry={handleRestartParagraph}
          onExit={handleRestartParagraph}
          exitLabel="ĐÓNG"
          userName={progress.userName}
          gender={progress.gender}
          themeStyle={progress.themeStyle}
          mascotId={progress.mascotId}
          isLight={isLight}
        />
      )}
    </div>
  );
};
