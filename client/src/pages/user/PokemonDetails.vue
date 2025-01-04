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
            électricité: 'bg-yellow-500',
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
      // Récupérer le panier depuis le localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Vérifier si le produit est déjà dans le panier
      const existingProduct = cart.find((item) => item._id === product._id);

      if (existingProduct) {
        // Incrémenter la quantité
        existingProduct.quantity += 1;
      } else {
        // Ajouter un nouveau produit avec une quantité de 1
        cart.push({ ...product, quantity: 1 });
      }

      // Sauvegarder le panier dans le localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Toast pour confirmer l'ajout au panier
      toast.success(`${product.name} a été ajouté au panier.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  },
};
</script>

<template>
<div class="bg-slate-100 -z-14">
  <div class="container mx-auto bg-white shadow-9 -z-12">
    <div class="mx-8 py-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      <!-- Image du pokémon -->
      <div class="flex h-100 w-full">
        <!-- Image principale -->
        <div class="flex-1">
          <div class="w-full h-full bg-slate-500 flex items-center justify-center text-white font-bold text-xl">
            Image Non Disponible
          </div>
        </div>

        <!-- Images secondaires -->
        <div class="w-1/3 flex flex-col space-y-2 ml-2">
          <div class="w-full h-1/3 bg-slate-300 flex items-center justify-center text-white font-bold text-sm">
            Image 2
          </div>
          <div class="w-full h-1/3 bg-slate-300 flex items-center justify-center text-white font-bold text-sm">
            Image 3
          </div>
          <div class="w-full h-1/3 bg-slate-300 flex items-center justify-center text-white font-bold text-sm">
            Image 4
          </div>
        </div>
      </div>
      <div class="h-100  flex flex-col justify-between">
        <div>
          <h2 class="mx-auto rounded-md px-6 py-3 font-extrabold text-white uppercase w-3/4 text-center text-3xl" :class="getTypeColor(pokemon?.type)">{{ pokemon?.name }}</h2>
        </div>
        <div>
          <div class="py-2 flex-1">
            <div class="font-semibold text-gray-700 pt-2 border-l-2 px-2">{{ pokemon?.description }}</div>
          </div>
        </div>
        <div>
          <span class="inline-block mt-4 px-8 py-4 text-lg font-bold bg-gray-100 text-gray-800 rounded-md">
            {{ pokemon?.price }} €
          </span>
        </div>
        <div>
          <div class="flex flex-wrap items-center space-x-4">
            <div class="flex items-center">
              <span 
                class="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold"
                :class="pokemon?.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                <svg v-if="pokemon?.stock > 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-red-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {{ pokemon?.stock > 0 ? pokemon.stock + ' en stock' : 'Rupture de stock' }}
              </span>
            </div>
            <div class="flex items-center">
              <button 
                class="rounded-l-lg border border-gray-300 px-3 py-1"
                @click.prevent.stop="diminuerQuantite"
              >-</button>
              <input 
                type="text" 
                v-model="quantite" 
                class="w-12 text-center border-y border-gray-300 py-1"
                @click.prevent.stop
              />
              <button 
                class="rounded-r-lg border border-gray-300 px-3 py-1"
                @click.prevent.stop="augmenterQuantite"
              >+</button>
            </div>
            <div class="flex items-center flex-grow">
              <button
                v-if="pokemon?.stock > 0"
                @click="addToCart(pokemon)"
                class="bg-[#ff4c4c] w-full text-white font-bold py-2 px-4 rounded-lg hover:bg-[#cc3c3c]"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1 sm:col-span-2 lg:grid-cols-2 mt-6">
        <div class="relative text-sm font-semibold text-gray-700">
          <!-- <div class="absolute inset-0 h-20 mt-10 opacity-20 rounded-md" :class="getTypeColor(pokemon?.type)"></div> -->
          <h3 class="text-lg font-bold">Tout savoir sur Salamèche</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
        </div>
        <div class="mt-8 text-sm font-semibold text-gray-700">
          <h3 class="text-lg font-bold">Son Habitat et ses besoins</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
        </div>
      </div>
      <div class="mt-8">
        <table class="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead class="text-white text-left" :class="getTypeColor(pokemon?.type)">
            <tr>
              <th class="px-4 py-3 text-lg font-semibold">Attaque</th>
              <th class="px-4 py-3 text-lg font-semibold">Type</th>
              <th class="px-4 py-3 text-lg font-semibold">Puissance</th>
              <th class="px-4 py-3 text-lg font-semibold">Précision</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-orange-100 transition">
              <td class="px-6 py-4 border-b text-gray-800">Flammèche</td>
              <td class="px-6 py-4 border-b text-gray-600">Feu</td>
              <td class="px-6 py-4 border-b text-gray-800">40</td>
              <td class="px-6 py-4 border-b text-gray-800">100%</td>
            </tr>
            <tr class="bg-gray-50 hover:bg-orange-100 transition">
              <td class="px-6 py-4 border-b text-gray-800">Griffe</td>
              <td class="px-6 py-4 border-b text-gray-600">Normal</td>
              <td class="px-6 py-4 border-b text-gray-800">50</td>
              <td class="px-6 py-4 border-b text-gray-800">95%</td>
            </tr>
            <tr class="hover:bg-orange-100 transition">
              <td class="px-6 py-4 border-b text-gray-800">Jet de Flammes</td>
              <td class="px-6 py-4 border-b text-gray-600">Feu</td>
              <td class="px-6 py-4 border-b text-gray-800">90</td>
              <td class="px-6 py-4 border-b text-gray-800">85%</td>
            </tr>
            <tr class="bg-gray-50 hover:bg-orange-100 transition">
              <td class="px-6 py-4 border-b text-gray-800">Lance-Flammes</td>
              <td class="px-6 py-4 border-b text-gray-600">Feu</td>
              <td class="px-6 py-4 border-b text-gray-800">110</td>
              <td class="px-6 py-4 border-b text-gray-800">80%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="">
        <h3 class="text-lg font-semibold text-gray-700 mb-4 text-center">Informations supplémentaires</h3>
        <div class="py-2">
          <p><strong>Poids :</strong></p>
          <span class="inline-block px-3 py-1 text-sm font-bold bg-gray-100 text-gray-800 rounded-md">{{ pokemon?.weight }} g</span>
          <p><strong>Taille :</strong></p>
          <span class="inline-block px-3 py-1 text-sm font-bold bg-gray-100 text-gray-800 rounded-md">{{ pokemon?.height }} cm</span>
          <p><strong>Age :</strong></p>
          <span class="inline-block px-3 py-1 text-sm font-bold bg-gray-100 text-gray-800 rounded-md">{{ pokemon?.age }} ans</span>
        </div>
      </div>
      <div class="col-span-1 sm:col-span-2 lg:grid-cols-2">
        <div class="flex flex-col items-center p-4">
          <!-- Titre -->
          <h3 class="text-lg font-semibold text-gray-700 mb-4 text-center">
            Les évolutions de Salamèche : Niveau d'évolution actuel 1
          </h3>

          <!-- Section des images -->
          <div class="flex justify-between w-full space-x-4">
            <div class="w-1/3 object-cover rounded bg-slate-300 flex items-center justify-center text-white font-bold text-sm">
              Image 2
            </div>
            <div class="flex justify-between w-full space-x-4">
              <div class="w-1/3 object-cover rounded bg-slate-300 flex items-center justify-center text-white font-bold text-sm">
              Image 2
            </div>
            <div class="flex justify-between w-full space-x-4">
              <div class="w-1/3 object-cover rounded bg-slate-300 flex items-center justify-center text-white font-bold text-sm">
              Image 2
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</template>
