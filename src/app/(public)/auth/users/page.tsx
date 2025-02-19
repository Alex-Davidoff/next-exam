import MenuComponent from "@/components/MenuComponent/MenuComponent";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import UsersContent from "@/components/Users/UsersContent";
import { Suspense } from "react";

const UsersPage = () => {
    return(
        <div className="page_users">
            <MenuComponent/>
            <SearchComponent/>
            <Suspense fallback={<div>Loading ...</div>}>
                <UsersContent/>
            </Suspense>
        </div>
        )
}

export default UsersPage;