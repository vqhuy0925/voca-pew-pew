/**
 * View Transitions API Native Utility
 * Tuân thủ Web Baseline Standard (Newly Available):
 * Cho phép chuyển cảnh mượt mà giữa các chế độ học tập (Saga Map <-> Typing Dojo <-> Admin)
 * mà không cần cài đặt bất kỳ thư viện animation ngoài nào (Framer Motion, GSAP, etc.)
 */

export function executeViewTransition(updateFn: () => void | Promise<void>): void {
  // Kiểm tra hỗ trợ trình duyệt và cài đặt giảm chuyển động của người dùng
  if (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    (document as any).startViewTransition(async () => {
      await updateFn();
    });
  } else {
    // Fallback tức thì cho trình duyệt chưa hỗ trợ hoặc người dùng bật reduced motion
    updateFn();
  }
}
