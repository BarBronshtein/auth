<template>
  <!-- <personalInfoHeader /> -->
  <main class="personal-info">
    <h2>Personal info</h2>
    <h4>Basic info,like your name and photo</h4>
    <profile :user="user" />

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import profile from '@/components/profile.vue'
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
export default defineComponent({
  name: 'personal-info',
  components: { profile },
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapState(useUserStore, ['user'])
  },
  created() {
  },
  unmounted() { }
})
</script>

<style lang="scss" scoped>

</style>