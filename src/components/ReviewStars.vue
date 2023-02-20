<script>
export default {
  name: 'ReviewStars',
  props: {
    rating: Number,
  },
  data() {
    return {
      stars: 0,
      leftoverStars: 0,
    };
  },
  methods: {
    getStars() {
      return Math.floor(this.rating);
    },

    getLeftoverStars() {
      return 10 - Math.floor(this.rating);
    },
  },
};
</script>

<template>
  <div class="grid grid-cols-10">
    <div class="col-span-1" v-for="(index) in Array.from({length: getStars()})" :key="index">
      <i class="fa-solid fa-star text-yellow-400"></i>
    </div>
    <div
    class="col-span-1"
    v-for="(index) in Array.from({length: getLeftoverStars()})"
    :key="index">
      <i class="fa-solid fa-star text-neutral-700"></i>
    </div>
  </div>
</template>
