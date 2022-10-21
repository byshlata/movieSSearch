import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppInitialStateType, Nullable } from '../../types';

export const initialState: AppInitialStateType = {
  errorMessage: '',
  isTheme: true,
};

export const initialStateApp = initialState;

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    occurredError: (state, action: PayloadAction<Nullable<string>>) => {
      state.errorMessage = action.payload;
    },
    changeTheme: state => {
      state.isTheme = !state.isTheme;
    },
  },
});

export const { occurredError, changeTheme } = appSlice.actions;
