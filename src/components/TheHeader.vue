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
  data() {
    return {
      drawerOpen: false,
    };
  },
  methods: {
    ...mapGetters(['isUserLoggedIn']),

    logout() {
      this.$store.dispatch('logout', {
        router: this.$router,
        route: this.$route,
      });

      if (this.$route.meta.requiresAuth) {
        this.$router.go({ name: 'home' });
      }
    },

    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },

    getLanguage() {
      return this.$i18n.locale === 'pt-BR' ? 'Português' : 'English';
    },
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
        <button type="button" @click.prevent="toggleDrawer()">
          <i class="fa-solid fa-bars"></i>
        </button>
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
        <SearchBar :idKey="'desktop'"/>
      </div>
      <div
      class="col-span-1 w-full text-white font-semibold text-xl flex items-center justify-center">
      <router-link to="/watchlist">
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
          <button type="button" @click.prevent="logout">
            Logout
          </button>
        </template>
      </div>
    </nav>
  </header>
  <transition name="slide">
    <div
    v-if="drawerOpen"
    class="fixed z-50 top-12 flex w-full h-screen backdrop-blur-sm md:hidden">
      <div class="flex flex-col w-4/5 bg-primaryColorShadow">
        <div class="flex justify-center w-2/3 bg-blue-400
        text-white p-2 text-xl mx-auto">
          <SearchBar :idKey="'mobile'"/>
        </div>
        <div class="flex bg-blue-400 text-white p-2 text-xl">
          <template v-if="!isUserLoggedIn()">
            <router-link to="/login" @click.prevent="toggleDrawer()">
              <i class="fa-solid fa-right-to-bracket mr-3"></i> Login
            </router-link>
        </template>
        <template v-else>
          <button type="button" @click.prevent="logout">
            <i class="fa-solid fa-door-open mr-3"></i> Logout
          </button>
        </template>
        </div>
        <div class="flex bg-blue-400 text-white p-2 text-xl">
          <router-link to="/watchlist" @click.prevent="toggleDrawer()">
            <i class="fa-solid fa-bookmark mr-3"></i> Watchlist
          </router-link>
        </div>
        <div class="flex bg-blue-400 text-white p-2 text-xl">
          <theme-toggler @click.prevent="toggleDrawer()"/>
          <span class="ml-3 capitalize">{{ this.$store.getters.getTheme }}</span>
        </div>
        <div class="flex bg-blue-400 text-white p-2 text-xl">
          <locale-toggler/>
          <span class="ml-3 capitalize">{{ getLanguage() }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .slide-enter-active {
    @apply backdrop-blur-none;
    transition: all 0.3s ease-out;
  }
  .slide-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-enter-from,
  .slide-leave-to {
    @apply -translate-x-3/4;
  }
</style>
