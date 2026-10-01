---
name: kid-arcade-ux
description: >-
  Use this skill when designing, building, or refining UI/UX components, buttons, modals, typography, animations, touch interactions, or feedback loops in Vocab Pew Pew.
---

# Kid Arcade UI/UX Design Intelligence (Huashu-Enhanced)

Guidance for building tactile, vibrant, and accessible arcade game interfaces for children in **Vocab Pew Pew**.
Incorporates the multi-role design studio philosophy, anti-AI-slop standards, and 5-dimension critique principles inspired by **huashu-design**.

---

## 1. Design Studio Mindset ("You are a Game Studio, Not a Code Generator")
When designing or updating UI in Vocab Pew Pew, sequentially assume the responsibilities of:
1. **Art Director**: Curates the visual realm theme (Cosmic, Jungle, Cyber, Magma), prevents generic SaaS dilution, and ensures everything feels like an exhilarating arcade machine.
2. **Game Feel / Motion Designer**: Dictates timing, bouncy spring transitions (`scale-95`, `translate-y-1`), explosion particles, camera shakes, and reward fanfare.
3. **Typographic & Phonics Specialist**: Ensures letter tiles have maximum legibility, phonics colors are unmistakable, and active target letters have pulsing focus.
4. **Ergonomics & Accessibility Engineer**: Guarantees >= 48px touch targets on iPads/tablets, avoids virtual keyboard overlap, and complies with `100dvh` responsive dialog bounds.
5. **Sound Synthesizer**: Connects all tactile actions with Web Audio API programmatic sound effects (clicks, chimes, thuds) with zero external audio assets.

---

## 2. Anti-AI-Slop Rules for Kid Arcade Games

Generic AI code generation tends to default to monotonous SaaS templates. In Vocab Pew Pew, strictly eliminate:

| Slop Pattern | Why It Is Slop | Game Studio Replacement |
|---|---|---|
| **Generic Flat SaaS Cards** (`bg-slate-900 border border-slate-800 rounded-lg`) | Looks like a B2B billing dashboard, not an exciting children's game | **Chunky Beveled Containers**: Rich backdrop blurs, luminous borders, realm-specific badge headers, and raised 3D surfaces. |
| **Flat Buttons without Tactility** (`bg-blue-600 rounded p-2 text-white`) | Children cannot feel if they pressed it on a tablet | **3D Tactile Buttons** (`border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 active:scale-95 shadow-lg`). |
| **Monotonous Neon Glow Everywhere** | When everything glows cyan/purple, nothing stands out | **High-Contrast Focal Points**: Reserve intense animated glows strictly for the active typing target, boss health bars, or victory stars. |
| **Text-Only Feedback** ("Correct!", "Wrong!") | Fails visual-audio dual coding for young non-readers | **Multi-Sensory Pop**: Green flash + melodic chime + particle burst for success; red wobble + low thud for errors. |
| **Uniform Realm Aesthetics** | All levels look like the same dark space screen | **Distinct Realm Signatures**: Deep cosmic purple/cyan, lush jungle emerald/gold, high-voltage cyber yellow/orange, molten magma ruby/amber. |

---

## 3. Tri-Directional Prototyping Rule
When introducing or substantially refactoring a major screen (e.g. Realm Map, Victory Modal, Shop/Gacha, or HUD):
- Do not settle on the first arbitrary layout.
- Explore or prototype **3 distinct directions**:
  - **Direction 1: Classic Toyetic Arcade** (Thick plastic borders, huge juicy buttons, bright candy palettes).
  - **Direction 2: Sci-Fi Hologram / Cyber** (Glassmorphism, scanlines, digital neon badges, HUD readouts).
  - **Direction 3: Comic / Phonics Storybook** (Hand-drawn rounded strokes, expressive star badges, banner ribbons).
- Select the direction that best serves the learning objective and realm context.

---

## 4. Core Design Pillars

