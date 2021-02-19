<template>
    <div class="type" v-on:click="onTypeClick(type)">
      <div class="type-container" :style="{backgroundColor: $options.filters.typeToColor(type.name)}">
        <h3 class="type-name">{{ type.name | capitalize}}</h3>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'typesItem',
  props: {
    type: Object,
  },
  methods: {
    onTypeClick(type) {
      this.$emit('clickedType', type);
    },
  }
})
</script>

<style lang="scss" scoped>

.type {
  box-shadow: 0 0 5px rgba(0, 0, 0, .5);
  border-radius: .2em;
  padding: .5em;
  width: 200px;
  height: 200px;
  line-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: contain;
  background-position: center bottom;
  background-repeat: no-repeat;
  cursor: pointer;

  &-container {
    height: 100%;
    margin: 0;
    text-align: center;
    border-radius: .2em;
    box-shadow: 0 0 2px rgba(0, 0, 0, .5);
  }

  &-name {
    text-shadow: 0 0 24px black;
    margin: 0;
    color: white;
   }
}
</style>
