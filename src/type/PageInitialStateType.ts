import { FavoriteMovieType } from 'type/FavoriteMovieType';

export type PageInitialStateType = {
  errorResponse: string;
  titleSearch: string;
  pageNumber: number;
  searchResult: FavoriteMovieType[];
  totalResults: number;
};
