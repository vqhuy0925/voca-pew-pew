export type DifficultyLevel = 'ZEN' | 'EASY' | 'NORMAL' | 'HEROIC';

export interface DifficultyConfig {
  id: DifficultyLevel;
  title: string;
  titleVi: string;
  badge: string;
  emoji: string;
  speedMultiplier: number;
  timeLimitSeconds: number; // 0 = unlimited time (Zen mode)
  xpMultiplier: number;
  gemMultiplier: number;
  color: string;
  description: string;
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  ZEN: {
    id: 'ZEN',
    title: 'Zen',
    titleVi: 'Tập Gõ Thư Giãn',
    badge: '🧘 ZEN',
    emoji: '🧘',
    speedMultiplier: 0.45,
    timeLimitSeconds: 0,
    xpMultiplier: 0.9,
    gemMultiplier: 0.8,
    color: '#38bdf8',
    description: 'Không đếm ngược hết giờ, từ rơi siêu chậm để bé thong thả tập đúng ngón tay!'
  },
  EASY: {
    id: 'EASY',
    title: 'Easy',
    titleVi: 'Mới Tập Bắn',
    badge: '🟢 DỄ',
    emoji: '🌱',
    speedMultiplier: 0.75,
    timeLimitSeconds: 65,
    xpMultiplier: 1.0,
    gemMultiplier: 1.0,
    color: '#4ade80',
    description: 'Từ vựng rơi chậm rãi, nhiều thời gian làm quen!'
  },
  NORMAL: {
    id: 'NORMAL',
    title: 'Normal',
    titleVi: 'Phi Công Tập Sự',
    badge: '🟡 VỪA',
    emoji: '⭐',
    speedMultiplier: 1.0,
    timeLimitSeconds: 45,
    xpMultiplier: 1.25,
    gemMultiplier: 1.0,
    color: '#facc15',
    description: 'Tốc độ tiêu chuẩn, thử thách phản xạ gõ phím!'
  },
  HEROIC: {
    id: 'HEROIC',
    title: 'Heroic',
    titleVi: 'Chiến Binh Siêu Cấp',
    badge: '🔴 THỬ THÁCH',
    emoji: '🔥',
    speedMultiplier: 1.3,
    timeLimitSeconds: 32,
    xpMultiplier: 1.8,
    gemMultiplier: 1.5,
    color: '#f43f5e',
    description: 'Đếm ngược gấp gáp, từ rơi nhanh, thưởng thêm Kim Cương quý giá!'
  }
};

export type ItemRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC';

export interface RarityConfig {
  id: ItemRarity;
  nameVi: string;
  nameEn: string;
  badge: string;
  color: string;
  glowColor: string;
  borderColor: string;
  bgGradient: string;
  textGradient: string;
  icon: string;
}

export const RARITY_CONFIGS: Record<ItemRarity, RarityConfig> = {
  COMMON: {
    id: 'COMMON',
    nameVi: 'Phổ Thông',
    nameEn: 'Common',
    badge: '🟢 PHỔ THÔNG',
    color: '#4ade80',
    glowColor: 'rgba(74, 222, 128, 0.4)',
    borderColor: 'border-emerald-500/60',
    bgGradient: 'from-emerald-950/60 to-slate-900/90',
    textGradient: 'text-emerald-400',
    icon: '🌱'
  },
  RARE: {
    id: 'RARE',
    nameVi: 'Hiếm',
    nameEn: 'Rare',
    badge: '🔵 HIẾM',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    borderColor: 'border-sky-500/70',
    bgGradient: 'from-sky-950/60 to-slate-900/90',
    textGradient: 'text-sky-400',
    icon: '💎'
  },
  EPIC: {
    id: 'EPIC',
    nameVi: 'Sử Thi',
    nameEn: 'Epic',
    badge: '🟣 SỬ THI',
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    borderColor: 'border-purple-500/80',
    bgGradient: 'from-purple-950/60 to-slate-900/90',
    textGradient: 'text-purple-300',
    icon: '🔮'
  },
  LEGENDARY: {
    id: 'LEGENDARY',
    nameVi: 'Huyền Thoại',
    nameEn: 'Legendary',
    badge: '🟡 HUYỀN THOẠI',
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    borderColor: 'border-amber-400',
    bgGradient: 'from-amber-950/70 to-slate-900/90',
    textGradient: 'text-amber-300',
    icon: '👑'
  },
  MYTHIC: {
    id: 'MYTHIC',
    nameVi: 'Thần Thoại',
    nameEn: 'Mythic',
    badge: '🌌 THẦN THOẠI',
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.7)',
    borderColor: 'border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.45)]',
    bgGradient: 'from-rose-950/70 via-purple-950/60 to-slate-900/90',
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-300',
    icon: '✨'
  }
};

