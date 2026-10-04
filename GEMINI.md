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

6. **Strict Public NPM Registry (`https://registry.npmjs.org`)**:
   - Always ensure project `.npmrc` is set to `registry=https://registry.npmjs.org/`.
   - Never allow private or enterprise registry URLs into `package-lock.json`.
   - If adding or updating libraries, ensure `package-lock.json` only contains `https://registry.npmjs.org`.

7. **Animation Loop Idempotency & Reward Safety (60 FPS Guarding)**:
   - Any state transition, victory/game-over trigger, or reward payout initiated from inside a 60 FPS `requestAnimationFrame` loop MUST use synchronous immediate guards (`useRef` / boolean flags). Never rely on delayed callbacks (`setTimeout`) or asynchronous React state updates without a synchronous debounce lock.
   - Domain reward handlers (`handleVictory`, `completeLevelProgress`) must maintain idempotent session locks to prevent multi-triggering.

8. **Standard 3-Column Course Roadmap Architecture (Duolingo Style)**:
   - Tất cả các khoá học hiện tại và tương lai (Vocabulary Saga, Typing Dojo, Phonics, v.v.) khi ở màn hình bản đồ lộ trình (Map/Saga view) đều BẮT BUỘC áp dụng cấu trúc 3 cột responsive chuẩn:
     - **Desktop (`>= 1024px`)**:
       - Cột trái (`LeftNavSidebar`): Menu điều hướng cố định (Bản Đồ, Lò Rèn, Võ Đường, Xưởng Tàu, BXH, Hồ Sơ, Âm thanh, Chuyển Theme).
       - Cột giữa (`Center Roadmap`): Lộ trình bài học cuộn mượt (`max-w-xl mx-auto`), chứa Switcher môn học, thanh ruy băng chuyển trạm nhanh (Ribbon/Gates), lộ trình uốn lượn SVG Bézier, và nút nổi "Tiếp tục".
       - Cột phải (`RightPlayerSidebar`): Sticky bảng thông tin người chơi (Streak, Năng Lượng, Kim Cương, Tim, Nhiệm Vụ Hàng Ngày, Thẻ Mastery chuyên biệt theo môn học).
     - **Mobile / Tablet (`< 1024px`)**:
       - `MobileTopBar`: Nhỏ gọn, hiển thị Avatar, Course Switcher pill, và các pill kinh tế (Streak, Năng Lượng, Kim Cương, Tim, Mute).
       - `MobileBottomBar`: Thanh tab 5 nút cảm ứng công thái học, đổi trạng thái active mượt mà theo từng môn học (`activeRoute`).

