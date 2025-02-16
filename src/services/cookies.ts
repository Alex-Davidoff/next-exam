import { ILoginResponse } from "@/models/IAPIReqRes";
import { getCookie } from "cookies-next/client";
import { setCookie } from "cookies-next/client";

export const setAuthUser = (authUserData: ILoginResponse) => {
    console.log("set authUserData", authUserData);
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