export interface SpaceshipItem {
  id: string;
  name: string;
  nameVi: string;
  rarity: ItemRarity;
  priceGems: number;
  icon: string;
  color: string;
  glowColor: string;
  cockpitColor: string;
  wingSpan: number;
  modelType: 'scout' | 'thunder' | 'ufo' | 'dragon' | 'aegis' | 'pegasus' | 'sakura' | 'aurora' | 'butterfly' | 'kitty' | 'mecha' | 'phoenix' | 'valkyrie' | 'chrono' | 'xwing' | 'falcon' | 'tie' | 'naboo' | 'jedi';
  perkDescription: string;
  soundType: 'classic' | 'electric' | 'heavy' | 'cosmic' | 'divine';
}

export interface BlasterItem {
  id: string;
  name: string;
  nameVi: string;
  rarity: ItemRarity;
  priceGems: number;
  icon: string;
  barrelCount: 1 | 2 | 3 | 4 | 5;
  spreadAngle: number;
  cannonColor: string;
  description: string;
  fireSound: 'pew' | 'dual' | 'plasma' | 'cannon' | 'gatling' | 'vortex' | 'divine' | 'starwars_blaster' | 'starwars_quad' | 'starwars_tie' | 'proton_torpedo' | 'kyber_beam';
}

export interface LaserBeamItem {
  id: string;
  name: string;
  nameVi: string;
  rarity: ItemRarity;
  priceGems: number;
  icon: string;
  beamColor: string;
  trailColor: string;
  coreColor: string;
  beamWidth: number;
  particleType: 'spark' | 'lightning' | 'plasma' | 'rainbow' | 'flame' | 'heart' | 'sakura' | 'crystal' | 'matrix' | 'void' | 'sunlight' | 'supernova' | 'rebel_red' | 'imperial_green' | 'ion_blue' | 'mando_amber' | 'kyber_purple';
  description: string;
}

