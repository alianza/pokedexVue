<template>
  <div class="types">
    <div class="types-header">
      <h1>Choose a Type!</h1>
      <div class="button button-sort" v-on:click="sort">Sort ⇕</div>
    </div>
    <ul class="types-list">
      <li v-bind:key="type.name" v-for="type in jsonData.results" class="types-item">
        <router-link :to="`/types/${type.name}`"><type-item :type="type"></type-item></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import TypeItem from "./TypeItem.vue";
import Loader from "@/helpers/Loader";
import PokemonService from "@/helpers/services/PokemonService";

export default Vue.extend( {
  name: 'types',
  components: {
    TypeItem,
  },
  data() {
    return {
      jsonData: {
        results: { }
        },
    }
  },
  mounted() {
    this.loadTypes();
  },
  methods: {
    loadTypes() { // Load all pokemon types
      Loader.showLoader();
      PokemonService.getTypes().then(jsonData => {
        this.jsonData = jsonData;
        Loader.hideLoader();
      });
    },
    sort() {
      this.jsonData.results.reverse();
    },
  }
})
</script>

<style lang="scss" scoped>

.types {

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
  }
}

@media only screen and (max-width: 500px) {
  .types {
    &-header {

      & .button-sort {
        margin-top: 1em;
        float: none;
      }
    }
  }
}
</style>
