<script>
export default {
  name: 'PageNotFound',
};
</script>

<template>
  <h2 class="text-primaryColor text-center pt-9 md:text-4xl text-2xl">
    {{ $t('not_found.title') }}
  </h2>
  <div class="my-4 flex flex-col w-2/3 justify-center mx-auto">
    <img
    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGI3NDNlMDYzMDA3YWMwZGM0MGQ1NTc0OTZjNmU4MGI4MTg3M2Q4NyZjdD1n/toB3AnUDkqE3GENKx0/giphy.gif"
    alt="not found gif"
    class="w-full"
    />
    <router-link class="text-primaryColor text-center pt-9 text-2xl underline" to="/">
      {{ $t('not_found.back_to_home') }}
    </router-link>
  </div>
</template>
