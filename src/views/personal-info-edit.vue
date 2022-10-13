<template>
  <main class="personal-info-edit">
    <router-link to="/personal-info">
      <span class="fa-solid fa-al"></span> Back
    </router-link>
    <editForm :user=userToChange />
  </main>
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