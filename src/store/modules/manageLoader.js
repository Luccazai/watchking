export default {
  state: {
    isLoading: false,
  },
  mutations: {
    toggleLoading(state) {
      state.isLoading = !state.isLoading;

      if (state.isLoading) {
        document.body.classList.add('block-scroll');
      } else {
        document.body.classList.remove('block-scroll');
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
};
