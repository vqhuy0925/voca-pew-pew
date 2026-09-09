export type HandSide = 'left' | 'right' | 'space';
export type FingerType = 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';

export interface FingerInfo {
  char: string;
  hand: HandSide;
  finger: FingerType;
  handLabelVi: string;      // "Tay Trái" | "Tay Phải" | "Hai Tay"
  fingerLabelVi: string;    // "Ngón Út" | "Ngón Áp Út" | "Ngón Giữa" | "Ngón Trỏ" | "Ngón Cái"
  shortFingerVi: string;    // "Út" | "Áp Út" | "Giữa" | "Trỏ" | "Cái"
  homeKeyBadge?: string;    // "Home: F (gờ nổi)" | "Home: J (gờ nổi)"
  colorName: 'rose' | 'amber' | 'yellow' | 'emerald' | 'cyan';
  bgClass: string;
  borderClass: string;
  textClass: string;
  dotColorHex: string;
}

const FINGER_MAP: Record<string, { hand: HandSide; finger: FingerType; colorName: FingerInfo['colorName']; homeKeyBadge?: string }> = {
  // --- TAY TRÁI (LEFT HAND) ---
  // Ngón Út Trái (Pinky - Rose / Đỏ hồng) - Home: A
  q: { hand: 'left', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím A' },
  a: { hand: 'left', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Phím tổ ấm (Home A)' },
  z: { hand: 'left', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím A' },
  '1': { hand: 'left', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím A' },
  '!': { hand: 'left', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím A' },
  '`': { hand: 'left', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím A' },
  '~': { hand: 'left', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím A' },

  // Ngón Áp Út Trái (Ring - Amber / Cam) - Home: S
  w: { hand: 'left', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím S' },
  s: { hand: 'left', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Phím tổ ấm (Home S)' },
  x: { hand: 'left', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím S' },
  '2': { hand: 'left', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím S' },
  '@': { hand: 'left', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím S' },

  // Ngón Giữa Trái (Middle - Yellow / Vàng) - Home: D
  e: { hand: 'left', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím D' },
  d: { hand: 'left', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Phím tổ ấm (Home D)' },
  c: { hand: 'left', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím D' },
  '3': { hand: 'left', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím D' },
  '#': { hand: 'left', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím D' },

  // Ngón Trỏ Trái (Index - Emerald / Xanh lá) - Home: F (CÓ GỜ NỔI)
  r: { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },
  f: { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: '⭐ Phím gờ nổi F' },
  v: { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },
  t: { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },
  g: { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },
  b: { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },
  '4': { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },
  '5': { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },
  '$': { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },
  '%': { hand: 'left', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím F (gờ nổi)' },

  // --- TAY PHẢI (RIGHT HAND) ---
  // Ngón Trỏ Phải (Index - Emerald / Xanh lá) - Home: J (CÓ GỜ NỔI)
  y: { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },
  u: { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },
  h: { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },
  j: { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: '⭐ Phím gờ nổi J' },
  n: { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },
  m: { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },
  '6': { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },
  '7': { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },
  '^': { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },
  '&': { hand: 'right', finger: 'index', colorName: 'emerald', homeKeyBadge: 'Về phím J (gờ nổi)' },

  // Ngón Giữa Phải (Middle - Yellow / Vàng) - Home: K
  i: { hand: 'right', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím K' },
  k: { hand: 'right', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Phím tổ ấm (Home K)' },
  ',': { hand: 'right', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím K' },
  '<': { hand: 'right', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím K' },
  '8': { hand: 'right', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím K' },
  '*': { hand: 'right', finger: 'middle', colorName: 'yellow', homeKeyBadge: 'Về phím K' },

  // Ngón Áp Út Phải (Ring - Amber / Cam) - Home: L
  o: { hand: 'right', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím L' },
  l: { hand: 'right', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Phím tổ ấm (Home L)' },
  '.': { hand: 'right', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím L' },
  '>': { hand: 'right', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím L' },
  '9': { hand: 'right', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím L' },
  '(': { hand: 'right', finger: 'ring', colorName: 'amber', homeKeyBadge: 'Về phím L' },

  // Ngón Út Phải (Pinky - Rose / Đỏ hồng) - Home: ; hoặc P
  p: { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '0': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  ')': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '-': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '_': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '=': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '+': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '[': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  ']': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '{': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '}': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  ';': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Phím tổ ấm (Home ;)' },
  ':': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  "'": { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '"': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '/': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '?': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '\\': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },
  '|': { hand: 'right', finger: 'pinky', colorName: 'rose', homeKeyBadge: 'Về phím ;' },

  // --- NGÓN CÁI (THUMBS) ---
  ' ': { hand: 'space', finger: 'thumb', colorName: 'cyan', homeKeyBadge: 'Phím Cách (Space)' }
};

const COLOR_STYLES: Record<FingerInfo['colorName'], { bg: string; border: string; text: string; hex: string }> = {
  rose: {
    bg: 'bg-rose-500/20',
    border: 'border-rose-400/60',
    text: 'text-rose-300',
    hex: '#fb7185'
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-400/60',
    text: 'text-amber-300',
    hex: '#fbbf24'
  },
  yellow: {
    bg: 'bg-yellow-400/20',
    border: 'border-yellow-300/60',
    text: 'text-yellow-300',
    hex: '#fde047'
  },
  emerald: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-400/60',
    text: 'text-emerald-300',
    hex: '#34d399'
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-400/60',
    text: 'text-cyan-300',
    hex: '#22d3ee'
  }
};

const FINGER_LABELS: Record<FingerType, { label: string; short: string }> = {
  pinky: { label: 'Ngón Út', short: 'Út' },
  ring: { label: 'Ngón Áp Út', short: 'Áp Út' },
  middle: { label: 'Ngón Giữa', short: 'Giữa' },
  index: { label: 'Ngón Trỏ', short: 'Trỏ' },
  thumb: { label: 'Ngón Cái', short: 'Cái' }
};

export const getFingerInfo = (char?: string): FingerInfo | null => {
  if (!char) return null;
  const lower = char.toLowerCase();
  const found = FINGER_MAP[lower];

  if (!found) {
    return {
      char,
      hand: 'right',
      finger: 'index',
      handLabelVi: 'Tay Phải',
      fingerLabelVi: 'Ngón Trỏ',
      shortFingerVi: 'Trỏ',
      homeKeyBadge: 'Về phím J',
      colorName: 'emerald',
      bgClass: COLOR_STYLES.emerald.bg,
      borderClass: COLOR_STYLES.emerald.border,
      textClass: COLOR_STYLES.emerald.text,
      dotColorHex: COLOR_STYLES.emerald.hex
    };
  }

  const colorStyle = COLOR_STYLES[found.colorName];
  const fingerLabels = FINGER_LABELS[found.finger];

  let handLabel = 'Tay Trái';
  if (found.hand === 'right') handLabel = 'Tay Phải';
  if (found.hand === 'space') handLabel = 'Ngón Cái';

  return {
    char,
    hand: found.hand,
    finger: found.finger,
    handLabelVi: handLabel,
    fingerLabelVi: fingerLabels.label,
    shortFingerVi: fingerLabels.short,
    homeKeyBadge: found.homeKeyBadge,
    colorName: found.colorName,
    bgClass: colorStyle.bg,
    borderClass: colorStyle.border,
    textClass: colorStyle.text,
    dotColorHex: colorStyle.hex
  };
};
