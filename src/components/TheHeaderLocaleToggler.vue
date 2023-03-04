<script>
export default {
  name: 'TheHeaderLocaleToggler',
  methods: {
    toggleLanguage() {
      const newLang = this.$i18n.locale === 'pt-BR' ? 'en' : 'pt-BR';
      this.$i18n.locale = newLang;
      this.$store.dispatch('changeLanguage', newLang);
    },
  },
};
</script>

<template>
  <div class="text-black flex" @click.prevent="toggleLanguage">
    <div class="h-6 w-6 block relative bg-cover"
    :class="$i18n.locale"
    ></div>
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
