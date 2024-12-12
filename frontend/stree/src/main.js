import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router';
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import StyleClass from 'primevue/styleclass';
import 'primeflex/primeflex.css';
import Ripple from 'primevue/ripple';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import Avatar from 'primevue/avatar';
import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Button', Button);
app.component('Drawer', Drawer);
app.component('Avatar', Avatar);
app.component('Menubar', Menubar);
app.component('Badge', Badge);
app.component('InputText', InputText);

app.directive('styleclass', StyleClass);
app.directive('ripple', Ripple)

app.mount('#app')