<template>
  <div class="login-form">
    <div class="form-wrapper">
      <div class="logo">added later...</div>
      <div class="form-header">
        <h4>Sign up to see photos and videos from your friends.</h4>
      </div>
      <form class="form">
        <div class="input-group">
          <span class="fa-solid fa-email"></span>
          <input type="email" placeholder="Email">
        </div>
        <div class="input-group">
          <span class="fa-solid fa-lock"></span>
          <input type="password" placeholder="Password">
        </div>
        <div v-if="signup" class="input-group">
          <span class="fa-solid fa-user"></span>
          <input type="text" placeholder="Full Name">
        </div>
        <button class="action-btn">{{signup ? 'Sign Up' : 'Login'}}</button>
      </form>
      <small>or continue with these social profile</small>
      <div class="social-icons flex">
        <button class="social-btn" v-for="icon in icons">
          <i :class="`fa-brands fa-${icon}`"></i>
        </button>
      </div>
      <small>{{signup ?'Already a member' :'Dont have an account yet'}}? <small class="active">{{signup ?
      'Login' : 'Register'}}</small></small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'login-form',
  components: {},
  data() {
    return {
      signup: false,
      icons: ['google', 'facebook', 'twitter', 'github']
    }
  },
  methods: {},
  computed: {},
  created() { },
  unmounted() { }
})
</script>

<style lang="scss" scoped>

</style>