import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import AllPokemons from './components/Pokemons/AllPokemons'
import TypePokemons from './components/Pokemons/TypePokemons'
import Types from './components/Types'
import PokemonDetail from "./components/PokemonDetail";

// Filters
import './helpers/filters/Capitalize'
import './helpers/filters/TypeToColor'

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { path: '/', component: AllPokemons },
  { path: '/page/:page', component: AllPokemons },
  { path: '/types', component: Types },
  { path: '/type/:type', component: TypePokemons },
  { path: '/AllPokemonDetail/:pokemonName', name: 'AllPokemonDetail' ,components: { default: AllPokemons, detail: PokemonDetail } },
  { path: '/type/:type/TypePokemonDetail/:pokemonName', name: 'TypePokemonDetail' ,components: { default: TypePokemons, detail: PokemonDetail } },
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
