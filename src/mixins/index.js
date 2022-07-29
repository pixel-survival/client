import Vue from 'vue';

Vue.mixin({
  computed: { 
    $config() {
      if (window.__CONFIG && typeof window.__CONFIG === 'object') {
        return window.__CONFIG;
      } else {
        throw new Error('Missing configuration file');
      }
    }
  }
});