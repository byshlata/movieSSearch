export { store } from './store';

export type { AppRootStore, AppDispatch } from './store';

export { occurredError, changeTheme, initialStateApp } from './slice/appSlice';

export { addSearchResult, removeSearchResult } from './slice/pageSlice';

export {
  addFavoritesMovie,
  removeFavoritesMovie,
  removeALLFavoritesMovies,
  initialStateFavoritesMovie,
} from './slice/favoritesMoveiSlice';

export { getMovies } from './thunk/pageThunk';

export {
  titleSearch,
  searchResult,
  errorResponse,
  resultsMovie,
  pageNumberNow,
  myFavoritesMovies,
  progress,
} from './selectors/selectors';

export {
  selectorErrorMessageOther,
  selectorIsThemeIndex,
} from './selectors/seloctorsApp';

export { changeParams, removeParams } from './slice/paramsSlice';

export { useGetMovieByIdQuery } from './api/movieApi';
