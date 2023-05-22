import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { pokemonData, pokemonTeam } from "../../util/pokemonTypes"
import { v4 as uuidv4 } from 'uuid';


type teamListProp = {
    teams : pokemonTeam[]
    setSelectedTeam: React.Dispatch<React.SetStateAction<string>>
}

export const TeamList = ({
    teams,
    setSelectedTeam
} : teamListProp ) => {
    return(
        <ul role="list" className="flex flex-col py-4 gap-4 ">
            {teams.map((team) => (
                <TeamCard
                    key={team.SK}
                    team={team} 
                    setSelectedTeam={setSelectedTeam}
                />
            ))}
        </ul>
    )
}


type teamCardProp = {
    team : pokemonTeam
    setSelectedTeam: React.Dispatch<React.SetStateAction<string>>
}

const TeamCard = ({
    team,
    setSelectedTeam

} : teamCardProp) => {
    
    const pokemonPreviews = []
    for(let i=0; i < 6; i++){
        const genKey = uuidv4()
        if (team?.pokemonData[i] !== undefined){
            pokemonPreviews.push(
                <PokemonPreview key={genKey} pokemon={team.pokemonData[i]}/>
            )
        }else{
            pokemonPreviews.push(
                <PokemonPreview key={genKey} pokemon={undefined} />
            )
        }
    }

    return (
        <div 
            className="flex flex-col items-center border-2 rounded-md border-cyan-500 hover:bg-cyan-300"
            onClick={() => setSelectedTeam(team.SK)}
        >
            <div>
                <span className="text-lg font-medium">{`${team.teamName}`}</span>

            </div>

            <div className="flex flex-row w-full flex-wrap items-center justify-center" >
                {
                   pokemonPreviews.map((preview) => preview) 
                }
            </div>
        </div>
    )
}


type pokemonPreviewProp = {
    pokemon : pokemonData | undefined
}
const PokemonPreview = ({
    pokemon
} : pokemonPreviewProp) => {

    return (
        pokemon !== undefined ? 
            <img
                className="inline-block h-24 w-24 rounded-full"
                src={pokemon.sprite}
                alt=''
            />
            :
            <div className="flex justify-center items-center h-24 w-24 rounded-full">
                <QuestionMarkCircleIcon 
                    className="h-16 w-16 rounded-full"
                />
            </div>
    );
}

  