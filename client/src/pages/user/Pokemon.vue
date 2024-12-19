<template>
  <div class="min-h-screen flex bg-gray-100">
    <aside class="w-72 p-6 bg-white shadow-lg sticky top-0 h-screen overflow-y-auto">
      <h2 class="text-2xl font-extrabold uppercase tracking-wide mb-8 text-gray-800">
        Filtres
      </h2>
      
      <div class="space-y-8">
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
          <div class="bg-[#ff4c4c] shadow-md py-4 text-center">
            <h1 class="text-3xl font-extrabold text-white uppercase tracking-wider">
              Catalogue Pokémon
            </h1>
          </div>
        </div>
      </div>

      <div class="text-center mb-8">
        <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <span class="text-sm font-extrabold text-black">
            {{ pokemonsFiltres.length }}
          </span>
          <span class="ml-1.5 text-sm text-gray-600">
            Pokémon{{ pokemonsFiltres.length > 1 ? 's' : '' }}
          </span>
        </span>
      </div>

      <div v-if="chargement" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>

      <div v-else-if="erreur" class="text-red-500 text-center py-8">
        {{ erreur }}
      </div>

      <transition-group 
        tag="div" 
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1400px] mx-auto"
        name="pokemon-grid"
      >
        <PokemonCard 
          v-for="pokemon in pokemonsFiltres" 
          :key="pokemon.id"
          v-bind="pokemon"
          @ajouter-au-panier="gererAjoutPanier"
          @filtrer-par-type="filtrerParType"
        />
      </transition-group>
    </main>
  </div>
</template>

<script>
import PokemonCard from '../../components/PokemonCard.vue'

export default {
  name: 'PokemonPage',
  components: {
    PokemonCard
  },
  data() {
    return {
      pokemonsParId: {},
      typeSelectionne: '',
      prixMaximum: 100,
      chargement: true,
      erreur: null,
      typeTranslations: {
        normal: 'Normal',
        fire: 'Feu',
        water: 'Eau',
        grass: 'Plante',
        electric: 'Électrik',
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
      },
      typesDisponibles: [
        { value: 'normal', label: 'Normal' },
        { value: 'fire', label: 'Feu' },
        { value: 'water', label: 'Eau' },
        { value: 'grass', label: 'Plante' },
        { value: 'electric', label: 'Électrik' },
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
    pokemonsFiltres() {
      return Object.values(this.pokemonsParId)
        .filter(pokemon => {
          const correspondType = !this.typeSelectionne || 
            pokemon.types.some(type => type.original === this.typeSelectionne)
          const correspondPrix = pokemon.prix <= this.prixMaximum
          return correspondType && correspondPrix
        })
        .sort((a, b) => a.id - b.id)
    }
  },
  methods: {
    obtenirCouleurType(type) {
      const couleurs = {
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
      return couleurs[type] || 'bg-gray-500'
    },
    async recupererPokemons() {
      try {
        const pokemonIds = [
          393, 394, 395,    // Tiplouf -> Prinplouf -> Pingoléon
          92, 93, 94,       // Fantominus -> Spectrum -> Ectoplasma
          25,               // Pikachu
          150,              // Mewtwo
          63, 64, 65,       // Abra -> Kadabra -> Alakazam
          174, 39, 40,      // Toudoudou -> Rondoudou -> Grodoudou
          58, 59,           // Caninos -> Arkanin
          1, 2, 3,         // Bulbizarre -> Herbizarre -> Florizarre
          532, 533, 534,    // Charpenti -> Ouvrifier -> Bétochef
          129, 130         // Magikarp -> Léviator
        ];

        await Promise.all(
          pokemonIds.map(async (id) => {
            try {
              const [pokemonResponse, speciesResponse] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
              ]);

              const [details, speciesData] = await Promise.all([
                pokemonResponse.json(),
                speciesResponse.json()
              ]);

              this.pokemonsParId[id] = {
                id: details.id,
                nom: speciesData.names.find(
                  name => name.language.name === 'fr'
                )?.name || details.name,
                types: details.types.map(type => ({
                  original: type.type.name,
                  translated: this.typeTranslations[type.type.name] || type.type.name
                })),
                description: speciesData.flavor_text_entries.find(
                  entry => entry.language.name === 'fr'
                )?.flavor_text.replace(/\n|\f/g, ' ') || 'Description non disponible',
                image: details.sprites.other['official-artwork'].front_default,
                prix: parseFloat((Math.random() * 100).toFixed(2))
              };

            } catch (error) {
              console.error(`Erreur lors du chargement du Pokémon ${id}:`, error);
            }
          })
        );

        this.chargement = false;
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
</style>