export const SPACESHIPS: SpaceshipItem[] = [
  // 🟢 COMMON
  {
    id: 'ship-scout',
    name: 'Star Scout',
    nameVi: 'Phi Thuyền Tân Thủ',
    rarity: 'COMMON',
    priceGems: 0,
    icon: '🚀',
    color: '#1e293b',
    glowColor: '#38bdf8',
    cockpitColor: '#38bdf8',
    wingSpan: 26,
    modelType: 'scout',
    perkDescription: 'Cân bằng & dễ điều khiển cho phi công nhí.',
    soundType: 'classic'
  },

  // 🔵 RARE
  {
    id: 'ship-pegasus',
    name: 'Starlight Pegasus',
    nameVi: 'Ngựa Bay Tinh Vân',
    rarity: 'RARE',
    priceGems: 60,
    icon: '🦄',
    color: '#3b0764',
    glowColor: '#f472b6',
    cockpitColor: '#fdf2f8',
    wingSpan: 32,
    modelType: 'pegasus',
    perkDescription: 'Cặp cánh thiên thần lấp lánh ánh sao phép thuật và bụi tiên.',
    soundType: 'cosmic'
  },
  {
    id: 'ship-sakura',
    name: 'Celestial Sakura',
    nameVi: 'Hoa Tiên Tinh Cầu',
    rarity: 'RARE',
    priceGems: 90,
    icon: '🌸',
    color: '#500724',
    glowColor: '#fb7185',
    cockpitColor: '#ffe4e6',
    wingSpan: 30,
    modelType: 'sakura',
    perkDescription: 'Khiên cánh hoa anh đào nở rộ tỏa hương thơm ngát ngân hà.',
    soundType: 'cosmic'
  },
  {
    id: 'ship-thunder',
    name: 'Thunder Bolt',
    nameVi: 'Tia Chớp Vàng',
    rarity: 'RARE',
    priceGems: 120,
    icon: '⚡',
    color: '#3b2d04',
    glowColor: '#facc15',
    cockpitColor: '#fef08a',
    wingSpan: 30,
    modelType: 'thunder',
    perkDescription: 'Động cơ lôi điện siêu tốc, hiệu ứng chớp sáng cực ngầu!',
    soundType: 'electric'
  },

  // 🟣 EPIC
  {
    id: 'ship-ufo',
    name: 'Neon UFO',
    nameVi: 'Đĩa Bay Cyber',
    rarity: 'EPIC',
    priceGems: 200,
    icon: '🛸',
    color: '#064e3b',
    glowColor: '#34d399',
    cockpitColor: '#6ee7b7',
    wingSpan: 28,
    modelType: 'ufo',
    perkDescription: 'Khiên bảo vệ vòm xanh phát quang xoay vòng kì ảo.',
    soundType: 'cosmic'
  },
  {
    id: 'ship-aurora',
    name: 'Starlight Dolphin',
    nameVi: 'Cá Heo Ánh Sao',
    rarity: 'EPIC',
    priceGems: 240,
    icon: '🐬',
    color: '#064e3b',
    glowColor: '#2dd4bf',
    cockpitColor: '#ccfbf1',
    wingSpan: 32,
    modelType: 'aurora',
    perkDescription: 'Lướt sóng êm ái xuyên qua các dải cực quang vũ trụ kỳ ảo.',
    soundType: 'cosmic'
  },
  {
    id: 'ship-kitty',
    name: 'Galaxy Kitty Pop',
    nameVi: 'Mèo Miu Vũ Trụ',
    rarity: 'EPIC',
    priceGems: 280,
    icon: '🐱',
    color: '#4a044e',
    glowColor: '#f472b6',
    cockpitColor: '#fdf4ff',
    wingSpan: 32,
    modelType: 'kitty',
    perkDescription: 'Đôi tai mèo dạ quang xinh xắn cùng ống xả khói hình trái tim đáng yêu!',
    soundType: 'cosmic'
  },
  {
    id: 'ship-butterfly',
    name: 'Astral Butterfly',
    nameVi: 'Bướm Tiên Ngân Hà',
    rarity: 'EPIC',
    priceGems: 320,
    icon: '🦋',
    color: '#311042',
    glowColor: '#e879f9',
    cockpitColor: '#fdf4ff',
    wingSpan: 36,
    modelType: 'butterfly',
    perkDescription: 'Đôi cánh bướm dạ quang biến đổi 7 sắc lộng lẫy và kiêu sa.',
    soundType: 'cosmic'
  },

  // 🟡 LEGENDARY
  {
    id: 'ship-dragon',
    name: 'Dragon Blaze',
    nameVi: 'Rồng Lửa Ngân Hà',
    rarity: 'LEGENDARY',
    priceGems: 480,
    icon: '🐲',
    color: '#4c0519',
    glowColor: '#f43f5e',
    cockpitColor: '#fda4af',
    wingSpan: 34,
    modelType: 'dragon',
    perkDescription: 'Cánh rồng phun lửa đuôi kép siêu uy lực, uy chấn toàn cõi không gian!',
    soundType: 'heavy'
  },
  {
    id: 'ship-mecha',
    name: 'Cyber Mecha Paladin',
    nameVi: 'Chiến Giáp Mecha Tương Lai',
    rarity: 'LEGENDARY',
    priceGems: 580,
    icon: '🤖',
    color: '#082f49',
    glowColor: '#00f0ff',
    cockpitColor: '#e0f2fe',
    wingSpan: 36,
    modelType: 'mecha',
    perkDescription: 'Cánh năng lượng công nghệ cao cùng các bit bay hộ tống tự động phát sáng.',
    soundType: 'electric'
  },
  {
    id: 'ship-aegis',
    name: 'Solar Aegis',
    nameVi: 'Siêu Chiến Hạm Hoàng Gia',
    rarity: 'LEGENDARY',
    priceGems: 680,
    icon: '👑',
    color: '#311042',
    glowColor: '#c084fc',
    cockpitColor: '#f472b6',
    wingSpan: 38,
    modelType: 'aegis',
    perkDescription: 'Chiến hạm hoàng kim với 4 viên pha lê hộ vệ xoay quanh!',
    soundType: 'cosmic'
  },

  // 🌌 MYTHIC / CELESTIAL
  {
    id: 'ship-phoenix',
    name: 'Phoenix Sovereign',
    nameVi: 'Phượng Hoàng Bất Diệt',
    rarity: 'MYTHIC',
    priceGems: 950,
    icon: '🔥',
    color: '#431407',
    glowColor: '#ea580c',
    cockpitColor: '#fef08a',
    wingSpan: 40,
    modelType: 'phoenix',
    perkDescription: 'Thần thú phượng hoàng lửa bất tử tỏa hào quang thái dương vĩnh cửu!',
    soundType: 'heavy'
  },
  {
    id: 'ship-valkyrie',
    name: 'Aurora Valkyrie',
    nameVi: 'Nữ Thần Ánh Sáng Valkyrie',
    rarity: 'MYTHIC',
    priceGems: 1100,
    icon: '🌟',
    color: '#1e1b4b',
    glowColor: '#a855f7',
    cockpitColor: '#fdf4ff',
    wingSpan: 42,
    modelType: 'valkyrie',
    perkDescription: 'Đôi cánh quang phổ 7 màu rực rỡ mang sức mạnh bảo hộ của Nữ Thần Ánh Sáng.',
    soundType: 'divine'
  },
  {
    id: 'ship-chrono',
    name: 'Chrono Void Dragon',
    nameVi: 'Rồng Hư Không Thời Gian',
    rarity: 'MYTHIC',
    priceGems: 1350,
    icon: '🌌',
    color: '#090514',
    glowColor: '#8b5cf6',
    cockpitColor: '#c084fc',
    wingSpan: 44,
    modelType: 'chrono',
    perkDescription: 'Tuyệt tác vũ trụ tối thượng! Vòng xoáy không-thời gian bẻ cong mọi quy luật vũ trụ.',
    soundType: 'divine'
  },

  // 🌌 STAR WARS ICONIC FLEET
  {
    id: 'ship-tie',
    name: 'TIE Interceptor',
    nameVi: 'Chiến Cơ TIE Đế Chế',
    rarity: 'RARE',
    priceGems: 150,
    icon: '🛸',
    color: '#18181b',
    glowColor: '#22c55e',
    cockpitColor: '#ef4444',
    wingSpan: 32,
    modelType: 'tie',
    perkDescription: 'Cánh pin năng lượng mặt trời vát nhọn cùng mắt kính ngắm đỏ rực uy dũng.',
    soundType: 'classic'
  },
  {
    id: 'ship-xwing',
    name: 'T-65B X-Wing Starfighter',
    nameVi: 'Chiến Cơ X-Wing Red 5',
    rarity: 'EPIC',
    priceGems: 260,
    icon: '🚀',
    color: '#334155',
    glowColor: '#ef4444',
    cockpitColor: '#38bdf8',
    wingSpan: 36,
    modelType: 'xwing',
    perkDescription: 'Cánh chữ X S-Foils huyền thoại với robot R2-D2 hỗ trợ xoay đầu phát sáng!',
    soundType: 'classic'
  },
  {
    id: 'ship-naboo',
    name: 'Naboo N-1 Starfighter',
    nameVi: 'Phi Thuyền Hoàng Gia Naboo N-1',
    rarity: 'LEGENDARY',
    priceGems: 490,
    icon: '✨',
    color: '#713f12',
    glowColor: '#facc15',
    cockpitColor: '#93c5fd',
    wingSpan: 34,
    modelType: 'naboo',
    perkDescription: 'Mũi crôm bóng loáng phản quang ánh sao, thân thon dài mạ vàng hoàng gia.',
    soundType: 'electric'
  },
  {
    id: 'ship-falcon',
    name: 'Millennium Falcon',
    nameVi: 'Thần Ưng Ngàn Năm',
    rarity: 'LEGENDARY',
    priceGems: 650,
    icon: '🦅',
    color: '#1e293b',
    glowColor: '#00f0ff',
    cockpitColor: '#00f0ff',
    wingSpan: 42,
    modelType: 'falcon',
    perkDescription: 'Huyền thoại vũ trụ của Han Solo với tháp pháo Quad-Laser và luồng xả Hyperdrive xanh neon!',
    soundType: 'heavy'
  },
  {
    id: 'ship-jedi',
    name: 'Jedi Master Interceptor',
    nameVi: 'Chiến Hạm Hiệp Sĩ Jedi',
    rarity: 'MYTHIC',
    priceGems: 1050,
    icon: '⚔️',
    color: '#2e1065',
    glowColor: '#c084fc',
    cockpitColor: '#e0e7ff',
    wingSpan: 40,
    modelType: 'jedi',
    perkDescription: 'Tích hợp tinh thể Kyber thuần khiết, biểu tượng Jedi bảo vệ hòa bình ngân hà!',
    soundType: 'divine'
  }
];

