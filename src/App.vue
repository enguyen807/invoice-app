<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <router-view></router-view>
</template>

<style>
@font-face {
  font-family: "Raleway-SemiBold";
  src: local("Raleway-SemiBold"),
    url(./assets/fonts/Raleway/Raleway-SemiBold.ttf) format("truetype");
}

@font-face {
  font-family: "Raleway-Bold";
  src: local("Raleway-Bold"),
    url(./assets/fonts/Raleway/Raleway-Bold.ttf) format("truetype");
}

@font-face {
  font-family: "Raleway-Regular";
  src: local("Raleway-Regular"),
    url(./assets/fonts/Raleway/Raleway-Regular.ttf) format("truetype");
}

body {
  background-color: var(--surface-ground);
  margin: 0;
  padding: 0;
  min-height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  font-family: "Raleway-Regular";
}
</style>
