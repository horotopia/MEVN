<template>
    <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-6 shadow-lg z-50">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div class="flex-1">
            <h2 class="text-lg font-semibold">Gérer vos préférences de cookies</h2>
            <p class="text-sm mt-2">
              Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez personnaliser vos choix ci-dessous.
            </p>
          </div>
            <div class="flex flex-col mt-4 lg:mt-0 lg:ml-6 space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="preferences.essential"
                disabled
                class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span class="text-sm">Cookies essentiels (obligatoires)</span>
            </label>
  
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="preferences.analytics"
                class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span class="text-sm">Cookies d'analyse</span>
            </label>
  
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="preferences.marketing"
                class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span class="text-sm">Cookies marketing</span>
            </label>
          </div>
        </div>
        <div class="mt-4 flex flex-col lg:flex-row items-center lg:items-end justify-between space-y-2 lg:space-y-0">
          <button
            @click="acceptAllCookies"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Tout accepter
          </button>
          <button
            @click="savePreferences"
            class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Sauvegarder mes choix
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showBanner: false,
        preferences: {
          essential: true, 
          analytics: false,
          marketing: false,
        },
      };
    },
    created() {
      const savedPreferences = JSON.parse(localStorage.getItem("cookiePreferences"));
      if (!savedPreferences) {
        this.showBanner = true;
      } else {
        this.preferences = savedPreferences;
      }
    },
    methods: {
      acceptAllCookies() {
        this.preferences.analytics = true;
        this.preferences.marketing = true;
        this.savePreferences();
      },
      savePreferences() {
        localStorage.setItem("cookiePreferences", JSON.stringify(this.preferences));
        this.showBanner = false;
      },
    },
  };
  </script>
  