<script>

import FooTer from './FooTer.vue';
import NavBar from './NavBar.vue';

  export default {
  components: { FooTer, NavBar },
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

  <div class="flex flex-col min-h-screen bg-gray-100">
    <NavBar />
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

    <FooTer />
  </div>
</template>

  
  
  <style scoped>
  .registration-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f4f4f4;
  }
  
  .header,
  .footer {
    background-color: #e51b24;
    padding: 10px;
    text-align: center;
  }
  
  .logo,
  .footer-logo {
    height: 40px;
  }
  
  .main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .registration-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  h1,
  h2 {
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .register-button,
  .login-button {
    background-color: #e51b24;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .register-button:hover,
  .login-button:hover {
    background-color: #c2161c;
  }
  
  .login-link {
    margin-top: 20px;
  }
  
  .login-button {
    background-color: #333;
    margin-top: 10px;
  }
  </style>
  