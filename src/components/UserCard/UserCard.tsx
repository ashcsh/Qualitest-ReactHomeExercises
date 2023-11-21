import { User } from "../../interfaces/Interfaces"
import { FC } from "react"

interface Props {
    user: User;
}

export const UserCard: FC<Props> = ({ user }) => {
    return (
        <>
            <img src={user.photoUrl} alt={`${user.firstName}'s avatar`} style={{ borderRadius: "100px", marginTop: "50px" }} />
            <h3>{user.firstName}</h3>
            <h3>{user.lastName}</h3>
        </>
    )
}
