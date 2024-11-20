<script>
  export default {
    name: 'RegistrationPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      register() {
        if (this.email && this.password) {
          console.log('Inscription réussie avec :', this.email, this.password);
        } else {
          console.log("Veuillez remplir tous les champs.");
        }
      },
    },
  };
</script>


<template>
  <div class="flex flex-col items-center justify-center flex-grow">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">INSCRIPTION</h2>
      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label for="email" class="block text-gray-700 font-medium mb-2">Adresse E-mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Adresse E-mail"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700 font-medium mb-2">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Mot de passe"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          S'inscrire
        </button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-gray-600">Vous avez déjà un compte ?</p>
        <router-link to="/login">
          <button
            class="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Se connecter
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

  
  
  <style scoped>
  
  </style>
  