import React, { useState, useContext } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
import * as settings from '../settings';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, TextField, Tooltip, Switch, createStyles, Theme, withStyles, SwitchProps, SwitchClassKey } from '@material-ui/core';
import { AuthProps } from '../App';
import { AlertContext } from '../contexts/AlertContext';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "75%",
    marginTop: "4vh",
    marginBottom: "10vh",
    borderRadius: '6px',
    backgroundColor: theme.palette.action.disabledBackground,
    padding: '20px'
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

}));

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}
interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#5cb85c',
          opacity: 1,
          border: 'none',
        },
      },
      '&:not($checked)': {
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#d9534f',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


function Home(props: AuthProps) {

  const [name, setName] = useState("")
  const [helloName, setHelloName] = useState("")
  const [token, setToken] = useState(props.token)

  const { TriggerAlert } = useContext(AlertContext)
  const classes = useStyles()

  const handleSubmit = (event: any) => {
    let data = { "name": name }
    let headers = { 'Authorization': `Token ${token}` };
    let url = settings.API_SERVER + '/api/helloyou/';
    const method = 'POST';
    let config: AxiosRequestConfig = { headers, method, url, data: data };

    axios(config).then(
      (res: any) => {
        setHelloName(res.data["response"])
        TriggerAlert("Success!", "success")
      }).catch(
        (error: any) => { TriggerAlert(error.message, "error") })
  }

  const handleFormFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className={classes.container}>
        <Grid container spacing={3}>
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
              <Tooltip title={`Enter name and click submit to see a ${token === props.token ? 'successful' : 'failed'} request.`}>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={name.length === 0}>
                  Submit
                </Button>
              </Tooltip>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.title}>
              <Typography variant="h6">
                Backend Response: <span>&nbsp;</span>
              </Typography>
              <Typography variant="body1" >
                {helloName}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.title}>
              <Typography variant="h6">
                Test Panel:
              </Typography>
              <Typography variant="subtitle2">
                Valid Token: <span>&nbsp;</span>
              </Typography>
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>Off</Grid>
                  <Grid item>
                    <Tooltip title="Toggle the state of the token and simulate successful/failed API requests.">
                      <div>
                        <IOSSwitch checked={token === props.token} onChange={() => token === 'abc' ? setToken(props.token) : setToken('abc')} />
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item>On</Grid>
                </Grid>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment >
  )
}

export default Home