export const BLASTERS: BlasterItem[] = [
  // 🟢 COMMON
  {
    id: 'blaster-single',
    name: 'Standard Blaster',
    nameVi: 'Súng Nòng Đơn',
    rarity: 'COMMON',
    priceGems: 0,
    icon: '🔫',
    barrelCount: 1,
    spreadAngle: 0,
    cannonColor: '#38bdf8',
    description: 'Nòng súng căn bản bắn 1 tia thẳng chuẩn xác.',
    fireSound: 'pew'
  },

  // 🔵 RARE
  {
    id: 'blaster-dual',
    name: 'Twin Blasters',
    nameVi: 'Súng Nòng Kép',
    rarity: 'RARE',
    priceGems: 70,
    icon: '💥',
    barrelCount: 2,
    spreadAngle: 0,
    cannonColor: '#f472b6',
    description: 'Bắn 2 tia song song 2 bên cánh cực đã mắt!',
    fireSound: 'dual'
  },
  {
    id: 'blaster-starflower',
    name: 'Blossom Starburst',
    nameVi: 'Pháo Hoa Sao Băng',
    rarity: 'RARE',
    priceGems: 110,
    icon: '🌺',
    barrelCount: 2,
    spreadAngle: 0.08,
    cannonColor: '#fb7185',
    description: 'Bắn ra chùm cánh hoa phát sáng lung linh huyền ảo!',
    fireSound: 'plasma'
  },

  // 🟣 EPIC
  {
    id: 'blaster-tri',
    name: 'Plasma Tri-Cannon',
    nameVi: 'Súng 3 Nòng Plasma',
    rarity: 'EPIC',
    priceGems: 220,
    icon: '🔱',
    barrelCount: 3,
    spreadAngle: 0.12,
    cannonColor: '#a855f7',
    description: 'Bắn chùm 3 tia bao quát mục tiêu tuyệt đẹp!',
    fireSound: 'plasma'
  },
  {
    id: 'blaster-lotus',
    name: 'Lotus Blossom Mortar',
    nameVi: 'Pháo Đài Sen Ngọc Thần Tiên',
    rarity: 'EPIC',
    priceGems: 300,
    icon: '🪷',
    barrelCount: 3,
    spreadAngle: 0.14,
    cannonColor: '#2dd4bf',
    description: '3 đài sen ngọc bích phát tán chùm xung kích tinh khiết.',
    fireSound: 'plasma'
  },

  // 🟡 LEGENDARY
  {
    id: 'blaster-rainbow',
    name: 'Cosmic Starburst',
    nameVi: 'Pháo Cầu Vồng Vũ Trụ',
    rarity: 'LEGENDARY',
    priceGems: 450,
    icon: '🌟',
    barrelCount: 3,
    spreadAngle: 0.18,
    cannonColor: '#fbbf24',
    description: 'Phóng ra chùm đạn lấp lánh ánh sao cầu vồng!',
    fireSound: 'cannon'
  },
  {
    id: 'blaster-quad',
    name: 'Quad Hyper Gatling',
    nameVi: 'Đại Bác 4 Nòng Sấm Sét',
    rarity: 'LEGENDARY',
    priceGems: 600,
    icon: '⚡',
    barrelCount: 4,
    spreadAngle: 0.16,
    cannonColor: '#facc15',
    description: '4 nòng xoay siêu tốc xả bão đạn liên hồi!',
    fireSound: 'gatling'
  },

  // 🌌 MYTHIC / CELESTIAL
  {
    id: 'blaster-void',
    name: 'Void Singularity Vortex',
    nameVi: 'Pháo Lỗ Đen Hư Không',
    rarity: 'MYTHIC',
    priceGems: 880,
    icon: '🌀',
    barrelCount: 2,
    spreadAngle: 0.1,
    cannonColor: '#8b5cf6',
    description: 'Phóng ra 2 quả cầu lỗ đen hút sạch thiên thạch cản đường!',
    fireSound: 'vortex'
  },
  {
    id: 'blaster-penta',
    name: 'Supernova Penta-Blaster',
    nameVi: 'Thần Pháo 5 Nòng Thái Dương',
    rarity: 'MYTHIC',
    priceGems: 1250,
    icon: '☀️',
    barrelCount: 5,
    spreadAngle: 0.24,
    cannonColor: '#f43f5e',
    description: 'Thần pháo 5 nòng tối thượng bao trùm toàn bộ bầu trời với uy lực hủy diệt!',
    fireSound: 'divine'
  },

  // 🌌 STAR WARS ARSENAL
  {
    id: 'blaster-tie-twin',
    name: 'Imperial Twin Blaster',
    nameVi: 'Pháo Đôi TIE Đế Chế',
    rarity: 'RARE',
    priceGems: 120,
    icon: '🟢',
    barrelCount: 2,
    spreadAngle: 0.05,
    cannonColor: '#22c55e',
    description: 'Bắn 2 tia plasma xanh lục đặc trưng của hạm đội hoàng gia Đế Chế.',
    fireSound: 'starwars_tie'
  },
  {
    id: 'blaster-xwing-quad',
    name: 'T-65 Quad Lasers',
    nameVi: 'Pháo 4 Nòng X-Wing',
    rarity: 'EPIC',
    priceGems: 240,
    icon: '🔴',
    barrelCount: 4,
    spreadAngle: 0.14,
    cannonColor: '#ef4444',
    description: '4 nòng pháo đầu cánh xả đạn plasma đỏ dồn dập chuẩn xác!',
    fireSound: 'starwars_blaster'
  },
  {
    id: 'blaster-falcon-quad',
    name: 'Corellian Quad-Turret',
    nameVi: 'Tháp Pháo 4 Nòng Falcon',
    rarity: 'LEGENDARY',
    priceGems: 520,
    icon: '🔵',
    barrelCount: 4,
    spreadAngle: 0.16,
    cannonColor: '#00f0ff',
    description: 'Tháp pháo xoay 4 nòng uy lực quét sạch chướng ngại vật phía trước!',
    fireSound: 'starwars_quad'
  },
  {
    id: 'blaster-proton',
    name: 'Proton Torpedo Tubes',
    nameVi: 'Ống Phóng Ngư Lôi Proton',
    rarity: 'LEGENDARY',
    priceGems: 620,
    icon: '🟡',
    barrelCount: 2,
    spreadAngle: 0.08,
    cannonColor: '#f59e0b',
    description: 'Phóng ra 2 quả ngư lôi ánh sáng xanh-vàng phát nổ uy lực chấn động!',
    fireSound: 'proton_torpedo'
  },
  {
    id: 'blaster-kyber',
    name: 'Kyber Super-Array',
    nameVi: 'Pháo Hội Tụ Tinh Thể Kyber',
    rarity: 'MYTHIC',
    priceGems: 1100,
    icon: '🟣',
    barrelCount: 3,
    spreadAngle: 0.12,
    cannonColor: '#c084fc',
    description: 'Hội tụ sức mạnh thần bí của đá Kyber tạo chùm laze tím bất khả chiến bại!',
    fireSound: 'kyber_beam'
  }
];

