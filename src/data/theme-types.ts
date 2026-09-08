import { UserGender, ThemeStyle, MascotId } from './progress-types';

export interface ThemeConfig {
  id: ThemeStyle;
  nameVi: string;
  nameEn: string;
  icon: string;
  badge: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  cardBg: string;
  borderAccent: string;
  glowColor: string;
  textColor: string;
  buttonGradient: string;
  buttonBorder: string;
}

export const THEME_CONFIGS: Record<ThemeStyle, ThemeConfig> = {
  cosmic_cyan: {
    id: 'cosmic_cyan',
    nameVi: 'Vũ Trụ Cyber Cyan',
    nameEn: 'Cyber Cyan',
    icon: '🚀',
    badge: 'XANH ĐẬM HIỆN ĐẠI',
    description: 'Phong cách không gian huyền bí, công nghệ cao với ánh sáng xanh ngọc.',
    primaryColor: '#00f0ff',
    secondaryColor: '#0284c7',
    accentColor: '#38bdf8',
    bgGradient: 'from-[#090b1e] via-[#0d102b] to-[#080918]',
    cardBg: 'bg-slate-900/85',
    borderAccent: 'border-cyan-400',
    glowColor: 'rgba(0, 240, 255, 0.45)',
    textColor: 'text-cyan-300',
    buttonGradient: 'from-cyan-400 via-teal-400 to-emerald-400',
    buttonBorder: 'border-emerald-600'
  },
  sweet_sakura: {
    id: 'sweet_sakura',
    nameVi: 'Tinh Vân Kẹo Ngọt & Sakura',
    nameEn: 'Sweet Sakura',
    icon: '🌸',
    badge: 'HỒNG PASTEL DỄ THƯƠNG',
    description: 'Tone hồng tím mộng mơ, kẹo ngọt lấp lánh với những cánh hoa ngân hà.',
    primaryColor: '#f472b6',
    secondaryColor: '#ec4899',
    accentColor: '#fb7185',
    bgGradient: 'from-[#1e0a1e] via-[#240c27] to-[#140618]',
    cardBg: 'bg-[#2a112f]/85',
    borderAccent: 'border-pink-400',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    textColor: 'text-pink-300',
    buttonGradient: 'from-pink-400 via-rose-400 to-fuchsia-400',
    buttonBorder: 'border-pink-700'
  },
  galaxy_purple: {
    id: 'galaxy_purple',
    nameVi: 'Ngân Hà Tím Hoàng Gia',
    nameEn: 'Royal Violet',
    icon: '👑',
    badge: 'TÍM QUÝ PHÁI & PHÉP THUẬT',
    description: 'Sắc tím huyền diệu, lung linh ánh sao quyền năng của hoàng gia ngân hà.',
    primaryColor: '#c084fc',
    secondaryColor: '#9333ea',
    accentColor: '#e879f9',
    bgGradient: 'from-[#150927] via-[#1d0d38] to-[#0d041c]',
    cardBg: 'bg-[#22103e]/85',
    borderAccent: 'border-purple-400',
    glowColor: 'rgba(192, 132, 252, 0.45)',
    textColor: 'text-purple-300',
    buttonGradient: 'from-purple-400 via-violet-400 to-indigo-400',
    buttonBorder: 'border-purple-700'
  },
  aurora_emerald: {
    id: 'aurora_emerald',
    nameVi: 'Cực Quang Xanh Ngọc',
    nameEn: 'Emerald Aurora',
    icon: '🌿',
    badge: 'XANH NGỌC TƯƠI MÁT',
    description: 'Dải cực quang tươi mát, mang cảm giác thám hiểm thiên nhiên vũ trụ kỳ thú.',
    primaryColor: '#34d399',
    secondaryColor: '#059669',
    accentColor: '#6ee7b7',
    bgGradient: 'from-[#061c16] via-[#09261f] to-[#04120e]',
    cardBg: 'bg-[#0a2f26]/85',
    borderAccent: 'border-emerald-400',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    textColor: 'text-emerald-300',
    buttonGradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    buttonBorder: 'border-teal-700'
  },
  solar_amber: {
    id: 'solar_amber',
    nameVi: 'Hoàng Hôn Ánh Vàng',
    nameEn: 'Solar Flare',
    icon: '☀️',
    badge: 'VÀNG CAM NĂNG ĐỘNG',
    description: 'Năng lượng mặt trời rực rỡ, ấm áp, thúc đẩy tinh thần học tập hăng say.',
    primaryColor: '#facc15',
    secondaryColor: '#d97706',
    accentColor: '#fbbf24',
    bgGradient: 'from-[#1f1505] via-[#291b07] to-[#140d02]',
    cardBg: 'bg-[#312009]/85',
    borderAccent: 'border-amber-400',
    glowColor: 'rgba(250, 204, 21, 0.45)',
    textColor: 'text-amber-300',
    buttonGradient: 'from-amber-400 via-yellow-400 to-orange-400',
    buttonBorder: 'border-amber-700'
  },
  galactic_starwars: {
    id: 'galactic_starwars',
    nameVi: 'Chiến Tranh Giữa Các Vì Sao',
    nameEn: 'Galactic Fleet (Star Wars)',
    icon: '🌌',
    badge: 'STAR WARS VIỄN TƯỞNG',
    description: 'Không gian vũ trụ sâu thẳm, buồng lái máy bay chiến đấu và ánh sáng laser rực rỡ.',
    primaryColor: '#ef4444',
    secondaryColor: '#00f0ff',
    accentColor: '#facc15',
    bgGradient: 'from-[#030712] via-[#0b0f19] to-[#020617]',
    cardBg: 'bg-slate-900/95',
    borderAccent: 'border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.35)]',
    glowColor: 'rgba(0, 240, 255, 0.5)',
    textColor: 'text-cyan-300',
    buttonGradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    buttonBorder: 'border-cyan-700'
  }
};

