<script>

import AppFormLogin from '@/components/AppFormLogin.vue';
import AppFormRegister from '@/components/AppFormRegister.vue';

export default {
  name: 'AppLogin',
  components: {
    FormLogin: AppFormLogin,
    FormRegister: AppFormRegister,
  },
  data() {
    return {
      formTab: 'login',
    };
  },
};
</script>

<template>
  <main class="w-screen md:pt-3 text-white text-2xl md:text-lg h-screen
  overflow-hidden fixed top-0 left-0 md:border-collapse">
    <div class="w-full md:w-2/5 pt-12 md:pt-16 grid grid-cols-2 gap-0 mx-auto">
      <button type="button"
      class="col-span-1 bg-primaryColorShadow p-6"
      :class="{ 'bg-cyan-600': formTab === 'login' }"
      @click.prevent="formTab = 'login'">
        {{ $t('login.login') }}
      </button>
      <button type="button"
      class="col-span-1 bg-primaryColorShadow p-6"
      :class="{ 'bg-cyan-600': formTab === 'register' }"
      @click.prevent="formTab = 'register'">
      {{ $t('login.register') }}
      </button>
    </div>
    <div class="bg-primaryColor w-full md:w-2/5 mx-auto p-5 h-screen md:h-2/3">
      <transition name="slide" mode="out-in">
        <div v-if="formTab == 'register'">
          <form-register/>
        </div>
        <div v-else>
          <form-login/>
        </div>
      </transition>
    </div>
  </main>
</template>

<style scoped>
  .slide-enter-active {
    transition: all 0.5s ease-out;
    opacity: 1;
  }
  .slide-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    opacity: 0;
  }

  .slide-enter-from,
  .slide-leave-to {
    @apply opacity-0 translate-x-full absolute;
  }
</style>
