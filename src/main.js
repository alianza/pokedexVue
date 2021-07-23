import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Fragment from 'vue-fragment'

//components
import AllPokémons from './components/Pokémons/AllPokémons'
import TypePokémons from './components/Pokémons/TypePokémons'
import Types from './components/Types'
import PokémonDetail from "./components/PokémonDetail";

// Filters
import './helpers/filters/Capitalize'
import './helpers/filters/TypeToColor'

import './registerServiceWorker'

Vue.use(VueRouter);
Vue.use(Fragment.Plugin)

Vue.config.productionTip = false;

const routes = [
  { path: '/', component: AllPokémons },
  { path: '/page/:page', component: AllPokémons },
  { path: '/types', component: Types },
  { path: '/types/:type', component: TypePokémons },
  { path: '/pokemon/:pokemonName', name: 'allpokemondetail', components: { default: AllPokémons, detail: PokémonDetail } },
  { path: '/types/:type/pokemon/:pokemonName', name: 'typespokemondetail', components: { default: TypePokémons, detail: PokémonDetail } },
  { path: '/random', name: 'random', components: { default: AllPokémons, detail: PokémonDetail } },
];

const router = new VueRouter({ routes, linkExactActiveClass: "active", mode: "history" });

let app = new Vue({
  http: {
    root: '/root',
  },
  router,
  render: h => h(App),
});

app.$mount('#app');