export interface MascotConfig {
  id: MascotId;
  name: string;
  speciesVi: string;
  icon: string;
  avatarBase: string;
  avatarCheer: string;
  avatarOopsie: string;
  avatarThinking: string;
  personalityDesc: string;
  greeting: string;
  cheerMessages: string[];
  oopsieMessages: string[];
}

export const MASCOT_CONFIGS: Record<MascotId, MascotConfig> = {
  cosmo_dog: {
    id: 'cosmo_dog',
    name: 'Cosmo',
    speciesVi: 'Cún Cứu Hộ Vũ Trụ',
    icon: '🐶',
    avatarBase: '🐶🚀',
    avatarCheer: '🐶🎉',
    avatarOopsie: '🐶🥺',
    avatarThinking: '🐶🧐',
    personalityDesc: 'Năng động, nhiệt huyết & luôn sẵn sàng xông pha!',
    greeting: 'Gâu gâu! Cosmo sẵn sàng bay cùng bạn rồi nè! 🚀',
    cheerMessages: [
      'Đỉnh quá bạn ơi! 🌟',
      'Bắn siêu chuẩn luôn! 🚀',
      'Cố lên nào siêu sao vũ trụ! ✨',
      'Tuyệt vời ông mặt trời! ☀️',
      'Bách phát bách trúng! 🛸'
    ],
    oopsieMessages: [
      'Không sao cả, Cosmo luôn tin bạn! ❤️',
      'Hít một hơi thật sâu và làm lại nhé! 🐾',
      'Lần sau bạn sẽ làm siêu hơn nữa! 💪'
    ]
  },
  luna_cat: {
    id: 'luna_cat',
    name: 'Luna',
    speciesVi: 'Mèo Tiên Ánh Trăng',
    icon: '🐱',
    avatarBase: '🐱🌙',
    avatarCheer: '🐱🌸',
    avatarOopsie: '🐱🥺',
    avatarThinking: '🐱✨',
    personalityDesc: 'Dễ thương, ngọt ngào & động viên dịu dàng.',
    greeting: 'Meow! Luna chúc bạn một ngày học thật ngọt ngào nha! 🌸',
    cheerMessages: [
      'Bạn đáng yêu và giỏi quá đi! 🌸',
      'Chuẩn xác như mèo bắt chuột! 🐱✨',
      'Lung linh lấp lánh như ánh trăng! 🌙',
      'Meow meow! Xuất sắc lắm luôn! 💖',
      'Bạn đang tỏa sáng tuyệt đẹp! 🌟'
    ],
    oopsieMessages: [
      'Đừng buồn nhé, Luna gửi bạn một cái ôm! 🐾💖',
      'Cứ từ từ thôi nè, bạn đang tiến bộ rất nhanh! 🌸',
      'Mỗi lần thử là thêm một lần giỏi hơn! ✨'
    ]
  },
  stella_unicorn: {
    id: 'stella_unicorn',
    name: 'Stella',
    speciesVi: 'Kỳ Lân Phép Thuật',
    icon: '🦄',
    avatarBase: '🦄✨',
    avatarCheer: '🦄🎉',
    avatarOopsie: '🦄🥺',
    avatarThinking: '🦄🔮',
    personalityDesc: 'Rực rỡ, lấp lánh cầu vồng & tràn ngập phép màu!',
    greeting: 'Chào bạn! Hãy cùng Stella tạo nên phép màu từ vựng nhé! 🌈',
    cheerMessages: [
      'Phép thuật cầu vồng bùng nổ! 🌈✨',
      'Bạn là ngôi sao lấp lánh nhất thiên hà! 💖',
      'Đẹp mắt và hoàn hảo không tì vết! 🦄🌟',
      'Càng học càng tỏa sáng rực rỡ! 🔮',
      '10 điểm phép màu cho bạn! 💫'
    ],
    oopsieMessages: [
      'Phép thuật cần thời gian tích lũy, thử lại ngay nha! 💖',
      'Stella gửi bụi sao may mắn tới bạn nè! ✨🦄',
      'Tự tin lên nào công chúa/hoàng tử của Stella! 🌈'
    ]
  },
  pixel_robot: {
    id: 'pixel_robot',
    name: 'Pixel',
    speciesVi: 'Robot Trí Tuệ Tương Lai',
    icon: '🤖',
    avatarBase: '🤖⚡',
    avatarCheer: '🤖🎯',
    avatarOopsie: '🤖⚙️',
    avatarThinking: '🤖💡',
    personalityDesc: 'Thông thái, tính toán siêu nhanh & hài hước công nghệ.',
    greeting: 'Bíp bíp! Đã tải 100% năng lượng học tập cùng Pixel! ⚡',
    cheerMessages: [
      'Độ chuẩn xác 100%! Dữ liệu cực kỳ ấn tượng! 🎯',
      'Tốc độ gõ phím chuẩn cấp độ siêu máy tính! ⚡',
      'Phân tích cho thấy bạn là thiên tài! 💡',
      'Hệ thống ghi nhận kỷ lục mới! 🤖🌟',
      'Bíp bíp! Đỉnh cao công nghệ! 🚀'
    ],
    oopsieMessages: [
      'Đang tái cân chỉnh thuật toán... sẵn sàng bắn lại! ⚙️',
      'Lỗi là bước đệm để nâng cấp vi xử lý! 🤖💪',
      'Khởi động lại vòng xoáy phản xạ ngay! ⚡'
    ]
  },
  spark_fox: {
    id: 'spark_fox',
    name: 'Sparky',
    speciesVi: 'Cáo Lửa Nhanh Nhẹn',
    icon: '🦊',
    avatarBase: '🦊🔥',
    avatarCheer: '🦊🏆',
    avatarOopsie: '🦊😿',
    avatarThinking: '🦊🔍',
    personalityDesc: 'Tinh ranh, nhanh nhẹn, tinh thần chiến binh bốc lửa!',
    greeting: 'Hiya! Nhanh tay tinh mắt cùng Sparky săn sao nhé! 🔥',
    cheerMessages: [
      'Nhanh như một tia chớp! Quá ngầu! 🔥',
      'Phản xạ tuyệt đỉnh không trượt phát lào! 🦊⚡',
      'Bạn đang cháy hết mình luôn đó! 🏆',
      'Thần tốc và quyết đoán! Siêu cấp! 🌟',
      'Sparky bái phục tốc độ của bạn! 🚀'
    ],
    oopsieMessages: [
      'Một cú vấp nhỏ thôi, đứng dậy bắn cháy máy luôn! 🔥',
      'Cáo nhỏ tin bạn sẽ vượt qua dễ như ăn kẹo! 🦊',
      'Tập trung cao độ và lấy lại phong độ nào! 💪'
    ]
  }
};

