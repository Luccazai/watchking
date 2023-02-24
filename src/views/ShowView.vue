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
      showTrailer: String,
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
  async beforeMount() {
    const getShowInformations = await this.getShowByID(this.$route.params.id, 'base_info');
    console.log('SHOW INFORMATIONS: ', getShowInformations);

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

    // Trailer

    const trailerRequisition = await this.getShowTrailer(this.$route.params.id);
    console.log('TRAILER: ', trailerRequisition.trailer);
    this.showTrailer = trailerRequisition.trailer;
  },
};
</script>

<template>
  <main class="dark:text-white">
    <div class="w-full flex-col justify-center flex align-middle">
      <div class="flex justify-center items-center my-5">
        <p class="text-3xl text-primaryColor font-semibold">
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
        <template v-if="typeof(showTrailer) !== 'function'">
          <a
          v-if="showTrailer !== undefined"
          :href="showTrailer.replace('embed', 'watch')" target="_blank"
          class="underline text-primaryColor text-lg">
            Check out the trailer (funcionando)
            <i class="text-xs ml-1 fa-solid fa-up-right-from-square"></i>
          </a>
          <a
          v-else
          target="_blank"
          :href="`https://www.youtube.com/results?search_query=${showTitle}+trailer`"
          class="underline text-primaryColor text-lg">
            Check out the trailer
            <i class="text-xs ml-1 fa-solid fa-up-right-from-square"></i>
          </a>
        </template>
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
          Infos
        </p>
      </div>
      <div class="flex flex-col justify-center items-center my-5">
        <content-block :fieldName="'Type'" :fieldValue="showType"/>
        <template v-if="isSeries()">
          <content-block :fieldName="'Episodes'" :fieldValue="showEpisodes"/>
          <content-block :fieldName="'Seasons'" :fieldValue="showSeasons"/>
          <content-block :fieldName="'Period'" :fieldValue="showPeriod"/>
        </template>
        <content-block :fieldName="'Release Date'" :fieldValue="showReleaseDate"/>
        <content-block :fieldName="'Runtime'" :fieldValue="showRuntime"/>
        <content-block :fieldName="'Genres'" :fieldValue="showGenres"/>
        <content-block
          :fieldName="'Budget'"
          :fieldValue="showBudget"
          :fieldCurrency="showBudgetCurrency"/>
        <content-block
          :fieldName="'Revenue'"
          :fieldValue="showRevenue"
          :fieldCurrency="showRevenueCurrency"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
  [v-cloak] {
    display: none;
  }
</style>>
