<template>
  <div class="login-form" :class="signup ? 'signup' : ''">
    <div class="form-wrapper">
      <div class="logo">
        <img src="	https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" alt="" />
      </div>
      <div class="form-header">
        <h2>Filler header to fill space</h2>
        <h4>Sign up to see photos and videos from your friends.</h4>
      </div>
      <form class="form" @submit.prevent="formSubmit">
        <div class="input-group">
          <span class="fa-solid fa-email"></span>
          <input @blur="validateForm" ref="email" v-model="credentials.email" type="email" placeholder="Email" required
            :pattern="emailValidation" />
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
        <small class="active" @click="signup = !signup">{{
        signup ? "Login" : "Register"
        }}</small></small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "login-form",
  components: {},
  data() {
    return {
      signup: false,
      icons: ["google", "facebook", "twitter", "github"],
      credentials: { email: "", password: "", fullname: "" },
    };
  },
  methods: {
    validateForm() {
      if (!this.signup) return;
      const elPass = this.$refs.password as HTMLInputElement;
      const elEmail = this.$refs.email as HTMLInputElement;
      const elName = this.$refs.fullname as HTMLInputElement;
      if (this.credentials.password.length < 6) {
        elPass.classList.add("incorrect");
        elPass.classList.remove("correct");
      }
      else {
        elPass.classList.add("correct");
        elPass.classList.remove("incorrect");
      }
      if (this.credentials.email.toLowerCase().match(new RegExp(this.emailValidation))) {

        elEmail.classList.add("correct");
        elEmail.classList.remove("incorrect");
      }
      else {
        elEmail.classList.add("incorrect");
        elEmail.classList.remove("correct");
      }
      if (this.credentials.fullname) {
        elName.classList.add("correct")
        elName.classList.remove("incorrect");
      }
      else {
        elName.classList.add("incorrect")
        elName.classList.remove("correct");
      }
    },
    formSubmit() {
      this.signup;
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
