<template>
  <div>
    <div v-if="signalQuality === 0" class="status-server">
      <div class="ps-panel status-server__line status-server__line-01"></div>
      <div class="ps-panel status-server__line status-server__line-02"></div>
      <div class="ps-panel status-server__line status-server__line-03"></div>
    </div>
    <div v-if="signalQuality === 1" class="status-server">
      <div class="ps-panel ps-panel--red status-server__line status-server__line-01"></div>
      <div class="ps-panel status-server__line status-server__line-02"></div>
      <div class="ps-panel status-server__line status-server__line-03"></div>
    </div>
    <div v-if="signalQuality === 2" class="status-server">
      <div class="ps-panel ps-panel--yellow status-server__line status-server__line-01"></div>
      <div class="ps-panel ps-panel--yellow status-server__line status-server__line-02"></div>
      <div class="ps-panel status-server__line status-server__line-03"></div>
    </div>
    <div v-if="signalQuality === 3" class="status-server">
      <div class="ps-panel ps-panel--green status-server__line status-server__line-01"></div>
      <div class="ps-panel ps-panel--green status-server__line status-server__line-02"></div>
      <div class="ps-panel ps-panel--green status-server__line status-server__line-03"></div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class ServerStatus extends Vue {
  @Prop({default: 0}) signalQuality;
}
</script>

<style lang="scss">
.status-server {
  display: flex;
  align-items: baseline;

  &__line {
    padding: 0px !important;
  }

  &__line-01 {
    margin-right: 2px;
    width: 8px;
    height: 10px;
  }

  &__line-02 {
    margin-right: 2px;
    width: 8px;
    height: 14px;
  }

  &__line-03 {
    width: 8px;
    height: 18px;
  }
}
</style>