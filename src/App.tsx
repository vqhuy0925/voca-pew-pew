import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GameStats, EnemyItem } from './data/types';
import { LevelNode, UserProgress } from './data/progress-types';
import { ALL_LEVELS, getNextLevel } from './data/learning-path-data';
import {
  loadUserProgress,
  saveUserProgress,
  completeLevelProgress,
  deductHeart,
  refillHearts
} from './services/progressStorage';

import { LearningPathView } from './components/path/LearningPathView';
import { WarmupModal } from './components/modals/WarmupModal';
import { ChestRewardModal } from './components/modals/ChestRewardModal';
import { RefillHeartsModal } from './components/modals/RefillHeartsModal';
import { UserProfileModal } from './components/modals/UserProfileModal';
import { GameCanvas } from './game/GameCanvas';
import { HUD } from './components/HUD';
import { WordTargetBar } from './components/WordTargetBar';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';
import { PauseModal } from './components/PauseModal';
import { soundFx } from './game/engine/SoundController';
import { speechHelper } from './game/engine/SpeechHelper';

type AppScreen = 'MAP' | 'WARMUP' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'GAME_OVER' | 'CHEST_MODAL';

const INITIAL_STATS: GameStats = {
  score: 0,
  wordsDefeated: 0,
  combo: 0,
  maxCombo: 0,
  accuracy: 100,
  totalKeystrokes: 0,
  correctKeystrokes: 0,
  stationHealth: 100,
  maxHealth: 100,
  starsEarned: 0,
  clearedWordsList: []
};

