import { AppDispatch } from "../store/store";
import { setUserData } from "../store/slices/UserSlice";

export default async function fetchUsers(input: number, dispatch: AppDispatch) {
    try {
        const res = await fetch(`https://randomuser.me/api/?results=${input}`)
        const data = await res.json()
        const users = data.results.map((user: any) => ({
            gender: user.gender,
            firstName: user.name.first,
            lastName: user.name.last,
            photoUrl: user.picture.large,
        }))
        dispatch(setUserData({ data: users }))

    } catch (error) {
        throw error;
    }
}