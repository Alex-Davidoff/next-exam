import { ILoginResponse, ITokensPair, IUserLoginPass } from "@/models/IAPIReqRes";
import { getAToken, getAuthUser, getRToken, setAuthUser } from "./cookies";

const APIBaseUrl = 'https://dummyjson.com';

export const getUserAuthData = async ({username, password}: IUserLoginPass): Promise<ILoginResponse | undefined> => {
    try {
        const data:ILoginResponse = await fetch(APIBaseUrl+'/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: username,
              password: password,
              expiresInMins: 30, 
            })
          })
          .then(res => res.json());
        if (data) {
            return data;
        }
    } catch {
        return undefined;
    }
}

export const getAll =  async <T,>(endpoint:string, searchParams: string) => {
    let sp = '';
    if (searchParams) {sp = '?'+searchParams};
    console.log('try fetch ', APIBaseUrl+endpoint+sp);
    const response = await fetch(APIBaseUrl+endpoint+sp,
        {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+getAToken(), 
            }
        })
        .then(res => res.json());
    console.log('response',response);
    return response as T;
}

const refreshTokens = async (): Promise<void> =>{
    const Rt = getRToken();
    const refreshResponse: ITokensPair = await fetch(APIBaseUrl+'/auth/refresh', 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: Rt,
          expiresInMins: 30, 
        })
    })
    .then((res) =>(res.json()));
    if (refreshResponse) {
        const currentUser = getAuthUser();
        if (currentUser) {
            currentUser.accessToken = refreshResponse.accessToken;
            currentUser.refreshToken = refreshResponse.refreshToken;
            setAuthUser(currentUser);
        }
    }
}

export const getAuthData = async <T,> (endpoint:string, searchParams: string) => {
    try {
        const responseObj = await getAll<T>(endpoint, searchParams);
        return responseObj as T;
    } catch {
        try {
            await refreshTokens();
            const responseObj = await getAll<T>(endpoint, searchParams);
            return responseObj as T;
        } catch {
            return null;
        }
    }
}