export const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('MAP');
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(() => {
    const saved = loadUserProgress();
    return !saved.userName;
  });
  const [selectedLevel, setSelectedLevel] = useState<LevelNode>(() => {
    const saved = loadUserProgress();
    return ALL_LEVELS.find(l => l.id === saved.currentLevelId) || ALL_LEVELS[0];
  });
  const [gameSessionId, setGameSessionId] = useState<number>(0);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [activeTarget, setActiveTarget] = useState<EnemyItem | null>(null);
  const [suggestedChar, setSuggestedChar] = useState<string | undefined>(undefined);
  const [totalLevelWords, setTotalLevelWords] = useState<number>(0);
  const [showRefillModal, setShowRefillModal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const virtualInputHandlerRef = useRef<((char: string) => void) | null>(null);

  // Sync soundFx and speechHelper mute state with loaded progress
  useEffect(() => {
    soundFx.isMuted = !progress.soundEnabled;
    speechHelper.setEnabled(progress.soundEnabled);
    setIsMuted(!progress.soundEnabled);
  }, [progress.soundEnabled]);

  const handleUpdateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const next = updater(prev);
      saveUserProgress(next);
      return next;
    });
  }, []);

  const handleSaveProfile = (name: string, avatar: string) => {
    handleUpdateProgress(prev => ({
      ...prev,
      userName: name,
      avatar
    }));
    setShowProfileModal(false);
  };

  const handleSelectLevel = (level: LevelNode) => {
    setSelectedLevel(level);

    if (level.type === 'CHEST_REWARD') {
      setScreen('CHEST_MODAL');
      return;
    }

    // Open Warmup Preview Flashcards first
    setScreen('WARMUP');
  };

  const handleStartBattle = () => {
    setGameSessionId(id => id + 1);
    setStats({ ...INITIAL_STATS, clearedWordsList: [] });
    setActiveTarget(null);
    setSuggestedChar(undefined);
    if (progress.hearts <= 0) {
      handleUpdateProgress(p => refillHearts(p));
    }
    setScreen('PLAYING');
  };

  const handleRestart = () => {
    setGameSessionId(id => id + 1);
    setStats({ ...INITIAL_STATS, clearedWordsList: [] });
    setActiveTarget(null);
    setSuggestedChar(undefined);
    if (progress.hearts <= 0) {
      handleUpdateProgress(p => refillHearts(p));
    }
    setScreen('PLAYING');
  };

  const handlePause = () => {
    setScreen('PAUSED');
  };

  const handleResume = () => {
    setScreen('PLAYING');
  };

  const handleGoToMap = () => {
    setActiveTarget(null);
    setSuggestedChar(undefined);
    setScreen('MAP');
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    speechHelper.setEnabled(!muted);
    setIsMuted(muted);
    handleUpdateProgress(p => ({ ...p, soundEnabled: !muted }));
  };

  const handleGameOver = useCallback(() => {
    handleUpdateProgress(p => deductHeart(p));
    setScreen('GAME_OVER');
  }, [handleUpdateProgress]);

  const handleVictory = useCallback(() => {
    let starsEarned = 1;
    if (stats.stationHealth >= 80 && stats.accuracy >= 80) {
      starsEarned = 3;
    } else if (stats.stationHealth >= 40) {
      starsEarned = 2;
    }

    handleUpdateProgress(prev =>
      completeLevelProgress(
        prev,
        selectedLevel.id,
        starsEarned,
        stats.score,
        selectedLevel.xpReward,
        selectedLevel.gemReward
      )
    );

    setScreen('VICTORY');
  }, [stats, selectedLevel, handleUpdateProgress]);

  const handleNextLevel = () => {
    const nextLvl = getNextLevel(selectedLevel.id);
    if (nextLvl) {
      setSelectedLevel(nextLvl);
      setGameSessionId(id => id + 1);
      if (nextLvl.type === 'CHEST_REWARD') {
        setScreen('CHEST_MODAL');
      } else {
        setScreen('WARMUP');
      }
    } else {
      setScreen('MAP');
    }
  };

  const registerInputHandler = useCallback((handler: (char: string) => void) => {
    virtualInputHandlerRef.current = handler;
  }, []);

  const handleVirtualKeyPress = (char: string) => {
    if (virtualInputHandlerRef.current) {
      virtualInputHandlerRef.current(char);
    }
  };

  const nextLevel = getNextLevel(selectedLevel.id);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-space-dark select-none font-game">
      {/* 1. Learning Saga Path View */}
      {screen === 'MAP' && (
        <LearningPathView
          progress={progress}
          onSelectLevel={handleSelectLevel}
          onUpdateProgress={handleUpdateProgress}
          onOpenRefillModal={() => setShowRefillModal(true)}
          onOpenProfileModal={() => setShowProfileModal(true)}
        />
      )}

      {/* 2. In-Game Battle Arena (Game Canvas + HUD) */}
      {(screen === 'PLAYING' || screen === 'PAUSED' || screen === 'VICTORY' || screen === 'GAME_OVER') && (
        <>
          <GameCanvas
            key={`${selectedLevel.id}-${gameSessionId}`}
            gameState={screen === 'PLAYING' ? 'PLAYING' : 'PAUSED'}
            level={selectedLevel}
            stats={stats}
            onStatsUpdate={setStats}
            onGameOver={handleGameOver}
            onVictory={handleVictory}
            onTargetChange={setActiveTarget}
            onTotalWordsSet={setTotalLevelWords}
            onSuggestCharChange={setSuggestedChar}
            onRegisterInputHandler={registerInputHandler}
          />

          {screen === 'PLAYING' && (
            <>
              <HUD
                stats={stats}
                level={selectedLevel}
                hearts={progress.hearts}
                maxHearts={progress.maxHearts}
                totalWords={totalLevelWords}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
                onPause={handlePause}
              />

              <WordTargetBar target={activeTarget} />

              <VirtualKeyboard
                onKeyPress={handleVirtualKeyPress}
                suggestedChar={suggestedChar}
              />
            </>
          )}
        </>
      )}

      {/* 3. Warmup Flashcard Preview Modal */}
      {screen === 'WARMUP' && (
        <WarmupModal
          level={selectedLevel}
          onStartGame={handleStartBattle}
          onClose={handleGoToMap}
        />
      )}

      {/* 4. Chest Reward Modal */}
      {screen === 'CHEST_MODAL' && (
        <ChestRewardModal
          level={selectedLevel}
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onClose={handleGoToMap}
        />
      )}

      {/* 5. Pause Modal */}
      {screen === 'PAUSED' && (
        <PauseModal
          level={selectedLevel}
          onResume={handleResume}
          onRestart={handleRestart}
          onGoToMap={handleGoToMap}
        />
      )}

      {/* 6. Victory Modal (Lesson Complete) */}
      {screen === 'VICTORY' && (
        <VictoryModal
          stats={stats}
          level={selectedLevel}
          hasNextLevel={!!nextLevel}
          userName={progress.userName}
          avatar={progress.avatar}
          onNextLevel={handleNextLevel}
          onRestart={handleRestart}
          onGoToMap={handleGoToMap}
        />
      )}

      {/* 7. Game Over Modal (Child-Friendly Oopsie) */}
      {screen === 'GAME_OVER' && (
        <GameOverModal
          stats={stats}
          level={selectedLevel}
          userName={progress.userName}
          avatar={progress.avatar}
          onRestart={handleRestart}
          onGoToMap={handleGoToMap}
        />
      )}

      {/* 8. Refill Hearts Modal */}
      {showRefillModal && (
        <RefillHeartsModal
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onClose={() => setShowRefillModal(false)}
        />
      )}

      {/* 9. User Profile / Welcome Modal */}
      {showProfileModal && (
        <UserProfileModal
          initialName={progress.userName}
          initialAvatar={progress.avatar}
          isFirstTime={!progress.userName}
          onSave={handleSaveProfile}
          onClose={progress.userName ? () => setShowProfileModal(false) : undefined}
        />
      )}
    </div>
  );
};

export default App;
