<script>
export default {
  data() {
    return {
      sidebarOpen: false,
      items: [
        { url: 'admin/users', label: 'Clients' },
        { url: '#', label: 'Produits' },
        { url: '#', label: 'Catégories' },
        { url: '#', label: 'Commandes' },
        { url: '#', label: 'Livraison' },
        { url: '#', label: 'Paramètres' },
      ],
    };
  },
  
  async logout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include' // Inclure les cookies dans la requête
      });

      if (response.ok) {
        // Rediriger l'utilisateur vers la page de connexion
        this.$router.push('/login');
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  }
};
</script>

<template>
  <div>
    <!-- Sidebar -->
    <div class="fixed left-0 top-0 w-64 h-full bg-gray-800 p-4 text-white">
      <a href="#" class="flex items-center pb-4 border-b border-gray-700">
        <img src="https://placehold.co/32x32" alt="Company Logo" class="w-8 h-8 rounded object-cover" />
        <span class="text-lg font-bold ml-3">Pokémon Inc.</span>
      </a>

      <ul class="flex flex-col mt-4">
        <li v-for="item in items" :key="item.label" class="mb-1">
          <a :href="item.url" class="flex items-center py-2 px-4 hover:bg-gray-700 rounded-md">
            <span class="text-sm">{{ item.label }}</span>
          </a>
        </li>
      </ul>
      <button @click="logout" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Déconnexion</button>
    </div>

    <!-- Overlay for sidebar on small screens (optional) -->
    <div v-if="sidebarOpen" class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden"></div>

    <!-- Main Content -->
    <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen p-6">
      <!-- Top Navigation -->
      <div class="bg-white p-4 shadow-md">
        <ul class="flex items-center text-sm">
          <li class="mr-4">
            <a href="#" class="text-gray-600">Rechercher ...</a>
          </li>
        </ul>
      </div>

      <!-- Page Content -->
      <div class="mt-6">
        <h1 class="text-2xl font-bold">Bienvenue sur le Dashboard</h1>
        <p class="mt-4">Ceci est la page d'asministration de PokeShop</p>
      </div>
    </main>
  </div>
</template>