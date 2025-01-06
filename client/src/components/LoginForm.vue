<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'LoginPage',
  mounted() {
    // Vérifier si on a un message de notification dans les query params
    const notification = this.$route.query.notification;
    if (notification) {
      toast.success(notification, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Nettoyer l'URL après avoir affiché la notification
      this.$router.replace({ query: {} });
    }
  },
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      errorMessage: '',
      isVerifying: false
    };
  },
  methods: {
    checkEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = "L'adresse e-mail est requise.";
      } else if (!emailPattern.test(this.email)) {
        this.emailError = "L'adresse e-mail n'est pas valide.";
      } else {
        this.emailError = '';
      }
    },
    checkPassword() {
      if (!this.password) {
        this.passwordError = "Le mot de passe est requis.";
      } else {
        this.passwordError = '';
      }
    },
    async submitLogin() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 403) {
            this.errorMessage = "Votre compte n'est pas encore vérifié. Veuillez vérifier vos emails et cliquer sur le lien de confirmation.";
            return;
          }
          throw new Error(data.message || 'Erreur lors de la connexion');
        }

        if (data.jwtToken) {
          localStorage.setItem('jwtToken', data.jwtToken);
          localStorage.setItem('userRole', data.user.role);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.$router.push('/dashboard');
        } else {
          throw new Error('Erreur de connexion : jeton non reçu.');
        }
      } catch (error) {
        this.errorMessage = error.message || 'Email ou mot de passe incorrect.';
        console.error('Erreur de connexion:', error);
      }
    },
    validateForm() {
      this.checkEmail();
      this.checkPassword();
      return !this.emailError && !this.passwordError;
    },
  },
};
</script>

<template>
  <div class="flex flex-col items-center pt-16 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-2xl">
      <h1 class="text-5xl font-extrabold text-center mb-12 font-primary whitespace-nowrap">COMPTE POKÉSHOP</h1>

      <div
        class="bg-white rounded-xl border-2 border-[#DDDDDD] shadow-[0_4px_8px_rgba(0,0,0,0.3)] p-12 max-w-xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-10 font-primary">CONNEXION</h2>

        <form @submit.prevent="submitLogin" novalidate class="space-y-8 font-secondary font-semibold">
          <div>
            <label class="flex items-center space-x-2 mb-2">
              <div class="w-1 h-5 bg-[#C73D3D]"></div>
              <span class="font-medium font-secondary font-semibold text-gray-900">Adresse E-mail</span>
            </label>
            <input type="email" v-model="email" @input="checkEmail" placeholder="Adresse E-mail"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400"
              :class="{ 'border-red-500': emailError }" required />
            <p v-if="emailError" class="mt-1 text-sm text-red-600 font-secondary">{{ emailError }}</p>
          </div>

          <div>
            <label class="flex items-center space-x-2 mb-2">
              <div class="w-1 h-5 bg-[#C73D3D]"></div>
              <span class="font-medium font-secondary font-semibold text-gray-900">Mot de passe</span>
            </label>
            <input type="password" v-model="password" @input="checkPassword" placeholder="Mot de passe"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400"
              :class="{ 'border-red-500': passwordError }" required />
            <p v-if="passwordError" class="mt-1 text-sm text-red-600 font-secondary">{{ passwordError }}</p>
            <router-link to="/forgot-password" class="text-[#4A90E2] hover:text-[#357ABD] text-sm font-secondary">
              Mot de passe oublié ?
            </router-link>
          </div>

          <p v-if="errorMessage" class="text-center mt-4 text-red-600 font-secondary">{{ errorMessage }}</p>

          <button type="submit"
            class="w-48 mx-auto block bg-[#C73D3D] text-white py-2 rounded-full hover:bg-[#B23535] transition-colors duration-200 font-primary font-bold mt-8 text-lg">
            Se connecter
          </button>
        </form>
      </div>

      <div class="text-center mt-4 font-bold font-primary">
        <p class="text-gray-800 mb-4">Vous n'avez pas de compte ?</p>
        <router-link to="/register"
          class="inline-block bg-[#C73D3D] text-white py-2 px-8 rounded-full hover:bg-[#B23535] transition-colors duration-200 text-lg">
          Créer un compte
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

.bg-red-600 {
  background-color: #C73D3D;
}

.hover\:bg-red-700:hover {
  background-color: #B23535;
}

.w-1.h-4.bg-red-600 {
  background-color: #C73D3D;
}

input::placeholder {
  color: #9CA3AF;
  opacity: 0.7;
}

.border-red-500 {
  border-color: #C73D3D;
}

.text-red-600 {
  color: #C73D3D;
}
</style>
