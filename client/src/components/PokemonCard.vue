<template>
<div class="relative grid max-w-2xl grid-cols-[1fr_2fr] rounded-xl border-2 border-gray-300 bg-white p-4 shadow-lg">
  <button class="absolute right-2 top-2" @click="toggleFavorite">
    <svg class="h-6 w-6 rounded-full border-2 border-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" :stroke="isFavorite ? '#FFD700' : 'gray'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </button>

  <div class="h-full rounded-lg border-2 border-gray-300">
    <img :src="image" :alt="name" class="h-full w-full object-cover rounded-lg">
  </div>

  <div class="pl-4">
    <div class="mb-2 flex gap-2">
      <button 
        v-for="type in types" 
        :key="type.original"
        :class="[
          'rounded-md px-6 py-1 font-bold text-white uppercase',
          getTypeColor(type.original)
        ]"
      >
        {{ type.translated }}
      </button>
    </div>

    <h2 class="mb-1 text-xl font-extrabold uppercase">{{ name }}</h2>
    <p class="mb-2 text-sm text-gray-600">{{ description }}</p>

    <p class="mb-4 text-xl font-extrabold">{{ price }}€ HT</p>

    <hr class="my-4 border-gray-300" />

    <div class="flex items-end gap-4">
      <div>
        <span class="mb-1 block text-xs">QUANTITÉ</span>
        <div class="flex">
          <button 
            class="rounded-l-lg border border-gray-300 px-3 py-1"
            @click="decrementQuantity"
          >-</button>
          <input 
            type="text" 
            v-model="quantity" 
            class="w-12 text-center border-y border-gray-300"
          />
          <button 
            class="rounded-r-lg border border-gray-300 px-3 py-1"
            @click="incrementQuantity"
          >+</button>
        </div>
      </div>

      <button 
        @click="addToCart"
        class="whitespace-nowrap rounded-full bg-[#ff4c4c] border-2 border-[#D43C3C] px-4 py-1 font-bold text-white transition ease-in-out active:bg-[#CC3C3C] active:border-[#A82E2E]"
      >
        AJOUTER AU PANIER
      </button>
      <button 
        @click="toggleFavorite"
        class="rounded-full border-2 border-gray-300 px-2 py-1 transition-colors duration-200 hover:bg-yellow-100"
      >
        ❤️
      </button>
    </div>
  </div>
</div>
</template>
  
<script>
export default {
  name: 'PokemonCard',
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    types: { type: Array, required: true }
  },
  data() {
    return {
      quantity: 0,
      isFavorite: false
    }
  },
  methods: {
    getTypeColor(type) {
      const colors = {
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        grass: 'bg-green-500',
        electric: 'bg-yellow-500',
        ice: 'bg-blue-300',
        fighting: 'bg-red-700',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-600',
        flying: 'bg-blue-400',
        psychic: 'bg-pink-500',
        bug: 'bg-green-600',
        rock: 'bg-yellow-800',
        ghost: 'bg-purple-700',
        dragon: 'bg-purple-600',
        dark: 'bg-gray-700',
        steel: 'bg-gray-500',
        fairy: 'bg-pink-400'
      }
      return colors[type] || 'bg-gray-500'
    },
    incrementQuantity() {
      this.quantity++
    },
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity--
      }
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
    },
    addToCart() {
      if (this.quantity > 0) {
        this.$emit('add-to-cart', {
          id: this.id,
          name: this.name,
          quantity: this.quantity,
          price: this.price
        })
        this.quantity = 0
      }
    }
  }
}
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
  