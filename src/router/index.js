import { createRouter, createWebHistory } from 'vue-router';
import Category from '@/views/category/ERabbitCategory.vue';
import CategorySub from '@/views/category/ERabbitCategorySub.vue';

const Layout = () => import('@/views/ERabbitLayout.vue');
const Home = () => import('@/views/home/ERabbitHomeIndex.vue');

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: Category },
      { path: '/category/sub/:id', component: CategorySub },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
