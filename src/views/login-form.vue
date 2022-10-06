<template>
  <div class="form-container">
    <div class="form-wrapper modal">
      <div class="logo">added later...</div>
      <div class="form-header">
        <h3>Sign up to see photos and videos from your friends.</h3>
      </div>
      <form class="form">
        <div class="input-group">
          <i class="icon"></i>
          <input type="email" placeholder="Email">
        </div>
        <div class="input-group">
          <i class="icon"></i>
          <input type="email" placeholder="Email">
        </div>
        <div v-if="signup" class="input-group">
          <i class="icon"></i>
          <input type="password" placeholder="Password">
        </div>
        <button class="action-btn">{{signup ? 'Sign Up' : 'Login'}}</button>
      </form>
      <small>or continue with these social profile</small>
      <div class="social-icons">
        <button class="social-btn" v-for="icon in icons">
          <i :class="icon"></i>
        </button>
      </div>
      <small>{{signup ?'Already a member' :'Dont have an account yet'}}?</small>
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