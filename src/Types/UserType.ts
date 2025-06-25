export interface UserData {
    nickname: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    posts?: {id:number}[];
    answers?: {
        postId: number;
        id: number;
    }[];
}

export interface User {
    nickname: string;
}

export interface LoginData {
    nickname: string;
    password: string;
}

export interface RegisterData extends LoginData{
    repeatPassword: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}