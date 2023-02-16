import apiMain from '@/services/apiMain';

export default {
  methods: {
    async getSearchResults(showName, page) {
      try {
        const result = await apiMain.searchShow(showName, page);
        return result.data.results;
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
        const result = await apiMain.getShowsByGenre(genre, page);
        return result.data.results;
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
  },
};
