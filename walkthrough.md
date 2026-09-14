# Walkthrough: Admin Quản Trị Từ Vựng & Analytics Người Dùng Firebase

Đã hoàn thành xuất sắc toàn bộ các hạng mục từ **Stage 1 (Intent)** $\rightarrow$ **Stage 2 (Spec)** $\rightarrow$ **Stage 3 (Build)** $\rightarrow$ **Stage 4 (Verification)**.

---

## 1. Các Tính Năng Đã Triển Khai

### A. Phân hệ Xác Thực Admin & Bảo Vệ Phiên Làm Việc
- [AdminLoginModal.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/AdminLoginModal.tsx) & [adminAuthService.ts](file:///Users/huyvu/Workspace/vocab-pew-pew/src/services/firebase/adminAuthService.ts):
  - Đăng nhập an toàn trực tiếp bằng **Email & Password** tạo trong Firebase Authentication Console.
  - Tự động duy trì phiên đăng nhập và hỗ trợ nút Đăng xuất nhanh chóng.
  - Cách mở trang Admin: Nhấn tổ hợp phím **`Ctrl + Shift + A`** (hoặc `Cmd + Shift + A` trên Mac) hoặc bấm nút **`[Admin]`** ở chân trang (Footer) của màn hình Landing.

### B. Phân hệ Quản Trị Từ Vựng (Vocabulary CMS)
- [VocabManager.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/VocabManager.tsx) & [WordEditorModal.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/WordEditorModal.tsx):
  - Cây điều hướng trực quan theo 4 cấp độ: **8 Age Realms $\rightarrow$ Units $\rightarrow$ Levels $\rightarrow$ Words**.
  - **CRUD Từ vựng**: Thêm từ mới, chỉnh sửa nghĩa tiếng Việt, emoji, phiên âm IPA, chủ đề category.
  - **Nghe thử phát âm AI**: Tích hợp nút nghe phát âm trực tiếp chuẩn Web Speech API (`SpeechHelper.ts`), tuyệt đối không tải file mp3 rác (Zero External Audio invariant).
  - **Batch Import / Export**:
    - `Export JSON`: Sao lưu toàn bộ cấu trúc 8 Realm thành file JSON.
    - `Export CSV`: Xuất bảng từ vựng dạng bảng tính tương thích Excel.
    - `Import JSON`: Tải lên và validate cấu trúc JSON từ máy tính.
  - **Lưu Bản Thảo (Draft)**: Lưu trạng thái nháp lên Firestore `vocab_drafts/current`.

### C. Cơ Chế Staging & Phát Hành Snapshot (Publish Engine)
- [vocabAdminService.ts](file:///Users/huyvu/Workspace/vocab-pew-pew/src/services/firebase/vocabAdminService.ts) & [vocabLoader.ts](file:///Users/huyvu/Workspace/vocab-pew-pew/src/services/vocabLoader.ts):
  - Nút **"🚀 Phát Hành Snapshot"** tạo phiên bản mới (ví dụ: `v20260914_1114`) lưu tại `vocab_snapshots/latest`.
  - Client học sinh tự động kiểm tra version snapshot khi khởi động game và lưu cache vào `localStorage`.
  - Tự động fallback 100% về static code nếu người chơi đang offline hoặc mất kết nối mạng.

### D. Trung Tâm Thống Kê & Phân Tích (Analytics & User Explorer)
- [AnalyticsDashboard.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/AnalyticsDashboard.tsx) & [analyticsAdminService.ts](file:///Users/huyvu/Workspace/vocab-pew-pew/src/services/firebase/analyticsAdminService.ts):
  - **KPIs**: Tổng học sinh, DAU (24h qua), WAU (7 ngày qua), Tổng từ đã master, Tổng Sao ⭐ & XP ⚡, Streak trung bình.
  - **Biểu đồ phân bổ**: Phân bổ học sinh theo 8 Realm, sở thích linh thú (Cosmo Dog, Luna Cat, Stella Unicorn...).
- [UserExplorer.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/UserExplorer.tsx):
  - Bảng danh sách học viên trực quan với tìm kiếm theo Player Tag hoặc Tên học sinh, lọc theo Realm.
  - Modal xem chi tiết chỉ số học tập của từng học viên.

---

## 2. Bằng Chứng Kiểm Thử & Biên Dịch (Verification Evidence)

Chạy lệnh kiểm thử build toàn diện:
```bash
npm run build
```
**Kết quả**:
```text
> vocab-pew-pew@1.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
✓ 1669 modules transformed.
rendering chunks...
dist/index.html                                2.69 kB
dist/assets/index-CgOkz6Wl.js                410.45 kB
dist/assets/vendor-firebase-4zzXnm9m.js      568.18 kB
dist/assets/curriculum-chapters-NMs4NrkH.js  653.08 kB
✓ built in 2.09s
PWA v1.3.0 generateSW: 19 entries precached
```
$\rightarrow$ **0 Type errors**, **0 Build warnings**.

---

## 3. Hướng Dẫn Sử Dụng Nhanh Cho Admin

1. **Tạo tài khoản Admin trên Firebase**:
   - Mở Firebase Console $\rightarrow$ **Authentication** $\rightarrow$ Tab **Users** $\rightarrow$ Bấm **Add user** (Nhập Email & Mật khẩu bạn muốn).
2. **Đăng nhập vào Admin Portal**:
   - Mở ứng dụng Vocab Pew Pew.
   - Nhấn phím tắt **`Ctrl + Shift + A`** (hoặc `Cmd + Shift + A` trên Mac), hoặc cuộn xuống chân trang Landing bấm nút **`[Admin]`**.
   - Nhập Email & Mật khẩu vừa tạo.
3. **Biên tập & Phát hành từ vựng**:
   - Chọn Realm $\rightarrow$ Unit $\rightarrow$ Level muốn chỉnh sửa.
   - Bấm **"Thêm Từ"** hoặc biểu tượng cây bút **"Sửa"** trên thẻ từ vựng $\rightarrow$ Nhấn **"Nghe Thử"** để kiểm tra âm thanh.
   - Bấm **"Lưu Bản Thảo"** khi đang biên tập nháp.
   - Bấm **"🚀 Phát Hành Snapshot"** để cập nhật cho toàn bộ học sinh.
