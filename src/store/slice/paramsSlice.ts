import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MovieSearchParamsType } from '../../types';

export const initialState: MovieSearchParamsType = {
  title: '',
  pageNumber: 1,
};

export const paramsSlice = createSlice({
  name: 'pageSlice',
  initialState,
  reducers: {
    changeParams: (state, action: PayloadAction<MovieSearchParamsType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeParams: () => initialState,
  },
});

export const { changeParams, removeParams } = paramsSlice.actions;