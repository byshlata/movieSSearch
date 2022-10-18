import React, { ReactElement, useEffect, useState } from 'react';

import { ThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

import s from './App.module.sass';
import { themeDark, themeLight } from './createThemeMUI/createThemeMUI';

import { ErrorSnackbar, PrimarySearchAppBar, TableMovies } from 'components';
import { PageOptions } from 'enum';
import { useAppDispatch } from 'hooks';
import { getMovies, isThemeIndex, pageNumberNow, resultsMovie, titleSearch } from 'store';
import { useGetMoviesQuery } from 'store/api/moviesApi';
import { MoviePageType } from 'types';

const INITIAL_TITLE_FIRST = 'Batman';
const INITIAL_TITLE_SECOND = 'Star wars';
const MOVIE_ONE_RESPONSE = 10;

export const App = (): ReactElement => {
  const totalResults = useSelector(resultsMovie);
  const pageNumber = useSelector(pageNumberNow);
  const title = useSelector(titleSearch);
  const isTheme = useSelector(isThemeIndex);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getMovies({ pageNumber: PageOptions.startPageFound, title: INITIAL_TITLE_FIRST }),
    );
    dispatch(
      getMovies({ pageNumber: PageOptions.startPageFound, title: INITIAL_TITLE_SECOND }),
    );
  }, []);

  const [skip, setSkip] = useState<boolean>(false);
  const [movies, setMovies] = useState<MoviePageType>({
    Search: [],
    Error: '',
    totalResults: '1000',
    Response: '',
  });

  const { data, error, isLoading, refetch } = useGetMoviesQuery(
    { pageNumber: 1000, title: 'Batman' },
    {
      skip,
    },
  );

  useEffect(() => {
    if (data?.totalResults && +data.totalResults > pageNumber * MOVIE_ONE_RESPONSE) {
      // setMovies(movies.Search = [...movies.Search, ...data.Search]);
    } else if ('page' > 1) {
      setSkip(true);
    }
  }, [data]);

  console.log(data);

  const onClickHandler = (): void => {
    dispatch(getMovies({ pageNumber, title }));
  };

  const visibleDownButton =
    totalResults > PageOptions.startTotal && title
      ? `${s.downButtonVisible}`
      : `${s.downButtonHidden}`;

  const backgroundColorBody = isTheme
    ? themeDark.palette.primary.light
    : themeDark.palette.primary.dark;

  return (
    <div
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: backgroundColorBody,
      }}
    >
      <ThemeProvider theme={isTheme ? themeLight : themeDark}>
        <PrimarySearchAppBar />
        <Container>
          <Grid container spacing={3} className={s.gridWrapper}>
            <TableMovies />
            <Button
              onClick={onClickHandler}
              color="primary"
              variant="contained"
              startIcon={<SearchIcon />}
              className={visibleDownButton}
              style={{ marginBottom: '15px' }}
            >
              Search
            </Button>
          </Grid>
          {error && <ErrorSnackbar />}
        </Container>
      </ThemeProvider>
    </div>
  );
};
