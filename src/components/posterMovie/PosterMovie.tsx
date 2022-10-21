import React, { ReactElement, SyntheticEvent } from 'react';

import Fab from '@material-ui/core/Fab/Fab';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import s from './PosterMovie.module.sass';

import { DefaultSrc } from 'enum';
import { useAppDispatch } from 'hooks';
import { addFavoritesMovie, removeFavoritesMovie } from 'store';
import { MovieShortInformationType } from 'types';
import { isImageFit } from 'utils';

type PosterFilmType = {
  informationMovieLight: MovieShortInformationType;
  OnOffProgress: (value: boolean) => void;
  changeInformationByFilm: () => void;
  isFavorite: boolean;
};
const INDEX_HEIGHT_WIDTH = 50;

export const PosterMovie = ({
  OnOffProgress,
  informationMovieLight,
  changeInformationByFilm,
  isFavorite,
}: PosterFilmType): ReactElement => {
  const dispatch = useAppDispatch();

  const defaultSrc = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    e.currentTarget.src = DefaultSrc.src;
  };

  const onLoadSrc = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    if (isImageFit(e.currentTarget.height, e.currentTarget.width, INDEX_HEIGHT_WIDTH)) {
      defaultSrc(e);
    }
  };

  const addFilmFavorites = (): void => {
    if (isFavorite) {
      dispatch(removeFavoritesMovie(informationMovieLight.imdbID));
    } else {
      dispatch(addFavoritesMovie(informationMovieLight));
    }
  };

  const onClickHandle = (): void => {
    OnOffProgress(true);
    changeInformationByFilm();
  };

  return (
    <div className={s.posterMovieWrapper}>
      <img
        className={s.posterImg}
        src={informationMovieLight.Poster}
        onError={defaultSrc}
        alt="Poster"
        onLoad={onLoadSrc}
      />
      <div className={s.buttonBlock}>
        {isFavorite ? (
          <Fab color="primary" aria-label="add" size="small" onClick={addFilmFavorites}>
            <CheckIcon />
          </Fab>
        ) : (
          <Fab color="secondary" aria-label="add" size="small" onClick={addFilmFavorites}>
            <AddIcon />
          </Fab>
        )}
        <Fab color="secondary" aria-label="add" size="small" onClick={onClickHandle}>
          <LiveHelpIcon />
        </Fab>
      </div>

      <span className={s.posterMovieTitle}>{informationMovieLight.Title}</span>
    </div>
  );
};
