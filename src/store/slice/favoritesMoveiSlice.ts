import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FavoriteMovieType, FavoritesInitialStateType } from '../../types';

export const initialState: FavoritesInitialStateType = {
  favoritesMovies: [
    { title: '', year: '', imdbID: '', type: '', poster: '', isFavorites: false },
  ],
  favoritesMoviesObj: {},
};

export const initialStateFavoritesMovie = initialState;

export const favoritesMovieSlice = createSlice({
  name: 'favoritesMovieSlice',
  initialState,
  reducers: {
    addFavoritesMovie: (state, action: PayloadAction<FavoriteMovieType>) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!state.favoritesMoviesObj.hasOwnProperty(action.payload.imdbID)) {
        state.favoritesMovies.push(action.payload);
        state.favoritesMoviesObj[action.payload.imdbID] = '';
      }
    },

    removeFavoritesMovie: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.favoritesMoviesObj.hasOwnProperty(action.payload)) {
        delete state.favoritesMoviesObj[action.payload];
      }
      state.favoritesMovies = state.favoritesMovies.filter(
        film => film.imdbID !== action.payload,
      );
    },

    removeALLFavoritesMovies: state => {
      state.favoritesMovies = [
        { title: '', year: '', imdbID: '', type: '', poster: '', isFavorites: false },
      ];
      state.favoritesMoviesObj = {};
    },
  },
});

export const { addFavoritesMovie, removeFavoritesMovie, removeALLFavoritesMovies } =
  favoritesMovieSlice.actions;
