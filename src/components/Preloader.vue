<template>
  <loader
    name="spinning"
    object="#ff9633"
    color1="#ffffff"
    color2="#17fd3d"
    size="12"
    speed="1"
    bg="#343a40"
    objectbg="#999793"
    opacity="80"
    disableScrolling="false"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component()
export default class Preloader extends Vue {

}
</script>
