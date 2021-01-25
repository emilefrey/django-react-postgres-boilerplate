import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Children } from "../interfaces/Children"

export interface PrivateRouteProps {
  isAuthenticated: boolean
  children: Children
  exact: boolean
  path: string
}

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
export default function PrivateRoute({ isAuthenticated, children, ...rest }: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}