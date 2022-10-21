import React from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import { useSelector } from 'react-redux';

import { MovieCard } from 'components';
import { selectorFavoritesMoviesObj } from 'store/selectors/seloctorsFavoriteMovie';
import { MovieShortInformationType, UndefinedType } from 'types';
import { isFavorite } from 'utils/isFavorite';

type TableMoviesType = {
  movies: UndefinedType<MovieShortInformationType[]>;
};

export const TableMovies = React.memo(({ movies }: TableMoviesType) => {
  const favoriteMovie = useSelector(selectorFavoritesMoviesObj);

  return (
    <Grid container item spacing={1} justifyContent="center" style={{ margin: 0 }}>
      {movies &&
        movies.map(element => {
          const favorite = isFavorite(element.imdbID, favoriteMovie);
          return (
            <MovieCard
              isFavorite={favorite}
              key={element.imdbID}
              movieInformation={element}
            />
          );
        })}
    </Grid>
  );
});
