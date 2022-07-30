import MapComponent from '../components/map_component.vue';

const map_route_default = [
    {
        path: '/',
        name: 'Map',
        component: MapComponent,
    },
]

const map_route_redirect = [
    {
        path: '/map',
        redirect: '/',
    },
]

export default {
    map_route_default, 
    map_route_redirect
};