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
              expiresInMins: 2, 
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

export const getAll =  async(endpoint:string, searchParams: string) => {
    let sp = '';
    if (searchParams) {sp = '?'+searchParams};
    try {
    console.log('try fetch ', endpoint, searchParams);
    console.log('token ', getAToken());
    const response = await fetch(APIBaseUrl+endpoint+sp,
        {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+getAToken(), 
            },
            next: {revalidate: 60}
        })
        .then(res => res.json());
        console.log('fetch result ', response);
        if (!response?.message) {
            return response;
        }
    } catch {
        return null;
    }    
    
}

const refreshTokens = async (): Promise<void> =>{
    const Rt = getRToken();
    const refreshResponse: ITokensPair = await fetch(APIBaseUrl+'/auth/refresh', 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: Rt,
          expiresInMins: 2, 
        })
    })
    .then((res) =>(res.json()));
    if (refreshResponse) {
        let currentUser = getAuthUser();
        if (currentUser) {
            currentUser.accessToken = refreshResponse.accessToken;
            currentUser.refreshToken = refreshResponse.refreshToken;
            setAuthUser(currentUser);
        }
    }
}

export const getAuthData = async <T,> (endpoint:string, searchParams: string) => {
    try {
        const responseObj = await getAll(endpoint, searchParams);
        if (responseObj) {
            return responseObj as T;
        } else {
            await refreshTokens();
            const responseObj = await getAll(endpoint, searchParams);
            if (responseObj) {
                return responseObj as T;
            } else {
                return null;
            }
        }
    } catch {
        return null;
    }
}