import api from './apiBase';

export default {
  searchShow(showName, page, titleType) {
    const result = api().get(
      `/titles/search/title/${showName}`,
      {
        params:
        {
          exact: 'false',
          titleType,
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

  getShowsByGenre(genre, page, titleType) {
    const result = api().get(
      '/titles',
      {
        params:
        {
          genre,
          page,
          startYear: 1950,
          sort: 'year.decr',
          titleType,
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

  getTrailer(showID) {
    const result = api().get(
      `/titles/${showID}`,
      {
        params: {
          info: 'trailer',
        },
      },
    );
    return result;
  },
};
