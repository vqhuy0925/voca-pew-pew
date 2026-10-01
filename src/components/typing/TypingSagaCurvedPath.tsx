import React from 'react';

interface TypingSagaCurvedPathProps {
  /** Mảng các offset X (theo pixel, tính từ tâm x = 0) của từng node trong trạm */
  offsets: number[];
  /** Khoảng cách Y giữa tâm 2 node liên tiếp (mặc định 104px) */
  nodeSpacingY?: number;
  /** Chỉ số node cao nhất đã hoàn thành trong trạm (-1 nếu chưa có) */
  completedUpToIndex: number;
  /** Chỉ số node hiện tại đang luyện tập trong trạm */
  currentIndexInUnit: number;
  /** Nền sáng hay tối */
  isLight: boolean;
  /** Chiều rộng SVG container (mặc định 360px) */
  width?: number;
}

/**
 * TypingSagaCurvedPath — Vẽ dải năng lượng uốn lượn Bézier mượt mà kết nối các node bài học.
 * Thay thế cho cọc thẳng đứng đơn điệu, tạo cảm giác phiêu lưu và tiến trình chân thực theo chuẩn Huashu Design.
 */
export const TypingSagaCurvedPath: React.FC<TypingSagaCurvedPathProps> = ({
  offsets,
  nodeSpacingY = 104,
  completedUpToIndex,
  currentIndexInUnit,
  isLight,
  width = 360
}) => {
  if (offsets.length < 2) return null;

  const centerX = width / 2;
  const startY = 40; // Điểm bắt đầu tại tâm của node đầu tiên
  const totalHeight = startY + (offsets.length - 1) * nodeSpacingY + 40;

  // Tính toạ độ tâm từng node
  const points = offsets.map((offX, i) => ({
    x: centerX + offX,
    y: startY + i * nodeSpacingY
  }));

  // Xây dựng chuỗi path Bézier mượt mà qua tất cả các điểm
  let fullPathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const midY = (p1.y + p2.y) / 2;
    // Điểm kiểm soát cubic Bézier giúp đường vào/ra thẳng đứng êm dịu
    fullPathD += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
  }

  // Xây dựng path riêng cho đoạn đã mở khoá / hoàn thành
  const activeCount = Math.max(0, Math.max(completedUpToIndex + 1, currentIndexInUnit + 1));
  let unlockedPathD = '';
  if (activeCount > 1) {
    const limit = Math.min(activeCount, points.length);
    unlockedPathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < limit - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midY = (p1.y + p2.y) / 2;
      unlockedPathD += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
  }

  return (
    <svg
      className="absolute top-0 pointer-events-none z-0"
      width={width}
      height={totalHeight}
      style={{ left: `calc(50% - ${width / 2}px)` }}
      aria-hidden="true"
    >
      <defs>
        {/* Glow filter cho tia năng lượng Cyber */}
        <filter id="sagaEnergyGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradient màu cho dải đường mở khoá */}
        <linearGradient id="sagaUnlockedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isLight ? '#38bdf8' : '#00f0ff'} />
          <stop offset="50%" stopColor={isLight ? '#10b981' : '#39ff14'} />
          <stop offset="100%" stopColor={isLight ? '#6366f1' : '#c084fc'} />
        </linearGradient>
      </defs>

      {/* 1. Lòng đường nền chính (Road Bed) */}
      <path
        d={fullPathD}
        fill="none"
        stroke={isLight ? '#cbd5e1' : '#1e293b'}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-70"
      />

      {/* 2. Đường kẻ sọc tim đường (Center Guide) */}
      <path
        d={fullPathD}
        fill="none"
        stroke={isLight ? '#94a3b8' : '#334155'}
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
        className="opacity-60"
      />

      {/* 3. Dải năng lượng phát sáng nối các màn đã mở khoá */}
      {unlockedPathD && (
        <>
          {/* Lớp nền phát sáng (Outer Glow) */}
          <path
            d={unlockedPathD}
            fill="none"
            stroke={isLight ? 'rgba(56, 189, 248, 0.4)' : 'rgba(0, 240, 255, 0.35)'}
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#sagaEnergyGlow)"
          />

          {/* Dải sáng neon chạy luồng năng lượng */}
          <path
            d={unlockedPathD}
            fill="none"
            stroke="url(#sagaUnlockedGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            className="animate-energy-flow"
            strokeDasharray="12 8"
          />
        </>
      )}

      {/* 4. Các điểm nút năng lượng nhỏ (Energy Waypoints) */}
      {points.map((p, idx) => {
        const isDone = idx <= completedUpToIndex;
        const isCur = idx === currentIndexInUnit;

        return (
          <g key={`waypoint-${idx}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={isCur ? '28' : '22'}
              fill={
                isCur
                  ? (isLight ? 'rgba(56, 189, 248, 0.25)' : 'rgba(0, 240, 255, 0.2)')
                  : isDone
                  ? (isLight ? 'rgba(16, 185, 129, 0.15)' : 'rgba(57, 255, 20, 0.12)')
                  : (isLight ? 'rgba(226, 232, 240, 0.5)' : 'rgba(30, 41, 59, 0.4)')
              }
            />
          </g>
        );
      })}
    </svg>
  );
};
