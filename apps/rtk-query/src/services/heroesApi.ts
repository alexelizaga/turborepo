// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import { HeroType } from '../interfaces';

// Define a service using a base URL and expected endpoints
export const heroesApi = createApi({
  reducerPath: 'heroesApi',
  baseQuery: retry(fetchBaseQuery({ baseUrl: 'https://api.com/' }), {
    maxRetries: 2, // número de intentos
  }),
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({
    getHeroes: builder.query<HeroType[], void>({
      query: () => `heroes`,
      // keepUnusedDataFor: 60,
      extraOptions: { maxRetries: 3 },
      providesTags: ["Heroes"]
    }),
    getHeroById: builder.query<HeroType, number>({
      query: (id) => `hero/${id}`
    }),
    addNewHero: builder.mutation({
      query: (newHero) => ({
        url: "/hero",
        method: "post",
        body: newHero
      }),
      invalidatesTags: ["Heroes"],
      extraOptions: { maxRetries: 0 }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHeroesQuery,
  useLazyGetHeroesQuery,
  useGetHeroByIdQuery,
  useLazyGetHeroByIdQuery,
  useAddNewHeroMutation
} = heroesApi