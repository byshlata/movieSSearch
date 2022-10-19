import { ProgressOption } from 'enum';
import { AppRootStore } from 'store';
import { FavoriteMovieType } from 'types';

export const resultsMovie = (state: AppRootStore): number =>
  state.pageNumber.totalResults;

export const searchResult = (state: AppRootStore): FavoriteMovieType[] =>
  state.pageNumber.searchResult;

export const myFavoritesMovies = (state: AppRootStore): FavoriteMovieType[] =>
  state.favoritesMovie.favoritesMovies;

export const progress = (state: AppRootStore): ProgressOption => state.app.isProgress;
