<template>
    <div v-if="pokemon" class="pokemon-details">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
      <p><strong>Types :</strong> {{ pokemon.types.map(t => t.type.name).join(', ') }}</p>
      <p><strong>Abilities :</strong> {{ pokemon.abilities.map(a => a.ability.name).join(', ') }}</p>
      <p><strong>Stats :</strong></p>
      <ul>
        <li v-for="stat in pokemon.stats" :key="stat.stat.name">
          {{ stat.stat.name }}: {{ stat.base_stat }}
        </li>
      </ul>
      <router-link to="/pokemon"><button>Retour à la liste</button></router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        pokemon: null
      };
    },
    async mounted() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
      this.pokemon = await response.json();
    },
    filters: {
      capitalize(value) {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  };
  </script>
  
  <style scoped>
 
  </style>