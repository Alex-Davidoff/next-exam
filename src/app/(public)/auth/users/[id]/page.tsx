'use client';

import UserComponent from "@/components/Users/UserComponent";
import { IUser } from "@/models/IUser";
import { getAuthData } from "@/services/api.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
    const {id} = useParams();

    const [user, setUser] = useState<IUser>();

    useEffect(()=> {
        const loadData = async () => {
            const tuser = await getAuthData<IUser>('/auth/users/'+id, '');
            if (tuser) {setUser(tuser)}
        };
        loadData();
    },[id]);

    

    if (user) {
    return(
        <div className="page_user">
            <UserComponent user={user}/>
        </div>
    )}
}

export default UserPage;