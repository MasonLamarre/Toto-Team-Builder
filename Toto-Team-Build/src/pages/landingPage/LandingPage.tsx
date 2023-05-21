import { useState } from "react";
import { buttonStyles, screenContainerClass } from "../../util/sharedStyles"
import { TotoTeamBuildLogo } from "../../util/logoSvg";
import { Login } from "./Login";

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
}

export const LandingPage = ({
    toggleUserLoggedIn
}: landingPageProps) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const toggleLogin = () => {
        setIsLoggingIn((isLogging) => !isLogging)
    }

    const toggleCreate = () => {
        setIsCreatingAccount((isCreating) => !isCreating)
    }

    const BaseLandingScreen = () => (
        <div
            className=' flex flex-col justify-center gap-8'
        >
            <div className='flex flex-col gap-2 items-center justify-center'>
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
            { isLoggingIn ? <Login /> : ( isCreatingAccount ? <span>make acc</span> : <BaseLandingScreen /> ) }
        </div>
    )
}