<template>
  <div class="menu">
    <div v-on:click="handleMenuIconClick" class="menu-close">✖</div>
    <h1>Menu</h1>
    <ul class="menu-top">
      <li v-on:click="handleMenuItemClick('home', $event.target);" class="active">Home</li>
      <li v-on:click="handleMenuItemClick('types', $event.target);">Types</li>
      <li v-on:click="handleMenuItemClick('random', $event.target);">Random Pokemon</li>
      <li v-on:click="handleMenuItemClick('about', $event.target);">About</li>
    </ul>
    <p class="menu-bottom">Jan-Willem van Bremen</p>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "PokeMenu",
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

<style scoped>

</style>