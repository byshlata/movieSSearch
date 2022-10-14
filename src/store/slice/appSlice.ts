import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProgressOption } from '../../enum';
import { AppInitialStateType, Nullable } from '../../types';

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
    // builder.addMatcher(movieApi.endpoints.getMovieById.matchPending, state => {
    //   state.isProgress = ProgressOption.on;
    // });
    // builder.addMatcher(movieApi.endpoints.getMovieById.matchFulfilled, state => {
    //   state.isProgress = ProgressOption.off;
    // });
    // builder.addMatcher(movieApi.endpoints.getMovieById.matchRejected, state => {
    //   state.isProgress = ProgressOption.off;
    // });
  },
});

export const { occurredError, changeTheme } = appSlice.actions;
