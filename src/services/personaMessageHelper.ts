import { UserGender, MascotId } from '../data/progress-types';
import { MascotMood } from '../components/mascot/MascotWidget';
import { MASCOT_CONFIGS } from '../data/theme-types';

export type AgeCategory = 'kid' | 'teen' | 'adult';

/**
 * Determine learner age bracket:
 * - kid: <= 11 (Cấp 1 & chuẩn bị chuyển cấp, Realms 1-3)
 * - teen: 12 - 17 (Cấp 2, Cấp 3, IELTS, Realms 4-6)
 * - adult: >= 18 (Sinh viên, Người đi làm, Tech & PO, Giao tiếp đời sống, Realms 7-8)
 */
export function getAgeCategory(age?: number): AgeCategory {
  if (!age || age <= 11) return 'kid';
  if (age <= 17) return 'teen';
  return 'adult';
}

/**
 * Get tailored pronouns, titles and forms of address
 */
export function getPersonaAddressing(age?: number, gender: UserGender = 'neutral', userName?: string) {
  const ageCat = getAgeCategory(age);
  const rawName = userName?.trim() || '';

  if (ageCat === 'kid') {
    const defaultName = gender === 'girl' ? 'Bé Gái' : gender === 'boy' ? 'Bé Trai' : 'Bé Ngoan';
    const name = rawName || defaultName;
    const title = 'Bé';
    const honorific = `Bé ${name.replace(/^Bé\s+/i, '')}`;
    const vocative = `bé ${name.replace(/^Bé\s+/i, '')}`;
    const pronoun = 'bé';
    const roleTitle = gender === 'girl' ? 'Công Chúa Nhí' : gender === 'boy' ? 'Siêu Nhân Nhí' : 'Chiến Binh Nhí';
    return { ageCat, name, title, honorific, vocative, pronoun, roleTitle };
  }

  if (ageCat === 'teen') {
    const defaultName = gender === 'girl' ? 'Bạn Nữ' : gender === 'boy' ? 'Bạn Nam' : 'Chiến Binh';
    const name = rawName || defaultName;
    const title = 'Bạn';
    const honorific = rawName ? rawName : title;
    const vocative = `bạn ${name}`;
    const pronoun = 'bạn';
    const roleTitle = gender === 'girl' ? 'Nữ Thần Tinh Tú' : gender === 'boy' ? 'Thủ Lĩnh Thiên Hà' : 'Kiện Tướng Vũ Trụ';
    return { ageCat, name, title, honorific, vocative, pronoun, roleTitle };
  }

  // Adult (>= 18)
  const defaultName = gender === 'girl' ? 'Bạn Nữ' : gender === 'boy' ? 'Bạn Nam' : 'Bạn';
  const name = rawName || defaultName;
  const title = 'Bạn';
  const honorific = rawName ? rawName : 'Bạn';
  const vocative = rawName ? `bạn ${rawName}` : 'bạn';
  const pronoun = 'bạn';
  const roleTitle = gender === 'girl' ? 'Chuyên Gia' : gender === 'boy' ? 'Thuyền Trưởng' : 'Master Leader';
  return { ageCat, name, title, honorific, vocative, pronoun, roleTitle };
}

/**
 * Message configuration for Chest Reward Modal
 */
export function getChestRewardMessages(age?: number, gender: UserGender = 'neutral', userName?: string, levelTitle?: string) {
  const { ageCat, honorific, pronoun } = getPersonaAddressing(age, gender, userName);
  const targetTitle = levelTitle ? `kho báu ${levelTitle}` : 'kho báu đặc biệt';

  if (ageCat === 'kid') {
    return {
      modalHeader: `CHÚC MỪNG ${honorific.toUpperCase()}! 🎉`,
      description: `${honorific} đã mở khóa thành công ${targetTitle}!`,
      collectButton: 'NHẬN THƯỞNG NGAY 🎁'
    };
  }

  if (ageCat === 'teen') {
    return {
      modalHeader: `XUẤT SẮC ${honorific.toUpperCase()}! 🏆`,
      description: `${honorific} đã mở khóa thành công ${targetTitle}!`,
      collectButton: 'NHẬN PHẦN THƯỞNG 💎'
    };
  }

  // Adult
  return {
    modalHeader: `CHÚC MỪNG ${honorific.toUpperCase()}! 🌟`,
    description: `Chúc mừng ${pronoun} đã mở khóa thành công ${targetTitle}!`,
    collectButton: 'NHẬN THƯỞNG & TIẾP TỤC 💎'
  };
}

/**
 * Message configuration for Refill Hearts Modal
 */
