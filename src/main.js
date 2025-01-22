

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store.js';
import './common.css';



const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');