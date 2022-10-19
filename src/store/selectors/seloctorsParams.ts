import { AppRootStore } from 'store';

export const selectorTitle = (state: AppRootStore): string => state.params.title;

export const selectorPageNumber = (state: AppRootStore): number =>
  state.params.pageNumber;
