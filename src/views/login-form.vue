<template>
  <div class="login-form" :class="signup ? 'signup' : ''">
    <div class="form-wrapper">
      <div class="logo">
        <img class="img-logo" src="../assets/imgs/ChattyHub.logo.png" alt="" />
      </div>
      <div class="form-header">
        <h2>Sign up to chat and see photos and videos from your friends.</h2>
      </div>
      <form class="form" @submit.prevent="formSubmit">
        <h4 style="color: red; margin-bottom: 1rem; min-height: 3rem">{{ userMsg }}</h4>
        <div class="input-group">
          <span class="fa-solid fa-email"></span>
          <input @blur="
            validateForm();
          isEmailOccupied();
          " ref="email" v-model="credentials.email" type="email" placeholder="Email" required
            :pattern="emailValidation" autocomplete="username" />
        </div>
        <div class="input-group">
          <span class="fa-solid fa-lock"></span>
          <input @blur="validateForm" ref="password" v-model="credentials.password" type="password" placeholder="Password"
            minlength="6" required autocomplete="current-password" />
        </div>
        <div v-if="signup" class="input-group">
          <span class="fa-solid fa-user"></span>
          <input required @blur="validateForm" ref="fullname" v-model="credentials.fullname" type="text"
            placeholder="Full Name" autocomplete="name" />
        </div>
        <!-- TODO: Make action-btn a component -->
        <button class="action-btn">{{ signup ? "Sign Up" : "Login" }}</button>
      </form>
      <small class="text-center">or continue with these social profiles</small>
      <div class="social-icons flex">
        <button class="social-btn" style="position: relative" v-for="icon in icons" :key="icon"
          :title="icon !== 'google' ? 'Coming soon...' : ''">
          <button v-if="icon === 'google'" type="button" id="google"
            style="opacity: 0; position: absolute; width: 100%; height: 100%" class="hidden-button" />
          <i :class="`fa-brands fa-${icon}`"></i>
        </button>
      </div>
      <small class="text-center">{{ signup ? "Already a member" : "Dont have an account yet" }}?
        <small class="active" @click="
          signup = !signup;
        resetFields();
        ">{{ signup ? "Login" : "Register" }}</small></small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { userService } from "@/services/user.service";
import { useUserStore } from "@/stores/user";
import { mapActions, mapState } from "pinia";
import jwt_decode from "jwt-decode";
import { utilService } from "@/services/util.service";

export default defineComponent({
  name: "login-form",
  created() {
    // If user is alraedy logged routes you to personal-info  page
    if (this.user) {
      this.$router?.push("/personal-info") ?? this.customEventEmit("onGoTo", "/chats");
      return;
    }
    utilService.waitVarToLoad(utilService.initializeGoogle.bind(null, this.handleCallbackResponse));
  },
  mounted() {
    utilService.waitVarToLoad(utilService.renderGoogleButton);
  },
  data() {
    return {
      signup: false,
      icons: ["google", "facebook", "twitter", "github"],
      credentials: { email: "", password: "", fullname: "" },
      userMsg: "",
      isOccupied: true,
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      toSignup: "signup",
      toLogin: "login",
      googleLogin: "googleLogin",
    }),
    customEventEmit(eventName: "onGoTo" | "onLogout", data?: string) {
      window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    },
    addClass(el: HTMLInputElement, addClass: string, removeClass: string) {
      el.classList.add(addClass);
      el.classList.remove(removeClass);
    },
    validateForm() {
      if (!this.signup) return;
      const elPass = this.$refs.password as HTMLInputElement;
      const elEmail = this.$refs.email as HTMLInputElement;
      const elName = this.$refs.fullname as HTMLInputElement;
      if (elPass.checkValidity()) this.addClass(elPass, "correct", "incorrect");
      else this.addClass(elPass, "incorrect", "correct");
      if (elEmail.checkValidity() && !this.isOccupied)
        this.addClass(elEmail, "correct", "incorrect");
      else this.addClass(elEmail, "incorrect", "correct");
      if (elName.value) {
        this.addClass(elName, "correct", "incorrect");
      } else {
        this.addClass(elName, "incorrect", "correct");
      }
    },
    async formSubmit() {
      try {
        if (this.signup) {
          // If the respond from the server didn't come up yet or came back positive then return
          if (this.isOccupied) return;
          // Call userStore and signup
          await this.toSignup(this.credentials);
        } else await this.toLogin(this.credentials);
        this.resetFields();
        this.$router?.push("/personal-info") ?? this.customEventEmit("onGoTo", "/chats");
      } catch (err) {
        console.log(err);
        this.userMsg = err as string;
      }
    },
    async isEmailOccupied() {
      if (!this.signup) return;
      const elEmail = this.$refs.email as HTMLInputElement;
      if (elEmail.checkValidity()) {
        this.userMsg = "Checking if email is occupied";
        const res = await userService.getUserByEmail(this.credentials.email);
        this.isOccupied = !!res;
        if (this.isOccupied) {
          this.userMsg = "This email is already occupied please try another email";
          this.addClass(elEmail, "incorrect", "correct");
        } else {
          this.userMsg = "";
          this.addClass(elEmail, "correct", "incorrect");
        }
      }
    },
    resetFields() {
      this.userMsg = "";
      const elPass = this.$refs.password as HTMLInputElement;
      const elEmail = this.$refs.email as HTMLInputElement;
      this.credentials.email = this.credentials.password = "";
      elPass.classList.remove("correct", "incorrect");
      elEmail.classList.remove("correct", "incorrect");
    },
    async handleCallbackResponse(response: any) {
      const googleUser: any = jwt_decode(response.credential);
      const user: {
        email: string;
        fullname: string;
        photo?: string;
        password: string;
        googleId: string;
      } = {
        email: googleUser.email,
        fullname: googleUser.name,
        photo: googleUser.picture,
        password: "",
        googleId: googleUser.sub,
      };
      try {
        await this.googleLogin(user);
        this.$router?.push("/personal-info") ?? this.customEventEmit("onGoTo", "/chats");
      } catch (err) {
        console.log(err);
        this.userMsg = err as string;
      }
    },
  },
  computed: {
    emailValidation() {
      return `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;
    },
    ...mapState(useUserStore, ["user"]),
  },
});
</script>

<style lang="scss" scoped></style>
