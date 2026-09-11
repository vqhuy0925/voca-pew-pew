import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'icon-192.png',
        'icon-512.png',
        'icon-maskable.png'
      ],
      manifest: {
        id: '/',
        name: 'Vocab Pew Pew - Game Luyện Gõ Tiếng Anh',
        short_name: 'Vocab Pew Pew',
        description: 'Game bắn tàu vũ trụ luyện gõ từ vựng tiếng Anh vui nhộn dành cho phi hành gia nhí',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'any',
        background_color: '#030712',
        theme_color: '#06b6d4',
        categories: ['games', 'education'],
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          },
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Chơi ngay',
            short_name: 'Chơi',
            description: 'Bắt đầu bài học vũ trụ tiếp theo',
            url: '/',
            icons: [{ src: '/icon-192.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/__/],
        runtimeCaching: [
          {
            // Google Fonts stylesheets (CSS)
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Google Fonts webfont files (woff2)
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Never cache Firebase & Google Auth API calls
            urlPattern: /^https:\/\/(?:.*\.firebaseio\.com|.*\.googleapis\.com|identitytoolkit\.googleapis\.com)/i,
            handler: 'NetworkOnly'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true,
  },
});

