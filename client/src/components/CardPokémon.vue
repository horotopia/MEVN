<template>
  <div class="py-4 px-2">
    <router-link 
      :to="`/pokemon/${item._id}`"
      class="block transform transition-transform duration-300 hover:scale-105"
    >
      <div class="relative flex justify-center">
        <div class="relative box-border h-96 w-72 rounded-xl border-2 border-gray-300">
          <div class="absolute left-0 top-0 box-border h-48 w-[calc(18rem-4px)] rounded-tl-xl rounded-tr-xl bg-white overflow-hidden">
            <img :src="getPokemonImage()" alt="Image Pokémon" class="h-full w-full pb-2 object-contain" />
          </div>
          <div :class="`${item.bgColor} absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 transform border-l-2 border-r-2 border-gray-300 text-center font-bold text-white`">
            {{ item.name.toUpperCase() }}
          </div>
          <div class="absolute top-[calc(50%+1rem-4px)] h-32 w-full pt-3 border-b-2 border-gray-300 bg-white text-center">
            {{ tronquerDescription(item.description) }}
          </div>
          <div class="absolute top-[calc(87%-1px)] flex h-[calc(3rem+4px)] w-full items-center justify-center rounded-bl-xl rounded-br-xl border-b-2 border-gray-300 bg-white">
            <span class="text-xl font-bold text-black">{{ item.price }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardPokémon",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isFavorite: false,
      publicPath: 'http://localhost:5000/uploads'
    };
  },
  methods: {
    getPokemonImage() {
      console.log(this.item);
      if (!this.item?.pictures) return `https://via.placeholder.com/150?text=${this.item.name}`;
      return `${this.publicPath}/products/${this.item._id}/${this.item?.pictures?.[0]?.name}`;
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    tronquerDescription(description) {
      const mots = description.split(' ');
      return mots.slice(0, 15).join(' ') + (mots.length > 15 ? '...' : '');
    }
  },
};
</script>

<style scoped>
.card-title {
  font-family: var(--font-primary);
  font-weight: 900;
}

.card-description {
  font-family: var(--font-secondary);
}
</style>
