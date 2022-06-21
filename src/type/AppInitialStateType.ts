import { ProgressOption } from 'enum';
import { Nullable } from 'type/Nullable';

export type AppInitialStateType = {
  errorMessage: Nullable<string>;
  isProgress: ProgressOption;
  isTheme: boolean;
};
