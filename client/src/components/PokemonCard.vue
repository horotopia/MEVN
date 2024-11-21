<template>
  <div class="grid grid-cols-[1fr_2fr] grid-rows-1gap-x-0 gap-y-0 bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-left transform transition-transform hover:scale-105">
    <div class="">
      <img :src="image" :alt="name" class="w-40 h-40 object-contain" />
    </div>

    <div class="flex-1">
      <div :class="`badge ${badgeColorClass}`">{{ types[0] }}</div>
      <h3 class="text-3xl font-bold text-gray-800 mb-2">{{ name }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      
      <div class="flex items-center justify-between mb-4">
        <span class="text-2xl font-bold text-gray-900">{{ price }}€ HT</span>
        <button :class="buttonColorClass" class="text-white font-semibold px-4 py-2 rounded-lg transition-colors">
          Ajouter au Panier
        </button>
      </div>

      <router-link :to="`/pokemon/${id}`" class="text-gray-700 hover:text-gray-900 flex items-center">
        <span class="mr-2">Voir Détails</span>
      </router-link>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'PokemonCard',
    props: {
      id: Number,
      name: String,
      description: String,
      image: String,
      price: Number,
      types: Array
    },
    computed: {
      buttonColorClass() {
        if (!this.types || this.types.length === 0) return 'bg-gray-500 hover:bg-gray-600';
        const primaryType = this.types[0];
  
        switch (primaryType) {
          case 'fire':
            return 'bg-red-600 hover:bg-red-700';
          case 'water':
            return 'bg-blue-600 hover:bg-blue-700';
          case 'grass':
            return 'bg-green-600 hover:bg-green-700';
          case 'electric':
            return 'bg-yellow-500 hover:bg-yellow-600';
          case 'psychic':
            return 'bg-pink-600 hover:bg-pink-700';
          case 'rock':
            return 'bg-gray-700 hover:bg-gray-800';
          case 'ground':
            return 'bg-yellow-700 hover:bg-yellow-800';
          case 'fairy':
            return 'bg-pink-400 hover:bg-pink-500';
          case 'fighting':
            return 'bg-orange-700 hover:bg-orange-800';
          case 'poison':
            return 'bg-purple-600 hover:bg-purple-700';
          default:
            return 'bg-gray-500 hover:bg-gray-600';
        }
      },
      badgeColorClass() {
        if (!this.types || this.types.length === 0) return 'bg-gray-400';
        const primaryType = this.types[0];
  
        switch (primaryType) {
          case 'fire':
            return 'bg-red-400';
          case 'water':
            return 'bg-blue-400';
          case 'grass':
            return 'bg-green-400';
          case 'electric':
            return 'bg-yellow-400';
          case 'psychic':
            return 'bg-pink-400';
          case 'rock':
            return 'bg-gray-500';
          case 'ground':
            return 'bg-yellow-600';
          case 'fairy':
            return 'bg-pink-300';
          case 'fighting':
            return 'bg-orange-500';
          case 'poison':
            return 'bg-purple-500';
          default:
            return 'bg-gray-400';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .badge {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: 1rem;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  </style>
  