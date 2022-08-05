<template>
  <div class="login">
    <div class="login__container">
      <div v-show="!isPreload" class="login__form ps-panel ps-panel--yellow">
        <input
          type="text"
          class="login__input ps-input"
          placeholder="Login"
          autofocus
          v-model="login"
          v-lowercase
          @keydown.enter="auth"
          @keypress="validateInput($event, rules)"
        />
        <input
          type="password"
          class="login__input ps-input"
          placeholder="Password"
          v-model="password"
          @keydown.enter="auth"
        />
        <button
          type="button"
          class="login__button ps-button ps-button--green"
          @click="auth"
        >
          Login
        </button>
      </div>
      <Preloader v-if="isPreload" />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import Preloader from '../components/Preloader';
import LoginClient from '../core/LoginClient';

@Component({
  components: {
    Preloader
  },
  methods: {
    ...mapMutations(['SET_TOKEN'])
  }
})
export default class Login extends Vue {
  login = '';
  password = '';
  isPreload = false;
  loginClient = null;
  rules = /^[a-zA-Z0-9]+$/;
  
  async auth() {
    this.initLoginClient();    
    this.isPreload = true;
    await this.connect();
    this.isPreload = false;
  }

  initLoginClient() {
    const ip = this.$config.loginserver.ip;
    const port = this.$config.loginserver.port;
    
    this.loginClient = new LoginClient({
      ip,
      port
    });
  }

  async connect() {
    const response = await this.loginClient.connect(this.login, this.password);
    
    if (response.status === 'success') {
      this.SET_TOKEN(response.data.token);
    }

    if (response.status === 'error') {
      this.$modal.show('login-failed', {
        text: this.$translator.translate(response.message)
      });
    }
  }

  validateInput(event, rules) {
    const symbol = String.fromCharCode(event.keyCode);

    if(rules.test(symbol)) {
      return true;
    } else {
      event.preventDefault();
    }
  }
}
</script>

<style lang="scss">
.login {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  &__form {
    width: 250px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  }

  &__input {
    margin-bottom: 10px;
  }

  &__button {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    padding: 6.5px 0px;
  }
}
</style>