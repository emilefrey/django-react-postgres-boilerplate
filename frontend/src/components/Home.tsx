import React, { useState, useContext, useRef } from 'react'
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, TextField, Tooltip, DialogContentText } from '@material-ui/core';
import { AlertContext } from '../contexts/AlertContext';
import { DialogContext } from '../contexts/DialogContext';
import { RouteComponentProps } from 'react-router';

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

function Home(props: RouteComponentProps) {

  const [name, setName] = useState("")
  const [helloName, setHelloName] = useState("")
  const userInput = useRef<HTMLInputElement>(null)
  const { TriggerAlert } = useContext(AlertContext)
  const { OpenDialog } = useContext(DialogContext)
  const classes = useStyles()

  const handleSubmit = () => {
    let data = { "name": name }
    axios.post('/api/helloyou/', data)
      .then(response => {
        setHelloName(response.data["response"])
        TriggerAlert("Successful API Request!", "success")
      })
      .catch(
        (error: any) => { TriggerAlert(error.message, "error") })
  }

  const handleFormFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  return (
    <Container fixed className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
            <Tooltip title={`Enter name and click submit to see a successful request.`}>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={name.length === 0}>
                Submit
              </Button>
            </Tooltip>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.title}>
            <Typography variant="h6">
              Backend Response: <span>&nbsp;</span>
            </Typography>
            <Typography variant="body1" >
              {helloName}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.textInput}>
            <Typography variant="h6">
              Test Panel:
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
  )
}

export default Home