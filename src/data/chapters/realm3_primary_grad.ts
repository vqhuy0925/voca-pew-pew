import { Unit } from '../progress-types';
import { AgeRealm } from './types';

export const REALM3_UNITS: Unit[] = [
  {
    "id": "unit-56",
    "unitNumber": 56,
    "title": "Daily Schedule",
    "titleVi": "Lịch Trình Hằng Ngày",
    "description": "Thời gian biểu, chuông báo thức và thói quen đúng giờ.",
    "icon": "⏰",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-500/30 via-teal-500/20 to-sky-600/30",
    "levels": [
      {
        "id": "lvl-56-1",
        "unitId": "unit-56",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "⏰",
        "bgColor": "#06b6d4",
        "targetScore": 910,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.78,
        "spawnInterval": 2220,
        "words": [
          {
            "id": "r3_56_1",
            "word": "routine",
            "meaningVi": "thói quen định kỳ",
            "category": "Daily",
            "emoji": "🔄",
            "pronunciation": "/ruːˈtiːn/"
          },
          {
            "id": "r3_56_2",
            "word": "alarm",
            "meaningVi": "chuông báo thức",
            "category": "Daily",
            "emoji": "⏰",
            "pronunciation": "/əˈlɑːm/"
          },
          {
            "id": "r3_56_3",
            "word": "schedule",
            "meaningVi": "lịch trình",
            "category": "Daily",
            "emoji": "🗓️",
            "pronunciation": "/ˈʃedjuːl/"
          }
        ]
      },
      {
        "id": "lvl-56-2",
        "unitId": "unit-56",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1010,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.83,
        "spawnInterval": 2120,
        "words": [
          {
            "id": "r3_56_4",
            "word": "shower",
            "meaningVi": "tắm vòi sen",
            "category": "Daily",
            "emoji": "🚿",
            "pronunciation": "/ˈʃaʊər/"
          },
          {
            "id": "r3_56_5",
            "word": "punctual",
            "meaningVi": "đúng giờ",
            "category": "Daily",
            "emoji": "⏱️",
            "pronunciation": "/ˈpʌŋktʃuəl/"
          }
        ]
      },
      {
        "id": "lvl-56-3",
        "unitId": "unit-56",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1272,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.88,
        "spawnInterval": 1920,
        "words": [
          {
            "id": "r3_56_2",
            "word": "alarm",
            "meaningVi": "chuông báo thức",
            "category": "Daily",
            "emoji": "⏰",
            "pronunciation": "/əˈlɑːm/"
          },
          {
            "id": "r3_56_3",
            "word": "schedule",
            "meaningVi": "lịch trình",
            "category": "Daily",
            "emoji": "🗓️",
            "pronunciation": "/ˈʃedjuːl/"
          },
          {
            "id": "r3_56_4",
            "word": "shower",
            "meaningVi": "tắm vòi sen",
            "category": "Daily",
            "emoji": "🚿",
            "pronunciation": "/ˈʃaʊər/"
          },
          {
            "id": "r3_56_5",
            "word": "punctual",
            "meaningVi": "đúng giờ",
            "category": "Daily",
            "emoji": "⏱️",
            "pronunciation": "/ˈpʌŋktʃuəl/"
          },
          {
            "id": "r3_56_1",
            "word": "routine",
            "meaningVi": "thói quen định kỳ",
            "category": "Daily",
            "emoji": "🔄",
            "pronunciation": "/ruːˈtiːn/"
          }
        ]
      },
      {
        "id": "lvl-56-4",
        "unitId": "unit-56",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 56",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 51,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-56-5",
        "unitId": "unit-56",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1640,
        "xpReward": 61,
        "gemReward": 15,
        "speedMultiplier": 0.9,
        "spawnInterval": 1720,
        "words": [
          {
            "id": "r3_56_1",
            "word": "routine",
            "meaningVi": "thói quen định kỳ",
            "category": "Daily",
            "emoji": "🔄",
            "pronunciation": "/ruːˈtiːn/"
          },
          {
            "id": "r3_56_2",
            "word": "alarm",
            "meaningVi": "chuông báo thức",
            "category": "Daily",
            "emoji": "⏰",
            "pronunciation": "/əˈlɑːm/"
          },
          {
            "id": "r3_56_3",
            "word": "schedule",
            "meaningVi": "lịch trình",
            "category": "Daily",
            "emoji": "🗓️",
            "pronunciation": "/ˈʃedjuːl/"
          },
          {
            "id": "r3_56_4",
            "word": "shower",
            "meaningVi": "tắm vòi sen",
            "category": "Daily",
            "emoji": "🚿",
            "pronunciation": "/ˈʃaʊər/"
          },
          {
            "id": "r3_56_5",
            "word": "punctual",
            "meaningVi": "đúng giờ",
            "category": "Daily",
            "emoji": "⏱️",
            "pronunciation": "/ˈpʌŋktʃuəl/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-57",
    "unitNumber": 57,
    "title": "Directions & Maps",
    "titleVi": "Phương Hướng & Bản Đồ",
    "description": "La bàn chỉ hướng Bắc, Nam, Đông, Tây và góc phố.",
    "icon": "🧭",
    "themeColor": "#3b82f6",
    "bannerBg": "from-blue-500/30 via-indigo-500/20 to-cyan-600/30",
    "levels": [
      {
        "id": "lvl-57-1",
        "unitId": "unit-57",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🧭",
        "bgColor": "#3b82f6",
        "targetScore": 920,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.79,
        "spawnInterval": 2215,
        "words": [
          {
            "id": "r3_57_1",
            "word": "north",
            "meaningVi": "hướng Bắc",
            "category": "Directions",
            "emoji": "⬆️",
            "pronunciation": "/nɔːθ/"
          },
          {
            "id": "r3_57_2",
            "word": "south",
            "meaningVi": "hướng Nam",
            "category": "Directions",
            "emoji": "⬇️",
            "pronunciation": "/saʊθ/"
          },
          {
            "id": "r3_57_3",
            "word": "east",
            "meaningVi": "hướng Đông",
            "category": "Directions",
            "emoji": "➡️",
            "pronunciation": "/iːst/"
          }
        ]
      },
      {
        "id": "lvl-57-2",
        "unitId": "unit-57",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1020,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.84,
        "spawnInterval": 2115,
        "words": [
          {
            "id": "r3_57_4",
            "word": "west",
            "meaningVi": "hướng Tây",
            "category": "Directions",
            "emoji": "⬅️",
            "pronunciation": "/west/"
          },
          {
            "id": "r3_57_5",
            "word": "compass",
            "meaningVi": "la bàn định hướng",
            "category": "Directions",
            "emoji": "🧭",
            "pronunciation": "/ˈkʌmpəs/"
          }
        ]
      },
      {
        "id": "lvl-57-3",
        "unitId": "unit-57",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1284,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.89,
        "spawnInterval": 1915,
        "words": [
          {
            "id": "r3_57_2",
            "word": "south",
            "meaningVi": "hướng Nam",
            "category": "Directions",
            "emoji": "⬇️",
            "pronunciation": "/saʊθ/"
          },
          {
            "id": "r3_57_3",
            "word": "east",
            "meaningVi": "hướng Đông",
            "category": "Directions",
            "emoji": "➡️",
            "pronunciation": "/iːst/"
          },
          {
            "id": "r3_57_4",
            "word": "west",
            "meaningVi": "hướng Tây",
            "category": "Directions",
            "emoji": "⬅️",
            "pronunciation": "/west/"
          },
          {
            "id": "r3_57_5",
            "word": "compass",
            "meaningVi": "la bàn định hướng",
            "category": "Directions",
            "emoji": "🧭",
            "pronunciation": "/ˈkʌmpəs/"
          },
          {
            "id": "r3_57_1",
            "word": "north",
            "meaningVi": "hướng Bắc",
            "category": "Directions",
            "emoji": "⬆️",
            "pronunciation": "/nɔːθ/"
          }
        ]
      },
      {
        "id": "lvl-57-4",
        "unitId": "unit-57",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 57",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 51,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-57-5",
        "unitId": "unit-57",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1655,
        "xpReward": 61,
        "gemReward": 15,
        "speedMultiplier": 0.91,
        "spawnInterval": 1715,
        "words": [
          {
            "id": "r3_57_1",
            "word": "north",
            "meaningVi": "hướng Bắc",
            "category": "Directions",
            "emoji": "⬆️",
            "pronunciation": "/nɔːθ/"
          },
          {
            "id": "r3_57_2",
            "word": "south",
            "meaningVi": "hướng Nam",
            "category": "Directions",
            "emoji": "⬇️",
            "pronunciation": "/saʊθ/"
          },
          {
            "id": "r3_57_3",
            "word": "east",
            "meaningVi": "hướng Đông",
            "category": "Directions",
            "emoji": "➡️",
            "pronunciation": "/iːst/"
          },
          {
            "id": "r3_57_4",
            "word": "west",
            "meaningVi": "hướng Tây",
            "category": "Directions",
            "emoji": "⬅️",
            "pronunciation": "/west/"
          },
          {
            "id": "r3_57_5",
            "word": "compass",
            "meaningVi": "la bàn định hướng",
            "category": "Directions",
            "emoji": "🧭",
            "pronunciation": "/ˈkʌmpəs/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-58",
    "unitNumber": 58,
    "title": "Cosmic Planets",
    "titleVi": "Hành Tinh & Vũ Trụ",
    "description": "Quỹ đạo quay quanh mặt trời, thiên thạch và dải ngân hà.",
    "icon": "🪐",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-500/30 via-violet-500/20 to-indigo-600/30",
    "levels": [
      {
        "id": "lvl-58-1",
        "unitId": "unit-58",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🪐",
        "bgColor": "#8b5cf6",
        "targetScore": 930,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.79,
        "spawnInterval": 2210,
        "words": [
          {
            "id": "r3_58_1",
            "word": "planet",
            "meaningVi": "hành tinh",
            "category": "Space",
            "emoji": "🪐",
            "pronunciation": "/ˈplænɪt/"
          },
          {
            "id": "r3_58_2",
            "word": "orbit",
            "meaningVi": "quỹ đạo quay",
            "category": "Space",
            "emoji": "🔄",
            "pronunciation": "/ˈɔːbɪt/"
          },
          {
            "id": "r3_58_3",
            "word": "rocket",
            "meaningVi": "tên lửa vũ trụ",
            "category": "Space",
            "emoji": "🚀",
            "pronunciation": "/ˈrɒkɪt/"
          }
        ]
      },
      {
        "id": "lvl-58-2",
        "unitId": "unit-58",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1030,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.84,
        "spawnInterval": 2110,
        "words": [
          {
            "id": "r3_58_4",
            "word": "meteor",
            "meaningVi": "sao băng / thiên thạch",
            "category": "Space",
            "emoji": "☄️",
            "pronunciation": "/ˈmiːtiər/"
          },
          {
            "id": "r3_58_5",
            "word": "galaxy",
            "meaningVi": "thiên hà",
            "category": "Space",
            "emoji": "🌌",
            "pronunciation": "/ˈɡæləksi/"
          }
        ]
      },
      {
        "id": "lvl-58-3",
        "unitId": "unit-58",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1296,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.89,
        "spawnInterval": 1910,
        "words": [
          {
            "id": "r3_58_2",
            "word": "orbit",
            "meaningVi": "quỹ đạo quay",
            "category": "Space",
            "emoji": "🔄",
            "pronunciation": "/ˈɔːbɪt/"
          },
          {
            "id": "r3_58_3",
            "word": "rocket",
            "meaningVi": "tên lửa vũ trụ",
            "category": "Space",
            "emoji": "🚀",
            "pronunciation": "/ˈrɒkɪt/"
          },
          {
            "id": "r3_58_4",
            "word": "meteor",
            "meaningVi": "sao băng / thiên thạch",
            "category": "Space",
            "emoji": "☄️",
            "pronunciation": "/ˈmiːtiər/"
          },
          {
            "id": "r3_58_5",
            "word": "galaxy",
            "meaningVi": "thiên hà",
            "category": "Space",
            "emoji": "🌌",
            "pronunciation": "/ˈɡæləksi/"
          },
          {
            "id": "r3_58_1",
            "word": "planet",
            "meaningVi": "hành tinh",
            "category": "Space",
            "emoji": "🪐",
            "pronunciation": "/ˈplænɪt/"
          }
        ]
      },
      {
        "id": "lvl-58-4",
        "unitId": "unit-58",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 58",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 51,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-58-5",
        "unitId": "unit-58",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1670,
        "xpReward": 61,
        "gemReward": 15,
        "speedMultiplier": 0.91,
        "spawnInterval": 1710,
        "words": [
          {
            "id": "r3_58_1",
            "word": "planet",
            "meaningVi": "hành tinh",
            "category": "Space",
            "emoji": "🪐",
            "pronunciation": "/ˈplænɪt/"
          },
          {
            "id": "r3_58_2",
            "word": "orbit",
            "meaningVi": "quỹ đạo quay",
            "category": "Space",
            "emoji": "🔄",
            "pronunciation": "/ˈɔːbɪt/"
          },
          {
            "id": "r3_58_3",
            "word": "rocket",
            "meaningVi": "tên lửa vũ trụ",
            "category": "Space",
            "emoji": "🚀",
            "pronunciation": "/ˈrɒkɪt/"
          },
          {
            "id": "r3_58_4",
            "word": "meteor",
            "meaningVi": "sao băng / thiên thạch",
            "category": "Space",
            "emoji": "☄️",
            "pronunciation": "/ˈmiːtiər/"
          },
          {
            "id": "r3_58_5",
            "word": "galaxy",
            "meaningVi": "thiên hà",
            "category": "Space",
            "emoji": "🌌",
            "pronunciation": "/ˈɡæləksi/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-59",
    "unitNumber": 59,
    "title": "World Cuisines",
    "titleVi": "Ẩm Thực Năm Châu",
    "description": "Mì Ý thơm ngon, pizza phô mai kéo sợi và sushi thanh vị.",
    "icon": "🍕",
    "themeColor": "#ef4444",
    "bannerBg": "from-red-500/30 via-rose-500/20 to-amber-600/30",
    "levels": [
      {
        "id": "lvl-59-1",
        "unitId": "unit-59",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🍕",
        "bgColor": "#ef4444",
        "targetScore": 940,
        "xpReward": 25,
        "gemReward": 5,
        "speedMultiplier": 0.8,
        "spawnInterval": 2205,
        "words": [
          {
            "id": "r3_59_1",
            "word": "noodles",
            "meaningVi": "món mì sợi",
            "category": "Cuisine",
            "emoji": "🍜",
            "pronunciation": "/ˈnuːdlz/"
          },
          {
            "id": "r3_59_2",
            "word": "pizza",
            "meaningVi": "bánh pizza",
            "category": "Cuisine",
            "emoji": "🍕",
            "pronunciation": "/ˈpiːtsə/"
          },
          {
            "id": "r3_59_3",
            "word": "burger",
            "meaningVi": "bánh mì kẹp thịt",
            "category": "Cuisine",
            "emoji": "🍔",
            "pronunciation": "/ˈbɜːɡər/"
          }
        ]
      },
      {
        "id": "lvl-59-2",
        "unitId": "unit-59",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1040,
        "xpReward": 30,
        "gemReward": 6,
        "speedMultiplier": 0.85,
        "spawnInterval": 2105,
        "words": [
          {
            "id": "r3_59_4",
            "word": "pasta",
            "meaningVi": "mì ống / nui",
            "category": "Cuisine",
            "emoji": "🍝",
            "pronunciation": "/ˈpæstə/"
          },
          {
            "id": "r3_59_5",
            "word": "sushi",
            "meaningVi": "cơm cuộn sushi",
            "category": "Cuisine",
            "emoji": "🍣",
            "pronunciation": "/ˈsuːʃi/"
          }
        ]
      },
      {
        "id": "lvl-59-3",
        "unitId": "unit-59",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1308,
        "xpReward": 35,
        "gemReward": 8,
        "speedMultiplier": 0.9,
        "spawnInterval": 1905,
        "words": [
          {
            "id": "r3_59_2",
            "word": "pizza",
            "meaningVi": "bánh pizza",
            "category": "Cuisine",
            "emoji": "🍕",
            "pronunciation": "/ˈpiːtsə/"
          },
          {
            "id": "r3_59_3",
            "word": "burger",
            "meaningVi": "bánh mì kẹp thịt",
            "category": "Cuisine",
            "emoji": "🍔",
            "pronunciation": "/ˈbɜːɡər/"
          },
          {
            "id": "r3_59_4",
            "word": "pasta",
            "meaningVi": "mì ống / nui",
            "category": "Cuisine",
            "emoji": "🍝",
            "pronunciation": "/ˈpæstə/"
          },
          {
            "id": "r3_59_5",
            "word": "sushi",
            "meaningVi": "cơm cuộn sushi",
            "category": "Cuisine",
            "emoji": "🍣",
            "pronunciation": "/ˈsuːʃi/"
          },
          {
            "id": "r3_59_1",
            "word": "noodles",
            "meaningVi": "món mì sợi",
            "category": "Cuisine",
            "emoji": "🍜",
            "pronunciation": "/ˈnuːdlz/"
          }
        ]
      },
      {
        "id": "lvl-59-4",
        "unitId": "unit-59",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 59",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 51,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-59-5",
        "unitId": "unit-59",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1685,
        "xpReward": 61,
        "gemReward": 15,
        "speedMultiplier": 0.92,
        "spawnInterval": 1705,
        "words": [
          {
            "id": "r3_59_1",
            "word": "noodles",
            "meaningVi": "món mì sợi",
            "category": "Cuisine",
            "emoji": "🍜",
            "pronunciation": "/ˈnuːdlz/"
          },
          {
            "id": "r3_59_2",
            "word": "pizza",
            "meaningVi": "bánh pizza",
            "category": "Cuisine",
            "emoji": "🍕",
            "pronunciation": "/ˈpiːtsə/"
          },
          {
            "id": "r3_59_3",
            "word": "burger",
            "meaningVi": "bánh mì kẹp thịt",
            "category": "Cuisine",
            "emoji": "🍔",
            "pronunciation": "/ˈbɜːɡər/"
          },
          {
            "id": "r3_59_4",
            "word": "pasta",
            "meaningVi": "mì ống / nui",
            "category": "Cuisine",
            "emoji": "🍝",
            "pronunciation": "/ˈpæstə/"
          },
          {
            "id": "r3_59_5",
            "word": "sushi",
            "meaningVi": "cơm cuộn sushi",
            "category": "Cuisine",
            "emoji": "🍣",
            "pronunciation": "/ˈsuːʃi/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-60",
    "unitNumber": 60,
    "title": "Tropical Rainforest",
    "titleVi": "Rừng Nhiệt Đới",
    "description": "Tầng tán rừng rậm, vẹt sặc sỡ và báo hoa mai ẩn mình.",
    "icon": "🦜",
    "themeColor": "#10b981",
    "bannerBg": "from-emerald-500/30 via-green-500/20 to-teal-600/30",
    "levels": [
      {
        "id": "lvl-60-1",
        "unitId": "unit-60",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🦜",
        "bgColor": "#10b981",
        "targetScore": 950,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.8,
        "spawnInterval": 2200,
        "words": [
          {
            "id": "r3_60_1",
            "word": "canopy",
            "meaningVi": "tầng tán lá rừng",
            "category": "Rainforest",
            "emoji": "🌳",
            "pronunciation": "/ˈkænəpi/"
          },
          {
            "id": "r3_60_2",
            "word": "jungle",
            "meaningVi": "rừng nhiệt đới",
            "category": "Rainforest",
            "emoji": "🌴",
            "pronunciation": "/ˈdʒʌŋɡl/"
          },
          {
            "id": "r3_60_3",
            "word": "parrot",
            "meaningVi": "con vẹt",
            "category": "Rainforest",
            "emoji": "🦜",
            "pronunciation": "/ˈpærət/"
          }
        ]
      },
      {
        "id": "lvl-60-2",
        "unitId": "unit-60",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1050,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.85,
        "spawnInterval": 2100,
        "words": [
          {
            "id": "r3_60_4",
            "word": "jaguar",
            "meaningVi": "báo đốm Mỹ",
            "category": "Rainforest",
            "emoji": "🐆",
            "pronunciation": "/ˈdʒæɡjuər/"
          },
          {
            "id": "r3_60_5",
            "word": "orchid",
            "meaningVi": "hoa phong lan",
            "category": "Rainforest",
            "emoji": "🌺",
            "pronunciation": "/ˈɔːkɪd/"
          }
        ]
      },
      {
        "id": "lvl-60-3",
        "unitId": "unit-60",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1320,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.9,
        "spawnInterval": 1900,
        "words": [
          {
            "id": "r3_60_2",
            "word": "jungle",
            "meaningVi": "rừng nhiệt đới",
            "category": "Rainforest",
            "emoji": "🌴",
            "pronunciation": "/ˈdʒʌŋɡl/"
          },
          {
            "id": "r3_60_3",
            "word": "parrot",
            "meaningVi": "con vẹt",
            "category": "Rainforest",
            "emoji": "🦜",
            "pronunciation": "/ˈpærət/"
          },
          {
            "id": "r3_60_4",
            "word": "jaguar",
            "meaningVi": "báo đốm Mỹ",
            "category": "Rainforest",
            "emoji": "🐆",
            "pronunciation": "/ˈdʒæɡjuər/"
          },
          {
            "id": "r3_60_5",
            "word": "orchid",
            "meaningVi": "hoa phong lan",
            "category": "Rainforest",
            "emoji": "🌺",
            "pronunciation": "/ˈɔːkɪd/"
          },
          {
            "id": "r3_60_1",
            "word": "canopy",
            "meaningVi": "tầng tán lá rừng",
            "category": "Rainforest",
            "emoji": "🌳",
            "pronunciation": "/ˈkænəpi/"
          }
        ]
      },
      {
        "id": "lvl-60-4",
        "unitId": "unit-60",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 60",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 52,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-60-5",
        "unitId": "unit-60",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1700,
        "xpReward": 62,
        "gemReward": 15,
        "speedMultiplier": 0.92,
        "spawnInterval": 1700,
        "words": [
          {
            "id": "r3_60_1",
            "word": "canopy",
            "meaningVi": "tầng tán lá rừng",
            "category": "Rainforest",
            "emoji": "🌳",
            "pronunciation": "/ˈkænəpi/"
          },
          {
            "id": "r3_60_2",
            "word": "jungle",
            "meaningVi": "rừng nhiệt đới",
            "category": "Rainforest",
            "emoji": "🌴",
            "pronunciation": "/ˈdʒʌŋɡl/"
          },
          {
            "id": "r3_60_3",
            "word": "parrot",
            "meaningVi": "con vẹt",
            "category": "Rainforest",
            "emoji": "🦜",
            "pronunciation": "/ˈpærət/"
          },
          {
            "id": "r3_60_4",
            "word": "jaguar",
            "meaningVi": "báo đốm Mỹ",
            "category": "Rainforest",
            "emoji": "🐆",
            "pronunciation": "/ˈdʒæɡjuər/"
          },
          {
            "id": "r3_60_5",
            "word": "orchid",
            "meaningVi": "hoa phong lan",
            "category": "Rainforest",
            "emoji": "🌺",
            "pronunciation": "/ˈɔːkɪd/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-61",
    "unitNumber": 61,
    "title": "Deep Sea Creatures",
    "titleVi": "Sinh Vật Biển Sâu",
    "description": "Sứa phát quang, tôm hùm càng lớn và cá ngựa tí hon.",
    "icon": "🪼",
    "themeColor": "#0284c7",
    "bannerBg": "from-sky-500/30 via-blue-500/20 to-indigo-600/30",
    "levels": [
      {
        "id": "lvl-61-1",
        "unitId": "unit-61",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🪼",
        "bgColor": "#0284c7",
        "targetScore": 960,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.81,
        "spawnInterval": 2195,
        "words": [
          {
            "id": "r3_61_1",
            "word": "jellyfish",
            "meaningVi": "con sứa",
            "category": "Sea",
            "emoji": "🪼",
            "pronunciation": "/ˈdʒelifɪʃ/"
          },
          {
            "id": "r3_61_2",
            "word": "lobster",
            "meaningVi": "tôm hùm",
            "category": "Sea",
            "emoji": "🦞",
            "pronunciation": "/ˈlɒbstər/"
          },
          {
            "id": "r3_61_3",
            "word": "seahorse",
            "meaningVi": "cá ngựa",
            "category": "Sea",
            "emoji": "🪸",
            "pronunciation": "/ˈsiːhɔːs/"
          }
        ]
      },
      {
        "id": "lvl-61-2",
        "unitId": "unit-61",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1060,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.86,
        "spawnInterval": 2095,
        "words": [
          {
            "id": "r3_61_4",
            "word": "mantis",
            "meaningVi": "tôm tít biển",
            "category": "Sea",
            "emoji": "🦐",
            "pronunciation": "/ˈmæntɪs/"
          }
        ]
      },
      {
        "id": "lvl-61-3",
        "unitId": "unit-61",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1332,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.91,
        "spawnInterval": 1895,
        "words": [
          {
            "id": "r3_61_2",
            "word": "lobster",
            "meaningVi": "tôm hùm",
            "category": "Sea",
            "emoji": "🦞",
            "pronunciation": "/ˈlɒbstər/"
          },
          {
            "id": "r3_61_3",
            "word": "seahorse",
            "meaningVi": "cá ngựa",
            "category": "Sea",
            "emoji": "🪸",
            "pronunciation": "/ˈsiːhɔːs/"
          },
          {
            "id": "r3_61_4",
            "word": "mantis",
            "meaningVi": "tôm tít biển",
            "category": "Sea",
            "emoji": "🦐",
            "pronunciation": "/ˈmæntɪs/"
          },
          {
            "id": "r3_61_1",
            "word": "jellyfish",
            "meaningVi": "con sứa",
            "category": "Sea",
            "emoji": "🪼",
            "pronunciation": "/ˈdʒelifɪʃ/"
          }
        ]
      },
      {
        "id": "lvl-61-4",
        "unitId": "unit-61",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 61",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 52,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-61-5",
        "unitId": "unit-61",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1715,
        "xpReward": 62,
        "gemReward": 15,
        "speedMultiplier": 0.93,
        "spawnInterval": 1695,
        "words": [
          {
            "id": "r3_61_1",
            "word": "jellyfish",
            "meaningVi": "con sứa",
            "category": "Sea",
            "emoji": "🪼",
            "pronunciation": "/ˈdʒelifɪʃ/"
          },
          {
            "id": "r3_61_2",
            "word": "lobster",
            "meaningVi": "tôm hùm",
            "category": "Sea",
            "emoji": "🦞",
            "pronunciation": "/ˈlɒbstər/"
          },
          {
            "id": "r3_61_3",
            "word": "seahorse",
            "meaningVi": "cá ngựa",
            "category": "Sea",
            "emoji": "🪸",
            "pronunciation": "/ˈsiːhɔːs/"
          },
          {
            "id": "r3_61_4",
            "word": "mantis",
            "meaningVi": "tôm tít biển",
            "category": "Sea",
            "emoji": "🦐",
            "pronunciation": "/ˈmæntɪs/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-62",
    "unitNumber": 62,
    "title": "Modern Careers",
    "titleVi": "Nghề Nghiệp Hiện Đại",
    "description": "Kỹ sư công trình, nhà khoa học và nhà thiết kế sáng tạo.",
    "icon": "👷",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-500/30 via-orange-500/20 to-yellow-600/30",
    "levels": [
      {
        "id": "lvl-62-1",
        "unitId": "unit-62",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "👷",
        "bgColor": "#f59e0b",
        "targetScore": 970,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.81,
        "spawnInterval": 2190,
        "words": [
          {
            "id": "r3_62_1",
            "word": "engineer",
            "meaningVi": "kỹ sư",
            "category": "Careers",
            "emoji": "👷",
            "pronunciation": "/ˌendʒɪˈnɪər/"
          },
          {
            "id": "r3_62_2",
            "word": "artist",
            "meaningVi": "họa sĩ / nghệ sĩ",
            "category": "Careers",
            "emoji": "🎨",
            "pronunciation": "/ˈɑːtɪst/"
          },
          {
            "id": "r3_62_3",
            "word": "designer",
            "meaningVi": "nhà thiết kế",
            "category": "Careers",
            "emoji": "📐",
            "pronunciation": "/dɪˈzaɪnər/"
          }
        ]
      },
      {
        "id": "lvl-62-2",
        "unitId": "unit-62",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1070,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.86,
        "spawnInterval": 2090,
        "words": [
          {
            "id": "r3_62_4",
            "word": "scientist",
            "meaningVi": "nhà khoa học",
            "category": "Careers",
            "emoji": "🔬",
            "pronunciation": "/ˈsaɪəntɪst/"
          },
          {
            "id": "r3_62_5",
            "word": "police",
            "meaningVi": "cảnh sát",
            "category": "Careers",
            "emoji": "👮",
            "pronunciation": "/pəˈliːs/"
          }
        ]
      },
      {
        "id": "lvl-62-3",
        "unitId": "unit-62",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1344,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.91,
        "spawnInterval": 1890,
        "words": [
          {
            "id": "r3_62_2",
            "word": "artist",
            "meaningVi": "họa sĩ / nghệ sĩ",
            "category": "Careers",
            "emoji": "🎨",
            "pronunciation": "/ˈɑːtɪst/"
          },
          {
            "id": "r3_62_3",
            "word": "designer",
            "meaningVi": "nhà thiết kế",
            "category": "Careers",
            "emoji": "📐",
            "pronunciation": "/dɪˈzaɪnər/"
          },
          {
            "id": "r3_62_4",
            "word": "scientist",
            "meaningVi": "nhà khoa học",
            "category": "Careers",
            "emoji": "🔬",
            "pronunciation": "/ˈsaɪəntɪst/"
          },
          {
            "id": "r3_62_5",
            "word": "police",
            "meaningVi": "cảnh sát",
            "category": "Careers",
            "emoji": "👮",
            "pronunciation": "/pəˈliːs/"
          },
          {
            "id": "r3_62_1",
            "word": "engineer",
            "meaningVi": "kỹ sư",
            "category": "Careers",
            "emoji": "👷",
            "pronunciation": "/ˌendʒɪˈnɪər/"
          }
        ]
      },
      {
        "id": "lvl-62-4",
        "unitId": "unit-62",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 62",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 52,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-62-5",
        "unitId": "unit-62",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1730,
        "xpReward": 62,
        "gemReward": 15,
        "speedMultiplier": 0.93,
        "spawnInterval": 1690,
        "words": [
          {
            "id": "r3_62_1",
            "word": "engineer",
            "meaningVi": "kỹ sư",
            "category": "Careers",
            "emoji": "👷",
            "pronunciation": "/ˌendʒɪˈnɪər/"
          },
          {
            "id": "r3_62_2",
            "word": "artist",
            "meaningVi": "họa sĩ / nghệ sĩ",
            "category": "Careers",
            "emoji": "🎨",
            "pronunciation": "/ˈɑːtɪst/"
          },
          {
            "id": "r3_62_3",
            "word": "designer",
            "meaningVi": "nhà thiết kế",
            "category": "Careers",
            "emoji": "📐",
            "pronunciation": "/dɪˈzaɪnər/"
          },
          {
            "id": "r3_62_4",
            "word": "scientist",
            "meaningVi": "nhà khoa học",
            "category": "Careers",
            "emoji": "🔬",
            "pronunciation": "/ˈsaɪəntɪst/"
          },
          {
            "id": "r3_62_5",
            "word": "police",
            "meaningVi": "cảnh sát",
            "category": "Careers",
            "emoji": "👮",
            "pronunciation": "/pəˈliːs/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-63",
    "unitNumber": 63,
    "title": "Healthy Lifestyle",
    "titleVi": "Thói Quen Lành Mạnh",
    "description": "Vệ sinh sạch sẽ, bổ sung vitamin và tập thể dục đều đặn.",
    "icon": "🥗",
    "themeColor": "#16a34a",
    "bannerBg": "from-green-500/30 via-emerald-500/20 to-lime-600/30",
    "levels": [
      {
        "id": "lvl-63-1",
        "unitId": "unit-63",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🥗",
        "bgColor": "#16a34a",
        "targetScore": 980,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.81,
        "spawnInterval": 2185,
        "words": [
          {
            "id": "r3_63_1",
            "word": "hygiene",
            "meaningVi": "vệ sinh thân thể",
            "category": "Health",
            "emoji": "🧼",
            "pronunciation": "/ˈhaɪdʒiːn/"
          },
          {
            "id": "r3_63_2",
            "word": "exercise",
            "meaningVi": "tập thể dục",
            "category": "Health",
            "emoji": "🏃",
            "pronunciation": "/ˈeksəsaɪz/"
          },
          {
            "id": "r3_63_3",
            "word": "vitamin",
            "meaningVi": "vi-ta-min",
            "category": "Health",
            "emoji": "💊",
            "pronunciation": "/ˈvɪtəmɪn/"
          }
        ]
      },
      {
        "id": "lvl-63-2",
        "unitId": "unit-63",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1080,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.86,
        "spawnInterval": 2085,
        "words": [
          {
            "id": "r3_63_4",
            "word": "balance",
            "meaningVi": "sự cân bằng",
            "category": "Health",
            "emoji": "⚖️",
            "pronunciation": "/ˈbæləns/"
          },
          {
            "id": "r3_63_5",
            "word": "organic",
            "meaningVi": "hữu cơ tự nhiên",
            "category": "Health",
            "emoji": "🌿",
            "pronunciation": "/ɔːˈɡænɪk/"
          }
        ]
      },
      {
        "id": "lvl-63-3",
        "unitId": "unit-63",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1356,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.91,
        "spawnInterval": 1885,
        "words": [
          {
            "id": "r3_63_2",
            "word": "exercise",
            "meaningVi": "tập thể dục",
            "category": "Health",
            "emoji": "🏃",
            "pronunciation": "/ˈeksəsaɪz/"
          },
          {
            "id": "r3_63_3",
            "word": "vitamin",
            "meaningVi": "vi-ta-min",
            "category": "Health",
            "emoji": "💊",
            "pronunciation": "/ˈvɪtəmɪn/"
          },
          {
            "id": "r3_63_4",
            "word": "balance",
            "meaningVi": "sự cân bằng",
            "category": "Health",
            "emoji": "⚖️",
            "pronunciation": "/ˈbæləns/"
          },
          {
            "id": "r3_63_5",
            "word": "organic",
            "meaningVi": "hữu cơ tự nhiên",
            "category": "Health",
            "emoji": "🌿",
            "pronunciation": "/ɔːˈɡænɪk/"
          },
          {
            "id": "r3_63_1",
            "word": "hygiene",
            "meaningVi": "vệ sinh thân thể",
            "category": "Health",
            "emoji": "🧼",
            "pronunciation": "/ˈhaɪdʒiːn/"
          }
        ]
      },
      {
        "id": "lvl-63-4",
        "unitId": "unit-63",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 63",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 52,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-63-5",
        "unitId": "unit-63",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1745,
        "xpReward": 62,
        "gemReward": 15,
        "speedMultiplier": 0.93,
        "spawnInterval": 1685,
        "words": [
          {
            "id": "r3_63_1",
            "word": "hygiene",
            "meaningVi": "vệ sinh thân thể",
            "category": "Health",
            "emoji": "🧼",
            "pronunciation": "/ˈhaɪdʒiːn/"
          },
          {
            "id": "r3_63_2",
            "word": "exercise",
            "meaningVi": "tập thể dục",
            "category": "Health",
            "emoji": "🏃",
            "pronunciation": "/ˈeksəsaɪz/"
          },
          {
            "id": "r3_63_3",
            "word": "vitamin",
            "meaningVi": "vi-ta-min",
            "category": "Health",
            "emoji": "💊",
            "pronunciation": "/ˈvɪtəmɪn/"
          },
          {
            "id": "r3_63_4",
            "word": "balance",
            "meaningVi": "sự cân bằng",
            "category": "Health",
            "emoji": "⚖️",
            "pronunciation": "/ˈbæləns/"
          },
          {
            "id": "r3_63_5",
            "word": "organic",
            "meaningVi": "hữu cơ tự nhiên",
            "category": "Health",
            "emoji": "🌿",
            "pronunciation": "/ɔːˈɡænɪk/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-64",
    "unitNumber": 64,
    "title": "Smart Devices",
    "titleVi": "Thiết Bị Thông Minh",
    "description": "Máy tính bảng, máy tính xách tay, cảm biến và pin dung lượng cao.",
    "icon": "📱",
    "themeColor": "#06b6d4",
    "bannerBg": "from-cyan-500/30 via-blue-500/20 to-indigo-600/30",
    "levels": [
      {
        "id": "lvl-64-1",
        "unitId": "unit-64",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📱",
        "bgColor": "#06b6d4",
        "targetScore": 990,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.82,
        "spawnInterval": 2180,
        "words": [
          {
            "id": "r3_64_1",
            "word": "tablet",
            "meaningVi": "máy tính bảng",
            "category": "Tech",
            "emoji": "📱",
            "pronunciation": "/ˈtæblət/"
          },
          {
            "id": "r3_64_2",
            "word": "laptop",
            "meaningVi": "máy tính xách tay",
            "category": "Tech",
            "emoji": "💻",
            "pronunciation": "/ˈlæptɒp/"
          },
          {
            "id": "r3_64_3",
            "word": "screen",
            "meaningVi": "màn hình",
            "category": "Tech",
            "emoji": "🖥️",
            "pronunciation": "/skriːn/"
          }
        ]
      },
      {
        "id": "lvl-64-2",
        "unitId": "unit-64",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1090,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.87,
        "spawnInterval": 2080,
        "words": [
          {
            "id": "r3_64_4",
            "word": "sensor",
            "meaningVi": "cảm biến",
            "category": "Tech",
            "emoji": "📡",
            "pronunciation": "/ˈsensər/"
          },
          {
            "id": "r3_64_5",
            "word": "battery",
            "meaningVi": "cục pin",
            "category": "Tech",
            "emoji": "🔋",
            "pronunciation": "/ˈbætəri/"
          }
        ]
      },
      {
        "id": "lvl-64-3",
        "unitId": "unit-64",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1368,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.92,
        "spawnInterval": 1880,
        "words": [
          {
            "id": "r3_64_2",
            "word": "laptop",
            "meaningVi": "máy tính xách tay",
            "category": "Tech",
            "emoji": "💻",
            "pronunciation": "/ˈlæptɒp/"
          },
          {
            "id": "r3_64_3",
            "word": "screen",
            "meaningVi": "màn hình",
            "category": "Tech",
            "emoji": "🖥️",
            "pronunciation": "/skriːn/"
          },
          {
            "id": "r3_64_4",
            "word": "sensor",
            "meaningVi": "cảm biến",
            "category": "Tech",
            "emoji": "📡",
            "pronunciation": "/ˈsensər/"
          },
          {
            "id": "r3_64_5",
            "word": "battery",
            "meaningVi": "cục pin",
            "category": "Tech",
            "emoji": "🔋",
            "pronunciation": "/ˈbætəri/"
          },
          {
            "id": "r3_64_1",
            "word": "tablet",
            "meaningVi": "máy tính bảng",
            "category": "Tech",
            "emoji": "📱",
            "pronunciation": "/ˈtæblət/"
          }
        ]
      },
      {
        "id": "lvl-64-4",
        "unitId": "unit-64",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 64",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 52,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-64-5",
        "unitId": "unit-64",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1760,
        "xpReward": 62,
        "gemReward": 15,
        "speedMultiplier": 0.94,
        "spawnInterval": 1680,
        "words": [
          {
            "id": "r3_64_1",
            "word": "tablet",
            "meaningVi": "máy tính bảng",
            "category": "Tech",
            "emoji": "📱",
            "pronunciation": "/ˈtæblət/"
          },
          {
            "id": "r3_64_2",
            "word": "laptop",
            "meaningVi": "máy tính xách tay",
            "category": "Tech",
            "emoji": "💻",
            "pronunciation": "/ˈlæptɒp/"
          },
          {
            "id": "r3_64_3",
            "word": "screen",
            "meaningVi": "màn hình",
            "category": "Tech",
            "emoji": "🖥️",
            "pronunciation": "/skriːn/"
          },
          {
            "id": "r3_64_4",
            "word": "sensor",
            "meaningVi": "cảm biến",
            "category": "Tech",
            "emoji": "📡",
            "pronunciation": "/ˈsensər/"
          },
          {
            "id": "r3_64_5",
            "word": "battery",
            "meaningVi": "cục pin",
            "category": "Tech",
            "emoji": "🔋",
            "pronunciation": "/ˈbætəri/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-65",
    "unitNumber": 65,
    "title": "Celebrations",
    "titleVi": "Lễ Hội & Kỷ Niệm",
    "description": "Pháo hoa rực sáng, diễu hành rộn rã và lồng đèn lung linh.",
    "icon": "🎆",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-500/30 via-rose-500/20 to-purple-600/30",
    "levels": [
      {
        "id": "lvl-65-1",
        "unitId": "unit-65",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎆",
        "bgColor": "#ec4899",
        "targetScore": 1000,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.82,
        "spawnInterval": 2175,
        "words": [
          {
            "id": "r3_65_1",
            "word": "festival",
            "meaningVi": "lễ hội",
            "category": "Holidays",
            "emoji": "🎪",
            "pronunciation": "/ˈfestɪvl/"
          },
          {
            "id": "r3_65_2",
            "word": "holiday",
            "meaningVi": "kỳ nghỉ lễ",
            "category": "Holidays",
            "emoji": "🏖️",
            "pronunciation": "/ˈhɒlədeɪ/"
          },
          {
            "id": "r3_65_3",
            "word": "fireworks",
            "meaningVi": "pháo hoa",
            "category": "Holidays",
            "emoji": "🎆",
            "pronunciation": "/ˈfaɪəwɜːks/"
          }
        ]
      },
      {
        "id": "lvl-65-2",
        "unitId": "unit-65",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1100,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.87,
        "spawnInterval": 2075,
        "words": [
          {
            "id": "r3_65_4",
            "word": "parade",
            "meaningVi": "cuộc diễu hành",
            "category": "Holidays",
            "emoji": "🎺",
            "pronunciation": "/pəˈreɪd/"
          },
          {
            "id": "r3_65_5",
            "word": "lantern",
            "meaningVi": "đèn lồng",
            "category": "Holidays",
            "emoji": "🏮",
            "pronunciation": "/ˈlæntən/"
          }
        ]
      },
      {
        "id": "lvl-65-3",
        "unitId": "unit-65",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1380,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.92,
        "spawnInterval": 1875,
        "words": [
          {
            "id": "r3_65_2",
            "word": "holiday",
            "meaningVi": "kỳ nghỉ lễ",
            "category": "Holidays",
            "emoji": "🏖️",
            "pronunciation": "/ˈhɒlədeɪ/"
          },
          {
            "id": "r3_65_3",
            "word": "fireworks",
            "meaningVi": "pháo hoa",
            "category": "Holidays",
            "emoji": "🎆",
            "pronunciation": "/ˈfaɪəwɜːks/"
          },
          {
            "id": "r3_65_4",
            "word": "parade",
            "meaningVi": "cuộc diễu hành",
            "category": "Holidays",
            "emoji": "🎺",
            "pronunciation": "/pəˈreɪd/"
          },
          {
            "id": "r3_65_5",
            "word": "lantern",
            "meaningVi": "đèn lồng",
            "category": "Holidays",
            "emoji": "🏮",
            "pronunciation": "/ˈlæntən/"
          },
          {
            "id": "r3_65_1",
            "word": "festival",
            "meaningVi": "lễ hội",
            "category": "Holidays",
            "emoji": "🎪",
            "pronunciation": "/ˈfestɪvl/"
          }
        ]
      },
      {
        "id": "lvl-65-4",
        "unitId": "unit-65",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 65",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 53,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-65-5",
        "unitId": "unit-65",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1775,
        "xpReward": 63,
        "gemReward": 15,
        "speedMultiplier": 0.94,
        "spawnInterval": 1675,
        "words": [
          {
            "id": "r3_65_1",
            "word": "festival",
            "meaningVi": "lễ hội",
            "category": "Holidays",
            "emoji": "🎪",
            "pronunciation": "/ˈfestɪvl/"
          },
          {
            "id": "r3_65_2",
            "word": "holiday",
            "meaningVi": "kỳ nghỉ lễ",
            "category": "Holidays",
            "emoji": "🏖️",
            "pronunciation": "/ˈhɒlədeɪ/"
          },
          {
            "id": "r3_65_3",
            "word": "fireworks",
            "meaningVi": "pháo hoa",
            "category": "Holidays",
            "emoji": "🎆",
            "pronunciation": "/ˈfaɪəwɜːks/"
          },
          {
            "id": "r3_65_4",
            "word": "parade",
            "meaningVi": "cuộc diễu hành",
            "category": "Holidays",
            "emoji": "🎺",
            "pronunciation": "/pəˈreɪd/"
          },
          {
            "id": "r3_65_5",
            "word": "lantern",
            "meaningVi": "đèn lồng",
            "category": "Holidays",
            "emoji": "🏮",
            "pronunciation": "/ˈlæntən/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-66",
    "unitNumber": 66,
    "title": "Caring for Earth",
    "titleVi": "Bảo Vệ Môi Trường",
    "description": "Tái chế rác thải, trồng rừng và giữ gìn nguồn nước sạch.",
    "icon": "🌍",
    "themeColor": "#10b981",
    "bannerBg": "from-green-500/30 via-teal-500/20 to-emerald-600/30",
    "levels": [
      {
        "id": "lvl-66-1",
        "unitId": "unit-66",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌍",
        "bgColor": "#10b981",
        "targetScore": 1010,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.82,
        "spawnInterval": 2170,
        "words": [
          {
            "id": "r3_66_1",
            "word": "recycle",
            "meaningVi": "tái chế",
            "category": "Eco",
            "emoji": "♻️",
            "pronunciation": "/ˌriːˈsaɪkl/"
          },
          {
            "id": "r3_66_2",
            "word": "nature",
            "meaningVi": "thiên nhiên",
            "category": "Eco",
            "emoji": "🌲",
            "pronunciation": "/ˈneɪtʃər/"
          },
          {
            "id": "r3_66_3",
            "word": "forest",
            "meaningVi": "khu rừng",
            "category": "Eco",
            "emoji": "🌳",
            "pronunciation": "/ˈfɒrɪst/"
          }
        ]
      },
      {
        "id": "lvl-66-2",
        "unitId": "unit-66",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1110,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.87,
        "spawnInterval": 2070,
        "words": [
          {
            "id": "r3_66_4",
            "word": "protect",
            "meaningVi": "bảo vệ",
            "category": "Eco",
            "emoji": "🛡️",
            "pronunciation": "/prəˈtekt/"
          },
          {
            "id": "r3_66_5",
            "word": "cleaner",
            "meaningVi": "sạch hơn",
            "category": "Eco",
            "emoji": "✨",
            "pronunciation": "/ˈkliːnər/"
          }
        ]
      },
      {
        "id": "lvl-66-3",
        "unitId": "unit-66",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1392,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.92,
        "spawnInterval": 1870,
        "words": [
          {
            "id": "r3_66_2",
            "word": "nature",
            "meaningVi": "thiên nhiên",
            "category": "Eco",
            "emoji": "🌲",
            "pronunciation": "/ˈneɪtʃər/"
          },
          {
            "id": "r3_66_3",
            "word": "forest",
            "meaningVi": "khu rừng",
            "category": "Eco",
            "emoji": "🌳",
            "pronunciation": "/ˈfɒrɪst/"
          },
          {
            "id": "r3_66_4",
            "word": "protect",
            "meaningVi": "bảo vệ",
            "category": "Eco",
            "emoji": "🛡️",
            "pronunciation": "/prəˈtekt/"
          },
          {
            "id": "r3_66_5",
            "word": "cleaner",
            "meaningVi": "sạch hơn",
            "category": "Eco",
            "emoji": "✨",
            "pronunciation": "/ˈkliːnər/"
          },
          {
            "id": "r3_66_1",
            "word": "recycle",
            "meaningVi": "tái chế",
            "category": "Eco",
            "emoji": "♻️",
            "pronunciation": "/ˌriːˈsaɪkl/"
          }
        ]
      },
      {
        "id": "lvl-66-4",
        "unitId": "unit-66",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 66",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 53,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-66-5",
        "unitId": "unit-66",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1790,
        "xpReward": 63,
        "gemReward": 15,
        "speedMultiplier": 0.94,
        "spawnInterval": 1670,
        "words": [
          {
            "id": "r3_66_1",
            "word": "recycle",
            "meaningVi": "tái chế",
            "category": "Eco",
            "emoji": "♻️",
            "pronunciation": "/ˌriːˈsaɪkl/"
          },
          {
            "id": "r3_66_2",
            "word": "nature",
            "meaningVi": "thiên nhiên",
            "category": "Eco",
            "emoji": "🌲",
            "pronunciation": "/ˈneɪtʃər/"
          },
          {
            "id": "r3_66_3",
            "word": "forest",
            "meaningVi": "khu rừng",
            "category": "Eco",
            "emoji": "🌳",
            "pronunciation": "/ˈfɒrɪst/"
          },
          {
            "id": "r3_66_4",
            "word": "protect",
            "meaningVi": "bảo vệ",
            "category": "Eco",
            "emoji": "🛡️",
            "pronunciation": "/prəˈtekt/"
          },
          {
            "id": "r3_66_5",
            "word": "cleaner",
            "meaningVi": "sạch hơn",
            "category": "Eco",
            "emoji": "✨",
            "pronunciation": "/ˈkliːnər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-67",
    "unitNumber": 67,
    "title": "Earth Landscapes",
    "titleVi": "Địa Hình Trái Đất",
    "description": "Thung lũng xanh, hòn đảo ngọc, hẻm núi hùng vĩ và sa mạc.",
    "icon": "🏜️",
    "themeColor": "#d97706",
    "bannerBg": "from-amber-500/30 via-yellow-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-67-1",
        "unitId": "unit-67",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏜️",
        "bgColor": "#d97706",
        "targetScore": 1020,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.83,
        "spawnInterval": 2165,
        "words": [
          {
            "id": "r3_67_1",
            "word": "valley",
            "meaningVi": "thung lũng",
            "category": "Geography",
            "emoji": "🏞️",
            "pronunciation": "/ˈvæli/"
          },
          {
            "id": "r3_67_2",
            "word": "island",
            "meaningVi": "hòn đảo",
            "category": "Geography",
            "emoji": "🏝️",
            "pronunciation": "/ˈaɪlənd/"
          },
          {
            "id": "r3_67_3",
            "word": "canyon",
            "meaningVi": "hẻm núi đá",
            "category": "Geography",
            "emoji": "🏜️",
            "pronunciation": "/ˈkænjən/"
          }
        ]
      },
      {
        "id": "lvl-67-2",
        "unitId": "unit-67",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1120,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.88,
        "spawnInterval": 2065,
        "words": [
          {
            "id": "r3_67_4",
            "word": "mountain",
            "meaningVi": "ngọn núi cao",
            "category": "Geography",
            "emoji": "⛰️",
            "pronunciation": "/ˈmaʊntɪn/"
          },
          {
            "id": "r3_67_5",
            "word": "desert",
            "meaningVi": "sa mạc",
            "category": "Geography",
            "emoji": "🐪",
            "pronunciation": "/ˈdezət/"
          }
        ]
      },
      {
        "id": "lvl-67-3",
        "unitId": "unit-67",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1404,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.93,
        "spawnInterval": 1865,
        "words": [
          {
            "id": "r3_67_2",
            "word": "island",
            "meaningVi": "hòn đảo",
            "category": "Geography",
            "emoji": "🏝️",
            "pronunciation": "/ˈaɪlənd/"
          },
          {
            "id": "r3_67_3",
            "word": "canyon",
            "meaningVi": "hẻm núi đá",
            "category": "Geography",
            "emoji": "🏜️",
            "pronunciation": "/ˈkænjən/"
          },
          {
            "id": "r3_67_4",
            "word": "mountain",
            "meaningVi": "ngọn núi cao",
            "category": "Geography",
            "emoji": "⛰️",
            "pronunciation": "/ˈmaʊntɪn/"
          },
          {
            "id": "r3_67_5",
            "word": "desert",
            "meaningVi": "sa mạc",
            "category": "Geography",
            "emoji": "🐪",
            "pronunciation": "/ˈdezət/"
          },
          {
            "id": "r3_67_1",
            "word": "valley",
            "meaningVi": "thung lũng",
            "category": "Geography",
            "emoji": "🏞️",
            "pronunciation": "/ˈvæli/"
          }
        ]
      },
      {
        "id": "lvl-67-4",
        "unitId": "unit-67",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 67",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 53,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-67-5",
        "unitId": "unit-67",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1805,
        "xpReward": 63,
        "gemReward": 15,
        "speedMultiplier": 0.95,
        "spawnInterval": 1665,
        "words": [
          {
            "id": "r3_67_1",
            "word": "valley",
            "meaningVi": "thung lũng",
            "category": "Geography",
            "emoji": "🏞️",
            "pronunciation": "/ˈvæli/"
          },
          {
            "id": "r3_67_2",
            "word": "island",
            "meaningVi": "hòn đảo",
            "category": "Geography",
            "emoji": "🏝️",
            "pronunciation": "/ˈaɪlənd/"
          },
          {
            "id": "r3_67_3",
            "word": "canyon",
            "meaningVi": "hẻm núi đá",
            "category": "Geography",
            "emoji": "🏜️",
            "pronunciation": "/ˈkænjən/"
          },
          {
            "id": "r3_67_4",
            "word": "mountain",
            "meaningVi": "ngọn núi cao",
            "category": "Geography",
            "emoji": "⛰️",
            "pronunciation": "/ˈmaʊntɪn/"
          },
          {
            "id": "r3_67_5",
            "word": "desert",
            "meaningVi": "sa mạc",
            "category": "Geography",
            "emoji": "🐪",
            "pronunciation": "/ˈdezət/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-68",
    "unitNumber": 68,
    "title": "Modern Kitchen",
    "titleVi": "Đồ Dùng Bếp Hiện Đại",
    "description": "Máy xay sinh tố, lò nướng bánh mì, ấm siêu tốc.",
    "icon": "🍲",
    "themeColor": "#f97316",
    "bannerBg": "from-orange-500/30 via-rose-500/20 to-amber-600/30",
    "levels": [
      {
        "id": "lvl-68-1",
        "unitId": "unit-68",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🍲",
        "bgColor": "#f97316",
        "targetScore": 1030,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.83,
        "spawnInterval": 2160,
        "words": [
          {
            "id": "r3_68_1",
            "word": "blender",
            "meaningVi": "máy xay sinh tố",
            "category": "Kitchen",
            "emoji": "🍹",
            "pronunciation": "/ˈblendər/"
          },
          {
            "id": "r3_68_2",
            "word": "toaster",
            "meaningVi": "máy nướng bánh mì",
            "category": "Kitchen",
            "emoji": "🍞",
            "pronunciation": "/ˈtəʊstər/"
          },
          {
            "id": "r3_68_3",
            "word": "freezer",
            "meaningVi": "ngăn đông tủ lạnh",
            "category": "Kitchen",
            "emoji": "🧊",
            "pronunciation": "/ˈfriːzər/"
          }
        ]
      },
      {
        "id": "lvl-68-2",
        "unitId": "unit-68",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1130,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.88,
        "spawnInterval": 2060,
        "words": [
          {
            "id": "r3_68_4",
            "word": "kettle",
            "meaningVi": "ấm đun nước",
            "category": "Kitchen",
            "emoji": "🫖",
            "pronunciation": "/ˈketl/"
          },
          {
            "id": "r3_68_5",
            "word": "spatula",
            "meaningVi": "xẻng nấu ăn",
            "category": "Kitchen",
            "emoji": "🍳",
            "pronunciation": "/ˈspætʃələ/"
          }
        ]
      },
      {
        "id": "lvl-68-3",
        "unitId": "unit-68",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1416,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.93,
        "spawnInterval": 1860,
        "words": [
          {
            "id": "r3_68_2",
            "word": "toaster",
            "meaningVi": "máy nướng bánh mì",
            "category": "Kitchen",
            "emoji": "🍞",
            "pronunciation": "/ˈtəʊstər/"
          },
          {
            "id": "r3_68_3",
            "word": "freezer",
            "meaningVi": "ngăn đông tủ lạnh",
            "category": "Kitchen",
            "emoji": "🧊",
            "pronunciation": "/ˈfriːzər/"
          },
          {
            "id": "r3_68_4",
            "word": "kettle",
            "meaningVi": "ấm đun nước",
            "category": "Kitchen",
            "emoji": "🫖",
            "pronunciation": "/ˈketl/"
          },
          {
            "id": "r3_68_5",
            "word": "spatula",
            "meaningVi": "xẻng nấu ăn",
            "category": "Kitchen",
            "emoji": "🍳",
            "pronunciation": "/ˈspætʃələ/"
          },
          {
            "id": "r3_68_1",
            "word": "blender",
            "meaningVi": "máy xay sinh tố",
            "category": "Kitchen",
            "emoji": "🍹",
            "pronunciation": "/ˈblendər/"
          }
        ]
      },
      {
        "id": "lvl-68-4",
        "unitId": "unit-68",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 68",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 53,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-68-5",
        "unitId": "unit-68",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1820,
        "xpReward": 63,
        "gemReward": 15,
        "speedMultiplier": 0.95,
        "spawnInterval": 1660,
        "words": [
          {
            "id": "r3_68_1",
            "word": "blender",
            "meaningVi": "máy xay sinh tố",
            "category": "Kitchen",
            "emoji": "🍹",
            "pronunciation": "/ˈblendər/"
          },
          {
            "id": "r3_68_2",
            "word": "toaster",
            "meaningVi": "máy nướng bánh mì",
            "category": "Kitchen",
            "emoji": "🍞",
            "pronunciation": "/ˈtəʊstər/"
          },
          {
            "id": "r3_68_3",
            "word": "freezer",
            "meaningVi": "ngăn đông tủ lạnh",
            "category": "Kitchen",
            "emoji": "🧊",
            "pronunciation": "/ˈfriːzər/"
          },
          {
            "id": "r3_68_4",
            "word": "kettle",
            "meaningVi": "ấm đun nước",
            "category": "Kitchen",
            "emoji": "🫖",
            "pronunciation": "/ˈketl/"
          },
          {
            "id": "r3_68_5",
            "word": "spatula",
            "meaningVi": "xẻng nấu ăn",
            "category": "Kitchen",
            "emoji": "🍳",
            "pronunciation": "/ˈspætʃələ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-69",
    "unitNumber": 69,
    "title": "Feelings & Personality",
    "titleVi": "Cảm Xúc & Tính Cách",
    "description": "Tò mò khám phá, thân thiện, sáng tạo và chân thành.",
    "icon": "😊",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-500/30 via-indigo-500/20 to-pink-600/30",
    "levels": [
      {
        "id": "lvl-69-1",
        "unitId": "unit-69",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "😊",
        "bgColor": "#8b5cf6",
        "targetScore": 1040,
        "xpReward": 26,
        "gemReward": 5,
        "speedMultiplier": 0.83,
        "spawnInterval": 2155,
        "words": [
          {
            "id": "r3_69_1",
            "word": "curious",
            "meaningVi": "tò mò ham học",
            "category": "Personality",
            "emoji": "🧐",
            "pronunciation": "/ˈkjʊəriəs/"
          },
          {
            "id": "r3_69_2",
            "word": "friendly",
            "meaningVi": "thân thiện",
            "category": "Personality",
            "emoji": "🤝",
            "pronunciation": "/ˈfrendli/"
          },
          {
            "id": "r3_69_3",
            "word": "helpful",
            "meaningVi": "hay giúp đỡ",
            "category": "Personality",
            "emoji": "🤲",
            "pronunciation": "/ˈhelpfl/"
          }
        ]
      },
      {
        "id": "lvl-69-2",
        "unitId": "unit-69",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1140,
        "xpReward": 31,
        "gemReward": 6,
        "speedMultiplier": 0.88,
        "spawnInterval": 2055,
        "words": [
          {
            "id": "r3_69_4",
            "word": "creative",
            "meaningVi": "sáng tạo",
            "category": "Personality",
            "emoji": "💡",
            "pronunciation": "/kriˈeɪtɪv/"
          },
          {
            "id": "r3_69_5",
            "word": "honest",
            "meaningVi": "trung thực",
            "category": "Personality",
            "emoji": "😇",
            "pronunciation": "/ˈɒnɪst/"
          }
        ]
      },
      {
        "id": "lvl-69-3",
        "unitId": "unit-69",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1428,
        "xpReward": 36,
        "gemReward": 8,
        "speedMultiplier": 0.93,
        "spawnInterval": 1855,
        "words": [
          {
            "id": "r3_69_2",
            "word": "friendly",
            "meaningVi": "thân thiện",
            "category": "Personality",
            "emoji": "🤝",
            "pronunciation": "/ˈfrendli/"
          },
          {
            "id": "r3_69_3",
            "word": "helpful",
            "meaningVi": "hay giúp đỡ",
            "category": "Personality",
            "emoji": "🤲",
            "pronunciation": "/ˈhelpfl/"
          },
          {
            "id": "r3_69_4",
            "word": "creative",
            "meaningVi": "sáng tạo",
            "category": "Personality",
            "emoji": "💡",
            "pronunciation": "/kriˈeɪtɪv/"
          },
          {
            "id": "r3_69_5",
            "word": "honest",
            "meaningVi": "trung thực",
            "category": "Personality",
            "emoji": "😇",
            "pronunciation": "/ˈɒnɪst/"
          },
          {
            "id": "r3_69_1",
            "word": "curious",
            "meaningVi": "tò mò ham học",
            "category": "Personality",
            "emoji": "🧐",
            "pronunciation": "/ˈkjʊəriəs/"
          }
        ]
      },
      {
        "id": "lvl-69-4",
        "unitId": "unit-69",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 69",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 53,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-69-5",
        "unitId": "unit-69",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1835,
        "xpReward": 63,
        "gemReward": 15,
        "speedMultiplier": 0.95,
        "spawnInterval": 1655,
        "words": [
          {
            "id": "r3_69_1",
            "word": "curious",
            "meaningVi": "tò mò ham học",
            "category": "Personality",
            "emoji": "🧐",
            "pronunciation": "/ˈkjʊəriəs/"
          },
          {
            "id": "r3_69_2",
            "word": "friendly",
            "meaningVi": "thân thiện",
            "category": "Personality",
            "emoji": "🤝",
            "pronunciation": "/ˈfrendli/"
          },
          {
            "id": "r3_69_3",
            "word": "helpful",
            "meaningVi": "hay giúp đỡ",
            "category": "Personality",
            "emoji": "🤲",
            "pronunciation": "/ˈhelpfl/"
          },
          {
            "id": "r3_69_4",
            "word": "creative",
            "meaningVi": "sáng tạo",
            "category": "Personality",
            "emoji": "💡",
            "pronunciation": "/kriˈeɪtɪv/"
          },
          {
            "id": "r3_69_5",
            "word": "honest",
            "meaningVi": "trung thực",
            "category": "Personality",
            "emoji": "😇",
            "pronunciation": "/ˈɒnɪst/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-70",
    "unitNumber": 70,
    "title": "Hobbies & Talents",
    "titleVi": "Sở Thích & Tài Năng",
    "description": "Hội họa, khiêu vũ, làm bánh và trượt patin.",
    "icon": "🎨",
    "themeColor": "#ec4899",
    "bannerBg": "from-pink-500/30 via-violet-500/20 to-purple-600/30",
    "levels": [
      {
        "id": "lvl-70-1",
        "unitId": "unit-70",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎨",
        "bgColor": "#ec4899",
        "targetScore": 1050,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.84,
        "spawnInterval": 2150,
        "words": [
          {
            "id": "r3_70_1",
            "word": "painting",
            "meaningVi": "vẽ tranh",
            "category": "Hobbies",
            "emoji": "🎨",
            "pronunciation": "/ˈpeɪntɪŋ/"
          },
          {
            "id": "r3_70_2",
            "word": "dancing",
            "meaningVi": "khiêu vũ",
            "category": "Hobbies",
            "emoji": "💃",
            "pronunciation": "/ˈdɑːnsɪŋ/"
          },
          {
            "id": "r3_70_3",
            "word": "baking",
            "meaningVi": "làm bánh ngọt",
            "category": "Hobbies",
            "emoji": "🧁",
            "pronunciation": "/ˈbeɪkɪŋ/"
          }
        ]
      },
      {
        "id": "lvl-70-2",
        "unitId": "unit-70",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1150,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.89,
        "spawnInterval": 2050,
        "words": [
          {
            "id": "r3_70_4",
            "word": "skating",
            "meaningVi": "trượt patin",
            "category": "Hobbies",
            "emoji": "🛼",
            "pronunciation": "/ˈskeɪtɪŋ/"
          },
          {
            "id": "r3_70_5",
            "word": "crafting",
            "meaningVi": "làm đồ thủ công",
            "category": "Hobbies",
            "emoji": "✂️",
            "pronunciation": "/ˈkrɑːftɪŋ/"
          }
        ]
      },
      {
        "id": "lvl-70-3",
        "unitId": "unit-70",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1440,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.94,
        "spawnInterval": 1850,
        "words": [
          {
            "id": "r3_70_2",
            "word": "dancing",
            "meaningVi": "khiêu vũ",
            "category": "Hobbies",
            "emoji": "💃",
            "pronunciation": "/ˈdɑːnsɪŋ/"
          },
          {
            "id": "r3_70_3",
            "word": "baking",
            "meaningVi": "làm bánh ngọt",
            "category": "Hobbies",
            "emoji": "🧁",
            "pronunciation": "/ˈbeɪkɪŋ/"
          },
          {
            "id": "r3_70_4",
            "word": "skating",
            "meaningVi": "trượt patin",
            "category": "Hobbies",
            "emoji": "🛼",
            "pronunciation": "/ˈskeɪtɪŋ/"
          },
          {
            "id": "r3_70_5",
            "word": "crafting",
            "meaningVi": "làm đồ thủ công",
            "category": "Hobbies",
            "emoji": "✂️",
            "pronunciation": "/ˈkrɑːftɪŋ/"
          },
          {
            "id": "r3_70_1",
            "word": "painting",
            "meaningVi": "vẽ tranh",
            "category": "Hobbies",
            "emoji": "🎨",
            "pronunciation": "/ˈpeɪntɪŋ/"
          }
        ]
      },
      {
        "id": "lvl-70-4",
        "unitId": "unit-70",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 70",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 54,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-70-5",
        "unitId": "unit-70",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1850,
        "xpReward": 64,
        "gemReward": 15,
        "speedMultiplier": 0.96,
        "spawnInterval": 1650,
        "words": [
          {
            "id": "r3_70_1",
            "word": "painting",
            "meaningVi": "vẽ tranh",
            "category": "Hobbies",
            "emoji": "🎨",
            "pronunciation": "/ˈpeɪntɪŋ/"
          },
          {
            "id": "r3_70_2",
            "word": "dancing",
            "meaningVi": "khiêu vũ",
            "category": "Hobbies",
            "emoji": "💃",
            "pronunciation": "/ˈdɑːnsɪŋ/"
          },
          {
            "id": "r3_70_3",
            "word": "baking",
            "meaningVi": "làm bánh ngọt",
            "category": "Hobbies",
            "emoji": "🧁",
            "pronunciation": "/ˈbeɪkɪŋ/"
          },
          {
            "id": "r3_70_4",
            "word": "skating",
            "meaningVi": "trượt patin",
            "category": "Hobbies",
            "emoji": "🛼",
            "pronunciation": "/ˈskeɪtɪŋ/"
          },
          {
            "id": "r3_70_5",
            "word": "crafting",
            "meaningVi": "làm đồ thủ công",
            "category": "Hobbies",
            "emoji": "✂️",
            "pronunciation": "/ˈkrɑːftɪŋ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-71",
    "unitNumber": 71,
    "title": "Travel & Vacation",
    "titleVi": "Du Lịch & Nghỉ Dưỡng",
    "description": "Hành lý xếp gọn, vé máy bay, hộ chiếu và khu nghỉ dưỡng.",
    "icon": "✈️",
    "themeColor": "#0ea5e9",
    "bannerBg": "from-sky-500/30 via-cyan-500/20 to-blue-600/30",
    "levels": [
      {
        "id": "lvl-71-1",
        "unitId": "unit-71",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "✈️",
        "bgColor": "#0ea5e9",
        "targetScore": 1060,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.84,
        "spawnInterval": 2145,
        "words": [
          {
            "id": "r3_71_1",
            "word": "luggage",
            "meaningVi": "hành lý xách tay",
            "category": "Travel",
            "emoji": "🧳",
            "pronunciation": "/ˈlʌɡɪdʒ/"
          },
          {
            "id": "r3_71_2",
            "word": "ticket",
            "meaningVi": "vé du lịch / xe",
            "category": "Travel",
            "emoji": "🎫",
            "pronunciation": "/ˈtɪkɪt/"
          },
          {
            "id": "r3_71_3",
            "word": "passport",
            "meaningVi": "hộ chiếu",
            "category": "Travel",
            "emoji": "🛂",
            "pronunciation": "/ˈpɑːspɔːt/"
          }
        ]
      },
      {
        "id": "lvl-71-2",
        "unitId": "unit-71",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1160,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.89,
        "spawnInterval": 2045,
        "words": [
          {
            "id": "r3_71_4",
            "word": "resort",
            "meaningVi": "khu nghỉ dưỡng",
            "category": "Travel",
            "emoji": "🏖️",
            "pronunciation": "/rɪˈzɔːt/"
          },
          {
            "id": "r3_71_5",
            "word": "voyage",
            "meaningVi": "chuyến hải trình",
            "category": "Travel",
            "emoji": "🚢",
            "pronunciation": "/ˈvɔɪɪdʒ/"
          }
        ]
      },
      {
        "id": "lvl-71-3",
        "unitId": "unit-71",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1452,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.94,
        "spawnInterval": 1845,
        "words": [
          {
            "id": "r3_71_2",
            "word": "ticket",
            "meaningVi": "vé du lịch / xe",
            "category": "Travel",
            "emoji": "🎫",
            "pronunciation": "/ˈtɪkɪt/"
          },
          {
            "id": "r3_71_3",
            "word": "passport",
            "meaningVi": "hộ chiếu",
            "category": "Travel",
            "emoji": "🛂",
            "pronunciation": "/ˈpɑːspɔːt/"
          },
          {
            "id": "r3_71_4",
            "word": "resort",
            "meaningVi": "khu nghỉ dưỡng",
            "category": "Travel",
            "emoji": "🏖️",
            "pronunciation": "/rɪˈzɔːt/"
          },
          {
            "id": "r3_71_5",
            "word": "voyage",
            "meaningVi": "chuyến hải trình",
            "category": "Travel",
            "emoji": "🚢",
            "pronunciation": "/ˈvɔɪɪdʒ/"
          },
          {
            "id": "r3_71_1",
            "word": "luggage",
            "meaningVi": "hành lý xách tay",
            "category": "Travel",
            "emoji": "🧳",
            "pronunciation": "/ˈlʌɡɪdʒ/"
          }
        ]
      },
      {
        "id": "lvl-71-4",
        "unitId": "unit-71",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 71",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 54,
        "gemReward": 27,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-71-5",
        "unitId": "unit-71",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1865,
        "xpReward": 64,
        "gemReward": 15,
        "speedMultiplier": 0.96,
        "spawnInterval": 1645,
        "words": [
          {
            "id": "r3_71_1",
            "word": "luggage",
            "meaningVi": "hành lý xách tay",
            "category": "Travel",
            "emoji": "🧳",
            "pronunciation": "/ˈlʌɡɪdʒ/"
          },
          {
            "id": "r3_71_2",
            "word": "ticket",
            "meaningVi": "vé du lịch / xe",
            "category": "Travel",
            "emoji": "🎫",
            "pronunciation": "/ˈtɪkɪt/"
          },
          {
            "id": "r3_71_3",
            "word": "passport",
            "meaningVi": "hộ chiếu",
            "category": "Travel",
            "emoji": "🛂",
            "pronunciation": "/ˈpɑːspɔːt/"
          },
          {
            "id": "r3_71_4",
            "word": "resort",
            "meaningVi": "khu nghỉ dưỡng",
            "category": "Travel",
            "emoji": "🏖️",
            "pronunciation": "/rɪˈzɔːt/"
          },
          {
            "id": "r3_71_5",
            "word": "voyage",
            "meaningVi": "chuyến hải trình",
            "category": "Travel",
            "emoji": "🚢",
            "pronunciation": "/ˈvɔɪɪdʒ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-72",
    "unitNumber": 72,
    "title": "Amusement Park",
    "titleVi": "Công Viên Giải Trí",
    "description": "Tàu lượn siêu tốc, vòng quay khổng lồ và bắp rang bơ giòn.",
    "icon": "🎡",
    "themeColor": "#f59e0b",
    "bannerBg": "from-amber-500/30 via-orange-500/20 to-yellow-600/30",
    "levels": [
      {
        "id": "lvl-72-1",
        "unitId": "unit-72",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🎡",
        "bgColor": "#f59e0b",
        "targetScore": 1070,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.84,
        "spawnInterval": 2140,
        "words": [
          {
            "id": "r3_72_1",
            "word": "coaster",
            "meaningVi": "tàu lượn siêu tốc",
            "category": "Park",
            "emoji": "🎢",
            "pronunciation": "/ˈkəʊstər/"
          },
          {
            "id": "r3_72_2",
            "word": "ferris",
            "meaningVi": "vòng đu quay đứng",
            "category": "Park",
            "emoji": "🎡",
            "pronunciation": "/ˈferɪs/"
          },
          {
            "id": "r3_72_3",
            "word": "carousel",
            "meaningVi": "vòng quay ngựa gỗ",
            "category": "Park",
            "emoji": "🎠",
            "pronunciation": "/ˌkærəˈsel/"
          }
        ]
      },
      {
        "id": "lvl-72-2",
        "unitId": "unit-72",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1170,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.89,
        "spawnInterval": 2040,
        "words": [
          {
            "id": "r3_72_4",
            "word": "popcorn",
            "meaningVi": "bắp rang bơ",
            "category": "Park",
            "emoji": "🍿",
            "pronunciation": "/ˈpɒpkɔːn/"
          }
        ]
      },
      {
        "id": "lvl-72-3",
        "unitId": "unit-72",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1464,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.94,
        "spawnInterval": 1840,
        "words": [
          {
            "id": "r3_72_2",
            "word": "ferris",
            "meaningVi": "vòng đu quay đứng",
            "category": "Park",
            "emoji": "🎡",
            "pronunciation": "/ˈferɪs/"
          },
          {
            "id": "r3_72_3",
            "word": "carousel",
            "meaningVi": "vòng quay ngựa gỗ",
            "category": "Park",
            "emoji": "🎠",
            "pronunciation": "/ˌkærəˈsel/"
          },
          {
            "id": "r3_72_4",
            "word": "popcorn",
            "meaningVi": "bắp rang bơ",
            "category": "Park",
            "emoji": "🍿",
            "pronunciation": "/ˈpɒpkɔːn/"
          },
          {
            "id": "r3_72_1",
            "word": "coaster",
            "meaningVi": "tàu lượn siêu tốc",
            "category": "Park",
            "emoji": "🎢",
            "pronunciation": "/ˈkəʊstər/"
          }
        ]
      },
      {
        "id": "lvl-72-4",
        "unitId": "unit-72",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 72",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 54,
        "gemReward": 29,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-72-5",
        "unitId": "unit-72",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1880,
        "xpReward": 64,
        "gemReward": 15,
        "speedMultiplier": 0.96,
        "spawnInterval": 1640,
        "words": [
          {
            "id": "r3_72_1",
            "word": "coaster",
            "meaningVi": "tàu lượn siêu tốc",
            "category": "Park",
            "emoji": "🎢",
            "pronunciation": "/ˈkəʊstər/"
          },
          {
            "id": "r3_72_2",
            "word": "ferris",
            "meaningVi": "vòng đu quay đứng",
            "category": "Park",
            "emoji": "🎡",
            "pronunciation": "/ˈferɪs/"
          },
          {
            "id": "r3_72_3",
            "word": "carousel",
            "meaningVi": "vòng quay ngựa gỗ",
            "category": "Park",
            "emoji": "🎠",
            "pronunciation": "/ˌkærəˈsel/"
          },
          {
            "id": "r3_72_4",
            "word": "popcorn",
            "meaningVi": "bắp rang bơ",
            "category": "Park",
            "emoji": "🍿",
            "pronunciation": "/ˈpɒpkɔːn/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-73",
    "unitNumber": 73,
    "title": "Cave Expedition",
    "titleVi": "Thám Hiểm Hang Động",
    "description": "Hang động thạch nhũ, ngọn đuốc soi đường và tiếng vọng xa.",
    "icon": "🕯️",
    "themeColor": "#64748b",
    "bannerBg": "from-slate-500/30 via-zinc-500/20 to-neutral-600/30",
    "levels": [
      {
        "id": "lvl-73-1",
        "unitId": "unit-73",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🕯️",
        "bgColor": "#64748b",
        "targetScore": 1080,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.85,
        "spawnInterval": 2135,
        "words": [
          {
            "id": "r3_73_1",
            "word": "cavern",
            "meaningVi": "hang động lớn",
            "category": "Caves",
            "emoji": "🪨",
            "pronunciation": "/ˈkævən/"
          },
          {
            "id": "r3_73_2",
            "word": "crystal",
            "meaningVi": "pha lê tinh thể",
            "category": "Caves",
            "emoji": "💎",
            "pronunciation": "/ˈkrɪstl/"
          },
          {
            "id": "r3_73_3",
            "word": "torch",
            "meaningVi": "ngọn đuốc",
            "category": "Caves",
            "emoji": "🔦",
            "pronunciation": "/tɔːtʃ/"
          }
        ]
      },
      {
        "id": "lvl-73-2",
        "unitId": "unit-73",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1180,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.9,
        "spawnInterval": 2035,
        "words": [
          {
            "id": "r3_73_4",
            "word": "echo",
            "meaningVi": "tiếng vang vọng",
            "category": "Caves",
            "emoji": "📢",
            "pronunciation": "/ˈekəʊ/"
          }
        ]
      },
      {
        "id": "lvl-73-3",
        "unitId": "unit-73",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1476,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.95,
        "spawnInterval": 1835,
        "words": [
          {
            "id": "r3_73_2",
            "word": "crystal",
            "meaningVi": "pha lê tinh thể",
            "category": "Caves",
            "emoji": "💎",
            "pronunciation": "/ˈkrɪstl/"
          },
          {
            "id": "r3_73_3",
            "word": "torch",
            "meaningVi": "ngọn đuốc",
            "category": "Caves",
            "emoji": "🔦",
            "pronunciation": "/tɔːtʃ/"
          },
          {
            "id": "r3_73_4",
            "word": "echo",
            "meaningVi": "tiếng vang vọng",
            "category": "Caves",
            "emoji": "📢",
            "pronunciation": "/ˈekəʊ/"
          },
          {
            "id": "r3_73_1",
            "word": "cavern",
            "meaningVi": "hang động lớn",
            "category": "Caves",
            "emoji": "🪨",
            "pronunciation": "/ˈkævən/"
          }
        ]
      },
      {
        "id": "lvl-73-4",
        "unitId": "unit-73",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 73",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 54,
        "gemReward": 31,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-73-5",
        "unitId": "unit-73",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1895,
        "xpReward": 64,
        "gemReward": 15,
        "speedMultiplier": 0.97,
        "spawnInterval": 1635,
        "words": [
          {
            "id": "r3_73_1",
            "word": "cavern",
            "meaningVi": "hang động lớn",
            "category": "Caves",
            "emoji": "🪨",
            "pronunciation": "/ˈkævən/"
          },
          {
            "id": "r3_73_2",
            "word": "crystal",
            "meaningVi": "pha lê tinh thể",
            "category": "Caves",
            "emoji": "💎",
            "pronunciation": "/ˈkrɪstl/"
          },
          {
            "id": "r3_73_3",
            "word": "torch",
            "meaningVi": "ngọn đuốc",
            "category": "Caves",
            "emoji": "🔦",
            "pronunciation": "/tɔːtʃ/"
          },
          {
            "id": "r3_73_4",
            "word": "echo",
            "meaningVi": "tiếng vang vọng",
            "category": "Caves",
            "emoji": "📢",
            "pronunciation": "/ˈekəʊ/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-74",
    "unitNumber": 74,
    "title": "Housing Styles",
    "titleVi": "Kiến Trúc Nhà Cửa",
    "description": "Căn hộ chung cư, biệt thự sân vườn và nhà gỗ ven đồi.",
    "icon": "🏡",
    "themeColor": "#3b82f6",
    "bannerBg": "from-blue-500/30 via-sky-500/20 to-indigo-600/30",
    "levels": [
      {
        "id": "lvl-74-1",
        "unitId": "unit-74",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏡",
        "bgColor": "#3b82f6",
        "targetScore": 1090,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.85,
        "spawnInterval": 2130,
        "words": [
          {
            "id": "r3_74_1",
            "word": "apartment",
            "meaningVi": "căn hộ chung cư",
            "category": "Housing",
            "emoji": "🏢",
            "pronunciation": "/əˈpɑːtmənt/"
          },
          {
            "id": "r3_74_2",
            "word": "mansion",
            "meaningVi": "dinh thự nguy nga",
            "category": "Housing",
            "emoji": "🏰",
            "pronunciation": "/ˈmænʃn/"
          },
          {
            "id": "r3_74_3",
            "word": "cabin",
            "meaningVi": "nhà gỗ nhỏ",
            "category": "Housing",
            "emoji": "🛖",
            "pronunciation": "/ˈkæbɪn/"
          }
        ]
      },
      {
        "id": "lvl-74-2",
        "unitId": "unit-74",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1190,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.9,
        "spawnInterval": 2030,
        "words": [
          {
            "id": "r3_74_4",
            "word": "villa",
            "meaningVi": "biệt thự vườn",
            "category": "Housing",
            "emoji": "🏡",
            "pronunciation": "/ˈvɪlə/"
          }
        ]
      },
      {
        "id": "lvl-74-3",
        "unitId": "unit-74",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1488,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.95,
        "spawnInterval": 1830,
        "words": [
          {
            "id": "r3_74_2",
            "word": "mansion",
            "meaningVi": "dinh thự nguy nga",
            "category": "Housing",
            "emoji": "🏰",
            "pronunciation": "/ˈmænʃn/"
          },
          {
            "id": "r3_74_3",
            "word": "cabin",
            "meaningVi": "nhà gỗ nhỏ",
            "category": "Housing",
            "emoji": "🛖",
            "pronunciation": "/ˈkæbɪn/"
          },
          {
            "id": "r3_74_4",
            "word": "villa",
            "meaningVi": "biệt thự vườn",
            "category": "Housing",
            "emoji": "🏡",
            "pronunciation": "/ˈvɪlə/"
          },
          {
            "id": "r3_74_1",
            "word": "apartment",
            "meaningVi": "căn hộ chung cư",
            "category": "Housing",
            "emoji": "🏢",
            "pronunciation": "/əˈpɑːtmənt/"
          }
        ]
      },
      {
        "id": "lvl-74-4",
        "unitId": "unit-74",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 74",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 54,
        "gemReward": 33,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-74-5",
        "unitId": "unit-74",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1910,
        "xpReward": 64,
        "gemReward": 15,
        "speedMultiplier": 0.97,
        "spawnInterval": 1630,
        "words": [
          {
            "id": "r3_74_1",
            "word": "apartment",
            "meaningVi": "căn hộ chung cư",
            "category": "Housing",
            "emoji": "🏢",
            "pronunciation": "/əˈpɑːtmənt/"
          },
          {
            "id": "r3_74_2",
            "word": "mansion",
            "meaningVi": "dinh thự nguy nga",
            "category": "Housing",
            "emoji": "🏰",
            "pronunciation": "/ˈmænʃn/"
          },
          {
            "id": "r3_74_3",
            "word": "cabin",
            "meaningVi": "nhà gỗ nhỏ",
            "category": "Housing",
            "emoji": "🛖",
            "pronunciation": "/ˈkæbɪn/"
          },
          {
            "id": "r3_74_4",
            "word": "villa",
            "meaningVi": "biệt thự vườn",
            "category": "Housing",
            "emoji": "🏡",
            "pronunciation": "/ˈvɪlə/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-75",
    "unitNumber": 75,
    "title": "Department Store",
    "titleVi": "Cửa Hàng Bách Hóa",
    "description": "Quầy thu ngân, hóa đơn mua hàng và phiếu giảm giá.",
    "icon": "🏬",
    "themeColor": "#10b981",
    "bannerBg": "from-emerald-500/30 via-teal-500/20 to-green-600/30",
    "levels": [
      {
        "id": "lvl-75-1",
        "unitId": "unit-75",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🏬",
        "bgColor": "#10b981",
        "targetScore": 1100,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.85,
        "spawnInterval": 2125,
        "words": [
          {
            "id": "r3_75_1",
            "word": "counter",
            "meaningVi": "quầy thanh toán",
            "category": "Store",
            "emoji": "🏪",
            "pronunciation": "/ˈkaʊntər/"
          },
          {
            "id": "r3_75_2",
            "word": "cashier",
            "meaningVi": "nhân viên thu ngân",
            "category": "Store",
            "emoji": "🧑‍💼",
            "pronunciation": "/kæˈʃɪər/"
          },
          {
            "id": "r3_75_3",
            "word": "discount",
            "meaningVi": "giảm giá ưu đãi",
            "category": "Store",
            "emoji": "🏷️",
            "pronunciation": "/ˈdɪskaʊnt/"
          }
        ]
      },
      {
        "id": "lvl-75-2",
        "unitId": "unit-75",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1200,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.9,
        "spawnInterval": 2025,
        "words": [
          {
            "id": "r3_75_4",
            "word": "receipt",
            "meaningVi": "hóa đơn",
            "category": "Store",
            "emoji": "🧾",
            "pronunciation": "/rɪˈsiːt/"
          },
          {
            "id": "r3_75_5",
            "word": "customer",
            "meaningVi": "khách hàng",
            "category": "Store",
            "emoji": "🛍️",
            "pronunciation": "/ˈkʌstəmər/"
          }
        ]
      },
      {
        "id": "lvl-75-3",
        "unitId": "unit-75",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1500,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.95,
        "spawnInterval": 1825,
        "words": [
          {
            "id": "r3_75_2",
            "word": "cashier",
            "meaningVi": "nhân viên thu ngân",
            "category": "Store",
            "emoji": "🧑‍💼",
            "pronunciation": "/kæˈʃɪər/"
          },
          {
            "id": "r3_75_3",
            "word": "discount",
            "meaningVi": "giảm giá ưu đãi",
            "category": "Store",
            "emoji": "🏷️",
            "pronunciation": "/ˈdɪskaʊnt/"
          },
          {
            "id": "r3_75_4",
            "word": "receipt",
            "meaningVi": "hóa đơn",
            "category": "Store",
            "emoji": "🧾",
            "pronunciation": "/rɪˈsiːt/"
          },
          {
            "id": "r3_75_5",
            "word": "customer",
            "meaningVi": "khách hàng",
            "category": "Store",
            "emoji": "🛍️",
            "pronunciation": "/ˈkʌstəmər/"
          },
          {
            "id": "r3_75_1",
            "word": "counter",
            "meaningVi": "quầy thanh toán",
            "category": "Store",
            "emoji": "🏪",
            "pronunciation": "/ˈkaʊntər/"
          }
        ]
      },
      {
        "id": "lvl-75-4",
        "unitId": "unit-75",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 75",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 55,
        "gemReward": 35,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-75-5",
        "unitId": "unit-75",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1925,
        "xpReward": 65,
        "gemReward": 15,
        "speedMultiplier": 0.97,
        "spawnInterval": 1625,
        "words": [
          {
            "id": "r3_75_1",
            "word": "counter",
            "meaningVi": "quầy thanh toán",
            "category": "Store",
            "emoji": "🏪",
            "pronunciation": "/ˈkaʊntər/"
          },
          {
            "id": "r3_75_2",
            "word": "cashier",
            "meaningVi": "nhân viên thu ngân",
            "category": "Store",
            "emoji": "🧑‍💼",
            "pronunciation": "/kæˈʃɪər/"
          },
          {
            "id": "r3_75_3",
            "word": "discount",
            "meaningVi": "giảm giá ưu đãi",
            "category": "Store",
            "emoji": "🏷️",
            "pronunciation": "/ˈdɪskaʊnt/"
          },
          {
            "id": "r3_75_4",
            "word": "receipt",
            "meaningVi": "hóa đơn",
            "category": "Store",
            "emoji": "🧾",
            "pronunciation": "/rɪˈsiːt/"
          },
          {
            "id": "r3_75_5",
            "word": "customer",
            "meaningVi": "khách hàng",
            "category": "Store",
            "emoji": "🛍️",
            "pronunciation": "/ˈkʌstəmər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-76",
    "unitNumber": 76,
    "title": "Junior Science Lab",
    "titleVi": "Phòng Thí Nghiệm Nhí",
    "description": "Nam châm hút sắt, ống nghiệm thủy tinh và lăng kính quang học.",
    "icon": "🔬",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-500/30 via-violet-500/20 to-indigo-600/30",
    "levels": [
      {
        "id": "lvl-76-1",
        "unitId": "unit-76",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🔬",
        "bgColor": "#8b5cf6",
        "targetScore": 1110,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.86,
        "spawnInterval": 2120,
        "words": [
          {
            "id": "r3_76_1",
            "word": "magnet",
            "meaningVi": "thanh nam châm",
            "category": "Science",
            "emoji": "🧲",
            "pronunciation": "/ˈmæɡnət/"
          },
          {
            "id": "r3_76_2",
            "word": "beaker",
            "meaningVi": "cốc thí nghiệm",
            "category": "Science",
            "emoji": "🧪",
            "pronunciation": "/ˈbiːkər/"
          },
          {
            "id": "r3_76_3",
            "word": "sample",
            "meaningVi": "mẫu vật thử",
            "category": "Science",
            "emoji": "🧫",
            "pronunciation": "/ˈsɑːmpl/"
          }
        ]
      },
      {
        "id": "lvl-76-2",
        "unitId": "unit-76",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1210,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.91,
        "spawnInterval": 2020,
        "words": [
          {
            "id": "r3_76_4",
            "word": "lens",
            "meaningVi": "kính lúp / thấu kính",
            "category": "Science",
            "emoji": "🔍",
            "pronunciation": "/lenz/"
          }
        ]
      },
      {
        "id": "lvl-76-3",
        "unitId": "unit-76",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1512,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.96,
        "spawnInterval": 1820,
        "words": [
          {
            "id": "r3_76_2",
            "word": "beaker",
            "meaningVi": "cốc thí nghiệm",
            "category": "Science",
            "emoji": "🧪",
            "pronunciation": "/ˈbiːkər/"
          },
          {
            "id": "r3_76_3",
            "word": "sample",
            "meaningVi": "mẫu vật thử",
            "category": "Science",
            "emoji": "🧫",
            "pronunciation": "/ˈsɑːmpl/"
          },
          {
            "id": "r3_76_4",
            "word": "lens",
            "meaningVi": "kính lúp / thấu kính",
            "category": "Science",
            "emoji": "🔍",
            "pronunciation": "/lenz/"
          },
          {
            "id": "r3_76_1",
            "word": "magnet",
            "meaningVi": "thanh nam châm",
            "category": "Science",
            "emoji": "🧲",
            "pronunciation": "/ˈmæɡnət/"
          }
        ]
      },
      {
        "id": "lvl-76-4",
        "unitId": "unit-76",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 76",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 55,
        "gemReward": 37,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-76-5",
        "unitId": "unit-76",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1940,
        "xpReward": 65,
        "gemReward": 15,
        "speedMultiplier": 0.98,
        "spawnInterval": 1620,
        "words": [
          {
            "id": "r3_76_1",
            "word": "magnet",
            "meaningVi": "thanh nam châm",
            "category": "Science",
            "emoji": "🧲",
            "pronunciation": "/ˈmæɡnət/"
          },
          {
            "id": "r3_76_2",
            "word": "beaker",
            "meaningVi": "cốc thí nghiệm",
            "category": "Science",
            "emoji": "🧪",
            "pronunciation": "/ˈbiːkər/"
          },
          {
            "id": "r3_76_3",
            "word": "sample",
            "meaningVi": "mẫu vật thử",
            "category": "Science",
            "emoji": "🧫",
            "pronunciation": "/ˈsɑːmpl/"
          },
          {
            "id": "r3_76_4",
            "word": "lens",
            "meaningVi": "kính lúp / thấu kính",
            "category": "Science",
            "emoji": "🔍",
            "pronunciation": "/lenz/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-77",
    "unitNumber": 77,
    "title": "Post Office & Mail",
    "titleVi": "Bưu Điện & Gửi Nhận",
    "description": "Bưu kiện chuyển phát, phong bì thư và người giao hàng.",
    "icon": "📮",
    "themeColor": "#f97316",
    "bannerBg": "from-orange-500/30 via-amber-500/20 to-red-600/30",
    "levels": [
      {
        "id": "lvl-77-1",
        "unitId": "unit-77",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "📮",
        "bgColor": "#f97316",
        "targetScore": 1120,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.86,
        "spawnInterval": 2115,
        "words": [
          {
            "id": "r3_77_1",
            "word": "package",
            "meaningVi": "gói bưu phẩm",
            "category": "Mail",
            "emoji": "📦",
            "pronunciation": "/ˈpækɪdʒ/"
          },
          {
            "id": "r3_77_2",
            "word": "letter",
            "meaningVi": "lá thư tay",
            "category": "Mail",
            "emoji": "✉️",
            "pronunciation": "/ˈletər/"
          },
          {
            "id": "r3_77_3",
            "word": "address",
            "meaningVi": "địa chỉ nhà",
            "category": "Mail",
            "emoji": "📍",
            "pronunciation": "/əˈdres/"
          }
        ]
      },
      {
        "id": "lvl-77-2",
        "unitId": "unit-77",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1220,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.91,
        "spawnInterval": 2015,
        "words": [
          {
            "id": "r3_77_4",
            "word": "envelope",
            "meaningVi": "phong bì thư",
            "category": "Mail",
            "emoji": "💌",
            "pronunciation": "/ˈenvələʊp/"
          },
          {
            "id": "r3_77_5",
            "word": "courier",
            "meaningVi": "người giao hàng",
            "category": "Mail",
            "emoji": "🛵",
            "pronunciation": "/ˈkʊriər/"
          }
        ]
      },
      {
        "id": "lvl-77-3",
        "unitId": "unit-77",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1524,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.96,
        "spawnInterval": 1815,
        "words": [
          {
            "id": "r3_77_2",
            "word": "letter",
            "meaningVi": "lá thư tay",
            "category": "Mail",
            "emoji": "✉️",
            "pronunciation": "/ˈletər/"
          },
          {
            "id": "r3_77_3",
            "word": "address",
            "meaningVi": "địa chỉ nhà",
            "category": "Mail",
            "emoji": "📍",
            "pronunciation": "/əˈdres/"
          },
          {
            "id": "r3_77_4",
            "word": "envelope",
            "meaningVi": "phong bì thư",
            "category": "Mail",
            "emoji": "💌",
            "pronunciation": "/ˈenvələʊp/"
          },
          {
            "id": "r3_77_5",
            "word": "courier",
            "meaningVi": "người giao hàng",
            "category": "Mail",
            "emoji": "🛵",
            "pronunciation": "/ˈkʊriər/"
          },
          {
            "id": "r3_77_1",
            "word": "package",
            "meaningVi": "gói bưu phẩm",
            "category": "Mail",
            "emoji": "📦",
            "pronunciation": "/ˈpækɪdʒ/"
          }
        ]
      },
      {
        "id": "lvl-77-4",
        "unitId": "unit-77",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 77",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 55,
        "gemReward": 39,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-77-5",
        "unitId": "unit-77",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1955,
        "xpReward": 65,
        "gemReward": 15,
        "speedMultiplier": 0.98,
        "spawnInterval": 1615,
        "words": [
          {
            "id": "r3_77_1",
            "word": "package",
            "meaningVi": "gói bưu phẩm",
            "category": "Mail",
            "emoji": "📦",
            "pronunciation": "/ˈpækɪdʒ/"
          },
          {
            "id": "r3_77_2",
            "word": "letter",
            "meaningVi": "lá thư tay",
            "category": "Mail",
            "emoji": "✉️",
            "pronunciation": "/ˈletər/"
          },
          {
            "id": "r3_77_3",
            "word": "address",
            "meaningVi": "địa chỉ nhà",
            "category": "Mail",
            "emoji": "📍",
            "pronunciation": "/əˈdres/"
          },
          {
            "id": "r3_77_4",
            "word": "envelope",
            "meaningVi": "phong bì thư",
            "category": "Mail",
            "emoji": "💌",
            "pronunciation": "/ˈenvələʊp/"
          },
          {
            "id": "r3_77_5",
            "word": "courier",
            "meaningVi": "người giao hàng",
            "category": "Mail",
            "emoji": "🛵",
            "pronunciation": "/ˈkʊriər/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-78",
    "unitNumber": 78,
    "title": "Traffic Safety",
    "titleVi": "An Toàn Giao Thông",
    "description": "Mũ bảo hiểm, vạch kẻ đường cho người đi bộ và thắt dây an toàn.",
    "icon": "🚦",
    "themeColor": "#eab308",
    "bannerBg": "from-yellow-500/30 via-amber-500/20 to-orange-600/30",
    "levels": [
      {
        "id": "lvl-78-1",
        "unitId": "unit-78",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🚦",
        "bgColor": "#eab308",
        "targetScore": 1130,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.86,
        "spawnInterval": 2110,
        "words": [
          {
            "id": "r3_78_1",
            "word": "helmet",
            "meaningVi": "mũ bảo hiểm",
            "category": "Safety",
            "emoji": "⛑️",
            "pronunciation": "/ˈhelmɪt/"
          },
          {
            "id": "r3_78_2",
            "word": "signal",
            "meaningVi": "tín hiệu giao thông",
            "category": "Safety",
            "emoji": "🚦",
            "pronunciation": "/ˈsɪɡnəl/"
          },
          {
            "id": "r3_78_3",
            "word": "crosswalk",
            "meaningVi": "vạch sang đường",
            "category": "Safety",
            "emoji": "🚶",
            "pronunciation": "/ˈkrɒswɔːk/"
          }
        ]
      },
      {
        "id": "lvl-78-2",
        "unitId": "unit-78",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1230,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.91,
        "spawnInterval": 2010,
        "words": [
          {
            "id": "r3_78_4",
            "word": "seatbelt",
            "meaningVi": "dây an toàn",
            "category": "Safety",
            "emoji": "💺",
            "pronunciation": "/ˈsiːtbelt/"
          }
        ]
      },
      {
        "id": "lvl-78-3",
        "unitId": "unit-78",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1536,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.96,
        "spawnInterval": 1810,
        "words": [
          {
            "id": "r3_78_2",
            "word": "signal",
            "meaningVi": "tín hiệu giao thông",
            "category": "Safety",
            "emoji": "🚦",
            "pronunciation": "/ˈsɪɡnəl/"
          },
          {
            "id": "r3_78_3",
            "word": "crosswalk",
            "meaningVi": "vạch sang đường",
            "category": "Safety",
            "emoji": "🚶",
            "pronunciation": "/ˈkrɒswɔːk/"
          },
          {
            "id": "r3_78_4",
            "word": "seatbelt",
            "meaningVi": "dây an toàn",
            "category": "Safety",
            "emoji": "💺",
            "pronunciation": "/ˈsiːtbelt/"
          },
          {
            "id": "r3_78_1",
            "word": "helmet",
            "meaningVi": "mũ bảo hiểm",
            "category": "Safety",
            "emoji": "⛑️",
            "pronunciation": "/ˈhelmɪt/"
          }
        ]
      },
      {
        "id": "lvl-78-4",
        "unitId": "unit-78",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 78",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 55,
        "gemReward": 41,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-78-5",
        "unitId": "unit-78",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1970,
        "xpReward": 65,
        "gemReward": 15,
        "speedMultiplier": 0.98,
        "spawnInterval": 1610,
        "words": [
          {
            "id": "r3_78_1",
            "word": "helmet",
            "meaningVi": "mũ bảo hiểm",
            "category": "Safety",
            "emoji": "⛑️",
            "pronunciation": "/ˈhelmɪt/"
          },
          {
            "id": "r3_78_2",
            "word": "signal",
            "meaningVi": "tín hiệu giao thông",
            "category": "Safety",
            "emoji": "🚦",
            "pronunciation": "/ˈsɪɡnəl/"
          },
          {
            "id": "r3_78_3",
            "word": "crosswalk",
            "meaningVi": "vạch sang đường",
            "category": "Safety",
            "emoji": "🚶",
            "pronunciation": "/ˈkrɒswɔːk/"
          },
          {
            "id": "r3_78_4",
            "word": "seatbelt",
            "meaningVi": "dây an toàn",
            "category": "Safety",
            "emoji": "💺",
            "pronunciation": "/ˈsiːtbelt/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-79",
    "unitNumber": 79,
    "title": "Botanical Kingdom",
    "titleVi": "Thế Giới Thực Vật",
    "description": "Chồi non nảy mầm, rễ cây hút nước và hạt phấn hoa.",
    "icon": "🌿",
    "themeColor": "#15803d",
    "bannerBg": "from-green-600/30 via-emerald-600/20 to-teal-700/30",
    "levels": [
      {
        "id": "lvl-79-1",
        "unitId": "unit-79",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "🌿",
        "bgColor": "#15803d",
        "targetScore": 1140,
        "xpReward": 27,
        "gemReward": 5,
        "speedMultiplier": 0.87,
        "spawnInterval": 2105,
        "words": [
          {
            "id": "r3_79_1",
            "word": "blossom",
            "meaningVi": "nở rộ hoa",
            "category": "Botany",
            "emoji": "🌸",
            "pronunciation": "/ˈblɒsəm/"
          },
          {
            "id": "r3_79_2",
            "word": "branch",
            "meaningVi": "cành cây",
            "category": "Botany",
            "emoji": "🪵",
            "pronunciation": "/brɑːntʃ/"
          },
          {
            "id": "r3_79_3",
            "word": "roots",
            "meaningVi": "bộ rễ cây",
            "category": "Botany",
            "emoji": "🌱",
            "pronunciation": "/ruːts/"
          }
        ]
      },
      {
        "id": "lvl-79-2",
        "unitId": "unit-79",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1240,
        "xpReward": 32,
        "gemReward": 6,
        "speedMultiplier": 0.92,
        "spawnInterval": 2005,
        "words": [
          {
            "id": "r3_79_4",
            "word": "sprout",
            "meaningVi": "mầm cây non",
            "category": "Botany",
            "emoji": "🌿",
            "pronunciation": "/spraʊt/"
          },
          {
            "id": "r3_79_5",
            "word": "pollen",
            "meaningVi": "hạt phấn hoa",
            "category": "Botany",
            "emoji": "🌼",
            "pronunciation": "/ˈpɒlən/"
          }
        ]
      },
      {
        "id": "lvl-79-3",
        "unitId": "unit-79",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1548,
        "xpReward": 37,
        "gemReward": 8,
        "speedMultiplier": 0.97,
        "spawnInterval": 1805,
        "words": [
          {
            "id": "r3_79_2",
            "word": "branch",
            "meaningVi": "cành cây",
            "category": "Botany",
            "emoji": "🪵",
            "pronunciation": "/brɑːntʃ/"
          },
          {
            "id": "r3_79_3",
            "word": "roots",
            "meaningVi": "bộ rễ cây",
            "category": "Botany",
            "emoji": "🌱",
            "pronunciation": "/ruːts/"
          },
          {
            "id": "r3_79_4",
            "word": "sprout",
            "meaningVi": "mầm cây non",
            "category": "Botany",
            "emoji": "🌿",
            "pronunciation": "/spraʊt/"
          },
          {
            "id": "r3_79_5",
            "word": "pollen",
            "meaningVi": "hạt phấn hoa",
            "category": "Botany",
            "emoji": "🌼",
            "pronunciation": "/ˈpɒlən/"
          },
          {
            "id": "r3_79_1",
            "word": "blossom",
            "meaningVi": "nở rộ hoa",
            "category": "Botany",
            "emoji": "🌸",
            "pronunciation": "/ˈblɒsəm/"
          }
        ]
      },
      {
        "id": "lvl-79-4",
        "unitId": "unit-79",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 79",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 55,
        "gemReward": 43,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-79-5",
        "unitId": "unit-79",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1985,
        "xpReward": 65,
        "gemReward": 15,
        "speedMultiplier": 0.99,
        "spawnInterval": 1605,
        "words": [
          {
            "id": "r3_79_1",
            "word": "blossom",
            "meaningVi": "nở rộ hoa",
            "category": "Botany",
            "emoji": "🌸",
            "pronunciation": "/ˈblɒsəm/"
          },
          {
            "id": "r3_79_2",
            "word": "branch",
            "meaningVi": "cành cây",
            "category": "Botany",
            "emoji": "🪵",
            "pronunciation": "/brɑːntʃ/"
          },
          {
            "id": "r3_79_3",
            "word": "roots",
            "meaningVi": "bộ rễ cây",
            "category": "Botany",
            "emoji": "🌱",
            "pronunciation": "/ruːts/"
          },
          {
            "id": "r3_79_4",
            "word": "sprout",
            "meaningVi": "mầm cây non",
            "category": "Botany",
            "emoji": "🌿",
            "pronunciation": "/spraʊt/"
          },
          {
            "id": "r3_79_5",
            "word": "pollen",
            "meaningVi": "hạt phấn hoa",
            "category": "Botany",
            "emoji": "🌼",
            "pronunciation": "/ˈpɒlən/"
          }
        ]
      }
    ]
  },
  {
    "id": "unit-80",
    "unitNumber": 80,
    "title": "Realm 3 Grand Review",
    "titleVi": "Đại Chiến Bứt Phá Cấp 1",
    "description": "Tốt nghiệp Tiểu học với vốn từ vựng phong phú và tốc độ gõ vững vàng!",
    "icon": "👑",
    "themeColor": "#8b5cf6",
    "bannerBg": "from-purple-500/30 via-fuchsia-500/20 to-pink-600/30",
    "levels": [
      {
        "id": "lvl-80-1",
        "unitId": "unit-80",
        "levelNumber": 1,
        "title": "Core Practice",
        "titleVi": "Luyện Tập Cơ Bản",
        "type": "STANDARD",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 1150,
        "xpReward": 28,
        "gemReward": 5,
        "speedMultiplier": 0.88,
        "spawnInterval": 2100,
        "words": [
          {
            "id": "r3_80_1",
            "word": "engineer",
            "meaningVi": "kỹ sư",
            "category": "Mastery",
            "emoji": "👷",
            "pronunciation": "/ˌendʒɪˈnɪər/"
          },
          {
            "id": "r3_80_2",
            "word": "galaxy",
            "meaningVi": "thiên hà",
            "category": "Mastery",
            "emoji": "🌌",
            "pronunciation": "/ˈɡæləksi/"
          },
          {
            "id": "r3_80_3",
            "word": "creative",
            "meaningVi": "sáng tạo",
            "category": "Mastery",
            "emoji": "💡",
            "pronunciation": "/kriˈeɪtɪv/"
          },
          {
            "id": "r3_80_4",
            "word": "recycle",
            "meaningVi": "tái chế",
            "category": "Mastery",
            "emoji": "♻️",
            "pronunciation": "/ˌriːˈsaɪkl/"
          }
        ]
      },
      {
        "id": "lvl-80-2",
        "unitId": "unit-80",
        "levelNumber": 2,
        "title": "Expansion",
        "titleVi": "Từ Vựng Mở Rộng",
        "type": "STANDARD",
        "icon": "✨",
        "bgColor": "#10b981",
        "targetScore": 1250,
        "xpReward": 33,
        "gemReward": 6,
        "speedMultiplier": 0.93,
        "spawnInterval": 2000,
        "words": [
          {
            "id": "r3_80_5",
            "word": "passport",
            "meaningVi": "hộ chiếu",
            "category": "Mastery",
            "emoji": "🛂",
            "pronunciation": "/ˈpɑːspɔːt/"
          },
          {
            "id": "r3_80_6",
            "word": "jellyfish",
            "meaningVi": "con sứa biển",
            "category": "Mastery",
            "emoji": "🪼",
            "pronunciation": "/ˈdʒelifɪʃ/"
          },
          {
            "id": "r3_80_7",
            "word": "mountain",
            "meaningVi": "ngọn núi",
            "category": "Mastery",
            "emoji": "⛰️",
            "pronunciation": "/ˈmaʊntɪn/"
          },
          {
            "id": "r3_80_8",
            "word": "apartment",
            "meaningVi": "căn hộ",
            "category": "Mastery",
            "emoji": "🏢",
            "pronunciation": "/əˈpɑːtmənt/"
          }
        ]
      },
      {
        "id": "lvl-80-3",
        "unitId": "unit-80",
        "levelNumber": 3,
        "title": "Speed Rush",
        "titleVi": "Tăng Tốc Gõ Nhanh",
        "type": "SPEED_RUSH",
        "icon": "⚡",
        "bgColor": "#f59e0b",
        "targetScore": 1560,
        "xpReward": 38,
        "gemReward": 8,
        "speedMultiplier": 0.98,
        "spawnInterval": 1800,
        "words": [
          {
            "id": "r3_80_2",
            "word": "galaxy",
            "meaningVi": "thiên hà",
            "category": "Mastery",
            "emoji": "🌌",
            "pronunciation": "/ˈɡæləksi/"
          },
          {
            "id": "r3_80_3",
            "word": "creative",
            "meaningVi": "sáng tạo",
            "category": "Mastery",
            "emoji": "💡",
            "pronunciation": "/kriˈeɪtɪv/"
          },
          {
            "id": "r3_80_4",
            "word": "recycle",
            "meaningVi": "tái chế",
            "category": "Mastery",
            "emoji": "♻️",
            "pronunciation": "/ˌriːˈsaɪkl/"
          },
          {
            "id": "r3_80_5",
            "word": "passport",
            "meaningVi": "hộ chiếu",
            "category": "Mastery",
            "emoji": "🛂",
            "pronunciation": "/ˈpɑːspɔːt/"
          },
          {
            "id": "r3_80_6",
            "word": "jellyfish",
            "meaningVi": "con sứa biển",
            "category": "Mastery",
            "emoji": "🪼",
            "pronunciation": "/ˈdʒelifɪʃ/"
          },
          {
            "id": "r3_80_7",
            "word": "mountain",
            "meaningVi": "ngọn núi",
            "category": "Mastery",
            "emoji": "⛰️",
            "pronunciation": "/ˈmaʊntɪn/"
          }
        ]
      },
      {
        "id": "lvl-80-4",
        "unitId": "unit-80",
        "levelNumber": 4,
        "title": "Treasure Chest",
        "titleVi": "Rương Báu Chương 80",
        "type": "CHEST_REWARD",
        "icon": "🎁",
        "bgColor": "#ec4899",
        "targetScore": 0,
        "xpReward": 56,
        "gemReward": 25,
        "speedMultiplier": 0,
        "spawnInterval": 0,
        "words": []
      },
      {
        "id": "lvl-80-5",
        "unitId": "unit-80",
        "levelNumber": 5,
        "title": "Boss Battle",
        "titleVi": "Đại Chiến Thủ Lĩnh",
        "type": "BOSS_BATTLE",
        "icon": "👑",
        "bgColor": "#8b5cf6",
        "targetScore": 2000,
        "xpReward": 66,
        "gemReward": 15,
        "speedMultiplier": 1.0,
        "spawnInterval": 1600,
        "words": [
          {
            "id": "r3_80_1",
            "word": "engineer",
            "meaningVi": "kỹ sư",
            "category": "Mastery",
            "emoji": "👷",
            "pronunciation": "/ˌendʒɪˈnɪər/"
          },
          {
            "id": "r3_80_2",
            "word": "galaxy",
            "meaningVi": "thiên hà",
            "category": "Mastery",
            "emoji": "🌌",
            "pronunciation": "/ˈɡæləksi/"
          },
          {
            "id": "r3_80_3",
            "word": "creative",
            "meaningVi": "sáng tạo",
            "category": "Mastery",
            "emoji": "💡",
            "pronunciation": "/kriˈeɪtɪv/"
          },
          {
            "id": "r3_80_4",
            "word": "recycle",
            "meaningVi": "tái chế",
            "category": "Mastery",
            "emoji": "♻️",
            "pronunciation": "/ˌriːˈsaɪkl/"
          },
          {
            "id": "r3_80_5",
            "word": "passport",
            "meaningVi": "hộ chiếu",
            "category": "Mastery",
            "emoji": "🛂",
            "pronunciation": "/ˈpɑːspɔːt/"
          },
          {
            "id": "r3_80_6",
            "word": "jellyfish",
            "meaningVi": "con sứa biển",
            "category": "Mastery",
            "emoji": "🪼",
            "pronunciation": "/ˈdʒelifɪʃ/"
          },
          {
            "id": "r3_80_7",
            "word": "mountain",
            "meaningVi": "ngọn núi",
            "category": "Mastery",
            "emoji": "⛰️",
            "pronunciation": "/ˈmaʊntɪn/"
          },
          {
            "id": "r3_80_8",
            "word": "apartment",
            "meaningVi": "căn hộ",
            "category": "Mastery",
            "emoji": "🏢",
            "pronunciation": "/əˈpɑːtmənt/"
          }
        ]
      }
    ]
  }
];

export const REALM3_REALM: AgeRealm = {
  id: 'realm-3',
  realmNumber: 3,
  name: 'Primary Champions',
  nameVi: 'Bứt Phá Tiểu Học',
  ageRange: '11 Tuổi',
  gradeLabel: 'Lớp 5 (CEFR A1+)',
  description: '25 Chương hoàn thiện nền tảng tiểu học với từ 5-8 chữ cái, rèn luyện độ chính xác và phối hợp cả hai bàn tay.',
  icon: '🛸',
  color: '#00f0ff',
  badgeBg: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300',
  startChapter: 56,
  endChapter: 80,
  wordLengthHint: '5 - 8 chữ cái',
  targetWpm: '30 - 45 WPM',
  units: REALM3_UNITS
};
