<script>
export default {
  name: 'AppFormLogin',
  data() {
    return {
      formTab: 'register',
      formInSubmission: false,
      alreadyRegistered: false,
      registerSchema: {
        name: 'required|min:3|max:30|alpha_spaces',
        email: 'required|email|max:60',
        password: 'required|min:8|max:32',
        confirm_password: 'password_mismatch:@password',
      },
    };
  },
  methods: {
    async register(values) {
      this.formInSubmission = true;

      try {
        await this.$store.dispatch('register', values);
        // window.location.reload();
      } catch (err) {
        this.formInSubmission = false;

        if (err.code === 'auth/email-already-in-use') {
          this.alreadyRegistered = true;
        }

        return;
      }

      this.$router.push('/');
    },
  },
};
</script>

<template>
  <vee-form
  :validation-schema="registerSchema"
  @submit="register">
    <div class="flex flex-col">
      <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-y-2 my-1">
        <label class="text-center">{{ $t('login.name') }}: </label>
        <vee-field type="text" name="name"
        class="text-black mx-4 py-0.5 px-1 rounded-lg outline-none ml-0"/>
      </div>
      <p class="text-center my-1">
        <ErrorMessage class="text-red-600" name="name"/>
      </p>
    </div>
    <div class="flex flex-col">
      <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-y-2 my-1">
        <label class="text-center">Email: </label>
        <vee-field type="email" name="email"
        class="text-black mx-4 py-0.5 px-1 rounded-lg outline-none ml-0"/>
      </div>
      <p class="text-center my-1">
        <ErrorMessage class="text-red-600" name="email"/>
      </p>
    </div>
    <div class="flex flex-col">
      <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-y-2 my-1">
        <label class="text-center">{{ $t('login.password') }}: </label>
        <vee-field type="password" name="password"
        class="text-black mx-4 py-0.5 px-1 rounded-lg outline-none ml-0"/>
      </div>
      <p class="text-center my-1">
        <ErrorMessage class="text-red-600" name="password"/>
      </p>
    </div>
    <div class="flex flex-col">
      <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-y-2 my-1">
        <label class="text-center">{{ $t('login.confirmPassword') }}: </label>
        <vee-field type="password" name="confirm_password"
        class="text-black mx-4 py-0.5 px-1 rounded-lg outline-none ml-0"/>
      </div>
      <p class="text-center my-1">
        <ErrorMessage class="text-red-600" name="confirm_password"/>
      </p>
    </div>
    <div class="mt-5 flex justify-center">
      <button
        type="submit"
        class="font-semibold bg-primaryColorShadow text-white p-2 rounded-lg
        hover:bg-green-600 transition duration-500"
        :disabled="formInSubmission">
        {{ $t('login.submit') }}
      </button>
    </div>
  </vee-form>
  <template v-if="formInSubmission">
    <div
    class="fixed w-full top-12 h-10 bg-blue-500 z-50 left-0 px-2 flex items-center">
      <p>
        {{ $t('login.submitting') }}
      </p>
    </div>
  </template>
  <template v-if="alreadyRegistered">
    <div
    class="fixed w-full top-12 h-10 bg-red-500 z-50 left-0
    flex justify-between px-2 items-center">
      <p class="text-white">
        {{ $t('login.alreadyRegistered') }}
      </p>
      <div>
        <button type="button" @click.prevent="alreadyRegistered = false">
          <i class="fa fa-xmark text-white text-xl"></i>
        </button>
      </div>
    </div>
  </template>
</template>
