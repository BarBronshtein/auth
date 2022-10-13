<template>
  <header v-if="user" class="app-header">
  </header>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'app-header',
  components: {},

  computed: {
    ...mapState(useUserStore, ['user']),
  },
})
</script>

<style lang="scss" scoped>

</style>