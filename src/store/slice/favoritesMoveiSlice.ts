import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FavoritesInitialStateType, MovieShortInformationType } from '../../types';

export const initialStateFavoritesMovie: FavoritesInitialStateType = {
  favoritesMovies: [
    { Title: '', Year: '', imdbID: '', Type: '', Poster: '', Response: '' },
  ],
  favoritesMoviesObj: {},
};

export const favoritesMovieSlice = createSlice({
  name: 'favoritesMovieSlice',
  initialState: initialStateFavoritesMovie,
  reducers: {
    addFavoritesMovie: (state, action: PayloadAction<MovieShortInformationType>) => {
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

    removeALLFavoritesMovies: () => initialStateFavoritesMovie,
  },
});

export const { addFavoritesMovie, removeFavoritesMovie, removeALLFavoritesMovies } =
  favoritesMovieSlice.actions;
