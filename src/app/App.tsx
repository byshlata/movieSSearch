import React, { ReactElement } from 'react';

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
import { useAppDispatch } from 'hooks';
import {
  changeParams,
  selectorIsThemeIndex,
  selectorPageNumber,
  selectorTitle,
} from 'store';

export const App = (): ReactElement => {
  const pageNumber = useSelector(selectorPageNumber);
  const title = useSelector(selectorTitle);
  const isTheme = useSelector(selectorIsThemeIndex);

  const dispatch = useAppDispatch();

  const { movies, isButtonNext, errorMessage, isLoading } = useNextPage({
    pageNumber,
    title,
  });

  const onClickHandler = (): void => {
    dispatch(changeParams({ pageNumber: pageNumber + 1, title }));
  };

  const visibleDownButton = isButtonNext
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
            <TableMovies movies={movies} />
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
          <ErrorSnackbar error={errorMessage} />
        </Container>
      </ThemeProvider>
    </div>
  );
};
