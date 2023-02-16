<script>

import BaseShowSlider from '@/components/base/BaseShowSlider.vue';
import apiFunctions from '@/mixins/apiFunctions';

export default {
  name: 'HomeView',
  mixins: [apiFunctions],
  components: {
    BaseShowSlider,
  },
  data() {
    return {
      topRatedMovies: [],
      topRatedSeries: [],
      topRatedLastWeek: [],
    };
  },
  async beforeMount() {
    const getTopRatedMovies = await this.getTopRatedMovies();
    getTopRatedMovies.forEach((show) => {
      this.topRatedMovies.push(
        {
          showID: show.id,
          showCover: show.primaryImage,
          showName: show.titleText.text,
        },
      );
    });

    const getTopSeries = await this.getTopRatedSeries();
    getTopSeries.forEach((show) => {
      this.topRatedSeries.push(
        {
          showID: show.id,
          showCover: show.primaryImage,
          showName: show.titleText.text,
        },
      );
    });

    const getTopLastWeekend = await this.getTopRatedLastWeekend();
    getTopLastWeekend.forEach((show) => {
      this.topRatedLastWeek.push(
        {
          showID: show.id,
          showCover: show.primaryImage,
          showName: show.titleText.text,
        },
      );
    });
  },
};
</script>

<template>
  <main
  class="mx-5 grid grid-cols-6 grid-rows-3">
    <section
    class="col-span-6 row-span-1
    grid grid-rows-5">
    <div class="row-span-1 grid grid-rows-3">
        <div class="row-span-1 row-start-2">
          <p class="text-primaryColor font-medium text-3xl">
            Top Rated Movies
          </p>
        </div>
        <div class="row-span-1 row-start-3">
          <p class="text-complementaryColor font-medium text-xl">
            The best movies according to IMBD ranking
          </p>
        </div>
      </div>
      <div class="row-span-4 grid grid-cols-5">
        <base-show-slider :slideContent="topRatedMovies" class="col-span-5"/>
      </div>
    </section>
    <section
    class="col-span-6 row-span-1
    grid grid-rows-5">
    <div class="row-span-1 grid grid-rows-3">
        <div class="row-span-1 row-start-2">
          <p class="text-primaryColor font-medium text-3xl">
            Top Rated Series
          </p>
        </div>
        <div class="row-span-1 row-start-3">
          <p class="text-complementaryColor font-medium text-xl">
            The best series according to IMBD ranking
          </p>
        </div>
      </div>
      <div class="row-span-4 grid grid-cols-5">
        <base-show-slider :slideContent="topRatedSeries" class="col-span-5"/>
      </div>
    </section>
    <section
    class="col-span-6 row-span-1
    grid grid-rows-5">
      <div class="row-span-1 grid grid-rows-3">
        <div class="row-span-1 row-start-2">
          <p class="text-primaryColor font-medium text-3xl">
            Everyone is watching
          </p>
        </div>
        <div class="row-span-1 row-start-3">
          <p class="text-complementaryColor font-medium text-xl">
            Top 10 shows of the last weekend
          </p>
        </div>
      </div>
      <div class="row-span-4 grid grid-cols-5">
        <base-show-slider :slideContent="topRatedLastWeek" class="col-span-5"/>
      </div>
    </section>
  </main>
</template>
