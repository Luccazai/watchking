<script>

import apiFunctions from '@/mixins/apiFunctions';
import BaseShowCard from '@/components/base/BaseShowCard.vue';

export default {
  name: 'SearchView',
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
    const request = await this.getSearchResults(
      this.$route.params.title,
      this.$route.query.page,
    );

    console.log(request);

    if (request.length === 0) {
      console.log('No show found');
      return;
    }

    const excluded = ['video', 'videoGame', 'musicVideo', 'tvEpisode',
      'short', 'tvShort', 'podcastEpisode'];

    request.forEach((show) => {
      console.log('SearchView foreach: ', show.titleType.id);
      if (!excluded.includes(show.titleType.id)) {
        this.showList.push(show);
      }
    });
  },
};
</script>

<template>
  <main class="md:flex justify-center md:justify-evenly gap-3 mx-5
  flex-wrap divide-y-4 divide-primaryColor divide-opacity-30 md:divide-none">
    <div
    v-for="(show) in showList"
    :key="show.id"
    class="w-auto h-2/3 md:h-96 py-3">
      <show-card class="border-4 border-transparent hover:border-4
      hover:border-primaryColor hover:scale-95 transition-transform duration-300"
      :showNameProp="show.titleText.text"
      :showCoverProp="show.primaryImage"
      :showIDProp="show.id"/>
    </div>
  </main>
</template>
