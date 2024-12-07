<template>
  <div class="flex flex-col min-h-screen bg-[#F2F2F2]">
    <div class="w-full max-w-[1400px] mx-auto px-4 pt-8">
      <div class="bg-[#FF4B4B] rounded-[10px] mb-6">
        <h2 class="main-title text-6xl text-white text-center py-6">PACK DU MOMENT</h2>
      </div>

      <div class="w-full mb-12">
        <div class="max-w-[1300px] mx-auto px-20">
          <ImageCarrousel />
        </div>
      </div>

      <div class="bg-[#FF4B4B] rounded-[10px] mb-8">
        <h2 class="main-title text-6xl text-white text-center py-6">POKÉMON LES PLUS POPULAIRE</h2>
      </div>

      <div class="bg-white p-8">
        <div class="flex flex-wrap gap-6 justify-center">
          <CardPokémon
            pokemonName="mewtwo"
            title="MEWTWO"
            price="1200€"
            bgColor="bg-purple-500"
            description="Un Pokémon Psy vicieux et dangereux créé par l'homme. Ses yeux froids et brillants pétrifient de peur chaque adversaire."
          />
          <CardPokémon
            pokemonName="pikachu"
            title="PIKACHU"
            price="14€"
            bgColor="bg-yellow-300"
            description="Sa queue est dressée quand il est aux aguets. Si vous tirez dessus, il vous mordra."
          />
          <CardPokémon
            pokemonName="empoleon"
            title="PINGOLÉON"
            price="300€"
            bgColor="bg-blue-900"
            description="Il nage aussi vite qu'un hors-bord. Le tranchant de ses ailes peut fendre un bloc de glace à la dérive."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardPokémon from "@/components/CardPokémon.vue";
import ImageCarrousel from "@/components/Carrousel.vue";

export default {
  name: "HomePage",
  components: {
    CardPokémon,
    ImageCarrousel,
  },
};
</script>

<style scoped>
.main-title {
  font-family: var(--font-primary);
  font-weight: 800;
  letter-spacing: 1px;
  color: white;
  text-shadow: 
    -1px -1px 0 #C73D3D,
    1px -1px 0 #C73D3D,
    -1px 1px 0 #C73D3D,
    1px 1px 0 #C73D3D;
}
</style>
