# Intent: Typing Dojo — Module Luyện Gõ 10 Ngón Độc Lập

> **Giai đoạn**: Stage 1 - Plan (Intent Capture)
> **Dự án**: Vocab Pew Pew (`vocab-pew-pew`)
> **Người đề xuất**: Product Owner
> **Trạng thái**: Chờ duyệt (Pending PO Review)
> **Cảm hứng**: Các tính năng luyện gõ 10 ngón kiểu littlecat.vn/typing (bài học theo hàng phím, bàn phím ảo có ngón tay, gõ theo đoạn văn, đo tốc độ WPM)

---

## 1. Bối cảnh & Vấn đề (Problem Statement)

1. **Gõ phím hiện tại chỉ phục vụ mục tiêu ghi nhớ từ vựng, không rèn kỹ năng gõ 10 ngón**:
   - Cơ chế gõ trong `InputHandler.ts` + `EnemySpawner.ts` là "gõ để bắn từ rơi" — tối ưu cho việc học từ mới, không rèn tư thế đặt ngón tay hay phản xạ gõ theo hàng phím (home row → top row → bottom row).
   - `finger-guide.ts` đã có sẵn bảng map phím → tay/ngón/màu, nhưng mới dùng làm badge gợi ý nhỏ (`FingerGuideBadge.tsx`) trong lúc chơi, chưa có bàn phím ảo full-size trực quan hoá 2 bàn tay.

2. **Chưa có thước đo tốc độ gõ chuẩn (WPM/Accuracy)**:
   - `mistake-types.ts` (MistakeVault) chỉ đếm `typoCount`, `breachCount`, `consecutiveCleanClears` theo từng từ vựng — không có khái niệm WPM/CPM hay % chính xác theo phiên gõ liên tục.

3. **Chưa có chế độ gõ theo đoạn văn/câu dài liền mạch**:
   - Toàn bộ trải nghiệm hiện tại xoay quanh từ đơn rơi từ trên xuống. Không có chế độ hiển thị một đoạn văn cố định để gõ theo, với con trỏ nhảy theo ký tự đúng/sai — kiểu bài luyện gõ đoạn văn kinh điển.

4. **Chưa hỗ trợ luyện gõ tiếng Việt có dấu**:
   - Bàn phím vật lý không có phím dấu; cần một bộ gõ (đã chốt: **Telex**) để học sinh luyện gõ tiếng Việt có dấu (phục vụ Realm 8 — hội thoại đời sống, và nhu cầu gõ tiếng Việt nói chung).

---

## 2. Mục tiêu & Kết quả mong đợi (Desired Outcomes)

### A. Vị trí sản phẩm (đã chốt cùng PO)
- **Tách thành mode độc lập "⌨️ Typing Dojo"**, không nhúng vào Saga Map hiện tại — vì kỹ năng gõ 10 ngón không phụ thuộc độ tuổi/Realm (Realm 1 và Realm 8 học cùng bộ bài home-row/top-row/bottom-row).
- Truy cập qua nút riêng ở `LandingPage.tsx` / `TopNavBar.tsx`, ngang hàng với nút vào Saga Map.
- Tiến trình Typing Dojo lưu riêng (không trộn với `progress-types.ts` hiện tại của Saga Map), theo đúng invariant "Progress & Storage Resilience" (luôn có fallback mặc định khi field mới chưa tồn tại trong `localStorage` cũ).
- Nội dung đoạn văn ở chế độ Paragraph Mode **vẫn lấy ngữ liệu theo Realm hiện tại của người chơi** (bé nhỏ → câu chuyện ngắn; Realm 7/8 → hội thoại PO/công sở) để không tách rời hoàn toàn khỏi hành trình học từ vựng.

### B. Giáo trình gõ 10 ngón (Structured Typing Curriculum)
- Chuỗi bài học tuần tự: **Home Row → Top Row → Bottom Row → Số/Ký tự đặc biệt → Cụm từ ngắn → Đoạn văn dài**.
- Mỗi bài học hiển thị bàn phím ảo có 2 bàn tay, sáng ngón cần dùng dựa trên `finger-guide.ts` (mở rộng thêm, không viết lại từ đầu).

### C. Đo lường tốc độ & độ chính xác (Typing Metrics)
- Công thức WPM chuẩn ngành (đã chốt): `WPM = (số ký tự gõ đúng / 5) / số phút`.
- Theo dõi: WPM hiện tại, WPM tốt nhất, Accuracy %, lỗi hay gặp theo phím (không chỉ theo từ như MistakeVault hiện tại).

