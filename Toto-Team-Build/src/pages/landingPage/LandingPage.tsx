import { useState } from "react";
import { buttonStyles, screenContainerClass } from "../../util/sharedStyles"
import { TotoTeamBuildLogo } from "../../util/logoSvg";
import { Login } from "./Login";
import { CreateAccount } from "./CreateAccount";
import { userInfo } from "../../util/pokemonTypes";

type loginBtnProps = {
    toggleLogin: () => void
 }

 type createAccBtnProps = {
     toggleCreate: () => void
 }



const LoginButton = ({
    toggleLogin
} : loginBtnProps) => (
    <button
        onClick={toggleLogin}
        className={buttonStyles.primary}
    >
        Login
    </button>
)

const CreateNewAccountButton = ({
    toggleCreate
} : createAccBtnProps) => (
    <button
        onClick={toggleCreate}
        className={buttonStyles.primary}
    >
        Create Account
    </button>
)

type landingPageProps = {
    toggleUserLoggedIn : () => void
    setUserInfo: React.Dispatch<React.SetStateAction<userInfo | undefined>>
}

export const LandingPage = ({
    toggleUserLoggedIn,
    setUserInfo
}: landingPageProps) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const toggleLogin = () => {
        setIsLoggingIn((isLogging) => !isLogging)
    }

    const toggleCreate = () => {
        setIsCreatingAccount((isCreating) => !isCreating)
    }

    const swapToLogin = () => {
        setIsCreatingAccount(false)
        setIsLoggingIn(true)
    };

    const swapToCreateAccount = () => {
        setIsLoggingIn(false)
        setIsCreatingAccount(true)
    }

    const backToLandingPage = () => {
        setIsLoggingIn(false)
        setIsCreatingAccount(false)
    }

    const BaseLandingScreen = () => (
        <div
            className=' flex flex-col justify-center gap-8'
        >
            <div 
                onClick={backToLandingPage}
                className='flex flex-col gap-2 items-center justify-center'
            >
                <TotoTeamBuildLogo
                    height={'12rem'}
                    width={'12rem'}
                />
                <span>Toto Team Builder</span>
            </div>

            <div className='flex flex-col gap-2 items-center justify-center'>
                <LoginButton
                    toggleLogin={toggleLogin}  
                />

                <CreateNewAccountButton
                    toggleCreate={toggleCreate}
                />
            </div>
        </div>
    )

    return (
        <div
           className={screenContainerClass}
        >
            { isLoggingIn ? 
                <Login 
                    backToLanding={backToLandingPage} 
                    swapToCreateAccount={swapToCreateAccount} 
                    toggleUserLoggedIn={toggleUserLoggedIn}
                    setUserInfo={setUserInfo}
                /> : 
                ( isCreatingAccount ? 
                    <CreateAccount
                        backToLanding={backToLandingPage} 
                        swapToLogin={swapToLogin} 
                        toggleIsLoggedIn={toggleUserLoggedIn}
                        setUserInfo={setUserInfo}
                    /> 
                    : 
                    <BaseLandingScreen /> 
                ) 
            }
        </div>
    )
}