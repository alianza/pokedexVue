<template>
  <div id="app" class="menu-active">
    <div class="header">
      <div v-on:click="toggleMenu()" class="menu-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 class="header-title">{{ title }}</h1>
    </div>

    <div class="menu">
      <h1>Menu</h1>
      <ul class="menu-top">
        <li v-on:click="jsonData = []; setUrl('')">Home</li>
        <li v-on:click="jsonData = []; setUrl('types')">Types</li>
        <li v-on:click="setUrl('random')">Random Pokemon</li>
        <li v-on:click="about()">About</li>
      </ul>
      <p class="menu-bottom">Jan-Willem van Bremen</p>
    </div>

    <div class="content">
      <pokemons v-if="showPokemons && jsonData.results" :json-data="jsonData" :msg="msg" @togglePokemonDetails="openPokemonDetails"/>
      <types v-if="!showPokemons && jsonData.results" :json-data="jsonData" :msg="msg" @clickedTypeItem="loadTypePokemons"/>

      <button class="button button-prev" v-if="jsonData.previous" v-on:click="loadPrevPage()">Previous page</button>
      <button class="button button-next" v-if="jsonData.next" v-on:click="loadNextPage()">Next page</button>
    </div>

    <div class="footer">
      <p>PokéDex Vue App</p>
    </div>

    <div id="loader">
      <div></div>
    </div>

    <div class="button button-random" v-on:click="getRandomPokemon" v-if="randomDetailIsOpen && detailIsOpen">Next →</div>

    <transition name="fade">
      <pokemon-detail @closeDialog="closePokemonDetails" v-if="detailIsOpen" :pokemon="detailPokemon"></pokemon-detail>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import $ from 'jquery'
import PokemonDetail from "./components/PokemonDetail.vue";
import Pokemons from "./components/Pokemons.vue";
import Types from "./components/Types.vue";
import json from "vue-resource/src/http/interceptor/json";

