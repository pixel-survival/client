<template>
    <div>
      <Preloader v-if="isPreload" />
      <canvas ref="field"></canvas>
    </div>
</template>
<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
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
  @Prop() ip;
  @Prop() port;

  players = null;
  currentPlayer = null;
  isPreload = false;
  gameClient = null;
  elpy = null;

  gameClientInit() {  
    this.gameClient = new GameClient({
      ip: this.ip,
      port: this.port
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
      this.$emit('connection-error');
      this.$modal.show('info', {
        text: this.$translator.translate('connection-errors.gameserver.auth')
      });
    }
  }
  
  gameEngineInit() {   
    this.elpy = new Elpy(this.$refs.field, window.width, window.height);
    //fix
    const background = this.elpy.create('background', -2000, -2000, 4000, 4000, { image: { src: images.bg, repeat: true }});
    const ground = this.elpy.create('ground', 100, 100, 64, 64, { image: images.bg02 });
    //
    this.elpy.add(background);
    this.elpy.add(ground);
    this.elpy.click(this.onClickField);
    this.elpy.load();
  }

  serverEventCallbacksInit() {
      this.gameClient.on('world:entered', this.onWorldEntered);
      this.gameClient.on('world:welcome', this.onWorldWelcome);
      this.gameClient.on('player:moving', this.onPlayerMoving);
      this.gameClient.on('disconnect', this.onDisconnect);
  }

  enterWorld() {
    this.gameClient.send('world:enter');
  }

  addPlayersFromServer(players) {
    const width = 32;
    const height = 42;

    for(let i = 0; i < players.length; i++) {
      const player = players[i];
      const playerObject = this.elpy.create(player.login, player.x, player.y, width, height, {
        custom: {
          id: player.id
        },
        image: images.character
      });

      this.elpy.add(playerObject);
      this.players.add(playerObject);
    }
  }

  onWorldEntered(data) {
    const login = data.player.login;
    const width = 32;
    const height = 42;
    const x = (this.elpy.width / 2) - (width / 2);
    const y = (this.elpy.height / 2) - (height / 2);
    const player = this.elpy.create(login, x, y, width, height, {
      custom: {
        id: data.player.id
      },
      image: images.character
    });
    
    this.elpy.add(player);
    this.players.add(player);
    
    player.move(data.player.x, data.player.y);
  }

  onWorldWelcome(data) {
    const login = data.player.login;
    const width = 32;
    const height = 42;
    const x = (this.elpy.width / 2) - (width / 2);
    const y = (this.elpy.height / 2) - (height / 2);
    
    this.currentPlayer = this.elpy.create(login, x, y, width, height, {
      custom: {
        id: data.player.id
      },
      image: images.character
    });
    this.elpy.add(this.currentPlayer);
    this.players.add(this.currentPlayer);
    this.currentPlayer.move(data.player.x, data.player.y);
    this.elpy.fixingCamera(this.currentPlayer, {
      x: true,
      y: true
    });
    this.addPlayersFromServer(data.players);
  }

  onPlayerMoving(data) {
    const player = this.players.getById(data.id);

    player.move(data.x, data.y);
  }

  onClickField(x, y) {
    this.gameClient.send('player:move', {
      x: Math.floor(x + this.currentPlayer.offset.x - (this.currentPlayer.width / 2)),
      y: Math.floor(y + this.currentPlayer.offset.y - (this.currentPlayer.height / 2))
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