<script>

import { mapMutations } from 'vuex';
import apiFunctions from '@/mixins/apiFunctions';
import BaseShowCard from '@/components/base/BaseShowCard.vue';
import BasePageNavigator from '@/components/base/BasePageNavigator.vue';

export default {
  name: 'SearchView',
  mixins: [apiFunctions],
  components: {
    ShowCard: BaseShowCard,
    PageNavigator: BasePageNavigator,
  },
  methods: {
    ...mapMutations(['toggleLoading']),
  },
  data() {
    return {
      showList: [],
      requestIsFinished: false,
      noShowFound: false,
      hasNextPage: false,
    };
  },
  async beforeMount() {
    this.toggleLoading();

    const request = await this.getSearchResults(
      this.$route.params.title,
      this.$route.query.page,
    );

    if (request[0].length === 0) {
      this.noShowFound = true;
    }

    this.showList = request[0];
    this.hasNextPage = request[1];
    this.requestIsFinished = true;

    this.toggleLoading();
  },
};
</script>

<template>
  <main class="md:flex justify-center gap-3 mx-5
  flex-wrap divide-y-4 divide-primaryColor divide-opacity-30 md:divide-none">
  <template v-if="!noShowFound">
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
    </template>
    <template v-else>
      <div
      class="flex w-screen h-screen absolute left-0 top-0
      justify-center flex-col mx-auto dark:text-white">
        <p class="text-2xl my-5 text-center">
          {{ $t('showSearch.not_found') }}
          <span class="text-primaryColor ">{{ this.$route.params.title }}</span>.
        </p>
        <img
        src="https://media4.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif?cid=ecf05e47dnezwrn4l7pru6hqm1qxoejxdmsmxmd9vmh9kh6x&rid=giphy.gif&ct=g"
        alt="GIF"
        class="w-full px-4 md:px-0 md:w-1/3 md:mx-auto"/>
      </div>
    </template>
  </main>
  <page-navigator
  class="mx-auto mt-10 my-6"
  v-if="requestIsFinished && !noShowFound"
  :hasNext="hasNextPage"
  />
</template>
