<template>
  <div>
    <div v-on:click="closeDialog()" class="backdrop"></div>

    <div class="details">
      <div v-on:click="closeDialog()" class="details-close">✖</div>

      <div class="details-info">
        <h1 class="details-info-name">{{ pokemon.name | capitalize }}</h1>
        <div class="details-info-profile">
          <h2>Profile</h2>
          <dl>
          <dt><h4>Base Experience</h4></dt>
          <dd>{{ pokemon.base_experience }} xp</dd>

          <dt><h4>Height</h4></dt>
          <dd>{{ pokemon.height / 10 }} m</dd>

          <dt><h4>Weight</h4></dt>
          <dd>{{ pokemon.weight / 10 }} kg</dd>
        </dl>
        </div>
        <div class="details-info-types">
          <h2>Types</h2>
          <div class="details-info-types-type" v-bind:key="type.type.name" v-for="type in pokemon.types"
               :style="[
                type.type.name === 'grass' ? {'background-color': 'green'} : {},
                type.type.name === 'fire' ? {'background-color': 'red'} : {},
                type.type.name === 'poison' ? {'background-color': 'olivedrab'} : {},
                type.type.name === 'flying' ? {'background-color': 'skyblue'} : {},
                type.type.name === 'water' ? {'background-color': 'cornflowerblue'} : {},
                type.type.name === 'bug' ? {'background-color': 'brown'} : {},
                type.type.name === 'normal' ? {'background-color': 'beige'} : {},
                type.type.name === 'electric' ? {'background-color': 'yellow'} : {},
                type.type.name === 'ground' ? {'background-color': 'gray'} : {},
                type.type.name === 'fairy' ? {'background-color': 'pink'} : {},
                type.type.name === 'fighting' ? {'background-color': 'orange'} : {},
                type.type.name === 'psychic' ? {'background-color': 'mediumpurple'} : {},
                type.type.name === 'rock' ? {'background-color': 'dimgray'} : {},
                type.type.name === 'dragon' ? {'background-color': 'darkorange'} : {},
                type.type.name === 'steel' ? {'background-color': 'slategray'} : {},
                type.type.name === 'ghost' ? {'background-color': 'lightgray'} : {},
                type.type.name === 'dark' ? {'background-color': 'darkslategrey'} : {}]">{{ type.type.name | capitalize }}</div>
        </div>
        <div class="details-info-stats">
          <h2>Stats</h2>
          <div class="details-info-stats-stat" v-bind:key="stat.stat.name" v-for="stat in pokemon.stats" :style="{'width': stat.base_stat + 'px'}">{{ stat.stat.name | capitalize }} <div>{{ stat.base_stat }}</div></div>
        </div>
        </div>
      <div class="details-image">
        <img alt="pokemon image" :src="pokemon.sprites.front_default">
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "PokemonDetail",
  props: {
    pokemon: Object,
  },
  mounted() {
    this.setStatsMainColor()
  },
  watch: {
    pokemon() {
      setTimeout(() => { this.setStatsMainColor() }, 0)
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    setStatsMainColor() {
      const mainColor = $('.details-info-types-type').first().css('background-color')
      $('.details-info-stats-stat div').each(function () {
        $(this).css('background-color', mainColor)
      })
      console.log("Color: " + mainColor);
    }
  }
}
</script>

<style lang="scss" scoped>

.details {
  position: absolute;

  //position: fixed;
  padding: 1em;
  left: 50%;
  transform: translateX(-50%);
  background-color: whitesmoke;
  top: 4em;
  width: 65%;
  height: auto;
  border-radius: .5em;
  box-shadow: 0 0 12px rgba(0, 0, 0, .5);
  z-index: 3;
  display: flex;
  justify-content: space-between;

  &-close {
    padding: 1em;
    margin: -1em;
    cursor: pointer;
    transition: transform .2s;
    position: absolute;
    top: 1em;
    right: 1em;

    &:hover {
      transform: scale(1.1);
    }
  }

  &-image {
    flex-basis: 256px;
    flex-grow: 1;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &-info {
    flex-grow: 1;

    &-types {

      &-type {
        display: inline-block;
        padding: .2em 1.5em;
        border-radius: .2em;
        box-shadow: -1px 1px 2px 0px rgba(0, 0, 0, .5);
        margin-left: 1em;

        &:not(:first-of-type) {
          margin-top: .5em;
        }
      }
    }

    &-profile {
      & dt h4 {
        margin-bottom: .35em;
        white-space: nowrap;
      }
    }

    &-stats {

      &-stat {
        margin-bottom: .5em;
        white-space: nowrap;

        & div {
          box-shadow: 0 0 2px rgba(0, 0, 0, .5);
          border-radius: .2em;
          padding: .1em;
        }
      }
    }
  }
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .65);
  z-index: 2;
}

@media only screen and (max-width: 600px) {
  .details {
    flex-wrap: wrap;
    flex-flow: wrap-reverse;
    width: auto;

    &-info {

      &-stats {
        overflow: auto;
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .details {
    width: 50%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
