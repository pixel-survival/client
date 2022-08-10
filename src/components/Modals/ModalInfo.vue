<template>
  <modal
    :name="name"
    classes="ps-panel"
    @before-open="onBeforeOpen"
  >
    <div class="modal-info__container"> 
      <div class="modal-info__text">{{ text }}</div>
      <button
        type="button"
        class="modal-info__button ps-button ps-button--blue"
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
export default class ModalInfo extends Vue {
    name = 'info';
    text = '';

    onBeforeOpen(event) {
      this.text = event.params.text;

    }

    close() {
      this.$modal.hide(this.name);
    }
}
</script>

<style lang="scss">
.modal-info {
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

  &__button {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    padding: 6.5px 0px;
  }
}
</style>