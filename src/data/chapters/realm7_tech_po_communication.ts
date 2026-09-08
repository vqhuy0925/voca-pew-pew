import { Unit } from '../progress-types';
import { AgeRealm } from './types';

export const REALM7_UNITS: Unit[] = [
  {
    id: "unit-201",
    unitNumber: 201,
    title: "Daily Standup & Progress Updates",
    titleVi: "Họp Standup Hàng Ngày & Tiến Độ",
    description: "Các mẫu câu chuẩn quốc tế để báo cáo những việc đã làm, việc hôm nay và điểm nghẽn trong buổi họp Scrum hàng ngày.",
    icon: "☕",
    themeColor: "#06b6d4",
    bannerBg: "from-cyan-700/30 via-teal-700/20 to-slate-800/30",
    levels: [
      {
        id: "lvl-201-1",
        unitId: "unit-201",
        levelNumber: 1,
        title: "Yesterday's Accomplishments",
        titleVi: "Báo Cáo Việc Đã Hoàn Thành",
        type: "STANDARD",
        icon: "✅",
        bgColor: "#06b6d4",
        targetScore: 2200,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_201_1",
            word: "i finished the login api integration",
            meaningVi: "Tôi đã tích hợp xong API đăng nhập",
            category: "Standup",
            emoji: "🔑",
            pronunciation: "/aɪ ˈfɪnɪʃt ðə ˈlɒɡɪn eɪ-piː-aɪ ˌɪntɪˈɡreɪʃn/"
          },
          {
            id: "r7_201_2",
            word: "the pull request is ready for review",
            meaningVi: "Pull request đã sẵn sàng để mọi người review",
            category: "Standup",
            emoji: "📝",
            pronunciation: "/ðə pʊl rɪˈkwest ɪz ˈredi fɔː rɪˈvjuː/"
          },
          {
            id: "r7_201_3",
            word: "i fixed all critical unit tests",
            meaningVi: "Tôi đã sửa xong toàn bộ các bài kiểm tra tự động quan trọng",
            category: "Standup",
            emoji: "🧪",
            pronunciation: "/aɪ fɪkst ɔːl ˈkrɪtɪkl ˈjuːnɪt tests/"
          },
          {
            id: "r7_201_4",
            word: "the payment bug has been resolved",
            meaningVi: "Lỗi luồng thanh toán đã được xử lý xong",
            category: "Standup",
            emoji: "💳",
            pronunciation: "/ðə ˈpeɪmənt bʌɡ hæz biːn rɪˈzɒlvd/"
          },
          {
            id: "r7_201_5",
            word: "i deployed the build to staging environment",
            meaningVi: "Tôi đã đưa bản build lên môi trường thử nghiệm",
            category: "Standup",
            emoji: "🚀",
            pronunciation: "/aɪ dɪˈplɔɪd ðə bɪld tuː ˈsteɪdʒɪŋ ɪnˈvaɪrənmənt/"
          }
        ]
      },
      {
        id: "lvl-201-2",
        unitId: "unit-201",
        levelNumber: 2,
        title: "Today's Focus & Plan",
        titleVi: "Kế Hoạch & Trọng Tâm Hôm Nay",
        type: "STANDARD",
        icon: "🎯",
        bgColor: "#0891b2",
        targetScore: 2300,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_201_6",
            word: "today i will focus on the user profile feature",
            meaningVi: "Hôm nay tôi sẽ tập trung vào tính năng hồ sơ người dùng",
            category: "Standup",
            emoji: "👤",
            pronunciation: "/təˈdeɪ aɪ wɪl ˈfəʊkəs ɒn ðə ˈjuːzə ˈprəʊfaɪl ˈfiːtʃə/"
          },
          {
            id: "r7_201_7",
            word: "i plan to finalize the checkout flow",
            meaningVi: "Tôi dự định hoàn thiện xong luồng thanh toán giỏ hàng",
            category: "Standup",
            emoji: "🛒",
            pronunciation: "/aɪ plæn tuː ˈfaɪnəlaɪz ðə ˈtʃekaʊt fləʊ/"
          },
          {
            id: "r7_201_8",
            word: "i will write automated tests for the order service",
            meaningVi: "Tôi sẽ viết kiểm thử tự động cho dịch vụ đơn hàng",
            category: "Standup",
            emoji: "🤖",
            pronunciation: "/aɪ wɪl raɪt ˈɔːtəmeɪtɪd tests fɔː ðə ˈɔːdə ˈsɜːvɪs/"
          },
          {
            id: "r7_201_9",
            word: "i am going to pair program with alex on database design",
            meaningVi: "Tôi sẽ làm việc chung với Alex để thiết kế cơ sở dữ liệu",
            category: "Standup",
            emoji: "👥",
            pronunciation: "/aɪ æm ˈɡəʊɪŋ tuː peə ˈprəʊɡræm wɪð ˈælɪks ɒn ˈdeɪtəbeɪs dɪˈzaɪn/"
          },
          {
            id: "r7_201_10",
            word: "i aim to submit the pull request by end of day",
            meaningVi: "Tôi đặt mục tiêu gửi pull request trước cuối ngày",
            category: "Standup",
            emoji: "⏰",
            pronunciation: "/aɪ eɪm tuː səbˈmɪt ðə pʊl rɪˈkwest baɪ end ɒv deɪ/"
          }
        ]
      },
      {
        id: "lvl-201-3",
        unitId: "unit-201",
        levelNumber: 3,
        title: "Blockers & Rapid Sync",
        titleVi: "Thông Báo Điểm Nghẽn & Cần Trợ Giúp",
        type: "SPEED_RUSH",
        icon: "⚡",
        bgColor: "#0e7490",
        targetScore: 2500,
        xpReward: 55,
        gemReward: 10,
        speedMultiplier: 1.05,
        spawnInterval: 2300,
        words: [
          {
            id: "r7_201_11",
            word: "i am currently blocked by the third party api downtime",
            meaningVi: "Tôi đang bị chặn vì API của bên thứ ba đang bị sập",
            category: "Standup",
            emoji: "🚧",
            pronunciation: "/aɪ æm ˈkʌrəntli blɒkt baɪ ðə θɜːd ˈpɑːti eɪ-piː-aɪ ˈdaʊntaɪm/"
          },
          {
            id: "r7_201_12",
            word: "i need clarification on the acceptance criteria from po",
            meaningVi: "Tôi cần PO làm rõ thêm tiêu chí nghiệm thu của tính năng này",
            category: "Standup",
            emoji: "❓",
            pronunciation: "/aɪ niːd ˌklærɪfɪˈkeɪʃn ɒn ðə əkˈseptəns kraɪˈtɪəriə frɒm piː-əʊ/"
          },
          {
            id: "r7_201_13",
            word: "i am waiting for backend endpoints to be deployed",
            meaningVi: "Tôi đang chờ phía backend triển khai xong các đường dẫn API",
            category: "Standup",
            emoji: "⏳",
            pronunciation: "/aɪ æm ˈweɪtɪŋ fɔː ˈbækend ˈendpɔɪnts tuː biː dɪˈplɔɪd/"
          },
          {
            id: "r7_201_14",
            word: "no blockers on my side everything is on track",
            meaningVi: "Phía tôi không có điểm nghẽn nào, mọi thứ đang đúng tiến độ",
            category: "Standup",
            emoji: "🟢",
            pronunciation: "/nəʊ ˈblɒkəz ɒn maɪ saɪd ˈevriθɪŋ ɪz ɒn træk/"
          },
          {
            id: "r7_201_15",
            word: "let us take this discussion offline to save team time",
            meaningVi: "Hãy thảo luận riêng vấn đề này sau buổi họp để tiết kiệm thời gian",
            category: "Standup",
            emoji: "💬",
            pronunciation: "/let ʌs teɪk ðɪs dɪˈskʌʃn ˌɒfˈlaɪn tuː seɪv tiːm taɪm/"
          }
        ]
      },
      {
        id: "lvl-201-4",
        unitId: "unit-201",
        levelNumber: 4,
        title: "Daily Standup Mastery Boss",
        titleVi: "Đại Chiến Trùm: Standup Chuẩn Pro",
        type: "BOSS_BATTLE",
        icon: "👑",
        bgColor: "#155e75",
        targetScore: 3000,
        xpReward: 70,
        gemReward: 15,
        speedMultiplier: 1.1,
        spawnInterval: 2200,
        words: [
          {
            id: "r7_201_16",
            word: "yesterday i resolved the memory leak in the notification worker",
            meaningVi: "Hôm qua tôi đã khắc phục lỗi rò rỉ bộ nhớ ở tiến trình thông báo",
            category: "Standup",
            emoji: "🛡️",
            pronunciation: "/ˈjestədeɪ aɪ rɪˈzɒlvd ðə ˈmeməri liːk ɪn ðə ˌnəʊtɪfɪˈkeɪʃn ˈwɜːkə/"
          },
          {
            id: "r7_201_17",
            word: "today i will implement the single sign on authentication",
            meaningVi: "Hôm nay tôi sẽ cài đặt xác thực đăng nhập một lần",
            category: "Standup",
            emoji: "🔐",
            pronunciation: "/təˈdeɪ aɪ wɪl ˈɪmplɪment ðə ˈsɪŋɡl saɪn ɒn ɔːˌθentɪˈkeɪʃn/"
          },
          {
            id: "r7_201_18",
            word: "can we have a quick sync after standup regarding the data schema",
            meaningVi: "Chúng ta có thể trao đổi nhanh sau họp về cấu trúc dữ liệu không?",
            category: "Standup",
            emoji: "🤝",
            pronunciation: "/kæn wiː hæv ə kwɪk sɪŋk ˈɑːftə ˈstændʌp rɪˈɡɑːdɪŋ ðə ˈdeɪtə ˈskiːmə/"
          },
          {
            id: "r7_201_19",
            word: "the staging release is ready for qa verification",
            meaningVi: "Bản phát hành thử nghiệm đã sẵn sàng để đội kiểm thử xác minh",
            category: "Standup",
            emoji: "📋",
            pronunciation: "/ðə ˈsteɪdʒɪŋ rɪˈliːs ɪz ˈredi fɔː kjuː-eɪ ˌverɪfɪˈkeɪʃn/"
          },
          {
            id: "r7_201_20",
            word: "i will update jira tickets with latest technical notes",
            meaningVi: "Tôi sẽ cập nhật các thẻ công việc Jira với ghi chú kỹ thuật mới nhất",
            category: "Standup",
            emoji: "📌",
            pronunciation: "/aɪ wɪl ʌpˈdeɪt ˈdʒɪərə ˈtɪkɪts wɪð ˈleɪtɪst ˈteknɪkl nəʊts/"
          }
        ]
      }
    ]
  },
  {
    id: "unit-202",
    unitNumber: 202,
    title: "Clarifying Requirements with PO",
    titleVi: "Làm Rõ Nghiệp Vụ & Yêu Cầu Tính Năng Với PO",
    description: "Những câu hỏi và cách diễn đạt khéo léo, lịch sự để làm rõ Business Logic, luồng người dùng và mong muốn của Product Owner.",
    icon: "📋",
    themeColor: "#3b82f6",
    bannerBg: "from-blue-700/30 via-indigo-700/20 to-slate-800/30",
    levels: [
      {
        id: "lvl-202-1",
        unitId: "unit-202",
        levelNumber: 1,
        title: "Asking for Business Logic Clarification",
        titleVi: "Hỏi Làm Rõ Luồng Nghiệp Vụ",
        type: "STANDARD",
        icon: "💡",
        bgColor: "#3b82f6",
        targetScore: 2300,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_202_1",
            word: "could you please clarify the business logic for this step",
            meaningVi: "PO có thể làm rõ giúp tôi quy tắc nghiệp vụ ở bước này không?",
            category: "POCommunication",
            emoji: "❓",
            pronunciation: "/kʊd juː pliːz ˈklærɪfaɪ ðə ˈbɪznəs ˈlɒdʒɪk fɔː ðɪs step/"
          },
          {
            id: "r7_202_2",
            word: "what is the expected behavior when the session expires",
            meaningVi: "Hành vi mong muốn của hệ thống là gì khi phiên đăng nhập hết hạn?",
            category: "POCommunication",
            emoji: "⏱️",
            pronunciation: "/wɒt ɪz ðɪ ɪkˈspektɪd bɪˈheɪvjə wen ðə ˈseʃn ɪkˈspaɪəz/"
          },
          {
            id: "r7_202_3",
            word: "should we allow users to edit their email address",
            meaningVi: "Chúng ta có cho phép người dùng tự sửa địa chỉ email không?",
            category: "POCommunication",
            emoji: "✉️",
            pronunciation: "/ʃʊd wiː əˈlaʊ ˈjuːzəz tuː ˈedɪt ðeə ˈiːmeɪl əˈdres/"
          },
          {
            id: "r7_202_4",
            word: "is this feature a must have for the mvp release",
            meaningVi: "Tính năng này là bắt buộc cho bản MVP hay là tùy chọn?",
            category: "POCommunication",
            emoji: "⭐",
            pronunciation: "/ɪz ðɪs ˈfiːtʃə ə mʌst hæv fɔː ðə em-viː-piː rɪˈliːs/"
          },
          {
            id: "r7_202_5",
            word: "what error message should be displayed to the user",
            meaningVi: "Thông báo lỗi nào nên được hiển thị cho người dùng?",
            category: "POCommunication",
            emoji: "⚠️",
            pronunciation: "/wɒt ˈerə ˈmesɪdʒ ʃʊd biː dɪˈspleɪd tuː ðə ˈjuːzə/"
          }
        ]
      },
      {
        id: "lvl-202-2",
        unitId: "unit-202",
        levelNumber: 2,
        title: "Aligning Figma Design & API Spec",
        titleVi: "Đối Chiếu Thiết Kế Figma & Đặc Tả API",
        type: "STANDARD",
        icon: "🎨",
        bgColor: "#2563eb",
        targetScore: 2400,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_202_6",
            word: "the figma design seems different from current acceptance criteria",
            meaningVi: "Bản vẽ Figma có vẻ đang khác so với tiêu chí nghiệm thu hiện tại",
            category: "POCommunication",
            emoji: "📐",
            pronunciation: "/ðə ˈfɪɡmə dɪˈzaɪn siːmz ˈdɪfrənt frɒm ˈkʌrənt əkˈseptəns kraɪˈtɪəriə/"
          },
          {
            id: "r7_202_7",
            word: "which source of truth should we follow for this layout",
            meaningVi: "Chúng ta nên lấy nguồn tài liệu nào làm chuẩn cho giao diện này?",
            category: "POCommunication",
            emoji: "🔍",
            pronunciation: "/wɪtʃ sɔːs ɒv truːθ ʃʊd wiː ˈfɒləʊ fɔː ðɪs ˈleɪaʊt/"
          },
          {
            id: "r7_202_8",
            word: "the current api response does not return the avatar field",
            meaningVi: "Dữ liệu API hiện tại chưa trả về trường ảnh đại diện",
            category: "POCommunication",
            emoji: "🖼️",
            pronunciation: "/ðə ˈkʌrənt eɪ-piː-aɪ rɪˈspɒns dʌz nɒt rɪˈtɜːn ðə ˈævətɑː fiːld/"
          },
          {
            id: "r7_202_9",
            word: "can we confirm the default sorting order for this table",
            meaningVi: "Chúng ta có thể chốt thứ tự sắp xếp mặc định cho bảng này không?",
            category: "POCommunication",
            emoji: "📊",
            pronunciation: "/kæn wiː kənˈfɜːm ðə dɪˈfɔːlt ˈsɔːtɪŋ ˈɔːdə fɔː ðɪs ˈteɪbl/"
          },
          {
            id: "r7_202_10",
            word: "let us align on the mobile responsive behavior first",
            meaningVi: "Hãy thống nhất trước về cách hiển thị trên điện thoại di động",
            category: "POCommunication",
            emoji: "📱",
            pronunciation: "/let ʌs əˈlaɪn ɒn ðə ˈməʊbaɪl rɪˈspɒnsɪv bɪˈheɪvjə fɜːst/"
          }
        ]
      },
      {
        id: "lvl-202-3",
        unitId: "unit-202",
        levelNumber: 3,
        title: "Requirement Clarification Rush",
        titleVi: "Phản Xạ Hỏi Nghiệp Vụ Tốc Độ Cao",
        type: "SPEED_RUSH",
        icon: "⚡",
        bgColor: "#1d4ed8",
        targetScore: 2600,
        xpReward: 55,
        gemReward: 10,
        speedMultiplier: 1.05,
        spawnInterval: 2300,
        words: [
          {
            id: "r7_202_11",
            word: "just to make sure we are on the same page",
            meaningVi: "Để đảm bảo chúng ta đang có cùng một cách hiểu chung",
            category: "POCommunication",
            emoji: "🤝",
            pronunciation: "/dʒʌst tuː meɪk ʃʊə wiː ɑː ɒn ðə seɪm peɪdʒ/"
          },
          {
            id: "r7_202_12",
            word: "my understanding is that users can only submit once",
            meaningVi: "Theo tôi hiểu là người dùng chỉ được phép gửi biểu mẫu một lần",
            category: "POCommunication",
            emoji: "☝️",
            pronunciation: "/maɪ ˌʌndəˈstændɪŋ ɪz ðæt ˈjuːzəz kæn ˈəʊnli səbˈmɪt wʌns/"
          },
          {
            id: "r7_202_13",
            word: "does this rule apply to admin accounts as well",
            meaningVi: "Quy tắc này có áp dụng cho cả tài khoản quản trị viên không?",
            category: "POCommunication",
            emoji: "👑",
            pronunciation: "/dʌz ðɪs ruːl əˈplaɪ tuː ˈædmɪn əˈkaʊnts æz wel/"
          },
          {
            id: "r7_202_14",
            word: "could you give me a concrete example of this scenario",
            meaningVi: "PO có thể cho tôi một ví dụ cụ thể về trường hợp này được không?",
            category: "POCommunication",
            emoji: "📖",
            pronunciation: "/kʊd juː ɡɪv miː ə ˈkɒŋkriːt ɪɡˈzɑːmpl ɒv ðɪs sɪˈnɑːriəʊ/"
          },
          {
            id: "r7_202_15",
            word: "i will update the user story description with our decision",
            meaningVi: "Tôi sẽ cập nhật mô tả user story với quyết định vừa chốt của chúng ta",
            category: "POCommunication",
            emoji: "📝",
            pronunciation: "/aɪ wɪl ʌpˈdeɪt ðə ˈjuːzə ˈstɔːri dɪˈskrɪpʃn wɪð ˈaʊə dɪˈsɪʒn/"
          }
        ]
      },
      {
        id: "lvl-202-4",
        unitId: "unit-202",
        levelNumber: 4,
        title: "Requirement Clarification Boss",
        titleVi: "Đại Chiến Trùm: Chốt Nghiệp Vụ Với PO",
        type: "BOSS_BATTLE",
        icon: "👑",
        bgColor: "#1e40af",
        targetScore: 3200,
        xpReward: 70,
        gemReward: 15,
        speedMultiplier: 1.1,
        spawnInterval: 2200,
        words: [
          {
            id: "r7_202_16",
            word: "if we follow this approach it might impact existing customer data",
            meaningVi: "Nếu làm theo cách này có thể sẽ ảnh hưởng đến dữ liệu khách hàng cũ",
            category: "POCommunication",
            emoji: "🛡️",
            pronunciation: "/ɪf wiː ˈfɒləʊ ðɪs əˈprəʊtʃ ɪt maɪt ˈɪmpækt ɪɡˈzɪstɪŋ ˈkʌstəmə ˈdeɪtə/"
          },
          {
            id: "r7_202_17",
            word: "i suggest we break this epic into smaller testable user stories",
            meaningVi: "Tôi đề xuất chúng ta chia epic lớn này thành các story nhỏ dễ kiểm thử hơn",
            category: "POCommunication",
            emoji: "🧩",
            pronunciation: "/aɪ səˈdʒest wiː breɪk ðɪs ˈepɪk ˈɪntuː ˈsmɔːlə ˈtestəbl ˈjuːzə ˈstɔːriz/"
          },
          {
            id: "r7_202_18",
            word: "can you help confirm the priority between these two user stories",
            meaningVi: "PO có thể giúp chốt độ ưu tiên giữa hai user story này không?",
            category: "POCommunication",
            emoji: "🎯",
            pronunciation: "/kæn juː help kənˈfɜːm ðə praɪˈɒrəti bɪˈtwiːn ðiːz tuː ˈjuːzə ˈstɔːriz/"
          },
          {
            id: "r7_202_19",
            word: "we need to define the fallback strategy if the payment gateway fails",
            meaningVi: "Chúng ta cần định nghĩa phương án dự phòng nếu cổng thanh toán gặp sự cố",
            category: "POCommunication",
            emoji: "🔄",
            pronunciation: "/wiː niːd tuː dɪˈfaɪn ðə ˈfɔːlbæk ˈstrætədʒi ɪf ðə ˈpeɪmənt ˈɡeɪtweɪ feɪlz/"
          },
          {
            id: "r7_202_20",
            word: "thank you for clarifying the acceptance criteria i will proceed now",
            meaningVi: "Cảm ơn PO đã làm rõ tiêu chí nghiệm thu, bây giờ tôi sẽ bắt tay vào làm",
            category: "POCommunication",
            emoji: "🚀",
            pronunciation: "/θæŋk juː fɔː ˈklærɪfaɪɪŋ ðə əkˈseptəns kraɪˈtɪəriə aɪ wɪl prəˈsiːd naʊ/"
          }
        ]
      }
    ]
  },
  {
    id: "unit-203",
    unitNumber: 203,
    title: "Sprint Planning & Estimation",
    titleVi: "Kế Hoạch Sprint & Ước Lượng Điểm",
    description: "Thảo luận độ phức tạp công việc, giải thích lý do ước lượng Story Point và thương lượng phạm vi cam kết Sprint.",
    icon: "📊",
    themeColor: "#8b5cf6",
    bannerBg: "from-purple-700/30 via-violet-700/20 to-slate-800/30",
    levels: [
      {
        id: "lvl-203-1",
        unitId: "unit-203",
        levelNumber: 1,
        title: "Estimating Complexity & Story Points",
        titleVi: "Ước Lượng Độ Phức Tạp & Điểm Story",
        type: "STANDARD",
        icon: "🎲",
        bgColor: "#8b5cf6",
        targetScore: 2300,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_203_1",
            word: "i estimate this ticket at five story points",
            meaningVi: "Tôi ước lượng ticket này khoảng năm story point",
            category: "SprintPlanning",
            emoji: "5️⃣",
            pronunciation: "/aɪ ˈestɪmeɪt ðɪs ˈtɪkɪt æt faɪv ˈstɔːri pɔɪnts/"
          },
          {
            id: "r7_203_2",
            word: "this task involves several unknown third party dependencies",
            meaningVi: "Tác vụ này có nhiều phụ thuộc vào bên thứ ba chưa rõ ràng",
            category: "SprintPlanning",
            emoji: "🔗",
            pronunciation: "/ðɪs tɑːsk ɪnˈvɒlvz ˈsevrəl ˌʌnˈnəʊn θɜːd ˈpɑːti dɪˈpendənsiz/"
          },
          {
            id: "r7_203_3",
            word: "the backend logic is straightforward but ui animation takes time",
            meaningVi: "Nghiệp vụ backend khá đơn giản nhưng hiệu ứng giao diện cần nhiều thời gian",
            category: "SprintPlanning",
            emoji: "✨",
            pronunciation: "/ðə ˈbækend ˈlɒdʒɪk ɪz ˌstreɪtˈfɔːwəd bʌt juː-aɪ ˌænɪˈmeɪʃn teɪks taɪm/"
          },
          {
            id: "r7_203_4",
            word: "i propose conducting a technical spike first",
            meaningVi: "Tôi đề xuất làm một bài nghiên cứu kỹ thuật thử nghiệm trước",
            category: "SprintPlanning",
            emoji: "🔬",
            pronunciation: "/aɪ prəˈpəʊz kənˈdʌktɪŋ ə ˈteknɪkl spaɪk fɜːst/"
          },
          {
            id: "r7_203_5",
            word: "we might need extra effort for backward compatibility",
            meaningVi: "Chúng ta có thể cần thêm công sức để tương thích ngược với phiên bản cũ",
            category: "SprintPlanning",
            emoji: "🔄",
            pronunciation: "/wiː maɪt niːd ˈekstrə ˈefət fɔː ˈbækwəd kəmˌpætəˈbɪləti/"
          }
        ]
      },
      {
        id: "lvl-203-2",
        unitId: "unit-203",
        levelNumber: 2,
        title: "Sprint Capacity & Commitments",
        titleVi: "Khối Lượng & Cam Kết Sprint",
        type: "STANDARD",
        icon: "⚖️",
        bgColor: "#7c3aed",
        targetScore: 2400,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_203_6",
            word: "our team velocity is around thirty points per sprint",
            meaningVi: "Vận tốc hoàn thành của nhóm là khoảng ba mươi điểm mỗi sprint",
            category: "SprintPlanning",
            emoji: "📈",
            pronunciation: "/ˈaʊə tiːm vəˈlɒsəti ɪz əˈraʊnd ˈθɜːti pɔɪnts pɜː sprɪnt/"
          },
          {
            id: "r7_203_7",
            word: "we have reduced capacity due to public holidays next week",
            meaningVi: "Tuần tới nhóm bị giảm nhân lực do có ngày nghỉ lễ",
            category: "SprintPlanning",
            emoji: "🏖️",
            pronunciation: "/wiː hæv rɪˈdjuːst kəˈpæsəti djuː tuː ˈpʌblɪk ˈhɒlədeɪz nekst wiːk/"
          },
          {
            id: "r7_203_8",
            word: "taking on this ticket might put our sprint goal at risk",
            meaningVi: "Nếu nhận thêm ticket này có thể làm rủi ro mục tiêu của cả sprint",
            category: "SprintPlanning",
            emoji: "⚠️",
            pronunciation: "/ˈteɪkɪŋ ɒn ðɪs ˈtɪkɪt maɪt pʊt ˈaʊə sprɪnt ɡəʊl æt rɪsk/"
          },
          {
            id: "r7_203_9",
            word: "can we move this stretch goal to the next sprint backlog",
            meaningVi: "Chúng ta có thể chuyển mục tiêu mở rộng này sang backlog sprint sau không?",
            category: "SprintPlanning",
            emoji: "📦",
            pronunciation: "/kæn wiː muːv ðɪs stretʃ ɡəʊl tuː ðə nekst sprɪnt ˈbæklɒɡ/"
          },
          {
            id: "r7_203_10",
            word: "we are confident we can deliver all committed user stories",
            meaningVi: "Chúng tôi tự tin có thể bàn giao toàn bộ các user story đã cam kết",
            category: "SprintPlanning",
            emoji: "💪",
            pronunciation: "/wiː ɑː ˈkɒnfɪdənt wiː kæn dɪˈlɪvər ɔːl kəˈmɪtɪd ˈjuːzə ˈstɔːriz/"
          }
        ]
      },
      {
        id: "lvl-203-3",
        unitId: "unit-203",
        levelNumber: 3,
        title: "Sprint Planning Sprint Rush",
        titleVi: "Phản Xạ Kế Hoạch Sprint Tốc Độ Cao",
        type: "SPEED_RUSH",
        icon: "⚡",
        bgColor: "#6d28d9",
        targetScore: 2600,
        xpReward: 55,
        gemReward: 10,
        speedMultiplier: 1.05,
        spawnInterval: 2300,
        words: [
          {
            id: "r7_203_11",
            word: "let us vote on the story points now",
            meaningVi: "Bây giờ chúng ta cùng bỏ phiếu điểm cho story này nhé",
            category: "SprintPlanning",
            emoji: "🗳️",
            pronunciation: "/let ʌs vəʊt ɒn ðə ˈstɔːri pɔɪnts naʊ/"
          },
          {
            id: "r7_203_12",
            word: "why do you think this ticket is an eight instead of a three",
            meaningVi: "Tại sao bạn lại đánh giá ticket này tám điểm thay vì ba điểm?",
            category: "SprintPlanning",
            emoji: "🤔",
            pronunciation: "/waɪ duː juː θɪŋk ðɪs ˈtɪkɪt ɪz ən eɪt ɪnˈsted ɒv ə θriː/"
          },
          {
            id: "r7_203_13",
            word: "there is high risk in refactoring the legacy payment module",
            meaningVi: "Có rủi ro cao khi tái cấu trúc mô-đun thanh toán cũ",
            category: "SprintPlanning",
            emoji: "💣",
            pronunciation: "/ðeər ɪz haɪ rɪsk ɪn ˌriːˈfæktərɪŋ ðə ˈleɡəsi ˈpeɪmənt ˈmɒdjuːl/"
          },
          {
            id: "r7_203_14",
            word: "let us split this task into frontend and backend subtasks",
            meaningVi: "Hãy tách nhiệm vụ này thành hai phần việc frontend và backend",
            category: "SprintPlanning",
            emoji: "✂️",
            pronunciation: "/let ʌs splɪt ðɪs tɑːsk ˈɪntuː ˈfrʌntend ænd ˈbækend ˈsʌbtɑːsks/"
          },
          {
            id: "r7_203_15",
            word: "all sprint backlog items are clearly defined and accepted",
            meaningVi: "Toàn bộ các hạng mục trong sprint đã được định nghĩa rõ ràng và chấp thuận",
            category: "SprintPlanning",
            emoji: "✅",
            pronunciation: "/ɔːl sprɪnt ˈbæklɒɡ ˈaɪtəmz ɑː ˈklɪəli dɪˈfaɪnd ænd əkˈseptɪd/"
          }
        ]
      },
      {
        id: "lvl-203-4",
        unitId: "unit-203",
        levelNumber: 4,
        title: "Sprint Planning Boss Battle",
        titleVi: "Đại Chiến Trùm: Master Sprint Planning",
        type: "BOSS_BATTLE",
        icon: "👑",
        bgColor: "#5b21b6",
        targetScore: 3300,
        xpReward: 70,
        gemReward: 15,
        speedMultiplier: 1.1,
        spawnInterval: 2200,
        words: [
          {
            id: "r7_203_16",
            word: "based on historical data we should not overload the sprint scope",
            meaningVi: "Dựa trên dữ liệu các sprint trước, chúng ta không nên ôm quá nhiều việc",
            category: "SprintPlanning",
            emoji: "📊",
            pronunciation: "/beɪst ɒn hɪˈstɒrɪkl ˈdeɪtə wiː ʃʊd nɒt ˌəʊvəˈləʊd ðə sprɪnt skəʊp/"
          },
          {
            id: "r7_203_17",
            word: "if we include this feature we will need dedicated qa support",
            meaningVi: "Nếu đưa thêm tính năng này vào, chúng ta sẽ cần kiểm thử viên hỗ trợ sát sao",
            category: "SprintPlanning",
            emoji: "🧪",
            pronunciation: "/ɪf wiː ɪnˈkluːd ðɪs ˈfiːtʃə wiː wɪl niːd ˈdedɪkeɪtɪd kjuː-eɪ səˈpɔːt/"
          },
          {
            id: "r7_203_18",
            word: "our main sprint goal is to improve mobile checkout conversion rate",
            meaningVi: "Mục tiêu chính của sprint là nâng cao tỷ lệ chuyển đổi thanh toán trên di động",
            category: "SprintPlanning",
            emoji: "🎯",
            pronunciation: "/ˈaʊə meɪn sprɪnt ɡəʊl ɪz tuː ɪmˈpruːv ˈməʊbaɪl ˈtʃekaʊt kənˈvɜːʃn reɪt/"
          },
          {
            id: "r7_203_19",
            word: "i agree with the team consensus and accept the story point estimate",
            meaningVi: "Tôi đồng tình với sự đồng thuận của nhóm và chấp nhận mức ước lượng này",
            category: "SprintPlanning",
            emoji: "🤝",
            pronunciation: "/aɪ əˈɡriː wɪð ðə tiːm kənˈsensəs ænd əkˈsept ðə ˈstɔːri pɔɪnt ˈestɪmeɪt/"
          },
          {
            id: "r7_203_20",
            word: "let us start the sprint and maintain great communication throughout",
            meaningVi: "Hãy cùng bắt đầu sprint và duy trì trao đổi thông suốt trong suốt quá trình",
            category: "SprintPlanning",
            emoji: "🚀",
            pronunciation: "/let ʌs stɑːt ðə sprɪnt ænd meɪnˈteɪn ɡreɪt kəˌmjuːnɪˈkeɪʃn θruːˈaʊt/"
          }
        ]
      }
    ]
  },
  {
    id: "unit-204",
    unitNumber: 204,
    title: "Edge Cases & Bug Discussions",
    titleVi: "Trường Hợp Ngoại Lệ & Báo Lỗi",
    description: "Cách trình bày lỗi (Bugs), các tình huống biên (Edge Cases), mức độ nghiêm trọng và giải pháp khắc phục với PO & QA.",
    icon: "🐛",
    themeColor: "#ef4444",
    bannerBg: "from-red-700/30 via-rose-700/20 to-slate-800/30",
    levels: [
      {
        id: "lvl-204-1",
        unitId: "unit-204",
        levelNumber: 1,
        title: "Reporting & Reproducing Bugs",
        titleVi: "Mô Tả & Tái Hiện Lỗi Kỹ Thuật",
        type: "STANDARD",
        icon: "🔍",
        bgColor: "#ef4444",
        targetScore: 2300,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_204_1",
            word: "i was able to reproduce this bug on safari browser",
            meaningVi: "Tôi đã tái hiện được lỗi này trên trình duyệt Safari",
            category: "Bugs",
            emoji: "🧭",
            pronunciation: "/aɪ wɒz ˈeɪbl tuː ˌriːprəˈdjuːs ðɪs bʌɡ ɒn səˈfɑːri ˈbraʊzə/"
          },
          {
            id: "r7_204_2",
            word: "the root cause is an unhandled null pointer exception",
            meaningVi: "Nguyên nhân gốc rễ là do ngoại lệ giá trị null chưa được bắt lỗi",
            category: "Bugs",
            emoji: "💥",
            pronunciation: "/ðə ruːt kɔːz ɪz ən ʌnˈhændld nʌl ˈpɔɪntə ɪkˈsepʃn/"
          },
          {
            id: "r7_204_3",
            word: "this bug only happens when the network connection is slow",
            meaningVi: "Lỗi này chỉ xảy ra khi kết nối mạng chập chờn hoặc chậm",
            category: "Bugs",
            emoji: "📶",
            pronunciation: "/ðɪs bʌɡ ˈəʊnli ˈhæpənz wen ðə ˈnetwɜːk kəˈnekʃn ɪz sləʊ/"
          },
          {
            id: "r7_204_4",
            word: "we should classify this as a blocker for the release",
            meaningVi: "Chúng ta nên xếp lỗi này vào mức độ chặn bản phát hành",
            category: "Bugs",
            emoji: "🚫",
            pronunciation: "/wiː ʃʊd ˈklæsɪfaɪ ðɪs æz ə ˈblɒkə fɔː ðə rɪˈliːs/"
          },
          {
            id: "r7_204_5",
            word: "i have created a hotfix and verified it locally",
            meaningVi: "Tôi đã tạo bản sửa lỗi khẩn cấp và kiểm tra thử trên máy cá nhân",
            category: "Bugs",
            emoji: "🔥",
            pronunciation: "/aɪ hæv kriːˈeɪtɪd ə ˈhɒtfɪks ænd ˈverɪfaɪd ɪt ˈləʊkəli/"
          }
        ]
      },
      {
        id: "lvl-204-2",
        unitId: "unit-204",
        levelNumber: 2,
        title: "Handling Edge Cases with PO",
        titleVi: "Xử Lý Trường Hợp Ngoại Lệ Với PO",
        type: "STANDARD",
        icon: "⚠️",
        bgColor: "#dc2626",
        targetScore: 2400,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_204_6",
            word: "what happens if a user submits special characters in the name field",
            meaningVi: "Điều gì sẽ xảy ra nếu người dùng nhập ký tự đặc biệt vào ô tên?",
            category: "Bugs",
            emoji: "🔣",
            pronunciation: "/wɒt ˈhæpənz ɪf ə ˈjuːzə səbˈmɪts ˈspeʃl ˈkærəktəz ɪn ðə neɪm fiːld/"
          },
          {
            id: "r7_204_7",
            word: "we need to decide how to handle concurrent edits on the same record",
            meaningVi: "Chúng ta cần quyết định cách xử lý khi có hai người cùng chỉnh sửa một bản ghi",
            category: "Bugs",
            emoji: "👥",
            pronunciation: "/wiː niːd tuː dɪˈsaɪd haʊ tuː ˈhændl kənˈkʌrənt ˈedɪts ɒn ðə seɪm ˈrekɔːd/"
          },
          {
            id: "r7_204_8",
            word: "how should the system behave when the uploaded file exceeds ten megabytes",
            meaningVi: "Hệ thống nên phản hồi thế nào khi file tải lên vượt quá mười megabyte?",
            category: "Bugs",
            emoji: "📁",
            pronunciation: "/haʊ ʃʊd ðə ˈsɪstəm bɪˈheɪv wen ðɪ ˌʌpˈləʊdɪd faɪl ɪkˈsiːdz ten ˈmeɡəbaɪts/"
          },
          {
            id: "r7_204_9",
            word: "we must prevent duplicate form submissions when users double click",
            meaningVi: "Chúng ta cần chặn việc gửi trùng biểu mẫu khi người dùng nhấp đúp",
            category: "Bugs",
            emoji: "🖱️",
            pronunciation: "/wiː mʌst prɪˈvent ˈdjuːplɪkət fɔːm səbˈmɪʃnz wen ˈjuːzəz ˈdʌbl klɪk/"
          },
          {
            id: "r7_204_10",
            word: "i recommend adding client side validation for instant user feedback",
            meaningVi: "Tôi khuyên nên kiểm tra tính hợp lệ ngay phía giao diện để phản hồi tức thì",
            category: "Bugs",
            emoji: "⚡",
            pronunciation: "/aɪ ˌrekəˈmend ˈædɪŋ ˈklaɪənt saɪd ˌvælɪˈdeɪʃn fɔː ˈɪnstənt ˈjuːzə ˈfiːdbæk/"
          }
        ]
      },
      {
        id: "lvl-204-3",
        unitId: "unit-204",
        levelNumber: 3,
        title: "Bug & Edge Case Speed Drill",
        titleVi: "Luyện Phản Xạ Báo Lỗi & Tình Huống Biên",
        type: "SPEED_RUSH",
        icon: "⚡",
        bgColor: "#b91c1c",
        targetScore: 2600,
        xpReward: 55,
        gemReward: 10,
        speedMultiplier: 1.05,
        spawnInterval: 2300,
        words: [
          {
            id: "r7_204_11",
            word: "the error logs indicate a database connection timeout",
            meaningVi: "Nhật ký lỗi cho thấy đã bị quá thời gian chờ kết nối cơ sở dữ liệu",
            category: "Bugs",
            emoji: "📜",
            pronunciation: "/ði ˈerə lɒɡz ˈɪndɪkeɪt ə ˈdeɪtəbeɪs kəˈnekʃn ˈtaɪmaʊt/"
          },
          {
            id: "r7_204_12",
            word: "can you provide the exact steps to reproduce this issue",
            meaningVi: "Bạn có thể cung cấp các bước chính xác để tái hiện lỗi này không?",
            category: "Bugs",
            emoji: "🪜",
            pronunciation: "/kæn juː prəˈvaɪd ði ɪɡˈzækt steps tuː ˌriːprəˈdjuːs ðɪs ˈɪʃuː/"
          },
          {
            id: "r7_204_13",
            word: "this is a visual regression caused by the new css framework",
            meaningVi: "Đây là lỗi thụt lùi giao diện do bộ khung CSS mới gây ra",
            category: "Bugs",
            emoji: "🎨",
            pronunciation: "/ðɪs ɪz ə ˈvɪʒuəl rɪˈɡreʃn kɔːzd baɪ ðə njuː siː-es-es ˈfreɪmwɜːk/"
          },
          {
            id: "r7_204_14",
            word: "we should write a regression test to prevent this bug from reoccurring",
            meaningVi: "Chúng ta nên viết kiểm thử hồi quy để tránh lỗi này tái diễn",
            category: "Bugs",
            emoji: "🛡️",
            pronunciation: "/wiː ʃʊd raɪt ə rɪˈɡreʃn test tuː prɪˈvent ðɪs bʌɡ frɒm ˌriːəˈkɜːrɪŋ/"
          },
          {
            id: "r7_204_15",
            word: "the fix is merged to main branch and deployed to qa",
            meaningVi: "Bản sửa lỗi đã được gộp vào nhánh chính và triển khai lên môi trường QA",
            category: "Bugs",
            emoji: "🌿",
            pronunciation: "/ðə fɪks ɪz mɜːdʒd tuː meɪn brɑːntʃ ænd dɪˈplɔɪd tuː kjuː-eɪ/"
          }
        ]
      },
      {
        id: "lvl-204-4",
        unitId: "unit-204",
        levelNumber: 4,
        title: "Bug Triage Boss Battle",
        titleVi: "Đại Chiến Trùm: Xử Lý Lỗi Phức Tạp",
        type: "BOSS_BATTLE",
        icon: "👑",
        bgColor: "#991b1b",
        targetScore: 3300,
        xpReward: 70,
        gemReward: 15,
        speedMultiplier: 1.1,
        spawnInterval: 2200,
        words: [
          {
            id: "r7_204_16",
            word: "we have identified a critical security vulnerability in the token parser",
            meaningVi: "Chúng tôi đã phát hiện một lỗ hổng bảo mật nghiêm trọng ở bộ phân tích mã xác thực",
            category: "Bugs",
            emoji: "🚨",
            pronunciation: "/wiː hæv aɪˈdentɪfaɪd ə ˈkrɪtɪkl sɪˈkjʊərəti ˌvʌlnərəˈbɪləti ɪn ðə ˈtəʊkən ˈpɑːzə/"
          },
          {
            id: "r7_204_17",
            word: "i patched the vulnerability and rotated all production api keys",
            meaningVi: "Tôi đã vá xong lỗ hổng và đổi mới toàn bộ khóa API trên môi trường thật",
            category: "Bugs",
            emoji: "🔑",
            pronunciation: "/aɪ pætʃt ðə ˌvʌlnərəˈbɪləti ænd rəʊˈteɪtɪd ɔːl prəˈdʌkʃn eɪ-piː-aɪ kiːz/"
          },
          {
            id: "r7_204_18",
            word: "let us notify the po and customer support about the planned maintenance",
            meaningVi: "Hãy thông báo cho PO và đội ngũ chăm sóc khách hàng về lịch bảo trì định kỳ",
            category: "Bugs",
            emoji: "📢",
            pronunciation: "/let ʌs ˈnəʊtɪfaɪ ðə piː-əʊ ænd ˈkʌstəmə səˈpɔːt əˈbaʊt ðə plænd ˈmeɪntənəns/"
          },
          {
            id: "r7_204_19",
            word: "the hotfix passed all automated checks and manual smoke tests",
            meaningVi: "Bản sửa lỗi khẩn cấp đã vượt qua toàn bộ kiểm tra tự động và kiểm thử sơ bộ",
            category: "Bugs",
            emoji: "🧪",
            pronunciation: "/ðə ˈhɒtfɪks pɑːst ɔːl ˈɔːtəmeɪtɪd tʃeks ænd ˈmænjuəl sməʊk tests/"
          },
          {
            id: "r7_204_20",
            word: "production system is fully stable and error rates returned to normal",
            meaningVi: "Hệ thống vận hành thực tế đã ổn định và tỷ lệ lỗi đã trở về mức bình thường",
            category: "Bugs",
            emoji: "🟢",
            pronunciation: "/prəˈdʌkʃn ˈsɪstəm ɪz ˈfʊli ˈsteɪbl ænd ˈerə reɪts rɪˈtɜːnd tuː ˈnɔːml/"
          }
        ]
      }
    ]
  },
  {
    id: "unit-205",
    unitNumber: 205,
    title: "Sprint Review & Demo to PO",
    titleVi: "Thuyết Trình Demo & Review Sprint",
    description: "Các mẫu câu tự tin khi dẫn dắt buổi Demo tính năng, giải thích cách người dùng tương tác và tiếp thu phản hồi của PO.",
    icon: "🎤",
    themeColor: "#10b981",
    bannerBg: "from-emerald-700/30 via-teal-700/20 to-slate-800/30",
    levels: [
      {
        id: "lvl-205-1",
        unitId: "unit-205",
        levelNumber: 1,
        title: "Starting the Feature Demo",
        titleVi: "Mở Đầu Bài Thuyết Trình Demo",
        type: "STANDARD",
        icon: "🎬",
        bgColor: "#10b981",
        targetScore: 2300,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_205_1",
            word: "let me walk you through the new user registration flow",
            meaningVi: "Để tôi dẫn dắt mọi người đi qua luồng đăng ký tài khoản mới nhé",
            category: "Demo",
            emoji: "🚶",
            pronunciation: "/let miː wɔːk juː θruː ðə njuː ˈjuːzə ˌredʒɪˈstreɪʃn fləʊ/"
          },
          {
            id: "r7_205_2",
            word: "first i will log in with a newly created student account",
            meaningVi: "Đầu tiên tôi sẽ đăng nhập bằng một tài khoản học sinh vừa tạo",
            category: "Demo",
            emoji: "🎓",
            pronunciation: "/fɜːst aɪ wɪl lɒɡ ɪn wɪð ə ˈnjuːli kriːˈeɪtɪd ˈstjuːdnt əˈkaʊnt/"
          },
          {
            id: "r7_205_3",
            word: "as you can see the dashboard loads in under one second",
            meaningVi: "Như mọi người thấy, trang tổng quan tải trong chưa đầy một giây",
            category: "Demo",
            emoji: "⚡",
            pronunciation: "/æz juː kæn siː ðə ˈdæʃbɔːd ləʊdz ɪn ˈʌndə wʌn ˈsekənd/"
          },
          {
            id: "r7_205_4",
            word: "when the user clicks upgrade a payment modal opens smoothly",
            meaningVi: "Khi người dùng bấm nâng cấp, cửa sổ thanh toán sẽ mở ra mượt mà",
            category: "Demo",
            emoji: "💎",
            pronunciation: "/wen ðə ˈjuːzə klɪks ʌpˈɡreɪd ə ˈpeɪmənt ˈməʊdl ˈəʊpənz ˈsmuːðli/"
          },
          {
            id: "r7_205_5",
            word: "this fulfills all acceptance criteria outlined in the ticket",
            meaningVi: "Phần này đã đáp ứng đầy đủ tất cả các tiêu chí nghiệm thu trong ticket",
            category: "Demo",
            emoji: "✨",
            pronunciation: "/ðɪs fʊlˈfɪlz ɔːl əkˈseptəns kraɪˈtɪəriə ˈaʊtlaɪnd ɪn ðə ˈtɪkɪt/"
          }
        ]
      },
      {
        id: "lvl-205-2",
        unitId: "unit-205",
        levelNumber: 2,
        title: "Receiving Feedback & Action Items",
        titleVi: "Tiếp Thu Góp Ý & Ghi Nhận Việc Cần Làm",
        type: "STANDARD",
        icon: "📝",
        bgColor: "#059669",
        targetScore: 2400,
        xpReward: 45,
        gemReward: 8,
        speedMultiplier: 0.95,
        spawnInterval: 2500,
        words: [
          {
            id: "r7_205_6",
            word: "thank you for the valuable feedback on the button placement",
            meaningVi: "Cảm ơn PO đã góp ý rất hữu ích về vị trí đặt nút bấm",
            category: "Demo",
            emoji: "🙏",
            pronunciation: "/θæŋk juː fɔː ðə ˈvæljuəbl ˈfiːdbæk ɒn ðə ˈbʌtn ˈpleɪsmənt/"
          },
          {
            id: "r7_205_7",
            word: "we will iterate on the animation speed in the next sprint",
            meaningVi: "Chúng tôi sẽ tinh chỉnh lại tốc độ hiệu ứng trong sprint kế tiếp",
            category: "Demo",
            emoji: "🔄",
            pronunciation: "/wiː wɪl ˈɪtəreɪt ɒn ðɪ ˌænɪˈmeɪʃn spiːd ɪn ðə nekst sprɪnt/"
          },
          {
            id: "r7_205_8",
            word: "does this implementation match what you envisioned",
            meaningVi: "Cách triển khai này đã đúng với mong đợi ban đầu của PO chưa?",
            category: "Demo",
            emoji: "👁️",
            pronunciation: "/dʌz ðɪs ˌɪmplɪmenˈteɪʃn mætʃ wɒt juː ɪnˈvɪʒnd/"
          },
          {
            id: "r7_205_9",
            word: "i will create a follow up ticket for this enhancement request",
            meaningVi: "Tôi sẽ tạo một ticket riêng để theo dõi yêu cầu cải tiến thêm này",
            category: "Demo",
            emoji: "🎫",
            pronunciation: "/aɪ wɪl kriːˈeɪt ə ˈfɒləʊ ʌp ˈtɪkɪt fɔː ðɪs ɪnˈhɑːnsmənt rɪˈkwest/"
          },
          {
            id: "r7_205_10",
            word: "are there any remaining questions or concerns regarding this demo",
            meaningVi: "Mọi người còn câu hỏi hay thắc mắc nào về bài demo này không?",
            category: "Demo",
            emoji: "❓",
            pronunciation: "/ɑː ðeər ˈeni rɪˈmeɪnɪŋ ˈkwestʃənz ɔː kənˈsɜːnz rɪˈɡɑːdɪŋ ðɪs ˈdeməʊ/"
          }
        ]
      },
      {
        id: "lvl-205-3",
        unitId: "unit-205",
        levelNumber: 3,
        title: "Sprint Review Speed Rush",
        titleVi: "Luyện Phản Xạ Demo & Trả Lời Câu Hỏi",
        type: "SPEED_RUSH",
        icon: "⚡",
        bgColor: "#047857",
        targetScore: 2600,
        xpReward: 55,
        gemReward: 10,
        speedMultiplier: 1.05,
        spawnInterval: 2300,
        words: [
          {
            id: "r7_205_11",
            word: "let me switch to the mobile viewport to demonstrate responsiveness",
            meaningVi: "Để tôi chuyển sang giao diện điện thoại để trình diễn độ co giãn",
            category: "Demo",
            emoji: "📱",
            pronunciation: "/let miː swɪtʃ tuː ðə ˈməʊbaɪl ˈvjuːpɔːt tuː ˈdemənstreɪt rɪˈspɒnsɪvnəs/"
          },
          {
            id: "r7_205_12",
            word: "all user permissions are strictly enforced on the server side",
            meaningVi: "Mọi quyền hạn người dùng đều được kiểm tra chặt chẽ phía máy chủ",
            category: "Demo",
            emoji: "🔒",
            pronunciation: "/ɔːl ˈjuːzə pəˈmɪʃnz ɑː ˈstrɪktli ɪnˈfɔːst ɒn ðə ˈsɜːvə saɪd/"
          },
          {
            id: "r7_205_13",
            word: "the analytics tracking events are firing as expected",
            meaningVi: "Các sự kiện đo lường hành vi người dùng đang hoạt động chính xác",
            category: "Demo",
            emoji: "📊",
            pronunciation: "/ði ˌænəˈlɪtɪks ˈtrækɪŋ ɪˈvents ɑː ˈfaɪərɪŋ æz ɪkˈspektɪd/"
          },
          {
            id: "r7_205_14",
            word: "we have received approval from product and design teams",
            meaningVi: "Chúng tôi đã nhận được sự chấp thuận từ cả đội ngũ sản phẩm và thiết kế",
            category: "Demo",
            emoji: "🏆",
            pronunciation: "/wiː hæv rɪˈsiːvd əˈpruːvl frɒm ˈprɒdʌkt ænd dɪˈzaɪn tiːmz/"
          },
          {
            id: "r7_205_15",
            word: "this concludes our demo for sprint twenty five",
            meaningVi: "Phần trình bày kết thúc buổi demo sprint số hai mươi lăm của nhóm",
            category: "Demo",
            emoji: "🎉",
            pronunciation: "/ðɪs kənˈkluːdz ˈaʊə ˈdeməʊ fɔː sprɪnt ˈtwenti faɪv/"
          }
        ]
      },
      {
        id: "lvl-205-4",
        unitId: "unit-205",
        levelNumber: 4,
        title: "Sprint Review Boss Battle",
        titleVi: "Đại Chiến Trùm: Demo Hoàn Hảo Cho Stakeholders",
        type: "BOSS_BATTLE",
        icon: "👑",
        bgColor: "#065f46",
        targetScore: 3300,
        xpReward: 70,
        gemReward: 15,
        speedMultiplier: 1.1,
        spawnInterval: 2200,
        words: [
          {
            id: "r7_205_16",
            word: "i am proud to present our new dark mode theme for the learning portal",
            meaningVi: "Tôi rất tự hào giới thiệu giao diện tối mới cho cổng học tập trực tuyến",
            category: "Demo",
            emoji: "🌙",
            pronunciation: "/aɪ æm praʊd tuː prɪˈzent ˈaʊə njuː dɑːk məʊd θiːm fɔː ðə ˈlɜːnɪŋ ˈpɔːtl/"
          },
          {
            id: "r7_205_17",
            word: "we improved the core web vitals and cut initial page load by fifty percent",
            meaningVi: "Chúng tôi đã tối ưu chỉ số tải trang và giảm năm mươi phần trăm thời gian chờ",
            category: "Demo",
            emoji: "⚡",
            pronunciation: "/wiː ɪmˈpruːvd ðə kɔː web ˈvaɪtlz ænd kʌt ɪˈnɪʃl peɪdʒ ləʊd baɪ ˈfɪfti pəˈsent/"
          },
          {
            id: "r7_205_18",
            word: "user feedback from the beta testing group has been overwhelmingly positive",
            meaningVi: "Phản hồi từ nhóm người dùng thử nghiệm beta nhận được rất tích cực",
            category: "Demo",
            emoji: "⭐",
            pronunciation: "/ˈjuːzə ˈfiːdbæk frɒm ðə ˈbeɪtə ˈtestɪŋ ɡruːp hæz biːn ˌəʊvəˈwelmɪŋli ˈpɒzətɪv/"
          },
          {
            id: "r7_205_19",
            word: "the release candidate has passed all automated security and load testing",
            meaningVi: "Bản ứng viên phát hành đã vượt qua toàn bộ kiểm tra bảo mật và chịu tải",
            category: "Demo",
            emoji: "🛡️",
            pronunciation: "/ðə rɪˈliːs ˈkændɪdeɪt hæz pɑːst ɔːl ˈɔːtəmeɪtɪd sɪˈkjʊərəti ænd ləʊd ˈtestɪŋ/"
          },
          {
            id: "r7_205_20",
            word: "we are ready to roll out this release to one hundred percent of users",
            meaningVi: "Chúng tôi đã sẵn sàng phát hành tính năng này tới một trăm phần trăm người dùng",
            category: "Demo",
            emoji: "🚀",
            pronunciation: "/wiː ɑː ˈredi tuː rəʊl aʊt ðɪs rɪˈliːs tuː wʌn ˈhʌndrəd pəˈsent ɒv ˈjuːzəz/"
          }
        ]
      }
    ]
  }
];

export const REALM7_REALM: AgeRealm = {
  id: 'realm-7',
  realmNumber: 7,
  name: 'Tech Pro & PO Agile Speaking',
  nameVi: 'Giao Tiếp PO, Standup & Sprint Dev',
  ageRange: 'Người Lớn / Đi Làm',
  gradeLabel: 'Tech Pro & Agile Communication',
  description: 'Bộ câu thoại chuẩn quốc tế giúp Lập trình viên, Tester, Tech Lead tự tin làm việc với Product Owner (PO), báo cáo Standup, làm rõ yêu cầu và thuyết trình Demo.',
  icon: '💼',
  color: '#06b6d4',
  badgeBg: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300',
  startChapter: 201,
  endChapter: 205,
  wordLengthHint: 'Câu giao tiếp 20 - 60+ chữ cái',
  targetWpm: '35 - 55+ WPM',
  units: REALM7_UNITS
};
