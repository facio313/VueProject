<template>
    <div class="header">
        <div class="menuArea">
            <Menu/>
        </div>
        <div class="tabArea">
            <Tab/>
        </div>
    </div>
</template>
<script setup>
import Menu from '@/components/layout/Menu.vue';
import Tab from '@/components/layout/Tab.vue';

</script>
<style scoped>
.header {
    width: 100%;
    height: 100px;
    background-color: rgb(149, 124, 104);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 9999;
}
.menuArea {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.tabArea {
    width: 100%;
    height: 40%;
    padding-left: 50px;
    padding-top: 10px;
    display: flex;
    background-color: rgb(226, 226, 226);
}
</style>