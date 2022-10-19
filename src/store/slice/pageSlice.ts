import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PageOptions } from '../../enum';
import { FavoriteMovieType, PageInitialStateType } from '../../types';

import { favoritesMovieSlice } from './favoritesMoveiSlice';

export const initialState: PageInitialStateType = {
  errorResponse: '',
  pageNumber: 1,
  searchResult: [],
  totalResults: PageOptions.startTotal,
};

export const pageSlice = createSlice({
  name: 'pageSlice',
  initialState,
  reducers: {
    addSearchResult: (state, action) => {
      state.searchResult = [...state.searchResult, ...action.payload];
    },
    removeSearchResult: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(
      favoritesMovieSlice.actions.addFavoritesMovie,
      (state, action: PayloadAction<FavoriteMovieType>) => {
        state.searchResult = state.searchResult.map(m =>
          m.imdbID === action.payload.imdbID ? { ...m, isFavorites: !m.isFavorites } : m,
        );
      },
    );

    builder.addCase(
      favoritesMovieSlice.actions.removeFavoritesMovie,
      (state, action: PayloadAction<string>) => {
        state.searchResult = state.searchResult.map(m =>
          m.imdbID === action.payload ? { ...m, isFavorites: !m.isFavorites } : m,
        );
      },
    );

    builder.addCase(favoritesMovieSlice.actions.removeALLFavoritesMovies, state => {
      state.searchResult = state.searchResult.map(m => ({ ...m, isFavorites: false }));
    });
  },
});

export const { addSearchResult, removeSearchResult } = pageSlice.actions;
