import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import s from './InputWrapper.module.sass';

import { PageOptions } from 'enum';
import { useAppDispatch } from 'hooks';
import { changeParams } from 'store';

const RX = /^[a-zA-Z]+$/;

export const InputWrapper = React.memo(() => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const inputText = error ? errorMessage : 'Title film...';

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value);
    setError(false);
    setErrorMessage('');
  };

  const onClickHandle = (): void => {
    if (RX.test(inputValue) && inputValue.trim()) {
      dispatch(
        changeParams({ pageNumber: PageOptions.startPageFound, title: inputValue }),
      );
    }
    if (inputValue.trim() === '') {
      setError(true);
      setErrorMessage('Error');
    }
    if (!RX.test(inputValue)) {
      setError(true);
      setErrorMessage('English only');
    }
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
