<template>
  <div id="app">
    <Login v-if="!isAuthenticated" />
    <Game v-if="isAuthenticated" />
    <ModalLoginFailed />
  </div>
</template>

<script>
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex'
import Login from './components/Login';
import Game from './components/Game';
import ModalLoginFailed from './components/Modals/ModalLoginFailed';
import GameClient from './core/GameClient';

@Component({
  components: {
    Login,
    Game,
    ModalLoginFailed
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'token'
    ])
  }
})
export default class App extends Vue {
  @Watch('isAuthenticated')
  _isAuthenticated() {
    const ip = this.$config.gameserver.ip;
    const port = this.$config.gameserver.port;
    const gameClient = new GameClient({
      ip,
      port
    });

    gameClient.connect(this.token);
    gameClient.on('auth', this.onAuth);
  }

  onAuth(data) {
    console.log(data);
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial; 
}

.valid {
  border-color: #28a745 !important;
}

.invalid {
  border-color: #dc3545 !important;
}
</style>