// Service Worker Registration for Vocab Pew Pew (Workbox via vite-plugin-pwa)
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const runRegistration = () => {
    try {
      const updateSW = registerSW({
        immediate: false,
        onNeedRefresh() {
          console.log('[PWA] Nội dung mới đã sẵn sàng! Sẽ cập nhật ở phiên tiếp theo.');
        },
        onOfflineReady() {
          console.log('[PWA] Toàn bộ dữ liệu đã được lưu cache bởi Workbox để chơi offline!');
        },
        onRegisterError(error: unknown) {
          console.warn('[PWA] Đăng ký Service Worker thất bại:', error);
        }
      });
    } catch (err) {
      console.warn('[PWA] Không thể khởi tạo registerSW:', err);
    }
  };

  if (document.readyState === 'complete') {
    runRegistration();
  } else {
    window.addEventListener('load', runRegistration, { once: true });
  }
}

export function unregisterServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
}

