import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GameStats, EnemyItem } from './data/types';
import { LevelNode, UserProgress, UserGender, ThemeStyle, MascotId, DailyEnergyMode } from './data/progress-types';
import {
  DifficultyLevel,
  DIFFICULTY_CONFIGS,
  getSpaceshipById,
  getBlasterById,
  getLaserById
} from './data/upgrade-types';
import { THEME_CONFIGS } from './data/theme-types';
import { ALL_LEVELS, getNextLevel, getRealmByAge, getRealmById } from './data/learning-path-data';
import {
  loadUserProgress,
  saveUserProgress,
  completeLevelProgress,
  deductHeart,
  refillHearts,
  calculateLevelClearRewards,
  ClearRewardBreakdown,
  getEnergyCostForLevel,
  deductEnergy,
  updateDailyEnergyMode
} from './services/progressStorage';

import { LearningPathView } from './components/path/LearningPathView';
import { WarmupModal } from './components/modals/WarmupModal';
import { ChestRewardModal } from './components/modals/ChestRewardModal';
import { RefillHeartsModal } from './components/modals/RefillHeartsModal';
import { EnergyModal } from './components/modals/EnergyModal';
import { UserProfileModal } from './components/modals/UserProfileModal';
import { ArmoryModal } from './components/modals/ArmoryModal';
import { LeaderboardModal } from './components/modals/LeaderboardModal';
import { AstronautCardModal } from './components/modals/AstronautCardModal';
import { DiamondGuideModal } from './components/modals/DiamondGuideModal';
import { LeaderboardEntry } from './services/firebase/leaderboardService';
import { GameCanvas } from './game/GameCanvas';
import { HUD } from './components/HUD';
import { WordTargetBar } from './components/WordTargetBar';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';
import { PauseModal } from './components/PauseModal';
import { soundFx } from './game/engine/SoundController';
import { speechHelper } from './game/engine/SpeechHelper';
import { initAuthSession } from './services/firebase/authService';

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
  const [showArmoryModal, setShowArmoryModal] = useState<boolean>(false);
  const [showEnergyModal, setShowEnergyModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);
  const [showAstronautCardModal, setShowAstronautCardModal] = useState<boolean>(false);
  const [showDiamondGuideModal, setShowDiamondGuideModal] = useState<boolean>(false);
  const [lastRewardBreakdown, setLastRewardBreakdown] = useState<ClearRewardBreakdown | null>(null);
  const [selectedCardPlayer, setSelectedCardPlayer] = useState<LeaderboardEntry | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<LevelNode>(() => {
    const saved = loadUserProgress();
    return ALL_LEVELS.find(l => l.id === saved.currentLevelId) || ALL_LEVELS[0];
  });
  const [gameSessionId, setGameSessionId] = useState<number>(0);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [activeTarget, setActiveTarget] = useState<EnemyItem | null>(null);
  const [suggestedChar, setSuggestedChar] = useState<string | undefined>(undefined);
  const [totalLevelWords, setTotalLevelWords] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(45);
  const [totalLevelTime, setTotalLevelTime] = useState<number>(45);
  const [showRefillModal, setShowRefillModal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [viewportHeight, setViewportHeight] = useState<number>(() => {
    return window.visualViewport ? window.visualViewport.height : window.innerHeight;
  });

  const virtualInputHandlerRef = useRef<((char: string) => void) | null>(null);

  // Dynamic visualViewport tracking for mobile virtual keyboard height changes
  useEffect(() => {
    const updateViewport = () => {
      const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      setViewportHeight(h);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewport);
      window.visualViewport.addEventListener('scroll', updateViewport);
    }
    window.addEventListener('resize', updateViewport);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewport);
        window.visualViewport.removeEventListener('scroll', updateViewport);
      }
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  // Initialize Silent Cloud Auth & Identity Session
  useEffect(() => {
    initAuthSession().then((uid) => {
      setProgress((prev) => {
        if (prev.cloudUid !== uid) {
          const updated = { ...prev, cloudUid: uid };
          saveUserProgress(updated);
          return updated;
        }
        return prev;
      });
    });
  }, []);

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

  const handleSaveProfile = (
    name: string,
    avatar: string,
    userAge: number,
    realmId?: string,
    gender?: UserGender,
    themeStyle?: ThemeStyle,
    mascotId?: MascotId,
    dailyEnergyMode?: DailyEnergyMode
  ) => {
    const targetRealm = realmId ? getRealmById(realmId) : getRealmByAge(userAge);
    const resolvedRealmId = targetRealm.id;
    const firstLevelOfRealm = targetRealm.units[0]?.levels[0]?.id || ALL_LEVELS[0].id;

    handleUpdateProgress(prev => {
      let updated: UserProgress = {
        ...prev,
        userName: name,
        avatar,
        userAge,
        gender: gender || prev.gender || 'neutral',
        themeStyle: themeStyle || prev.themeStyle || 'galactic_starwars',
        mascotId: mascotId || prev.mascotId || 'cosmo_dog',
        selectedRealmId: resolvedRealmId,
        currentLevelId: (!prev.userName || prev.currentLevelId === ALL_LEVELS[0].id) ? firstLevelOfRealm : prev.currentLevelId
      };
      if (dailyEnergyMode && dailyEnergyMode !== prev.dailyEnergyMode) {
        updated = updateDailyEnergyMode(updated, dailyEnergyMode);
      }
      return updated;
    });
    setShowProfileModal(false);
  };

  const handleSelectDifficulty = (diff: DifficultyLevel) => {
    handleUpdateProgress(prev => ({
      ...prev,
      selectedDifficulty: diff
    }));
  };

  const handleSelectLevel = (level: LevelNode) => {
    setSelectedLevel(level);
    handleUpdateProgress(prev => ({
      ...prev,
      currentLevelId: level.id
    }));

    if (level.type === 'CHEST_REWARD') {
      setScreen('CHEST_MODAL');
      return;
    }

    // Open Warmup Preview Flashcards first
    setScreen('WARMUP');
  };

  const handleStartBattle = () => {
    const energyCost = getEnergyCostForLevel(selectedLevel.type);
    if (progress.energy < energyCost) {
      soundFx.playEnergyWarning();
      setShowEnergyModal(true);
      return;
    }
    handleUpdateProgress(p => deductEnergy(p, energyCost));
    setGameSessionId(id => id + 1);
    setStats({ ...INITIAL_STATS, clearedWordsList: [] });
    setActiveTarget(null);
    setSuggestedChar(undefined);
    const diffConfig = DIFFICULTY_CONFIGS[progress.selectedDifficulty || 'NORMAL'];
    setTimeRemaining(diffConfig.timeLimitSeconds);
    setTotalLevelTime(diffConfig.timeLimitSeconds);
    if (progress.hearts <= 0) {
      handleUpdateProgress(p => refillHearts(p));
    }
    setScreen('PLAYING');
  };

  const handleRestart = () => {
    const energyCost = getEnergyCostForLevel(selectedLevel.type);
    if (progress.energy < energyCost) {
      soundFx.playEnergyWarning();
      setShowEnergyModal(true);
      return;
    }
    handleUpdateProgress(p => deductEnergy(p, energyCost));
    setGameSessionId(id => id + 1);
    setStats({ ...INITIAL_STATS, clearedWordsList: [] });
    setActiveTarget(null);
    setSuggestedChar(undefined);
    const diffConfig = DIFFICULTY_CONFIGS[progress.selectedDifficulty || 'NORMAL'];
    setTimeRemaining(diffConfig.timeLimitSeconds);
    setTotalLevelTime(diffConfig.timeLimitSeconds);
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

  const handleTimerUpdate = useCallback((remaining: number, total: number) => {
    setTimeRemaining(remaining);
    setTotalLevelTime(total);
  }, []);

  const handleVictory = useCallback(() => {
    const diff = progress.selectedDifficulty || 'NORMAL';
    const reward = calculateLevelClearRewards(
      progress,
      selectedLevel,
      stats.stationHealth,
      stats.accuracy,
      diff
    );
    setLastRewardBreakdown(reward);

    handleUpdateProgress(prev =>
      completeLevelProgress(
        prev,
        selectedLevel.id,
        reward.starsEarned,
        stats.score,
        reward.totalXpEarned,
        reward.totalGemsEarned
      )
    );

    setScreen('VICTORY');
  }, [stats, selectedLevel, progress, handleUpdateProgress]);

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

  const nextLevel = getNextLevel(selectedLevel.id);
  const equippedShip = getSpaceshipById(progress.equippedShipId);
  const equippedBlaster = getBlasterById(progress.equippedBlasterId);
  const equippedLaser = getLaserById(progress.equippedLaserId);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-space-dark select-none font-game">
      {/* 1. Learning Saga Path View */}
      {screen === 'MAP' && (
        <LearningPathView
          progress={progress}
          onSelectLevel={handleSelectLevel}
          onUpdateProgress={handleUpdateProgress}
          onOpenRefillModal={() => setShowRefillModal(true)}
          onOpenEnergyModal={() => setShowEnergyModal(true)}
          onOpenProfileModal={() => setShowProfileModal(true)}
          onOpenArmory={() => setShowArmoryModal(true)}
          onOpenLeaderboard={() => setShowLeaderboardModal(true)}
          onOpenAstronautCard={() => {
            setSelectedCardPlayer(null);
            setShowAstronautCardModal(true);
          }}
          onOpenDiamondGuide={() => setShowDiamondGuideModal(true)}
        />
      )}

      {/* 2. In-Game Battle Arena (Game Canvas + HUD) */}
      {(screen === 'PLAYING' || screen === 'PAUSED' || screen === 'VICTORY' || screen === 'GAME_OVER') && (
        <div
          className="relative w-full overflow-hidden bg-space-dark select-none font-game"
          style={{ height: viewportHeight }}
        >
          <GameCanvas
            key={`${selectedLevel.id}-${gameSessionId}`}
            gameState={screen === 'PLAYING' ? 'PLAYING' : 'PAUSED'}
            level={selectedLevel}
            stats={stats}
            difficulty={progress.selectedDifficulty || 'NORMAL'}
            equippedShip={equippedShip}
            equippedBlaster={equippedBlaster}
            equippedLaser={equippedLaser}
            onStatsUpdate={setStats}
            onGameOver={handleGameOver}
            onVictory={handleVictory}
            onTargetChange={setActiveTarget}
            onTotalWordsSet={setTotalLevelWords}
            onSuggestCharChange={setSuggestedChar}
            onRegisterInputHandler={registerInputHandler}
            onTimerUpdate={handleTimerUpdate}
          />

          {screen === 'PLAYING' && (
            <>
              <HUD
                stats={stats}
                level={selectedLevel}
                hearts={progress.hearts}
                maxHearts={progress.maxHearts}
                totalWords={totalLevelWords}
                timeRemaining={timeRemaining}
                totalTime={totalLevelTime}
                difficulty={progress.selectedDifficulty || 'NORMAL'}
                themeStyle={progress.themeStyle}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
                onPause={handlePause}
              />

              <WordTargetBar target={activeTarget} />
            </>
          )}
        </div>
      )}

      {/* 3. Warmup Flashcard Preview Modal */}
      {screen === 'WARMUP' && (
        <WarmupModal
          level={selectedLevel}
          themeStyle={progress.themeStyle}
          selectedDifficulty={progress.selectedDifficulty || 'NORMAL'}
          onSelectDifficulty={handleSelectDifficulty}
          onOpenArmory={() => setShowArmoryModal(true)}
          equippedShipId={progress.equippedShipId}
          energy={progress.energy}
          dailyEnergyMode={progress.dailyEnergyMode}
          onOpenEnergyModal={() => setShowEnergyModal(true)}
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
          progress={progress}
          hasNextLevel={!!nextLevel}
          difficulty={progress.selectedDifficulty || 'NORMAL'}
          timeRemaining={timeRemaining}
          userName={progress.userName}
          avatar={progress.avatar}
          gender={progress.gender}
          themeStyle={progress.themeStyle}
          mascotId={progress.mascotId}
          rewardBreakdown={lastRewardBreakdown || undefined}
          onNextLevel={handleNextLevel}
          onRestart={handleRestart}
          onGoToMap={handleGoToMap}
          onOpenArmory={() => setShowArmoryModal(true)}
          onOpenLeaderboard={() => setShowLeaderboardModal(true)}
          onOpenAstronautCard={() => {
            setSelectedCardPlayer(null);
            setShowAstronautCardModal(true);
          }}
          onOpenDiamondGuide={() => setShowDiamondGuideModal(true)}
        />
      )}

      {/* 7. Game Over Modal (Child-Friendly Oopsie) */}
      {screen === 'GAME_OVER' && (
        <GameOverModal
          stats={stats}
          level={selectedLevel}
          userAge={progress.userAge}
          userName={progress.userName}
          avatar={progress.avatar}
          gender={progress.gender}
          themeStyle={progress.themeStyle}
          mascotId={progress.mascotId}
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

      {/* 9. Energy & Rest Recharge Modal */}
      {showEnergyModal && (
        <EnergyModal
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onClose={() => setShowEnergyModal(false)}
        />
      )}

      {/* 10. User Profile / Welcome Modal */}
      {showProfileModal && (
        <UserProfileModal
          initialName={progress.userName}
          initialAvatar={progress.avatar}
          initialAge={progress.userAge || 8}
          initialRealmId={progress.selectedRealmId}
          initialGender={progress.gender || 'neutral'}
          initialTheme={progress.themeStyle || 'galactic_starwars'}
          initialMascotId={progress.mascotId || 'cosmo_dog'}
          initialDailyEnergyMode={progress.dailyEnergyMode || 'balanced'}
          initialPlayerTag={progress.playerTag}
          isFirstTime={!progress.userName}
          onSave={handleSaveProfile}
          onClose={progress.userName ? () => setShowProfileModal(false) : undefined}
        />
      )}

      {/* 11. Armory / Upgrade Shop Modal */}
      {showArmoryModal && (
        <ArmoryModal
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onClose={() => setShowArmoryModal(false)}
          onOpenDiamondGuide={() => setShowDiamondGuideModal(true)}
        />
      )}

      {/* 12. Cosmic Leaderboard Modal */}
      {showLeaderboardModal && (
        <LeaderboardModal
          progress={progress}
          onSelectPlayer={(entry) => {
            setSelectedCardPlayer(entry);
            setShowAstronautCardModal(true);
          }}
          onClose={() => setShowLeaderboardModal(false)}
        />
      )}

      {/* 13. Astronaut Citizen ID Card & 1-Click Share Modal */}
      {showAstronautCardModal && (
        <AstronautCardModal
          currentProgress={progress}
          targetEntry={selectedCardPlayer}
          onUpdateProgress={handleUpdateProgress}
          onClose={() => {
            setShowAstronautCardModal(false);
            setSelectedCardPlayer(null);
          }}
        />
      )}

      {/* 14. Diamond Guide Modal (Bí Kíp Săn Kim Cương 💎) */}
      {showDiamondGuideModal && (
        <DiamondGuideModal
          progress={progress}
          onClose={() => setShowDiamondGuideModal(false)}
          onOpenArmory={() => {
            setShowDiamondGuideModal(false);
            setShowArmoryModal(true);
          }}
        />
      )}
    </div>
  );
};

export default App;

