<template>
  <div class="min-h-screen flex bg-gray-100">
      <aside class="w-1/6 p-8 bg-white border-r border-gray-300">
        <h2 class="text-2xl font-bold mb-4">Filtres</h2>
        <div>
          <label class="block mb-2 text-gray-700">Type de Pokeball</label>
          <select v-model="selectedType" class="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">Simple</option>
            <option value="fire">Magique</option>
            <option value="water">Démoniaque</option>
          </select>
        </div>
      </aside>
  
      <main class="w-5/6 p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-6">
          <div v-for="Pokeball in filteredPokeballs" :key="Pokeball.id">
            <PokeballCard 
              :id="pokeball.id"
              :name="pokeball.name"
            />
          </div>
        </div>
      </main>
    </div>
</template>

<script>
  import PokeballCard from '../../components/PokeballCard.vue';
  
  export default {
    components: {
      PokeballCard
    },
    data() {
      return {
        Pokeball: [],
      };
    },
    async created() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/item?limit=6');
        const data = await response.json();
  
        const PokeballsData = await Promise.all(
          data.results.map(async (Pokeball) => {
            const PokeballDetails = await fetch(Pokeball.url);
            const details = await PokeballDetails.json();
  
            return {
              id: details.id,
              name: details.name,
            };
          })
        );
  
        this.pokemons = PokeballsData;
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
  };
  </script>