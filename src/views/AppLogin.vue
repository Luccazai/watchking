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
  <main class="w-full pt-3 text-black">
    <div class="w-full md:w-2/5 grid grid-cols-2 gap-0 mx-auto">
      <button type="button"
      class="col-span-1 bg-primaryColorShadow p-3"
      :class="{ 'text-white': formTab === 'login' }"
      @click.prevent="formTab = 'login'">
        Login
      </button>
      <button type="button"
      class="col-span-1 bg-primaryColorShadow p-3"
      :class="{ 'text-white': formTab === 'register' }"
      @click.prevent="formTab = 'register'">
        Register
      </button>
    </div>
    <div class="bg-primaryColor w-full md:w-2/5 mx-auto p-5">
      <form-register v-if="formTab == 'register'"/>
      <form-login v-if="formTab === 'login'"/>
    </div>
  </main>
</template>
