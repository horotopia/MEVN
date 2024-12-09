<template>
  <div class="min-h-screen flex bg-gray-100">
    <aside class="w-1/6 p-8 bg-white border-r border-gray-300">
      <h2 class="text-2xl font-bold mb-4">Filtres</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block mb-2 text-gray-700">Types de Pokémon</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              class="rounded-md px-6 py-1 font-bold text-white bg-blue-500 col-span-2 transition-all duration-200"
              @click="selectedType = ''"
            >
              TOUS
            </button>
            <button
              v-for="type in availableTypes"
              :key="type.value"
              @click="selectedType = type.value"
              class="rounded-md px-6 py-1 font-bold text-white uppercase text-sm transition-all duration-200"
              :class="[
                getTypeBackgroundColor(type.value),
                selectedType === '' ? 'opacity-100' : 
                selectedType === type.value ? 'opacity-100 ring-2 ring-offset-2 ring-gray-400' : 
                'opacity-70 hover:opacity-100'
              ]"
            >
              {{ type.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block mb-2 text-gray-700">Prix maximum</label>
          <input 
            type="range" 
            v-model="maxPrice" 
            min="0" 
            max="100" 
            class="w-full"
          >
          <span class="text-sm text-gray-600">{{ maxPrice }}€</span>
        </div>
      </div>
    </aside>

    <main class="w-5/6 p-8">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold">Catalogue Pokémon</h1>
        <div class="flex gap-4">
          <span class="text-gray-600">
            {{ filteredPokemons.length }} Pokémon{{ filteredPokemons.length > 1 ? 's' : '' }}
          </span>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>

      <div v-else-if="error" class="text-red-500 text-center py-8">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PokemonCard 
          v-for="pokemon in filteredPokemons" 
          :key="pokemon.id"
          v-bind="pokemon"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </main>
  </div>
</template>

<script>
import PokemonCard from '../components/PokemonCard.vue'

export default {
  name: 'PokemonPage',
  components: {
    PokemonCard
  },
  data() {
    return {
      pokemons: [],
      selectedType: '',
      maxPrice: 100,
      loading: true,
      error: null,
      availableTypes: [
        { value: 'normal', label: 'Normal' },
        { value: 'fire', label: 'Feu' },
        { value: 'water', label: 'Eau' },
        { value: 'grass', label: 'Plante' },
        { value: 'electric', label: 'Électrique' },
        { value: 'ice', label: 'Glace' },
        { value: 'fighting', label: 'Combat' },
        { value: 'poison', label: 'Poison' },
        { value: 'ground', label: 'Sol' },
        { value: 'flying', label: 'Vol' },
        { value: 'psychic', label: 'Psy' },
        { value: 'bug', label: 'Insecte' },
        { value: 'rock', label: 'Roche' },
        { value: 'ghost', label: 'Spectre' },
        { value: 'dragon', label: 'Dragon' },
        { value: 'dark', label: 'Ténèbres' },
        { value: 'steel', label: 'Acier' },
        { value: 'fairy', label: 'Fée' }
      ]
    }
  },
  computed: {
    filteredPokemons() {
      return this.pokemons.filter(pokemon => {
        const matchesType = !this.selectedType || 
          pokemon.types.some(type => type.original === this.selectedType)
        const matchesPrice = pokemon.price <= this.maxPrice
        return matchesType && matchesPrice
      })
    }
  },
  methods: {
    getTypeBackgroundColor(type) {
      const colors = {
        normal: 'bg-gray-400',
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        grass: 'bg-green-500',
        electric: 'bg-yellow-500',
        ice: 'bg-blue-300',
        fighting: 'bg-red-700',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-600',
        flying: 'bg-blue-400',
        psychic: 'bg-pink-500',
        bug: 'bg-green-600',
        rock: 'bg-yellow-800',
        ghost: 'bg-purple-700',
        dragon: 'bg-purple-600',
        dark: 'bg-gray-700',
        steel: 'bg-gray-500',
        fairy: 'bg-pink-400'
      }
      return colors[type] || 'bg-gray-500'
    },
    async fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
        const data = await response.json()

        const pokemonsData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonDetails = await fetch(pokemon.url)
            const details = await pokemonDetails.json()

            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${details.id}`)
            const speciesData = await speciesResponse.json()

            const frenchName = speciesData.names.find(
              name => name.language.name === 'fr'
            )?.name || details.name

            const flavorTextEntry = speciesData.flavor_text_entries.find(
              entry => entry.language.name === 'fr'
            )

            const typeTranslations = {
              normal: 'Normal',
              fire: 'Feu',
              water: 'Eau',
              grass: 'Plante',
              electric: 'Électrique',
              ice: 'Glace',
              fighting: 'Combat',
              poison: 'Poison',
              ground: 'Sol',
              flying: 'Vol',
              psychic: 'Psy',
              bug: 'Insecte',
              rock: 'Roche',
              ghost: 'Spectre',
              dragon: 'Dragon',
              dark: 'Ténèbres',
              steel: 'Acier',
              fairy: 'Fée'
            }

            return {
              id: details.id,
              name: frenchName,
              types: details.types.map(type => ({
                original: type.type.name,
                translated: typeTranslations[type.type.name] || type.type.name
              })),
              description: flavorTextEntry 
                ? flavorTextEntry.flavor_text.replace(/\n|\f/g, ' ') 
                : 'Description non disponible',
              image: details.sprites.other['official-artwork'].front_default,
              price: parseFloat((Math.random() * 100).toFixed(2))
            }
          })
        )

        this.pokemons = pokemonsData
        this.loading = false
      } catch (error) {
        this.error = 'Erreur lors du chargement des Pokémon'
        this.loading = false
        console.error('Erreur:', error)
      }
    },
    handleAddToCart(item) {
      console.log('Ajouté au panier:', item)
    }
  },
  created() {
    this.fetchPokemons()
  }
}
</script>

<style scoped>
.type-button {
  transition: all 0.2s ease-in-out;
}

.type-button:hover {
  transform: translateY(-1px);
}
</style>