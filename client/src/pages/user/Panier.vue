<template>
    <div class="cart-page">
      <h1>Votre panier</h1>
      <div v-if="cartItems.length === 0">
        <p>Votre panier est vide.</p>
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="cart-item-info">
            <h2>{{ item.name }}</h2>
            <p>Prix : {{ item.price }} €</p>
            <p>Quantité : {{ item.quantity }}</p>
          </div>
          <button @click="removeFromCart(item.id)">Retirer</button>
        </div>
        <h3>Total : {{ cartTotal }} €</h3>
        <button @click="clearCart">Vider le panier</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      cartItems() {
        return this.$store.getters["cart/cartItems"];
      },
      cartTotal() {
        return this.$store.getters["cart/cartTotal"];
      },
    },
    methods: {
      removeFromCart(productId) {
        this.$store.dispatch("cart/removeProductFromCart", productId);
      },
      clearCart() {
        this.$store.dispatch("cart/clearCart");
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
  