import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

import s from './InputWrapper.module.sass';

import { useAppDispatch } from 'hooks';
import {
  getMovies,
  occurredError,
  pageNumberNow,
  removePage,
  removeResults,
  removeSearch,
  searchTitle,
  titleSearch,
} from 'store';

export const InputWrapper = React.memo(() => {
  const pageNumber = useSelector(pageNumberNow);
  const title = useSelector(titleSearch);

  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);

  const rx = /^[а-яё]+$/i;

  const inputText = error ? 'Title not correct' : 'Title film...';

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(removeSearch());
    dispatch(removePage());
    dispatch(removeResults());
    dispatch(searchTitle(event.currentTarget.value));
    dispatch(occurredError(null));
    setError(false);
  };

  const onClickHandle = (): void => {
    if (rx.test(title)) {
      dispatch(occurredError('Search is English only'));
    } else if (title.trim()) {
      dispatch(getMovies({ pageNumber, title }));
    } else {
      setError(true);
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
          value={title}
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
