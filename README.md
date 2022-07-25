# Chima Ifeanyi ThankGod

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Project Set-up

The dependencies required are all included in the `package.json` file. They will all be installed by running the `npm install` command.

To start the project run `npm start`.

## What I learnt

While creating this project, I learnt a lot of new things. Which I would like to share.

### Rtk query transformResponse

I learnt how to use transformResponse in Rtk query, which is used to access nested properties in an object.

```javascript
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
            transformResponse: (response) => response.result, // response.some.deeply.nested.collection
        })
    })
})


export const {
    useGetHistoryQuery
} = historyApiSlice;

```

### useQuery Hook

I learnt how to pass in parameters to a useQuery hook in rtk query.


```javascript

const id = "string-id";

    const {
        data: history,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetHistoryQuery({ id });

```

