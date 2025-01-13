<template>
    <div class="aside" :style="{ left: asideLeft }" @mouseover="mouseOverAside" @mouseleave="mouseLeaveAside">
        <img class="logo" src="@/assets/logo.png"/>
        <div class="subMenuDiv">
            <a class="subMenu" v-for="subMenu in subMenuList" :href="subMenu.url">{{  subMenu.label }}</a>
        </div>
        <button class="asideBtn" disabled>{{ asideBtn }}</button>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const asideLeft = ref('-275px');
const asideBtn = ref('▶');

function mouseOverAisde() {
    asideLeft.value = '0';
    asideBtn.value = '◀';
}

function mouseLeaveAside() {
    asideLeft.value = '-275px';
    asideBtn.value = '▶';
}

const subMenuList = ref([]);
subMenuList.value = [
    {label: '서브메뉴1', url: '/'}
    , {label: '서브메뉴2', url: '/'}
    , {label: '서브메뉴3', url: '/'}
    , {label: '서브메뉴4', url: '/'}
    , {label: '서브메뉴5', url: '/'}
];
</script>
<style scoped>
.aside {
    position: absolute;
    width: 300px;
    height: 100%;
    background-color: rgb(203, 187, 171);
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease;
    z-index: 9999;
    align-items: center;
}
.asideBtn {
    position: absolute;
    top: 50%;
    right: 0px;
    border: none;
    background-color: inherit;
}
.logo {
    width: 150px;
    height: 150px;
}
.subMenuDiv {
    width: 80%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10%;
}
.subMenu {
    font-family: fantasy;
    font-size: 1.1rem;
    color: white;
    text-decoration: none;
}
</style>