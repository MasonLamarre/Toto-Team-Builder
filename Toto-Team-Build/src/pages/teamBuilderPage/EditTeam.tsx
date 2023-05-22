import { useState } from "react"
import { POKEMONTYPES, pokemonData, pokemonTeam } from "../../util/pokemonTypes"
import { PokemonSearch } from "./editTeamComponents/PokeSearch"
import { EditPokemon } from "./editTeamComponents/EditPokemon"
import { TeammateSelect } from "./editTeamComponents/TeammateSelect"
import { UpdateTeamButton } from "../../util/UpdateTeamButton"
import { inputStyles } from "../../util/sharedStyles"
import { joinTailwindClasses } from "../../util/joinTailwindClasses"

type editTeamProp = {
    team: pokemonTeam
    username: string
}

export const EditTeam = ({
    team,
    username,
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
   
    const [pokemonTeam] = useState(passedTeam)
    const [teamname, setTeamname] = useState(team.teamName);
    const [activePokemonData, setActivePokemonData] = useState<pokemonData>(pokemonTeam[0])
    const [currentPokemonIndex, setCurrentPokemonIndex] = useState<number>(0)

    const changeCurrentTeammember = (newTeammember : pokemonData) => {
        console.log(pokemonTeam[currentPokemonIndex]);
        pokemonTeam[currentPokemonIndex] = newTeammember
    }

    return (
        <div className="w-full h-full flex flex-col gap-3">
            <input
                value={teamname}
                onChange={(e) => setTeamname(e.target.value)}
                className={joinTailwindClasses(
                    inputStyles.primary,
                    'w-full text-center font-semibold',
                )} 
            />
            <PokemonSearch  
                changeCurrentTeammember={changeCurrentTeammember}
                setActivePokemonData={setActivePokemonData}
            />
            <EditPokemon 
                activePokemonData={activePokemonData} 
                changeCurrentTeammember={changeCurrentTeammember}
            />
            {/* move list */}
            <TeammateSelect 
                team={pokemonTeam}
                setActivePokemonData={setActivePokemonData}
                setCurrentPokemonIndex={setCurrentPokemonIndex}
            />
            <UpdateTeamButton
                username={username}
                teamId={team.SK}
                teamName={teamname}
                pokemon={pokemonTeam} 
            />
        </div>
    )
}

