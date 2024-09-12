import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import Avatar from 'primevue/avatar';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Button', Button);
app.component('Drawer', Drawer);
app.component('Avatar', Avatar);

app.directive('styleclass', StyleClass);
app.directive('ripple', Ripple)

app.mount('#app')