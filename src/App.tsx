import React, { useState, useCallback, useRef } from 'react';
import { GameState, VocabTheme, GameStats, EnemyItem } from './data/types';
import { VOCAB_THEMES } from './data/vocab-levels';
import { GameCanvas } from './game/GameCanvas';
import { HUD } from './components/HUD';
import { WordTargetBar } from './components/WordTargetBar';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { LevelSelectModal } from './components/LevelSelectModal';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';
import { PauseModal } from './components/PauseModal';
import { soundFx } from './game/engine/SoundController';

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
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [selectedTheme, setSelectedTheme] = useState<VocabTheme>(VOCAB_THEMES[0]);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [activeTarget, setActiveTarget] = useState<EnemyItem | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const virtualInputHandlerRef = useRef<((char: string) => void) | null>(null);

  const handleStartGame = () => {
    setStats({ ...INITIAL_STATS, clearedWordsList: [] });
    setActiveTarget(null);
    setGameState('PLAYING');
  };

  const handleRestart = () => {
    setStats({ ...INITIAL_STATS, clearedWordsList: [] });
    setActiveTarget(null);
    setGameState('PLAYING');
  };

  const handlePause = () => {
    setGameState('PAUSED');
  };

  const handleResume = () => {
    setGameState('PLAYING');
  };

  const handleChangeTheme = () => {
    setActiveTarget(null);
    setGameState('MENU');
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleGameOver = useCallback(() => {
    setGameState('GAME_OVER');
  }, []);

  const handleVictory = useCallback(() => {
    setGameState('VICTORY');
  }, []);

  const registerInputHandler = useCallback((handler: (char: string) => void) => {
    virtualInputHandlerRef.current = handler;
  }, []);

  const handleVirtualKeyPress = (char: string) => {
    if (virtualInputHandlerRef.current) {
      virtualInputHandlerRef.current(char);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-space-dark select-none font-game">
      {/* Background Canvas Engine */}
      <GameCanvas
        gameState={gameState}
        selectedTheme={selectedTheme}
        stats={stats}
        onStatsUpdate={setStats}
        onGameOver={handleGameOver}
        onVictory={handleVictory}
        onTargetChange={setActiveTarget}
        onRegisterInputHandler={registerInputHandler}
      />

      {/* In-Game HUD & Controls */}
      {gameState === 'PLAYING' && (
        <>
          <HUD
            stats={stats}
            theme={selectedTheme}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onPause={handlePause}
          />

          <WordTargetBar target={activeTarget} />

          <VirtualKeyboard onKeyPress={handleVirtualKeyPress} />
        </>
      )}

      {/* Menu / Theme Selection Modal */}
      {gameState === 'MENU' && (
        <LevelSelectModal
          selectedTheme={selectedTheme}
          onSelectTheme={setSelectedTheme}
          onStartGame={handleStartGame}
        />
      )}

      {/* Pause Modal */}
      {gameState === 'PAUSED' && (
        <PauseModal
          theme={selectedTheme}
          onResume={handleResume}
          onRestart={handleRestart}
          onChangeTheme={handleChangeTheme}
        />
      )}

      {/* Victory Modal */}
      {gameState === 'VICTORY' && (
        <VictoryModal
          stats={stats}
          theme={selectedTheme}
          onRestart={handleRestart}
          onChangeTheme={handleChangeTheme}
        />
      )}

      {/* Game Over Modal */}
      {gameState === 'GAME_OVER' && (
        <GameOverModal
          stats={stats}
          theme={selectedTheme}
          onRestart={handleRestart}
          onChangeTheme={handleChangeTheme}
        />
      )}
    </div>
  );
};

export default App;
