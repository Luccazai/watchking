<script>

export default {
  data() {
    return {
      formTab: 'register',
      formInSubmission: false,
      wrongPassword: false,
      loginSchema: {
        email: 'required|email|max:60',
        password: 'required|min:8|max:32',
      },
    };
  },
  methods: {
    async login(values) {
      this.formInSubmission = true;

      try {
        await this.$store.dispatch('login', values);
        this.$router.push('/');
      } catch (err) {
        this.formInSubmission = false;
        console.log(err.code);
        if (err.code === 'auth/wrong-password') {
          this.wrongPassword = true;

          setTimeout(() => {
            this.wrongPassword = false;
          }, 2000);
        }
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <vee-form
  :validation-schema="loginSchema"
  @submit="login">
    <div class="flex flex-col">
      <div class="grid grid-cols-2 my-2">
        <label class="text-center">Email : </label>
        <vee-field type="email" name="email"
        class="text-black mx-4 py-0.5 px-1 rounded-lg outline-none ml-0"/>
      </div>
      <p class="text-center my-2">
        <ErrorMessage class="text-red-600" name="email"/>
      </p>
    </div>
    <div class="flex flex-col">
      <div class="grid grid-cols-2 my-2">
        <label class="text-center">Password: </label>
        <vee-field type="password" name="password"
        class="text-black mx-4 py-0.5 px-1 rounded-lg outline-none ml-0"/>
      </div>
      <p class="text-center my-2">
        <ErrorMessage class="text-red-600" name="password"/>
      </p>
    </div>
    <div class="mt-5 flex justify-center">
      <button
        type="submit"
        class="font-semibold bg-primaryColorShadow text-white p-2 rounded-lg
        hover:bg-green-600 transition duration-500"
        :disabled="formInSubmission">
        Login
      </button>
    </div>
  </vee-form>
  <template v-if="wrongPassword">
    <div
    class="fixed w-full top-14 h-10 bg-red-500 z-50 left-0">
      <p>
        Wrong credentials...
      </p>
    </div>
  </template>
</template>
