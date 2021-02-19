<template>
    <div v-if="isLoaded && pokemon.sprites" class="pokemon" :style="[pokemon.sprites.front_default ? {backgroundImage: 'url(' + pokemon.sprites.front_default + ')'} : {backgroundImage: 'url(' + require('../assets/placeholder.png') + ')', backgroundSize: '50%', backgroundPosition: 'center'}]">
      <h3 class="pokemon-name">{{ pokemon.name | capitalize}}</h3>
      <p class="pokemon-type" :style="{backgroundColor: $options.filters.typeToColor(pokemon.types[0].type.name)}">{{ pokemon.types[0].type.name | capitalize }}</p>
    </div>
</template>

<script>
import Vue from 'vue'
import PokemonService from "../helpers/services/PokemonService";

export default Vue.extend({
  name: 'pokemonItem',
  props: {
    pokemonRef: Object,
  },
  data() {
    return {
      pokemon: Object,
      isLoaded: false,
    }
  },
  mounted() {
    this.loadPokemon();
  },
  methods: {
    loadPokemon() {
      PokemonService.doLoad(this.pokemonRef.url).then(jsonData => {
        this.pokemon = jsonData;
        this.isLoaded = true;
        this.$emit('init');
      });
    },
  }
})
</script>

<style lang="scss" scoped>

.pokemon {
  box-shadow: 0 0 5px rgba(0, 0, 0, .5);
  border-radius: .2em;
  padding: .5em;
  width: 200px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: contain;
  background-position: center bottom;
  background-repeat: no-repeat;
  cursor: pointer;

  &-name {
    margin-top: 0;
   }

  &-type {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, .2);
    border-radius: .2em;
    text-shadow: 0 0 2px black;
    color: white;
    box-shadow: 0 0 2px rgba(0, 0, 0, .5);
  }
}
</style>
