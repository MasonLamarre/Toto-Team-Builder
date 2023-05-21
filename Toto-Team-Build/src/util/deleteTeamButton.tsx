import { teamsDatabaseCommands } from "./databaseCommands/teams";
import { buttonStyles } from "./sharedStyles";

type deleteTeamButtonProps = {
    username: string,
    teamId: string
};

export const DeleteTeamButton = ({
    username,
    teamId
}: deleteTeamButtonProps) => {
    const deleteTeam = teamsDatabaseCommands.delete(teamId);
    const handleDelete = () => {
        console.log(username);
        deleteTeam.mutateAsync({
            username: username,
            teamId: teamId
        }, {
            onSuccess: (data) => console.log('query success', data), //create func to return to home screen
            onError: (err) => console.log('query fail', err) // update page to notify an error occured, maybe toastify?
        })
    }

    return (
        <button
            onClick={handleDelete}
            className={!username ? buttonStyles.disabled : buttonStyles.primary}
        >
            Delete Team
        </button>
    )
}