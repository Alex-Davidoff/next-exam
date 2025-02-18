import Link from "next/link";
import React from "react";
import { IUser } from "../../models/IUser";

interface IUsersProps {
    users: IUser[]
}

const UsersComponent = ({users}: IUsersProps) => {
    if (users) {
    return(
        <div className="component_users">
            <ul>
            {users.map((user) => (
                    <li className="border border-emerald-800 rounded-sm mb-0.5 pl-4" key={user.id}>
                        <Link href={`/auth/users/${user.id}`}>{user.firstName} {user.lastName} ({user.username})</Link>
                    </li>
            ))}
            </ul>
        </div>
    )}
};

export default UsersComponent;