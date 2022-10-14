import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { MovieAllInformationType } from 'types';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: builder => ({
    getMovieById: builder.query<MovieAllInformationType, string>({
      query: id => `?apikey=53188de0&i=${id}`,
    }),
  }),
});

export const { useGetMovieByIdQuery } = movieApi;
