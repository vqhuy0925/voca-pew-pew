import { Unit } from '../progress-types';
import { AgeRealm } from './types';

export const REALM2_UNITS: Unit[] = [
  {
    "id": "unit-26",
    "unitNumber": 26,
    "title": "School Subjects",
    "titleVi": "Môn Học Yêu Thích",
    "description": "Toán học, mỹ thuật, âm nhạc và khoa học diệu kỳ.",
    "icon": "📐",
    "themeColor": "#3b82f6",
    "bannerBg": "from-blue-500/30 via-indigo-500/20 to-sky-600/30",
    "levels": [
      {
        "id": "lvl-26-1",
        "unitId": "unit-26",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📐",
        "bgColor": "#3b82f6",
        "targetScore": 610,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.68,
        "spawnInterval": 2370,
        "words": [
          {
            "id": "r2_26_1",
            "word": "math",
            "meaningVi": "môn toán",
            "category": "School",
            "emoji": "🔢",
            "pronunciation": "/mæθ/"
          },
          {
            "id": "r2_26_2",
            "word": "music",
            "meaningVi": "âm nhạc",
            "category": "School",
            "emoji": "🎵",
            "pronunciation": "/ˈmjuːzɪk/"
          },
          {
            "id": "r2_26_3",
            "word": "art",
            "meaningVi": "mỹ thuật",
            "category": "School",
            "emoji": "🎨",
            "pronunciation": "/ɑːt/"
          }
        ]
      },
      {
        "id": "lvl-26-2",
        "unitId": "unit-26",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 710,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.73,
        "spawnInterval": 2270,
        "words": [
          {
            "id": "r2_26_4",
            "word": "sport",
            "meaningVi": "thể thao",
            "category": "School",
            "emoji": "⚽",
            "pronunciation": "/spɔːt/"
          },
          {
            "id": "r2_26_5",
            "word": "english",
            "meaningVi": "tiếng Anh",
            "category": "School",
            "emoji": "🇬🇧",
            "pronunciation": "/ˈɪŋɡlɪʃ/"
          }
        ]
      },
      {
        "id": "lvl-26-3",
        "unitId": "unit-26",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 912,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.78,
        "spawnInterval": 2070,
        "words": [
          {
            "id": "r2_26_2",
            "word": "music",
            "meaningVi": "âm nhạc",
            "category": "School",
            "emoji": "🎵",
            "pronunciation": "/ˈmjuːzɪk/"
          },
          {
            "id": "r2_26_3",
            "word": "art",
            "meaningVi": "mỹ thuật",
            "category": "School",
            "emoji": "🎨",
            "pronunciation": "/ɑːt/"
          },
          {
            "id": "r2_26_4",
            "word": "sport",
            "meaningVi": "thể thao",
            "category": "School",
            "emoji": "⚽",
            "pronunciation": "/spɔːt/"
          },
          {
            "id": "r2_26_5",
            "word": "english",
            "meaningVi": "tiếng Anh",
            "category": "School",
            "emoji": "🇬🇧",
            "pronunciation": "/ˈɪŋɡlɪʃ/"
          },
          {
            "id": "r2_26_1",
            "word": "math",
            "meaningVi": "môn toán",
            "category": "School",
            "emoji": "🔢",
            "pronunciation": "/mæθ/"
          }
        ]
      },
      {
        "id": "lvl-26-4",
        "unitId": "unit-26",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 26",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 45,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-26-5",
        "unitId": "unit-26",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1190,
        "xpReward": 55,
        "gemReward": 15,
        "speedMultiplier": 0.8,
        "spawnInterval": 1870,
        "words": [
          {
            "id": "r2_26_1",
            "word": "math",
            "meaningVi": "môn toán",
            "category": "School",
            "emoji": "🔢",
            "pronunciation": "/mæθ/"
          },
          {
            "id": "r2_26_2",
            "word": "music",
            "meaningVi": "âm nhạc",
            "category": "School",
            "emoji": "🎵",
            "pronunciation": "/ˈmjuːzɪk/"
          },
          {
            "id": "r2_26_3",
            "word": "art",
            "meaningVi": "mỹ thuật",
            "category": "School",
            "emoji": "🎨",
            "pronunciation": "/ɑːt/"
          },
          {
            "id": "r2_26_4",
            "word": "sport",
            "meaningVi": "thể thao",
            "category": "School",
            "emoji": "⚽",
            "pronunciation": "/spɔːt/"
          },
          {
            "id": "r2_26_5",
            "word": "english",
            "meaningVi": "tiếng Anh",
            "category": "School",
            "emoji": "🇬🇧",
            "pronunciation": "/ˈɪŋɡlɪʃ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-27",
    "unitNumber": 27,
    "title": "Days of the Week",
    "titleVi": "Các Ngày Trong Tuần",
    "description": "Thứ Hai khởi đầu, Chủ Nhật vui tươi nghỉ ngơi.",
    "icon": "📅",
    "themeColor": "#10b981",
    "bannerBg": "from-emerald-500/30 via-teal-500/20 to-green-600/30",
    "levels": [
      {
        "id": "lvl-27-1",
        "unitId": "unit-27",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📅",
        "bgColor": "#10b981",
        "targetScore": 620,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.69,
        "spawnInterval": 2365,
        "words": [
          {
            "id": "r2_27_1",
            "word": "monday",
            "meaningVi": "thứ Hai",
            "category": "Time",
            "emoji": "🗓️",
            "pronunciation": "/ˈmʌndeɪ/"
          },
          {
            "id": "r2_27_2",
            "word": "friday",
            "meaningVi": "thứ Sáu",
            "category": "Time",
            "emoji": "🎉",
            "pronunciation": "/ˈfraɪdeɪ/"
          },
          {
            "id": "r2_27_3",
            "word": "sunday",
            "meaningVi": "Chủ Nhật",
            "category": "Time",
            "emoji": "☀️",
            "pronunciation": "/ˈsʌndeɪ/"
          }
        ]
      },
      {
        "id": "lvl-27-2",
        "unitId": "unit-27",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 720,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.74,
        "spawnInterval": 2265,
        "words": [
          {
            "id": "r2_27_4",
            "word": "today",
            "meaningVi": "hôm nay",
            "category": "Time",
            "emoji": "📍",
            "pronunciation": "/təˈdeɪ/"
          },
          {
            "id": "r2_27_5",
            "word": "week",
            "meaningVi": "tuần lễ",
            "category": "Time",
            "emoji": "📆",
            "pronunciation": "/wiːk/"
          }
        ]
      },
      {
        "id": "lvl-27-3",
        "unitId": "unit-27",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 924,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.79,
        "spawnInterval": 2065,
        "words": [
          {
            "id": "r2_27_2",
            "word": "friday",
            "meaningVi": "thứ Sáu",
            "category": "Time",
            "emoji": "🎉",
            "pronunciation": "/ˈfraɪdeɪ/"
          },
          {
            "id": "r2_27_3",
            "word": "sunday",
            "meaningVi": "Chủ Nhật",
            "category": "Time",
            "emoji": "☀️",
            "pronunciation": "/ˈsʌndeɪ/"
          },
          {
            "id": "r2_27_4",
            "word": "today",
            "meaningVi": "hôm nay",
            "category": "Time",
            "emoji": "📍",
            "pronunciation": "/təˈdeɪ/"
          },
          {
            "id": "r2_27_5",
            "word": "week",
            "meaningVi": "tuần lễ",
            "category": "Time",
            "emoji": "📆",
            "pronunciation": "/wiːk/"
          },
          {
            "id": "r2_27_1",
            "word": "monday",
            "meaningVi": "thứ Hai",
            "category": "Time",
            "emoji": "🗓️",
            "pronunciation": "/ˈmʌndeɪ/"
          }
        ]
      },
      {
        "id": "lvl-27-4",
        "unitId": "unit-27",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 27",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 45,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-27-5",
        "unitId": "unit-27",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1205,
        "xpReward": 55,
        "gemReward": 15,
        "speedMultiplier": 0.81,
        "spawnInterval": 1865,
        "words": [
          {
            "id": "r2_27_1",
            "word": "monday",
            "meaningVi": "thứ Hai",
            "category": "Time",
            "emoji": "🗓️",
            "pronunciation": "/ˈmʌndeɪ/"
          },
          {
            "id": "r2_27_2",
            "word": "friday",
            "meaningVi": "thứ Sáu",
            "category": "Time",
            "emoji": "🎉",
            "pronunciation": "/ˈfraɪdeɪ/"
          },
          {
            "id": "r2_27_3",
            "word": "sunday",
            "meaningVi": "Chủ Nhật",
            "category": "Time",
            "emoji": "☀️",
            "pronunciation": "/ˈsʌndeɪ/"
          },
          {
            "id": "r2_27_4",
            "word": "today",
            "meaningVi": "hôm nay",
            "category": "Time",
            "emoji": "📍",
            "pronunciation": "/təˈdeɪ/"
          },
          {
            "id": "r2_27_5",
            "word": "week",
            "meaningVi": "tuần lễ",
            "category": "Time",
            "emoji": "📆",
            "pronunciation": "/wiːk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-28",
    "unitNumber": 28,
    "title": "Four Seasons",
    "titleVi": "Bốn Mùa Tươi Đẹp",
    "description": "Mùa xuân hoa nở, mùa hè rực rỡ, mùa đông ấm áp.",
    "icon": "🌸",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-500/30 via-rose-500/20 to-purple-600/30",
    "levels": [
      {
        "id": "lvl-28-1",
        "unitId": "unit-28",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌸",
        "bgColor": "#ec4899",
        "targetScore": 630,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.69,
        "spawnInterval": 2360,
        "words": [
          {
            "id": "r2_28_1",
            "word": "spring",
            "meaningVi": "mùa xuân",
            "category": "Seasons",
            "emoji": "🌸",
            "pronunciation": "/sprɪŋ/"
          },
          {
            "id": "r2_28_2",
            "word": "summer",
            "meaningVi": "mùa hè",
            "category": "Seasons",
            "emoji": "🏖️",
            "pronunciation": "/ˈsʌmər/"
          },
          {
            "id": "r2_28_3",
            "word": "autumn",
            "meaningVi": "mùa thu",
            "category": "Seasons",
            "emoji": "🍂",
            "pronunciation": "/ˈɔːtəm/"
          }
        ]
      },
      {
        "id": "lvl-28-2",
        "unitId": "unit-28",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 730,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.74,
        "spawnInterval": 2260,
        "words": [
          {
            "id": "r2_28_4",
            "word": "winter",
            "meaningVi": "mùa đông",
            "category": "Seasons",
            "emoji": "⛄",
            "pronunciation": "/ˈwɪntər/"
          }
        ]
      },
      {
        "id": "lvl-28-3",
        "unitId": "unit-28",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 936,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.79,
        "spawnInterval": 2060,
        "words": [
          {
            "id": "r2_28_2",
            "word": "summer",
            "meaningVi": "mùa hè",
            "category": "Seasons",
            "emoji": "🏖️",
            "pronunciation": "/ˈsʌmər/"
          },
          {
            "id": "r2_28_3",
            "word": "autumn",
            "meaningVi": "mùa thu",
            "category": "Seasons",
            "emoji": "🍂",
            "pronunciation": "/ˈɔːtəm/"
          },
          {
            "id": "r2_28_4",
            "word": "winter",
            "meaningVi": "mùa đông",
            "category": "Seasons",
            "emoji": "⛄",
            "pronunciation": "/ˈwɪntər/"
          },
          {
            "id": "r2_28_1",
            "word": "spring",
            "meaningVi": "mùa xuân",
            "category": "Seasons",
            "emoji": "🌸",
            "pronunciation": "/sprɪŋ/"
          }
        ]
      },
      {
        "id": "lvl-28-4",
        "unitId": "unit-28",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 28",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 45,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-28-5",
        "unitId": "unit-28",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1220,
        "xpReward": 55,
        "gemReward": 15,
        "speedMultiplier": 0.81,
        "spawnInterval": 1860,
        "words": [
          {
            "id": "r2_28_1",
            "word": "spring",
            "meaningVi": "mùa xuân",
            "category": "Seasons",
            "emoji": "🌸",
            "pronunciation": "/sprɪŋ/"
          },
          {
            "id": "r2_28_2",
            "word": "summer",
            "meaningVi": "mùa hè",
            "category": "Seasons",
            "emoji": "🏖️",
            "pronunciation": "/ˈsʌmər/"
          },
          {
            "id": "r2_28_3",
            "word": "autumn",
            "meaningVi": "mùa thu",
            "category": "Seasons",
            "emoji": "🍂",
            "pronunciation": "/ˈɔːtəm/"
          },
          {
            "id": "r2_28_4",
            "word": "winter",
            "meaningVi": "mùa đông",
            "category": "Seasons",
            "emoji": "⛄",
            "pronunciation": "/ˈwɪntər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-29",
    "unitNumber": 29,
    "title": "Action Sports",
    "titleVi": "Thể Thao Năng Động",
    "description": "Bóng đá, quần vợt, trượt ván và chạy đua tốc độ.",
    "icon": "⚽",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-500/30 via-orange-500/20 to-yellow-600/30",
    "levels": [
      {
        "id": "lvl-29-1",
        "unitId": "unit-29",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "⚽",
        "bgColor": "#f59e0b",
        "targetScore": 640,
        "xpReward": 22,
        "gemReward": 5,
        "speedMultiplier": 0.7,
        "spawnInterval": 2355,
        "words": [
          {
            "id": "r2_29_1",
            "word": "soccer",
            "meaningVi": "bóng đá",
            "category": "Sports",
            "emoji": "⚽",
            "pronunciation": "/ˈsɒkər/"
          },
          {
            "id": "r2_29_2",
            "word": "tennis",
            "meaningVi": "quần vợt",
            "category": "Sports",
            "emoji": "🎾",
            "pronunciation": "/ˈtenɪs/"
          },
          {
            "id": "r2_29_3",
            "word": "skate",
            "meaningVi": "trượt ván",
            "category": "Sports",
            "emoji": "🛹",
            "pronunciation": "/skeɪt/"
          }
        ]
      },
      {
        "id": "lvl-29-2",
        "unitId": "unit-29",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 740,
        "xpReward": 27,
        "gemReward": 6,
        "speedMultiplier": 0.75,
        "spawnInterval": 2255,
        "words": [
          {
            "id": "r2_29_4",
            "word": "race",
            "meaningVi": "chạy đua",
            "category": "Sports",
            "emoji": "🏁",
            "pronunciation": "/reɪs/"
          },
          {
            "id": "r2_29_5",
            "word": "score",
            "meaningVi": "ghi bàn / điểm",
            "category": "Sports",
            "emoji": "🥅",
            "pronunciation": "/skɔːr/"
          }
        ]
      },
      {
        "id": "lvl-29-3",
        "unitId": "unit-29",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 948,
        "xpReward": 32,
        "gemReward": 8,
        "speedMultiplier": 0.8,
        "spawnInterval": 2055,
        "words": [
          {
            "id": "r2_29_2",
            "word": "tennis",
            "meaningVi": "quần vợt",
            "category": "Sports",
            "emoji": "🎾",
            "pronunciation": "/ˈtenɪs/"
          },
          {
            "id": "r2_29_3",
            "word": "skate",
            "meaningVi": "trượt ván",
            "category": "Sports",
            "emoji": "🛹",
            "pronunciation": "/skeɪt/"
          },
          {
            "id": "r2_29_4",
            "word": "race",
            "meaningVi": "chạy đua",
            "category": "Sports",
            "emoji": "🏁",
            "pronunciation": "/reɪs/"
          },
          {
            "id": "r2_29_5",
            "word": "score",
            "meaningVi": "ghi bàn / điểm",
            "category": "Sports",
            "emoji": "🥅",
            "pronunciation": "/skɔːr/"
          },
          {
            "id": "r2_29_1",
            "word": "soccer",
            "meaningVi": "bóng đá",
            "category": "Sports",
            "emoji": "⚽",
            "pronunciation": "/ˈsɒkər/"
          }
        ]
      },
      {
        "id": "lvl-29-4",
        "unitId": "unit-29",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 29",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 45,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-29-5",
        "unitId": "unit-29",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1235,
        "xpReward": 55,
        "gemReward": 15,
        "speedMultiplier": 0.82,
        "spawnInterval": 1855,
        "words": [
          {
            "id": "r2_29_1",
            "word": "soccer",
            "meaningVi": "bóng đá",
            "category": "Sports",
            "emoji": "⚽",
            "pronunciation": "/ˈsɒkər/"
          },
          {
            "id": "r2_29_2",
            "word": "tennis",
            "meaningVi": "quần vợt",
            "category": "Sports",
            "emoji": "🎾",
            "pronunciation": "/ˈtenɪs/"
          },
          {
            "id": "r2_29_3",
            "word": "skate",
            "meaningVi": "trượt ván",
            "category": "Sports",
            "emoji": "🛹",
            "pronunciation": "/skeɪt/"
          },
          {
            "id": "r2_29_4",
            "word": "race",
            "meaningVi": "chạy đua",
            "category": "Sports",
            "emoji": "🏁",
            "pronunciation": "/reɪs/"
          },
          {
            "id": "r2_29_5",
            "word": "score",
            "meaningVi": "ghi bàn / điểm",
            "category": "Sports",
            "emoji": "🥅",
            "pronunciation": "/skɔːr/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-30",
    "unitNumber": 30,
    "title": "City Vehicles",
    "titleVi": "Phương Tiện Giao Thông",
    "description": "Xe buýt, tàu hỏa, máy bay vi vu trên bầu trời.",
    "icon": "🚌",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-500/30 via-sky-500/20 to-blue-600/30",
    "levels": [
      {
        "id": "lvl-30-1",
        "unitId": "unit-30",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🚌",
        "bgColor": "#06b6d4",
        "targetScore": 650,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.7,
        "spawnInterval": 2350,
        "words": [
          {
            "id": "r2_30_1",
            "word": "bus",
            "meaningVi": "xe buýt",
            "category": "Vehicles",
            "emoji": "🚌",
            "pronunciation": "/bʌs/"
          },
          {
            "id": "r2_30_2",
            "word": "train",
            "meaningVi": "tàu hỏa",
            "category": "Vehicles",
            "emoji": "🚆",
            "pronunciation": "/treɪn/"
          },
          {
            "id": "r2_30_3",
            "word": "plane",
            "meaningVi": "máy bay",
            "category": "Vehicles",
            "emoji": "✈️",
            "pronunciation": "/pleɪn/"
          }
        ]
      },
      {
        "id": "lvl-30-2",
        "unitId": "unit-30",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 750,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.75,
        "spawnInterval": 2250,
        "words": [
          {
            "id": "r2_30_4",
            "word": "ship",
            "meaningVi": "tàu thủy",
            "category": "Vehicles",
            "emoji": "🚢",
            "pronunciation": "/ʃɪp/"
          },
          {
            "id": "r2_30_5",
            "word": "bike",
            "meaningVi": "xe đạp",
            "category": "Vehicles",
            "emoji": "🚲",
            "pronunciation": "/baɪk/"
          },
          {
            "id": "r2_30_6",
            "word": "truck",
            "meaningVi": "xe tải",
            "category": "Vehicles",
            "emoji": "🚚",
            "pronunciation": "/trʌk/"
          }
        ]
      },
      {
        "id": "lvl-30-3",
        "unitId": "unit-30",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 960,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.8,
        "spawnInterval": 2050,
        "words": [
          {
            "id": "r2_30_2",
            "word": "train",
            "meaningVi": "tàu hỏa",
            "category": "Vehicles",
            "emoji": "🚆",
            "pronunciation": "/treɪn/"
          },
          {
            "id": "r2_30_3",
            "word": "plane",
            "meaningVi": "máy bay",
            "category": "Vehicles",
            "emoji": "✈️",
            "pronunciation": "/pleɪn/"
          },
          {
            "id": "r2_30_4",
            "word": "ship",
            "meaningVi": "tàu thủy",
            "category": "Vehicles",
            "emoji": "🚢",
            "pronunciation": "/ʃɪp/"
          },
          {
            "id": "r2_30_5",
            "word": "bike",
            "meaningVi": "xe đạp",
            "category": "Vehicles",
            "emoji": "🚲",
            "pronunciation": "/baɪk/"
          },
          {
            "id": "r2_30_6",
            "word": "truck",
            "meaningVi": "xe tải",
            "category": "Vehicles",
            "emoji": "🚚",
            "pronunciation": "/trʌk/"
          },
          {
            "id": "r2_30_1",
            "word": "bus",
            "meaningVi": "xe buýt",
            "category": "Vehicles",
            "emoji": "🚌",
            "pronunciation": "/bʌs/"
          }
        ]
      },
      {
        "id": "lvl-30-4",
        "unitId": "unit-30",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 30",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 46,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-30-5",
        "unitId": "unit-30",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1250,
        "xpReward": 56,
        "gemReward": 15,
        "speedMultiplier": 0.82,
        "spawnInterval": 1850,
        "words": [
          {
            "id": "r2_30_1",
            "word": "bus",
            "meaningVi": "xe buýt",
            "category": "Vehicles",
            "emoji": "🚌",
            "pronunciation": "/bʌs/"
          },
          {
            "id": "r2_30_2",
            "word": "train",
            "meaningVi": "tàu hỏa",
            "category": "Vehicles",
            "emoji": "🚆",
            "pronunciation": "/treɪn/"
          },
          {
            "id": "r2_30_3",
            "word": "plane",
            "meaningVi": "máy bay",
            "category": "Vehicles",
            "emoji": "✈️",
            "pronunciation": "/pleɪn/"
          },
          {
            "id": "r2_30_4",
            "word": "ship",
            "meaningVi": "tàu thủy",
            "category": "Vehicles",
            "emoji": "🚢",
            "pronunciation": "/ʃɪp/"
          },
          {
            "id": "r2_30_5",
            "word": "bike",
            "meaningVi": "xe đạp",
            "category": "Vehicles",
            "emoji": "🚲",
            "pronunciation": "/baɪk/"
          },
          {
            "id": "r2_30_6",
            "word": "truck",
            "meaningVi": "xe tải",
            "category": "Vehicles",
            "emoji": "🚚",
            "pronunciation": "/trʌk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-31",
    "unitNumber": 31,
    "title": "Town Places",
    "titleVi": "Nơi Chốn Trong Phố",
    "description": "Công viên xanh mát, rạp chiếu phim, trường học và sở thú.",
    "icon": "🏙️",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-500/30 via-violet-500/20 to-indigo-600/30",
    "levels": [
      {
        "id": "lvl-31-1",
        "unitId": "unit-31",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏙️",
        "bgColor": "#8b5cf6",
        "targetScore": 660,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.71,
        "spawnInterval": 2345,
        "words": [
          {
            "id": "r2_31_1",
            "word": "park",
            "meaningVi": "công viên",
            "category": "Places",
            "emoji": "🌳",
            "pronunciation": "/pɑːk/"
          },
          {
            "id": "r2_31_2",
            "word": "shop",
            "meaningVi": "cửa hàng",
            "category": "Places",
            "emoji": "🏪",
            "pronunciation": "/ʃɒp/"
          },
          {
            "id": "r2_31_3",
            "word": "school",
            "meaningVi": "trường học",
            "category": "Places",
            "emoji": "🏫",
            "pronunciation": "/skuːl/"
          }
        ]
      },
      {
        "id": "lvl-31-2",
        "unitId": "unit-31",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 760,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.76,
        "spawnInterval": 2245,
        "words": [
          {
            "id": "r2_31_4",
            "word": "zoo",
            "meaningVi": "sở thú",
            "category": "Places",
            "emoji": "🦁",
            "pronunciation": "/zuː/"
          },
          {
            "id": "r2_31_5",
            "word": "bank",
            "meaningVi": "ngân hàng",
            "category": "Places",
            "emoji": "🏦",
            "pronunciation": "/bæŋk/"
          }
        ]
      },
      {
        "id": "lvl-31-3",
        "unitId": "unit-31",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 972,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.81,
        "spawnInterval": 2045,
        "words": [
          {
            "id": "r2_31_2",
            "word": "shop",
            "meaningVi": "cửa hàng",
            "category": "Places",
            "emoji": "🏪",
            "pronunciation": "/ʃɒp/"
          },
          {
            "id": "r2_31_3",
            "word": "school",
            "meaningVi": "trường học",
            "category": "Places",
            "emoji": "🏫",
            "pronunciation": "/skuːl/"
          },
          {
            "id": "r2_31_4",
            "word": "zoo",
            "meaningVi": "sở thú",
            "category": "Places",
            "emoji": "🦁",
            "pronunciation": "/zuː/"
          },
          {
            "id": "r2_31_5",
            "word": "bank",
            "meaningVi": "ngân hàng",
            "category": "Places",
            "emoji": "🏦",
            "pronunciation": "/bæŋk/"
          },
          {
            "id": "r2_31_1",
            "word": "park",
            "meaningVi": "công viên",
            "category": "Places",
            "emoji": "🌳",
            "pronunciation": "/pɑːk/"
          }
        ]
      },
      {
        "id": "lvl-31-4",
        "unitId": "unit-31",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 31",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 46,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-31-5",
        "unitId": "unit-31",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1265,
        "xpReward": 56,
        "gemReward": 15,
        "speedMultiplier": 0.83,
        "spawnInterval": 1845,
        "words": [
          {
            "id": "r2_31_1",
            "word": "park",
            "meaningVi": "công viên",
            "category": "Places",
            "emoji": "🌳",
            "pronunciation": "/pɑːk/"
          },
          {
            "id": "r2_31_2",
            "word": "shop",
            "meaningVi": "cửa hàng",
            "category": "Places",
            "emoji": "🏪",
            "pronunciation": "/ʃɒp/"
          },
          {
            "id": "r2_31_3",
            "word": "school",
            "meaningVi": "trường học",
            "category": "Places",
            "emoji": "🏫",
            "pronunciation": "/skuːl/"
          },
          {
            "id": "r2_31_4",
            "word": "zoo",
            "meaningVi": "sở thú",
            "category": "Places",
            "emoji": "🦁",
            "pronunciation": "/zuː/"
          },
          {
            "id": "r2_31_5",
            "word": "bank",
            "meaningVi": "ngân hàng",
            "category": "Places",
            "emoji": "🏦",
            "pronunciation": "/bæŋk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-32",
    "unitNumber": 32,
    "title": "Great Jobs",
    "titleVi": "Nghề Nghiệp Xung Quanh",
    "description": "Bác sĩ tận tâm, cô giáo hiền, đầu bếp tài ba.",
    "icon": "👨‍⚕️",
    "themeColor": "#22c55e",
    "bannerBg": "from-green-500/30 via-emerald-500/20 to-teal-600/30",
    "levels": [
      {
        "id": "lvl-32-1",
        "unitId": "unit-32",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "👨‍⚕️",
        "bgColor": "#22c55e",
        "targetScore": 670,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.71,
        "spawnInterval": 2340,
        "words": [
          {
            "id": "r2_32_1",
            "word": "doctor",
            "meaningVi": "bác sĩ",
            "category": "Jobs",
            "emoji": "👨‍⚕️",
            "pronunciation": "/ˈdɒktər/"
          },
          {
            "id": "r2_32_2",
            "word": "nurse",
            "meaningVi": "y tá",
            "category": "Jobs",
            "emoji": "👩‍⚕️",
            "pronunciation": "/nɜːs/"
          },
          {
            "id": "r2_32_3",
            "word": "pilot",
            "meaningVi": "phi công",
            "category": "Jobs",
            "emoji": "👨‍✈️",
            "pronunciation": "/ˈpaɪlət/"
          }
        ]
      },
      {
        "id": "lvl-32-2",
        "unitId": "unit-32",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 770,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.76,
        "spawnInterval": 2240,
        "words": [
          {
            "id": "r2_32_4",
            "word": "cook",
            "meaningVi": "đầu bếp",
            "category": "Jobs",
            "emoji": "👨‍🍳",
            "pronunciation": "/kʊk/"
          },
          {
            "id": "r2_32_5",
            "word": "teacher",
            "meaningVi": "giáo viên",
            "category": "Jobs",
            "emoji": "👩‍🏫",
            "pronunciation": "/ˈtiːtʃər/"
          }
        ]
      },
      {
        "id": "lvl-32-3",
        "unitId": "unit-32",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 984,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.81,
        "spawnInterval": 2040,
        "words": [
          {
            "id": "r2_32_2",
            "word": "nurse",
            "meaningVi": "y tá",
            "category": "Jobs",
            "emoji": "👩‍⚕️",
            "pronunciation": "/nɜːs/"
          },
          {
            "id": "r2_32_3",
            "word": "pilot",
            "meaningVi": "phi công",
            "category": "Jobs",
            "emoji": "👨‍✈️",
            "pronunciation": "/ˈpaɪlət/"
          },
          {
            "id": "r2_32_4",
            "word": "cook",
            "meaningVi": "đầu bếp",
            "category": "Jobs",
            "emoji": "👨‍🍳",
            "pronunciation": "/kʊk/"
          },
          {
            "id": "r2_32_5",
            "word": "teacher",
            "meaningVi": "giáo viên",
            "category": "Jobs",
            "emoji": "👩‍🏫",
            "pronunciation": "/ˈtiːtʃər/"
          },
          {
            "id": "r2_32_1",
            "word": "doctor",
            "meaningVi": "bác sĩ",
            "category": "Jobs",
            "emoji": "👨‍⚕️",
            "pronunciation": "/ˈdɒktər/"
          }
        ]
      },
      {
        "id": "lvl-32-4",
        "unitId": "unit-32",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 32",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 46,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-32-5",
        "unitId": "unit-32",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1280,
        "xpReward": 56,
        "gemReward": 15,
        "speedMultiplier": 0.83,
        "spawnInterval": 1840,
        "words": [
          {
            "id": "r2_32_1",
            "word": "doctor",
            "meaningVi": "bác sĩ",
            "category": "Jobs",
            "emoji": "👨‍⚕️",
            "pronunciation": "/ˈdɒktər/"
          },
          {
            "id": "r2_32_2",
            "word": "nurse",
            "meaningVi": "y tá",
            "category": "Jobs",
            "emoji": "👩‍⚕️",
            "pronunciation": "/nɜːs/"
          },
          {
            "id": "r2_32_3",
            "word": "pilot",
            "meaningVi": "phi công",
            "category": "Jobs",
            "emoji": "👨‍✈️",
            "pronunciation": "/ˈpaɪlət/"
          },
          {
            "id": "r2_32_4",
            "word": "cook",
            "meaningVi": "đầu bếp",
            "category": "Jobs",
            "emoji": "👨‍🍳",
            "pronunciation": "/kʊk/"
          },
          {
            "id": "r2_32_5",
            "word": "teacher",
            "meaningVi": "giáo viên",
            "category": "Jobs",
            "emoji": "👩‍🏫",
            "pronunciation": "/ˈtiːtʃər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-33",
    "unitNumber": 33,
    "title": "Energetic Breakfast",
    "titleVi": "Bữa Sáng Năng Lượng",
    "description": "Bơ béo ngậy, phô mai thơm lừng và bánh mì nướng giòn.",
    "icon": "🧀",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-500/30 via-yellow-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-33-1",
        "unitId": "unit-33",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧀",
        "bgColor": "#f59e0b",
        "targetScore": 680,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.71,
        "spawnInterval": 2335,
        "words": [
          {
            "id": "r2_33_1",
            "word": "butter",
            "meaningVi": "bơ thực vật / động vật",
            "category": "Food",
            "emoji": "🧈",
            "pronunciation": "/ˈbʌtər/"
          },
          {
            "id": "r2_33_2",
            "word": "cheese",
            "meaningVi": "phô mai",
            "category": "Food",
            "emoji": "🧀",
            "pronunciation": "/tʃiːz/"
          },
          {
            "id": "r2_33_3",
            "word": "cereal",
            "meaningVi": "ngũ cốc",
            "category": "Food",
            "emoji": "🥣",
            "pronunciation": "/ˈsɪəriəl/"
          }
        ]
      },
      {
        "id": "lvl-33-2",
        "unitId": "unit-33",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 780,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.76,
        "spawnInterval": 2235,
        "words": [
          {
            "id": "r2_33_4",
            "word": "bacon",
            "meaningVi": "thịt xông khói",
            "category": "Food",
            "emoji": "🥓",
            "pronunciation": "/ˈbeɪkən/"
          },
          {
            "id": "r2_33_5",
            "word": "toast",
            "meaningVi": "bánh mì nướng",
            "category": "Food",
            "emoji": "🍞",
            "pronunciation": "/təʊst/"
          }
        ]
      },
      {
        "id": "lvl-33-3",
        "unitId": "unit-33",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 996,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.81,
        "spawnInterval": 2035,
        "words": [
          {
            "id": "r2_33_2",
            "word": "cheese",
            "meaningVi": "phô mai",
            "category": "Food",
            "emoji": "🧀",
            "pronunciation": "/tʃiːz/"
          },
          {
            "id": "r2_33_3",
            "word": "cereal",
            "meaningVi": "ngũ cốc",
            "category": "Food",
            "emoji": "🥣",
            "pronunciation": "/ˈsɪəriəl/"
          },
          {
            "id": "r2_33_4",
            "word": "bacon",
            "meaningVi": "thịt xông khói",
            "category": "Food",
            "emoji": "🥓",
            "pronunciation": "/ˈbeɪkən/"
          },
          {
            "id": "r2_33_5",
            "word": "toast",
            "meaningVi": "bánh mì nướng",
            "category": "Food",
            "emoji": "🍞",
            "pronunciation": "/təʊst/"
          },
          {
            "id": "r2_33_1",
            "word": "butter",
            "meaningVi": "bơ thực vật / động vật",
            "category": "Food",
            "emoji": "🧈",
            "pronunciation": "/ˈbʌtər/"
          }
        ]
      },
      {
        "id": "lvl-33-4",
        "unitId": "unit-33",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 33",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 46,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-33-5",
        "unitId": "unit-33",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1295,
        "xpReward": 56,
        "gemReward": 15,
        "speedMultiplier": 0.83,
        "spawnInterval": 1835,
        "words": [
          {
            "id": "r2_33_1",
            "word": "butter",
            "meaningVi": "bơ thực vật / động vật",
            "category": "Food",
            "emoji": "🧈",
            "pronunciation": "/ˈbʌtər/"
          },
          {
            "id": "r2_33_2",
            "word": "cheese",
            "meaningVi": "phô mai",
            "category": "Food",
            "emoji": "🧀",
            "pronunciation": "/tʃiːz/"
          },
          {
            "id": "r2_33_3",
            "word": "cereal",
            "meaningVi": "ngũ cốc",
            "category": "Food",
            "emoji": "🥣",
            "pronunciation": "/ˈsɪəriəl/"
          },
          {
            "id": "r2_33_4",
            "word": "bacon",
            "meaningVi": "thịt xông khói",
            "category": "Food",
            "emoji": "🥓",
            "pronunciation": "/ˈbeɪkən/"
          },
          {
            "id": "r2_33_5",
            "word": "toast",
            "meaningVi": "bánh mì nướng",
            "category": "Food",
            "emoji": "🍞",
            "pronunciation": "/təʊst/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-34",
    "unitNumber": 34,
    "title": "Birthday Party",
    "titleVi": "Sinh Nhật Rộn Ràng",
    "description": "Nến lung linh, bóng bay sắc màu và món quà bất ngờ.",
    "icon": "🎂",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-500/30 via-rose-500/20 to-fuchsia-600/30",
    "levels": [
      {
        "id": "lvl-34-1",
        "unitId": "unit-34",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎂",
        "bgColor": "#ec4899",
        "targetScore": 690,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.72,
        "spawnInterval": 2330,
        "words": [
          {
            "id": "r2_34_1",
            "word": "candle",
            "meaningVi": "cây nến",
            "category": "Party",
            "emoji": "🕯️",
            "pronunciation": "/ˈkændl/"
          },
          {
            "id": "r2_34_2",
            "word": "gift",
            "meaningVi": "món quà",
            "category": "Party",
            "emoji": "🎁",
            "pronunciation": "/ɡɪft/"
          },
          {
            "id": "r2_34_3",
            "word": "balloon",
            "meaningVi": "bóng bay",
            "category": "Party",
            "emoji": "🎈",
            "pronunciation": "/bəˈluːn/"
          }
        ]
      },
      {
        "id": "lvl-34-2",
        "unitId": "unit-34",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 790,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.77,
        "spawnInterval": 2230,
        "words": [
          {
            "id": "r2_34_4",
            "word": "party",
            "meaningVi": "bữa tiệc",
            "category": "Party",
            "emoji": "🎉",
            "pronunciation": "/ˈpɑːti/"
          },
          {
            "id": "r2_34_5",
            "word": "sweet",
            "meaningVi": "kẹo ngọt ngào",
            "category": "Party",
            "emoji": "🍬",
            "pronunciation": "/swiːt/"
          }
        ]
      },
      {
        "id": "lvl-34-3",
        "unitId": "unit-34",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1008,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.82,
        "spawnInterval": 2030,
        "words": [
          {
            "id": "r2_34_2",
            "word": "gift",
            "meaningVi": "món quà",
            "category": "Party",
            "emoji": "🎁",
            "pronunciation": "/ɡɪft/"
          },
          {
            "id": "r2_34_3",
            "word": "balloon",
            "meaningVi": "bóng bay",
            "category": "Party",
            "emoji": "🎈",
            "pronunciation": "/bəˈluːn/"
          },
          {
            "id": "r2_34_4",
            "word": "party",
            "meaningVi": "bữa tiệc",
            "category": "Party",
            "emoji": "🎉",
            "pronunciation": "/ˈpɑːti/"
          },
          {
            "id": "r2_34_5",
            "word": "sweet",
            "meaningVi": "kẹo ngọt ngào",
            "category": "Party",
            "emoji": "🍬",
            "pronunciation": "/swiːt/"
          },
          {
            "id": "r2_34_1",
            "word": "candle",
            "meaningVi": "cây nến",
            "category": "Party",
            "emoji": "🕯️",
            "pronunciation": "/ˈkændl/"
          }
        ]
      },
      {
        "id": "lvl-34-4",
        "unitId": "unit-34",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 34",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 46,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-34-5",
        "unitId": "unit-34",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1310,
        "xpReward": 56,
        "gemReward": 15,
        "speedMultiplier": 0.84,
        "spawnInterval": 1830,
        "words": [
          {
            "id": "r2_34_1",
            "word": "candle",
            "meaningVi": "cây nến",
            "category": "Party",
            "emoji": "🕯️",
            "pronunciation": "/ˈkændl/"
          },
          {
            "id": "r2_34_2",
            "word": "gift",
            "meaningVi": "món quà",
            "category": "Party",
            "emoji": "🎁",
            "pronunciation": "/ɡɪft/"
          },
          {
            "id": "r2_34_3",
            "word": "balloon",
            "meaningVi": "bóng bay",
            "category": "Party",
            "emoji": "🎈",
            "pronunciation": "/bəˈluːn/"
          },
          {
            "id": "r2_34_4",
            "word": "party",
            "meaningVi": "bữa tiệc",
            "category": "Party",
            "emoji": "🎉",
            "pronunciation": "/ˈpɑːti/"
          },
          {
            "id": "r2_34_5",
            "word": "sweet",
            "meaningVi": "kẹo ngọt ngào",
            "category": "Party",
            "emoji": "🍬",
            "pronunciation": "/swiːt/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-35",
    "unitNumber": 35,
    "title": "Musical Instruments",
    "titleVi": "Nhạc Cụ Vui Nhộn",
    "description": "Dương cầm thanh nhã, đàn ghi-ta rộn rã và trống sôi động.",
    "icon": "🎸",
    "themeColor": "#6366f1",
    "bannerBg": "from-indigo-500/30 via-purple-500/20 to-blue-600/30",
    "levels": [
      {
        "id": "lvl-35-1",
        "unitId": "unit-35",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎸",
        "bgColor": "#6366f1",
        "targetScore": 700,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.72,
        "spawnInterval": 2325,
        "words": [
          {
            "id": "r2_35_1",
            "word": "piano",
            "meaningVi": "đàn dương cầm",
            "category": "Music",
            "emoji": "🎹",
            "pronunciation": "/piˈænəʊ/"
          },
          {
            "id": "r2_35_2",
            "word": "guitar",
            "meaningVi": "đàn ghi-ta",
            "category": "Music",
            "emoji": "🎸",
            "pronunciation": "/ɡɪˈtɑːr/"
          },
          {
            "id": "r2_35_3",
            "word": "drum",
            "meaningVi": "cái trống",
            "category": "Music",
            "emoji": "🥁",
            "pronunciation": "/drʌm/"
          }
        ]
      },
      {
        "id": "lvl-35-2",
        "unitId": "unit-35",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 800,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.77,
        "spawnInterval": 2225,
        "words": [
          {
            "id": "r2_35_4",
            "word": "flute",
            "meaningVi": "cây sáo",
            "category": "Music",
            "emoji": "🪈",
            "pronunciation": "/fluːt/"
          },
          {
            "id": "r2_35_5",
            "word": "violin",
            "meaningVi": "đàn vĩ cầm",
            "category": "Music",
            "emoji": "🎻",
            "pronunciation": "/ˌvaɪəˈlɪn/"
          }
        ]
      },
      {
        "id": "lvl-35-3",
        "unitId": "unit-35",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1020,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.82,
        "spawnInterval": 2025,
        "words": [
          {
            "id": "r2_35_2",
            "word": "guitar",
            "meaningVi": "đàn ghi-ta",
            "category": "Music",
            "emoji": "🎸",
            "pronunciation": "/ɡɪˈtɑːr/"
          },
          {
            "id": "r2_35_3",
            "word": "drum",
            "meaningVi": "cái trống",
            "category": "Music",
            "emoji": "🥁",
            "pronunciation": "/drʌm/"
          },
          {
            "id": "r2_35_4",
            "word": "flute",
            "meaningVi": "cây sáo",
            "category": "Music",
            "emoji": "🪈",
            "pronunciation": "/fluːt/"
          },
          {
            "id": "r2_35_5",
            "word": "violin",
            "meaningVi": "đàn vĩ cầm",
            "category": "Music",
            "emoji": "🎻",
            "pronunciation": "/ˌvaɪəˈlɪn/"
          },
          {
            "id": "r2_35_1",
            "word": "piano",
            "meaningVi": "đàn dương cầm",
            "category": "Music",
            "emoji": "🎹",
            "pronunciation": "/piˈænəʊ/"
          }
        ]
      },
      {
        "id": "lvl-35-4",
        "unitId": "unit-35",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 35",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 47,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-35-5",
        "unitId": "unit-35",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1325,
        "xpReward": 57,
        "gemReward": 15,
        "speedMultiplier": 0.84,
        "spawnInterval": 1825,
        "words": [
          {
            "id": "r2_35_1",
            "word": "piano",
            "meaningVi": "đàn dương cầm",
            "category": "Music",
            "emoji": "🎹",
            "pronunciation": "/piˈænəʊ/"
          },
          {
            "id": "r2_35_2",
            "word": "guitar",
            "meaningVi": "đàn ghi-ta",
            "category": "Music",
            "emoji": "🎸",
            "pronunciation": "/ɡɪˈtɑːr/"
          },
          {
            "id": "r2_35_3",
            "word": "drum",
            "meaningVi": "cái trống",
            "category": "Music",
            "emoji": "🥁",
            "pronunciation": "/drʌm/"
          },
          {
            "id": "r2_35_4",
            "word": "flute",
            "meaningVi": "cây sáo",
            "category": "Music",
            "emoji": "🪈",
            "pronunciation": "/fluːt/"
          },
          {
            "id": "r2_35_5",
            "word": "violin",
            "meaningVi": "đàn vĩ cầm",
            "category": "Music",
            "emoji": "🎻",
            "pronunciation": "/ˌvaɪəˈlɪn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-36",
    "unitNumber": 36,
    "title": "Ocean Giants",
    "titleVi": "Động Vật Đại Dương",
    "description": "Cá heo thông minh, cá mập săn mồi và rùa biển thong dong.",
    "icon": "🐬",
    "themeColor": "#0284c7",
    "bannerBg": "from-sky-500/30 via-blue-500/20 to-teal-600/30",
    "levels": [
      {
        "id": "lvl-36-1",
        "unitId": "unit-36",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🐬",
        "bgColor": "#0284c7",
        "targetScore": 710,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.72,
        "spawnInterval": 2320,
        "words": [
          {
            "id": "r2_36_1",
            "word": "dolphin",
            "meaningVi": "cá heo",
            "category": "Ocean",
            "emoji": "🐬",
            "pronunciation": "/ˈdɒlfɪn/"
          },
          {
            "id": "r2_36_2",
            "word": "shark",
            "meaningVi": "cá mập",
            "category": "Ocean",
            "emoji": "🦈",
            "pronunciation": "/ʃɑːk/"
          },
          {
            "id": "r2_36_3",
            "word": "turtle",
            "meaningVi": "con rùa",
            "category": "Ocean",
            "emoji": "🐢",
            "pronunciation": "/ˈtɜːtl/"
          }
        ]
      },
      {
        "id": "lvl-36-2",
        "unitId": "unit-36",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 810,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.77,
        "spawnInterval": 2220,
        "words": [
          {
            "id": "r2_36_4",
            "word": "octopus",
            "meaningVi": "bạch tuộc",
            "category": "Ocean",
            "emoji": "🐙",
            "pronunciation": "/ˈɒktəpəs/"
          },
          {
            "id": "r2_36_5",
            "word": "coral",
            "meaningVi": "san hô",
            "category": "Ocean",
            "emoji": "🪸",
            "pronunciation": "/ˈkɒrəl/"
          }
        ]
      },
      {
        "id": "lvl-36-3",
        "unitId": "unit-36",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1032,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.82,
        "spawnInterval": 2020,
        "words": [
          {
            "id": "r2_36_2",
            "word": "shark",
            "meaningVi": "cá mập",
            "category": "Ocean",
            "emoji": "🦈",
            "pronunciation": "/ʃɑːk/"
          },
          {
            "id": "r2_36_3",
            "word": "turtle",
            "meaningVi": "con rùa",
            "category": "Ocean",
            "emoji": "🐢",
            "pronunciation": "/ˈtɜːtl/"
          },
          {
            "id": "r2_36_4",
            "word": "octopus",
            "meaningVi": "bạch tuộc",
            "category": "Ocean",
            "emoji": "🐙",
            "pronunciation": "/ˈɒktəpəs/"
          },
          {
            "id": "r2_36_5",
            "word": "coral",
            "meaningVi": "san hô",
            "category": "Ocean",
            "emoji": "🪸",
            "pronunciation": "/ˈkɒrəl/"
          },
          {
            "id": "r2_36_1",
            "word": "dolphin",
            "meaningVi": "cá heo",
            "category": "Ocean",
            "emoji": "🐬",
            "pronunciation": "/ˈdɒlfɪn/"
          }
        ]
      },
      {
        "id": "lvl-36-4",
        "unitId": "unit-36",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 36",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 47,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-36-5",
        "unitId": "unit-36",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1340,
        "xpReward": 57,
        "gemReward": 15,
        "speedMultiplier": 0.84,
        "spawnInterval": 1820,
        "words": [
          {
            "id": "r2_36_1",
            "word": "dolphin",
            "meaningVi": "cá heo",
            "category": "Ocean",
            "emoji": "🐬",
            "pronunciation": "/ˈdɒlfɪn/"
          },
          {
            "id": "r2_36_2",
            "word": "shark",
            "meaningVi": "cá mập",
            "category": "Ocean",
            "emoji": "🦈",
            "pronunciation": "/ʃɑːk/"
          },
          {
            "id": "r2_36_3",
            "word": "turtle",
            "meaningVi": "con rùa",
            "category": "Ocean",
            "emoji": "🐢",
            "pronunciation": "/ˈtɜːtl/"
          },
          {
            "id": "r2_36_4",
            "word": "octopus",
            "meaningVi": "bạch tuộc",
            "category": "Ocean",
            "emoji": "🐙",
            "pronunciation": "/ˈɒktəpəs/"
          },
          {
            "id": "r2_36_5",
            "word": "coral",
            "meaningVi": "san hô",
            "category": "Ocean",
            "emoji": "🪸",
            "pronunciation": "/ˈkɒrəl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-37",
    "unitNumber": 37,
    "title": "Safari Animals",
    "titleVi": "Động Vật Châu Phi",
    "description": "Ngựa vằn sọc trắng đen, hươu cao cổ và báo đốm siêu tốc.",
    "icon": "🦓",
    "themeColor": "#d97706",
    "bannerBg": "from-amber-500/30 via-orange-500/20 to-yellow-600/30",
    "levels": [
      {
        "id": "lvl-37-1",
        "unitId": "unit-37",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🦓",
        "bgColor": "#d97706",
        "targetScore": 720,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.73,
        "spawnInterval": 2315,
        "words": [
          {
            "id": "r2_37_1",
            "word": "zebra",
            "meaningVi": "ngựa vằn",
            "category": "Safari",
            "emoji": "🦓",
            "pronunciation": "/ˈzebrə/"
          },
          {
            "id": "r2_37_2",
            "word": "tiger",
            "meaningVi": "con hổ",
            "category": "Safari",
            "emoji": "🐯",
            "pronunciation": "/ˈtaɪɡər/"
          },
          {
            "id": "r2_37_3",
            "word": "giraffe",
            "meaningVi": "hươu cao cổ",
            "category": "Safari",
            "emoji": "🦒",
            "pronunciation": "/dʒəˈrɑːf/"
          }
        ]
      },
      {
        "id": "lvl-37-2",
        "unitId": "unit-37",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 820,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.78,
        "spawnInterval": 2215,
        "words": [
          {
            "id": "r2_37_4",
            "word": "hippo",
            "meaningVi": "hà mã",
            "category": "Safari",
            "emoji": "🦛",
            "pronunciation": "/ˈhɪpəʊ/"
          },
          {
            "id": "r2_37_5",
            "word": "cheetah",
            "meaningVi": "báo săn",
            "category": "Safari",
            "emoji": "🐆",
            "pronunciation": "/ˈtʃiːtə/"
          }
        ]
      },
      {
        "id": "lvl-37-3",
        "unitId": "unit-37",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1044,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.83,
        "spawnInterval": 2015,
        "words": [
          {
            "id": "r2_37_2",
            "word": "tiger",
            "meaningVi": "con hổ",
            "category": "Safari",
            "emoji": "🐯",
            "pronunciation": "/ˈtaɪɡər/"
          },
          {
            "id": "r2_37_3",
            "word": "giraffe",
            "meaningVi": "hươu cao cổ",
            "category": "Safari",
            "emoji": "🦒",
            "pronunciation": "/dʒəˈrɑːf/"
          },
          {
            "id": "r2_37_4",
            "word": "hippo",
            "meaningVi": "hà mã",
            "category": "Safari",
            "emoji": "🦛",
            "pronunciation": "/ˈhɪpəʊ/"
          },
          {
            "id": "r2_37_5",
            "word": "cheetah",
            "meaningVi": "báo săn",
            "category": "Safari",
            "emoji": "🐆",
            "pronunciation": "/ˈtʃiːtə/"
          },
          {
            "id": "r2_37_1",
            "word": "zebra",
            "meaningVi": "ngựa vằn",
            "category": "Safari",
            "emoji": "🦓",
            "pronunciation": "/ˈzebrə/"
          }
        ]
      },
      {
        "id": "lvl-37-4",
        "unitId": "unit-37",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 37",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 47,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-37-5",
        "unitId": "unit-37",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1355,
        "xpReward": 57,
        "gemReward": 15,
        "speedMultiplier": 0.85,
        "spawnInterval": 1815,
        "words": [
          {
            "id": "r2_37_1",
            "word": "zebra",
            "meaningVi": "ngựa vằn",
            "category": "Safari",
            "emoji": "🦓",
            "pronunciation": "/ˈzebrə/"
          },
          {
            "id": "r2_37_2",
            "word": "tiger",
            "meaningVi": "con hổ",
            "category": "Safari",
            "emoji": "🐯",
            "pronunciation": "/ˈtaɪɡər/"
          },
          {
            "id": "r2_37_3",
            "word": "giraffe",
            "meaningVi": "hươu cao cổ",
            "category": "Safari",
            "emoji": "🦒",
            "pronunciation": "/dʒəˈrɑːf/"
          },
          {
            "id": "r2_37_4",
            "word": "hippo",
            "meaningVi": "hà mã",
            "category": "Safari",
            "emoji": "🦛",
            "pronunciation": "/ˈhɪpəʊ/"
          },
          {
            "id": "r2_37_5",
            "word": "cheetah",
            "meaningVi": "báo săn",
            "category": "Safari",
            "emoji": "🐆",
            "pronunciation": "/ˈtʃiːtə/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-38",
    "unitNumber": 38,
    "title": "Garden Vegetables",
    "titleVi": "Rau Củ Tươi Ngon",
    "description": "Cà rốt giòn ngọt, khoai tây thơm và cà chua mọng nước.",
    "icon": "🥕",
    "themeColor": "#16a34a",
    "bannerBg": "from-green-500/30 via-emerald-500/20 to-teal-600/30",
    "levels": [
      {
        "id": "lvl-38-1",
        "unitId": "unit-38",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🥕",
        "bgColor": "#16a34a",
        "targetScore": 730,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.73,
        "spawnInterval": 2310,
        "words": [
          {
            "id": "r2_38_1",
            "word": "carrot",
            "meaningVi": "cà rốt",
            "category": "Garden",
            "emoji": "🥕",
            "pronunciation": "/ˈkærət/"
          },
          {
            "id": "r2_38_2",
            "word": "potato",
            "meaningVi": "khoai tây",
            "category": "Garden",
            "emoji": "🥔",
            "pronunciation": "/pəˈteɪtəʊ/"
          },
          {
            "id": "r2_38_3",
            "word": "tomato",
            "meaningVi": "cà chua",
            "category": "Garden",
            "emoji": "🍅",
            "pronunciation": "/təˈmɑːtəʊ/"
          }
        ]
      },
      {
        "id": "lvl-38-2",
        "unitId": "unit-38",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 830,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.78,
        "spawnInterval": 2210,
        "words": [
          {
            "id": "r2_38_4",
            "word": "onion",
            "meaningVi": "củ hành tây",
            "category": "Garden",
            "emoji": "🧅",
            "pronunciation": "/ˈʌnjən/"
          },
          {
            "id": "r2_38_5",
            "word": "pepper",
            "meaningVi": "ớt chuông / hạt tiêu",
            "category": "Garden",
            "emoji": "🫑",
            "pronunciation": "/ˈpepər/"
          }
        ]
      },
      {
        "id": "lvl-38-3",
        "unitId": "unit-38",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1056,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.83,
        "spawnInterval": 2010,
        "words": [
          {
            "id": "r2_38_2",
            "word": "potato",
            "meaningVi": "khoai tây",
            "category": "Garden",
            "emoji": "🥔",
            "pronunciation": "/pəˈteɪtəʊ/"
          },
          {
            "id": "r2_38_3",
            "word": "tomato",
            "meaningVi": "cà chua",
            "category": "Garden",
            "emoji": "🍅",
            "pronunciation": "/təˈmɑːtəʊ/"
          },
          {
            "id": "r2_38_4",
            "word": "onion",
            "meaningVi": "củ hành tây",
            "category": "Garden",
            "emoji": "🧅",
            "pronunciation": "/ˈʌnjən/"
          },
          {
            "id": "r2_38_5",
            "word": "pepper",
            "meaningVi": "ớt chuông / hạt tiêu",
            "category": "Garden",
            "emoji": "🫑",
            "pronunciation": "/ˈpepər/"
          },
          {
            "id": "r2_38_1",
            "word": "carrot",
            "meaningVi": "cà rốt",
            "category": "Garden",
            "emoji": "🥕",
            "pronunciation": "/ˈkærət/"
          }
        ]
      },
      {
        "id": "lvl-38-4",
        "unitId": "unit-38",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 38",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 47,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-38-5",
        "unitId": "unit-38",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1370,
        "xpReward": 57,
        "gemReward": 15,
        "speedMultiplier": 0.85,
        "spawnInterval": 1810,
        "words": [
          {
            "id": "r2_38_1",
            "word": "carrot",
            "meaningVi": "cà rốt",
            "category": "Garden",
            "emoji": "🥕",
            "pronunciation": "/ˈkærət/"
          },
          {
            "id": "r2_38_2",
            "word": "potato",
            "meaningVi": "khoai tây",
            "category": "Garden",
            "emoji": "🥔",
            "pronunciation": "/pəˈteɪtəʊ/"
          },
          {
            "id": "r2_38_3",
            "word": "tomato",
            "meaningVi": "cà chua",
            "category": "Garden",
            "emoji": "🍅",
            "pronunciation": "/təˈmɑːtəʊ/"
          },
          {
            "id": "r2_38_4",
            "word": "onion",
            "meaningVi": "củ hành tây",
            "category": "Garden",
            "emoji": "🧅",
            "pronunciation": "/ˈʌnjən/"
          },
          {
            "id": "r2_38_5",
            "word": "pepper",
            "meaningVi": "ớt chuông / hạt tiêu",
            "category": "Garden",
            "emoji": "🫑",
            "pronunciation": "/ˈpepər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-39",
    "unitNumber": 39,
    "title": "Green Garden",
    "titleVi": "Khu Vườn Xanh Mát",
    "description": "Cây cối trổ hoa, hạt mầm vươn mình và hàng rào trắng.",
    "icon": "🌻",
    "themeColor": "#84cc16",
    "bannerBg": "from-lime-500/30 via-emerald-500/20 to-green-600/30",
    "levels": [
      {
        "id": "lvl-39-1",
        "unitId": "unit-39",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌻",
        "bgColor": "#84cc16",
        "targetScore": 740,
        "xpReward": 23,
        "gemReward": 5,
        "speedMultiplier": 0.73,
        "spawnInterval": 2305,
        "words": [
          {
            "id": "r2_39_1",
            "word": "flower",
            "meaningVi": "bông hoa",
            "category": "Garden",
            "emoji": "🌸",
            "pronunciation": "/ˈflaʊər/"
          },
          {
            "id": "r2_39_2",
            "word": "plant",
            "meaningVi": "cây trồng",
            "category": "Garden",
            "emoji": "🪴",
            "pronunciation": "/plɑːnt/"
          },
          {
            "id": "r2_39_3",
            "word": "seed",
            "meaningVi": "hạt giống",
            "category": "Garden",
            "emoji": "🌰",
            "pronunciation": "/siːd/"
          }
        ]
      },
      {
        "id": "lvl-39-2",
        "unitId": "unit-39",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 840,
        "xpReward": 28,
        "gemReward": 6,
        "speedMultiplier": 0.78,
        "spawnInterval": 2205,
        "words": [
          {
            "id": "r2_39_4",
            "word": "fence",
            "meaningVi": "hàng rào",
            "category": "Garden",
            "emoji": "🧱",
            "pronunciation": "/fens/"
          },
          {
            "id": "r2_39_5",
            "word": "shovel",
            "meaningVi": "cái xẻng làm vườn",
            "category": "Garden",
            "emoji": "🪴",
            "pronunciation": "/ˈʃʌvl/"
          }
        ]
      },
      {
        "id": "lvl-39-3",
        "unitId": "unit-39",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1068,
        "xpReward": 33,
        "gemReward": 8,
        "speedMultiplier": 0.83,
        "spawnInterval": 2005,
        "words": [
          {
            "id": "r2_39_2",
            "word": "plant",
            "meaningVi": "cây trồng",
            "category": "Garden",
            "emoji": "🪴",
            "pronunciation": "/plɑːnt/"
          },
          {
            "id": "r2_39_3",
            "word": "seed",
            "meaningVi": "hạt giống",
            "category": "Garden",
            "emoji": "🌰",
            "pronunciation": "/siːd/"
          },
          {
            "id": "r2_39_4",
            "word": "fence",
            "meaningVi": "hàng rào",
            "category": "Garden",
            "emoji": "🧱",
            "pronunciation": "/fens/"
          },
          {
            "id": "r2_39_5",
            "word": "shovel",
            "meaningVi": "cái xẻng làm vườn",
            "category": "Garden",
            "emoji": "🪴",
            "pronunciation": "/ˈʃʌvl/"
          },
          {
            "id": "r2_39_1",
            "word": "flower",
            "meaningVi": "bông hoa",
            "category": "Garden",
            "emoji": "🌸",
            "pronunciation": "/ˈflaʊər/"
          }
        ]
      },
      {
        "id": "lvl-39-4",
        "unitId": "unit-39",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 39",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 47,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-39-5",
        "unitId": "unit-39",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1385,
        "xpReward": 57,
        "gemReward": 15,
        "speedMultiplier": 0.85,
        "spawnInterval": 1805,
        "words": [
          {
            "id": "r2_39_1",
            "word": "flower",
            "meaningVi": "bông hoa",
            "category": "Garden",
            "emoji": "🌸",
            "pronunciation": "/ˈflaʊər/"
          },
          {
            "id": "r2_39_2",
            "word": "plant",
            "meaningVi": "cây trồng",
            "category": "Garden",
            "emoji": "🪴",
            "pronunciation": "/plɑːnt/"
          },
          {
            "id": "r2_39_3",
            "word": "seed",
            "meaningVi": "hạt giống",
            "category": "Garden",
            "emoji": "🌰",
            "pronunciation": "/siːd/"
          },
          {
            "id": "r2_39_4",
            "word": "fence",
            "meaningVi": "hàng rào",
            "category": "Garden",
            "emoji": "🧱",
            "pronunciation": "/fens/"
          },
          {
            "id": "r2_39_5",
            "word": "shovel",
            "meaningVi": "cái xẻng làm vườn",
            "category": "Garden",
            "emoji": "🪴",
            "pronunciation": "/ˈʃʌvl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-40",
    "unitNumber": 40,
    "title": "Cozy Bedroom",
    "titleVi": "Phòng Ngủ Ấm Áp",
    "description": "Gối êm, chăn bông ấm cúng và chiếc đồng hồ báo thức.",
    "icon": "🛏️",
    "themeColor": "#6366f1",
    "bannerBg": "from-indigo-500/30 via-purple-500/20 to-blue-600/30",
    "levels": [
      {
        "id": "lvl-40-1",
        "unitId": "unit-40",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🛏️",
        "bgColor": "#6366f1",
        "targetScore": 750,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.74,
        "spawnInterval": 2300,
        "words": [
          {
            "id": "r2_40_1",
            "word": "pillow",
            "meaningVi": "chiếc gối",
            "category": "Home",
            "emoji": "🛋️",
            "pronunciation": "/ˈpɪləʊ/"
          },
          {
            "id": "r2_40_2",
            "word": "blanket",
            "meaningVi": "chăn ấm",
            "category": "Home",
            "emoji": "🛏️",
            "pronunciation": "/ˈblæŋkɪt/"
          },
          {
            "id": "r2_40_3",
            "word": "mirror",
            "meaningVi": "chiếc gương",
            "category": "Home",
            "emoji": "🪞",
            "pronunciation": "/ˈmɪrər/"
          }
        ]
      },
      {
        "id": "lvl-40-2",
        "unitId": "unit-40",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 850,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.79,
        "spawnInterval": 2200,
        "words": [
          {
            "id": "r2_40_4",
            "word": "clock",
            "meaningVi": "đồng hồ",
            "category": "Home",
            "emoji": "⏰",
            "pronunciation": "/klɒk/"
          },
          {
            "id": "r2_40_5",
            "word": "closet",
            "meaningVi": "tủ quần áo",
            "category": "Home",
            "emoji": "🚪",
            "pronunciation": "/ˈklɒzɪt/"
          }
        ]
      },
      {
        "id": "lvl-40-3",
        "unitId": "unit-40",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1080,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.84,
        "spawnInterval": 2000,
        "words": [
          {
            "id": "r2_40_2",
            "word": "blanket",
            "meaningVi": "chăn ấm",
            "category": "Home",
            "emoji": "🛏️",
            "pronunciation": "/ˈblæŋkɪt/"
          },
          {
            "id": "r2_40_3",
            "word": "mirror",
            "meaningVi": "chiếc gương",
            "category": "Home",
            "emoji": "🪞",
            "pronunciation": "/ˈmɪrər/"
          },
          {
            "id": "r2_40_4",
            "word": "clock",
            "meaningVi": "đồng hồ",
            "category": "Home",
            "emoji": "⏰",
            "pronunciation": "/klɒk/"
          },
          {
            "id": "r2_40_5",
            "word": "closet",
            "meaningVi": "tủ quần áo",
            "category": "Home",
            "emoji": "🚪",
            "pronunciation": "/ˈklɒzɪt/"
          },
          {
            "id": "r2_40_1",
            "word": "pillow",
            "meaningVi": "chiếc gối",
            "category": "Home",
            "emoji": "🛋️",
            "pronunciation": "/ˈpɪləʊ/"
          }
        ]
      },
      {
        "id": "lvl-40-4",
        "unitId": "unit-40",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 40",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 48,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-40-5",
        "unitId": "unit-40",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1400,
        "xpReward": 58,
        "gemReward": 15,
        "speedMultiplier": 0.86,
        "spawnInterval": 1800,
        "words": [
          {
            "id": "r2_40_1",
            "word": "pillow",
            "meaningVi": "chiếc gối",
            "category": "Home",
            "emoji": "🛋️",
            "pronunciation": "/ˈpɪləʊ/"
          },
          {
            "id": "r2_40_2",
            "word": "blanket",
            "meaningVi": "chăn ấm",
            "category": "Home",
            "emoji": "🛏️",
            "pronunciation": "/ˈblæŋkɪt/"
          },
          {
            "id": "r2_40_3",
            "word": "mirror",
            "meaningVi": "chiếc gương",
            "category": "Home",
            "emoji": "🪞",
            "pronunciation": "/ˈmɪrər/"
          },
          {
            "id": "r2_40_4",
            "word": "clock",
            "meaningVi": "đồng hồ",
            "category": "Home",
            "emoji": "⏰",
            "pronunciation": "/klɒk/"
          },
          {
            "id": "r2_40_5",
            "word": "closet",
            "meaningVi": "tủ quần áo",
            "category": "Home",
            "emoji": "🚪",
            "pronunciation": "/ˈklɒzɪt/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-41",
    "unitNumber": 41,
    "title": "Morning Habits",
    "titleVi": "Thói Quen Buổi Sáng",
    "description": "Thức dậy, rửa mặt, chải tóc và thay đồng phục.",
    "icon": "☀️",
    "themeColor": "#eab308",
    "bannerBg": "from-yellow-500/30 via-amber-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-41-1",
        "unitId": "unit-41",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "☀️",
        "bgColor": "#eab308",
        "targetScore": 760,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.74,
        "spawnInterval": 2295,
        "words": [
          {
            "id": "r2_41_1",
            "word": "wake",
            "meaningVi": "thức giấc",
            "category": "Habits",
            "emoji": "🥱",
            "pronunciation": "/weɪk/"
          },
          {
            "id": "r2_41_2",
            "word": "wash",
            "meaningVi": "rửa mặt / tay",
            "category": "Habits",
            "emoji": "🧼",
            "pronunciation": "/wɒʃ/"
          },
          {
            "id": "r2_41_3",
            "word": "brush",
            "meaningVi": "đánh răng",
            "category": "Habits",
            "emoji": "🪥",
            "pronunciation": "/brʌʃ/"
          }
        ]
      },
      {
        "id": "lvl-41-2",
        "unitId": "unit-41",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 860,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.79,
        "spawnInterval": 2195,
        "words": [
          {
            "id": "r2_41_4",
            "word": "comb",
            "meaningVi": "chải đầu",
            "category": "Habits",
            "emoji": "🪮",
            "pronunciation": "/kəʊm/"
          },
          {
            "id": "r2_41_5",
            "word": "dress",
            "meaningVi": "mặc quần áo",
            "category": "Habits",
            "emoji": "👕",
            "pronunciation": "/dres/"
          }
        ]
      },
      {
        "id": "lvl-41-3",
        "unitId": "unit-41",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1092,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.84,
        "spawnInterval": 1995,
        "words": [
          {
            "id": "r2_41_2",
            "word": "wash",
            "meaningVi": "rửa mặt / tay",
            "category": "Habits",
            "emoji": "🧼",
            "pronunciation": "/wɒʃ/"
          },
          {
            "id": "r2_41_3",
            "word": "brush",
            "meaningVi": "đánh răng",
            "category": "Habits",
            "emoji": "🪥",
            "pronunciation": "/brʌʃ/"
          },
          {
            "id": "r2_41_4",
            "word": "comb",
            "meaningVi": "chải đầu",
            "category": "Habits",
            "emoji": "🪮",
            "pronunciation": "/kəʊm/"
          },
          {
            "id": "r2_41_5",
            "word": "dress",
            "meaningVi": "mặc quần áo",
            "category": "Habits",
            "emoji": "👕",
            "pronunciation": "/dres/"
          },
          {
            "id": "r2_41_1",
            "word": "wake",
            "meaningVi": "thức giấc",
            "category": "Habits",
            "emoji": "🥱",
            "pronunciation": "/weɪk/"
          }
        ]
      },
      {
        "id": "lvl-41-4",
        "unitId": "unit-41",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 41",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 48,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-41-5",
        "unitId": "unit-41",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1415,
        "xpReward": 58,
        "gemReward": 15,
        "speedMultiplier": 0.86,
        "spawnInterval": 1795,
        "words": [
          {
            "id": "r2_41_1",
            "word": "wake",
            "meaningVi": "thức giấc",
            "category": "Habits",
            "emoji": "🥱",
            "pronunciation": "/weɪk/"
          },
          {
            "id": "r2_41_2",
            "word": "wash",
            "meaningVi": "rửa mặt / tay",
            "category": "Habits",
            "emoji": "🧼",
            "pronunciation": "/wɒʃ/"
          },
          {
            "id": "r2_41_3",
            "word": "brush",
            "meaningVi": "đánh răng",
            "category": "Habits",
            "emoji": "🪥",
            "pronunciation": "/brʌʃ/"
          },
          {
            "id": "r2_41_4",
            "word": "comb",
            "meaningVi": "chải đầu",
            "category": "Habits",
            "emoji": "🪮",
            "pronunciation": "/kəʊm/"
          },
          {
            "id": "r2_41_5",
            "word": "dress",
            "meaningVi": "mặc quần áo",
            "category": "Habits",
            "emoji": "👕",
            "pronunciation": "/dres/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-42",
    "unitNumber": 42,
    "title": "Night Routine",
    "titleVi": "Thói Quen Buổi Tối",
    "description": "Nghe kể chuyện, ngủ say giấc và có giấc mơ đẹp.",
    "icon": "🌙",
    "themeColor": "#4338ca",
    "bannerBg": "from-indigo-600/30 via-purple-600/20 to-slate-700/30",
    "levels": [
      {
        "id": "lvl-42-1",
        "unitId": "unit-42",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌙",
        "bgColor": "#4338ca",
        "targetScore": 770,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.74,
        "spawnInterval": 2290,
        "words": [
          {
            "id": "r2_42_1",
            "word": "story",
            "meaningVi": "câu chuyện",
            "category": "Night",
            "emoji": "📖",
            "pronunciation": "/ˈstɔːri/"
          },
          {
            "id": "r2_42_2",
            "word": "sleep",
            "meaningVi": "ngủ say",
            "category": "Night",
            "emoji": "😴",
            "pronunciation": "/sliːp/"
          },
          {
            "id": "r2_42_3",
            "word": "dream",
            "meaningVi": "giấc mơ",
            "category": "Night",
            "emoji": "✨",
            "pronunciation": "/driːm/"
          }
        ]
      },
      {
        "id": "lvl-42-2",
        "unitId": "unit-42",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 870,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.79,
        "spawnInterval": 2190,
        "words": [
          {
            "id": "r2_42_4",
            "word": "night",
            "meaningVi": "ban đêm",
            "category": "Night",
            "emoji": "🌌",
            "pronunciation": "/naɪt/"
          }
        ]
      },
      {
        "id": "lvl-42-3",
        "unitId": "unit-42",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1104,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.84,
        "spawnInterval": 1990,
        "words": [
          {
            "id": "r2_42_2",
            "word": "sleep",
            "meaningVi": "ngủ say",
            "category": "Night",
            "emoji": "😴",
            "pronunciation": "/sliːp/"
          },
          {
            "id": "r2_42_3",
            "word": "dream",
            "meaningVi": "giấc mơ",
            "category": "Night",
            "emoji": "✨",
            "pronunciation": "/driːm/"
          },
          {
            "id": "r2_42_4",
            "word": "night",
            "meaningVi": "ban đêm",
            "category": "Night",
            "emoji": "🌌",
            "pronunciation": "/naɪt/"
          },
          {
            "id": "r2_42_1",
            "word": "story",
            "meaningVi": "câu chuyện",
            "category": "Night",
            "emoji": "📖",
            "pronunciation": "/ˈstɔːri/"
          }
        ]
      },
      {
        "id": "lvl-42-4",
        "unitId": "unit-42",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 42",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 48,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-42-5",
        "unitId": "unit-42",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1430,
        "xpReward": 58,
        "gemReward": 15,
        "speedMultiplier": 0.86,
        "spawnInterval": 1790,
        "words": [
          {
            "id": "r2_42_1",
            "word": "story",
            "meaningVi": "câu chuyện",
            "category": "Night",
            "emoji": "📖",
            "pronunciation": "/ˈstɔːri/"
          },
          {
            "id": "r2_42_2",
            "word": "sleep",
            "meaningVi": "ngủ say",
            "category": "Night",
            "emoji": "😴",
            "pronunciation": "/sliːp/"
          },
          {
            "id": "r2_42_3",
            "word": "dream",
            "meaningVi": "giấc mơ",
            "category": "Night",
            "emoji": "✨",
            "pronunciation": "/driːm/"
          },
          {
            "id": "r2_42_4",
            "word": "night",
            "meaningVi": "ban đêm",
            "category": "Night",
            "emoji": "🌌",
            "pronunciation": "/naɪt/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-43",
    "unitNumber": 43,
    "title": "Supermarket Run",
    "titleVi": "Đi Siêu Thị Mua Sắm",
    "description": "Giỏ mua hàng, quầy tính tiền và nhiều đồ ăn vặt.",
    "icon": "🛒",
    "themeColor": "#f97316",
    "bannerBg": "from-orange-500/30 via-amber-500/20 to-red-600/30",
    "levels": [
      {
        "id": "lvl-43-1",
        "unitId": "unit-43",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🛒",
        "bgColor": "#f97316",
        "targetScore": 780,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.75,
        "spawnInterval": 2285,
        "words": [
          {
            "id": "r2_43_1",
            "word": "basket",
            "meaningVi": "giỏ mua sắm",
            "category": "Shopping",
            "emoji": "🧺",
            "pronunciation": "/ˈbɑːskɪt/"
          },
          {
            "id": "r2_43_2",
            "word": "cart",
            "meaningVi": "xe đẩy hàng",
            "category": "Shopping",
            "emoji": "🛒",
            "pronunciation": "/kɑːt/"
          },
          {
            "id": "r2_43_3",
            "word": "snack",
            "meaningVi": "món ăn vặt",
            "category": "Shopping",
            "emoji": "🍿",
            "pronunciation": "/snæk/"
          }
        ]
      },
      {
        "id": "lvl-43-2",
        "unitId": "unit-43",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 880,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.8,
        "spawnInterval": 2185,
        "words": [
          {
            "id": "r2_43_4",
            "word": "price",
            "meaningVi": "giá tiền",
            "category": "Shopping",
            "emoji": "🏷️",
            "pronunciation": "/praɪs/"
          },
          {
            "id": "r2_43_5",
            "word": "coin",
            "meaningVi": "đồng xu",
            "category": "Shopping",
            "emoji": "🪙",
            "pronunciation": "/kɔɪn/"
          }
        ]
      },
      {
        "id": "lvl-43-3",
        "unitId": "unit-43",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1116,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.85,
        "spawnInterval": 1985,
        "words": [
          {
            "id": "r2_43_2",
            "word": "cart",
            "meaningVi": "xe đẩy hàng",
            "category": "Shopping",
            "emoji": "🛒",
            "pronunciation": "/kɑːt/"
          },
          {
            "id": "r2_43_3",
            "word": "snack",
            "meaningVi": "món ăn vặt",
            "category": "Shopping",
            "emoji": "🍿",
            "pronunciation": "/snæk/"
          },
          {
            "id": "r2_43_4",
            "word": "price",
            "meaningVi": "giá tiền",
            "category": "Shopping",
            "emoji": "🏷️",
            "pronunciation": "/praɪs/"
          },
          {
            "id": "r2_43_5",
            "word": "coin",
            "meaningVi": "đồng xu",
            "category": "Shopping",
            "emoji": "🪙",
            "pronunciation": "/kɔɪn/"
          },
          {
            "id": "r2_43_1",
            "word": "basket",
            "meaningVi": "giỏ mua sắm",
            "category": "Shopping",
            "emoji": "🧺",
            "pronunciation": "/ˈbɑːskɪt/"
          }
        ]
      },
      {
        "id": "lvl-43-4",
        "unitId": "unit-43",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 43",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 48,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-43-5",
        "unitId": "unit-43",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1445,
        "xpReward": 58,
        "gemReward": 15,
        "speedMultiplier": 0.87,
        "spawnInterval": 1785,
        "words": [
          {
            "id": "r2_43_1",
            "word": "basket",
            "meaningVi": "giỏ mua sắm",
            "category": "Shopping",
            "emoji": "🧺",
            "pronunciation": "/ˈbɑːskɪt/"
          },
          {
            "id": "r2_43_2",
            "word": "cart",
            "meaningVi": "xe đẩy hàng",
            "category": "Shopping",
            "emoji": "🛒",
            "pronunciation": "/kɑːt/"
          },
          {
            "id": "r2_43_3",
            "word": "snack",
            "meaningVi": "món ăn vặt",
            "category": "Shopping",
            "emoji": "🍿",
            "pronunciation": "/snæk/"
          },
          {
            "id": "r2_43_4",
            "word": "price",
            "meaningVi": "giá tiền",
            "category": "Shopping",
            "emoji": "🏷️",
            "pronunciation": "/praɪs/"
          },
          {
            "id": "r2_43_5",
            "word": "coin",
            "meaningVi": "đồng xu",
            "category": "Shopping",
            "emoji": "🪙",
            "pronunciation": "/kɔɪn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-44",
    "unitNumber": 44,
    "title": "Seasonal Clothes",
    "titleVi": "Trang Phục Bốn Mùa",
    "description": "Áo khoác ấm, găng tay len và khăn quàng cổ.",
    "icon": "🧥",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-500/30 via-purple-500/20 to-rose-600/30",
    "levels": [
      {
        "id": "lvl-44-1",
        "unitId": "unit-44",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧥",
        "bgColor": "#ec4899",
        "targetScore": 790,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.75,
        "spawnInterval": 2280,
        "words": [
          {
            "id": "r2_44_1",
            "word": "jacket",
            "meaningVi": "áo khoác",
            "category": "Clothes",
            "emoji": "🧥",
            "pronunciation": "/ˈdʒækɪt/"
          },
          {
            "id": "r2_44_2",
            "word": "coat",
            "meaningVi": "áo choàng dài",
            "category": "Clothes",
            "emoji": "🥼",
            "pronunciation": "/kəʊt/"
          },
          {
            "id": "r2_44_3",
            "word": "gloves",
            "meaningVi": "đôi găng tay",
            "category": "Clothes",
            "emoji": "🧤",
            "pronunciation": "/ɡlʌvz/"
          }
        ]
      },
      {
        "id": "lvl-44-2",
        "unitId": "unit-44",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 890,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.8,
        "spawnInterval": 2180,
        "words": [
          {
            "id": "r2_44_4",
            "word": "scarf",
            "meaningVi": "khăn quàng",
            "category": "Clothes",
            "emoji": "🧣",
            "pronunciation": "/skɑːf/"
          },
          {
            "id": "r2_44_5",
            "word": "boots",
            "meaningVi": "đôi ủng / bốt",
            "category": "Clothes",
            "emoji": "👢",
            "pronunciation": "/buːts/"
          }
        ]
      },
      {
        "id": "lvl-44-3",
        "unitId": "unit-44",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1128,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.85,
        "spawnInterval": 1980,
        "words": [
          {
            "id": "r2_44_2",
            "word": "coat",
            "meaningVi": "áo choàng dài",
            "category": "Clothes",
            "emoji": "🥼",
            "pronunciation": "/kəʊt/"
          },
          {
            "id": "r2_44_3",
            "word": "gloves",
            "meaningVi": "đôi găng tay",
            "category": "Clothes",
            "emoji": "🧤",
            "pronunciation": "/ɡlʌvz/"
          },
          {
            "id": "r2_44_4",
            "word": "scarf",
            "meaningVi": "khăn quàng",
            "category": "Clothes",
            "emoji": "🧣",
            "pronunciation": "/skɑːf/"
          },
          {
            "id": "r2_44_5",
            "word": "boots",
            "meaningVi": "đôi ủng / bốt",
            "category": "Clothes",
            "emoji": "👢",
            "pronunciation": "/buːts/"
          },
          {
            "id": "r2_44_1",
            "word": "jacket",
            "meaningVi": "áo khoác",
            "category": "Clothes",
            "emoji": "🧥",
            "pronunciation": "/ˈdʒækɪt/"
          }
        ]
      },
      {
        "id": "lvl-44-4",
        "unitId": "unit-44",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 44",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 48,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-44-5",
        "unitId": "unit-44",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1460,
        "xpReward": 58,
        "gemReward": 15,
        "speedMultiplier": 0.87,
        "spawnInterval": 1780,
        "words": [
          {
            "id": "r2_44_1",
            "word": "jacket",
            "meaningVi": "áo khoác",
            "category": "Clothes",
            "emoji": "🧥",
            "pronunciation": "/ˈdʒækɪt/"
          },
          {
            "id": "r2_44_2",
            "word": "coat",
            "meaningVi": "áo choàng dài",
            "category": "Clothes",
            "emoji": "🥼",
            "pronunciation": "/kəʊt/"
          },
          {
            "id": "r2_44_3",
            "word": "gloves",
            "meaningVi": "đôi găng tay",
            "category": "Clothes",
            "emoji": "🧤",
            "pronunciation": "/ɡlʌvz/"
          },
          {
            "id": "r2_44_4",
            "word": "scarf",
            "meaningVi": "khăn quàng",
            "category": "Clothes",
            "emoji": "🧣",
            "pronunciation": "/skɑːf/"
          },
          {
            "id": "r2_44_5",
            "word": "boots",
            "meaningVi": "đôi ủng / bốt",
            "category": "Clothes",
            "emoji": "👢",
            "pronunciation": "/buːts/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-45",
    "unitNumber": 45,
    "title": "Expressing Emotions",
    "titleVi": "Cảm Xúc Đa Dạng",
    "description": "Háo hức mong chờ, tự hào, dũng cảm và kiên cường.",
    "icon": "🤩",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-500/30 via-teal-500/20 to-emerald-600/30",
    "levels": [
      {
        "id": "lvl-45-1",
        "unitId": "unit-45",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🤩",
        "bgColor": "#06b6d4",
        "targetScore": 800,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.75,
        "spawnInterval": 2275,
        "words": [
          {
            "id": "r2_45_1",
            "word": "excited",
            "meaningVi": "háo hức",
            "category": "Emotions",
            "emoji": "🤩",
            "pronunciation": "/ɪkˈsaɪtɪd/"
          },
          {
            "id": "r2_45_2",
            "word": "proud",
            "meaningVi": "tự hào",
            "category": "Emotions",
            "emoji": "😎",
            "pronunciation": "/praʊd/"
          },
          {
            "id": "r2_45_3",
            "word": "tired",
            "meaningVi": "mệt mỏi",
            "category": "Emotions",
            "emoji": "🥱",
            "pronunciation": "/ˈtaɪəd/"
          }
        ]
      },
      {
        "id": "lvl-45-2",
        "unitId": "unit-45",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 900,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.8,
        "spawnInterval": 2175,
        "words": [
          {
            "id": "r2_45_4",
            "word": "brave",
            "meaningVi": "dũng cảm",
            "category": "Emotions",
            "emoji": "🦁",
            "pronunciation": "/breɪv/"
          },
          {
            "id": "r2_45_5",
            "word": "silly",
            "meaningVi": "ngốc nghếch hài hước",
            "category": "Emotions",
            "emoji": "🤪",
            "pronunciation": "/ˈsɪli/"
          }
        ]
      },
      {
        "id": "lvl-45-3",
        "unitId": "unit-45",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1140,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.85,
        "spawnInterval": 1975,
        "words": [
          {
            "id": "r2_45_2",
            "word": "proud",
            "meaningVi": "tự hào",
            "category": "Emotions",
            "emoji": "😎",
            "pronunciation": "/praʊd/"
          },
          {
            "id": "r2_45_3",
            "word": "tired",
            "meaningVi": "mệt mỏi",
            "category": "Emotions",
            "emoji": "🥱",
            "pronunciation": "/ˈtaɪəd/"
          },
          {
            "id": "r2_45_4",
            "word": "brave",
            "meaningVi": "dũng cảm",
            "category": "Emotions",
            "emoji": "🦁",
            "pronunciation": "/breɪv/"
          },
          {
            "id": "r2_45_5",
            "word": "silly",
            "meaningVi": "ngốc nghếch hài hước",
            "category": "Emotions",
            "emoji": "🤪",
            "pronunciation": "/ˈsɪli/"
          },
          {
            "id": "r2_45_1",
            "word": "excited",
            "meaningVi": "háo hức",
            "category": "Emotions",
            "emoji": "🤩",
            "pronunciation": "/ɪkˈsaɪtɪd/"
          }
        ]
      },
      {
        "id": "lvl-45-4",
        "unitId": "unit-45",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 45",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 49,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-45-5",
        "unitId": "unit-45",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1475,
        "xpReward": 59,
        "gemReward": 15,
        "speedMultiplier": 0.87,
        "spawnInterval": 1775,
        "words": [
          {
            "id": "r2_45_1",
            "word": "excited",
            "meaningVi": "háo hức",
            "category": "Emotions",
            "emoji": "🤩",
            "pronunciation": "/ɪkˈsaɪtɪd/"
          },
          {
            "id": "r2_45_2",
            "word": "proud",
            "meaningVi": "tự hào",
            "category": "Emotions",
            "emoji": "😎",
            "pronunciation": "/praʊd/"
          },
          {
            "id": "r2_45_3",
            "word": "tired",
            "meaningVi": "mệt mỏi",
            "category": "Emotions",
            "emoji": "🥱",
            "pronunciation": "/ˈtaɪəd/"
          },
          {
            "id": "r2_45_4",
            "word": "brave",
            "meaningVi": "dũng cảm",
            "category": "Emotions",
            "emoji": "🦁",
            "pronunciation": "/breɪv/"
          },
          {
            "id": "r2_45_5",
            "word": "silly",
            "meaningVi": "ngốc nghếch hài hước",
            "category": "Emotions",
            "emoji": "🤪",
            "pronunciation": "/ˈsɪli/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-46",
    "unitNumber": 46,
    "title": "Outdoor Fun",
    "titleVi": "Hoạt Động Ngoài Trời",
    "description": "Dã ngoại cắm trại, leo núi ngắm cảnh và câu cá.",
    "icon": "🏕️",
    "themeColor": "#15803d",
    "bannerBg": "from-green-600/30 via-emerald-600/20 to-teal-700/30",
    "levels": [
      {
        "id": "lvl-46-1",
        "unitId": "unit-46",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏕️",
        "bgColor": "#15803d",
        "targetScore": 810,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.76,
        "spawnInterval": 2270,
        "words": [
          {
            "id": "r2_46_1",
            "word": "picnic",
            "meaningVi": "chuyến dã ngoại",
            "category": "Outdoors",
            "emoji": "🧺",
            "pronunciation": "/ˈpɪknɪk/"
          },
          {
            "id": "r2_46_2",
            "word": "camp",
            "meaningVi": "cắm trại",
            "category": "Outdoors",
            "emoji": "⛺",
            "pronunciation": "/kæmp/"
          },
          {
            "id": "r2_46_3",
            "word": "hike",
            "meaningVi": "đi bộ leo núi",
            "category": "Outdoors",
            "emoji": "🥾",
            "pronunciation": "/haɪk/"
          }
        ]
      },
      {
        "id": "lvl-46-2",
        "unitId": "unit-46",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 910,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.81,
        "spawnInterval": 2170,
        "words": [
          {
            "id": "r2_46_4",
            "word": "climb",
            "meaningVi": "leo trèo",
            "category": "Outdoors",
            "emoji": "🧗",
            "pronunciation": "/klaɪm/"
          },
          {
            "id": "r2_46_5",
            "word": "fish",
            "meaningVi": "câu cá",
            "category": "Outdoors",
            "emoji": "🎣",
            "pronunciation": "/fɪʃ/"
          }
        ]
      },
      {
        "id": "lvl-46-3",
        "unitId": "unit-46",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1152,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.86,
        "spawnInterval": 1970,
        "words": [
          {
            "id": "r2_46_2",
            "word": "camp",
            "meaningVi": "cắm trại",
            "category": "Outdoors",
            "emoji": "⛺",
            "pronunciation": "/kæmp/"
          },
          {
            "id": "r2_46_3",
            "word": "hike",
            "meaningVi": "đi bộ leo núi",
            "category": "Outdoors",
            "emoji": "🥾",
            "pronunciation": "/haɪk/"
          },
          {
            "id": "r2_46_4",
            "word": "climb",
            "meaningVi": "leo trèo",
            "category": "Outdoors",
            "emoji": "🧗",
            "pronunciation": "/klaɪm/"
          },
          {
            "id": "r2_46_5",
            "word": "fish",
            "meaningVi": "câu cá",
            "category": "Outdoors",
            "emoji": "🎣",
            "pronunciation": "/fɪʃ/"
          },
          {
            "id": "r2_46_1",
            "word": "picnic",
            "meaningVi": "chuyến dã ngoại",
            "category": "Outdoors",
            "emoji": "🧺",
            "pronunciation": "/ˈpɪknɪk/"
          }
        ]
      },
      {
        "id": "lvl-46-4",
        "unitId": "unit-46",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 46",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 49,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-46-5",
        "unitId": "unit-46",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1490,
        "xpReward": 59,
        "gemReward": 15,
        "speedMultiplier": 0.88,
        "spawnInterval": 1770,
        "words": [
          {
            "id": "r2_46_1",
            "word": "picnic",
            "meaningVi": "chuyến dã ngoại",
            "category": "Outdoors",
            "emoji": "🧺",
            "pronunciation": "/ˈpɪknɪk/"
          },
          {
            "id": "r2_46_2",
            "word": "camp",
            "meaningVi": "cắm trại",
            "category": "Outdoors",
            "emoji": "⛺",
            "pronunciation": "/kæmp/"
          },
          {
            "id": "r2_46_3",
            "word": "hike",
            "meaningVi": "đi bộ leo núi",
            "category": "Outdoors",
            "emoji": "🥾",
            "pronunciation": "/haɪk/"
          },
          {
            "id": "r2_46_4",
            "word": "climb",
            "meaningVi": "leo trèo",
            "category": "Outdoors",
            "emoji": "🧗",
            "pronunciation": "/klaɪm/"
          },
          {
            "id": "r2_46_5",
            "word": "fish",
            "meaningVi": "câu cá",
            "category": "Outdoors",
            "emoji": "🎣",
            "pronunciation": "/fɪʃ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-47",
    "unitNumber": 47,
    "title": "Fairytale Magic",
    "titleVi": "Thế Giới Cổ Tích",
    "description": "Hoàng tử, lâu đài nguy nga, rồng lửa và phù thủy tài phép.",
    "icon": "🧙‍♂️",
    "themeColor": "#7c3aed",
    "bannerBg": "from-purple-600/30 via-violet-600/20 to-indigo-700/30",
    "levels": [
      {
        "id": "lvl-47-1",
        "unitId": "unit-47",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧙‍♂️",
        "bgColor": "#7c3aed",
        "targetScore": 820,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.76,
        "spawnInterval": 2265,
        "words": [
          {
            "id": "r2_47_1",
            "word": "prince",
            "meaningVi": "hoàng tử",
            "category": "Fantasy",
            "emoji": "🤴",
            "pronunciation": "/prɪns/"
          },
          {
            "id": "r2_47_2",
            "word": "castle",
            "meaningVi": "lâu đài",
            "category": "Fantasy",
            "emoji": "🏰",
            "pronunciation": "/ˈkɑːsl/"
          },
          {
            "id": "r2_47_3",
            "word": "magic",
            "meaningVi": "phép thuật",
            "category": "Fantasy",
            "emoji": "🪄",
            "pronunciation": "/ˈmædʒɪk/"
          }
        ]
      },
      {
        "id": "lvl-47-2",
        "unitId": "unit-47",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 920,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.81,
        "spawnInterval": 2165,
        "words": [
          {
            "id": "r2_47_4",
            "word": "dragon",
            "meaningVi": "con rồng",
            "category": "Fantasy",
            "emoji": "🐉",
            "pronunciation": "/ˈdræɡən/"
          },
          {
            "id": "r2_47_5",
            "word": "wizard",
            "meaningVi": "phù thủy",
            "category": "Fantasy",
            "emoji": "🧙",
            "pronunciation": "/ˈwɪzəd/"
          }
        ]
      },
      {
        "id": "lvl-47-3",
        "unitId": "unit-47",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1164,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.86,
        "spawnInterval": 1965,
        "words": [
          {
            "id": "r2_47_2",
            "word": "castle",
            "meaningVi": "lâu đài",
            "category": "Fantasy",
            "emoji": "🏰",
            "pronunciation": "/ˈkɑːsl/"
          },
          {
            "id": "r2_47_3",
            "word": "magic",
            "meaningVi": "phép thuật",
            "category": "Fantasy",
            "emoji": "🪄",
            "pronunciation": "/ˈmædʒɪk/"
          },
          {
            "id": "r2_47_4",
            "word": "dragon",
            "meaningVi": "con rồng",
            "category": "Fantasy",
            "emoji": "🐉",
            "pronunciation": "/ˈdræɡən/"
          },
          {
            "id": "r2_47_5",
            "word": "wizard",
            "meaningVi": "phù thủy",
            "category": "Fantasy",
            "emoji": "🧙",
            "pronunciation": "/ˈwɪzəd/"
          },
          {
            "id": "r2_47_1",
            "word": "prince",
            "meaningVi": "hoàng tử",
            "category": "Fantasy",
            "emoji": "🤴",
            "pronunciation": "/prɪns/"
          }
        ]
      },
      {
        "id": "lvl-47-4",
        "unitId": "unit-47",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 47",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 49,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-47-5",
        "unitId": "unit-47",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1505,
        "xpReward": 59,
        "gemReward": 15,
        "speedMultiplier": 0.88,
        "spawnInterval": 1765,
        "words": [
          {
            "id": "r2_47_1",
            "word": "prince",
            "meaningVi": "hoàng tử",
            "category": "Fantasy",
            "emoji": "🤴",
            "pronunciation": "/prɪns/"
          },
          {
            "id": "r2_47_2",
            "word": "castle",
            "meaningVi": "lâu đài",
            "category": "Fantasy",
            "emoji": "🏰",
            "pronunciation": "/ˈkɑːsl/"
          },
          {
            "id": "r2_47_3",
            "word": "magic",
            "meaningVi": "phép thuật",
            "category": "Fantasy",
            "emoji": "🪄",
            "pronunciation": "/ˈmædʒɪk/"
          },
          {
            "id": "r2_47_4",
            "word": "dragon",
            "meaningVi": "con rồng",
            "category": "Fantasy",
            "emoji": "🐉",
            "pronunciation": "/ˈdræɡən/"
          },
          {
            "id": "r2_47_5",
            "word": "wizard",
            "meaningVi": "phù thủy",
            "category": "Fantasy",
            "emoji": "🧙",
            "pronunciation": "/ˈwɪzəd/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-48",
    "unitNumber": 48,
    "title": "Childhood Games",
    "titleVi": "Trò Chơi Tuổi Thơ",
    "description": "Ghép hình, cờ vua, đánh bài và xích đu sân trường.",
    "icon": "♟️",
    "themeColor": "#e11d48",
    "bannerBg": "from-rose-500/30 via-pink-500/20 to-red-600/30",
    "levels": [
      {
        "id": "lvl-48-1",
        "unitId": "unit-48",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "♟️",
        "bgColor": "#e11d48",
        "targetScore": 830,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.76,
        "spawnInterval": 2260,
        "words": [
          {
            "id": "r2_48_1",
            "word": "puzzle",
            "meaningVi": "trò ghép hình",
            "category": "Games",
            "emoji": "🧩",
            "pronunciation": "/ˈpʌzl/"
          },
          {
            "id": "r2_48_2",
            "word": "chess",
            "meaningVi": "cờ vua",
            "category": "Games",
            "emoji": "♟️",
            "pronunciation": "/tʃes/"
          },
          {
            "id": "r2_48_3",
            "word": "cards",
            "meaningVi": "bài lá",
            "category": "Games",
            "emoji": "🃏",
            "pronunciation": "/kɑːdz/"
          }
        ]
      },
      {
        "id": "lvl-48-2",
        "unitId": "unit-48",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 930,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.81,
        "spawnInterval": 2160,
        "words": [
          {
            "id": "r2_48_4",
            "word": "blocks",
            "meaningVi": "khối đồ chơi xếp hình",
            "category": "Games",
            "emoji": "🧱",
            "pronunciation": "/blɒks/"
          },
          {
            "id": "r2_48_5",
            "word": "swing",
            "meaningVi": "xích đu",
            "category": "Games",
            "emoji": "🪢",
            "pronunciation": "/swɪŋ/"
          }
        ]
      },
      {
        "id": "lvl-48-3",
        "unitId": "unit-48",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1176,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.86,
        "spawnInterval": 1960,
        "words": [
          {
            "id": "r2_48_2",
            "word": "chess",
            "meaningVi": "cờ vua",
            "category": "Games",
            "emoji": "♟️",
            "pronunciation": "/tʃes/"
          },
          {
            "id": "r2_48_3",
            "word": "cards",
            "meaningVi": "bài lá",
            "category": "Games",
            "emoji": "🃏",
            "pronunciation": "/kɑːdz/"
          },
          {
            "id": "r2_48_4",
            "word": "blocks",
            "meaningVi": "khối đồ chơi xếp hình",
            "category": "Games",
            "emoji": "🧱",
            "pronunciation": "/blɒks/"
          },
          {
            "id": "r2_48_5",
            "word": "swing",
            "meaningVi": "xích đu",
            "category": "Games",
            "emoji": "🪢",
            "pronunciation": "/swɪŋ/"
          },
          {
            "id": "r2_48_1",
            "word": "puzzle",
            "meaningVi": "trò ghép hình",
            "category": "Games",
            "emoji": "🧩",
            "pronunciation": "/ˈpʌzl/"
          }
        ]
      },
      {
        "id": "lvl-48-4",
        "unitId": "unit-48",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 48",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 49,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-48-5",
        "unitId": "unit-48",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1520,
        "xpReward": 59,
        "gemReward": 15,
        "speedMultiplier": 0.88,
        "spawnInterval": 1760,
        "words": [
          {
            "id": "r2_48_1",
            "word": "puzzle",
            "meaningVi": "trò ghép hình",
            "category": "Games",
            "emoji": "🧩",
            "pronunciation": "/ˈpʌzl/"
          },
          {
            "id": "r2_48_2",
            "word": "chess",
            "meaningVi": "cờ vua",
            "category": "Games",
            "emoji": "♟️",
            "pronunciation": "/tʃes/"
          },
          {
            "id": "r2_48_3",
            "word": "cards",
            "meaningVi": "bài lá",
            "category": "Games",
            "emoji": "🃏",
            "pronunciation": "/kɑːdz/"
          },
          {
            "id": "r2_48_4",
            "word": "blocks",
            "meaningVi": "khối đồ chơi xếp hình",
            "category": "Games",
            "emoji": "🧱",
            "pronunciation": "/blɒks/"
          },
          {
            "id": "r2_48_5",
            "word": "swing",
            "meaningVi": "xích đu",
            "category": "Games",
            "emoji": "🪢",
            "pronunciation": "/swɪŋ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-49",
    "unitNumber": 49,
    "title": "Climate Words",
    "titleVi": "Thời Tiết & Khí Hậu",
    "description": "Nhiều mây, bão gió, tuyết rơi và sương mù mờ ảo.",
    "icon": "🌪️",
    "themeColor": "#0891b2",
    "bannerBg": "from-cyan-600/30 via-sky-600/20 to-blue-700/30",
    "levels": [
      {
        "id": "lvl-49-1",
        "unitId": "unit-49",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌪️",
        "bgColor": "#0891b2",
        "targetScore": 840,
        "xpReward": 24,
        "gemReward": 5,
        "speedMultiplier": 0.77,
        "spawnInterval": 2255,
        "words": [
          {
            "id": "r2_49_1",
            "word": "cloudy",
            "meaningVi": "nhiều mây",
            "category": "Weather",
            "emoji": "☁️",
            "pronunciation": "/ˈklaʊdi/"
          },
          {
            "id": "r2_49_2",
            "word": "stormy",
            "meaningVi": "có bão",
            "category": "Weather",
            "emoji": "⛈️",
            "pronunciation": "/ˈstɔːmi/"
          },
          {
            "id": "r2_49_3",
            "word": "snowy",
            "meaningVi": "có tuyết",
            "category": "Weather",
            "emoji": "🌨️",
            "pronunciation": "/ˈsnəʊi/"
          }
        ]
      },
      {
        "id": "lvl-49-2",
        "unitId": "unit-49",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 940,
        "xpReward": 29,
        "gemReward": 6,
        "speedMultiplier": 0.82,
        "spawnInterval": 2155,
        "words": [
          {
            "id": "r2_49_4",
            "word": "windy",
            "meaningVi": "nhiều gió",
            "category": "Weather",
            "emoji": "💨",
            "pronunciation": "/ˈwɪndi/"
          },
          {
            "id": "r2_49_5",
            "word": "foggy",
            "meaningVi": "có sương mù",
            "category": "Weather",
            "emoji": "🌫️",
            "pronunciation": "/ˈfɒɡi/"
          }
        ]
      },
      {
        "id": "lvl-49-3",
        "unitId": "unit-49",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1188,
        "xpReward": 34,
        "gemReward": 8,
        "speedMultiplier": 0.87,
        "spawnInterval": 1955,
        "words": [
          {
            "id": "r2_49_2",
            "word": "stormy",
            "meaningVi": "có bão",
            "category": "Weather",
            "emoji": "⛈️",
            "pronunciation": "/ˈstɔːmi/"
          },
          {
            "id": "r2_49_3",
            "word": "snowy",
            "meaningVi": "có tuyết",
            "category": "Weather",
            "emoji": "🌨️",
            "pronunciation": "/ˈsnəʊi/"
          },
          {
            "id": "r2_49_4",
            "word": "windy",
            "meaningVi": "nhiều gió",
            "category": "Weather",
            "emoji": "💨",
            "pronunciation": "/ˈwɪndi/"
          },
          {
            "id": "r2_49_5",
            "word": "foggy",
            "meaningVi": "có sương mù",
            "category": "Weather",
            "emoji": "🌫️",
            "pronunciation": "/ˈfɒɡi/"
          },
          {
            "id": "r2_49_1",
            "word": "cloudy",
            "meaningVi": "nhiều mây",
            "category": "Weather",
            "emoji": "☁️",
            "pronunciation": "/ˈklaʊdi/"
          }
        ]
      },
      {
        "id": "lvl-49-4",
        "unitId": "unit-49",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 49",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 49,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-49-5",
        "unitId": "unit-49",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1535,
        "xpReward": 59,
        "gemReward": 15,
        "speedMultiplier": 0.89,
        "spawnInterval": 1755,
        "words": [
          {
            "id": "r2_49_1",
            "word": "cloudy",
            "meaningVi": "nhiều mây",
            "category": "Weather",
            "emoji": "☁️",
            "pronunciation": "/ˈklaʊdi/"
          },
          {
            "id": "r2_49_2",
            "word": "stormy",
            "meaningVi": "có bão",
            "category": "Weather",
            "emoji": "⛈️",
            "pronunciation": "/ˈstɔːmi/"
          },
          {
            "id": "r2_49_3",
            "word": "snowy",
            "meaningVi": "có tuyết",
            "category": "Weather",
            "emoji": "🌨️",
            "pronunciation": "/ˈsnəʊi/"
          },
          {
            "id": "r2_49_4",
            "word": "windy",
            "meaningVi": "nhiều gió",
            "category": "Weather",
            "emoji": "💨",
            "pronunciation": "/ˈwɪndi/"
          },
          {
            "id": "r2_49_5",
            "word": "foggy",
            "meaningVi": "có sương mù",
            "category": "Weather",
            "emoji": "🌫️",
            "pronunciation": "/ˈfɒɡi/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-50",
    "unitNumber": 50,
    "title": "Busy City",
    "titleVi": "Thành Phố Nhộn Nhịp",
    "description": "Cây cầu bắc ngang sông, đèn giao thông và tháp cao.",
    "icon": "🌉",
    "themeColor": "#4f46e5",
    "bannerBg": "from-indigo-600/30 via-violet-600/20 to-purple-700/30",
    "levels": [
      {
        "id": "lvl-50-1",
        "unitId": "unit-50",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌉",
        "bgColor": "#4f46e5",
        "targetScore": 850,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.77,
        "spawnInterval": 2250,
        "words": [
          {
            "id": "r2_50_1",
            "word": "bridge",
            "meaningVi": "cây cầu",
            "category": "City",
            "emoji": "🌉",
            "pronunciation": "/brɪdʒ/"
          },
          {
            "id": "r2_50_2",
            "word": "street",
            "meaningVi": "con đường phố",
            "category": "City",
            "emoji": "🛣️",
            "pronunciation": "/striːt/"
          },
          {
            "id": "r2_50_3",
            "word": "light",
            "meaningVi": "đèn đường / ánh sáng",
            "category": "City",
            "emoji": "🚦",
            "pronunciation": "/laɪt/"
          }
        ]
      },
      {
        "id": "lvl-50-2",
        "unitId": "unit-50",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 950,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.82,
        "spawnInterval": 2150,
        "words": [
          {
            "id": "r2_50_4",
            "word": "tower",
            "meaningVi": "tòa tháp",
            "category": "City",
            "emoji": "🗼",
            "pronunciation": "/ˈtaʊər/"
          },
          {
            "id": "r2_50_5",
            "word": "market",
            "meaningVi": "chợ dân sinh",
            "category": "City",
            "emoji": "🏬",
            "pronunciation": "/ˈmɑːkɪt/"
          }
        ]
      },
      {
        "id": "lvl-50-3",
        "unitId": "unit-50",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1200,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.87,
        "spawnInterval": 1950,
        "words": [
          {
            "id": "r2_50_2",
            "word": "street",
            "meaningVi": "con đường phố",
            "category": "City",
            "emoji": "🛣️",
            "pronunciation": "/striːt/"
          },
          {
            "id": "r2_50_3",
            "word": "light",
            "meaningVi": "đèn đường / ánh sáng",
            "category": "City",
            "emoji": "🚦",
            "pronunciation": "/laɪt/"
          },
          {
            "id": "r2_50_4",
            "word": "tower",
            "meaningVi": "tòa tháp",
            "category": "City",
            "emoji": "🗼",
            "pronunciation": "/ˈtaʊər/"
          },
          {
            "id": "r2_50_5",
            "word": "market",
            "meaningVi": "chợ dân sinh",
            "category": "City",
            "emoji": "🏬",
            "pronunciation": "/ˈmɑːkɪt/"
          },
          {
            "id": "r2_50_1",
            "word": "bridge",
            "meaningVi": "cây cầu",
            "category": "City",
            "emoji": "🌉",
            "pronunciation": "/brɪdʒ/"
          }
        ]
      },
      {
        "id": "lvl-50-4",
        "unitId": "unit-50",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 50",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 50,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-50-5",
        "unitId": "unit-50",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1550,
        "xpReward": 60,
        "gemReward": 15,
        "speedMultiplier": 0.89,
        "spawnInterval": 1750,
        "words": [
          {
            "id": "r2_50_1",
            "word": "bridge",
            "meaningVi": "cây cầu",
            "category": "City",
            "emoji": "🌉",
            "pronunciation": "/brɪdʒ/"
          },
          {
            "id": "r2_50_2",
            "word": "street",
            "meaningVi": "con đường phố",
            "category": "City",
            "emoji": "🛣️",
            "pronunciation": "/striːt/"
          },
          {
            "id": "r2_50_3",
            "word": "light",
            "meaningVi": "đèn đường / ánh sáng",
            "category": "City",
            "emoji": "🚦",
            "pronunciation": "/laɪt/"
          },
          {
            "id": "r2_50_4",
            "word": "tower",
            "meaningVi": "tòa tháp",
            "category": "City",
            "emoji": "🗼",
            "pronunciation": "/ˈtaʊər/"
          },
          {
            "id": "r2_50_5",
            "word": "market",
            "meaningVi": "chợ dân sinh",
            "category": "City",
            "emoji": "🏬",
            "pronunciation": "/ˈmɑːkɪt/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-51",
    "unitNumber": 51,
    "title": "Peaceful Village",
    "titleVi": "Làng Quê Yên Bình",
    "description": "Cánh đồng lúa chín vàng, ao sen và mái nhà tranh thanh bình.",
    "icon": "🌾",
    "themeColor": "#16a34a",
    "bannerBg": "from-green-600/30 via-lime-600/20 to-emerald-700/30",
    "levels": [
      {
        "id": "lvl-51-1",
        "unitId": "unit-51",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌾",
        "bgColor": "#16a34a",
        "targetScore": 860,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.77,
        "spawnInterval": 2245,
        "words": [
          {
            "id": "r2_51_1",
            "word": "field",
            "meaningVi": "cánh đồng",
            "category": "Village",
            "emoji": "🌾",
            "pronunciation": "/fiːld/"
          },
          {
            "id": "r2_51_2",
            "word": "pond",
            "meaningVi": "cái ao nhỏ",
            "category": "Village",
            "emoji": "💧",
            "pronunciation": "/pɒnd/"
          },
          {
            "id": "r2_51_3",
            "word": "farm",
            "meaningVi": "nông trại",
            "category": "Village",
            "emoji": "🚜",
            "pronunciation": "/fɑːm/"
          }
        ]
      },
      {
        "id": "lvl-51-2",
        "unitId": "unit-51",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 960,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.82,
        "spawnInterval": 2145,
        "words": [
          {
            "id": "r2_51_4",
            "word": "cottage",
            "meaningVi": "nhà tranh",
            "category": "Village",
            "emoji": "🏡",
            "pronunciation": "/ˈkɒtɪdʒ/"
          }
        ]
      },
      {
        "id": "lvl-51-3",
        "unitId": "unit-51",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1212,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.87,
        "spawnInterval": 1945,
        "words": [
          {
            "id": "r2_51_2",
            "word": "pond",
            "meaningVi": "cái ao nhỏ",
            "category": "Village",
            "emoji": "💧",
            "pronunciation": "/pɒnd/"
          },
          {
            "id": "r2_51_3",
            "word": "farm",
            "meaningVi": "nông trại",
            "category": "Village",
            "emoji": "🚜",
            "pronunciation": "/fɑːm/"
          },
          {
            "id": "r2_51_4",
            "word": "cottage",
            "meaningVi": "nhà tranh",
            "category": "Village",
            "emoji": "🏡",
            "pronunciation": "/ˈkɒtɪdʒ/"
          },
          {
            "id": "r2_51_1",
            "word": "field",
            "meaningVi": "cánh đồng",
            "category": "Village",
            "emoji": "🌾",
            "pronunciation": "/fiːld/"
          }
        ]
      },
      {
        "id": "lvl-51-4",
        "unitId": "unit-51",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 51",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 50,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-51-5",
        "unitId": "unit-51",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1565,
        "xpReward": 60,
        "gemReward": 15,
        "speedMultiplier": 0.89,
        "spawnInterval": 1745,
        "words": [
          {
            "id": "r2_51_1",
            "word": "field",
            "meaningVi": "cánh đồng",
            "category": "Village",
            "emoji": "🌾",
            "pronunciation": "/fiːld/"
          },
          {
            "id": "r2_51_2",
            "word": "pond",
            "meaningVi": "cái ao nhỏ",
            "category": "Village",
            "emoji": "💧",
            "pronunciation": "/pɒnd/"
          },
          {
            "id": "r2_51_3",
            "word": "farm",
            "meaningVi": "nông trại",
            "category": "Village",
            "emoji": "🚜",
            "pronunciation": "/fɑːm/"
          },
          {
            "id": "r2_51_4",
            "word": "cottage",
            "meaningVi": "nhà tranh",
            "category": "Village",
            "emoji": "🏡",
            "pronunciation": "/ˈkɒtɪdʒ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-52",
    "unitNumber": 52,
    "title": "Rich Color Shades",
    "titleVi": "Sắc Màu Phong Phú",
    "description": "Màu tím mộng mơ, màu cam ấm, ánh bạc và nâu đất.",
    "icon": "🎨",
    "themeColor": "#9333ea",
    "bannerBg": "from-purple-600/30 via-fuchsia-600/20 to-pink-700/30",
    "levels": [
      {
        "id": "lvl-52-1",
        "unitId": "unit-52",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎨",
        "bgColor": "#9333ea",
        "targetScore": 870,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.78,
        "spawnInterval": 2240,
        "words": [
          {
            "id": "r2_52_1",
            "word": "purple",
            "meaningVi": "màu tím",
            "category": "Colors",
            "emoji": "🟣",
            "pronunciation": "/ˈpɜːpl/"
          },
          {
            "id": "r2_52_2",
            "word": "orange",
            "meaningVi": "màu cam",
            "category": "Colors",
            "emoji": "🟠",
            "pronunciation": "/ˈɒrɪndʒ/"
          },
          {
            "id": "r2_52_3",
            "word": "silver",
            "meaningVi": "màu bạc",
            "category": "Colors",
            "emoji": "🥈",
            "pronunciation": "/ˈsɪlvər/"
          }
        ]
      },
      {
        "id": "lvl-52-2",
        "unitId": "unit-52",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 970,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.83,
        "spawnInterval": 2140,
        "words": [
          {
            "id": "r2_52_4",
            "word": "golden",
            "meaningVi": "màu óng ánh vàng",
            "category": "Colors",
            "emoji": "🥇",
            "pronunciation": "/ˈɡəʊldən/"
          },
          {
            "id": "r2_52_5",
            "word": "brown",
            "meaningVi": "màu nâu",
            "category": "Colors",
            "emoji": "🟤",
            "pronunciation": "/braʊn/"
          }
        ]
      },
      {
        "id": "lvl-52-3",
        "unitId": "unit-52",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1224,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.88,
        "spawnInterval": 1940,
        "words": [
          {
            "id": "r2_52_2",
            "word": "orange",
            "meaningVi": "màu cam",
            "category": "Colors",
            "emoji": "🟠",
            "pronunciation": "/ˈɒrɪndʒ/"
          },
          {
            "id": "r2_52_3",
            "word": "silver",
            "meaningVi": "màu bạc",
            "category": "Colors",
            "emoji": "🥈",
            "pronunciation": "/ˈsɪlvər/"
          },
          {
            "id": "r2_52_4",
            "word": "golden",
            "meaningVi": "màu óng ánh vàng",
            "category": "Colors",
            "emoji": "🥇",
            "pronunciation": "/ˈɡəʊldən/"
          },
          {
            "id": "r2_52_5",
            "word": "brown",
            "meaningVi": "màu nâu",
            "category": "Colors",
            "emoji": "🟤",
            "pronunciation": "/braʊn/"
          },
          {
            "id": "r2_52_1",
            "word": "purple",
            "meaningVi": "màu tím",
            "category": "Colors",
            "emoji": "🟣",
            "pronunciation": "/ˈpɜːpl/"
          }
        ]
      },
      {
        "id": "lvl-52-4",
        "unitId": "unit-52",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 52",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 50,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-52-5",
        "unitId": "unit-52",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1580,
        "xpReward": 60,
        "gemReward": 15,
        "speedMultiplier": 0.9,
        "spawnInterval": 1740,
        "words": [
          {
            "id": "r2_52_1",
            "word": "purple",
            "meaningVi": "màu tím",
            "category": "Colors",
            "emoji": "🟣",
            "pronunciation": "/ˈpɜːpl/"
          },
          {
            "id": "r2_52_2",
            "word": "orange",
            "meaningVi": "màu cam",
            "category": "Colors",
            "emoji": "🟠",
            "pronunciation": "/ˈɒrɪndʒ/"
          },
          {
            "id": "r2_52_3",
            "word": "silver",
            "meaningVi": "màu bạc",
            "category": "Colors",
            "emoji": "🥈",
            "pronunciation": "/ˈsɪlvər/"
          },
          {
            "id": "r2_52_4",
            "word": "golden",
            "meaningVi": "màu óng ánh vàng",
            "category": "Colors",
            "emoji": "🥇",
            "pronunciation": "/ˈɡəʊldən/"
          },
          {
            "id": "r2_52_5",
            "word": "brown",
            "meaningVi": "màu nâu",
            "category": "Colors",
            "emoji": "🟤",
            "pronunciation": "/braʊn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-53",
    "unitNumber": 53,
    "title": "Health & Fitness",
    "titleVi": "Sức Khỏe & Vận Động",
    "description": "Khỏe mạnh, tràn đầy năng lượng và sức mạnh dẻo dai.",
    "icon": "💪",
    "themeColor": "#ea580c",
    "bannerBg": "from-orange-600/30 via-red-600/20 to-amber-700/30",
    "levels": [
      {
        "id": "lvl-53-1",
        "unitId": "unit-53",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "💪",
        "bgColor": "#ea580c",
        "targetScore": 880,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.78,
        "spawnInterval": 2235,
        "words": [
          {
            "id": "r2_53_1",
            "word": "strong",
            "meaningVi": "khỏe mạnh",
            "category": "Health",
            "emoji": "💪",
            "pronunciation": "/strɒŋ/"
          },
          {
            "id": "r2_53_2",
            "word": "active",
            "meaningVi": "năng động",
            "category": "Health",
            "emoji": "⚡",
            "pronunciation": "/ˈæktɪv/"
          },
          {
            "id": "r2_53_3",
            "word": "healthy",
            "meaningVi": "lành mạnh",
            "category": "Health",
            "emoji": "🥗",
            "pronunciation": "/ˈhelθi/"
          }
        ]
      },
      {
        "id": "lvl-53-2",
        "unitId": "unit-53",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 980,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.83,
        "spawnInterval": 2135,
        "words": [
          {
            "id": "r2_53_4",
            "word": "energy",
            "meaningVi": "năng lượng",
            "category": "Health",
            "emoji": "🔋",
            "pronunciation": "/ˈenədʒi/"
          },
          {
            "id": "r2_53_5",
            "word": "power",
            "meaningVi": "sức mạnh",
            "category": "Health",
            "emoji": "💥",
            "pronunciation": "/ˈpaʊər/"
          }
        ]
      },
      {
        "id": "lvl-53-3",
        "unitId": "unit-53",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1236,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.88,
        "spawnInterval": 1935,
        "words": [
          {
            "id": "r2_53_2",
            "word": "active",
            "meaningVi": "năng động",
            "category": "Health",
            "emoji": "⚡",
            "pronunciation": "/ˈæktɪv/"
          },
          {
            "id": "r2_53_3",
            "word": "healthy",
            "meaningVi": "lành mạnh",
            "category": "Health",
            "emoji": "🥗",
            "pronunciation": "/ˈhelθi/"
          },
          {
            "id": "r2_53_4",
            "word": "energy",
            "meaningVi": "năng lượng",
            "category": "Health",
            "emoji": "🔋",
            "pronunciation": "/ˈenədʒi/"
          },
          {
            "id": "r2_53_5",
            "word": "power",
            "meaningVi": "sức mạnh",
            "category": "Health",
            "emoji": "💥",
            "pronunciation": "/ˈpaʊər/"
          },
          {
            "id": "r2_53_1",
            "word": "strong",
            "meaningVi": "khỏe mạnh",
            "category": "Health",
            "emoji": "💪",
            "pronunciation": "/strɒŋ/"
          }
        ]
      },
      {
        "id": "lvl-53-4",
        "unitId": "unit-53",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 53",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 50,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-53-5",
        "unitId": "unit-53",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1595,
        "xpReward": 60,
        "gemReward": 15,
        "speedMultiplier": 0.9,
        "spawnInterval": 1735,
        "words": [
          {
            "id": "r2_53_1",
            "word": "strong",
            "meaningVi": "khỏe mạnh",
            "category": "Health",
            "emoji": "💪",
            "pronunciation": "/strɒŋ/"
          },
          {
            "id": "r2_53_2",
            "word": "active",
            "meaningVi": "năng động",
            "category": "Health",
            "emoji": "⚡",
            "pronunciation": "/ˈæktɪv/"
          },
          {
            "id": "r2_53_3",
            "word": "healthy",
            "meaningVi": "lành mạnh",
            "category": "Health",
            "emoji": "🥗",
            "pronunciation": "/ˈhelθi/"
          },
          {
            "id": "r2_53_4",
            "word": "energy",
            "meaningVi": "năng lượng",
            "category": "Health",
            "emoji": "🔋",
            "pronunciation": "/ˈenədʒi/"
          },
          {
            "id": "r2_53_5",
            "word": "power",
            "meaningVi": "sức mạnh",
            "category": "Health",
            "emoji": "💥",
            "pronunciation": "/ˈpaʊər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-54",
    "unitNumber": 54,
    "title": "Library Wonder",
    "titleVi": "Khám Phá Thư Viện",
    "description": "Kệ sách ngập tràn tiểu thuyết hay, không gian tĩnh lặng học tập.",
    "icon": "📚",
    "themeColor": "#0284c7",
    "bannerBg": "from-sky-600/30 via-indigo-600/20 to-blue-700/30",
    "levels": [
      {
        "id": "lvl-54-1",
        "unitId": "unit-54",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📚",
        "bgColor": "#0284c7",
        "targetScore": 890,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.78,
        "spawnInterval": 2230,
        "words": [
          {
            "id": "r2_54_1",
            "word": "novel",
            "meaningVi": "tiểu thuyết",
            "category": "Library",
            "emoji": "📕",
            "pronunciation": "/ˈnɒvl/"
          },
          {
            "id": "r2_54_2",
            "word": "shelf",
            "meaningVi": "kệ sách",
            "category": "Library",
            "emoji": "📚",
            "pronunciation": "/ʃelf/"
          },
          {
            "id": "r2_54_3",
            "word": "quiet",
            "meaningVi": "yên tĩnh",
            "category": "Library",
            "emoji": "🤫",
            "pronunciation": "/ˈkwaɪət/"
          }
        ]
      },
      {
        "id": "lvl-54-2",
        "unitId": "unit-54",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 990,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.83,
        "spawnInterval": 2130,
        "words": [
          {
            "id": "r2_54_4",
            "word": "study",
            "meaningVi": "học tập",
            "category": "Library",
            "emoji": "✏️",
            "pronunciation": "/ˈstʌdi/"
          },
          {
            "id": "r2_54_5",
            "word": "author",
            "meaningVi": "tác giả",
            "category": "Library",
            "emoji": "✍️",
            "pronunciation": "/ˈɔːθər/"
          }
        ]
      },
      {
        "id": "lvl-54-3",
        "unitId": "unit-54",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1248,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.88,
        "spawnInterval": 1930,
        "words": [
          {
            "id": "r2_54_2",
            "word": "shelf",
            "meaningVi": "kệ sách",
            "category": "Library",
            "emoji": "📚",
            "pronunciation": "/ʃelf/"
          },
          {
            "id": "r2_54_3",
            "word": "quiet",
            "meaningVi": "yên tĩnh",
            "category": "Library",
            "emoji": "🤫",
            "pronunciation": "/ˈkwaɪət/"
          },
          {
            "id": "r2_54_4",
            "word": "study",
            "meaningVi": "học tập",
            "category": "Library",
            "emoji": "✏️",
            "pronunciation": "/ˈstʌdi/"
          },
          {
            "id": "r2_54_5",
            "word": "author",
            "meaningVi": "tác giả",
            "category": "Library",
            "emoji": "✍️",
            "pronunciation": "/ˈɔːθər/"
          },
          {
            "id": "r2_54_1",
            "word": "novel",
            "meaningVi": "tiểu thuyết",
            "category": "Library",
            "emoji": "📕",
            "pronunciation": "/ˈnɒvl/"
          }
        ]
      },
      {
        "id": "lvl-54-4",
        "unitId": "unit-54",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 54",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 50,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-54-5",
        "unitId": "unit-54",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1610,
        "xpReward": 60,
        "gemReward": 15,
        "speedMultiplier": 0.9,
        "spawnInterval": 1730,
        "words": [
          {
            "id": "r2_54_1",
            "word": "novel",
            "meaningVi": "tiểu thuyết",
            "category": "Library",
            "emoji": "📕",
            "pronunciation": "/ˈnɒvl/"
          },
          {
            "id": "r2_54_2",
            "word": "shelf",
            "meaningVi": "kệ sách",
            "category": "Library",
            "emoji": "📚",
            "pronunciation": "/ʃelf/"
          },
          {
            "id": "r2_54_3",
            "word": "quiet",
            "meaningVi": "yên tĩnh",
            "category": "Library",
            "emoji": "🤫",
            "pronunciation": "/ˈkwaɪət/"
          },
          {
            "id": "r2_54_4",
            "word": "study",
            "meaningVi": "học tập",
            "category": "Library",
            "emoji": "✏️",
            "pronunciation": "/ˈstʌdi/"
          },
          {
            "id": "r2_54_5",
            "word": "author",
            "meaningVi": "tác giả",
            "category": "Library",
            "emoji": "✍️",
            "pronunciation": "/ˈɔːθər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-55",
    "unitNumber": 55,
    "title": "Realm 2 Grand Review",
    "titleVi": "Đại Chiến Thám Hiểm Tiểu Học",
    "description": "Thử thách tổng kết 30 bài học với vốn từ vựng phong phú!",
    "icon": "🏆",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-500/30 via-yellow-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-55-1",
        "unitId": "unit-55",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏆",
        "bgColor": "#f59e0b",
        "targetScore": 900,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.8,
        "spawnInterval": 2225,
        "words": [
          {
            "id": "r2_55_1",
            "word": "doctor",
            "meaningVi": "bác sĩ",
            "category": "Mastery",
            "emoji": "👨‍⚕️",
            "pronunciation": "/ˈdɒktər/"
          },
          {
            "id": "r2_55_2",
            "word": "dolphin",
            "meaningVi": "cá heo",
            "category": "Mastery",
            "emoji": "🐬",
            "pronunciation": "/ˈdɒlfɪn/"
          },
          {
            "id": "r2_55_3",
            "word": "guitar",
            "meaningVi": "đàn ghi-ta",
            "category": "Mastery",
            "emoji": "🎸",
            "pronunciation": "/ɡɪˈtɑːr/"
          },
          {
            "id": "r2_55_4",
            "word": "castle",
            "meaningVi": "lâu đài",
            "category": "Mastery",
            "emoji": "🏰",
            "pronunciation": "/ˈkɑːsl/"
          }
        ]
      },
      {
        "id": "lvl-55-2",
        "unitId": "unit-55",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1000,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.85,
        "spawnInterval": 2125,
        "words": [
          {
            "id": "r2_55_5",
            "word": "healthy",
            "meaningVi": "lành mạnh",
            "category": "Mastery",
            "emoji": "🥗",
            "pronunciation": "/ˈhelθi/"
          },
          {
            "id": "r2_55_6",
            "word": "puzzle",
            "meaningVi": "trò ghép hình",
            "category": "Mastery",
            "emoji": "🧩",
            "pronunciation": "/ˈpʌzl/"
          },
          {
            "id": "r2_55_7",
            "word": "autumn",
            "meaningVi": "mùa thu",
            "category": "Mastery",
            "emoji": "🍂",
            "pronunciation": "/ˈɔːtəm/"
          },
          {
            "id": "r2_55_8",
            "word": "bridge",
            "meaningVi": "cây cầu",
            "category": "Mastery",
            "emoji": "🌉",
            "pronunciation": "/brɪdʒ/"
          }
        ]
      },
      {
        "id": "lvl-55-3",
        "unitId": "unit-55",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1260,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.9,
        "spawnInterval": 1925,
        "words": [
          {
            "id": "r2_55_2",
            "word": "dolphin",
            "meaningVi": "cá heo",
            "category": "Mastery",
            "emoji": "🐬",
            "pronunciation": "/ˈdɒlfɪn/"
          },
          {
            "id": "r2_55_3",
            "word": "guitar",
            "meaningVi": "đàn ghi-ta",
            "category": "Mastery",
            "emoji": "🎸",
            "pronunciation": "/ɡɪˈtɑːr/"
          },
          {
            "id": "r2_55_4",
            "word": "castle",
            "meaningVi": "lâu đài",
            "category": "Mastery",
            "emoji": "🏰",
            "pronunciation": "/ˈkɑːsl/"
          },
          {
            "id": "r2_55_5",
            "word": "healthy",
            "meaningVi": "lành mạnh",
            "category": "Mastery",
            "emoji": "🥗",
            "pronunciation": "/ˈhelθi/"
          },
          {
            "id": "r2_55_6",
            "word": "puzzle",
            "meaningVi": "trò ghép hình",
            "category": "Mastery",
            "emoji": "🧩",
            "pronunciation": "/ˈpʌzl/"
          },
          {
            "id": "r2_55_7",
            "word": "autumn",
            "meaningVi": "mùa thu",
            "category": "Mastery",
            "emoji": "🍂",
            "pronunciation": "/ˈɔːtəm/"
          }
        ]
      },
      {
        "id": "lvl-55-4",
        "unitId": "unit-55",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 55",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 51,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-55-5",
        "unitId": "unit-55",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1625,
        "xpReward": 61,
        "gemReward": 15,
        "speedMultiplier": 0.92,
        "spawnInterval": 1725,
        "words": [
          {
            "id": "r2_55_1",
            "word": "doctor",
            "meaningVi": "bác sĩ",
            "category": "Mastery",
            "emoji": "👨‍⚕️",
            "pronunciation": "/ˈdɒktər/"
          },
          {
            "id": "r2_55_2",
            "word": "dolphin",
            "meaningVi": "cá heo",
            "category": "Mastery",
            "emoji": "🐬",
            "pronunciation": "/ˈdɒlfɪn/"
          },
          {
            "id": "r2_55_3",
            "word": "guitar",
            "meaningVi": "đàn ghi-ta",
            "category": "Mastery",
            "emoji": "🎸",
            "pronunciation": "/ɡɪˈtɑːr/"
          },
          {
            "id": "r2_55_4",
            "word": "castle",
            "meaningVi": "lâu đài",
            "category": "Mastery",
            "emoji": "🏰",
            "pronunciation": "/ˈkɑːsl/"
          },
          {
            "id": "r2_55_5",
            "word": "healthy",
            "meaningVi": "lành mạnh",
            "category": "Mastery",
            "emoji": "🥗",
            "pronunciation": "/ˈhelθi/"
          },
          {
            "id": "r2_55_6",
            "word": "puzzle",
            "meaningVi": "trò ghép hình",
            "category": "Mastery",
            "emoji": "🧩",
            "pronunciation": "/ˈpʌzl/"
          },
          {
            "id": "r2_55_7",
            "word": "autumn",
            "meaningVi": "mùa thu",
            "category": "Mastery",
            "emoji": "🍂",
            "pronunciation": "/ˈɔːtəm/"
          },
          {
            "id": "r2_55_8",
            "word": "bridge",
            "meaningVi": "cây cầu",
            "category": "Mastery",
            "emoji": "🌉",
            "pronunciation": "/brɪdʒ/"
          }
        ]
      }
    ]
  }
];

export const REALM2_REALM: AgeRealm = {
  id: 'realm-2',
  realmNumber: 2,
  name: 'Primary Voyagers',
  nameVi: 'Thám Hiểm Tiểu Học',
  ageRange: '9 - 10 Tuổi',
  gradeLabel: 'Lớp 3 - 4 (CEFR A1)',
  description: '30 Chương mở rộng thế giới xung quanh với từ 4-7 chữ cái, phát triển phản xạ gõ bàn phím nhịp nhàng.',
  icon: '🚀',
  color: '#39ff14',
  badgeBg: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300',
  startChapter: 26,
  endChapter: 55,
  wordLengthHint: '4 - 7 chữ cái',
  targetWpm: '25 - 35 WPM',
  units: REALM2_UNITS
};
