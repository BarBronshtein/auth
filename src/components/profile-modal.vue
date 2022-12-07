<template>
  <section @click.stop="" class="profile-modal modal">
    <div class="modal-wrapper">
      <div v-for="label in data" :key="label.title" class="modal-item"
        :class="location === label.location.substring(1) ? 'active' : ''"
        @click="$emit(label.action, label.title); customEventEmit(label.action, label.location === '/chats' ? '/chats/' : label.location)">
        <span :class="`fa-solid fa-${label.icon}`"></span>
        <span class="title">{{ label.title }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
type Data = { icon: string; title: string; action: 'onGoTo' | 'onLogout', location: string }

import { defineComponent } from 'vue';
export default defineComponent({
  name: 'profile-modal',
  data(): { data: Data[] } {
    return {
      data: [{ icon: 'circle-user', title: 'my profile', action: 'onGoTo', location: '/profile' }, { icon: 'user-group', title: 'messanger', action: 'onGoTo', location: '/chats' }, { icon: 'right-from-bracket', title: 'logout', action: 'onLogout', location: '/' }]
    }
  },

  computed: {
    location() {
      const splits = window.location.href.split('/');
      if (splits.at(-2) === 'chats') return 'chats'
      if (splits.at(-1) === 'personal-info' || splits.at(-1) === 'edit' || splits.at(-1) === 'profile-edit') return 'profile'
      return splits.at(-1);
    }
  },
  methods: {
    customEventEmit(eventName: 'onGoTo' | 'onLogout', data?: string) {
      window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    }
  }
})
</script>

<style lang="scss" scoped>

</style>