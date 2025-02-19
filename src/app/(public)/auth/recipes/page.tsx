'use client';

import MenuComponent from "@/components/MenuComponent/MenuComponent";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";
import RecipesComponent from "@/components/RecipesComponents/RecipesComponent";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { IRecipe, IRecipesResponse } from "@/models/IRecipe";
import { getAuthData } from "@/services/api.service";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const RecipesPage = () => {
    const sp = useSearchParams();
    const router = useRouter();

    const [recipesResp, setRecipesResp] = useState<IRecipesResponse>();

    let recipes: IRecipe[] = [];
    let recipesCount: number = 0;
    let recipesTotal: number = 0;
    if (recipesResp) {
        recipes = recipesResp.recipes;
        recipesCount = recipes.length;
        recipesTotal = recipesResp.total;
    }

    useEffect(()=> {
        const loadData = async (tsp: ReadonlyURLSearchParams) => {
            const q: string = tsp.get('q') || '';
            const tag: string = tsp.get('tag') || '';
            let res: IRecipesResponse | null = null;
            if (q) {
                if (q.match(/[a-zA-Z]/g)) {
                    res = await getAuthData<IRecipesResponse>('/auth/recipes/search', tsp.toString())
                } else if (q.match(/[0-9]/g)) {
                    res = await getAuthData<IRecipesResponse>('/auth/recipes/filter?key=id&value='+q, '')
                }
            }
            else if (tag) {
                res = await getAuthData<IRecipesResponse>('/auth/recipes/tag/'+tag, '')
            }
            else { res = await getAuthData<IRecipesResponse>('/auth/recipes', tsp.toString())}
            if (res) {
                setRecipesResp(res);
            } else {
                router.push('/main');
            }
        }
        loadData(sp);       
    },[router, sp]);    


    if (recipesResp) {
        return(
            <div className="page_users">
                <MenuComponent/>
                <Suspense>
                    <SearchComponent/>
                </Suspense>
                <RecipesComponent recipes={recipes}/>
                <PaginationComponent arrayCount={recipesCount} arrayTotal={recipesTotal}/>
            </div>
            )}
}

export default RecipesPage;