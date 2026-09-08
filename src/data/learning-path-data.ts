import { Unit } from './progress-types';

export const LEARNING_UNITS: Unit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Colors & Basic Numbers',
    titleVi: 'Sắc Màu & Số Đếm Kỳ Diệu',
    description: 'Bắt đầu hành trình khám phá những màu sắc rực rỡ và số đếm đầu tiên!',
    icon: '🎨',
    themeColor: '#00f0ff',
    bannerBg: 'from-cyan-500/30 via-sky-500/20 to-blue-600/30',
    levels: [
      {
        id: 'lvl-1-1',
        unitId: 'unit-1',
        levelNumber: 1,
        title: 'Primary Colors',
        titleVi: 'Màu Sắc Cơ Bản',
        type: 'STANDARD',
        icon: '🔴',
        bgColor: '#ef4444',
        targetScore: 300,
        xpReward: 15,
        gemReward: 5,
        speedMultiplier: 0.55,
        spawnInterval: 2500,
        words: [
          { id: 'c1', word: 'red', meaningVi: 'màu đỏ', category: 'Colors', emoji: '🔴', pronunciation: '/red/' },
          { id: 'c2', word: 'blue', meaningVi: 'màu xanh dương', category: 'Colors', emoji: '🔵', pronunciation: '/bluː/' },
          { id: 'c3', word: 'pink', meaningVi: 'màu hồng', category: 'Colors', emoji: '🌸', pronunciation: '/pɪŋk/' },
          { id: 's1', word: 'sun', meaningVi: 'mặt trời', category: 'Nature', emoji: '☀️', pronunciation: '/sʌn/' }
        ]
      },
      {
        id: 'lvl-1-2',
        unitId: 'unit-1',
        levelNumber: 2,
        title: 'More Colors & Stars',
        titleVi: 'Màu Xanh & Ngôi Sao',
        type: 'STANDARD',
        icon: '🟢',
        bgColor: '#22c55e',
        targetScore: 400,
        xpReward: 20,
        gemReward: 5,
        speedMultiplier: 0.6,
        spawnInterval: 2400,
        words: [
          { id: 'c4', word: 'green', meaningVi: 'màu xanh lá', category: 'Colors', emoji: '🟢', pronunciation: '/ɡriːn/' },
          { id: 'c5', word: 'yellow', meaningVi: 'màu vàng', category: 'Colors', emoji: '⭐', pronunciation: '/ˈjeləʊ/' },
          { id: 's2', word: 'star', meaningVi: 'ngôi sao', category: 'Nature', emoji: '✨', pronunciation: '/stɑːr/' },
          { id: 's3', word: 'sky', meaningVi: 'bầu trời', category: 'Nature', emoji: '🌌', pronunciation: '/skaɪ/' }
        ]
      },
      {
        id: 'lvl-1-3',
        unitId: 'unit-1',
        levelNumber: 3,
        title: 'Numbers 1 to 5',
        titleVi: 'Tập Đếm Số 1 - 5',
        type: 'STANDARD',
        icon: '🔢',
        bgColor: '#f59e0b',
        targetScore: 500,
        xpReward: 20,
        gemReward: 8,
        speedMultiplier: 0.65,
        spawnInterval: 2300,
        words: [
          { id: 'n1', word: 'one', meaningVi: 'số một (1)', category: 'Numbers', emoji: '1️⃣', pronunciation: '/wʌn/' },
          { id: 'n2', word: 'two', meaningVi: 'số hai (2)', category: 'Numbers', emoji: '2️⃣', pronunciation: '/tuː/' },
          { id: 'n3', word: 'three', meaningVi: 'số ba (3)', category: 'Numbers', emoji: '3️⃣', pronunciation: '/θriː/' },
          { id: 'n4', word: 'four', meaningVi: 'số bốn (4)', category: 'Numbers', emoji: '4️⃣', pronunciation: '/fɔːr/' },
          { id: 'n5', word: 'five', meaningVi: 'số năm (5)', category: 'Numbers', emoji: '5️⃣', pronunciation: '/faɪv/' }
        ]
      },
      {
        id: 'lvl-1-4',
        unitId: 'unit-1',
        levelNumber: 4,
        title: 'Treasure Chest',
        titleVi: 'Rương Kho Báu Sắc Màu',
        type: 'CHEST_REWARD',
        icon: '🎁',
        bgColor: '#ec4899',
        targetScore: 0,
        xpReward: 30,
        gemReward: 25,
        speedMultiplier: 0,
        spawnInterval: 0,
        words: []
      },
      {
        id: 'lvl-1-5',
        unitId: 'unit-1',
        levelNumber: 5,
        title: 'Boss Monster Battle',
        titleVi: 'Đại Chiến Trùm Màu Sắc',
        type: 'BOSS_BATTLE',
        icon: '👑',
        bgColor: '#8b5cf6',
        targetScore: 700,
        xpReward: 40,
        gemReward: 15,
        speedMultiplier: 0.7,
        spawnInterval: 2100,
        words: [
          { id: 'c1', word: 'red', meaningVi: 'màu đỏ', category: 'Colors', emoji: '🔴', pronunciation: '/red/' },
          { id: 'c2', word: 'blue', meaningVi: 'màu xanh dương', category: 'Colors', emoji: '🔵', pronunciation: '/bluː/' },
          { id: 'c4', word: 'green', meaningVi: 'màu xanh lá', category: 'Colors', emoji: '🟢', pronunciation: '/ɡriːn/' },
          { id: 'c5', word: 'yellow', meaningVi: 'màu vàng', category: 'Colors', emoji: '⭐', pronunciation: '/ˈjeləʊ/' },
          { id: 'n3', word: 'three', meaningVi: 'số ba', category: 'Numbers', emoji: '3️⃣', pronunciation: '/θriː/' },
          { id: 'n6', word: 'ten', meaningVi: 'số mười (10)', category: 'Numbers', emoji: '🔟', pronunciation: '/ten/' }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Cute Animal Friends',
    titleVi: 'Vương Quốc Động Vật Đáng Yêu',
    description: 'Gặp gỡ những người bạn động vật siêu dễ thương trong vũ trụ!',
    icon: '🐾',
    themeColor: '#39ff14',
    bannerBg: 'from-emerald-500/30 via-green-500/20 to-teal-600/30',
    levels: [
      {
        id: 'lvl-2-1',
        unitId: 'unit-2',
        levelNumber: 1,
        title: 'Pet Friends',
        titleVi: 'Thú Cưng Trong Nhà',
        type: 'STANDARD',
        icon: '🐱',
        bgColor: '#10b981',
        targetScore: 400,
        xpReward: 20,
        gemReward: 5,
        speedMultiplier: 0.6,
        spawnInterval: 2300,
        words: [
          { id: 'a1', word: 'cat', meaningVi: 'con mèo', category: 'Animals', emoji: '🐱', pronunciation: '/kæt/' },
          { id: 'a2', word: 'dog', meaningVi: 'con chó', category: 'Animals', emoji: '🐶', pronunciation: '/dɒɡ/' },
          { id: 'a3', word: 'bird', meaningVi: 'con chim', category: 'Animals', emoji: '🐦', pronunciation: '/bɜːd/' },
          { id: 'a5', word: 'fish', meaningVi: 'con cá', category: 'Animals', emoji: '🐟', pronunciation: '/fɪʃ/' }
        ]
      },
      {
        id: 'lvl-2-2',
        unitId: 'unit-2',
        levelNumber: 2,
        title: 'Farm Animals',
        titleVi: 'Động Vật Nông Trại',
        type: 'STANDARD',
        icon: '🐮',
        bgColor: '#14b8a6',
        targetScore: 450,
        xpReward: 20,
        gemReward: 6,
        speedMultiplier: 0.65,
        spawnInterval: 2200,
        words: [
          { id: 'a4', word: 'duck', meaningVi: 'con vịt', category: 'Animals', emoji: '🦆', pronunciation: '/dʌk/' },
          { id: 'a9', word: 'pig', meaningVi: 'con heo', category: 'Animals', emoji: '🐷', pronunciation: '/pɪɡ/' },
          { id: 'a12', word: 'cow', meaningVi: 'con bò', category: 'Animals', emoji: '🐮', pronunciation: '/kaʊ/' },
          { id: 'a10', word: 'bee', meaningVi: 'con ong', category: 'Animals', emoji: '🐝', pronunciation: '/biː/' }
        ]
      },
      {
        id: 'lvl-2-3',
        unitId: 'unit-2',
        levelNumber: 3,
        title: 'Wild Jungle Animals',
        titleVi: 'Rừng Xanh Kỳ Thú',
        type: 'SPEED_RUSH',
        icon: '🦁',
        bgColor: '#f97316',
        targetScore: 600,
        xpReward: 25,
        gemReward: 10,
        speedMultiplier: 0.7,
        spawnInterval: 2000,
        words: [
          { id: 'a6', word: 'bear', meaningVi: 'con gấu', category: 'Animals', emoji: '🐻', pronunciation: '/beər/' },
          { id: 'a7', word: 'lion', meaningVi: 'sư tử', category: 'Animals', emoji: '🦁', pronunciation: '/ˈlaɪən/' },
          { id: 'a8', word: 'frog', meaningVi: 'con ếch', category: 'Animals', emoji: '🐸', pronunciation: '/frɒɡ/' },
          { id: 'a11', word: 'fox', meaningVi: 'con cáo', category: 'Animals', emoji: '🦊', pronunciation: '/fɒks/' }
        ]
      },
      {
        id: 'lvl-2-4',
        unitId: 'unit-2',
        levelNumber: 4,
        title: 'Animal Chest',
        titleVi: 'Rương Quà Muôn Thú',
        type: 'CHEST_REWARD',
        icon: '🎁',
        bgColor: '#06b6d4',
        targetScore: 0,
        xpReward: 35,
        gemReward: 30,
        speedMultiplier: 0,
        spawnInterval: 0,
        words: []
      },
      {
        id: 'lvl-2-5',
        unitId: 'unit-2',
        levelNumber: 5,
        title: 'Safari Boss Challenge',
        titleVi: 'Chúa Tể Muôn Loài',
        type: 'BOSS_BATTLE',
        icon: '👑',
        bgColor: '#d946ef',
        targetScore: 800,
        xpReward: 45,
        gemReward: 20,
        speedMultiplier: 0.75,
        spawnInterval: 1900,
        words: [
          { id: 'a1', word: 'cat', meaningVi: 'con mèo', category: 'Animals', emoji: '🐱', pronunciation: '/kæt/' },
          { id: 'a7', word: 'lion', meaningVi: 'sư tử', category: 'Animals', emoji: '🦁', pronunciation: '/ˈlaɪən/' },
          { id: 'a6', word: 'bear', meaningVi: 'con gấu', category: 'Animals', emoji: '🐻', pronunciation: '/beər/' },
          { id: 'a8', word: 'frog', meaningVi: 'con ếch', category: 'Animals', emoji: '🐸', pronunciation: '/frɒɡ/' },
          { id: 'a5', word: 'fish', meaningVi: 'con cá', category: 'Animals', emoji: '🐟', pronunciation: '/fɪʃ/' },
          { id: 'a11', word: 'fox', meaningVi: 'con cáo', category: 'Animals', emoji: '🦊', pronunciation: '/fɒks/' }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'School & Fun Toys',
    titleVi: 'Trường Học & Đồ Chơi Vui Nhộn',
    description: 'Học tập cùng sách vở, bút thước và những món đồ chơi hấp dẫn!',
    icon: '🎒',
    themeColor: '#ff007f',
    bannerBg: 'from-pink-500/30 via-rose-500/20 to-purple-600/30',
    levels: [
      {
        id: 'lvl-3-1',
        unitId: 'unit-3',
        levelNumber: 1,
        title: 'School Bag Items',
        titleVi: 'Dụng Cụ Học Tập',
        type: 'STANDARD',
        icon: '✏️',
        bgColor: '#ec4899',
        targetScore: 400,
        xpReward: 20,
        gemReward: 6,
        speedMultiplier: 0.65,
        spawnInterval: 2200,
        words: [
          { id: 't1', word: 'pen', meaningVi: 'cây bút', category: 'School', emoji: '🖊️', pronunciation: '/pen/' },
          { id: 't2', word: 'book', meaningVi: 'quyển sách', category: 'School', emoji: '📖', pronunciation: '/bʊk/' },
          { id: 't3', word: 'bag', meaningVi: 'cái cặp', category: 'School', emoji: '🎒', pronunciation: '/bæɡ/' },
          { id: 't4', word: 'desk', meaningVi: 'bàn học', category: 'School', emoji: '🪑', pronunciation: '/desk/' }
        ]
      },
      {
        id: 'lvl-3-2',
        unitId: 'unit-3',
        levelNumber: 2,
        title: 'Favorite Toys',
        titleVi: 'Đồ Chơi Bé Thích',
        type: 'STANDARD',
        icon: '🤖',
        bgColor: '#a855f7',
        targetScore: 500,
        xpReward: 25,
        gemReward: 8,
        speedMultiplier: 0.7,
        spawnInterval: 2100,
        words: [
          { id: 't5', word: 'ball', meaningVi: 'quả bóng', category: 'Toys', emoji: '⚽', pronunciation: '/bɔːl/' },
          { id: 't6', word: 'kite', meaningVi: 'con diều', category: 'Toys', emoji: '🪁', pronunciation: '/kaɪt/' },
          { id: 't7', word: 'car', meaningVi: 'xe ô tô', category: 'Toys', emoji: '🚗', pronunciation: '/kɑːr/' },
          { id: 't8', word: 'doll', meaningVi: 'búp bê', category: 'Toys', emoji: '🪆', pronunciation: '/dɒl/' },
          { id: 't9', word: 'robot', meaningVi: 'người máy', category: 'Toys', emoji: '🤖', pronunciation: '/ˈrəʊbɒt/' }
        ]
      },
      {
        id: 'lvl-3-3',
        unitId: 'unit-3',
        levelNumber: 3,
        title: 'Classroom Objects',
        titleVi: 'Đồ Vật Quanh Em',
        type: 'SPEED_RUSH',
        icon: '🔔',
        bgColor: '#6366f1',
        targetScore: 600,
        xpReward: 25,
        gemReward: 10,
        speedMultiplier: 0.75,
        spawnInterval: 1900,
        words: [
          { id: 't10', word: 'box', meaningVi: 'cái hộp', category: 'Objects', emoji: '📦', pronunciation: '/bɒks/' },
          { id: 't11', word: 'bell', meaningVi: 'cái chuông', category: 'School', emoji: '🔔', pronunciation: '/bel/' },
          { id: 't12', word: 'map', meaningVi: 'bản đồ', category: 'School', emoji: '🗺️', pronunciation: '/mæp/' },
          { id: 't1', word: 'pen', meaningVi: 'cây bút', category: 'School', emoji: '🖊️', pronunciation: '/pen/' }
        ]
      },
      {
        id: 'lvl-3-4',
        unitId: 'unit-3',
        levelNumber: 4,
        title: 'Toy Chest Reward',
        titleVi: 'Rương Đồ Chơi Ma Thuật',
        type: 'CHEST_REWARD',
        icon: '🎁',
        bgColor: '#3b82f6',
        targetScore: 0,
        xpReward: 40,
        gemReward: 35,
        speedMultiplier: 0,
        spawnInterval: 0,
        words: []
      },
      {
        id: 'lvl-3-5',
        unitId: 'unit-3',
        levelNumber: 5,
        title: 'Robot Boss Challenge',
        titleVi: 'Đại Chiến Robot Không Gian',
        type: 'BOSS_BATTLE',
        icon: '👑',
        bgColor: '#e11d48',
        targetScore: 900,
        xpReward: 50,
        gemReward: 25,
        speedMultiplier: 0.8,
        spawnInterval: 1800,
        words: [
          { id: 't9', word: 'robot', meaningVi: 'người máy', category: 'Toys', emoji: '🤖', pronunciation: '/ˈrəʊbɒt/' },
          { id: 't2', word: 'book', meaningVi: 'quyển sách', category: 'School', emoji: '📖', pronunciation: '/bʊk/' },
          { id: 't7', word: 'car', meaningVi: 'xe ô tô', category: 'Toys', emoji: '🚗', pronunciation: '/kɑːr/' },
          { id: 't5', word: 'ball', meaningVi: 'quả bóng', category: 'Toys', emoji: '⚽', pronunciation: '/bɔːl/' },
          { id: 't6', word: 'kite', meaningVi: 'con diều', category: 'Toys', emoji: '🪁', pronunciation: '/kaɪt/' },
          { id: 't11', word: 'bell', meaningVi: 'cái chuông', category: 'School', emoji: '🔔', pronunciation: '/bel/' }
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Food & Yummy Treats',
    titleVi: 'Món Ngon Bé Thích',
    description: 'Thưởng thức bữa tiệc đồ ăn ngọt ngào và bổ dưỡng!',
    icon: '🍰',
    themeColor: '#ffe600',
    bannerBg: 'from-amber-500/30 via-yellow-500/20 to-orange-600/30',
    levels: [
      {
        id: 'lvl-4-1',
        unitId: 'unit-4',
        levelNumber: 1,
        title: 'Breakfast Time',
        titleVi: 'Bữa Sáng Ngọt Ngào',
        type: 'STANDARD',
        icon: '🥛',
        bgColor: '#eab308',
        targetScore: 450,
        xpReward: 20,
        gemReward: 6,
        speedMultiplier: 0.65,
        spawnInterval: 2200,
        words: [
          { id: 'f1', word: 'milk', meaningVi: 'sữa', category: 'Food', emoji: '🥛', pronunciation: '/mɪlk/' },
          { id: 'f2', word: 'cake', meaningVi: 'bánh ngọt', category: 'Food', emoji: '🍰', pronunciation: '/keɪk/' },
          { id: 'f3', word: 'apple', meaningVi: 'quả táo', category: 'Food', emoji: '🍎', pronunciation: '/ˈæpl/' },
          { id: 'f4', word: 'bread', meaningVi: 'bánh mì', category: 'Food', emoji: '🍞', pronunciation: '/bred/' }
        ]
      },
      {
        id: 'lvl-4-2',
        unitId: 'unit-4',
        levelNumber: 2,
        title: 'Lunch & Drinks',
        titleVi: 'Bữa Trưa Năng Lượng',
        type: 'STANDARD',
        icon: '🧃',
        bgColor: '#f97316',
        targetScore: 500,
        xpReward: 25,
        gemReward: 8,
        speedMultiplier: 0.7,
        spawnInterval: 2100,
        words: [
          { id: 'f5', word: 'egg', meaningVi: 'quả trứng', category: 'Food', emoji: '🥚', pronunciation: '/eɡ/' },
          { id: 'f6', word: 'rice', meaningVi: 'cơm', category: 'Food', emoji: '🍚', pronunciation: '/raɪs/' },
          { id: 'f7', word: 'juice', meaningVi: 'nước ép', category: 'Food', emoji: '🧃', pronunciation: '/dʒuːs/' },
          { id: 'f8', word: 'soup', meaningVi: 'món súp', category: 'Food', emoji: '🍲', pronunciation: '/suːp/' }
        ]
      },
      {
        id: 'lvl-4-3',
        unitId: 'unit-4',
        levelNumber: 3,
        title: 'Sweet Treats',
        titleVi: 'Bánh Kẹo Tráng Miệng',
        type: 'SPEED_RUSH',
        icon: '🍬',
        bgColor: '#ec4899',
        targetScore: 650,
        xpReward: 30,
        gemReward: 10,
        speedMultiplier: 0.75,
        spawnInterval: 1900,
        words: [
          { id: 'f9', word: 'candy', meaningVi: 'kẹo ngọt', category: 'Food', emoji: '🍬', pronunciation: '/ˈkændi/' },
          { id: 'f10', word: 'nut', meaningVi: 'hạt dẻ', category: 'Food', emoji: '🥜', pronunciation: '/nʌt/' },
          { id: 'f11', word: 'pie', meaningVi: 'bánh nướng', category: 'Food', emoji: '🥧', pronunciation: '/paɪ/' },
          { id: 'f12', word: 'jam', meaningVi: 'mứt dâu', category: 'Food', emoji: '🍓', pronunciation: '/dʒæm/' }
        ]
      },
      {
        id: 'lvl-4-4',
        unitId: 'unit-4',
        levelNumber: 4,
        title: 'Delicious Chest',
        titleVi: 'Rương Bánh Kẹo Vàng',
        type: 'CHEST_REWARD',
        icon: '🎁',
        bgColor: '#84cc16',
        targetScore: 0,
        xpReward: 45,
        gemReward: 40,
        speedMultiplier: 0,
        spawnInterval: 0,
        words: []
      },
      {
        id: 'lvl-4-5',
        unitId: 'unit-4',
        levelNumber: 5,
        title: 'Chef Boss Monster',
        titleVi: 'Trùm Bếp Trưởng Vũ Trụ',
        type: 'BOSS_BATTLE',
        icon: '👑',
        bgColor: '#f43f5e',
        targetScore: 1000,
        xpReward: 60,
        gemReward: 30,
        speedMultiplier: 0.8,
        spawnInterval: 1800,
        words: [
          { id: 'f3', word: 'apple', meaningVi: 'quả táo', category: 'Food', emoji: '🍎', pronunciation: '/ˈæpl/' },
          { id: 'f9', word: 'candy', meaningVi: 'kẹo ngọt', category: 'Food', emoji: '🍬', pronunciation: '/ˈkændi/' },
          { id: 'f2', word: 'cake', meaningVi: 'bánh ngọt', category: 'Food', emoji: '🍰', pronunciation: '/keɪk/' },
          { id: 'f7', word: 'juice', meaningVi: 'nước ép', category: 'Food', emoji: '🧃', pronunciation: '/dʒuːs/' },
          { id: 'f1', word: 'milk', meaningVi: 'sữa', category: 'Food', emoji: '🥛', pronunciation: '/mɪlk/' },
          { id: 'f4', word: 'bread', meaningVi: 'bánh mì', category: 'Food', emoji: '🍞', pronunciation: '/bred/' }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Space Master Champions',
    titleVi: 'Nhà Du Hành Vũ Trụ Xuất Sắc',
    description: 'Thử thách đỉnh cao tổng hợp tất cả các từ vựng đã học!',
    icon: '🚀',
    themeColor: '#a855f7',
    bannerBg: 'from-purple-500/30 via-indigo-500/20 to-sky-600/30',
    levels: [
      {
        id: 'lvl-5-1',
        unitId: 'unit-5',
        levelNumber: 1,
        title: 'Cosmic Colors & Animals',
        titleVi: 'Vũ Trụ Sắc Màu & Thú Cưng',
        type: 'STANDARD',
        icon: '🪐',
        bgColor: '#8b5cf6',
        targetScore: 600,
        xpReward: 30,
        gemReward: 10,
        speedMultiplier: 0.75,
        spawnInterval: 2000,
        words: [
          { id: 's2', word: 'star', meaningVi: 'ngôi sao', category: 'Nature', emoji: '✨', pronunciation: '/stɑːr/' },
          { id: 's1', word: 'sun', meaningVi: 'mặt trời', category: 'Nature', emoji: '☀️', pronunciation: '/sʌn/' },
          { id: 'a1', word: 'cat', meaningVi: 'con mèo', category: 'Animals', emoji: '🐱', pronunciation: '/kæt/' },
          { id: 'a7', word: 'lion', meaningVi: 'sư tử', category: 'Animals', emoji: '🦁', pronunciation: '/ˈlaɪən/' }
        ]
      },
      {
        id: 'lvl-5-2',
        unitId: 'unit-5',
        levelNumber: 2,
        title: 'Super Astro Speed',
        titleVi: 'Tốc Độ Phi Thuyền Vũ Trụ',
        type: 'SPEED_RUSH',
        icon: '⚡',
        bgColor: '#ec4899',
        targetScore: 800,
        xpReward: 40,
        gemReward: 15,
        speedMultiplier: 0.85,
        spawnInterval: 1700,
        words: [
          { id: 't9', word: 'robot', meaningVi: 'người máy', category: 'Toys', emoji: '🤖', pronunciation: '/ˈrəʊbɒt/' },
          { id: 'f9', word: 'candy', meaningVi: 'kẹo ngọt', category: 'Food', emoji: '🍬', pronunciation: '/ˈkændi/' },
          { id: 'f3', word: 'apple', meaningVi: 'quả táo', category: 'Food', emoji: '🍎', pronunciation: '/ˈæpl/' },
          { id: 't7', word: 'car', meaningVi: 'xe ô tô', category: 'Toys', emoji: '🚗', pronunciation: '/kɑːr/' }
        ]
      },
      {
        id: 'lvl-5-3',
        unitId: 'unit-5',
        levelNumber: 3,
        title: 'Cosmic Grand Chest',
        titleVi: 'Rương Siêu Cấp Vũ Trụ',
        type: 'CHEST_REWARD',
        icon: '💎',
        bgColor: '#06b6d4',
        targetScore: 0,
        xpReward: 100,
        gemReward: 50,
        speedMultiplier: 0,
        spawnInterval: 0,
        words: []
      },
      {
        id: 'lvl-5-4',
        unitId: 'unit-5',
        levelNumber: 4,
        title: 'Final Galaxy Boss',
        titleVi: 'Vua Thiên Hà Tối Thượng',
        type: 'BOSS_BATTLE',
        icon: '👑',
        bgColor: '#f59e0b',
        targetScore: 1200,
        xpReward: 80,
        gemReward: 50,
        speedMultiplier: 0.9,
        spawnInterval: 1600,
        words: [
          { id: 't9', word: 'robot', meaningVi: 'người máy', category: 'Toys', emoji: '🤖', pronunciation: '/ˈrəʊbɒt/' },
          { id: 'a7', word: 'lion', meaningVi: 'sư tử', category: 'Animals', emoji: '🦁', pronunciation: '/ˈlaɪən/' },
          { id: 'f3', word: 'apple', meaningVi: 'quả táo', category: 'Food', emoji: '🍎', pronunciation: '/ˈæpl/' },
          { id: 'c5', word: 'yellow', meaningVi: 'màu vàng', category: 'Colors', emoji: '⭐', pronunciation: '/ˈjeləʊ/' },
          { id: 'n5', word: 'five', meaningVi: 'số năm', category: 'Numbers', emoji: '5️⃣', pronunciation: '/faɪv/' },
          { id: 'a6', word: 'bear', meaningVi: 'con gấu', category: 'Animals', emoji: '🐻', pronunciation: '/beər/' }
        ]
      }
    ]
  }
];

export const ALL_LEVELS = LEARNING_UNITS.flatMap(u => u.levels);
export const getLevelById = (id: string) => ALL_LEVELS.find(l => l.id === id) || ALL_LEVELS[0];
export const getNextLevel = (currentId: string) => {
  const currentIndex = ALL_LEVELS.findIndex(l => l.id === currentId);
  if (currentIndex >= 0 && currentIndex < ALL_LEVELS.length - 1) {
    return ALL_LEVELS[currentIndex + 1];
  }
  return null;
};
