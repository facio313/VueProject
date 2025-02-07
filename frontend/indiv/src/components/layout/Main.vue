<template>
    <main>
        <section>
            <RouterView/>
        </section>
    </main>>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() => {
    if (router.currentRoute.value.path === '/') {
        router.push('/home');
    }
});
</script>

<style scoped>
main {
    background-color: rgb(226, 226, 226);
    padding-left: 50px;
    padding-right: 25px;
    padding-bottom: 50px;
    height: calc(100% - 100px);
    overflow: none;
}
section {
    background-color: white;
    border-radius: 0px 15px 15px 15px;
    padding: 1%;
    height: 100%;
    overflow-y: auto;
    transition: all 0.5s ease;
}
</style>