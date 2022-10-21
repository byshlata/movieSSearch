import { AppRootStore } from 'store/store';
import { MovieShortInformationType } from 'types';

export const selectorFavoritesMoviesArray = (
  state: AppRootStore,
): MovieShortInformationType[] => state.favoritesMovie.favoritesMovies;

export const selectorFavoritesMoviesObj = (state: AppRootStore): {} =>
  state.favoritesMovie.favoritesMoviesObj;
