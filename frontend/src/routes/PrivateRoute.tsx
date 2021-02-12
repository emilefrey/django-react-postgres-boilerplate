import React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { AuthProps } from "../App";
import { Children } from "../interfaces/Children"
import { routeInterface } from "./Routes";

export interface PrivateRouteProps extends AuthProps, RouteComponentProps {
  isAuthenticated: boolean
  children?: Children
  exact: boolean
  path: string
  route: routeInterface
}

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
export default function PrivateRoute({ isAuthenticated, route, ...rest }: PrivateRouteProps) {
  return (
    <Route
      path={rest.path}
      render={(props: RouteComponentProps) =>
        isAuthenticated ? <route.component {...props} isAuthenticated={isAuthenticated} route={route} {...rest} /> : (
          <Redirect
            to={{
              pathname: "/login/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}