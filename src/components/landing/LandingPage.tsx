import React, { useState } from 'react';
import {
  Rocket,
  Volume2,
  VolumeX,
  Sparkles,
  Shield,
  Headphones,
  BookOpen,
  Keyboard,
  ArrowRight,
  User,
  Play
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { UserProgress } from '../../data/progress-types';

interface LandingPageProps {
  progress: UserProgress;
  onStartJourney: () => void;
  onOpenProfile?: () => void;
  isReturningUser?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  progress,
  onStartJourney,
  onOpenProfile,
  isReturningUser = false
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => !progress.soundEnabled);
  const [demoLetterIdx, setDemoLetterIdx] = useState<number>(0);
  const [demoBlasted, setDemoBlasted] = useState<boolean>(false);

  const demoWord = 'SPACE';
  const demoVi = 'Vũ Trụ • Không Gian';

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    speechHelper.setEnabled(!muted);
    setIsMuted(muted);
  };

  const handleStart = () => {
    soundFx.playClick();
    soundFx.playPew();
    onStartJourney();
  };

  const handleDemoClickLetter = (idx: number) => {
    if (idx === demoLetterIdx) {
      soundFx.playClick();
      const nextIdx = demoLetterIdx + 1;
      setDemoLetterIdx(nextIdx);
      if (nextIdx >= demoWord.length) {
        setDemoBlasted(true);
        soundFx.playExplosion();
        speechHelper.speak(demoWord);
        setTimeout(() => {
          setDemoLetterIdx(0);
          setDemoBlasted(false);
        }, 1800);
      }
    } else {
      soundFx.playWrong();
    }
  };

  const handleDemoSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    speechHelper.speak(demoWord);
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-y-auto bg-space-dark bg-galactic-stars text-slate-100 font-game select-none">
      {/* Background radial atmosphere glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* 1. Header Bar */}
      <header className="sticky top-0 z-30 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] border border-cyan-300">
              <Rocket className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-orbitron font-black text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-white">
                VOCAB PEW PEW
              </div>
              <div className="text-[10px] sm:text-xs text-cyan-400/80 font-medium">
                Chiến Cơ Từ Vựng Không Gian
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleSound}
              className="btn-3d btn-3d-slate p-2 sm:px-3 sm:py-2 rounded-xl text-slate-300 hover:text-white border-slate-700 text-xs sm:text-sm"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            <button
              onClick={handleStart}
              className="btn-3d btn-3d-cyan px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md"
            >
              <span>{isReturningUser ? 'Vào Bản Đồ' : 'Chơi Ngay'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 flex flex-col items-center text-center">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold mb-5 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span>Game Luyện Gõ Tiếng Anh Miễn Phí Chuẩn Cambridge & SGK</span>
        </div>

        {/* Big Catchy Title */}
        <h1 className="font-orbitron font-black text-3xl sm:text-5xl md:text-6xl tracking-wide uppercase leading-tight sm:leading-none text-white drop-shadow-md mb-4">
          Bắn Tàu Vũ Trụ <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-emerald-400">
            Chinh Phục Từ Vựng
          </span>
        </h1>

        {/* Clear, Inspiring Purpose Statement */}
        <p className="max-w-2xl text-slate-300 text-sm sm:text-lg leading-relaxed font-normal mb-8">
          Biến giờ học từ vựng thành cuộc phiêu lưu arcade hấp dẫn! Giúp các bạn nhỏ
          luyện <strong className="text-cyan-300 font-bold">phản xạ gõ phím 10 ngón</strong>,
          ghi nhớ từ vựng tự nhiên và phát âm chuẩn bản xứ mà không thấy nhàm chán hay áp lực.
        </p>

        {/* Interactive Live Mini Demo Card */}
        <div className="w-full max-w-lg mb-8 p-4 sm:p-5 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-[0_10px_35px_rgba(0,240,255,0.15)] backdrop-blur-md flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Play className="w-3.5 h-3.5 fill-cyan-400" /> Chơi thử 3 giây: Bấm lần lượt từng chữ!
            </span>
            <button
              onClick={handleDemoSpeak}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition active:scale-95 cursor-pointer"
              title="Nghe phát âm chuẩn Web Speech"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Phát Âm</span>
            </button>
          </div>

          {/* Asteroid Target / Ship Simulation */}
          <div className="relative w-full py-4 px-2 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
            {demoBlasted ? (
              <div className="py-2 flex flex-col items-center animate-bounce">
                <span className="text-4xl">💥</span>
                <span className="font-orbitron font-black text-emerald-400 text-sm sm:text-base mt-1">
                  MỤC TIÊU BỊ TIÊU DIỆT! +20 XP 💎
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2">
                  {demoWord.split('').map((char, idx) => {
                    const isTyped = idx < demoLetterIdx;
                    const isCurrent = idx === demoLetterIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleDemoClickLetter(idx)}
                        className={`letter-tile w-10 sm:w-12 h-11 sm:h-13 rounded-xl font-orbitron font-black text-lg sm:text-xl transition cursor-pointer active:scale-90 ${
                          isTyped
                            ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400'
                            : isCurrent
                            ? 'bg-cyan-500/20 text-cyan-200 border-2 border-cyan-400 animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                            : 'bg-slate-800/80 text-slate-400 border border-slate-700'
                        }`}
                        title={`Bấm chữ ${char}`}
                      >
                        {char}
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  {demoVi}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Core Call to Action */}
        <div className="flex flex-col items-center gap-3 w-full max-w-md">
          <button
            onClick={handleStart}
            className="btn-3d btn-3d-emerald w-full py-4 sm:py-5 px-8 rounded-2xl text-lg sm:text-2xl font-black tracking-wider flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(16,185,129,0.35)]"
          >
            <Rocket className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            <span>{isReturningUser ? 'TIẾP TỤC HỌC TẬP' : 'BẮT ĐẦU KHÁM PHÁ NGAY'}</span>
            <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <p className="text-xs sm:text-sm text-slate-400">
            ⚡ 100% Miễn phí • Không cần đăng ký • Chơi được trên Máy tính & iPad
          </p>

          {onOpenProfile && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenProfile();
              }}
              className="mt-1 text-xs sm:text-sm text-cyan-400/90 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1.5 transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Tùy chỉnh tên nhân vật & độ tuổi học tập</span>
            </button>
          )}
        </div>

        {/* 3. Four Core Value Pillars */}
        <section className="w-full mt-16 sm:mt-24">
          <div className="text-center mb-10">
            <h2 className="font-orbitron font-black text-xl sm:text-2xl md:text-3xl text-white">
              TẠI SAO BÉ YÊU THÍCH VOCAB PEW PEW?
            </h2>
            <p className="text-slate-400 text-xs sm:text-base mt-2">
              Thiết kế khoa học, kết hợp giữa trò chơi điện tử và phương pháp phản xạ ngôn ngữ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
            {/* Card 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition">
                <Keyboard className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2">
                Vừa Chơi Vừa Luyện Gõ 10 Ngón
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Mỗi ký tự gõ chuẩn là một phát bắn tiêu diệt thiên thạch. Bé vừa nhớ mặt chữ,
                vừa rèn luyện tốc độ gõ phím nhanh nhạy mà không cảm thấy nhàm chán.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2">
                Lộ Trình Chuẩn (7 - 18+ Tuổi)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Hơn 1000+ từ vựng bám sát khung chuẩn Cambridge (Starters, Movers, Flyers)
                và SGK theo từng khối lớp từ tiểu học, chuyển cấp, THCS đến THPT & Giao tiếp.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2">
                Nghe & Phát Âm Chuẩn Bản Xứ
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Tích hợp công nghệ giọng đọc bản xứ Web Speech AI. Kích hoạt đa giác quan
                cùng lúc: Nghe phát âm chuẩn - Nhìn nghĩa từ - Gõ phím phản xạ.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2">
                100% Miễn Phí & An Toàn Cho Trẻ
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Không quảng cáo gây xao nhãng, không thu thập dữ liệu cá nhân. Tích hợp
                chế độ giới hạn năng lượng hàng ngày để bảo vệ mắt và cân bằng thời gian chơi.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Three Simple Steps */}
        <section className="w-full mt-16 sm:mt-24 p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <h2 className="font-orbitron font-black text-xl sm:text-2xl text-white mb-8">
            3 BƯỚC THAM GIA ĐƠN GIẢN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 font-orbitron font-black text-lg flex items-center justify-center mb-3">
                1
              </div>
              <div className="font-bold text-white text-base mb-1">🎯 Nhìn Từ Vựng</div>
              <div className="text-slate-400 text-xs sm:text-sm max-w-xs">
                Thiên thạch mang từ vựng tiếng Anh lao tới trạm phòng thủ vũ trụ của bạn.
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400 font-orbitron font-black text-lg flex items-center justify-center mb-3">
                2
              </div>
              <div className="font-bold text-white text-base mb-1">⌨️ Gõ Phím Chuẩn Xác</div>
              <div className="text-slate-400 text-xs sm:text-sm max-w-xs">
                Nhấn từng chữ cái trên bàn phím máy tính hoặc chạm bàn phím ảo trên máy tính bảng iPad.
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 border-2 border-amber-400 font-orbitron font-black text-lg flex items-center justify-center mb-3">
                3
              </div>
              <div className="font-bold text-white text-base mb-1">💥 Phóng Laser & Nhận Quà</div>
              <div className="text-slate-400 text-xs sm:text-sm max-w-xs">
                Bắn nổ mục tiêu, lắng nghe phát âm chuẩn và tích lũy kim cương để nâng cấp phi thuyền!
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleStart}
              className="btn-3d btn-3d-cyan px-8 py-3.5 rounded-xl font-black text-base sm:text-lg flex items-center gap-2"
            >
              <span>Vào Chinh Phục Ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* 5. Minimal Clean Footer */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/90 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🚀</span>
            <span className="font-orbitron font-bold text-slate-400">Vocab Pew Pew</span>
            <span>— Game Luyện Gõ Từ Vựng Tiếng Anh Trẻ Em</span>
          </div>
          <div>
            100% Miễn phí & An toàn • Chuẩn Khung Cambridge & SGK
          </div>
        </div>
      </footer>
    </div>
  );
};
