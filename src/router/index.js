import { createRouter, createWebHistory } from 'vue-router';
// import store from '@/store';

import AppHome from '@/views/AppHome.vue';
import AppLogin from '@/views/AppLogin.vue';

import ShowView from '@/views/ShowView.vue';
import UserWatchlist from '@/views/UserWatchlist.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppHome,
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: UserWatchlist,
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
  },
  {
    path: '/show/:id',
    name: 'show',
    component: ShowView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active-view',
});

export default router;
