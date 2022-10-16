import React, { useEffect, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';

import s from './MovieCard.module.sass';

import { MovieInformation, PosterMovie } from 'components';
import { useAppDispatch } from 'hooks';
import { useGetMovieByIdQuery, occurredError } from 'store';
import { FavoriteMovieType } from 'types';

type MovieCardType = {
  movieInformation: FavoriteMovieType;
};

export const MovieCard = React.memo(({ movieInformation }: MovieCardType) => {
  const dispatch = useAppDispatch();

  const [skip, setSkip] = useState<boolean>(true);

  const { data, error, isLoading } = useGetMovieByIdQuery(movieInformation.imdbID, {
    skip,
  });

  useEffect(() => {
    if (error) {
      dispatch(occurredError(error.toString()));
    }
  }, [error]);

  const onClickHandle = (): void => {
    setSkip(!skip);
  };

  return (
    <Grid className={s.movieCardWrapper} item>
      <Paper className={s.movieCardItem} elevation={5}>
        {!skip && data !== null ? (
          <MovieInformation changeInformationByMovie={onClickHandle} movieResult={data} />
        ) : (
          <PosterMovie
            informationMovieLight={movieInformation}
            OnOffProgress={setSkip}
            changeInformationByFilm={onClickHandle}
          />
        )}
      </Paper>
      {isLoading ? <CircularProgress className={s.progress} color="secondary" /> : null}
    </Grid>
  );
});
