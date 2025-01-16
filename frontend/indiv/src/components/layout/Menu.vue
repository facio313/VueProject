<template>
    <router-link class="menu" v-for="menu in menuList" :id="menu.name" :to="menu.path" @click="selectMenu">
        {{ menu.name }}
    </router-link>
</template>

<script setup>
import { ref } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuList = ref([]);
const menuStore = useMenuStore();
menuList.value = menuStore.mainMenu;

function selectMenu(event) {
    document.querySelectorAll('.menu').forEach(menu => menu.style.color = 'white');
    event.target.style.color = 'black';
    menuStore.setMenu(event.target.id);
}
</script>

<style scoped>
.menu {
    font-family: fantasy;
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
}
</style>