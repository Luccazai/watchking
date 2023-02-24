import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
    meta: {
      alreadyLogged: true,
    },
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

router.beforeEach((to, from, next) => {
  // if route doesnt require auth, then let it proceed
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isUserLoggedIn) {
      next({ name: 'login' });
      return;
    }
  }

  // if requires auth, then it checks is user is logged

  if (to.matched.some((record) => record.meta.alreadyLogged)) {
    if (store.getters.isUserLoggedIn) {
      next({ name: 'home' });
      return;
    }
  }

  next();
});

export default router;
