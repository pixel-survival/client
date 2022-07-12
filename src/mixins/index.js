import Vue from 'vue';

Vue.mixin({
  computed: { 
    $config() {
      if (window.__CONFIG && typeof window.__CONFIG === 'object') {
        return {
          ip: window.__CONFIG.ip || "localhost",
          port: window.__CONFIG.port || "80"
        };
      } else {
        return {
          ip: "localhost",
          port: "80"
        }
      }
    }
  }
});