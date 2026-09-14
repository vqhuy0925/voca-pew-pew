# Intent: Xây dựng Trang Admin Quản trị Từ Vựng & Analytics Người Dùng qua Firebase

> **Giai đoạn**: Stage 1 - Plan (Intent Capture)  
> **Dự án**: Vocab Pew Pew (`vocab-pew-pew`)  
> **Người đề xuất**: Product Owner / Tech Lead  
> **Trạng thái**: Chờ duyệt (Pending PO Review)

---

## 1. Bối cảnh & Vấn đề (Problem Statement)

1. **Dữ liệu từ vựng bị tĩnh (Hardcoded in Client Codebase)**:
   - Toàn bộ từ vựng, phiên âm IPA, dịch nghĩa tiếng Việt, emoji, danh mục chủ đề và 8 Realm hiện đang được khai báo tĩnh trong các file TypeScript (`src/data/chapters/`, `src/data/vocab-levels.ts`).
   - Mỗi lần muốn bổ sung từ mới, sửa lỗi chính tả/nghĩa tiếng Việt, tinh chỉnh độ khó hoặc tạo màn chơi mới đều yêu cầu kỹ sư can thiệp vào code và deploy lại toàn bộ ứng dụng web.
   - Chưa có giao diện trực quan dành cho người quản trị nội dung / giáo viên để thêm, sửa, xóa, tìm kiếm và kiểm tra phát âm của từ vựng.

2. **Thiếu cái nhìn trực quan về hành vi và tiến độ học tập của người dùng (Lack of Analytics Dashboard)**:
   - Mặc dù hệ thống đã có tính năng Cloud Sync đẩy dữ liệu tiến độ người chơi lên Firestore collection `users` (`src/services/firebase/cloudSyncService.ts`), dữ liệu này chỉ mới phục vụ việc đồng bộ cá nhân và bảng xếp hạng tuần (Leaderboard).
   - Chưa có trung tâm theo dõi (Dashboard) để quan sát:
     - Số lượng người học tích cực (DAU / WAU).
     - Tỷ lệ vượt qua các Realm & Chapter (Drop-off Rate / Phễu học tập).
     - Thống kê phân bố độ tuổi, cấp độ, số từ đã thành thạo (Words Mastered), chuỗi ngày học (Streak).
     - Danh sách học viên và hoạt động gần nhất để hỗ trợ học viên khi gặp sự cố đồng bộ.

---

## 2. Mục tiêu & Kết quả mong đợi (Desired Outcomes)

### A. Phân hệ Quản trị Từ vựng (Vocabulary CMS Portal)
- **Quản lý phân cấp học tập**: Duyệt và chỉnh sửa danh mục theo cây cấu trúc `Realm` $\rightarrow$ `Unit` $\rightarrow$ `Chapter` $\rightarrow$ `Level` $\rightarrow$ `Word`.
- **Thao tác Từ vựng (CRUD & Phonics)**:
  - Thêm, sửa, xóa từ vựng (Word, Meaning Vi, Category, Phonics/Word Family, Emoji, Audio Pronunciation preview).
  - Tích hợp tính năng thử nghe phát âm trực tiếp ngay trên trang Admin bằng Web Speech API (`SpeechHelper.ts`).
- **Import / Export linh hoạt**:
  - Hỗ trợ xuất dữ liệu ra file JSON / CSV để sao lưu hoặc biên tập hàng loạt.
  - Hỗ trợ nhập (Import/Batch Upload) từ vựng từ file CSV/Excel/JSON để tiết kiệm thời gian nhập liệu.
- **Cơ chế Hybrid Cloud & Offline Resilience**:
  - Khi online: Ưu tiên tải dữ liệu từ vựng cập nhật mới nhất từ Firestore (kèm caching thông minh vào LocalStorage/IndexedDB).
  - Khi offline hoặc Firebase bị ngắt kết nối: Ứng dụng tự động fallback về ngân hàng từ vựng tĩnh có sẵn trong mã nguồn, đảm bảo trò chơi không bao giờ bị gián đoạn.

