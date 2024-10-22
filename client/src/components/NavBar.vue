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
  <div class="bg-red-500 p-4 flex justify-between items-center">
    <div class="logo">
      <router-link to="/">
        <img class="w-2/5" src="../assets/img/POKESHOP_LOGO.png" alt="Logo Pokeshop" />
      </router-link>
    </div>
  </div>
  <nav class="bg-red-400 py-2">
    <ul class="flex space-x-2 justify-center items-center">
      <li><router-link to="" class="hover:underline"> Pokémon</router-link> | </li>
      <li><router-link to="" class="hover:underline"> Pokéball</router-link> | </li>
      <li><router-link to="" class="hover:underline"> Accéssoires</router-link> | </li>
      <li><router-link to="/login" class="hover:underline"> Login</router-link> | </li>
      <button @click="logout" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Déconnexion</button>
    </ul>
  </nav>
</template>