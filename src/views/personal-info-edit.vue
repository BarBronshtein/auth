<template>
  <main class="personal-info-edit">
    <router-link to="/personal-info">
      <span class="fa-solid fa-al"></span> Back
    </router-link>
    <editForm :user=userToChange :originalEmail=user?.email @onUpdateUser="update" />
  </main>
</template>

<script lang="ts">
import { useUserStore, type User } from '@/stores/user';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import editForm from '@/components/edit-form.vue'
export default defineComponent({
  name: 'personal-info-edit',
  components: { editForm },
  data() {
    return {}
  },
  methods: {
    ...mapActions(useUserStore, ['updateUser']),
    async update(user: User) {
      await this.updateUser(user);
      this.$router.push('/personal-info');
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    userToChange() {
      return JSON.parse(JSON.stringify(this.user));
    }
  },
  created() {
    if (!this.user) this.$router.push('/');
  },
  unmounted() { }
})
</script>

<style lang="scss" scoped>

</style>