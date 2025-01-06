<template>
  <div class="min-h-screen flex bg-gray-100">
    <aside class="w-72 p-6 bg-white shadow-lg sticky top-0 h-screen overflow-y-auto">
      <h2 class="text-2xl font-extrabold uppercase tracking-wide mb-8 text-gray-800">
        Filtres
      </h2>
      
      <div class="space-y-8">
        <div>
          <label class="block mb-4 text-sm font-extrabold uppercase tracking-wide text-gray-600">
            Tous les accéssoires
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
              <span class="text-gray-600">1000€</span>
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
            {{ products.length }} Produits
          </span>
        </span>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>

      <div v-else-if="error" class="text-red-500 text-center py-8">
        {{ error }}
      </div>

      <transition-group 
        tag="div" 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 max-w-[1400px] mx-auto"
        name="pokemon-grid"
      >
      <AccessoiresCard
      v-for="product in filteredProducts"
      :key="product._id"
      :id="product._id"
      :nom="product.name"
      :description="product.description"
      :image="product.image"
      :prix="product.price"
      :types="[product.type]"
    />
      </transition-group>
    </main>
  </div>
</template>

<script>
import AccessoiresCard from '../../components/AccessoiresCard.vue'

export default {
  name: 'AccessoiresPage',
  components: {
    AccessoiresCard
  },
  data() {
    return {
      products: [],
      typeSelectionne: '',
      prixMaximum: 10000000,
      loading: true,
      error: null,
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

      this.products = data
        .filter(item => item.category === "accessoire")
        .map((item) => ({
          _id: item._id,
          name: item.name,
          description: item.description,
          image: item.pictures?.[0]?.name
            ? `http://localhost:5000/uploads/products/${item._id}/${item.pictures[0].name}`
            : `https://via.placeholder.com/150?text=${item.name}`,
          price: item.price,
          type: item.type || "Inconnu",
        }));
    } catch (error) {
      this.error = "Erreur lors de la récupération des produits.";
    } finally {
      this.loading = false;
    }
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
