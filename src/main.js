import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/main';
import axios from 'axios';

const app = createApp(App);

// axios.defaults.baseURL = 'http://localhost:3000';

app.use(router).mount('#app');