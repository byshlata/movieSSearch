import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PageOptions } from '../../enum';
import { FavoriteMovieType, PageInitialStateType } from '../../types';

import { favoritesMovieSlice } from './favoritesMoveiSlice';

export const initialState: PageInitialStateType = {
  errorResponse: '',
  titleSearch: '',
  pageNumber: PageOptions.startPageFound,
  searchResult: [],
  totalResults: PageOptions.startTotal,
};

export const pageSlice = createSlice({
  name: 'pageSlice',
  initialState,
  reducers: {
    addPage: state => {
      state.pageNumber += PageOptions.NEXT_PAGE;
    },

    addSearchResult: (state, action) => {
      state.searchResult = [...state.searchResult, ...action.payload];
    },

    removePage: state => {
      state.pageNumber = PageOptions.NUMBER_START_PAGE;
    },

    removeSearch: state => {
      state.searchResult = [];
    },

    setResults: (state, action: PayloadAction<number>) => {
      state.totalResults = action.payload;
    },

    removeResults: state => {
      state.totalResults = PageOptions.STOP_SEARCH;
    },

    subtractResults: state => {
      state.totalResults -= PageOptions.NumberOfMoviesInTheRequest;
    },

    searchTitle: (state, action: PayloadAction<string>) => {
      state.titleSearch = action.payload;
    },
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

export const {
  addPage,
  addSearchResult,
  removeSearch,
  removePage,
  searchTitle,
  removeResults,
  setResults,
  subtractResults,
} = pageSlice.actions;
