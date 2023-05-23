import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { pokemonData } from "../../../util/pokemonTypes"
import { v4 as uuidv4 } from 'uuid';

type teammateSelectProp = {
    team : pokemonData[],
    setActivePokemonData: React.Dispatch<React.SetStateAction<pokemonData>>,
    setCurrentPokemonIndex: React.Dispatch<React.SetStateAction<number>>
}
export const TeammateSelect = ({
    team,
    setActivePokemonData,
    setCurrentPokemonIndex
} : teammateSelectProp) => {
    const teammates = [];
    for (let i = 0; i < 6; i++) {
        const genKey = uuidv4()
        teammates.push(
            <TeammateCard 
                key={genKey} 
                pokemon={team[i]} 
                setActivePokemonData={setActivePokemonData}
                setCurrentPokemonIndex={setCurrentPokemonIndex}
                index={i} 
            />
        ) 
    }
    return (
        <div className="flex flex-row w-full h-1/6 flex-wrap justify-center items-center">
            { teammates.map((teammember) => teammember )}
        </div>
    )
}

type teamMateProp = {
    pokemon : pokemonData
    setActivePokemonData: React.Dispatch<React.SetStateAction<pokemonData>>
    setCurrentPokemonIndex: React.Dispatch<React.SetStateAction<number>>
    index: number
}
const TeammateCard = ({
    pokemon,
    setActivePokemonData,
    setCurrentPokemonIndex,
    index
} : teamMateProp) => {

    const handleClick = () => {
        setActivePokemonData(pokemon)
        setCurrentPokemonIndex(index)
    }

    return (
        pokemon.pokedexId !== 0 ?
            <img
                onClick={handleClick}
                className="inline-block h-14 w-14 rounded-full"
                src={pokemon.sprite}
                alt=''
            />
            :
            <div className="flex justify-center items-center h-14 w-14 rounded-full">
                <QuestionMarkCircleIcon
                    onClick={handleClick}
                    className="h-16 w-16 rounded-full"
                />
            </div>
    );
}