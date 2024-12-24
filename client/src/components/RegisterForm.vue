<script>
  export default {
    name: 'RegistrationPage',
    data() {
      return {
        email: '',
        password: '',
        emailError: '',
      };
    },
    methods: {
      validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      checkEmail() {
        this.emailError = '';
        if (this.email && !this.validateEmail(this.email)) {
          this.emailError = 'Veuillez entrer une adresse e-mail valide';
        }
      },
      handleSubmit() {
        this.emailError = '';

        if (!this.email) {
          this.emailError = 'L\'adresse e-mail est requise';
          return false;
        }
        if (!this.validateEmail(this.email)) {
          this.emailError = 'Veuillez entrer une adresse e-mail valide';
          return false;
        }
        if (!this.password) {
          console.log("Le mot de passe est requis");
          return false;
        }

        console.log('Inscription réussie avec :', this.email, this.password);
        return true;
      },
    },
  };
</script>

<template>
  <div class="flex flex-col items-center pt-16 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-2xl">
      <h1 class="text-5xl font-extrabold text-center mb-12 font-primary whitespace-nowrap">COMPTE POKÉSHOP</h1>
      
      <div class="bg-white rounded-xl border-2 border-[#DDDDDD] shadow-[0_4px_8px_rgba(0,0,0,0.3)] p-12 max-w-xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-10 font-primary">INSCRIPTION</h2>
        
        <form 
          @submit.prevent="handleSubmit"
          novalidate
          class="space-y-8 font-secondary font-semibold"
        >
          <div>
            <label class="flex items-center space-x-2 mb-2">
              <div class="w-1 h-5 bg-[#C73D3D]"></div>
              <span class="font-medium font-secondary font-semibold text-gray-900">Adresse E-mail</span>
            </label>
            <input
              type="email"
              v-model="email"
              @input="checkEmail"
              placeholder="Adresse E-mail"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400"
              :class="{ 'border-red-500': emailError }"
              required
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-600 font-secondary">{{ emailError }}</p>
          </div>

          <div>
            <label class="flex items-center space-x-2 mb-2">
              <div class="w-1 h-5 bg-[#C73D3D]"></div>
              <span class="font-medium font-secondary font-semibold text-gray-900">Mot de passe</span>
            </label>
            <input
              type="password"
              v-model="password"
              placeholder="Mot de passe"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            class="w-48 mx-auto block bg-[#C73D3D] text-white py-2 rounded-full hover:bg-[#B23535] transition-colors duration-200 font-primary font-bold mt-8 text-lg"
          >
            S'inscrire
          </button>
        </form>
      </div>

      <div class="text-center mt-4 font-bold font-primary">
        <p class="text-gray-800 mb-4">Vous avez déjà un compte ?</p>
        <router-link 
          to="/login" 
          class="inline-block bg-[#C73D3D] text-white py-2 px-8 rounded-full hover:bg-[#B23535] transition-colors duration-200 text-lg"
        >
          Se connecter
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
