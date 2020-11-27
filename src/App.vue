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
        <li v-on:click="jsonData = {}; loadPokemon()">Home</li>
        <li v-on:click="getRandomPokemon()">Random Pokemon</li>
        <li v-on:click="about()">About</li>
      </ul>
      <p class="menu-bottom">Jan-Willem van Bremen</p>
    </div>

    <div class="content">
      <pokemons :json-data="jsonData" :msg="msg"/>
      <button class="button button-prev" v-if="jsonData.previous" v-on:click="loadPrevPage()">Previous page</button>
      <button class="button button-next" v-if="jsonData.next" v-on:click="loadNextPage()">Next page</button>
    </div>

    <div class="footer">
      <p>PokéDex Vue App</p>
    </div>

    <div id="loader">
      <div></div>
    </div>

    <div class="button button-random" v-on:click="getRandomPokemon" v-if="randomDetailIsOpen">Next →</div>

    <transition name="fade">
      <pokemon-detail @closeDialog="closeRandomPokemon" v-if="randomDetailIsOpen" :pokemon="randomPokemon"></pokemon-detail>
    </transition>
  </div>
</template>

<script>
import Pokemons from "@/components/Pokemons";
import PokemonDetail from "@/components/PokemonDetail";

import $ from 'jquery'

export default {
  name: 'App',
  components: {
    Pokemons,
    PokemonDetail
  },
  data() {
    return {
      jsonData: [],
      title: "PokéDex",
      msg: "Pick a creature!",
      windowWidth: window.innerWidth,
      totalNumberOfPokemon: 0,
      randomPokemon: Object,
      randomDetailIsOpen: false
    }
  },
  mounted() {
    this.loadPokemon();
    this.setWindowListener();
    this.closeMenuIfMobile();
  },
  methods: {
    doLoad(url) {
      return this.$http.get(url, {responseType: 'json'}).then(response => {
        // console.log(response.data);
        return response.data;
      });
    },
    loadPokemon() {
      $('#loader').addClass('active');
      this.doLoad('https://pokeapi.co/api/v2/pokemon/').then(jsonData => {
        this.jsonData = jsonData;
      }).catch(e => {
        console.log('Error', e);
      });
    },
    loadNextPage() {
      $('#loader').addClass('active');
      this.doLoad(this.jsonData.next).then(jsonData => {
        this.jsonData = jsonData;
      }).catch(e => {
        console.log('Error', e);
      });
    },
    loadPrevPage() {
      this.doLoad(this.jsonData.previous).then(jsonData => {
        this.jsonData = jsonData;
      }).catch(e => {
        console.log('Error', e);
      });
    },
    toggleMenu() {
      const app = $('#app')
      if (app.hasClass('menu-active')) {
        app.removeClass('menu-active')
      } else {
        app.addClass('menu-active')
      }
    },
    setWindowListener() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize)
      })
    },
    onResize() {
      this.windowWidth = window.innerWidth
      this.closeMenuIfMobile()
    },
    closeMenuIfMobile() {
      if (this.windowWidth < 600) {
        $('#app').removeClass('menu-active')
      } else if (this.windowWidth > 900) {
        $('#app').addClass('menu-active')
      }
    },
    getRandomPokemon() {
      $('#loader').addClass('active');

      if (!this.totalNumberOfPokemon) {
        this.getTotalNumberOfPokemon()
        return
      }

      const randomIndex = Math.floor(Math.random() * (this.totalNumberOfPokemon - 1)) + 1
      this.doLoad('https://pokeapi.co/api/v2/pokemon/' + randomIndex).then(jsonData => {
        this.randomPokemon = jsonData
        this.randomDetailIsOpen = true
        $('#loader').removeClass('active')
      }).catch(e => {
        console.log('Error', e);
      });
    },
    closeRandomPokemon() {
      this.randomDetailIsOpen = false
    },
    getTotalNumberOfPokemon() {
      this.doLoad('https://pokeapi.co/api/v2/pokemon-species/?limit=0').then(jsonData => {
        this.totalNumberOfPokemon = jsonData.count
        this.getRandomPokemon()
      }).catch(e => {
        console.log('Error', e);
      });
    },
    about() {
      alert('This is a Web PokéDex Application for the DTT Test!\nDiscover countless Pokemon and their info!\nMade by Jan-Willem van Bremen - 2020')
    }
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

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
    transition: margin .5s;

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
    padding: 1em;
    transition: margin .5s;
  }

  & .footer {
    height: 5em;
    margin-top: 4em;
    padding: 1em;
    background-color: #222;
    color: white;
    box-shadow: 0 0 6px rgba(0, 0, 0, .5);
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
