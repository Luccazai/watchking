<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppLoadWheel',
  computed: {
    ...mapGetters(['isLoading']),
  },
};
</script>

<template>
  <transition name="fade">
    <div
    v-if="isLoading"
    class="h-screen w-screen fixed bg-white backdrop-blur-lg
      opacity-70 z-[999] top-0 left-0
      flex items-center justify-center">
      <div>
        <img src="@/assets/loading_2.svg" alt="Loading GIF"/>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
}
</style>
