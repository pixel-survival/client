<template>
  <modal
    name="login-failed"
    classes="ps-panel"
    @before-open="onBeforeOpen"
  >
    <div class="login-failed__container"> 
      <div class="login-failed__text">{{ text }}</div>
      <button 
        type="button"
        class="login__button ps-button ps-button--blue"
        @click="close"
      >
        Ok
      </button>
    </div>
  </modal>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ModalLoginFailed extends Vue {
    text = '';

    onBeforeOpen(event) {
      this.text = event.params.text;
    }

    close() {
      this.$modal.hide('login-failed');
    }
}
</script>

<style lang="scss">
.login-failed {
  &__container {
    color: #fff;
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  &__text {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 100px;
    line-height: 24px;
    color: #000;
  }
}
</style>