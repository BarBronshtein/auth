<template>
  <div>

  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'personal-info-edit',
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapState(useUserStore, ['user']),
    userToChange() {
      return JSON.parse(JSON.stringify(this.user));
    },
    emailValidation() {
      return `[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;
    }
  },
  created() { },
  unmounted() { }
})
</script>

<style lang="scss" scoped>

</style>