import { FavoriteMovieType } from 'types/FavoriteMovieType';

export type PageInitialStateType = {
  errorResponse: string;
  pageNumber: number;
  searchResult: FavoriteMovieType[];
  totalResults: number;
};
