import { apiSlice } from "../app/api/apiSlice";


export const logOutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET"
            }),
        })
    })
})


export const {
    useLogoutMutation
} = logOutApiSlice