<template>
  <router-link 
    :to="`/pokemon/${id}`"
    class="block"
  >
    <div 
      class="relative grid max-w-2xl grid-cols-[1fr_2fr] rounded-xl border-2 border-gray-300 bg-white p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
      @click="allerVersDetailsPokemon"
    >
      <button class="absolute right-2 top-2" @click.prevent.stop="basculerEtoile">
        <svg class="h-6 w-6 rounded-full border-2 border-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" :stroke="estFavori ? '#FFD700' : 'gray'">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </button>
    
      <div class="h-full rounded-lg border-2 border-gray-300 p-2">
        <img :src="image" :alt="nom" class="h-full w-full object-cover rounded-lg">
      </div>
    
      <div class="pl-4">
        <div class="mb-2 flex gap-2">
          <button 
            v-for="type in types" 
            :key="type"
            @click.prevent.stop="$emit('filtrer-par-type', type)"
            class="rounded-md px-6 py-1 font-extrabold text-white uppercase w-32 text-center"
            :class="[getTypeColor(type)]"
          >
            {{ type }}
          </button>
        </div>
    
        <h2 class="mb-1 text-xl font-extrabold uppercase">{{ nom }}</h2>
        <p class="mb-2 text-sm text-gray-600">{{ description }}</p>
    
        <p class="mb-4 text-xl font-extrabold">{{ prix }}€ HT</p>
    
        <hr class="my-4 border-gray-300" />
    
        <div class="flex items-end gap-4">
          <div>
            <span class="mb-1 block text-xs">QUANTITÉ</span>
            <div class="flex">
              <button 
                class="rounded-l-lg border border-gray-300 px-3 py-1"
                @click.prevent.stop="diminuerQuantite"
              >-</button>
              <input 
                type="text" 
                v-model="quantite" 
                class="w-12 text-center border-y border-gray-300"
                @click.prevent.stop
              />
              <button 
                class="rounded-r-lg border border-gray-300 px-3 py-1"
                @click.prevent.stop="augmenterQuantite"
              >+</button>
            </div>
          </div>
          <button 
            @click.prevent.stop="basculerCoeur"
            class="rounded-full border-2 border-gray-300 p-1.5 transition-colors duration-200 hover:bg-yellow-100 flex items-center justify-center h-[34px] w-[34px]"
          >
            <svg 
              class="w-5 h-5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              :fill="estAime ? '#ff4c4c' : 'none'"
              :stroke="estAime ? '#ff4c4c' : 'gray'"
              stroke-width="2"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </router-link>
</template>
      
    <script>
    export default {
      name: 'PokemonCard',
      props: {
        id: { type: Number, required: true },
        nom: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        prix: { type: Number, required: true },
        types: { type: Array, required: true }
      },
      data() {
        return {
          quantite: 1,
          estFavori: false,
          estAime: false
        }
      },
      methods: {
        getTypeColor(type) {
          const couleurs = {
            normal: 'bg-gray-400',
          feu: 'bg-red-500',
          eau: 'bg-blue-500',
          plante: 'bg-green-500',
          électrique: 'bg-yellow-500',
          glace: 'bg-blue-300',
          combat: 'bg-red-700',
          poison: 'bg-purple-500',
          sol: 'bg-yellow-600',
          vol: 'bg-blue-400',
          psy: 'bg-pink-500',
          insecte: 'bg-green-600',
          roche: 'bg-yellow-800',
          spectre: 'bg-purple-700',
          dragon: 'bg-purple-600',
          ténèbres: 'bg-gray-700',
          acier: 'bg-gray-500',
          fée: 'bg-pink-400'
          }
          return couleurs[type] || 'bg-gray-500'
        },
        augmenterQuantite() {
          this.quantite++
        },
        diminuerQuantite() {
          if (this.quantite > 1) {
            this.quantite--
          }
        },
        basculerEtoile() {
          this.estFavori = !this.estFavori
        },
        basculerCoeur() {
          this.estAime = !this.estAime
        },
        allerVersDetailsPokemon() {
          this.$router.push(`/pokemon/${this.id}`)
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
      
