import { StopIcon } from "@heroicons/react/24/outline"
import { pokemonData } from "../../../util/pokemonTypes"
import { useState, useEffect } from "react"
import { inputStyles } from "../../../util/sharedStyles"

type editPokeProps = {
    activePokemonData: pokemonData
    changeCurrentTeammember: (newTeammember:pokemonData) => void
}
export const EditPokemon = ({
    activePokemonData,
    changeCurrentTeammember
} : editPokeProps) => {
    const [nickname, setNickname] = useState(activePokemonData?.nickName ? activePokemonData.nickName : activePokemonData.name)

    useEffect(() => {
        setNickname(activePokemonData?.nickName ? activePokemonData.nickName : activePokemonData.name)
    },[activePokemonData])
    
    useEffect(() => {
        changeCurrentTeammember({ ...activePokemonData, nickName: nickname })
    },[nickname])

    return (
        <div className="flex flex-col border items-center border-blue-500">
           {activePokemonData &&
            <>
                <div className="flex flex-row w-full justify-between">
                    <span className="">
                        {`#${activePokemonData.pokedexId}`}
                    </span>

                    <input 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className=" border-b-2 border-indigo-600 text-center font-medium focus-visible:outline-none"
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

                <div>
                    <span>{activePokemonData?.level ? `Lv.${activePokemonData.level}` : 'Lv.???'}</span>
                </div>
            </> 
           }
        </div>
    )
}   