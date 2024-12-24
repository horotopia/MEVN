<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Paiement</h2>
      <button @click="pay" class="bg-blue-500 text-white px-4 py-2">Payer</button>
    </div>
  </template>
  
  <script>
  import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    methods: {
      async pay() {
        const stripe = await loadStripe('your-stripe-public-key');
        const { id } = await this.$http.post('/api/payment-session', { cartItems: this.cartItems });
        stripe.redirectToCheckout({ sessionId: id });
      },
    },
  };
  </script>