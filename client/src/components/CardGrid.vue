<template>
    <div class="pokemon-grid">
      <div v-for="(pokemon, index) in pokemonProducts" :key="index" class="card">
        <img :src="pokemon.image" alt="Image du produit" class="card-img">
        <div class="card-body">
          <h3>{{ pokemon.name }}</h3>
          <p class="card-description">{{ pokemon.description }}</p>
          <p class="card-price">{{ pokemon.price }} €</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Simuler une liste de produits Pokémon
        pokemonProducts: [
          {
            name: 'Pikachu Figurine',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
            description: 'Figurine officielle de Pikachu',
            price: 19.99
          },
          {
            name: 'Eevee Peluche',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
            description: 'Peluche officielle de Eevee',
            price: 24.99
          },
          {
            name: 'Charizard Poster',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
            description: 'Poster mural de Charizard',
            price: 9.99
          },
          {
            name: 'Pokeball Clé USB',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            description: 'Clé USB en forme de Pokéball',
            price: 12.99
          },
          {
            name: 'Snorlax Coussin',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png',
            description: 'Coussin géant Snorlax',
            price: 39.99
          }
        ] 
      };
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour la grille des produits */
  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    justify-items: center;
    margin: 60px 0 80px 0;
  }
  
  .card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: scale(1.05);
    border-color: rgb(251, 87, 6);
  }
  
  .card-img {
    max-width: 100%;
    height: auto;
    margin-bottom: 15px;
  }
  
  .card-body h3 {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }
  
  .card-description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
  }
  
  .card-price {
    font-size: 1.1rem;
    color: #000;
    font-weight: bold;
  }
  </style>
  