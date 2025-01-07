<template>
  <div>
    <PokeballLoader :isLoading="loading" />

    <div class="min-h-screen flex flex-col md:flex-row-reverse bg-gray-100">
      <main class="flex-1 p-4 md:p-6">
        <div class="mb-6">
          <div class="w-full mx-auto">
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Chercher un Pokémon par nom..." 
                class="w-full rounded-lg pr-12 pl-6 py-3 md:py-2 focus:outline-none text-base md:text-lg placeholder-gray-600 montserrat-medium shadow-lg"
              >
              <span class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="text-center mb-6 md:mb-8">
          <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <span class="text-sm text-gray-600 montserrat-medium">
              {{ filteredProducts.length }} Pokémon
            </span>
          </span>
        </div>

        <button 
          @click="toggleSidebar" 
          class="fixed top-24 left-4 z-50 p-2 rounded-lg bg-white shadow-lg md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>

        <div v-else-if="error" class="text-red-500 text-center py-8">
          {{ error }}
        </div>

        <transition-group 
          tag="div" 
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full"
          name="pokemon-grid"
        >
          <PokemonCard
            v-for="product in filteredProducts"
            :key="product._id"
            :id="product._id"
            :nom="product.name"
            :description="product.description"
            :image="product.image"
            :prix="product.price"
            :types="product.type ? [product.type] : []"
            @ajouter-au-panier="addToCart"
            @filtrer-par-type="filtrerParType"
          />
        </transition-group>
      </main>

      <div 
        v-if="showSidebar" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        @click="toggleSidebar"
      ></div>

      <aside 
        :class="[
          'transform transition-transform duration-300 ease-in-out',
          'fixed md:sticky md:top-0 right-0 z-40 w-64 md:h-screen bg-white shadow-lg',
          'md:rounded-none rounded-2xl',
          'md:overflow-y-auto overflow-y-visible',
          showSidebar ? 'top-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:right-0' : 'translate-x-full md:translate-x-0',
          'md:block'
        ]"
      >
        <div class="p-6">
          <h2 class="text-2xl montserrat-extrabold uppercase tracking-wide mb-8 text-gray-800 flex items-center justify-between">
            FILTRES
            <button 
              @click="toggleSidebar" 
              class="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </h2>
          
          <div class="space-y-8">
            <div>
              <label class="block mb-4 text-sm montserrat-extrabold uppercase tracking-wide text-gray-600">
                TYPES DE POKÉMON
              </label>
              <div class="flex flex-col gap-4">
                <button
                  class="rounded-lg px-6 py-2.5 montserrat-extrabold text-white bg-[#ff4c4c] border-2 border-[#D43C3C] transition-all duration-200 hover:bg-[#CC3C3C] hover:border-[#A82E2E] flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4c4c] focus:ring-offset-2"
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
                    class="rounded-lg px-4 py-2 montserrat-extrabold text-white uppercase text-sm transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#ff4c4c] focus:ring-offset-2"
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
              <label class="block mb-4 text-sm montserrat-extrabold uppercase tracking-wide text-gray-600">
                PRIX MAXIMUM
              </label>
              <div class="px-2">
                <input 
                  type="range" 
                  v-model="prixMaximum" 
                  min="0" 
                  max="1000000" 
                  step="1000"
                  class="w-full accent-[#ff4c4c] h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff4c4c] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white focus:outline-none"
                  style="-webkit-appearance: none; appearance: none;"
                >
                <div class="mt-3 flex justify-between text-sm">
                  <span class="text-gray-600">0€</span>
                  <span class="text-[#ff4c4c]">{{ prixMaximum.toLocaleString() }}€</span>
                  <span class="text-gray-600">1M€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import PokeballLoader from '@/components/pokeballLoader.vue';
import PokemonCard from '../../components/PokemonCard.vue'

