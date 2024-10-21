<template>
  <section class="loginForm">
    <div class="login-container">
      <!-- Affichage du message d'erreur -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
  
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
  
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password" id="password" required />
        </div>
  
        <button type="submit">Se connecter</button>
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


  
  <style scoped>
  .loginForm{
    width: 100%;
    height: auto;
  }

  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  /* Style pour le message d'erreur */
  .error-message {
    color: red;
    margin-bottom: 15px;
    font-weight: bold;
  }
  </style>
  