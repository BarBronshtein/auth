<template>
  <profileInfoLabel v-for="(el,i) in data" :key="el.first">
    <template #first><span class="uppercase">{{el.first}}</span></template>
    <template #second>
      <img v-if="!i" :src="el.second">
      <p v-else>{{el.second}}</p>
    </template>
  </profileInfoLabel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import profileInfoLabel from "./profile-info-label.vue";
export default defineComponent({
  name: "profile",
  components: { profileInfoLabel },
  data() {
    return {
      data: [{
        first: 'photo', second: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
      },
      { first: 'name', second: 'Test is In Progress' },
      { first: 'bio', second: '' },
      { first: 'phone', second: '----------' },
      { first: 'email', second: 'test@test.test' },
      { first: 'password', second: '******' }
      ],
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
