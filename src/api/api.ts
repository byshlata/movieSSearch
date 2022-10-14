import { API_CONFIG } from './config';

import { MovieAllInformationType, MoviePageType, MovieTitleRequestType } from 'types';

export const Api = {
  searchFilmsByTitle: async (value: MovieTitleRequestType) => {
    const res = await API_CONFIG.get<MoviePageType>(
      `?apikey=53188de0&s=${value.title}&page=${value.pageNumber}`,
    );
    return res.data;
  },

  searchFilmByIMBbID: async (IMBbID: string) => {
    const res = await API_CONFIG.get<MovieAllInformationType>(
      `?apikey=53188de0&i=${IMBbID}`,
    );
    return res.data;
  },
};
