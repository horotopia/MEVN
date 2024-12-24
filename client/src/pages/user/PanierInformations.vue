<template>
    <form @submit.prevent="nextStep">
      <h2 class="text-xl font-bold mb-4">Informations Client</h2>
      <div>
        <label>Nom</label>
        <input v-model="formData.name" class="border p-2 rounded w-full" required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" v-model="formData.email" class="border p-2 rounded w-full" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 mt-4">Suivant</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return { formData: { name: '', email: '' } };
    },
    methods: {
      nextStep() {
        // Stocker les données dans le state global ou envoyer au backend.
        this.$router.push('/panier/paiement');
      },
    },
  };
  </script>