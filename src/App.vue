<script>

import TheHeader from '@/components/TheHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    TheHeader,
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

    console.log('THEME: ', window.localStorage.key('colorTheme'));
    console.log('LANG: ', window.localStorage.key('language'));

    if (window.localStorage.key('colorTheme') === null) {
      this.toggleTheme();
      this.changeLanguage('en');
    }

    this.activateTheme();
    this.$i18n.locale = this.getLanguage;

    console.log('Is Logged? ', this.isUserLoggedIn);
    await this.$store.dispatch('init_login');
  },
};
</script>

<template>
  <div class="block mb-12"></div>
  <TheHeader/>
  <router-view :key="$route.fullPath"/>
</template>
