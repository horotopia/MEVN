<script>
export default {
  data() {
    return {
      nom: '',
      email: '',
      message: '',
      emailError: ''
    }
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
      if (!this.validateEmail(this.email)) {
        this.emailError = 'Veuillez entrer une adresse e-mail valide';
        return;
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center pt-16 px-4 sm:px-6 lg:px-8 pb-16">
    <div class="w-full max-w-2xl">
      <h1 class="text-2xl md:text-5xl font-extrabold text-center mb-12 font-primary whitespace-nowrap">CONTACTEZ-NOUS</h1>
      
      <div class="bg-white rounded-xl border-2 border-[#DDDDDD] shadow-[0_4px_8px_rgba(0,0,0,0.3)] p-12 max-w-xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-10 font-primary">FORMULAIRE DE CONTACT</h2>
        
        <form 
          @submit.prevent="handleSubmit"
          class="space-y-8 font-secondary font-semibold"
        >
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="flex items-center space-x-2 mb-2">
                <div class="w-1 h-5 bg-[#C73D3D]"></div>
                <span class="font-medium font-secondary font-semibold text-gray-900">Nom - Prénom</span>
              </label>
              <input
                type="text"
                v-model="nom"
                placeholder="Votre nom complet"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400"
                required
              />
            </div>

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
          </div>

          <div>
            <label class="flex items-center space-x-2 mb-2">
              <div class="w-1 h-5 bg-[#C73D3D]"></div>
              <span class="font-medium font-secondary font-semibold text-gray-900">Votre Message</span>
            </label>
            <textarea
              v-model="message"
              placeholder="Votre message"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C73D3D] font-secondary font-semibold placeholder-gray-400 h-32 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-48 mx-auto block bg-[#C73D3D] text-white py-2 rounded-full hover:bg-[#B23535] transition-colors duration-200 font-primary font-bold mt-8 text-lg"
          >
            ENVOYER
          </button>
        </form>
      </div>

      <div class="text-center mt-8 space-y-4 font-secondary">
        <p class="text-gray-600">
          <span class="font-bold">Email :</span> pokeshop@gmail.com
        </p>
        <p class="text-gray-600">
          <span class="font-bold">Adresse :</span> 242 Rue du Faubourg Saint-Antoine, 75012 Paris
        </p>
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

input::placeholder,
textarea::placeholder {
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