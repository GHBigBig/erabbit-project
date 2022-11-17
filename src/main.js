import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import store from './store';

import 'normalize.css';
import '@/assets/styles/common.less';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
