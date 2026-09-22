# Kế Hoạch Triển Khai (Implementation Plan) - Typing Dojo

Xây dựng module luyện gõ 10 ngón độc lập "Typing Dojo": giáo trình theo hàng phím, bàn phím ảo 2 bàn tay, chế độ gõ đoạn văn (kèm bộ gõ Telex tiếng Việt), đo WPM/Accuracy chuẩn, và gắn vào vòng lặp thưởng (Daily Quest, Diploma, Leaderboard, MistakeVault) đã có.

## User Review Required

> [!NOTE]
> - **Không đụng luồng Saga Map hiện tại**: `TelexComposer.ts`/`TypingMetrics.ts` là module hoàn toàn mới, không import ngược vào `InputHandler.ts`/`EnemySpawner.ts`.
> - **Zero External Audio**: mọi âm thanh gõ phím dùng `SoundController.ts` hiện có.
> - **Một nguồn dữ liệu WPM duy nhất**: đọc `AgeRealm.targetWpm` có sẵn, không hard-code bảng ngưỡng riêng.
> - **Không dùng hearts/gems**: Typing Dojo chỉ pass/fail nhẹ nhàng theo `minAccuracyToPass`.

---

## Proposed Changes

Grouped by component and layer:

### 1. Data & Types Layer

#### [NEW] `src/data/typing-progress-types.ts`
- `TypingLessonProgress`, `TypingWpmHistoryEntry`, `TypingProgress` — theo đúng schema đã chốt ở `spec.md` mục 3.A.
- `DEFAULT_TYPING_PROGRESS` constant để dùng làm fallback an toàn (Progress & Storage Resilience).

#### [NEW] `src/data/typing-curriculum.ts`
- `TypingRowType`, `TypingLesson`.
- `TYPING_LESSONS: TypingLesson[]` — 6 bài: Home → Top → Bottom → Numbers → Short Words → Paragraph (chuyển tiếp).

#### [NEW] `src/data/typing-paragraph-types.ts`
- `TypingParagraph`, `TypingParagraphDraftDoc`, `TypingParagraphSnapshotDoc`.

#### [MODIFY] `src/data/progress-types.ts`
- Thêm field optional `typingProgress?: TypingProgress` vào `UserProgress`.
- Thêm field optional `typingSessionCompleted?: boolean` vào `DailyQuestProgress`.

---

### 2. Game Engine Layer

#### [NEW] `src/game/engine/TypingMetrics.ts`
- `startSession()`, `recordKeystroke(expectedChar, actualChar, timestampMs)`.
- `computeWpm()`, `computeAccuracy()`, `getTopMistakeKeys(limit)`.
- `parseTargetWpmFloor(targetWpm: string): number` — parse cận dưới chuỗi `AgeRealm.targetWpm` (vd `'25 - 35 WPM'` → `25`).

#### [NEW] `src/game/engine/TelexComposer.ts`
- Compose-buffer xử lý từng keystroke → ký tự hiển thị, theo bảng luật `spec.md` mục 2.5.
- `pushKey(key: string): string`, `backspace(): string`, `reset()`.

---

### 3. Services Layer

#### [NEW] `src/services/firebase/typingParagraphAdminService.ts`
- `loadTypingParagraphDraft(realmId)`, `saveTypingParagraphDraft(realmId, paragraphs)`, `publishTypingParagraphSnapshot(paragraphsByRealm)`.

#### [NEW] `src/services/typingParagraphLoader.ts`
- `initTypingParagraphs()`: kiểm tra `versionId` snapshot, cache `localStorage`.
- `getParagraphsForRealm(realmId)`: ưu tiên snapshot cache, fallback `generateParagraphsFromRealm()` khi offline.
- `generateParagraphsFromRealm(realm: AgeRealm): TypingParagraph[]` — logic tự sinh theo `spec.md` mục 2.7.

#### [MODIFY] `src/services/progressStorage.ts`
- Đọc/ghi `typingProgress` với fallback `DEFAULT_TYPING_PROGRESS` khi field chưa tồn tại ở dữ liệu cũ.

#### [MODIFY] `src/services/firebase/leaderboardService.ts`
- Thêm `LeaderboardCategory = 'typing_speed'`, hàm `fetchTypingSpeedLeaderboard()` tái dùng `mergeCurrentUser`/`blendMockContenders` với `sortKey: 'bestWpmOverall'`.

#### [MODIFY] `src/services/firebase/cloudSyncService.ts`
- Đồng bộ thêm 2 field `bestWpmOverall`, `bestAccuracyOverall` vào `users/{uid}` (debounced sync sẵn có).

---

### 4. Typing Dojo UI Components

#### [NEW] `src/components/typing/VirtualKeyboardWithHands.tsx`
- SVG 2 bàn tay, tô sáng ngón theo `finger-guide.ts` (tái dùng nguyên vẹn, không sửa file này).
- Trạng thái phím: `idle` / `next-to-press` / `correct` / `wrong`.

#### [NEW] `src/components/typing/TypingDojoView.tsx`
- Runner cho `TYPING_LESSONS`: hiển thị `practiceText`, gọi `TypingMetrics`, chấm `minAccuracyToPass`, mở khoá bài kế tiếp.

