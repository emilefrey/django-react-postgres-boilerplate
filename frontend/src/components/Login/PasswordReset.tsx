import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';

import axios from 'axios';
import { Redirect } from 'react-router';
import { Grid, Typography } from '@material-ui/core';
import useQuery from '../../helpers/useQuery'
import { useStyles } from './styles'
import ValidationMessages from '../../helpers/ValidationMessages'
import { APP_NAME } from '../../settings';

export const PasswordReset = () => {

  let query = useQuery()
  const token = query.get("token")
  const [tokenInvalid, setTokenInvalid] = useState<Boolean | null>(null);

  useEffect(() => {
    axios.post(`/api/password_reset/validate_token/`, { token: token })
      .then((response: any) => {
        if (response.status === 200) {
          setTokenInvalid(false)
        }
      })
      .catch((error: any) => {
        if (error.response) {
          setTokenInvalid(true)
        }
      })
  }, [token])

  return tokenInvalid ? <Redirect from='/' to='/login' /> : <PasswordResetForm token={token} />
}

interface PasswordResetFormProps {
  token: string | null
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = (props: PasswordResetFormProps) => {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      axios.post(`/api/password_reset/confirm/`, { password: password, token: props.token })
        .then((response: any) => {
          if (response.status === 200) {
            setSubmitted(true)
          }
        })
        .catch((error: any) => {
          if (error.response) {
            if (error.response.data)
              setValidationErrors(error.response.data)
          }
        }
        )
    } else {
      setValidationErrors({ "error": ["Passwords do not match!"] })
    }
  }

  const handleFormFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors({})
    switch (event.target.id) {
      case 'new-password': setPassword(event.target.value); break;
      case 'confirm-password': setPasswordConfirmation(event.target.value); break;
      default: return null;
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Typography className={classes.title} align="center" variant="h2" color="textPrimary">{APP_NAME}</Typography>
      <form onSubmit={handleSubmit}>
        {!submitted &&
          <>
            <FormHelperText
              id="email-helper-text"
              className={classes.helper}
            >
              Please enter a new password.
            </FormHelperText>
            <TextField
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="new-password"
              label="New Password"
              name="new-password"
              type="password"
              autoComplete="off"
              autoFocus
              onChange={handleFormFieldChange}
            />
            <TextField
              margin="normal"
              variant="outlined"
              required
              fullWidth
              name="confirm-password"
              label="Confirm New Password"
              type="password"
              id="confirm-password"
              autoComplete="off"
              onChange={handleFormFieldChange}
            />
          </>}
        <ValidationMessages validationErrors={validationErrors} />
        {!submitted &&
          <Button
            id="login-submit-button"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>}
      </form>
      {submitted &&
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Link href="/login/" color="primary">
                Success! Back to Login
              </Link>
            </Grid>
          </Grid>
        </Grid>
      }
    </Container>
  )
}

export default PasswordReset