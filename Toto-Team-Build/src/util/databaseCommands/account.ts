import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAccountPayload } from "./queryTypes";
import { ACCOUNTQUERY } from "./queryConsts";

const createAccount = async(
    username: string,
    password: string,
    firstName: string,
    lastName: string
) => (
    await axios.post('https://jvtk6gdx31.execute-api.us-east-2.amazonaws.com/user/create' , {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    }).then (
        (response) => response
    ).catch (
        (err) => err
    )   
)


const useCreateAccount = (newUsername : string) => (
    useMutation({
        mutationKey: [ACCOUNTQUERY.createAccount, newUsername],
        mutationFn: async(variables : createAccountPayload) => {
            console.log('mutate fun called');
            const response = await createAccount(
                variables.username,
                variables.password,
                variables.firstName,
                variables.lastName
            )
            if(response?.name === 'AxiosError' || response === undefined){
                throw new Error(response)
            }
            return response.data;
        }
    })
);



export const accountDatabaseCommands = {
    createAccount : useCreateAccount
}