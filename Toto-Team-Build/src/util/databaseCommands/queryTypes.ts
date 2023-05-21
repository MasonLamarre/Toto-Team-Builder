export type createAccountPayload  = {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}

export type logoutUserPayload = {
    username: string
}

export type loginUserPayload = {
    username: string,
    password: string,
}

export type createTeamPayload = {
    username: string,
    teamId: string,
    teamName: string
}

export type deleteTeamPayload = {
    username: string,
    teamId: string
}