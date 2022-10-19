import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

import s from './InputWrapper.module.sass';

import { PageOptions } from 'enum';
import { useAppDispatch } from 'hooks';
import { getMovies, removeSearchResult, selectorPageNumber, selectorTitle } from 'store';

const RX = /^[а-яё]+$/i;

export const InputWrapper = React.memo(() => {
  const pageNumber = useSelector(selectorPageNumber);
  const title = useSelector(selectorTitle);

  const dispatch = useAppDispatch();

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const inputText = error ? 'Title not correct' : 'Title film...';

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value);
    removeSearchResult();
    setError(false);
    setErrorMessage('');
  };

  const onClickHandle = (): void => {
    if (RX.test(title)) {
      setErrorMessage('Search is English only');
    } else if (title.trim()) {
      dispatch(getMovies({ pageNumber: PageOptions.startPageFound, title: inputValue }));
    } else {
      setError(true);
    }
    setInputValue('');
  };

  const onKeyPressSearchFilmHandler = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      onClickHandle();
    }
  };

  return (
    <Grid container item justifyContent="center" alignItems="center" spacing={1} xs={12}>
      <Grid item>
        <TextField
          className={s.input}
          onChange={onChangeHandle}
          value={inputValue}
          onKeyPress={onKeyPressSearchFilmHandler}
          color="secondary"
          label={inputText}
          variant="outlined"
          size="small"
          error={error}
        />
      </Grid>
      <Grid item>
        <Button
          style={{ padding: '8px' }}
          size="large"
          color="secondary"
          onClick={onClickHandle}
          variant="contained"
          startIcon={<SearchIcon />}
        />
      </Grid>
    </Grid>
  );
});
