import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Api } from 'api';
import { AppRootStore } from 'store';
import { occurredError } from 'store/slice/appSlice';
import { MovieTitleRequestType } from 'type';
import { setBadResponse, setWellResponse } from 'units/unitsSetMoviesOrError';

export const getMovies = createAsyncThunk(
  'pageSlice/getMovies',
  async (value: MovieTitleRequestType, { dispatch, getState }) => {
    try {
      const res = await Api.searchFilmsByTitle({ ...value });

      const state = getState() as AppRootStore;

      if (res.Response === 'True') {
        setWellResponse(res, state, dispatch);
      } else {
        setBadResponse(res, state, dispatch);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(occurredError(e.message));
      }
    }
  },
);
