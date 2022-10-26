// import map_route_default from './map_route';
// import map_route_redirect from './map_route';
// import profile_route_default from '.profile_route';
import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from '../components/main_component.vue';
// import ProfileComponent from '../components/profile_component.vue';
import ProductComponent from '../components/product_component.vue';
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
    // {
    //     path: '/profile',
    //     name: 'Profile',
    //     component: ProfileComponent
    // },
    {
        path: '/product/:id',
        name: 'Product',
        component: ProductComponent
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