---
name: game-engine-dev
description: >-
  Use this skill when developing or modifying 2D canvas game mechanics, synthesizers, particle systems, ship renderers, or collision detection in Vocab Pew Pew.
---

# Game Engine Development & Audio Synthesis

Follow this workflow when updating the canvas game engine or audio synthesizers.

## Steps

1. **Audio Synthesis Updates (`SoundController.ts`)**:
   - Create audio nodes using `AudioContext` (OscillatorNode, GainNode, BiquadFilterNode).
   - Clean up audio nodes on completion to prevent memory leaks.
   - Test audio initialization on first user interaction gesture.

2. **Physics & Spawning Logic**:
   - Update `CollisionEngine.ts`, `EnemySpawner.ts`, or `ParticleSystem.ts`.
   - Maintain 60 FPS requestAnimationFrame loop inside `GameCanvas.tsx`.
   - Ensure delta-time calculations account for variable frame rates.

3. **Input & Target Locking**:
   - Ensure input handling in `InputHandler.ts` supports both physical keydown and virtual touch events from `VirtualKeyboard.tsx`.

4. **Verification**:
   - Run `npm run build` to ensure no TypeScript or canvas typing issues exist.
