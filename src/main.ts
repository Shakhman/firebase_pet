import { createApp } from 'vue';
import { createPinia } from 'pinia';
import naive from 'naive-ui';
import App from './App.vue';
import router from './router';

require('./firebase');

createApp(App).use(createPinia()).use(router)
  .use(naive)
  .mount('#app');
