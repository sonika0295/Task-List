import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://13.55.161.110/backend/public',
        changeOrigin: true,
      }
    }
  }, 
  hmr: {
    overlay: false, 
  },
});
