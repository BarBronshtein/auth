<template>
  <router-link to="/personal-info">
    &lt; Back </router-link>
  <editForm />
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
import editForm from '@/components/edit-form.vue'
export default defineComponent({
  name: 'personal-info-edit',
  components: { editForm },
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapState(useUserStore, ['user']),
    userToChange() {
      return JSON.parse(JSON.stringify(this.user));
    },

  },
  created() { },
  unmounted() { }
})
</script>

<style lang="scss" scoped>

</style>