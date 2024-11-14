<template>
  <NavBar />
    <div class="pokemon-list">
      <div v-if="loading">Chargement...</div>
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-5 mt-6 mb-20">
          <div v-for="pokemon in pokemons" :key="pokemon.name" class="bg-gray-100 border border-gray-300 rounded-lg p-5 text-center transition-transform transform hover:scale-105 hover:border-orange-500">
            <h3 class="text-xl font-semibold mb-2">{{ pokemon.name | capitalize }}</h3>
            <img :src="pokemon.image" :alt="pokemon.name" />
            <router-link :to="`/pokemon/${pokemon.id}`">
              <button>Voir Détails</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  <FooTer />
</template>
  
<script>
import FooTer from './FooTer.vue';
import NavBar from './NavBar.vue';

  export default {
    components: { NavBar, FooTer },
    data() {
      return {
        pokemons: [],
        loading: true
      };
    },
    methods: {
      async fetchPokemons() {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
          const data = await response.json();
          const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon, index) => {
              const res = await fetch(pokemon.url);
              const details = await res.json();
              return {
                id: details.id,
                name: details.name,
                image: details.sprites.front_default
              };
            })
          );
          this.pokemons = pokemonDetails;
        } catch (error) {
          console.error("Erreur lors de la récupération des Pokémon :", error);
        } finally {
          this.loading = false;
        }
      }
    },
    mounted() {
      this.fetchPokemons();
    },
    filters: {
      capitalize(value) {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  };
  </script>
  
  <style scoped>
  .pokemon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  img {
    max-width: 100px;
  }
  button {
    margin-top: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #369b7e;
  }
  </style>