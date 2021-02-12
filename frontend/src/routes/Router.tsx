import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Login from "../components/Login/Login";
import PasswordUpdate from "../components/Login/PasswordUpdate";
import PasswordReset from "../components/Login/PasswordReset";
import PrivateRoute from './PrivateRoute'
import { AppProps } from "../App";
import { privateRoutes, routeInterface } from './Routes'

export default function Router(props: AppProps) {
  const { path, route, isAuthenticated, ...rest } = props;

  const passwordUpdateRoute: routeInterface = {
    pathname: "/change_password/",
    component: PasswordUpdate,
    privateRoute: true
  }

  return (
    <Switch>
      <Route exact path="/login/"> <Login {...props} /></Route>
      <Route exact path="/password_reset/"> <PasswordReset /></Route>
      <PrivateRoute path="/change_password/" isAuthenticated={isAuthenticated} route={passwordUpdateRoute} {...rest} />
      {privateRoutes.map((route, index) =>
        <PrivateRoute
          key={index}
          {...props}
          path={route.pathname}
          route={route}
          isAuthenticated={props.isAuthenticated} />)
      }
      <Route render={() => <Redirect to="/home" />} />
    </Switch>
  )
};
