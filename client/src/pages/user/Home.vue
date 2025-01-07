<template>
  <div class="flex flex-col min-h-screen bg-[#F2F2F2]">
    <div class="relative h-[600px] w-full overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="@/assets/img/BannierePokemon.jpg" 
          alt="Bannière Pokémon" 
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:to-transparent to-black/40"></div>
        
        <div class="absolute inset-0 max-w-[1400px] mx-auto px-4 h-full flex items-center">
          <div class="w-full md:w-1/2 text-white">
            <h1 class="main-title text-4xl md:text-7xl mb-4 md:mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Adoptez votre<br/>
              compagnon Pokémon
            </h1>
            <p class="text-base md:text-xl mb-6 md:mb-8 font-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              Découvrez notre sélection unique de Pokémon de compagnie.<br/>
              Chaque Pokémon est soigneusement choisi pour devenir<br/>
              votre parfait partenaire d'aventure.
            </p>
            <router-link 
              to="/pokemon" 
              class="bg-white text-[#FF4B4B] px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-bold hover:bg-opacity-90 transition-all shadow-xl inline-block hover:scale-105 duration-300"
            >
              Découvrir nos Pokémon
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[1400px] mx-auto px-4 py-8 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div class="bg-white p-4 md:p-8 rounded-xl text-center">
          <div class="text-[#FF4B4B] text-3xl md:text-4xl mb-3 md:mb-4">🌟</div>
          <h3 class="text-lg md:text-xl font-bold mb-2">
            Retrait en Boutique
          </h3>
          <p class="text-sm md:text-base text-gray-600">
            Venez chercher votre compagnon dans notre boutique spécialisée pour un départ en toute sérénité
          </p>
        </div>
        <div class="bg-white p-8 rounded-xl text-center">
          <div class="text-[#FF4B4B] text-4xl mb-4">🎯</div>
          <h3 class="text-xl font-bold mb-2">Équipement Complet</h3>
          <p class="text-gray-600">Trouvez tous les accessoires nécessaires pour le bien-être de votre Pokémon</p>
        </div>
        <div class="bg-white p-8 rounded-xl text-center">
          <div class="text-[#FF4B4B] text-4xl mb-4">💝</div>
          <h3 class="text-xl font-bold mb-2">Conseils d'Experts</h3>
          <p class="text-gray-600">Bénéficiez de conseils personnalisés pour l'accueil et le soin de votre Pokémon</p>
        </div>
      </div>
    </div>

    <div class="w-full pb-8 md:pb-16">
      <div class="relative w-full bg-[#FF4B4B] py-12 md:py-16 mb-8 md:mb-16 overflow-hidden">
        <div class="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div class="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full translate-x-24 translate-y-24"></div>
        
        <div class="max-w-[1400px] mx-auto px-4 relative">
          <h2 class="main-title text-4xl md:text-6xl text-center text-white mb-4 md:mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            Découvrez nos Pokémon
          </h2>
          <p class="text-center text-white text-base md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Trouvez votre compagnon idéal parmi notre sélection aléatoire
          </p>
          
          <div class="absolute left-10 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white bg-opacity-20"></div>
          <div class="absolute right-10 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white bg-opacity-20"></div>
        </div>
      </div>
      
      <div class="relative">
        <div class="w-full bg-[#FFFFFF] py-2 md:py-4">
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#FF4B4B] border-t-transparent"></div>
          </div>

          <div v-else-if="error" class="text-red-500 text-center py-8">
            {{ error }}
          </div>

          <div v-else class="overflow-hidden w-full">
            <div 
              class="flex gap-6 animate-scroll" 
              :class="{ 'pause-animation': isPaused }"
              @mouseenter="isPaused = true"
              @mouseleave="isPaused = false"
            >
              <div 
                v-for="(pokemon, index) in featuredPokemon" 
                :key="`first-${pokemon.name}-${index}`"
                class="transform transition-transform duration-300 hover:scale-105 shrink-0 p-4"
              >
                <CardPokémon
                  :pokemonName="pokemon.name"
                  :price="pokemon.price"
                  :bgColor="pokemon.bgColor"
                />
              </div>
              
              <div 
                v-for="(pokemon, index) in featuredPokemon" 
                :key="`main-${pokemon.name}-${index}`"
                class="transform transition-transform duration-300 hover:scale-105 shrink-0 p-4"
              >
                <CardPokémon
                  :pokemonName="pokemon.name"
                  :price="pokemon.price"
                  :bgColor="pokemon.bgColor"
                />
              </div>
              
              <div 
                v-for="(pokemon, index) in featuredPokemon" 
                :key="`last-${pokemon.name}-${index}`"
                class="transform transition-transform duration-300 hover:scale-105 shrink-0 p-4"
              >
                <CardPokémon
                  :pokemonName="pokemon.name"
                  :price="pokemon.price"
                  :bgColor="pokemon.bgColor"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardPokémon from "@/components/CardPokémon.vue";

const __VITE_API_URL__ = import.meta.env.VITE_API_URL;
export default {
  name: "HomePage",
  components: {
    CardPokémon,
  },
  data() {
    return {
      isPaused: false,
      featuredPokemon: [],
      loading: true,
      error: null,
      publicPath: `${__VITE_API_URL__}/uploads`
    };
  },
  methods: {
    async fetchRandomPokemon() {
      try {
        const response = await fetch(`${__VITE_API_URL__}/api/product`);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        const pokemonOnly = data.filter(item => {
          const categoryMatch = item.category?.toLowerCase() === "pokemon" || 
                              item.category?.toLowerCase() === "pokémon" ||
                              item.category?.toLowerCase() === "pokemons" ||
                              item.category?.toLowerCase() === "pokémons";
          return categoryMatch;
        });

        const shuffled = [...pokemonOnly].sort(() => 0.5 - Math.random());
        
        const selected = shuffled.slice(0, 8);

        this.featuredPokemon = selected.map(pokemon => ({
          name: pokemon.name,
          price: `${pokemon.price}€`,
          bgColor: this.getTypeColor(pokemon.type?.toLowerCase() || 'normal'),
        }));

      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    getTypeColor(type) {
      const couleurs = {
        normal: 'bg-gray-400',
        feu: 'bg-red-500',
        eau: 'bg-blue-500',
        plante: 'bg-green-500',
        electrik: 'bg-yellow-500',
        glace: 'bg-blue-300',
        combat: 'bg-red-700',
        poison: 'bg-purple-500',
        sol: 'bg-yellow-600',
        vol: 'bg-blue-400',
        psy: 'bg-pink-500',
        insecte: 'bg-green-600',
        roche: 'bg-yellow-800',
        spectre: 'bg-purple-700',
        dragon: 'bg-purple-600',
        ténèbres: 'bg-gray-700',
        acier: 'bg-gray-500',
        fée: 'bg-pink-400',
        fee: 'bg-pink-400'
      };
      return couleurs[type] || 'bg-gray-500';
    }
  },
  async mounted() {
    await this.fetchRandomPokemon();
  }
};
</script>

<style scoped>
.main-title {
  font-family: var(--font-primary);
  font-weight: 800;
  letter-spacing: 1px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
  width: calc(300%);
}

.pause-animation {
  animation-play-state: paused;
}

.transform {
  will-change: transform;
}

@media (max-width: 768px) {
  .animate-scroll {
    animation: scroll 20s linear infinite;
  }
}
</style>

