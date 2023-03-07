<script>

import { mapMutations } from 'vuex';
import apiFunctions from '@/mixins/apiFunctions';
import ShowViewWatchListButton from '@/components/ShowViewWatchListButton.vue';
import ReviewStars from '@/components/ReviewStars.vue';
import ShowCastSlider from '@/components/ShowCastSlider.vue';

export default {
  name: 'showView',
  mixins: [apiFunctions],
  components: {
    WatchlistButton: ShowViewWatchListButton,
    ReviewStars,
    ShowCastSlider,
  },
  data() {
    return {
      showTitle: String,
      showCover: String,
      showPlot: String,
      showRating: String,
      showRuntime: String,
      showType: String,
      showEpisodes: Number,
      showSeasons: Number,
      showPeriod: String,
      showBudget: Number,
      showBudgetCurrency: String,
      showRevenue: Number,
      showRevenueCurrency: String,
      showReleaseDateDay: String,
      showReleaseDateMonth: String,
      showReleaseDateYear: String,
      showTrailer: String,
      showGenres: [],
      showCast: [],
      requestIsFinished: false,
      showExists: true,
    };
  },
  methods: {
    ...mapMutations(['toggleLoading']),

    isSeries() {
      return (
        this.showType === 'Series'
        || this.showType === 'TV Mini Series'
        || this.showType === 'TV Series'
      );
    },

    convertRuntime(seconds) {
      const runtime = seconds / 60;
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;

      const time = runtime > 60
        ? `${hours}h${minutes}min`
        : `${minutes}min`;

      return time;
    },
  },
  async beforeMount() {
    this.toggleLoading();
    const getShowInformations = await this.getShowByID(this.$route.params.id, 'base_info');

    if (getShowInformations === null) {
      this.showExists = false;
      return;
    }

    this.showTitle = getShowInformations.titleText.text;

    const plot = getShowInformations.plot.plotText;
    this.showPlot = plot === null ? '' : plot.plainText;

    this.showRuntime = getShowInformations.runtime !== null
      ? this.convertRuntime(getShowInformations.runtime.seconds)
      : '-';

    this.showType = getShowInformations.titleType.text;

    if (getShowInformations.releaseDate !== null) {
      this.showReleaseDateDay = getShowInformations.releaseDate.day;
      this.showReleaseDateMonth = getShowInformations.releaseDate.month;
      this.showReleaseDateYear = getShowInformations.releaseDate.year;
    }

    // Genres set up

    const genres = getShowInformations.genres.genres;
    genres.forEach((genre) => {
      this.showGenres.push(genre.text);
    });

    this.showCover = getShowInformations.primaryImage === null
      ? 'https://cdn2.iconfinder.com/data/icons/symbol-blue-set-3/100/Untitled-1-94-512.png'
      : getShowInformations.primaryImage.url;

    this.showRating = getShowInformations.ratingsSummary === null
      ? ''
      : getShowInformations.ratingsSummary.aggregateRating;

    // Series Settings

    if (this.isSeries()) {
      this.showEpisodes = getShowInformations.episodes.episodes.total;
      this.showSeasons = getShowInformations.episodes.seasons.length;

      const releaseYear = getShowInformations.releaseYear.year;
      const endYear = getShowInformations.releaseYear.endYear;

      this.showPeriod = endYear === null
        ? 'Ongoing'
        : `${releaseYear} - ${endYear}`;
    }

    // Budget Information

    const budgetInformation = await this.getBudgetInfos(this.$route.params.id);
    const productionBudget = budgetInformation.productionBudget;
    const worldwideGross = budgetInformation.worldwideGross;

    if (productionBudget !== null) {
      this.showBudget = productionBudget.budget.amount;
      this.showBudgetCurrency = productionBudget.budget.currency;
    } else {
      this.showBudget = '-';
    }

    if (worldwideGross !== null) {
      this.showRevenue = worldwideGross.total.amount;
      this.showRevenueCurrency = worldwideGross.total.currency;
    } else {
      this.showRevenue = '-';
    }

    // Trailer

    const trailerRequisition = await this.getShowTrailer(this.$route.params.id);
    this.showTrailer = trailerRequisition.trailer !== undefined
      ? trailerRequisition.trailer.replace('embed', 'watch')
      : `https://www.youtube.com/results?search_query=${this.showTitle}+trailer`;

    this.requestIsFinished = true;
    this.toggleLoading();
  },
};
</script>

