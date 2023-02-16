<script>
export default {
  name: 'BaseShowCardFlag',
  props: {
    isOnWatchlist: Boolean,
    isWatched: Boolean,
  },
};
</script>

<template>
  <div>
    <span class="fa-stack">
      <i
        class="fa-solid fa-bookmark fa-stack-2x"
        :class="{
          'text-primaryColor': !isOnWatchlist,
          'text-yellow-400': !isWatched && isOnWatchlist,
          'text-blue-500': isWatched && isOnWatchlist,
          }" >
      </i>
      <i
        class="fa-solid fa-stack-1x text-white"
        :class="{
          'fa-plus': !isOnWatchlist,
          'fa-eye': !isWatched && isOnWatchlist,
          'fa-check': isWatched && isOnWatchlist,

          'text-white': !isOnWatchlist,
          'text-neutral-800': !isWatched && isOnWatchlist,
          'text-white': isWatched && isOnWatchlist,
          }" >
     </i>
    </span>
  </div>
</template>
