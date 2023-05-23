import { StopIcon } from "@heroicons/react/24/outline"
import { pokemonData } from "../../../util/pokemonTypes"
import { useState, useEffect } from "react"
import { fontStyles } from "../../../util/sharedStyles"



type editPokeProps = {
    activePokemonData: pokemonData
    changeCurrentTeammember: (newTeammember:pokemonData) => void
}
export const EditPokemon = ({
    activePokemonData,
    changeCurrentTeammember
} : editPokeProps) => {
    const [nickname, setNickname] = useState(activePokemonData?.nickName ? activePokemonData.nickName : activePokemonData.name)
    // const [level, setLevel] = useState(activePokemonData?.level ? `${activePokemonData.level}` : '???')
    
    useEffect(() => {
        setNickname(activePokemonData?.nickName ? activePokemonData.nickName : activePokemonData.name)
    },[activePokemonData])

    useEffect(() => {
        changeCurrentTeammember({ ...activePokemonData, nickName: nickname })
    },[nickname])

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const inputValue = e.target.value;

    //     if (/^\d*$/.test(inputValue)) {
    //         // Only update the value if it is within the range of 1-100
    //         if (inputValue === '' || (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 100)) {
    //             setLevel(inputValue);
    //         }
    //     }
    // };

    return (
        <div className="flex flex-col border items-center border-cyan-500 rounded-md p-2">
           {activePokemonData &&
            <>
                <div className="flex flex-row w-full justify-between">
                    <span className={fontStyles.medium}>
                        {`#${activePokemonData.pokedexId}`}
                    </span>

                    <input 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className=" border-b-2 border-cyan-600 text-center font-medium focus-visible:outline-none bg-cyan-100"
                        maxLength={18}
                    />

                   <StopIcon 
                        className="h-8 w-8 "
                   />
                </div>

                <img
                    className="inline-block h-44 w-44 rounded-full"
                    src={activePokemonData.sprite}
                    alt=''
                />

                <div className="flex flex-row">
                    <span className={fontStyles.medium}>
                        {activePokemonData?.level ? `Lv. ${activePokemonData.level}` : 'Lv. ???'}
                    </span>
                    {/* <input
                        type="number"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className=" border-b-2 border-cyan-600 text-center font-medium focus-visible:outline-none bg-cyan-100"
                        maxLength={3}
                        min={1}
                        max={100}
                    /> */}
                </div>
            </> 
           }
        </div>
    )
}   