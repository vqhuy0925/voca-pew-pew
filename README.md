# 🚀 Vocab Pew Pew - Game Luyện Gõ Từ Vựng Tiếng Anh Lớp 2

**Vocab Pew Pew** là một web game arcade 2D sống động giúp các bé 7 tuổi (lớp 2) vừa chơi game vừa học thuộc từ vựng tiếng Anh, rèn luyện phản xạ gõ phím và phát âm chuẩn bản ngữ.

---

## ✨ Điểm Nổi Bật

- 🎮 **Cơ chế Gõ & Khóa Mục Tiêu (Lock-on Laser)**: Bé chỉ cần gõ chữ cái đầu tiên của từ, phi thuyền sẽ tự động khóa mục tiêu và bắn tia laser `Pew Pew` từng chữ cái.
- 🔊 **Web Audio Synthesizer**: Tự động tạo hiệu ứng âm thanh cổ điển retro (tiếng laser, tiếng nổ, tiếng chuông chuỗi combo) hoàn toàn bằng code Web Audio API.
- 🗣️ **Web Speech API**: Tự động phát âm chuẩn tiếng Anh giọng bản ngữ mỗi khi bắn hạ thành công một từ vựng.
- 🎨 **Giao diện & Hiệu ứng vũ trụ sống động**: Bụi sao parallax, pháo hoa nổ chữ rực rỡ, thiết kế font chữ to rõ, thân thiện với trẻ em.
- 📚 **Bộ từ vựng lớp 2 phong phú**: Chia theo 4 chủ đề (*Màu sắc & Số đếm*, *Động vật*, *Trường học & Đồ chơi*, *Món ngon*), kèm nghĩa tiếng Việt và biểu tượng Emoji.
- 📱 **Hỗ trợ Đa Nền Tảng**: Chơi mượt mà trên máy tính bằng bàn phím vật lý hoặc trên iPad/tablet thông qua bàn phím ảo tích hợp.
- ⭐ **Bảng Ôn Tập & Đánh Giá 3 Sao**: Sau mỗi màn chơi, bé có thể xem lại toàn bộ từ vựng và bấm vào từng từ để nghe lại phát âm.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/)
- **Đồ họa**: HTML5 Canvas 2D Engine
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **Deploy**: Sẵn sàng deploy lên [Vercel](https://vercel.com/) với file `vercel.json`

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Thử

### 1. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Trình duyệt sẽ tự động mở tại `http://localhost:3000`.

### 3. Build Production
```bash
npm run build
```

---

## 🌐 Hướng Dẫn Deploy Lên Vercel

1. Đẩy code lên GitHub repository của bạn:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Vocab Pew Pew game"
   git branch -M main
   git remote add origin <URL-GITHUB-REPO-CỦA-BẠN>
   git push -u origin main
   ```
2. Truy cập [Vercel](https://vercel.com/), chọn **Add New Project** và liên kết với repo GitHub vừa tạo.
3. Vercel sẽ tự động nhận diện cấu hình Vite và deploy bản live chỉ sau vài giây!
