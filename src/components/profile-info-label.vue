<template>
  <div class="profile-info-label">
    <slot name="first"></slot>
    <slot name="second"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'profile-info-label',
})
</script>

<style lang="scss" scoped>

</style>