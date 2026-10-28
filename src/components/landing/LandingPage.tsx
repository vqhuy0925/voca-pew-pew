import React, { useState, useEffect, useRef } from 'react';
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
  Play,
  Key,
  ChevronDown,
  CheckCircle2,
  Lock,
  X,
  Star,
  Zap,
  Award
} from 'lucide-react';
import { soundFx } from '../../game/engine/SoundController';
import { speechHelper } from '../../game/engine/SpeechHelper';
import { UserProgress } from '../../data/progress-types';
import {
  getBrandingConfig,
  subscribeBrandingConfig,
  BrandingConfig
} from '../../services/brandingService';
import { APP_CURRENT_VERSION } from '../../services/versionService';

interface LandingPageProps {
  progress: UserProgress;
  onStartJourney: () => void;
  onOpenProfile?: () => void;
  onOpenAdmin?: () => void;
  onOpenTypingDojo?: () => void;
  onOpenAuth?: (tab: 'register' | 'login') => void;
  isReturningUser?: boolean;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    question: 'Bé chưa từng học gõ 10 ngón có tham gia được không?',
    answer:
      'Hoàn toàn được! Vocab Pew Pew bắt đầu từ các từ vựng 3 đến 4 chữ cái đơn giản với tốc độ di chuyển chậm. Trò chơi kết hợp bản đồ phím và phản xạ chữ cái từng bước giúp bé làm quen vị trí các phím tự nhiên mà không bị áp lực.'
  },
  {
    question: 'Ứng dụng có thể chơi trên máy tính bảng hoặc iPad không?',
    answer:
      'Có. Trò chơi tự động nhận diện thiết bị cảm ứng và hiển thị bàn phím ảo công thái học ngay trên màn hình máy tính bảng iPad và Android, giúp các bạn nhỏ thao tác chạm phím tiện lợi.'
  },
  {
    question: 'Nội dung từ vựng có bám sát chương trình phổ thông và quốc tế không?',
    answer:
      'Chương trình được thiết kế chuẩn hoá theo khung Cambridge English (Starters, Movers, Flyers, KET) kết hợp ngân hàng từ vựng sách giáo khoa tiếng Anh từ lớp 1 đến lớp 12, phân bổ theo từng chủ đề trực quan.'
  },
  {
    question: 'Ứng dụng có phát sinh chi phí hoặc quảng cáo không?',
    answer:
      'Vocab Pew Pew cam kết 100% miễn phí cho học sinh và nhà trường. Ứng dụng hoàn toàn không chứa quảng cáo, không pop-up gây xao nhãng và không thu thập thông tin cá nhân của trẻ.'
  },
  {
    question: 'Tiến trình học tập và điểm thưởng được lưu lại như thế nào?',
    answer:
      'Bé có thể tạo tài khoản bảo mật bằng mã PIN 4 số nhanh chóng để lưu lại số kim cương, sao kinh nghiệm và bảng thành tích trên mọi thiết bị. Nếu không tạo tài khoản, tiến trình vẫn được lưu tự động trên trình duyệt hiện tại.'
  },
  {
    question: 'Cơ chế giới hạn năng lượng hàng ngày hoạt động thế nào?',
    answer:
      'Mỗi ngày học sinh có lượng năng lượng nhất định để tham gia các màn chơi. Cơ chế này khuyến khích thói quen học tập đều đặn 15 đến 20 phút mỗi ngày và ngăn ngừa tình trạng nhìn màn hình quá lâu.'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  progress,
  onStartJourney,
  onOpenProfile,
  onOpenAdmin,
  onOpenTypingDojo,
  onOpenAuth,
  isReturningUser = false
}) => {
  const [branding, setBranding] = useState<BrandingConfig>(() => getBrandingConfig());
  const [isMuted, setIsMuted] = useState<boolean>(() => !progress.soundEnabled);
  const [demoLetterIdx, setDemoLetterIdx] = useState<number>(0);
  const [demoBlasted, setDemoBlasted] = useState<boolean>(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Tagline kinetic word reveal state (Rule B11)
  const taglineRef = useRef<HTMLDivElement>(null);
  const [revealedWordCount, setRevealedWordCount] = useState<number>(0);

  const taglineText =
    'Biến mỗi phát gõ phím thành phản xạ tự nhiên. Bé vừa làm chủ bàn phím mười ngón, vừa nhớ sâu từ vựng tiếng Anh mỗi ngày.';
  const taglineWords = taglineText.split(' ');

  useEffect(() => {
    const unsubscribe = subscribeBrandingConfig((newConfig) => {
      setBranding(newConfig);
    });
    return () => unsubscribe();
  }, []);

  // Scroll listener for Tagline Reveal with requestAnimationFrame throttling (Rule B7 & B11)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (taglineRef.current) {
            const rect = taglineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Calculate progress through viewport
            const startReveal = windowHeight * 0.85;
            const endReveal = windowHeight * 0.35;
            if (rect.top <= startReveal) {
              const progressRatio = Math.min(
                1,
                Math.max(0, (startReveal - rect.top) / (startReveal - endReveal))
              );
              const activeCount = Math.floor(progressRatio * (taglineWords.length + 1));
              setRevealedWordCount(activeCount);
            } else {
              setRevealedWordCount(0);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [taglineWords.length]);

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

  const toggleFaq = (idx: number) => {
    soundFx.playClick();
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-y-auto bg-space-dark text-slate-100 font-game select-none antialiased">
      {/* 1. Header Bar: Floating, Centered, Clean Single Action Intent */}
      <header className="sticky top-0 z-30 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
              <Rocket className="w-5 h-5 text-cyan-300 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-orbitron font-bold text-base sm:text-lg tracking-wider text-slate-100">
                Vocab Pew Pew
              </div>
              <div className="text-xs text-cyan-400 font-medium hidden sm:block">
                Chiến cơ từ vựng không gian
              </div>
            </div>
          </div>

          {/* Quick Header Navigation */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleSound}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition active:scale-95 text-xs sm:text-sm flex items-center gap-1.5"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {onOpenAuth && !progress.isRegisteredAccount && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenAuth('login');
                }}
                className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-amber-300 hover:text-white border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition active:scale-95"
              >
                Đăng nhập
              </button>
            )}

            <button
              onClick={handleStart}
              className="btn-3d btn-3d-cyan px-3.5 py-2 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm"
            >
              <span>{isReturningUser ? 'Vào bản đồ' : 'Bắt đầu học'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 flex flex-col items-center text-center">
        {/* Partner Trust Banner */}
        {branding.showPartnerBanner && branding.partnerMessage && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/40 text-blue-200 text-xs sm:text-sm font-medium mb-4 shadow-sm">
            {branding.partnerLogoUrl ? (
              <img
                src={branding.partnerLogoUrl}
                alt="Logo đối tác"
                className="w-4 h-4 object-contain rounded-full"
              />
            ) : (
              <span className="text-sm">🏛️</span>
            )}
            <span>{branding.partnerMessage}</span>
          </div>
        )}

        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Ứng dụng luyện gõ từ vựng tiếng Anh chuẩn Cambridge và SGK</span>
        </div>

        {/* Hero Headline: max-w-[680px], Left-to-Right gradient, Sentence Case */}
        <h1 className="max-w-[680px] font-orbitron font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 mb-5">
          Bắn tàu vũ trụ, chinh phục từ vựng tiếng Anh
        </h1>

        {/* Hero Subheadline: max-w-[620px] */}
        <p className="max-w-[620px] text-slate-300 text-sm sm:text-lg leading-relaxed font-normal mb-8">
          Biến giờ học từ vựng thành cuộc phiêu lưu arcade hấp dẫn. Giúp các bạn nhỏ
          rèn luyện <span className="text-cyan-300 font-semibold">phản xạ gõ phím mười ngón</span>,
          ghi nhớ mặt chữ tự nhiên và phát âm chuẩn bản xứ mà không thấy áp lực.
        </p>

        {/* Single Primary Action + Risk Reversal */}
        <div className="flex flex-col items-center gap-3 w-full max-w-md mb-10">
          <button
            onClick={() => {
              if (progress.isRegisteredAccount) {
                handleStart();
              } else if (onOpenAuth) {
                soundFx.playClick();
                onOpenAuth('register');
              } else {
                handleStart();
              }
            }}
            className="btn-3d btn-3d-cyan w-full py-3.5 sm:py-4 px-8 rounded-2xl text-base sm:text-xl font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(0,240,255,0.25)]"
          >
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            <span>{progress.isRegisteredAccount ? 'Tiếp tục học tập' : 'Bắt đầu học miễn phí'}</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>

          <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
            <span>✓ 100% miễn phí</span>
            <span>•</span>
            <span>✓ Bảo vệ mắt với năng lượng hàng ngày</span>
            <span>•</span>
            <span>✓ Không quảng cáo</span>
          </p>

          {onOpenProfile && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenProfile();
              }}
              className="text-xs text-slate-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1.5 transition cursor-pointer mt-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Tùy chỉnh thông tin người chơi</span>
            </button>
          )}
        </div>

        {/* Interactive Live Mini Demo Card */}
        <div className="w-full max-w-lg p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Play className="w-3.5 h-3.5 fill-cyan-400" /> Trải nghiệm thử 3 giây: Bấm lần lượt từng chữ!
            </span>
            <button
              onClick={handleDemoSpeak}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition active:scale-95 cursor-pointer"
              title="Nghe phát âm chuẩn giọng bản xứ"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Phát âm</span>
            </button>
          </div>

          {/* Asteroid Target / Ship Simulation */}
          <div className="relative w-full py-4 px-2 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
            {demoBlasted ? (
              <div className="py-2 flex flex-col items-center animate-bounce">
                <span className="text-4xl">💥</span>
                <span className="font-orbitron font-bold text-emerald-400 text-sm sm:text-base mt-1">
                  Mục tiêu bị tiêu diệt! +20 XP 💎
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
                        className={`letter-tile w-10 sm:w-12 h-11 sm:h-13 rounded-xl font-orbitron font-bold text-lg sm:text-xl transition cursor-pointer active:scale-90 ${
                          isTyped
                            ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400'
                            : isCurrent
                            ? 'bg-cyan-500/20 text-cyan-200 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                            : 'bg-slate-900 text-slate-400 border border-slate-700'
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

        {/* 3. Mandatory Tagline Reveal Section (Rule B11) */}
        <section
          ref={taglineRef}
          className="w-full my-20 sm:my-28 px-4 py-8 max-w-3xl flex flex-col items-center justify-center text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium mb-5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Phương pháp học phản xạ tự nhiên</span>
          </div>

          <h2 className="font-orbitron font-bold text-2xl sm:text-4xl md:text-5xl leading-snug tracking-tight">
            {taglineWords.map((word, index) => {
              const isRevealed = index < revealedWordCount;
              return (
                <span
                  key={index}
                  className={`inline-block mr-2.5 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isRevealed ? 'text-white' : 'text-slate-700'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </h2>
        </section>

        {/* 4. Four Core Value Pillars */}
        <section className="w-full mt-4 sm:mt-10">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h2 className="font-orbitron font-bold text-xl sm:text-3xl text-white">
              Tại sao bé yêu thích Vocab Pew Pew?
            </h2>
            <p className="text-slate-400 text-xs sm:text-base mt-2">
              Kết hợp phương pháp tương tác phản xạ và ngôn ngữ trực quan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition">
                <Keyboard className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2">
                Vừa học vừa luyện gõ mười ngón
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Mỗi ký tự gõ chuẩn là một phát bắn tiêu diệt thiên thạch. Bé vừa nhớ mặt chữ,
                vừa rèn luyện tốc độ gõ phím nhanh nhạy mà không cảm thấy mệt mỏi.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2">
                Lộ trình chuẩn Cambridge và SGK
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Hơn 1.250 từ vựng bám sát khung chuẩn Cambridge (Starters, Movers, Flyers, KET)
                và chương trình sách giáo khoa theo từng khối lớp từ tiểu học đến trung học.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2">
                Nghe và phát âm chuẩn bản xứ
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Tích hợp công nghệ giọng đọc bản xứ Web Speech AI. Kích hoạt đa giác quan
                cùng lúc: nghe chuẩn âm điệu, nhìn nghĩa từ và gõ phím phản xạ.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white mb-2">
                An toàn tuyệt đối cho học sinh
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Không quảng cáo gây xao nhãng, không thu thập dữ liệu cá nhân. Cơ chế giới hạn
                năng lượng hàng ngày giúp bảo vệ mắt và giữ cân bằng giờ học của bé.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Three Simple Steps (How It Works) */}
        <section className="w-full mt-16 sm:mt-24 p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="text-center mb-8 max-w-xl mx-auto">
            <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-white">
              Ba bước tham gia đơn giản
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
              Bắt đầu luyện tập dễ dàng trên cả máy tính bàn và máy tính bảng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 font-orbitron font-bold text-lg flex items-center justify-center mb-3">
                1
              </div>
              <div className="font-bold text-white text-base mb-1">Quan sát từ vựng</div>
              <div className="text-slate-400 text-xs sm:text-sm max-w-xs">
                Thiên thạch mang từ vựng tiếng Anh lao tới trạm phòng thủ vũ trụ của bạn.
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400 font-orbitron font-bold text-lg flex items-center justify-center mb-3">
                2
              </div>
              <div className="font-bold text-white text-base mb-1">Gõ phím chuẩn xác</div>
              <div className="text-slate-400 text-xs sm:text-sm max-w-xs">
                Nhấn từng chữ cái trên bàn phím máy tính hoặc chạm bàn phím ảo trên máy tính bảng.
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 border-2 border-amber-400 font-orbitron font-bold text-lg flex items-center justify-center mb-3">
                3
              </div>
              <div className="font-bold text-white text-base mb-1">Phóng laser và nhận quà</div>
              <div className="text-slate-400 text-xs sm:text-sm max-w-xs">
                Bắn nổ mục tiêu, lắng nghe phát âm chuẩn và tích lũy kim cương nâng cấp chiến hạm.
              </div>
            </div>
          </div>
        </section>

        {/* 6. Measurable Metrics & Social Proof */}
        <section className="w-full mt-16 sm:mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="font-orbitron font-bold text-2xl sm:text-3xl text-cyan-400 mb-1">
                1.250+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Từ vựng Cambridge & SGK
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="font-orbitron font-bold text-2xl sm:text-3xl text-emerald-400 mb-1">
                15 Phút
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Thời lượng rèn luyện lý tưởng mỗi ngày
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="font-orbitron font-bold text-2xl sm:text-3xl text-amber-400 mb-1">
                100%
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Miễn phí và không có quảng cáo
              </div>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 italic mb-4 leading-relaxed">
                "Bé nhà mình trước đây rất lười học từ vựng vì ghi chép nhiều, nhưng từ khi chơi
                Vocab Pew Pew bé tự giác mở máy mỗi tối 15 phút để tích luỹ kim cương và luyện gõ phím."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-xs">
                  MH
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Chị Mai Hương</div>
                  <div className="text-[11px] text-slate-400">Phụ huynh học sinh lớp 4 (Hà Nội)</div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 italic mb-4 leading-relaxed">
                "Tôi thường giới thiệu trò chơi này cho các em học sinh luyện phản xạ gõ mười ngón và
                phát âm từ vựng. Trò chơi rất trực quan, sạch sẽ và an toàn cho môi trường học đường."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs">
                  TH
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Thầy Tuấn Hưng</div>
                  <div className="text-[11px] text-slate-400">Giáo viên Tiếng Anh tiểu học</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Interactive FAQ Section (Rule A2 #10) */}
        <section className="w-full mt-16 sm:mt-24 text-left">
          <div className="text-center mb-8 max-w-xl mx-auto">
            <h2 className="font-orbitron font-bold text-xl sm:text-3xl text-white">
              Câu hỏi thường gặp
            </h2>
            <p className="text-slate-400 text-xs sm:text-base mt-2">
              Giải đáp các băn khoăn phổ biến của phụ huynh và thầy cô
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 text-slate-200 hover:text-white transition"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-xs sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. Final High-Conversion CTA Section */}
        <section className="w-full mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-slate-900 border border-cyan-500/40 text-center flex flex-col items-center shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 flex items-center justify-center mb-4">
            <Rocket className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl sm:text-4xl text-white mb-3">
            Sẵn sàng bước vào trạm không gian?
          </h2>
          <p className="text-slate-300 text-xs sm:text-base max-w-md mb-6 leading-relaxed">
            Học tập không áp lực, luyện gõ phím nhanh nhạy và xây dựng nền tảng từ vựng vững chắc ngay hôm nay.
          </p>

          <button
            onClick={handleStart}
            className="btn-3d btn-3d-cyan py-3.5 sm:py-4 px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-bold flex items-center gap-2.5 shadow-[0_8px_25px_rgba(0,240,255,0.25)]"
          >
            <span>Vào chinh phục ngay</span>
            <ArrowRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </section>
      </main>

      {/* 9. Minimal Clean Footer with Legal & Safety links */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">🚀</span>
              <span className="font-orbitron font-bold text-slate-400">Vocab Pew Pew</span>
              <span>— Luyện gõ từ vựng tiếng Anh</span>
            </div>
            {branding.partnerMessage && (
              <span className="text-cyan-400 font-medium text-[11px] sm:text-xs flex items-center gap-1.5">
                <span className="text-slate-600">•</span>
                {branding.partnerLogoUrl && (
                  <img
                    src={branding.partnerLogoUrl}
                    alt="Logo đối tác"
                    className="w-4 h-4 object-contain rounded-full inline-block"
                  />
                )}
                <span>{branding.partnerMessage}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <span className="font-mono text-[11px] text-slate-400">v{APP_CURRENT_VERSION}</span>
            <span>•</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="text-slate-400 hover:text-cyan-300 transition underline underline-offset-2"
            >
              Chính sách bảo mật
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="text-slate-400 hover:text-cyan-300 transition underline underline-offset-2"
            >
              Điều khoản sử dụng
            </button>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onOpenAdmin();
                  }}
                  className="text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/40"
                  title="Mission Control Admin"
                >
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin</span>
                </button>
              </>
            )}
          </div>
        </div>
      </footer>

      {/* 10. Legal & Privacy Modal (Rule B10) */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-left">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">
                {legalModal === 'privacy' ? 'Chính sách bảo mật' : 'Điều khoản sử dụng'}
              </h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 space-y-3 max-h-80 overflow-y-auto pr-1 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Cam kết an toàn cho trẻ em:</strong> Vocab Pew Pew không thu thập họ tên đầy đủ,
                    số điện thoại, địa chỉ hay thông tin vị trí thực tế của học sinh.
                  </p>
                  <p>
                    <strong>2. Lưu trữ tiến trình:</strong> Dữ liệu học tập bao gồm số sao, cấp độ màn chơi và
                    kim cương được lưu trữ trên trình duyệt hoặc máy chủ bảo mật thông qua mã định danh nội bộ.
                  </p>
                  <p>
                    <strong>3. Không quảng cáo thương mại:</strong> Nền tảng không liên kết với mạng lưới quảng cáo
                    bên thứ ba, đảm bảo không gian học tập thuần khiết và tập trung.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Quyền sử dụng miễn phí:</strong> Vocab Pew Pew cung cấp quyền truy cập miễn phí
                    cho mục đích học tập cá nhân, gia đình và nhà trường.
                  </p>
                  <p>
                    <strong>2. Nội dung giáo dục:</strong> Toàn bộ từ vựng và bài luyện tập được biên soạn nhằm
                    hỗ trợ bổ trợ kỹ năng gõ phím và từ vựng tiếng Anh chuẩn cho học sinh.
                  </p>
                  <p>
                    <strong>3. Giới hạn trách nhiệm:</strong> Ứng dụng hoạt động trên nền tảng web hiện đại, khuyến
                    khích phụ huynh đồng hành để bé có thời gian biểu học tập hợp lý mỗi ngày.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-cyan-400 transition"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
