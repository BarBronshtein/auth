<template>
  <section class="profile main-layout">
    <profileInfoLabel class="first-label">
      <template #first>
        <div>
          <h3>Profile</h3>
          <p>Some info may be visible to others</p>
        </div>
      </template>
      <template #second><button
          @click="$router?.push('/personal-info/edit') ?? customEventEmit('onGoTo', 'profile-edit')"
          class="btn">Edit</button></template>
    </profileInfoLabel>
    <profileInfoLabel class="border-top" v-for="(el, i) in data" :key="el.first">
      <template #first><span class="uppercase first">{{ el.first }}</span></template>
      <template #second>
        <img class="second avatar" v-if="!i" :src="el.second">
        <p class="second" v-else>{{ el.second }}</p>
      </template>
    </profileInfoLabel>
  </section>
</template>

<script lang="ts">
import type { User } from "@/stores/user";
import { defineComponent, type PropType } from "vue";
import profileInfoLabel from "./profile-info-label.vue";
export default defineComponent({
  name: "profile",
  components: { profileInfoLabel },
  props: {
    user: { type: Object as PropType<User | null> }
  },
  data() {
    return {
      data: [{
        first: 'photo', second: this.user?.photo || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
      },
      { first: 'name', second: this.user?.fullname },
      { first: 'bio', second: this.user?.bio ?? '' },
      { first: 'phone', second: this.user?.phone ?? '----------' },
      { first: 'email', second: this.user?.email ?? '' },
      { first: 'password', second: '******' }
      ],
    };
  },
  methods: {
    customEventEmit(eventName: 'onGoTo' | 'onLogout', data?: string) {
      window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    }
  }
});
</script>

<style lang="scss" scoped>

</style>
