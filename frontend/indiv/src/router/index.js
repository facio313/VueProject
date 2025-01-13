import { createRouter, createWebHistory } from 'vue-router';
// import Home from '/indiv/src/views/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            // component: Home
            component: () => import('@/views/Home.vue')
        },
        /*
        {
            path: '/',
            name: '',
            component: () => import('')
        },
        */
    ]
});

export default router;