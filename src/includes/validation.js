import {
  Form as VeeForm, Field as VeeField, defineRule,
  ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces,
  email, confirmed,
} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('password_mismatch', confirmed);

    configure({
      generateMessage: localize({
        en: {
          names: {
            name: 'Name',
            password: 'Password',
            email: 'Email',
          },
          messages: {
            required: '{field} is required.',
            min: '{field} is too short.',
            max: '{field} is too long.',
            email: 'Invalid email.',
            password_mismatch: "Your passwords don't match.",
          },
        },
        'pt-BR': {
          names: {
            name: 'Nome',
            password: 'Senha',
            email: 'Email',
          },
          messages: {
            required: '{field} é obrigatório.',
            min: '{field} muito curto.',
            max: '{field} muito longo.',
            email: 'Email inválido.',
            password_mismatch: 'Suas senhas não batem.',
          },
        },
      }),
    });
    setLocale(localStorage.getItem('language'));
  },
};
