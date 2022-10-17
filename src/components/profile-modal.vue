<template>
  <section @click.stop="" class="profile-modal modal">
    <div class="modal-wrapper">
      <div v-for="(label,i) in data" :key="label.title" class="modal-item" :class="!i ? 'active':''"
        @click="$emit(label.action,label.title)">
        <span :class="`fa-solid fa-${label.icon}`"></span>
        <span class="title">{{label.title}}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'profile-modal',
  data() {
    return {
      data: [{ icon: 'circle-user', title: 'my profile', action: 'onGoTo' }, { icon: 'user-group', title: 'messanger', action: 'onGoTo' }, { icon: 'right-from-bracket', title: 'logout', action: 'onLogout' }]
    }
  },
  methods: {},
})
</script>

<style lang="scss" scoped>

</style>