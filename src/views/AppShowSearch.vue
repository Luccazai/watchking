<script>

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
  data() {
    return {
      showList: [],
      requestIsFinished: false,
      noShowFound: false,
    };
  },
  async beforeMount() {
    const request = await this.getSearchResults(
      this.$route.params.title,
      this.$route.query.page,
    );

    console.log(request);

    if (request.length === 0) {
      this.noShowFound = true;
      console.log('No show found');
      return;
    }

    this.showList = request;
    this.requestIsFinished = true;
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
      <page-navigator v-if="requestIsFinished"/>
    </template>
    <template v-else>
      <div class="text-primaryColor flex justify-center flex-col w-2/3 mx-auto">
        <p class="md:text-4xl text-2xl my-5 text-center">
          Sorry, we did not found results for {{ this.$route.params.title }}.
        </p>
        <img
        src="https://media4.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif?cid=ecf05e47dnezwrn4l7pru6hqm1qxoejxdmsmxmd9vmh9kh6x&rid=giphy.gif&ct=g"
        alt="GIF"
        class="w-full"/>
      </div>
    </template>
  </main>
</template>
