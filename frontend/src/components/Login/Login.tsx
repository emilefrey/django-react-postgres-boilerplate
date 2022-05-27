import React, { useEffect } from 'react'
import { useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import genericLogo from '../../generic_logo.png'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ValidationMessages from '../../helpers/ValidationMessages'
import { Grid, LinearProgress, Link } from '@material-ui/core';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/auth/authThunks'
import { ForgotPassword } from './ForgotPassword'
import { motion, useAnimation } from "framer-motion";
import { useStyles } from './styles'
import { APP_NAME } from '../../settings';

export function Login(props: RouteComponentProps<{}, any, { from: string }>) {
  const classes = useStyles();
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [imageStatus, setImageStatus] = useState<"loading" | "ready">("loading")

  const logoAnimation = useAnimation()
  const formAnimation = useAnimation()

  useEffect(() => {
    if (imageStatus === "ready") {
      logoAnimation.start(input => ({
        opacity: 1,
        transition: {
          ease: "easeIn",
        }
      }))
      formAnimation.start(input => ({
        opacity: 1,
        y: -18,
      }))
    }
  }, [imageStatus])


  const dispatch = useAppDispatch()
  const { authenticated } = useAppSelector(state => state.auth)

  const { from } = props.location.state || { from: { pathname: "/" } };

  if (authenticated) {
    return (
      <Redirect to={from} />
    )
  }

  const handleFormFieldChange = (event: React.ChangeEvent<HTMLInputElement>): any => {
    switch (event.target.id) {
      case 'username': setuserName(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      default: return null;
    }
    setValidationErrors({})
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    dispatch(login({ username: username, password: password }))
      .unwrap()
      .catch(errorData => {
        if (typeof (errorData) === "object") {
          setValidationErrors(errorData)
        } else {
          setValidationErrors({ "unknown": ["There was an unknown error"] })
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div style={{ paddingTop: '10vh' }}>
      <motion.div initial={{ opacity: 0 }} animate={logoAnimation} style={{ width: "100%", textAlign: "center" }}>
        <img height="auto" width="10%" src={genericLogo} alt="Image not Found" onLoad={() => setImageStatus("ready")} onError={() => setImageStatus("ready")} />
        <Typography variant='h4' color='textSecondary'>{APP_NAME}</Typography>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={formAnimation}>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {passwordReset ? "Reset Password" : "Sign in"}
            </Typography>
            {passwordReset ? <ForgotPassword /> :
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={handleFormFieldChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleFormFieldChange}
                />
                <ValidationMessages validationErrors={validationErrors} />
                {isLoading && <LinearProgress color="secondary" />}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  <Typography variant='subtitle2'>
                    Sign In
                  </Typography>
                </Button>
              </form>
            }
            <Grid container justify="center">
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Link onClick={() => setPasswordReset(!passwordReset)} style={{ cursor: "pointer" }}>
                    <Typography>{passwordReset ? 'Back to Login' : 'Forgot password?'}</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Container>
      </motion.div>
    </div>
  )
}
