<template>
  <div id="app">
    <Login />
    {{ isAuthenticated }}
    <LoginFailed />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex'
import Login from './components/Login';
import LoginFailed from './components/Modals/LoginFailed';

@Component({
  components: {
    Login,
    LoginFailed
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
</style>
