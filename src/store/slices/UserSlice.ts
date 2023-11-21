import { createSlice } from "@reduxjs/toolkit"
import { UserData } from "../../interfaces/Interfaces"

interface UserSliceState {
    userData: UserData | null;
}

const initialState: UserSliceState = {
    userData: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        clearUserData: (state) => {
            state.userData = null;
        },
    },
})

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;