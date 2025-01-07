<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto p-4 my-16">
      <div class="flex flex-col lg:flex-row justify-between gap-4">
        <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
          <h2 class="text-lg font-semibold mb-4">Coordonnées de facturation</h2>

          <form @submit.prevent="handleBillingSubmit">
            <div class="mb-4">
              <label for="billing-name" class="block text-sm font-medium text-gray-700">Adresse complete</label>
              <input
                id="billing-name"
                type="text"
                v-model="billing.street"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="billing-address" class="block text-sm font-medium text-gray-700">Ville</label>
              <input
                id="billing-address"
                type="text"
                v-model="billing.city"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="billing-city" class="block text-sm font-medium text-gray-700">Code Postal</label>
              <input
                id="billing-city"
                type="text"
                v-model="billing.postalCode"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="billing-postal" class="block text-sm font-medium text-gray-700">Pays</label>
              <input
                id="billing-postal"
                type="text"
                v-model="billing.country"
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
                <label for="shipping-name" class="block text-sm font-medium text-gray-700">Addresse complète</label>
                <input
                  id="shipping-name"
                  type="text"
                  v-model="shipping.street"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="shipping-address" class="block text-sm font-medium text-gray-700">Ville</label>
                <input
                  id="shipping-address"
                  type="text"
                  v-model="shipping.city"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="shipping-city" class="block text-sm font-medium text-gray-700">Code postal</label>
                <input
                  id="shipping-city"
                  type="text"
                  v-model="shipping.postalCode"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="shipping-postal" class="block text-sm font-medium text-gray-700">Pays</label>
                <input
                  id="shipping-postal"
                  type="text"
                  v-model="shipping.country"
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

const __VITE_API_URL__ = import.meta.env.VITE_API_URL;

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
        id: null,
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      shipping: {
        id: null,
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      user: JSON.parse(localStorage.getItem("user")) || null,
    };
  },
  computed: {
    hasNonPokemonItems() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart.some((item) => item.category !== "pokémon");
    },
  },
  methods: {
    async fetchUserAddresses() {
      const jwtToken = localStorage.getItem("jwtToken");

      try {
        const response = await fetch(`${__VITE_API_URL__}/api/address/${this.user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des adresses.");
        }

        const addresses = await response.json();

        if (addresses.length > 0) {
          const billingAddress = addresses[0];
          this.billing = {
            id: billingAddress._id || null,
            street: billingAddress.street || "",
            city: billingAddress.city || "",
            postalCode: billingAddress.postalCode || "",
            country: billingAddress.country || "",
          };

          this.shipping = { ...this.billing, id: null};
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des adresses :", error);
      }
    },
    async saveAddress(address, type) {
      const jwtToken = localStorage.getItem("jwtToken");
      const url = address.id
        ? `${__VITE_API_URL__}/api/address/${address.id}`
        : `${__VITE_API_URL__}/api/address`;

      const method = address.id ? "PUT" : "POST";

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            userId: this.user._id,
            street: address.street,
            city: address.city,
            postalCode: address.postalCode,
            country: address.country,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Erreur lors de l'enregistrement de l'adresse de ${type}.`
          );
        }

        const savedAddress = await response.json();
        setTimeout(() => {
          toast.success(
            `Adresse de ${type === "billing" ? "facturation" : "livraison"} ${
              method === "POST" ? "créée" : "mise à jour"
            } avec succès.`,
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        }, 500)
        

        return savedAddress;
      } catch (error) {
        console.error( 
          `Erreur lors de l'enregistrement de l'adresse ${type} :`,
          error
        );
        toast.error(`Erreur lors de l'enregistrement de l'adresse ${type}.`);
      }
    },
    async submitAll() {
      try {
        const savedBillingAddress = await this.saveAddress(
          this.billing,
          "billing"
        );
        if (savedBillingAddress) {
          this.billing.id = savedBillingAddress._id;
        }

        const savedShippingAddress = await this.saveAddress(
          this.shipping,
          "shipping"
        );
        if (savedShippingAddress) {
          this.shipping.id = savedShippingAddress._id;
        }

        this.$router.push({
          name: "paiement",
          query: { totalAmount: this.totalAmount },
        });
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des adresses :", error);
      }
    },
  },
  mounted() {
    if (this.user) {
      this.fetchUserAddresses();
    }
  },
};
</script>