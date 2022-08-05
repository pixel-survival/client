<template>
    <div>
      <Preloader v-if="isPreload" />
      <canvas ref="field"></canvas>
    </div>
</template>
<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import Preloader from './Preloader';
import GameClient from './../core/GameClient';
import players from './../core/Players';
import Elpy from 'elpy';

@Component({
  components: {
    Preloader
  },
  computed: {
    ...mapGetters([
      'token',
    ])
  },
  methods: {
    ...mapMutations(['SET_TOKEN'])
  }
})
export default class Game extends Vue {
  isPreload = false;
  gameClient = null;
  elpy = null;

  async connect() {
    const responce = await this.gameClient.connect(this.token);

    if (responce) {
      this.gameEngineInit();
      this.serverEventCallbacksInit();
    } else {
      this.SET_TOKEN(null);
      this.$modal.show('login-failed', {
        text: this.$translator.translate('connection-errors.gameserver.auth')
      });
    }
  }

  gameClientInit() {
    const ip = this.$config.gameserver.ip;
    const port = this.$config.gameserver.port;
    
    this.gameClient = new GameClient({
      ip,
      port
    });
  }
  
  gameEngineInit() {
    const field = this.$refs.field;
   
    this.elpy = new Elpy(field, window.width, window.height);
    this.elpy.load();
  }

  serverEventCallbacksInit() {
      this.gameClient.on('auth', this.onAuth);
      //this.gameClient.on('responce:player:move', this.onPlayerMove);
  }

  onAuth(data) {
    const { login, x, y } = data.user;
    const width = 20;
    const height = 20;
    const player = this.elpy.create(login, x, y, width, height, {
      custom: {
        id: data.user.id
      }
    });
    
    this.elpy.add(player);
    
    players.add(player);
  }

  onPlayerMove(data) {
    const player = players.getById(data.user.id);

    player.move(data.user.x, data.user.y);
  }

  async mounted() {
    this.gameClientInit();
    this.isPreload = true;
    await this.connect();
    this.isPreload = false;
  }
}
</script>

<style scoped>
canvas {
  background: white;
}
</style>