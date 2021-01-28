import React, { useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
import * as settings from '../settings';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, TextField } from '@material-ui/core';
import { AuthProps } from '../App';
import { APP_NAME } from '../settings'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "75%",
    marginTop: "4vh",
    marginBottom: "10vh",
    borderRadius: '6px',
    backgroundColor: theme.palette.action.disabledBackground,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2), paddingLeft: theme.spacing(4),
    color: theme.palette.primary.main,
    fontWeight: 700
  },
  textInput: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  textInputTop: {
    marginTop: theme.spacing(4),
  }
}));


function Home(props: AuthProps) {

  const [name, setName] = useState("")
  const [helloName, setHelloName] = useState("")
  const classes = useStyles()

  const handleSubmit = (event: any) => {
    let data = { "name": name }
    let headers = { 'Authorization': `Token ${props.token}` };
    let url = settings.API_SERVER + '/api/helloyou/';
    const method = 'POST';
    let config: AxiosRequestConfig = { headers, method, url, data: data };

    axios(config).then(
      (res: any) => {
        setHelloName(res.data["response"])
      }).catch(
        (error: string) => { alert(error) })
  }

  const handleFormFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className={classes.container}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.textInput}>
              <Typography variant="h6" color="primary">
                Enter your name:
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleFormFieldChange}
              >
              </TextField>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={name.length === 0}>
                Submit
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.title} elevation={0}>
              <Typography variant="h6">
                Backend Response: <span>&nbsp;</span>
              </Typography>
              <Typography variant="body1" >
                {helloName}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment >
  )
}

export default Home