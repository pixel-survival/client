<template>
  <div id="app">
    <Login />
    <ModalLoginFailed />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex'
import Login from './components/Login';
import ModalLoginFailed from './components/Modals/ModalLoginFailed';

@Component({
  components: {
    Login,
    ModalLoginFailed
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
})
export default class App extends Vue {
  
}
</script>

<style>
body {
  margin: 0;
}

.valid {
  border-color: #28a745 !important;
}

.invalid {
  border-color: #dc3545 !important;
}
</style>