import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
  userinput: string;
}

interface MatchRouteProps extends RouteComponentProps<MatchParams> {
}

const Placeholder = (props: MatchRouteProps) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h5" style={{ margin: 20 }} color="textSecondary">The user input detected by the route is: {props.match.params.userinput}</Typography>
      <Button variant="contained" color="primary" onClick={() => props.history.push('/home')}>Back Home</Button>
    </div>
  )
}

export default Placeholder