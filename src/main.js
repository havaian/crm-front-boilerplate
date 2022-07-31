import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Map from './components/Map.vue';
import Profile from './components/Profile.vue';

const router = createRouter({ 
    history: createWebHistory(),
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Map',
            component: Map
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }
    ],
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
 });

 createApp(App).use(router).mount('#app');