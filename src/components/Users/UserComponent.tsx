import { IUser } from "@/models/IUser";

interface IUserProps {
    user: IUser
}

const UserComponent = ({user}: IUserProps) => {
    return(
        <div className="component_user">
            <h2 className="italic text-2xl">{user.firstName} {user.lastName}</h2>
            <p>({user.username})</p>
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <h2>{user.age} {user.gender} {user.birthDate}</h2>
            <p>{user.phone}</p>
        </div>
    )
} 

export default UserComponent;