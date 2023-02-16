<script>

import apiFunctions from '@/mixins/apiFunctions';

export default {
  name: 'showView',
  mixins: [apiFunctions],
  data() {
    return {
      showTitle: String,
      showCover: String,
      showRating: Number,
    };
  },
  async beforeMount() {
    const getShowInformations = await this.getShowByID(this.$route.params.id, 'base_info');
    console.log(getShowInformations);
  },
};
</script>

<template>
  <div>
    <p>show</p>
  </div>
</template>
