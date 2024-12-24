<template>
<div class="min-h-screen flex bg-gray-100">
  <div class="container mx-auto p-4 my-16">
    <!-- Panier -->
    <div class="flex flex-col lg:flex-row justify-between gap-4">
      <!-- Section gauche: Détails du panier -->
      <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">MON PANIER</h2>
        <!-- Article -->
        <div class="flex items-center justify-between border-b pb-4">
          <div class="flex items-center">
            <img
              src="../../assets/img/pikachu.jpg"
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
        <div class="flex items-center justify-between border-b pb-4 mt-4">
          <div class="flex items-center">
            <img
              src="../../assets/img/pikachu.jpg"
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
        <div class="flex items-center justify-between border-b pb-4 mt-4">
          <div class="flex items-center">
            <img
              src="../../assets/img/pikachu.jpg"
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
        <h2 class="text-xl font-semibold mb-4">Résumé de la commande</h2>
        <div class="pb-6">
          <p class="border-b pb-4 text-lg">1 Article</p>
          <div class="flex justify-between">
          <span>Pikachu</span>
          <span>x 3</span>
        </div>
        </div>
        <div class="flex justify-between text-lg">
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
  