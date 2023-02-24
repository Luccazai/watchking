<script>
import { mapActions } from 'vuex';

export default {
  name: 'TheHeaderToggleTheme',
  data() {
    return {
      isDark: document.documentElement.classList.contains('dark'),
    };
  },
  methods: {
    ...mapActions(['toggleTheme']),
    toggleThemeHeader() {
      this.toggleTheme();
      this.getTheme();
    },

    getTheme() {
      this.isDark = document.documentElement.classList.contains('dark');
    },
  },
  beforeMount() {
    this.getTheme();
  },
};
</script>

<template>
  <div @click.prevent="toggleThemeHeader">
    <i class="fa-solid fa-lightbulb"
    :class="{
      'fa-moon': isDark,
    }"></i>
    <!-- fa-moon and fa-lightbulb -->
  </div>
</template>
