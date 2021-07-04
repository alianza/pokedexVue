<template>
  <div class="header">
    <div v-on:click="handleMenuIconClick" class="menu-icon">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <h1 class="header-title">{{ title }}</h1>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "PokéHeader",
  props: {
    title: String,
  },
  methods: {
    handleMenuIconClick() {
      this.$emit('clickedMenuIcon');
    },
  }
})
</script>

<style lang="scss" scoped>

.header {
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

</style>
