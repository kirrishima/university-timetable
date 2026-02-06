import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

const BASE = '/university-timetable/timetable/'

export default defineConfig({
  base: BASE,

  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      manifest: {
        name: 'Расписание Университета',
        short_name: 'Расписание',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        theme_color: '#4f46e5',
        background_color: '#f8fafc',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/32/32223.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}']
      }
    })
  ],

  resolve: {
    alias: { '@': path.resolve(__dirname, '.') }
  }
})
