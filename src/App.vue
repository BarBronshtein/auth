<script setup lang="ts">
import appHeader from "@/components/app-header.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <app-header />
  <RouterView class="main-layout" />
</template>

<style scoped></style>