#### [NEW] `src/components/typing/ParagraphTypingView.tsx`
- Hiển thị đoạn văn kiểu teleprompter, caret nhấp nháy, highlight đúng/sai theo ký tự.
- Gọi `TelexComposer` khi `paragraph.isVietnamese === true`.
- Biến thể Speed Rush 60s (dùng `requestAnimationFrame` + `useRef` guard theo Animation Loop Idempotency Invariant).

#### [NEW] `src/components/typing/TypingResultModal.tsx`
- Modal kết quả cuối phiên (phong cách giống `VictoryModal.tsx`), hiển thị WPM/Accuracy thay vì combo điểm.

---

### 5. Admin Portal Extension

#### [NEW] `src/components/admin/TypingParagraphManager.tsx`
- Danh sách đoạn văn theo Realm, nút "Tự sinh lại từ Realm", sửa/thêm/xoá thủ công, đánh dấu `isVietnamese`, nút Publish Snapshot.

#### [MODIFY] `src/components/admin/AdminPortal.tsx`
- Thêm tab điều hướng **"📝 Đoạn Văn Luyện Gõ"** cạnh các tab hiện có.

---

### 6. Application Integration

#### [MODIFY] `src/components/landing/LandingPage.tsx`
- Thêm nút **"⌨️ Typing Dojo"** cạnh nút vào Saga Map (accent màu tím để phân biệt).

#### [MODIFY] `src/components/path/TopNavBar.tsx`
- Thêm link chuyển nhanh Saga Map ↔ Typing Dojo.

#### [MODIFY] `src/App.tsx`
- Thêm state điều hướng `appMode: 'saga' | 'dojo'`, lazy-load `TypingDojoView`/`ParagraphTypingView` để không phình bundle khởi động của game bắn từ.
- Ghi nhớ `lastActiveMode` vào `progressStorage.ts`.

#### [MODIFY] `src/components/modals/DailyQuestModal.tsx`
- Thêm mục quest "Hoàn thành 1 phiên Typing Dojo hôm nay" đọc từ `typingSessionCompleted`.

#### [MODIFY] `src/components/modals/GraduationModal.tsx`
- Thêm nhánh diploma "Chứng Chỉ Gõ 10 Ngón", điều kiện dùng `parseTargetWpmFloor()` + ngưỡng accuracy theo bảng ở `intent.md` mục 6.

#### [MODIFY] `src/components/modals/LeaderboardModal.tsx`
- Thêm tab "🏎️ Tốc Độ Gõ" gọi `fetchTypingSpeedLeaderboard()`.

#### [MODIFY] `src/components/modals/MistakeVaultModal.tsx`
- Thêm tab "Phím Hay Gõ Sai" hiển thị `TypingMetrics.getTopMistakeKeys()`.

#### [MODIFY] `firestore.rules`
- Thêm rule cho `typing_paragraph_drafts/{realmId}` và `typing_paragraph_snapshots/latest` (đọc công khai cho client, ghi chỉ Admin — theo đúng pattern rule hiện có của `vocab_drafts`/`vocab_snapshots`).

---

### 7. Tests

#### [NEW] `src/tests/telexComposer.test.ts`
- Phủ đầy đủ bảng luật Telex (dấu thanh, biến âm, `dd → đ`, Backspace hoàn tác 1 bước, reset khi gặp space).

#### [NEW] `src/tests/typingMetrics.test.ts`
- Kiểm tra công thức WPM/Accuracy, `parseTargetWpmFloor()` với các định dạng chuỗi khác nhau (`'15 - 25 WPM'`, `'65 - 85+ WPM'`).

---

## Verification Plan

### Automated Build & Type Check
- `npm run build` (`tsc && vite build`) — 0 lỗi TypeScript, 0 lỗi compile.
- `npm run test` (hoặc lệnh test hiện có) — `telexComposer.test.ts` và `typingMetrics.test.ts` pass, cùng 2 test suite cũ (`diamondEconomy.test.ts`, `mistakeMastery.test.ts`) không bị ảnh hưởng.

### Manual Verification
1. **Curriculum Flow**: Chơi lần lượt Home → Paragraph, xác nhận unlock đúng thứ tự và chặn đúng khi dưới `minAccuracyToPass`.
2. **Virtual Keyboard Hands**: Ngón tay sáng đúng theo `finger-guide.ts`, kể cả các phím dùng trong tổ hợp Telex.
3. **Telex tiếng Việt**: Gõ thử các câu ví dụ trong bảng luật (`as`, `aa`, `aw`, `dd`, kèm Backspace giữa cụm).
4. **Paragraph Mode & Speed Rush**: Kiểm tra highlight đúng/sai theo ký tự, WPM/Accuracy tính đúng, phiên 60s kết thúc đúng 1 lần (không double-trigger).
5. **Admin → Client Sync**: Sửa & Publish đoạn văn trên Admin, xác nhận Client nhận snapshot mới; tắt mạng xác nhận fallback tự sinh không crash.
6. **Reward Integration**: Diploma, Leaderboard tốc độ gõ, Daily Quest ghi nhận đúng theo dữ liệu thật.
7. **Regression Saga Map**: Toàn bộ luồng bắn từ vựng cũ (InputHandler, EnemySpawner, MistakeVault theo từ, Victory/GameOver) hoạt động y nguyên.
