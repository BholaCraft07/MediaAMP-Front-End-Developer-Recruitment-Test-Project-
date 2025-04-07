import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const YOUR_API_KEY = import.meta.env.VITE_YOUR_API_KEY;
export const gameApi = createApi({
    reducerPath: 'game',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.rawg.io/api/',
    }),
    endpoints: (builder) => ({
        getAllGames: builder.query({
            query: ({ page = 1, page_size = 12, search = '' }) => ({
                url: `games`,
                params: {
                    key: YOUR_API_KEY,
                    page,
                    page_size,
                    search
                }
            }),
            // transformResponse: (data) => data?.results,
            transformResponse: (response) => ({
                results: response?.results,
                count: response?.count
            })
        }),
        getGameById: builder.query({
            query: (id) => ({
                url: `games/${id}?key=${YOUR_API_KEY}`,
            }),
            transformResponse: (data) => data, 
        }),
    })
})

export const { useGetAllGamesQuery, useGetGameByIdQuery } = gameApi;


