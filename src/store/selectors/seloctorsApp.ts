import { Nullable } from '../../types';

import { AppRootStore } from 'store';

export const selectorIsThemeIndex = (state: AppRootStore): boolean => state.app.isTheme;

export const selectorErrorMessageOther = (state: AppRootStore): Nullable<string> =>
  state.app.errorMessage;
