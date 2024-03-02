export type UserType={
    id ?:number,
    username :string,
    gmail :string,
    password:string,
    created_at ?:Date
}

export type userNotSensitive={
    username:string,
    gmail:string,
}

export type UserLogin={
    gmail:string,
    password:string
}