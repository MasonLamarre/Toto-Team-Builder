import { teamsDatabaseCommands } from "./databaseCommands/teams";
import { pokemonData } from "./pokemonTypes";
import { buttonStyles } from "./sharedStyles";

type updateTeamButtonProps = {
    username: string,
    teamId: string,
    teamName: string,
    pokemon: pokemonData[]
};

export const UpdateTeamButton = ({
    username,
    teamId,
    teamName,
    pokemon
}: updateTeamButtonProps) => {
    const updateTeam = teamsDatabaseCommands.update(teamId);
    const handleUpdate = () => {
        console.log(pokemon);
        updateTeam.mutateAsync({
            username: username,
            teamId: teamId,
            teamInfo: {
                teamName: teamName,
                pokemon: pokemon
            }
        }, {
            onSuccess: (data) => console.log('query success', data), //create func to return to home screen
            onError: (err) => console.log('query fail', err) // update page to notify an error occured, maybe toastify?
        })
    }

    return (
        <button
            onClick={handleUpdate}
            className={!username ? buttonStyles.disabled : buttonStyles.primary}
        >
            {
                updateTeam.isLoading ? 'Saving Changes...' : (
                    updateTeam.isSuccess ? 'Team Saved!' : (
                        updateTeam.isError ? 'An error occured...' : 'Update Team'
                    )
                )
            }

        </button>
    )
}