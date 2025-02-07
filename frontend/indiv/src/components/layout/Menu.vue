<template>
    <router-link class="menu" v-for="menu in mainMenus" :id="menu.id" :to="menu.path" @click="selectMenu">
        {{ menu.name }}
    </router-link>
</template>

<script setup>
import { ref } from 'vue';
import { useMenuStore } from '@/stores/menu';

const mainMenus = ref([]);
const menuStore = useMenuStore();
mainMenus.value = menuStore.mainMenus;

function selectMenu(event) {
    const targetMenu = event.target;

    document.querySelectorAll('.menu').forEach(menu => menu.style.color = 'white');
    targetMenu.style.color = 'black';

    menuStore.setMenu(targetMenu.id);
    menuStore.setTabs(event);
}
</script>

<style scoped>
.menu {
    font-family: inherit;
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
}
</style>