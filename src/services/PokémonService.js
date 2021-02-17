
const PokémonService = {
    baseUrl: "https://pokeapi.co/api/v2",
    basePageLimit: 20,
    totalNumberOfPokémon: 0,

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

    getPokémons() {
        return this.doLoad('/pokemon').then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getPagedPokémons(offset) {
        return this.doLoad(`/pokemon?offset=${offset}&limit=${this.basePageLimit}`).then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getPokémon(pokémonName) {
        return this.doLoad(`/pokemon/${pokémonName}`).then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getTypes() {
        return this.doLoad('/type/').then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getTypePokémons(type) {
        return this.doLoad(`/type/${type}`).then(jsonData => {
            Object.defineProperty(jsonData, 'results', Object.getOwnPropertyDescriptor(jsonData, 'pokemon'));
            delete jsonData['pokemon']; // Change name of pokémons prop to results
            jsonData.results.forEach(function (result, index) {
                jsonData.results[index] = result.pokemon; // Lift all pokémons results one level up in hierarchy
            });
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getRandomPokémon() {
        return this.getTotalNumberOfPokémon().then(() => {
            const randomIndex = Math.floor(Math.random() * (this.totalNumberOfPokémon - 1)) + 1;
            return this.getPokémon(randomIndex).then(jsonData => { return jsonData; })
                .catch(e => {console.log('Error', e)});
        });
    },

    getTotalNumberOfPokémon() {
        if (!this.totalNumberOfPokémon) { // If total number of pokémon is not yet known
            return this.doLoad('/pokemon-species/?limit=0').then(jsonData => {
                this.totalNumberOfPokémon = jsonData.count;
                return jsonData;
            }).catch(e => { console.log('Error', e) });
        } else { // If total number of pokémon is known return total number of pokémons
            return new Promise(resolve => {resolve(this.totalNumberOfPokémon)})
        }
    },
}

export default PokémonService;
