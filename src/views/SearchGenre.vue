<script>
import BaseShowCard from '@/components/base/BaseShowCard.vue';
import apiFunctions from '@/mixins/apiFunctions';

export default {
  name: 'SearchGenre',
  mixins: [apiFunctions],
  components: {
    ShowCard: BaseShowCard,
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
    const excluded = ['video', 'videoGame', 'musicVideo', 'tvEpisode', 'short', 'tvShort'];

    result.forEach((show) => {
      if (!excluded.includes(show.titleType.id)) {
        this.showList.push(show);
      }
    });
  },
};
</script>

<template>
  <main class="md:flex justify-center md:justify-start gap-3 mx-5 flex-wrap">
    <div
    v-for="(show) in showList"
    :key="show.id"
    class="w-auto h-screen md:h-96">
      <show-card class="border-4 border-transparent hover:border-4
      hover:border-primaryColor hover:scale-95 transition-transform duration-300"
      :showNameProp="show.titleText.text"
      :showCoverProp="show.primaryImage"
      :showIDProp="show.id"/>
    </div>
  </main>
</template>
