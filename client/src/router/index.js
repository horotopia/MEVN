import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../Layouts/DefaultLayout.vue'
import AuthLayout from '../Layouts/AuthLayout.vue'
import AdminLayout from '../Layouts/AdminLayout.vue'
import Home from '../pages/user/Home.vue';
import Login from '../pages/auth/Login.vue';
import Register from '../pages/auth/Register.vue';
import Dashboard from '../pages/admin/Dashboard.vue';
import PokemonDetails from '../pages/user/PokemonDetails.vue';
import Pokemon from '../pages/user/Pokemon.vue';
import Pokeball from '../pages/user/Pokeball.vue';
import Accessoires from '../pages/user/Accessoires.vue';

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
      { path: 'panier', name: 'Panier' },
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
    path: '/',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
    ]
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
