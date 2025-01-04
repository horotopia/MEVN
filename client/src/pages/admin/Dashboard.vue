<script setup>
const user = JSON.parse(localStorage.getItem('user'))
</script>

<template>
  <p>Bienvenue sur le tableau de bord {{ user.name }}</p>
</template>
