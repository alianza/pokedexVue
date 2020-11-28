<template>
  <div class="types">
    <div class="types-header">
      <h1>{{ msg }}</h1>
      <div class="button button-sort" v-on:click="sort">Sort ⇕</div>
    </div>
    <ul class="types-list">
      <li v-bind:key="type.name" v-for="type in jsonData.results" class="types-item">
        <type-item @clickedType="clickedType" :type="type"></type-item>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import $ from "jquery";
import TypeItem from "./TypeItem.vue";

export default Vue.extend( {
  name: 'types',
  components: {
    TypeItem,
  },
  props: {
    jsonData: Object,
    msg: String,
  },
  methods: {
    clickedType(type) {
      this.$emit('clickedTypeItem', type)
    },
    sort() {
      // console.log(this.jsonData)
      // const object = [this.jsonData.results]
      // console.log(object)
      // object.sort()
      // console.log(object)
      // this.jsonData.results = object Failed attempt...

      const list = $('.types-list');
      const listItems = list.children('li');
      list.append(listItems.get().reverse());
    },
  }
})
</script>

<style lang="scss" scoped>

.types {

  &-header {

    & h1 {
      display: inline;
    }

    & .button-sort {
      float: right;
      margin-top: 0;
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1em;
    padding: 0;
  }

  &-item {
    list-style: none;
    margin: .5em .2em;
    transition: box-shadow .2s;

    &:hover {
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, .25);
    }

    &:active {
      transition: box-shadow .1s;
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, .25), inset 0 0 12px 0 rgba(0, 0, 0, .25);
    }
  }
}

@media only screen and (max-width: 500px) {
  .types {
    &-header {

      & .button-sort {
        margin-top: 1em;
        float: none;
      }
    }
  }
}
</style>
