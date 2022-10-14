import { FavoriteMovieType } from 'types/FavoriteMovieType';

export type FavoritesInitialStateType = {
  favoritesMovies: FavoriteMovieType[];
  favoritesMoviesObj: { [key: string]: string };
};
