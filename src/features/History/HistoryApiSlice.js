import { apiSlice } from "../../app/api/apiSlice";

export const historyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHistory: builder.query({
            query: credentials => ({
                url: `/history/${credentials.id}`,
                method: "GET"
            }),
            providesTags: ["History"],
            keepUnusedDataFor: 1,
            transformResponse: (response) => response.result,
        })
    })
})


export const {
    useGetHistoryQuery
} = historyApiSlice;