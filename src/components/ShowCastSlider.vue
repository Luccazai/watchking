<script>

import apiFunctions from '@/mixins/apiFunctions';
import 'vue3-carousel/dist/carousel.css';
import {
  Carousel, Slide, Navigation,
} from 'vue3-carousel';

export default {
  name: 'ShowCastSlider',
  mixins: [apiFunctions],
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      castArray: [],
      carouselBreakpoints: {
        768: {
          itemsToShow: 4,
          mouseDrag: false,
          touchDrag: false,
        },
      },
    };
  },
  async beforeMount() {
    let getCast = await this.getCast(this.$route.params.id);
    getCast = getCast.principalCast[0].credits;
    console.log(getCast);

    if (getCast === null) {
      return;
    }

    getCast.forEach((member) => {
      this.castArray.push(
        {
          memberName: member.name.nameText.text,
          memberImage: member.name.primaryImage !== null
            ? member.name.primaryImage.url
            : 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
          memberCharacters: member.characters,
        },
      );
    });
  },
};

</script>

<template>
  <carousel
  :items-to-show="1"
  :wrap-around="true"
  :breakpoints="carouselBreakpoints"
  class="md:mx-4"
  >
    <slide
    v-for="(member) in castArray"
    :key="member.memberName"
    >
      <div class="w-4/5 md:w-full h-[30rem] flex-col">
        <div class="w-full h-4/5">
          <img
          :src="member.memberImage"
          :alt="member.memberName"
          class="w-full h-full"
          />
        </div>
        <div class="bg-primaryColorShadow
        text-white h-1/5 flex flex-col justify-center items-center">
          <p class="font-semibold">
            {{ member.memberName }}
          </p>
          <template
          v-if="member.memberCharacters !== null"
          >
            <p
            v-for="(character) in member.memberCharacters" :key="character.name">
              as {{ character.name }}
            </p>
          </template>
        </div>
      </div>
    </slide>
    <template #addons>
      <navigation/>
    </template>
  </carousel>
</template>

<style>
  .carousel__slide {
    @apply md:pr-3;
  }

  .carousel__prev,
  .carousel__next {
    @apply text-primaryColor w-8 h-8 rounded-full z-20 bg-white
    hover:text-green-700 hover:bg-slate-100 border-2 border-primaryColorShadow;
  }
</style>
