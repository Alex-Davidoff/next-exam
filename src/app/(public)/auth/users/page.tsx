'use client';

import MenuComponent from "@/components/MenuComponent/MenuComponent";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import UsersComponent from "@/components/Users/UsersComponent";
import { IUser, IUserResponse } from "@/models/IUser";
import { getAuthData } from "@/services/api.service";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UsersPage = () => {
    const sp = useSearchParams();

    const [usersResp, setUsersResp] = useState<IUserResponse>();

    let users: IUser[] = [];
    let usersCount: number = 0;
    let usersTotal:number = 0;
    if (usersResp) {
        users = usersResp.users;
        usersCount = users.length;
        usersTotal = usersResp.total;
    }

    useEffect(()=> {
        const loadData = async (tsp: ReadonlyURLSearchParams) => {
            const q: string = tsp.get('q') || '';
            let res: IUserResponse | null = {};
            if (q) {
                if (q.match(/[a-zA-Z]/g)) {
                    res = await getAuthData<IUserResponse>('/auth/users/search', tsp.toString())
                } else if (q.match(/[0-9]/g)) {
                    res = await getAuthData<IUserResponse>('/auth/users/filter?key=id&value='+q, '')
                }
            }
            else { res = await getAuthData<IUserResponse>('/auth/users', tsp.toString())}
            if (res) {
                setUsersResp(res);
            }
        }
        loadData(sp);
    },[sp]);

    if (usersResp) {
    return(
        <div className="page_users">
            <MenuComponent/>
            <SearchComponent/>
            <UsersComponent users={users}/>
            <PaginationComponent arrayCount={usersCount} arrayTotal={usersTotal}/>
        </div>
        )}
}

export default UsersPage;