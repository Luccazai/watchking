<script>

import { mapGetters } from 'vuex';
import TheHeaderSearchBar from './TheHeaderSearchBar.vue';
import TheHeaderToggleTheme from './TheHeaderToggleTheme.vue';
import TheHeaderLocaleToggler from './TheHeaderLocaleToggler.vue';

export default {
  name: 'TheHeaderMobile',
  components: {
    SearchBar: TheHeaderSearchBar,
    ThemeToggler: TheHeaderToggleTheme,
    LocaleToggler: TheHeaderLocaleToggler,
  },
  methods: {
    ...mapGetters(['isUserLoggedIn']),
  },
};
</script>

<template>
  <header
  class="flex items-center bg-primaryColor fixed top-0 w-full h-12 z-30">
    <nav
    class="md:hidden grid grid-cols-2 grid-rows-1 w-full">
      <div
      class="col-span-1 w-full text-white font-bold text-2xl flex justify-center">
        <router-link to="/">
          WatchKing
        </router-link>
      </div>
      <div
      class="col-span-1 text-white font-bold text-2xl flex justify-center items-center">
        <i class="fa-solid fa-bars"></i>
      </div>
    </nav>

    <!-- Nav for desktop -->

    <nav
    class="hidden md:grid grid-cols-8 gap-5 grid-rows-1 w-full">
      <div
      class="col-span-2 w-full text-white font-bold text-4xl flex justify-left ml-5">
        <router-link to="/">
          WatchKing
        </router-link>
      </div>
      <div
      class="col-span-2 w-full text-white font-semibold text-sm flex items-center">
        <SearchBar/>
      </div>
      <div
      class="col-span-1 w-full text-white font-semibold text-xl flex items-center justify-center">
      <router-link to="watchlist">
        Watchlist
      </router-link>
      </div>
      <div
      class="col-span-1 w-full text-white font-semibold text-xl flex items-center justify-around">
        <theme-toggler/>
        <locale-toggler/>
      </div>
      <div
      class="col-span-2 w-full text-white font-semibold text-xl flex items-center justify-center">
        <template v-if="!isUserLoggedIn()">
          <router-link to="/login">
            Login
          </router-link>
        </template>
        <template v-else>
          <button type="button">
            Logout
          </button>
        </template>
      </div>
    </nav>
  </header>
</template>
