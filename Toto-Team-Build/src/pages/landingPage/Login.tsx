import { useState } from 'react'
import { accountDatabaseCommands } from '../../util/databaseCommands/account'
import { buttonStyles, inputStyles } from '../../util/sharedStyles'

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = accountDatabaseCommands.login(username)
    const handleLogin = async() => {
        if(username && password){
           
            loginUser.mutateAsync({
                username: username,
                password: password
            }, {
                onSuccess: (data) => {
                    console.log('query success', data)
                }, //create func to login usuer
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
        </div>
    )
}