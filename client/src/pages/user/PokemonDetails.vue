<script>

import NavBar from '../../components/NavBar.vue';
import FooTer from '../../components/FooTer.vue';
import PokemonInfo from '../../components/PokemonInfo.vue';

export default{
  components: { NavBar, FooTer, PokemonInfo },
}
</script>

<template>
  <NavBar />
  <div class="min-h-screen backdrop-brightness-50">
    Mon Pokémon
    <PokemonInfo 
      :id="pokemon.id"
    />
  </div>
  <FooTer />
</template>