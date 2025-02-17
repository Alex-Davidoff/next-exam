'use client';

import { getAll } from "@/services/api.service";
import { getAToken, getUsersRespFromCook } from "@/services/cookies";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const UsersPage = () => {
    const usersResponse = getUsersRespFromCook();
    const [searchParams, setSearchParams] = useSearchParams({skip:'0', limit: '30'});

    console.log('usersResponse', usersResponse);

    useEffect(() => {
        getAll('/auth/users', searchParams.toString(), getAToken());
    },[searchParams]);

    return(
        <>Page - users</>
        )
}

export default UsersPage;