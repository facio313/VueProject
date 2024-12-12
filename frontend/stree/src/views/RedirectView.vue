<template>

</template>

<script setup>
import router from '../router';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
const route = useRoute();
const path = route.query.path

delete route.query['path'];
onMounted(() => {
    router.push({
        path: path
        , query: route.query
    });
});
</script>