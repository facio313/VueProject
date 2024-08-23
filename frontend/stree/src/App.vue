<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const message = ref('');

onMounted(() => {
  axios.get('/api/hello')
    .then(response => {
      message.value = response.data;
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <hr>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
