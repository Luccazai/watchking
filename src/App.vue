<script>

import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
  },
};
</script>

<template>
  <div class="block mb-12"></div>
  <TheHeader/>
  <router-view/>
</template>
