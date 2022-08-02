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

  async connect() {
    const ip = this.$config.gameserver.ip;
    const port = this.$config.gameserver.port;
    const gameClient = new GameClient({
      ip,
      port
    });

    this.isPreload = true;

    const responce = await gameClient.connect(this.token);

    if (!responce) {
      this.SET_TOKEN(null);
    }

    this.isPreload = false;

    return responce;
  }
  
  loadGame() {
    const field = this.$refs.field;
    const elpy = new Elpy(field, window.width, window.height);
    const test = elpy.create('test', 10, 10, 20, 20);

    elpy.add(test);
    elpy.load();
  }

  async mounted() {
    const responce = await this.connect();

    if (responce) {
      this.loadGame();
    } else {
      this.$modal.show('login-failed', {
        text: this.$translator.translate('connection-errors.gameserver.auth')
      });
    }
  }
}
</script>

<style scoped>
canvas {
  background: white;
}
</style>