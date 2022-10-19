import React, { ReactElement, useEffect } from 'react';

import { ThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

import { useNextPage } from '../hooks/useNextPage';

import s from './App.module.sass';
import { themeDark, themeLight } from './createThemeMUI/createThemeMUI';

import { ErrorSnackbar, PrimarySearchAppBar, TableMovies } from 'components';
import { PageOptions } from 'enum';
import { useAppDispatch } from 'hooks';
import {
  getMovies,
  isThemeIndex,
  pageNumberNow,
  resultsMovie,
  selectorErrorMessageOther,
  titleSearch,
} from 'store';

const INITIAL_TITLE_FIRST = 'Batman';
const INITIAL_TITLE_SECOND = 'Star wars';

export const App = (): ReactElement => {
  const totalResults = useSelector(resultsMovie);
  const pageNumber = useSelector(pageNumberNow);
  const title = useSelector(titleSearch);
  const isTheme = useSelector(isThemeIndex);

  const errorMessageOther = useSelector(selectorErrorMessageOther);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getMovies({ pageNumber: PageOptions.startPageFound, title: INITIAL_TITLE_FIRST }),
    );
    dispatch(
      getMovies({ pageNumber: PageOptions.startPageFound, title: INITIAL_TITLE_SECOND }),
    );
  }, []);

  const { data, error, isLoading } = useNextPage({ pageNumber, title });

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
        <PrimarySearchAppBar isLoading={isLoading} />
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
          <ErrorSnackbar error={error?.data || errorMessageOther} />
        </Container>
      </ThemeProvider>
    </div>
  );
};
