import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

//处理CSS，SASS，LESS和Stylus的全局样式。文件名需以 global 开头
import globalStyle from '@originjs/vite-plugin-global-style';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), globalStyle()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
