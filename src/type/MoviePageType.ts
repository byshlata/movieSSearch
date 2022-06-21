import { MovieShortInformationType } from 'type';

export type MoviePageType = {
  Search: MovieShortInformationType[];
  totalResults: string;
  Response: string;
  Error: string;
};
