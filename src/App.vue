<template>
  <div id="app" class="app">
    <Login v-if="!isAuthenticated" />
    <Game v-if="isAuthenticated" />
    <ModalInfo />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex'
import Login from './components/Login';
import Game from './components/Game';
import ModalInfo from './components/Modals/ModalInfo';

@Component({
  components: {
    Login,
    Game,
    ModalInfo
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ])
  }
})
export default class App extends Vue {
  
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial; 
}

.app {
  height: 100vh;
  background-image: url('./assets/background.jpg');
  background-size: cover;
  background-position: center;
}
</style>