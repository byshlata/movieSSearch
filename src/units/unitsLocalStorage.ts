import { ProgressOption } from 'enum';
import { AppInitialStateType, FavoritesInitialStateType } from 'type';

export const loadStateFavoritesMovie = (): FavoritesInitialStateType | undefined => {
  try {
    const favoritesMovies = localStorage.getItem('favoritesMoviesState');
    if (favoritesMovies === null) {
      return undefined;
    }
    const favorites = JSON.parse(favoritesMovies) as FavoritesInitialStateType;
    return {
      favoritesMovies: favorites.favoritesMovies,
      favoritesMoviesObj: favorites.favoritesMoviesObj,
    };
  } catch (err) {
    throw new Error('Error get to Local Storage favorites movies state');
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
    localStorage.setItem('favoritesMoviesState', JSON.stringify(state.favoritesFilms));
    localStorage.setItem('themeSave', JSON.stringify(state.theme));
  } catch {
    throw new Error('Error save to Local Storage');
  }
};
