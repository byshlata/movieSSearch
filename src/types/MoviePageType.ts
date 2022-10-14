import { MovieShortInformationType } from 'types';

export type MoviePageType = {
  Search: MovieShortInformationType[];
  totalResults: string;
  Response: string;
  Error: string;
};
