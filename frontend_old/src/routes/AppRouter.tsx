import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppProps } from '../App';


export const AppRouter: React.FC<AppProps> = (props: AppProps) => {
  const { route, path, match, location, history, ...rest } = props;
  return (
    <>
      {route?.subRoutes &&
        <Switch>
          {route.subRoutes.map((subRoute, i) => (
            <Route
              path={`${route.pathname}${subRoute.pathname}`}
              render={(subRouteProps: any) => <subRoute.component {...subRouteProps} {...rest} />}
              key={i}
              exact />
          ))}
          <Route render={() => <Redirect to="/home" />} />
        </Switch>
      }
    </>
  )
}