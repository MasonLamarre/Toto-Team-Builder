import { useState } from "react"
import { POKEMONTYPES, pokemonData, pokemonTeam } from "../../util/pokemonTypes"
import { PokemonSearch } from "./editTeamComponents/PokeSearch"
import { EditPokemon } from "./editTeamComponents/EditPokemon"
import { TeammateSelect } from "./editTeamComponents/TeammateSelect"
import { UpdateTeamButton } from "../../util/UpdateTeamButton"

type editTeamProp = {
    team: pokemonTeam
    username: string
}

export const EditTeam = ({
    team,
    username
} : editTeamProp) => {
    const passedTeam = [...team.pokemonData]
    if(passedTeam.length < 6){
        for(let i = 6 - passedTeam.length; passedTeam.length < 6; i++){
            passedTeam.push({
                name: '',
                pokedexId: 0,
                sprite: '',
                type: [POKEMONTYPES.water]
            })
        }
    }
   
    const [pokemonTeam, setPokemonTeam] = useState(passedTeam)
    const [activePokemonData, setActivePokemonData] = useState<pokemonData>(pokemonTeam[0])
    const [currentPokemonIndex, setCurrentPokemonIndex] = useState<number>(0)

    const changeCurrentTeammember = (newTeammember : pokemonData) => {
        pokemonTeam[currentPokemonIndex] = newTeammember
    }

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <span>{team ? team.teamName : 'Unamned Team'}</span>
            <PokemonSearch  
                changeCurrentTeammember={changeCurrentTeammember}
                setActivePokemonData={setActivePokemonData}
            />
            <EditPokemon activePokemonData={activePokemonData} />
            {/* move list */}
            <TeammateSelect 
                team={pokemonTeam}
                setActivePokemonData={setActivePokemonData}
                setCurrentPokemonIndex={setCurrentPokemonIndex}
            />
            <UpdateTeamButton
                username={username}
                teamId={team.SK}
                teamName={team.teamName}
                pokemon={pokemonTeam} 
            />
        </div>
    )
}

