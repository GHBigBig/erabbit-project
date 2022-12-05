import { createRouter, createWebHistory } from 'vue-router';

const Layout = () => import('@/views/ERabbitLayout.vue');
const Home = () => import('@/views/home/ERabbitHomeIndex.vue');
const Cateogry = () => import('@/views/category/ERabbitCategory.vue');
const SubCategory = () => import('@/views/category/ERabbitSubCategory.vue');

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: Cateogry },
      { path: '/category/sub/:id', component: SubCategory },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' };
  },
});

export default router;
