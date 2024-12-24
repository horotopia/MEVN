<template>
    <div class="min-h-screen flex bg-gray-100">
      <aside class="w-1/6 p-8 bg-white border-r border-gray-300">
        <h2 class="text-2xl font-bold mb-4">Filtres</h2>
        <div>
          <label class="block mb-4 text-sm font-extrabold uppercase tracking-wide text-gray-600">
            Types de Pokémon
          </label>
          <div class="flex flex-col gap-4">
            <button
              class="rounded-lg px-6 py-2.5 font-extrabold text-white bg-[#ff4c4c] border-2 border-[#D43C3C] transition-all duration-200 hover:bg-[#CC3C3C] hover:border-[#A82E2E] flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4c4c] focus:ring-offset-2"
              @click="typeSelectionne = ''"
              :class="typeSelectionne === '' ? 'ring-2 ring-[#ff4c4c] ring-offset-2' : ''"
            >
              TOUS
            </button>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="type in typesDisponibles"
                :key="type.value"
                @click="typeSelectionne = type.value"
                class="rounded-lg px-4 py-2 font-extrabold text-white uppercase text-sm transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#ff4c4c] focus:ring-offset-2"
                :class="[
                  obtenirCouleurType(type.value),
                  typeSelectionne === '' ? 'opacity-100 hover:brightness-90' : 
                  typeSelectionne === type.value ? 'opacity-100 ring-2 ring-[#ff4c4c] ring-offset-2 hover:brightness-90' : 
                  'opacity-70 hover:opacity-100'
                ]"
              >
                {{ type.label }}
              </button>
            </div>
          </div>
        </div>

        <hr class="border-t-2 border-gray-200" />

        <div>
          <label class="block mb-4 text-sm font-extrabold uppercase tracking-wide text-gray-600">
            Prix maximum
          </label>
          <div class="px-2">
            <input 
              type="range" 
              v-model="prixMaximum" 
              min="0" 
              max="100" 
              step="5"
              class="w-full accent-[#ff4c4c] h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff4c4c] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white focus:outline-none"
            >
            <div class="mt-3 flex justify-between text-sm">
              <span class="text-gray-600">0€</span>
              <span class="font-extrabold text-[#ff4c4c]">{{ prixMaximum }}€</span>
              <span class="text-gray-600">100€</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 p-6">
      <div class="-mx-6 mb-6">
        <div class="max-w-[1400px] mx-auto">
          <div class="banner-container relative">
            <div class="bg-red-500 shadow-md py-6 text-center relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:via-red-500 hover:to-red-500">
              <div class="absolute inset-0 bg-[#ff4c4c] opacity-10"></div>
              <div class="rainbow-gradient absolute inset-0 opacity-0 transition-opacity duration-300"></div>
              <h1 class="text-4xl font-extrabold text-white uppercase tracking-wider relative z-10">
                Catalogue Pokémon
              </h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import PokemonCard from '../components/PokemonCard.vue';
  
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
        this.erreur = 'Erreur lors du chargement des Pokémon';
        this.chargement = false;
        console.error('Erreur:', error);
      }
    },
    gererAjoutPanier(element) {
      console.log('Ajouté au panier:', element)
    },
    filtrerParType(type) {
      this.typeSelectionne = type
      document.querySelector('aside').scrollIntoView({ behavior: 'smooth' })
    }
  },
  created() {
    this.recupererPokemons()
  }
}
</script>

<style scoped>
.pokemon-grid-move {
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.pokemon-grid-enter-active {
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.pokemon-grid-leave-active {
  display: none;
}

.pokemon-grid-enter-from {
  transform: translateX(20px);
}

.rainbow-gradient {
  background: linear-gradient(
    124deg,
    #ff2400,
    #e81d1d,
    #e8b71d,
    #e3e81d,
    #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );
  background-size: 1800% 1800%;
}

.banner-container:hover .rainbow-gradient {
  opacity: 0.8;
  animation: rainbow 8s ease infinite;
}

@keyframes rainbow { 
  0% { background-position: 0% 82% }
  50% { background-position: 100% 19% }
  100% { background-position: 0% 82% }
}
</style>