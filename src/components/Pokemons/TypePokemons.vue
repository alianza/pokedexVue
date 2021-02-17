<template>
  <div class="pokemons">
    <div class="pokemons-header">
      <h1>{{ this.$route.params.type | capitalize }} type pokémons</h1>
      <div class="button button-sort" v-on:click="sort">Sort ⇕</div>
    </div>
    <ul class="pokemons-list">
      <li v-bind:key="pokemon.name" v-for="pokemon in jsonData.results" class="pokemons-item">
        <pokemon-item @init="loaded" @clickedPokemon="onPokemonClick" :pokemonRef="pokemon"></pokemon-item>
      </li>
    </ul>

    <button class="button button-prev" v-if="jsonData.previous" v-on:click="loadPrevPage()">Previous page</button>
    <button class="button button-next" v-if="jsonData.next" v-on:click="loadNextPage()">Next page</button>

    <h2 v-if="!jsonData.results.length">No results :(</h2>
  </div>
</template>

<script >
import Vue from "vue";
import PokemonItem from "../PokemonItem.vue";
import PokémonService from "@/helpers/services/PokémonService";
import Loader from "@/helpers/Loader";

export default Vue.extend( {
  name: 'TypePokemons',
  components: {
    PokemonItem
  },
  data() {
    return {
      detailPokemon: Object,
      loadedItems: 0,
      jsonData: {
        results: {}
      },
      page: 1,
    }
  },
  mounted() {
    this.loadTypePokémons(this.$route.params.type);
  },
  methods: {
    onPokemonClick(pokemon) {
      this.$emit('togglePokemonDetails', pokemon)
    },
    loadTypePokémons(type) {
      Loader.showLoader();
      PokémonService.getTypePokémons(type).then(json => {
        this.jsonData = json;
        Loader.hideLoader();
      });
    },
    loaded() { // Emitted method by children when loaded content
      console.log('item loaded')
      this.loadedItems++ // Increase loadedItems until equal with jsondata.results.length
      if (this.loadedItems === this.jsonData.results.length) {
        document.getElementById('loader').classList.remove('active');
        this.loadedItems = 0
      }
    },
    sort() {
      let list = document.getElementsByClassName('pokemons-list')[0]
      let children = list.children;
      children = [...children].reverse();
      list.innerHTML = '';
      children.forEach(function (result) {
        list.innerHTML += result.outerHTML;
      })
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
