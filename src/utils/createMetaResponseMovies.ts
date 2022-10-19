import { FavoriteMovieType, MoviePageType, MovieShortInformationType } from 'types';

export const createMetaResponseMovies = (
  response: MoviePageType,
  favoriteMovie: {},
): FavoriteMovieType[] => {
  const mySearchResponse = response.Search.map(
    ({ Title, Response, Type, Poster, Year, imdbID }: MovieShortInformationType) =>
      Object.getOwnPropertyDescriptor(favoriteMovie, imdbID)
        ? {
            title: Title,
            type: Type,
            response: Response,
            poster: Poster,
            year: Year,
            imdbID,
            isFavorites: true,
          }
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
  return mySearchResponse;
};
