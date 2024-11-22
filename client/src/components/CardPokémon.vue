<template>
  <div class="relative flex justify-center">
    <div class="relative box-border h-96 w-72 rounded-xl border-2 border-gray-300">
      <div class="absolute left-0 top-0 box-border h-48 w-[calc(18rem-4px)] rounded-tl-xl rounded-tr-xl bg-white overflow-hidden">
  <img :src="image" alt="Image Pokémon" class="h-full w-full pb-2 object-contain" />
</div>
      <div :class="`${bgColor} absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 transform border-l-2 border-r-2 border-gray-300 text-center font-bold text-white`">
      {{ title }}
      </div>
      <div class="absolute top-[calc(50%+1rem-4px)] h-32 w-full pt-3 border-b-2 border-gray-300 bg-white text-center">{{ description }}</div>
      <div class="absolute top-[calc(87%-1px)] flex h-[calc(3rem+4px)] w-full items-center justify-between rounded-bl-xl rounded-br-xl border-b-2 border-gray-300 bg-white px-2">
        <span class="text-xl font-bold text-black">{{ price }}</span>
        <button class="rounded-full border-2 border-gray-300 bg-white px-3 py-0.5 font-bold text-black" @click="onButtonClick">
          VOIR LE PRODUIT
        </button>
        <button class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 text-white" @click="onHeartClick">
          ❤️
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPokémon",
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "POKÉMON",
    },
    price: {
      type: String,
      default: "0€",
    },
    description: {
      type: String,
      default: "Description du Pokémon",
    },
    bgColor: {
      type: String,
      default: "bg-purple-600",
    }
  },
  data() {
    return {
      image: "",
    };
  },
  watch: {
    pokemonName: {
      immediate: true,
      handler() {
        this.fetchPokemon();
      },
    },
  },
  methods: {
    async fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName.toLowerCase()}`);
        const data = await response.json();
        this.image = data.sprites.other["official-artwork"].front_default;
      } catch (error) {
        console.error("Erreur lors de la récupération des données Pokémon :", error);
        this.image = "";
      }
    },
    onButtonClick() {
      this.$emit("button-click");
    },
    onHeartClick() {
      this.$emit("heart-click");
    },
  },
};
</script>

<style scoped>
</style>
