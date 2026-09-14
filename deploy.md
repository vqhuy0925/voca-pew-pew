# Release & Deployment: Admin Vocab CMS & Firebase Analytics (v1.1.0)

> **Giai đoạn**: Stage 5 - Deploy (Multi-Tier Governance & Release Gate)  
> **Dự án**: Vocab Pew Pew (`vocab-pew-pew`)  
> **Phiên bản phát hành**: `v1.1.0`  
> **Trạng thái**: Chờ phê duyệt Release (Pending Human Authorization)

---

## 1. Tóm Tắt Bản Phát Hành (Release Highlights)

Bản phát hành `v1.1.0` mang đến bộ công cụ quản trị hoàn chỉnh dành cho Quản trị viên và Giáo viên:

1. **Phân hệ Quản trị Từ Vựng (Vocabulary CMS)**:
   - Quản lý cây phân cấp 4 tầng: `8 Age Realms` $\rightarrow$ `Units` $\rightarrow$ `Levels` $\rightarrow$ `Words`.
   - Biên tập từ vựng, nghĩa tiếng Việt, emoji, phiên âm IPA, chủ đề.
   - Thử nghe phát âm chuẩn bằng Web Speech API (`SpeechHelper.ts`).
   - Sao lưu / Nạp dữ liệu qua tính năng `Export JSON/CSV` và `Import JSON`.
2. **Cơ chế Staging & Snapshot Publishing**:
   - Lưu bản thảo nháp trên Firestore `vocab_drafts/current`.
   - Nút **"🚀 Phát Hành Snapshot"** tạo phiên bản mới `vocab_snapshots/latest`.
   - Học sinh tự động cập nhật từ vựng mới khi online và lưu cache vào `localStorage`, fallback 100% về static code khi offline (bảo vệ tối đa hạn ngạch Firestore).
3. **Trung tâm Thống kê & Phân tích (Analytics Dashboard & User Explorer)**:
   - Theo dõi các chỉ số quan trọng: Tổng học sinh, DAU (hôm nay), WAU (tuần này), Tổng từ master, Tổng Sao ⭐ & XP ⚡, Streak trung bình.
   - Biểu đồ phân bổ học sinh theo 8 Realm và linh thú ưa chuộng.
   - Bảng tra cứu học viên (User Explorer) kèm tìm kiếm theo Tên hoặc Player Tag.
4. **Bảo mật & Điều hướng**:
   - Xác thực Admin bằng Email/Password qua Firebase Auth.
   - Phím tắt nhanh **`Ctrl + Shift + A`** (hoặc `Cmd + Shift + A`) hoặc nút **`[Admin]`** ở chân trang.

---

## 2. Khuyến Nghị Cấu Hình Firestore Security Rules

Để đảm bảo học sinh chỉ có quyền đọc từ vựng và chỉ có tài khoản Admin đăng nhập bằng Email/Password mới có quyền ghi vào `vocab_drafts` và `vocab_snapshots`, hãy cập nhật Firestore Rules trên Firebase Console như sau:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 1. Dữ liệu tiến độ người chơi (học sinh tự cập nhật của mình)
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    
    // 2. Bản thảo từ vựng (chỉ Admin đăng nhập Email/Password mới được xem và sửa)
    match /vocab_drafts/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.firebase.sign_in_provider == 'password';
    }
    
    // 3. Snapshot phát hành (tất cả học sinh được phép đọc, chỉ Admin mới được ghi)
    match /vocab_snapshots/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.firebase.sign_in_provider == 'password';
    }
  }
}
```

---

## 3. Danh Mục Thay Đổi (Git Commit Plan)

Dự kiến chia thành các commit chuẩn Conventional Commits:

1. **`feat(services): add admin auth, vocab publisher, and analytics aggregation services`**
   - `src/services/firebase/adminAuthService.ts`
   - `src/services/firebase/vocabAdminService.ts`
   - `src/services/firebase/analyticsAdminService.ts`
   - `src/services/vocabLoader.ts`
   - `src/data/learning-path-data.ts`
2. **`feat(admin-ui): create admin portal, vocab manager, analytics dashboard and user explorer`**
   - `src/components/admin/AdminLoginModal.tsx`
   - `src/components/admin/WordEditorModal.tsx`
   - `src/components/admin/VocabManager.tsx`
   - `src/components/admin/AnalyticsDashboard.tsx`
   - `src/components/admin/UserExplorer.tsx`
   - `src/components/admin/AdminPortal.tsx`
3. **`feat(app): integrate admin entry point, keyboard shortcut and vocab snapshot loader`**
   - `src/App.tsx`
   - `src/components/landing/LandingPage.tsx`
4. **`docs(sdlc): add intent, spec, plan, task, walkthrough and deploy artifacts`**
   - `intent.md`, `spec.md`, `plan.md`, `task.md`, `walkthrough.md`, `deploy.md`

---

## 4. Cổng Phê Duyệt Triển Khai (Release Gate)

> [!IMPORTANT]
> Toàn bộ mã nguồn đã được biên dịch thành công (`npm run build` đạt 0 lỗi).  
> Bạn có muốn thực hiện các commit trên vào Git repository không?
