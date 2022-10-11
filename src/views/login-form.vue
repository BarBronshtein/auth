<template>
  <div class="login-form" :class="signup ? 'signup' : ''">
    <div class="form-wrapper">
      <div class="logo">
        <img src="	https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" alt="" />
      </div>
      <div class="form-header">
        <h2>Sign up to see photos and videos from your friends.</h2>
      </div>
      <form class="form" @submit.prevent="formSubmit">
        <h4 v-if="userMsg">{{userMsg}}</h4>
        <div class="input-group">
          <span class="fa-solid fa-email"></span>
          <input @blur="validateForm();isEmailOccupied()" ref="email" v-model="credentials.email" type="email"
            placeholder="Email" required :pattern="emailValidation" />
        </div>
        <div class="input-group">
          <span class="fa-solid fa-lock"></span>
          <input @blur="validateForm" ref="password" v-model="credentials.password" type="password"
            placeholder="Password" minlength="6" required />
        </div>
        <div v-if="signup" class="input-group">
          <span class="fa-solid fa-user"></span>
          <input required @blur="validateForm" ref="fullname" v-model="credentials.fullname" type="text"
            placeholder="Full Name" />
        </div>
        <button class="action-btn">{{ signup ? "Sign Up" : "Login" }}</button>
      </form>
      <small class="text-center">or continue with these social profile</small>
      <div class="social-icons flex">
        <button class="social-btn" v-for="icon in icons">
          <i :class="`fa-brands fa-${icon}`"></i>
        </button>
      </div>
      <small class="text-center">{{ signup ? "Already a member" : "Dont have an account yet" }}?
        <small class="active" @click="signup = !signup;resetFields()">{{
        signup ? "Login" : "Register"
        }}</small></small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { userService } from '@/services/user.service'
import { useUserStore } from '@/stores/user';
import { mapState, mapActions } from "pinia";
export default defineComponent({
  name: "login-form",
  components: {},
  data() {
    return {
      signup: false,
      icons: ["google", "facebook", "twitter", "github"],
      credentials: { email: "", password: "", fullname: "" },
      userMsg: '',
      isOccupied: !null
    };
  },
  methods: {
    ...mapActions(useUserStore, { toSignup: 'signup' }),
    ...mapActions(useUserStore, { toLogin: 'login' }),
    addClass(el: HTMLInputElement, addClass: string, removeClass: string) {
      el.classList.add(addClass);
      el.classList.remove(removeClass);
    },
    validateForm() {
      if (!this.signup) return this.resetFields();
      const elPass = this.$refs.password as HTMLInputElement;
      const elEmail = this.$refs.email as HTMLInputElement;
      const elName = this.$refs.fullname as HTMLInputElement;
      if (elPass.checkValidity()) this.addClass(elPass, 'correct', 'incorrect');
      else
        this.addClass(elPass, 'incorrect', 'correct');
      if (elEmail.checkValidity())
        this.addClass(elEmail, 'correct', 'incorrect');
      else
        this.addClass(elEmail, 'incorrect', 'correct');
      if (elName.value) {
        this.addClass(elName, 'correct', 'incorrect');
      }
      else {
        this.addClass(elName, 'incorrect', 'correct');
      }
    },
    formSubmit() {
      // Signup
      if (this.signup) {
        // If the respond from the server didn't come up yet or came back positive then return
        if (this.isOccupied || this.isOccupied === false) return;
        // Call userStore and signup
        this.toSignup(this.credentials);
      }
      // Login
      this.toLogin(this.credentials);
    },
    async isEmailOccupied() {
      const elEmail = this.$refs.email as HTMLInputElement;
      if (elEmail.checkValidity()) {
        this.userMsg = 'Checking if email is occupied'
        const res = await userService.getUserByEmail(this.credentials.email);
        this.isOccupied = !!res;
        if (this.isOccupied) {
          this.userMsg = 'This email is already occupied please try another email';
          this.addClass(elEmail, 'incorrect', 'correct');
        }
        else {
          this.userMsg = '✔️';
          this.addClass(elEmail, 'correct', 'incorrect');
        }
      }

    },
    resetFields() {
      const elPass = this.$refs.password as HTMLInputElement;
      const elEmail = this.$refs.email as HTMLInputElement;
      elPass.value = elEmail.value = '';
      elPass.classList.remove('correct', 'incorrect');
      elEmail.classList.remove('correct', 'incorrect');
    },
  },
  computed: {
    emailValidation() {
      return `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
