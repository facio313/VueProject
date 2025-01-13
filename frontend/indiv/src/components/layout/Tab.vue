<template>
    <a class="tab" v-for="(tab, index) in tabList" :key="index" :id="`tab${index}`" @click="activateTab">{{ tab.label }}</a>
</template>

<script setup>
import { ref } from 'vue';

const tabList = ref([]);
tabList.value = [
    {label: '탭1', url: '/'},
    {label: '탭2', url: '/'},
    {label: '탭3', url: '/'},
    {label: '탭4', url: '/'},
    {label: '탭5', url: '/'}
];

function activateTab(event) {
    const allTabs = document.querySelectorAll('.tab');
    allTabs.forEach(tab => {
        tab.style.background = 'rgb(238, 235, 222)';
    });
    event.target.style.background = 'white';
}
</script>

<style scoped>
.tab {
    font-family: fantasy;
    font-size: 1.1rem;
    text-decoration: none;
    padding: 5px;
    width: 10%;
    height: 100%;
    background-color: rgb(238, 235, 222);
    border-radius: 5px 5px 0px 0px;
    border: 1px solid white;
}
</style>