<script>

  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      submitLogin() {
        this.errorMessage = '';
  
        fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
          credentials: 'include'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
          }
          return response.json();
        })
        .then(data => {
        if (data.jwtToken) {
          localStorage.setItem('jwtToken', data.jwtToken);

          this.$router.push('/admin');
        } else {
          this.errorMessage = 'crotte';
        }
      })
        .catch(error => {
          this.errorMessage = 'Email ou mot de passe incorrect';
          console.error('Erreur de connexion', error);
        });
      }
    }
  };
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-grow">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">CONNEXION</h2>
      <div v-if="errorMessage" class="text-red-500 font-bold mb-4">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="submitLogin" class="space-y-6">
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
          class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
          Connexion
        </button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-gray-600">Vous n'avez pas de compte ?</p>
        <router-link to="/register">
          <button
            class="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
            S'inscrire
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>