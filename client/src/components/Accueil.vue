<script setup>

import NavBar from './NavBar.vue';
import FooTer from './FooTer.vue';
import CardGrid from './CardGrid.vue';

</script>

<template>
    <NavBar />
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>Ceci est la page d'accueil de l'application Vue.js.</p>
      <CardGrid />
    </div>
    <FooTer />
  </template>
  
  

<style scoped>

h1{
    text-align: center;
    font-size: larger;
    font-weight: bold;
    margin-top: 20px;
}

p{
    text-align: center;
}

</style>