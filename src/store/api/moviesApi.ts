import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { MoviePageType, MovieTitleRequestType } from 'types';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: builder => ({
    getMovies: builder.query<MoviePageType, MovieTitleRequestType>({
      query: ({ title, pageNumber }) => `?apikey=53188de0&s=${title}&page=${pageNumber}`,
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
