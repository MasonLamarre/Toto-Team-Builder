import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAccountPayload, loginUserPayload, logoutUserPayload } from "./queryTypes";
import { ACCOUNTQUERY } from "./queryConsts";

//update return type to axios error/sucssess account create
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


// const loginUser = async( 
//     username: string,
//     password: string
// ) => (
//     await axios.post('https://jvtk6gdx31.execute-api.us-east-2.amazonaws.com/user/login', {
//         username: username,
//         password: password
//     }).then(
//         (response) => {
//             console.log(response);
//             return response
//         }
//     ).catch(
//         (err) => {
//             console.log(err);
//             return err
//         }
//     )
// )

const useLoginUser = (username: string) => (
    useMutation({
        mutationKey: [ACCOUNTQUERY.loginUser, username],
        mutationFn: async (variables: loginUserPayload) => await axios.post('https://jvtk6gdx31.execute-api.us-east-2.amazonaws.com/user/login', {
            username: variables.username,
            password: variables.password
        })
        
    })
)

const logoutUser = async(username: string) => (
    await axios.post('https://jvtk6gdx31.execute-api.us-east-2.amazonaws.com/user/logout', {
        username: username
    }).then(
        (response) => {
            console.log(response);
            return response
        }
    ).catch(
        (err) => {
            console.log(err);
            return err
        }
    )
)

const useLogoutUser = (username: string) => (
    useMutation({
        mutationKey: [ACCOUNTQUERY.logoutUser, username],
        mutationFn: async(variables : logoutUserPayload) => {
            const response = await logoutUser(variables.username)
            if (response?.name === 'AxiosError' || response === undefined) {
                throw new Error(response.response.data)
            }
            return response.data
        }
    })
)


export const accountDatabaseCommands = {
    createAccount : useCreateAccount,
    login: useLoginUser,
    logout: useLogoutUser
}