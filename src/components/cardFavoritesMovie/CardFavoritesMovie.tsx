import React, { ReactElement } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';

import s from './CardFavoritesMovie.module.sass';

import { FavoriteCartMassage } from 'enum';
import { removeALLFavoritesMovies } from 'store';

type CardFavoritesMovieType = {
  title: string | undefined;
};

export const CardFavoritesMovie = ({ title }: CardFavoritesMovieType): ReactElement => {
  const dispatch = useDispatch();

  const deleteFavoritesFilHeader = (): void => {
    if (title === FavoriteCartMassage.deleteAll) {
      dispatch(removeALLFavoritesMovies());
    }
  };

  return (
    <Paper
      className={s.cardFavoritesFilmWrapper}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      elevation={3}
    >
      <Typography className={s.cardFavoritesTitle}>{title}</Typography>
      {title !== FavoriteCartMassage.notFavoriteMovies ? (
        <IconButton
          className={s.cardFavoritesDeleteButton}
          size="small"
          onClick={deleteFavoritesFilHeader}
        >
          <DeleteIcon />
        </IconButton>
      ) : null}
    </Paper>
  );
};
