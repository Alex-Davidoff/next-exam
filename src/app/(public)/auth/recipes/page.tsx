import MenuComponent from "@/components/MenuComponent/MenuComponent";
import RecipesContent from "@/components/RecipesComponents/RecipesContent";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { Suspense } from "react";

const RecipesPage = () => {
        return(
            <div className="page_users">
                <MenuComponent/>
                <SearchComponent/>
                <Suspense fallback={<div>Loading ...</div>}>
                    <RecipesContent/>
                </Suspense>
            </div>
            )
}

export default RecipesPage;