import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/main';
import cors from 'cors';

const corsOption = {
    origin: ['http://localhost'],
};
// app.use(cors(corsOption));
// //if you want in every domain then
// app.use(cors());

createApp(App).use(router).mount('#app');