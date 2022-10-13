<template>
  <form v-if="user" class="edit-form">
    <h2>Change Info</h2>
    <p>Changes will be reflected every services</p>
    <div class="img-group-input">
      <div class="img-container">
        <input class="img-input" type="file" />
        <img
          :src="user.photo || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png` "
          alt="">
        <div class="overlay"></div>
      </div>
      <span>Change photo</span>
    </div>
    <div class="input-group">
      <label>Name</label>
      <input v-model="user.fullname" type="text" placeholder="Enter your name...">
    </div>
    <div class="input-group">
      <label>Bio</label>
      <input v-model="user.bio" class="bio" type="text" placeholder="Enter your bio...">
    </div>
    <div class="input-group">
      <label>Phone</label>
      <input v-model="user.phone" type="text" placeholder="Enter your phone...">
    </div>
    <div class="input-group">
      <label>Email</label>
      <input v-model="user.email" type="email" :pattern="emailValidation" placeholder="Enter your name...">
    </div>
    <div class="input-group">
      <label>Password</label>
      <input type="password" v-model="user.password" minlength="6" placeholder="Enter your password...">
    </div>
    <button class="action-btn">Save</button>
  </form>
</template>

<script lang="ts">
import type { User } from '@/stores/user';
import { defineComponent, type PropType } from 'vue';
export default defineComponent({
  name: 'edit-form',
  props: {
    user: {
      type: Object as PropType<User>
    }
  },
  data() {
    return {
    }
  },
  methods: {},
  computed: {
    emailValidation() {
      return `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
