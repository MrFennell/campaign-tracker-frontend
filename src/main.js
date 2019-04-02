import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLuxon from 'vue-luxon';

Vue.use(VueLuxon);

require('./assets/sass/main.scss');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
