'use client';

import MenuComponent from "@/components/MenuComponent/MenuComponent";
import RecipesComponent from "@/components/RecipesComponents/RecipesComponent";
import UserComponent from "@/components/Users/UserComponent";
import { IRecipe, IRecipesResponse } from "@/models/IRecipe";
import { IUser } from "@/models/IUser";
import { getAuthData } from "@/services/api.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
    const {id} = useParams();
    const router = useRouter();

    const [user, setUser] = useState<IUser>();
    const [userRecipes, setUserRecipes] = useState<IRecipe[]>();

    console.log(userRecipes);

    useEffect(()=> {
        const loadData = async () => {
            const tuser = await getAuthData<IUser>('/auth/users/'+id, '');
            if (tuser) {
                setUser(tuser)
            } else {
                router.push('/main');
            }
            const tUserRecipes = await getAuthData<IRecipesResponse>('/auth/recipes','limit=0&skip=0');
            if (tUserRecipes) {
                const {recipes} = tUserRecipes;
                const frecipes = recipes.filter(recipe => recipe.userId===Number(id));
                setUserRecipes(frecipes);
            }
        };
        loadData();
    },[id, router]);

    

    if (user) {
    return(
        <div className="page_user">
            <MenuComponent/>
            <UserComponent user={user}/>
            {userRecipes && <RecipesComponent recipes={userRecipes}/>}            
        </div>
    )}
}

export default UserPage;