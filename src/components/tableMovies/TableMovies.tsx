import React from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import { useSelector } from 'react-redux';

import { MovieCard } from 'components';
import { searchResult } from 'store';

export const TableMovies = React.memo(() => {
  const search = useSelector(searchResult);

  return (
    <Grid container item spacing={1} justifyContent="center" style={{ margin: 0 }}>
      {search.map(m => (
        <MovieCard key={m.imdbID} movieInformation={m} />
      ))}
    </Grid>
  );
});
