<template>
  <div id="app" class="app">
    <Login v-if="!isAuthenticated" />
    <ServerList
      v-if="isAuthenticated && !isServerSelected"
      @selected="onServerSelect"
    />
    <Game
      v-if="isAuthenticated && isServerSelected"
      :host="host"
      :port="port"
      @connection-error="onGameConnectionError"
    />
    <ModalInfo />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex'
import Login from './components/Login';
import ServerList from './components/ServerList';
import Game from './components/Game';
import ModalInfo from './components/Modals/ModalInfo';

@Component({
  components: {
    Login,
    ServerList,
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
  isServerSelected = false;
  host = null;
  port = null;

  onServerSelect(server) {
    this.host = server.host;
    this.port = server.port;
    this.isServerSelected = true;
  }

  onGameConnectionError() {
    this.isServerSelected = false;
    this.host = null;
    this.port = null;
  }
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