### D. Chế độ gõ theo đoạn văn (Paragraph Mode)
- Hiển thị đoạn văn cố định, highlight ký tự hiện tại, tô đỏ ký tự gõ sai, cho phép backspace sửa.
- "Speed Rush gõ câu": biến thể tính giờ, đo WPM thay vì combo điểm.

### E. Chế độ gõ tiếng Việt (Vietnamese Telex Mode)
- Bộ gõ **Telex** (đã chốt): `as → á`, `w → ư/ơ`, `dd → đ`, v.v.
- Cần lớp compose-buffer riêng xử lý chuỗi phím liên tiếp thành ký tự có dấu, tách biệt hoàn toàn khỏi luồng gõ tiếng Anh của game bắn từ (không ảnh hưởng `InputHandler.ts` hiện tại).
- Mở rộng `finger-guide.ts` để gợi ý ngón tay cho các tổ hợp phím tạo dấu Telex.

### F. Gắn vào vòng lặp thưởng đã có (Reuse, không xây mới)
- Daily Quest kiểu "Gõ đạt X WPM hôm nay" trong `DailyQuestModal`.
- Leaderboard riêng "Tốc độ gõ" cạnh leaderboard điểm hiện tại (`leaderboardService.ts`).
- Diploma mới trong `GraduationModal`: "Chứng chỉ gõ 10 ngón" khi đạt ngưỡng WPM + accuracy ổn định.
- MistakeVault hiển thị thêm "phím hay gõ sai" bên cạnh "từ hay sai".

---

## 3. Phạm vi hệ thống & Kiến trúc bị ảnh hưởng (Affected Systems)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          Vocab Pew Pew Web App                           │
├────────────────────────────┬──────────────────────┬──────────────────────┤
│   🎮 Saga Map (hiện có)     │  ⌨️ Typing Dojo (MỚI)  │  🛡️ Admin Portal      │
│  - Gõ để bắn từ vựng rơi   │  - Giáo trình hàng phím│  (không đổi)         │
│  - MistakeVault theo từ    │  - Paragraph Mode      │                      │
│  - Leaderboard điểm số     │  - Vietnamese Telex    │                      │
│                            │  - WPM/Accuracy Metrics│                      │
└─────────────┬──────────────┴───────────┬────────────┴──────────────────────┘
              │                          │
              ▼                          ▼
   progress-types.ts /          typingProgress (MỚI, tách riêng)
   progressStorage.ts           trong progressStorage.ts
