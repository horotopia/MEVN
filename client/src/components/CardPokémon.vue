<template>
  <div class="py-4 px-2">
    <router-link 
      :to="`/pokemon/${pokemonId}`"
      class="block transform transition-transform duration-300 hover:scale-105"
    >
      <div class="relative flex justify-center">
        <div class="relative box-border h-96 w-72 rounded-xl border-2 border-gray-300">
          <div class="absolute left-0 top-0 box-border h-48 w-[calc(18rem-4px)] rounded-tl-xl rounded-tr-xl bg-white overflow-hidden">
            <img 
              :src="getPokemonImage()" 
              :alt="pokemonName"
              class="h-full w-full object-contain pb-2" 
              @error="handleImageError"
            />
          </div>
          <div :class="`${bgColor} absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 transform border-l-2 border-r-2 border-gray-300 text-center font-bold text-white`">
            {{ pokemonName.toUpperCase() }}
          </div>
          <div class="absolute top-[calc(50%+1rem-4px)] h-32 w-full pt-3 border-b-2 border-gray-300 bg-white text-center">
            {{ tronquerDescription(pokemonDescription) }}
          </div>
          <div class="absolute top-[calc(87%-1px)] flex h-[calc(3rem+4px)] w-full items-center justify-center rounded-bl-xl rounded-br-xl border-b-2 border-gray-300 bg-white">
            <span class="text-xl font-bold text-black">{{ price }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
const _VITE_API_URL = import.meta.env.VITE_API_URL;
export default {
  name: "CardPokémon",
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      default: "0€",
    },
    bgColor: {
      type: String,
      default: "bg-purple-600",
    }
  },
  data() {
    return {
      pokemonId: "",
      pokemonDescription: "Chargement...",
      isFavorite: false,
      publicPath: `${_VITE_API_URL}/uploads`,
      imageError: false,
      pokemonImage: null
    };
  },
  watch: {
    pokemonName: {
      immediate: true,
      handler() {
        this.fetchPokemonData();
      },
    },
  },
  methods: {
    async fetchPokemonData() {
      try {
        const response = await fetch(`${_VITE_API_URL}/api/product`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const products = await response.json();
        const pokemon = products.find(p => 
          p.name.toLowerCase() === this.pokemonName.toLowerCase() &&
          (p.category?.toLowerCase() === "pokemon" || 
           p.category?.toLowerCase() === "pokémon" ||
           p.category?.toLowerCase() === "pokemons" ||
           p.category?.toLowerCase() === "pokémons")
        );

        if (pokemon) {
          this.pokemonId = pokemon._id;
          this.pokemonDescription = pokemon.description || "Description non disponible";
          this.pokemonImage = pokemon.pictures?.[0]?.name;
          this.imageError = false;
        } else {
          throw new Error("Pokémon non trouvé");
        }

      } catch (error) {
        console.error("Erreur lors de la récupération des données Pokémon :", error);
        this.pokemonDescription = "Erreur de chargement";
        this.imageError = true;
      }
    },
    getPokemonImage() {
      if (this.imageError || !this.pokemonId) {
        return `https://via.placeholder.com/150?text=${this.pokemonName}`;
      }
      
      if (this.pokemonImage) {
        return `${this.publicPath}/products/${this.pokemonId}/${this.pokemonImage}`;
      }
      
      return `${this.publicPath}/products/${this.pokemonId}/${this.pokemonName.toLowerCase()}.png`;
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    tronquerDescription(description) {
      const mots = description.split(' ');
      return mots.slice(0, 15).join(' ') + (mots.length > 15 ? '...' : '');
    },
    handleImageError() {
      this.imageError = true;
    }
  },
};
</script>

<style scoped>
.card-title {
  font-family: var(--font-primary);
  font-weight: 900;
}

.card-description {
  font-family: var(--font-secondary);
}
</style>
