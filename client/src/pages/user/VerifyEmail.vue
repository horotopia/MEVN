<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow flex flex-col items-center pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-2xl">
        <div class="bg-white rounded-xl border-2 border-[#DDDDDD] shadow-[0_4px_8px_rgba(0,0,0,0.3)] p-12 max-w-xl mx-auto">
          <h1 class="text-5xl font-extrabold text-center mb-12 font-primary whitespace-nowrap">COMPTE POKÉSHOP</h1>
          
          <div class="text-center space-y-4">
            <div v-if="loading" class="flex flex-col items-center space-y-4">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#C73D3D] border-t-transparent"></div>
              <p class="text-xl font-secondary font-semibold text-gray-700">Vérification en cours...</p>
            </div>

            <div v-if="error" class="space-y-4">
              <div class="flex justify-center">
                <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <span class="text-[#C73D3D] text-3xl">❌</span>
                </div>
              </div>
              <p class="text-[#C73D3D] font-secondary font-semibold">{{ error }}</p>
            </div>

            <div v-if="success" class="space-y-4">
              <div class="flex justify-center">
                <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-500 text-3xl">✓</span>
                </div>
              </div>
              <p class="text-green-600 font-secondary font-semibold">Email vérifié avec succès !</p>
              <p class="text-gray-600 font-secondary">Vous allez être redirigé vers la page de connexion...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref('');
const success = ref(false);

onMounted(async () => {
  try {
    const token = route.query.token;
    const response = await fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Échec de la vérification');
    }
    
    success.value = true;
    setTimeout(() => router.push('/login'), 3000);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Une erreur est survenue';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.font-primary {
  font-family: var(--font-primary);
}

.font-secondary {
  font-family: var(--font-secondary);
}
</style> 