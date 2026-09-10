import { useState, useEffect, useCallback } from 'react';

// Interface for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PWAInstallState {
  isInstallable: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
  hasNativePrompt: boolean;
  promptInstall: () => Promise<boolean>;
}

export function usePWAInstall(): PWAInstallState {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as { standalone?: boolean }).standalone === true;
    return Boolean(isStandaloneMode || isIOSStandalone);
  });

  // Detect Platform
  const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (typeof navigator !== 'undefined' &&
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);
  const isDesktop = !isIOS && !isAndroid;

  useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as { standalone?: boolean }).standalone === true;
      setIsStandalone(standalone);
    };

    const displayModeQuery = window.matchMedia('(display-mode: standalone)');
    displayModeQuery.addEventListener('change', checkStandalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      console.log('[PWA] Ứng dụng đã được cài đặt thành công!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      displayModeQuery.removeEventListener('change', checkStandalone);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] Người dùng đã đồng ý cài đặt');
        setDeferredPrompt(null);
        return true;
      } else {
        console.log('[PWA] Người dùng đã từ chối cài đặt');
        return false;
      }
    } catch (err) {
      console.warn('[PWA] Lỗi hiển thị prompt cài đặt:', err);
      return false;
    }
  }, [deferredPrompt]);

  return {
    isInstallable: !isStandalone,
    isStandalone,
    isIOS,
    isAndroid,
    isDesktop,
    hasNativePrompt: Boolean(deferredPrompt),
    promptInstall
  };
}
