import { useEffect, useState } from 'react';

import { useGetMoviesQuery } from '../store/api/moviesApi';

import { MoviePageType, MovieTitleRequestType, UndefinedType } from 'types';

type UseNextPageType = {
  data: UndefinedType<MoviePageType>;
  error: unknown;
  isLoading: boolean;
};

type ErrorType = {
  error: {
    status: number;
    data: string;
  };
};

export const useNextPage = ({
  pageNumber,
  title,
}: MovieTitleRequestType): UseNextPageType => {
  const [skip, setSkip] = useState<boolean>(true);
  const [params, setParams] = useState<MovieTitleRequestType>({ title, pageNumber });

  useEffect(() => {
    if (title) {
      setSkip(false);
      setParams({ pageNumber, title });
    } else {
      setSkip(true);
    }
  }, [title, pageNumber]);

  const { data, error, isLoading } = useGetMoviesQuery(
    {
      pageNumber: params.pageNumber,
      title: params.title,
    },
    {
      skip,
    },
  );

  const errorMessage = error as UndefinedType<ErrorType>;

  return {
    data,
    error,
    isLoading,
  };
};
