<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-5 mt-16 mb-20">
    <div v-for="(pokemon, index) in pokemonProducts" :key="index" class="bg-gray-100 border border-gray-300 rounded-lg p-5 text-center transition-transform transform hover:scale-105 hover:border-orange-500">
      <img :src="pokemon.image" alt="Image du produit" class="w-full h-auto mb-4">
      <div>
        <h3 class="text-xl font-semibold mb-2">{{ pokemon.name }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ pokemon.description }}</p>
        <p class="text-lg font-bold">{{ pokemon.price }} €</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        // Simuler une liste de produits Pokémon
        pokemonProducts: [
          {
            name: 'Pikachu Figurine',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
            description: 'Figurine officielle de Pikachu',
            price: 19.99
          },
          {
            name: 'Eevee Peluche',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
            description: 'Peluche officielle de Eevee',
            price: 24.99
          },
          {
            name: 'Charizard Poster',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
            description: 'Poster mural de Charizard',
            price: 9.99
          },
          {
            name: 'Pokeball Clé USB',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            description: 'Clé USB en forme de Pokéball',
            price: 12.99
          },
          {
            name: 'Snorlax Coussin',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png',
            description: 'Coussin géant Snorlax',
            price: 39.99
          }
        ] 
      };
    }
  };
  </script>
  