interface Ability{
    is_hidden: boolean;
    slot: number;
    ability:{
        name: string;
        slot: number;
    }
}

export interface Pokemon{
    name: string;
    url: string;    
}

export interface CardPokemonProps{
    data: Pokemon;
}

export interface PokemonInfo{
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: Ability[];
    order: number;
}