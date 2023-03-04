<script>

export default {
  name: 'BasePageNavigator',
  props: {
    hasNext: Boolean,
  },
  data() {
    return {
      prevPage: Number,
      currentPage: Number,
      nextPage: Number,
    };
  },
  beforeMount() {
    const page = Number(this.$route.query.page);
    this.prevPage = page - 1;
    this.currentPage = page;
    this.nextPage = page + 1;
  },
};
</script>

<template>
  <div class="flex mt-6 w-1/2 bottom-0 h-12 bg-primaryColor rounded-lg">
    <div class="grid grid-cols-3 w-full">
      <button
      v-if="currentPage > 1"
      type="button"
      @click="this.$router.push({ query: { page: prevPage } })"
      class="text-white">
        {{ prevPage }}
      </button>

      <button
      type="button"
      @click="this.$router.push({ query: { page: currentPage } })"
      class="text-white bg-complementaryColor font-semibold"
      :class="{ 'col-start-2': currentPage === 1 }">
        {{ currentPage }}
      </button>

      <button
      v-if="hasNext"
      type="button"
      @click="this.$router.push({ query: { page: nextPage } })"
      class="text-white">
        {{ nextPage }}
      </button>
    </div>
  </div>
</template>
