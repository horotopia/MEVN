<script>

export default{
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pokemon: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${this.id}`);
      this.pokemon = await response.json();
    } catch (err) {
      this.error = 'Erreur lors du chargement des détails du Pokémon.';
    } finally {
      this.loading = false;
    }
  },
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold mb-4">{{ pokemon?.name }}</h1>
    <img :src="pokemon?.image" alt="Pokémon" class="w-64 h-64 mb-4" />
    <p><strong>Description :</strong> {{ pokemon?.description }}</p>
    <p><strong>Type :</strong> {{ pokemon?.type }}</p>
    <p><strong>Poids :</strong> {{ pokemon?.weight }} g</p>
    <p><strong>Taille :</strong> {{ pokemon?.height }} cm</p>
    <p><strong>Prix :</strong> {{ pokemon?.price / 100 }} €</p>
    <p><strong>Stock :</strong> {{ pokemon?.stock }}</p>
  </div>
</template>