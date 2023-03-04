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

      this.$router.push('/');
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
  class="flex items-center bg-primaryColor fixed top-0 w-screen h-12 z-30">
    <nav
    class="lg:hidden grid grid-cols-2 grid-rows-1 w-full">
      <div
      class="col-span-1 w-full text-white font-bold text-2xl flex justify-start ml-4">
        <router-link to="/">
          WatchKing
        </router-link>
      </div>
      <div
      class="col-span-1 text-white font-bold text-2xl flex justify-end items-center mr-4">
        <button type="button" @click.prevent="toggleDrawer()">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>

    <!-- Nav for desktop -->

    <nav
    class="hidden lg:grid grid-cols-8 gap-5 grid-rows-1 w-full">
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
        <template v-if="isUserLoggedIn()">
          <router-link to="/watchlist">
            {{ $t('header.watchlist') }}
          </router-link>
        </template>
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
            {{ $t('header.login') }}
          </router-link>
        </template>
        <template v-else>
          <button type="button" @click.prevent="logout">
            {{ $t('header.logout') }}
          </button>
        </template>
      </div>
    </nav>
  </header>

  <!-- Mobile Drawer -->

  <transition name="slide">
    <div
    v-if="drawerOpen"
    class="fixed z-50 top-12 flex w-full h-screen
    backdrop-blur-sm lg:hidden">
      <div class="flex flex-col w-4/5 bg-primaryColorShadow text-2xl">
        <div class="flex justify-center w-4/5 my-2
        text-white p-2 text-xl mx-auto">
          <SearchBar @toggleDrawer="toggleDrawer" :idKey="'mobile'"/>
        </div>
        <template v-if="!isUserLoggedIn()">
          <div class="flex my-2 text-white p-2 text-2xl ml-4">
            <router-link to="/login" @click.prevent="toggleDrawer()">
              <i class="fa-solid fa-right-to-bracket mr-3"></i> {{ $t('header.login') }}
            </router-link>
          </div>
        </template>
        <template v-if="isUserLoggedIn()">
          <div class="flex my-2 text-white p-2 text-2xl ml-4">
            <router-link to="/watchlist" @click.prevent="toggleDrawer()">
              <i class="fa-solid fa-bookmark mr-3"></i>{{ $t('header.watchlist') }}
            </router-link>
          </div>
        </template>
        <div class="flex my-2 text-white p-2 text-2xl ml-4">
          <theme-toggler
          class="w-3/4 absolute"
          @click.prevent="toggleDrawer()"/>
          <span class="ml-8 capitalize">{{ $t(`theme.${this.$store.getters.getTheme}`) }}</span>
        </div>
        <div class="flex my-2 text-white p-2 text-2xl ml-4">
          <locale-toggler class="w-3/4 absolute"/>
          <span class="ml-8 capitalize">{{ getLanguage() }}</span>
        </div>
        <div class="flex my-2 text-white p-2 text-2xl ml-4">
          <template v-if="isUserLoggedIn()">
            <button type="button" @click.prevent="logout">
              <i class="fa-solid fa-door-open mr-3"></i> {{ $t('header.logout') }}
            </button>
          </template>
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
