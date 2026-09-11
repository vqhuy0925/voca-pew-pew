// Service Worker Registration for Vocab Pew Pew (Workbox via vite-plugin-pwa)
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('[PWA] Nội dung mới đã sẵn sàng! Ứng dụng sẽ tự động cập nhật.');
      updateSW(true);
    },
    onOfflineReady() {
      console.log('[PWA] Nội dung đã được lưu cache bởi Workbox để chơi offline!');
    },
    onRegisterError(error) {
      console.warn('[PWA] Đăng ký Service Worker thất bại:', error);
    }
  });
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

