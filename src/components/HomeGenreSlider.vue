<script>

import 'vue3-carousel/dist/carousel.css';
import {
  Carousel, Slide, Navigation,
} from 'vue3-carousel';

export default {
  name: 'HomeGenreSlider',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  props: {
    genreList: Array,
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
    v-for="(genre) in genreList"
    :key="genre"
    >
    <div class="w-full bg-primaryColor block justify-center items-center">
      <router-link :to="{ name: 'genre', params: { genre: genre } }">
          <div class="w-full md:h-[520px] h-[720px]
          flex justify-center items-center">
            <p class="text-white text-center text-xl">
              {{ genre }}
            </p>
          </div>
        </router-link>
    </div>
    </slide>
    <template #addons>
      <navigation/>
    </template>
  </carousel>
</template>

<style scoped>
  .carousel__slide {
    @apply pr-3;
  }

  .carousel__slide--active {
    @apply transition duration-500 scale-95 border-cyan-300
    border-4 pr-0 shadow-sm shadow-black font-semibold;
  }

  button.carousel__prev,
  button.carousel__next {
    @apply text-primaryColor w-8 h-8 rounded-full z-20 bg-white
    hover:text-green-700 hover:bg-slate-100;
  }
</style>
