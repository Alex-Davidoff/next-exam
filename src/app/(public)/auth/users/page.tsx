'use client';

import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import UsersComponent from "@/components/Users/UsersComponent";
import { IUser, IUserResponse } from "@/models/IUser";
import { getAll } from "@/services/api.service";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UsersPage = () => {
    const sp = useSearchParams();

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
        const loadData = async (tsp: ReadonlyURLSearchParams) => {
            const q: string = tsp.get('q') || '';
            let res: IUserResponse = {};
            if (q) { res = await getAll<IUserResponse>('/users/search', tsp.toString(), '')}
             else { res = await getAll<IUserResponse>('/users', tsp.toString(), '')}
            setUsersResp(res);
        }
        loadData(sp);
    },[sp]);

    if (usersResp) {
    return(
        <div className="page_users">
            <SearchComponent/>
            <UsersComponent users={users}/>
            <PaginationComponent arrayCount={usersCount} arrayTotal={usersTotal}/>
        </div>
        )}
}

export default UsersPage;