import { createRouter, createWebHistory } from 'vue-router';

const Layout = () => import('@/views/ERabbitLayout.vue');
const Home = () => import('@/views/home/ERabbitIndex.vue');

const routes = [
  {
    path: '/',
    component: Layout,
    children: [{ path: '/', component: Home }],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
