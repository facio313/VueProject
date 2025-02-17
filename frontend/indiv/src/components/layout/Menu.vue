<template>
    <router-link class="menu" v-for="menu in mainMenus" :id="menu.id" :to="menu.path" @click="selectMenu($event)" :style="{ color: menuStore.activeMainMenu == menu.id ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }">
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
    menuStore.setMainMenu(event.target.id);
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