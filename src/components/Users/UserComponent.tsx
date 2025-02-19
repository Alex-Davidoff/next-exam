import { IUser } from "@/models/IUser";
import Image from "next/image";

interface IUserProps {
    user: IUser
}

const UserComponent = ({user}: IUserProps) => {
    return(
        <div className="component_user">
            <h2 className="italic text-2xl">{user.firstName} {user.lastName}</h2>
            <p>({user.username})</p>
            <Image src={user.image} alt={`${user.firstName} ${user.lastName}`} width={160} height={160}/>
            <h2>{user.age} {user.gender} {user.birthDate}</h2>
            <p>{user.phone}</p>
        </div>
    )
} 

export default UserComponent;