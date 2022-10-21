import React, { SyntheticEvent } from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import s from './MyAccordion.module.sass';

import { InformationTextLine } from 'components';
import { DefaultSrc } from 'enum';
import { useAppDispatch } from 'hooks';
import { removeFavoritesMovie } from 'store';
import { MovieShortInformationType } from 'types';
import { isImageFit } from 'utils';

type MyAccordionType = {
  favoritesMovie: MovieShortInformationType;
};

const INDEX_HEIGHT_WIDTH = 5;

export const MyAccordion = React.memo(({ favoritesMovie }: MyAccordionType) => {
  const dispatch = useAppDispatch();

  const descriptionMovieInformation = [
    { title: `Type: `, value: favoritesMovie.Type },
    { title: `Year: `, value: favoritesMovie.Year },
  ];

  const defaultSrc = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    e.currentTarget.src = DefaultSrc.src;
  };

  const onLoadSrc = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    if (isImageFit(e.currentTarget.height, e.currentTarget.width, INDEX_HEIGHT_WIDTH)) {
      defaultSrc(e);
    }
  };

  const deleteFavoritesFilHeader = (): void => {
    dispatch(removeFavoritesMovie(favoritesMovie.imdbID));
  };

  return (
    <Accordion
      className={s.accordionWrapper}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{favoritesMovie.Title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={s.accordionPoster}>
          <img
            className={s.posterImg}
            src={favoritesMovie.Poster}
            onLoad={onLoadSrc}
            onError={defaultSrc}
            alt="Poster"
          />
          <div className={s.accordionInformationMovie}>
            {descriptionMovieInformation.map(({ title, value }) => (
              <InformationTextLine key={title} title={title} value={value} />
            ))}
            <IconButton
              className={s.deleteButton}
              size="small"
              onClick={deleteFavoritesFilHeader}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
});
