import { teamsDatabaseCommands } from "./databaseCommands/teams"
import { buttonStyles } from "./sharedStyles"
import { v4 as uuidv4 } from 'uuid';

type createNewTeamProps = {
    username: string,
    teamname: string,
    setSelectedTeam: React.Dispatch<React.SetStateAction<string>>
}

export const CreateNewTeam = ({
    username,
    teamname,
    setSelectedTeam
} : createNewTeamProps ) => {
    const newTeamId = uuidv4()
    const createTeam = teamsDatabaseCommands.create(newTeamId)

    const handleCreateTeam = () => {
        createTeam.mutateAsync({
            username: username,
            teamName: teamname,
            teamId: newTeamId
        }, {
            onSuccess: (data) => setSelectedTeam(data.teamId), //create func to return to home screen
            onError: (err) => console.log('query fail', err) // update page to notify an error occured, maybe toastify?
        })
    }

    return (
        <button
            onClick={handleCreateTeam}
            className={buttonStyles.primary}
        >
            New team
        </button>
    )
}