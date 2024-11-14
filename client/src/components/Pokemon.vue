<script>

import NavBar from './NavBar.vue';
import FooTer from './FooTer.vue';
import PokemonList from './PokemonList.vue';

export default{
  components: { NavBar, FooTer, PokemonList },
}
</script>

<template>
  <NavBar />
    <PokemonList />
  <FooTer />
</template>