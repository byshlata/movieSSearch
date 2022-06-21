import React, { ReactElement } from 'react';

import s from './InformationTextLine.module.sass';

type InformationTextLineType = {
  title: string;
  value: string;
};

export const InformationTextLine = ({
  title,
  value,
}: InformationTextLineType): ReactElement => (
  <div className={s.descriptionMovieText}>
    <span className={s.descriptionMovieTitle}>{title}</span>
    {value}
  </div>
);