export default {
  name: 'PokemonPage',
  components: {
    PokemonCard,
    PokeballLoader
  },
  data() {
    return {
      publicPath: 'http://localhost:5000' + '/uploads',
      products: [],
      typeSelectionne: '',
      prixMaximum: 1000000,
      loading: true,
      error: null,
      showSidebar: false,
      searchQuery: '',
      typesDisponibles: [
        { value: 'normal', label: 'Normal' },
        { value: 'feu', label: 'Feu' },
        { value: 'eau', label: 'Eau' },
        { value: 'plante', label: 'Plante' },
        { value: 'électrik', label: 'Électrik' },
        { value: 'glace', label: 'Glace' },
        { value: 'combat', label: 'Combat' },
        { value: 'poison', label: 'Poison' },
        { value: 'sol', label: 'Sol' },
        { value: 'vol', label: 'Vol' },
        { value: 'psy', label: 'Psy' },
        { value: 'insecte', label: 'Insecte' },
        { value: 'roche', label: 'Roche' },
        { value: 'spectre', label: 'Spectre' },
        { value: 'dragon', label: 'Dragon' },
        { value: 'ténèbres', label: 'Ténèbres' },
        { value: 'acier', label: 'Acier' },
        { value: 'fée', label: 'Fée' }
      ]
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchesType = !this.typeSelectionne || product.type.toLowerCase() === this.typeSelectionne.toLowerCase();
        const matchesPrice = product.price <= this.prixMaximum;
        const matchesSearch = !this.searchQuery || 
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesType && matchesPrice && matchesSearch;
      });
    }
  },
  async created() {
    try {
      console.log("Tentative de récupération des produits...");
      const response = await fetch("http://localhost:5000/api/product");
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Données reçues:", data);

      if (!Array.isArray(data)) {
        throw new Error("Les données reçues ne sont pas un tableau");
      }

      this.products = data.filter(item => item.category === "pokémon").map((item) => {
        console.log("Traitement du produit:", item);
        return {
          _id: item._id,
          name: item.name || "Sans nom",
          description: item.description || "Pas de description",
          image: (item.pictures && item.pictures[0]?.name) 
            ? `${this.publicPath}/products/${item._id}/${item.pictures[0].name}` 
            : `https://via.placeholder.com/150?text=${encodeURIComponent(item.name || 'Pokemon')}`,
          price: item.price || 0,
          type: item.type || "normal"
        };
      });

      console.log("Produits transformés:", this.products);
    } catch (error) {
      console.error("Erreur détaillée:", error);
      this.error = `Erreur lors de la récupération des produits: ${error.message}`;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    obtenirCouleurType(type) {
      const couleurs = {
        normal: 'bg-gray-400',
        feu: 'bg-red-500',
        eau: 'bg-blue-500',
        plante: 'bg-green-500',
        électrik: 'bg-yellow-500',
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
        fée: 'bg-pink-400'
      }
      return couleurs[type] || 'bg-gray-500'
    },
    filtrerParType(type) {
      this.typeSelectionne = type.toLowerCase()
      if (window.innerWidth < 768) {
        this.showSidebar = false;
      }
      document.querySelector('aside').scrollIntoView({ behavior: 'smooth' })
    },
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item._id === product._id);
      
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.push({
          _id: product._id,
          name: product.nom,
          price: product.prix,
          image: product.image,
          quantity: product.quantity || 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },
  async created() {
    try {
      const response = await fetch("http://localhost:5000/api/product");
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Les données reçues ne sont pas un tableau");
      }

      const pokemonOnly = data.filter(item => {
        const categoryMatch = item.category?.toLowerCase() === "pokemon" || 
                            item.category?.toLowerCase() === "pokémon" ||
                            item.category?.toLowerCase() === "pokemons" ||
                            item.category?.toLowerCase() === "pokémons";
        return categoryMatch;
      });

      this.products = pokemonOnly.map(item => ({
        _id: item._id,
        name: item.name || "Pokémon sans nom",
        description: item.description || "Aucune description disponible",
        image: item.pictures?.[0]?.name
          ? `${this.publicPath}/products/${item._id}/${item.pictures[0].name}`
          : `https://via.placeholder.com/150?text=${item.name || 'Pokemon'}`,
        price: item.price || 0,
        type: item.type?.toLowerCase() || "normal"
      }));
    } catch (error) {
      this.error = `Erreur lors de la récupération des produits: ${error.message}`;
    } finally {
      this.loading = false;
    }
  },
  mounted() {

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.showSidebar = false;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {});
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


aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: #f1f1f1;
}

aside::-webkit-scrollbar-thumb {
  background: #ff4c4c;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #cc3c3c;
}
</style>
