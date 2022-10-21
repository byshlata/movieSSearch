import React, { ReactElement, useEffect, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { ErrorType } from 'types';

const Alert = (props: AlertProps): ReactElement => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} variant="filled" {...props} />
);

type ErrorSnackbarType = {
  error: ErrorType;
};

export const ErrorSnackbar = ({ error }: ErrorSnackbarType): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isOpen = !!errorMessage;

  useEffect(() => {
    if (error) {
      if (typeof error === 'string') {
        setErrorMessage(error);
      } else {
        setErrorMessage('Error. Try again');
      }
    } else {
      setErrorMessage('');
    }
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage('');
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
