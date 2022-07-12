import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return state.token !== null;
    }
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data;
    }
  }
});