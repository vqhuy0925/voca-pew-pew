# Kế Hoạch Triển Khai (Implementation Plan) - Admin Vocab & Analytics

Xây dựng module Admin quản trị ngân hàng từ vựng (CRUD, Phonics, Import/Export, Staging & Snapshot Publishing) và Trung tâm thống kê Analytics người dùng (KPIs, Biểu đồ Realm, User Explorer) kết nối trực tiếp với Firebase Firestore.

## User Review Required

> [!NOTE]
> - **Cổng vào Admin**: Hỗ trợ phím tắt `Ctrl + Shift + A` (hoặc `Cmd + Shift + A` trên Mac) và một nút Admin tinh tế ở Footer màn hình Landing/Settings.
> - **Zero External Audio**: Trình nghe thử phát âm từ vựng trong Admin sử dụng trực tiếp Web Speech API (`SpeechHelper.ts`).
> - **Tối ưu Quota**: Snapshot từ vựng được cache trong `localStorage` và chỉ tải lại khi `versionId` trên Firestore thay đổi.

---

## Proposed Changes

Grouped by component and layer:

### 1. Data & Firebase Services Layer

#### [NEW] [adminAuthService.ts](file:///Users/huyvu/Workspace/vocab-pew-pew/src/services/firebase/adminAuthService.ts)
- `adminSignIn(email, password)`: Đăng nhập Firebase Auth bằng Email/Password.
- `adminSignOut()`: Đăng xuất khỏi phiên quản trị.
- `subscribeAdminAuth(callback)`: Lắng nghe trạng thái đăng nhập của Admin.

#### [NEW] [vocabAdminService.ts](file:///Users/huyvu/Workspace/vocab-pew-pew/src/services/firebase/vocabAdminService.ts)
- `loadVocabDraft()`: Tải bản thảo từ `vocab_drafts/current`, tự động nạp từ `learning-path-data.ts` nếu chưa có bản thảo trên cloud.
- `saveVocabDraft(realms)`: Lưu bản thảo lên Firestore.
- `publishVocabSnapshot(realms)`: Tạo snapshot mới với `versionId` tại `vocab_snapshots/latest`.
- `exportVocabToJson(realms)` / `exportVocabToCsv(realms)`: Xuất dữ liệu ra file.
- `importVocabFromJson(jsonStr)` / `importVocabFromCsv(csvStr)`: Nạp và kiểm tra dữ liệu từ vựng.

#### [NEW] [analyticsAdminService.ts](file:///Users/huyvu/Workspace/vocab-pew-pew/src/services/firebase/analyticsAdminService.ts)
- `fetchUserAnalytics()`: Truy vấn danh sách người dùng từ Firestore `users` (hỗ trợ limit 50-100 để tiết kiệm quota).
- `computeAnalyticsKpis(users)`: Tính toán DAU, WAU, Total Stars, Words Mastered, Realm Distribution, Mascot & Theme metrics.

#### [NEW] [vocabLoader.ts](file:///Users/huyvu/Workspace/vocab-pew-pew/src/services/vocabLoader.ts)
- `initVocabData()`: Kiểm tra `versionId` của `vocab_snapshots/latest`, cập nhật cache nếu có version mới.
- `getActiveRealms()`: Trả về danh sách Realm hiện hành (từ Snapshot Cache hoặc Static Fallback).

---

### 2. Admin UI Components

#### [NEW] [AdminPortal.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/AdminPortal.tsx)
- Khung điều hướng chính (Top Nav với các tab: Quản Lý Từ Vựng, Thống Kê & Báo Cáo, Quản Lý Học Viên, nút Publish Snapshot & Sign Out).

#### [NEW] [AdminLoginModal.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/AdminLoginModal.tsx)
- Form đăng nhập Email & Mật khẩu kết nối Firebase Auth, giao diện Space Command đẹp mắt.

#### [NEW] [VocabManager.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/VocabManager.tsx)
- Bộ lọc Realm / Unit / Level, danh sách thẻ từ vựng với nút sửa/xóa/nghe thử, nút thêm từ mới, nút Import/Export.

#### [NEW] [WordEditorModal.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/WordEditorModal.tsx)
- Modal chỉnh sửa chi tiết: Từ tiếng Anh, Nghĩa tiếng Việt, Emoji, Phiên âm IPA, Chủ đề, Phonics và nút Test phát âm Web Speech API.

#### [NEW] [AnalyticsDashboard.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/AnalyticsDashboard.tsx)
- Thẻ KPIs neon (Tổng học viên, DAU, WAU, Mastered Words, Tổng XP), biểu đồ phân bổ Realm trực quan.

#### [NEW] [UserExplorer.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/admin/UserExplorer.tsx)
- Bảng danh sách học viên với tìm kiếm tên/tag, phân trang, xem chi tiết tiến độ.

---

### 3. Application Integration

#### [MODIFY] [App.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/App.tsx)
- Lắng nghe phím tắt `Ctrl + Shift + A` để mở Admin Portal.
- Tích hợp `vocabLoader` khi khởi động ứng dụng.

#### [MODIFY] [LandingPage.tsx](file:///Users/huyvu/Workspace/vocab-pew-pew/src/components/landing/LandingPage.tsx)
- Thêm link/icon nhỏ ở footer để mở Admin Portal.

---

## Verification Plan

### Automated Build & Type Check
- Chạy `npm run build` (`tsc && vite build`) để đảm bảo 0 lỗi TypeScript và 0 lỗi compile.

### Manual Verification
1. **Admin Login**: Thử đăng nhập Email/Password với Firebase Auth.
2. **Vocab Management**:
   - Thêm/sửa từ vựng mới trong Realm 1.
   - Bấm nút "Nghe thử phát âm" để kiểm tra Web Speech API.
   - Bấm "🚀 Phát Hành Bản Mới" (Publish Snapshot).
3. **Analytics**:
   - Kiểm tra hiển thị KPI cards và biểu đồ phân bổ người dùng từ Firestore `users`.
   - Tìm kiếm học viên theo Player Tag trong User Explorer.
4. **Client Fallback**:
   - Kiểm tra game vẫn tải bình thường ở chế độ offline và khi online nhận từ mới từ Snapshot.
