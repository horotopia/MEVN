<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto p-4 my-16">
      <div class="flex flex-col lg:flex-row justify-between gap-4">
        <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
          <h2 class="text-lg font-semibold mb-4">Coordonnées de facturation</h2>

          <form @submit.prevent="handleBillingSubmit">
            <div class="mb-4">
              <label for="billing-name" class="block text-sm font-medium text-gray-700">Nom complet</label>
              <input
                id="billing-name"
                type="text"
                v-model="billing.name"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="billing-address" class="block text-sm font-medium text-gray-700">Adresse</label>
              <input
                id="billing-address"
                type="text"
                v-model="billing.address"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="billing-city" class="block text-sm font-medium text-gray-700">Ville</label>
              <input
                id="billing-city"
                type="text"
                v-model="billing.city"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="billing-postal" class="block text-sm font-medium text-gray-700">Code postal</label>
              <input
                id="billing-postal"
                type="text"
                v-model="billing.postalCode"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </form>
        </div>
        <div v-if="hasNonPokemonItems">
          <div class="flex-1 bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold mb-4">Coordonnées de livraison</h2>

            <form @submit.prevent="handleShippingSubmit">
              <div class="mb-4">
                <label for="shipping-name" class="block text-sm font-medium text-gray-700">Nom complet</label>
                <input
                  id="shipping-name"
                  type="text"
                  v-model="shipping.name"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="shipping-address" class="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  id="shipping-address"
                  type="text"
                  v-model="shipping.address"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="shipping-city" class="block text-sm font-medium text-gray-700">Ville</label>
                <input
                  id="shipping-city"
                  type="text"
                  v-model="shipping.city"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="shipping-postal" class="block text-sm font-medium text-gray-700">Code postal</label>
                <input
                  id="shipping-postal"
                  type="text"
                  v-model="shipping.postalCode"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 text-right">
      <button
        @click="submitAll"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Continuer vers le paiement {{ (totalAmount).toFixed(2) }} €
      </button>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props: {
      totalAmount: {
      type: Number,
      required: true,
      },
  },
  data() {
    return {
      billing: {
        name: '',
        address: '',
        city: '',
        postalCode: '',
      },
      shipping: {
        name: '',
        address: '',
        city: '',
        postalCode: '',
      },
    };
  },
  computed: {
    hasNonPokemonItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some((item) => item.category !== "pokémon");
  },
  },
  methods: {
    handleBillingSubmit() {
      console.log('Facturation:', this.billing);
    },
    handleShippingSubmit() {
      console.log('Livraison:', this.shipping);
    },
    submitAll() {
      this.$router.push({
        name: 'paiement',
        query: { totalAmount: this.totalAmount },
      });
      toast.success(`Coordonées enregistrée`, {
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