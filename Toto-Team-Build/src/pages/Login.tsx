import { useState } from 'react'
import { accountDatabaseCommands } from '../util/databaseCommands/account'
import { buttonStyles, inputStyles } from '../util/sharedStyles'
import { LogoutUserButton } from '../util/LogoutUserButton'
import { CreateNewTeam } from '../util/CreateNewTeamButton'
import { DeleteTeamButton } from '../util/deleteTeamButton'
import { UpdateTeamButton } from '../util/updateTeamButton'
import { bulbasaurTestObject } from '../util/testPokemon'


export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [teamname, setTeamname] = useState('')

    const loginUser = accountDatabaseCommands.login(username)

    const handleLogin = async() => {
        if(username && password){
            loginUser.mutateAsync({
                username: username,
                password: password
            }, {
                onSuccess: (data) => console.log('query success', data), //create func to login usuer
                onError: (err) => console.log('query fail', err) // update page to notify an error occured, lookout for code 409
            })
        }
    };


    return (
        <div className='w-full h-full flex flex-col items-center'>
            <div className='flex flex-col'>
                <span>Username :</span>
                <input
                    placeholder='"supertrainer123"'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputStyles.primary}
                />
            </div>

            <div className='flex flex-col'>
                <span>Password :</span>
                <input
                    type='password'
                    placeholder='"password"'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputStyles.primary}
                />
            </div>

            <button
                className={!username || !password  ? buttonStyles.disabled : buttonStyles.primary}
                disabled={!username || !password}
                onClick={handleLogin}
            >
                Login
            </button>

           <LogoutUserButton 
                username={username}
           />

            <div className='flex flex-col'>
                <span>Teamname :</span>
                <input
                    placeholder='"Strike Forcer"'
                    value={teamname}
                    onChange={(e) => setTeamname(e.target.value)}
                    className={inputStyles.primary}
                />
            </div>

           <CreateNewTeam 
                username={username}
                teamname={teamname}
           />

           <DeleteTeamButton 
                username={username}
                teamId='T-08917b42-f458-4853-a004-169d976dcfa9'
           />

           <UpdateTeamButton 
                username={username}
                teamId='T-08917b42-f458-4853-a004-169d976dcfa9'
                teamName={teamname}
                pokemon={[]}
           />
        </div>
    )
}