import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.config.productionTip = false

// Filter for capitalization
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

// Filter for Colors associated with different Pokemon types
Vue.filter('typeToColor', function (value) {
  if (!value) return ''
  value = value.toString()
  switch (value) {
    case 'grass' : return 'green'
    case 'fire' : return 'red'
    case 'poison' : return 'olivedrab'
    case 'flying' : return 'skyblue'
    case 'water' : return 'cornflowerblue'
    case 'bug' : return 'brown'
    case 'normal' : return 'blanchedalmond'
    case 'electric' : return 'yellow'
    case 'ground' : return 'gray'
    case 'fairy' : return 'pink'
    case 'fighting' : return 'orange'
    case 'psychic' : return 'mediumpurple'
    case 'rock' : return 'dimgray'
    case 'dragon' : return 'darkorange'
    case 'steel' : return 'slategray'
    case 'ghost' : return 'lightgray'
    case 'dark' : return 'darkslategrey'
    case 'ice' : return 'aliceblue'
    case 'shadow' : return 'black'
  }
})

let app = new Vue({
  http: {
    root: '/root',
  },
  render: h => h(App),
})

app.$mount('#app');
