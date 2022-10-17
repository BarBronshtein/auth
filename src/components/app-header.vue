<template>
  <header v-if="user" class="app-header align-center justify-between">
    <div class="logo">Logo</div>
    <div class="flex align-center" @click="isOpen=!isOpen">
      <avatar :size="'2rem'" />
      <span>{{user.fullname}}</span>
      <profileModal v-if="isOpen" />
      <span :class="`fa-solid fa-caret-${isOpen ? 'up' :'down'}`"></span>
    </div>
  </header>
</template>

<script lang="ts">
import avatar from './avatar.vue';
import profileModal from './profile-modal.vue';
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'app-header',
  components: {
    avatar,
    profileModal,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
})
</script>

<style lang="scss" scoped>

</style>