<script>
export default {
  name: 'NavBar',
  data() {
    return {
      cartItemCount: 0
    }
  }
}
</script>

<template>
  <div>
    <div class="bg-[#C73D3D] px-8 py-4 flex justify-between items-center">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/img/POKESHOP_LOGO.png" alt="Logo Pokeshop" class="h-20" />
        </router-link>
      </div>
      
      <div class="search-container relative flex flex-1 mx-12">
      </div>

      <div class="icons-container flex items-center gap-16">
        <router-link to="/panier" class="text-white flex flex-col items-center hover:opacity-80 relative">
          <div class="relative">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3H4L6 6L7 18H19L21 6H13L11 3" stroke="white" stroke-width="2"/>
              <circle cx="8" cy="21" r="2" stroke="white" stroke-width="2"/>
              <circle cx="18" cy="21" r="2" stroke="white" stroke-width="2"/>
            </svg>
            <div v-if="cartItemCount > 0" 
                 class="absolute -top-2 -right-2 bg-[#F4D03F] text-[#C73D3D] rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
              {{ cartItemCount }}
            </div>
          </div>
          <span class="text-xs mt-2 tracking-wide primary-font">Mon Panier</span>
        </router-link>
        
        <router-link to="/login" class="text-white flex flex-col items-center hover:opacity-80">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5"/>
            <circle cx="12" cy="8" r="3.5" stroke="white" stroke-width="1.5"/>
            <path d="M6 18C6 15.5 8 13.5 12 13.5C16 13.5 18 15.5 18 18" stroke="white" stroke-width="1.5"/>
          </svg>
          <span class="text-xs mt-2 tracking-wide primary-font">Mon Compte</span>
        </router-link>
      </div>
    </div>

    <nav class="flex bg-[#FF5353]">
      <div class="w-8"></div>
      <router-link 
        to="/pokemon" 
        class="bg-[#FFD233] px-8 py-2 text-white primary-font hover:opacity-90 border-l-2 border-r-2 border-[#C73D3D] text-[28px] nav-text-stroke"
      >
        Pokémon
      </router-link>
      
      <router-link 
        to="/accessoires" 
        class="bg-[#FF5353] px-8 py-2 text-white primary-font hover:opacity-90 border-r-2 border-[#C73D3D] text-[28px] nav-text-stroke"
      >
        Accessoires
      </router-link>

      <router-link 
        to="/loader" 
        class="bg-[#FF5353] px-8 py-2 text-white primary-font hover:opacity-90 border-r-2 border-[#C73D3D] text-[28px] nav-text-stroke"
      >
        Loader
      </router-link>
      
      <div class="flex-grow"></div>
      
      <router-link 
        to="/contact" 
        class="bg-[#FF5353] px-8 py-2 text-white primary-font hover:opacity-90 border-l-2 border-r-2 border-[#C73D3D] text-[28px] nav-text-stroke"
      >
        Contact
      </router-link>
      <div class="w-8"></div>
    </nav>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

.logo img {
  height: 80px;
  width: auto;
}

.search-container input {
  height: 42px;
  font-size: 1.1rem;
}

.icons-container a {
  transition: opacity 0.2s ease;
}

.primary-font {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 800;
  font-size: 1rem;
  text-transform: none;
  line-height: 1.2;
}

.nav-text-stroke {
  text-shadow: 
    -1px -1px 0 #C73D3D,
    1px -1px 0 #C73D3D,
    -1px 1px 0 #C73D3D,
    1px 1px 0 #C73D3D,
    2px 2px 4px rgba(0, 0, 0, 0.3);
}

.cart-count {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
