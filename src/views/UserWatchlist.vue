<script>

import { auth } from '@/includes/firebase';
import BaseShowCard from '@/components/base/BaseShowCard.vue';
import apiFunctions from '@/mixins/apiFunctions';

export default {
  name: 'UserWatchlist',
  components: {
    ShowCard: BaseShowCard,
  },
  mixins: [apiFunctions],
  data() {
    return {
      showList: [],
    };
  },
  async beforeMount() {
    const uid = auth.currentUser === null ? undefined : auth.currentUser.uid;
    console.log(uid);

    try {
      const result = await this.$store.dispatch('moviesOnWatchlist', uid);
      console.log(result);

      result.forEach(async (show) => {
        const { movieID } = show.data();

        const requisition = await this.getShowByID(movieID, 'mini_info');
        this.showList.push(
          requisition,
        );
      });
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<template>
  <main class="flex justify-center md:justify-start gap-3 mx-5 flex-wrap">
    <div
    v-for="(show) in showList" :key="show.id"
    class="w-auto h-96">
      <show-card
      class="border-4 border-transparent hover:border-4
      hover:border-primaryColor hover:scale-95 transition-transform duration-300"
      :showCoverProp="show.primaryImage"
      :showNameProp="show.titleText.text"
      :showIDProp="show.id"/>
    </div>
  </main>
</template>
