<template>
<div class="min-h-screen flex bg-gray-100">
  <div class="container mx-auto p-4 mt-20">
    <!-- Panier -->
    <div class="flex flex-col lg:flex-row justify-between gap-4">
      <!-- Section gauche: Détails du panier -->
      <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">MON PANIER</h2>
        <!-- Article -->
        <div class="flex items-center justify-between border-b pb-4">
          <div class="flex items-center">
            <img
              src="https://via.placeholder.com/80"
              alt="Produit"
              class="w-20 h-20 object-cover rounded"
            />
            <div class="ml-4">
              <p class="font-medium">Pikachu</p>
              <button class="text-sm text-blue-300 mt-2 hover:underline">
                voir le produit
              </button>
            </div>
          </div>
          <p class="text-lg font-bold">47,99 €</p>
        </div>
      </div>

      <!-- Section droite: Résumé -->
      <div class="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">TOTAL</h2>
        <div class="flex justify-between">
          <span>Sous-total</span>
          <span>47,99 €</span>
        </div>
        <div class="mt-4">
          <button
            class="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg text-center"
          >
            PAIEMENT
          </button>
        </div>
        <div class="mt-4">
          <p class="text-sm">NOUS ACCEPTONS :</p>
          <div class="flex space-x-2 mt-2">
            <img src="https://via.placeholder.com/40x25" alt="Visa" />
            <img src="https://via.placeholder.com/40x25" alt="Mastercard" />
            <img src="https://via.placeholder.com/40x25" alt="PayPal" />
          </div>
        </div>
        <div class="mt-6 p-4 bg-gray-100 rounded-lg">
          <p class="text-sm">
            Pas de livrasion, le pokémon est à récupérer  <span class="font-bold">sur place</span>.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
  
  <script>

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
  