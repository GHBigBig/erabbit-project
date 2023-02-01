import { createRouter, createWebHashHistory } from 'vue-router';

const Layout = () => import('@/views/ERabbitLayout.vue');
const Home = () => import('@/views/home/ERabbitHomeIndex.vue');
const Cateogry = () => import('@/views/category/ERabbitCategory.vue');
const SubCategory = () => import('@/views/category/ERabbitSubCategory.vue');
const Product = () => import('@/views/goods/ERabbitGoodsIndex.vue');
const Login = () => import('@/views/login/ERabbitLoginIndex.vue');

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: Cateogry },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Product },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/login/callback',
    name: 'loginCallback',
    component: () => import('@/views/login/ERabbitLoginCallback.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/ERabbitCartIndex.vue'),
  },
  {
    path: '/member/checkout',
    name: 'checkout',
    component: () => import('@/views/member/pay/ERabbitCheckout.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' };
  },
});

export default router;
