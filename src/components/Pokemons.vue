<template>
  <div class="pokemons">
    <div class="pokemons-header">
      <h1>{{ msg }}</h1>
      <div class="button button-sort" v-on:click="sort">Sort ⇕</div>
    </div>
    <ul class="pokemons-list">
      <li v-bind:key="pokemon.name" v-for="pokemon in jsonData.results" class="pokemons-item">
        <pokemon-item @init="loaded" @clickedPokemon="onPokemonClick" :pokemonRef="pokemon"></pokemon-item>
      </li>
    </ul>
    <h2 v-if="!jsonData.results.length">No results :(</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import $ from "jquery";
import PokemonItem from "./PokemonItem.vue";

export default Vue.extend( {
  name: 'pokemons',
  components: {
    PokemonItem
  },
  props: {
    jsonData: Object,
    msg: String,
  },
  mounted() {
    if (!this.jsonData.results.length) {
      $('#loader').removeClass('active')
    }
  },
  data() {
    return {
      detailIsOpen: false,
      detailPokemon: Object,
      loadedItems: 0,
    }
  }, methods: {
    onPokemonClick(pokemon) {
      this.$emit('togglePokemonDetails', pokemon)
    },
    loaded() { // Emitted method by children when loaded content
      console.log('item loaded')
      this.loadedItems++ // Increase loadedItems until equal with jsondata.results.length
      if (this.loadedItems === this.jsonData.results.length) {
        $('#loader').removeClass('active');
        this.loadedItems = 0
      }
    },
    sort() {
      // console.log(this.jsonData)
      // const object = [this.jsonData.results]
      // console.log(object)
      // object.sort()
      // console.log(object)
      // this.jsonData.results = object Failed attempt...

      const list = $('.pokemons-list');
      const listItems = list.children('li');
      list.append(listItems.get().reverse());
    },
  }
})
</script>

<style lang="scss" scoped>

.pokemons {

  &-header {

    & h1 {
      display: inline;
    }

    & .button-sort {
      float: right;
      margin-top: 0;
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1em;
    padding: 0;
  }

  &-item {
    list-style: none;
    margin: .5em .2em;
    transition: box-shadow .2s;

    &:hover {
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, .25);
    }

    &:active {
      transition: box-shadow .1s;
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, .25), inset 0 0 12px 0 rgba(0, 0, 0, .25);
    }

    &:empty {
      margin: 0;
    }
  }
}

@media only screen and (max-width: 500px) {
  .pokemons {
    text-align: center;

    &-header {

      & .button-sort {
        margin-top: 1em;
        float: none;
      }
    }
  }
}
</style>
