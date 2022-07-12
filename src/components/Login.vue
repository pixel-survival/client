<template>
  <div>
    <input type="text" placeholder="Login" v-model="login">
    <input type="text" placeholder="Login" v-model="password">
    <button @click="auth">Login</button>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapMutations } from 'vuex'
import LoginClient from '../core/LoginClient';

@Component({
  methods: {
    ...mapMutations(['SET_TOKEN'])
  }
})
export default class Login extends Vue {
  login = '';
  password = '';
  
  async auth() {
    const ip = this.$config.ip;
    const port = this.$config.port;
    const loginClient = new LoginClient({
      ip,
      port
    });

    const response = await loginClient.auth(this.login, this.password);

    if (response.status === 'success') {
      this.SET_TOKEN(response.data.token);
      
    } else {
      this.$modal.show('login-failed', {
        text: response.message
      });
    }
  }
}
</script>