### B. Phân hệ Thống kê & Phân tích Học tập (User & Learning Analytics)
- **Tổng quan chỉ số chính (Executive KPIs)**:
  - Tổng số học viên đã đăng ký / tham gia hệ thống.
  - Active Users (DAU theo ngày, WAU theo tuần).
  - Tổng số từ vựng toàn hệ thống đã được ghi nhớ thành công.
  - Phân bổ người học theo Realm (Realm 1 đến Realm 8).
- **Phân tích hành vi & Hiệu quả học tập**:
  - Biểu đồ phân bổ sao, XP, streak học tập trung bình.
  - Theo dõi tỷ lệ hoàn thành theo từng Realm để phát hiện các bài học quá khó hoặc gây nản lòng (Choke points).
- **Danh sách & Chi tiết Người học (User Explorer)**:
  - Bảng danh sách học viên (Player Tag, Tên, Tuổi, Realm đang học, Tổng XP, Sao, Ngày hoạt động cuối).
  - Khả năng lọc, tìm kiếm theo `playerTag` hoặc `userName`.
  - Xem chi tiết tiến độ từng level của học viên để hỗ trợ giải đáp phụ huynh/học sinh.

### C. Phân quyền & Bảo mật (Access Control & Security)
- Phân định rõ ràng giữa người học (Player) và người quản trị (Admin).
- Cổng đăng nhập Admin an toàn (Firebase Auth Email/Password hoặc Whitelist Admin UID) với màn hình đăng nhập chuyên biệt, không ảnh hưởng đến giao diện Arcade của học sinh.

---

## 3. Phạm vi hệ thống & Kiến trúc bị ảnh hưởng (Affected Systems)

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Vocab Pew Pew Web App                         │
├───────────────────────────────────┬────────────────────────────────────┤
│         🎮 Player Arcade App       │        🛡️ Admin & Analytics Portal  │
│  - Learning Path & Game Canvas    │  - Vocab CMS (CRUD / Import/Export)│
│  - Offline Fallback Vocab Data    │  - Realtime & Batch Analytics      │
│  - Cloud Sync (User Progress)     │  - User Explorer & Health Monitor  │
└─────────────────┬─────────────────┴──────────────────┬─────────────────┘
                  │                                    │
                  ▼                                    ▼
       ┌─────────────────────────────────────────────────────┐
       │                 Firebase Cloud Engine               │
       ├──────────────────┬────────────────┬─────────────────┤
       │  Firebase Auth   │ Firestore DB   │ Firebase        │
       │  (Player & Admin)│ - users        │ Analytics       │
       │                  │ - vocab_realms │ (Custom Events) │
       │                  │ - vocab_words  │                 │
       │                  │ - system_meta  │                 │
       └──────────────────┴────────────────┴─────────────────┘
