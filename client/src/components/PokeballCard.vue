<template>
    <div class="grid grid-cols-[1fr_2fr] grid-rows-1gap-x-0 gap-y-0 bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-left transform transition-transform hover:scale-105">
      <div class="">
        <img :src="image" :alt="name" class="w-40 h-40 object-contain" />
      </div>

      <div class="flex-1">
        <h3 class="text-3xl font-bold text-gray-800 mb-2">{{ name }}</h3>
        
        <div class="flex items-center justify-between mb-4">
          <button class="text-white font-semibold px-4 py-2 rounded-lg transition-colors">
            Ajouter au Panier
          </button>
        </div>

        <router-link :to="`/pokeball/${id}`" class="text-gray-700 hover:text-gray-900 flex items-center">
          <span class="mr-2">Voir Détails</span>
        </router-link>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'PokeballCard',
  props: {
    id: Number,
    name: String,
    image: String,
  },
};
</script>