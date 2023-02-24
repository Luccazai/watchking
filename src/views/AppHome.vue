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
  async mounted() {
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
  <main class="m-5 mt-20">
    <section>
    <div>
      <div class="flex flex-col">
        <p class="text-primaryColor font-medium text-3xl text-center md:text-left">
          Top Rated Movies
        </p>
        <p class="text-complementaryColor font-medium text-xl text-center md:text-left">
          The best movies according to IMBD ranking
        </p>
      </div>
      <base-show-slider :slideContent="topRatedMovies" class="mt-5 md:mt-7"/>
    </div>
    </section>
    <section class="my-5 md:my-7">
    <div>
      <div class="flex flex-col">
        <p class="text-primaryColor font-medium text-3xl text-center md:text-left">
          Top Rated Series
        </p>
        <p class="text-complementaryColor font-medium text-xl text-center md:text-left">
          The best series according to IMBD ranking
        </p>
      </div>
      <base-show-slider :slideContent="topRatedSeries" class="mt-5 md:mt-7"/>
    </div>
    </section>
    <section class="my-5 md:my-7">
    <div>
      <div class="flex flex-col">
        <p class="text-primaryColor font-medium text-3xl text-center md:text-left">
          Everyone is watching
        </p>
        <p class="text-complementaryColor font-medium text-xl text-center md:text-left">
          Top 10 shows of the last weekend
        </p>
      </div>
      <base-show-slider :slideContent="topRatedLastWeek" class="mt-5 md:mt-7"/>
    </div>
    </section>
    <section class="my-5 md:my-7">
    <div>
      <div class="flex flex-col">
        <p class="text-primaryColor font-medium text-3xl text-center md:text-left">
          Genres
        </p>
        <p class="text-complementaryColor font-medium text-xl text-center md:text-left">
          Explore your favorite genre
        </p>
      </div>
      <base-genre-slider :genreList="genreList" class="mt-5 md:my-7"/>
    </div>
    </section>
  </main>
</template>
