<template>
  <div id="app" class="menu-active">

    <PokeHeader @clickedMenuIcon="toggleMenu" :title="title"></PokeHeader>

    <PokeMenu @clickedMenuIcon="toggleMenu" @onMenuItemClick="onMenuItemClick"></PokeMenu>

    <div class="content">
      <pokemons
          v-if="showPokémons && jsonData.results"
          :json-data="jsonData"
          :msg="msg"
          @togglePokemonDetails="openPokemonDetails">
      </pokemons>

      <types v-if="!showPokémons && jsonData.results"
             :json-data="jsonData"
             @clickedTypeItem="loadTypePokemons">
      </types>

      <button class="button button-prev" v-if="jsonData.previous" v-on:click="loadPrevPage()">Previous page</button>
      <button class="button button-next" v-if="jsonData.next" v-on:click="loadNextPage()">Next page</button>
    </div>

    <PokeFooter></PokeFooter>

    <div id="loader">
      <div></div>
    </div>

    <div class="button button-random" v-on:click="loadRandomPokemon" v-if="randomDetailIsOpen && detailIsOpen">Next →</div>

    <transition name="fade">
      <pokemon-detail @closeDialog="closePokemonDetails" @onDetailTypeClick="onDetailTypeClick"
                      v-if="detailIsOpen" :pokemon="detailPokemon"></pokemon-detail>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import PokemonDetail from "./components/PokemonDetail.vue";
import Pokemons from "./components/Pokemons.vue";
import Types from "./components/Types.vue";
import PokeHeader from "./components/PokeHeader.vue";
import PokeMenu from "./components/PokeMenu.vue"
import PokeFooter from "./components/PokeFooter.vue";
import PokémonService from "./services/PokémonService";

export default Vue.extend({
  name: 'App',
  components: {
    PokeHeader,
    PokeMenu,
    PokeFooter,
    Pokemons,
    Types,
    PokemonDetail,
  },
  data() {
    return {
      jsonData: [],
      title: "PokéDex",
      msg: "Pick a creature!",
      windowWidth: window.innerWidth,
      detailPokemon: Object,
      detailIsOpen: false,
      randomDetailIsOpen: false,
      showPokémons: true,
    }
  },
  mounted() {
    this.loadPokémons();
    this.setWindowListener();
  },
  methods: {
    openPokemonDetails(pokemon, showNextButton) {
      this.detailPokemon = pokemon
      this.detailIsOpen = true
      this.randomDetailIsOpen = showNextButton
    },
    closePokemonDetails() {
      this.detailIsOpen = false
      this.randomDetailIsOpen = false
    },
    onMenuItemClick(item, elem) {
      switch (item) {
        case 'home': { this.jsonData = []; this.loadPokémons(); this.setActiveMenuItem(elem); break }
        case 'types': { this.loadTypes(); this.setActiveMenuItem(elem); break }
        case 'random': { this.loadRandomPokemon(); break }
        case 'about': { this.about(); break } }
    },
    onDetailTypeClick(type) { // When clicked on type in detail page
      this.jsonData = []
      this.loadTypePokemons(type)
      this.closePokemonDetails()
    },
    setActiveMenuItem(elem) {
      document.getElementsByClassName('active')[0].classList.remove('active');
      elem.classList.add('active');
    },
    toggleMenu() {
      document.getElementById('app').classList.toggle('menu-active')
    },
    setWindowListener() { // Listener for window size
      this.$nextTick(() => { window.addEventListener('resize', this.onResize) })
    },
    onResize() { // Callback for window resize event
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 600) {
        document.getElementById('app').classList.remove('menu-active')
      } else if (this.windowWidth > 900) {
        document.getElementById('app').classList.add('menu-active')
      }
    },
    loadPokémons() {
      this.activateLoader()
      PokémonService.getPokémons().then(jsonData => {
        this.jsonData = jsonData
        this.showPokémons = true
        this.msg = "Pick a creature!"
      });
    },
    loadNextPage() {
      this.activateLoader()
      PokémonService.doLoad(this.jsonData.next).then(jsonData => {
        this.jsonData = jsonData
      });
    },
    loadPrevPage() {
      PokémonService.doLoad(this.jsonData.previous).then(jsonData => {
        this.jsonData = jsonData
      });
    },
    loadRandomPokemon() {
      this.activateLoader()

      PokémonService.getRandomPokémon().then(jsonData => {
        this.openPokemonDetails(jsonData, true)
        this.randomDetailIsOpen = true
        this.deActivateLoader()
      });
    },
    loadTypes() { // Load all pokemon types
      this.activateLoader()
      PokémonService.getTypes().then(jsonData => {
        this.jsonData = jsonData
        this.showPokémons = false
        this.deActivateLoader()
      });
    },
    loadTypePokemons(type) { // Load all pokemon of a type
      console.log('load: ' + type.name);
      this.activateLoader()
      PokémonService.getTypePokémons(type.name).then(jsonData => {
        this.jsonData = jsonData
        this.showPokémons = true
        this.msg = `${this.$options.filters.capitalize(type.name)} Pokémons!`
      });
    },
    about() {
      alert('This is a Web PokéDex Application!\n' +
          'Discover countless Pokemon and their info!\n' +
          'Made by Jan-Willem van Bremen - 2020')
    },
    activateLoader() {
      document.getElementById('loader').classList.add('active');
    },

    deActivateLoader() {
      document.getElementById('loader').classList.remove('active');
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

    & #loader {
      padding-left: 13em;
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

    & h1 {
      margin-top: .5em;
    }

    &-close {
      display: none;
      cursor: pointer;
      transition: transform .1s;

      &:hover {
        transform: scale(1.2);
      }

      &:active {
        transform: scale(.98);
      }
    }

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
        cursor: pointer;

        &.active {
          font-weight: bold;
        }

        &:hover {
          transform: scale(1.1);
        }

        &:active {
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

@media only screen and (max-width: 400px) {
  #app {

    & .menu {

      &-close {
        display: inline-block;
      }
    }

    &.menu-active {

      & .content {
        margin-left: 0;
      }

      & .footer {
        margin-left: 0;
      }
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
