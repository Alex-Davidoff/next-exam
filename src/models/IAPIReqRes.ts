export interface IUserLoginPass {
    username: string,
    password: string     
}

export interface ILoginResponse{
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    accessToken: string;
    refreshToken: string;
}

export interface ITokensPair {
    accessToken: string;
    refreshToken: string;
}