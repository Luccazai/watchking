<script>
export default {
  name: 'TheHeaderLocaleToggler',
  data() {
    return {
      langs: ['en', 'pt-BR'],
    };
  },
  methods: {
    toggleLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'pt-BR' ? 'en' : 'pt-BR';
      localStorage.setItem('language', this.$i18n.locale);
    },
  },
};
</script>

<template>
  <div class="text-black flex">
    <div class="h-6 w-6 block relative bg-cover"
    :class="$i18n.locale"
    @click.prevent="toggleLanguage"></div>
  </div>
</template>

<style>
  .pt-BR {
    background-image: url(@/assets/flags/pt-BR.png);
  }

  .en {
    background-image: url(@/assets/flags/en.png);
  }

</style>
