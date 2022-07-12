import Vue from 'vue';
import App from './App';
import store from './store';
import vmodal from 'vue-js-modal'
import './mixins';

Vue.config.productionTip = false;
Vue.use(vmodal);

new Vue({
  el: '#app',
  store,
  render(h) {
    return h(App);
  },
});