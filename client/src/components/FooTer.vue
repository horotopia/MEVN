<template>
  <footer class="h-28 flex justify-between items-center bg-gray-900 p-4 text-white">
    <router-link to="/">
        <img class="w-1/6" src="../assets/img/POKESHOP_LOGO.png" alt="Logo Pokeshop" />
      </router-link>
    <ul>
      <li><router-link to="/mentions-legales" class="hover:underline">Mentions légales</router-link></li>
      <li><router-link to="/conditions-generales-de-vente" class="hover:underline">Conditions générales de vente</router-link></li>
      <li><router-link to="/politique-de-confidentialite" class="hover:underline">Politique de confidentialité</router-link></li>
    </ul>
    <p>Tous droits réservé @Pokeshop</p>
  </footer>
</template>
  
  <script>
  export default {
    name: 'FooTer'
  }
  </script>