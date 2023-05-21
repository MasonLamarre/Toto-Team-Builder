import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TEAMQUERY } from "./queryConsts";
import { createTeamPayload, deleteTeamPayload } from "./queryTypes";


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

const deleteTeam = async (
    username: string,
    teamId: string
) => (
    await axios.post('https://jvtk6gdx31.execute-api.us-east-2.amazonaws.com/teams/delete', {
        username: username,
        teamId: teamId,
    }).then(
        (response) => {
            console.log(response)
            return response
        }
    ).catch(
        (err) => err
    )
)

const useDeleteTeam = (teamId : string) => (
    useMutation({
        mutationKey: [TEAMQUERY.delete, teamId],
        mutationFn: async(variables : deleteTeamPayload) => {
            const response = await deleteTeam(
                variables.username,
                variables.teamId
            )
            if (response?.name === 'AxiosError' || response === undefined) {
                throw new Error(response)
            }
            return response.data;
        }
    })
)

// const getTeams = async () => (

// )

// const useGetTeams = () => (

// )

export const teamsDatabaseCommands = {
    create : useCreateTeam,
    // update : useUpdateTeam,
    delete : useDeleteTeam,
    // getTeams : useGetTeams
}
