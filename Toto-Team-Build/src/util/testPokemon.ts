import { POKEMONTYPES, pokemonData } from "./pokemonTypes";

export const  bulbasaurTestObject : pokemonData = {
    name: 'bulbasaur',
    pokedexId: 1,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    type: [POKEMONTYPES.grass, POKEMONTYPES.poison]
};