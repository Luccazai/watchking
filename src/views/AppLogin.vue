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
  <main class="w-full md:pt-3 text-white text-2xl md:text-lg">
    <div class="w-full md:w-2/5 grid grid-cols-2 gap-0 mx-auto">
      <button type="button"
      class="col-span-1 bg-primaryColorShadow p-6"
      :class="{ 'bg-complementaryColor': formTab === 'login' }"
      @click.prevent="formTab = 'login'">
        Login
      </button>
      <button type="button"
      class="col-span-1 bg-primaryColorShadow p-6"
      :class="{ 'bg-complementaryColor': formTab === 'register' }"
      @click.prevent="formTab = 'register'">
        Register
      </button>
    </div>
    <div class="bg-primaryColor w-full md:w-2/5 mx-auto p-5 h-screen md:h-1/2">
      <transition-group name="fade" mode="out-in">
        <form-register v-if="formTab == 'register'"/>
        <form-login v-if="formTab === 'login'"/>
      </transition-group>
    </div>
  </main>
</template>

<style scoped>
  .fade-enter-active {
    transition: all 0.3s ease-out;
  }
  .fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .fade-enter-from,
  .fade-leave-to {
    @apply translate-x-full absolute;
  }
</style>