export function getRefillHeartsMessages(age?: number, gender: UserGender = 'neutral', userName?: string) {
  const { ageCat, honorific, pronoun } = getPersonaAddressing(age, gender, userName);

  if (ageCat === 'kid') {
    return {
      subtitle: `Trái tim giúp ${vocativeOrPronoun(honorific)} không bị ngắt quãng khi đang bảo vệ trạm không gian!`,
      freeButtonTitle: `Nạp Miễn Phí Cho ${honorific}`,
      freeButtonSubtitle: `${honorific} tiếp tục học vui vẻ nhé!`
    };
  }

  if (ageCat === 'teen') {
    return {
      subtitle: `Năng lượng tim giúp bạn duy trì chuỗi combo và leo rank từ vựng đỉnh cao!`,
      freeButtonTitle: 'Nạp Năng Lượng Miễn Phí',
      freeButtonSubtitle: 'Tiếp tục bứt phá mọi thử thách!'
    };
  }

  // Adult
  return {
    subtitle: `Trái tim giúp bạn duy trì nhịp độ rèn luyện mỗi ngày một cách liền mạch và hiệu quả!`,
    freeButtonTitle: 'Nạp Năng Lượng Miễn Phí',
    freeButtonSubtitle: 'Duy trì phong độ học tập!'
  };
}

function vocativeOrPronoun(honorific: string) {
  return honorific.startsWith('Bé') ? honorific.toLowerCase() : 'bé';
}

/**
 * Message configuration for Victory Modal
 */
export function getVictoryModalMessages(
  age?: number,
  gender: UserGender = 'neutral',
  userName?: string,
  mascotName: string = 'Cosmo'
) {
  const { ageCat, honorific, pronoun } = getPersonaAddressing(age, gender, userName);

  if (ageCat === 'kid') {
    if (gender === 'girl') {
      return `Hoan hô công chúa nhỏ ${userName ? userName : ''}! ${mascotName} tự hào về bé lắm luôn! 🌸🎉`;
    }
    if (gender === 'boy') {
      return `Hoan hô siêu nhí ${userName ? userName : ''}! ${mascotName} tự hào về bé lắm luôn! 🚀🎉`;
    }
    return `Hoan hô ${honorific}! ${mascotName} tự hào về bé lắm luôn! 🌟🎉`;
  }

  if (ageCat === 'teen') {
    if (gender === 'girl') {
      return `Đỉnh chóp bạn ${userName || 'ơi'}! Thần thái và phản xạ từ vựng xuất sắc tuyệt đỉnh! 🌸🏆`;
    }
    if (gender === 'boy') {
      return `Quá ngầu bạn ${userName || 'ơi'}! Tốc độ và độ chuẩn xác như một siêu sao! ⚡🏆`;
    }
    return `Xuất sắc lắm bạn ${userName || 'ơi'}! ${mascotName} bái phục màn thể hiện hoàn hảo của bạn! 🚀✨`;
  }

  // Adult
  if (gender === 'girl') {
    return `Chúc mừng bạn ${userName || ''}! Tốc độ phản xạ và xử lý từ vựng cực kỳ mượt mà! 💖✨`;
  }
  if (gender === 'boy') {
    return `Chúc mừng bạn ${userName || ''}! Phong độ đỉnh cao và khả năng ghi nhớ rất ấn tượng! 🚀🔥`;
  }
  return `Chúc mừng ${pronoun} ${userName || ''}! Level up kỹ năng từ vựng tiếng Anh vô cùng xuất sắc! 🌟🎯`;
}

/**
 * Message configuration for Game Over Modal
 */
export function getGameOverModalMessages(
  age?: number,
  gender: UserGender = 'neutral',
  userName?: string,
  mascotName: string = 'Cosmo'
) {
  const { ageCat, honorific } = getPersonaAddressing(age, gender, userName);

  if (ageCat === 'kid') {
    return {
      mascotComfort: `Không sao cả ${honorific} ơi! ${mascotName} luôn ở đây cùng bé làm lại thật cừ nhé! ❤️🐾`,
      heading: 'KHÔNG SAO CẢ!',
      bodySub: 'chỉ cần tập trung hơn một chút là vượt qua được ngay!'
    };
  }

  if (ageCat === 'teen') {
    return {
      mascotComfort: `Không sao đâu ${userName || 'bạn ơi'}! ${mascotName} tin bạn sẽ bứt phá thần tốc ở ván sau! 💪⚡`,
      heading: 'CỐ GẮNG LÊN NÀO!',
      bodySub: 'rút kinh nghiệm phản xạ nhanh hơn và lấy lại 3 sao nào!'
    };
  }

  // Adult
  return {
    mascotComfort: `Một chút thử thách thôi ${userName || 'bạn nhé'}! ${mascotName} đồng hành cùng bạn làm lại ngay! 💡🚀`,
    heading: 'TIẾP TỤC RÈN LUYỆN!',
    bodySub: 'mỗi lần thử là một lần phản xạ tiếng Anh được khắc sâu hơn!'
  };
}

