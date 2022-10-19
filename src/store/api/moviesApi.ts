import { BaseQueryFn, createApi } from '@reduxjs/toolkit/dist/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { MoviePageType, MovieTitleRequestType } from 'types';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      const dataResponse = result.data as MoviePageType;
      if (dataResponse.Response === 'True') {
        return { data: result.data };
      }
      return {
        error: {
          status: 404,
          data: dataResponse.Error,
        },
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL || '' }),
  endpoints: builder => ({
    getMovies: builder.query<MoviePageType, MovieTitleRequestType>({
      query: ({ title, pageNumber }) => ({
        url: `?apikey=53188de0&s=${title}&page=${pageNumber}`,
        method: 'get',
      }),
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
