import Map from './components/Map.vue';
import Profile from './components/Profile.vue';

export default [
  {
    path: '/',
    name: 'Map',
    component: Map
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
];