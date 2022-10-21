export { store } from './store';

export type { AppRootStore, AppDispatch } from './store';

export { occurredError, changeTheme, initialStateApp } from './slice/appSlice';

export {
  addFavoritesMovie,
  removeFavoritesMovie,
  removeALLFavoritesMovies,
  initialStateFavoritesMovie,
} from './slice/favoritesMoveiSlice';

export {
  selectorFavoritesMoviesObj,
  selectorFavoritesMoviesArray,
} from './selectors/seloctorsFavoriteMovie';

export { selectorPageNumber, selectorTitle } from './selectors/seloctorsParams';

export {
  selectorErrorMessageOther,
  selectorIsThemeIndex,
} from './selectors/seloctorsApp';

export { changeParams, removeParams } from './slice/paramsSlice';

export { useGetMovieByIdQuery } from './api/movieApi';
