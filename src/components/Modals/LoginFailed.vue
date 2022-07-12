<template>
    <modal name="login-failed" @before-open="onBeforeOpen">
        {{ text }}
    </modal>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LoginFailed extends Vue {
    text = '';

    onBeforeOpen(event) {
        this.text = event.params.text;
    }
}
</script>