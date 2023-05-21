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