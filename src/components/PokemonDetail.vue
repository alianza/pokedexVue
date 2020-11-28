<template>
  <div>
    <div v-on:click="closeDialog()" class="backdrop"></div>

    <div class="details">
      <div v-on:click="closeDialog()" class="details-close">✖</div>

      <div class="details-container">

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
               :style="{backgroundColor: $options.filters.typeToColor(type.type.name)}">{{ type.type.name | capitalize }}
          </div>
        </div>

        <div class="details-info-stats">
          <h2>Stats</h2>
          <div class="details-info-stats-stat" v-bind:key="stat.stat.name" v-for="stat in pokemon.stats">
            {{ stat.stat.name | capitalize }}
            <div :style="{width: stat.base_stat + 'px'}">{{ stat.base_stat }}</div>
          </div>
        </div>
      </div>
      <div class="details-image">
        <img alt="pokemon image" :src="image">
        <button v-if="!this.image.includes('placeholder')" v-on:click="toggleImage()" class="button">↻</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import $ from 'jquery'
import Vue from 'vue'

export default Vue.extend({
  name: "PokemonDetail",
  props: {
    pokemon: Object,
  },
  data() {
    return {
      image: (this.pokemon.sprites.front_default) ? this.pokemon.sprites.front_default : './placeholder.png'
    }
  },
  mounted() {
    this.setStatsMainColor()
  },
  watch: {
    pokemon() {
      this.image = this.pokemon.sprites.front_default
      setTimeout(() => {
        this.setStatsMainColor()
      }, 0)
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
    },
    toggleImage() {
      this.image = (this.image === this.pokemon.sprites.back_default) ?
          this.image = this.pokemon.sprites.front_default : this.image = this.pokemon.sprites.back_default
    }
  }
})
</script>

<style lang="scss" scoped>

.details {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: whitesmoke;
  width: 65%;
  height: auto;
  border-radius: .5em;
  box-shadow: 0 0 12px rgba(0, 0, 0, .5);
  z-index: 3;
  max-height: 90%;
  overflow: auto;
  overflow-x: hidden;

  &-container {
    display: flex;
    justify-content: space-between;
    padding: 1em;
  }

  &-close {
    padding: 1em;
    margin: -1em;
    cursor: pointer;
    transition: transform .1s;
    position: absolute;
    top: 1em;
    right: 1em;

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      transform: scale(.98);
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
        text-shadow: 0 0 2px black;
        color: white;

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

        & div {
          box-shadow: 0 0 2px rgba(0, 0, 0, .5);
          border-radius: .2em;
          padding: .1em;
          text-shadow: 0 0 2px black;
          color: white;
          min-width: 20px;
          text-align: center;
        }
      }
    }
  }

  &-image {
    flex-basis: 256px;
    flex-grow: 1;
    text-align: center;

    & img {
      width: 100%;
      height: 90%;
      object-fit: contain;
    }
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0 .5em .5em 0;
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
    width: 80%;

    &-container {
      flex-wrap: wrap;
      flex-flow: wrap-reverse;
    }

    &-image {

      & img {
        height: auto;
      }
    }

    &-info {
      text-align: center;

      &-profile {

        & dd {
          margin-inline-start: 0;
        }
      }

      &-stats {
        overflow: auto;

        &-stat div {
          margin: 0 auto;
        }
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
