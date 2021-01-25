import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../components/Login/Login";
import Home from "../components/Home";
import PasswordUpdate from "../components/Login/PasswordUpdate";
import PrivateRoute, { PrivateRouteProps } from './PrivateRoute'

export default function Router(props: PrivateRouteProps) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login/"> <Login {...props} /></Route>
                    <PrivateRoute exact path="/update_password/" isAuthenticated={props.isAuthenticated}><PasswordUpdate {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/" isAuthenticated={props.isAuthenticated}><Home {...props}/></PrivateRoute>
                </Switch>
            </BrowserRouter>
        </div>
    )
};