import { VocabTheme } from './types';

export const VOCAB_THEMES: VocabTheme[] = [
  {
    id: 'theme-colors-numbers',
    title: 'Colors & Numbers',
    titleVi: 'Màu Sắc & Số Đếm',
    icon: '🎨',
    color: '#00f0ff',
    words: [
      { id: 'c1', word: 'red', meaningVi: 'màu đỏ', category: 'Colors', emoji: '🔴', pronunciation: '/red/' },
      { id: 'c2', word: 'blue', meaningVi: 'màu xanh dương', category: 'Colors', emoji: '🔵', pronunciation: '/bluː/' },
      { id: 'c3', word: 'pink', meaningVi: 'màu hồng', category: 'Colors', emoji: '🌸', pronunciation: '/pɪŋk/' },
      { id: 'c4', word: 'green', meaningVi: 'màu xanh lá', category: 'Colors', emoji: '🟢', pronunciation: '/ɡriːn/' },
      { id: 'c5', word: 'yellow', meaningVi: 'màu vàng', category: 'Colors', emoji: '⭐', pronunciation: '/ˈjeləʊ/' },
      { id: 'n1', word: 'one', meaningVi: 'số một', category: 'Numbers', emoji: '1️⃣', pronunciation: '/wʌn/' },
      { id: 'n2', word: 'two', meaningVi: 'số hai', category: 'Numbers', emoji: '2️⃣', pronunciation: '/tuː/' },
      { id: 'n3', word: 'three', meaningVi: 'số ba', category: 'Numbers', emoji: '3️⃣', pronunciation: '/θriː/' },
      { id: 'n4', word: 'four', meaningVi: 'số bốn', category: 'Numbers', emoji: '4️⃣', pronunciation: '/fɔːr/' },
      { id: 'n5', word: 'five', meaningVi: 'số năm', category: 'Numbers', emoji: '5️⃣', pronunciation: '/faɪv/' },
      { id: 'n6', word: 'ten', meaningVi: 'số mười', category: 'Numbers', emoji: '🔟', pronunciation: '/ten/' },
      { id: 's1', word: 'sun', meaningVi: 'mặt trời', category: 'Nature', emoji: '☀️', pronunciation: '/sʌn/' },
      { id: 's2', word: 'star', meaningVi: 'ngôi sao', category: 'Nature', emoji: '✨', pronunciation: '/stɑːr/' }
    ]
  },
  {
    id: 'theme-animals',
    title: 'Cute Animals',
    titleVi: 'Thế Giới Động Vật',
    icon: '🐾',
    color: '#39ff14',
    words: [
      { id: 'a1', word: 'cat', meaningVi: 'con mèo', category: 'Animals', emoji: '🐱', pronunciation: '/kæt/' },
      { id: 'a2', word: 'dog', meaningVi: 'con chó', category: 'Animals', emoji: '🐶', pronunciation: '/dɒɡ/' },
      { id: 'a3', word: 'bird', meaningVi: 'con chim', category: 'Animals', emoji: '🐦', pronunciation: '/bɜːd/' },
      { id: 'a4', word: 'duck', meaningVi: 'con vịt', category: 'Animals', emoji: '🦆', pronunciation: '/dʌk/' },
      { id: 'a5', word: 'fish', meaningVi: 'con cá', category: 'Animals', emoji: '🐟', pronunciation: '/fɪʃ/' },
      { id: 'a6', word: 'bear', meaningVi: 'con gấu', category: 'Animals', emoji: '🐻', pronunciation: '/beər/' },
      { id: 'a7', word: 'lion', meaningVi: 'sư tử', category: 'Animals', emoji: '🦁', pronunciation: '/ˈlaɪən/' },
      { id: 'a8', word: 'frog', meaningVi: 'con ếch', category: 'Animals', emoji: '🐸', pronunciation: '/frɒɡ/' },
      { id: 'a9', word: 'pig', meaningVi: 'con heo', category: 'Animals', emoji: '🐷', pronunciation: '/pɪɡ/' },
      { id: 'a10', word: 'bee', meaningVi: 'con ong', category: 'Animals', emoji: '🐝', pronunciation: '/biː/' },
      { id: 'a11', word: 'fox', meaningVi: 'con cáo', category: 'Animals', emoji: '🦊', pronunciation: '/fɒks/' },
      { id: 'a12', word: 'cow', meaningVi: 'con bò', category: 'Animals', emoji: '🐮', pronunciation: '/kaʊ/' }
    ]
  },
  {
    id: 'theme-school-toys',
    title: 'School & Toys',
    titleVi: 'Trường Học & Đồ Chơi',
    icon: '🎒',
    color: '#ff007f',
    words: [
      { id: 't1', word: 'pen', meaningVi: 'cây bút', category: 'School', emoji: '🖊️', pronunciation: '/pen/' },
      { id: 't2', word: 'book', meaningVi: 'quyển sách', category: 'School', emoji: '📖', pronunciation: '/bʊk/' },
      { id: 't3', word: 'bag', meaningVi: 'cái cặp', category: 'School', emoji: '🎒', pronunciation: '/bæɡ/' },
      { id: 't4', word: 'desk', meaningVi: 'bàn học', category: 'School', emoji: '🪑', pronunciation: '/desk/' },
      { id: 't5', word: 'ball', meaningVi: 'quả bóng', category: 'Toys', emoji: '⚽', pronunciation: '/bɔːl/' },
      { id: 't6', word: 'kite', meaningVi: 'con diều', category: 'Toys', emoji: '🪁', pronunciation: '/kaɪt/' },
      { id: 't7', word: 'car', meaningVi: 'xe ô tô', category: 'Toys', emoji: '🚗', pronunciation: '/kɑːr/' },
      { id: 't8', word: 'doll', meaningVi: 'búp bê', category: 'Toys', emoji: '🪆', pronunciation: '/dɒl/' },
      { id: 't9', word: 'robot', meaningVi: 'người máy', category: 'Toys', emoji: '🤖', pronunciation: '/ˈrəʊbɒt/' },
      { id: 't10', word: 'box', meaningVi: 'cái hộp', category: 'Objects', emoji: '📦', pronunciation: '/bɒks/' },
      { id: 't11', word: 'bell', meaningVi: 'cái chuông', category: 'School', emoji: '🔔', pronunciation: '/bel/' },
      { id: 't12', word: 'map', meaningVi: 'bản đồ', category: 'School', emoji: '🗺️', pronunciation: '/mæp/' }
    ]
  },
  {
    id: 'theme-food',
    title: 'Food & Yummy',
    titleVi: 'Món Ngon Bé Thích',
    icon: '🍰',
    color: '#ffe600',
    words: [
      { id: 'f1', word: 'milk', meaningVi: 'sữa', category: 'Food', emoji: '🥛', pronunciation: '/mɪlk/' },
      { id: 'f2', word: 'cake', meaningVi: 'bánh ngọt', category: 'Food', emoji: '🍰', pronunciation: '/keɪk/' },
      { id: 'f3', word: 'apple', meaningVi: 'quả táo', category: 'Food', emoji: '🍎', pronunciation: '/ˈæpl/' },
      { id: 'f4', word: 'bread', meaningVi: 'bánh mì', category: 'Food', emoji: '🍞', pronunciation: '/bred/' },
      { id: 'f5', word: 'egg', meaningVi: 'quả trứng', category: 'Food', emoji: '🥚', pronunciation: '/eɡ/' },
      { id: 'f6', word: 'rice', meaningVi: 'cơm', category: 'Food', emoji: '🍚', pronunciation: '/raɪs/' },
      { id: 'f7', word: 'juice', meaningVi: 'nước ép', category: 'Food', emoji: '🧃', pronunciation: '/dʒuːs/' },
      { id: 'f8', word: 'soup', meaningVi: 'món súp', category: 'Food', emoji: '🍲', pronunciation: '/suːp/' },
      { id: 'f9', word: 'candy', meaningVi: 'kẹo ngọt', category: 'Food', emoji: '🍬', pronunciation: '/ˈkændi/' },
      { id: 'f10', word: 'nut', meaningVi: 'hạt dẻ', category: 'Food', emoji: '🥜', pronunciation: '/nʌt/' },
      { id: 'f11', word: 'pie', meaningVi: 'bánh nướng', category: 'Food', emoji: '🥧', pronunciation: '/paɪ/' },
      { id: 'f12', word: 'jam', meaningVi: 'mứt dâu', category: 'Food', emoji: '🍓', pronunciation: '/dʒæm/' }
    ]
  }
];
