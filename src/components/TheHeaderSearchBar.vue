<script>
export default {
  name: 'TheHeaderSearchBar',
  methods: {
    search() {
      const movie = document.getElementById('searchInput').value;
      this.$router.push({
        name: 'search',
        params: { title: movie },
        query: { page: 1 },
      });

      document.getElementById('searchInput').value = '';
    },
  },
};
</script>

<template>
  <div class="w-full flex">
    <input
    type="text"
    class="w-full bg-white-300 text-black text-lg font-normal
    rounded-xl pl-1 py-0.5 outline-none"
    id="searchInput"/>
    <button
      class="text-black px-1"
      @click.prevent="search">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</template>
