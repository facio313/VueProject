<template>
    <h1>Home</h1>
    <input type="text"/>
    <button @click="insert">입력</button>
    <div>{{ inputValue }}</div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
function insert() {
    inputValue.value = document.querySelector('input').value;
}
</script>

<style scoped>

</style>