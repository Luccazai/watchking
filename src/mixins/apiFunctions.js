import apiMain from '@/services/apiMain';

export default {
  methods: {
    async getSearchResults(showName, page) {
      try {
        const resultMovies = await apiMain.searchShow(showName, page, 'movie');
        const resultSeries = await apiMain.searchShow(showName, page, 'tvSeries');
        const result = [];

        resultMovies.data.results.forEach((movie) => {
          result.push(movie);
        });

        resultSeries.data.results.forEach((serie) => {
          result.push(serie);
        });

        console.log('AMBOS: ', result);
        return result;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getShowByID(showID, infoType) {
      try {
        const result = await apiMain.getShowByID(showID, infoType);
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getGenres() {
      try {
        const result = await apiMain.getGenres();
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getShowsByGenre(genre, page) {
      try {
        const resultMovies = await apiMain.getShowsByGenre(genre, page, 'movie');
        const resultSeries = await apiMain.getShowsByGenre(genre, page, 'tvSeries');
        const result = [];

        resultMovies.data.results.forEach((movie) => {
          result.push(movie);
        });

        resultSeries.data.results.forEach((serie) => {
          result.push(serie);
        });

        return result;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getBudgetInfos(showID) {
      try {
        const result = await apiMain.getShowByID(showID, 'revenue_budget');
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getCast(showID) {
      try {
        const result = await apiMain.getShowByID(showID, 'extendedCast');
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getAwards(showID) {
      try {
        const result = await apiMain.getShowByID(showID, 'awards');
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getTopRatedMovies() {
      try {
        const result = await apiMain.getShow('top_rated_250');
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getTopRatedSeries() {
      try {
        const result = await apiMain.getShow('top_rated_series_250');
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getTopRatedLastWeekend() {
      try {
        const result = await apiMain.getShow('top_boxoffice_last_weekend_10');
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async getShowTrailer(showID) {
      try {
        const result = await apiMain.getTrailer(showID);
        return result.data.results;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
};
