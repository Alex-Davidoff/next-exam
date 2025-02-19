'use client';

import UsersComponent from "@/components/Users/UsersComponent";
import { IUser, IUserResponse } from "@/models/IUser";
import { getAll } from "@/services/api.service";
import { useEffect, useState } from "react";

const UsersPage = () => {

    const [usersResp, setUsersResp] = useState<IUserResponse>();

    console.log(usersResp);
    let users: IUser[] = [];
    if (usersResp) {
        users = usersResp.users;
    }

    useEffect(()=> {
        const loadData = async () => {
            const res = await getAll<IUserResponse>('/users', '', '');
            setUsersResp(res);
        }
        loadData();
    },[]);

    if (usersResp) {
    return(
        <div className="page_users">
            
            <UsersComponent users={users}/>
        </div>
        )}
}

export default UsersPage;