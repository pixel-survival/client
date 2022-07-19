<template>
  <div class="login">
    <div class="login__form ps-panel ps-panel--yellow">
      <input
        type="text"
        class="login__input ps-input"
        placeholder="Username"
        v-model="login"
      />
      <input
        type="password"
        class="login__input ps-input"
        placeholder="Password"
        v-model="password"
      />
      <button
        type="button"
        class="login__button ps-button ps-button--green"
        @click="auth"
      >
        Login
      </button>
    </div>
    <loader
      v-show="isPreload"
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
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import LoginClient from '../core/LoginClient';

@Component({
  methods: {
    ...mapMutations(['SET_TOKEN'])
  }
})
export default class Login extends Vue {
  login = '';
  password = '';
  isPreload = false;
  
  async auth() {
    const ip = this.$config.ip;
    const port = this.$config.port;
    const loginClient = new LoginClient({
      ip,
      port
    });
    
    this.isPreload = true;

    const response = await loginClient.auth(this.login, this.password);
    
    if (response === null) {
      this.$modal.show('login-failed', {
        text: 'Нет связи с сервером или отсутствует подключение к интернету, попробуйте позже.'
      });
      this.isPreload = false;

      return;
    }
    
    if (response.status === 'success') {
      this.SET_TOKEN(response.data.token);
      this.isPreload = false;
    }

    if (response.status === 'error') {
      this.$modal.show('login-failed', {
        text: response.message
      });
      this.isPreload = false;
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__form {
    width: 250px;
  }

  &__input {
    margin-bottom: 10px;
  }

  &__button {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }
}
</style>