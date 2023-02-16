<script>

import BaseShowCardFlag from '../BaseShowCardFlag.vue';

export default {
  name: 'BaseShowCard',
  components: {
    CardFlag: BaseShowCardFlag,
  },
  props: {
    showCoverProp: Object,
    showNameProp: String,
    showIDProp: String,
  },
  data() {
    return {
      showCover: String,
      hasImage: true,
    };
  },
  beforeMount() {
    if (this.showCoverProp === null) {
      this.showCover = 'https://cdn2.iconfinder.com/data/icons/symbol-blue-set-3/100/Untitled-1-94-512.png';
      this.hasImage = false;
    } else {
      this.showCover = this.showCoverProp.url;
    }
  },
};
</script>

<template>
  <div
  class="h-full flex justify-center align-middle relative">
    <card-flag
    class="absolute top-0 right-0"
    :isOnWatchlist="true"
    :isWatched="false" />
    <router-link
    :to="{ name: 'show', params: { id: showIDProp} }">
      <img
      :src="showCover"
      :alt="showNameProp"
      :class="{ 'h-full': hasImage }"
      class="text-primaryColor text-xl font-semibold"
      />
      <p
      class="text-primaryColor text-xl font-semibold"
      :class="{ 'hidden': hasImage }">
        {{ showNameProp }}
      </p>
    </router-link>
  </div>
</template>
