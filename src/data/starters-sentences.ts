import { SentenceTopic } from './sentence-types';

export const STARTERS_SENTENCE_TOPICS: SentenceTopic[] = [
  {
    id: 'st-unit-1',
    unitNumber: 1,
    title: 'It is a / an...',
    titleVi: 'Giới Thiệu Đồ Vật & Con Vật',
    patternFormula: 'It is a/an + [tính từ] + [danh từ].',
    description: 'Ghép câu mô tả màu sắc, kích thước thay cho nói 1 từ đơn.',
    icon: '🐶',
    accentColor: '#06b6d4',
    items: [
      {
        id: 'st-1-1',
        sentence: 'It is a big dog.',
        meaningVi: 'Nó là một chú chó to.',
        emoji: '🐕',
        gapWord: 'big',
        distractors: ['small', 'red']
      },
      {
        id: 'st-1-2',
        sentence: 'It is a red apple.',
        meaningVi: 'Nó là một quả táo màu đỏ.',
        emoji: '🍎',
        gapWord: 'apple',
        distractors: ['banana', 'ball']
      },
      {
        id: 'st-1-3',
        sentence: 'It is a small cat.',
        meaningVi: 'Nó là một chú mèo nhỏ.',
        emoji: '🐱',
        gapWord: 'small',
        distractors: ['big', 'blue']
      },
      {
        id: 'st-1-4',
        sentence: 'It is an orange car.',
        meaningVi: 'Nó là một chiếc xe hơi màu cam.',
        emoji: '🚗',
        gapWord: 'an',
        distractors: ['a', 'the']
      },
      {
        id: 'st-1-5',
        sentence: 'It is a yellow duck.',
        meaningVi: 'Nó là một chú vịt màu vàng.',
        emoji: '🦆',
        gapWord: 'yellow',
        distractors: ['green', 'pink']
      },
      {
        id: 'st-1-6',
        sentence: 'It is a long train.',
        meaningVi: 'Nó là một đoàn tàu dài.',
        emoji: '🚂',
        gapWord: 'long',
        distractors: ['short', 'round']
      }
    ]
  },
  {
    id: 'st-unit-2',
    unitNumber: 2,
    title: 'There is / There are',
    titleVi: 'Đếm Số Lượng Đồ Vật',
    patternFormula: 'There is a... / There are [số] ...',
    description: 'Phân biệt số ít (There is) và số nhiều (There are) trong tranh Starters.',
    icon: '🔢',
    accentColor: '#8b5cf6',
    items: [
      {
        id: 'st-2-1',
        sentence: 'There is a book on the desk.',
        meaningVi: 'Có một quyển sách ở trên bàn.',
        emoji: '📖',
        gapWord: 'is',
        distractors: ['are', 'am']
      },
      {
        id: 'st-2-2',
        sentence: 'There are three cats here.',
        meaningVi: 'Có ba chú mèo ở đây.',
        emoji: '🐱🐱🐱',
        gapWord: 'are',
        distractors: ['is', 'has']
      },
      {
        id: 'st-2-3',
        sentence: 'There are two blue birds.',
        meaningVi: 'Có hai chú chim màu xanh dương.',
        emoji: '🐦🐦',
        gapWord: 'two',
        distractors: ['one', 'a']
      },
      {
        id: 'st-2-4',
        sentence: 'There is a big tree.',
        meaningVi: 'Có một cái cây to.',
        emoji: '🌳',
        gapWord: 'tree',
        distractors: ['trees', 'flowers']
      },
      {
        id: 'st-2-5',
        sentence: 'There are five red balls.',
        meaningVi: 'Có năm quả bóng màu đỏ.',
        emoji: '⚽🔴',
        gapWord: 'balls',
        distractors: ['ball', 'book']
      },
      {
        id: 'st-2-6',
        sentence: 'There is one yellow bus.',
        meaningVi: 'Có một chiếc xe buýt màu vàng.',
        emoji: '🚌',
        gapWord: 'one',
        distractors: ['two', 'four']
      }
    ]
  },
  {
    id: 'st-unit-3',
    unitNumber: 3,
    title: 'I like / I do not like',
    titleVi: 'Nói Về Sở Thích',
    patternFormula: 'I like... / I do not like...',
    description: 'Bày tỏ món ăn, con vật mình thích hoặc không thích trọn câu.',
    icon: '🍕',
    accentColor: '#f59e0b',
    items: [
      {
        id: 'st-3-1',
        sentence: 'I like sweet bananas.',
        meaningVi: 'Con thích những quả chuối ngọt.',
        emoji: '🍌',
        gapWord: 'like',
        distractors: ['am', 'can']
      },
      {
        id: 'st-3-2',
        sentence: 'I do not like spiders.',
        meaningVi: 'Con không thích những con nhện.',
        emoji: '🕷️',
        gapWord: 'not',
        distractors: ['no', 'is']
      },
      {
        id: 'st-3-3',
        sentence: 'I like milk and bread.',
        meaningVi: 'Con thích sữa và bánh mì.',
        emoji: '🥛🍞',
        gapWord: 'and',
        distractors: ['but', 'on']
      },
      {
        id: 'st-3-4',
        sentence: 'My sister likes ice cream.',
        meaningVi: 'Chị của con thích kem.',
        emoji: '🍦',
        gapWord: 'likes',
        distractors: ['like', 'liking']
      },
      {
        id: 'st-3-5',
        sentence: 'I do not like onions.',
        meaningVi: 'Con không thích hành tây.',
        emoji: '🧅',
        gapWord: 'do',
        distractors: ['am', 'have']
      },
      {
        id: 'st-3-6',
        sentence: 'I like playing with toys.',
        meaningVi: 'Con thích chơi với đồ chơi.',
        emoji: '🧸',
        gapWord: 'toys',
        distractors: ['toy', 'eat']
      }
    ]
  },
  {
    id: 'st-unit-4',
    unitNumber: 4,
    title: 'I can / I cannot',
    titleVi: 'Khả Năng Làm Việc Gì Đó',
    patternFormula: 'I can... / I cannot...',
    description: 'Nói về những hành động bé hoặc con vật làm được hay không làm được.',
    icon: '🏊',
    accentColor: '#10b981',
    items: [
      {
        id: 'st-4-1',
        sentence: 'I can swim very fast.',
        meaningVi: 'Con có thể bơi rất nhanh.',
        emoji: '🏊',
        gapWord: 'swim',
        distractors: ['fly', 'read']
      },
      {
        id: 'st-4-2',
        sentence: 'I cannot fly like a bird.',
        meaningVi: 'Con không thể bay như chim.',
        emoji: '🕊️',
        gapWord: 'fly',
        distractors: ['run', 'jump']
      },
      {
        id: 'st-4-3',
        sentence: 'She can ride a bike.',
        meaningVi: 'Bạn ấy có thể đi xe đạp.',
        emoji: '🚲',
        gapWord: 'ride',
        distractors: ['drive', 'eat']
      },
      {
        id: 'st-4-4',
        sentence: 'A frog can jump high.',
        meaningVi: 'Con ếch có thể nhảy cao.',
        emoji: '🐸',
        gapWord: 'jump',
        distractors: ['sing', 'write']
      },
      {
        id: 'st-4-5',
        sentence: 'He can play the piano.',
        meaningVi: 'Bạn nam có thể chơi đàn piano.',
        emoji: '🎹',
        gapWord: 'play',
        distractors: ['kick', 'draw']
      },
      {
        id: 'st-4-6',
        sentence: 'Elephants cannot climb trees.',
        meaningVi: 'Voi không thể trèo cây.',
        emoji: '🐘🌳',
        gapWord: 'climb',
        distractors: ['walk', 'drink']
      }
    ]
  },
  {
    id: 'st-unit-5',
    unitNumber: 5,
    title: 'He / She is V-ing',
    titleVi: 'Hành Động Đang Diễn Ra',
    patternFormula: 'He/She/It is + [động từ -ing].',
    description: 'Mẫu câu kinh điển trả lời câu hỏi "What is he/she doing?" trong Starters.',
    icon: '🏃',
    accentColor: '#ec4899',
    items: [
      {
        id: 'st-5-1',
        sentence: 'She is eating an apple.',
        meaningVi: 'Bạn nữ đang ăn một quả táo.',
        emoji: '👧🍎',
        gapWord: 'eating',
        distractors: ['eat', 'eats']
      },
      {
        id: 'st-5-2',
        sentence: 'The dog is running fast.',
        meaningVi: 'Chú chó đang chạy nhanh.',
        emoji: '🐕💨',
        gapWord: 'running',
        distractors: ['run', 'sleeping']
      },
      {
        id: 'st-5-3',
        sentence: 'He is reading a book.',
        meaningVi: 'Bạn nam đang đọc một quyển sách.',
        emoji: '👦📖',
        gapWord: 'reading',
        distractors: ['read', 'writing']
      },
      {
        id: 'st-5-4',
        sentence: 'The baby is sleeping now.',
        meaningVi: 'Em bé bây giờ đang ngủ.',
        emoji: '👶💤',
        gapWord: 'is',
        distractors: ['are', 'am']
      },
      {
        id: 'st-5-5',
        sentence: 'They are playing football.',
        meaningVi: 'Các bạn ấy đang chơi đá bóng.',
        emoji: '⚽👧👦',
        gapWord: 'are',
        distractors: ['is', 'do']
      },
      {
        id: 'st-5-6',
        sentence: 'Mom is cooking dinner.',
        meaningVi: 'Mẹ đang nấu bữa tối.',
        emoji: '👩‍🍳🍲',
        gapWord: 'cooking',
        distractors: ['cook', 'drawing']
      }
    ]
  },
  {
    id: 'st-unit-6',
    unitNumber: 6,
    title: 'In / On / Under / Next to',
    titleVi: 'Chỉ Vị Trí Đồ Vật',
    patternFormula: 'The [vật] is in/on/under/next to the [vật].',
    description: 'Trọng tâm thi Nghe & Nói Starters: trả lời câu hỏi "Where is...?".',
    icon: '📦',
    accentColor: '#3b82f6',
    items: [
      {
        id: 'st-6-1',
        sentence: 'The ball is under the chair.',
        meaningVi: 'Quả bóng ở dưới cái ghế.',
        emoji: '⚽🪑',
        gapWord: 'under',
        distractors: ['on', 'in']
      },
      {
        id: 'st-6-2',
        sentence: 'The cat is in the box.',
        meaningVi: 'Con mèo ở trong cái hộp.',
        emoji: '🐱📦',
        gapWord: 'in',
        distractors: ['on', 'under']
      },
      {
        id: 'st-6-3',
        sentence: 'The cup is on the table.',
        meaningVi: 'Cái cốc ở trên cái bàn.',
        emoji: '☕🪑',
        gapWord: 'on',
        distractors: ['in', 'under']
      },
      {
        id: 'st-6-4',
        sentence: 'The lamp is next to the bed.',
        meaningVi: 'Cái đèn ở cạnh cái giường.',
        emoji: '💡🛏️',
        gapWord: 'next',
        distractors: ['on', 'in']
      },
      {
        id: 'st-6-5',
        sentence: 'My shoes are under the bed.',
        meaningVi: 'Đôi giày của con ở dưới giường.',
        emoji: '👟🛏️',
        gapWord: 'under',
        distractors: ['in', 'behind']
      },
      {
        id: 'st-6-6',
        sentence: 'The clock is on the wall.',
        meaningVi: 'Cái đồng hồ ở trên tường.',
        emoji: '🕰️🧱',
        gapWord: 'on',
        distractors: ['under', 'in']
      }
    ]
  },
  {
    id: 'st-unit-7',
    unitNumber: 7,
    title: 'Have got / Has got',
    titleVi: 'Nói Về Đồ Dùng & Sở Hữu',
    patternFormula: 'I have got... / She has got...',
    description: 'Miêu tả đồ vật, quần áo hoặc thú cưng mà mình có.',
    icon: '🎒',
    accentColor: '#14b8a6',
    items: [
      {
        id: 'st-7-1',
        sentence: 'I have got a blue bag.',
        meaningVi: 'Con có một chiếc cặp màu xanh dương.',
        emoji: '🎒🔵',
        gapWord: 'have',
        distractors: ['has', 'am']
      },
      {
        id: 'st-7-2',
        sentence: 'She has got long hair.',
        meaningVi: 'Bạn nữ có mái tóc dài.',
        emoji: '👧✨',
        gapWord: 'has',
        distractors: ['have', 'is']
      },
      {
        id: 'st-7-3',
        sentence: 'He has got a green hat.',
        meaningVi: 'Bạn nam có một chiếc mũ màu xanh lá.',
        emoji: '🧢🟢',
        gapWord: 'hat',
        distractors: ['cat', 'bat']
      },
      {
        id: 'st-7-4',
        sentence: 'I have got two pencils.',
        meaningVi: 'Con có hai cây bút chì.',
        emoji: '✏️✏️',
        gapWord: 'pencils',
        distractors: ['pencil', 'pens']
      },
      {
        id: 'st-7-5',
        sentence: 'The monster has got three eyes.',
        meaningVi: 'Con quái vật có ba con mắt.',
        emoji: '👾👀',
        gapWord: 'got',
        distractors: ['get', 'have']
      },
      {
        id: 'st-7-6',
        sentence: 'We have got a funny robot.',
        meaningVi: 'Chúng con có một chú robot vui nhộn.',
        emoji: '🤖',
        gapWord: 'robot',
        distractors: ['rabbit', 'ruler']
      }
    ]
  },
  {
    id: 'st-unit-8',
    unitNumber: 8,
    title: 'Yes, it is / No, I cannot',
    titleVi: 'Trả Lời Trọn Câu (Hết Cộc Lốc)',
    patternFormula: 'Yes, it is. / No, it is not. / Yes, I can.',
    description: 'Luyện phản xạ trả lời lịch sự, đầy đủ khi cô giáo hỏi Yes/No.',
    icon: '💬',
    accentColor: '#f97316',
    items: [
      {
        id: 'st-8-1',
        sentence: 'Yes, it is a duck.',
        meaningVi: 'Vâng, đúng là một con vịt ạ.',
        emoji: '🦆✅',
        gapWord: 'is',
        distractors: ['are', 'can']
      },
      {
        id: 'st-8-2',
        sentence: 'No, it is not red.',
        meaningVi: 'Không, nó không phải màu đỏ.',
        emoji: '🔵❌',
        gapWord: 'not',
        distractors: ['no', 'yes']
      },
      {
        id: 'st-8-3',
        sentence: 'Yes, I can swim well.',
        meaningVi: 'Có, con có thể bơi giỏi.',
        emoji: '🏊✅',
        gapWord: 'can',
        distractors: ['am', 'do']
      },
      {
        id: 'st-8-4',
        sentence: 'No, I do not like fish.',
        meaningVi: 'Không, con không thích ăn cá.',
        emoji: '🐟❌',
        gapWord: 'do',
        distractors: ['am', 'have']
      },
      {
        id: 'st-8-5',
        sentence: 'Yes, I have got a dog.',
        meaningVi: 'Vâng, con có nuôi một chú chó.',
        emoji: '🐶✅',
        gapWord: 'have',
        distractors: ['has', 'can']
      },
      {
        id: 'st-8-6',
        sentence: 'My name is Tit.',
        meaningVi: 'Tên của con là Tít.',
        emoji: '👦🌟',
        gapWord: 'name',
        distractors: ['age', 'boy']
      }
    ]
  }
];
