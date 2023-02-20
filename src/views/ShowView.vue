<script>

import apiFunctions from '@/mixins/apiFunctions';
import ShowViewWatchListButton from '@/components/ShowViewWatchListButton.vue';
import ReviewStars from '@/components/ReviewStars.vue';
import ShowViewBlock from '@/components/ShowViewBlock.vue';

export default {
  name: 'showView',
  mixins: [apiFunctions],
  components: {
    WatchlistButton: ShowViewWatchListButton,
    ReviewStars,
    ContentBlock: ShowViewBlock,
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
      showReleaseDate: String,
      showGenres: [],
      showCast: [],
    };
  },
  methods: {
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
  async created() {
    const getShowInformations = await this.getShowByID(this.$route.params.id, 'base_info');
    console.log(getShowInformations);

    this.showTitle = getShowInformations.titleText.text;

    const plot = getShowInformations.plot.plotText;
    this.showPlot = plot === null ? '' : plot.plainText;

    this.showRuntime = this.convertRuntime(getShowInformations.runtime.seconds);
    this.showType = getShowInformations.titleType.text;
    this.showReleaseDate = `${getShowInformations.releaseDate.day}/${getShowInformations.releaseDate.month}/${getShowInformations.releaseDate.year}`;

    // Genres set up

    const genres = getShowInformations.genres.genres;
    console.log('Genres: ', genres);
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
      this.showPeriod = `${getShowInformations.releaseYear.year} -
      ${getShowInformations.releaseYear.endYear}`;
    }

    // Budget Information

    const budgetInformation = await this.getBudgetInfos(this.$route.params.id);
    const productionBudget = budgetInformation.productionBudget;
    const worldwideGross = budgetInformation.worldwideGross;

    if (productionBudget !== null) {
      this.showBudget = productionBudget.budget.amount;
      this.showBudgetCurrency = productionBudget.budget.currency;
    } else {
      this.showBudget = null;
    }

    if (worldwideGross !== null) {
      this.showRevenue = worldwideGross.total.amount;
      this.showRevenueCurrency = worldwideGross.total.currency;
    } else {
      this.showRevenue = null;
    }
  },
};
</script>

<template>
  <main class="dark:text-white">
    <div class="px-5 grid grid-cols-6 grid-rows-4 md:grid-rows-6 gap-5 h-screen">
      <div class="row-span-1 col-span-6 flex justify-center items-center">
        <p class="text-3xl text-primaryColor font-semibold">
          {{ showTitle }}
        </p>
      </div>
      <div
      class="row-span-3 col-span-6
      md:row-span-5 md:col-span-2 md:col-start-3">
        <img
        :src="showCover"
        :alt="showTitle"
        class="h-full mx-auto"
        />
      </div>
    </div>
    <div class="px-5 grid grid-cols-6 grid-rows-6 gap-5 h-screen">
      <div
      class="row-span-1 col-span-6 grid grid-rows-2"
      v-if="showRating !== null" >
        <div class="flex justify-center items-center">
          <review-stars :rating="showRating"/>
        </div>
        <div
        class="flex justify-center items-center">
          <p class="font-semibold">{{ showRating }}/10</p>
        </div>
      </div>
      <div
      class="row-span-1 col-span-6 md:col-span-4 md:col-start-2
      flex justify-center items-center md:text-lg">
        <p class="text-center h-full">{{ showPlot }}</p>
      </div>
      <watchlist-button
      class="col-span-4 col-start-2 md:col-span-2 md:col-start-3"
      />
      <div
      class="row-span-1 col-span-6 flex justify-center items-center">
        <p class="text-3xl text-primaryColor font-semibold">
          Infos
        </p>
      </div>
      <div class="row-span-1 col-span-6 grid grid-cols-5">
        <content-block :fieldName="'Type'" :fieldValue="showType"/>
      </div>
      <div class="row-span-1 col-span-6 grid grid-cols-5">
        <content-block :fieldName="'Release Date'" :fieldValue="showReleaseDate"/>
      </div>
    </div>
    <div class="px-5 grid grid-cols-6 grid-rows-4 gap-5 h-screen"
    :class="{ 'grid-rows-6': isSeries() }">
      <div class="row-span-1 col-span-6 grid grid-cols-5">
        <content-block :fieldName="'Runtime'" :fieldValue="showRuntime"/>
      </div>
      <div class="row-span-1 col-span-6 grid grid-cols-5">
        <content-block :fieldName="'Genres'" :fieldValue="showGenres"/>
      </div>
      <!-- BUDGET -->
      <div class="row-span-1 col-span-6 grid grid-cols-5">
        <content-block
        :fieldName="'Budget'"
        :fieldValue="showBudget"
        :fieldCurrency="showBudgetCurrency"/>
      </div>
      <div class="row-span-1 col-span-6 grid grid-cols-5">
        <content-block
        :fieldName="'Revenue'"
        :fieldValue="showRevenue"
        :fieldCurrency="showRevenueCurrency"/>
      </div>
      <!-- SERIES INFO -->
      <div class="row-span-1 col-span-6 grid grid-cols-5 row-start-1" v-if="isSeries()">
        <content-block :fieldName="'Episodes'" :fieldValue="showEpisodes"/>
      </div>
      <div class="row-span-1 col-span-6 grid grid-cols-5 row-start-2" v-if="isSeries()">
        <content-block :fieldName="'Seasons'" :fieldValue="showSeasons"/>
      </div>
    </div>
  </main>
</template>
