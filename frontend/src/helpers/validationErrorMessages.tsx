import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';

const validationErrorMessages = (validationErrors: string[]) =>
  validationErrors.map((value, index) =>
    <MuiAlert key={index} elevation={6} variant="filled" severity="warning" id="Validation-Message">{value}</MuiAlert>
  );

export default validationErrorMessages