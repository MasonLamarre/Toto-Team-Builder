import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { TotoTeamBuildLogo } from "../../util/logoSvg"
import { pokemonData, userInfo } from "../../util/pokemonTypes"
import { pokemonTeam } from "../../util/pokemonTypes"
import { teamsDatabaseCommands } from "../../util/databaseCommands/teams"
import { TeamList } from "./TeamList"
import { CreateNewTeam } from "../../util/CreateNewTeamButton"
import { UseQueryResult } from "@tanstack/react-query"
import { EditTeam } from "./EditTeam"

type showTeamsProps = {
    getUserTeams: UseQueryResult<any, unknown>,
    userTeams: pokemonTeam[] | undefined,
    setSelectedTeam: React.Dispatch<React.SetStateAction<string>>
}

const ShowTeams = ({
    getUserTeams,
    userTeams,
    setSelectedTeam
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
                        username={userTeams[0].PK}
                        teamname="unamed team"
                    />
                }
            </>
            :
            <span>create new team</span>
        )
    
)

type homePageProps = {
    userInfo: userInfo | undefined
}


export const HomePage = ({
    userInfo
} : homePageProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userTeams, setUserTeams] = useState<pokemonTeam[]>([])
    const [selectedTeam, setSelectedTeam] = useState('')
    const getUserTeams = teamsDatabaseCommands.getTeams(userInfo?.username ? userInfo.username : '')

    useEffect(() => {
        if(getUserTeams.data){
            console.log(getUserTeams.data.teams);
            setUserTeams(getUserTeams.data.teams)
        }
    }, [getUserTeams.data]);

    useEffect(() => {
        if(selectedTeam){
            console.log(selectedTeam);
        }
    },[selectedTeam])

    return (
        <div className='h-full w-full'>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
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
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
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
                                                    <span className=' text-white' >{`Hello ${userInfo?.firstName ? `${userInfo.firstName}!` : 'Trainer!'}`}</span>
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
                                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                    {/* sidebar teams */}
                                                </ul>
                                            </li>
                                            <li className="mt-auto">
                                                <button
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                                                >
                                                    <ArrowLeftOnRectangleIcon
                                                        className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                                                        aria-hidden="true"
                                                    />
                                                    Log out
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="lg:pl-72 h-full w-full">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Team name + delete team button */}

                            {/* if no team selected, "Select a Team to Begin / Create a Team to begin!" */}
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <main className="h-full">
                    <div className="px-4 h-full flex flex-col items-center justify-center gap-4 overflow-scroll">
                        {
                            selectedTeam ?  
                            <EditTeam
                                team={userTeams?.find((team) => team.SK === selectedTeam) || {} as pokemonTeam} 
                                username={userInfo ? userInfo.username : ''}
                            />
                            :
                            <ShowTeams
                                getUserTeams={getUserTeams}
                                userTeams={userTeams}
                                setSelectedTeam={setSelectedTeam}
                            />
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}




