import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

//处理CSS，SASS，LESS和Stylus的全局样式。文件名需以 global 开头
import globalStyle from '@originjs/vite-plugin-global-style';
//使用外部库，类似webpack的externals，但现在只支持浏览器环境。
//请使用该插件前，需要把代码转换成js，因为此插件只能解析js代码，
import { viteExternalsPlugin } from 'vite-plugin-externals'; //就是将 import 变为变量

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // @vitejs/plugin-vue 将会把SFC的代码转换成js代码
    vueJsx(),
    globalStyle(),
    viteExternalsPlugin({
      qc: 'QC',
    }), // 所以这插件要放在@vitejs/plugin-vue的下面
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 10,
  },
  server: {
    port: 8080,
    proxy: {
      '/#/login/callback': {
        target: '/login/callback',
      },
    },
  },
});
