<script setup lang="ts">
import { ref } from "vue";
import Header from "@/layout/header/Header.vue";
import Footer from "@/layout/footer/Footer.vue";
</script>

<template>
  <div>
    <div class="layout-navbar"><Header /></div>
    <!-- <div class="layout-sidebar">Aside</div> -->

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
    </div>

    <div class="layout-footer"><Footer /></div>
  </div>
</template>

<style scoped>
.layout-navbar {
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%;
  backdrop-filter: blur(5px);
  z-index: 1;
}

.layout-main-container {
  margin-top: 50px;
}
</style>
