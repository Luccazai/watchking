export default {
  state: {
    language: localStorage.getItem('language'),
  },
  mutations: {
    setLanguage(state, payload) {
      state.language = payload;
    },
  },
  actions: {
    changeLanguage({ commit }, payload) {
      commit('setLanguage', payload);
      localStorage.setItem('language', payload);
    },
  },
  getters: {
    getLanguage: (state) => state.language,
  },
};