/**
 * Dynamic content generator for Companion Mascots based on Age, Gender, Mood & Combo
 */
export function getMascotDynamicContent(
  mascotId: MascotId = 'cosmo_dog',
  mood: MascotMood = 'happy',
  age?: number,
  gender: UserGender = 'neutral',
  userName?: string,
  combo: number = 0
): string {
  const ageCat = getAgeCategory(age);
  const { honorific } = getPersonaAddressing(age, gender, userName);
  const nameDisplay = userName?.trim() || (ageCat === 'kid' ? 'bé' : 'bạn');
  const baseCfg = MASCOT_CONFIGS[mascotId] || MASCOT_CONFIGS.cosmo_dog;

  // 1. Combo high streaks
  if (combo > 2) {
    if (ageCat === 'kid') {
      if (mascotId === 'luna_cat') return `Bé ${nameDisplay} bắn chuẩn quá meow! (x${combo}) 🐱🌸`;
      if (mascotId === 'stella_unicorn') return `Phép màu liên hoàn cho bé! (x${combo}) 🦄✨`;
      if (mascotId === 'pixel_robot') return `Tốc độ tính toán siêu đẳng! (x${combo}) 🤖⚡`;
      if (mascotId === 'spark_fox') return `Nhanh như chớp luôn bé ơi! (x${combo}) 🦊🔥`;
      return `Bắn siêu chuẩn luôn bé ơi! (x${combo}) 🚀🐶`;
    }
    if (ageCat === 'teen') {
      if (mascotId === 'pixel_robot') return `Combo chuẩn xác tuyệt đối! (x${combo}) 🤖⚡`;
      if (mascotId === 'spark_fox') return `Chiến thần tốc độ bùng cháy! (x${combo}) 🦊🔥`;
      return `Đỉnh cao phản xạ ${nameDisplay} ơi! (x${combo}) 🚀✨`;
    }
    // Adult
    if (mascotId === 'pixel_robot') return `Hiệu suất phản xạ tối đa! (x${combo}) 🤖🎯`;
    return `Phong độ xuất sắc lắm ${nameDisplay}! (x${combo}) 🚀🔥`;
  }

  // 2. Celebrating mood (Victory)
  if (mood === 'celebrating') {
    return getVictoryModalMessages(age, gender, userName, baseCfg.name);
  }

  // 3. Oopsie mood (Mistake / Game Over)
  if (mood === 'oopsie') {
    return getGameOverModalMessages(age, gender, userName, baseCfg.name).mascotComfort;
  }

  // 4. Idle / Greeting mood
  if (ageCat === 'kid') {
    switch (mascotId) {
      case 'luna_cat':
        return gender === 'girl'
          ? `Meow! Luna chúc công chúa nhỏ ${nameDisplay} học thật ngọt ngào nha! 🌸💖`
          : `Meow! Luna chúc bé ${nameDisplay} một buổi học siêu vui vẻ nè! 🌸🐱`;
      case 'stella_unicorn':
        return gender === 'girl'
          ? `Chào công chúa nhỏ! Cùng Stella tạo nên phép màu từ vựng nhé! 🦄🌈`
          : `Chào bạn nhỏ! Cùng Stella khám phá phép màu vũ trụ nào! 🦄✨`;
      case 'pixel_robot':
        return `Bíp bíp! Đã nạp 100% năng lượng học cùng siêu nhí ${nameDisplay}! 🤖⚡`;
      case 'spark_fox':
        return `Hiya! Nhanh tay tinh mắt cùng Sparky săn sao nào bé ${nameDisplay}! 🔥🦊`;
      case 'cosmo_dog':
      default:
        return `Gâu gâu! Cosmo sẵn sàng bay cùng bé ${nameDisplay} rồi nè! 🚀🐶`;
    }
  }

  if (ageCat === 'teen') {
    switch (mascotId) {
      case 'luna_cat':
        return `Meow! Luna luôn đồng hành cùng bạn ${nameDisplay} trên hành trình từ vựng! 🌙✨`;
      case 'stella_unicorn':
        return `Tỏa sáng rực rỡ và bứt phá điểm số cùng Stella nào ${nameDisplay}! 🌈💫`;
      case 'pixel_robot':
        return `Bíp bíp! Hệ thống đã tối ưu thuật toán tốc độ phản xạ cho ${nameDisplay}! 🤖⚡`;
      case 'spark_fox':
        return `Chiến hết mình và phản xạ thần tốc cùng Sparky nào bạn ${nameDisplay}! 🦊🔥`;
      case 'cosmo_dog':
      default:
        return `Gâu gâu! Cosmo đã sẵn sàng cùng bạn ${nameDisplay} chinh phục mọi thử thách! 🚀🔥`;
    }
  }

  // Adult (>= 18)
  switch (mascotId) {
    case 'luna_cat':
      return `Meow! Luna chúc bạn ${nameDisplay} một buổi luyện tiếng Anh thật hứng khởi & hiệu quả! 🌸✨`;
    case 'stella_unicorn':
      return `Chào bạn ${nameDisplay}! Cùng Stella biến việc học tiếng Anh thành niềm vui mỗi ngày! 🦄🌟`;
    case 'pixel_robot':
      return `Bíp bíp! Dữ liệu đã sẵn sàng. Chúc bạn ${nameDisplay} nâng cấp phản xạ từ vựng đỉnh cao! 🤖📊`;
    case 'spark_fox':
      return `Hiya! Tăng tốc phản xạ và tự tin giao tiếp cùng Sparky nhé bạn ${nameDisplay}! 🦊⚡`;
    case 'cosmo_dog':
    default:
      return `Gâu gâu! Cosmo đồng hành cùng bạn ${nameDisplay} bứt phá trình độ tiếng Anh hôm nay! 🚀🎯`;
  }
}

