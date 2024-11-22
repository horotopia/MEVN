<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <div class="text-center mt-5">
      <h1 class="text-xl font-bold">Bienvenue sur la page d'accueil</h1>
      pokemon test marche
    </div>

    <div class="bg-white p-10 rounded-lg shadow-lg mx-auto mt-10">
      <div class="flex flex-wrap gap-6 justify-center">
        <CardPokémon
          pokemonName="mewtwo"
          title="MEWTWO"
          price="1200€"
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
        /><CardPokémon
          pokemonName="gengar"
          title="ECTOPLASMA"
          price="3000€"
          bgColor="bg-purple-500"
          description="Il nage aussi vite qu'un hors-bord. Le tranchant de ses ailes peut fendre un bloc de glace à la dérive."
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardPokémon from "@/components/CardPokémon.vue";

export default {
  name: "HomePage",
  components: {
    CardPokémon,
  },
};
</script>
