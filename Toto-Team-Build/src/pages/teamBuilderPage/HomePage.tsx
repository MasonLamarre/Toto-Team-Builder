import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { TotoTeamBuildLogo } from "../../util/logoSvg"
import { userInfo } from "../../util/pokemonTypes"
import { pokemonTeam } from "../../util/pokemonTypes"
import { teamsDatabaseCommands } from "../../util/databaseCommands/teams"
import { TeamList } from "./TeamList"
import { CreateNewTeam } from "../../util/CreateNewTeamButton"
import { UseQueryResult } from "@tanstack/react-query"
import { EditTeam } from "./EditTeam"
import { LogoutUserButton } from "../../util/LogoutUserButton"
import { buttonStyles, fontStyles, screenContainerClass } from "../../util/sharedStyles"
import { joinTailwindClasses } from "../../util/joinTailwindClasses"

type showTeamsProps = {
    userInfo: userInfo ,
    getUserTeams: UseQueryResult<any, unknown>,
    userTeams: pokemonTeam[] | undefined,
    setSelectedTeam: React.Dispatch<React.SetStateAction<string>>
}

const ShowTeams = ({
    userInfo,
    getUserTeams,
    userTeams,
    setSelectedTeam,
} : showTeamsProps) => (
    
    getUserTeams.status === 'loading' ? <span>Loading...</span> :
        ((userTeams && userTeams?.length > 0) ?
            <>
                <TeamList
                    teams={userTeams}
                    setSelectedTeam={setSelectedTeam}
                />

                {userTeams.length < 10 &&
                    <CreateNewTeam
                        username={userInfo.username}
                        teamname="unamed team"
                        setSelectedTeam={setSelectedTeam}
                    />
                }
            </>
            :
            <CreateNewTeam 
                username={userInfo.username}
                teamname="unamed team"
                setSelectedTeam={setSelectedTeam}
            />
        )
    
)

type homePageProps = {
    userInfo: userInfo | undefined
    toggleUserLoggedIn: () => void
}


export const HomePage = ({
    userInfo,
    toggleUserLoggedIn
} : homePageProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userTeams, setUserTeams] = useState<pokemonTeam[]>([])
    const [selectedTeam, setSelectedTeam] = useState('')

    const getUserTeams = teamsDatabaseCommands.getTeams(userInfo?.username ? userInfo.username : '')

    useEffect(() => {
        if(getUserTeams.data){
            // console.log(getUserTeams.data.teams);
            setUserTeams([...getUserTeams.data.teams])
        }
    }, [getUserTeams.data]);

    useEffect(() => {
        getUserTeams.refetch()
    },[selectedTeam])

    return (
        <div className={screenContainerClass}>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 " onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cyan-600 px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <TotoTeamBuildLogo 
                                            height={'3rem'}
                                            width={'3rem'}
                                        />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    <span 
                                                        className={joinTailwindClasses(
                                                            fontStyles.large,
                                                            'text-white'
                                                        )} 
                                                    >
                                                        {`Hello ${userInfo?.firstName ? `${userInfo.firstName}!` : 'Trainer!'}`}
                                                    </span>
                                                </ul>
                                            </li>

                
                                            <li>
                                                <span
                                                    className={joinTailwindClasses(
                                                        fontStyles.small,
                                                        'text-cyan-200'
                                                    )}
                                                >
                                                    Your teams
                                                </span>
                                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                    
                                                </ul>
                                            </li>
                                            <li className="mt-auto">
                                                <LogoutUserButton
                                                    username={userInfo ? userInfo.username : ''} 
                                                    toggleUserLoggedIn={toggleUserLoggedIn}
                                                />
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="h-full w-full">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-cyan-300 bg-cyan-200 px-4 shadow-sm">

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {selectedTeam &&
                                <button 
                                    className={buttonStyles.primary} 
                                    onClick={() => setSelectedTeam('')}
                                >
                                    back to teams
                                </button>

                            }
                            {/* Team name + delete team button */}

                            {/* if no team selected, "Select a Team to Begin / Create a Team to begin!" */}
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-900/10" aria-hidden="true" />

                    <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="h-[90%] mt-3">
                    <div className="h-full px-4 py-2 flex flex-col items-center overflow-auto">
                        {
                            (selectedTeam && userInfo !== undefined) ?  
                            <EditTeam
                                team={userTeams?.find((team) => team.SK === selectedTeam) || {
                                    PK : userInfo.username,
                                    SK: selectedTeam,
                                    teamName: 'unamed team',
                                    pokemonData: []
                                }} 
                                username={userInfo.username}
                            />
                            :
                            (userInfo && 
                                <ShowTeams
                                    userInfo={userInfo}
                                    getUserTeams={getUserTeams}
                                    userTeams={userTeams}
                                    setSelectedTeam={setSelectedTeam}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




