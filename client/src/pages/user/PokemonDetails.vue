<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
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

      // Optionnel : Notifier l'utilisateur
      alert(`${product.name} a été ajouté au panier.`);
    },
  },
};
</script>

<template>
  <div class="container mx-auto p-8">
    <div v-if="loading" class="text-center text-lg font-semibold">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-500 font-semibold">{{ error }}</div>
    <div v-else class="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row">
      <!-- Image du Pokémon -->
      <div class="flex-1">
        <img :src="pokemon?.image" alt="Pokémon" class="w-64 h-64 mx-auto" />
      </div>

      <!-- Informations sur le Pokémon -->
      <div class="flex-1 ml-0 md:ml-8 mt-8 md:mt-0">
        <h1 class="text-4xl font-bold mb-4">{{ pokemon?.name }}</h1>
        <p class="text-gray-600 mb-4">{{ pokemon?.description }}</p>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Type :</strong></p>
            <span
              class="inline-block px-3 py-1 text-white font-semibold rounded-lg"
              :class="getTypeColor(pokemon?.type)"
            >
              {{ pokemon?.type }}
            </span>
          </div>

          <div>
            <p><strong>Catégorie :</strong></p>
            <span class="font-semibold text-gray-700">{{ pokemon?.category }}</span>
          </div>

          <div>
            <p><strong>Poids :</strong></p>
            <span class="font-semibold text-gray-700">{{ pokemon?.weight }} g</span>
          </div>

          <div>
            <p><strong>Taille :</strong></p>
            <span class="font-semibold text-gray-700">{{ pokemon?.height }} cm</span>
          </div>

          <div>
            <p><strong>Prix :</strong></p>
            <span class="font-semibold text-gray-700">{{ pokemon?.price }} €</span>
          </div>

          <div>
            <p><strong>Stock :</strong></p>
            <span
              class="font-semibold"
              :class="pokemon?.stock > 0 ? 'text-green-600' : 'text-red-600'"
            >
              {{ pokemon?.stock > 0 ? pokemon.stock : 'Rupture de stock' }}
            </span>
          </div>
        </div>

        <button
          v-if="pokemon?.stock > 0"
          @click="addToCart(pokemon)"
          class="mt-6 w-full bg-[#ff4c4c] text-white font-bold py-2 rounded-lg hover:bg-[#cc3c3c]"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
