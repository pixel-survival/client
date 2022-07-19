import Vue from 'vue';
import vmodal from 'vue-js-modal';
import loader from 'vue-ui-preloader';
import App from './App';
import store from './store';
import './mixins';
import '../node_modules/ps-gui/dist/ps.css';

Vue.config.productionTip = false;
Vue.use(vmodal);
Vue.use(loader);

new Vue({
  el: '#app',
  store,
  render(h) {
    return h(App);
  },
});