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
      isHomePage: this.$parent.$options.name === 'CarouselSlide',
    };
  },
  async beforeMount() {
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
  class="w-auto flex justify-center align-middle relative mx-auto"
  :class="{
      'h-full': isHomePage,
      'h-3/4': !isHomePage,
      'md:h-96': !isHomePage,
      'md:w-[16.5rem]': !isHomePage,
    }"
  >
    <card-flag
    class="absolute top-0 right-0"
    :showIDProp="showIDProp"/>
    <router-link
    :to="{ name: 'show', params: { id: showIDProp} }">
      <img
      :src="showCover"
      :alt="showNameProp"
      :class="{ 'h-2/5': !hasImage }"
      class="text-black dark:text-white text-xl font-semibold
      h-full w-full object-cover mx-auto"
      />
      <p
      class="text-black dark:text-white text-xl font-semibold text-center"
      :class="{ 'hidden': hasImage }">
        {{ showNameProp }}
      </p>
    </router-link>
  </div>
</template>
