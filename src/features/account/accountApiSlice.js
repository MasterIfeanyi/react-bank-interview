import { apiSlice } from "../../app/api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAccounts: builder.query({
            query: () => "/account",
            providesTags: ["Account"],
            keepUnusedDataFor: 1
        }),
        createAccount: builder.mutation({
            query: credentials => ({
                url: "/account",
                method: "POST",
                body: {...credentials}
            }),
            invalidatesTags: ["Account"]
        }),
        deposit: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/account/deposit/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["Account"]
        }),
        withdraw: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/account/withdraw/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["Account"]
        })
    })
})


export const {
    useGetAccountsQuery,
    useCreateAccountMutation,
    useDepositMutation,
    useWithdrawMutation
} = accountApiSlice