<template>
  <div class="pokémons">
    <div class="pokémons-header">
      <h1>Pick a creature!</h1>
      <div class="button button-sort" v-on:click="sort">Sort ⇕</div>
    </div>
    <ul class="pokémons-list">
      <li v-bind:key="pokémon.name" v-for="pokémon in jsonData.results" class="pokémons-item">
        <router-link :to="{ name: 'allpokemondetail', params: { pokemonName: pokémon.name } }">
          <PokémonItem @loaded="itemLoaded" @init="++itemsToLoad" :pokémonRef="pokémon"></PokémonItem></router-link>
      </li>
    </ul>

    <router-link :to="`/page/${this.page - 1}`" class="button button-prev" v-if="jsonData.previous" v-on:click.native="loadPrevPage">Previous page</router-link>
    <router-link :to="`/page/${this.page + 1}`" class="button button-next" v-if="jsonData.next" v-on:click.native="loadNextPage">Next page</router-link>

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
  name: 'AllPokémons',
  components: {
    PokémonItem
  },
  data() {
    return {
      itemsToLoad: 0,
      loadedItems: 0,
      jsonData: {
        results: { }
      },
      page: 1,
    }
  },
  mounted() {
    if (this.$route.params.page) {
      const currentPage = parseInt(this.$route.params.page);
      const offset = (currentPage - 1) * PokémonService.basePageLimit;
      this.page = currentPage;
      this.loadPagedPokémons(offset);
    } else {
      this.loadPokémons();
    }
  },
  methods: {
    loadPokémons() {
      Loader.showLoader();
      PokémonService.getPokémons().then(jsonData => {
        this.jsonData = jsonData;
      });
    },
    loadPagedPokémons(offset) {
      Loader.showLoader();
      PokémonService.getPagedPokémons(offset).then(json => {
        this.jsonData = json;
      })
    },
    loadNextPage() {
      Loader.showLoader();
      ++this.page;
      PokémonService.doLoad(this.jsonData.next).then(json => {
        this.jsonData = json;
        scrollToTop();
      });
    },
    loadPrevPage() {
      Loader.showLoader();
      --this.page;
      PokémonService.doLoad(this.jsonData.previous).then(json => {
        this.jsonData = json;
        scrollToTop();
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