```

**Module mới dự kiến** (đặt tên sơ bộ, chốt chi tiết ở `spec.md`):
- `src/game/engine/TypingMetrics.ts`: tính WPM/CPM/Accuracy, dùng chung cho mọi chế độ.
- `src/game/engine/TelexComposer.ts`: xử lý compose-buffer bộ gõ Telex.
- `src/data/typing-curriculum.ts`: định nghĩa các bài học theo hàng phím.
- `src/components/typing/VirtualKeyboardWithHands.tsx`: bàn phím ảo 2 bàn tay, tô sáng ngón theo `finger-guide.ts`.
- `src/components/typing/TypingDojoView.tsx`, `ParagraphTypingView.tsx`: màn hình luyện tập.
- Mở rộng `progress-types.ts`, `progressStorage.ts`: thêm `TypingProgress` (WPM history, accuracy, unlocked lessons).

**Module tái sử dụng, chỉ mở rộng**:
- `finger-guide.ts` (thêm tổ hợp Telex).
- `DailyQuestModal`, `GraduationModal`, `LeaderboardModal`, `leaderboardService.ts`, `MistakeVaultModal`.

---

## 4. Ràng buộc & Bất biến (Constraints & Invariants — tuân thủ `GEMINI.md`)

1. **Zero External Audio Assets**: mọi âm thanh gõ phím (tick, lỗi, hoàn thành bài) tổng hợp qua `SoundController.ts` hiện có, không thêm file mp3/wav.
2. **Strict TypeScript & Type Integrity**: không dùng `any`, `npm run build` phải 0 lỗi.
3. **Separation of Concerns**: logic đo lường/compose (`TypingMetrics.ts`, `TelexComposer.ts`) tách khỏi component React; không đụng vào `GameCanvas.tsx`/`InputHandler.ts` của Saga Map trừ khi thật cần thiết (mục tiêu: Typing Dojo là module song song, không phải refactor game bắn từ).
4. **Progress & Storage Resilience**: `TypingProgress` mới phải có fallback mặc định an toàn khi field chưa tồn tại ở người dùng cũ.
5. **Kid-Friendly UX & Accessibility**: bàn phím ảo 2 bàn tay phải responsive tốt trên iPad/tablet, giữ phong cách không gian vũ trụ nhất quán với toàn app.
6. **Animation Loop Idempotency**: nếu Speed Rush gõ câu dùng `requestAnimationFrame` để đếm giờ, phải dùng guard đồng bộ (`useRef`) khi trigger kết thúc phiên/thưởng, không dùng `setTimeout` đơn thuần.

---

## 5. Quyết định đã chốt cùng PO

| # | Câu hỏi | Quyết định |
|---|---|---|
| 1 | Vị trí đặt tính năng | Mode độc lập "Typing Dojo", không nhúng vào Saga Map; nội dung đoạn văn vẫn theo Realm hiện tại của người chơi |
| 2 | Công thức WPM | Chuẩn ngành: `(ký tự đúng / 5) / phút` |
| 3 | Có cần gõ tiếng Việt? | Có |
| 4 | Bộ gõ tiếng Việt | Telex |
| 5 | Unlock progression | Mở khoá Typing Dojo ngay từ đầu, độc lập hoàn toàn với tiến độ Saga Map |
| 6 | Nguồn đoạn văn luyện tập | Tự động sinh từ từ vựng đã học trong `chapters/`, đồng thời cho phép Admin **sửa/xoá/thêm thủ công** qua Admin Portal (giống pattern draft/publish của `vocabAdminService.ts`) |
| 7 | Ngưỡng diploma "Gõ 10 ngón" | Xem bảng chuẩn quốc tế theo Realm ở mục 6 bên dưới (điều chỉnh được sau khi có dữ liệu thật từ Analytics Dashboard) |

## 6. Ngưỡng Diploma "Chứng Chỉ Gõ 10 Ngón" theo Realm

**Phát hiện quan trọng khi rà soát code**: `AgeRealm` (`src/data/chapters/types.ts`) **đã có sẵn field `targetWpm`** được điền giá trị thực tế ở cả 8 realm (ví dụ Realm 1: `'15 - 25 WPM'`, Realm 6: `'65 - 85+ WPM'`) nhưng chưa được dùng ở đâu trong code — rõ ràng tính năng đo WPM đã được tính trước trong data model. Do đó ngưỡng diploma dưới đây **lấy trực tiếp cận dưới của `targetWpm` có sẵn**, không tự đặt số mới, để tránh 2 nguồn số liệu khác nhau. Accuracy tham khảo thang chuẩn quốc tế (typing.com/TypingClub), tăng dần theo độ khó nội dung của Realm.

| Realm | `targetWpm` có sẵn trong code | Ngưỡng diploma (WPM tối thiểu) | Ngưỡng Accuracy |
|---|---|---|---|
| 1 | 15 - 25 WPM | 15 | 85% |
| 2 | 25 - 35 WPM | 25 | 88% |
| 3 | 30 - 45 WPM | 30 | 90% |
| 4 | 40 - 55 WPM | 40 | 90% |
| 5 | 50 - 65 WPM | 50 | 92% |
| 6 | 65 - 85+ WPM | 65 | 93% |
| 7 | 35 - 55+ WPM | 35 | 95% |
| 8 | 35 - 55+ WPM | 35 | 95% |

**Hệ quả kỹ thuật bổ sung**: `TypingMetrics.ts`/`typing-curriculum.ts` nên đọc `targetWpm` trực tiếp từ `AgeRealm` (parse cận dưới của chuỗi, vd `'15 - 25 WPM'` → `15`) thay vì hard-code lại bảng riêng, để một nguồn dữ liệu duy nhất luôn nhất quán giữa Saga Map và Typing Dojo. Admin Portal cần thêm 1 tab "Đoạn Văn Luyện Gõ" (`TypingParagraphManager.tsx` + `typingParagraphAdminService.ts`), theo đúng luồng Staging & Publish Snapshot đã dùng cho Vocab — đoạn văn tự sinh lưu draft trên Firestore, Admin chỉnh sửa rồi publish snapshot xuống client.

---

## 7. Tiêu chí nghiệm thu (Acceptance Criteria)

- [x] Bản `intent.md` được thống nhất về phương hướng triển khai (tất cả câu hỏi mở đã chốt).
- [ ] Chuyển tiếp sang **Stage 2 (Design - `spec.md`)** để đặc tả chi tiết: wireframe Typing Dojo UI, cấu trúc dữ liệu `TypingProgress`/`typing-curriculum.ts`, luật compose Telex đầy đủ, schema Firestore cho đoạn văn luyện gõ, và API `typingParagraphAdminService.ts`.
