---
name: kid-arcade-ux
description: >-
  Use this skill when designing, building, or refining UI/UX components, buttons, modals, typography, animations, touch interactions, or feedback loops in Vocab Pew Pew.
---

# Kid Arcade UI/UX Design Intelligence

Guidance for building tactile, vibrant, and accessible arcade game interfaces for children in **Vocab Pew Pew**.

---

## 1. Core Design Pillars

### 1.1 Tactile 3D Controls ("Chunky & Juicy")
Children respond instinctively to toy-like physical controls that feel rewarding to press.
- **Physical Bevels**: Use bottom borders to create a raised 3D look:
  `border-b-4 border-slate-900 active:border-b-0 active:translate-y-1`
- **Springy Micro-Interactions**:
  Combine `active:scale-95` or `hover:scale-105 active:scale-95` with smooth transitions (`transition-all duration-150`).
- **Glow & Highlights**:
  Add upper edge inner highlights (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]`) and neon drop glows (`shadow-[0_4px_20px_rgba(0,240,255,0.4)]`).

### 1.2 Touch Ergonomics & Accessibility for Tablets
Young learners often play on iPads and touch devices with smaller or less precise finger coordination.
- **Minimum Target Size**: All interactive buttons must have a touch target of at least **48x48px** (preferably 56px on mobile/tablet).
- **Adequate Spacing**: Provide at least 8px to 12px gap between clickable elements to avoid accidental misclicks.
- **Virtual Keyboard Safe Area**: Keep dynamic game overlays (like `WordTargetBar`) elevated well above the virtual touch keyboard (e.g. `bottom-28` to `bottom-36`).

### 1.3 Phonics & Typographic Legibility
Educational typing games require immediate letter recognition.
- **High-Contrast Letter Tiles**: Each letter should render inside a discrete tile or high-visibility capsule.
- **Current Target Letter Focus**: The letter the child needs to type next must pulse, expand, or glow (e.g., yellow glow + subtle pulse animation).
- **Font Stack**: Use playful, rounded sans-serifs (`font-game` / `Fredoka`) for UI and instructions, and bold sci-fi fonts (`font-orbitron` / uppercase) for word typing targets.

### 1.4 Audio-Visual Dual Coding
Never rely on visual feedback alone, nor audio alone.
- Every button tap MUST trigger synthesized sound feedback via `soundFx.playClick()` (or corresponding sound effects).
- Success (correct letter typed): green flash / sparkle + melodic chime (`soundFx.playSuccess()` or combo note).
- Error (wrong letter): red shake + thud sound (`soundFx.playWrong()`).
- All sounds must use Web Audio API programmatically via `SoundController.ts` (strictly zero external audio files).

---

## 2. Reusable Component Patterns

### 2.1 The Standard 3D Arcade Button
```tsx
<button
  onClick={() => {
    soundFx.playClick();
    onAction();
  }}
  className="btn-3d btn-3d-cyan"
>
  <Icon className="w-5 h-5" />
  <span>Nút Bấm 3D</span>
</button>
```

### 2.2 Standard Modal Frame
1. Dark cosmic backdrop with high blur: `bg-black/85 backdrop-blur-md`.
2. Radiant border with glow: `border-2 sm:border-3 border-cyan-400/60 shadow-[0_0_40px_rgba(0,240,255,0.3)]`.
3. Badge/Emblem Header: Centered 3D circular emblem at top (`-mt-8` or prominent icon).
4. Dual primary/secondary buttons: Big chunky primary action (`btn-3d-emerald`) and subtle dark secondary button (`bg-slate-800 border-2 border-slate-700`).

---

## 3. Pre-Delivery Checklist

Before finalizing any UI component change:
- [ ] Are buttons tactile (have 3D bevel or active push-down effect)?
- [ ] Is the touch target >= 48px on touch screens?
- [ ] Is there an audio click (`soundFx.playClick()`) on interactive actions?
- [ ] Is contrast ratio high enough for kids reading against dark starfield backgrounds?
- [ ] Does `npm run build` pass with zero TypeScript errors?
