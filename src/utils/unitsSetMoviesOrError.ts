import { Dispatch } from 'redux';

import { PageOptions } from 'enum';
import { AppRootStore } from 'store';
import { occurredError } from 'store/slice/appSlice';
import {
  addPage,
  addSearchResult,
  setResults,
  subtractResults,
} from 'store/slice/pageSlice';
import { FavoriteMovieType, MovieShortInformationType } from 'types';
import { MoviePageType } from 'types/MoviePageType';

export const setWellResponse = (
  res: MoviePageType,
  state: AppRootStore,
  dispatch: Dispatch,
): void => {
  const { pageNumber } = state.pageNumber;
  const favoritesFilmsObj = state.favoritesMovie.favoritesMoviesObj;
  const { Search, totalResults } = res;

  const mySearchResponse = Search.map(
    ({ Title, Response, Type, Poster, Year, imdbID }: MovieShortInformationType) =>
      // eslint-disable-next-line no-prototype-builtins
      favoritesFilmsObj.hasOwnProperty(imdbID)
        ? ({
            title: Title,
            type: Type,
            response: Response,
            poster: Poster,
            year: Year,
            imdbID,
            isFavorites: true,
          } as FavoriteMovieType)
        : {
            title: Title,
            type: Type,
            response: Response,
            poster: Poster,
            year: Year,
            imdbID,
            isFavorites: false,
          },
  );

  dispatch(addSearchResult(mySearchResponse));

  if (
    pageNumber === PageOptions.startPageFound &&
    JSON.parse(totalResults) > PageOptions.NumberOfMoviesInTheRequest
  ) {
    dispatch(
      setResults(JSON.parse(totalResults) - PageOptions.NumberOfMoviesInTheRequest),
    );
  }
  if (JSON.parse(totalResults) > PageOptions.STOP_SEARCH) {
    dispatch(subtractResults());
    dispatch(addPage());
  }
};

export const setBadResponse = (
  res: MoviePageType,
  state: AppRootStore,
  dispatch: Dispatch,
): void => {
  const { Error } = res;
  const { pageNumber } = state.pageNumber;
  if (Error && pageNumber !== PageOptions.startPageFound) {
    dispatch(occurredError("It's all results"));
  } else {
    dispatch(occurredError(Error));
  }
};
