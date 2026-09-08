import { Unit } from '../progress-types';
import { AgeRealm } from './types';

export const REALM8_UNITS: Unit[] = [
  {
    id: "unit-206",
    unitNumber: 206,
    title: "Office Small Talk & Team Connections",
    titleVi: "Trò Chuyện Công Sở & Kết Nối Đồng Nghiệp",
    description: "Mẫu câu giao tiếp tự nhiên khi bắt đầu ngày mới, đi uống cà phê, hỏi thăm cuối tuần và tạo bầu không khí làm việc cởi mở.",
    icon: "☕",
    themeColor: "#f59e0b",
    bannerBg: "from-amber-700/30 via-orange-700/20 to-slate-800/30",
    levels: [
      {
        id: "lvl-206-1",
        unitId: "unit-206",
        levelNumber: 1,
        title: "Morning Greetings & Coffee Chats",
        titleVi: "Chào Buổi Sáng & Trò Chuyện Cà Phê",
        type: "STANDARD",
        icon: "🌅",
        bgColor: "#f59e0b",
        targetScore: 2200,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r8_206_1",
            word: "good morning how was your weekend",
            meaningVi: "Chào buổi sáng, cuối tuần của bạn thế nào?",
            category: "SmallTalk",
            emoji: "☀️",
            pronunciation: "/ɡʊd ˈmɔːnɪŋ haʊ wɒz jɔː ˌwiːkˈend/"
          },
          {
            id: "r8_206_2",
            word: "did you do anything exciting yesterday",
            meaningVi: "Hôm qua bạn có làm gì thú vị không?",
            category: "SmallTalk",
            emoji: "🎉",
            pronunciation: "/dɪd juː duː ˈeniθɪŋ ɪkˈsaɪtɪŋ ˈjestədeɪ/"
          },
          {
            id: "r8_206_3",
            word: "are you grabbing some coffee before the meeting",
            meaningVi: "Bạn có đi lấy chút cà phê trước giờ họp không?",
            category: "SmallTalk",
            emoji: "☕",
            pronunciation: "/ɑː juː ˈɡræbɪŋ sʌm ˈkɒfi bɪˈfɔː ðə ˈmiːtɪŋ/"
          },
          {
            id: "r8_206_4",
            word: "the weather today is absolutely wonderful",
            meaningVi: "Thời tiết hôm nay thực sự rất tuyệt vời",
            category: "SmallTalk",
            emoji: "🌤️",
            pronunciation: "/ðə ˈweðə təˈdeɪ ɪz ˌæbsəˈluːtli ˈwʌndəfl/"
          },
          {
            id: "r8_206_5",
            word: "have a productive and great day ahead",
            meaningVi: "Chúc bạn một ngày làm việc hiệu quả và tràn đầy năng lượng",
            category: "SmallTalk",
            emoji: "✨",
            pronunciation: "/hæv ə prəˈdʌktɪv ænd ɡreɪt deɪ əˈhed/"
          }
        ]
      },
      {
        id: "lvl-206-2",
        unitId: "unit-206",
        levelNumber: 2,
        title: "Casual Syncs & Slack Etiquette",
        titleVi: "Trao Đổi Nhẹ Nhàng & Tin Nhắn Slack",
        type: "STANDARD",
        icon: "💬",
        bgColor: "#d97706",
        targetScore: 2300,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r8_206_6",
            word: "do you have five minutes for a quick huddle",
            meaningVi: "Bạn có rảnh 5 phút để gọi nhanh trao đổi chút không?",
            category: "SmallTalk",
            emoji: "🎧",
            pronunciation: "/duː juː hæv faɪv ˈmɪnɪts fɔːr ə kwɪk ˈhʌdl/"
          },
          {
            id: "r8_206_7",
            word: "feel free to reply whenever you have time",
            meaningVi: "Cứ thong thả trả lời khi nào bạn rảnh nhé",
            category: "SmallTalk",
            emoji: "🕒",
            pronunciation: "/fiːl friː tuː rɪˈplaɪ wenˈevə juː hæv taɪm/"
          },
          {
            id: "r8_206_8",
            word: "i sent you the link on slack channel",
            meaningVi: "Tôi đã gửi đường link cho bạn trong kênh Slack rồi nhé",
            category: "SmallTalk",
            emoji: "🔗",
            pronunciation: "/aɪ sent juː ðə lɪŋk ɒn slæk ˈtʃænl/"
          },
          {
            id: "r8_206_9",
            word: "thanks for helping me out with the review",
            meaningVi: "Cảm ơn bạn rất nhiều đã hỗ trợ tôi review nhé",
            category: "SmallTalk",
            emoji: "🙏",
            pronunciation: "/θæŋks fɔː ˈhelpɪŋ miː aʊt wɪð ðə rɪˈvjuː/"
          },
          {
            id: "r8_206_10",
            word: "i will be right back in ten minutes",
            meaningVi: "Tôi sẽ quay lại bàn làm việc trong 10 phút nữa nhé",
            category: "SmallTalk",
            emoji: "🏃",
            pronunciation: "/aɪ wɪl biː raɪt bæk ɪn ten ˈmɪnɪts/"
          }
        ]
      },
      {
        id: "lvl-206-3",
        unitId: "unit-206",
        levelNumber: 3,
        title: "Expressing Opinions & Polite Disagreement",
        titleVi: "Bày Tỏ Quan Điểm & Phản Biện Lịch Sự",
        type: "SPEED_RUSH",
        icon: "⚡",
        bgColor: "#b45309",
        targetScore: 2500,
        xpReward: 55,
        gemReward: 10,
        speedMultiplier: 1.05,
        spawnInterval: 2300,
        words: [
          {
            id: "r8_206_11",
            word: "from my perspective this option is more scalable",
            meaningVi: "Theo góc nhìn của tôi thì phương án này dễ mở rộng quy mô hơn",
            category: "Workplace",
            emoji: "📈",
            pronunciation: "/frɒm maɪ pəˈspektɪv ðɪs ˈɒpʃn ɪz mɔː ˈskeɪləbl/"
          },
          {
            id: "r8_206_12",
            word: "i see your point but we should consider user security first",
            meaningVi: "Tôi hiểu ý bạn nhưng chúng ta nên ưu tiên bảo mật người dùng trước",
            category: "Workplace",
            emoji: "🛡️",
            pronunciation: "/aɪ siː jɔː pɔɪnt bʌt wiː ʃʊd kənˈsɪdə ˈjuːzə sɪˈkjʊərəti fɜːst/"
          },
          {
            id: "r8_206_13",
            word: "that sounds like a reasonable compromise",
            meaningVi: "Đó nghe có vẻ là một giải pháp thỏa hiệp rất hợp lý",
            category: "Workplace",
            emoji: "🤝",
            pronunciation: "/ðæt saʊndz laɪk ə ˈriːznəbl ˈkɒmprəmaɪz/"
          },
          {
            id: "r8_206_14",
            word: "could you explain the reasoning behind this decision",
            meaningVi: "Bạn có thể giải thích thêm lý do đằng sau quyết định này không?",
            category: "Workplace",
            emoji: "💡",
            pronunciation: "/kʊd juː ɪkˈspleɪn ðə ˈriːzənɪŋ bɪˈhaɪnd ðɪs dɪˈsɪʒn/"
          },
          {
            id: "r8_206_15",
            word: "i completely agree with your proposal let us move forward",
            meaningVi: "Tôi hoàn toàn đồng ý với đề xuất của bạn, hãy cùng triển khai nhé",
            category: "Workplace",
            emoji: "🚀",
            pronunciation: "/aɪ kəmˈpliːtli əˈɡriː wɪð jɔː prəˈpəʊzl let ʌs muːv ˈfɔːwəd/"
          }
        ]
      },
      {
        id: "lvl-206-4",
        unitId: "unit-206",
        levelNumber: 4,
        title: "Workplace Conversational Boss",
        titleVi: "Đại Chiến Trùm: Giao Tiếp Công Sở Chuyên Nghiệp",
        type: "BOSS_BATTLE",
        icon: "👑",
        bgColor: "#92400e",
        targetScore: 3200,
        xpReward: 70,
        gemReward: 15,
        speedMultiplier: 1.1,
        spawnInterval: 2200,
        words: [
          {
            id: "r8_206_16",
            word: "i appreciate everyone taking the time to join this discussion today",
            meaningVi: "Tôi rất cảm kích mọi người đã dành thời gian tham gia buổi thảo luận hôm nay",
            category: "Workplace",
            emoji: "🙏",
            pronunciation: "/aɪ əˈpriːʃieɪt ˈevriwʌn ˈteɪkɪŋ ðə taɪm tuː dʒɔɪn ðɪs dɪˈskʌʃn təˈdeɪ/"
          },
          {
            id: "r8_206_17",
            word: "let us summarize the key action items and assign clear owners",
            meaningVi: "Hãy cùng tóm tắt các đầu việc chính và phân công người phụ trách rõ ràng",
            category: "Workplace",
            emoji: "📋",
            pronunciation: "/let ʌs ˈsʌməraɪz ðə kiː ˈækʃn ˈaɪtəmz ænd əˈsaɪn klɪər ˈəʊnəz/"
          },
          {
            id: "r8_206_18",
            word: "please let me know if you need any assistance during the implementation",
            meaningVi: "Xin cứ báo cho tôi nếu bạn cần bất kỳ sự hỗ trợ nào trong quá trình thực hiện",
            category: "Workplace",
            emoji: "🤝",
            pronunciation: "/pliːz let miː nəʊ ɪf juː niːd ˈeni əˈsɪstəns ˈdjʊərɪŋ ði ˌɪmplɪmenˈteɪʃn/"
          },
          {
            id: "r8_206_19",
            word: "we have achieved significant milestones thanks to our great teamwork",
            meaningVi: "Chúng ta đã đạt được những cột mốc quan trọng nhờ sự phối hợp nhóm tuyệt vời",
            category: "Workplace",
            emoji: "🏆",
            pronunciation: "/wiː hæv əˈtʃiːvd sɪɡˈnɪfɪkənt ˈmaɪlstəʊnz θæŋks tuː ˈaʊə ɡreɪt ˈtiːmwɜːk/"
          },
          {
            id: "r8_206_20",
            word: "looking forward to collaborating with you on the upcoming initiative",
            meaningVi: "Rất mong đợi được tiếp tục hợp tác cùng bạn trong dự án sắp tới",
            category: "Workplace",
            emoji: "⭐",
            pronunciation: "/ˈlʊkɪŋ ˈfɔːwəd tuː kəˈlæbəreɪtɪŋ wɪð juː ɒn ðɪ ˈʌpkʌmɪŋ ɪˈnɪʃətɪv/"
          }
        ]
      }
    ]
  },
  {
    id: "unit-207",
    unitNumber: 207,
    title: "Daily Life, Travel & Networking",
    titleVi: "Giao Tiếp Đời Sống, Du Lịch & Mạng Lưới",
    description: "Bộ câu thoại phản xạ tự nhiên khi đi ăn uống, đặt phòng khách sạn, giao lưu quốc tế và kết bạn giao tiếp tự tin.",
    icon: "✈️",
    themeColor: "#ec4899",
    bannerBg: "from-pink-700/30 via-rose-700/20 to-slate-800/30",
    levels: [
      {
        id: "lvl-207-1",
        unitId: "unit-207",
        levelNumber: 1,
        title: "Dining Out & Ordering Food",
        titleVi: "Ăn Uống & Gọi Món Nhà Hàng",
        type: "STANDARD",
        icon: "🍽️",
        bgColor: "#ec4899",
        targetScore: 2200,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r8_207_1",
            word: "could we get a table for four near the window please",
            meaningVi: "Làm ơn cho chúng tôi đặt một bàn bốn người gần cửa sổ nhé",
            category: "DailyLife",
            emoji: "🪟",
            pronunciation: "/kʊd wiː ɡet ə ˈteɪbl fɔː fɔː nɪə ðə ˈwɪndəʊ pliːz/"
          },
          {
            id: "r8_207_2",
            word: "what do you recommend as the house specialty",
            meaningVi: "Bạn có thể giới thiệu món đặc sản nổi tiếng nhất ở đây không?",
            category: "DailyLife",
            emoji: "🍲",
            pronunciation: "/wɒt duː juː ˌrekəˈmend æz ðə haʊs ˈspeʃəlti/"
          },
          {
            id: "r8_207_3",
            word: "could we have the bill split evenly please",
            meaningVi: "Làm ơn chia đều hóa đơn thanh toán giúp chúng tôi nhé",
            category: "DailyLife",
            emoji: "💳",
            pronunciation: "/kʊd wiː hæv ðə bɪl splɪt ˈiːvnli pliːz/"
          },
          {
            id: "r8_207_4",
            word: "i am allergic to peanuts so no nuts in my dish please",
            meaningVi: "Tôi bị dị ứng với đậu phộng nên đừng cho các loại hạt vào món của tôi nhé",
            category: "DailyLife",
            emoji: "🥜",
            pronunciation: "/aɪ æm əˈlɜːdʒɪk tuː ˈpiːnʌts səʊ nəʊ nʌts ɪn maɪ dɪʃ pliːz/"
          },
          {
            id: "r8_207_5",
            word: "everything was delicious thank you very much",
            meaningVi: "Mọi món ăn đều rất ngon miệng, cảm ơn bạn nhiều nhé",
            category: "DailyLife",
            emoji: "😋",
            pronunciation: "/ˈevriθɪŋ wɒz dɪˈlɪʃəs θæŋk juː ˈveri mʌtʃ/"
          }
        ]
      },
      {
        id: "lvl-207-2",
        unitId: "unit-207",
        levelNumber: 2,
        title: "Travel & Asking for Directions",
        titleVi: "Hỏi Đường & Di Chuyển Du Lịch",
        type: "STANDARD",
        icon: "🗺️",
        bgColor: "#db2777",
        targetScore: 2300,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r8_207_6",
            word: "excuse me where is the nearest subway station",
            meaningVi: "Xin lỗi làm phiền, ga tàu điện ngầm gần nhất ở đâu vậy ạ?",
            category: "Travel",
            emoji: "🚇",
            pronunciation: "/ɪkˈskjuːs miː weər ɪz ðə ˈnɪərɪst ˈsʌbweɪ ˈsteɪʃn/"
          },
          {
            id: "r8_207_7",
            word: "how long does it take to walk to the museum from here",
            meaningVi: "Đi bộ từ đây tới bảo tàng mất khoảng bao lâu thời gian?",
            category: "Travel",
            emoji: "🏛️",
            pronunciation: "/haʊ lɒŋ dʌz ɪt teɪk tuː wɔːk tuː ðə mjuːˈziːəm frɒm hɪə/"
          },
          {
            id: "r8_207_8",
            word: "i would like to check in for flight number two forty",
            meaningVi: "Tôi muốn làm thủ tục lên máy bay cho chuyến bay số 240",
            category: "Travel",
            emoji: "✈️",
            pronunciation: "/aɪ wʊd laɪk tuː tʃek ɪn fɔː flaɪt ˈnʌmbə tuː ˈfɔːti/"
          },
          {
            id: "r8_207_9",
            word: "could you call a taxi for me to the airport please",
            meaningVi: "Làm ơn gọi giúp tôi một chiếc taxi đến sân bay được không?",
            category: "Travel",
            emoji: "🚕",
            pronunciation: "/kʊd juː kɔːl ə ˈtæksi fɔː miː tuː ði ˈeəpɔːt pliːz/"
          },
          {
            id: "r8_207_10",
            word: "can i have a receipt for this transaction please",
            meaningVi: "Tôi có thể xin hóa đơn cho giao dịch thanh toán này được không?",
            category: "Travel",
            emoji: "🧾",
            pronunciation: "/kæn aɪ hæv ə rɪˈsiːt fɔː ðɪs trænˈzækʃn pliːz/"
          }
        ]
      },
      {
        id: "lvl-207-3",
        unitId: "unit-207",
        levelNumber: 3,
        title: "Networking & Fluency Drill",
        titleVi: "Luyện Phản Xạ Giao Tiếp & Kết Nối Bạn Bè",
        type: "SPEED_RUSH",
        icon: "⚡",
        bgColor: "#be185d",
        targetScore: 2500,
        xpReward: 55,
        gemReward: 10,
        speedMultiplier: 1.05,
        spawnInterval: 2300,
        words: [
          {
            id: "r8_207_11",
            word: "it was an absolute pleasure meeting you today",
            meaningVi: "Thật là một niềm vinh hạnh lớn khi được gặp bạn ngày hôm nay",
            category: "Networking",
            emoji: "🤝",
            pronunciation: "/ɪt wɒz ən ˈæbsəluːt ˈpleʒə ˈmiːtɪŋ juː təˈdeɪ/"
          },
          {
            id: "r8_207_12",
            word: "let us connect on linkedin and keep in touch",
            meaningVi: "Chúng ta cùng kết nối trên LinkedIn và giữ liên lạc nhé",
            category: "Networking",
            emoji: "🌐",
            pronunciation: "/let ʌs kəˈnekt ɒn ˌlɪŋktˈɪn ænd kiːp ɪn tʌtʃ/"
          },
          {
            id: "r8_207_13",
            word: "what inspired you to get into software engineering",
            meaningVi: "Điều gì đã truyền cảm hứng để bạn bước vào ngành kỹ thuật phần mềm?",
            category: "Networking",
            emoji: "💡",
            pronunciation: "/wɒt ɪnˈspaɪəd juː tuː ɡet ˈɪntuː ˈsɒftweər ˌendʒɪˈnɪərɪŋ/"
          },
          {
            id: "r8_207_14",
            word: "i really enjoyed your insightful presentation earlier",
            meaningVi: "Tôi thực sự rất thích bài thuyết trình đầy góc nhìn sâu sắc của bạn lúc nãy",
            category: "Networking",
            emoji: "👏",
            pronunciation: "/aɪ ˈrɪəli ɪnˈdʒɔɪd jɔːr ˈɪnsaɪtfl ˌpreznˈteɪʃn ˈɜːliə/"
          },
          {
            id: "r8_207_15",
            word: "have a safe trip back home and talk to you soon",
            meaningVi: "Chúc bạn có chuyến bay về nhà an toàn và sớm gặp lại bạn nhé",
            category: "Networking",
            emoji: "🛫",
            pronunciation: "/hæv ə seɪf trɪp bæk həʊm ænd tɔːk tuː juː suːn/"
          }
        ]
      },
      {
        id: "lvl-207-4",
        unitId: "unit-207",
        levelNumber: 4,
        title: "Fluency Grand Mastery Boss",
        titleVi: "Đại Chiến Trùm: Làm Chủ Giao Tiếp Quốc Tế",
        type: "BOSS_BATTLE",
        icon: "👑",
        bgColor: "#9d174d",
        targetScore: 3300,
        xpReward: 70,
        gemReward: 15,
        speedMultiplier: 1.1,
        spawnInterval: 2200,
        words: [
          {
            id: "r8_207_16",
            word: "practicing full sentences every day is the fastest way to speaking fluency",
            meaningVi: "Luyện tập cả câu hoàn chỉnh mỗi ngày là con đường nhanh nhất để nói lưu loát",
            category: "Mastery",
            emoji: "🚀",
            pronunciation: "/ˈpræktɪsɪŋ fʊl ˈsentənsɪz ˈevri deɪ ɪz ðə ˈfɑːstɪst weɪ tuː ˈspiːkɪŋ ˈfluːənsi/"
          },
          {
            id: "r8_207_17",
            word: "clear pronunciation and active listening build strong professional trust",
            meaningVi: "Phát âm rõ ràng và lắng nghe chủ động tạo dựng niềm tin nghề nghiệp vững chắc",
            category: "Mastery",
            emoji: "🛡️",
            pronunciation: "/klɪə prəˌnʌnsiˈeɪʃn ænd ˈæktɪv ˈlɪsnɪŋ bɪld strɒŋ prəˈfeʃənl trʌst/"
          },
          {
            id: "r8_207_18",
            word: "never hesitate to ask questions when you need clarification in meetings",
            meaningVi: "Đừng bao giờ ngần ngại đặt câu hỏi khi bạn cần làm rõ thông tin trong cuộc họp",
            category: "Mastery",
            emoji: "❓",
            pronunciation: "/ˈnevə ˈhezɪteɪt tuː ɑːsk ˈkwestʃənz wen juː niːd ˌklærɪfɪˈkeɪʃn ɪn ˈmiːtɪŋz/"
          },
          {
            id: "r8_207_19",
            word: "effective communication helps teams deliver outstanding digital products",
            meaningVi: "Giao tiếp hiệu quả giúp toàn đội ngũ tạo ra những sản phẩm công nghệ xuất sắc",
            category: "Mastery",
            emoji: "💎",
            pronunciation: "/ɪˈfektɪv kəˌmjuːnɪˈkeɪʃn helps tiːmz dɪˈlɪvər aʊtˈstændɪŋ ˈdɪdʒɪtl ˈprɒdʌkts/"
          },
          {
            id: "r8_207_20",
            word: "congratulations on mastering real world english conversational sentences",
            meaningVi: "Chúc mừng bạn đã hoàn thành xuất sắc các câu giao tiếp tiếng Anh thực chiến!",
            category: "Mastery",
            emoji: "🎉",
            pronunciation: "/kənˌɡrætʃuˈleɪʃnz ɒn ˈmɑːstərɪŋ rɪəl wɜːld ˈɪŋɡlɪʃ ˌkɒnvəˈseɪʃənl ˈsentənsɪz/"
          }
        ]
      }
    ]
  }
];

export const REALM8_REALM: AgeRealm = {
  id: 'realm-8',
  realmNumber: 8,
  name: 'Adult Everyday & Office Fluency',
  nameVi: 'Giao Tiếp Đời Sống & Công Sở Người Lớn',
  ageRange: 'Người Lớn / Công Sở',
  gradeLabel: 'Adult Everyday & Workplace Fluency',
  description: 'Bộ câu thoại phản xạ tự nhiên khi giao lưu đồng nghiệp, trò chuyện cà phê, ăn uống, du lịch, hỏi đường và kết nối networking quốc tế.',
  icon: '💬',
  color: '#f59e0b',
  badgeBg: 'bg-amber-500/20 border-amber-400/50 text-amber-300',
  startChapter: 206,
  endChapter: 207,
  wordLengthHint: 'Câu giao tiếp 20 - 65+ chữ cái',
  targetWpm: '35 - 55+ WPM',
  units: REALM8_UNITS
};
