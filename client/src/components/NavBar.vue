<script>

</script>

<template>
  <div class="bg-red-500 p-4 flex justify-between items-center">
    <div class="logo">
      <router-link to="/">
        <img class="w-1/3" src="../assets/img/POKESHOP_LOGO.png" alt="Logo Pokeshop" />
      </router-link>
    </div>
  </div>
  <nav class="bg-red-400 py-2">
    <ul class="flex space-x-2 justify-center items-center">
      <li><router-link to="/pokemon" class="hover:underline"> Pokémon</router-link> | </li>
      <li><router-link to="/pokeball" class="hover:underline"> Pokéball</router-link> | </li>
      <li><router-link to="/accessoires" class="hover:underline"> Accéssoires</router-link> | </li>
      <li><router-link to="/contact" class="hover:underline"> Contact</router-link> | </li>
      <li><router-link to="/login" class="hover:underline"> Login</router-link> | </li>
    </ul>
  </nav>
</template>