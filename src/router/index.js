import { createRouter, createWebHistory } from 'vue-router';
// import store from '@/store';

import AppHome from '@/views/AppHome.vue';
import AppLogin from '@/views/AppLogin.vue';

import ShowView from '@/views/ShowView.vue';
import UserWatchlist from '@/views/UserWatchlist.vue';

import SearchView from '@/views/SearchView.vue';
import SearchGenre from '@/views/SearchGenre.vue';

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
  {
    path: '/search/:title',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/genre/:genre',
    name: 'genre',
    component: SearchGenre,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active-view',
});

export default router;
