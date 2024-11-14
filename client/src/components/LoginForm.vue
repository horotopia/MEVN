<template>
  <section class="w-full">
    <div class="max-w-md mx-auto mt-12 p-6 bg-gray-100 border border-gray-300 rounded-lg">
      <!-- Affichage du message d'erreur -->
      <div v-if="errorMessage" class="text-red-500 font-bold mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="submitLogin">
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            class="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block mb-2">Mot de passe</label>
          <input
            type="password"
            v-model="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button type="submit" class="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700">
          Se connecter
        </button>
      </form>
    </div>
  </section>
</template>
  
  <script>

  import NavBar from './NavBar.vue';

  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '', // Variable pour stocker le message d'erreur
      };
    },
    methods: {
      submitLogin() {
        this.errorMessage = ''; // Réinitialiser le message d'erreur avant chaque soumission
  
        fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
          }
          return response.json();
        })
        .then(data => {
        // Si la connexion est réussie, rediriger vers la page admin
        if (data.jwtToken) {
          localStorage.setItem('jwtToken', data.jwtToken);

          // Redirection vers la page admin
          this.$router.push('/admin');
        } else {
          this.errorMessage = 'crotte';
        }
      })
        .catch(error => {
          this.errorMessage = 'Email ou mot de passe incorrect'; // Message d'erreur à afficher
          console.error('Erreur de connexion', error);
        });
      }
    }
  };
  </script>