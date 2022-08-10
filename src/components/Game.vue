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

//fix
import bg from '../assets/images/rpgTile019.png';
import bg02 from '../assets/images/rpgTile009.png';
import character from '../assets/characters/front.png';
//

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
    const background = this.elpy.create('background', -2000, -2000, 4000, 4000, {
      image: {
        src: bg,
        repeat: true
      }
    });
    const ground = this.elpy.create('ground', 100, 100, 64, 64, { image: bg02 });

    this.elpy.add(background);
    this.elpy.add(ground);
    this.elpy.click((x, y) => {
      const player = players.getById(1);

      this.gameClient.send('player:move', {
        x: Math.floor(x + player.offset.x - (player.width / 2)),
        y: Math.floor(y + player.offset.y - (player.height / 2))
      });
    });
    //
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
    const x = data.user.x;
    const y = data.user.y;
    const width = 32;
    const height = 42;
    const player = this.elpy.create(login, (this.elpy.width / 2) - (width / 2), (this.elpy.height / 2) - (height / 2), width, height, {
      offset: {
        x: true,
        y: true
      },
      main: true,
      custom: {
        id: data.user.id
      },
      image: character
    });

    this.elpy.add(player);
    
    player.move(x, y);
    players.add(player);
  }

  onPlayerMoving(data) {
    const player = players.getById(data.id);

    player.move(data.x, data.y);
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