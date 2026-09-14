# Nhiệm vụ Triển Khai (Tasks)

- [x] **1. Firebase Services & Data Layer**
  - [x] Tạo `src/services/firebase/adminAuthService.ts` (Login Email/Password, Sign Out, Auth State)
  - [x] Tạo `src/services/firebase/vocabAdminService.ts` (Drafts CRUD, Publish Snapshot, Import/Export)
  - [x] Tạo `src/services/firebase/analyticsAdminService.ts` (Fetch Users, Aggregate KPIs, Realm Stats)
  - [x] Tạo `src/services/vocabLoader.ts` (Snapshot check, local caching, fallback loader)
- [x] **2. Admin UI Components**
  - [x] Tạo `src/components/admin/AdminLoginModal.tsx`
  - [x] Tạo `src/components/admin/WordEditorModal.tsx` (kèm Web Speech audio test)
  - [x] Tạo `src/components/admin/VocabManager.tsx` (Tree navigation, Level/Word CRUD, Batch Import/Export)
  - [x] Tạo `src/components/admin/AnalyticsDashboard.tsx` (KPIs, Charts, Distribution)
  - [x] Tạo `src/components/admin/UserExplorer.tsx` (User list, Search, Detail Modal)
  - [x] Tạo `src/components/admin/AdminPortal.tsx` (Container & Navigation)
- [x] **3. Application Integration**
  - [x] Tích hợp phím tắt mở Admin Portal (`Ctrl+Shift+A` / `Cmd+Shift+A`) trong `App.tsx`
  - [x] Thêm nút truy cập Admin trong `LandingPage.tsx`
  - [x] Cập nhật `App.tsx` sử dụng `vocabLoader` và kiểm tra snapshot background
- [x] **4. Verification & Testing**
  - [x] Chạy `npm run build` kiểm tra TypeScript & Vite compilation (0 errors)
