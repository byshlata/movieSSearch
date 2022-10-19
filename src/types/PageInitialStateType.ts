import { FavoriteMovieType } from 'types/FavoriteMovieType';

export type PageInitialStateType = {
  error: string;
  search: FavoriteMovieType[];
  totalResults: number;
};
