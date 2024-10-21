<script>
export default {
  name : 'LogOut',
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
    <router-link to="/logout"> Deconnexion</router-link>
</template>
  
<style scoped>
    footer {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1d1d1d;
    padding: 1rem 2rem;
    color: white;
    }
</style>
  