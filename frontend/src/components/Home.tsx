import React, { useState, useContext, useRef } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
import * as settings from '../settings';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, TextField, Tooltip, Switch, createStyles, Theme, withStyles, SwitchProps, SwitchClassKey, DialogContentText } from '@material-ui/core';
import { AppProps } from '../App';
import { AlertContext } from '../contexts/AlertContext';
import { DialogContext } from '../contexts/DialogContext';

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


function Home(props: AppProps) {

  const [name, setName] = useState("")
  const [helloName, setHelloName] = useState("")
  const [token, setToken] = useState(props.token)
  const userInput = useRef<HTMLInputElement>(null)
  const { TriggerAlert } = useContext(AlertContext)
  const { OpenDialog } = useContext(DialogContext)
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
    <>
      <CssBaseline />
      <Container fixed className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.textInput}>
              <Typography variant="h6">
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
              />
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
            <Paper className={classes.textInput}>
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
                        <IOSSwitch checked={token === props.token} onChange={() => token === props.token ? setToken('abc') : setToken(props.token)} />
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item>On</Grid>
                </Grid>
              </Typography>
              <Typography variant="subtitle2" style={{ marginTop: 20 }}>
                Pass Param to Nested Subroute: <span>&nbsp;</span>
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                variant="outlined"
                id="userinput"
                label="User Input"
                name="User Input"
                inputRef={userInput} />
              <Button variant="contained" color="primary" onClick={() => props.history.push(`${props.location.pathname}/nestedsubroute/${userInput.current?.value}`)} >
                Submit
              </Button>
              <Typography variant="subtitle2" style={{ marginTop: 20 }}>
                Demo Dialog: <span>&nbsp;</span>
              </Typography>
              <Button variant="contained" color="primary"
                onClick={() => OpenDialog("Test Title", <DialogContentText>This is an example of a dialog body. Put whatever you want here.</DialogContentText>)} >
                Open Dialog
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ >
  )
}

export default Home