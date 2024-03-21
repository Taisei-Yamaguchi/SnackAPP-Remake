export type UserData ={
    username: string,
    password: string,
}

export type LoginUserInfo ={
    account: {
        id: number,
        username: string,
        language: string,
    },
    token:string
}