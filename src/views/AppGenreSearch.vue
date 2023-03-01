<script>
import BaseShowCard from '@/components/base/BaseShowCard.vue';
import BasePageNavigator from '@/components/base/BasePageNavigator.vue';
import apiFunctions from '@/mixins/apiFunctions';

export default {
  name: 'SearchGenre',
  mixins: [apiFunctions],
  components: {
    ShowCard: BaseShowCard,
    PageNavigator: BasePageNavigator,
  },
  data() {
    return {
      showList: [],
    };
  },
  async beforeMount() {
    let paramGenre = this.$route.params.genre;
    paramGenre = paramGenre.charAt(0).toUpperCase() + paramGenre.slice(1);

    const result = await this.getShowsByGenre(paramGenre, this.$route.query.page);
    this.showList = result;
  },
};
</script>

<template>
  <main class="md:flex justify-center gap-3 mx-5 flex-wrap
  divide-y-4 divide-primaryColor divide-opacity-30 md:divide-none">
    <div
    v-for="(show) in showList"
    :key="show.id"
    class="w-auto md:h-96 py-3">
      <show-card class="border-4 border-transparent hover:border-4
      hover:border-primaryColor hover:scale-95 transition-transform duration-300"
      :showNameProp="show.titleText.text"
      :showCoverProp="show.primaryImage"
      :showIDProp="show.id"/>
    </div>
    <page-navigator/>
  </main>
</template>
