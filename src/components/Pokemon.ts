export class Pokemon {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: Sprites;
    stats: Stats[];
    types: Types[];
}

class Type {
    name: { 'background-color': string } | { background: string };
    url: string;
}

class Types {
    slot: number;
    type: Type;
}

class Sprites {
    front_default: string;
    back_default: string;
}

class Stat {
    name: string;
    url: string;
}

class Stats {
    base_stat: number;
    effort: number;
    stat: Stat;
}
