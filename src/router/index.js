import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const AppHome = () => import(/* webpackChunkName: "home" */'@/views/AppHome.vue');
const AppLogin = () => import('@/views/AppLogin.vue');
const ShowView = () => import(/* webpackChunkName: "search" */'@/views/ShowView.vue');
const UserWatchlist = () => import('@/views/UserWatchlist.vue');
const AppShowSearch = () => import(/* webpackChunkName: "search" */'@/views/AppShowSearch.vue');
const AppGenreSearch = () => import(/* webpackChunkName: "home" */'@/views/AppGenreSearch.vue');
const PageNotFound = () => import('@/views/PageNotFound.vue');

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
    component: AppShowSearch,
  },
  {
    path: '/genre/:genre',
    name: 'genre',
    component: AppGenreSearch,
  },
  {
    path: '/:catchAll(.*)*',
    component: PageNotFound,
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
