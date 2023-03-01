<script>
export default {
  name: 'BasePageNavigator',
};
</script>

<template>
  <div class="flex mt-6 w-full bottom-0 h-12 bg-primaryColor rounded-lg">
    <div class="grid grid-cols-10 w-full">
      <template v-for="(i) in 10" :key=i>
        <button
        type="button"
        @click="this.$router.push({ query: { page: i } })"
        class="text-white dark:text-black"
        :class="{ 'bg-complementaryColor font-semibold': this.$route.query.page == i }" >
          {{ i }}
        </button>
      </template>
    </div>
  </div>
</template>
