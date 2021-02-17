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
          <div class="details-info-types-type" v-on:click="onTypeClick(type.type)" v-bind:key="type.type.name" v-for="type in pokemon.types"
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

        <div class="flip-box">
          <div class="flip-box-inner">
            <div class="flip-box-front">
              <img alt="Pokemon image front" :src="imageFront">
            </div>
            <div class="flip-box-back">
              <img alt="Pokemon image back" :src="imageBack">
            </div>
          </div>
        </div>
<!--        <img alt="pokemon image" :src="image">-->
        <button v-if="!this.imageFront.includes('placeholder')" v-on:click="toggleImage()" class="button">↻</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: "PokemonDetail",
  props: {
    pokemon: Object,
  },
  data() {
    return { // If no sprites set placeholder
      imageFront: (this.pokemon.sprites.front_default) ? this.pokemon.sprites.front_default : './placeholder.png',
      imageBack: (this.pokemon.sprites.back_default) ? this.pokemon.sprites.back_default : './placeholder.png',
    }
  },
  mounted() {
    this.setStatsMainColor()
  },
  watch: {
    pokemon() { // Listen for pokemon changes, update image and stats color
      this.imageFront = (this.pokemon.sprites.front_default) ? this.pokemon.sprites.front_default : './placeholder.png'
      this.imageBack = (this.pokemon.sprites.back_default) ? this.pokemon.sprites.back_default : './placeholder.png'
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
      const mainColor = document.getElementsByClassName('details-info-types-type')[0].style.backgroundColor
      for (let stat of document.getElementsByClassName('details-info-stats-stat')) {
        stat.children[0].style.backgroundColor = mainColor
      }
    },
    toggleImage() {
      document.getElementsByClassName('flip-box')[0].classList.toggle('active')
    },
    onTypeClick(type) {
      this.$emit('onDetailTypeClick', type)
    },
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
  width: 75%;
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
    align-items: center;
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

    &-name {
      word-break: keep-all;
      white-space: nowrap;
    }

    &-types {

      &-type {
        display: inline-block;
        padding: .2em 1.5em;
        border-radius: .2em;
        box-shadow: -1px 1px 2px 0px rgba(0, 0, 0, .5);
        margin-left: 1em;
        text-shadow: 0 0 2px black;
        color: white;
        cursor: pointer;
        transition: transform .1s;

        &:hover {
          transform: scale(1.1);
        }

        &:active {
          transform: scale(.98);
        }

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

    & button {
      margin-top: 1em;
    }

    & .flip-box {
      background-color: transparent;
      perspective: 1000px;
      height: 25vw;
      width: 25vw;
      max-width: 256px;
      max-height: 256px;
      margin: auto;

      &.active .flip-box-inner {
        transform: rotateY(180deg);
      }

      &-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }

      &-front, &-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;

        & img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      &-back {
        transform: rotateY(180deg);
      }
    }

    .flip-box:hover .flip-box-inner {
      transform: rotateY(180deg);
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
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .details {
    width: 80%;

    &-container {
      flex-wrap: wrap;
      flex-flow: wrap-reverse;
    }

    &-image {

      & .flip-box {
        height: 50vw;
        width: 50vw;
      }

      & img {
        height: auto;
      }
    }

    &-info {
      text-align: center;

      &-name {
        word-break: break-word;
        white-space: normal;
      }

      &-profile {

        & dd {
          margin-inline-start: 0;
        }
      }

      &-types {

        &-type {
          margin-left: 0;
          display: block;
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

@media only screen and (max-width: 600px) {

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
