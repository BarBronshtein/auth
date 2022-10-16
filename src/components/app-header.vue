<template>
  <header v-if="user" class="app-header flex align-center justify-between">
    <div class="logo"></div>
    <div class="personal-info flex align-center justify-between">
      <!-- TODO:create avatar component -->
      <span>{{user.fullname}}</span>
      <span :class="`fa-solid fa-caret-${isOpen ? 'up' :'down'}`"></span>
    </div>
  </header>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'app-header',
  components: {
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