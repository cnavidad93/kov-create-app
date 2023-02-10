import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@UI': path.resolve(__dirname, './src/components/UI/'),
      '@store': path.resolve(__dirname, './src/store/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@utils': path.resolve(__dirname, './src/helpers/'),
      '@components': path.resolve(__dirname, './src/components/'),
    },
  },
  server: {
    port: 8080,
  },
  plugins: [react(), svgr()],
});
