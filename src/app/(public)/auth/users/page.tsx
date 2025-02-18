import UsersComponent from "@/components/Users/UsersComponent";
import { getAll } from "@/services/api.service";

const UsersPage = async () => {

    const usersResp = await getAll('/users', '', '')

    console.log(usersResp);
    const {users} = usersResp;

    return(
        <div className="page_users">
            
            <UsersComponent users={users}/>
        </div>
        )
}

export default UsersPage;