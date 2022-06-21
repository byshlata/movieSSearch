import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProgressOption } from '../../enum';
import { AppInitialStateType, Nullable } from '../../type';
import { getMovies } from '../thunk/pageThunk';

export const initialState: AppInitialStateType = {
  errorMessage: '',
  isProgress: ProgressOption.off,
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
  extraReducers: builder => {
    builder.addCase(getMovies.pending, state => {
      state.isProgress = ProgressOption.on;
    });
    builder.addCase(getMovies.fulfilled, state => {
      state.isProgress = ProgressOption.off;
    });
    builder.addCase(getMovies.rejected, state => {
      state.isProgress = ProgressOption.off;
    });
  },
});

export const { occurredError, changeTheme } = appSlice.actions;
