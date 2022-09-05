import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../../features/auth/authSlice"

// attach the accessToken to our request
const baseQuery = fetchBaseQuery({
    baseUrl: "https://ifeanyi-bank-backend.glitch.me/", // back-end url
    // baseUrl: "https://ifeanyi-bank-backend.herokuapp.com", // back-end url
    credentials: "include", // send cookie with every request
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token // get accessToken from state
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})



// this will retry the request if the accessToken expires.
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        console.log(`sending refresh Token`);
        // send refreshToken to get a new accessToken
        const refreshResult = await baseQuery("/refresh", api, extraOptions);

        if (refreshResult?.data) {
            // get the username from state
            const user = api.getState().auth.user;
            // store the new accessToken 
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            // retry the original query with the new access Token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    // if everything goes well
    return result;
}



// we create our Api
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Account", "History"],
    endpoints: builder => ({})
})