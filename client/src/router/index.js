import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../Layouts/DefaultLayout.vue'
import AuthLayout from '../Layouts/AuthLayout.vue'
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import PokemonDetails from '../pages/PokemonDetails.vue';
import Pokemon from '../pages/Pokemon.vue';
import Pokeball from '../pages/Pokeball.vue';
import Accessoires from '../pages/Accessoires.vue';
import PokemonInfo from '../components/PokemonInfo.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'pokemon', name: 'Pokemon', component: Pokemon },
      { path: 'pokemon/:id', name: 'PokemonDetails', component: PokemonDetails, props: true },
      { path: 'pokeball', name: 'Pokeball', component: Pokeball },
      { path: 'accessoires', name: 'Accessoires', component: Accessoires },
    ]
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: Login },
      { path: 'register', name: 'Register', component: Register }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    // meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('jwtToken');
        if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
