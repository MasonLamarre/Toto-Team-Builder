import { useState, useEffect, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { pokemonAPI } from '../../../util/databaseCommands/pokemonAPI';
import { joinTailwindClasses } from '../../../util/joinTailwindClasses';
import { pokemonData } from '../../../util/pokemonTypes';

type pokemonRes = {
    name: string,
    url: string
}

type pokeSearchProp = {
    changeCurrentTeammember: (newTeammember: pokemonData) => void
    setActivePokemonData: React.Dispatch<React.SetStateAction<pokemonData>>
}

export const PokemonSearch = ({
    changeCurrentTeammember,
    setActivePokemonData
} : pokeSearchProp) => {
    const [selectedPokemon, setSelectedPokemon] = useState<pokemonRes>({ name: '' , url: ''})
    const [query, setQuery] = useState('');
    const [queryResults, setQueryResults] = useState('')
    const [testOptions, setTestOptions] = useState<pokemonRes[]>([])

    const searchPokemon = pokemonAPI.pokemon(queryResults)
    const searchPokeTest = pokemonAPI.test()

    useEffect(() => {
        if(searchPokeTest.data){
            setTestOptions(searchPokeTest.data.data.results)    
        }
    },[searchPokeTest.data])

    useEffect(() => {
        if(searchPokemon.data){
            const pokeData = {
                name: searchPokemon.data.data.name,
                pokedexId: searchPokemon.data.data.id,
                sprite: searchPokemon.data.data.sprites.front_default,
                type: searchPokemon.data.data.types[0].name
            }
            // need to fix pokemon types
            changeCurrentTeammember(pokeData)
            setActivePokemonData(pokeData)
        }
    }, [searchPokemon.data])

    const handleChange = (pokemon : pokemonRes) => {
        setSelectedPokemon(pokemon),
        setQueryResults(pokemon.url)
    }

    
    const filteredPokemon =
        query === ''
            ? testOptions
            : testOptions.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Listbox value={selectedPokemon} onChange={handleChange}>
            {({ open }) => (
                <div>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Select pokemon</Listbox.Label>
                    <div className="relative">
                        <Listbox.Button className="relative h-[36px] w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{selectedPokemon.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredPokemon.map((pokemon) => (
                                    <Listbox.Option
                                        key={pokemon.name}
                                        className={({ active }) =>
                                            joinTailwindClasses(
                                                active ? 'bg-cyan-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-8 pr-4'
                                            )
                                        }
                                        value={pokemon}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={joinTailwindClasses(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                    {pokemon.name}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={joinTailwindClasses(
                                                            active ? 'text-white' : 'text-cyan-600',
                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}
