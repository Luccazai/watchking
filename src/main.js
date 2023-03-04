import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import i18n from './includes/i18n';
import VeeValidatePlugin from './includes/validation';
import { auth } from './includes/firebase';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    // eslint-disable-next-line
    app = createApp(App).use(i18n);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin, {
      i18n,
    });

    app.mount('#app');
  }
});
