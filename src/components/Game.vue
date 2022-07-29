<template>
    <div>
      <canvas ref="field"></canvas>
    </div>
</template>
<script>
import { Vue, Component } from 'vue-property-decorator';
import Elpy from 'elpy';

@Component()
export default class Game extends Vue {
  mounted() {
    const field = this.$refs.field;
    const elpy = new Elpy(field, 400, 400);

    const test = elpy.create('test', 10, 10, 20, 20);

    elpy.add(test);

    elpy.load();
  }
}
</script>