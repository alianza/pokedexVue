<template>
  <div id="app" class="menu-active">

    <PokeHeader @clickedMenuIcon="toggleMenu" :title="title"></PokeHeader>

    <PokeMenu @clickedMenuIcon="toggleMenu"></PokeMenu>

    <div class="content">

       <router-view></router-view>

    </div>

    <PokeFooter></PokeFooter>

    <div id="loader">
      <div></div>
    </div>

    <transition name="fade" mode="out-in">
      <router-view name="detail"></router-view>
    </transition>

  </div>
</template>

<script>
import Vue from "vue";
import PokeHeader from "./components/PokeHeader.vue";
import PokeMenu from "./components/PokeMenu.vue"
import PokeFooter from "./components/PokeFooter.vue";

export default Vue.extend({
  name: 'App',
  components: {
    PokeHeader,
    PokeMenu,
    PokeFooter,
  },
  data() {
    return {
      title: "PokéDex",
      windowWidth: window.innerWidth,
    }
  },
  mounted() {
    this.setWindowListener();
    this.onResize();
  },
  methods: {
    toggleMenu() {
      document.getElementById('app').classList.toggle('menu-active');
    },
    setWindowListener() { // Listener for window size
      this.$nextTick(() => { window.addEventListener('resize', this.onResize) });
    },
    onResize() { // Callback for window resize event
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 600) {
        document.getElementById('app').classList.remove('menu-active');
      } else if (this.windowWidth > 900) {
        document.getElementById('app').classList.add('menu-active');
      }
    },
  }
})
</script>

<style lang="scss">

body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
