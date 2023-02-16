<script>

import 'vue3-carousel/dist/carousel.css';
import {
  Carousel, Slide, Pagination, Navigation,
} from 'vue3-carousel';
import BaseShowCard from './BaseShowCard.vue';

export default {
  name: 'BaseShowSlider',
  components: {
    ShowCard: BaseShowCard,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    slideContent: Array,
  },
  data() {
    return {
      carouselBreakpoints: {
        768: {
          itemsToShow: 4,
          mouseDrag: false,
          touchDrag: false,
        },
      },
    };
  },
};
</script>

<template>
  <carousel
  :items-to-show="1"
  :wrap-around="true"
  :breakpoints="carouselBreakpoints"
  >
    <slide
      v-for="(show, i) in slideContent"
      :key="i"
    >
      <show-card
      :showNameProp="show.showName"
      :showCoverProp="show.showCover"
      :showIDProp="show.showID"/>
    </slide>
    <template #addons>
      <navigation/>
      <pagination/>
    </template>
  </carousel>
</template>

<style>
  .carousel__slide {
    @apply pr-3;
  }

  .carousel__slide--active {
    @apply transition duration-500 scale-95 border-primaryColor border-4 pr-0;
  }

  button.carousel__prev,
  button.carousel__next {
    @apply text-primaryColor w-8 h-8 rounded-full z-20 bg-white
    hover:text-green-700 hover:bg-slate-100;
  }
</style>
