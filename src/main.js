import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('color', function (value) {
  if (!value) return ''
  value = value.toString()
  switch (value) {
    case 'grass' : return 'green';
    case 'fire' : return 'red';
  }
})

// type.type.name === 'grass' ? {'background-color': 'green'} : {},
//     type.type.name === 'fire' ? {'background-color': 'red'} : {},
//     type.type.name === 'poison' ? {'background-color': 'olivedrab'} : {},
//     type.type.name === 'flying' ? {'background-color': 'skyblue'} : {},
//     type.type.name === 'water' ? {'background-color': 'cornflowerblue'} : {},
//     type.type.name === 'bug' ? {'background-color': 'brown'} : {},
//     type.type.name === 'normal' ? {'background-color': 'beige'} : {},
//     type.type.name === 'electric' ? {'background-color': 'yellow'} : {},
//     type.type.name === 'ground' ? {'background-color': 'gray'} : {},
//     type.type.name === 'fairy' ? {'background-color': 'pink'} : {},
//     type.type.name === 'fighting' ? {'background-color': 'orange'} : {},
//     type.type.name === 'psychic' ? {'background-color': 'mediumpurple'} : {},
//     type.type.name === 'rock' ? {'background-color': 'dimgray'} : {},
//     type.type.name === 'dragon' ? {'background-color': 'darkorange'} : {},
//     type.type.name === 'steel' ? {'background-color': 'slategray'} : {},
//     type.type.name === 'ghost' ? {'background-color': 'lightgray'} : {},
//     type.type.name === 'dark' ? {'background-color': 'darkslategrey'} : {}

let app = new Vue({
  http: {
    root: '/root',
  },
  render: h => h(App),
})

app.$mount('#app');
