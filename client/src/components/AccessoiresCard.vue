<template>
  <div class="w-full rounded-xl bg-white p-4 shadow-lg border-2 border-gray-300">
    <div class="mb-3">
      <div class="aspect-square rounded-lg border-2 border-gray-300 p-4">
        <div class="h-full w-full rounded-lg border-2 border-gray-300">
          <img :src="image" :alt="nom" class="h-full w-full object-contain">
        </div>
      </div>
    </div>

    <div class="text-center">
      <h2 class="text-xl font-black uppercase tracking-wide">{{ nom }}</h2>
      <p class="mb-2 text-lg">{{ prix }}€ HT</p>

      <div class="mb-2 border-t border-gray-300"></div>

      <div class="mb-3">
        <p class="text-xs text-gray-600 text-left">QUANTITÉ</p>
        <div class="mt-1 flex justify-center">
          <div class="inline-flex">
            <button 
              class="rounded-l-lg border border-gray-300 px-3 py-1"
              @click="diminuerQuantite"
            >-</button>
            <input 
              type="text" 
              v-model="quantite" 
              class="w-12 text-center border-y border-gray-300"
              readonly
            />
            <button 
              class="rounded-r-lg border border-gray-300 px-3 py-1"
              @click="augmenterQuantite"
            >+</button>
          </div>
        </div>
      </div>

      <button 
        @click="ajouterAuPanier"
        class="w-full rounded-full bg-[#ff4c4c] border-2 border-[#D43C3C] px-4 py-2 font-bold text-white transition ease-in-out active:bg-[#CC3C3C] active:border-[#A82E2E]"
      >
        AJOUTER AU PANIER
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
      
