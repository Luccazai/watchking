import { setLocale } from '@vee-validate/i18n';

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
      setLocale(payload);
      localStorage.setItem('language', payload);
    },
  },
  getters: {
    getLanguage: (state) => state.language,
  },
};
