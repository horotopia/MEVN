<template>
<div class="min-h-screen flex bg-gray-100">
  <div class="container mx-auto p-4 my-16">
    <!-- Panier -->
    <div class="flex flex-col lg:flex-row justify-between gap-4">
      <!-- Section gauche: Détails du panier -->
      <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">MON PANIER</h2>


      <!-- Article -->
      <div v-if="cartItems.length > 0">
          <div
            v-for="(item, index) in cartItems"
            :key="index"
            class="flex items-center justify-between border-b pb-4 mt-4"
          >
            <div class="flex items-center">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded"
              />
              <div class="ml-4">
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-sm text-gray-500">Quantité : {{ item.quantity }}</p>
                <router-link
                  :to="`/pokemon/${item.id}`"
                  class="text-sm text-blue-300 mt-2 hover:underline"
                >
                  voir le produit
                </router-link>
              </div>
            </div>
            <p class="text-lg font-bold">{{ (item.price / 100).toFixed(2) }} €</p>
            <div class="flex items-center gap-2">
              <button
                @click="decreaseQuantity(index)"
                class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <button
                @click="removeFromCart(index)"
                class="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-8">
          <p>Votre panier est vide.</p>
        </div>
      </div>
        

      <!-- Section droite: Résumé -->
      <div class="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-4">Résumé de la commande</h2>
        <div class="pb-6">
          <p class="border-b pb-4 text-lg"> {{ totalItems }} Article{{ totalItems > 1 ? 's' : '' }}</p>
        </div>
        <div class="flex justify-between text-lg">
          <span>Sous-total</span>
          <span>{{ calculateTotalPrice() }} €</span>
        </div>
        <div class="mt-4">
          <router-link :to="{ name: 'paiement', query: { totalAmount: String(Math.round(calculateTotalPrice() * 100)) } }">
            <button
              class="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg text-center"
            >
              PAIEMENT
            </button>
          </router-link>
        </div>
        <div class="mt-4">
          <p class="text-sm">NOUS ACCEPTONS :</p>
          <div class="flex space-x-2 mt-2">
            <img src="../../assets/img/logo-cb-1.jpg" alt="Visa" class="w-5 h-5" />
            <img src="../../assets/img/logo-visa-carte-1.png" alt="Mastercard" class="w-5 h-5" />
            <img src="../../assets/img/MasterCard_Logo.svg.webp" alt="PayPal" class="w-5 h-5"/>
          </div>
        </div>
        <div class="mt-6 p-4 bg-gray-100 rounded-lg">
          <p class="text-sm">
            Pas de livrasion, le pokémon est à récupérer  <span class="font-bold">sur place</span>.
          </p>
        </div>
        <input type="text" placeholder="Code Promo" class="mt-2 border-red-500 border text-black w-full py-2 rounded-lg text-center">
        <p class="h-10"></p>
      </div>
    </div>
  </div>
</div>
</template>
  
<script>
export default {
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
  methods: {
    calculateTotalPrice() {
      return this.cartItems
        .reduce((total, item) => total + (item.price / 100) * item.quantity, 0);
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.removeFromCart(index);
      }
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
      window.dispatchEvent(new Event("cart-updated"));
    },
  },
  created() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
    window.dispatchEvent(new Event("cart-updated"));
  },
  watch: {
    cartItems: {
      handler(newValue) {
        localStorage.setItem('cart', JSON.stringify(newValue));
      },
      deep: true,
    },
  },
};
</script>
  
  <style scoped>
  .cart-page {
    margin: 20px;
  }
  .cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  </style>
  