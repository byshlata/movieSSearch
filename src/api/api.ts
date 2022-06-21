import { API_CONFIG } from './config';

import { MovieAllInformationType, MoviePageType, MovieTitleRequestType } from 'type';

export const Api = {
  searchFilmsByTitle: async (value: MovieTitleRequestType) => {
    const res = await API_CONFIG.get<MoviePageType>(
      `${process.env.REACT_APP_API_KEY}&s=${value.title}&page=${value.pageNumber}`,
    );
    return res.data;
  },

  searchFilmByIMBbID: async (IMBbID: string) => {
    const res = await API_CONFIG.get<MovieAllInformationType>(
      `${process.env.REACT_APP_API_KEY}&i=${IMBbID}`,
    );
    return res.data;
  },
};
