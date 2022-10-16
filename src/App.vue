<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import appHeader from '@/components/app-header.vue';

</script>

<template>
  <app-header class="main-layout" />
  <RouterView class="main-layout" />
</template>

<style scoped>

</style>
