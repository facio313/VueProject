<script setup>
import Header from './components/layout/Header.vue'
import Aside from './components/layout/Aside.vue'
import Main from './components/layout/Main.vue'
</script>

<template>
    <Header/>
    <Aside/>
    <Main/>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
