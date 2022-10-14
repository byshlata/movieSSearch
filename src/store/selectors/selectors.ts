import { ProgressOption } from 'enum';
import { AppRootStore } from 'store';
import { FavoriteMovieType, Nullable } from 'types';

export const resultsMovie = (state: AppRootStore): number =>
  state.pageNumber.totalResults;

export const titleSearch = (state: AppRootStore): string => state.pageNumber.titleSearch;

export const isThemeIndex = (state: AppRootStore): boolean => state.app.isTheme;

export const errorMessage = (state: AppRootStore): Nullable<string> =>
  state.app.errorMessage;

export const errorResponse = (state: AppRootStore): string =>
  state.pageNumber.errorResponse;

export const pageNumberNow = (state: AppRootStore): number => state.pageNumber.pageNumber;

export const searchResult = (state: AppRootStore): FavoriteMovieType[] =>
  state.pageNumber.searchResult;

export const myFavoritesMovies = (state: AppRootStore): FavoriteMovieType[] =>
  state.favoritesMovie.favoritesMovies;

export const progress = (state: AppRootStore): ProgressOption => state.app.isProgress;
