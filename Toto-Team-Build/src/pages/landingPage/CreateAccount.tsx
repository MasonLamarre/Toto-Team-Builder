import { useState } from 'react'
import { accountDatabaseCommands } from '../../util/databaseCommands/account'
import { buttonStyles, inputStyles, screenContainerClass } from '../../util/sharedStyles'
import { TotoTeamBuildLogo } from '../../util/logoSvg'


type createAccProps = {
    toggleIsLoggedIn : () => void
    swapToLogin : () => void
    backToLanding : () => void
}

export const CreateAccount = ({
    toggleIsLoggedIn,
    swapToLogin,
    backToLanding
} : createAccProps ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const createAccount = accountDatabaseCommands.createAccount(username);
    const loginUser = accountDatabaseCommands.login(username);

    const handleCreateAccount = async () => {
        if (firstname && lastname && username && password && verifyPassword && password === verifyPassword) {
            createAccount.mutateAsync({
                firstName: firstname,
                lastName: lastname,
                username: username,
                password: password
            }, {
                onSuccess: (data) => {
                    console.log('query success', data)
                    handleLogin()
                }, //create func to login usuer
                onError: (err) => console.log('query fail', err) // update page to notify an error occured, lookout for code 409
            })
        }
    }

    const handleLogin = () => {
        loginUser.mutateAsync({
            username: username,
            password: password
        }, {
            onSuccess: (data) => {
                toggleIsLoggedIn();
                console.log('query success', data)
            }, //create func to login usuer
            onError: (err) => console.log('query fail', err) // update page to notify an error occured, lookout for code 409
        })
    };

    return (
        <div className={screenContainerClass}>
            <div className='flex flex-col gap-4'>
                <div>
                    <div
                        onClick={backToLanding} 
                        className='flex flex-col gap-2 items-center justify-center'
                    >
                        <TotoTeamBuildLogo
                            height={'6rem'}
                            width={'6rem'}
                        />
                        <span>Toto Team Builder</span>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <span>First Name :</span>
                    <input
                        placeholder='"Ash"'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className={inputStyles.primary}
                    />
                </div>

                <div className='flex flex-col'>
                    <span>Last Name :</span>
                    <input
                        placeholder='"Ketchum"'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className={inputStyles.primary}
                    />
                </div>

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
                    <span>Password</span>
                    <input
                        type='password'
                        placeholder='"password123"'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputStyles.primary}

                    />
                </div>

                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <span>Verify Password</span>
                        {password !== verifyPassword &&
                            <span className='text-sm'>Passwords do not match!</span>
                        }
                    </div>
                    
                    <input
                        type='password'
                        placeholder='"password123"'
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        className={
                            password === verifyPassword ? inputStyles.primary : inputStyles.error
                        }
                    />
                    <span
                        className='text-sm'
                        onClick={swapToLogin}
                    >
                        Already have an account?
                    </span>
                </div>

                <div>
                    <button
                        className={
                            !firstname || !lastname || !username || !password || !verifyPassword || password !== verifyPassword ?
                                buttonStyles.disabled : buttonStyles.primary}
                        disabled={!firstname || !lastname || !username || !password || !verifyPassword || password !== verifyPassword}
                        onClick={handleCreateAccount}
                    >
                        Create Account!
                    </button>
                </div>
            </div>
        </div>
    )
}