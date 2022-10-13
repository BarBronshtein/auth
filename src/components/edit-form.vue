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
      <input ref="fullname" v-model="user.fullname" type="text" placeholder="Enter your name..." required>
    </div>
    <div class="input-group">
      <label>Bio</label>
      <textarea name="bio" class="bio" cols="30" rows="10" v-model="user.bio"
        placeholder="Enter your bio..."></textarea>
      <!-- <input v-model="user.bio" class="bio" type="text" placeholder="Enter your bio..."> -->
    </div>
    <div class="input-group">
      <label>Phone</label>
      <input v-model="user.phone" type="text" placeholder="Enter your phone...">
    </div>
    <div class="input-group">
      <label>Email</label>
      <input ref="email" v-model="user.email" type="email" :pattern="emailValidation" placeholder="Enter your name..."
        required>
    </div>
    <div class="input-group">
      <label>Password</label>
      <input ref="password" type="password" v-model="user.password" minlength="6" placeholder="Enter your password..."
        required>
    </div>
    <button class="action-btn">Save</button>
  </form>
</template>

<script lang="ts">
import { userService } from '@/services/user.service';
import type { User } from '@/stores/user';
import { defineComponent, type PropType } from 'vue';
export default defineComponent({
  name: 'edit-form',
  props: {
    user: {
      type: Object as PropType<User>
    }, originalEmail: String
  },
  data() {
    return {
      isOccupied: false,
      userMsg: '',
    }
  },
  methods: {
    addClass(el: HTMLInputElement, addClass: string, removeClass: string) {
      el.classList.add(addClass);
      el.classList.remove(removeClass);
    },
    async isEmailOccupied() {
      if (!this.user) return;
      if (this.user.email === this.originalEmail) return;
      // Convert isOccupied to true until server respond comes back
      this.isOccupied = true;
      const elEmail = this.$refs.email as HTMLInputElement;
      if (elEmail.checkValidity()) {
        this.userMsg = "Checking if email is occupied";
        const res = await userService.getUserByEmail(this.user.email);
        this.isOccupied = !!res;
        if (this.isOccupied) {
          this.userMsg = "This email is already occupied please try another email";
          this.addClass(elEmail, "incorrect", "correct");
        } else {
          this.userMsg = "✔️";
          this.addClass(elEmail, "correct", "incorrect");
        }
      }
    },
  },
  computed: {
    emailValidation() {
      return `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
