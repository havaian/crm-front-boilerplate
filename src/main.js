import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/main';
import axios from 'axios';

axios.defaults.baseURL = 'https://constructions-map-server.havaian.repl.co';

createApp(App).use(router).mount('#app');