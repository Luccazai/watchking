import {
  Form as VeeForm, Field as VeeField, defineRule, configure, ErrorMessage,
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces,
  email, confirmed,
} from '@vee-validate/rules';

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
      generateMessages: (ctx) => {
        const messages = {
          required: `${ctx.field} is required.`,
          min: `${ctx.field} is too short.`,
          max: `${ctx.field} is too long.`,
          email: `${ctx.field} is invalid.`,
          password_mismatch: "Your passwords don't match.",
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      },
    });
  },
};
