'use client';

import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";
import UsersComponent from "@/components/Users/UsersComponent";
import { IUser, IUserResponse } from "@/models/IUser";
import { getAll } from "@/services/api.service";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UsersPage = () => {
    const sp = useSearchParams();
    const skip  = sp.get('skip') || '0';
    const limit  = sp.get('limit') || '30';
    


    const [usersResp, setUsersResp] = useState<IUserResponse>();

    console.log(usersResp);
    let users: IUser[] = [];
    let usersCount, usersTotal:number = 0;
    if (usersResp) {
        users = usersResp.users;
        usersCount = users.length;
        usersTotal = usersResp.total;
    }

    useEffect(()=> {
        const loadData = async (fskip: string, flimit: string) => {
            const tsp = new URLSearchParams();
            tsp.set('skip', fskip);
            tsp.set('limit', flimit);
            const res = await getAll<IUserResponse>('/users', tsp.toString(), '');
            setUsersResp(res);
        }
        loadData(skip, limit);
    },[limit, skip]);

    if (usersResp) {
    return(
        <div className="page_users">
            
            <UsersComponent users={users}/>
            <PaginationComponent arrayCount={usersCount} arrayTotal={usersTotal}/>
        </div>
        )}
}

export default UsersPage;