export default Vue.extend({
  name: 'App',
  components: {
    Pokemons,
    Types,
    PokemonDetail
  },
  data() {
    return {
      jsonData: [],
      title: "PokéDex",
      msg: "Pick a creature!",
      windowWidth: window.innerWidth,
      totalNumberOfPokemon: 0,
      detailPokemon: Object,
      detailIsOpen: false,
      randomDetailIsOpen: false,
      showPokemons: true,
    }
  },
  mounted() {
    this.loadPokemons();
    this.setWindowListener();
    this.checkUrl();
  },
  methods: {
    doLoad(url) {
      return this.$http.get(url, {responseType: 'json'}).then(response => {
        // console.log(response.data);
        return response.data
      });
    },
    loadPokemons() {
      $('#loader').addClass('active');
      this.doLoad('https://pokeapi.co/api/v2/pokemon/').then(jsonData => {
        this.jsonData = jsonData
        this.showPokemons = true
        this.msg = "Pick a creature!"
      }).catch(e => { console.log('Error', e) });
    },
    loadNextPage() {
      $('#loader').addClass('active');
      this.doLoad(this.jsonData.next).then(jsonData => { this.jsonData = jsonData })
          .catch(e => { console.log('Error', e) });
    },
    loadPrevPage() {
      this.doLoad(this.jsonData.previous).then(jsonData => {this.jsonData = jsonData})
          .catch(e => { console.log('Error', e) });
    },
    toggleMenu() {
      const app = $('#app')
      if (app.hasClass('menu-active')) {
        app.removeClass('menu-active')
      } else {
        app.addClass('menu-active')
      }
    },
    openPokemonTypes(types) {
      this.msg = "Choose a Type!"
      this.jsonData = types
      this.showPokemons = false
    },
    closePokemonTypes(types) {
      this.jsonData = types
      this.showPokemons = true
    },
    openPokemonDetails(pokemon, showNextButton) {
      this.detailPokemon = pokemon
      this.detailIsOpen = true
      this.randomDetailIsOpen = showNextButton
    },
    closePokemonDetails() {
      this.detailIsOpen = false
      this.randomDetailIsOpen = false
    },
    setWindowListener() {
      this.$nextTick(() => { window.addEventListener('resize', this.onResize) })
    },
    onResize() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 600) {
        $('#app').removeClass('menu-active')
      } else if (this.windowWidth > 900) {
        $('#app').addClass('menu-active')
      }
    },
    getRandomPokemon() {
      $('#loader').addClass('active')

      if (!this.totalNumberOfPokemon) {
        this.getTotalNumberOfPokemon()
        return
      }

      const randomIndex = Math.floor(Math.random() * (this.totalNumberOfPokemon - 1)) + 1
      this.doLoad('https://pokeapi.co/api/v2/pokemon/' + randomIndex).then(jsonData => {
        this.openPokemonDetails(jsonData, true)
        this.randomDetailIsOpen = true
        $('#loader').removeClass('active')
      }).catch(e => { console.log('Error', e); });
    },
    getTotalNumberOfPokemon() {
      this.doLoad('https://pokeapi.co/api/v2/pokemon-species/?limit=0').then(jsonData => {
        this.totalNumberOfPokemon = jsonData.count
        this.getRandomPokemon()
      }).catch(e => { console.log('Error', e); });
    },
    loadTypes() {
      $('#loader').addClass('active');
      this.doLoad('https://pokeapi.co/api/v2/type/').then(jsonData => {
        this.openPokemonTypes(jsonData)
        $('#loader').removeClass('active');
      }).catch(e => { console.log('Error', e); });
    },
    loadTypePokemons(type) {
      $('#loader').addClass('active');
      this.doLoad(type.url).then(jsonData => {
        // Change name of pokemons prop to results
        Object.defineProperty(jsonData, 'results', Object.getOwnPropertyDescriptor(jsonData, 'pokemon'));
        delete jsonData['pokemon'];
        // Life all pokemons results one level up in hierarchy
        jsonData.results.forEach(function (result, index) {
          jsonData.results[index] = result.pokemon
        })
        // console.log(jsonData.results.length); // Number of found pokémons
        this.closePokemonTypes(jsonData)
        this.msg = this.$options.filters.capitalize(type.name) + " Pokémons!"
      }).catch(e => { console.log('Error', e); });
    },
    about() {
      alert('This is a Web PokéDex Application for the DTT Test!\n' +
          'Discover countless Pokemon and their info!\n' +
          'Made by Jan-Willem van Bremen - 2020')
    },
    checkUrl() {
      let url = window.location.href
      let path = window.location.pathname
      console.log(url);
      console.log('path ' + window.location.pathname);

      if (path.includes('types')) {
        console.log('TYPES')
        this.loadTypes()
      } else if (path.includes('random')) {
        console.log('RANDOM')
        this.getRandomPokemon()
      } else {
        console.log('HOME')
        this.loadPokemons()
      }
    },
    setUrl(page) {
      let url = window.location.origin
      url += '/' + page
      window.location.href = url
      console.log(url)
    }
  }
})
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  min-height: 100vh;
  margin-top: -3em;
  padding-top: 3em;

  &.menu-active {
    & .header {
      margin-left: 13em;
    }

    & .menu {
      transform: none;
    }

    & .content {
      margin-left: 13em;
    }

    & .footer {
      margin-left: 13em;
    }
  }

  & .header {
    height: 3em;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: blueviolet;
    box-shadow: 0 0 5px rgba(0, 0, 0, .5);
    margin-left: 0;
    transition: margin-left .5s;

    &-title {
      display: inline;
      margin: 0;
      line-height: 1.5em;
      position: absolute;
      color: whitesmoke;
    }

    & .menu-icon {
      padding: 0.3em;
      cursor: pointer;
      display: inline-block;
      transition: transform .2s;

      &:hover {
        transform: scale(1.1);
      }

      & div {
        width: 35px;
        height: 5px;
        background-color: whitesmoke;
        margin: 6px 0;
      }
    }
  }

  & .menu {
    position: fixed;
    width: 11em;
    padding: 1em;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    top: 0;
    background-color: white;
    height: 100%;
    transition: transform .5s;
    transform: translateX(-13em);

    &-top {

    }

    &-bottom {
      bottom: 2em;
      position: absolute;
    }

    & ul {
      list-style-type: none;
      padding: 0;

      & li {
        list-style: none;
        margin: 1em;
        transition: transform .2s;

        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }

        &:active {
          cursor: pointer;
          transform: scale(.98);
        }
      }
    }
  }

  & .content {
    margin-top: 3em;
    transition: margin-left .5s;
    padding: 1em 1em 12em;
  }

  & .footer {
    height: 5em;
    padding: 1em;
    background-color: #222;
    color: white;
    box-shadow: 0 0 6px rgba(0, 0, 0, .5);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transition: margin-left .5s;
  }

  & .button {
    transition: background-color .2s, color .2s, transform .1s;
    font-size: 16px;
    border: none;
    cursor: pointer;
    text-align: center;
    background-color: #f1f1f1;
    color: black;
    padding: 16px 30px;
    border-radius: 5px;

    &:hover {
      background-color: #222;
      color: white;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(.98);
    }

    &-sort {
      line-height: 2em;
      font-weight: bold;
      cursor: pointer;
      padding: .2em .5em;
      border-radius: .2em;
    }

    &-random {
      position: fixed;
      z-index: 5;
      bottom: .8em;
      right: .8em;
      box-shadow: 0 0 12px rgba(0, 0, 0, .5);
    }

    &-next {
      float: right;
    }

    &-prev {
      float: left;
    }
  }

  & #loader {
    transition: visibility .5s, opacity 0.5s;
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    visibility: hidden;
    opacity: 0;
    z-index: 4;

    &.active {
      visibility: visible;
      opacity: 1;
    }

    & div {
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
      position: relative;
      top: 40%;
      margin: 0 auto;
      box-shadow: 0 0 12px 8px rgba(0, 0, 0, .2), inset 0 0 12px 8px rgba(0, 0, 0, .2);
    }
  }
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 1em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
