<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from 'vue-router';

export default {
  name: 'ForgotPassword',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      email: '',
      emailError: '',
      isLoading: false
    };
  },
  methods: {
    checkEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = "L'adresse e-mail est requise.";
        return false;
      } else if (!emailPattern.test(this.email)) {
        this.emailError = "L'adresse e-mail n'est pas valide.";
        return false;
      }
      this.emailError = '';
      return true;
    },
    async handleSubmit() {
      if (!this.checkEmail()) return;
      
      this.isLoading = true;
      try {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Une erreur est survenue');
        }

        this.router.push('/login').then(() => { 
          setTimeout(() =>  {
            toast.success('Un email de réinitialisation a été envoyé à votre adresse email.', {
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
        toast.error(error.message || 'Une erreur est survenue', {
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
        <h2 class="text-2xl font-bold text-center mb-10 font-primary">MOT DE PASSE OUBLIÉ</h2>

        <p class="text-center mb-8 font-secondary text-gray-600">
          Entrez votre adresse e-mail ci-dessous. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-8 font-secondary font-semibold">
          <div>
            <label class="flex items-center space-x-2 mb-2">
              <div class="w-1 h-5 bg-[#C73D3D]"></div>
              <span class="font-medium font-secondary font-semibold text-gray-900">Adresse E-mail</span>
            </label>
            <input
              type="email"
              v-model="email"
              @input="checkEmail"
              placeholder="Votre adresse e-mail"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400"
              :class="{ 'border-red-500': emailError }"
              required
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-600 font-secondary">{{ emailError }}</p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-48 mx-auto block bg-[#C73D3D] text-white py-2 rounded-full hover:bg-[#B23535] transition-colors duration-200 font-primary font-bold mt-8 text-lg"
          >
            {{ isLoading ? 'Envoi en cours...' : 'Envoyer le lien' }}
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