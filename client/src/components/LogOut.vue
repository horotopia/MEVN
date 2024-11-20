<script>
export default {
  name : 'LogOut',
  methods: {
    logout() {
      this.deleteCookie('jwtToken');

      localStorage.removeItem('jwtToken');

      this.$router.push('/login');
    },
    deleteCookie(name) {
      document.cookie = name + '=; Max-Age=-99999999;'; 
    }
  }
};
</script>

<template>
    <router-link to="/logout"> Deconnexion</router-link>
</template>