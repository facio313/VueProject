<template>
    <router-link class="menu" v-for="menu in menuList" :to="menu.url">
        {{ menu.label }}
    </router-link>
</template>

<script setup>
import { ref } from 'vue';
const menuList = ref([]);
menuList.value = [
    {label: 'Home', url: '/'},
    {label: 'Dashboard', url: '/dashboard'},
    {label: 'Thread', url: '/thread'},
    {label: 'Batch', url: '/batch'},
    {label: 'Chart', url: '/chart'},
    {label: 'Map', url: '/map'},
    {label: 'Etc', url: '/etc'}
];
</script>

<style scoped>
.menu {
    font-family: fantasy;
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
}
</style>