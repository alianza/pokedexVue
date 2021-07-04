<template>
  <div class="pokémons">
    <div class="pokémons-header">
      <h1>{{ $route.params.type | capitalize }} type pokémons</h1>
      <div class="button button-sort" v-on:click="sort">Sort ⇕</div>
    </div>
    <ul class="pokémons-list">
      <li v-bind:key="pokémon.name" v-for="pokémon in jsonData.results" class="pokémons-item">
        <router-link :to="{ name: 'typespokemondetail', params: { type: $route.params.type, pokemonName: pokémon.name } }">
          <PokémonItem @loaded="itemLoaded" @init="++itemsToLoad" :pokémonRef="pokémon"></PokémonItem></router-link>
      </li>
    </ul>

    <h2 v-if="!jsonData.results.length">No results :(</h2>
  </div>
</template>

<script>
import Vue from "vue";
import PokémonItem from "../PokémonItem.vue";
import PokémonService from "@/helpers/services/PokémonService";
import Loader from "@/helpers/Loader";
import scrollToTop from "@/helpers/ScrollToTop";

export default Vue.extend( {
  name: 'TypePokémons',
  components: {
    PokémonItem
  },
  data() {
    return {
      itemsToLoad: 0,
      loadedItems: 0,
      jsonData: {
        results: {}
      },
      page: 1,
    }
  },
  watch:{
    $route (to, from){
      if ((to.name === "typespokemondetail" || from.name === "typespokemondetail") && to.params.type === from.params.type) { return; } // Don't refresh data when going to or coming from details page and type hasn't changed
      this.loadTypePokémons(this.$route.params.type);
      scrollToTop();
    }
  },
  mounted() {
    this.loadTypePokémons(this.$route.params.type);
  },
  methods: {
    loadTypePokémons(type) {
      Loader.showLoader();
      PokémonService.getTypePokémons(type).then(json => {
        this.jsonData = json;
      });
    },
    itemLoaded() { // Emitted method by children when loaded content
      console.log('item loaded');
      ++this.loadedItems; // Increase loadedItems until equal with jsondata.results.length
      if (this.loadedItems === this.itemsToLoad) {
        Loader.hideLoader();
        this.loadedItems = this.itemsToLoad = 0;
      }
    },
    sort() {
      this.jsonData.results.reverse();
    },
  }
})
</script>

<style lang="scss" scoped>

.pokémons {

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
  .pokémons {
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
