<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Coordonnées de facturation et de livraison</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Carte de facturation -->
        <div class="bg-white p-6 rounded-lg shadow-md">
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

        <!-- Carte de livraison -->
        <!-- <div class="bg-white p-6 rounded-lg shadow-md">
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
        </div> -->
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
    };
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