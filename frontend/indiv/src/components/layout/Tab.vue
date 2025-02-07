<template>
    <RouterLink class="tab" v-for="tab in tabs" :id="tab.name" :to="tab.path" @click="menuStore.activateTab(tab.name)">
        {{ tab.name }}
    </RouterLink>
</template>

<script setup>
import { computed } from 'vue';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const tabs = computed(() => menuStore.tabs);
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