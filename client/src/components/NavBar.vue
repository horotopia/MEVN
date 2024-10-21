<script>
  export default {
    methods: {
      logout() {
        // Supprimer le cookie 'jwtToken'
        this.deleteCookie('jwtToken');

        // Effacer également les données du localStorage si tu en utilises
        localStorage.removeItem('jwtToken');

        // Rediriger vers la page de connexion
        this.$router.push('/login');
      },
      deleteCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;'; // Supprime le cookie
      }
    }
  };
</script>

<template>
    <div class="navbar">
      <div class="logo">
        <router-link to="/"><img class="logoImg" src="../assets/img/POKESHOP_LOGO.png" alt="Logo Pokeshop" /></router-link>
      </div>
    </div>
    <nav class="sousNav">
      <ul>
        <li><router-link to=""> Pokémon</router-link> | </li>
        <li><router-link to=""> Pokéball</router-link> | </li>
        <li><router-link to=""> Accéssoires</router-link> | </li>
        <li><router-link to="/login"> Login</router-link> | </li>
        <button @click="logout">Déconnexion</button>
      </ul>
    </nav>
  </template>
  
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #c73d3d;
    padding: 1rem 2rem;
    color: white;
  }
  
  .sousNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ff5353;
  }

  ul{
    display: flex;
    flex-direction: row;
  }
  
  .logoImg {
    width: 40%;
  }
  </style>
  