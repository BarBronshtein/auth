<template>
  <img class="avatar" :style="{width:size||'2rem',height:size||'2rem'}" :src="img">
</template>

<script lang="ts">
import { useUserStore, type User } from '@/stores/user';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'avatar',
  props: {
    size: { type: String },
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    img() {
      if (!this.user) return;
      const curUser = this.user as User
      return curUser.photo || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
