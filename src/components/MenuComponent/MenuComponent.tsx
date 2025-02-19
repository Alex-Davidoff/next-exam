'use client';

import { ILoginResponse } from "@/models/IAPIReqRes";
import { getAuthUser } from "@/services/cookies";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MenuComponent = () => {
    const [aUser, setAUser] = useState<ILoginResponse>();

    useEffect(() => {
        setAUser(getAuthUser());
    },[]);

    if (aUser) {
        return(
        <div className="component_menu mb-1 flex justify-between items-center bg-sky-50">
            <ul className="flex gap-4 pl-4">
                <li className="underline border border-orange-600 rounded-sm px-4"><Link href='/main'>Main</Link></li>
                <li className="underline border border-orange-600 rounded-sm px-4"><Link href='/auth/users'>Users</Link></li>
                <li className="underline border border-orange-600 rounded-sm px-4"><Link href='/auth/recipes'>Recipes</Link></li>
            </ul>
            <div className="flex gap-4 items-center">
                <p className="text-xl italic">{aUser.firstName} {aUser.lastName}</p>
                <Image src={aUser.image} alt={`${aUser.firstName} ${aUser.lastName}`} width={48} height={48}/>
            </div>
            
        </div>
        )
    } else {
        return(
            <div className="component_menu flex gap-4">
                <p className="pl-4">user not authorized</p>
                <span className="underline border border-orange-600 rounded-sm px-4"><Link href='/auth'>log in</Link></span>
            </div>
            )        
    }
};

export default MenuComponent;