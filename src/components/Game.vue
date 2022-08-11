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
import Players from './../core/Players';
import images from './../utils/images';
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
    ...mapMutations([
      'SET_TOKEN'
    ])
  }
})
export default class Game extends Vue {
  players = null;
  isPreload = false;
  gameClient = null;
  elpy = null;

  gameClientInit() {
    const ip = this.$config.gameserver.ip;
    const port = this.$config.gameserver.port;
    
    this.gameClient = new GameClient({
      ip,
      port
    });
  }

  async connect() {
    const responce = await this.gameClient.connect(this.token);

    if (responce) {
      this.players = new Players();
      this.gameEngineInit();
      this.serverEventCallbacksInit();
      this.enterWorld();
    } else {
      this.SET_TOKEN(null);
      this.$modal.show('info', {
        text: this.$translator.translate('connection-errors.gameserver.auth')
      });
    }
  }
  
  gameEngineInit() {
    const field = this.$refs.field;
   
    this.elpy = new Elpy(field, window.width, window.height);
    //fix
    const background = this.elpy.create('background', -2000, -2000, 4000, 4000, { image: { src: images.bg, repeat: true }});
    const ground = this.elpy.create('ground', 100, 100, 64, 64, { image: images.bg02 });

    this.elpy.add(background);
    this.elpy.add(ground);
    //
    this.elpy.click(this.onClickField);
    this.elpy.load();
  }

  serverEventCallbacksInit() {
      this.gameClient.on('world:entered', this.onEnteredWorld);
      this.gameClient.on('player:moving', this.onPlayerMoving);
      this.gameClient.on('disconnect', this.onDisconnect);
  }

  enterWorld() {
    this.gameClient.send('world:enter');
  }

  onEnteredWorld(data) {
    const login = data.user.login;
    const width = 32;
    const height = 42;
    const x = (this.elpy.width / 2) - (width / 2);
    const y = (this.elpy.height / 2) - (height / 2);
    const player = this.elpy.create(login, x, y, width, height, {
      offset: {
        x: true,
        y: true
      },
      main: true,
      custom: {
        id: data.user.id
      },
      image: images.character
    });

    this.elpy.add(player);
    this.players.add(player);
    
    player.move(data.user.x, data.user.y);
  }

  onPlayerMoving(data) {
    const player = this.players.getById(data.id);

    player.move(data.x, data.y);
  }

  onClickField(x, y) {
    const player = this.players.getById(1);

    this.gameClient.send('player:move', {
      x: Math.floor(x + player.offset.x - (player.width / 2)),
      y: Math.floor(y + player.offset.y - (player.height / 2))
    });
  }

  onDisconnect() {
    this.SET_TOKEN(null);
    this.$modal.show('info', {
      text: this.$translator.translate('disconnect.gameserver')
    });
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