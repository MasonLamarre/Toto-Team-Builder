import { useState } from "react"
import { pokemonData, pokemonTeam } from "../../util/pokemonTypes"
import { PokemonSearch } from "./editTeamComponents/PokeSearch"
import { EditPokemon } from "./editTeamComponents/EditPokemon"

type editTeamProp = {
    team: pokemonTeam | undefined
}

export const EditTeam = ({
    team
} : editTeamProp) => {
    const [activePokemonData, setActivePokemonData] = useState<pokemonData | undefined>()
    const [pokemonTeam, setPokemonTeam] = useState()
    const [currentPokemonIndex, setCurrentPokemonIndex] = useState<pokemonData | undefined>()

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <PokemonSearch  setActivePokemonData={setActivePokemonData}/>
            <EditPokemon activePokemonData={activePokemonData} />
            {/* move list */}
            {/* team view */}
        </div>
    )
}

