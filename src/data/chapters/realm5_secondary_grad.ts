import { Unit } from '../progress-types';
import { AgeRealm } from './types';

export const REALM5_UNITS: Unit[] = [
  {
    "id": "unit-121",
    "unitNumber": 121,
    "title": "Physics & Mechanics",
    "titleVi": "Khoa Học Vật Lý",
    "description": "Vận tốc chuyển động, lực ma sát và động năng vật thể.",
    "icon": "⚙️",
    "themeColor": "#3b82f6",
    "bannerBg": "from-blue-600/30 via-indigo-600/20 to-sky-700/30",
    "levels": [
      {
        "id": "lvl-121-1",
        "unitId": "unit-121",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "⚙️",
        "bgColor": "#3b82f6",
        "targetScore": 1560,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.02,
        "spawnInterval": 1895,
        "words": [
          {
            "id": "r5_121_1",
            "word": "velocity",
            "meaningVi": "vận tốc",
            "category": "Physics",
            "emoji": "🏎️",
            "pronunciation": "/vəˈlɒsəti/"
          },
          {
            "id": "r5_121_2",
            "word": "friction",
            "meaningVi": "lực ma sát",
            "category": "Physics",
            "emoji": "🛞",
            "pronunciation": "/ˈfrɪkʃn/"
          },
          {
            "id": "r5_121_3",
            "word": "momentum",
            "meaningVi": "động lượng",
            "category": "Physics",
            "emoji": "🚀",
            "pronunciation": "/məˈmentəm/"
          }
        ]
      },
      {
        "id": "lvl-121-2",
        "unitId": "unit-121",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1660,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.07,
        "spawnInterval": 1795,
        "words": [
          {
            "id": "r5_121_4",
            "word": "pendulum",
            "meaningVi": "con lắc dao động",
            "category": "Physics",
            "emoji": "🕰️",
            "pronunciation": "/ˈpendjələm/"
          },
          {
            "id": "r5_121_5",
            "word": "kinetic",
            "meaningVi": "thuộc về động năng",
            "category": "Physics",
            "emoji": "⚡",
            "pronunciation": "/kɪˈnetɪk/"
          }
        ]
      },
      {
        "id": "lvl-121-3",
        "unitId": "unit-121",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2052,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.12,
        "spawnInterval": 1595,
        "words": [
          {
            "id": "r5_121_2",
            "word": "friction",
            "meaningVi": "lực ma sát",
            "category": "Physics",
            "emoji": "🛞",
            "pronunciation": "/ˈfrɪkʃn/"
          },
          {
            "id": "r5_121_3",
            "word": "momentum",
            "meaningVi": "động lượng",
            "category": "Physics",
            "emoji": "🚀",
            "pronunciation": "/məˈmentəm/"
          },
          {
            "id": "r5_121_4",
            "word": "pendulum",
            "meaningVi": "con lắc dao động",
            "category": "Physics",
            "emoji": "🕰️",
            "pronunciation": "/ˈpendjələm/"
          },
          {
            "id": "r5_121_5",
            "word": "kinetic",
            "meaningVi": "thuộc về động năng",
            "category": "Physics",
            "emoji": "⚡",
            "pronunciation": "/kɪˈnetɪk/"
          },
          {
            "id": "r5_121_1",
            "word": "velocity",
            "meaningVi": "vận tốc",
            "category": "Physics",
            "emoji": "🏎️",
            "pronunciation": "/vəˈlɒsəti/"
          }
        ]
      },
      {
        "id": "lvl-121-4",
        "unitId": "unit-121",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 121",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 64,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-121-5",
        "unitId": "unit-121",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2615,
        "xpReward": 74,
        "gemReward": 15,
        "speedMultiplier": 1.14,
        "spawnInterval": 1395,
        "words": [
          {
            "id": "r5_121_1",
            "word": "velocity",
            "meaningVi": "vận tốc",
            "category": "Physics",
            "emoji": "🏎️",
            "pronunciation": "/vəˈlɒsəti/"
          },
          {
            "id": "r5_121_2",
            "word": "friction",
            "meaningVi": "lực ma sát",
            "category": "Physics",
            "emoji": "🛞",
            "pronunciation": "/ˈfrɪkʃn/"
          },
          {
            "id": "r5_121_3",
            "word": "momentum",
            "meaningVi": "động lượng",
            "category": "Physics",
            "emoji": "🚀",
            "pronunciation": "/məˈmentəm/"
          },
          {
            "id": "r5_121_4",
            "word": "pendulum",
            "meaningVi": "con lắc dao động",
            "category": "Physics",
            "emoji": "🕰️",
            "pronunciation": "/ˈpendjələm/"
          },
          {
            "id": "r5_121_5",
            "word": "kinetic",
            "meaningVi": "thuộc về động năng",
            "category": "Physics",
            "emoji": "⚡",
            "pronunciation": "/kɪˈnetɪk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-122",
    "unitNumber": 122,
    "title": "Chemistry & Elements",
    "titleVi": "Hóa Học & Hợp Chất",
    "description": "Phân tử hóa học, dung dịch bão hòa và chất xúc tác.",
    "icon": "🧪",
    "themeColor": "#10b981",
    "bannerBg": "from-emerald-600/30 via-teal-600/20 to-green-700/30",
    "levels": [
      {
        "id": "lvl-122-1",
        "unitId": "unit-122",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧪",
        "bgColor": "#10b981",
        "targetScore": 1570,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.03,
        "spawnInterval": 1890,
        "words": [
          {
            "id": "r5_122_1",
            "word": "molecule",
            "meaningVi": "phân tử",
            "category": "Chemistry",
            "emoji": "🧬",
            "pronunciation": "/ˈmɒlɪkjuːl/"
          },
          {
            "id": "r5_122_2",
            "word": "solution",
            "meaningVi": "dung dịch hóa chất",
            "category": "Chemistry",
            "emoji": "🧪",
            "pronunciation": "/səˈluːʃn/"
          },
          {
            "id": "r5_122_3",
            "word": "catalyst",
            "meaningVi": "chất xúc tác phản ứng",
            "category": "Chemistry",
            "emoji": "✨",
            "pronunciation": "/ˈkætəlɪst/"
          }
        ]
      },
      {
        "id": "lvl-122-2",
        "unitId": "unit-122",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1670,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.08,
        "spawnInterval": 1790,
        "words": [
          {
            "id": "r5_122_4",
            "word": "compound",
            "meaningVi": "hợp chất",
            "category": "Chemistry",
            "emoji": "🔬",
            "pronunciation": "/ˈkɒmpaʊnd/"
          },
          {
            "id": "r5_122_5",
            "word": "reaction",
            "meaningVi": "phản ứng hóa học",
            "category": "Chemistry",
            "emoji": "💥",
            "pronunciation": "/riˈækʃn/"
          }
        ]
      },
      {
        "id": "lvl-122-3",
        "unitId": "unit-122",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2064,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.13,
        "spawnInterval": 1590,
        "words": [
          {
            "id": "r5_122_2",
            "word": "solution",
            "meaningVi": "dung dịch hóa chất",
            "category": "Chemistry",
            "emoji": "🧪",
            "pronunciation": "/səˈluːʃn/"
          },
          {
            "id": "r5_122_3",
            "word": "catalyst",
            "meaningVi": "chất xúc tác phản ứng",
            "category": "Chemistry",
            "emoji": "✨",
            "pronunciation": "/ˈkætəlɪst/"
          },
          {
            "id": "r5_122_4",
            "word": "compound",
            "meaningVi": "hợp chất",
            "category": "Chemistry",
            "emoji": "🔬",
            "pronunciation": "/ˈkɒmpaʊnd/"
          },
          {
            "id": "r5_122_5",
            "word": "reaction",
            "meaningVi": "phản ứng hóa học",
            "category": "Chemistry",
            "emoji": "💥",
            "pronunciation": "/riˈækʃn/"
          },
          {
            "id": "r5_122_1",
            "word": "molecule",
            "meaningVi": "phân tử",
            "category": "Chemistry",
            "emoji": "🧬",
            "pronunciation": "/ˈmɒlɪkjuːl/"
          }
        ]
      },
      {
        "id": "lvl-122-4",
        "unitId": "unit-122",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 122",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 64,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-122-5",
        "unitId": "unit-122",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2630,
        "xpReward": 74,
        "gemReward": 15,
        "speedMultiplier": 1.15,
        "spawnInterval": 1390,
        "words": [
          {
            "id": "r5_122_1",
            "word": "molecule",
            "meaningVi": "phân tử",
            "category": "Chemistry",
            "emoji": "🧬",
            "pronunciation": "/ˈmɒlɪkjuːl/"
          },
          {
            "id": "r5_122_2",
            "word": "solution",
            "meaningVi": "dung dịch hóa chất",
            "category": "Chemistry",
            "emoji": "🧪",
            "pronunciation": "/səˈluːʃn/"
          },
          {
            "id": "r5_122_3",
            "word": "catalyst",
            "meaningVi": "chất xúc tác phản ứng",
            "category": "Chemistry",
            "emoji": "✨",
            "pronunciation": "/ˈkætəlɪst/"
          },
          {
            "id": "r5_122_4",
            "word": "compound",
            "meaningVi": "hợp chất",
            "category": "Chemistry",
            "emoji": "🔬",
            "pronunciation": "/ˈkɒmpaʊnd/"
          },
          {
            "id": "r5_122_5",
            "word": "reaction",
            "meaningVi": "phản ứng hóa học",
            "category": "Chemistry",
            "emoji": "💥",
            "pronunciation": "/riˈækʃn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-123",
    "unitNumber": 123,
    "title": "Genetics & Biology",
    "titleVi": "Sinh Học & Di Truyền",
    "description": "Nhiễm sắc thể, mã bộ gen và tế bào sinh vật.",
    "icon": "🧬",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-600/30 via-violet-600/20 to-indigo-700/30",
    "levels": [
      {
        "id": "lvl-123-1",
        "unitId": "unit-123",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧬",
        "bgColor": "#8b5cf6",
        "targetScore": 1580,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.03,
        "spawnInterval": 1885,
        "words": [
          {
            "id": "r5_123_1",
            "word": "cellular",
            "meaningVi": "thuộc về tế bào",
            "category": "Biology",
            "emoji": "🧫",
            "pronunciation": "/ˈseljələr/"
          },
          {
            "id": "r5_123_2",
            "word": "organism",
            "meaningVi": "sinh vật sống",
            "category": "Biology",
            "emoji": "🦠",
            "pronunciation": "/ˈɔːɡənɪzəm/"
          },
          {
            "id": "r5_123_3",
            "word": "chromosome",
            "meaningVi": "nhiễm sắc thể",
            "category": "Biology",
            "emoji": "🧬",
            "pronunciation": "/ˈkrəʊməsəʊm/"
          }
        ]
      },
      {
        "id": "lvl-123-2",
        "unitId": "unit-123",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1680,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.08,
        "spawnInterval": 1785,
        "words": [
          {
            "id": "r5_123_4",
            "word": "mutation",
            "meaningVi": "đột biến gen",
            "category": "Biology",
            "emoji": "🔄",
            "pronunciation": "/mjuːˈteɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-123-3",
        "unitId": "unit-123",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2076,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.13,
        "spawnInterval": 1585,
        "words": [
          {
            "id": "r5_123_2",
            "word": "organism",
            "meaningVi": "sinh vật sống",
            "category": "Biology",
            "emoji": "🦠",
            "pronunciation": "/ˈɔːɡənɪzəm/"
          },
          {
            "id": "r5_123_3",
            "word": "chromosome",
            "meaningVi": "nhiễm sắc thể",
            "category": "Biology",
            "emoji": "🧬",
            "pronunciation": "/ˈkrəʊməsəʊm/"
          },
          {
            "id": "r5_123_4",
            "word": "mutation",
            "meaningVi": "đột biến gen",
            "category": "Biology",
            "emoji": "🔄",
            "pronunciation": "/mjuːˈteɪʃn/"
          },
          {
            "id": "r5_123_1",
            "word": "cellular",
            "meaningVi": "thuộc về tế bào",
            "category": "Biology",
            "emoji": "🧫",
            "pronunciation": "/ˈseljələr/"
          }
        ]
      },
      {
        "id": "lvl-123-4",
        "unitId": "unit-123",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 123",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 64,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-123-5",
        "unitId": "unit-123",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2645,
        "xpReward": 74,
        "gemReward": 15,
        "speedMultiplier": 1.15,
        "spawnInterval": 1385,
        "words": [
          {
            "id": "r5_123_1",
            "word": "cellular",
            "meaningVi": "thuộc về tế bào",
            "category": "Biology",
            "emoji": "🧫",
            "pronunciation": "/ˈseljələr/"
          },
          {
            "id": "r5_123_2",
            "word": "organism",
            "meaningVi": "sinh vật sống",
            "category": "Biology",
            "emoji": "🦠",
            "pronunciation": "/ˈɔːɡənɪzəm/"
          },
          {
            "id": "r5_123_3",
            "word": "chromosome",
            "meaningVi": "nhiễm sắc thể",
            "category": "Biology",
            "emoji": "🧬",
            "pronunciation": "/ˈkrəʊməsəʊm/"
          },
          {
            "id": "r5_123_4",
            "word": "mutation",
            "meaningVi": "đột biến gen",
            "category": "Biology",
            "emoji": "🔄",
            "pronunciation": "/mjuːˈteɪʃn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-124",
    "unitNumber": 124,
    "title": "Global Climate Action",
    "titleVi": "Khí Hậu & Năng Lượng Xanh",
    "description": "Hiệu ứng nhà kính, lượng phát thải carbon và năng lượng tái tạo.",
    "icon": "🌍",
    "themeColor": "#16a34a",
    "bannerBg": "from-green-600/30 via-emerald-600/20 to-lime-700/30",
    "levels": [
      {
        "id": "lvl-124-1",
        "unitId": "unit-124",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌍",
        "bgColor": "#16a34a",
        "targetScore": 1590,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.04,
        "spawnInterval": 1880,
        "words": [
          {
            "id": "r5_124_1",
            "word": "greenhouse",
            "meaningVi": "hiệu ứng nhà kính",
            "category": "Climate",
            "emoji": "🏡",
            "pronunciation": "/ˈɡriːnhaʊs/"
          },
          {
            "id": "r5_124_2",
            "word": "emissions",
            "meaningVi": "khí thải môi trường",
            "category": "Climate",
            "emoji": "🏭",
            "pronunciation": "/ɪˈmɪʃnz/"
          },
          {
            "id": "r5_124_3",
            "word": "renewable",
            "meaningVi": "có thể tái tạo",
            "category": "Climate",
            "emoji": "♻️",
            "pronunciation": "/rɪˈnjuːəbl/"
          }
        ]
      },
      {
        "id": "lvl-124-2",
        "unitId": "unit-124",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1690,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.09,
        "spawnInterval": 1780,
        "words": [
          {
            "id": "r5_124_4",
            "word": "pollution",
            "meaningVi": "sự ô nhiễm",
            "category": "Climate",
            "emoji": "🌫️",
            "pronunciation": "/pəˈluːʃn/"
          }
        ]
      },
      {
        "id": "lvl-124-3",
        "unitId": "unit-124",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2088,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.14,
        "spawnInterval": 1580,
        "words": [
          {
            "id": "r5_124_2",
            "word": "emissions",
            "meaningVi": "khí thải môi trường",
            "category": "Climate",
            "emoji": "🏭",
            "pronunciation": "/ɪˈmɪʃnz/"
          },
          {
            "id": "r5_124_3",
            "word": "renewable",
            "meaningVi": "có thể tái tạo",
            "category": "Climate",
            "emoji": "♻️",
            "pronunciation": "/rɪˈnjuːəbl/"
          },
          {
            "id": "r5_124_4",
            "word": "pollution",
            "meaningVi": "sự ô nhiễm",
            "category": "Climate",
            "emoji": "🌫️",
            "pronunciation": "/pəˈluːʃn/"
          },
          {
            "id": "r5_124_1",
            "word": "greenhouse",
            "meaningVi": "hiệu ứng nhà kính",
            "category": "Climate",
            "emoji": "🏡",
            "pronunciation": "/ˈɡriːnhaʊs/"
          }
        ]
      },
      {
        "id": "lvl-124-4",
        "unitId": "unit-124",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 124",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 64,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-124-5",
        "unitId": "unit-124",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2660,
        "xpReward": 74,
        "gemReward": 15,
        "speedMultiplier": 1.16,
        "spawnInterval": 1380,
        "words": [
          {
            "id": "r5_124_1",
            "word": "greenhouse",
            "meaningVi": "hiệu ứng nhà kính",
            "category": "Climate",
            "emoji": "🏡",
            "pronunciation": "/ˈɡriːnhaʊs/"
          },
          {
            "id": "r5_124_2",
            "word": "emissions",
            "meaningVi": "khí thải môi trường",
            "category": "Climate",
            "emoji": "🏭",
            "pronunciation": "/ɪˈmɪʃnz/"
          },
          {
            "id": "r5_124_3",
            "word": "renewable",
            "meaningVi": "có thể tái tạo",
            "category": "Climate",
            "emoji": "♻️",
            "pronunciation": "/rɪˈnjuːəbl/"
          },
          {
            "id": "r5_124_4",
            "word": "pollution",
            "meaningVi": "sự ô nhiễm",
            "category": "Climate",
            "emoji": "🌫️",
            "pronunciation": "/pəˈluːʃn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-125",
    "unitNumber": 125,
    "title": "Artificial Intelligence",
    "titleVi": "Trí Tuệ Nhân Tạo",
    "description": "Thuật toán máy học, tập dữ liệu lớn và mạng nơ-ron số.",
    "icon": "🤖",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-600/30 via-blue-600/20 to-indigo-700/30",
    "levels": [
      {
        "id": "lvl-125-1",
        "unitId": "unit-125",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🤖",
        "bgColor": "#06b6d4",
        "targetScore": 1600,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.04,
        "spawnInterval": 1875,
        "words": [
          {
            "id": "r5_125_1",
            "word": "algorithm",
            "meaningVi": "thuật toán xử lý",
            "category": "AI",
            "emoji": "⚙️",
            "pronunciation": "/ˈælɡərɪðəm/"
          },
          {
            "id": "r5_125_2",
            "word": "automation",
            "meaningVi": "sự tự động hóa",
            "category": "AI",
            "emoji": "🦾",
            "pronunciation": "/ˌɔːtəˈmeɪʃn/"
          },
          {
            "id": "r5_125_3",
            "word": "dataset",
            "meaningVi": "tập hợp dữ liệu",
            "category": "AI",
            "emoji": "📊",
            "pronunciation": "/ˈdeɪtəset/"
          }
        ]
      },
      {
        "id": "lvl-125-2",
        "unitId": "unit-125",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1700,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.09,
        "spawnInterval": 1775,
        "words": [
          {
            "id": "r5_125_4",
            "word": "neural",
            "meaningVi": "thuộc nơ-ron thần kinh",
            "category": "AI",
            "emoji": "🧠",
            "pronunciation": "/ˈnjʊərəl/"
          }
        ]
      },
      {
        "id": "lvl-125-3",
        "unitId": "unit-125",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2100,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.14,
        "spawnInterval": 1575,
        "words": [
          {
            "id": "r5_125_2",
            "word": "automation",
            "meaningVi": "sự tự động hóa",
            "category": "AI",
            "emoji": "🦾",
            "pronunciation": "/ˌɔːtəˈmeɪʃn/"
          },
          {
            "id": "r5_125_3",
            "word": "dataset",
            "meaningVi": "tập hợp dữ liệu",
            "category": "AI",
            "emoji": "📊",
            "pronunciation": "/ˈdeɪtəset/"
          },
          {
            "id": "r5_125_4",
            "word": "neural",
            "meaningVi": "thuộc nơ-ron thần kinh",
            "category": "AI",
            "emoji": "🧠",
            "pronunciation": "/ˈnjʊərəl/"
          },
          {
            "id": "r5_125_1",
            "word": "algorithm",
            "meaningVi": "thuật toán xử lý",
            "category": "AI",
            "emoji": "⚙️",
            "pronunciation": "/ˈælɡərɪðəm/"
          }
        ]
      },
      {
        "id": "lvl-125-4",
        "unitId": "unit-125",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 125",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 65,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-125-5",
        "unitId": "unit-125",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2675,
        "xpReward": 75,
        "gemReward": 15,
        "speedMultiplier": 1.16,
        "spawnInterval": 1375,
        "words": [
          {
            "id": "r5_125_1",
            "word": "algorithm",
            "meaningVi": "thuật toán xử lý",
            "category": "AI",
            "emoji": "⚙️",
            "pronunciation": "/ˈælɡərɪðəm/"
          },
          {
            "id": "r5_125_2",
            "word": "automation",
            "meaningVi": "sự tự động hóa",
            "category": "AI",
            "emoji": "🦾",
            "pronunciation": "/ˌɔːtəˈmeɪʃn/"
          },
          {
            "id": "r5_125_3",
            "word": "dataset",
            "meaningVi": "tập hợp dữ liệu",
            "category": "AI",
            "emoji": "📊",
            "pronunciation": "/ˈdeɪtəset/"
          },
          {
            "id": "r5_125_4",
            "word": "neural",
            "meaningVi": "thuộc nơ-ron thần kinh",
            "category": "AI",
            "emoji": "🧠",
            "pronunciation": "/ˈnjʊərəl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-126",
    "unitNumber": 126,
    "title": "Psychology & Moods",
    "titleVi": "Tâm Lý Tuổi Trưởng Thành",
    "description": "Tư duy tích cực, sự kiên cường vượt khó và lòng thấu cảm.",
    "icon": "🧠",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-600/30 via-rose-600/20 to-purple-700/30",
    "levels": [
      {
        "id": "lvl-126-1",
        "unitId": "unit-126",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧠",
        "bgColor": "#ec4899",
        "targetScore": 1610,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.05,
        "spawnInterval": 1870,
        "words": [
          {
            "id": "r5_126_1",
            "word": "mindset",
            "meaningVi": "tư duy định hình",
            "category": "Psychology",
            "emoji": "🧠",
            "pronunciation": "/ˈmaɪndset/"
          },
          {
            "id": "r5_126_2",
            "word": "optimism",
            "meaningVi": "tinh thần lạc quan",
            "category": "Psychology",
            "emoji": "☀️",
            "pronunciation": "/ˈɒptɪmɪzəm/"
          },
          {
            "id": "r5_126_3",
            "word": "resilience",
            "meaningVi": "sự kiên cường bền bỉ",
            "category": "Psychology",
            "emoji": "🛡️",
            "pronunciation": "/rɪˈzɪliəns/"
          }
        ]
      },
      {
        "id": "lvl-126-2",
        "unitId": "unit-126",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1710,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.1,
        "spawnInterval": 1770,
        "words": [
          {
            "id": "r5_126_4",
            "word": "empathy",
            "meaningVi": "sự thấu cảm",
            "category": "Psychology",
            "emoji": "🤝",
            "pronunciation": "/ˈempəθi/"
          },
          {
            "id": "r5_126_5",
            "word": "anxiety",
            "meaningVi": "sự lo âu bồn chồn",
            "category": "Psychology",
            "emoji": "😟",
            "pronunciation": "/æŋˈzaɪəti/"
          }
        ]
      },
      {
        "id": "lvl-126-3",
        "unitId": "unit-126",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2112,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.15,
        "spawnInterval": 1570,
        "words": [
          {
            "id": "r5_126_2",
            "word": "optimism",
            "meaningVi": "tinh thần lạc quan",
            "category": "Psychology",
            "emoji": "☀️",
            "pronunciation": "/ˈɒptɪmɪzəm/"
          },
          {
            "id": "r5_126_3",
            "word": "resilience",
            "meaningVi": "sự kiên cường bền bỉ",
            "category": "Psychology",
            "emoji": "🛡️",
            "pronunciation": "/rɪˈzɪliəns/"
          },
          {
            "id": "r5_126_4",
            "word": "empathy",
            "meaningVi": "sự thấu cảm",
            "category": "Psychology",
            "emoji": "🤝",
            "pronunciation": "/ˈempəθi/"
          },
          {
            "id": "r5_126_5",
            "word": "anxiety",
            "meaningVi": "sự lo âu bồn chồn",
            "category": "Psychology",
            "emoji": "😟",
            "pronunciation": "/æŋˈzaɪəti/"
          },
          {
            "id": "r5_126_1",
            "word": "mindset",
            "meaningVi": "tư duy định hình",
            "category": "Psychology",
            "emoji": "🧠",
            "pronunciation": "/ˈmaɪndset/"
          }
        ]
      },
      {
        "id": "lvl-126-4",
        "unitId": "unit-126",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 126",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 65,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-126-5",
        "unitId": "unit-126",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2690,
        "xpReward": 75,
        "gemReward": 15,
        "speedMultiplier": 1.17,
        "spawnInterval": 1370,
        "words": [
          {
            "id": "r5_126_1",
            "word": "mindset",
            "meaningVi": "tư duy định hình",
            "category": "Psychology",
            "emoji": "🧠",
            "pronunciation": "/ˈmaɪndset/"
          },
          {
            "id": "r5_126_2",
            "word": "optimism",
            "meaningVi": "tinh thần lạc quan",
            "category": "Psychology",
            "emoji": "☀️",
            "pronunciation": "/ˈɒptɪmɪzəm/"
          },
          {
            "id": "r5_126_3",
            "word": "resilience",
            "meaningVi": "sự kiên cường bền bỉ",
            "category": "Psychology",
            "emoji": "🛡️",
            "pronunciation": "/rɪˈzɪliəns/"
          },
          {
            "id": "r5_126_4",
            "word": "empathy",
            "meaningVi": "sự thấu cảm",
            "category": "Psychology",
            "emoji": "🤝",
            "pronunciation": "/ˈempəθi/"
          },
          {
            "id": "r5_126_5",
            "word": "anxiety",
            "meaningVi": "sự lo âu bồn chồn",
            "category": "Psychology",
            "emoji": "😟",
            "pronunciation": "/æŋˈzaɪəti/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-127",
    "unitNumber": 127,
    "title": "Career Pathways",
    "titleVi": "Định Hướng Nghề Nghiệp",
    "description": "Bằng cấp chuyên môn, thực tập sinh và kỹ năng làm việc.",
    "icon": "💼",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-600/30 via-orange-600/20 to-yellow-700/30",
    "levels": [
      {
        "id": "lvl-127-1",
        "unitId": "unit-127",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "💼",
        "bgColor": "#f59e0b",
        "targetScore": 1620,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.05,
        "spawnInterval": 1865,
        "words": [
          {
            "id": "r5_127_1",
            "word": "profession",
            "meaningVi": "nghề nghiệp chuyên môn",
            "category": "Career",
            "emoji": "💼",
            "pronunciation": "/prəˈfeʃn/"
          },
          {
            "id": "r5_127_2",
            "word": "qualification",
            "meaningVi": "bằng cấp chuyên môn",
            "category": "Career",
            "emoji": "📜",
            "pronunciation": "/ˌkwɒlɪfɪˈkeɪʃn/"
          },
          {
            "id": "r5_127_3",
            "word": "vocation",
            "meaningVi": "thiên hướng nghề nghiệp",
            "category": "Career",
            "emoji": "🎯",
            "pronunciation": "/vəʊˈkeɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-127-2",
        "unitId": "unit-127",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1720,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.1,
        "spawnInterval": 1765,
        "words": [
          {
            "id": "r5_127_4",
            "word": "internship",
            "meaningVi": "kỳ thực tập sinh",
            "category": "Career",
            "emoji": "🧑‍💼",
            "pronunciation": "/ˈɪntɜːnʃɪp/"
          }
        ]
      },
      {
        "id": "lvl-127-3",
        "unitId": "unit-127",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2124,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.15,
        "spawnInterval": 1565,
        "words": [
          {
            "id": "r5_127_2",
            "word": "qualification",
            "meaningVi": "bằng cấp chuyên môn",
            "category": "Career",
            "emoji": "📜",
            "pronunciation": "/ˌkwɒlɪfɪˈkeɪʃn/"
          },
          {
            "id": "r5_127_3",
            "word": "vocation",
            "meaningVi": "thiên hướng nghề nghiệp",
            "category": "Career",
            "emoji": "🎯",
            "pronunciation": "/vəʊˈkeɪʃn/"
          },
          {
            "id": "r5_127_4",
            "word": "internship",
            "meaningVi": "kỳ thực tập sinh",
            "category": "Career",
            "emoji": "🧑‍💼",
            "pronunciation": "/ˈɪntɜːnʃɪp/"
          },
          {
            "id": "r5_127_1",
            "word": "profession",
            "meaningVi": "nghề nghiệp chuyên môn",
            "category": "Career",
            "emoji": "💼",
            "pronunciation": "/prəˈfeʃn/"
          }
        ]
      },
      {
        "id": "lvl-127-4",
        "unitId": "unit-127",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 127",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 65,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-127-5",
        "unitId": "unit-127",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2705,
        "xpReward": 75,
        "gemReward": 15,
        "speedMultiplier": 1.17,
        "spawnInterval": 1365,
        "words": [
          {
            "id": "r5_127_1",
            "word": "profession",
            "meaningVi": "nghề nghiệp chuyên môn",
            "category": "Career",
            "emoji": "💼",
            "pronunciation": "/prəˈfeʃn/"
          },
          {
            "id": "r5_127_2",
            "word": "qualification",
            "meaningVi": "bằng cấp chuyên môn",
            "category": "Career",
            "emoji": "📜",
            "pronunciation": "/ˌkwɒlɪfɪˈkeɪʃn/"
          },
          {
            "id": "r5_127_3",
            "word": "vocation",
            "meaningVi": "thiên hướng nghề nghiệp",
            "category": "Career",
            "emoji": "🎯",
            "pronunciation": "/vəʊˈkeɪʃn/"
          },
          {
            "id": "r5_127_4",
            "word": "internship",
            "meaningVi": "kỳ thực tập sinh",
            "category": "Career",
            "emoji": "🧑‍💼",
            "pronunciation": "/ˈɪntɜːnʃɪp/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-128",
    "unitNumber": 128,
    "title": "UNESCO Heritage",
    "titleVi": "Di Sản Thế Giới UNESCO",
    "description": "Bảo tồn di sản lịch sử, công trình kiến trúc và khai quật.",
    "icon": "🏛️",
    "themeColor": "#ca8a04",
    "bannerBg": "from-yellow-600/30 via-amber-600/20 to-orange-700/30",
    "levels": [
      {
        "id": "lvl-128-1",
        "unitId": "unit-128",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏛️",
        "bgColor": "#ca8a04",
        "targetScore": 1630,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.06,
        "spawnInterval": 1860,
        "words": [
          {
            "id": "r5_128_1",
            "word": "heritage",
            "meaningVi": "di sản văn hóa",
            "category": "Heritage",
            "emoji": "🏛️",
            "pronunciation": "/ˈherɪtɪdʒ/"
          },
          {
            "id": "r5_128_2",
            "word": "historic",
            "meaningVi": "mang tính lịch sử",
            "category": "Heritage",
            "emoji": "📜",
            "pronunciation": "/hɪˈstɒrɪk/"
          },
          {
            "id": "r5_128_3",
            "word": "excavation",
            "meaningVi": "cuộc khai quật khảo cổ",
            "category": "Heritage",
            "emoji": "⛏️",
            "pronunciation": "/ˌekskəˈveɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-128-2",
        "unitId": "unit-128",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1730,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.11,
        "spawnInterval": 1760,
        "words": [
          {
            "id": "r5_128_4",
            "word": "conservation",
            "meaningVi": "công tác bảo tồn",
            "category": "Heritage",
            "emoji": "🛡️",
            "pronunciation": "/ˌkɒnsəˈveɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-128-3",
        "unitId": "unit-128",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2136,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.16,
        "spawnInterval": 1560,
        "words": [
          {
            "id": "r5_128_2",
            "word": "historic",
            "meaningVi": "mang tính lịch sử",
            "category": "Heritage",
            "emoji": "📜",
            "pronunciation": "/hɪˈstɒrɪk/"
          },
          {
            "id": "r5_128_3",
            "word": "excavation",
            "meaningVi": "cuộc khai quật khảo cổ",
            "category": "Heritage",
            "emoji": "⛏️",
            "pronunciation": "/ˌekskəˈveɪʃn/"
          },
          {
            "id": "r5_128_4",
            "word": "conservation",
            "meaningVi": "công tác bảo tồn",
            "category": "Heritage",
            "emoji": "🛡️",
            "pronunciation": "/ˌkɒnsəˈveɪʃn/"
          },
          {
            "id": "r5_128_1",
            "word": "heritage",
            "meaningVi": "di sản văn hóa",
            "category": "Heritage",
            "emoji": "🏛️",
            "pronunciation": "/ˈherɪtɪdʒ/"
          }
        ]
      },
      {
        "id": "lvl-128-4",
        "unitId": "unit-128",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 128",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 65,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-128-5",
        "unitId": "unit-128",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2720,
        "xpReward": 75,
        "gemReward": 15,
        "speedMultiplier": 1.18,
        "spawnInterval": 1360,
        "words": [
          {
            "id": "r5_128_1",
            "word": "heritage",
            "meaningVi": "di sản văn hóa",
            "category": "Heritage",
            "emoji": "🏛️",
            "pronunciation": "/ˈherɪtɪdʒ/"
          },
          {
            "id": "r5_128_2",
            "word": "historic",
            "meaningVi": "mang tính lịch sử",
            "category": "Heritage",
            "emoji": "📜",
            "pronunciation": "/hɪˈstɒrɪk/"
          },
          {
            "id": "r5_128_3",
            "word": "excavation",
            "meaningVi": "cuộc khai quật khảo cổ",
            "category": "Heritage",
            "emoji": "⛏️",
            "pronunciation": "/ˌekskəˈveɪʃn/"
          },
          {
            "id": "r5_128_4",
            "word": "conservation",
            "meaningVi": "công tác bảo tồn",
            "category": "Heritage",
            "emoji": "🛡️",
            "pronunciation": "/ˌkɒnsəˈveɪʃn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-129",
    "unitNumber": 129,
    "title": "Smart Urbanization",
    "titleVi": "Đô Thị Hóa & Thành Phố Thông Minh",
    "description": "Cơ sở hạ tầng, giảm tải tắc nghẽn và quy hoạch cư dân.",
    "icon": "🌆",
    "themeColor": "#2563eb",
    "bannerBg": "from-blue-600/30 via-indigo-600/20 to-cyan-700/30",
    "levels": [
      {
        "id": "lvl-129-1",
        "unitId": "unit-129",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌆",
        "bgColor": "#2563eb",
        "targetScore": 1640,
        "xpReward": 32,
        "gemReward": 5,
        "speedMultiplier": 1.06,
        "spawnInterval": 1855,
        "words": [
          {
            "id": "r5_129_1",
            "word": "infrastructure",
            "meaningVi": "cơ sở hạ tầng",
            "category": "Urban",
            "emoji": "🏗️",
            "pronunciation": "/ˈɪnfrəstrʌktʃər/"
          },
          {
            "id": "r5_129_2",
            "word": "congestion",
            "meaningVi": "tình trạng tắc nghẽn",
            "category": "Urban",
            "emoji": "🚗",
            "pronunciation": "/kənˈdʒestʃən/"
          },
          {
            "id": "r5_129_3",
            "word": "residential",
            "meaningVi": "thuộc khu dân cư",
            "category": "Urban",
            "emoji": "🏘️",
            "pronunciation": "/ˌrezɪˈdenʃl/"
          }
        ]
      },
      {
        "id": "lvl-129-2",
        "unitId": "unit-129",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1740,
        "xpReward": 37,
        "gemReward": 6,
        "speedMultiplier": 1.11,
        "spawnInterval": 1755,
        "words": [
          {
            "id": "r5_129_4",
            "word": "civic",
            "meaningVi": "thuộc về đô thị dân sự",
            "category": "Urban",
            "emoji": "🏛️",
            "pronunciation": "/ˈsɪvɪk/"
          }
        ]
      },
      {
        "id": "lvl-129-3",
        "unitId": "unit-129",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2148,
        "xpReward": 42,
        "gemReward": 8,
        "speedMultiplier": 1.16,
        "spawnInterval": 1555,
        "words": [
          {
            "id": "r5_129_2",
            "word": "congestion",
            "meaningVi": "tình trạng tắc nghẽn",
            "category": "Urban",
            "emoji": "🚗",
            "pronunciation": "/kənˈdʒestʃən/"
          },
          {
            "id": "r5_129_3",
            "word": "residential",
            "meaningVi": "thuộc khu dân cư",
            "category": "Urban",
            "emoji": "🏘️",
            "pronunciation": "/ˌrezɪˈdenʃl/"
          },
          {
            "id": "r5_129_4",
            "word": "civic",
            "meaningVi": "thuộc về đô thị dân sự",
            "category": "Urban",
            "emoji": "🏛️",
            "pronunciation": "/ˈsɪvɪk/"
          },
          {
            "id": "r5_129_1",
            "word": "infrastructure",
            "meaningVi": "cơ sở hạ tầng",
            "category": "Urban",
            "emoji": "🏗️",
            "pronunciation": "/ˈɪnfrəstrʌktʃər/"
          }
        ]
      },
      {
        "id": "lvl-129-4",
        "unitId": "unit-129",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 129",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 65,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-129-5",
        "unitId": "unit-129",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2735,
        "xpReward": 75,
        "gemReward": 15,
        "speedMultiplier": 1.18,
        "spawnInterval": 1355,
        "words": [
          {
            "id": "r5_129_1",
            "word": "infrastructure",
            "meaningVi": "cơ sở hạ tầng",
            "category": "Urban",
            "emoji": "🏗️",
            "pronunciation": "/ˈɪnfrəstrʌktʃər/"
          },
          {
            "id": "r5_129_2",
            "word": "congestion",
            "meaningVi": "tình trạng tắc nghẽn",
            "category": "Urban",
            "emoji": "🚗",
            "pronunciation": "/kənˈdʒestʃən/"
          },
          {
            "id": "r5_129_3",
            "word": "residential",
            "meaningVi": "thuộc khu dân cư",
            "category": "Urban",
            "emoji": "🏘️",
            "pronunciation": "/ˌrezɪˈdenʃl/"
          },
          {
            "id": "r5_129_4",
            "word": "civic",
            "meaningVi": "thuộc về đô thị dân sự",
            "category": "Urban",
            "emoji": "🏛️",
            "pronunciation": "/ˈsɪvɪk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-130",
    "unitNumber": 130,
    "title": "Media Literacy",
    "titleVi": "Đọc Hiểu Truyền Thông",
    "description": "Đánh giá tin tức thực tế, phân biệt thiên vị và độ tin cậy.",
    "icon": "📡",
    "themeColor": "#64748b",
    "bannerBg": "from-slate-600/30 via-zinc-600/20 to-neutral-700/30",
    "levels": [
      {
        "id": "lvl-130-1",
        "unitId": "unit-130",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📡",
        "bgColor": "#64748b",
        "targetScore": 1650,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.06,
        "spawnInterval": 1850,
        "words": [
          {
            "id": "r5_130_1",
            "word": "factual",
            "meaningVi": "dựa trên sự thật",
            "category": "Media",
            "emoji": "✅",
            "pronunciation": "/ˈfæktʃuəl/"
          },
          {
            "id": "r5_130_2",
            "word": "credible",
            "meaningVi": "đáng tin cậy",
            "category": "Media",
            "emoji": "🌟",
            "pronunciation": "/ˈkredəbl/"
          },
          {
            "id": "r5_130_3",
            "word": "bias",
            "meaningVi": "sự thiên vị góc nhìn",
            "category": "Media",
            "emoji": "⚖️",
            "pronunciation": "/ˈbaɪəs/"
          }
        ]
      },
      {
        "id": "lvl-130-2",
        "unitId": "unit-130",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1750,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.11,
        "spawnInterval": 1750,
        "words": [
          {
            "id": "r5_130_4",
            "word": "broadcast",
            "meaningVi": "phát sóng truyền thông",
            "category": "Media",
            "emoji": "📺",
            "pronunciation": "/ˈbrɔːdkɑːst/"
          }
        ]
      },
      {
        "id": "lvl-130-3",
        "unitId": "unit-130",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2160,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.16,
        "spawnInterval": 1550,
        "words": [
          {
            "id": "r5_130_2",
            "word": "credible",
            "meaningVi": "đáng tin cậy",
            "category": "Media",
            "emoji": "🌟",
            "pronunciation": "/ˈkredəbl/"
          },
          {
            "id": "r5_130_3",
            "word": "bias",
            "meaningVi": "sự thiên vị góc nhìn",
            "category": "Media",
            "emoji": "⚖️",
            "pronunciation": "/ˈbaɪəs/"
          },
          {
            "id": "r5_130_4",
            "word": "broadcast",
            "meaningVi": "phát sóng truyền thông",
            "category": "Media",
            "emoji": "📺",
            "pronunciation": "/ˈbrɔːdkɑːst/"
          },
          {
            "id": "r5_130_1",
            "word": "factual",
            "meaningVi": "dựa trên sự thật",
            "category": "Media",
            "emoji": "✅",
            "pronunciation": "/ˈfæktʃuəl/"
          }
        ]
      },
      {
        "id": "lvl-130-4",
        "unitId": "unit-130",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 130",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 66,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-130-5",
        "unitId": "unit-130",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2750,
        "xpReward": 76,
        "gemReward": 15,
        "speedMultiplier": 1.18,
        "spawnInterval": 1350,
        "words": [
          {
            "id": "r5_130_1",
            "word": "factual",
            "meaningVi": "dựa trên sự thật",
            "category": "Media",
            "emoji": "✅",
            "pronunciation": "/ˈfæktʃuəl/"
          },
          {
            "id": "r5_130_2",
            "word": "credible",
            "meaningVi": "đáng tin cậy",
            "category": "Media",
            "emoji": "🌟",
            "pronunciation": "/ˈkredəbl/"
          },
          {
            "id": "r5_130_3",
            "word": "bias",
            "meaningVi": "sự thiên vị góc nhìn",
            "category": "Media",
            "emoji": "⚖️",
            "pronunciation": "/ˈbaɪəs/"
          },
          {
            "id": "r5_130_4",
            "word": "broadcast",
            "meaningVi": "phát sóng truyền thông",
            "category": "Media",
            "emoji": "📺",
            "pronunciation": "/ˈbrɔːdkɑːst/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-131",
    "unitNumber": 131,
    "title": "Ethics & Justice",
    "titleVi": "Luật Pháp & Đạo Đức",
    "description": "Quy định pháp lý, công lý xã hội, quyền công dân và sự chính trực.",
    "icon": "⚖️",
    "themeColor": "#9333ea",
    "bannerBg": "from-purple-600/30 via-fuchsia-600/20 to-indigo-700/30",
    "levels": [
      {
        "id": "lvl-131-1",
        "unitId": "unit-131",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "⚖️",
        "bgColor": "#9333ea",
        "targetScore": 1660,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.07,
        "spawnInterval": 1845,
        "words": [
          {
            "id": "r5_131_1",
            "word": "regulation",
            "meaningVi": "quy định luật lệ",
            "category": "Law",
            "emoji": "📜",
            "pronunciation": "/ˌreɡjuˈleɪʃn/"
          },
          {
            "id": "r5_131_2",
            "word": "justice",
            "meaningVi": "công lý",
            "category": "Law",
            "emoji": "⚖️",
            "pronunciation": "/ˈdʒʌstɪs/"
          },
          {
            "id": "r5_131_3",
            "word": "citizen",
            "meaningVi": "công dân",
            "category": "Law",
            "emoji": "👥",
            "pronunciation": "/ˈsɪtɪzn/"
          }
        ]
      },
      {
        "id": "lvl-131-2",
        "unitId": "unit-131",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1760,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.12,
        "spawnInterval": 1745,
        "words": [
          {
            "id": "r5_131_4",
            "word": "integrity",
            "meaningVi": "tính chính trực liêm khiết",
            "category": "Law",
            "emoji": "🛡️",
            "pronunciation": "/ɪnˈteɡrəti/"
          }
        ]
      },
      {
        "id": "lvl-131-3",
        "unitId": "unit-131",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2172,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.17,
        "spawnInterval": 1545,
        "words": [
          {
            "id": "r5_131_2",
            "word": "justice",
            "meaningVi": "công lý",
            "category": "Law",
            "emoji": "⚖️",
            "pronunciation": "/ˈdʒʌstɪs/"
          },
          {
            "id": "r5_131_3",
            "word": "citizen",
            "meaningVi": "công dân",
            "category": "Law",
            "emoji": "👥",
            "pronunciation": "/ˈsɪtɪzn/"
          },
          {
            "id": "r5_131_4",
            "word": "integrity",
            "meaningVi": "tính chính trực liêm khiết",
            "category": "Law",
            "emoji": "🛡️",
            "pronunciation": "/ɪnˈteɡrəti/"
          },
          {
            "id": "r5_131_1",
            "word": "regulation",
            "meaningVi": "quy định luật lệ",
            "category": "Law",
            "emoji": "📜",
            "pronunciation": "/ˌreɡjuˈleɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-131-4",
        "unitId": "unit-131",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 131",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 66,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-131-5",
        "unitId": "unit-131",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2765,
        "xpReward": 76,
        "gemReward": 15,
        "speedMultiplier": 1.19,
        "spawnInterval": 1345,
        "words": [
          {
            "id": "r5_131_1",
            "word": "regulation",
            "meaningVi": "quy định luật lệ",
            "category": "Law",
            "emoji": "📜",
            "pronunciation": "/ˌreɡjuˈleɪʃn/"
          },
          {
            "id": "r5_131_2",
            "word": "justice",
            "meaningVi": "công lý",
            "category": "Law",
            "emoji": "⚖️",
            "pronunciation": "/ˈdʒʌstɪs/"
          },
          {
            "id": "r5_131_3",
            "word": "citizen",
            "meaningVi": "công dân",
            "category": "Law",
            "emoji": "👥",
            "pronunciation": "/ˈsɪtɪzn/"
          },
          {
            "id": "r5_131_4",
            "word": "integrity",
            "meaningVi": "tính chính trực liêm khiết",
            "category": "Law",
            "emoji": "🛡️",
            "pronunciation": "/ɪnˈteɡrəti/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-132",
    "unitNumber": 132,
    "title": "Cosmology & Black Holes",
    "titleVi": "Vũ Trụ Học & Hố Đen",
    "description": "Tinh vân rực rỡ, siêu tân tinh phát nổ và không thời gian.",
    "icon": "🌌",
    "themeColor": "#4f46e5",
    "bannerBg": "from-indigo-600/30 via-purple-600/20 to-slate-800/30",
    "levels": [
      {
        "id": "lvl-132-1",
        "unitId": "unit-132",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌌",
        "bgColor": "#4f46e5",
        "targetScore": 1670,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.07,
        "spawnInterval": 1840,
        "words": [
          {
            "id": "r5_132_1",
            "word": "nebula",
            "meaningVi": "tinh vân vũ trụ",
            "category": "Cosmos",
            "emoji": "🌌",
            "pronunciation": "/ˈnebjələ/"
          },
          {
            "id": "r5_132_2",
            "word": "singularity",
            "meaningVi": "điểm kỳ dị hố đen",
            "category": "Cosmos",
            "emoji": "🕳️",
            "pronunciation": "/ˌsɪŋɡjəˈlærəti/"
          },
          {
            "id": "r5_132_3",
            "word": "supernova",
            "meaningVi": "vụ nổ siêu tân tinh",
            "category": "Cosmos",
            "emoji": "💥",
            "pronunciation": "/ˌsuːpəˈnəʊvə/"
          }
        ]
      },
      {
        "id": "lvl-132-2",
        "unitId": "unit-132",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1770,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.12,
        "spawnInterval": 1740,
        "words": [
          {
            "id": "r5_132_4",
            "word": "spacetime",
            "meaningVi": "không-thời gian",
            "category": "Cosmos",
            "emoji": "🪐",
            "pronunciation": "/ˈspeɪstaɪm/"
          },
          {
            "id": "r5_132_5",
            "word": "radiation",
            "meaningVi": "bức xạ vũ trụ",
            "category": "Cosmos",
            "emoji": "☢️",
            "pronunciation": "/ˌreɪdiˈeɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-132-3",
        "unitId": "unit-132",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2184,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.17,
        "spawnInterval": 1540,
        "words": [
          {
            "id": "r5_132_2",
            "word": "singularity",
            "meaningVi": "điểm kỳ dị hố đen",
            "category": "Cosmos",
            "emoji": "🕳️",
            "pronunciation": "/ˌsɪŋɡjəˈlærəti/"
          },
          {
            "id": "r5_132_3",
            "word": "supernova",
            "meaningVi": "vụ nổ siêu tân tinh",
            "category": "Cosmos",
            "emoji": "💥",
            "pronunciation": "/ˌsuːpəˈnəʊvə/"
          },
          {
            "id": "r5_132_4",
            "word": "spacetime",
            "meaningVi": "không-thời gian",
            "category": "Cosmos",
            "emoji": "🪐",
            "pronunciation": "/ˈspeɪstaɪm/"
          },
          {
            "id": "r5_132_5",
            "word": "radiation",
            "meaningVi": "bức xạ vũ trụ",
            "category": "Cosmos",
            "emoji": "☢️",
            "pronunciation": "/ˌreɪdiˈeɪʃn/"
          },
          {
            "id": "r5_132_1",
            "word": "nebula",
            "meaningVi": "tinh vân vũ trụ",
            "category": "Cosmos",
            "emoji": "🌌",
            "pronunciation": "/ˈnebjələ/"
          }
        ]
      },
      {
        "id": "lvl-132-4",
        "unitId": "unit-132",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 132",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 66,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-132-5",
        "unitId": "unit-132",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2780,
        "xpReward": 76,
        "gemReward": 15,
        "speedMultiplier": 1.19,
        "spawnInterval": 1340,
        "words": [
          {
            "id": "r5_132_1",
            "word": "nebula",
            "meaningVi": "tinh vân vũ trụ",
            "category": "Cosmos",
            "emoji": "🌌",
            "pronunciation": "/ˈnebjələ/"
          },
          {
            "id": "r5_132_2",
            "word": "singularity",
            "meaningVi": "điểm kỳ dị hố đen",
            "category": "Cosmos",
            "emoji": "🕳️",
            "pronunciation": "/ˌsɪŋɡjəˈlærəti/"
          },
          {
            "id": "r5_132_3",
            "word": "supernova",
            "meaningVi": "vụ nổ siêu tân tinh",
            "category": "Cosmos",
            "emoji": "💥",
            "pronunciation": "/ˌsuːpəˈnəʊvə/"
          },
          {
            "id": "r5_132_4",
            "word": "spacetime",
            "meaningVi": "không-thời gian",
            "category": "Cosmos",
            "emoji": "🪐",
            "pronunciation": "/ˈspeɪstaɪm/"
          },
          {
            "id": "r5_132_5",
            "word": "radiation",
            "meaningVi": "bức xạ vũ trụ",
            "category": "Cosmos",
            "emoji": "☢️",
            "pronunciation": "/ˌreɪdiˈeɪʃn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-133",
    "unitNumber": 133,
    "title": "Humanitarian & Peace",
    "titleVi": "Bình Đẳng & Hòa Bình",
    "description": "Hòa hợp dân tộc, sự bao dung và hiệp ước liên minh.",
    "icon": "🕊️",
    "themeColor": "#0ea5e9",
    "bannerBg": "from-sky-500/30 via-cyan-500/20 to-teal-600/30",
    "levels": [
      {
        "id": "lvl-133-1",
        "unitId": "unit-133",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🕊️",
        "bgColor": "#0ea5e9",
        "targetScore": 1680,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.07,
        "spawnInterval": 1835,
        "words": [
          {
            "id": "r5_133_1",
            "word": "equality",
            "meaningVi": "sự bình đẳng",
            "category": "Peace",
            "emoji": "🤝",
            "pronunciation": "/iˈkwɒləti/"
          },
          {
            "id": "r5_133_2",
            "word": "harmony",
            "meaningVi": "sự hòa thuận hòa hợp",
            "category": "Peace",
            "emoji": "🕊️",
            "pronunciation": "/ˈhɑːməni/"
          },
          {
            "id": "r5_133_3",
            "word": "tolerance",
            "meaningVi": "lòng khoan dung",
            "category": "Peace",
            "emoji": "🤍",
            "pronunciation": "/ˈtɒlərəns/"
          }
        ]
      },
      {
        "id": "lvl-133-2",
        "unitId": "unit-133",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1780,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.12,
        "spawnInterval": 1735,
        "words": [
          {
            "id": "r5_133_4",
            "word": "alliance",
            "meaningVi": "khối liên minh",
            "category": "Peace",
            "emoji": "🌐",
            "pronunciation": "/əˈlaɪəns/"
          },
          {
            "id": "r5_133_5",
            "word": "treaty",
            "meaningVi": "hiệp ước hòa bình",
            "category": "Peace",
            "emoji": "📜",
            "pronunciation": "/ˈtriːti/"
          }
        ]
      },
      {
        "id": "lvl-133-3",
        "unitId": "unit-133",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2196,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.17,
        "spawnInterval": 1535,
        "words": [
          {
            "id": "r5_133_2",
            "word": "harmony",
            "meaningVi": "sự hòa thuận hòa hợp",
            "category": "Peace",
            "emoji": "🕊️",
            "pronunciation": "/ˈhɑːməni/"
          },
          {
            "id": "r5_133_3",
            "word": "tolerance",
            "meaningVi": "lòng khoan dung",
            "category": "Peace",
            "emoji": "🤍",
            "pronunciation": "/ˈtɒlərəns/"
          },
          {
            "id": "r5_133_4",
            "word": "alliance",
            "meaningVi": "khối liên minh",
            "category": "Peace",
            "emoji": "🌐",
            "pronunciation": "/əˈlaɪəns/"
          },
          {
            "id": "r5_133_5",
            "word": "treaty",
            "meaningVi": "hiệp ước hòa bình",
            "category": "Peace",
            "emoji": "📜",
            "pronunciation": "/ˈtriːti/"
          },
          {
            "id": "r5_133_1",
            "word": "equality",
            "meaningVi": "sự bình đẳng",
            "category": "Peace",
            "emoji": "🤝",
            "pronunciation": "/iˈkwɒləti/"
          }
        ]
      },
      {
        "id": "lvl-133-4",
        "unitId": "unit-133",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 133",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 66,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-133-5",
        "unitId": "unit-133",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2795,
        "xpReward": 76,
        "gemReward": 15,
        "speedMultiplier": 1.19,
        "spawnInterval": 1335,
        "words": [
          {
            "id": "r5_133_1",
            "word": "equality",
            "meaningVi": "sự bình đẳng",
            "category": "Peace",
            "emoji": "🤝",
            "pronunciation": "/iˈkwɒləti/"
          },
          {
            "id": "r5_133_2",
            "word": "harmony",
            "meaningVi": "sự hòa thuận hòa hợp",
            "category": "Peace",
            "emoji": "🕊️",
            "pronunciation": "/ˈhɑːməni/"
          },
          {
            "id": "r5_133_3",
            "word": "tolerance",
            "meaningVi": "lòng khoan dung",
            "category": "Peace",
            "emoji": "🤍",
            "pronunciation": "/ˈtɒlərəns/"
          },
          {
            "id": "r5_133_4",
            "word": "alliance",
            "meaningVi": "khối liên minh",
            "category": "Peace",
            "emoji": "🌐",
            "pronunciation": "/əˈlaɪəns/"
          },
          {
            "id": "r5_133_5",
            "word": "treaty",
            "meaningVi": "hiệp ước hòa bình",
            "category": "Peace",
            "emoji": "📜",
            "pronunciation": "/ˈtriːti/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-134",
    "unitNumber": 134,
    "title": "Intercultural Relations",
    "titleVi": "Giao Tiếp Đa Văn Hóa",
    "description": "Nghi thức xã giao, hòa nhập văn hóa và lòng hiếu khách.",
    "icon": "🤝",
    "themeColor": "#d97706",
    "bannerBg": "from-amber-600/30 via-orange-600/20 to-yellow-700/30",
    "levels": [
      {
        "id": "lvl-134-1",
        "unitId": "unit-134",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🤝",
        "bgColor": "#d97706",
        "targetScore": 1690,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.08,
        "spawnInterval": 1830,
        "words": [
          {
            "id": "r5_134_1",
            "word": "etiquette",
            "meaningVi": "nghi thức xã giao",
            "category": "Culture",
            "emoji": "🎩",
            "pronunciation": "/ˈetɪket/"
          },
          {
            "id": "r5_134_2",
            "word": "multicultural",
            "meaningVi": "đa văn hóa",
            "category": "Culture",
            "emoji": "🌍",
            "pronunciation": "/ˌmʌltiˈkʌltʃərəl/"
          },
          {
            "id": "r5_134_3",
            "word": "integration",
            "meaningVi": "sự hội nhập",
            "category": "Culture",
            "emoji": "🌐",
            "pronunciation": "/ˌɪntɪˈɡreɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-134-2",
        "unitId": "unit-134",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1790,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.13,
        "spawnInterval": 1730,
        "words": [
          {
            "id": "r5_134_4",
            "word": "diversity",
            "meaningVi": "sự đa dạng",
            "category": "Culture",
            "emoji": "🌈",
            "pronunciation": "/daɪˈvɜːsəti/"
          },
          {
            "id": "r5_134_5",
            "word": "hospitality",
            "meaningVi": "lòng hiếu khách",
            "category": "Culture",
            "emoji": "🍵",
            "pronunciation": "/ˌhɒspɪˈtæləti/"
          }
        ]
      },
      {
        "id": "lvl-134-3",
        "unitId": "unit-134",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2208,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.18,
        "spawnInterval": 1530,
        "words": [
          {
            "id": "r5_134_2",
            "word": "multicultural",
            "meaningVi": "đa văn hóa",
            "category": "Culture",
            "emoji": "🌍",
            "pronunciation": "/ˌmʌltiˈkʌltʃərəl/"
          },
          {
            "id": "r5_134_3",
            "word": "integration",
            "meaningVi": "sự hội nhập",
            "category": "Culture",
            "emoji": "🌐",
            "pronunciation": "/ˌɪntɪˈɡreɪʃn/"
          },
          {
            "id": "r5_134_4",
            "word": "diversity",
            "meaningVi": "sự đa dạng",
            "category": "Culture",
            "emoji": "🌈",
            "pronunciation": "/daɪˈvɜːsəti/"
          },
          {
            "id": "r5_134_5",
            "word": "hospitality",
            "meaningVi": "lòng hiếu khách",
            "category": "Culture",
            "emoji": "🍵",
            "pronunciation": "/ˌhɒspɪˈtæləti/"
          },
          {
            "id": "r5_134_1",
            "word": "etiquette",
            "meaningVi": "nghi thức xã giao",
            "category": "Culture",
            "emoji": "🎩",
            "pronunciation": "/ˈetɪket/"
          }
        ]
      },
      {
        "id": "lvl-134-4",
        "unitId": "unit-134",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 134",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 66,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-134-5",
        "unitId": "unit-134",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2810,
        "xpReward": 76,
        "gemReward": 15,
        "speedMultiplier": 1.2,
        "spawnInterval": 1330,
        "words": [
          {
            "id": "r5_134_1",
            "word": "etiquette",
            "meaningVi": "nghi thức xã giao",
            "category": "Culture",
            "emoji": "🎩",
            "pronunciation": "/ˈetɪket/"
          },
          {
            "id": "r5_134_2",
            "word": "multicultural",
            "meaningVi": "đa văn hóa",
            "category": "Culture",
            "emoji": "🌍",
            "pronunciation": "/ˌmʌltiˈkʌltʃərəl/"
          },
          {
            "id": "r5_134_3",
            "word": "integration",
            "meaningVi": "sự hội nhập",
            "category": "Culture",
            "emoji": "🌐",
            "pronunciation": "/ˌɪntɪˈɡreɪʃn/"
          },
          {
            "id": "r5_134_4",
            "word": "diversity",
            "meaningVi": "sự đa dạng",
            "category": "Culture",
            "emoji": "🌈",
            "pronunciation": "/daɪˈvɜːsəti/"
          },
          {
            "id": "r5_134_5",
            "word": "hospitality",
            "meaningVi": "lòng hiếu khách",
            "category": "Culture",
            "emoji": "🍵",
            "pronunciation": "/ˌhɒspɪˈtæləti/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-135",
    "unitNumber": 135,
    "title": "Environmental Science",
    "titleVi": "Khoa Học Môi Trường",
    "description": "Sinh quyển trái đất, chất phân hủy hữu cơ và ô nhiễm sinh thái.",
    "icon": "🌿",
    "themeColor": "#15803d",
    "bannerBg": "from-green-600/30 via-emerald-600/20 to-teal-700/30",
    "levels": [
      {
        "id": "lvl-135-1",
        "unitId": "unit-135",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌿",
        "bgColor": "#15803d",
        "targetScore": 1700,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.08,
        "spawnInterval": 1825,
        "words": [
          {
            "id": "r5_135_1",
            "word": "biosphere",
            "meaningVi": "sinh quyển",
            "category": "Ecology",
            "emoji": "🌍",
            "pronunciation": "/ˈbaɪəʊsfɪər/"
          },
          {
            "id": "r5_135_2",
            "word": "pollutant",
            "meaningVi": "chất gây ô nhiễm",
            "category": "Ecology",
            "emoji": "⚠️",
            "pronunciation": "/pəˈluːtənt/"
          },
          {
            "id": "r5_135_3",
            "word": "decompose",
            "meaningVi": "phân hủy tự nhiên",
            "category": "Ecology",
            "emoji": "🍂",
            "pronunciation": "/ˌdiːkəmˈpəʊz/"
          }
        ]
      },
      {
        "id": "lvl-135-2",
        "unitId": "unit-135",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1800,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.13,
        "spawnInterval": 1725,
        "words": [
          {
            "id": "r5_135_4",
            "word": "ecological",
            "meaningVi": "thuộc về sinh thái học",
            "category": "Ecology",
            "emoji": "🌱",
            "pronunciation": "/ˌiːkəˈlɒdʒɪkl/"
          }
        ]
      },
      {
        "id": "lvl-135-3",
        "unitId": "unit-135",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2220,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.18,
        "spawnInterval": 1525,
        "words": [
          {
            "id": "r5_135_2",
            "word": "pollutant",
            "meaningVi": "chất gây ô nhiễm",
            "category": "Ecology",
            "emoji": "⚠️",
            "pronunciation": "/pəˈluːtənt/"
          },
          {
            "id": "r5_135_3",
            "word": "decompose",
            "meaningVi": "phân hủy tự nhiên",
            "category": "Ecology",
            "emoji": "🍂",
            "pronunciation": "/ˌdiːkəmˈpəʊz/"
          },
          {
            "id": "r5_135_4",
            "word": "ecological",
            "meaningVi": "thuộc về sinh thái học",
            "category": "Ecology",
            "emoji": "🌱",
            "pronunciation": "/ˌiːkəˈlɒdʒɪkl/"
          },
          {
            "id": "r5_135_1",
            "word": "biosphere",
            "meaningVi": "sinh quyển",
            "category": "Ecology",
            "emoji": "🌍",
            "pronunciation": "/ˈbaɪəʊsfɪər/"
          }
        ]
      },
      {
        "id": "lvl-135-4",
        "unitId": "unit-135",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 135",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 67,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-135-5",
        "unitId": "unit-135",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2825,
        "xpReward": 77,
        "gemReward": 15,
        "speedMultiplier": 1.2,
        "spawnInterval": 1325,
        "words": [
          {
            "id": "r5_135_1",
            "word": "biosphere",
            "meaningVi": "sinh quyển",
            "category": "Ecology",
            "emoji": "🌍",
            "pronunciation": "/ˈbaɪəʊsfɪər/"
          },
          {
            "id": "r5_135_2",
            "word": "pollutant",
            "meaningVi": "chất gây ô nhiễm",
            "category": "Ecology",
            "emoji": "⚠️",
            "pronunciation": "/pəˈluːtənt/"
          },
          {
            "id": "r5_135_3",
            "word": "decompose",
            "meaningVi": "phân hủy tự nhiên",
            "category": "Ecology",
            "emoji": "🍂",
            "pronunciation": "/ˌdiːkəmˈpəʊz/"
          },
          {
            "id": "r5_135_4",
            "word": "ecological",
            "meaningVi": "thuộc về sinh thái học",
            "category": "Ecology",
            "emoji": "🌱",
            "pronunciation": "/ˌiːkəˈlɒdʒɪkl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-136",
    "unitNumber": 136,
    "title": "Renewable Energy Tech",
    "titleVi": "Năng Lượng Tái Tạo Tiên Tiến",
    "description": "Địa nhiệt lòng đất, tấm pin quang điện mặt trời và thủy điện.",
    "icon": "☀️",
    "themeColor": "#eab308",
    "bannerBg": "from-yellow-500/30 via-amber-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-136-1",
        "unitId": "unit-136",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "☀️",
        "bgColor": "#eab308",
        "targetScore": 1710,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.08,
        "spawnInterval": 1820,
        "words": [
          {
            "id": "r5_136_1",
            "word": "geothermal",
            "meaningVi": "năng lượng địa nhiệt",
            "category": "Energy",
            "emoji": "🌋",
            "pronunciation": "/ˌdʒiːəʊˈθɜːml/"
          },
          {
            "id": "r5_136_2",
            "word": "photovoltaic",
            "meaningVi": "quang điện mặt trời",
            "category": "Energy",
            "emoji": "☀️",
            "pronunciation": "/ˌfəʊtəʊvɒlˈteɪɪk/"
          },
          {
            "id": "r5_136_3",
            "word": "hydropower",
            "meaningVi": "thủy điện",
            "category": "Energy",
            "emoji": "🌊",
            "pronunciation": "/ˈhaɪdrəʊpaʊər/"
          }
        ]
      },
      {
        "id": "lvl-136-2",
        "unitId": "unit-136",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1810,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.13,
        "spawnInterval": 1720,
        "words": [
          {
            "id": "r5_136_4",
            "word": "sustainability",
            "meaningVi": "tính bền vững",
            "category": "Energy",
            "emoji": "♻️",
            "pronunciation": "/səˌsteɪnəˈbɪləti/"
          }
        ]
      },
      {
        "id": "lvl-136-3",
        "unitId": "unit-136",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2232,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.18,
        "spawnInterval": 1520,
        "words": [
          {
            "id": "r5_136_2",
            "word": "photovoltaic",
            "meaningVi": "quang điện mặt trời",
            "category": "Energy",
            "emoji": "☀️",
            "pronunciation": "/ˌfəʊtəʊvɒlˈteɪɪk/"
          },
          {
            "id": "r5_136_3",
            "word": "hydropower",
            "meaningVi": "thủy điện",
            "category": "Energy",
            "emoji": "🌊",
            "pronunciation": "/ˈhaɪdrəʊpaʊər/"
          },
          {
            "id": "r5_136_4",
            "word": "sustainability",
            "meaningVi": "tính bền vững",
            "category": "Energy",
            "emoji": "♻️",
            "pronunciation": "/səˌsteɪnəˈbɪləti/"
          },
          {
            "id": "r5_136_1",
            "word": "geothermal",
            "meaningVi": "năng lượng địa nhiệt",
            "category": "Energy",
            "emoji": "🌋",
            "pronunciation": "/ˌdʒiːəʊˈθɜːml/"
          }
        ]
      },
      {
        "id": "lvl-136-4",
        "unitId": "unit-136",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 136",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 67,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-136-5",
        "unitId": "unit-136",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2840,
        "xpReward": 77,
        "gemReward": 15,
        "speedMultiplier": 1.2,
        "spawnInterval": 1320,
        "words": [
          {
            "id": "r5_136_1",
            "word": "geothermal",
            "meaningVi": "năng lượng địa nhiệt",
            "category": "Energy",
            "emoji": "🌋",
            "pronunciation": "/ˌdʒiːəʊˈθɜːml/"
          },
          {
            "id": "r5_136_2",
            "word": "photovoltaic",
            "meaningVi": "quang điện mặt trời",
            "category": "Energy",
            "emoji": "☀️",
            "pronunciation": "/ˌfəʊtəʊvɒlˈteɪɪk/"
          },
          {
            "id": "r5_136_3",
            "word": "hydropower",
            "meaningVi": "thủy điện",
            "category": "Energy",
            "emoji": "🌊",
            "pronunciation": "/ˈhaɪdrəʊpaʊər/"
          },
          {
            "id": "r5_136_4",
            "word": "sustainability",
            "meaningVi": "tính bền vững",
            "category": "Energy",
            "emoji": "♻️",
            "pronunciation": "/səˌsteɪnəˈbɪləti/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-137",
    "unitNumber": 137,
    "title": "Personal Finance",
    "titleVi": "Kinh Tế Hộ Gia Đình",
    "description": "Lập ngân sách chi tiêu, đầu tư sinh lời và tiền tệ giao dịch.",
    "icon": "💰",
    "themeColor": "#16a34a",
    "bannerBg": "from-green-600/30 via-emerald-600/20 to-teal-700/30",
    "levels": [
      {
        "id": "lvl-137-1",
        "unitId": "unit-137",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "💰",
        "bgColor": "#16a34a",
        "targetScore": 1720,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.09,
        "spawnInterval": 1815,
        "words": [
          {
            "id": "r5_137_1",
            "word": "expenditure",
            "meaningVi": "khoản chi tiêu",
            "category": "Finance",
            "emoji": "💸",
            "pronunciation": "/ɪkˈspendɪtʃər/"
          },
          {
            "id": "r5_137_2",
            "word": "investment",
            "meaningVi": "khoản đầu tư",
            "category": "Finance",
            "emoji": "📈",
            "pronunciation": "/ɪnˈvestmənt/"
          },
          {
            "id": "r5_137_3",
            "word": "currency",
            "meaningVi": "đồng tiền tệ",
            "category": "Finance",
            "emoji": "💱",
            "pronunciation": "/ˈkʌrənsi/"
          }
        ]
      },
      {
        "id": "lvl-137-2",
        "unitId": "unit-137",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1820,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.14,
        "spawnInterval": 1715,
        "words": [
          {
            "id": "r5_137_4",
            "word": "savings",
            "meaningVi": "tiền tiết kiệm",
            "category": "Finance",
            "emoji": "🐖",
            "pronunciation": "/ˈseɪvɪŋz/"
          }
        ]
      },
      {
        "id": "lvl-137-3",
        "unitId": "unit-137",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2244,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.19,
        "spawnInterval": 1515,
        "words": [
          {
            "id": "r5_137_2",
            "word": "investment",
            "meaningVi": "khoản đầu tư",
            "category": "Finance",
            "emoji": "📈",
            "pronunciation": "/ɪnˈvestmənt/"
          },
          {
            "id": "r5_137_3",
            "word": "currency",
            "meaningVi": "đồng tiền tệ",
            "category": "Finance",
            "emoji": "💱",
            "pronunciation": "/ˈkʌrənsi/"
          },
          {
            "id": "r5_137_4",
            "word": "savings",
            "meaningVi": "tiền tiết kiệm",
            "category": "Finance",
            "emoji": "🐖",
            "pronunciation": "/ˈseɪvɪŋz/"
          },
          {
            "id": "r5_137_1",
            "word": "expenditure",
            "meaningVi": "khoản chi tiêu",
            "category": "Finance",
            "emoji": "💸",
            "pronunciation": "/ɪkˈspendɪtʃər/"
          }
        ]
      },
      {
        "id": "lvl-137-4",
        "unitId": "unit-137",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 137",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 67,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-137-5",
        "unitId": "unit-137",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2855,
        "xpReward": 77,
        "gemReward": 15,
        "speedMultiplier": 1.21,
        "spawnInterval": 1315,
        "words": [
          {
            "id": "r5_137_1",
            "word": "expenditure",
            "meaningVi": "khoản chi tiêu",
            "category": "Finance",
            "emoji": "💸",
            "pronunciation": "/ɪkˈspendɪtʃər/"
          },
          {
            "id": "r5_137_2",
            "word": "investment",
            "meaningVi": "khoản đầu tư",
            "category": "Finance",
            "emoji": "📈",
            "pronunciation": "/ɪnˈvestmənt/"
          },
          {
            "id": "r5_137_3",
            "word": "currency",
            "meaningVi": "đồng tiền tệ",
            "category": "Finance",
            "emoji": "💱",
            "pronunciation": "/ˈkʌrənsi/"
          },
          {
            "id": "r5_137_4",
            "word": "savings",
            "meaningVi": "tiền tiết kiệm",
            "category": "Finance",
            "emoji": "🐖",
            "pronunciation": "/ˈseɪvɪŋz/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-138",
    "unitNumber": 138,
    "title": "Literary Genres",
    "titleVi": "Văn Học & Nghệ Thuật Ngôn Từ",
    "description": "Cốt truyện trần thuật, nhân vật chính và phép ẩn dụ nghệ thuật.",
    "icon": "📖",
    "themeColor": "#7c3aed",
    "bannerBg": "from-purple-600/30 via-violet-600/20 to-indigo-700/30",
    "levels": [
      {
        "id": "lvl-138-1",
        "unitId": "unit-138",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📖",
        "bgColor": "#7c3aed",
        "targetScore": 1730,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.09,
        "spawnInterval": 1810,
        "words": [
          {
            "id": "r5_138_1",
            "word": "narrative",
            "meaningVi": "bài trần thuật / câu chuyện",
            "category": "Literature",
            "emoji": "📖",
            "pronunciation": "/ˈnærətɪv/"
          },
          {
            "id": "r5_138_2",
            "word": "protagonist",
            "meaningVi": "nhân vật chính",
            "category": "Literature",
            "emoji": "🦸",
            "pronunciation": "/prəˈtæɡənɪst/"
          },
          {
            "id": "r5_138_3",
            "word": "metaphor",
            "meaningVi": "phép ẩn dụ",
            "category": "Literature",
            "emoji": "🎭",
            "pronunciation": "/ˈmetəfər/"
          }
        ]
      },
      {
        "id": "lvl-138-2",
        "unitId": "unit-138",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1830,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.14,
        "spawnInterval": 1710,
        "words": [
          {
            "id": "r5_138_4",
            "word": "anthology",
            "meaningVi": "tuyển tập tác phẩm",
            "category": "Literature",
            "emoji": "📚",
            "pronunciation": "/ænˈθɒlədʒi/"
          }
        ]
      },
      {
        "id": "lvl-138-3",
        "unitId": "unit-138",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2256,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.19,
        "spawnInterval": 1510,
        "words": [
          {
            "id": "r5_138_2",
            "word": "protagonist",
            "meaningVi": "nhân vật chính",
            "category": "Literature",
            "emoji": "🦸",
            "pronunciation": "/prəˈtæɡənɪst/"
          },
          {
            "id": "r5_138_3",
            "word": "metaphor",
            "meaningVi": "phép ẩn dụ",
            "category": "Literature",
            "emoji": "🎭",
            "pronunciation": "/ˈmetəfər/"
          },
          {
            "id": "r5_138_4",
            "word": "anthology",
            "meaningVi": "tuyển tập tác phẩm",
            "category": "Literature",
            "emoji": "📚",
            "pronunciation": "/ænˈθɒlədʒi/"
          },
          {
            "id": "r5_138_1",
            "word": "narrative",
            "meaningVi": "bài trần thuật / câu chuyện",
            "category": "Literature",
            "emoji": "📖",
            "pronunciation": "/ˈnærətɪv/"
          }
        ]
      },
      {
        "id": "lvl-138-4",
        "unitId": "unit-138",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 138",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 67,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-138-5",
        "unitId": "unit-138",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2870,
        "xpReward": 77,
        "gemReward": 15,
        "speedMultiplier": 1.21,
        "spawnInterval": 1310,
        "words": [
          {
            "id": "r5_138_1",
            "word": "narrative",
            "meaningVi": "bài trần thuật / câu chuyện",
            "category": "Literature",
            "emoji": "📖",
            "pronunciation": "/ˈnærətɪv/"
          },
          {
            "id": "r5_138_2",
            "word": "protagonist",
            "meaningVi": "nhân vật chính",
            "category": "Literature",
            "emoji": "🦸",
            "pronunciation": "/prəˈtæɡənɪst/"
          },
          {
            "id": "r5_138_3",
            "word": "metaphor",
            "meaningVi": "phép ẩn dụ",
            "category": "Literature",
            "emoji": "🎭",
            "pronunciation": "/ˈmetəfər/"
          },
          {
            "id": "r5_138_4",
            "word": "anthology",
            "meaningVi": "tuyển tập tác phẩm",
            "category": "Literature",
            "emoji": "📚",
            "pronunciation": "/ænˈθɒlədʒi/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-139",
    "unitNumber": 139,
    "title": "Mental Well-being",
    "titleVi": "Sức Khỏe Tinh Thần",
    "description": "Thực hành chánh niệm, bình an tâm hồn và vượt qua khó khăn.",
    "icon": "🧘",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-500/30 via-teal-500/20 to-sky-600/30",
    "levels": [
      {
        "id": "lvl-139-1",
        "unitId": "unit-139",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧘",
        "bgColor": "#06b6d4",
        "targetScore": 1740,
        "xpReward": 33,
        "gemReward": 5,
        "speedMultiplier": 1.09,
        "spawnInterval": 1805,
        "words": [
          {
            "id": "r5_139_1",
            "word": "mindfulness",
            "meaningVi": "sự chánh niệm tĩnh thức",
            "category": "Mind",
            "emoji": "🧘",
            "pronunciation": "/ˈmaɪndflnəs/"
          },
          {
            "id": "r5_139_2",
            "word": "meditation",
            "meaningVi": "ngồi thiền",
            "category": "Mind",
            "emoji": "🕯️",
            "pronunciation": "/ˌmedɪˈteɪʃn/"
          },
          {
            "id": "r5_139_3",
            "word": "tranquil",
            "meaningVi": "yên ả thanh bình",
            "category": "Mind",
            "emoji": "🌊",
            "pronunciation": "/ˈtræŋkwɪl/"
          }
        ]
      },
      {
        "id": "lvl-139-2",
        "unitId": "unit-139",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1840,
        "xpReward": 38,
        "gemReward": 6,
        "speedMultiplier": 1.14,
        "spawnInterval": 1705,
        "words": [
          {
            "id": "r5_139_4",
            "word": "wellness",
            "meaningVi": "sức khỏe toàn diện",
            "category": "Mind",
            "emoji": "✨",
            "pronunciation": "/ˈwelnəs/"
          }
        ]
      },
      {
        "id": "lvl-139-3",
        "unitId": "unit-139",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2268,
        "xpReward": 43,
        "gemReward": 8,
        "speedMultiplier": 1.19,
        "spawnInterval": 1505,
        "words": [
          {
            "id": "r5_139_2",
            "word": "meditation",
            "meaningVi": "ngồi thiền",
            "category": "Mind",
            "emoji": "🕯️",
            "pronunciation": "/ˌmedɪˈteɪʃn/"
          },
          {
            "id": "r5_139_3",
            "word": "tranquil",
            "meaningVi": "yên ả thanh bình",
            "category": "Mind",
            "emoji": "🌊",
            "pronunciation": "/ˈtræŋkwɪl/"
          },
          {
            "id": "r5_139_4",
            "word": "wellness",
            "meaningVi": "sức khỏe toàn diện",
            "category": "Mind",
            "emoji": "✨",
            "pronunciation": "/ˈwelnəs/"
          },
          {
            "id": "r5_139_1",
            "word": "mindfulness",
            "meaningVi": "sự chánh niệm tĩnh thức",
            "category": "Mind",
            "emoji": "🧘",
            "pronunciation": "/ˈmaɪndflnəs/"
          }
        ]
      },
      {
        "id": "lvl-139-4",
        "unitId": "unit-139",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 139",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 67,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-139-5",
        "unitId": "unit-139",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2885,
        "xpReward": 77,
        "gemReward": 15,
        "speedMultiplier": 1.21,
        "spawnInterval": 1305,
        "words": [
          {
            "id": "r5_139_1",
            "word": "mindfulness",
            "meaningVi": "sự chánh niệm tĩnh thức",
            "category": "Mind",
            "emoji": "🧘",
            "pronunciation": "/ˈmaɪndflnəs/"
          },
          {
            "id": "r5_139_2",
            "word": "meditation",
            "meaningVi": "ngồi thiền",
            "category": "Mind",
            "emoji": "🕯️",
            "pronunciation": "/ˌmedɪˈteɪʃn/"
          },
          {
            "id": "r5_139_3",
            "word": "tranquil",
            "meaningVi": "yên ả thanh bình",
            "category": "Mind",
            "emoji": "🌊",
            "pronunciation": "/ˈtræŋkwɪl/"
          },
          {
            "id": "r5_139_4",
            "word": "wellness",
            "meaningVi": "sức khỏe toàn diện",
            "category": "Mind",
            "emoji": "✨",
            "pronunciation": "/ˈwelnəs/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-140",
    "unitNumber": 140,
    "title": "Robotics & Actuators",
    "titleVi": "Robot & Cơ Điện Tử",
    "description": "Bộ truyền động, cảm ứng điện từ và cơ cấu khí nén.",
    "icon": "🤖",
    "themeColor": "#475569",
    "bannerBg": "from-slate-600/30 via-zinc-600/20 to-neutral-700/30",
    "levels": [
      {
        "id": "lvl-140-1",
        "unitId": "unit-140",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🤖",
        "bgColor": "#475569",
        "targetScore": 1750,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.1,
        "spawnInterval": 1800,
        "words": [
          {
            "id": "r5_140_1",
            "word": "actuator",
            "meaningVi": "bộ truyền động",
            "category": "Robotics",
            "emoji": "⚙️",
            "pronunciation": "/ˈæktʃueɪtər/"
          },
          {
            "id": "r5_140_2",
            "word": "cybernetic",
            "meaningVi": "thuộc điều khiển học",
            "category": "Robotics",
            "emoji": "🦾",
            "pronunciation": "/ˌsaɪbəˈnetɪk/"
          },
          {
            "id": "r5_140_3",
            "word": "mechanism",
            "meaningVi": "cơ cấu máy móc",
            "category": "Robotics",
            "emoji": "🔩",
            "pronunciation": "/ˈmekənɪzəm/"
          }
        ]
      },
      {
        "id": "lvl-140-2",
        "unitId": "unit-140",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1850,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.15,
        "spawnInterval": 1700,
        "words": [
          {
            "id": "r5_140_4",
            "word": "pneumatic",
            "meaningVi": "chạy bằng khí nén",
            "category": "Robotics",
            "emoji": "💨",
            "pronunciation": "/njuːˈmætɪk/"
          }
        ]
      },
      {
        "id": "lvl-140-3",
        "unitId": "unit-140",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2280,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.2,
        "spawnInterval": 1500,
        "words": [
          {
            "id": "r5_140_2",
            "word": "cybernetic",
            "meaningVi": "thuộc điều khiển học",
            "category": "Robotics",
            "emoji": "🦾",
            "pronunciation": "/ˌsaɪbəˈnetɪk/"
          },
          {
            "id": "r5_140_3",
            "word": "mechanism",
            "meaningVi": "cơ cấu máy móc",
            "category": "Robotics",
            "emoji": "🔩",
            "pronunciation": "/ˈmekənɪzəm/"
          },
          {
            "id": "r5_140_4",
            "word": "pneumatic",
            "meaningVi": "chạy bằng khí nén",
            "category": "Robotics",
            "emoji": "💨",
            "pronunciation": "/njuːˈmætɪk/"
          },
          {
            "id": "r5_140_1",
            "word": "actuator",
            "meaningVi": "bộ truyền động",
            "category": "Robotics",
            "emoji": "⚙️",
            "pronunciation": "/ˈæktʃueɪtər/"
          }
        ]
      },
      {
        "id": "lvl-140-4",
        "unitId": "unit-140",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 140",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 68,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-140-5",
        "unitId": "unit-140",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2900,
        "xpReward": 78,
        "gemReward": 15,
        "speedMultiplier": 1.22,
        "spawnInterval": 1300,
        "words": [
          {
            "id": "r5_140_1",
            "word": "actuator",
            "meaningVi": "bộ truyền động",
            "category": "Robotics",
            "emoji": "⚙️",
            "pronunciation": "/ˈæktʃueɪtər/"
          },
          {
            "id": "r5_140_2",
            "word": "cybernetic",
            "meaningVi": "thuộc điều khiển học",
            "category": "Robotics",
            "emoji": "🦾",
            "pronunciation": "/ˌsaɪbəˈnetɪk/"
          },
          {
            "id": "r5_140_3",
            "word": "mechanism",
            "meaningVi": "cơ cấu máy móc",
            "category": "Robotics",
            "emoji": "🔩",
            "pronunciation": "/ˈmekənɪzəm/"
          },
          {
            "id": "r5_140_4",
            "word": "pneumatic",
            "meaningVi": "chạy bằng khí nén",
            "category": "Robotics",
            "emoji": "💨",
            "pronunciation": "/njuːˈmætɪk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-141",
    "unitNumber": 141,
    "title": "Deep Oceanic Research",
    "titleVi": "Thám Hiểm Rãnh Biển Sâu",
    "description": "Tàu ngầm lặn sâu, rãnh đại dương và miệng thủy nhiệt.",
    "icon": "🌊",
    "themeColor": "#0284c7",
    "bannerBg": "from-sky-600/30 via-blue-600/20 to-indigo-700/30",
    "levels": [
      {
        "id": "lvl-141-1",
        "unitId": "unit-141",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌊",
        "bgColor": "#0284c7",
        "targetScore": 1760,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.1,
        "spawnInterval": 1795,
        "words": [
          {
            "id": "r5_141_1",
            "word": "submarine",
            "meaningVi": "tàu ngầm",
            "category": "Ocean",
            "emoji": "🛥️",
            "pronunciation": "/ˌsʌbməˈriːn/"
          },
          {
            "id": "r5_141_2",
            "word": "abyssal",
            "meaningVi": "thuộc vực thẳm biển sâu",
            "category": "Ocean",
            "emoji": "🕳️",
            "pronunciation": "/əˈbɪsl/"
          },
          {
            "id": "r5_141_3",
            "word": "trench",
            "meaningVi": "rãnh đáy biển",
            "category": "Ocean",
            "emoji": "🌊",
            "pronunciation": "/trentʃ/"
          }
        ]
      },
      {
        "id": "lvl-141-2",
        "unitId": "unit-141",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1860,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.15,
        "spawnInterval": 1695,
        "words": [
          {
            "id": "r5_141_4",
            "word": "submersible",
            "meaningVi": "thiết bị lặn chuyên dụng",
            "category": "Ocean",
            "emoji": "🤿",
            "pronunciation": "/səbˈmɜːsəbl/"
          }
        ]
      },
      {
        "id": "lvl-141-3",
        "unitId": "unit-141",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2292,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.2,
        "spawnInterval": 1495,
        "words": [
          {
            "id": "r5_141_2",
            "word": "abyssal",
            "meaningVi": "thuộc vực thẳm biển sâu",
            "category": "Ocean",
            "emoji": "🕳️",
            "pronunciation": "/əˈbɪsl/"
          },
          {
            "id": "r5_141_3",
            "word": "trench",
            "meaningVi": "rãnh đáy biển",
            "category": "Ocean",
            "emoji": "🌊",
            "pronunciation": "/trentʃ/"
          },
          {
            "id": "r5_141_4",
            "word": "submersible",
            "meaningVi": "thiết bị lặn chuyên dụng",
            "category": "Ocean",
            "emoji": "🤿",
            "pronunciation": "/səbˈmɜːsəbl/"
          },
          {
            "id": "r5_141_1",
            "word": "submarine",
            "meaningVi": "tàu ngầm",
            "category": "Ocean",
            "emoji": "🛥️",
            "pronunciation": "/ˌsʌbməˈriːn/"
          }
        ]
      },
      {
        "id": "lvl-141-4",
        "unitId": "unit-141",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 141",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 68,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-141-5",
        "unitId": "unit-141",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2915,
        "xpReward": 78,
        "gemReward": 15,
        "speedMultiplier": 1.22,
        "spawnInterval": 1295,
        "words": [
          {
            "id": "r5_141_1",
            "word": "submarine",
            "meaningVi": "tàu ngầm",
            "category": "Ocean",
            "emoji": "🛥️",
            "pronunciation": "/ˌsʌbməˈriːn/"
          },
          {
            "id": "r5_141_2",
            "word": "abyssal",
            "meaningVi": "thuộc vực thẳm biển sâu",
            "category": "Ocean",
            "emoji": "🕳️",
            "pronunciation": "/əˈbɪsl/"
          },
          {
            "id": "r5_141_3",
            "word": "trench",
            "meaningVi": "rãnh đáy biển",
            "category": "Ocean",
            "emoji": "🌊",
            "pronunciation": "/trentʃ/"
          },
          {
            "id": "r5_141_4",
            "word": "submersible",
            "meaningVi": "thiết bị lặn chuyên dụng",
            "category": "Ocean",
            "emoji": "🤿",
            "pronunciation": "/səbˈmɜːsəbl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-142",
    "unitNumber": 142,
    "title": "Medical Breakthroughs",
    "titleVi": "Y Học Hiện Đại",
    "description": "Chẩn đoán bệnh, kháng sinh diệt khuẩn và phẫu thuật nội soi.",
    "icon": "🩺",
    "themeColor": "#ef4444",
    "bannerBg": "from-red-600/30 via-rose-600/20 to-amber-700/30",
    "levels": [
      {
        "id": "lvl-142-1",
        "unitId": "unit-142",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🩺",
        "bgColor": "#ef4444",
        "targetScore": 1770,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.1,
        "spawnInterval": 1790,
        "words": [
          {
            "id": "r5_142_1",
            "word": "diagnosis",
            "meaningVi": "chẩn đoán bệnh",
            "category": "Medical",
            "emoji": "🩺",
            "pronunciation": "/ˌdaɪəɡˈnəʊsɪs/"
          },
          {
            "id": "r5_142_2",
            "word": "antibiotic",
            "meaningVi": "thuốc kháng sinh",
            "category": "Medical",
            "emoji": "💊",
            "pronunciation": "/ˌæntibaɪˈɒtɪk/"
          },
          {
            "id": "r5_142_3",
            "word": "antibody",
            "meaningVi": "kháng thể miễn dịch",
            "category": "Medical",
            "emoji": "🛡️",
            "pronunciation": "/ˈæntibɒdi/"
          }
        ]
      },
      {
        "id": "lvl-142-2",
        "unitId": "unit-142",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1870,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.15,
        "spawnInterval": 1690,
        "words": [
          {
            "id": "r5_142_4",
            "word": "surgery",
            "meaningVi": "ca phẫu thuật",
            "category": "Medical",
            "emoji": "🏥",
            "pronunciation": "/ˈsɜːdʒəri/"
          },
          {
            "id": "r5_142_5",
            "word": "rehabilitation",
            "meaningVi": "phục hồi chức năng",
            "category": "Medical",
            "emoji": "🚶",
            "pronunciation": "/ˌriːəˌbɪlɪˈteɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-142-3",
        "unitId": "unit-142",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2304,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.2,
        "spawnInterval": 1490,
        "words": [
          {
            "id": "r5_142_2",
            "word": "antibiotic",
            "meaningVi": "thuốc kháng sinh",
            "category": "Medical",
            "emoji": "💊",
            "pronunciation": "/ˌæntibaɪˈɒtɪk/"
          },
          {
            "id": "r5_142_3",
            "word": "antibody",
            "meaningVi": "kháng thể miễn dịch",
            "category": "Medical",
            "emoji": "🛡️",
            "pronunciation": "/ˈæntibɒdi/"
          },
          {
            "id": "r5_142_4",
            "word": "surgery",
            "meaningVi": "ca phẫu thuật",
            "category": "Medical",
            "emoji": "🏥",
            "pronunciation": "/ˈsɜːdʒəri/"
          },
          {
            "id": "r5_142_5",
            "word": "rehabilitation",
            "meaningVi": "phục hồi chức năng",
            "category": "Medical",
            "emoji": "🚶",
            "pronunciation": "/ˌriːəˌbɪlɪˈteɪʃn/"
          },
          {
            "id": "r5_142_1",
            "word": "diagnosis",
            "meaningVi": "chẩn đoán bệnh",
            "category": "Medical",
            "emoji": "🩺",
            "pronunciation": "/ˌdaɪəɡˈnəʊsɪs/"
          }
        ]
      },
      {
        "id": "lvl-142-4",
        "unitId": "unit-142",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 142",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 68,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-142-5",
        "unitId": "unit-142",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2930,
        "xpReward": 78,
        "gemReward": 15,
        "speedMultiplier": 1.22,
        "spawnInterval": 1290,
        "words": [
          {
            "id": "r5_142_1",
            "word": "diagnosis",
            "meaningVi": "chẩn đoán bệnh",
            "category": "Medical",
            "emoji": "🩺",
            "pronunciation": "/ˌdaɪəɡˈnəʊsɪs/"
          },
          {
            "id": "r5_142_2",
            "word": "antibiotic",
            "meaningVi": "thuốc kháng sinh",
            "category": "Medical",
            "emoji": "💊",
            "pronunciation": "/ˌæntibaɪˈɒtɪk/"
          },
          {
            "id": "r5_142_3",
            "word": "antibody",
            "meaningVi": "kháng thể miễn dịch",
            "category": "Medical",
            "emoji": "🛡️",
            "pronunciation": "/ˈæntibɒdi/"
          },
          {
            "id": "r5_142_4",
            "word": "surgery",
            "meaningVi": "ca phẫu thuật",
            "category": "Medical",
            "emoji": "🏥",
            "pronunciation": "/ˈsɜːdʒəri/"
          },
          {
            "id": "r5_142_5",
            "word": "rehabilitation",
            "meaningVi": "phục hồi chức năng",
            "category": "Medical",
            "emoji": "🚶",
            "pronunciation": "/ˌriːəˌbɪlɪˈteɪʃn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-143",
    "unitNumber": 143,
    "title": "Rhetoric & Debate",
    "titleVi": "Nghệ Thuật Hùng Biện",
    "description": "Lập luận sắc bén, luận điểm phản biện và nhà hùng biện tài ba.",
    "icon": "🎙️",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-600/30 via-yellow-600/20 to-orange-700/30",
    "levels": [
      {
        "id": "lvl-143-1",
        "unitId": "unit-143",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎙️",
        "bgColor": "#f59e0b",
        "targetScore": 1780,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.11,
        "spawnInterval": 1785,
        "words": [
          {
            "id": "r5_143_1",
            "word": "argument",
            "meaningVi": "lập luận tranh luận",
            "category": "Debate",
            "emoji": "🗣️",
            "pronunciation": "/ˈɑːɡjumənt/"
          },
          {
            "id": "r5_143_2",
            "word": "persuasion",
            "meaningVi": "sự thuyết phục",
            "category": "Debate",
            "emoji": "🤝",
            "pronunciation": "/pəˈsweɪʒn/"
          },
          {
            "id": "r5_143_3",
            "word": "counterpoint",
            "meaningVi": "luận điểm phản bác",
            "category": "Debate",
            "emoji": "⚡",
            "pronunciation": "/ˈkaʊntəpɔɪnt/"
          }
        ]
      },
      {
        "id": "lvl-143-2",
        "unitId": "unit-143",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1880,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.16,
        "spawnInterval": 1685,
        "words": [
          {
            "id": "r5_143_4",
            "word": "orator",
            "meaningVi": "nhà diễn thuyết tài ba",
            "category": "Debate",
            "emoji": "🎙️",
            "pronunciation": "/ˈɒrətər/"
          }
        ]
      },
      {
        "id": "lvl-143-3",
        "unitId": "unit-143",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2316,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.21,
        "spawnInterval": 1485,
        "words": [
          {
            "id": "r5_143_2",
            "word": "persuasion",
            "meaningVi": "sự thuyết phục",
            "category": "Debate",
            "emoji": "🤝",
            "pronunciation": "/pəˈsweɪʒn/"
          },
          {
            "id": "r5_143_3",
            "word": "counterpoint",
            "meaningVi": "luận điểm phản bác",
            "category": "Debate",
            "emoji": "⚡",
            "pronunciation": "/ˈkaʊntəpɔɪnt/"
          },
          {
            "id": "r5_143_4",
            "word": "orator",
            "meaningVi": "nhà diễn thuyết tài ba",
            "category": "Debate",
            "emoji": "🎙️",
            "pronunciation": "/ˈɒrətər/"
          },
          {
            "id": "r5_143_1",
            "word": "argument",
            "meaningVi": "lập luận tranh luận",
            "category": "Debate",
            "emoji": "🗣️",
            "pronunciation": "/ˈɑːɡjumənt/"
          }
        ]
      },
      {
        "id": "lvl-143-4",
        "unitId": "unit-143",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 143",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 68,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-143-5",
        "unitId": "unit-143",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2945,
        "xpReward": 78,
        "gemReward": 15,
        "speedMultiplier": 1.23,
        "spawnInterval": 1285,
        "words": [
          {
            "id": "r5_143_1",
            "word": "argument",
            "meaningVi": "lập luận tranh luận",
            "category": "Debate",
            "emoji": "🗣️",
            "pronunciation": "/ˈɑːɡjumənt/"
          },
          {
            "id": "r5_143_2",
            "word": "persuasion",
            "meaningVi": "sự thuyết phục",
            "category": "Debate",
            "emoji": "🤝",
            "pronunciation": "/pəˈsweɪʒn/"
          },
          {
            "id": "r5_143_3",
            "word": "counterpoint",
            "meaningVi": "luận điểm phản bác",
            "category": "Debate",
            "emoji": "⚡",
            "pronunciation": "/ˈkaʊntəpɔɪnt/"
          },
          {
            "id": "r5_143_4",
            "word": "orator",
            "meaningVi": "nhà diễn thuyết tài ba",
            "category": "Debate",
            "emoji": "🎙️",
            "pronunciation": "/ˈɒrətər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-144",
    "unitNumber": 144,
    "title": "Historical Eras",
    "titleVi": "Lịch Sử & Thời Kỳ",
    "description": "Thời Trung cổ, thời kỳ Phục hưng và cuộc Cách mạng Công nghiệp.",
    "icon": "📜",
    "themeColor": "#b45309",
    "bannerBg": "from-amber-700/30 via-yellow-700/20 to-orange-800/30",
    "levels": [
      {
        "id": "lvl-144-1",
        "unitId": "unit-144",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📜",
        "bgColor": "#b45309",
        "targetScore": 1790,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.11,
        "spawnInterval": 1780,
        "words": [
          {
            "id": "r5_144_1",
            "word": "medieval",
            "meaningVi": "thời kỳ Trung Cổ",
            "category": "History",
            "emoji": "🏰",
            "pronunciation": "/ˌmediˈiːvl/"
          },
          {
            "id": "r5_144_2",
            "word": "renaissance",
            "meaningVi": "thời kỳ Phục Hưng",
            "category": "History",
            "emoji": "🎨",
            "pronunciation": "/rɪˈneɪsns/"
          },
          {
            "id": "r5_144_3",
            "word": "antiquity",
            "meaningVi": "thời kỳ cổ đại",
            "category": "History",
            "emoji": "🏺",
            "pronunciation": "/ænˈtɪkwəti/"
          }
        ]
      },
      {
        "id": "lvl-144-2",
        "unitId": "unit-144",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1890,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.16,
        "spawnInterval": 1680,
        "words": [
          {
            "id": "r5_144_4",
            "word": "revolution",
            "meaningVi": "cuộc cách mạng",
            "category": "History",
            "emoji": "✊",
            "pronunciation": "/ˌrevəˈluːʃn/"
          }
        ]
      },
      {
        "id": "lvl-144-3",
        "unitId": "unit-144",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2328,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.21,
        "spawnInterval": 1480,
        "words": [
          {
            "id": "r5_144_2",
            "word": "renaissance",
            "meaningVi": "thời kỳ Phục Hưng",
            "category": "History",
            "emoji": "🎨",
            "pronunciation": "/rɪˈneɪsns/"
          },
          {
            "id": "r5_144_3",
            "word": "antiquity",
            "meaningVi": "thời kỳ cổ đại",
            "category": "History",
            "emoji": "🏺",
            "pronunciation": "/ænˈtɪkwəti/"
          },
          {
            "id": "r5_144_4",
            "word": "revolution",
            "meaningVi": "cuộc cách mạng",
            "category": "History",
            "emoji": "✊",
            "pronunciation": "/ˌrevəˈluːʃn/"
          },
          {
            "id": "r5_144_1",
            "word": "medieval",
            "meaningVi": "thời kỳ Trung Cổ",
            "category": "History",
            "emoji": "🏰",
            "pronunciation": "/ˌmediˈiːvl/"
          }
        ]
      },
      {
        "id": "lvl-144-4",
        "unitId": "unit-144",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 144",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 68,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-144-5",
        "unitId": "unit-144",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2960,
        "xpReward": 78,
        "gemReward": 15,
        "speedMultiplier": 1.23,
        "spawnInterval": 1280,
        "words": [
          {
            "id": "r5_144_1",
            "word": "medieval",
            "meaningVi": "thời kỳ Trung Cổ",
            "category": "History",
            "emoji": "🏰",
            "pronunciation": "/ˌmediˈiːvl/"
          },
          {
            "id": "r5_144_2",
            "word": "renaissance",
            "meaningVi": "thời kỳ Phục Hưng",
            "category": "History",
            "emoji": "🎨",
            "pronunciation": "/rɪˈneɪsns/"
          },
          {
            "id": "r5_144_3",
            "word": "antiquity",
            "meaningVi": "thời kỳ cổ đại",
            "category": "History",
            "emoji": "🏺",
            "pronunciation": "/ænˈtɪkwəti/"
          },
          {
            "id": "r5_144_4",
            "word": "revolution",
            "meaningVi": "cuộc cách mạng",
            "category": "History",
            "emoji": "✊",
            "pronunciation": "/ˌrevəˈluːʃn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-145",
    "unitNumber": 145,
    "title": "Data Science",
    "titleVi": "Khoa Học Dữ Liệu",
    "description": "Thống kê phân tích số liệu, mối tương quan và xác suất thống kê.",
    "icon": "📊",
    "themeColor": "#2563eb",
    "bannerBg": "from-blue-600/30 via-indigo-600/20 to-sky-700/30",
    "levels": [
      {
        "id": "lvl-145-1",
        "unitId": "unit-145",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📊",
        "bgColor": "#2563eb",
        "targetScore": 1800,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.11,
        "spawnInterval": 1775,
        "words": [
          {
            "id": "r5_145_1",
            "word": "statistics",
            "meaningVi": "khoa học thống kê",
            "category": "Data",
            "emoji": "📊",
            "pronunciation": "/stəˈtɪstɪks/"
          },
          {
            "id": "r5_145_2",
            "word": "analytics",
            "meaningVi": "phân tích dữ liệu",
            "category": "Data",
            "emoji": "📈",
            "pronunciation": "/ˌænəˈlɪtɪks/"
          },
          {
            "id": "r5_145_3",
            "word": "correlation",
            "meaningVi": "sự tương quan",
            "category": "Data",
            "emoji": "🔗",
            "pronunciation": "/ˌkɒrəˈleɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-145-2",
        "unitId": "unit-145",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1900,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.16,
        "spawnInterval": 1675,
        "words": [
          {
            "id": "r5_145_4",
            "word": "probability",
            "meaningVi": "xác suất thống kê",
            "category": "Data",
            "emoji": "🎲",
            "pronunciation": "/ˌprɒbəˈbɪləti/"
          }
        ]
      },
      {
        "id": "lvl-145-3",
        "unitId": "unit-145",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2340,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.21,
        "spawnInterval": 1475,
        "words": [
          {
            "id": "r5_145_2",
            "word": "analytics",
            "meaningVi": "phân tích dữ liệu",
            "category": "Data",
            "emoji": "📈",
            "pronunciation": "/ˌænəˈlɪtɪks/"
          },
          {
            "id": "r5_145_3",
            "word": "correlation",
            "meaningVi": "sự tương quan",
            "category": "Data",
            "emoji": "🔗",
            "pronunciation": "/ˌkɒrəˈleɪʃn/"
          },
          {
            "id": "r5_145_4",
            "word": "probability",
            "meaningVi": "xác suất thống kê",
            "category": "Data",
            "emoji": "🎲",
            "pronunciation": "/ˌprɒbəˈbɪləti/"
          },
          {
            "id": "r5_145_1",
            "word": "statistics",
            "meaningVi": "khoa học thống kê",
            "category": "Data",
            "emoji": "📊",
            "pronunciation": "/stəˈtɪstɪks/"
          }
        ]
      },
      {
        "id": "lvl-145-4",
        "unitId": "unit-145",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 145",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 69,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-145-5",
        "unitId": "unit-145",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2975,
        "xpReward": 79,
        "gemReward": 15,
        "speedMultiplier": 1.23,
        "spawnInterval": 1275,
        "words": [
          {
            "id": "r5_145_1",
            "word": "statistics",
            "meaningVi": "khoa học thống kê",
            "category": "Data",
            "emoji": "📊",
            "pronunciation": "/stəˈtɪstɪks/"
          },
          {
            "id": "r5_145_2",
            "word": "analytics",
            "meaningVi": "phân tích dữ liệu",
            "category": "Data",
            "emoji": "📈",
            "pronunciation": "/ˌænəˈlɪtɪks/"
          },
          {
            "id": "r5_145_3",
            "word": "correlation",
            "meaningVi": "sự tương quan",
            "category": "Data",
            "emoji": "🔗",
            "pronunciation": "/ˌkɒrəˈleɪʃn/"
          },
          {
            "id": "r5_145_4",
            "word": "probability",
            "meaningVi": "xác suất thống kê",
            "category": "Data",
            "emoji": "🎲",
            "pronunciation": "/ˌprɒbəˈbɪləti/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-146",
    "unitNumber": 146,
    "title": "Leadership Dynamics",
    "titleVi": "Năng Lực Lãnh Đạo",
    "description": "Tầm nhìn chiến lược, người cố vấn dày dặn kinh nghiệm và ủy thác.",
    "icon": "👑",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-600/30 via-indigo-600/20 to-pink-700/30",
    "levels": [
      {
        "id": "lvl-146-1",
        "unitId": "unit-146",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1810,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.12,
        "spawnInterval": 1770,
        "words": [
          {
            "id": "r5_146_1",
            "word": "initiative",
            "meaningVi": "sáng kiến chủ động",
            "category": "Leadership",
            "emoji": "🚀",
            "pronunciation": "/ɪˈnɪʃətɪv/"
          },
          {
            "id": "r5_146_2",
            "word": "visionary",
            "meaningVi": "người có tầm nhìn xa",
            "category": "Leadership",
            "emoji": "🔭",
            "pronunciation": "/ˈvɪʒənri/"
          },
          {
            "id": "r5_146_3",
            "word": "mentor",
            "meaningVi": "người hướng dẫn cố vấn",
            "category": "Leadership",
            "emoji": "🧑‍🏫",
            "pronunciation": "/ˈmentɔːr/"
          }
        ]
      },
      {
        "id": "lvl-146-2",
        "unitId": "unit-146",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1910,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.17,
        "spawnInterval": 1670,
        "words": [
          {
            "id": "r5_146_4",
            "word": "delegate",
            "meaningVi": "giao phó ủy thác quyền",
            "category": "Leadership",
            "emoji": "📋",
            "pronunciation": "/ˈdelɪɡeɪt/"
          }
        ]
      },
      {
        "id": "lvl-146-3",
        "unitId": "unit-146",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2352,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.22,
        "spawnInterval": 1470,
        "words": [
          {
            "id": "r5_146_2",
            "word": "visionary",
            "meaningVi": "người có tầm nhìn xa",
            "category": "Leadership",
            "emoji": "🔭",
            "pronunciation": "/ˈvɪʒənri/"
          },
          {
            "id": "r5_146_3",
            "word": "mentor",
            "meaningVi": "người hướng dẫn cố vấn",
            "category": "Leadership",
            "emoji": "🧑‍🏫",
            "pronunciation": "/ˈmentɔːr/"
          },
          {
            "id": "r5_146_4",
            "word": "delegate",
            "meaningVi": "giao phó ủy thác quyền",
            "category": "Leadership",
            "emoji": "📋",
            "pronunciation": "/ˈdelɪɡeɪt/"
          },
          {
            "id": "r5_146_1",
            "word": "initiative",
            "meaningVi": "sáng kiến chủ động",
            "category": "Leadership",
            "emoji": "🚀",
            "pronunciation": "/ɪˈnɪʃətɪv/"
          }
        ]
      },
      {
        "id": "lvl-146-4",
        "unitId": "unit-146",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 146",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 69,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-146-5",
        "unitId": "unit-146",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2990,
        "xpReward": 79,
        "gemReward": 15,
        "speedMultiplier": 1.24,
        "spawnInterval": 1270,
        "words": [
          {
            "id": "r5_146_1",
            "word": "initiative",
            "meaningVi": "sáng kiến chủ động",
            "category": "Leadership",
            "emoji": "🚀",
            "pronunciation": "/ɪˈnɪʃətɪv/"
          },
          {
            "id": "r5_146_2",
            "word": "visionary",
            "meaningVi": "người có tầm nhìn xa",
            "category": "Leadership",
            "emoji": "🔭",
            "pronunciation": "/ˈvɪʒənri/"
          },
          {
            "id": "r5_146_3",
            "word": "mentor",
            "meaningVi": "người hướng dẫn cố vấn",
            "category": "Leadership",
            "emoji": "🧑‍🏫",
            "pronunciation": "/ˈmentɔːr/"
          },
          {
            "id": "r5_146_4",
            "word": "delegate",
            "meaningVi": "giao phó ủy thác quyền",
            "category": "Leadership",
            "emoji": "📋",
            "pronunciation": "/ˈdelɪɡeɪt/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-147",
    "unitNumber": 147,
    "title": "Water Conservation",
    "titleVi": "Bảo Tồn Nguồn Nước",
    "description": "Hồ chứa nước, nhà máy khử muối nước biển và lọc nước sạch.",
    "icon": "💧",
    "themeColor": "#0891b2",
    "bannerBg": "from-cyan-600/30 via-sky-600/20 to-blue-700/30",
    "levels": [
      {
        "id": "lvl-147-1",
        "unitId": "unit-147",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "💧",
        "bgColor": "#0891b2",
        "targetScore": 1820,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.12,
        "spawnInterval": 1765,
        "words": [
          {
            "id": "r5_147_1",
            "word": "reservoir",
            "meaningVi": "hồ chứa nước sinh hoạt",
            "category": "Water",
            "emoji": "🏞️",
            "pronunciation": "/ˈrezəvwɑːr/"
          },
          {
            "id": "r5_147_2",
            "word": "desalination",
            "meaningVi": "sự khử muối nước biển",
            "category": "Water",
            "emoji": "🌊",
            "pronunciation": "/diːˌsælɪˈneɪʃn/"
          },
          {
            "id": "r5_147_3",
            "word": "aquifer",
            "meaningVi": "tầng ngậm nước ngầm",
            "category": "Water",
            "emoji": "💧",
            "pronunciation": "/ˈækwɪfər/"
          }
        ]
      },
      {
        "id": "lvl-147-2",
        "unitId": "unit-147",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1920,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.17,
        "spawnInterval": 1665,
        "words": [
          {
            "id": "r5_147_4",
            "word": "purification",
            "meaningVi": "sự lọc làm sạch nước",
            "category": "Water",
            "emoji": "✨",
            "pronunciation": "/ˌpjʊərɪfɪˈkeɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-147-3",
        "unitId": "unit-147",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2364,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.22,
        "spawnInterval": 1465,
        "words": [
          {
            "id": "r5_147_2",
            "word": "desalination",
            "meaningVi": "sự khử muối nước biển",
            "category": "Water",
            "emoji": "🌊",
            "pronunciation": "/diːˌsælɪˈneɪʃn/"
          },
          {
            "id": "r5_147_3",
            "word": "aquifer",
            "meaningVi": "tầng ngậm nước ngầm",
            "category": "Water",
            "emoji": "💧",
            "pronunciation": "/ˈækwɪfər/"
          },
          {
            "id": "r5_147_4",
            "word": "purification",
            "meaningVi": "sự lọc làm sạch nước",
            "category": "Water",
            "emoji": "✨",
            "pronunciation": "/ˌpjʊərɪfɪˈkeɪʃn/"
          },
          {
            "id": "r5_147_1",
            "word": "reservoir",
            "meaningVi": "hồ chứa nước sinh hoạt",
            "category": "Water",
            "emoji": "🏞️",
            "pronunciation": "/ˈrezəvwɑːr/"
          }
        ]
      },
      {
        "id": "lvl-147-4",
        "unitId": "unit-147",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 147",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 69,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-147-5",
        "unitId": "unit-147",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3005,
        "xpReward": 79,
        "gemReward": 15,
        "speedMultiplier": 1.24,
        "spawnInterval": 1265,
        "words": [
          {
            "id": "r5_147_1",
            "word": "reservoir",
            "meaningVi": "hồ chứa nước sinh hoạt",
            "category": "Water",
            "emoji": "🏞️",
            "pronunciation": "/ˈrezəvwɑːr/"
          },
          {
            "id": "r5_147_2",
            "word": "desalination",
            "meaningVi": "sự khử muối nước biển",
            "category": "Water",
            "emoji": "🌊",
            "pronunciation": "/diːˌsælɪˈneɪʃn/"
          },
          {
            "id": "r5_147_3",
            "word": "aquifer",
            "meaningVi": "tầng ngậm nước ngầm",
            "category": "Water",
            "emoji": "💧",
            "pronunciation": "/ˈækwɪfər/"
          },
          {
            "id": "r5_147_4",
            "word": "purification",
            "meaningVi": "sự lọc làm sạch nước",
            "category": "Water",
            "emoji": "✨",
            "pronunciation": "/ˌpjʊərɪfɪˈkeɪʃn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-148",
    "unitNumber": 148,
    "title": "Commerce Foundations",
    "titleVi": "Nền Tảng Thương Mại",
    "description": "Bán buôn, bán lẻ, chuỗi cung ứng logistics và giao dịch mua bán.",
    "icon": "📦",
    "themeColor": "#ea580c",
    "bannerBg": "from-orange-600/30 via-amber-600/20 to-red-700/30",
    "levels": [
      {
        "id": "lvl-148-1",
        "unitId": "unit-148",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📦",
        "bgColor": "#ea580c",
        "targetScore": 1830,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.12,
        "spawnInterval": 1760,
        "words": [
          {
            "id": "r5_148_1",
            "word": "wholesale",
            "meaningVi": "bán buôn sỉ",
            "category": "Commerce",
            "emoji": "📦",
            "pronunciation": "/ˈhəʊlseɪl/"
          },
          {
            "id": "r5_148_2",
            "word": "transaction",
            "meaningVi": "giao dịch chuyển khoản",
            "category": "Commerce",
            "emoji": "💳",
            "pronunciation": "/trænˈzækʃn/"
          },
          {
            "id": "r5_148_3",
            "word": "logistics",
            "meaningVi": "dịch vụ hậu cần vận tải",
            "category": "Commerce",
            "emoji": "🚛",
            "pronunciation": "/ləˈdʒɪstɪks/"
          }
        ]
      },
      {
        "id": "lvl-148-2",
        "unitId": "unit-148",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1930,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.17,
        "spawnInterval": 1660,
        "words": [
          {
            "id": "r5_148_4",
            "word": "consumer",
            "meaningVi": "người tiêu dùng",
            "category": "Commerce",
            "emoji": "🛍️",
            "pronunciation": "/kənˈsjuːmər/"
          }
        ]
      },
      {
        "id": "lvl-148-3",
        "unitId": "unit-148",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2376,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.22,
        "spawnInterval": 1460,
        "words": [
          {
            "id": "r5_148_2",
            "word": "transaction",
            "meaningVi": "giao dịch chuyển khoản",
            "category": "Commerce",
            "emoji": "💳",
            "pronunciation": "/trænˈzækʃn/"
          },
          {
            "id": "r5_148_3",
            "word": "logistics",
            "meaningVi": "dịch vụ hậu cần vận tải",
            "category": "Commerce",
            "emoji": "🚛",
            "pronunciation": "/ləˈdʒɪstɪks/"
          },
          {
            "id": "r5_148_4",
            "word": "consumer",
            "meaningVi": "người tiêu dùng",
            "category": "Commerce",
            "emoji": "🛍️",
            "pronunciation": "/kənˈsjuːmər/"
          },
          {
            "id": "r5_148_1",
            "word": "wholesale",
            "meaningVi": "bán buôn sỉ",
            "category": "Commerce",
            "emoji": "📦",
            "pronunciation": "/ˈhəʊlseɪl/"
          }
        ]
      },
      {
        "id": "lvl-148-4",
        "unitId": "unit-148",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 148",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 69,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-148-5",
        "unitId": "unit-148",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3020,
        "xpReward": 79,
        "gemReward": 15,
        "speedMultiplier": 1.24,
        "spawnInterval": 1260,
        "words": [
          {
            "id": "r5_148_1",
            "word": "wholesale",
            "meaningVi": "bán buôn sỉ",
            "category": "Commerce",
            "emoji": "📦",
            "pronunciation": "/ˈhəʊlseɪl/"
          },
          {
            "id": "r5_148_2",
            "word": "transaction",
            "meaningVi": "giao dịch chuyển khoản",
            "category": "Commerce",
            "emoji": "💳",
            "pronunciation": "/trænˈzækʃn/"
          },
          {
            "id": "r5_148_3",
            "word": "logistics",
            "meaningVi": "dịch vụ hậu cần vận tải",
            "category": "Commerce",
            "emoji": "🚛",
            "pronunciation": "/ləˈdʒɪstɪks/"
          },
          {
            "id": "r5_148_4",
            "word": "consumer",
            "meaningVi": "người tiêu dùng",
            "category": "Commerce",
            "emoji": "🛍️",
            "pronunciation": "/kənˈsjuːmər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-149",
    "unitNumber": 149,
    "title": "Urban Ecology",
    "titleVi": "Sinh Thái Học Đô Thị",
    "description": "Vành đai xanh, hành lang sinh thái và bóng mát cây đô thị.",
    "icon": "🌳",
    "themeColor": "#15803d",
    "bannerBg": "from-green-600/30 via-emerald-600/20 to-teal-700/30",
    "levels": [
      {
        "id": "lvl-149-1",
        "unitId": "unit-149",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌳",
        "bgColor": "#15803d",
        "targetScore": 1840,
        "xpReward": 34,
        "gemReward": 5,
        "speedMultiplier": 1.13,
        "spawnInterval": 1755,
        "words": [
          {
            "id": "r5_149_1",
            "word": "greenbelt",
            "meaningVi": "vành đai cây xanh",
            "category": "Ecology",
            "emoji": "🌳",
            "pronunciation": "/ˈɡriːnbelt/"
          },
          {
            "id": "r5_149_2",
            "word": "canopy",
            "meaningVi": "tán cây che bóng mát",
            "category": "Ecology",
            "emoji": "🍃",
            "pronunciation": "/ˈkænəpi/"
          },
          {
            "id": "r5_149_3",
            "word": "corridor",
            "meaningVi": "hành lang sinh thái",
            "category": "Ecology",
            "emoji": "🛤️",
            "pronunciation": "/ˈkɒrɪdɔːr/"
          }
        ]
      },
      {
        "id": "lvl-149-2",
        "unitId": "unit-149",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1940,
        "xpReward": 39,
        "gemReward": 6,
        "speedMultiplier": 1.18,
        "spawnInterval": 1655,
        "words": [
          {
            "id": "r5_149_4",
            "word": "sustainable",
            "meaningVi": "bền vững thân thiện",
            "category": "Ecology",
            "emoji": "♻️",
            "pronunciation": "/səˈsteɪnəbl/"
          }
        ]
      },
      {
        "id": "lvl-149-3",
        "unitId": "unit-149",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2388,
        "xpReward": 44,
        "gemReward": 8,
        "speedMultiplier": 1.23,
        "spawnInterval": 1455,
        "words": [
          {
            "id": "r5_149_2",
            "word": "canopy",
            "meaningVi": "tán cây che bóng mát",
            "category": "Ecology",
            "emoji": "🍃",
            "pronunciation": "/ˈkænəpi/"
          },
          {
            "id": "r5_149_3",
            "word": "corridor",
            "meaningVi": "hành lang sinh thái",
            "category": "Ecology",
            "emoji": "🛤️",
            "pronunciation": "/ˈkɒrɪdɔːr/"
          },
          {
            "id": "r5_149_4",
            "word": "sustainable",
            "meaningVi": "bền vững thân thiện",
            "category": "Ecology",
            "emoji": "♻️",
            "pronunciation": "/səˈsteɪnəbl/"
          },
          {
            "id": "r5_149_1",
            "word": "greenbelt",
            "meaningVi": "vành đai cây xanh",
            "category": "Ecology",
            "emoji": "🌳",
            "pronunciation": "/ˈɡriːnbelt/"
          }
        ]
      },
      {
        "id": "lvl-149-4",
        "unitId": "unit-149",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 149",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 69,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-149-5",
        "unitId": "unit-149",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3035,
        "xpReward": 79,
        "gemReward": 15,
        "speedMultiplier": 1.25,
        "spawnInterval": 1255,
        "words": [
          {
            "id": "r5_149_1",
            "word": "greenbelt",
            "meaningVi": "vành đai cây xanh",
            "category": "Ecology",
            "emoji": "🌳",
            "pronunciation": "/ˈɡriːnbelt/"
          },
          {
            "id": "r5_149_2",
            "word": "canopy",
            "meaningVi": "tán cây che bóng mát",
            "category": "Ecology",
            "emoji": "🍃",
            "pronunciation": "/ˈkænəpi/"
          },
          {
            "id": "r5_149_3",
            "word": "corridor",
            "meaningVi": "hành lang sinh thái",
            "category": "Ecology",
            "emoji": "🛤️",
            "pronunciation": "/ˈkɒrɪdɔːr/"
          },
          {
            "id": "r5_149_4",
            "word": "sustainable",
            "meaningVi": "bền vững thân thiện",
            "category": "Ecology",
            "emoji": "♻️",
            "pronunciation": "/səˈsteɪnəbl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-150",
    "unitNumber": 150,
    "title": "Spacecraft Technology",
    "titleVi": "Công Nghệ Không Gian",
    "description": "Hệ thống động lực đẩy, dữ liệu đo từ xa và tải trọng vũ trụ.",
    "icon": "🚀",
    "themeColor": "#6366f1",
    "bannerBg": "from-indigo-600/30 via-violet-600/20 to-purple-700/30",
    "levels": [
      {
        "id": "lvl-150-1",
        "unitId": "unit-150",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🚀",
        "bgColor": "#6366f1",
        "targetScore": 1850,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.13,
        "spawnInterval": 1750,
        "words": [
          {
            "id": "r5_150_1",
            "word": "propulsion",
            "meaningVi": "lực đẩy phản lực",
            "category": "Spacecraft",
            "emoji": "🚀",
            "pronunciation": "/prəˈpʌlʃn/"
          },
          {
            "id": "r5_150_2",
            "word": "telemetry",
            "meaningVi": "đo từ xa truyền dữ liệu",
            "category": "Spacecraft",
            "emoji": "📡",
            "pronunciation": "/təˈlemətri/"
          },
          {
            "id": "r5_150_3",
            "word": "payload",
            "meaningVi": "trọng tải hàng không vũ trụ",
            "category": "Spacecraft",
            "emoji": "📦",
            "pronunciation": "/ˈpeɪləʊd/"
          }
        ]
      },
      {
        "id": "lvl-150-2",
        "unitId": "unit-150",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1950,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.18,
        "spawnInterval": 1650,
        "words": [
          {
            "id": "r5_150_4",
            "word": "booster",
            "meaningVi": "tên lửa đẩy phụ",
            "category": "Spacecraft",
            "emoji": "🔥",
            "pronunciation": "/ˈbuːstər/"
          }
        ]
      },
      {
        "id": "lvl-150-3",
        "unitId": "unit-150",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2400,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.23,
        "spawnInterval": 1450,
        "words": [
          {
            "id": "r5_150_2",
            "word": "telemetry",
            "meaningVi": "đo từ xa truyền dữ liệu",
            "category": "Spacecraft",
            "emoji": "📡",
            "pronunciation": "/təˈlemətri/"
          },
          {
            "id": "r5_150_3",
            "word": "payload",
            "meaningVi": "trọng tải hàng không vũ trụ",
            "category": "Spacecraft",
            "emoji": "📦",
            "pronunciation": "/ˈpeɪləʊd/"
          },
          {
            "id": "r5_150_4",
            "word": "booster",
            "meaningVi": "tên lửa đẩy phụ",
            "category": "Spacecraft",
            "emoji": "🔥",
            "pronunciation": "/ˈbuːstər/"
          },
          {
            "id": "r5_150_1",
            "word": "propulsion",
            "meaningVi": "lực đẩy phản lực",
            "category": "Spacecraft",
            "emoji": "🚀",
            "pronunciation": "/prəˈpʌlʃn/"
          }
        ]
      },
      {
        "id": "lvl-150-4",
        "unitId": "unit-150",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 150",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 70,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-150-5",
        "unitId": "unit-150",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3050,
        "xpReward": 80,
        "gemReward": 15,
        "speedMultiplier": 1.25,
        "spawnInterval": 1250,
        "words": [
          {
            "id": "r5_150_1",
            "word": "propulsion",
            "meaningVi": "lực đẩy phản lực",
            "category": "Spacecraft",
            "emoji": "🚀",
            "pronunciation": "/prəˈpʌlʃn/"
          },
          {
            "id": "r5_150_2",
            "word": "telemetry",
            "meaningVi": "đo từ xa truyền dữ liệu",
            "category": "Spacecraft",
            "emoji": "📡",
            "pronunciation": "/təˈlemətri/"
          },
          {
            "id": "r5_150_3",
            "word": "payload",
            "meaningVi": "trọng tải hàng không vũ trụ",
            "category": "Spacecraft",
            "emoji": "📦",
            "pronunciation": "/ˈpeɪləʊd/"
          },
          {
            "id": "r5_150_4",
            "word": "booster",
            "meaningVi": "tên lửa đẩy phụ",
            "category": "Spacecraft",
            "emoji": "🔥",
            "pronunciation": "/ˈbuːstər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-151",
    "unitNumber": 151,
    "title": "Social Psychology",
    "titleVi": "Tâm Lý Học Xã Hội",
    "description": "Hành vi xã hội, tâm lý đám đông và thái độ sống.",
    "icon": "👥",
    "themeColor": "#9333ea",
    "bannerBg": "from-purple-600/30 via-fuchsia-600/20 to-pink-700/30",
    "levels": [
      {
        "id": "lvl-151-1",
        "unitId": "unit-151",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "👥",
        "bgColor": "#9333ea",
        "targetScore": 1860,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.13,
        "spawnInterval": 1745,
        "words": [
          {
            "id": "r5_151_1",
            "word": "conformity",
            "meaningVi": "sự tuân thủ số đông",
            "category": "Social",
            "emoji": "👥",
            "pronunciation": "/kənˈfɔːməti/"
          },
          {
            "id": "r5_151_2",
            "word": "influence",
            "meaningVi": "sức ảnh hưởng tác động",
            "category": "Social",
            "emoji": "⭐",
            "pronunciation": "/ˈɪnfluəns/"
          },
          {
            "id": "r5_151_3",
            "word": "attitude",
            "meaningVi": "thái độ quan điểm",
            "category": "Social",
            "emoji": "💭",
            "pronunciation": "/ˈætɪtjuːd/"
          }
        ]
      },
      {
        "id": "lvl-151-2",
        "unitId": "unit-151",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1960,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.18,
        "spawnInterval": 1645,
        "words": [
          {
            "id": "r5_151_4",
            "word": "sociology",
            "meaningVi": "xã hội học",
            "category": "Social",
            "emoji": "📚",
            "pronunciation": "/ˌsəʊsiˈɒlədʒi/"
          }
        ]
      },
      {
        "id": "lvl-151-3",
        "unitId": "unit-151",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2412,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.23,
        "spawnInterval": 1445,
        "words": [
          {
            "id": "r5_151_2",
            "word": "influence",
            "meaningVi": "sức ảnh hưởng tác động",
            "category": "Social",
            "emoji": "⭐",
            "pronunciation": "/ˈɪnfluəns/"
          },
          {
            "id": "r5_151_3",
            "word": "attitude",
            "meaningVi": "thái độ quan điểm",
            "category": "Social",
            "emoji": "💭",
            "pronunciation": "/ˈætɪtjuːd/"
          },
          {
            "id": "r5_151_4",
            "word": "sociology",
            "meaningVi": "xã hội học",
            "category": "Social",
            "emoji": "📚",
            "pronunciation": "/ˌsəʊsiˈɒlədʒi/"
          },
          {
            "id": "r5_151_1",
            "word": "conformity",
            "meaningVi": "sự tuân thủ số đông",
            "category": "Social",
            "emoji": "👥",
            "pronunciation": "/kənˈfɔːməti/"
          }
        ]
      },
      {
        "id": "lvl-151-4",
        "unitId": "unit-151",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 151",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 70,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-151-5",
        "unitId": "unit-151",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3065,
        "xpReward": 80,
        "gemReward": 15,
        "speedMultiplier": 1.25,
        "spawnInterval": 1245,
        "words": [
          {
            "id": "r5_151_1",
            "word": "conformity",
            "meaningVi": "sự tuân thủ số đông",
            "category": "Social",
            "emoji": "👥",
            "pronunciation": "/kənˈfɔːməti/"
          },
          {
            "id": "r5_151_2",
            "word": "influence",
            "meaningVi": "sức ảnh hưởng tác động",
            "category": "Social",
            "emoji": "⭐",
            "pronunciation": "/ˈɪnfluəns/"
          },
          {
            "id": "r5_151_3",
            "word": "attitude",
            "meaningVi": "thái độ quan điểm",
            "category": "Social",
            "emoji": "💭",
            "pronunciation": "/ˈætɪtjuːd/"
          },
          {
            "id": "r5_151_4",
            "word": "sociology",
            "meaningVi": "xã hội học",
            "category": "Social",
            "emoji": "📚",
            "pronunciation": "/ˌsəʊsiˈɒlədʒi/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-152",
    "unitNumber": 152,
    "title": "Sustainable Agriculture",
    "titleVi": "Nông Nghiệp Bền Vững",
    "description": "Ủ phân hữu cơ vi sinh, nông nghiệp vĩnh cửu và không hóa chất.",
    "icon": "🌾",
    "themeColor": "#16a34a",
    "bannerBg": "from-green-600/30 via-lime-600/20 to-emerald-700/30",
    "levels": [
      {
        "id": "lvl-152-1",
        "unitId": "unit-152",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌾",
        "bgColor": "#16a34a",
        "targetScore": 1870,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.14,
        "spawnInterval": 1740,
        "words": [
          {
            "id": "r5_152_1",
            "word": "composting",
            "meaningVi": "ủ phân hữu cơ",
            "category": "Agri",
            "emoji": "🌱",
            "pronunciation": "/ˈkɒmpɒstɪŋ/"
          },
          {
            "id": "r5_152_2",
            "word": "pesticide",
            "meaningVi": "thuốc trừ sâu",
            "category": "Agri",
            "emoji": "⚠️",
            "pronunciation": "/ˈpestɪsaɪd/"
          },
          {
            "id": "r5_152_3",
            "word": "fertilizer",
            "meaningVi": "phân bón dinh dưỡng",
            "category": "Agri",
            "emoji": "🌾",
            "pronunciation": "/ˈfɜːtəlaɪzər/"
          }
        ]
      },
      {
        "id": "lvl-152-2",
        "unitId": "unit-152",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1970,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.19,
        "spawnInterval": 1640,
        "words": [
          {
            "id": "r5_152_4",
            "word": "livestock",
            "meaningVi": "vật nuôi gia súc",
            "category": "Agri",
            "emoji": "🐄",
            "pronunciation": "/ˈlaɪvstɒk/"
          }
        ]
      },
      {
        "id": "lvl-152-3",
        "unitId": "unit-152",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2424,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.24,
        "spawnInterval": 1440,
        "words": [
          {
            "id": "r5_152_2",
            "word": "pesticide",
            "meaningVi": "thuốc trừ sâu",
            "category": "Agri",
            "emoji": "⚠️",
            "pronunciation": "/ˈpestɪsaɪd/"
          },
          {
            "id": "r5_152_3",
            "word": "fertilizer",
            "meaningVi": "phân bón dinh dưỡng",
            "category": "Agri",
            "emoji": "🌾",
            "pronunciation": "/ˈfɜːtəlaɪzər/"
          },
          {
            "id": "r5_152_4",
            "word": "livestock",
            "meaningVi": "vật nuôi gia súc",
            "category": "Agri",
            "emoji": "🐄",
            "pronunciation": "/ˈlaɪvstɒk/"
          },
          {
            "id": "r5_152_1",
            "word": "composting",
            "meaningVi": "ủ phân hữu cơ",
            "category": "Agri",
            "emoji": "🌱",
            "pronunciation": "/ˈkɒmpɒstɪŋ/"
          }
        ]
      },
      {
        "id": "lvl-152-4",
        "unitId": "unit-152",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 152",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 70,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-152-5",
        "unitId": "unit-152",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3080,
        "xpReward": 80,
        "gemReward": 15,
        "speedMultiplier": 1.26,
        "spawnInterval": 1240,
        "words": [
          {
            "id": "r5_152_1",
            "word": "composting",
            "meaningVi": "ủ phân hữu cơ",
            "category": "Agri",
            "emoji": "🌱",
            "pronunciation": "/ˈkɒmpɒstɪŋ/"
          },
          {
            "id": "r5_152_2",
            "word": "pesticide",
            "meaningVi": "thuốc trừ sâu",
            "category": "Agri",
            "emoji": "⚠️",
            "pronunciation": "/ˈpestɪsaɪd/"
          },
          {
            "id": "r5_152_3",
            "word": "fertilizer",
            "meaningVi": "phân bón dinh dưỡng",
            "category": "Agri",
            "emoji": "🌾",
            "pronunciation": "/ˈfɜːtəlaɪzər/"
          },
          {
            "id": "r5_152_4",
            "word": "livestock",
            "meaningVi": "vật nuôi gia súc",
            "category": "Agri",
            "emoji": "🐄",
            "pronunciation": "/ˈlaɪvstɒk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-153",
    "unitNumber": 153,
    "title": "Branding & Outreach",
    "titleVi": "Truyền Thông & Tiếp Thị",
    "description": "Chiến dịch quảng bá, đối tượng khán giả và khẩu hiệu thương hiệu.",
    "icon": "📢",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-600/30 via-rose-600/20 to-purple-700/30",
    "levels": [
      {
        "id": "lvl-153-1",
        "unitId": "unit-153",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📢",
        "bgColor": "#ec4899",
        "targetScore": 1880,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.14,
        "spawnInterval": 1735,
        "words": [
          {
            "id": "r5_153_1",
            "word": "campaign",
            "meaningVi": "chiến dịch truyền thông",
            "category": "Marketing",
            "emoji": "📢",
            "pronunciation": "/kæmˈpeɪn/"
          },
          {
            "id": "r5_153_2",
            "word": "audience",
            "meaningVi": "khán thính giả theo dõi",
            "category": "Marketing",
            "emoji": "👥",
            "pronunciation": "/ˈɔːdiəns/"
          },
          {
            "id": "r5_153_3",
            "word": "publicity",
            "meaningVi": "sự quảng bá công chúng",
            "category": "Marketing",
            "emoji": "🌟",
            "pronunciation": "/pʌbˈlɪsəti/"
          }
        ]
      },
      {
        "id": "lvl-153-2",
        "unitId": "unit-153",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1980,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.19,
        "spawnInterval": 1635,
        "words": [
          {
            "id": "r5_153_4",
            "word": "demographic",
            "meaningVi": "nhân khẩu học khách hàng",
            "category": "Marketing",
            "emoji": "📊",
            "pronunciation": "/ˌdeməˈɡræfɪk/"
          }
        ]
      },
      {
        "id": "lvl-153-3",
        "unitId": "unit-153",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2436,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.24,
        "spawnInterval": 1435,
        "words": [
          {
            "id": "r5_153_2",
            "word": "audience",
            "meaningVi": "khán thính giả theo dõi",
            "category": "Marketing",
            "emoji": "👥",
            "pronunciation": "/ˈɔːdiəns/"
          },
          {
            "id": "r5_153_3",
            "word": "publicity",
            "meaningVi": "sự quảng bá công chúng",
            "category": "Marketing",
            "emoji": "🌟",
            "pronunciation": "/pʌbˈlɪsəti/"
          },
          {
            "id": "r5_153_4",
            "word": "demographic",
            "meaningVi": "nhân khẩu học khách hàng",
            "category": "Marketing",
            "emoji": "📊",
            "pronunciation": "/ˌdeməˈɡræfɪk/"
          },
          {
            "id": "r5_153_1",
            "word": "campaign",
            "meaningVi": "chiến dịch truyền thông",
            "category": "Marketing",
            "emoji": "📢",
            "pronunciation": "/kæmˈpeɪn/"
          }
        ]
      },
      {
        "id": "lvl-153-4",
        "unitId": "unit-153",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 153",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 70,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-153-5",
        "unitId": "unit-153",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3095,
        "xpReward": 80,
        "gemReward": 15,
        "speedMultiplier": 1.26,
        "spawnInterval": 1235,
        "words": [
          {
            "id": "r5_153_1",
            "word": "campaign",
            "meaningVi": "chiến dịch truyền thông",
            "category": "Marketing",
            "emoji": "📢",
            "pronunciation": "/kæmˈpeɪn/"
          },
          {
            "id": "r5_153_2",
            "word": "audience",
            "meaningVi": "khán thính giả theo dõi",
            "category": "Marketing",
            "emoji": "👥",
            "pronunciation": "/ˈɔːdiəns/"
          },
          {
            "id": "r5_153_3",
            "word": "publicity",
            "meaningVi": "sự quảng bá công chúng",
            "category": "Marketing",
            "emoji": "🌟",
            "pronunciation": "/pʌbˈlɪsəti/"
          },
          {
            "id": "r5_153_4",
            "word": "demographic",
            "meaningVi": "nhân khẩu học khách hàng",
            "category": "Marketing",
            "emoji": "📊",
            "pronunciation": "/ˌdeməˈɡræfɪk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-154",
    "unitNumber": 154,
    "title": "UX & Digital Design",
    "titleVi": "Thiết Kế Trải Nghiệm Số",
    "description": "Giao diện thân thiện, tính tiện dụng và bản mẫu thử nghiệm.",
    "icon": "🎨",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-600/30 via-blue-600/20 to-sky-700/30",
    "levels": [
      {
        "id": "lvl-154-1",
        "unitId": "unit-154",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎨",
        "bgColor": "#06b6d4",
        "targetScore": 1890,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.14,
        "spawnInterval": 1730,
        "words": [
          {
            "id": "r5_154_1",
            "word": "interface",
            "meaningVi": "giao diện người dùng",
            "category": "UX",
            "emoji": "💻",
            "pronunciation": "/ˈɪntəfeɪs/"
          },
          {
            "id": "r5_154_2",
            "word": "usability",
            "meaningVi": "tính dễ sử dụng",
            "category": "UX",
            "emoji": "👌",
            "pronunciation": "/ˌjuːzəˈbɪləti/"
          },
          {
            "id": "r5_154_3",
            "word": "prototype",
            "meaningVi": "bản thiết kế mẫu thử",
            "category": "UX",
            "emoji": "📐",
            "pronunciation": "/ˈprəʊtətaɪp/"
          }
        ]
      },
      {
        "id": "lvl-154-2",
        "unitId": "unit-154",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1990,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.19,
        "spawnInterval": 1630,
        "words": [
          {
            "id": "r5_154_4",
            "word": "aesthetic",
            "meaningVi": "tính thẩm mỹ cao",
            "category": "UX",
            "emoji": "✨",
            "pronunciation": "/iːsˈθetɪk/"
          }
        ]
      },
      {
        "id": "lvl-154-3",
        "unitId": "unit-154",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2448,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.24,
        "spawnInterval": 1430,
        "words": [
          {
            "id": "r5_154_2",
            "word": "usability",
            "meaningVi": "tính dễ sử dụng",
            "category": "UX",
            "emoji": "👌",
            "pronunciation": "/ˌjuːzəˈbɪləti/"
          },
          {
            "id": "r5_154_3",
            "word": "prototype",
            "meaningVi": "bản thiết kế mẫu thử",
            "category": "UX",
            "emoji": "📐",
            "pronunciation": "/ˈprəʊtətaɪp/"
          },
          {
            "id": "r5_154_4",
            "word": "aesthetic",
            "meaningVi": "tính thẩm mỹ cao",
            "category": "UX",
            "emoji": "✨",
            "pronunciation": "/iːsˈθetɪk/"
          },
          {
            "id": "r5_154_1",
            "word": "interface",
            "meaningVi": "giao diện người dùng",
            "category": "UX",
            "emoji": "💻",
            "pronunciation": "/ˈɪntəfeɪs/"
          }
        ]
      },
      {
        "id": "lvl-154-4",
        "unitId": "unit-154",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 154",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 70,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-154-5",
        "unitId": "unit-154",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3110,
        "xpReward": 80,
        "gemReward": 15,
        "speedMultiplier": 1.26,
        "spawnInterval": 1230,
        "words": [
          {
            "id": "r5_154_1",
            "word": "interface",
            "meaningVi": "giao diện người dùng",
            "category": "UX",
            "emoji": "💻",
            "pronunciation": "/ˈɪntəfeɪs/"
          },
          {
            "id": "r5_154_2",
            "word": "usability",
            "meaningVi": "tính dễ sử dụng",
            "category": "UX",
            "emoji": "👌",
            "pronunciation": "/ˌjuːzəˈbɪləti/"
          },
          {
            "id": "r5_154_3",
            "word": "prototype",
            "meaningVi": "bản thiết kế mẫu thử",
            "category": "UX",
            "emoji": "📐",
            "pronunciation": "/ˈprəʊtətaɪp/"
          },
          {
            "id": "r5_154_4",
            "word": "aesthetic",
            "meaningVi": "tính thẩm mỹ cao",
            "category": "UX",
            "emoji": "✨",
            "pronunciation": "/iːsˈθetɪk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-155",
    "unitNumber": 155,
    "title": "Archaeological Science",
    "titleVi": "Khảo Cổ Học",
    "description": "Hóa thạch cổ xưa, đoàn thám hiểm và khai quật nền văn minh.",
    "icon": "⛏️",
    "themeColor": "#b45309",
    "bannerBg": "from-amber-700/30 via-orange-700/20 to-yellow-800/30",
    "levels": [
      {
        "id": "lvl-155-1",
        "unitId": "unit-155",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "⛏️",
        "bgColor": "#b45309",
        "targetScore": 1900,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.15,
        "spawnInterval": 1725,
        "words": [
          {
            "id": "r5_155_1",
            "word": "fossil",
            "meaningVi": "hóa thạch cổ sinh vật",
            "category": "Archaeology",
            "emoji": "🦴",
            "pronunciation": "/ˈfɒsl/"
          },
          {
            "id": "r5_155_2",
            "word": "expedition",
            "meaningVi": "chuyến thám hiểm khoa học",
            "category": "Archaeology",
            "emoji": "🧭",
            "pronunciation": "/ˌekspəˈdɪʃn/"
          },
          {
            "id": "r5_155_3",
            "word": "excavation",
            "meaningVi": "hoạt động khai quật",
            "category": "Archaeology",
            "emoji": "⛏️",
            "pronunciation": "/ˌekskəˈveɪʃn/"
          }
        ]
      },
      {
        "id": "lvl-155-2",
        "unitId": "unit-155",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 2000,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.2,
        "spawnInterval": 1625,
        "words": [
          {
            "id": "r5_155_4",
            "word": "relic",
            "meaningVi": "di tích cổ vật quý",
            "category": "Archaeology",
            "emoji": "🏺",
            "pronunciation": "/ˈrelɪk/"
          }
        ]
      },
      {
        "id": "lvl-155-3",
        "unitId": "unit-155",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2460,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.25,
        "spawnInterval": 1425,
        "words": [
          {
            "id": "r5_155_2",
            "word": "expedition",
            "meaningVi": "chuyến thám hiểm khoa học",
            "category": "Archaeology",
            "emoji": "🧭",
            "pronunciation": "/ˌekspəˈdɪʃn/"
          },
          {
            "id": "r5_155_3",
            "word": "excavation",
            "meaningVi": "hoạt động khai quật",
            "category": "Archaeology",
            "emoji": "⛏️",
            "pronunciation": "/ˌekskəˈveɪʃn/"
          },
          {
            "id": "r5_155_4",
            "word": "relic",
            "meaningVi": "di tích cổ vật quý",
            "category": "Archaeology",
            "emoji": "🏺",
            "pronunciation": "/ˈrelɪk/"
          },
          {
            "id": "r5_155_1",
            "word": "fossil",
            "meaningVi": "hóa thạch cổ sinh vật",
            "category": "Archaeology",
            "emoji": "🦴",
            "pronunciation": "/ˈfɒsl/"
          }
        ]
      },
      {
        "id": "lvl-155-4",
        "unitId": "unit-155",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 155",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 71,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-155-5",
        "unitId": "unit-155",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3125,
        "xpReward": 81,
        "gemReward": 15,
        "speedMultiplier": 1.27,
        "spawnInterval": 1225,
        "words": [
          {
            "id": "r5_155_1",
            "word": "fossil",
            "meaningVi": "hóa thạch cổ sinh vật",
            "category": "Archaeology",
            "emoji": "🦴",
            "pronunciation": "/ˈfɒsl/"
          },
          {
            "id": "r5_155_2",
            "word": "expedition",
            "meaningVi": "chuyến thám hiểm khoa học",
            "category": "Archaeology",
            "emoji": "🧭",
            "pronunciation": "/ˌekspəˈdɪʃn/"
          },
          {
            "id": "r5_155_3",
            "word": "excavation",
            "meaningVi": "hoạt động khai quật",
            "category": "Archaeology",
            "emoji": "⛏️",
            "pronunciation": "/ˌekskəˈveɪʃn/"
          },
          {
            "id": "r5_155_4",
            "word": "relic",
            "meaningVi": "di tích cổ vật quý",
            "category": "Archaeology",
            "emoji": "🏺",
            "pronunciation": "/ˈrelɪk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-156",
    "unitNumber": 156,
    "title": "Intro Neuroscience",
    "titleVi": "Khoa Học Thần Kinh Cơ Bản",
    "description": "Khớp thần kinh xi-náp, tế bào nơ-ron và xung điện truyền tín hiệu.",
    "icon": "🧠",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-600/30 via-indigo-600/20 to-pink-700/30",
    "levels": [
      {
        "id": "lvl-156-1",
        "unitId": "unit-156",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧠",
        "bgColor": "#8b5cf6",
        "targetScore": 1910,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.15,
        "spawnInterval": 1720,
        "words": [
          {
            "id": "r5_156_1",
            "word": "synapse",
            "meaningVi": "khớp nối thần kinh",
            "category": "Neuro",
            "emoji": "⚡",
            "pronunciation": "/ˈsaɪnæps/"
          },
          {
            "id": "r5_156_2",
            "word": "cerebral",
            "meaningVi": "thuộc về đại não",
            "category": "Neuro",
            "emoji": "🧠",
            "pronunciation": "/ˈserəbrəl/"
          },
          {
            "id": "r5_156_3",
            "word": "impulse",
            "meaningVi": "xung điện thần kinh",
            "category": "Neuro",
            "emoji": "⚡",
            "pronunciation": "/ˈɪmpʌls/"
          }
        ]
      },
      {
        "id": "lvl-156-2",
        "unitId": "unit-156",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 2010,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.2,
        "spawnInterval": 1620,
        "words": [
          {
            "id": "r5_156_4",
            "word": "cognitive",
            "meaningVi": "thuộc về nhận thức tư duy",
            "category": "Neuro",
            "emoji": "💡",
            "pronunciation": "/ˈkɒɡnətɪv/"
          }
        ]
      },
      {
        "id": "lvl-156-3",
        "unitId": "unit-156",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2472,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.25,
        "spawnInterval": 1420,
        "words": [
          {
            "id": "r5_156_2",
            "word": "cerebral",
            "meaningVi": "thuộc về đại não",
            "category": "Neuro",
            "emoji": "🧠",
            "pronunciation": "/ˈserəbrəl/"
          },
          {
            "id": "r5_156_3",
            "word": "impulse",
            "meaningVi": "xung điện thần kinh",
            "category": "Neuro",
            "emoji": "⚡",
            "pronunciation": "/ˈɪmpʌls/"
          },
          {
            "id": "r5_156_4",
            "word": "cognitive",
            "meaningVi": "thuộc về nhận thức tư duy",
            "category": "Neuro",
            "emoji": "💡",
            "pronunciation": "/ˈkɒɡnətɪv/"
          },
          {
            "id": "r5_156_1",
            "word": "synapse",
            "meaningVi": "khớp nối thần kinh",
            "category": "Neuro",
            "emoji": "⚡",
            "pronunciation": "/ˈsaɪnæps/"
          }
        ]
      },
      {
        "id": "lvl-156-4",
        "unitId": "unit-156",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 156",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 71,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-156-5",
        "unitId": "unit-156",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3140,
        "xpReward": 81,
        "gemReward": 15,
        "speedMultiplier": 1.27,
        "spawnInterval": 1220,
        "words": [
          {
            "id": "r5_156_1",
            "word": "synapse",
            "meaningVi": "khớp nối thần kinh",
            "category": "Neuro",
            "emoji": "⚡",
            "pronunciation": "/ˈsaɪnæps/"
          },
          {
            "id": "r5_156_2",
            "word": "cerebral",
            "meaningVi": "thuộc về đại não",
            "category": "Neuro",
            "emoji": "🧠",
            "pronunciation": "/ˈserəbrəl/"
          },
          {
            "id": "r5_156_3",
            "word": "impulse",
            "meaningVi": "xung điện thần kinh",
            "category": "Neuro",
            "emoji": "⚡",
            "pronunciation": "/ˈɪmpʌls/"
          },
          {
            "id": "r5_156_4",
            "word": "cognitive",
            "meaningVi": "thuộc về nhận thức tư duy",
            "category": "Neuro",
            "emoji": "💡",
            "pronunciation": "/ˈkɒɡnətɪv/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-157",
    "unitNumber": 157,
    "title": "Negotiation & Consensus",
    "titleVi": "Đàm Phán & Đồng Thuận",
    "description": "Thỏa hiệp hài hòa, hòa giải bất đồng và đồng thuận chung.",
    "icon": "🤝",
    "themeColor": "#059669",
    "bannerBg": "from-emerald-600/30 via-teal-600/20 to-green-700/30",
    "levels": [
      {
        "id": "lvl-157-1",
        "unitId": "unit-157",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🤝",
        "bgColor": "#059669",
        "targetScore": 1920,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.15,
        "spawnInterval": 1715,
        "words": [
          {
            "id": "r5_157_1",
            "word": "compromise",
            "meaningVi": "sự thỏa hiệp nhượng bộ",
            "category": "Diplomacy",
            "emoji": "🤝",
            "pronunciation": "/ˈkɒmprəmaɪz/"
          },
          {
            "id": "r5_157_2",
            "word": "mediation",
            "meaningVi": "hoạt động hòa giải",
            "category": "Diplomacy",
            "emoji": "⚖️",
            "pronunciation": "/ˌmiːdiˈeɪʃn/"
          },
          {
            "id": "r5_157_3",
            "word": "consensus",
            "meaningVi": "sự đồng thuận nhất trí",
            "category": "Diplomacy",
            "emoji": "✅",
            "pronunciation": "/kənˈsensəs/"
          }
        ]
      },
      {
        "id": "lvl-157-2",
        "unitId": "unit-157",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 2020,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.2,
        "spawnInterval": 1615,
        "words": [
          {
            "id": "r5_157_4",
            "word": "diplomacy",
            "meaningVi": "nghệ thuật ngoại giao",
            "category": "Diplomacy",
            "emoji": "🌐",
            "pronunciation": "/dɪˈpləʊməsi/"
          }
        ]
      },
      {
        "id": "lvl-157-3",
        "unitId": "unit-157",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2484,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.25,
        "spawnInterval": 1415,
        "words": [
          {
            "id": "r5_157_2",
            "word": "mediation",
            "meaningVi": "hoạt động hòa giải",
            "category": "Diplomacy",
            "emoji": "⚖️",
            "pronunciation": "/ˌmiːdiˈeɪʃn/"
          },
          {
            "id": "r5_157_3",
            "word": "consensus",
            "meaningVi": "sự đồng thuận nhất trí",
            "category": "Diplomacy",
            "emoji": "✅",
            "pronunciation": "/kənˈsensəs/"
          },
          {
            "id": "r5_157_4",
            "word": "diplomacy",
            "meaningVi": "nghệ thuật ngoại giao",
            "category": "Diplomacy",
            "emoji": "🌐",
            "pronunciation": "/dɪˈpləʊməsi/"
          },
          {
            "id": "r5_157_1",
            "word": "compromise",
            "meaningVi": "sự thỏa hiệp nhượng bộ",
            "category": "Diplomacy",
            "emoji": "🤝",
            "pronunciation": "/ˈkɒmprəmaɪz/"
          }
        ]
      },
      {
        "id": "lvl-157-4",
        "unitId": "unit-157",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 157",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 71,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-157-5",
        "unitId": "unit-157",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3155,
        "xpReward": 81,
        "gemReward": 15,
        "speedMultiplier": 1.27,
        "spawnInterval": 1215,
        "words": [
          {
            "id": "r5_157_1",
            "word": "compromise",
            "meaningVi": "sự thỏa hiệp nhượng bộ",
            "category": "Diplomacy",
            "emoji": "🤝",
            "pronunciation": "/ˈkɒmprəmaɪz/"
          },
          {
            "id": "r5_157_2",
            "word": "mediation",
            "meaningVi": "hoạt động hòa giải",
            "category": "Diplomacy",
            "emoji": "⚖️",
            "pronunciation": "/ˌmiːdiˈeɪʃn/"
          },
          {
            "id": "r5_157_3",
            "word": "consensus",
            "meaningVi": "sự đồng thuận nhất trí",
            "category": "Diplomacy",
            "emoji": "✅",
            "pronunciation": "/kənˈsensəs/"
          },
          {
            "id": "r5_157_4",
            "word": "diplomacy",
            "meaningVi": "nghệ thuật ngoại giao",
            "category": "Diplomacy",
            "emoji": "🌐",
            "pronunciation": "/dɪˈpləʊməsi/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-158",
    "unitNumber": 158,
    "title": "Atomic & Nuclear Science",
    "titleVi": "Năng Lượng Hạt Nhân",
    "description": "Phản ứng phân hạch, lò phản ứng hạt nhân và đồng vị phóng xạ.",
    "icon": "⚛️",
    "themeColor": "#eab308",
    "bannerBg": "from-yellow-600/30 via-amber-600/20 to-orange-700/30",
    "levels": [
      {
        "id": "lvl-158-1",
        "unitId": "unit-158",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "⚛️",
        "bgColor": "#eab308",
        "targetScore": 1930,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.16,
        "spawnInterval": 1710,
        "words": [
          {
            "id": "r5_158_1",
            "word": "nuclear",
            "meaningVi": "thuộc về hạt nhân",
            "category": "Nuclear",
            "emoji": "⚛️",
            "pronunciation": "/ˈnjuːkliər/"
          },
          {
            "id": "r5_158_2",
            "word": "fission",
            "meaningVi": "phản ứng phân hạch hạt nhân",
            "category": "Nuclear",
            "emoji": "💥",
            "pronunciation": "/ˈfɪʃn/"
          },
          {
            "id": "r5_158_3",
            "word": "reactor",
            "meaningVi": "lò phản ứng",
            "category": "Nuclear",
            "emoji": "🏭",
            "pronunciation": "/riˈæktər/"
          }
        ]
      },
      {
        "id": "lvl-158-2",
        "unitId": "unit-158",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 2030,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.21,
        "spawnInterval": 1610,
        "words": [
          {
            "id": "r5_158_4",
            "word": "isotope",
            "meaningVi": "đồng vị phóng xạ",
            "category": "Nuclear",
            "emoji": "🧪",
            "pronunciation": "/ˈaɪsətəʊp/"
          }
        ]
      },
      {
        "id": "lvl-158-3",
        "unitId": "unit-158",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2496,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.26,
        "spawnInterval": 1410,
        "words": [
          {
            "id": "r5_158_2",
            "word": "fission",
            "meaningVi": "phản ứng phân hạch hạt nhân",
            "category": "Nuclear",
            "emoji": "💥",
            "pronunciation": "/ˈfɪʃn/"
          },
          {
            "id": "r5_158_3",
            "word": "reactor",
            "meaningVi": "lò phản ứng",
            "category": "Nuclear",
            "emoji": "🏭",
            "pronunciation": "/riˈæktər/"
          },
          {
            "id": "r5_158_4",
            "word": "isotope",
            "meaningVi": "đồng vị phóng xạ",
            "category": "Nuclear",
            "emoji": "🧪",
            "pronunciation": "/ˈaɪsətəʊp/"
          },
          {
            "id": "r5_158_1",
            "word": "nuclear",
            "meaningVi": "thuộc về hạt nhân",
            "category": "Nuclear",
            "emoji": "⚛️",
            "pronunciation": "/ˈnjuːkliər/"
          }
        ]
      },
      {
        "id": "lvl-158-4",
        "unitId": "unit-158",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 158",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 71,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-158-5",
        "unitId": "unit-158",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3170,
        "xpReward": 81,
        "gemReward": 15,
        "speedMultiplier": 1.28,
        "spawnInterval": 1210,
        "words": [
          {
            "id": "r5_158_1",
            "word": "nuclear",
            "meaningVi": "thuộc về hạt nhân",
            "category": "Nuclear",
            "emoji": "⚛️",
            "pronunciation": "/ˈnjuːkliər/"
          },
          {
            "id": "r5_158_2",
            "word": "fission",
            "meaningVi": "phản ứng phân hạch hạt nhân",
            "category": "Nuclear",
            "emoji": "💥",
            "pronunciation": "/ˈfɪʃn/"
          },
          {
            "id": "r5_158_3",
            "word": "reactor",
            "meaningVi": "lò phản ứng",
            "category": "Nuclear",
            "emoji": "🏭",
            "pronunciation": "/riˈæktər/"
          },
          {
            "id": "r5_158_4",
            "word": "isotope",
            "meaningVi": "đồng vị phóng xạ",
            "category": "Nuclear",
            "emoji": "🧪",
            "pronunciation": "/ˈaɪsətəʊp/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-159",
    "unitNumber": 159,
    "title": "Scientific Ethics",
    "titleVi": "Đạo Đức Trong Nghiên Cứu",
    "description": "Minh bạch dữ liệu, bình duyệt đồng cấp và trách nhiệm giải trình.",
    "icon": "🔬",
    "themeColor": "#0284c7",
    "bannerBg": "from-sky-600/30 via-blue-600/20 to-indigo-700/30",
    "levels": [
      {
        "id": "lvl-159-1",
        "unitId": "unit-159",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🔬",
        "bgColor": "#0284c7",
        "targetScore": 1940,
        "xpReward": 35,
        "gemReward": 5,
        "speedMultiplier": 1.16,
        "spawnInterval": 1705,
        "words": [
          {
            "id": "r5_159_1",
            "word": "dilemma",
            "meaningVi": "tình thế tiến thoái lưỡng nan",
            "category": "Ethics",
            "emoji": "🤔",
            "pronunciation": "/dɪˈlemə/"
          },
          {
            "id": "r5_159_2",
            "word": "transparency",
            "meaningVi": "tính minh bạch rõ ràng",
            "category": "Ethics",
            "emoji": "🔍",
            "pronunciation": "/trænsˈpærənsi/"
          },
          {
            "id": "r5_159_3",
            "word": "accountability",
            "meaningVi": "trách nhiệm giải trình",
            "category": "Ethics",
            "emoji": "📋",
            "pronunciation": "/əˌkaʊntəˈbɪləti/"
          }
        ]
      },
      {
        "id": "lvl-159-2",
        "unitId": "unit-159",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 2040,
        "xpReward": 40,
        "gemReward": 6,
        "speedMultiplier": 1.21,
        "spawnInterval": 1605,
        "words": [
          {
            "id": "r5_159_4",
            "word": "peer-review",
            "meaningVi": "thẩm định đồng cấp chuyên gia",
            "category": "Ethics",
            "emoji": "📝",
            "pronunciation": "/ˌpɪə rɪˈvjuː/"
          }
        ]
      },
      {
        "id": "lvl-159-3",
        "unitId": "unit-159",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2508,
        "xpReward": 45,
        "gemReward": 8,
        "speedMultiplier": 1.26,
        "spawnInterval": 1405,
        "words": [
          {
            "id": "r5_159_2",
            "word": "transparency",
            "meaningVi": "tính minh bạch rõ ràng",
            "category": "Ethics",
            "emoji": "🔍",
            "pronunciation": "/trænsˈpærənsi/"
          },
          {
            "id": "r5_159_3",
            "word": "accountability",
            "meaningVi": "trách nhiệm giải trình",
            "category": "Ethics",
            "emoji": "📋",
            "pronunciation": "/əˌkaʊntəˈbɪləti/"
          },
          {
            "id": "r5_159_4",
            "word": "peer-review",
            "meaningVi": "thẩm định đồng cấp chuyên gia",
            "category": "Ethics",
            "emoji": "📝",
            "pronunciation": "/ˌpɪə rɪˈvjuː/"
          },
          {
            "id": "r5_159_1",
            "word": "dilemma",
            "meaningVi": "tình thế tiến thoái lưỡng nan",
            "category": "Ethics",
            "emoji": "🤔",
            "pronunciation": "/dɪˈlemə/"
          }
        ]
      },
      {
        "id": "lvl-159-4",
        "unitId": "unit-159",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 159",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 71,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-159-5",
        "unitId": "unit-159",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3185,
        "xpReward": 81,
        "gemReward": 15,
        "speedMultiplier": 1.28,
        "spawnInterval": 1205,
        "words": [
          {
            "id": "r5_159_1",
            "word": "dilemma",
            "meaningVi": "tình thế tiến thoái lưỡng nan",
            "category": "Ethics",
            "emoji": "🤔",
            "pronunciation": "/dɪˈlemə/"
          },
          {
            "id": "r5_159_2",
            "word": "transparency",
            "meaningVi": "tính minh bạch rõ ràng",
            "category": "Ethics",
            "emoji": "🔍",
            "pronunciation": "/trænsˈpærənsi/"
          },
          {
            "id": "r5_159_3",
            "word": "accountability",
            "meaningVi": "trách nhiệm giải trình",
            "category": "Ethics",
            "emoji": "📋",
            "pronunciation": "/əˌkaʊntəˈbɪləti/"
          },
          {
            "id": "r5_159_4",
            "word": "peer-review",
            "meaningVi": "thẩm định đồng cấp chuyên gia",
            "category": "Ethics",
            "emoji": "📝",
            "pronunciation": "/ˌpɪə rɪˈvjuː/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-160",
    "unitNumber": 160,
    "title": "Realm 5 Grand Review",
    "titleVi": "Đại Chiến Bứt Phá Vào 10",
    "description": "Chinh phục kỳ thi chuyển cấp với kho từ vựng học thuật B1 phong phú và tốc độ đánh máy xuất sắc!",
    "icon": "🔮",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-600/30 via-fuchsia-600/20 to-pink-700/30",
    "levels": [
      {
        "id": "lvl-160-1",
        "unitId": "unit-160",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🔮",
        "bgColor": "#8b5cf6",
        "targetScore": 1950,
        "xpReward": 36,
        "gemReward": 5,
        "speedMultiplier": 1.18,
        "spawnInterval": 1700,
        "words": [
          {
            "id": "r5_160_1",
            "word": "infrastructure",
            "meaningVi": "cơ sở hạ tầng",
            "category": "Mastery",
            "emoji": "🏗️",
            "pronunciation": "/ˈɪnfrəstrʌktʃər/"
          },
          {
            "id": "r5_160_2",
            "word": "sustainability",
            "meaningVi": "tính bền vững",
            "category": "Mastery",
            "emoji": "♻️",
            "pronunciation": "/səˌsteɪnəˈbɪləti/"
          },
          {
            "id": "r5_160_3",
            "word": "rehabilitation",
            "meaningVi": "phục hồi chức năng",
            "category": "Mastery",
            "emoji": "🚶",
            "pronunciation": "/ˌriːəˌbɪlɪˈteɪʃn/"
          },
          {
            "id": "r5_160_4",
            "word": "transparency",
            "meaningVi": "tính minh bạch",
            "category": "Mastery",
            "emoji": "🔍",
            "pronunciation": "/trænsˈpærənsi/"
          }
        ]
      },
      {
        "id": "lvl-160-2",
        "unitId": "unit-160",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 2050,
        "xpReward": 41,
        "gemReward": 6,
        "speedMultiplier": 1.23,
        "spawnInterval": 1600,
        "words": [
          {
            "id": "r5_160_5",
            "word": "photovoltaic",
            "meaningVi": "quang điện mặt trời",
            "category": "Mastery",
            "emoji": "☀️",
            "pronunciation": "/ˌfəʊtəʊvɒlˈteɪɪk/"
          },
          {
            "id": "r5_160_6",
            "word": "resilience",
            "meaningVi": "sự kiên cường",
            "category": "Mastery",
            "emoji": "🛡️",
            "pronunciation": "/rɪˈzɪliəns/"
          },
          {
            "id": "r5_160_7",
            "word": "singularity",
            "meaningVi": "điểm kỳ dị hố đen",
            "category": "Mastery",
            "emoji": "🕳️",
            "pronunciation": "/ˌsɪŋɡjəˈlærəti/"
          },
          {
            "id": "r5_160_8",
            "word": "biodiversity",
            "meaningVi": "đa dạng sinh học",
            "category": "Mastery",
            "emoji": "🐠",
            "pronunciation": "/ˌbaɪəʊdaɪˈvɜːsəti/"
          }
        ]
      },
      {
        "id": "lvl-160-3",
        "unitId": "unit-160",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 2520,
        "xpReward": 46,
        "gemReward": 8,
        "speedMultiplier": 1.28,
        "spawnInterval": 1400,
        "words": [
          {
            "id": "r5_160_2",
            "word": "sustainability",
            "meaningVi": "tính bền vững",
            "category": "Mastery",
            "emoji": "♻️",
            "pronunciation": "/səˌsteɪnəˈbɪləti/"
          },
          {
            "id": "r5_160_3",
            "word": "rehabilitation",
            "meaningVi": "phục hồi chức năng",
            "category": "Mastery",
            "emoji": "🚶",
            "pronunciation": "/ˌriːəˌbɪlɪˈteɪʃn/"
          },
          {
            "id": "r5_160_4",
            "word": "transparency",
            "meaningVi": "tính minh bạch",
            "category": "Mastery",
            "emoji": "🔍",
            "pronunciation": "/trænsˈpærənsi/"
          },
          {
            "id": "r5_160_5",
            "word": "photovoltaic",
            "meaningVi": "quang điện mặt trời",
            "category": "Mastery",
            "emoji": "☀️",
            "pronunciation": "/ˌfəʊtəʊvɒlˈteɪɪk/"
          },
          {
            "id": "r5_160_6",
            "word": "resilience",
            "meaningVi": "sự kiên cường",
            "category": "Mastery",
            "emoji": "🛡️",
            "pronunciation": "/rɪˈzɪliəns/"
          },
          {
            "id": "r5_160_7",
            "word": "singularity",
            "meaningVi": "điểm kỳ dị hố đen",
            "category": "Mastery",
            "emoji": "🕳️",
            "pronunciation": "/ˌsɪŋɡjəˈlærəti/"
          }
        ]
      },
      {
        "id": "lvl-160-4",
        "unitId": "unit-160",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 160",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 72,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-160-5",
        "unitId": "unit-160",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 3200,
        "xpReward": 82,
        "gemReward": 15,
        "speedMultiplier": 1.3,
        "spawnInterval": 1200,
        "words": [
          {
            "id": "r5_160_1",
            "word": "infrastructure",
            "meaningVi": "cơ sở hạ tầng",
            "category": "Mastery",
            "emoji": "🏗️",
            "pronunciation": "/ˈɪnfrəstrʌktʃər/"
          },
          {
            "id": "r5_160_2",
            "word": "sustainability",
            "meaningVi": "tính bền vững",
            "category": "Mastery",
            "emoji": "♻️",
            "pronunciation": "/səˌsteɪnəˈbɪləti/"
          },
          {
            "id": "r5_160_3",
            "word": "rehabilitation",
            "meaningVi": "phục hồi chức năng",
            "category": "Mastery",
            "emoji": "🚶",
            "pronunciation": "/ˌriːəˌbɪlɪˈteɪʃn/"
          },
          {
            "id": "r5_160_4",
            "word": "transparency",
            "meaningVi": "tính minh bạch",
            "category": "Mastery",
            "emoji": "🔍",
            "pronunciation": "/trænsˈpærənsi/"
          },
          {
            "id": "r5_160_5",
            "word": "photovoltaic",
            "meaningVi": "quang điện mặt trời",
            "category": "Mastery",
            "emoji": "☀️",
            "pronunciation": "/ˌfəʊtəʊvɒlˈteɪɪk/"
          },
          {
            "id": "r5_160_6",
            "word": "resilience",
            "meaningVi": "sự kiên cường",
            "category": "Mastery",
            "emoji": "🛡️",
            "pronunciation": "/rɪˈzɪliəns/"
          },
          {
            "id": "r5_160_7",
            "word": "singularity",
            "meaningVi": "điểm kỳ dị hố đen",
            "category": "Mastery",
            "emoji": "🕳️",
            "pronunciation": "/ˌsɪŋɡjəˈlærəti/"
          },
          {
            "id": "r5_160_8",
            "word": "biodiversity",
            "meaningVi": "đa dạng sinh học",
            "category": "Mastery",
            "emoji": "🐠",
            "pronunciation": "/ˌbaɪəʊdaɪˈvɜːsəti/"
          }
        ]
      }
    ]
  }
];

export const REALM5_REALM: AgeRealm = {
  id: 'realm-5',
  realmNumber: 5,
  name: 'Secondary Achievers',
  nameVi: 'THCS Chuyên Sâu',
  ageRange: '14 - 15 Tuổi',
  gradeLabel: 'Lớp 8 - 9 (CEFR B1)',
  description: '40 Chương chuyên sâu luyện thi vào 10 với từ vựng 7-12 chữ cái, phản xạ gõ nhanh, chính xác và tư duy học thuật.',
  icon: '🔮',
  color: '#8b5cf6',
  badgeBg: 'bg-purple-500/20 border-purple-400/50 text-purple-300',
  startChapter: 121,
  endChapter: 160,
  wordLengthHint: '7 - 12 chữ cái',
  targetWpm: '50 - 65 WPM',
  units: REALM5_UNITS
};
