import Vue from 'vue'

// Filter for Colors associated with different Pokémon types
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
