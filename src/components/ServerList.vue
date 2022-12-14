<template>
  <div class="server-list">
    <div class="server-list__container">
      <div class="server-list__panel ps-panel ps-panel--yellow">
        <div class="server-list__table">
          <div  class="server-list__table-caption">
            <div class="server-list__cell server-list__cell-server-name">Server name</div>
            <div class="server-list__cell server-list__cell-players">Players</div>
            <div class="server-list__cell server-list__cell-status-server">Status</div>
          </div>
          <div class="server-list__table-rows">
            <div 
              v-for="(server, index) in servers"
              :key="index"
              class="ps-panel server-list__table-row"
              :class="{ 'server-list__table-row--active': index === selectedServerIndex }"
              @click="selectServerIndex(index)"
            >
              <div class="server-list__cell server-list__cell-server-name">{{ server.name }}</div>
              <div class="server-list__cell server-list__cell-players">
                {{ server.players.online }} / {{ server.players.max }}
              </div>
              <div class="server-list__cell server-list__cell-status-server">
                <ServerStatus :signal-quality="3" />
              </div>
            </div>
            <div v-if="servers.length === 0" class="server-list__empty">No servers</div>
          </div>
        </div>
        <div class="server-list__buttons">
          <button
            type="button"
            class="server-list__button ps-button ps-button--green"
            @click="onClickConnect"
          >
            Connect
          </button>
          <button
            type="button"
            class="server-list__button ps-button ps-button--green"
          >
            Refresh
          </button>
          <button
            type="button"
            class="server-list__button ps-button ps-button--green"
            @click="onLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import ServerStatus from './ServerStatus';

@Component({
  components: {
    ServerStatus
  },
  methods: {
    ...mapMutations([
      'SET_TOKEN'
    ])
  }
})
export default class ServerList extends Vue {
  selectedServerIndex = null;
  servers = [
    {
      name: 'Pixel survival official server',
      host: 'localhost',
      port: 7777,
      players: {
        online: 0,
        max: 32
      }
    },
    {
      name: 'Pixel survival official server',
      host: 'localhost',
      port: 7777,
      players: {
        online: 0,
        max: 32
      }
    },
    {
      name: 'Pixel survival official server',
      host: 'localhost',
      port: 7777,
      players: {
        online: 0,
        max: 32
      }
    },
    {
      name: 'Pixel survival official server',
      host: 'localhost',
      port: 7777,
      players: {
        online: 0,
        max: 32
      }
    },
    {
      name: 'Pixel survival official server',
      host: 'localhost',
      port: 7777,
      players: {
        online: 0,
        max: 32
      }
    },
    {
      name: 'Pixel survival official server',
      host: 'localhost',
      port: 7777,
      players: {
        online: 0,
        max: 32
      }
    },
    {
      name: 'Pixel survival official server',
      host: 'localhost',
      port: 7777,
      players: {
        online: 0,
        max: 32
      }
    }
  ]

  selectServerIndex(index) {
    this.selectedServerIndex = index;
  }

  onClickConnect() {
    const server = this.servers[this.selectedServerIndex];

    this.$emit('selected', server);
  }

  onLogout() {
    this.SET_TOKEN(null);
  }
}
</script>

<style lang="scss">
.server-list {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  &__empty {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__panel {
    width: 650px;
  }

  &__table {
    margin-bottom: 12px;
  }

  &__table-rows {
    height: 258px;
    padding-right: 6px;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #e5e5e5;
      box-shadow: inset 0px 0px 0px 2px #fff;
      border: 2px solid rgba(0, 0, 0, 0.15);
    }
  }

  &__table-caption {
    display: flex;
    padding: 12px 30px 12px 12px;
  }

  &__cell-server-name {
    width: 70%;
  }

  &__cell-players {
    width: 15%;
    text-align: center;
  }

  &__cell-status-server {
    width: 15%;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  &__table-row {
    display: flex;
    padding: 12px 12px;
    margin-bottom: 12px;
    transition: all, .25s;
    cursor: pointer;

    &:hover {
      filter: brightness(105%);
    }

    &--active {
      filter: brightness(110%);

      &:hover {
        filter: brightness(110%);
      }
    }

    &:last-child {
      margin-bottom: 0px;
    }
  }

  &__buttons {
    display: flex;
    gap: 12px;
  }

  &__button {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    padding: 6.5px 0px;
  }
}
</style>