import { useState } from 'react'
import { accountDatabaseCommands } from '../../util/databaseCommands/account'
import { buttonStyles, inputStyles, screenContainerClass } from '../../util/sharedStyles'
import { TotoTeamBuildLogo } from '../../util/logoSvg'
import { userInfo } from '../../util/pokemonTypes'

type loginProps = {
    toggleUserLoggedIn : () => void
    swapToCreateAccount : () => void
    backToLanding : () => void
    setUserInfo : React.Dispatch<React.SetStateAction<userInfo | undefined>>
}

export const Login = ({
    toggleUserLoggedIn,
    swapToCreateAccount,
    backToLanding,
    setUserInfo
} : loginProps ) => {
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
                    toggleUserLoggedIn();
                    setUserInfo(data.userInformation)
                    console.log('query success', data)
                }, //create func to login usuer
                onError: (err) => console.log('query fail', err) // update page to notify an error occured, lookout for code 409
            })
        }
    };


    return (
        <div className={screenContainerClass}>

            <div>
                <div 
                    onClick={backToLanding}
                    className='flex flex-col gap-2 items-center justify-center'
                >
                    <TotoTeamBuildLogo
                        height={'8rem'}
                        width={'8rem'}
                    />
                    <span>Toto Team Builder</span>
                </div>
            </div>

            <div className='flex flex-col justify-center gap-4'>
                <div className='flex flex-col'>
                    <span>Username</span>
                    <input
                        placeholder='"supertrainer123"'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={inputStyles.primary}
                    />
                </div>

                <div className='flex flex-col'>
                    <span>Password</span>
                    <input
                        type='password'
                        placeholder='"password"'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputStyles.primary}
                    />
                    <span 
                        className='text-sm'
                        onClick={swapToCreateAccount}
                    >
                        Create Account
                    </span>
                </div>

                <div className='flex flex-col items-center gap-2'>
                    <button
                        className={!username || !password  ? buttonStyles.disabled : buttonStyles.primary}
                        disabled={!username || !password}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    
                </div>
            </div>

            
        </div>
    )
}