### 4.1 Tactile 3D Controls ("Chunky & Juicy")
Children respond instinctively to toy-like physical controls that feel rewarding to press.
- **Physical Bevels**: Use bottom borders to create a raised 3D look:
  `border-b-4 border-slate-900 active:border-b-0 active:translate-y-1`
- **Springy Micro-Interactions**:
  Combine `active:scale-95` or `hover:scale-105 active:scale-95` with smooth transitions (`transition-all duration-150`).
- **Glow & Highlights**:
  Add upper edge inner highlights (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]`) and neon drop glows (`shadow-[0_4px_20px_rgba(0,240,255,0.4)]`).

### 4.2 Touch Ergonomics & Accessibility for Tablets
Young learners often play on iPads and touch devices with smaller or less precise finger coordination.
- **Minimum Target Size**: All interactive buttons must have a touch target of at least **48x48px** (preferably 56px on mobile/tablet).
- **Adequate Spacing**: Provide at least 8px to 12px gap between clickable elements to avoid accidental misclicks.
- **Virtual Keyboard Safe Area**: Keep dynamic game overlays (like `WordTargetBar`) elevated well above the virtual touch keyboard (e.g. `bottom-28` to `bottom-36`).
- **Responsive 3-Zone Dialogs**: Modals must respect `max-h-[100dvh]` with sticky headers, scrollable bodies, and safe-padded action footers.

### 4.3 Phonics & Typographic Legibility
Educational typing games require immediate letter recognition.
- **High-Contrast Letter Tiles**: Each letter should render inside a discrete tile or high-visibility capsule.
- **Current Target Letter Focus**: The letter the child needs to type next must pulse, expand, or glow (e.g., yellow glow + subtle pulse animation).
- **Font Stack**: Use playful, rounded sans-serifs (`font-game` / `Fredoka`) for UI and instructions, and bold sci-fi fonts (`font-orbitron` / uppercase) for word typing targets.

### 4.4 Audio-Visual Dual Coding
Never rely on visual feedback alone, nor audio alone.
- Every button tap MUST trigger synthesized sound feedback via `soundFx.playClick()` (or corresponding sound effects).
- Success (correct letter typed): green flash / sparkle + melodic chime (`soundFx.playSuccess()` or combo note).
- Error (wrong letter): red shake + thud sound (`soundFx.playWrong()`).
- All sounds must use Web Audio API programmatically via `SoundController.ts` (strictly zero external audio files).

---

## 5. Five-Dimension Critique Scorecard (Pre-Delivery Audit)

Evaluate any screen before final delivery (Score 1–10 on each):

| Dimension | Evaluation Criteria | Pass Threshold |
|---|---|---|
| **1. Game Identity & Theming** | Does it feel like an authentic, immersive kid's arcade rather than a web dashboard? Does realm theming pop? | ≥ 8 / 10 |
| **2. Visual Hierarchy & Letter Scanning** | Can a 7-year-old identify the next action or target letter within 0.5 seconds? | ≥ 9 / 10 |
| **3. Tactility & Juiciness** | Do buttons look touchable with 3D bevels, active compression, and spring back? | ≥ 8 / 10 |
| **4. Ergonomics & Tablet Safety** | Are all touch targets ≥ 48px? Is there clear margin from virtual touch keyboards? | ≥ 9 / 10 |
| **5. Sensory Dual-Coding & Audio Sync** | Does every visual state change have corresponding synthesized Web Audio SFX? | ≥ 9 / 10 |

---

## 6. Pre-Delivery Checklist
- [ ] Are buttons tactile (have 3D bevel or active push-down effect)?
- [ ] Is the touch target >= 48px on touch screens?
- [ ] Is there an audio click (`soundFx.playClick()`) on interactive actions?
- [ ] Is contrast ratio high enough for kids reading against dark starfield backgrounds?
- [ ] Does `npm run build` pass with zero TypeScript errors?
