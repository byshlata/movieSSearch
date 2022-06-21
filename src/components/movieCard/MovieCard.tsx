import React, { useEffect, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';

import s from './MovieCard.module.sass';

import { Api } from 'api';
import { MovieInformation, PosterMovie } from 'components';
import { MovieResultType, FavoriteMovieType, MovieAllInformationType } from 'type';

type MovieCardType = {
  movieInformation: FavoriteMovieType;
};

export const MovieCard: React.FC<MovieCardType> = React.memo(props => {
  const { title, poster, imdbID, year, type, isFavorites } = props.movieInformation;

  const [movieInformation, setMovieInformation] = useState<MovieResultType | null>(null);
  const [isGetInformation, setIsGetInformation] = useState<boolean>(false);
  const [isProgress, setIsProgress] = useState<boolean>(false);

  useEffect(() => {
    if (isGetInformation && movieInformation === null) {
      setIsProgress(true);
      Api.searchFilmByIMBbID(imdbID)
        .then(data => {
          const { Response, Plot, Year, Runtime, Genre, Director, Actors, imdbRating } =
            data as MovieAllInformationType;
          if (Response === 'True') {
            const movieRating = Math.trunc(parseInt(imdbRating, 10));
            setMovieInformation({
              plot: Plot,
              year: Year,
              runtime: Runtime,
              genre: Genre,
              director: Director,
              actors: Actors,
              movieRating,
            });
          } else {
            setMovieInformation(null);
          }
        })
        .catch(() => setMovieInformation(null))
        .finally(() => setIsProgress(false));
    }
  }, [isGetInformation, movieInformation]);

  const onClickHandle = (): void => {
    setIsGetInformation(!isGetInformation);
  };

  const informationMovieLight = { title, year, imdbID, type, poster, isFavorites };

  return (
    <Grid className={s.movieCardWrapper} item xs={12} sm={6} md={4} lg={3}>
      <Paper className={s.movieCardItem} elevation={5}>
        {isGetInformation && movieInformation !== null ? (
          <MovieInformation
            changeInformationByMovie={onClickHandle}
            movieResult={movieInformation}
          />
        ) : (
          <PosterMovie
            informationMovieLight={informationMovieLight}
            OnOffProgress={setIsGetInformation}
            changeInformationByFilm={onClickHandle}
          />
        )}
      </Paper>
      {isProgress ? <CircularProgress className={s.progress} color="secondary" /> : null}
    </Grid>
  );
});
