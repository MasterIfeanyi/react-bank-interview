import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    }
})


// export the reducer methods
export const { setCredentials, logOut } = authSlice.actions


// export the reducer
export default authSlice.reducer


// create selectors for properties that are in state
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token