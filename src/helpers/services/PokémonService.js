
const PokémonService = {
    baseUrl: "https://pokeapi.co/api/v2",
    basePageLimit: 20,
    totalNumberOfPokemon: 0,

    doLoad(url) { // Base method for doing http Get requests
        if (!url.includes(this.baseUrl)) { url = this.baseUrl + url; }

        // console.log(url)
        return fetch(url).then(response => {
            if (response.status === 404) { return ''; }
            if (response.status === 200) { return response.json(); }})
            .then(data => {
                // console.log(data);
                return data}).catch(e => { console.log('Error', e) });
    },

    getPokemons() {
        return this.doLoad('/pokemon').then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getPagedPokemons(offset) {
        return this.doLoad(`/pokemon?offset=${offset}&limit=${this.basePageLimit}`).then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getPokemon(pokemonName) {
        return this.doLoad(`/pokemon/${pokemonName}`).then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getTypes() {
        return this.doLoad('/type/').then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getTypePokemons(type) {
        return this.doLoad(`/type/${type}`).then(jsonData => {
            Object.defineProperty(jsonData, 'results', Object.getOwnPropertyDescriptor(jsonData, 'pokemon'));
            delete jsonData['pokemon']; // Change name of pokemons prop to results
            jsonData.results.forEach(function (result, index) {
                jsonData.results[index] = result.pokemon; // Lift all pokemons results one level up in hierarchy
            });
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getRandomPokemon() {
        return this.getTotalNumberOfPokemon().then(() => {
            const randomIndex = Math.floor(Math.random() * (this.totalNumberOfPokemon - 1)) + 1;
            return this.getPokemon(randomIndex).then(jsonData => { return jsonData; })
                .catch(e => {console.log('Error', e)});
        });
    },

    getTotalNumberOfPokemon() {
        if (!this.totalNumberOfPokemon) { // If total number of pokemon is not yet known
            return this.doLoad('/pokemon-species/?limit=0').then(jsonData => {
                this.totalNumberOfPokemon = jsonData.count;
                return jsonData;
            }).catch(e => { console.log('Error', e) });
        } else { // If total number of pokemon is known return total number of pokemons
            return new Promise(resolve => {resolve(this.totalNumberOfPokemon)})
        }
    },
}

export default PokémonService;
