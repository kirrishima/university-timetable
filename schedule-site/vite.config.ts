import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import packageJson from './package.json';
import react from '@vitejs/plugin-react'; 
import { VitePWA } from 'vite-plugin-pwa'; 
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const appVersion = packageJson.version;
    return {
      base: '/',
      plugins: [
        react(),
        tailwindcss(),
        VitePWA({
          registerType: 'autoUpdate',
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif}'],
          },
          manifest: {
            name: 'Расписание Университета',
            short_name: 'Расписание',
            description: 'Веб-приложение для просмотра расписания университета.',
            theme_color: '#4f46e5',
            background_color: '#f8fafc',
            display: 'standalone',
            start_url: '/',
            icons: [
              {
                src: 'https://cdn-icons-png.flaticon.com/512/32/32223.png',
                sizes: '512x512',
                type: 'image/png'
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        '__APP_VERSION__': JSON.stringify(appVersion)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});