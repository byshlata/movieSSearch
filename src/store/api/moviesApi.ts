import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/react';

import { AppRootStore } from 'store/store';
import {
  FavoriteMovieType,
  MoviePageType,
  MovieTitleRequestType,
  PageInitialStateType,
} from 'types';
import { createMetaResponseMovies } from 'utils';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
});

type MetaType = {
  changeResponse: FavoriteMovieType[];
};

const moviesBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  MetaType & FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const store = api.getState() as AppRootStore;
  const favoriteMovie = store.favoritesMovie.favoritesMoviesObj;

  const results = await baseQuery(args, api, extraOptions);

  const MovieResponse = results.data as MoviePageType;

  const meta = createMetaResponseMovies(MovieResponse, favoriteMovie);

  return { ...results, meta: results.meta && { ...results.meta, changeResponse: meta } };
};

//
// const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: '' },
//   ): BaseQueryFn<
//     {
//       url: string;
//       method: AxiosRequestConfig['method'];
//       data?: AxiosRequestConfig['data'];
//       params?: AxiosRequestConfig['params'];
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axios({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//       });
//       const dataResponse = result.data as MoviePageType;
//       if (dataResponse.Response === 'True') {
//         return { data: result.data, meta:  };
//       }
//       return {
//         error: {
//           status: 404,
//           data: dataResponse.Error,
//         },
//       };
//     } catch (axiosError) {
//       const err = axiosError as AxiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: moviesBaseQuery,
  endpoints: builder => ({
    getMovies: builder.query<PageInitialStateType, MovieTitleRequestType>({
      query: ({ title, pageNumber }) => `?apikey=53188de0&s=${title}&page=${pageNumber}`,
      transformResponse: (returnValue: MoviePageType, meta) => {
        if (meta) {
          return {
            error: returnValue.Error,
            search: meta.changeResponse,
            totalResults: JSON.parse(returnValue.totalResults),
          };
        }
        return {
          error: '',
          search: [],
          totalResults: 0,
        };
      },
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
