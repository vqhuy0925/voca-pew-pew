import { Unit } from '../progress-types';
import { AgeRealm } from './types';

export const REALM1_UNITS: Unit[] = [
  {
    "id": "unit-1",
    "unitNumber": 1,
    "title": "Primary Colors",
    "titleVi": "Màu Sắc Cơ Bản",
    "description": "Khám phá các gam màu rực rỡ đầu tiên!",
    "icon": "🎨",
    "themeColor": "#00f0ff",
    "bannerBg": "from-cyan-500/30 via-sky-500/20 to-blue-600/30",
    "levels": [
      {
        "id": "lvl-1-1",
        "unitId": "unit-1",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎨",
        "bgColor": "#00f0ff",
        "targetScore": 360,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.55,
        "spawnInterval": 2495,
        "words": [
          {
            "id": "r1_1_1",
            "word": "red",
            "meaningVi": "màu đỏ",
            "category": "Colors",
            "emoji": "🔴",
            "pronunciation": "/red/"
          },
          {
            "id": "r1_1_2",
            "word": "blue",
            "meaningVi": "màu xanh dương",
            "category": "Colors",
            "emoji": "🔵",
            "pronunciation": "/bluː/"
          },
          {
            "id": "r1_1_3",
            "word": "pink",
            "meaningVi": "màu hồng",
            "category": "Colors",
            "emoji": "🌸",
            "pronunciation": "/pɪŋk/"
          }
        ]
      },
      {
        "id": "lvl-1-2",
        "unitId": "unit-1",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 460,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.6,
        "spawnInterval": 2395,
        "words": [
          {
            "id": "r1_1_4",
            "word": "sun",
            "meaningVi": "mặt trời",
            "category": "Nature",
            "emoji": "☀️",
            "pronunciation": "/sʌn/"
          },
          {
            "id": "r1_1_5",
            "word": "star",
            "meaningVi": "ngôi sao",
            "category": "Nature",
            "emoji": "✨",
            "pronunciation": "/stɑːr/"
          }
        ]
      },
      {
        "id": "lvl-1-3",
        "unitId": "unit-1",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 612,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.65,
        "spawnInterval": 2195,
        "words": [
          {
            "id": "r1_1_2",
            "word": "blue",
            "meaningVi": "màu xanh dương",
            "category": "Colors",
            "emoji": "🔵",
            "pronunciation": "/bluː/"
          },
          {
            "id": "r1_1_3",
            "word": "pink",
            "meaningVi": "màu hồng",
            "category": "Colors",
            "emoji": "🌸",
            "pronunciation": "/pɪŋk/"
          },
          {
            "id": "r1_1_4",
            "word": "sun",
            "meaningVi": "mặt trời",
            "category": "Nature",
            "emoji": "☀️",
            "pronunciation": "/sʌn/"
          },
          {
            "id": "r1_1_5",
            "word": "star",
            "meaningVi": "ngôi sao",
            "category": "Nature",
            "emoji": "✨",
            "pronunciation": "/stɑːr/"
          },
          {
            "id": "r1_1_1",
            "word": "red",
            "meaningVi": "màu đỏ",
            "category": "Colors",
            "emoji": "🔴",
            "pronunciation": "/red/"
          }
        ]
      },
      {
        "id": "lvl-1-4",
        "unitId": "unit-1",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 1",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 40,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-1-5",
        "unitId": "unit-1",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 815,
        "xpReward": 50,
        "gemReward": 15,
        "speedMultiplier": 0.67,
        "spawnInterval": 1995,
        "words": [
          {
            "id": "r1_1_1",
            "word": "red",
            "meaningVi": "màu đỏ",
            "category": "Colors",
            "emoji": "🔴",
            "pronunciation": "/red/"
          },
          {
            "id": "r1_1_2",
            "word": "blue",
            "meaningVi": "màu xanh dương",
            "category": "Colors",
            "emoji": "🔵",
            "pronunciation": "/bluː/"
          },
          {
            "id": "r1_1_3",
            "word": "pink",
            "meaningVi": "màu hồng",
            "category": "Colors",
            "emoji": "🌸",
            "pronunciation": "/pɪŋk/"
          },
          {
            "id": "r1_1_4",
            "word": "sun",
            "meaningVi": "mặt trời",
            "category": "Nature",
            "emoji": "☀️",
            "pronunciation": "/sʌn/"
          },
          {
            "id": "r1_1_5",
            "word": "star",
            "meaningVi": "ngôi sao",
            "category": "Nature",
            "emoji": "✨",
            "pronunciation": "/stɑːr/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-2",
    "unitNumber": 2,
    "title": "Bright Colors & Sky",
    "titleVi": "Sắc Màu Tươi Sáng",
    "description": "Màu xanh lá, màu vàng và bầu trời bao la.",
    "icon": "🟢",
    "themeColor": "#22c55e",
    "bannerBg": "from-emerald-500/30 via-green-500/20 to-teal-600/30",
    "levels": [
      {
        "id": "lvl-2-1",
        "unitId": "unit-2",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🟢",
        "bgColor": "#22c55e",
        "targetScore": 370,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.55,
        "spawnInterval": 2490,
        "words": [
          {
            "id": "r1_2_1",
            "word": "green",
            "meaningVi": "màu xanh lá",
            "category": "Colors",
            "emoji": "🟢",
            "pronunciation": "/ɡriːn/"
          },
          {
            "id": "r1_2_2",
            "word": "yellow",
            "meaningVi": "màu vàng",
            "category": "Colors",
            "emoji": "⭐",
            "pronunciation": "/ˈjeləʊ/"
          },
          {
            "id": "r1_2_3",
            "word": "sky",
            "meaningVi": "bầu trời",
            "category": "Nature",
            "emoji": "🌌",
            "pronunciation": "/skaɪ/"
          }
        ]
      },
      {
        "id": "lvl-2-2",
        "unitId": "unit-2",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 470,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.6,
        "spawnInterval": 2390,
        "words": [
          {
            "id": "r1_2_4",
            "word": "moon",
            "meaningVi": "mặt trăng",
            "category": "Nature",
            "emoji": "🌙",
            "pronunciation": "/muːn/"
          },
          {
            "id": "r1_2_5",
            "word": "gold",
            "meaningVi": "màu vàng kim",
            "category": "Colors",
            "emoji": "🪙",
            "pronunciation": "/ɡəʊld/"
          }
        ]
      },
      {
        "id": "lvl-2-3",
        "unitId": "unit-2",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 624,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.65,
        "spawnInterval": 2190,
        "words": [
          {
            "id": "r1_2_2",
            "word": "yellow",
            "meaningVi": "màu vàng",
            "category": "Colors",
            "emoji": "⭐",
            "pronunciation": "/ˈjeləʊ/"
          },
          {
            "id": "r1_2_3",
            "word": "sky",
            "meaningVi": "bầu trời",
            "category": "Nature",
            "emoji": "🌌",
            "pronunciation": "/skaɪ/"
          },
          {
            "id": "r1_2_4",
            "word": "moon",
            "meaningVi": "mặt trăng",
            "category": "Nature",
            "emoji": "🌙",
            "pronunciation": "/muːn/"
          },
          {
            "id": "r1_2_5",
            "word": "gold",
            "meaningVi": "màu vàng kim",
            "category": "Colors",
            "emoji": "🪙",
            "pronunciation": "/ɡəʊld/"
          },
          {
            "id": "r1_2_1",
            "word": "green",
            "meaningVi": "màu xanh lá",
            "category": "Colors",
            "emoji": "🟢",
            "pronunciation": "/ɡriːn/"
          }
        ]
      },
      {
        "id": "lvl-2-4",
        "unitId": "unit-2",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 2",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 40,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-2-5",
        "unitId": "unit-2",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 830,
        "xpReward": 50,
        "gemReward": 15,
        "speedMultiplier": 0.67,
        "spawnInterval": 1990,
        "words": [
          {
            "id": "r1_2_1",
            "word": "green",
            "meaningVi": "màu xanh lá",
            "category": "Colors",
            "emoji": "🟢",
            "pronunciation": "/ɡriːn/"
          },
          {
            "id": "r1_2_2",
            "word": "yellow",
            "meaningVi": "màu vàng",
            "category": "Colors",
            "emoji": "⭐",
            "pronunciation": "/ˈjeləʊ/"
          },
          {
            "id": "r1_2_3",
            "word": "sky",
            "meaningVi": "bầu trời",
            "category": "Nature",
            "emoji": "🌌",
            "pronunciation": "/skaɪ/"
          },
          {
            "id": "r1_2_4",
            "word": "moon",
            "meaningVi": "mặt trăng",
            "category": "Nature",
            "emoji": "🌙",
            "pronunciation": "/muːn/"
          },
          {
            "id": "r1_2_5",
            "word": "gold",
            "meaningVi": "màu vàng kim",
            "category": "Colors",
            "emoji": "🪙",
            "pronunciation": "/ɡəʊld/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-3",
    "unitNumber": 3,
    "title": "Numbers 1 to 5",
    "titleVi": "Tập Đếm Số 1 - 5",
    "description": "Cùng đếm những con số đầu tiên thật chuẩn xác!",
    "icon": "🔢",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-500/30 via-orange-500/20 to-yellow-600/30",
    "levels": [
      {
        "id": "lvl-3-1",
        "unitId": "unit-3",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🔢",
        "bgColor": "#f59e0b",
        "targetScore": 380,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.58,
        "spawnInterval": 2485,
        "words": [
          {
            "id": "r1_3_1",
            "word": "one",
            "meaningVi": "số một (1)",
            "category": "Numbers",
            "emoji": "1️⃣",
            "pronunciation": "/wʌn/"
          },
          {
            "id": "r1_3_2",
            "word": "two",
            "meaningVi": "số hai (2)",
            "category": "Numbers",
            "emoji": "2️⃣",
            "pronunciation": "/tuː/"
          },
          {
            "id": "r1_3_3",
            "word": "three",
            "meaningVi": "số ba (3)",
            "category": "Numbers",
            "emoji": "3️⃣",
            "pronunciation": "/θriː/"
          }
        ]
      },
      {
        "id": "lvl-3-2",
        "unitId": "unit-3",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 480,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.63,
        "spawnInterval": 2385,
        "words": [
          {
            "id": "r1_3_4",
            "word": "four",
            "meaningVi": "số bốn (4)",
            "category": "Numbers",
            "emoji": "4️⃣",
            "pronunciation": "/fɔːr/"
          },
          {
            "id": "r1_3_5",
            "word": "five",
            "meaningVi": "số năm (5)",
            "category": "Numbers",
            "emoji": "5️⃣",
            "pronunciation": "/faɪv/"
          }
        ]
      },
      {
        "id": "lvl-3-3",
        "unitId": "unit-3",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 636,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.68,
        "spawnInterval": 2185,
        "words": [
          {
            "id": "r1_3_2",
            "word": "two",
            "meaningVi": "số hai (2)",
            "category": "Numbers",
            "emoji": "2️⃣",
            "pronunciation": "/tuː/"
          },
          {
            "id": "r1_3_3",
            "word": "three",
            "meaningVi": "số ba (3)",
            "category": "Numbers",
            "emoji": "3️⃣",
            "pronunciation": "/θriː/"
          },
          {
            "id": "r1_3_4",
            "word": "four",
            "meaningVi": "số bốn (4)",
            "category": "Numbers",
            "emoji": "4️⃣",
            "pronunciation": "/fɔːr/"
          },
          {
            "id": "r1_3_5",
            "word": "five",
            "meaningVi": "số năm (5)",
            "category": "Numbers",
            "emoji": "5️⃣",
            "pronunciation": "/faɪv/"
          },
          {
            "id": "r1_3_1",
            "word": "one",
            "meaningVi": "số một (1)",
            "category": "Numbers",
            "emoji": "1️⃣",
            "pronunciation": "/wʌn/"
          }
        ]
      },
      {
        "id": "lvl-3-4",
        "unitId": "unit-3",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 3",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 40,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-3-5",
        "unitId": "unit-3",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 845,
        "xpReward": 50,
        "gemReward": 15,
        "speedMultiplier": 0.7,
        "spawnInterval": 1985,
        "words": [
          {
            "id": "r1_3_1",
            "word": "one",
            "meaningVi": "số một (1)",
            "category": "Numbers",
            "emoji": "1️⃣",
            "pronunciation": "/wʌn/"
          },
          {
            "id": "r1_3_2",
            "word": "two",
            "meaningVi": "số hai (2)",
            "category": "Numbers",
            "emoji": "2️⃣",
            "pronunciation": "/tuː/"
          },
          {
            "id": "r1_3_3",
            "word": "three",
            "meaningVi": "số ba (3)",
            "category": "Numbers",
            "emoji": "3️⃣",
            "pronunciation": "/θriː/"
          },
          {
            "id": "r1_3_4",
            "word": "four",
            "meaningVi": "số bốn (4)",
            "category": "Numbers",
            "emoji": "4️⃣",
            "pronunciation": "/fɔːr/"
          },
          {
            "id": "r1_3_5",
            "word": "five",
            "meaningVi": "số năm (5)",
            "category": "Numbers",
            "emoji": "5️⃣",
            "pronunciation": "/faɪv/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-4",
    "unitNumber": 4,
    "title": "Numbers 6 to 10",
    "titleVi": "Tập Đếm Số 6 - 10",
    "description": "Đếm tiếp các số lớn hơn từ sáu tới mười.",
    "icon": "🔟",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-500/30 via-violet-500/20 to-indigo-600/30",
    "levels": [
      {
        "id": "lvl-4-1",
        "unitId": "unit-4",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🔟",
        "bgColor": "#8b5cf6",
        "targetScore": 390,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.58,
        "spawnInterval": 2480,
        "words": [
          {
            "id": "r1_4_1",
            "word": "six",
            "meaningVi": "số sáu (6)",
            "category": "Numbers",
            "emoji": "6️⃣",
            "pronunciation": "/sɪks/"
          },
          {
            "id": "r1_4_2",
            "word": "seven",
            "meaningVi": "số bảy (7)",
            "category": "Numbers",
            "emoji": "7️⃣",
            "pronunciation": "/ˈsevn/"
          },
          {
            "id": "r1_4_3",
            "word": "eight",
            "meaningVi": "số tám (8)",
            "category": "Numbers",
            "emoji": "8️⃣",
            "pronunciation": "/eɪt/"
          }
        ]
      },
      {
        "id": "lvl-4-2",
        "unitId": "unit-4",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 490,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.63,
        "spawnInterval": 2380,
        "words": [
          {
            "id": "r1_4_4",
            "word": "nine",
            "meaningVi": "số chín (9)",
            "category": "Numbers",
            "emoji": "9️⃣",
            "pronunciation": "/naɪn/"
          },
          {
            "id": "r1_4_5",
            "word": "ten",
            "meaningVi": "số mười (10)",
            "category": "Numbers",
            "emoji": "🔟",
            "pronunciation": "/ten/"
          }
        ]
      },
      {
        "id": "lvl-4-3",
        "unitId": "unit-4",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 648,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.68,
        "spawnInterval": 2180,
        "words": [
          {
            "id": "r1_4_2",
            "word": "seven",
            "meaningVi": "số bảy (7)",
            "category": "Numbers",
            "emoji": "7️⃣",
            "pronunciation": "/ˈsevn/"
          },
          {
            "id": "r1_4_3",
            "word": "eight",
            "meaningVi": "số tám (8)",
            "category": "Numbers",
            "emoji": "8️⃣",
            "pronunciation": "/eɪt/"
          },
          {
            "id": "r1_4_4",
            "word": "nine",
            "meaningVi": "số chín (9)",
            "category": "Numbers",
            "emoji": "9️⃣",
            "pronunciation": "/naɪn/"
          },
          {
            "id": "r1_4_5",
            "word": "ten",
            "meaningVi": "số mười (10)",
            "category": "Numbers",
            "emoji": "🔟",
            "pronunciation": "/ten/"
          },
          {
            "id": "r1_4_1",
            "word": "six",
            "meaningVi": "số sáu (6)",
            "category": "Numbers",
            "emoji": "6️⃣",
            "pronunciation": "/sɪks/"
          }
        ]
      },
      {
        "id": "lvl-4-4",
        "unitId": "unit-4",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 4",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 40,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-4-5",
        "unitId": "unit-4",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 860,
        "xpReward": 50,
        "gemReward": 15,
        "speedMultiplier": 0.7,
        "spawnInterval": 1980,
        "words": [
          {
            "id": "r1_4_1",
            "word": "six",
            "meaningVi": "số sáu (6)",
            "category": "Numbers",
            "emoji": "6️⃣",
            "pronunciation": "/sɪks/"
          },
          {
            "id": "r1_4_2",
            "word": "seven",
            "meaningVi": "số bảy (7)",
            "category": "Numbers",
            "emoji": "7️⃣",
            "pronunciation": "/ˈsevn/"
          },
          {
            "id": "r1_4_3",
            "word": "eight",
            "meaningVi": "số tám (8)",
            "category": "Numbers",
            "emoji": "8️⃣",
            "pronunciation": "/eɪt/"
          },
          {
            "id": "r1_4_4",
            "word": "nine",
            "meaningVi": "số chín (9)",
            "category": "Numbers",
            "emoji": "9️⃣",
            "pronunciation": "/naɪn/"
          },
          {
            "id": "r1_4_5",
            "word": "ten",
            "meaningVi": "số mười (10)",
            "category": "Numbers",
            "emoji": "🔟",
            "pronunciation": "/ten/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-5",
    "unitNumber": 5,
    "title": "Cute Pets",
    "titleVi": "Thú Cưng Quanh Em",
    "description": "Những người bạn bốn chân quen thuộc trong nhà.",
    "icon": "🐱",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-500/30 via-rose-500/20 to-fuchsia-600/30",
    "levels": [
      {
        "id": "lvl-5-1",
        "unitId": "unit-5",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🐱",
        "bgColor": "#ec4899",
        "targetScore": 400,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.6,
        "spawnInterval": 2475,
        "words": [
          {
            "id": "r1_5_1",
            "word": "cat",
            "meaningVi": "con mèo",
            "category": "Animals",
            "emoji": "🐱",
            "pronunciation": "/kæt/"
          },
          {
            "id": "r1_5_2",
            "word": "dog",
            "meaningVi": "con chó",
            "category": "Animals",
            "emoji": "🐶",
            "pronunciation": "/dɒɡ/"
          },
          {
            "id": "r1_5_3",
            "word": "bird",
            "meaningVi": "con chim",
            "category": "Animals",
            "emoji": "🐦",
            "pronunciation": "/bɜːd/"
          }
        ]
      },
      {
        "id": "lvl-5-2",
        "unitId": "unit-5",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 500,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.65,
        "spawnInterval": 2375,
        "words": [
          {
            "id": "r1_5_4",
            "word": "fish",
            "meaningVi": "con cá",
            "category": "Animals",
            "emoji": "🐟",
            "pronunciation": "/fɪʃ/"
          },
          {
            "id": "r1_5_5",
            "word": "duck",
            "meaningVi": "con vịt",
            "category": "Animals",
            "emoji": "🦆",
            "pronunciation": "/dʌk/"
          }
        ]
      },
      {
        "id": "lvl-5-3",
        "unitId": "unit-5",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 660,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.7,
        "spawnInterval": 2175,
        "words": [
          {
            "id": "r1_5_2",
            "word": "dog",
            "meaningVi": "con chó",
            "category": "Animals",
            "emoji": "🐶",
            "pronunciation": "/dɒɡ/"
          },
          {
            "id": "r1_5_3",
            "word": "bird",
            "meaningVi": "con chim",
            "category": "Animals",
            "emoji": "🐦",
            "pronunciation": "/bɜːd/"
          },
          {
            "id": "r1_5_4",
            "word": "fish",
            "meaningVi": "con cá",
            "category": "Animals",
            "emoji": "🐟",
            "pronunciation": "/fɪʃ/"
          },
          {
            "id": "r1_5_5",
            "word": "duck",
            "meaningVi": "con vịt",
            "category": "Animals",
            "emoji": "🦆",
            "pronunciation": "/dʌk/"
          },
          {
            "id": "r1_5_1",
            "word": "cat",
            "meaningVi": "con mèo",
            "category": "Animals",
            "emoji": "🐱",
            "pronunciation": "/kæt/"
          }
        ]
      },
      {
        "id": "lvl-5-4",
        "unitId": "unit-5",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 5",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 41,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-5-5",
        "unitId": "unit-5",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 875,
        "xpReward": 51,
        "gemReward": 15,
        "speedMultiplier": 0.72,
        "spawnInterval": 1975,
        "words": [
          {
            "id": "r1_5_1",
            "word": "cat",
            "meaningVi": "con mèo",
            "category": "Animals",
            "emoji": "🐱",
            "pronunciation": "/kæt/"
          },
          {
            "id": "r1_5_2",
            "word": "dog",
            "meaningVi": "con chó",
            "category": "Animals",
            "emoji": "🐶",
            "pronunciation": "/dɒɡ/"
          },
          {
            "id": "r1_5_3",
            "word": "bird",
            "meaningVi": "con chim",
            "category": "Animals",
            "emoji": "🐦",
            "pronunciation": "/bɜːd/"
          },
          {
            "id": "r1_5_4",
            "word": "fish",
            "meaningVi": "con cá",
            "category": "Animals",
            "emoji": "🐟",
            "pronunciation": "/fɪʃ/"
          },
          {
            "id": "r1_5_5",
            "word": "duck",
            "meaningVi": "con vịt",
            "category": "Animals",
            "emoji": "🦆",
            "pronunciation": "/dʌk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-6",
    "unitNumber": 6,
    "title": "Farm Friends",
    "titleVi": "Động Vật Nông Trại",
    "description": "Bò sữa, heo ủn ỉn, cừu lông xù ở trang trại.",
    "icon": "🐮",
    "themeColor": "#10b981",
    "bannerBg": "from-green-500/30 via-emerald-500/20 to-teal-600/30",
    "levels": [
      {
        "id": "lvl-6-1",
        "unitId": "unit-6",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🐮",
        "bgColor": "#10b981",
        "targetScore": 410,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.6,
        "spawnInterval": 2470,
        "words": [
          {
            "id": "r1_6_1",
            "word": "cow",
            "meaningVi": "con bò",
            "category": "Animals",
            "emoji": "🐮",
            "pronunciation": "/kaʊ/"
          },
          {
            "id": "r1_6_2",
            "word": "pig",
            "meaningVi": "con heo",
            "category": "Animals",
            "emoji": "🐷",
            "pronunciation": "/pɪɡ/"
          },
          {
            "id": "r1_6_3",
            "word": "hen",
            "meaningVi": "gà mái",
            "category": "Animals",
            "emoji": "🐔",
            "pronunciation": "/hen/"
          }
        ]
      },
      {
        "id": "lvl-6-2",
        "unitId": "unit-6",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 510,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.65,
        "spawnInterval": 2370,
        "words": [
          {
            "id": "r1_6_4",
            "word": "sheep",
            "meaningVi": "con cừu",
            "category": "Animals",
            "emoji": "🐑",
            "pronunciation": "/ʃiːp/"
          },
          {
            "id": "r1_6_5",
            "word": "horse",
            "meaningVi": "con ngựa",
            "category": "Animals",
            "emoji": "🐴",
            "pronunciation": "/hɔːs/"
          }
        ]
      },
      {
        "id": "lvl-6-3",
        "unitId": "unit-6",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 672,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.7,
        "spawnInterval": 2170,
        "words": [
          {
            "id": "r1_6_2",
            "word": "pig",
            "meaningVi": "con heo",
            "category": "Animals",
            "emoji": "🐷",
            "pronunciation": "/pɪɡ/"
          },
          {
            "id": "r1_6_3",
            "word": "hen",
            "meaningVi": "gà mái",
            "category": "Animals",
            "emoji": "🐔",
            "pronunciation": "/hen/"
          },
          {
            "id": "r1_6_4",
            "word": "sheep",
            "meaningVi": "con cừu",
            "category": "Animals",
            "emoji": "🐑",
            "pronunciation": "/ʃiːp/"
          },
          {
            "id": "r1_6_5",
            "word": "horse",
            "meaningVi": "con ngựa",
            "category": "Animals",
            "emoji": "🐴",
            "pronunciation": "/hɔːs/"
          },
          {
            "id": "r1_6_1",
            "word": "cow",
            "meaningVi": "con bò",
            "category": "Animals",
            "emoji": "🐮",
            "pronunciation": "/kaʊ/"
          }
        ]
      },
      {
        "id": "lvl-6-4",
        "unitId": "unit-6",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 6",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 41,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-6-5",
        "unitId": "unit-6",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 890,
        "xpReward": 51,
        "gemReward": 15,
        "speedMultiplier": 0.72,
        "spawnInterval": 1970,
        "words": [
          {
            "id": "r1_6_1",
            "word": "cow",
            "meaningVi": "con bò",
            "category": "Animals",
            "emoji": "🐮",
            "pronunciation": "/kaʊ/"
          },
          {
            "id": "r1_6_2",
            "word": "pig",
            "meaningVi": "con heo",
            "category": "Animals",
            "emoji": "🐷",
            "pronunciation": "/pɪɡ/"
          },
          {
            "id": "r1_6_3",
            "word": "hen",
            "meaningVi": "gà mái",
            "category": "Animals",
            "emoji": "🐔",
            "pronunciation": "/hen/"
          },
          {
            "id": "r1_6_4",
            "word": "sheep",
            "meaningVi": "con cừu",
            "category": "Animals",
            "emoji": "🐑",
            "pronunciation": "/ʃiːp/"
          },
          {
            "id": "r1_6_5",
            "word": "horse",
            "meaningVi": "con ngựa",
            "category": "Animals",
            "emoji": "🐴",
            "pronunciation": "/hɔːs/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-7",
    "unitNumber": 7,
    "title": "Wild Animals",
    "titleVi": "Động Vật Rừng Xanh",
    "description": "Sư tử dũng mãnh, gấu to lớn, cáo tinh khôn.",
    "icon": "🦁",
    "themeColor": "#f97316",
    "bannerBg": "from-orange-500/30 via-amber-500/20 to-red-600/30",
    "levels": [
      {
        "id": "lvl-7-1",
        "unitId": "unit-7",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🦁",
        "bgColor": "#f97316",
        "targetScore": 420,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.62,
        "spawnInterval": 2465,
        "words": [
          {
            "id": "r1_7_1",
            "word": "lion",
            "meaningVi": "sư tử",
            "category": "Animals",
            "emoji": "🦁",
            "pronunciation": "/ˈlaɪən/"
          },
          {
            "id": "r1_7_2",
            "word": "bear",
            "meaningVi": "con gấu",
            "category": "Animals",
            "emoji": "🐻",
            "pronunciation": "/beər/"
          },
          {
            "id": "r1_7_3",
            "word": "fox",
            "meaningVi": "con cáo",
            "category": "Animals",
            "emoji": "🦊",
            "pronunciation": "/fɒks/"
          }
        ]
      },
      {
        "id": "lvl-7-2",
        "unitId": "unit-7",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 520,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.67,
        "spawnInterval": 2365,
        "words": [
          {
            "id": "r1_7_4",
            "word": "frog",
            "meaningVi": "con ếch",
            "category": "Animals",
            "emoji": "🐸",
            "pronunciation": "/frɒɡ/"
          },
          {
            "id": "r1_7_5",
            "word": "deer",
            "meaningVi": "con hươu",
            "category": "Animals",
            "emoji": "🦌",
            "pronunciation": "/dɪər/"
          }
        ]
      },
      {
        "id": "lvl-7-3",
        "unitId": "unit-7",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 684,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.72,
        "spawnInterval": 2165,
        "words": [
          {
            "id": "r1_7_2",
            "word": "bear",
            "meaningVi": "con gấu",
            "category": "Animals",
            "emoji": "🐻",
            "pronunciation": "/beər/"
          },
          {
            "id": "r1_7_3",
            "word": "fox",
            "meaningVi": "con cáo",
            "category": "Animals",
            "emoji": "🦊",
            "pronunciation": "/fɒks/"
          },
          {
            "id": "r1_7_4",
            "word": "frog",
            "meaningVi": "con ếch",
            "category": "Animals",
            "emoji": "🐸",
            "pronunciation": "/frɒɡ/"
          },
          {
            "id": "r1_7_5",
            "word": "deer",
            "meaningVi": "con hươu",
            "category": "Animals",
            "emoji": "🦌",
            "pronunciation": "/dɪər/"
          },
          {
            "id": "r1_7_1",
            "word": "lion",
            "meaningVi": "sư tử",
            "category": "Animals",
            "emoji": "🦁",
            "pronunciation": "/ˈlaɪən/"
          }
        ]
      },
      {
        "id": "lvl-7-4",
        "unitId": "unit-7",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 7",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 41,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-7-5",
        "unitId": "unit-7",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 905,
        "xpReward": 51,
        "gemReward": 15,
        "speedMultiplier": 0.74,
        "spawnInterval": 1965,
        "words": [
          {
            "id": "r1_7_1",
            "word": "lion",
            "meaningVi": "sư tử",
            "category": "Animals",
            "emoji": "🦁",
            "pronunciation": "/ˈlaɪən/"
          },
          {
            "id": "r1_7_2",
            "word": "bear",
            "meaningVi": "con gấu",
            "category": "Animals",
            "emoji": "🐻",
            "pronunciation": "/beər/"
          },
          {
            "id": "r1_7_3",
            "word": "fox",
            "meaningVi": "con cáo",
            "category": "Animals",
            "emoji": "🦊",
            "pronunciation": "/fɒks/"
          },
          {
            "id": "r1_7_4",
            "word": "frog",
            "meaningVi": "con ếch",
            "category": "Animals",
            "emoji": "🐸",
            "pronunciation": "/frɒɡ/"
          },
          {
            "id": "r1_7_5",
            "word": "deer",
            "meaningVi": "con hươu",
            "category": "Animals",
            "emoji": "🦌",
            "pronunciation": "/dɪər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-8",
    "unitNumber": 8,
    "title": "Yummy Fruits",
    "titleVi": "Trái Cây Quen Thuộc",
    "description": "Táo giòn ngọt, chuối chín vàng, cam mọng nước.",
    "icon": "🍎",
    "themeColor": "#ef4444",
    "bannerBg": "from-red-500/30 via-rose-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-8-1",
        "unitId": "unit-8",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🍎",
        "bgColor": "#ef4444",
        "targetScore": 430,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.62,
        "spawnInterval": 2460,
        "words": [
          {
            "id": "r1_8_1",
            "word": "apple",
            "meaningVi": "quả táo",
            "category": "Food",
            "emoji": "🍎",
            "pronunciation": "/ˈæpl/"
          },
          {
            "id": "r1_8_2",
            "word": "banana",
            "meaningVi": "quả chuối",
            "category": "Food",
            "emoji": "🍌",
            "pronunciation": "/bəˈnɑːnə/"
          },
          {
            "id": "r1_8_3",
            "word": "mango",
            "meaningVi": "quả xoài",
            "category": "Food",
            "emoji": "🥭",
            "pronunciation": "/ˈmæŋɡəʊ/"
          }
        ]
      },
      {
        "id": "lvl-8-2",
        "unitId": "unit-8",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 530,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.67,
        "spawnInterval": 2360,
        "words": [
          {
            "id": "r1_8_4",
            "word": "grape",
            "meaningVi": "quả nho",
            "category": "Food",
            "emoji": "🍇",
            "pronunciation": "/ɡreɪp/"
          },
          {
            "id": "r1_8_5",
            "word": "lime",
            "meaningVi": "quả chanh",
            "category": "Food",
            "emoji": "🍋",
            "pronunciation": "/laɪm/"
          }
        ]
      },
      {
        "id": "lvl-8-3",
        "unitId": "unit-8",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 696,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.72,
        "spawnInterval": 2160,
        "words": [
          {
            "id": "r1_8_2",
            "word": "banana",
            "meaningVi": "quả chuối",
            "category": "Food",
            "emoji": "🍌",
            "pronunciation": "/bəˈnɑːnə/"
          },
          {
            "id": "r1_8_3",
            "word": "mango",
            "meaningVi": "quả xoài",
            "category": "Food",
            "emoji": "🥭",
            "pronunciation": "/ˈmæŋɡəʊ/"
          },
          {
            "id": "r1_8_4",
            "word": "grape",
            "meaningVi": "quả nho",
            "category": "Food",
            "emoji": "🍇",
            "pronunciation": "/ɡreɪp/"
          },
          {
            "id": "r1_8_5",
            "word": "lime",
            "meaningVi": "quả chanh",
            "category": "Food",
            "emoji": "🍋",
            "pronunciation": "/laɪm/"
          },
          {
            "id": "r1_8_1",
            "word": "apple",
            "meaningVi": "quả táo",
            "category": "Food",
            "emoji": "🍎",
            "pronunciation": "/ˈæpl/"
          }
        ]
      },
      {
        "id": "lvl-8-4",
        "unitId": "unit-8",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 8",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 41,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-8-5",
        "unitId": "unit-8",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 920,
        "xpReward": 51,
        "gemReward": 15,
        "speedMultiplier": 0.74,
        "spawnInterval": 1960,
        "words": [
          {
            "id": "r1_8_1",
            "word": "apple",
            "meaningVi": "quả táo",
            "category": "Food",
            "emoji": "🍎",
            "pronunciation": "/ˈæpl/"
          },
          {
            "id": "r1_8_2",
            "word": "banana",
            "meaningVi": "quả chuối",
            "category": "Food",
            "emoji": "🍌",
            "pronunciation": "/bəˈnɑːnə/"
          },
          {
            "id": "r1_8_3",
            "word": "mango",
            "meaningVi": "quả xoài",
            "category": "Food",
            "emoji": "🥭",
            "pronunciation": "/ˈmæŋɡəʊ/"
          },
          {
            "id": "r1_8_4",
            "word": "grape",
            "meaningVi": "quả nho",
            "category": "Food",
            "emoji": "🍇",
            "pronunciation": "/ɡreɪp/"
          },
          {
            "id": "r1_8_5",
            "word": "lime",
            "meaningVi": "quả chanh",
            "category": "Food",
            "emoji": "🍋",
            "pronunciation": "/laɪm/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-9",
    "unitNumber": 9,
    "title": "Daily Food",
    "titleVi": "Thức Ăn Hàng Ngày",
    "description": "Sữa tươi, bánh mì, trứng thơm và cơm ngon.",
    "icon": "🍞",
    "themeColor": "#eab308",
    "bannerBg": "from-yellow-500/30 via-amber-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-9-1",
        "unitId": "unit-9",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🍞",
        "bgColor": "#eab308",
        "targetScore": 440,
        "xpReward": 20,
        "gemReward": 5,
        "speedMultiplier": 0.62,
        "spawnInterval": 2455,
        "words": [
          {
            "id": "r1_9_1",
            "word": "bread",
            "meaningVi": "bánh mì",
            "category": "Food",
            "emoji": "🍞",
            "pronunciation": "/bred/"
          },
          {
            "id": "r1_9_2",
            "word": "milk",
            "meaningVi": "sữa tươi",
            "category": "Food",
            "emoji": "🥛",
            "pronunciation": "/mɪlk/"
          },
          {
            "id": "r1_9_3",
            "word": "egg",
            "meaningVi": "quả trứng",
            "category": "Food",
            "emoji": "🥚",
            "pronunciation": "/eɡ/"
          }
        ]
      },
      {
        "id": "lvl-9-2",
        "unitId": "unit-9",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 540,
        "xpReward": 25,
        "gemReward": 6,
        "speedMultiplier": 0.67,
        "spawnInterval": 2355,
        "words": [
          {
            "id": "r1_9_4",
            "word": "rice",
            "meaningVi": "cơm / gạo",
            "category": "Food",
            "emoji": "🍚",
            "pronunciation": "/raɪs/"
          },
          {
            "id": "r1_9_5",
            "word": "cake",
            "meaningVi": "bánh ngọt",
            "category": "Food",
            "emoji": "🍰",
            "pronunciation": "/keɪk/"
          },
          {
            "id": "r1_9_6",
            "word": "soup",
            "meaningVi": "món súp",
            "category": "Food",
            "emoji": "🍲",
            "pronunciation": "/suːp/"
          }
        ]
      },
      {
        "id": "lvl-9-3",
        "unitId": "unit-9",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 708,
        "xpReward": 30,
        "gemReward": 8,
        "speedMultiplier": 0.72,
        "spawnInterval": 2155,
        "words": [
          {
            "id": "r1_9_2",
            "word": "milk",
            "meaningVi": "sữa tươi",
            "category": "Food",
            "emoji": "🥛",
            "pronunciation": "/mɪlk/"
          },
          {
            "id": "r1_9_3",
            "word": "egg",
            "meaningVi": "quả trứng",
            "category": "Food",
            "emoji": "🥚",
            "pronunciation": "/eɡ/"
          },
          {
            "id": "r1_9_4",
            "word": "rice",
            "meaningVi": "cơm / gạo",
            "category": "Food",
            "emoji": "🍚",
            "pronunciation": "/raɪs/"
          },
          {
            "id": "r1_9_5",
            "word": "cake",
            "meaningVi": "bánh ngọt",
            "category": "Food",
            "emoji": "🍰",
            "pronunciation": "/keɪk/"
          },
          {
            "id": "r1_9_6",
            "word": "soup",
            "meaningVi": "món súp",
            "category": "Food",
            "emoji": "🍲",
            "pronunciation": "/suːp/"
          },
          {
            "id": "r1_9_1",
            "word": "bread",
            "meaningVi": "bánh mì",
            "category": "Food",
            "emoji": "🍞",
            "pronunciation": "/bred/"
          }
        ]
      },
      {
        "id": "lvl-9-4",
        "unitId": "unit-9",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 9",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 41,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-9-5",
        "unitId": "unit-9",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 935,
        "xpReward": 51,
        "gemReward": 15,
        "speedMultiplier": 0.74,
        "spawnInterval": 1955,
        "words": [
          {
            "id": "r1_9_1",
            "word": "bread",
            "meaningVi": "bánh mì",
            "category": "Food",
            "emoji": "🍞",
            "pronunciation": "/bred/"
          },
          {
            "id": "r1_9_2",
            "word": "milk",
            "meaningVi": "sữa tươi",
            "category": "Food",
            "emoji": "🥛",
            "pronunciation": "/mɪlk/"
          },
          {
            "id": "r1_9_3",
            "word": "egg",
            "meaningVi": "quả trứng",
            "category": "Food",
            "emoji": "🥚",
            "pronunciation": "/eɡ/"
          },
          {
            "id": "r1_9_4",
            "word": "rice",
            "meaningVi": "cơm / gạo",
            "category": "Food",
            "emoji": "🍚",
            "pronunciation": "/raɪs/"
          },
          {
            "id": "r1_9_5",
            "word": "cake",
            "meaningVi": "bánh ngọt",
            "category": "Food",
            "emoji": "🍰",
            "pronunciation": "/keɪk/"
          },
          {
            "id": "r1_9_6",
            "word": "soup",
            "meaningVi": "món súp",
            "category": "Food",
            "emoji": "🍲",
            "pronunciation": "/suːp/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-10",
    "unitNumber": 10,
    "title": "Classroom Items",
    "titleVi": "Đồ Dùng Học Tập",
    "description": "Bút mực, sách vở, cặp sách và bàn học xinh xắn.",
    "icon": "🎒",
    "themeColor": "#3b82f6",
    "bannerBg": "from-blue-500/30 via-indigo-500/20 to-cyan-600/30",
    "levels": [
      {
        "id": "lvl-10-1",
        "unitId": "unit-10",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎒",
        "bgColor": "#3b82f6",
        "targetScore": 450,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.63,
        "spawnInterval": 2450,
        "words": [
          {
            "id": "r1_10_1",
            "word": "pen",
            "meaningVi": "cây bút",
            "category": "School",
            "emoji": "🖊️",
            "pronunciation": "/pen/"
          },
          {
            "id": "r1_10_2",
            "word": "book",
            "meaningVi": "quyển sách",
            "category": "School",
            "emoji": "📖",
            "pronunciation": "/bʊk/"
          },
          {
            "id": "r1_10_3",
            "word": "bag",
            "meaningVi": "cái cặp",
            "category": "School",
            "emoji": "🎒",
            "pronunciation": "/bæɡ/"
          }
        ]
      },
      {
        "id": "lvl-10-2",
        "unitId": "unit-10",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 550,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.68,
        "spawnInterval": 2350,
        "words": [
          {
            "id": "r1_10_4",
            "word": "desk",
            "meaningVi": "bàn học",
            "category": "School",
            "emoji": "🪑",
            "pronunciation": "/desk/"
          },
          {
            "id": "r1_10_5",
            "word": "box",
            "meaningVi": "cái hộp",
            "category": "School",
            "emoji": "📦",
            "pronunciation": "/bɒks/"
          }
        ]
      },
      {
        "id": "lvl-10-3",
        "unitId": "unit-10",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 720,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.73,
        "spawnInterval": 2150,
        "words": [
          {
            "id": "r1_10_2",
            "word": "book",
            "meaningVi": "quyển sách",
            "category": "School",
            "emoji": "📖",
            "pronunciation": "/bʊk/"
          },
          {
            "id": "r1_10_3",
            "word": "bag",
            "meaningVi": "cái cặp",
            "category": "School",
            "emoji": "🎒",
            "pronunciation": "/bæɡ/"
          },
          {
            "id": "r1_10_4",
            "word": "desk",
            "meaningVi": "bàn học",
            "category": "School",
            "emoji": "🪑",
            "pronunciation": "/desk/"
          },
          {
            "id": "r1_10_5",
            "word": "box",
            "meaningVi": "cái hộp",
            "category": "School",
            "emoji": "📦",
            "pronunciation": "/bɒks/"
          },
          {
            "id": "r1_10_1",
            "word": "pen",
            "meaningVi": "cây bút",
            "category": "School",
            "emoji": "🖊️",
            "pronunciation": "/pen/"
          }
        ]
      },
      {
        "id": "lvl-10-4",
        "unitId": "unit-10",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 10",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 42,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-10-5",
        "unitId": "unit-10",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 950,
        "xpReward": 52,
        "gemReward": 15,
        "speedMultiplier": 0.75,
        "spawnInterval": 1950,
        "words": [
          {
            "id": "r1_10_1",
            "word": "pen",
            "meaningVi": "cây bút",
            "category": "School",
            "emoji": "🖊️",
            "pronunciation": "/pen/"
          },
          {
            "id": "r1_10_2",
            "word": "book",
            "meaningVi": "quyển sách",
            "category": "School",
            "emoji": "📖",
            "pronunciation": "/bʊk/"
          },
          {
            "id": "r1_10_3",
            "word": "bag",
            "meaningVi": "cái cặp",
            "category": "School",
            "emoji": "🎒",
            "pronunciation": "/bæɡ/"
          },
          {
            "id": "r1_10_4",
            "word": "desk",
            "meaningVi": "bàn học",
            "category": "School",
            "emoji": "🪑",
            "pronunciation": "/desk/"
          },
          {
            "id": "r1_10_5",
            "word": "box",
            "meaningVi": "cái hộp",
            "category": "School",
            "emoji": "📦",
            "pronunciation": "/bɒks/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-11",
    "unitNumber": 11,
    "title": "Favorite Toys",
    "titleVi": "Đồ Chơi Yêu Thích",
    "description": "Quả bóng tròn, ô tô đồ chơi, robot phiêu lưu.",
    "icon": "🤖",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-500/30 via-teal-500/20 to-sky-600/30",
    "levels": [
      {
        "id": "lvl-11-1",
        "unitId": "unit-11",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🤖",
        "bgColor": "#06b6d4",
        "targetScore": 460,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.63,
        "spawnInterval": 2445,
        "words": [
          {
            "id": "r1_11_1",
            "word": "ball",
            "meaningVi": "quả bóng",
            "category": "Toys",
            "emoji": "⚽",
            "pronunciation": "/bɔːl/"
          },
          {
            "id": "r1_11_2",
            "word": "doll",
            "meaningVi": "búp bê",
            "category": "Toys",
            "emoji": "🪆",
            "pronunciation": "/dɒl/"
          },
          {
            "id": "r1_11_3",
            "word": "car",
            "meaningVi": "xe ô tô",
            "category": "Toys",
            "emoji": "🚗",
            "pronunciation": "/kɑːr/"
          }
        ]
      },
      {
        "id": "lvl-11-2",
        "unitId": "unit-11",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 560,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.68,
        "spawnInterval": 2345,
        "words": [
          {
            "id": "r1_11_4",
            "word": "robot",
            "meaningVi": "người máy",
            "category": "Toys",
            "emoji": "🤖",
            "pronunciation": "/ˈrəʊbɒt/"
          },
          {
            "id": "r1_11_5",
            "word": "kite",
            "meaningVi": "con diều",
            "category": "Toys",
            "emoji": "🪁",
            "pronunciation": "/kaɪt/"
          }
        ]
      },
      {
        "id": "lvl-11-3",
        "unitId": "unit-11",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 732,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.73,
        "spawnInterval": 2145,
        "words": [
          {
            "id": "r1_11_2",
            "word": "doll",
            "meaningVi": "búp bê",
            "category": "Toys",
            "emoji": "🪆",
            "pronunciation": "/dɒl/"
          },
          {
            "id": "r1_11_3",
            "word": "car",
            "meaningVi": "xe ô tô",
            "category": "Toys",
            "emoji": "🚗",
            "pronunciation": "/kɑːr/"
          },
          {
            "id": "r1_11_4",
            "word": "robot",
            "meaningVi": "người máy",
            "category": "Toys",
            "emoji": "🤖",
            "pronunciation": "/ˈrəʊbɒt/"
          },
          {
            "id": "r1_11_5",
            "word": "kite",
            "meaningVi": "con diều",
            "category": "Toys",
            "emoji": "🪁",
            "pronunciation": "/kaɪt/"
          },
          {
            "id": "r1_11_1",
            "word": "ball",
            "meaningVi": "quả bóng",
            "category": "Toys",
            "emoji": "⚽",
            "pronunciation": "/bɔːl/"
          }
        ]
      },
      {
        "id": "lvl-11-4",
        "unitId": "unit-11",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 11",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 42,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-11-5",
        "unitId": "unit-11",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 965,
        "xpReward": 52,
        "gemReward": 15,
        "speedMultiplier": 0.75,
        "spawnInterval": 1945,
        "words": [
          {
            "id": "r1_11_1",
            "word": "ball",
            "meaningVi": "quả bóng",
            "category": "Toys",
            "emoji": "⚽",
            "pronunciation": "/bɔːl/"
          },
          {
            "id": "r1_11_2",
            "word": "doll",
            "meaningVi": "búp bê",
            "category": "Toys",
            "emoji": "🪆",
            "pronunciation": "/dɒl/"
          },
          {
            "id": "r1_11_3",
            "word": "car",
            "meaningVi": "xe ô tô",
            "category": "Toys",
            "emoji": "🚗",
            "pronunciation": "/kɑːr/"
          },
          {
            "id": "r1_11_4",
            "word": "robot",
            "meaningVi": "người máy",
            "category": "Toys",
            "emoji": "🤖",
            "pronunciation": "/ˈrəʊbɒt/"
          },
          {
            "id": "r1_11_5",
            "word": "kite",
            "meaningVi": "con diều",
            "category": "Toys",
            "emoji": "🪁",
            "pronunciation": "/kaɪt/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-12",
    "unitNumber": 12,
    "title": "My Body Parts",
    "titleVi": "Bộ Phận Cơ Thể",
    "description": "Mắt sáng, tai lắng nghe, đôi tay khéo léo.",
    "icon": "👀",
    "themeColor": "#a855f7",
    "bannerBg": "from-purple-500/30 via-fuchsia-500/20 to-pink-600/30",
    "levels": [
      {
        "id": "lvl-12-1",
        "unitId": "unit-12",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "👀",
        "bgColor": "#a855f7",
        "targetScore": 470,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.64,
        "spawnInterval": 2440,
        "words": [
          {
            "id": "r1_12_1",
            "word": "eye",
            "meaningVi": "mắt",
            "category": "Body",
            "emoji": "👁️",
            "pronunciation": "/aɪ/"
          },
          {
            "id": "r1_12_2",
            "word": "ear",
            "meaningVi": "tai",
            "category": "Body",
            "emoji": "👂",
            "pronunciation": "/ɪər/"
          },
          {
            "id": "r1_12_3",
            "word": "nose",
            "meaningVi": "mũi",
            "category": "Body",
            "emoji": "👃",
            "pronunciation": "/nəʊz/"
          }
        ]
      },
      {
        "id": "lvl-12-2",
        "unitId": "unit-12",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 570,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.69,
        "spawnInterval": 2340,
        "words": [
          {
            "id": "r1_12_4",
            "word": "hand",
            "meaningVi": "bàn tay",
            "category": "Body",
            "emoji": "✋",
            "pronunciation": "/hænd/"
          },
          {
            "id": "r1_12_5",
            "word": "foot",
            "meaningVi": "bàn chân",
            "category": "Body",
            "emoji": "🦶",
            "pronunciation": "/fʊt/"
          },
          {
            "id": "r1_12_6",
            "word": "arm",
            "meaningVi": "cánh tay",
            "category": "Body",
            "emoji": "💪",
            "pronunciation": "/ɑːm/"
          }
        ]
      },
      {
        "id": "lvl-12-3",
        "unitId": "unit-12",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 744,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.74,
        "spawnInterval": 2140,
        "words": [
          {
            "id": "r1_12_2",
            "word": "ear",
            "meaningVi": "tai",
            "category": "Body",
            "emoji": "👂",
            "pronunciation": "/ɪər/"
          },
          {
            "id": "r1_12_3",
            "word": "nose",
            "meaningVi": "mũi",
            "category": "Body",
            "emoji": "👃",
            "pronunciation": "/nəʊz/"
          },
          {
            "id": "r1_12_4",
            "word": "hand",
            "meaningVi": "bàn tay",
            "category": "Body",
            "emoji": "✋",
            "pronunciation": "/hænd/"
          },
          {
            "id": "r1_12_5",
            "word": "foot",
            "meaningVi": "bàn chân",
            "category": "Body",
            "emoji": "🦶",
            "pronunciation": "/fʊt/"
          },
          {
            "id": "r1_12_6",
            "word": "arm",
            "meaningVi": "cánh tay",
            "category": "Body",
            "emoji": "💪",
            "pronunciation": "/ɑːm/"
          },
          {
            "id": "r1_12_1",
            "word": "eye",
            "meaningVi": "mắt",
            "category": "Body",
            "emoji": "👁️",
            "pronunciation": "/aɪ/"
          }
        ]
      },
      {
        "id": "lvl-12-4",
        "unitId": "unit-12",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 12",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 42,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-12-5",
        "unitId": "unit-12",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 980,
        "xpReward": 52,
        "gemReward": 15,
        "speedMultiplier": 0.76,
        "spawnInterval": 1940,
        "words": [
          {
            "id": "r1_12_1",
            "word": "eye",
            "meaningVi": "mắt",
            "category": "Body",
            "emoji": "👁️",
            "pronunciation": "/aɪ/"
          },
          {
            "id": "r1_12_2",
            "word": "ear",
            "meaningVi": "tai",
            "category": "Body",
            "emoji": "👂",
            "pronunciation": "/ɪər/"
          },
          {
            "id": "r1_12_3",
            "word": "nose",
            "meaningVi": "mũi",
            "category": "Body",
            "emoji": "👃",
            "pronunciation": "/nəʊz/"
          },
          {
            "id": "r1_12_4",
            "word": "hand",
            "meaningVi": "bàn tay",
            "category": "Body",
            "emoji": "✋",
            "pronunciation": "/hænd/"
          },
          {
            "id": "r1_12_5",
            "word": "foot",
            "meaningVi": "bàn chân",
            "category": "Body",
            "emoji": "🦶",
            "pronunciation": "/fʊt/"
          },
          {
            "id": "r1_12_6",
            "word": "arm",
            "meaningVi": "cánh tay",
            "category": "Body",
            "emoji": "💪",
            "pronunciation": "/ɑːm/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-13",
    "unitNumber": 13,
    "title": "My Clothes",
    "titleVi": "Trang Phục Dễ Thương",
    "description": "Chiếc mũ ấm, áo thun, váy xinh và đôi giày êm.",
    "icon": "👒",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-500/30 via-rose-500/20 to-purple-600/30",
    "levels": [
      {
        "id": "lvl-13-1",
        "unitId": "unit-13",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "👒",
        "bgColor": "#ec4899",
        "targetScore": 480,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.64,
        "spawnInterval": 2435,
        "words": [
          {
            "id": "r1_13_1",
            "word": "hat",
            "meaningVi": "cái mũ",
            "category": "Clothes",
            "emoji": "👒",
            "pronunciation": "/hæt/"
          },
          {
            "id": "r1_13_2",
            "word": "cap",
            "meaningVi": "mũ lưỡi trai",
            "category": "Clothes",
            "emoji": "🧢",
            "pronunciation": "/kæp/"
          },
          {
            "id": "r1_13_3",
            "word": "shirt",
            "meaningVi": "áo sơ mi",
            "category": "Clothes",
            "emoji": "👕",
            "pronunciation": "/ʃɜːt/"
          }
        ]
      },
      {
        "id": "lvl-13-2",
        "unitId": "unit-13",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 580,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.69,
        "spawnInterval": 2335,
        "words": [
          {
            "id": "r1_13_4",
            "word": "shoe",
            "meaningVi": "chiếc giày",
            "category": "Clothes",
            "emoji": "👟",
            "pronunciation": "/ʃuː/"
          },
          {
            "id": "r1_13_5",
            "word": "sock",
            "meaningVi": "chiếc tất",
            "category": "Clothes",
            "emoji": "🧦",
            "pronunciation": "/sɒk/"
          },
          {
            "id": "r1_13_6",
            "word": "dress",
            "meaningVi": "váy đầm",
            "category": "Clothes",
            "emoji": "👗",
            "pronunciation": "/dres/"
          }
        ]
      },
      {
        "id": "lvl-13-3",
        "unitId": "unit-13",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 756,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.74,
        "spawnInterval": 2135,
        "words": [
          {
            "id": "r1_13_2",
            "word": "cap",
            "meaningVi": "mũ lưỡi trai",
            "category": "Clothes",
            "emoji": "🧢",
            "pronunciation": "/kæp/"
          },
          {
            "id": "r1_13_3",
            "word": "shirt",
            "meaningVi": "áo sơ mi",
            "category": "Clothes",
            "emoji": "👕",
            "pronunciation": "/ʃɜːt/"
          },
          {
            "id": "r1_13_4",
            "word": "shoe",
            "meaningVi": "chiếc giày",
            "category": "Clothes",
            "emoji": "👟",
            "pronunciation": "/ʃuː/"
          },
          {
            "id": "r1_13_5",
            "word": "sock",
            "meaningVi": "chiếc tất",
            "category": "Clothes",
            "emoji": "🧦",
            "pronunciation": "/sɒk/"
          },
          {
            "id": "r1_13_6",
            "word": "dress",
            "meaningVi": "váy đầm",
            "category": "Clothes",
            "emoji": "👗",
            "pronunciation": "/dres/"
          },
          {
            "id": "r1_13_1",
            "word": "hat",
            "meaningVi": "cái mũ",
            "category": "Clothes",
            "emoji": "👒",
            "pronunciation": "/hæt/"
          }
        ]
      },
      {
        "id": "lvl-13-4",
        "unitId": "unit-13",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 13",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 42,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-13-5",
        "unitId": "unit-13",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 995,
        "xpReward": 52,
        "gemReward": 15,
        "speedMultiplier": 0.76,
        "spawnInterval": 1935,
        "words": [
          {
            "id": "r1_13_1",
            "word": "hat",
            "meaningVi": "cái mũ",
            "category": "Clothes",
            "emoji": "👒",
            "pronunciation": "/hæt/"
          },
          {
            "id": "r1_13_2",
            "word": "cap",
            "meaningVi": "mũ lưỡi trai",
            "category": "Clothes",
            "emoji": "🧢",
            "pronunciation": "/kæp/"
          },
          {
            "id": "r1_13_3",
            "word": "shirt",
            "meaningVi": "áo sơ mi",
            "category": "Clothes",
            "emoji": "👕",
            "pronunciation": "/ʃɜːt/"
          },
          {
            "id": "r1_13_4",
            "word": "shoe",
            "meaningVi": "chiếc giày",
            "category": "Clothes",
            "emoji": "👟",
            "pronunciation": "/ʃuː/"
          },
          {
            "id": "r1_13_5",
            "word": "sock",
            "meaningVi": "chiếc tất",
            "category": "Clothes",
            "emoji": "🧦",
            "pronunciation": "/sɒk/"
          },
          {
            "id": "r1_13_6",
            "word": "dress",
            "meaningVi": "váy đầm",
            "category": "Clothes",
            "emoji": "👗",
            "pronunciation": "/dres/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-14",
    "unitNumber": 14,
    "title": "Loving Family",
    "titleVi": "Gia Đình Yêu Thương",
    "description": "Ba mẹ, em bé và những người thân yêu.",
    "icon": "👨‍👩‍👧",
    "themeColor": "#14b8a6",
    "bannerBg": "from-teal-500/30 via-cyan-500/20 to-emerald-600/30",
    "levels": [
      {
        "id": "lvl-14-1",
        "unitId": "unit-14",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "👨‍👩‍👧",
        "bgColor": "#14b8a6",
        "targetScore": 490,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.65,
        "spawnInterval": 2430,
        "words": [
          {
            "id": "r1_14_1",
            "word": "mom",
            "meaningVi": "mẹ",
            "category": "Family",
            "emoji": "👩",
            "pronunciation": "/mɒm/"
          },
          {
            "id": "r1_14_2",
            "word": "dad",
            "meaningVi": "ba / bố",
            "category": "Family",
            "emoji": "👨",
            "pronunciation": "/dæd/"
          },
          {
            "id": "r1_14_3",
            "word": "baby",
            "meaningVi": "em bé",
            "category": "Family",
            "emoji": "👶",
            "pronunciation": "/ˈbeɪbi/"
          }
        ]
      },
      {
        "id": "lvl-14-2",
        "unitId": "unit-14",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 590,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.7,
        "spawnInterval": 2330,
        "words": [
          {
            "id": "r1_14_4",
            "word": "son",
            "meaningVi": "con trai",
            "category": "Family",
            "emoji": "👦",
            "pronunciation": "/sʌn/"
          },
          {
            "id": "r1_14_5",
            "word": "girl",
            "meaningVi": "bé gái",
            "category": "Family",
            "emoji": "👧",
            "pronunciation": "/ɡɜːl/"
          },
          {
            "id": "r1_14_6",
            "word": "boy",
            "meaningVi": "bé trai",
            "category": "Family",
            "emoji": "🧒",
            "pronunciation": "/bɔɪ/"
          }
        ]
      },
      {
        "id": "lvl-14-3",
        "unitId": "unit-14",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 768,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.75,
        "spawnInterval": 2130,
        "words": [
          {
            "id": "r1_14_2",
            "word": "dad",
            "meaningVi": "ba / bố",
            "category": "Family",
            "emoji": "👨",
            "pronunciation": "/dæd/"
          },
          {
            "id": "r1_14_3",
            "word": "baby",
            "meaningVi": "em bé",
            "category": "Family",
            "emoji": "👶",
            "pronunciation": "/ˈbeɪbi/"
          },
          {
            "id": "r1_14_4",
            "word": "son",
            "meaningVi": "con trai",
            "category": "Family",
            "emoji": "👦",
            "pronunciation": "/sʌn/"
          },
          {
            "id": "r1_14_5",
            "word": "girl",
            "meaningVi": "bé gái",
            "category": "Family",
            "emoji": "👧",
            "pronunciation": "/ɡɜːl/"
          },
          {
            "id": "r1_14_6",
            "word": "boy",
            "meaningVi": "bé trai",
            "category": "Family",
            "emoji": "🧒",
            "pronunciation": "/bɔɪ/"
          },
          {
            "id": "r1_14_1",
            "word": "mom",
            "meaningVi": "mẹ",
            "category": "Family",
            "emoji": "👩",
            "pronunciation": "/mɒm/"
          }
        ]
      },
      {
        "id": "lvl-14-4",
        "unitId": "unit-14",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 14",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 42,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-14-5",
        "unitId": "unit-14",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1010,
        "xpReward": 52,
        "gemReward": 15,
        "speedMultiplier": 0.77,
        "spawnInterval": 1930,
        "words": [
          {
            "id": "r1_14_1",
            "word": "mom",
            "meaningVi": "mẹ",
            "category": "Family",
            "emoji": "👩",
            "pronunciation": "/mɒm/"
          },
          {
            "id": "r1_14_2",
            "word": "dad",
            "meaningVi": "ba / bố",
            "category": "Family",
            "emoji": "👨",
            "pronunciation": "/dæd/"
          },
          {
            "id": "r1_14_3",
            "word": "baby",
            "meaningVi": "em bé",
            "category": "Family",
            "emoji": "👶",
            "pronunciation": "/ˈbeɪbi/"
          },
          {
            "id": "r1_14_4",
            "word": "son",
            "meaningVi": "con trai",
            "category": "Family",
            "emoji": "👦",
            "pronunciation": "/sʌn/"
          },
          {
            "id": "r1_14_5",
            "word": "girl",
            "meaningVi": "bé gái",
            "category": "Family",
            "emoji": "👧",
            "pronunciation": "/ɡɜːl/"
          },
          {
            "id": "r1_14_6",
            "word": "boy",
            "meaningVi": "bé trai",
            "category": "Family",
            "emoji": "🧒",
            "pronunciation": "/bɔɪ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-15",
    "unitNumber": 15,
    "title": "Sweet Home",
    "titleVi": "Ngôi Nhà Của Bé",
    "description": "Cửa chính, giường ngủ ấm áp, đèn bàn dịu êm.",
    "icon": "🏡",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-500/30 via-yellow-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-15-1",
        "unitId": "unit-15",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏡",
        "bgColor": "#f59e0b",
        "targetScore": 500,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.65,
        "spawnInterval": 2425,
        "words": [
          {
            "id": "r1_15_1",
            "word": "door",
            "meaningVi": "cửa ra vào",
            "category": "Home",
            "emoji": "🚪",
            "pronunciation": "/dɔːr/"
          },
          {
            "id": "r1_15_2",
            "word": "bed",
            "meaningVi": "giường ngủ",
            "category": "Home",
            "emoji": "🛏️",
            "pronunciation": "/bed/"
          },
          {
            "id": "r1_15_3",
            "word": "lamp",
            "meaningVi": "đèn bàn",
            "category": "Home",
            "emoji": "💡",
            "pronunciation": "/læmp/"
          }
        ]
      },
      {
        "id": "lvl-15-2",
        "unitId": "unit-15",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 600,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.7,
        "spawnInterval": 2325,
        "words": [
          {
            "id": "r1_15_4",
            "word": "wall",
            "meaningVi": "bức tường",
            "category": "Home",
            "emoji": "🧱",
            "pronunciation": "/wɔːl/"
          },
          {
            "id": "r1_15_5",
            "word": "roof",
            "meaningVi": "mái nhà",
            "category": "Home",
            "emoji": "🏠",
            "pronunciation": "/ruːf/"
          },
          {
            "id": "r1_15_6",
            "word": "room",
            "meaningVi": "căn phòng",
            "category": "Home",
            "emoji": "🛋️",
            "pronunciation": "/ruːm/"
          }
        ]
      },
      {
        "id": "lvl-15-3",
        "unitId": "unit-15",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 780,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.75,
        "spawnInterval": 2125,
        "words": [
          {
            "id": "r1_15_2",
            "word": "bed",
            "meaningVi": "giường ngủ",
            "category": "Home",
            "emoji": "🛏️",
            "pronunciation": "/bed/"
          },
          {
            "id": "r1_15_3",
            "word": "lamp",
            "meaningVi": "đèn bàn",
            "category": "Home",
            "emoji": "💡",
            "pronunciation": "/læmp/"
          },
          {
            "id": "r1_15_4",
            "word": "wall",
            "meaningVi": "bức tường",
            "category": "Home",
            "emoji": "🧱",
            "pronunciation": "/wɔːl/"
          },
          {
            "id": "r1_15_5",
            "word": "roof",
            "meaningVi": "mái nhà",
            "category": "Home",
            "emoji": "🏠",
            "pronunciation": "/ruːf/"
          },
          {
            "id": "r1_15_6",
            "word": "room",
            "meaningVi": "căn phòng",
            "category": "Home",
            "emoji": "🛋️",
            "pronunciation": "/ruːm/"
          },
          {
            "id": "r1_15_1",
            "word": "door",
            "meaningVi": "cửa ra vào",
            "category": "Home",
            "emoji": "🚪",
            "pronunciation": "/dɔːr/"
          }
        ]
      },
      {
        "id": "lvl-15-4",
        "unitId": "unit-15",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 15",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 43,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-15-5",
        "unitId": "unit-15",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1025,
        "xpReward": 53,
        "gemReward": 15,
        "speedMultiplier": 0.77,
        "spawnInterval": 1925,
        "words": [
          {
            "id": "r1_15_1",
            "word": "door",
            "meaningVi": "cửa ra vào",
            "category": "Home",
            "emoji": "🚪",
            "pronunciation": "/dɔːr/"
          },
          {
            "id": "r1_15_2",
            "word": "bed",
            "meaningVi": "giường ngủ",
            "category": "Home",
            "emoji": "🛏️",
            "pronunciation": "/bed/"
          },
          {
            "id": "r1_15_3",
            "word": "lamp",
            "meaningVi": "đèn bàn",
            "category": "Home",
            "emoji": "💡",
            "pronunciation": "/læmp/"
          },
          {
            "id": "r1_15_4",
            "word": "wall",
            "meaningVi": "bức tường",
            "category": "Home",
            "emoji": "🧱",
            "pronunciation": "/wɔːl/"
          },
          {
            "id": "r1_15_5",
            "word": "roof",
            "meaningVi": "mái nhà",
            "category": "Home",
            "emoji": "🏠",
            "pronunciation": "/ruːf/"
          },
          {
            "id": "r1_15_6",
            "word": "room",
            "meaningVi": "căn phòng",
            "category": "Home",
            "emoji": "🛋️",
            "pronunciation": "/ruːm/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-16",
    "unitNumber": 16,
    "title": "Daily Weather",
    "titleVi": "Thời Tiết Quanh Năm",
    "description": "Nắng ấm, mưa rơi, gió mát và ngày lạnh.",
    "icon": "⛅",
    "themeColor": "#38bdf8",
    "bannerBg": "from-sky-500/30 via-blue-500/20 to-cyan-600/30",
    "levels": [
      {
        "id": "lvl-16-1",
        "unitId": "unit-16",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "⛅",
        "bgColor": "#38bdf8",
        "targetScore": 510,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.65,
        "spawnInterval": 2420,
        "words": [
          {
            "id": "r1_16_1",
            "word": "rain",
            "meaningVi": "cơn mưa",
            "category": "Weather",
            "emoji": "🌧️",
            "pronunciation": "/reɪn/"
          },
          {
            "id": "r1_16_2",
            "word": "wind",
            "meaningVi": "cơn gió",
            "category": "Weather",
            "emoji": "💨",
            "pronunciation": "/wɪnd/"
          },
          {
            "id": "r1_16_3",
            "word": "warm",
            "meaningVi": "ấm áp",
            "category": "Weather",
            "emoji": "🌤️",
            "pronunciation": "/wɔːm/"
          }
        ]
      },
      {
        "id": "lvl-16-2",
        "unitId": "unit-16",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 610,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.7,
        "spawnInterval": 2320,
        "words": [
          {
            "id": "r1_16_4",
            "word": "cool",
            "meaningVi": "mát mẻ",
            "category": "Weather",
            "emoji": "🍃",
            "pronunciation": "/kuːl/"
          },
          {
            "id": "r1_16_5",
            "word": "cold",
            "meaningVi": "lạnh giá",
            "category": "Weather",
            "emoji": "❄️",
            "pronunciation": "/kəʊld/"
          },
          {
            "id": "r1_16_6",
            "word": "snow",
            "meaningVi": "tuyết rơi",
            "category": "Weather",
            "emoji": "☃️",
            "pronunciation": "/snəʊ/"
          }
        ]
      },
      {
        "id": "lvl-16-3",
        "unitId": "unit-16",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 792,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.75,
        "spawnInterval": 2120,
        "words": [
          {
            "id": "r1_16_2",
            "word": "wind",
            "meaningVi": "cơn gió",
            "category": "Weather",
            "emoji": "💨",
            "pronunciation": "/wɪnd/"
          },
          {
            "id": "r1_16_3",
            "word": "warm",
            "meaningVi": "ấm áp",
            "category": "Weather",
            "emoji": "🌤️",
            "pronunciation": "/wɔːm/"
          },
          {
            "id": "r1_16_4",
            "word": "cool",
            "meaningVi": "mát mẻ",
            "category": "Weather",
            "emoji": "🍃",
            "pronunciation": "/kuːl/"
          },
          {
            "id": "r1_16_5",
            "word": "cold",
            "meaningVi": "lạnh giá",
            "category": "Weather",
            "emoji": "❄️",
            "pronunciation": "/kəʊld/"
          },
          {
            "id": "r1_16_6",
            "word": "snow",
            "meaningVi": "tuyết rơi",
            "category": "Weather",
            "emoji": "☃️",
            "pronunciation": "/snəʊ/"
          },
          {
            "id": "r1_16_1",
            "word": "rain",
            "meaningVi": "cơn mưa",
            "category": "Weather",
            "emoji": "🌧️",
            "pronunciation": "/reɪn/"
          }
        ]
      },
      {
        "id": "lvl-16-4",
        "unitId": "unit-16",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 16",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 43,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-16-5",
        "unitId": "unit-16",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1040,
        "xpReward": 53,
        "gemReward": 15,
        "speedMultiplier": 0.77,
        "spawnInterval": 1920,
        "words": [
          {
            "id": "r1_16_1",
            "word": "rain",
            "meaningVi": "cơn mưa",
            "category": "Weather",
            "emoji": "🌧️",
            "pronunciation": "/reɪn/"
          },
          {
            "id": "r1_16_2",
            "word": "wind",
            "meaningVi": "cơn gió",
            "category": "Weather",
            "emoji": "💨",
            "pronunciation": "/wɪnd/"
          },
          {
            "id": "r1_16_3",
            "word": "warm",
            "meaningVi": "ấm áp",
            "category": "Weather",
            "emoji": "🌤️",
            "pronunciation": "/wɔːm/"
          },
          {
            "id": "r1_16_4",
            "word": "cool",
            "meaningVi": "mát mẻ",
            "category": "Weather",
            "emoji": "🍃",
            "pronunciation": "/kuːl/"
          },
          {
            "id": "r1_16_5",
            "word": "cold",
            "meaningVi": "lạnh giá",
            "category": "Weather",
            "emoji": "❄️",
            "pronunciation": "/kəʊld/"
          },
          {
            "id": "r1_16_6",
            "word": "snow",
            "meaningVi": "tuyết rơi",
            "category": "Weather",
            "emoji": "☃️",
            "pronunciation": "/snəʊ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-17",
    "unitNumber": 17,
    "title": "Happy Feelings",
    "titleVi": "Cảm Xúc Vui Tươi",
    "description": "Vui vẻ, hân hoan, khỏe mạnh và yêu đời.",
    "icon": "😊",
    "themeColor": "#22c55e",
    "bannerBg": "from-green-500/30 via-emerald-500/20 to-teal-600/30",
    "levels": [
      {
        "id": "lvl-17-1",
        "unitId": "unit-17",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "😊",
        "bgColor": "#22c55e",
        "targetScore": 520,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.66,
        "spawnInterval": 2415,
        "words": [
          {
            "id": "r1_17_1",
            "word": "happy",
            "meaningVi": "vui vẻ",
            "category": "Feelings",
            "emoji": "😄",
            "pronunciation": "/ˈhæpi/"
          },
          {
            "id": "r1_17_2",
            "word": "glad",
            "meaningVi": "hân hoan",
            "category": "Feelings",
            "emoji": "🥳",
            "pronunciation": "/ɡlæd/"
          },
          {
            "id": "r1_17_3",
            "word": "calm",
            "meaningVi": "bình tĩnh",
            "category": "Feelings",
            "emoji": "😌",
            "pronunciation": "/kɑːm/"
          }
        ]
      },
      {
        "id": "lvl-17-2",
        "unitId": "unit-17",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 620,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.71,
        "spawnInterval": 2315,
        "words": [
          {
            "id": "r1_17_4",
            "word": "fine",
            "meaningVi": "khỏe / tốt",
            "category": "Feelings",
            "emoji": "👌",
            "pronunciation": "/faɪn/"
          },
          {
            "id": "r1_17_5",
            "word": "good",
            "meaningVi": "tuyệt vời",
            "category": "Feelings",
            "emoji": "👍",
            "pronunciation": "/ɡʊd/"
          }
        ]
      },
      {
        "id": "lvl-17-3",
        "unitId": "unit-17",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 804,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.76,
        "spawnInterval": 2115,
        "words": [
          {
            "id": "r1_17_2",
            "word": "glad",
            "meaningVi": "hân hoan",
            "category": "Feelings",
            "emoji": "🥳",
            "pronunciation": "/ɡlæd/"
          },
          {
            "id": "r1_17_3",
            "word": "calm",
            "meaningVi": "bình tĩnh",
            "category": "Feelings",
            "emoji": "😌",
            "pronunciation": "/kɑːm/"
          },
          {
            "id": "r1_17_4",
            "word": "fine",
            "meaningVi": "khỏe / tốt",
            "category": "Feelings",
            "emoji": "👌",
            "pronunciation": "/faɪn/"
          },
          {
            "id": "r1_17_5",
            "word": "good",
            "meaningVi": "tuyệt vời",
            "category": "Feelings",
            "emoji": "👍",
            "pronunciation": "/ɡʊd/"
          },
          {
            "id": "r1_17_1",
            "word": "happy",
            "meaningVi": "vui vẻ",
            "category": "Feelings",
            "emoji": "😄",
            "pronunciation": "/ˈhæpi/"
          }
        ]
      },
      {
        "id": "lvl-17-4",
        "unitId": "unit-17",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 17",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 43,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-17-5",
        "unitId": "unit-17",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1055,
        "xpReward": 53,
        "gemReward": 15,
        "speedMultiplier": 0.78,
        "spawnInterval": 1915,
        "words": [
          {
            "id": "r1_17_1",
            "word": "happy",
            "meaningVi": "vui vẻ",
            "category": "Feelings",
            "emoji": "😄",
            "pronunciation": "/ˈhæpi/"
          },
          {
            "id": "r1_17_2",
            "word": "glad",
            "meaningVi": "hân hoan",
            "category": "Feelings",
            "emoji": "🥳",
            "pronunciation": "/ɡlæd/"
          },
          {
            "id": "r1_17_3",
            "word": "calm",
            "meaningVi": "bình tĩnh",
            "category": "Feelings",
            "emoji": "😌",
            "pronunciation": "/kɑːm/"
          },
          {
            "id": "r1_17_4",
            "word": "fine",
            "meaningVi": "khỏe / tốt",
            "category": "Feelings",
            "emoji": "👌",
            "pronunciation": "/faɪn/"
          },
          {
            "id": "r1_17_5",
            "word": "good",
            "meaningVi": "tuyệt vời",
            "category": "Feelings",
            "emoji": "👍",
            "pronunciation": "/ɡʊd/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-18",
    "unitNumber": 18,
    "title": "Simple Actions",
    "titleVi": "Hành Động Hàng Ngày",
    "description": "Chạy nhảy, bơi lội, ca hát và đọc sách.",
    "icon": "🏃",
    "themeColor": "#6366f1",
    "bannerBg": "from-indigo-500/30 via-purple-500/20 to-blue-600/30",
    "levels": [
      {
        "id": "lvl-18-1",
        "unitId": "unit-18",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏃",
        "bgColor": "#6366f1",
        "targetScore": 530,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.66,
        "spawnInterval": 2410,
        "words": [
          {
            "id": "r1_18_1",
            "word": "run",
            "meaningVi": "chạy bộ",
            "category": "Actions",
            "emoji": "🏃",
            "pronunciation": "/rʌn/"
          },
          {
            "id": "r1_18_2",
            "word": "jump",
            "meaningVi": "nhảy lên",
            "category": "Actions",
            "emoji": "🦘",
            "pronunciation": "/dʒʌmp/"
          },
          {
            "id": "r1_18_3",
            "word": "swim",
            "meaningVi": "bơi lội",
            "category": "Actions",
            "emoji": "🏊",
            "pronunciation": "/swɪm/"
          }
        ]
      },
      {
        "id": "lvl-18-2",
        "unitId": "unit-18",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 630,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.71,
        "spawnInterval": 2310,
        "words": [
          {
            "id": "r1_18_4",
            "word": "sing",
            "meaningVi": "ca hát",
            "category": "Actions",
            "emoji": "🎤",
            "pronunciation": "/sɪŋ/"
          },
          {
            "id": "r1_18_5",
            "word": "read",
            "meaningVi": "đọc sách",
            "category": "Actions",
            "emoji": "📖",
            "pronunciation": "/riːd/"
          },
          {
            "id": "r1_18_6",
            "word": "play",
            "meaningVi": "chơi đùa",
            "category": "Actions",
            "emoji": "🎮",
            "pronunciation": "/pleɪ/"
          }
        ]
      },
      {
        "id": "lvl-18-3",
        "unitId": "unit-18",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 816,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.76,
        "spawnInterval": 2110,
        "words": [
          {
            "id": "r1_18_2",
            "word": "jump",
            "meaningVi": "nhảy lên",
            "category": "Actions",
            "emoji": "🦘",
            "pronunciation": "/dʒʌmp/"
          },
          {
            "id": "r1_18_3",
            "word": "swim",
            "meaningVi": "bơi lội",
            "category": "Actions",
            "emoji": "🏊",
            "pronunciation": "/swɪm/"
          },
          {
            "id": "r1_18_4",
            "word": "sing",
            "meaningVi": "ca hát",
            "category": "Actions",
            "emoji": "🎤",
            "pronunciation": "/sɪŋ/"
          },
          {
            "id": "r1_18_5",
            "word": "read",
            "meaningVi": "đọc sách",
            "category": "Actions",
            "emoji": "📖",
            "pronunciation": "/riːd/"
          },
          {
            "id": "r1_18_6",
            "word": "play",
            "meaningVi": "chơi đùa",
            "category": "Actions",
            "emoji": "🎮",
            "pronunciation": "/pleɪ/"
          },
          {
            "id": "r1_18_1",
            "word": "run",
            "meaningVi": "chạy bộ",
            "category": "Actions",
            "emoji": "🏃",
            "pronunciation": "/rʌn/"
          }
        ]
      },
      {
        "id": "lvl-18-4",
        "unitId": "unit-18",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 18",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 43,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-18-5",
        "unitId": "unit-18",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1070,
        "xpReward": 53,
        "gemReward": 15,
        "speedMultiplier": 0.78,
        "spawnInterval": 1910,
        "words": [
          {
            "id": "r1_18_1",
            "word": "run",
            "meaningVi": "chạy bộ",
            "category": "Actions",
            "emoji": "🏃",
            "pronunciation": "/rʌn/"
          },
          {
            "id": "r1_18_2",
            "word": "jump",
            "meaningVi": "nhảy lên",
            "category": "Actions",
            "emoji": "🦘",
            "pronunciation": "/dʒʌmp/"
          },
          {
            "id": "r1_18_3",
            "word": "swim",
            "meaningVi": "bơi lội",
            "category": "Actions",
            "emoji": "🏊",
            "pronunciation": "/swɪm/"
          },
          {
            "id": "r1_18_4",
            "word": "sing",
            "meaningVi": "ca hát",
            "category": "Actions",
            "emoji": "🎤",
            "pronunciation": "/sɪŋ/"
          },
          {
            "id": "r1_18_5",
            "word": "read",
            "meaningVi": "đọc sách",
            "category": "Actions",
            "emoji": "📖",
            "pronunciation": "/riːd/"
          },
          {
            "id": "r1_18_6",
            "word": "play",
            "meaningVi": "chơi đùa",
            "category": "Actions",
            "emoji": "🎮",
            "pronunciation": "/pleɪ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-19",
    "unitNumber": 19,
    "title": "Magic Shapes",
    "titleVi": "Hình Khối Diệu Kỳ",
    "description": "Chấm tròn, đường thẳng, hình sao lấp lánh.",
    "icon": "🔷",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-violet-500/30 via-indigo-500/20 to-purple-600/30",
    "levels": [
      {
        "id": "lvl-19-1",
        "unitId": "unit-19",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🔷",
        "bgColor": "#8b5cf6",
        "targetScore": 540,
        "xpReward": 21,
        "gemReward": 5,
        "speedMultiplier": 0.66,
        "spawnInterval": 2405,
        "words": [
          {
            "id": "r1_19_1",
            "word": "dot",
            "meaningVi": "dấu chấm",
            "category": "Shapes",
            "emoji": "🔘",
            "pronunciation": "/dɒt/"
          },
          {
            "id": "r1_19_2",
            "word": "line",
            "meaningVi": "đường thẳng",
            "category": "Shapes",
            "emoji": "📏",
            "pronunciation": "/laɪn/"
          },
          {
            "id": "r1_19_3",
            "word": "ring",
            "meaningVi": "vòng tròn / nhẫn",
            "category": "Shapes",
            "emoji": "💍",
            "pronunciation": "/rɪŋ/"
          }
        ]
      },
      {
        "id": "lvl-19-2",
        "unitId": "unit-19",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 640,
        "xpReward": 26,
        "gemReward": 6,
        "speedMultiplier": 0.71,
        "spawnInterval": 2305,
        "words": [
          {
            "id": "r1_19_4",
            "word": "cube",
            "meaningVi": "khối lập phương",
            "category": "Shapes",
            "emoji": "🎲",
            "pronunciation": "/kjuːb/"
          },
          {
            "id": "r1_19_5",
            "word": "oval",
            "meaningVi": "hình bầu dục",
            "category": "Shapes",
            "emoji": "🥚",
            "pronunciation": "/ˈəʊvl/"
          }
        ]
      },
      {
        "id": "lvl-19-3",
        "unitId": "unit-19",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 828,
        "xpReward": 31,
        "gemReward": 8,
        "speedMultiplier": 0.76,
        "spawnInterval": 2105,
        "words": [
          {
            "id": "r1_19_2",
            "word": "line",
            "meaningVi": "đường thẳng",
            "category": "Shapes",
            "emoji": "📏",
            "pronunciation": "/laɪn/"
          },
          {
            "id": "r1_19_3",
            "word": "ring",
            "meaningVi": "vòng tròn / nhẫn",
            "category": "Shapes",
            "emoji": "💍",
            "pronunciation": "/rɪŋ/"
          },
          {
            "id": "r1_19_4",
            "word": "cube",
            "meaningVi": "khối lập phương",
            "category": "Shapes",
            "emoji": "🎲",
            "pronunciation": "/kjuːb/"
          },
          {
            "id": "r1_19_5",
            "word": "oval",
            "meaningVi": "hình bầu dục",
            "category": "Shapes",
            "emoji": "🥚",
            "pronunciation": "/ˈəʊvl/"
          },
          {
            "id": "r1_19_1",
            "word": "dot",
            "meaningVi": "dấu chấm",
            "category": "Shapes",
            "emoji": "🔘",
            "pronunciation": "/dɒt/"
          }
        ]
      },
      {
        "id": "lvl-19-4",
        "unitId": "unit-19",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 19",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 43,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-19-5",
        "unitId": "unit-19",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1085,
        "xpReward": 53,
        "gemReward": 15,
        "speedMultiplier": 0.78,
        "spawnInterval": 1905,
        "words": [
          {
            "id": "r1_19_1",
            "word": "dot",
            "meaningVi": "dấu chấm",
            "category": "Shapes",
            "emoji": "🔘",
            "pronunciation": "/dɒt/"
          },
          {
            "id": "r1_19_2",
            "word": "line",
            "meaningVi": "đường thẳng",
            "category": "Shapes",
            "emoji": "📏",
            "pronunciation": "/laɪn/"
          },
          {
            "id": "r1_19_3",
            "word": "ring",
            "meaningVi": "vòng tròn / nhẫn",
            "category": "Shapes",
            "emoji": "💍",
            "pronunciation": "/rɪŋ/"
          },
          {
            "id": "r1_19_4",
            "word": "cube",
            "meaningVi": "khối lập phương",
            "category": "Shapes",
            "emoji": "🎲",
            "pronunciation": "/kjuːb/"
          },
          {
            "id": "r1_19_5",
            "word": "oval",
            "meaningVi": "hình bầu dục",
            "category": "Shapes",
            "emoji": "🥚",
            "pronunciation": "/ˈəʊvl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-20",
    "unitNumber": 20,
    "title": "Beautiful Nature",
    "titleVi": "Thiên Nhiên Tươi Đẹp",
    "description": "Cây xanh râm mát, chiếc lá biếc, hoa hồng thơm.",
    "icon": "🌳",
    "themeColor": "#10b981",
    "bannerBg": "from-emerald-500/30 via-teal-500/20 to-green-600/30",
    "levels": [
      {
        "id": "lvl-20-1",
        "unitId": "unit-20",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌳",
        "bgColor": "#10b981",
        "targetScore": 550,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.67,
        "spawnInterval": 2400,
        "words": [
          {
            "id": "r1_20_1",
            "word": "tree",
            "meaningVi": "cây cối",
            "category": "Nature",
            "emoji": "🌳",
            "pronunciation": "/triː/"
          },
          {
            "id": "r1_20_2",
            "word": "leaf",
            "meaningVi": "chiếc lá",
            "category": "Nature",
            "emoji": "🍃",
            "pronunciation": "/liːf/"
          },
          {
            "id": "r1_20_3",
            "word": "grass",
            "meaningVi": "bãi cỏ",
            "category": "Nature",
            "emoji": "🌱",
            "pronunciation": "/ɡrɑːs/"
          }
        ]
      },
      {
        "id": "lvl-20-2",
        "unitId": "unit-20",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 650,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.72,
        "spawnInterval": 2300,
        "words": [
          {
            "id": "r1_20_4",
            "word": "rose",
            "meaningVi": "hoa hồng",
            "category": "Nature",
            "emoji": "🌹",
            "pronunciation": "/rəʊz/"
          },
          {
            "id": "r1_20_5",
            "word": "river",
            "meaningVi": "dòng sông",
            "category": "Nature",
            "emoji": "🏞️",
            "pronunciation": "/ˈrɪvər/"
          },
          {
            "id": "r1_20_6",
            "word": "pond",
            "meaningVi": "cái ao",
            "category": "Nature",
            "emoji": "💧",
            "pronunciation": "/pɒnd/"
          }
        ]
      },
      {
        "id": "lvl-20-3",
        "unitId": "unit-20",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 840,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.77,
        "spawnInterval": 2100,
        "words": [
          {
            "id": "r1_20_2",
            "word": "leaf",
            "meaningVi": "chiếc lá",
            "category": "Nature",
            "emoji": "🍃",
            "pronunciation": "/liːf/"
          },
          {
            "id": "r1_20_3",
            "word": "grass",
            "meaningVi": "bãi cỏ",
            "category": "Nature",
            "emoji": "🌱",
            "pronunciation": "/ɡrɑːs/"
          },
          {
            "id": "r1_20_4",
            "word": "rose",
            "meaningVi": "hoa hồng",
            "category": "Nature",
            "emoji": "🌹",
            "pronunciation": "/rəʊz/"
          },
          {
            "id": "r1_20_5",
            "word": "river",
            "meaningVi": "dòng sông",
            "category": "Nature",
            "emoji": "🏞️",
            "pronunciation": "/ˈrɪvər/"
          },
          {
            "id": "r1_20_6",
            "word": "pond",
            "meaningVi": "cái ao",
            "category": "Nature",
            "emoji": "💧",
            "pronunciation": "/pɒnd/"
          },
          {
            "id": "r1_20_1",
            "word": "tree",
            "meaningVi": "cây cối",
            "category": "Nature",
            "emoji": "🌳",
            "pronunciation": "/triː/"
          }
        ]
      },
      {
        "id": "lvl-20-4",
        "unitId": "unit-20",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 20",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 44,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-20-5",
        "unitId": "unit-20",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1100,
        "xpReward": 54,
        "gemReward": 15,
        "speedMultiplier": 0.79,
        "spawnInterval": 1900,
        "words": [
          {
            "id": "r1_20_1",
            "word": "tree",
            "meaningVi": "cây cối",
            "category": "Nature",
            "emoji": "🌳",
            "pronunciation": "/triː/"
          },
          {
            "id": "r1_20_2",
            "word": "leaf",
            "meaningVi": "chiếc lá",
            "category": "Nature",
            "emoji": "🍃",
            "pronunciation": "/liːf/"
          },
          {
            "id": "r1_20_3",
            "word": "grass",
            "meaningVi": "bãi cỏ",
            "category": "Nature",
            "emoji": "🌱",
            "pronunciation": "/ɡrɑːs/"
          },
          {
            "id": "r1_20_4",
            "word": "rose",
            "meaningVi": "hoa hồng",
            "category": "Nature",
            "emoji": "🌹",
            "pronunciation": "/rəʊz/"
          },
          {
            "id": "r1_20_5",
            "word": "river",
            "meaningVi": "dòng sông",
            "category": "Nature",
            "emoji": "🏞️",
            "pronunciation": "/ˈrɪvər/"
          },
          {
            "id": "r1_20_6",
            "word": "pond",
            "meaningVi": "cái ao",
            "category": "Nature",
            "emoji": "💧",
            "pronunciation": "/pɒnd/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-21",
    "unitNumber": 21,
    "title": "Sweet Drinks",
    "titleVi": "Thức Uống Ngọt Ngào",
    "description": "Nước lọc trong lành, trà thơm mát, nước ép trái cây.",
    "icon": "🧃",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-500/30 via-orange-500/20 to-yellow-600/30",
    "levels": [
      {
        "id": "lvl-21-1",
        "unitId": "unit-21",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧃",
        "bgColor": "#f59e0b",
        "targetScore": 560,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.67,
        "spawnInterval": 2395,
        "words": [
          {
            "id": "r1_21_1",
            "word": "tea",
            "meaningVi": "nước trà",
            "category": "Drinks",
            "emoji": "🍵",
            "pronunciation": "/tiː/"
          },
          {
            "id": "r1_21_2",
            "word": "water",
            "meaningVi": "nước uống",
            "category": "Drinks",
            "emoji": "💧",
            "pronunciation": "/ˈwɔːtər/"
          },
          {
            "id": "r1_21_3",
            "word": "juice",
            "meaningVi": "nước ép",
            "category": "Drinks",
            "emoji": "🧃",
            "pronunciation": "/dʒuːs/"
          }
        ]
      },
      {
        "id": "lvl-21-2",
        "unitId": "unit-21",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 660,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.72,
        "spawnInterval": 2295,
        "words": [
          {
            "id": "r1_21_4",
            "word": "soda",
            "meaningVi": "nước ngọt",
            "category": "Drinks",
            "emoji": "🥤",
            "pronunciation": "/ˈsəʊdə/"
          }
        ]
      },
      {
        "id": "lvl-21-3",
        "unitId": "unit-21",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 852,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.77,
        "spawnInterval": 2095,
        "words": [
          {
            "id": "r1_21_2",
            "word": "water",
            "meaningVi": "nước uống",
            "category": "Drinks",
            "emoji": "💧",
            "pronunciation": "/ˈwɔːtər/"
          },
          {
            "id": "r1_21_3",
            "word": "juice",
            "meaningVi": "nước ép",
            "category": "Drinks",
            "emoji": "🧃",
            "pronunciation": "/dʒuːs/"
          },
          {
            "id": "r1_21_4",
            "word": "soda",
            "meaningVi": "nước ngọt",
            "category": "Drinks",
            "emoji": "🥤",
            "pronunciation": "/ˈsəʊdə/"
          },
          {
            "id": "r1_21_1",
            "word": "tea",
            "meaningVi": "nước trà",
            "category": "Drinks",
            "emoji": "🍵",
            "pronunciation": "/tiː/"
          }
        ]
      },
      {
        "id": "lvl-21-4",
        "unitId": "unit-21",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 21",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 44,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-21-5",
        "unitId": "unit-21",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1115,
        "xpReward": 54,
        "gemReward": 15,
        "speedMultiplier": 0.79,
        "spawnInterval": 1895,
        "words": [
          {
            "id": "r1_21_1",
            "word": "tea",
            "meaningVi": "nước trà",
            "category": "Drinks",
            "emoji": "🍵",
            "pronunciation": "/tiː/"
          },
          {
            "id": "r1_21_2",
            "word": "water",
            "meaningVi": "nước uống",
            "category": "Drinks",
            "emoji": "💧",
            "pronunciation": "/ˈwɔːtər/"
          },
          {
            "id": "r1_21_3",
            "word": "juice",
            "meaningVi": "nước ép",
            "category": "Drinks",
            "emoji": "🧃",
            "pronunciation": "/dʒuːs/"
          },
          {
            "id": "r1_21_4",
            "word": "soda",
            "meaningVi": "nước ngọt",
            "category": "Drinks",
            "emoji": "🥤",
            "pronunciation": "/ˈsəʊdə/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-22",
    "unitNumber": 22,
    "title": "Cute Ocean",
    "titleVi": "Sinh Vật Biển Bé Xinh",
    "description": "Cua kẹp càng, cá voi khổng lồ bơi lội tung tăng.",
    "icon": "🦀",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-500/30 via-blue-500/20 to-sky-600/30",
    "levels": [
      {
        "id": "lvl-22-1",
        "unitId": "unit-22",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🦀",
        "bgColor": "#06b6d4",
        "targetScore": 570,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.67,
        "spawnInterval": 2390,
        "words": [
          {
            "id": "r1_22_1",
            "word": "crab",
            "meaningVi": "con cua",
            "category": "Ocean",
            "emoji": "🦀",
            "pronunciation": "/kræb/"
          },
          {
            "id": "r1_22_2",
            "word": "seal",
            "meaningVi": "hải cẩu",
            "category": "Ocean",
            "emoji": "🦭",
            "pronunciation": "/siːl/"
          },
          {
            "id": "r1_22_3",
            "word": "eel",
            "meaningVi": "con lươn",
            "category": "Ocean",
            "emoji": "🐍",
            "pronunciation": "/iːl/"
          }
        ]
      },
      {
        "id": "lvl-22-2",
        "unitId": "unit-22",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 670,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.72,
        "spawnInterval": 2290,
        "words": [
          {
            "id": "r1_22_4",
            "word": "whale",
            "meaningVi": "cá voi",
            "category": "Ocean",
            "emoji": "🐋",
            "pronunciation": "/weɪl/"
          }
        ]
      },
      {
        "id": "lvl-22-3",
        "unitId": "unit-22",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 864,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.77,
        "spawnInterval": 2090,
        "words": [
          {
            "id": "r1_22_2",
            "word": "seal",
            "meaningVi": "hải cẩu",
            "category": "Ocean",
            "emoji": "🦭",
            "pronunciation": "/siːl/"
          },
          {
            "id": "r1_22_3",
            "word": "eel",
            "meaningVi": "con lươn",
            "category": "Ocean",
            "emoji": "🐍",
            "pronunciation": "/iːl/"
          },
          {
            "id": "r1_22_4",
            "word": "whale",
            "meaningVi": "cá voi",
            "category": "Ocean",
            "emoji": "🐋",
            "pronunciation": "/weɪl/"
          },
          {
            "id": "r1_22_1",
            "word": "crab",
            "meaningVi": "con cua",
            "category": "Ocean",
            "emoji": "🦀",
            "pronunciation": "/kræb/"
          }
        ]
      },
      {
        "id": "lvl-22-4",
        "unitId": "unit-22",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 22",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 44,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-22-5",
        "unitId": "unit-22",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1130,
        "xpReward": 54,
        "gemReward": 15,
        "speedMultiplier": 0.79,
        "spawnInterval": 1890,
        "words": [
          {
            "id": "r1_22_1",
            "word": "crab",
            "meaningVi": "con cua",
            "category": "Ocean",
            "emoji": "🦀",
            "pronunciation": "/kræb/"
          },
          {
            "id": "r1_22_2",
            "word": "seal",
            "meaningVi": "hải cẩu",
            "category": "Ocean",
            "emoji": "🦭",
            "pronunciation": "/siːl/"
          },
          {
            "id": "r1_22_3",
            "word": "eel",
            "meaningVi": "con lươn",
            "category": "Ocean",
            "emoji": "🐍",
            "pronunciation": "/iːl/"
          },
          {
            "id": "r1_22_4",
            "word": "whale",
            "meaningVi": "cá voi",
            "category": "Ocean",
            "emoji": "🐋",
            "pronunciation": "/weɪl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-23",
    "unitNumber": 23,
    "title": "Tiny Bugs",
    "titleVi": "Động Vật Tí Hon",
    "description": "Chú kiến chăm chỉ, ong mật ngọt ngào.",
    "icon": "🐜",
    "themeColor": "#eab308",
    "bannerBg": "from-yellow-500/30 via-amber-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-23-1",
        "unitId": "unit-23",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🐜",
        "bgColor": "#eab308",
        "targetScore": 580,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.68,
        "spawnInterval": 2385,
        "words": [
          {
            "id": "r1_23_1",
            "word": "ant",
            "meaningVi": "con kiến",
            "category": "Bugs",
            "emoji": "🐜",
            "pronunciation": "/ænt/"
          },
          {
            "id": "r1_23_2",
            "word": "bee",
            "meaningVi": "con ong",
            "category": "Bugs",
            "emoji": "🐝",
            "pronunciation": "/biː/"
          },
          {
            "id": "r1_23_3",
            "word": "bug",
            "meaningVi": "con bọ",
            "category": "Bugs",
            "emoji": "🐛",
            "pronunciation": "/bʌɡ/"
          }
        ]
      },
      {
        "id": "lvl-23-2",
        "unitId": "unit-23",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 680,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.73,
        "spawnInterval": 2285,
        "words": [
          {
            "id": "r1_23_4",
            "word": "fly",
            "meaningVi": "con ruồi",
            "category": "Bugs",
            "emoji": "🪰",
            "pronunciation": "/flaɪ/"
          },
          {
            "id": "r1_23_5",
            "word": "worm",
            "meaningVi": "con sâu",
            "category": "Bugs",
            "emoji": "🪱",
            "pronunciation": "/wɜːm/"
          }
        ]
      },
      {
        "id": "lvl-23-3",
        "unitId": "unit-23",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 876,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.78,
        "spawnInterval": 2085,
        "words": [
          {
            "id": "r1_23_2",
            "word": "bee",
            "meaningVi": "con ong",
            "category": "Bugs",
            "emoji": "🐝",
            "pronunciation": "/biː/"
          },
          {
            "id": "r1_23_3",
            "word": "bug",
            "meaningVi": "con bọ",
            "category": "Bugs",
            "emoji": "🐛",
            "pronunciation": "/bʌɡ/"
          },
          {
            "id": "r1_23_4",
            "word": "fly",
            "meaningVi": "con ruồi",
            "category": "Bugs",
            "emoji": "🪰",
            "pronunciation": "/flaɪ/"
          },
          {
            "id": "r1_23_5",
            "word": "worm",
            "meaningVi": "con sâu",
            "category": "Bugs",
            "emoji": "🪱",
            "pronunciation": "/wɜːm/"
          },
          {
            "id": "r1_23_1",
            "word": "ant",
            "meaningVi": "con kiến",
            "category": "Bugs",
            "emoji": "🐜",
            "pronunciation": "/ænt/"
          }
        ]
      },
      {
        "id": "lvl-23-4",
        "unitId": "unit-23",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 23",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 44,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-23-5",
        "unitId": "unit-23",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1145,
        "xpReward": 54,
        "gemReward": 15,
        "speedMultiplier": 0.8,
        "spawnInterval": 1885,
        "words": [
          {
            "id": "r1_23_1",
            "word": "ant",
            "meaningVi": "con kiến",
            "category": "Bugs",
            "emoji": "🐜",
            "pronunciation": "/ænt/"
          },
          {
            "id": "r1_23_2",
            "word": "bee",
            "meaningVi": "con ong",
            "category": "Bugs",
            "emoji": "🐝",
            "pronunciation": "/biː/"
          },
          {
            "id": "r1_23_3",
            "word": "bug",
            "meaningVi": "con bọ",
            "category": "Bugs",
            "emoji": "🐛",
            "pronunciation": "/bʌɡ/"
          },
          {
            "id": "r1_23_4",
            "word": "fly",
            "meaningVi": "con ruồi",
            "category": "Bugs",
            "emoji": "🪰",
            "pronunciation": "/flaɪ/"
          },
          {
            "id": "r1_23_5",
            "word": "worm",
            "meaningVi": "con sâu",
            "category": "Bugs",
            "emoji": "🪱",
            "pronunciation": "/wɜːm/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-24",
    "unitNumber": 24,
    "title": "Little Kitchen",
    "titleVi": "Căn Bếp Nhỏ",
    "description": "Cốc nước, cái bát, cái đĩa và chảo rán đồ ăn.",
    "icon": "🍳",
    "themeColor": "#f97316",
    "bannerBg": "from-orange-500/30 via-rose-500/20 to-amber-600/30",
    "levels": [
      {
        "id": "lvl-24-1",
        "unitId": "unit-24",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🍳",
        "bgColor": "#f97316",
        "targetScore": 590,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.68,
        "spawnInterval": 2380,
        "words": [
          {
            "id": "r1_24_1",
            "word": "cup",
            "meaningVi": "cái cốc",
            "category": "Kitchen",
            "emoji": "☕",
            "pronunciation": "/kʌp/"
          },
          {
            "id": "r1_24_2",
            "word": "bowl",
            "meaningVi": "cái bát",
            "category": "Kitchen",
            "emoji": "🥣",
            "pronunciation": "/bəʊl/"
          },
          {
            "id": "r1_24_3",
            "word": "fork",
            "meaningVi": "cái nĩa",
            "category": "Kitchen",
            "emoji": "🍴",
            "pronunciation": "/fɔːk/"
          }
        ]
      },
      {
        "id": "lvl-24-2",
        "unitId": "unit-24",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 690,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.73,
        "spawnInterval": 2280,
        "words": [
          {
            "id": "r1_24_4",
            "word": "dish",
            "meaningVi": "cái đĩa",
            "category": "Kitchen",
            "emoji": "🍽️",
            "pronunciation": "/dɪʃ/"
          },
          {
            "id": "r1_24_5",
            "word": "pot",
            "meaningVi": "cái nồi",
            "category": "Kitchen",
            "emoji": "🍲",
            "pronunciation": "/pɒt/"
          },
          {
            "id": "r1_24_6",
            "word": "pan",
            "meaningVi": "cái chảo",
            "category": "Kitchen",
            "emoji": "🍳",
            "pronunciation": "/pæn/"
          }
        ]
      },
      {
        "id": "lvl-24-3",
        "unitId": "unit-24",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 888,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.78,
        "spawnInterval": 2080,
        "words": [
          {
            "id": "r1_24_2",
            "word": "bowl",
            "meaningVi": "cái bát",
            "category": "Kitchen",
            "emoji": "🥣",
            "pronunciation": "/bəʊl/"
          },
          {
            "id": "r1_24_3",
            "word": "fork",
            "meaningVi": "cái nĩa",
            "category": "Kitchen",
            "emoji": "🍴",
            "pronunciation": "/fɔːk/"
          },
          {
            "id": "r1_24_4",
            "word": "dish",
            "meaningVi": "cái đĩa",
            "category": "Kitchen",
            "emoji": "🍽️",
            "pronunciation": "/dɪʃ/"
          },
          {
            "id": "r1_24_5",
            "word": "pot",
            "meaningVi": "cái nồi",
            "category": "Kitchen",
            "emoji": "🍲",
            "pronunciation": "/pɒt/"
          },
          {
            "id": "r1_24_6",
            "word": "pan",
            "meaningVi": "cái chảo",
            "category": "Kitchen",
            "emoji": "🍳",
            "pronunciation": "/pæn/"
          },
          {
            "id": "r1_24_1",
            "word": "cup",
            "meaningVi": "cái cốc",
            "category": "Kitchen",
            "emoji": "☕",
            "pronunciation": "/kʌp/"
          }
        ]
      },
      {
        "id": "lvl-24-4",
        "unitId": "unit-24",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 24",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 44,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-24-5",
        "unitId": "unit-24",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1160,
        "xpReward": 54,
        "gemReward": 15,
        "speedMultiplier": 0.8,
        "spawnInterval": 1880,
        "words": [
          {
            "id": "r1_24_1",
            "word": "cup",
            "meaningVi": "cái cốc",
            "category": "Kitchen",
            "emoji": "☕",
            "pronunciation": "/kʌp/"
          },
          {
            "id": "r1_24_2",
            "word": "bowl",
            "meaningVi": "cái bát",
            "category": "Kitchen",
            "emoji": "🥣",
            "pronunciation": "/bəʊl/"
          },
          {
            "id": "r1_24_3",
            "word": "fork",
            "meaningVi": "cái nĩa",
            "category": "Kitchen",
            "emoji": "🍴",
            "pronunciation": "/fɔːk/"
          },
          {
            "id": "r1_24_4",
            "word": "dish",
            "meaningVi": "cái đĩa",
            "category": "Kitchen",
            "emoji": "🍽️",
            "pronunciation": "/dɪʃ/"
          },
          {
            "id": "r1_24_5",
            "word": "pot",
            "meaningVi": "cái nồi",
            "category": "Kitchen",
            "emoji": "🍲",
            "pronunciation": "/pɒt/"
          },
          {
            "id": "r1_24_6",
            "word": "pan",
            "meaningVi": "cái chảo",
            "category": "Kitchen",
            "emoji": "🍳",
            "pronunciation": "/pæn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-25",
    "unitNumber": 25,
    "title": "Realm 1 Grand Review",
    "titleVi": "Đại Chiến Mầm Chồi Khám Phá",
    "description": "Tổng kết 25 bài học đầu tiên với những từ vựng tinh hoa!",
    "icon": "🌟",
    "themeColor": "#ec4899",
    "bannerBg": "from-fuchsia-500/30 via-pink-500/20 to-purple-600/30",
    "levels": [
      {
        "id": "lvl-25-1",
        "unitId": "unit-25",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌟",
        "bgColor": "#ec4899",
        "targetScore": 600,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.7,
        "spawnInterval": 2375,
        "words": [
          {
            "id": "r1_25_1",
            "word": "star",
            "meaningVi": "ngôi sao",
            "category": "Mastery",
            "emoji": "⭐",
            "pronunciation": "/stɑːr/"
          },
          {
            "id": "r1_25_2",
            "word": "robot",
            "meaningVi": "người máy",
            "category": "Mastery",
            "emoji": "🤖",
            "pronunciation": "/ˈrəʊbɒt/"
          },
          {
            "id": "r1_25_3",
            "word": "apple",
            "meaningVi": "quả táo",
            "category": "Mastery",
            "emoji": "🍎",
            "pronunciation": "/ˈæpl/"
          },
          {
            "id": "r1_25_4",
            "word": "happy",
            "meaningVi": "vui vẻ",
            "category": "Mastery",
            "emoji": "😄",
            "pronunciation": "/ˈhæpi/"
          }
        ]
      },
      {
        "id": "lvl-25-2",
        "unitId": "unit-25",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 700,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.75,
        "spawnInterval": 2275,
        "words": [
          {
            "id": "r1_25_5",
            "word": "water",
            "meaningVi": "nước uống",
            "category": "Mastery",
            "emoji": "💧",
            "pronunciation": "/ˈwɔːtər/"
          },
          {
            "id": "r1_25_6",
            "word": "green",
            "meaningVi": "màu xanh lá",
            "category": "Mastery",
            "emoji": "🟢",
            "pronunciation": "/ɡriːn/"
          },
          {
            "id": "r1_25_7",
            "word": "tiger",
            "meaningVi": "con hổ",
            "category": "Mastery",
            "emoji": "🐯",
            "pronunciation": "/ˈtaɪɡər/"
          },
          {
            "id": "r1_25_8",
            "word": "three",
            "meaningVi": "số ba",
            "category": "Mastery",
            "emoji": "3️⃣",
            "pronunciation": "/θriː/"
          }
        ]
      },
      {
        "id": "lvl-25-3",
        "unitId": "unit-25",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 900,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.8,
        "spawnInterval": 2075,
        "words": [
          {
            "id": "r1_25_2",
            "word": "robot",
            "meaningVi": "người máy",
            "category": "Mastery",
            "emoji": "🤖",
            "pronunciation": "/ˈrəʊbɒt/"
          },
          {
            "id": "r1_25_3",
            "word": "apple",
            "meaningVi": "quả táo",
            "category": "Mastery",
            "emoji": "🍎",
            "pronunciation": "/ˈæpl/"
          },
          {
            "id": "r1_25_4",
            "word": "happy",
            "meaningVi": "vui vẻ",
            "category": "Mastery",
            "emoji": "😄",
            "pronunciation": "/ˈhæpi/"
          },
          {
            "id": "r1_25_5",
            "word": "water",
            "meaningVi": "nước uống",
            "category": "Mastery",
            "emoji": "💧",
            "pronunciation": "/ˈwɔːtər/"
          },
          {
            "id": "r1_25_6",
            "word": "green",
            "meaningVi": "màu xanh lá",
            "category": "Mastery",
            "emoji": "🟢",
            "pronunciation": "/ɡriːn/"
          },
          {
            "id": "r1_25_7",
            "word": "tiger",
            "meaningVi": "con hổ",
            "category": "Mastery",
            "emoji": "🐯",
            "pronunciation": "/ˈtaɪɡər/"
          }
        ]
      },
      {
        "id": "lvl-25-4",
        "unitId": "unit-25",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 25",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 45,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-25-5",
        "unitId": "unit-25",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1175,
        "xpReward": 55,
        "gemReward": 15,
        "speedMultiplier": 0.82,
        "spawnInterval": 1875,
        "words": [
          {
            "id": "r1_25_1",
            "word": "star",
            "meaningVi": "ngôi sao",
            "category": "Mastery",
            "emoji": "⭐",
            "pronunciation": "/stɑːr/"
          },
          {
            "id": "r1_25_2",
            "word": "robot",
            "meaningVi": "người máy",
            "category": "Mastery",
            "emoji": "🤖",
            "pronunciation": "/ˈrəʊbɒt/"
          },
          {
            "id": "r1_25_3",
            "word": "apple",
            "meaningVi": "quả táo",
            "category": "Mastery",
            "emoji": "🍎",
            "pronunciation": "/ˈæpl/"
          },
          {
            "id": "r1_25_4",
            "word": "happy",
            "meaningVi": "vui vẻ",
            "category": "Mastery",
            "emoji": "😄",
            "pronunciation": "/ˈhæpi/"
          },
          {
            "id": "r1_25_5",
            "word": "water",
            "meaningVi": "nước uống",
            "category": "Mastery",
            "emoji": "💧",
            "pronunciation": "/ˈwɔːtər/"
          },
          {
            "id": "r1_25_6",
            "word": "green",
            "meaningVi": "màu xanh lá",
            "category": "Mastery",
            "emoji": "🟢",
            "pronunciation": "/ɡriːn/"
          },
          {
            "id": "r1_25_7",
            "word": "tiger",
            "meaningVi": "con hổ",
            "category": "Mastery",
            "emoji": "🐯",
            "pronunciation": "/ˈtaɪɡər/"
          },
          {
            "id": "r1_25_8",
            "word": "three",
            "meaningVi": "số ba",
            "category": "Mastery",
            "emoji": "3️⃣",
            "pronunciation": "/θriː/"
          }
        ]
      }
    ]
  }
];

export const REALM1_REALM: AgeRealm = {
  id: 'realm-1',
  realmNumber: 1,
  name: 'Seedling Explorers',
  nameVi: 'Mầm Chồi Khám Phá',
  ageRange: '7 - 8 Tuổi',
  gradeLabel: 'Lớp 2 - 3 (Pre-A1)',
  description: '25 Chương khởi động với từ vựng ngắn 3-5 chữ cái, tốc độ gõ nhẹ nhàng, hình ảnh sinh động thân thiện.',
  icon: '🌱',
  color: '#00f0ff',
  badgeBg: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300',
  startChapter: 1,
  endChapter: 25,
  wordLengthHint: '3 - 5 chữ cái',
  targetWpm: '15 - 25 WPM',
  units: REALM1_UNITS
};
