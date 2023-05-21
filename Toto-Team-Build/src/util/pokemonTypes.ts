
export type pokemonTeam = {
    PK: string,
    SK: string,
    teamName: string,
    pokemon: pokemonData[]
}

export type pokemonData = {
    name: string,
    pokedexId: number,
    nickName?: string,
    sprite: string,
    type: POKEMONTYPES[],
    level?: number,
    moves?: pokemonMoveData[]
}

export type pokemonMoveData = {
    id: number,
    moveName: string,
    description: string,
    type: POKEMONTYPES,
    pp: number,
    damage: number,
    accuracy: number,
    damageClass: DAMAGETYPE
}

export enum DAMAGETYPE {
    physical = 'physical',
    special = 'special'
}
export enum POKEMONTYPES {
    bug = 'bug',
    dark = 'dark',
    dragon = 'dragon',
    electric = 'electric',
    fairy = 'fairy',
    fighting = 'fighting',
    fire = 'fire',
    flying = 'flying',
    ghost = 'ghost',
    grass = 'grass',
    ground = 'ground',
    ice = 'ice',
    normal = 'normal',
    poison = 'poison',
    psychic = 'psychic',
    rock = 'rock',
    steel = 'steel',
    water = 'water'
}