import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { retrieveAllCinema } from './endpoints'

export const BASE_URL : string = 'http://localhost:8080/'

export const cinemaApi = createApi({
    reducerPath: 'cinemaApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: () => ({})
}).injectEndpoints({
    endpoints: (builder) => ({
        retrieveAllCinema : retrieveAllCinema(builder)
    })
})

export const { useRetrieveAllCinemaQuery } = cinemaApi