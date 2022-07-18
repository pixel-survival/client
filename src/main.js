import Vue from 'vue';
import vmodal from 'vue-js-modal';
import loader from 'vue-ui-preloader';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, alpha_num } from 'vee-validate/dist/rules';
import App from './App';
import store from './store';
import './mixins';
import '../node_modules/ps-gui-css/dist/ps.css';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('alpha_num', {
  ...alpha_num,
  message: 'Only letters or numbers'
});

Vue.config.productionTip = false;
Vue.use(vmodal);
Vue.use(loader);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  el: '#app',
  store,
  render(h) {
    return h(App);
  },
});