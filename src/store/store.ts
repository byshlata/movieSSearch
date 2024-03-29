import { configureStore } from '@reduxjs/toolkit';

import {
  loadStateFavoritesMovie,
  loadStateTheme,
  saveState,
} from '../units/unitsLocalStorage';

import { movieApi } from './api/movieApi';

import { appSlice } from 'store/slice/appSlice';
import { favoritesMovieSlice } from 'store/slice/favoritesMoveiSlice';
import { pageSlice } from 'store/slice/pageSlice';

export const store = configureStore({
  reducer: {
    pageNumber: pageSlice.reducer,
    favoritesMovie: favoritesMovieSlice.reducer,
    app: appSlice.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  preloadedState: {
    app: loadStateTheme(),
    favoritesMovie: loadStateFavoritesMovie(),
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(movieApi.middleware),
});

export type AppRootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveState({
    favoritesFilms: store.getState().favoritesMovie,
    theme: store.getState().app.isTheme,
  });
});
