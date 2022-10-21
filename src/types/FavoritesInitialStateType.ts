import { MovieShortInformationType } from 'types/MovieShortInformationType';

export type FavoritesInitialStateType = {
  favoritesMovies: MovieShortInformationType[];
  favoritesMoviesObj: { [key: string]: string };
};
