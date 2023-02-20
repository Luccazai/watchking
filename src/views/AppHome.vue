<script>

import apiFunctions from '@/mixins/apiFunctions';
import BaseShowSlider from '@/components/base/BaseShowSlider.vue';
import BaseGenreSlider from '@/components/base/BaseGenreSlider.vue';

export default {
  name: 'HomeView',
  mixins: [apiFunctions],
  components: {
    BaseShowSlider,
    BaseGenreSlider,
  },
  data() {
    return {
      topRatedMovies: [],
      topRatedSeries: [],
      topRatedLastWeek: [],
      genreList: [],
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

    const getGenres = await this.getGenres();
    console.log('GENRES: ', getGenres);
    getGenres.forEach((genre) => {
      if (genre !== null) {
        this.genreList.push(
          genre,
        );
      }
    });
  },
};
</script>

<template>
  <main
  class="mx-5 grid grid-cols-6 grid-rows-4">
    <section
    class="col-span-6 row-span-1
    grid grid-rows-5">
    <div class="row-span-1 grid grid-rows-3">
        <div class="row-span-1 row-start-2">
          <p class="text-primaryColor font-medium text-3xl text-center md:text-left">
            Top Rated Movies
          </p>
        </div>
        <div class="row-span-1 row-start-3">
          <p class="text-complementaryColor font-medium text-xl text-center md:text-left">
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
          <p class="text-primaryColor font-medium text-3xl text-center md:text-left">
            Top Rated Series
          </p>
        </div>
        <div class="row-span-1 row-start-3">
          <p class="text-complementaryColor font-medium text-xl text-center md:text-left">
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
          <p class="text-primaryColor font-medium text-3xl text-center md:text-left">
            Everyone is watching
          </p>
        </div>
        <div class="row-span-1 row-start-3">
          <p class="text-complementaryColor font-medium text-xl text-center md:text-left">
            Top 10 shows of the last weekend
          </p>
        </div>
      </div>
      <div class="row-span-4 grid grid-cols-5">
        <base-show-slider :slideContent="topRatedLastWeek" class="col-span-5"/>
      </div>
    </section>
    <section
    class="col-span-6 row-span-1
    grid grid-rows-5">
      <div class="row-span-1 grid grid-rows-3">
        <div class="row-span-1 row-start-2">
          <p class="text-primaryColor font-medium text-3xl text-center md:text-left">
            Genres
          </p>
        </div>
        <div class="row-span-1 row-start-3">
          <p class="text-complementaryColor font-medium text-xl text-center md:text-left">
            Explore your favorite genre
          </p>
        </div>
      </div>
      <div class="row-span-4 grid grid-cols-5">
        <base-genre-slider :genreList="genreList" class="col-span-5"/>
      </div>
    </section>
  </main>
</template>
