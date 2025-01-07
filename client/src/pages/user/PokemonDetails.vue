<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      publicPath: 'http://localhost:5000' + '/uploads',
      quantite: 1,
      pokemon: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${this.id}`);
      this.pokemon = await response.json();
    } catch (err) {
      this.error = 'Erreur lors du chargement des détails du Pokémon.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    getTypeColor(type) {
      const colors = {
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
            ténèbre: 'bg-gray-700',
            acier: 'bg-gray-500',
            fée: 'bg-pink-400'
      };
      return colors[type] || 'bg-gray-500';
    },
    augmenterQuantite() {
      this.quantite++
    },
    diminuerQuantite() {
      if (this.quantite > 1) {
        this.quantite--
      }
    },
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += this.quantite;
      } else {
        cart.push({ ...product, quantity: this.quantite });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success(`${this.quantite} ${product.name} ${this.quantite > 1 ? 'ont été ajoutés' : 'a été ajouté'} au panier.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      this.quantite = 1;
    },
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto p-4 md:p-6">
      <div class="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div class="space-y-4">
            <div class="aspect-square rounded-lg border-2 border-gray-300 p-4">
              <div class="h-full w-full rounded-lg border-2 border-gray-300">
                <img 
                  :src="pokemon?.pictures?.[0]?.name ? `${publicPath}/products/${pokemon._id}/${pokemon.pictures[0].name}` : 'https://via.placeholder.com/400'" 
                  :alt="pokemon?.name"
                  class="h-full w-full object-contain"
                >
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div v-for="n in 3" :key="n" class="aspect-square rounded-lg border-2 border-gray-300 p-2">
                <div class="h-full w-full rounded-lg border-2 border-gray-300 bg-gray-50"></div>
              </div>
            </div>
          </div>


          <div class="space-y-6">
            <h1 
              class="text-2xl md:text-3xl montserrat-extrabold uppercase tracking-wide text-white text-center py-3 rounded-lg shadow-md"
              :class="getTypeColor(pokemon?.type)"
            >
              {{ pokemon?.name }}
            </h1>

            <p class="text-gray-600 montserrat-medium">{{ pokemon?.description }}</p>

            <div class="flex items-center justify-between">
              <span class="text-2xl montserrat-extrabold text-[#ff4c4c]">{{ pokemon?.price }}€ HT</span>
              <span 
                class="px-4 py-1.5 rounded-full text-sm montserrat-medium"
                :class="pokemon?.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ pokemon?.stock > 0 ? pokemon.stock + ' en stock' : 'Rupture de stock' }}
              </span>
            </div>

            <div class="space-y-4">
              <p class="text-[10px] md:text-xs text-gray-600 text-left font-medium">QUANTITÉ</p>
              <div class="flex items-center gap-4">
                <div class="inline-flex text-sm">
                  <button 
                    class="rounded-l-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-100 transition-colors"
                    @click="diminuerQuantite"
                  >-</button>
                  <input 
                    type="text" 
                    v-model="quantite" 
                    class="w-12 text-center border-y border-gray-300"
                    readonly
                  />
                  <button 
                    class="rounded-r-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-100 transition-colors"
                    @click="augmenterQuantite"
                  >+</button>
                </div>

                <button
                  v-if="pokemon?.stock > 0"
                  @click="addToCart(pokemon)"
                  class="flex-1 rounded-full bg-[#ff4c4c] border-2 border-[#D43C3C] px-4 py-2 text-white transition ease-in-out active:bg-[#CC3C3C] active:border-[#A82E2E] montserrat-extrabold text-sm"
                >
                  AJOUTER AU PANIER
                </button>
              </div>
            </div>
          </div>


          <div class="md:col-span-2 space-y-6">
            <div class="space-y-4">
              <h3 class="text-xl montserrat-extrabold text-gray-800">Tout savoir sur {{ pokemon?.name }}</h3>
              <p class="text-gray-600 montserrat-medium border-l-4 border-[#ff4c4c] pl-4">{{ pokemon?.habitude }}</p>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl montserrat-extrabold text-gray-800">Son Habitat et ses besoins</h3>
              <p class="text-gray-600 montserrat-medium border-l-4 border-[#ff4c4c] pl-4">{{ pokemon?.habitat }}</p>
            </div>


            <div class="overflow-hidden rounded-lg border border-gray-200">
              <table class="w-full">
                <thead :class="getTypeColor(pokemon?.type)">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm montserrat-extrabold text-white">Attaque</th>
                    <th class="px-4 py-3 text-left text-sm montserrat-extrabold text-white">Type</th>
                    <th class="px-4 py-3 text-left text-sm montserrat-extrabold text-white">Puissance</th>
                    <th class="px-4 py-3 text-left text-sm montserrat-extrabold text-white">Précision</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 text-sm montserrat-medium">Flammèche</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">Feu</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">40</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">100%</td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 text-sm montserrat-medium">Griffe</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">Normal</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">50</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">95%</td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 text-sm montserrat-medium">Jet de Flammes</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">Feu</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">90</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">85%</td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 text-sm montserrat-medium">Lance-Flammes</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">Feu</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">110</td>
                    <td class="px-4 py-3 text-sm montserrat-medium">80%</td>
                  </tr>
                </tbody>
              </table>
            </div>


            <div class="grid grid-cols-3 gap-4">
              <div class="space-y-2">
                <p class="text-sm montserrat-extrabold text-gray-600">POIDS</p>
                <span class="inline-block px-4 py-2 text-sm montserrat-medium bg-gray-100 text-gray-800 rounded-lg">
                  {{ (pokemon?.weight / 1000).toFixed(2) }} kg
                </span>
              </div>
              <div class="space-y-2">
                <p class="text-sm montserrat-extrabold text-gray-600">TAILLE</p>
                <span class="inline-block px-4 py-2 text-sm montserrat-medium bg-gray-100 text-gray-800 rounded-lg">
                  {{ (pokemon?.height / 100).toFixed(2) }} m
                </span>
              </div>
              <div class="space-y-2">
                <p class="text-sm montserrat-extrabold text-gray-600">ÂGE</p>
                <span class="inline-block px-4 py-2 text-sm montserrat-medium bg-gray-100 text-gray-800 rounded-lg">
                  {{ pokemon?.age }} ans
                </span>
              </div>
            </div>


            <div class="space-y-4">
              <h3 class="text-xl montserrat-extrabold text-gray-800 text-center">
                Les évolutions de {{ pokemon?.name }} : Niveau d'évolution actuel 1
              </h3>
              <div class="grid grid-cols-3 gap-4">
                <div v-for="n in 3" :key="n" class="aspect-square rounded-lg border-2 border-gray-300 p-2">
                  <div class="h-full w-full rounded-lg border-2 border-gray-300 bg-gray-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
