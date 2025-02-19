import { ILoginResponse } from "@/models/IAPIReqRes";
import { getCookie } from "cookies-next/client";
import { setCookie } from "cookies-next/client";

export const setAuthUser = (authUserData: ILoginResponse) => {
    if (authUserData) {
        setCookie('authUser', JSON.stringify(authUserData))
    }
}

export const getAuthUser = () => {
    const authUserData = getCookie('authUser')?.toString();
    if (authUserData) {
        return JSON.parse(authUserData) as ILoginResponse;
    }
}

export const getAToken = () => {
    const authUserData = getCookie('authUser')?.toString();
    if (authUserData) {
        const {accessToken} = JSON.parse(authUserData);
        return accessToken;
    }
}