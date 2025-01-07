<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter, useRoute } from 'vue-router';

const __VITE_API_URL__ = import.meta.env.VITE_API_URL;

export default {
  name: 'ResetPassword',
  setup() {
    const router = useRouter();
    const route = useRoute();
    return { router, route };
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: '',
      isLoading: false
    };
  },
  methods: {
    validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
      if (!this.password) {
        this.passwordError = "Le mot de passe est requis.";
        return false;
      } else if (!passwordRegex.test(this.password)) {
        this.passwordError = "Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
        return false;
      }
      this.passwordError = '';
      return true;
    },
    validateConfirmPassword() {
      if (!this.confirmPassword) {
        this.confirmPasswordError = "La confirmation du mot de passe est requise.";
        return false;
      } else if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = "Les mots de passe ne correspondent pas.";
        return false;
      }
      this.confirmPasswordError = '';
      return true;
    },
    async handleSubmit() {
      if (!this.validatePassword() || !this.validateConfirmPassword()) return;

      this.isLoading = true;
      try {
        const token = this.route.query.token;
        if (!token) {
          throw new Error('Token de réinitialisation invalide ou expiré');
        }

        const response = await fetch(`${__VITE_API_URL__}/api/auth/reset-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Erreur de réinitialisation:', data);
          if (response.status === 400) {
            throw new Error(data.message || 'Token invalide ou expiré');
          } else if (response.status === 404) {
            throw new Error('Utilisateur non trouvé');
          } else {
            throw new Error(data.message || 'Une erreur est survenue lors de la réinitialisation');
          }
        }

        this.router.push('/login').then(() => { 
          setTimeout(() =>  {
            toast.success('Votre mot de passe a été réinitialisé avec succès.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }, 500)
        });
      } catch (error) {
        toast.error(error.message || 'Une erreur est survenue lors de la réinitialisation', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center pt-24 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-2xl mb-48">
      <h1 class="text-5xl font-extrabold text-center mb-12 font-primary whitespace-nowrap">COMPTE POKÉSHOP</h1>

      <div class="bg-white rounded-xl border-2 border-[#DDDDDD] shadow-[0_4px_8px_rgba(0,0,0,0.3)] p-12 max-w-xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-10 font-primary">RÉINITIALISATION DU MOT DE PASSE</h2>

        <form @submit.prevent="handleSubmit" class="space-y-8 font-secondary font-semibold">
          <div>
            <label class="flex items-center space-x-2 mb-2">
              <div class="w-1 h-5 bg-[#C73D3D]"></div>
              <span class="font-medium font-secondary font-semibold text-gray-900">Nouveau mot de passe</span>
            </label>
            <input
              type="password"
              v-model="password"
              @input="validatePassword"
              placeholder="Nouveau mot de passe"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400"
              :class="{ 'border-red-500': passwordError }"
              required
            />
            <p v-if="passwordError" class="mt-1 text-sm text-red-600 font-secondary">{{ passwordError }}</p>
          </div>

          <div>
            <label class="flex items-center space-x-2 mb-2">
              <div class="w-1 h-5 bg-[#C73D3D]"></div>
              <span class="font-medium font-secondary font-semibold text-gray-900">Confirmer le mot de passe</span>
            </label>
            <input
              type="password"
              v-model="confirmPassword"
              @input="validateConfirmPassword"
              placeholder="Confirmer le mot de passe"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400"
              :class="{ 'border-red-500': confirmPasswordError }"
              required
            />
            <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600 font-secondary">{{ confirmPasswordError }}</p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-72 mx-auto block bg-[#C73D3D] text-white py-2 rounded-full hover:bg-[#B23535] transition-colors duration-200 font-primary font-bold mt-8 text-lg"
          >
            {{ isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe' }}
          </button>
        </form>
      </div>

      <div class="text-center mt-8 font-bold font-primary">
        <router-link
          to="/login"
          class="inline-block bg-[#C73D3D] text-white py-2 px-8 rounded-full hover:bg-[#B23535] transition-colors duration-200 text-lg"
        >
          Retour à la connexion
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-primary {
  font-family: var(--font-primary);
}

.font-secondary {
  font-family: var(--font-secondary);
}
</style> 