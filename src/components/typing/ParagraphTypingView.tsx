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
import { ArrowLeft, Zap, BookOpen, ChevronLeft, ChevronRight, Languages } from 'lucide-react';

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

  return (
    <div
      className="relative w-full h-full overflow-y-auto bg-space-dark select-none font-game text-white px-3 sm:px-6 py-4 sm:py-6"
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

      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-4 gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); soundFx.playClick(); onExit(); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500 transition active:scale-95 flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold hidden sm:inline">Thoát</span>
        </button>
        <h1 className="text-base sm:text-2xl font-black font-orbitron tracking-wide text-violet-300 flex-1 text-center truncate">
          📝 Paragraph Mode
        </h1>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black flex-shrink-0">
          <span className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-violet-500/15 border border-violet-400/40 text-violet-300">
            {Math.round(liveStats.wpm)} WPM
          </span>
          <span className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
            {Math.round(liveStats.accuracy)}%
          </span>
        </div>
      </div>

      {/* Mode & Paragraph Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-4">
        <button
          onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setMode('practice'); }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm transition ${
            mode === 'practice' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900/70 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Luyện Tập</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setMode('speed_rush'); }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm transition ${
            mode === 'speed_rush' ? 'bg-orange-500/20 border-orange-400 text-orange-300' : 'bg-slate-900/70 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Speed Rush 60s</span>
        </button>

        {isVietnamese && (
          <span className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm">
            <Languages className="w-4 h-4" />
            <span>Telex Tiếng Việt</span>
          </span>
        )}

        {mode === 'speed_rush' && (
          <span className={`px-3 py-2 rounded-xl border-2 font-black text-xs sm:text-sm ${secondsLeft <= 10 ? 'bg-rose-500/20 border-rose-400 text-rose-300 animate-pulse' : 'bg-slate-900/70 border-slate-700 text-slate-300'}`}>
            ⏱️ {secondsLeft}s
          </span>
        )}

        {paragraphs.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setParagraphIndex(i => (i - 1 + paragraphs.length) % paragraphs.length); }}
              className="p-2 rounded-lg bg-slate-900/70 border border-slate-700 text-slate-300 hover:border-slate-500 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-400 px-1">{paragraphIndex + 1}/{paragraphs.length}</span>
            <button
              onClick={(e) => { e.stopPropagation(); soundFx.playClick(); setParagraphIndex(i => (i + 1) % paragraphs.length); }}
              className="p-2 rounded-lg bg-slate-900/70 border border-slate-700 text-slate-300 hover:border-slate-500 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Teleprompter Text */}
      <div className="max-w-3xl mx-auto bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-6 mb-5">
        <p className="font-mono text-lg sm:text-2xl md:text-3xl tracking-wide leading-relaxed text-center">
          {targetTokens.map((token, tokenIdx) => {
            const isDone = tokenIdx < confirmedTokens.length;
            const isCurrent = tokenIdx === confirmedTokens.length;
            const displayBuffer = isCurrent ? currentBuffer : (isDone ? confirmedTokens[tokenIdx] : '');

            return (
              <span key={tokenIdx} className="inline-block mr-2 sm:mr-3">
                {token.split('').map((ch, chIdx) => {
                  let cls = 'text-slate-500';
                  const typedChar = displayBuffer[chIdx];
                  if (isDone) {
                    cls = confirmedTokens[tokenIdx][chIdx] === ch ? 'text-emerald-400' : 'text-rose-400 underline decoration-wavy decoration-rose-500';
                  } else if (isCurrent && typedChar !== undefined) {
                    cls = typedChar === ch ? 'text-emerald-400' : 'text-rose-400 underline decoration-wavy decoration-rose-500';
                  } else if (isCurrent && chIdx === displayBuffer.length) {
                    cls = 'text-white bg-cyan-500/30 rounded animate-pulse';
                  }
                  return <span key={chIdx} className={cls}>{ch}</span>;
                })}
                {isCurrent && displayBuffer.length > token.length && (
                  <span className="text-rose-500/80">{displayBuffer.slice(token.length)}</span>
                )}
              </span>
            );
          })}
        </p>
      </div>

      {/* Virtual Keyboard With Hands */}
      <div className="max-w-3xl mx-auto pb-6">
        <VirtualKeyboardWithHands nextChar={nextChar} lastFlash={lastFlash} />
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
          onExit={onExit}
          userName={progress.userName}
          gender={progress.gender}
          themeStyle={progress.themeStyle}
          mascotId={progress.mascotId}
        />
      )}
    </div>
  );
};
