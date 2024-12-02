<template>
    <div class="min-h-screen flex bg-gray-100">
      <aside class="w-1/6 p-8 bg-white border-r border-gray-300">
        <h2 class="text-2xl font-bold mb-4">Filtres</h2>
        <div>
          <label class="block mb-2 text-gray-700">Type de Pokémon</label>
          <select v-model="selectedType" class="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">Tous</option>
            <option value="fire">Feu</option>
            <option value="water">Eau</option>
            <option value="grass">Plante</option>
            <option value="electric">Électrique</option>
          </select>
        </div>
      </aside>
  
      <main class="w-5/6 p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div v-for="pokemon in filteredPokemons" :key="pokemon.id">
            <PokemonCard 
              :id="pokemon.id"
              :name="pokemon.name"
              :description="pokemon.description"
              :image="pokemon.image"
              :price="pokemon.price"
              :types="pokemon.types" 
            />
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import PokemonCard from '../../components/PokemonCard.vue';
  
  export default {
    components: {
      PokemonCard
    },
    data() {
      return {
        pokemons: [],
        selectedType: ''
      };
    },
    computed: {
      filteredPokemons() {
        if (this.selectedType === '') {
          return this.pokemons;
        }
        return this.pokemons.filter(pokemon => 
          pokemon.types.includes(this.selectedType)
        );
      }
    },
    async created() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();
  
        const pokemonsData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonDetails = await fetch(pokemon.url);
            const details = await pokemonDetails.json();

            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${details.id}`);
            const speciesData = await speciesResponse.json();

            const flavorTextEntry = speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === 'fr'
            );
  
            return {
              id: details.id,
              name: details.name,
              types: details.types.map(type => type.type.name),
              description: flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\n|\f/g, ' ') : 'No description available',
              image: details.sprites.other['official-artwork'].front_default,
              price: (Math.random() * 100).toFixed(2)
            };
          })
        );
  
        this.pokemons = pokemonsData;
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
  };
  </script>