export const LASER_BEAMS: LaserBeamItem[] = [
  // 🟢 COMMON
  {
    id: 'laser-cyan',
    name: 'Neon Cyan Laser',
    nameVi: 'Tia Laze Xanh Ngọc',
    rarity: 'COMMON',
    priceGems: 0,
    icon: '💠',
    beamColor: '#00f0ff',
    trailColor: 'rgba(0, 240, 255, 0.4)',
    coreColor: '#ffffff',
    beamWidth: 3.5,
    particleType: 'spark',
    description: 'Tia laze cổ điển rực rỡ sắc xanh đại dương.'
  },

  // 🔵 RARE
  {
    id: 'laser-heart',
    name: 'Love Nova Pulse',
    nameVi: 'Tia Trái Tim Sao Tím',
    rarity: 'RARE',
    priceGems: 50,
    icon: '💖',
    beamColor: '#ec4899',
    trailColor: 'rgba(236, 72, 153, 0.45)',
    coreColor: '#fdf2f8',
    beamWidth: 4.5,
    particleType: 'heart',
    description: 'Tia năng lượng trái tim kẹo ngọt với bụi sao lấp lánh.'
  },
  {
    id: 'laser-sakura',
    name: 'Sakura Petal Stream',
    nameVi: 'Mưa Cánh Hoa Tinh Vân',
    rarity: 'RARE',
    priceGems: 80,
    icon: '🌸',
    beamColor: '#fb7185',
    trailColor: 'rgba(251, 113, 133, 0.45)',
    coreColor: '#ffe4e6',
    beamWidth: 4.5,
    particleType: 'sakura',
    description: 'Chùm cánh hoa anh đào ngân hà bay lượn ngập tràn sắc xuân.'
  },
  {
    id: 'laser-pink',
    name: 'Pink Plasma Pulse',
    nameVi: 'Tia Plasma Hồng Tím',
    rarity: 'RARE',
    priceGems: 110,
    icon: '💕',
    beamColor: '#f472b6',
    trailColor: 'rgba(244, 114, 182, 0.4)',
    coreColor: '#fdf2f8',
    beamWidth: 4.5,
    particleType: 'plasma',
    description: 'Tia plasma năng lượng kẹo ngọt với đốm sáng bay quanh.'
  },

  // 🟣 EPIC
  {
    id: 'laser-crystal',
    name: 'Diamond Prism Laser',
    nameVi: 'Tia Pha Lê Kim Cương',
    rarity: 'EPIC',
    priceGems: 200,
    icon: '💎',
    beamColor: '#a855f7',
    trailColor: 'rgba(168, 85, 247, 0.45)',
    coreColor: '#ffffff',
    beamWidth: 4.5,
    particleType: 'crystal',
    description: 'Tia khúc xạ pha lê lấp lánh như hàng triệu viên kim cương.'
  },
  {
    id: 'laser-matrix',
    name: 'Cyber Matrix Glitch',
    nameVi: 'Tia Ma Trận Điện Tử Neon',
    rarity: 'EPIC',
    priceGems: 250,
    icon: '🟩',
    beamColor: '#10b981',
    trailColor: 'rgba(16, 185, 129, 0.45)',
    coreColor: '#ecfdf5',
    beamWidth: 4.5,
    particleType: 'matrix',
    description: 'Tia ma trận số Hacker màu xanh neon phát ra các khối dữ liệu điện tử ảo diệu.'
  },
  {
    id: 'laser-lightning',
    name: 'Golden Thunder Ray',
    nameVi: 'Tia Lôi Điện Vàng Sét',
    rarity: 'EPIC',
    priceGems: 290,
    icon: '⚡',
    beamColor: '#facc15',
    trailColor: 'rgba(250, 204, 21, 0.4)',
    coreColor: '#ffffff',
    beamWidth: 4.5,
    particleType: 'lightning',
    description: 'Tia sét vàng zig-zag phát ra tia lửa chớp điện chói lòa.'
  },

  // 🟡 LEGENDARY
  {
    id: 'laser-flame',
    name: 'Ruby Magma Blast',
    nameVi: 'Tia Hỏa Long Ruby',
    rarity: 'LEGENDARY',
    priceGems: 420,
    icon: '🔥',
    beamColor: '#f43f5e',
    trailColor: 'rgba(244, 63, 94, 0.4)',
    coreColor: '#fef08a',
    beamWidth: 5,
    particleType: 'flame',
    description: 'Tia lửa hỏa long nung chảy mọi thiên thạch trên đường đi.'
  },
  {
    id: 'laser-rainbow',
    name: 'Rainbow Cosmic Ray',
    nameVi: 'Tia Cầu Vồng Ngân Hà',
    rarity: 'LEGENDARY',
    priceGems: 520,
    icon: '🌈',
    beamColor: '#38bdf8',
    trailColor: 'rgba(236, 72, 153, 0.5)',
    coreColor: '#ffffff',
    beamWidth: 5.5,
    particleType: 'rainbow',
    description: 'Chùm sáng 7 sắc cầu vồng ảo diệu bậc nhất vũ trụ!'
  },

  // 🌌 MYTHIC / CELESTIAL
  {
    id: 'laser-void',
    name: 'Void Nebula Singularity',
    nameVi: 'Tia Hư Không Tím Huyền Bí',
    rarity: 'MYTHIC',
    priceGems: 750,
    icon: '🔮',
    beamColor: '#8b5cf6',
    trailColor: 'rgba(139, 92, 246, 0.5)',
    coreColor: '#ede9fe',
    beamWidth: 6,
    particleType: 'void',
    description: 'Tia năng lượng hư không sâu thẳm xoáy tròn hút các vì sao lấp lánh!'
  },
  {
    id: 'laser-sunlight',
    name: 'Holy Celestial Sunlight',
    nameVi: 'Tia Thánh Quang Thái Dương',
    rarity: 'MYTHIC',
    priceGems: 950,
    icon: '☀️',
    beamColor: '#fbbf24',
    trailColor: 'rgba(251, 191, 36, 0.55)',
    coreColor: '#ffffff',
    beamWidth: 6.5,
    particleType: 'sunlight',
    description: 'Ánh sáng thần thánh rực rỡ với ngôi sao 4 cánh chói lòa và hào quang thiên sứ!'
  },
  {
    id: 'laser-supernova',
    name: 'Prismatic Supernova Storm',
    nameVi: 'Bão Laze Đa Sắc Tối Thượng',
    rarity: 'MYTHIC',
    priceGems: 1300,
    icon: '✨',
    beamColor: '#ec4899',
    trailColor: 'rgba(0, 240, 255, 0.6)',
    coreColor: '#ffffff',
    beamWidth: 7,
    particleType: 'supernova',
    description: 'Đỉnh cao nghệ thuật vũ trụ! Bão siêu tân tinh chuyển màu liên tục với mưa kim cương.'
  },

  // 🌌 STAR WARS PLASMA BOLTS
  {
    id: 'laser-rebel-red',
    name: 'Rebel Ruby Blaster Bolt',
    nameVi: 'Tia Plasma Đỏ Liên Minh',
    rarity: 'RARE',
    priceGems: 80,
    icon: '🔴',
    beamColor: '#ef4444',
    trailColor: 'rgba(239, 68, 68, 0.45)',
    coreColor: '#ffffff',
    beamWidth: 4.5,
    particleType: 'rebel_red',
    description: 'Viên đạn plasma khí Gas Tibanna đỏ rực kinh điển của phi đội Khởi Nghĩa.'
  },
  {
    id: 'laser-imperial-green',
    name: 'Imperial Emerald Bolt',
    nameVi: 'Tia Laze Xanh Lục Đế Chế',
    rarity: 'RARE',
    priceGems: 90,
    icon: '🟢',
    beamColor: '#22c55e',
    trailColor: 'rgba(34, 197, 94, 0.45)',
    coreColor: '#ffffff',
    beamWidth: 4.5,
    particleType: 'imperial_green',
    description: 'Đạn laze xanh lục năng lượng cực cao của các chiến cơ TIE hoàng gia.'
  },
  {
    id: 'laser-ion-blue',
    name: 'Republic Ion Pulse',
    nameVi: 'Tia Ion Xanh Republic',
    rarity: 'EPIC',
    priceGems: 220,
    icon: '🔵',
    beamColor: '#00f0ff',
    trailColor: 'rgba(0, 240, 255, 0.5)',
    coreColor: '#ffffff',
    beamWidth: 5,
    particleType: 'ion_blue',
    description: 'Tia xung điện Ion xanh neon làm tê liệt và nổ tung mọi mục tiêu.'
  },
  {
    id: 'laser-mando-amber',
    name: 'Mando Beskar Amber Bolt',
    nameVi: 'Tia Hổ Phách Mandalorian',
    rarity: 'LEGENDARY',
    priceGems: 460,
    icon: '🟡',
    beamColor: '#f59e0b',
    trailColor: 'rgba(245, 158, 11, 0.5)',
    coreColor: '#ffffff',
    beamWidth: 5.5,
    particleType: 'mando_amber',
    description: 'Đạn pháo vàng hổ phách hạng nặng mang tinh thần thợ săn tiền thưởng.'
  },
  {
    id: 'laser-kyber-purple',
    name: 'Jedi Kyber Amethyst Pulse',
    nameVi: 'Tia Laze Tím Tinh Thể Kyber',
    rarity: 'MYTHIC',
    priceGems: 880,
    icon: '🟣',
    beamColor: '#c084fc',
    trailColor: 'rgba(192, 132, 252, 0.55)',
    coreColor: '#ffffff',
    beamWidth: 6,
    particleType: 'kyber_purple',
    description: 'Tia sáng tím thần bí của bậc thầy Jedi quyền uy, tỏa ra các mảnh pha lê lấp lánh.'
  }
];

export const getSpaceshipById = (id: string): SpaceshipItem => {
  return SPACESHIPS.find(s => s.id === id) || SPACESHIPS[0];
};

export const getBlasterById = (id: string): BlasterItem => {
  return BLASTERS.find(b => b.id === id) || BLASTERS[0];
};

export const getLaserById = (id: string): LaserBeamItem => {
  return LASER_BEAMS.find(l => l.id === id) || LASER_BEAMS[0];
};
