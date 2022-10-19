import React, { ReactElement, useEffect, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { UndefinedType } from '../../types';

import { useAppDispatch } from 'hooks';
import { occurredError } from 'store';

const Alert = (props: AlertProps): ReactElement => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} variant="filled" {...props} />
);

type ErrorSnackbarType = {
  error: string | undefined;
};

export const ErrorSnackbar = ({ error }: ErrorSnackbarType): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<UndefinedType<string>>(error);

  const isOpen = errorMessage !== undefined;

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage(undefined);
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};
