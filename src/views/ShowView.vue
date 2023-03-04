<script>

import apiFunctions from '@/mixins/apiFunctions';
import ShowViewWatchListButton from '@/components/ShowViewWatchListButton.vue';
import ReviewStars from '@/components/ReviewStars.vue';
import ShowViewBlock from '@/components/ShowViewBlock.vue';
import ShowCastSlider from '@/components/ShowCastSlider.vue';

export default {
  name: 'showView',
  mixins: [apiFunctions],
  components: {
    WatchlistButton: ShowViewWatchListButton,
    ReviewStars,
    ContentBlock: ShowViewBlock,
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
      showReleaseDate: String,
      showTrailer: String,
      showGenres: [],
      showCast: [],
      requestIsFinished: false,
      showExists: true,
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
    this.showReleaseDate = getShowInformations.releaseDate !== null
      ? `${getShowInformations.releaseDate.day}/${getShowInformations.releaseDate.month}/${getShowInformations.releaseDate.year}`
      : '-';

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
        <content-block :fieldName="'type'" :fieldValue="showType"/>
        <template v-if="isSeries()">
          <content-block :fieldName="'episodes'" :fieldValue="showEpisodes"/>
          <content-block :fieldName="'seasons'" :fieldValue="showSeasons"/>
          <content-block :fieldName="'period'" :fieldValue="showPeriod"/>
        </template>
        <content-block :fieldName="'release date'" :fieldValue="showReleaseDate"/>
        <content-block :fieldName="'runtime'" :fieldValue="showRuntime"/>
        <content-block :fieldName="'genres'" :fieldValue="showGenres"/>
        <content-block
          :fieldName="'budget'"
          :fieldValue="showBudget"
          :fieldCurrency="showBudgetCurrency"/>
        <content-block
          :fieldName="'revenue'"
          :fieldValue="showRevenue"
          :fieldCurrency="showRevenueCurrency"/>
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
