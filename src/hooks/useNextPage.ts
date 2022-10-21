import { useEffect, useLayoutEffect, useState } from 'react';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { useGetMoviesQuery } from '../store/api/moviesApi';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { changeParams } from 'store';
import { MovieShortInformationType, MovieTitleRequestType, UndefinedType } from 'types';

type UseNextPageType = {
  movies: MovieShortInformationType[];
  isButtonNext: boolean;
  errorMessage: string | FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
};

const NUMBER_MOVIES_ON_ONE_RESPONSE = 10;

export const useNextPage = ({
  pageNumber,
  title,
}: MovieTitleRequestType): UseNextPageType => {
  const dispatch = useAppDispatch();

  const [skip, setSkip] = useState<boolean>(true);
  const [isButtonNext, setIsButtonNext] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieShortInformationType[]>([]);
  const [errorMessage, setErrorMessage] = useState<UndefinedType<string>>();

  const { data, isError, isLoading } = useGetMoviesQuery(
    {
      pageNumber,
      title,
    },
    {
      skip,
    },
  );

  useLayoutEffect(() => {
    if (title) {
      dispatch(changeParams({ pageNumber: 1, title }));
      setSkip(false);
      setMovies([]);
    }
  }, [title]);

  useEffect(() => {
    if (title) {
      dispatch(changeParams({ pageNumber, title }));
    }
  }, [pageNumber]);

  useEffect(() => {
    if (data) {
      if (data.Response === 'False' && pageNumber === 1) {
        setSkip(true);
        setIsButtonNext(false);
        setErrorMessage(data.Error);
      }
      if (data.Response === 'False' && pageNumber !== 1) {
        setSkip(true);
        setIsButtonNext(false);
        setErrorMessage('');
      }
      if (data.Response === 'True') {
        setIsButtonNext(true);
        setMovies([...movies, ...data.Search]);
      }
    } else {
      setIsButtonNext(false);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setErrorMessage('Some error');
    }
  }, [isError]);

  return {
    movies,
    isButtonNext,
    errorMessage,
    isLoading,
  };
};
