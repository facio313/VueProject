<template>
    <RouterLink class="tab" v-for="tab in tabs" :id="tab.id" :to="tab.path" @click="() => menuStore.activeTab = tab.id" :style="{ background: menuStore.activeTab == tab.id ? 'rgb(255, 255, 255)' : 'rgb(238, 235, 222)' }">
        {{ tab.name }}
        <button class="tabDeleteBtn" @click="menuStore.deleteTab(tab.id)">x</button>
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
    font-family: inherit;
    font-size: 1.1rem;
    text-decoration: none;
    padding: 5px;
    width: 10%;
    height: 100%;
    background: rgb(238, 235, 222);
    border-radius: 5px 5px 0px 0px;
    border: 1px solid white;
}
.tabDeleteBtn {

}
</style>