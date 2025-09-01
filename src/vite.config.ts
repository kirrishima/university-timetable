import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import packageJson from './package.json';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const appVersion = packageJson.version;
    return {
      base: '/university-timetable/',
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