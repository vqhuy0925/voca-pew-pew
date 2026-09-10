// Service Worker Registration for Vocab Pew Pew (PWA)

export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // Registration successful
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) return;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('[PWA] Nội dung mới đã sẵn sàng. Sẽ cập nhật khi tải lại.');
              } else {
                console.log('[PWA] Nội dung đã được lưu cache để dùng offline!');
              }
            }
          };
        };
      })
      .catch((error) => {
        console.warn('[PWA] Đăng ký Service Worker thất bại:', error);
      });
  });
}

export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
