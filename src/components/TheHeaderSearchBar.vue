<script>
export default {
  name: 'TheHeaderSearchBar',
  props: {
    idKey: String,
  },
  methods: {
    search() {
      const movie = document.getElementById(this.idKey).value;
      this.$router.push({
        name: 'search',
        params: { title: movie },
        query: { page: 1 },
      });

      document.getElementById(this.idKey).value = '';
    },
  },
};
</script>

<template>
  <div class="w-full bg-white flex rounded-xl">
    <input
    type="text"
    class="w-full text-black text-lg font-normal
    pl-1 py-0.5 outline-none rounded-xl"
    :id="idKey"/>
    <button
      class="text-primaryColor hover:text-primaryColorShadow
      px-1 text-lg transition duration-500"
      @click.prevent="search">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</template>
