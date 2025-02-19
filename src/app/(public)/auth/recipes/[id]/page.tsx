'use client';

import { RecipeComponent } from "@/components/RecipesComponents/RecipeComponent";
import { IRecipe } from "@/models/IRecipe";
import { getAuthData } from "@/services/api.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RecipePage = () => {
    const {id} = useParams();

    const [recipe, setRecipe] = useState<IRecipe>();

    useEffect(()=> {
            const loadData = async () => {
                const trecipe = await getAuthData<IRecipe>('/auth/recipes/'+id, '');
                if (trecipe) {setRecipe(trecipe)}
            };
            loadData();
        },[id]);


    if (recipe) {
        return(
            <div className="page_user">
                <RecipeComponent recipe={recipe}/>
            </div>
        )}
}

export default RecipePage;