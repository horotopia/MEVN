<template>
  <div>
    <PokeballLoader :isLoading="loading" />
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
                max="1000000" 
                step="1000"
                class="w-full accent-[#ff4c4c] h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff4c4c] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white focus:outline-none"
              >
              <div class="mt-3 flex justify-between text-sm">
                <span class="text-gray-600">0€</span>
                <span class="font-extrabold text-[#ff4c4c]">{{ prixMaximum.toLocaleString() }}€</span>
                <span class="text-gray-600">1 000 000€</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 p-6">
        <div class="-mx-6 mb-6">
          <div class="max-w-[1400px] mx-auto shadow-lg">
            <div>
              <input 
            type="text" 
            placeholder="Chercher un Pokémon, une Pokéball..." 
            class="w-full rounded-lg pr-12 pl-6 py-2 focus:outline-none text-lg placeholder-gray-600"
            >
            </div>
          </div>
        </div>

        <div class="text-center mb-8">
          <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <span class="ml-1.5 text-sm text-gray-600">
              {{ products.length }} Pokémon
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
          v-for="product in filteredProducts"
          :key="product._id"
          :id="product._id"
          :nom="product.name"
          :description="product.description"
          :image="product.image"
          :prix="product.price"
          :types="[product.type]"
          @ajouter-au-panier="addToCart"
          @filtrer-par-type="filtrerParType"
        />
        </transition-group>
      </main>
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
      typesDisponibles: [
        { value: 'normal', label: 'Normal' },
        { value: 'feu', label: 'Feu' },
        { value: 'eau', label: 'Eau' },
        { value: 'plante', label: 'Plante' },
        { value: 'électrique', label: 'Électrique' },
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
        const matchesType = !this.typeSelectionne || product.type === this.typeSelectionne;
        const matchesPrice = product.price <= this.prixMaximum;
        return matchesType && matchesPrice;
      });
    }
  },
  async created() {
    try {
      const response = await fetch("http://localhost:5000/api/product");
      const data = await response.json();

      this.products = data.map((item) => ({
        _id: item._id,
        name: item.name,
        description: item.description,
        image: (item.pictures[0]?.name)? `${this.publicPath}/products/${item._id}/${item.pictures[0]?.name}` : `https://via.placeholder.com/150?text=${item.name}`,
        price: item.price,
        type: item.type || "Inconnu"
      }));
    } catch (error) {
      this.error = "Erreur lors de la récupération des produits.";
      console.error("Erreur lors de la récupération des produits :", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    obtenirCouleurType(type) {
      const couleurs = {
        normal: 'bg-gray-400',
        feu: 'bg-red-500',
        eau: 'bg-blue-500',
        plante: 'bg-green-500',
        électrique: 'bg-yellow-500',
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
          quantity: product.quantity
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },
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
