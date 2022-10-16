import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box/Box';
import Fab from '@material-ui/core/Fab/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Rating from '@material-ui/lab/Rating';

import s from './MovieInformation.module.sass';

import { InformationTextLine } from 'components';
import { MovieAllInformationType } from 'types';

type MovieInformationType = {
  changeInformationByMovie: () => void;
  movieResult: MovieAllInformationType | undefined;
};

export const MovieInformation = ({
  changeInformationByMovie,
  movieResult,
}: MovieInformationType): ReactElement => {
  const onClickHandle = (): void => {
    changeInformationByMovie();
  };

  const descriptionMovieInformation = movieResult && [
    { title: `Genre: `, value: movieResult.Genre },
    { title: `Director: `, value: movieResult.Director },
    { title: `Actors: `, value: movieResult.Actors },
    { title: `Plot films: `, value: movieResult.Plot },
    { title: `Year: `, value: movieResult.Year },
  ];

  return (
    <div className={s.movieInformationWrapper}>
      <div className={s.movieDescriptionWrapper}>
        {descriptionMovieInformation?.map(({ title, value }) => (
          <InformationTextLine key={title} title={title} value={value} />
        ))}
      </div>
      <Fab color="secondary" aria-label="add" size="small" onClick={onClickHandle}>
        <ArrowBackIcon />
      </Fab>
      <Box
        className={s.descriptionMovieRating}
        style={{ marginBottom: '0' }}
        component="fieldset"
        mb={3}
        borderColor="transparent"
      >
        <Rating
          name="customized-10"
          disabled
          defaultValue={movieResult && +movieResult.imdbRating}
          max={10}
        />
      </Box>
    </div>
  );
};
