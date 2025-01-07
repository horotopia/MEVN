<template>
  <div class="flex flex-col items-center min-h-screen pt-12 sm:pt-24 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-2xl">
      <div class="bg-white rounded-xl border-2 border-[#DDDDDD] shadow-[0_4px_8px_rgba(0,0,0,0.3)] overflow-hidden">
        <!-- Bannière -->
        <div class="bg-[#C73D3D] py-3 sm:py-4 px-4 sm:px-6 text-white">
          <h1 class="text-xl sm:text-2xl font-bold text-center font-primary">CENTRE POKÉMON - PAIEMENT</h1>
        </div>

        <div class="p-6 sm:p-12">
          <p class="text-lg sm:text-xl text-center mb-6 sm:mb-8 font-secondary font-semibold text-gray-900">
            Montant total : {{ (totalAmount).toFixed(2) }} €
          </p>

          <div class="space-y-6 sm:space-y-8 font-secondary font-semibold">
            <div>
              <label class="flex items-center space-x-2 mb-2">
                <div class="w-1 h-5 bg-[#C73D3D]"></div>
                <span class="font-medium font-secondary font-semibold text-gray-900 text-sm sm:text-base">Informations de paiement</span>
              </label>
              <div id="card-element" 
                class="w-full px-3 sm:px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C73D3D] font-secondary">
              </div>
              <div id="card-errors" role="alert" class="mt-1 text-xs sm:text-sm text-[#C73D3D] font-secondary"></div>
            </div>

            <button
              @click="handlePayment"
              :disabled="loading"
              class="w-full sm:w-64 mx-auto block bg-[#C73D3D] text-white py-2.5 sm:py-3 px-4 rounded-full hover:bg-[#B23535] transition-colors duration-200 font-primary font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <span class="mr-2">Traitement</span>
                <pokeballLoader class="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <span v-else>Valider le paiement</span>
            </button>
          </div>

          <div class="mt-4 text-center">
            <p v-if="successMessage" class="text-green-500 font-secondary font-medium mt-4 text-sm sm:text-base">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-[#C73D3D] font-secondary font-medium mt-4 text-sm sm:text-base">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import { loadStripe } from '@stripe/stripe-js';
  import pokeballLoader from './pokeballLoader.vue';

  const __VITE_API_URL__ = import.meta.env.VITE_API_URL;
  
  export default {
    components: {
      pokeballLoader
    },
    props: {
        totalAmount: {
          type: Number,
          required: true,
        },
    },
    data() {
      return {
        cartItems: [],
        stripe: null,
        elements: null,
        card: null,
        loading: false,
        errorMessage: null,
        successMessage: null,
      };
    },
    async mounted() {
      const storedCart = localStorage.getItem('cart');
      this.cartItems = storedCart ? JSON.parse(storedCart) : [];
      this.stripe = await loadStripe('pk_test_51QbfWPAp1XlFPm6z7th8WLTBBSzesVnizSwg3AaDPyGcVuBNennpWxZ8vpHGmwcXUNKBNVkpS6WNRhs31UT5Gabe00G4JD2kll'); // Remplacez par votre clé publique Stripe
      this.elements = this.stripe.elements();
  
      this.card = this.elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#fa755a',
          },
        },
      });
      this.card.mount('#card-element');
  
      this.card.on('change', (event) => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    },
    methods: {
      async handlePayment() {
        this.loading = true;
        this.errorMessage = null;
        this.successMessage = null;
  
        try {
          const response = await fetch(`${__VITE_API_URL__}/create-payment-intent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: this.totalAmount, 
              currency: 'eur',
            }),
          });
  
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
  
          const result = await this.stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: this.card,
            },
          });
  
          if (result.error) {
            this.errorMessage = result.error.message;
          } else if (result.paymentIntent.status === 'succeeded') {
            this.successMessage = 'Paiement réussi ! Merci pour votre achat.';
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cart-updated'));

            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user ? user._id : null;

            if (!userId) {
              console.error('Impossible de récupérer userId depuis localStorage');
              return;
            }

            const items = this.cartItems.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
              price: item.price,
            }));

            const orderDetails = {
              userId: userId,
              items: items,
              totalAmount: this.totalAmount,
              status: 'pending',
            };
          await this.createOrder(orderDetails);
          }
        } catch (error) {
          this.errorMessage = error.message;
        } finally {
          this.loading = false;
        }
      },
      async createOrder(orderDetails) {
        try {
          const jwtToken = localStorage.getItem('jwtToken');

          if (!jwtToken) {
            console.error('Token JWT manquant');
            return;
          }

          const response = await fetch(`${__VITE_API_URL__}/api/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(orderDetails),
          });


          if (!response.ok) {
            throw new Error('Erreur lors de la création de la commande');
          }

          const data = await response.json();
        } catch (error) {
          console.error('Erreur :', error.message);
        }
      },
    },
  };
  </script>
  
<style scoped>
.font-primary {
  font-family: var(--font-primary);
}

.font-secondary {
  font-family: var(--font-secondary);
}

/* Style personnalisé pour l'élément de carte Stripe */
:deep(#card-element) {
  min-height: 40px;
  background: white;
  transition: all 0.3s ease;
}

:deep(#card-element:focus-within) {
  border-color: #C73D3D;
  box-shadow: 0 0 0 1px rgba(199, 61, 61, 0.2);
}

:deep(.StripeElement) {
  padding: 8px 0;
}

:deep(.StripeElement--focus) {
  border-color: #C73D3D;
}

/* Personnalisation des styles Stripe */
:deep(#card-element)::v-deep {
  font-family: var(--font-secondary);
  font-size: 16px;
  color: #32325d;
}

:deep(#card-element)::v-deep input::placeholder {
  color: #9CA3AF;
  opacity: 0.7;
}

.text-red-600 {
  color: #C73D3D;
}

.border-red-500 {
  border-color: #C73D3D;
}

/* Ajustements responsifs pour Stripe */
@media (max-width: 640px) {
  :deep(#card-element)::v-deep {
    font-size: 14px;
  }
  
  :deep(#card-element) {
    min-height: 36px;
  }
}
</style>
  