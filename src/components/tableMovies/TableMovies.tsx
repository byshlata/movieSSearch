import React from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import { useSelector } from 'react-redux';

import { MovieCard } from 'components';
import { searchResult } from 'store';

export const TableMovies = React.memo(() => {
  const search = useSelector(searchResult);

  return (
    <Grid
      container
      item
      justifyContent="center"
      alignItems="center"
      spacing={2}
      xs={12}
      style={{ margin: 0 }}
    >
      {search.map(m => (
        <MovieCard key={m.imdbID} movieInformation={m} />
      ))}
    </Grid>
  );
});
