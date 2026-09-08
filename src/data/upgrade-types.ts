export type DifficultyLevel = 'EASY' | 'NORMAL' | 'HEROIC';

export interface DifficultyConfig {
  id: DifficultyLevel;
  title: string;
  titleVi: string;
  badge: string;
  emoji: string;
  speedMultiplier: number;
  timeLimitSeconds: number;
  xpMultiplier: number;
  gemMultiplier: number;
  color: string;
  description: string;
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
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
    gemMultiplier: 1.25,
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
    gemMultiplier: 2.0,
    color: '#f43f5e',
    description: 'Đếm ngược gấp gáp, từ rơi nhanh, x2 thưởng Kim Cương!'
  }
};

export interface SpaceshipItem {
  id: string;
  name: string;
  nameVi: string;
  priceGems: number;
  icon: string;
  color: string;
  glowColor: string;
  cockpitColor: string;
  wingSpan: number;
  modelType: 'scout' | 'thunder' | 'ufo' | 'dragon' | 'aegis' | 'pegasus' | 'sakura' | 'aurora' | 'butterfly';
  perkDescription: string;
  soundType: 'classic' | 'electric' | 'heavy' | 'cosmic';
}

export interface BlasterItem {
  id: string;
  name: string;
  nameVi: string;
  priceGems: number;
  icon: string;
  barrelCount: 1 | 2 | 3 | 4;
  spreadAngle: number;
  cannonColor: string;
  description: string;
  fireSound: 'pew' | 'dual' | 'plasma' | 'cannon';
}

export interface LaserBeamItem {
  id: string;
  name: string;
  nameVi: string;
  priceGems: number;
  icon: string;
  beamColor: string;
  trailColor: string;
  coreColor: string;
  beamWidth: number;
  particleType: 'spark' | 'lightning' | 'plasma' | 'rainbow' | 'flame' | 'heart' | 'sakura' | 'crystal';
  description: string;
}

