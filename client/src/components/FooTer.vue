<template>
  <footer class="h-28 flex justify-between items-center bg-gray-900 p-4 text-white w-full">
    <router-link to="/">
        <img class="size-20 object-cover" src="../assets/img/POKESHOP_LOGO_MOBILE.png" alt="Logo Pokeshop" />
    </router-link>
    <ul class="inline-flex justify-center ml-40">
      <li class="px-4"><router-link to="/mentions-legales" class="hover:underline">Mentions légales</router-link></li> .
      <li class="px-4 text-center"><router-link to="/conditions-generales-de-vente" class="hover:underline">Conditions générales de vente</router-link></li> .
      <li class="px-4"><router-link to="/politique-de-confidentialite" class="hover:underline">Politique de confidentialité</router-link></li>
    </ul>
    <p>Tous droits réservé @Pokeshop</p>
  </footer>
</template>
  
<script>
export default {
  name: 'FooTer'
}
</script>

<style scoped>
</style>