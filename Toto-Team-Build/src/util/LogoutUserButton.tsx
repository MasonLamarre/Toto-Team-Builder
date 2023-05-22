import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { accountDatabaseCommands } from "./databaseCommands/account"

type logoutUserButtonProps = {
    username : string
    toggleUserLoggedIn : () => void
};

export const LogoutUserButton = ({
    username,
    toggleUserLoggedIn
} : logoutUserButtonProps) => {
    const logoutUser = accountDatabaseCommands.logout(username);
    const handleLogout = () => {
        console.log(username);
        logoutUser.mutateAsync({
            username: username
        }, {
            onSuccess: () => toggleUserLoggedIn(), //create func to return to home screen
            onError: (err) => console.log('query fail', err) // update page to notify an error occured, maybe toastify?
        })
    }

    return (
        <button
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-cyan-700 hover:text-white"
            onClick={handleLogout}
        >
            <ArrowLeftOnRectangleIcon
                className="h-6 w-6 shrink-0 text-white"
                aria-hidden="true"
            />
            Log out
        </button>
    )
}