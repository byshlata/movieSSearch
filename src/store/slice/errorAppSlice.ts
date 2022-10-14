import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ErrorInitialStateType } from '../../types';

const initialState: ErrorInitialStateType = {
  message: '',
};

export const errorAppSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    occurredError: (state, action: PayloadAction<ErrorInitialStateType>) =>
      action.payload,
  },
});

export const { occurredError } = errorAppSlice.actions;