<template>
  <main class="dark:text-white" v-if="requestIsFinished">
    <div class="w-full flex-col justify-center flex align-middle">
      <div class="flex justify-center items-center my-5">
        <p class="text-3xl text-primaryColor font-semibold text-center">
          {{ showTitle }}
        </p>
      </div>
      <div class="flex flex-col justify-center
      items-center md:h-screen w-4/5 md:w-3/5 mx-auto">
        <div
        class="h-full md:w-3/4 flex justify-center">
          <img
          :src="showCover"
          :alt="showTitle"
          class="h-full"
          />
        </div>
      </div>
      <div class="flex justify-center items-center gap-5 my-4">
        <a
        :href="showTrailer" target="_blank"
        class="underline text-primaryColor text-lg">
          {{ $t('infos.trailer') }}
          <i class="text-xs ml-1 fa-solid fa-up-right-from-square"></i>
        </a>
      </div>
      <div
      v-if="typeof(showRating) === 'number'"
      class="flex justify-center items-center gap-5 my-4">
        <review-stars :rating="showRating"/>
        <p class="font-semibold">{{ showRating }}/10</p>
      </div>
      <div
      v-if="typeof(showPlot) === 'string'"
      class="flex justify-center items-center">
        <p class="text-center px-5 md:w-2/4">{{ showPlot }}</p>
      </div>
      <div class="flex justify-center items-center my-5">
        <watchlist-button
        class="mx-10 md:w-1/4"
        />
      </div>
    </div>
    <div class="w-full flex-col justify-center flex align-middle">
      <div class="flex justify-center items-center my-5">
        <p class="text-3xl text-primaryColor font-semibold">
          {{ $t('infos.infos') }}
        </p>
      </div>
      <div class="flex flex-col justify-center items-center my-5">
      <!-- Type -->
      <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
        <div class="flex items-center justify-center">
          <p class="md:text-xl text-complementaryColor font-semibold capitalize text-center">
            {{ $t('infos.type.title') }}
          </p>
        </div>
        <div class="col-span-1 my-2">
          <p class="text-center">
            {{ $t('infos.type.movie') }}
          </p>
        </div>
      </div>
      <template v-if="isSeries()">
        <!-- Episodes -->
        <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
          <div class="flex items-center justify-center">
            <p class="md:text-xl text-complementaryColor font-semibold capitalize text-center">
              {{ $t('infos.episodes') }}
            </p>
          </div>
          <div class="col-span-1 my-2">
            <p class="text-center">
              {{ showEpisodes }}
            </p>
          </div>
        </div>
        <!-- Episodes -->
        <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
          <div class="flex items-center justify-center">
            <p class="md:text-xl text-complementaryColor font-semibold capitalize text-center">
              {{ $t('infos.seasons') }}
            </p>
          </div>
          <div class="col-span-1 my-2">
            <p class="text-center">
              {{ showSeasons }}
            </p>
          </div>
        </div>
        <!-- Period -->
        <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
          <div class="flex items-center justify-center">
            <p class="md:text-xl text-complementaryColor font-semibold capitalize text-center">
              {{ $t('infos.period') }}
            </p>
          </div>
          <div class="col-span-1 my-2">
            <p class="text-center">
              {{ showPeriod }}
            </p>
          </div>
        </div>
      </template>
      <!-- Release Date -->
      <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
        <div class="flex items-center justify-center">
          <p class="md:text-xl text-complementaryColor font-semibold capitalize text-center">
            {{ $t('infos.release') }}
          </p>
        </div>
        <div class="col-span-1 my-2">
          <p class="text-center">
            {{ $t('infos.releaseDate', {
              day: showReleaseDateDay,
              month: showReleaseDateMonth,
              year: showReleaseDateYear,
            }) }}
          </p>
        </div>
      </div>
      <!-- Runtime -->
      <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
        <div class="flex items-center justify-center">
          <p class="md:text-xl text-complementaryColor font-semibold capitalize text-center">
            {{ $t('infos.runtime') }}
          </p>
        </div>
        <div class="col-span-1 my-2">
          <p class="text-center">
            {{ showRuntime }}
          </p>
        </div>
      </div>
      <!-- Genres -->
      <div class="grid grid-cols-2 my-5 w-full md:w-3/4">
        <div class="col-span-1 mx-auto">
          <p class="md:text-xl text-complementaryColor font-semibold capitalize">
            {{ $t('infos.genres') }}
          </p>
        </div>
        <div class="col-span-1 flex justify-center items-center mx-auto flex-wrap">
          <router-link
          :to="{ name: 'genre', params: { genre: genre }, query: { page: 1 } }"
          class="hover:text-complementaryColor mx-1
          transition duration-500 hover:font-semibold underline"
          v-for="(genre) in showGenres" :key="genre">
            {{ $t(`genres.${genre}`) }}
          </router-link>
        </div>
      </div>
      <!-- Budget -->
      <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
        <div class="flex items-center justify-center">
          <p class="md:text-xl text-complementaryColor font-semibold capitalize text-center">
            {{ $t('infos.budget') }}
          </p>
        </div>
        <div class="col-span-1 my-2">
          <p class="text-center" v-if="typeof(showBudget) === 'number'">
            {{ $n(showBudget, 'currency', { currency: showBudgetCurrency }) }}
          </p>
          <p class="text-center" v-if="typeof(showBudget) !== 'number'">
            -
          </p>
        </div>
      </div>
      <!-- Revenue -->
      <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
        <div class="flex items-center justify-center">
          <p class="md:text-xl text-complementaryColor font-semibold capitalize text-center">
            {{ $t('infos.revenue') }}
          </p>
        </div>
        <div class="col-span-1 my-2">
          <p class="text-center" v-if="typeof(showRevenue) === 'number'">
            {{ $n(showRevenue, 'currency', { currency: showRevenueCurrency }) }}
          </p>
          <p class="text-center" v-if="typeof(showRevenue) !== 'number'">
            -
          </p>
        </div>
      </div>
      </div>
      <div class="my-5">
        <div class="flex justify-center items-center my-5">
          <p class="text-3xl text-primaryColor font-semibold">
            {{ $t('infos.cast') }}
          </p>
        </div>
        <show-cast-slider/>
      </div>
    </div>
  </main>

  <!-- If show doesnt exists -->

  <template v-if="!showExists">
    <div class="w-2/3 flex flex-col justify-center mx-auto">
      <p class="text-2xl md:text-4xl text-primaryColor text-center my-5">
        This show does not exits
      </p>
      <img
      src="https://media3.giphy.com/media/Bp3dFfoqpCKFyXuSzP/giphy.gif?cid=ecf05e47n5to1gfxke7lvbl12095e4gv2s2a5g3sx9l0am0v&rid=giphy.gif&ct=g"
      alt="GIF"
      class="mx-auto md:h-[35rem] w-full md:w-4/5"/>
    </div>
  </template>
</template>