```

1. **Client Frontend**:
   - Thêm module giao diện Admin (có thể tải lười - Lazy Loading để giữ bundle ban đầu của game siêu nhẹ).
   - Component Admin Dashboard, Vocab Manager, Analytics Charts, User Explorer.
   - Thêm bộ điều hướng bảo vệ (Route/State guard) cho Admin.
2. **Data & Services Layer**:
   - `src/services/firebase/adminAuthService.ts`: Xử lý xác thực Admin.
   - `src/services/firebase/vocabAdminService.ts`: Đọc/Ghi dữ liệu từ vựng lên Firestore.
   - `src/services/firebase/analyticsService.ts`: Truy vấn và tổng hợp số liệu người dùng từ Firestore `users` collection và Firebase Analytics.
   - `src/services/vocabLoader.ts`: Cung cấp cơ chế tải từ vựng linh hoạt (Cloud First $\rightarrow$ Cache $\rightarrow$ Fallback Static).

---

## 4. Ràng buộc & Bất biến (Constraints & Invariants)

1. **Tuân thủ quy chuẩn dự án (`GEMINI.md`)**:
   - **Zero External Audio Assets**: Tiếp tục sử dụng Web Speech API (`SpeechHelper.ts`) cho tính năng preview phát âm của Admin, không tải các file mp3 ngoài.
   - **Strict TypeScript & Type Integrity**: Khai báo type an toàn, không sử dụng `any`, đảm bảo `npm run build` không lỗi.
   - **Kid-Friendly & Responsive Ergonomics**: Giao diện Admin chuyên nghiệp nhưng nhất quán về phong cách thiết kế không gian vũ trụ, hỗ trợ tốt cả iPad/Tablet lẫn Desktop/Laptop.
2. **Tối ưu chi phí & Quota Firestore**:
   - Truy vấn Firestore có giới hạn (`limit`, `pagination`), tránh `getDocs` quét toàn bộ cơ sở dữ liệu không cần thiết.
   - Sử dụng Cache thông minh cho dữ liệu từ vựng (chỉ tải lại khi có phiên bản `vocab_version` mới).
3. **An toàn tiến độ người chơi (Progress Resilience)**:
   - Các thay đổi về cấu trúc từ vựng không được làm hỏng tiến độ đã lưu trong LocalStorage hay Firestore của các học sinh hiện tại.

---

## 5. Câu hỏi mở & Lựa chọn kiến trúc cần thống nhất (Open Questions & Trade-offs)

> [!IMPORTANT]
> **Câu hỏi 1: Cơ chế xác thực Admin (Admin Authentication Strategy)**
> - **Lựa chọn A (Khuyến nghị)**: Đăng nhập Firebase Auth (Email/Password) kết hợp danh sách Whitelist Admin Emails/UIDs trong Firestore hoặc biến môi trường `VITE_ADMIN_EMAILS`.
> - **Lựa chọn B**: Sử dụng mã PIN/Secret Key nội bộ lưu trong Environment Variables (Đơn giản, nhanh, nhưng ít bảo mật hơn nếu lộ key trên client).
> - **Lựa chọn C**: Tích hợp Firebase Custom Claims (Cần Cloud Functions hoặc backend riêng).

> [!TIP]
> **Câu hỏi 2: Mô hình phát hành từ vựng lên ứng dụng học sinh (Vocab Deployment Workflow)**
> - **Lựa chọn A (Live Sync)**: Thay đổi trên Admin được ghi trực tiếp vào Firestore `vocab_words`, client học sinh tự động nhận từ mới khi mở app.
> - **Lựa chọn B (Staging & Publish Snapshot - Khuyến nghị)**: Admin biên tập nháp trên Firestore, sau đó bấm nút "Publish Version" tạo snapshot mới. Client chỉ tải snapshot mới khi có phiên bản cập nhật.
> - **Lựa chọn C (CMS Export to Code)**: Admin chỉnh sửa và kiểm tra trực quan, sau đó xuất ra file `.ts` / `.json` để commit vào repository (đảm bảo 100% offline và 0 quota read Firestore).

> [!NOTE]
> **Câu hỏi 3: Phương thức thu thập Analytics**
> - **Lựa chọn A (Khuyến nghị)**: Tổng hợp trực tiếp từ collection `users` hiện tại (đã có sẵn XP, level, sao, streak, realm, wordsMastered, lastActiveDate) để cung cấp dashboard thống kê tức thì không cần thêm cấu hình phức tạp.
> - **Lựa chọn B (Mở rộng thêm)**: Gắn thêm các custom events qua `getAnalytics()` (`level_failed`, `word_typed_incorrect`) để xem report chuyên sâu trên Google Analytics Console.

---

## 6. Tiêu chí nghiệm thu (Acceptance Criteria)

- [ ] Bản `intent.md` được thống nhất về phương hướng triển khai.
- [ ] Chuyển tiếp sang **Stage 2 (Design - `spec.md`)** để đặc tả chi tiết giao diện wireframe, Data Schema Firestore, API Contracts và Security Rules.
