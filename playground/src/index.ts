import { createApp } from 'vue';
import App from './App.vue';
import './style.scss';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      hello: 'Hello World',
      school: 'School',
      labelSchool: 'School',
      el: {
        errors: {
          string: {
            max: 'The length of {0} can not be longer than {1}',
          }
        }
      }
    },
    'zh-CN': {
      hello: 'Bonjour le monde',
      school: '学校',
      labelSchool: '消息学校',
      el: {
        errors: {
          string: {
            max: '{0}长度不能超过{1}',
          }
        }
      }
    },
  },
});

// @ts-ignore temp error
window.i18n = i18n;

/* TdFormItem.props.formatMessage.default = (message: string) => {
  const [, code, paramString] = message.match(/(el\.errors\.[\w.]+)\0+(.+)/) || [];
  const params: string[] = [];

  if (paramString) {
    params.push(...paramString.split('\0'));
  }

  return i18n.global.t(code, params);
}; */

const app = createApp(App);
app.use(i18n);
app.mount('#app');
