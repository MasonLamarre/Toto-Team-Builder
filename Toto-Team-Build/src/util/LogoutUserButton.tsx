import { accountDatabaseCommands } from "./databaseCommands/account"
import { buttonStyles } from "./sharedStyles";

type logoutUserButtonProps = {
    username : string
};

export const LogoutUserButton = ({
    username
} : logoutUserButtonProps) => {
    const logoutUser = accountDatabaseCommands.logout(username);
    const handleLogout = () => {
        console.log(username);
        logoutUser.mutateAsync({
            username: username
        }, {
            onSuccess: (data) => console.log('query success', data), //create func to return to home screen
            onError: (err) => console.log('query fail', err) // update page to notify an error occured, maybe toastify?
        })
    }

    return (
        <button
            onClick={handleLogout}
            className={!username ? buttonStyles.disabled : buttonStyles.primary}
        >
            Logout
        </button>
    )
}