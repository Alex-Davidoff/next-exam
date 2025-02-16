import { ILoginResponse, IUserLoginPass } from "@/models/IAPIReqRes";

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