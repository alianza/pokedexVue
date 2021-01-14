import Vue from 'vue'

const baseUrl = "https://pokeapi.co/api/v2";

export default {

    doLoad(url) { // Base method for doing http Get requests
        return Vue.http.get(url, {responseType: 'json'}).then(response => {
            // console.log(response.data);
            return response.data
        }).catch(e => { console.log('Error', e) });
    },

    loadPokemons() {
        return this.doLoad(baseUrl + '/pokemon').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    getTotalNumberOfPokemon() {
        return this.doLoad(baseUrl + '/pokemon-species/?limit=0').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    loadTypes() {
        return this.doLoad(baseUrl + '/type/').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    loadRandomPokemon(randomIndex) {
        return this.doLoad(baseUrl + '/pokemon/' + randomIndex).then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    }
}
