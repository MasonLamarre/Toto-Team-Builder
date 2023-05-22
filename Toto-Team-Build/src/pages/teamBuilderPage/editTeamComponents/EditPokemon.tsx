import { pokemonData } from "../../../util/pokemonTypes"

type editPokeProps = {
    activePokemonData: pokemonData | undefined
}
export const EditPokemon = ({
    activePokemonData
} : editPokeProps) => {

    return (
        <div className="flex flex-col border h-1/3 border-blue-500">
           {activePokemonData &&
            <>
                <div>
                    <span>{activePokemonData.pokedexId }</span>
                    <span>{activePokemonData.name}</span>
                </div>

                <img
                    className="inline-block h-44 w-44 rounded-full"
                    src={activePokemonData.sprite}
                    alt=''
                />

                <div>
                    <span>{activePokemonData?.level ? `Lv.${activePokemonData.level}` : 'Lv.???'}</span>
                    <span>{activePokemonData.type}</span>

                </div>
            </> 
           }
        </div>
    )
}   