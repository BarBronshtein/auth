<template>
  <header v-if="user" class="app-header flex align-center justify-between">
    <div class="logo">Temporary Placeholder</div>
    <div class="flex align-center justify-between">
      <avatar :size="'2rem'" />
      <span>{{user.fullname}}</span>
      <span :class="`fa-solid fa-caret-${isOpen ? 'up' :'down'}`"></span>
    </div>
  </header>
</template>

<script lang="ts">
import avatar from './avatar.vue';
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'app-header',
  components: {
    avatar
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