/**
 * Persona labels for User Profile Selection adapted by age
 */
export function getAgeAdaptivePersonaLabels(age?: number) {
  const ageCat = getAgeCategory(age);
  if (ageCat === 'kid') {
    return {
      girl: 'Bé Gái',
      boy: 'Bé Trai',
      neutral: 'Tự Do',
      girlSub: 'Dễ thương & Luna 🐱',
      boySub: 'Năng động & Cosmo 🐶',
      neutralSub: 'Vũ trụ & Stella 🦄'
    };
  }
  if (ageCat === 'teen') {
    return {
      girl: 'Bạn Nữ',
      boy: 'Bạn Nam',
      neutral: 'Tự Do',
      girlSub: 'Ngọt ngào & Luna 🐱',
      boySub: 'Bứt phá & Cosmo 🐶',
      neutralSub: 'Khám phá & Stella 🦄'
    };
  }
  // Adult
  return {
    girl: 'Nữ Giới',
    boy: 'Nam Giới',
    neutral: 'Tự Do',
    girlSub: 'Thanh lịch & Luna 🐱',
    boySub: 'Năng động & Cosmo 🐶',
    neutralSub: 'Hiện đại & Stella 🦄'
  };
}

/**
 * Suggested names by Age and Gender
 */
export function getAgeAdaptiveSuggestedNames(age?: number, gender: UserGender = 'neutral'): string[] {
  const ageCat = getAgeCategory(age);

  if (ageCat === 'kid') {
    if (gender === 'girl') {
      return ['Bé Bắp', 'Bảo Ngọc', 'Khánh Linh', 'Minh Anh', 'Sarah', 'Emma', 'Tú Uyên', 'Gia Hân', 'Hà My', 'Bé Đậu'];
    }
    if (gender === 'boy') {
      return ['Minh Khang', 'Bảo Nam', 'Alex', 'David', 'Hoàng Bách', 'Gia Huy', 'Minh Trí', 'Huy Vũ', 'Tuấn Kiệt', 'Bé Nhím'];
    }
    return ['Sunny', 'Leo', 'Sky', 'Bé Đậu', 'Susu', 'Lucky', 'Mimi', 'Nhím Con', 'Panda', 'Bi Bi'];
  }

  if (ageCat === 'teen') {
    if (gender === 'girl') {
      return ['Khánh Linh', 'Bảo Ngọc', 'Minh Anh', 'Thu Uyên', 'Thảo My', 'Sarah', 'Chloe', 'Mai Phương', 'Phương Anh'];
    }
    if (gender === 'boy') {
      return ['Minh Khang', 'Bảo Nam', 'Gia Huy', 'Hoàng Bách', 'Đăng Khoa', 'Alex', 'David', 'Tuấn Kiệt', 'Việt Anh'];
    }
    return ['Sunny', 'Alex', 'Sky', 'Zen', 'Morgan', 'Phoenix', 'Nova', 'Leo', 'Shadow', 'Ace'];
  }

  // Adult
  if (gender === 'girl') {
    return ['Thu Trang', 'Thanh Hằng', 'Lan Anh', 'Minh Anh', 'Bảo Ngọc', 'Hương Giang', 'Ngọc Mai', 'Sarah', 'Emma'];
  }
  if (gender === 'boy') {
    return ['Huy Vũ', 'Minh Tuấn', 'Hoàng Nam', 'Gia Huy', 'Tuấn Kiệt', 'Đức Thắng', 'Minh Trí', 'Alex', 'David'];
  }
  return ['Huy Vũ', 'Alex', 'David', 'Minh Tuấn', 'Thu Trang', 'Chris', 'Jordan', 'Taylor', 'Sam', 'Sky'];
}
