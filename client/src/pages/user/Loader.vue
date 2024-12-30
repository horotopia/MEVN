<template>
  <div class="min-h-screen flex bg-gray-100">
    <main class="flex-1 p-6">
      <PokeballLoader :isLoading="isLoading" />
    </main>
    <!-- Contenu de votre application -->
  </div>
</template>

<script>
import PokeballLoader from '../../components/PokeballLoader.vue';

export default {
  components: {
    PokeballLoader,
  },
  data() {
    return {
      isLoading: true, // ou true selon l'état initial
    };
  },
};
</script>

<style scoped>
* {
  height: 750px;
}
</style>
