import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TEAMQUERY } from "./queryConsts";
import { createTeamPayload } from "./queryTypes";


const createTeam = async(
    username: string,
    teamId: string,
    teamName: string
) => (
    await axios.post('https://jvtk6gdx31.execute-api.us-east-2.amazonaws.com/teams/create', {
        username: username,
        teamId: teamId,
        teamName: teamName
    }).then(
        (response) => response
    ).catch(
        (err) => err
    )
)

const useCreateTeam = (id: string) => (
    useMutation({
        mutationKey : [TEAMQUERY.create, id],
        mutationFn: async(variables : createTeamPayload) => {
            const response = await createTeam(
                variables.username,
                variables.teamId,
                variables.teamName
            )
            if (response?.name === 'AxiosError' || response === undefined) {
                throw new Error(response)
            }
            return response.data;
        }
    })
)

// const updateTeam = async () => (

// )

// const useUpdateTeam = () => (

// )

// const deleteTeam = async () => (

// )

// const useDeleteTeam = () => (

// )

// const getTeams = async () => (

// )

// const useGetTeams = () => (

// )

export const teamsDatabaseCommands = {
    create : useCreateTeam,
    // update : useUpdateTeam,
    // delete : useDeleteTeam,
    // getTeams : useGetTeams
}
