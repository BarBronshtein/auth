<template>
  <section v-if="user" class="edit-form">
    <h2>Change Info</h2>
    <p>Changes will be reflected every services</p>
    <div class="img-group-input">
      <input class="img-input" type="file" />
      <span>Change photo</span>
    </div>
    <div class="input-group">
      <label>Name</label>
      <input type="text" placeholder="Enter your name...">
    </div>
    <div class="input-group">
      <label>Bio</label>
      <input type="text" placeholder="Enter your bio...">
    </div>
    <div class="input-group">
      <label>Phone</label>
      <input type="text" placeholder="Enter your phone...">
    </div>
    <div class="input-group">
      <label>Email</label>
      <input type="email" :pattern="emailValidation" placeholder="Enter your name...">
    </div>
    <div class="input-group">
      <label>Email</label>
      <input type="password" minlength="6" placeholder="Enter your password...">
    </div>
    <button class="action-btn">Save</button>
  </section>
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
