<template>
  <main class="personal-info-edit">
    <router-link to="/personal-info">
      <div @click="customEventEmit('onGoTo', '/personal-info')" class="go-back flex">
        <span class="fa-solid fa-al"></span> Back
      </div>
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
      this.$router?.push('/personal-info') ?? this.customEventEmit('onGoTo', '/personal-info');
    },
    customEventEmit(eventName: 'onGoTo' | 'onLogout', data?: string) {
      window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    userToChange() {
      const userToChange = this.user as User
      return JSON.parse(JSON.stringify(userToChange));
    },

  },
  created() {
    if (!this.user) this.$router?.push('/') ?? this.customEventEmit('onGoTo', '/');
  },
  unmounted() { }
})
</script>

<style lang="scss" scoped></style>