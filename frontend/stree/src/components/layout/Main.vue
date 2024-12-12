<template>
    <main>
        <section>
            <MID/>
            <h1>Main Content</h1>
            <p>This is the main content of the page.</p>     
            <h1>{{ message }}</h1>       
            <Map/>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Map from '../map/Map.vue';
import MID from '../../views/Layout_mid.vue';

const message = ref('');

onMounted(() => {
    axios.get('/api/hello')
        .then(response => {
            message.value = response.data;
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
});
</script>

<style scoped>
main {
    margin-top: 5cap;
    padding: 2rem;
    height: calc(100% - 100px);
    overflow-y: auto;
}
section {
    background-color: whitesmoke;
    border-radius: 15px;
    padding: 1%;
    height: 100%;
    overflow-y: auto;
}
</style>