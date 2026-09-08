# Vocab Pew Pew — Development Guidelines & Invariants

## Core Architectural Invariants

1. **Zero External Audio Assets (Web Audio API & Web Speech API Only)**:
   - All sound effects (lasers, explosions, fanfare, combo notes) must be synthesized programmatically using the Web Audio API in `src/game/engine/SoundController.ts`. Do not import or bundle `.mp3`, `.wav`, or other binary audio files.
   - All voice and pronunciation features must use `window.speechSynthesis` wrapped in `src/game/engine/SpeechHelper.ts`.

2. **Strict TypeScript & Type Integrity**:
   - Maintain explicit types in `src/data/` (e.g., `types.ts`, `progress-types.ts`, `theme-types.ts`, `upgrade-types.ts`).
   - Avoid `any`. Ensure `npm run build` (`tsc && vite build`) completes with zero type errors before concluding tasks.

3. **Separation of Concerns**:
   - Keep 2D canvas rendering and real-time physics isolated in `src/game/engine/` and `src/game/GameCanvas.tsx`.
   - Keep React state, modals, navigation, and HUD strictly in `src/components/`.
   - Keep curriculum content and level definitions in `src/data/chapters/`.

4. **Progress & Storage Resilience**:
   - Always provide fallback defaults when deserializing progress from `localStorage` in `src/data/` to prevent crashes when new data structures or realms are introduced.

5. **Kid-Friendly UX & Accessibility**:
   - Maintain vibrant 3D/gamified UI elements with Tailwind CSS.
   - Support both keyboard input and virtual touch keyboard for iPad/tablet users.
