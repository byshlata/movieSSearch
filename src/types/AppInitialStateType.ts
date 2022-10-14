import { ProgressOption } from 'enum';
import { Nullable } from 'types/Nullable';

export type AppInitialStateType = {
  errorMessage: Nullable<string>;
  isProgress: ProgressOption;
  isTheme: boolean;
};
