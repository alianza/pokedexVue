<template>
  <div class="pokemons">
    <div class="pokemons-header">
      <h1>{{ msg }}</h1>
      <div class="button button-sort" v-on:click="sort">Sort ⇕</div>
    </div>
    <ul class="pokemons-list">
      <li v-bind:key="pokemon.name" v-for="pokemon in jsonData.results" class="pokemon-item">
        <pokemon-item @init="loaded" @clickedPokemon="togglePokemonDetails" :pokemonRef="pokemon"></pokemon-item>
      </li>
    </ul>
    <transition name="fade">
     <pokemon-detail @closeDialog="togglePokemonDetails" v-if="detailIsOpen" :pokemon="detailPokemon"></pokemon-detail>
    </transition>
  </div>
</template>

<script>
import PokemonItem from "@/components/PokemonItem";
import PokemonDetail from "@/components/PokemonDetail";
import $ from "jquery";

export default {
  name: 'pokemons',
  components: {
    PokemonItem,
    PokemonDetail
  },
  props: {
    jsonData: Object,
    msg: String,
  },
  data() {
    return {
      pokemon: Array,
      detailIsOpen: false,
      detailPokemon: Object,
      loadedItems: 0,
    }
  }, methods: {
    togglePokemonDetails(pokemon) {
      this.detailPokemon = pokemon
      this.detailIsOpen = !this.detailIsOpen;
      if (this.detailIsOpen && window.scrollY > 100) { window.scrollTo({top: 50, behavior: 'smooth'});}
    },
    loaded() {
      console.log('item loaded')
      this.loadedItems++
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
}
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

  .pokemon-item {
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
  }
}

@media only screen and (max-width: 500px) {
  .pokemons {
    &-header {

      & .button-sort {
        margin-top: 1em;
        float: none;
      }
    }
  }
}
</style>
