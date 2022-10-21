export const isFavorite = (imdbID: string, favoriteMovie: {}): boolean =>
  !!Object.getOwnPropertyDescriptor(favoriteMovie, imdbID);
