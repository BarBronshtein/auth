<template>
  <div class="profile-info-label"></div>
  <slot name="first"></slot>
  <slot name="second"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'profile-info-label',
})
</script>

<style lang="scss" scoped>
.profile-info-label {
  display: flex;
  position: relative;
  align-items: center;

  &>* {
    font-weight: 500;
  }

  & [name='first'] {
    position: absolute;
    left: 3rem;
    color: #bdbdbd;
    font-size: rem(13px);
    line-height: lh(18px);
    letter-spacing: -0.035em;
  }

  & [name='second'] {
    margin-left: calc(3rem + rem(190px));
    font-size: 1.125rem;
    letter-spacing: -0.035em;
    color: #333;
    line-height: lh(25px)
  }
}
</style>