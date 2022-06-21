import React, { ReactElement } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'hooks';
import { errorMessage, occurredError } from 'store';

const Alert = (props: AlertProps): ReactElement => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} variant="filled" {...props} />
);

export const ErrorSnackbar = (): ReactElement => {
  const error = useSelector(errorMessage);

  const dispatch = useAppDispatch();

  const isOpen = error !== null;

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(occurredError(null));
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};