export interface AvatarOption {
  emoji: string;
  label: string;
  category: 'boy' | 'girl' | 'neutral';
}

export const AVATAR_LIST: AvatarOption[] = [
  // --- BÉ TRAI / NĂNG ĐỘNG (Boy-appealing) ---
  { emoji: '🚀', label: 'Tên Lửa', category: 'boy' },
  { emoji: '🤖', label: 'Robot Chiến', category: 'boy' },
  { emoji: '⚡', label: 'Tia Chớp', category: 'boy' },
  { emoji: '🦁', label: 'Sư Tử Vương', category: 'boy' },
  { emoji: '🏎️', label: 'Siêu Xe F1', category: 'boy' },
  { emoji: '🦖', label: 'Khủng Long T-Rex', category: 'boy' },
  { emoji: '🥷', label: 'Ninja Sao', category: 'boy' },
  { emoji: '🐶', label: 'Cún Cứu Hộ', category: 'boy' },
  { emoji: '🦸‍♂️', label: 'Siêu Nhân', category: 'boy' },
  { emoji: '🐲', label: 'Hỏa Long', category: 'boy' },

  // --- BÉ GÁI / DỄ THƯƠNG & PHÉP THUẬT (Girl-appealing) ---
  { emoji: '🦄', label: 'Kỳ Lân Phép Màu', category: 'girl' },
  { emoji: '🧚‍♀️', label: 'Tiên Nữ Sao', category: 'girl' },
  { emoji: '🐱', label: 'Mèo Hồng', category: 'girl' },
  { emoji: '🌸', label: 'Hoa Anh Đào', category: 'girl' },
  { emoji: '👑', label: 'Công Chúa Sao', category: 'girl' },
  { emoji: '🦊', label: 'Cáo Đuôi Bông', category: 'girl' },
  { emoji: '🐬', label: 'Cá Heo Ánh Sao', category: 'girl' },
  { emoji: '💖', label: 'Trái Tim Tinh Cầu', category: 'girl' },
  { emoji: '🎀', label: 'Nơ Lấp Lánh', category: 'girl' },
  { emoji: '🦋', label: 'Bướm Tiên Ngân Hà', category: 'girl' },

  // --- ĐA DẠNG / TRUNG TÍNH (Neutral / Cool / Universal) ---
  { emoji: '🌟', label: 'Ngôi Sao Vàng', category: 'neutral' },
  { emoji: '🪐', label: 'Sao Thổ Huyền Bí', category: 'neutral' },
  { emoji: '🎨', label: 'Họa Sĩ Ngân Hà', category: 'neutral' },
  { emoji: '🍀', label: 'Cỏ May Mắn', category: 'neutral' },
  { emoji: '🐼', label: 'Gấu Trúc Vũ Trụ', category: 'neutral' },
  { emoji: '🦉', label: 'Cú Thông Thái', category: 'neutral' },
  { emoji: '🍦', label: 'Kem Cầu Vồng', category: 'neutral' },
  { emoji: '🛸', label: 'Đĩa Bay Neon', category: 'neutral' },
  { emoji: '🌈', label: 'Cầu Vồng Tinh Tú', category: 'neutral' },
  { emoji: '💎', label: 'Kim Cương Ánh Tím', category: 'neutral' }
];

export const SUGGESTED_NAMES_BY_GENDER: Record<UserGender, string[]> = {
  boy: ['Minh Khang', 'Bảo Nam', 'Alex', 'David', 'Hoàng Bách', 'Gia Huy', 'Minh Trí', 'Huy Vũ', 'Tuấn Kiệt', 'Đăng Khoa'],
  girl: ['Bảo Ngọc', 'Khánh Linh', 'Minh Anh', 'Sarah', 'Emma', 'Tú Uyên', 'Gia Hân', 'Bé Bắp', 'Hà My', 'Mai Phương'],
  neutral: ['Sunny', 'Leo', 'Sky', 'Bé Đậu', 'Susu', 'Lucky', 'Mimi', 'Nhím Con', 'Panda', 'Bi Bi']
};
