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
            water: 'bg-blue-500',
            grass: 'bg-green-500',
            électricité: 'bg-yellow-500',
            ice: 'bg-blue-300',
            fighting: 'bg-red-700',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            vol: 'bg-blue-400',
            psychic: 'bg-pink-500',
            bug: 'bg-green-600',
            rock: 'bg-yellow-800',
            ghost: 'bg-purple-700',
            dragon: 'bg-purple-600',
            dark: 'bg-gray-700',
            steel: 'bg-gray-500',
            fairy: 'bg-pink-400'
      };
      return colors[type] || 'bg-gray-500';
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
<div class="container mx-auto bg-white shadow-9">
  <div class="mx-8 my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
    <!-- Image du pokémon -->
    <div class="h-80 w-full bg-white shadow-md">
      <img :src="pokemon?.pictures?.length ? `${publicPath}/products/${pokemon._id}/${pokemon.pictures[0]?.name}` : 'https://via.placeholder.com/300?text=Image+Non+Disponible'" alt="pokémon" />
    </div>
    <div class="">
      <h2 class="rounded-md px-6 py-1 font-extrabold text-white uppercase w-100 text-center" :class="getTypeColor(pokemon?.type)">{{ pokemon?.name }}</h2>
      <div class="py-2 flex-1">
        <div class="font-semibold text-gray-700 pt-2">{{ pokemon?.description }}</div>
        <p class="text-lg font-semibold text-gray-800">Stock :</p>
        <span 
          class="inline-flex items-center gap-2 px-3 py-1 text-sm font-bold rounded-full"
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

        <p class="mt-4 text-lg font-semibold text-gray-800">Prix :</p>
        <span class="inline-block px-3 py-1 text-sm font-bold bg-gray-100 text-gray-800 rounded-md">
          {{ pokemon?.price }} €
        </span>
      </div>
      <button
          v-if="pokemon?.stock > 0"
          @click="addToCart(pokemon)"
          class="mt-6 w-full bg-[#ff4c4c] text-white font-bold py-2 rounded-lg hover:bg-[#cc3c3c]"
        >
          Ajouter au panier
      </button>
    </div>
    <div class="col-span-1 sm:col-span-2 lg:grid-cols-2">
      <div class="relative text-sm font-semibold text-gray-700">
        <div class="absolute inset-0 bg-red-500 h-20 mt-16 opacity-20 rounded-md -z-10"></div>
        <h3 class="text-lg font-bold">Tout savoir sur Salamèche</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
      </div>
      <div class="mt-8 text-sm font-semibold text-gray-700">
        <h3 class="text-lg font-bold">Son Habitat et ses besoins</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
      </div>
    </div>
    <div class="mt-6">
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
      <h3>Informations supplémentaires</h3>
      <div class="py-2">
        <p><strong>Poids :</strong></p>
        <span class="inline-block px-3 py-1 text-sm font-bold bg-gray-100 text-gray-800 rounded-md">{{ pokemon?.weight }} g</span>
        <p><strong>Taille :</strong></p>
        <span class="inline-block px-3 py-1 text-sm font-bold bg-gray-100 text-gray-800 rounded-md">{{ pokemon?.height }} cm</span>
        <p><strong>Age :</strong></p>
        <span class="inline-block px-3 py-1 text-sm font-bold bg-gray-100 text-gray-800 rounded-md">{{ pokemon?.age }} ans</span>
      </div>
    </div>
    <div class="col-span-1 sm:col-span-2 lg:grid-cols-2 bg-red-500">
      <div class="text-sm font-semibold text-gray-700">
        <div class="">
          <h3>Les évolutions de salamèche : Niveau d'évolution actuel 1</h3>
          <div>
            <img src="https://via.placeholder.com/100x100/FF0000/FFFFFF?text=Flamme" alt="pokémon" />
            <img src="https://via.placeholder.com/100x100/FF0000/FFFFFF?text=Flamme" alt="pokémon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
