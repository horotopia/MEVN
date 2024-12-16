<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  mounted() {
    document.title = "Pokeshop";
  },
};
</script>
