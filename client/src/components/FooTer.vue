<template>
  <footer class="bg-gray-900 p-4 text-white w-full flex flex-col md:flex-row justify-between items-center">
    <router-link to="/" class="mb-4 md:mb-0">
      <img class="h-12 object-cover" src="../assets/img/POKESHOP_LOGO_MOBILE.png" alt="Logo Pokeshop" />
    </router-link>
    <ul class="flex flex-col md:flex-row md:justify-center md:ml-40 text-center space-y-2 md:space-y-0 md:space-x-4">
      <li>
        <router-link to="/mentions-legales" class="hover:underline">Mentions légales</router-link>
      </li>
      <li>
        <router-link to="/conditions-generales-de-vente" class="hover:underline">Conditions générales de vente</router-link>
      </li>
      <li>
        <router-link to="/politique-de-confidentialite" class="hover:underline">Politique de confidentialité</router-link>
      </li>
    </ul>
    <p class="text-center mt-4 md:mt-0">Tous droits réservés @Pokeshop</p>
  </footer>
</template>
  
<script>
export default {
  name: 'FooTer'
}
</script>