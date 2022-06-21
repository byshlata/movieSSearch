export { store } from './store';

export type { AppRootStore, AppDispatch } from './store';

export { occurredError, changeTheme, initialStateApp } from './slice/appSlice';

export {
  addPage,
  addSearchResult,
  removeSearch,
  removePage,
  searchTitle,
  removeResults,
  setResults,
  subtractResults,
} from './slice/pageSlice';

export {
  addFavoritesMovie,
  removeFavoritesMovie,
  removeALLFavoritesMovies,
  initialStateFavoritesMovie,
} from './slice/favoritesMoveiSlice';

export { getMovies } from './thunk/pageThunk';

export {
  errorMessage,
  titleSearch,
  searchResult,
  errorResponse,
  resultsMovie,
  isThemeIndex,
  pageNumberNow,
  myFavoritesMovies,
  progress,
} from './selectors/selectors';
