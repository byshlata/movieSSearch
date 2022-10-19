import { configureStore } from '@reduxjs/toolkit';

import { movieApi } from './api/movieApi';
import { moviesApi } from './api/moviesApi';
import { paramsSlice } from './slice/paramsSlice';

import { appSlice } from 'store/slice/appSlice';
import { favoritesMovieSlice } from 'store/slice/favoritesMoveiSlice';
import { pageSlice } from 'store/slice/pageSlice';
import {
  loadStateFavoritesMovie,
  loadStateTheme,
  saveState,
} from 'utils/localStorageHelper';

export const store = configureStore({
  reducer: {
    pageNumber: pageSlice.reducer,
    params: paramsSlice.reducer,
    favoritesMovie: favoritesMovieSlice.reducer,
    app: appSlice.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  preloadedState: {
    app: loadStateTheme(),
    favoritesMovie: loadStateFavoritesMovie(),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(movieApi.middleware).concat(moviesApi.middleware),
});

export type AppRootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveState({
    favoritesFilms: store.getState().favoritesMovie,
    theme: store.getState().app.isTheme,
  });
});
