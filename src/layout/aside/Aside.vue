<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["visibleLeft"]);
</script>

<template>
  <Sidebar v-model:visible="visibleLeft" :baseZIndex="10000">
    <h3>Left Sidebar</h3>
  </Sidebar>
</template>

<style scoped></style>
