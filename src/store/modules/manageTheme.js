export default {
  state: {
    colorTheme: localStorage.getItem('colorTheme'),
  },
  mutations: {
    setTheme(state, payload) {
      state.colorTheme = payload;
    },
  },
  actions: {
    toggleTheme({ state, commit, dispatch }) {
      if (state.colorTheme === 'light') {
        commit('setTheme', 'dark');
        localStorage.setItem('colorTheme', 'dark');
      } else {
        commit('setTheme', 'light');
        localStorage.setItem('colorTheme', 'light');
      }
      dispatch('activateTheme');
    },

    activateTheme({ state }) {
      if (state.colorTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
};
