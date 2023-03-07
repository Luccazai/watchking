<script>

import { mapMutations } from 'vuex';
import { auth } from '@/includes/firebase';
import BaseShowCard from '@/components/base/BaseShowCard.vue';
import apiFunctions from '@/mixins/apiFunctions';

export default {
  name: 'UserWatchlist',
  components: {
    ShowCard: BaseShowCard,
  },
  methods: {
    ...mapMutations(['toggleLoading']),
  },
  mixins: [apiFunctions],
  data() {
    return {
      showList: [],
      isEmpty: false,
    };
  },
  async beforeMount() {
    this.toggleLoading();

    const uid = auth.currentUser === null ? undefined : auth.currentUser.uid;

    try {
      const result = await this.$store.dispatch('moviesOnWatchlist', uid);
      this.isEmpty = result.empty;

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

    this.toggleLoading();
  },
};
</script>

<template>
  <main class="flex justify-center md:justify-evenly mx-3 flex-wrap
  divide-y-4 divide-primaryColor divide-opacity-30 md:divide-none">
    <template v-if="!isEmpty">
      <div
      v-for="(show) in showList"
      :key="show.id"
      class="py-3">
        <show-card
        class="border-4 border-transparent hover:border-4 w-full
        hover:border-primaryColor hover:scale-95 transition-transform duration-300"
        :showCoverProp="show.primaryImage"
        :showNameProp="show.titleText.text"
        :showIDProp="show.id"/>
      </div>
    </template>
    <template v-else>
      <div class="text-center text-2xl absolute top-1/2
      -translate-y-1/2 left-auto dark:text-white px-5 md:px-0">
        {{ $t('watchlist.no_shows') }}
        <router-link
        class="text-primaryColor underline"
        :to="{ name: 'home' }">
        {{ $t('watchlist.home') }}
        </router-link>.
      </div>
    </template>
  </main>
</template>
