import Vue from 'vue';
import Translator from './../core/Translator';
import Request from './../core/Request';
import translation from './../data/translation';

Vue.mixin({
  computed: { 
    $config() {
      if (window.__CONFIG && typeof window.__CONFIG === 'object') {
        return window.__CONFIG;
      } else {
        throw new Error('Missing configuration file');
      }
    },
    $translator() {
      return new Translator(translation['ru']);
    },
    $requestMasterServer() {
      return new Request(`http://${this.$config.masterserver.ip}:${this.$config.masterserver.port}`);
    }
  }
});