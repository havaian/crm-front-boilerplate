import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from '../components/main_component.vue';
import SingleComponent from '../components/single_component.vue';
import EditComponent from '../components/edit_component.vue';
import AddComponent from '../components/add_component.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: MainComponent,
    },
    {
        path: '/main',
        redirect: '/',
    },
    {
        path: '/single/:id',
        name: 'Single',
        component: SingleComponent
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        component: EditComponent
    },
    {
        path: '/add',
        name: 'Add',
        component: AddComponent
    },
    
];

const router = createRouter({ 
    history: createWebHistory(),
    mode: 'history',
    routes: routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
 });

export default router;