<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-semibold text-center mb-4">Effectuez votre paiement de {{ (totalAmount).toFixed(2) }} €</h1>
    <div id="card-element" class="p-4 border border-gray-300 rounded-md mb-4"></div>
    <div id="card-errors" role="alert" class="text-red-500 text-sm mb-4"></div>
    <button
      @click="handlePayment"
      :disabled="loading"
      class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span v-if="loading">Traitement...</span>
      <span v-else>Payer</span>
    </button>
    <p v-if="successMessage" class="text-green-500 text-sm mt-4 text-center">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-500 text-sm mt-4 text-center">{{ errorMessage }}</p>
  </div>
</template>
  
<script>
  import { loadStripe } from '@stripe/stripe-js';

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
          console.log('Token JWT :', jwtToken);

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

          console.log('Données envoyées :', orderDetails);

          if (!response.ok) {
            throw new Error('Erreur lors de la création de la commande');
          }

          const data = await response.json();
          console.log('Commande créée avec succès :', data);
        } catch (error) {
          console.error('Erreur :', error.message);
        }
      },
    },
  };
  </script>
  