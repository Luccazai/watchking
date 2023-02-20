import api from './apiBase';

export default {
  searchShow(showName, page) {
    const result = api().get(
      `/titles/search/title/${showName}`,
      {
        params:
        {
          exact: 'false',
          page,
        },
      },
    );
    return result;
  },

  getShowByID(showID, infoType) {
    const result = api().get(
      `/titles/${showID}/`,
      {
        params:
        {
          info: infoType,
        },
      },
    );
    return result;
  },

  getShowsByGenre(genre, page) {
    const result = api().get(
      '/titles',
      {
        params:
        {
          genre,
          page,
          endYear: 2022,
          startYear: 1960,
          sort: 'year.decr',
        },
      },
    );
    return result;
  },

  getShow(list) {
    const result = api().get(
      '/titles',
      {
        params:
        {
          list,
        },
      },
    );
    return result;
  },

  getGenres() {
    const result = api().get(
      '/titles/utils/genres',
    );
    return result;
  },
};
