<template>
  <div class="w-full h-auto rounded-lg md:rounded-xl bg-white p-2 md:p-4 shadow-lg border border-gray-300 md:border-2 max-w-[300px] mx-auto">
    <div class="mb-2 md:mb-3">
      <div class="aspect-square rounded-lg border border-gray-300 md:border-2 p-1 md:p-2">
        <div class="h-full w-full rounded-lg border border-gray-300 md:border-2">
          <img :src="image" :alt="nom" class="h-full w-full object-contain">
        </div>
      </div>
    </div>

    <div class="text-center h-12 md:h-16 flex flex-col justify-center">
      <h2 class="text-xs md:text-base montserrat-extrabold uppercase tracking-wide mb-0.5 md:mb-1 line-clamp-2">{{ nom }}</h2>
      <p class="text-xs md:text-sm font-semibold">{{ prix }}€ HT</p>
    </div>

    <div class="border-t border-gray-300 mb-1.5 md:mb-2"></div>

    <div>
      <p class="text-[10px] md:text-xs text-gray-600 text-left font-medium mb-0.5">QUANTITÉ</p>
      <div class="flex justify-center mb-1.5 md:mb-2">
        <div class="inline-flex text-xs md:text-sm">
          <button 
            class="rounded-l-lg border border-gray-300 px-1.5 md:px-2 py-0.5 hover:bg-gray-100 transition-colors"
            @click="diminuerQuantite"
          >-</button>
          <input 
            type="text" 
            v-model="quantite" 
            class="w-6 md:w-8 text-center border-y border-gray-300"
            readonly
          />
          <button 
            class="rounded-r-lg border border-gray-300 px-1.5 md:px-2 py-0.5 hover:bg-gray-100 transition-colors"
            @click="augmenterQuantite"
          >+</button>
        </div>
      </div>

      <button 
        @click="ajouterAuPanier"
        class="w-full rounded-full bg-[#ff4c4c] border border-[#D43C3C] md:border-2 px-2 md:px-3 py-1 text-white transition ease-in-out active:bg-[#CC3C3C] active:border-[#A82E2E] montserrat-extrabold text-[10px] md:text-sm"
      >
        AJOUTER
      </button>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'AccessoiresCard',
  props: {
    id: { type: String, required: true },
    nom: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    prix: { type: Number, required: true }
  },
  data() {
    return {
      quantite: 1
    }
  },
  methods: {
    augmenterQuantite() {
      this.quantite++
    },
    diminuerQuantite() {
      if (this.quantite > 1) {
        this.quantite--
      }
    },
    ajouterAuPanier() {
      if (this.quantite > 0) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item._id === this.id);

        if (existingProduct) {
          existingProduct.quantity += this.quantite;
        } else {
          cart.push({
            _id: this.id,
            name: this.nom,
            price: this.prix,
            image: this.image,
            quantity: this.quantite
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        
        toast.success(`${this.quantite} ${this.nom} ${this.quantite > 1 ? 'ont été ajoutés' : 'a été ajouté'} au panier.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        this.quantite = 1;
      }
    }
  }
}
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
</style>
      
