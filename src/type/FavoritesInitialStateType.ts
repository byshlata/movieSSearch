import { FavoriteMovieType } from 'type/FavoriteMovieType';

export type FavoritesInitialStateType = {
  favoritesMovies: FavoriteMovieType[];
  favoritesMoviesObj: { [key: string]: string };
};
