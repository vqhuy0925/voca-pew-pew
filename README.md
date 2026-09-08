# 🚀 Vocab Pew Pew — Space Adventure Edition for Kids

<div align="center">

![Vocab Pew Pew Badge](https://img.shields.io/badge/Game-Vocab%20Pew%20Pew-00f0ff?style=for-the-badge&logo=rocket&logoColor=white)
![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Web game luyện gõ từ vựng tiếng Anh tương tác cao, kết hợp phong cách phiêu lưu lộ trình học tập và cơ chế bắn thiên thạch 2D vui nhộn dành cho trẻ em (Lớp 1 – 3 / 6–10 tuổi).**

[Trải Nghiệm Trò Chơi](#-hướng-dẫn-cài-đặt--chạy-thử) • [Tính Năng Nổi Bật](#-tính-năng-nổi-bật) • [Kiến Trúc Kỹ Thuật](#-kiến-trúc-kỹ-thuật) • [Lộ Trình Học Tập](#-lộ-trình-học-tập-5-chương)

</div>

---

## 📖 Giới Thiệu Tổng Quan

**Vocab Pew Pew** được thiết kế dựa trên phương pháp học tiếng Anh **"Phonics-First & Gamification"**:
- Thay vì học từ vựng thụ động qua danh sách chữ, trẻ được hóa thân thành **Phi công vũ trụ nhí** bảo vệ trạm không gian.
- Tích hợp lộ trình học tập dạng **Saga Map (bản đồ phiêu lưu đường cong)** với hệ thống phần thưởng tích lũy (⭐ Sao, 🔥 Chuỗi ngày học Streak, 💎 Kim cương, ❤️ Trái tim).
- Tích hợp bạn đồng hành hoạt hình **Cosmo the Astro-Pup (🐶🚀)** liên tục cổ vũ, động viên và hướng dẫn trong suốt quá trình học.

---

## ✨ Tính Năng Nổi Bật

### 🗺️ 1. Lộ Trình Học Tập Saga Map
- **5 Chương học (Units) với hơn 20 màn chơi** được mở khóa tuần tự:
  - 🟢 **Standard Lesson**: Màn luyện tập gõ từ vựng cơ bản với tốc độ rơi êm ái.
  - ⚡ **Speed Rush**: Màn thử thách phản xạ và chuỗi combo điểm cao.
  - 🎁 **Treasure Chests**: Rương kho báu mở khóa kim cương thưởng và kinh nghiệm.
  - 👑 **Boss Monsters**: Đại chiến trùm cuối mỗi chương với các đợt từ vựng tổng hợp.
- **Lưu trữ tiến độ liên tục**: Toàn bộ sao đạt được (1–3 ⭐), điểm cao, kim cương và chuỗi ngày học được tự động đồng bộ qua `localStorage`.

### 🧒 2. Chu Trình 3 Pha Sư Phạm Thân Thiện Với Trẻ
1. **Pha 1 — Làm Quen Từ Mới (Warmup Flashcards)**:
   - Trước khi bắn, bé được xem thẻ từ vựng minh họa hoạt hình kèm biểu tượng Emoji, phiên âm Phonics và nghĩa tiếng Việt.
   - Nghe phát âm chuẩn giọng bản ngữ (US/UK) chỉ với 1 cú chạm.
2. **Pha 2 — Đấu Trường Gõ Phím (Pew-Pew Battle Arena)**:
   - Thanh tiến độ bài học trực quan hiển thị rõ ràng số từ còn lại.
   - Cơ chế **Lock-on Laser**: Gõ chữ cái đầu tiên để khóa mục tiêu, âm thanh phát âm từ tự động vang lên giúp ghi nhớ âm thanh gắn liền với chữ viết.
   - Hệ thống **5 Trái Tim (❤️❤️❤️❤️❤️)**: Trừ tim êm ái khi từ chạm đáy, kèm tùy chọn nạp tim miễn phí để bé không bao giờ bị ức chế tâm lý hay gián đoạn việc học.
3. **Pha 3 — Tuyên Dương & Sổ Dán Sticker Ôn Tập (Victory Celebration)**:
   - Hiệu ứng pháo hoa, chuỗi âm thanh Star Fanfare và chúc mừng của Mascot Cosmo.
   - Bảng ôn tập toàn bộ từ vựng vừa học để bé nghe lại phát âm trước khi chuyển sang màn kế tiếp.

### 🔊 3. Hệ Thống Âm Thanh & Giọng Nói Thuần Web API (Zero Asset Dependencies)
- **Web Audio API Synthesizer**: 100% hiệu ứng âm thanh (tiếng laser `Pew`, tiếng nổ, tiếng chuông sao, tiếng mở rương, nốt hợp âm combo) được tổng hợp trực tiếp bằng mã nguồn (Oscillators, Noise Buffers & Biquad Filters), không cần tải file MP3 ngoài giúp game khởi động tức thì.
- **Web Speech Synthesis API**: Tự động phát âm chuẩn tiếng Anh tự nhiên với âm điệu tươi vui, tốc độ phù hợp cho lứa tuổi tiểu học.

### 📱 4. Bàn Phím Ảo Tương Tác Cảm Ứng (iPad / Tablet Friendly)
- Bàn phím ảo 3D màu sắc sinh động, phân biệt trực quan giữa nguyên âm (Vowels) và phụ âm (Consonants).
- Tính năng **Glowing Hint Assist**: Tự động phát sáng chữ cái tiếp theo cần gõ nếu bé dừng lại suy nghĩ, giúp trẻ không bị nản lòng.

---

## 📚 Hệ Thống 8 Cõi Thiên Hà (Realms) — Từ Thiếu Nhi Đến Người Lớn & Giao Tiếp PO

| Cõi Thiên Hà (Realm) | Đối Tượng & Trình Độ | Nội Dung Trọng Tâm | Biểu Tượng |
| :--- | :--- | :--- | :---: |
| **Realm 1: Mầm Non & Khởi Động** | 7 - 8 Tuổi (Lớp 2 - 3) | Màu sắc, số đếm, động vật, trường học, thức ăn cơ bản (3-5 chữ cái) | 🌱 🎨 |
| **Realm 2: Khám Phá Tiểu Học** | 9 - 10 Tuổi (Lớp 4 - 5) | Gia đình, nghề nghiệp, thời tiết, thiên nhiên, hoạt động (4-7 chữ cái) | 🚀 🦁 |
| **Realm 3: Chuyển Cấp Tiểu Học** | 11 Tuổi (Lớp 5 - Tiền THCS) | Khoa học sơ khai, địa lý, lễ hội, phương tiện, thể thao (5-8 chữ cái) | 🛸 🔬 |
| **Realm 4: THCS Khám Phá** | 12 - 13 Tuổi (Lớp 6 - 7) | Lịch sử, sinh học, công nghệ cơ bản, xã hội, môi trường (6-10 chữ cái) | ⚡ 🌍 |
| **Realm 5: THCS Nâng Cao** | 14 - 15 Tuổi (Lớp 8 - 9) | Vật lý, hóa học, văn học, tư duy logic, thi vào lớp 10 (7-12 chữ cái) | 🔮 ⚛️ |
| **Realm 6: THPT & Học Thuật** | 16 - 18 Tuổi (Lớp 10 - 12 / IELTS) | Kinh tế học, học thuật nâng cao, IELTS/TOEFL, từ phức 8-15+ chữ cái | 👑 🎓 |
| **Realm 7: Tech Pro & Giao Tiếp PO** | **Người Lớn / Lập Trình Viên / QA** | **Luyện câu giao tiếp PO, Scrum Daily Standup, Sprint Planning, Requirement Clarification, Bug Triage & Demo** | 💼 💻 |
| **Realm 8: Đời Sống & Công Sở Người Lớn** | **Người Lớn / Đi Làm Toàn Diện** | **Luyện câu giao tiếp tự nhiên: Small Talk cà phê, phản biện lịch sự, ăn uống, du lịch, networking quốc tế** | 💬 ✈️ |

---

## 🏗️ Cấu Trúc Dự Án

```text
vocab-pew-pew/
├── public/                     # Static assets
├── src/
│   ├── components/             # React UI Components
│   │   ├── mascot/             # Animated Mascot Cosmo
│   │   │   └── MascotWidget.tsx
│   │   ├── modals/             # Interactive Modals (Warmup, Chest, Refill)
│   │   │   ├── ChestRewardModal.tsx
│   │   │   ├── RefillHeartsModal.tsx
│   │   │   └── WarmupModal.tsx
│   │   ├── path/               # Saga Map & Navigation
│   │   │   ├── LearningPathView.tsx
│   │   │   ├── LevelNodeButton.tsx
│   │   │   └── TopNavBar.tsx
│   │   ├── GameOverModal.tsx   # Friendly Oopsie Modal
│   │   ├── HUD.tsx             # In-game Top Progress Bar & Hearts
│   │   ├── PauseModal.tsx      # Pause Controller
│   │   ├── VictoryModal.tsx    # Lesson Complete & Sticker Review
│   │   ├── VirtualKeyboard.tsx # Touch / iPad 3D Keyboard
│   │   └── WordTargetBar.tsx   # Bouncy Word Lock-on Display
│   ├── data/                   # Data Models & Curriculums
│   │   ├── learning-path-data.ts # 5 Units, 20+ Levels, Boss & Chests
│   │   ├── progress-types.ts   # Progression & User State Types
│   │   ├── types.ts            # Core Game Engine Types
│   │   └── vocab-levels.ts     # Vocabulary Word Banks
│   ├── game/                   # 2D Canvas Game Engine
│   │   ├── engine/
│   │   │   ├── CollisionEngine.ts # Defense line collision checks
│   │   │   ├── EnemySpawner.ts    # Adaptive word spawn & descent
│   │   │   ├── InputHandler.ts    # Key typing & targeting processor
│   │   │   ├── ParticleSystem.ts  # Explosions, lasers, floating texts
│   │   │   ├── SoundController.ts # Web Audio API sound synthesizer
│   │   │   └── SpeechHelper.ts    # Native Web Speech synthesis
│   │   └── GameCanvas.tsx      # High-performance Canvas 2D Loop
│   ├── services/
│   │   └── progressStorage.ts  # LocalStorage state manager (Streak, XP, Gems)
│   ├── App.tsx                 # Main application state orchestrator
│   ├── index.css               # Neon glows, bouncy animations & styles
│   └── main.tsx                # React entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json                 # Production deployment routing
└── vite.config.ts
```

---

## 🛠️ Công Nghệ & Kỹ Thuật Sử Dụng

- **Frontend Core**: [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Build Tooling**: [Vite 5](https://vitejs.dev/) (HMR siêu tốc, tối ưu hóa kích thước bundle)
- **Game Engine**: HTML5 Canvas 2D với `requestAnimationFrame` 60 FPS mượt mà.
- **Styling & UI**: [Tailwind CSS 3](https://tailwindcss.com/) + [Lucide React Icons](https://lucide.dev/) + Font chữ tròn thân thiện `Fredoka`.
- **Audio & Voice**: Web Audio API (Oscillator/Gain synthesis) + Web Speech API (`SpeechSynthesis`).
- **State & Storage**: React Hooks (`useCallback`, `useRef`, `useState`) kết hợp đồng bộ hóa `localStorage`.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Thử

### 1. Yêu cầu môi trường
- [Node.js](https://nodejs.org/) (phiên bản 18.0 trở lên)
- Trình quản lý gói `npm` hoặc `yarn` / `pnpm`

### 2. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 3. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt và truy cập `http://localhost:3000` để bắt đầu trải nghiệm.

### 4. Kiểm tra TypeScript & Build Production
```bash
npm run build
```
Thư mục xuất bản hoàn thiện sẵn sàng tại `dist/`.

---

## 🌐 Hướng Dẫn Deploy Lên Vercel

1. Đẩy code lên GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete child-friendly upgrade"
   git push origin main
   ```
2. Truy cập [Vercel](https://vercel.com/), chọn **Add New Project** và liên kết với GitHub repository.
3. Vercel sẽ tự động đọc file cấu hình [vercel.json](file:///Users/huyvu/Workspace/vocab-pew-pew/vercel.json) và hoàn tất deploy trong vài giây.

---

## 📄 Bản Quyền & Giấy Phép

Dự án được xây dựng với mục tiêu giáo dục, mở mã nguồn dưới giấy phép [MIT License](LICENSE).

<div align="center">
  <sub>Được phát triển với niềm đam mê dành cho giáo dục mầm non và tiểu học ❤️🚀</sub>
</div>
