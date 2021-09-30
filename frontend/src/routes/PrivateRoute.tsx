import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {

  const authenticated = useAppSelector(state => state.auth.authenticated)

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (
      authenticated ?
        <Component {...props} /> : <></>
    )} />
  );
};

export default PrivateRoute;