<template>
    <div v-if="isLoaded && pokémon" class="pokémon" :style="[pokémon.sprites.front_default ? {backgroundImage: 'url(' + pokémon.sprites.front_default + ')'} : {backgroundImage: 'url(' + require('@/assets/placeholder.png') + ')', backgroundSize: '50%', backgroundPosition: 'center'}]">
      <h3 class="pokémon-name">{{ pokémon.name | capitalize }}</h3>
      <p class="pokémon-type" :style="{backgroundColor: $options.filters.typeToColor(pokémon.types[0].type.name)}">{{pokémon.types[0].type.name | capitalize }}</p>
    </div>
</template>

<script>
import Vue from 'vue'
import PokémonService from "../helpers/services/PokémonService";

export default Vue.extend({
  name: 'pokémonItem',
  props: {
    pokémonRef: Object,
  },
  data() {
    return {
      pokémon: Object,
      isLoaded: false,
    }
  },
  mounted() {
    this.$emit('init');
    this.loadPokemon();
  },
  methods: {
    loadPokemon() {
      PokémonService.getPokémon(this.pokémonRef.name).then(jsonData => {
        this.pokémon = jsonData;
        this.isLoaded = true;
        this.$emit('loaded');
      });
    },
  }
})
</script>

<style lang="scss" scoped>

.pokémon {
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
