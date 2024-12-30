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
import Accessoires from '../pages/user/Accessoires.vue';
import MentionsLegales from '../pages/MentionsLegales.vue';
import Cgv from '../pages/Cgv.vue';
import Politique from '../pages/Politique.vue';
import Panier from '../pages/user/Panier.vue';
import Contact from '../pages/user/contact.vue';
import ProfileCard from '../components/Dashboard/ProfileCard.vue'
import SettingsCard from '../components/Dashboard/SettingsCard.vue'
import Clients from '../pages/admin/Clients.vue'
import PanierInformations from '../pages/user/PanierInformations.vue'
import Loader from '../pages/user/Loader.vue'
const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'pokemon', name: 'Pokemon', component: Pokemon },
      { path: 'pokemon/:id', name: 'PokemonDetails', component: PokemonDetails, props: true },
      { path: 'accessoires', name: 'Accessoires', component: Accessoires },
      { path: 'Loader', name: 'Loader', component: Loader },
      { path: 'mentions-legales', name: 'MentionsLégales', component: MentionsLegales },
      { path: 'conditions-generales-de-vente', name: 'ConditionsGeneraleDeVente', component: Cgv },
      { path: 'politique-de-confidentialite', name: 'PolitiqueDeConfidentialité', component: Politique },
      { path: 'panier', name: 'Panier', component: Panier },
      { path: 'contact', name: 'Contact', component: Contact },
      { path: 'panier/informations', name: 'Informations', component: PanierInformations },
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
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'dashboard/profile', name: 'Profile', component: ProfileCard },
      { path: 'dashboard/setting', name: 'Setting', component: SettingsCard },
      { path: 'dashboard/clients', name: 'Clients', component: Clients },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwtToken');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if ((to.name === 'Login' || to.name === 'Register') && token) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});
export default router;
