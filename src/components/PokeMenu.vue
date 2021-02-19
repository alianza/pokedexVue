<template>
  <div class="menu">
    <div v-on:click="handleMenuIconClick" class="menu-close">✖</div>
    <h1>Menu</h1>
    <ul class="menu-top">
      <router-link tag="li" to="/" :active-class="$route.path.includes('allpokemondetail') ? 'active' : ''">Home</router-link>
      <router-link tag="li" to="/types" :active-class="$route.path.includes('type') ? 'active' : ''">Types</router-link>
      <router-link tag="li" to="/random">Random Pokémon</router-link>
      <li v-on:click="handleMenuItemClick('about', $event.target);">About</li>
    </ul>
    <p class="menu-bottom">Jan-Willem van Bremen</p>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "PokeMenu",
  updated() {
    console.log(this.$route);
    console.log(this.$route.path.includes('type'));
  },
  methods: {
    handleMenuIconClick() {
      this.$emit('clickedMenuIcon');
    },
    handleMenuItemClick(item, event) {
      this.$emit('onMenuItemClick', item, event);
    }
  }
})
</script>

<style lang="scss" scoped>
.menu {
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

@media only screen and (max-width: 400px) {
    .menu {

      &-close {
        display: inline-block;
      }
    }
}
</style>
