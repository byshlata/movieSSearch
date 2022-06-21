import { ProgressOption } from 'enum';
import { initialStateFavoritesMovie } from 'store';
import { AppInitialStateType, FavoritesInitialStateType } from 'type';

export const loadStateFavoritesMovie = (): FavoritesInitialStateType | undefined => {
  try {
    const favoritesMovies = localStorage.getItem('favoritesMoviesState');
    if (favoritesMovies === null) {
      return undefined;
    }
    return {
      favoritesMovies: JSON.parse(favoritesMovies),
      favoritesMoviesObj: initialStateFavoritesMovie.favoritesMoviesObj,
    };
  } catch (err) {
    throw new Error('Error save to Local Storage');
  }
};

export const loadStateTheme = (): AppInitialStateType | undefined => {
  try {
    const isTheme = localStorage.getItem('themeSave');
    if (isTheme === null) {
      return undefined;
    }
    return {
      errorMessage: '',
      isProgress: ProgressOption.off,
      isTheme: JSON.parse(isTheme),
    };
  } catch (err) {
    throw new Error('Error save to Local Storage');
  }
};

export const saveState = (state: {
  favoritesFilms: FavoritesInitialStateType;
  theme: boolean;
}): void => {
  try {
    localStorage.setItem('favoritesFilmsState', JSON.stringify(state.favoritesFilms));
    localStorage.setItem('themeSave', JSON.stringify(state.theme));
  } catch {
    throw new Error('Error save to Local Storage');
  }
};
