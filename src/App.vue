<script>

import { mapActions, mapGetters } from 'vuex';
import TheHeader from '@/components/TheHeader.vue';
import AppLoadWheel from './components/AppLoadWheel.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    LoadingWheel: AppLoadWheel,
  },
  computed: {
    ...mapGetters(['getLanguage', 'isUserLoggedIn']),
  },
  methods: {
    ...mapActions(['activateTheme', 'loadLanguage',
      'toggleTheme', 'changeLanguage']),
  },
  async beforeMount() {
    // If theme isn't set on Local Storage

    if (localStorage.key('colorTheme') === null) {
      this.toggleTheme();
      this.changeLanguage('en');
    }

    this.activateTheme();
    this.$i18n.locale = this.getLanguage;
    await this.$store.dispatch('init_login');
  },
};
</script>

<template>
  <div class="block mb-12"></div>
  <TheHeader/>
  <router-view :key="$route.fullPath"/>
  <loading-wheel/>
</template>
