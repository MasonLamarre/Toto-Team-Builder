import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { POKEQUERY } from "./queryConsts";
import axios from "axios";

const useTestQuery = () => (
    useQuery({
        queryKey: [POKEQUERY.pokemon],
        queryFn: async () => await axios.get(
            `https://pokeapi.co/api/v2/pokemon/`
        )
    })
)

const usePokemonAPI = (search : string) => (
    useQuery({
        queryKey : [POKEQUERY.pokemon,search],
        queryFn: async () => await axios.get(search),
        enabled: !!search
    })
)
   
const useMoveAPI = (search : string) => (
    useInfiniteQuery({
        queryKey: [POKEQUERY.move, search],
        queryFn: async ({ pageParam = 1 }) => await axios.get(
            `https://pokeapi.co/api/v2/move/${search}/?limit=30`
        ),
        getNextPageParam : (lastPage, pages) => {
            if(pages[pages.length] !== lastPage){
                return pages.length + 1
            }
        },
        enabled: search.length > 2
    })
)

export const pokemonAPI = {
    pokemon : usePokemonAPI,
    moves: useMoveAPI,
    test: useTestQuery
}