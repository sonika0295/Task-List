

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';


const app = createApp(App);
app.use(router);
app.mount('#app');