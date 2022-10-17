<template>
  <section @click.stop="" class="profile-modal modal">
    <div class="modal-wrapper">
      <div v-for="(label,i) in data" :key="label.title" class="modal-item" :class="!i ? 'active':''">
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
      data: [{ icon: 'circle-user', title: 'my profile' }, { icon: 'user-group', title: 'messanger' }, { icon: 'right-from-bracket', title: 'logout' }]
    }
  },
  methods: {},
})
</script>

<style lang="scss" scoped>

</style>