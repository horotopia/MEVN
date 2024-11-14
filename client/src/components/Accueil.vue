<script setup>

import NavBar from './NavBar.vue';
import FooTer from './FooTer.vue';
import CardGrid from './CardGrid.vue';

</script>

<template>
  <NavBar />
  <div class="text-center mt-5">
    <h1 class="text-xl font-bold">Bienvenue sur la page d'accueil</h1>
    <p class="mt-2">Ceci est la page d'accueil de l'application Vue.js.</p>
    <CardGrid />
  </div>
  <FooTer />
</template>