export const SPACESHIPS: SpaceshipItem[] = [
  {
    id: 'ship-scout',
    name: 'Star Scout',
    nameVi: 'Phi Thuyền Tân Thủ',
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
  {
    id: 'ship-pegasus',
    name: 'Starlight Pegasus',
    nameVi: 'Ngựa Bay Tinh Vân',
    priceGems: 30,
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
    priceGems: 60,
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
    priceGems: 80,
    icon: '⚡',
    color: '#3b2d04',
    glowColor: '#facc15',
    cockpitColor: '#fef08a',
    wingSpan: 30,
    modelType: 'thunder',
    perkDescription: 'Động cơ lôi điện siêu tốc, hiệu ứng chớp sáng cực ngầu!',
    soundType: 'electric'
  },
  {
    id: 'ship-aurora',
    name: 'Starlight Dolphin',
    nameVi: 'Cá Heo Ánh Sao',
    priceGems: 100,
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
    id: 'ship-butterfly',
    name: 'Astral Butterfly',
    nameVi: 'Bướm Tiên Ngân Hà',
    priceGems: 120,
    icon: '🦋',
    color: '#311042',
    glowColor: '#e879f9',
    cockpitColor: '#fdf4ff',
    wingSpan: 36,
    modelType: 'butterfly',
    perkDescription: 'Đôi cánh bướm dạ quang biến đổi 7 sắc lộng lẫy và kiêu sa.',
    soundType: 'cosmic'
  },
  {
    id: 'ship-ufo',
    name: 'Neon UFO',
    nameVi: 'Đĩa Bay Cyber',
    priceGems: 140,
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
    id: 'ship-dragon',
    name: 'Dragon Blaze',
    nameVi: 'Rồng Lửa Ngân Hà',
    priceGems: 160,
    icon: '🐲',
    color: '#4c0519',
    glowColor: '#f43f5e',
    cockpitColor: '#fda4af',
    wingSpan: 34,
    modelType: 'dragon',
    perkDescription: 'Cánh rồng phun lửa đuôi kép siêu uy lực!',
    soundType: 'heavy'
  },
  {
    id: 'ship-aegis',
    name: 'Solar Aegis',
    nameVi: 'Siêu Chiến Hạm Hoàng Gia',
    priceGems: 200,
    icon: '👑',
    color: '#311042',
    glowColor: '#c084fc',
    cockpitColor: '#f472b6',
    wingSpan: 38,
    modelType: 'aegis',
    perkDescription: 'Chiến hạm tối thượng của Vua và Nữ Hoàng Ngân Hà!',
    soundType: 'cosmic'
  }
];

export const BLASTERS: BlasterItem[] = [
  {
    id: 'blaster-single',
    name: 'Standard Blaster',
    nameVi: 'Súng Nòng Đơn',
    priceGems: 0,
    icon: '🔫',
    barrelCount: 1,
    spreadAngle: 0,
    cannonColor: '#38bdf8',
    description: 'Nòng súng căn bản bắn 1 tia thẳng chuẩn xác.',
    fireSound: 'pew'
  },
  {
    id: 'blaster-dual',
    name: 'Twin Blasters',
    nameVi: 'Súng Nòng Kép',
    priceGems: 50,
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
    priceGems: 90,
    icon: '🌺',
    barrelCount: 2,
    spreadAngle: 0.08,
    cannonColor: '#fb7185',
    description: 'Bắn ra chùm cánh hoa phát sáng lung linh huyền ảo!',
    fireSound: 'plasma'
  },
  {
    id: 'blaster-tri',
    name: 'Plasma Tri-Cannon',
    nameVi: 'Súng 3 Nòng Plasma',
    priceGems: 130,
    icon: '🔱',
    barrelCount: 3,
    spreadAngle: 0.12,
    cannonColor: '#a855f7',
    description: 'Bắn chùm 3 tia bao quát mục tiêu tuyệt đẹp!',
    fireSound: 'plasma'
  },
  {
    id: 'blaster-rainbow',
    name: 'Cosmic Starburst',
    nameVi: 'Pháo Cầu Vồng Vũ Trụ',
    priceGems: 180,
    icon: '🌟',
    barrelCount: 3,
    spreadAngle: 0.18,
    cannonColor: '#fbbf24',
    description: 'Phóng ra chùm đạn lấp lánh ánh sao cầu vồng!',
    fireSound: 'cannon'
  }
];

export const LASER_BEAMS: LaserBeamItem[] = [
  {
    id: 'laser-cyan',
    name: 'Neon Cyan Laser',
    nameVi: 'Tia Laze Xanh Ngọc',
    priceGems: 0,
    icon: '💠',
    beamColor: '#00f0ff',
    trailColor: 'rgba(0, 240, 255, 0.4)',
    coreColor: '#ffffff',
    beamWidth: 3.5,
    particleType: 'spark',
    description: 'Tia laze cổ điển rực rỡ sắc xanh đại dương.'
  },
  {
    id: 'laser-heart',
    name: 'Love Nova Pulse',
    nameVi: 'Tia Trái Tim Sao Tím',
    priceGems: 30,
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
    priceGems: 55,
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
    priceGems: 70,
    icon: '💕',
    beamColor: '#f472b6',
    trailColor: 'rgba(244, 114, 182, 0.4)',
    coreColor: '#fdf2f8',
    beamWidth: 4.5,
    particleType: 'plasma',
    description: 'Tia plasma năng lượng kẹo ngọt với đốm sáng bay quanh.'
  },
  {
    id: 'laser-crystal',
    name: 'Diamond Prism Laser',
    nameVi: 'Tia Pha Lê Kim Cương',
    priceGems: 95,
    icon: '💎',
    beamColor: '#a855f7',
    trailColor: 'rgba(168, 85, 247, 0.45)',
    coreColor: '#ffffff',
    beamWidth: 4.5,
    particleType: 'crystal',
    description: 'Tia khúc xạ pha lê lấp lánh như hàng triệu viên kim cương.'
  },
  {
    id: 'laser-lightning',
    name: 'Golden Thunder Ray',
    nameVi: 'Tia Lôi Điện Vàng Sét',
    priceGems: 115,
    icon: '⚡',
    beamColor: '#facc15',
    trailColor: 'rgba(250, 204, 21, 0.4)',
    coreColor: '#ffffff',
    beamWidth: 4,
    particleType: 'lightning',
    description: 'Tia sét vàng zig-zag phát ra tia lửa chớp điện chói lòa.'
  },
  {
    id: 'laser-flame',
    name: 'Ruby Magma Blast',
    nameVi: 'Tia Hỏa Long Ruby',
    priceGems: 140,
    icon: '🔥',
    beamColor: '#f43f5e',
    trailColor: 'rgba(244, 63, 94, 0.4)',
    coreColor: '#fef08a',
    beamWidth: 5,
    particleType: 'flame',
    description: 'Tia lửa nung chảy mọi thiên thạch trên đường đi.'
  },
  {
    id: 'laser-rainbow',
    name: 'Rainbow Cosmic Ray',
    nameVi: 'Tia Cầu Vồng Ngân Hà',
    priceGems: 170,
    icon: '🌈',
    beamColor: '#38bdf8',
    trailColor: 'rgba(236, 72, 153, 0.5)',
    coreColor: '#ffffff',
    beamWidth: 5.5,
    particleType: 'rainbow',
    description: 'Chùm sáng 7 sắc cầu vồng ảo diệu bậc nhất vũ trụ!'
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
