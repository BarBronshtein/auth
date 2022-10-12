<template>
  <!-- <personalInfoHeader /> -->
  <main class="personal-info">
    <h2>Personal info</h2>
    <h4>Basic info,like your name and photo</h4>


  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Profile } from '@/components/profile.vue'
export default defineComponent({
  name: 'personal-info',
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() { },
  unmounted() { }
})
</script>

<style lang="scss" scoped>

</style>